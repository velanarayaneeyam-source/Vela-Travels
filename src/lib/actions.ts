"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./db";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { z } from "zod";
import crypto from "crypto";
import { sendResetEmail } from "./notifications";
import { supabase, supabaseAdmin } from "./supabase";

import { checkRateLimit } from "./ratelimit";
import bcrypt from "bcryptjs";

// --- Validation Schemas ---

const TourSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().default(""),
    destination: z.string().min(2, "Destination is required"),
    price: z.string().min(1, "Price is required"),
    duration: z.string().min(1, "Duration is required"),
    featured: z.boolean().default(false),
});

const InquirySchema = z.object({
    name: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    message: z.string().min(2, "Message must be at least 2 characters"),
});

const TestimonialSchema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().optional().default("Verified Traveler"),
    content: z.string().min(2, "Review must be at least 2 characters"),
    rating: z.coerce.number().min(1).max(5).default(5),
});

// Helper to check for redirect errors
function isRedirect(error: any) {
    return error && error.digest && error.digest.startsWith('NEXT_REDIRECT');
}

const CarSchema = z.object({
    name: z.string().min(2, "Car name is required"),
    details: z.string().default(""),
    hourlyPrice: z.string().optional().nullable(),
});

// --- Helper Functions ---

async function checkAuth() {
    console.log("[AUTH_CHECK] Checking session...");
    const session = await getServerSession(authOptions);
    if (!session) {
        console.error("[AUTH_CHECK] No session found.");
        throw new Error("Unauthorized: Please login to perform this action");
    }
    console.log("[AUTH_CHECK] Session found for user:", session.user?.name);
    return session;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

async function saveFile(file: File): Promise<string> {
    console.log("[SAVE_FILE] Starting save for:", file.name, "type:", file.type, "size:", file.size);
    // Security: Validate file type and size
    if (file.size > MAX_FILE_SIZE) {
        console.error("[SAVE_FILE] Size exceeded:", file.size);
        throw new Error("File size exceeds 5MB limit");
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        console.error("[SAVE_FILE] Invalid type:", file.type);
        throw new Error("Only .jpg, .png and .webp formats are supported");
    }

    // --- Production Fix: Supabase Storage Support ---
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)) {
        console.log("[SAVE_FILE] Using Supabase Storage");
        try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, "-");
            const filename = `${Date.now()}-${safeName}`;
            
            // SECURITY CHECK: Supabase Service Role Key format validation
            const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
            if (serviceKey && serviceKey.startsWith('sb_secret_')) {
                console.warn("[SAVE_FILE] CRITICAL: SUPABASE_SERVICE_ROLE_KEY appears to be a 'Project Secret' instead of a 'Service Role JWT'. Uploads may fail.");
            }

            // Use Admin client if available, otherwise FAIL HARD in production
            if (!supabaseAdmin) {
                console.error("[SAVE_FILE] CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing!");
                if (process.env.NODE_ENV === 'production') {
                    throw new Error("SUPABASE_SERVICE_ROLE_KEY (Service Role JWT) is missing in Vercel. Please add it and REDEPLOY. (Found: URL=" + process.env.NEXT_PUBLIC_SUPABASE_URL + ")");
                }
            }
            
            const client = supabaseAdmin || supabase;
            console.log("[SAVE_FILE] Client Selection:", !!supabaseAdmin ? "ADMIN (Service Role)" : "PUBLIC (Anon)");
            
            const { data, error } = await client.storage
                .from("uploads")
                .upload(filename, buffer, {
                    contentType: file.type,
                    upsert: true
                });

            if (error) {
                console.error("[SAVE_FILE] Supabase Storage Error:", error);
                throw new Error(`Upload Failed: ${error.message}${error.statusCode === '403' ? ' (Check bucket policies or use a valid Service Role Key)' : ''}`);
            }

            console.log("[SAVE_FILE] Upload success, getting public URL for:", filename);
            const { data: { publicUrl } } = client.storage
                .from("uploads")
                .getPublicUrl(filename);

            if (!publicUrl) throw new Error("Supabase failed to generate a public URL.");
            console.log("[SAVE_FILE] Public URL generated:", publicUrl);
            return publicUrl;
        } catch (error: any) {
            console.error("[SAVE_FILE] Supabase Cloud Storage Crash:", error);
            // Critical: If cloud upload fails in production, we MUST STOP. we cannot fallback to local filesystem.
            throw new Error(`Storage failure: ${error.message || 'Check your Supabase configuration in Vercel'}`);
        }
    }

    // Fallback/Local Development: Save to public/uploads
    // NOTE: This will not work on Vercel deployment!
    console.log("[SAVE_FILE] Falling back to local filesystem");
    if (process.env.NODE_ENV === 'production') {
        throw new Error("Storage configuration missing. Please ensure SUPABASE_SERVICE_ROLE_KEY is set in Vercel.");
    }


    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), "public", "uploads");

    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (e) { /* ignore */ }

    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, "-");
    const filename = `${Date.now()}-${safeName}`;
    const path = join(uploadDir, filename);

    console.log("[SAVE_FILE] Writing locally to:", path);
    await writeFile(path, buffer);
    return `/uploads/${filename}`;
}

