const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const prisma = new PrismaClient();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://btgxgtgwbhubyebqwtgj.supabase.co';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = serviceKey ? createClient(supabaseUrl, serviceKey) : null;

async function main() {
    console.log("Uploading Seetharkundu tree photo to Supabase Storage & Database...");
    
    const filePath = path.join(__dirname, '..', 'public', 'uploads', 'nelliampathy-seetharkundu.jpg');
    const fileBuffer = fs.readFileSync(filePath);
    
    let publicUrl = "/uploads/nelliampathy-seetharkundu.jpg";

    if (supabaseAdmin) {
        try {
            const filename = `nelliampathy-seetharkundu-${Date.now()}.jpg`;
            const { data, error } = await supabaseAdmin.storage
                .from("uploads")
                .upload(filename, fileBuffer, {
                    contentType: "image/jpeg",
                    upsert: true
                });

            if (error) {
                console.error("Supabase Storage Upload Error:", error);
            } else {
                const { data: urlData } = supabaseAdmin.storage
                    .from("uploads")
                    .getPublicUrl(filename);
                if (urlData && urlData.publicUrl) {
                    publicUrl = urlData.publicUrl;
                    console.log("Uploaded to Supabase Storage:", publicUrl);
                }
            }
        } catch (e) {
            console.error("Supabase error:", e);
        }
    }

    const tour = await prisma.tour.findFirst({
        where: { title: { contains: "Nelliampathy" } }
    });

    if (tour) {
        await prisma.tour.update({
            where: { id: tour.id },
            data: { image: publicUrl }
        });
        console.log("Successfully updated Nelliampathy Hills with exact Seetharkundu tree photo!");
    } else {
        await prisma.tour.create({
            data: {
                title: "Nelliampathy Hills & Seetharkundu Expedition",
                description: "Explore misty tea gardens, cardamom estates, and the legendary Seetharkundu viewpoint in the Western Ghats. Experience cool mountain breezes and panoramic valley views.",
                destination: "Nenmara, Palakkad",
                image: publicUrl,
                price: "₹3,500",
                duration: "1 Day Package",
                featured: true,
            }
        });
        console.log("Created Nelliampathy Hills tour with exact Seetharkundu tree photo!");
    }
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