// --- Server Actions ---

export async function createTour(formData: FormData) {
    try {
        await checkAuth();

        const data = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            destination: formData.get("destination") as string,
            price: formData.get("price") as string,
            duration: formData.get("duration") as string,
            featured: formData.get("featured") === "on",
        };

        const validated = TourSchema.parse(data);

        let imageUrl = formData.get("image-url") as string;
        const imageFile = formData.get("image-file") as File;

        if (imageFile && imageFile.size > 0) {
            imageUrl = await saveFile(imageFile);
        }

        await prisma.tour.create({
            data: {
                ...validated,
                image: imageUrl || "/placeholder-tour.jpg",
            },
        });

        revalidatePath("/veela-travels-2026/tours");
        revalidatePath("/tours");
        revalidatePath("/");
        return { success: true };
    } catch (error: any) {
        console.error("[CREATE_TOUR] Error:", error);
        return { success: false, error: error.message || "Failed to create tour package" };
    }
}

export async function updateTour(id: string, formData: FormData) {
    try {
        await checkAuth();

        const data = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            destination: formData.get("destination") as string,
            price: formData.get("price") as string,
            duration: formData.get("duration") as string,
            featured: formData.get("featured") === "on",
        };

        const validated = TourSchema.parse(data);

        let imageUrl = formData.get("image-url") as string;
        const imageFile = formData.get("image-file") as File;

        if (imageFile && imageFile.size > 0) {
            imageUrl = await saveFile(imageFile);
        }

        const updateData: any = { ...validated };
        if (imageUrl) {
            updateData.image = imageUrl;
        }

        await prisma.tour.update({
            where: { id },
            data: updateData,
        });

        revalidatePath("/veela-travels-2026/tours");
        revalidatePath(`/veela-travels-2026/tours/${id}`);
        revalidatePath("/tours");
        revalidatePath("/");
        return { success: true };
    } catch (error: any) {
        console.error("[UPDATE_TOUR] Error:", error);
        return { success: false, error: error.message || "Failed to update tour package" };
    }
}

export async function deleteTour(id: string) {
    await checkAuth();
    await prisma.tour.delete({
        where: { id },
    });
    await logAdminAction("Delete Tour", { id });
    revalidatePath("/veela-travels-2026/tours");
    revalidatePath("/tours");
    revalidatePath("/");
}

export async function createInquiry(formData: FormData) {
    // 10 requests per hour strictly (Rate Limiting)
    const clientIp = formData.get("name")?.toString() || "unknown"; // Fallback as strict IP isn't available from FormData directly in actions. In real-world, pass headers from client or middleware.
    if (!checkRateLimit(`inquiry_${clientIp}`, 10, 60 * 60 * 1000)) {
        return { success: false, error: "You are submitting forms too quickly. Try again later." };
    }

    const data = {
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        message: formData.get("message") as string,
    };

    const result = InquirySchema.safeParse(data);
    
    if (!result.success) {
        return { success: false, error: result.error.issues[0].message };
    }

    try {
        await prisma.inquiry.create({
            data: result.data,
        });
        revalidatePath("/veela-travels-2026");
        revalidatePath("/veela-travels-2026/inquiries");
        return { success: true };
    } catch (e) {
        return { success: false, error: "Something went wrong. Please try again." };
    }
}

export async function logContactClick(type: 'whatsapp' | 'phone', location: string = 'website') {
    await prisma.inquiry.create({
        data: {
            name: "Direct Click",
            phone: type === 'whatsapp' ? "WhatsApp Link" : "Phone Link",
            message: `User clicked the ${type} link from ${location}`,
            status: "clicked", // special status to differentiate from form submissions
        }
    });
    revalidatePath("/veela-travels-2026");
    revalidatePath("/veela-travels-2026/inquiries");
}

export async function deleteInquiry(id: string) {
    await checkAuth();
    await prisma.inquiry.delete({
        where: { id },
    });
    revalidatePath("/veela-travels-2026/inquiries");
    revalidatePath("/veela-travels-2026");
}

export async function updateSiteSettings(settings: Record<string, string>) {
    await checkAuth();

    await prisma.$transaction(
        Object.entries(settings).map(([key, value]) =>
            prisma.siteSettings.upsert({
                where: { key },
                update: { value },
                create: { key, value }
            })
        )
    );
    revalidatePath("/", "layout");
    revalidatePath("/contact", "page");
    revalidatePath("/veela-travels-2026/settings", "page");
}

export async function saveSiteSettings(formData: FormData) {
    try {
        await checkAuth();

        const logoFile = formData.get("logo-file") as File;
        let logoUrl = formData.get("logo-url") as string;

        if (logoFile && logoFile.size > 0) {
            logoUrl = await saveFile(logoFile);
        }

        const heroFile = formData.get("hero-file") as File;
        let heroImageUrl = formData.get("hero-url") as string;

        if (heroFile && heroFile.size > 0) {
            heroImageUrl = await saveFile(heroFile);
        }

        const homeVehicle1File = formData.get("home-vehicle-1-file") as File;
        let homeVehicle1Image = formData.get("home-vehicle-1-url") as string;
        if (homeVehicle1File && homeVehicle1File.size > 0) {
            homeVehicle1Image = await saveFile(homeVehicle1File);
        }

        const homeVehicle2File = formData.get("home-vehicle-2-file") as File;
        let homeVehicle2Image = formData.get("home-vehicle-2-url") as string;
        if (homeVehicle2File && homeVehicle2File.size > 0) {
            homeVehicle2Image = await saveFile(homeVehicle2File);
        }

        const settings: Record<string, string> = {};
        for (let [key, value] of formData.entries()) {
            if (
                key !== "logo-file" && key !== "logo-url" && 
                key !== "hero-file" && key !== "hero-url" && 
                key !== "home-vehicle-1-file" && key !== "home-vehicle-1-url" && 
                key !== "home-vehicle-2-file" && key !== "home-vehicle-2-url" && 
                typeof value === 'string'
            ) {
                settings[key] = value;
            }
        }

        if (logoUrl) settings["logoUrl"] = logoUrl;
        if (heroImageUrl) settings["heroImageUrl"] = heroImageUrl;
        if (homeVehicle1Image) settings["homeVehicle1Image"] = homeVehicle1Image;
        if (homeVehicle2Image) settings["homeVehicle2Image"] = homeVehicle2Image;

        await prisma.$transaction(
            Object.entries(settings).map(([key, value]) =>
                prisma.siteSettings.upsert({
                    where: { key },
                    update: { value },
                    create: { key, value }
                })
            )
        );

        revalidatePath("/", "layout");
        revalidatePath("/contact", "page");
        revalidatePath("/tours", "page");
        revalidatePath("/cars", "page");
        revalidatePath("/veela-travels-2026/settings", "page");
        
        return { success: true, logoUrl, heroImageUrl, homeVehicle1Image, homeVehicle2Image };
    } catch (error: any) {
        console.error("[SAVE_SETTINGS] Error:", error);
        return { success: false, error: error.message || "Failed to save settings" };
    }
}

export async function createTestimonial(formData: FormData) {
    try {
        await checkAuth();

        const rawData = {
            name: formData.get("name")?.toString() || "",
            role: formData.get("role")?.toString() || "Verified Traveler",
            content: formData.get("content")?.toString() || "",
            rating: formData.get("rating"),
        };

        const result = TestimonialSchema.safeParse(rawData);
        if (!result.success) {
            return { success: false, error: result.error.issues[0].message };
        }

        const validated = result.data;
        let imageUrl = null;
        const imageFile = formData.get("image-file");

        if (imageFile && imageFile instanceof File && imageFile.size > 0) {
            imageUrl = await saveFile(imageFile);
        }

        await prisma.testimonial.create({
            data: {
                name: validated.name,
                role: validated.role,
                content: validated.content,
                rating: validated.rating,
                image: imageUrl
            }
        });

        revalidatePath("/");
        revalidatePath("/veela-travels-2026/testimonials");
        
        return { success: true };
    } catch (error: any) {
        console.error("Testimonial creation error:", error);
        return { 
            success: false, 
            error: error.message || "An unexpected error occurred. Please check your storage settings." 
        };
    }
}

export async function deleteTestimonial(id: string) {
    await checkAuth();

    await prisma.testimonial.delete({
        where: { id }
    });
    revalidatePath("/");
    revalidatePath("/veela-travels-2026/testimonials");
}

export async function logAdminAction(action: string, details: Record<string, any>) {
    console.log(`[ADMIN ACTION] ${action}`, details);
    // Optionally, save logs to a database or external logging service
}

// --- Car Actions ---

export async function createCar(formData: FormData) {
    try {
        console.log("[CREATE_CAR] Full FormData Keys:", Array.from(formData.keys()));
        await checkAuth();

        const data = {
            name: formData.get("name") as string,
            details: formData.get("details") as string,
            hourlyPrice: formData.get("hourly-price") as string || null,
        };

        console.log("[CREATE_CAR] Extracting data:", data);

        const result = CarSchema.safeParse(data);
        if (!result.success) {
            const errorMessage = result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(", ");
            console.error("[CREATE_CAR] Validation failed:", errorMessage);
            return { success: false, error: errorMessage };
        }

        const validated = result.data;
        let imageUrl = formData.get("image-url") as string;
        const imageFile = formData.get("image-file") as File;

        if (imageFile && imageFile.size > 0) {
            console.log("[CREATE_CAR] Saving file:", imageFile.name, "(size:", imageFile.size, ")");
            imageUrl = await saveFile(imageFile);
        }

        console.log("[CREATE_CAR] Final image URL:", imageUrl);

        const galleryRaw = formData.get("gallery-images") as string;
        let images = galleryRaw ? galleryRaw.split(",").map(s => s.trim()).filter(Boolean) : [];

        const galleryFiles = formData.getAll("gallery-files") as File[];
        for (const file of galleryFiles) {
            if (file && file.size > 0) {
                const uploadedUrl = await saveFile(file);
                images.push(uploadedUrl);
            }
        }

        const car = await prisma.car.create({
            data: {
                ...validated,
                image: imageUrl || "/placeholder-car.jpg",
                images,
            },
        });

        console.log("[CREATE_CAR] Car created successfully:", car.id);

        revalidatePath("/veela-travels-2026/cars");
        revalidatePath("/cars");
        revalidatePath("/");
        
        return { success: true };
    } catch (error: any) {
        if (isRedirect(error)) throw error;
        console.error("[CREATE_CAR] Critical Action Error:", error);
        return { 
            success: false, 
            error: error.message || "An unexpected error occurred during vehicle creation" 
        };
    }
}

export async function updateCar(id: string, formData: FormData) {
    try {
        console.log("[UPDATE_CAR] ID:", id, "| Keys:", Array.from(formData.keys()));
        await checkAuth();

        const data = {
            name: formData.get("name") as string,
            details: formData.get("details") as string,
            hourlyPrice: formData.get("hourly-price") as string || null,
        };

        const result = CarSchema.safeParse(data);
        if (!result.success) {
            const errorMessage = result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(", ");
            console.error("[UPDATE_CAR] Validation failed:", errorMessage);
            return { success: false, error: errorMessage };
        }

        const validated = result.data;
        let imageUrl = formData.get("image-url") as string;
        const imageFile = formData.get("image-file") as File;

        if (imageFile && imageFile.size > 0) {
            console.log("[UPDATE_CAR] Saving new file:", imageFile.name);
            imageUrl = await saveFile(imageFile);
        }

        const updateData: any = { ...validated };
        if (imageUrl) {
            updateData.image = imageUrl;
        }

        const galleryRaw = formData.get("gallery-images");
        if (galleryRaw !== null) {
            const images = (galleryRaw as string).split(",").map(s => s.trim()).filter(Boolean);
            
            const galleryFiles = formData.getAll("gallery-files") as File[];
            for (const file of galleryFiles) {
                if (file && file.size > 0) {
                    const uploadedUrl = await saveFile(file);
                    images.push(uploadedUrl);
                }
            }
            updateData.images = images;
        }

        await prisma.car.update({
            where: { id },
            data: updateData,
        });

        console.log("[UPDATE_CAR] Success for ID:", id);

        revalidatePath("/veela-travels-2026/cars");
        revalidatePath("/cars");
        revalidatePath("/");
        return { success: true };
    } catch (error: any) {
        if (isRedirect(error)) throw error;
        console.error("[UPDATE_CAR] Critical Action Error:", error);
        return { success: false, error: error.message || "Failed to update vehicle" };
    }
}

export async function deleteCar(id: string) {
    await checkAuth();
    await prisma.car.delete({
        where: { id },
    });
    await logAdminAction("Delete Car", { id });
    revalidatePath("/veela-travels-2026/cars");
    revalidatePath("/cars");
    revalidatePath("/");
}

// --- Password Reset Actions ---

export async function requestPasswordReset(formData: FormData) {
    const identifier = formData.get("identifier") as string; // Email or Username

    if (!identifier) throw new Error("Please enter your email or username");

    // 5 attempts per 15 minutes (Rate Limiting)
    if (!checkRateLimit(`reset_${identifier}`, 5, 15 * 60 * 1000)) {
        throw new Error("Too many reset attempts. Please wait 15 minutes.");
    }

    // 1. Check if user is registered (Admin Registration First logic)
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: { equals: identifier, mode: 'insensitive' } },
                { username: { equals: identifier, mode: 'insensitive' } }
            ]
        }
    });

    if (!user) {
        // For security, don't reveal if user exists. Just say "Check your inbox"
        return { success: true };
    }

    // 2. Generate secure token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
        data: {
            token: hashedToken,
            userId: user.id,
            expiresAt
        }
    });

    // 3. Send notification
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${rawToken}`;
    
    // Send to Email (Free via Gmail)
    await sendResetEmail(user.email, resetUrl);

    return { success: true };
}

export async function resetPassword(formData: FormData) {
    const token = formData.get("token") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) throw new Error("Passwords do not match");
    if (password.length < 8) throw new Error("Password must be at least 8 characters");

    // 1. Verify token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const resetToken = await prisma.passwordResetToken.findUnique({
        where: { token: hashedToken }
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
        throw new Error("Invalid or expired reset link. Please request a new one.");
    }

    // 2. Update user password
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword }
    });

    // 3. Cleanup token
    await prisma.passwordResetToken.delete({
        where: { id: resetToken.id }
    });

    return { success: true };
}

export async function registerAdmin(formData: FormData) {
    const username = formData.get("username") as string;

    // 5 attempts per IP/username per hour
    if (!checkRateLimit(`admin_reg_${username}`, 5, 60 * 60 * 1000)) {
        throw new Error("Too many registration attempts. Please wait an hour.");
    }

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!username || !email || !password) throw new Error("All fields are required");
    if (password !== confirmPassword) throw new Error("Passwords do not match");
    if (password.length < 8) throw new Error("Password must be at least 8 characters");

    // Check if user already exists
    const existing = await prisma.user.findFirst({
        where: {
            OR: [
                { username },
                { email }
            ]
        }
    });

    if (existing) {
        throw new Error("Username or Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role: "admin"
            }
        });
    } catch (dbError: any) {
        console.error("Admin registration DB error:", dbError);
        throw new Error(`Database error: ${dbError.message || 'Unable to create user'}`);
    }

    return { success: true };
}
