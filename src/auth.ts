import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
                token: { label: "2FA Token", type: "text" }
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Missing username or password");
                }

                // Approximate client IP extraction for rate limiting
                let ip = "unknown";
                if (req && req.headers) {
                    const forwarded = (req.headers as any)["x-forwarded-for"];
                    const realIp = (req.headers as any)["x-real-ip"];
                    if (forwarded) {
                        ip = forwarded.split(",")[0].trim();
                    } else if (realIp) {
                        ip = realIp;
                    }
                }

                try {
                    // Rate limiting check (using 'as any' to work even if Prisma client hasn't regenerated yet)
                    const cutoffTime = new Date(Date.now() - 15 * 60 * 1000);
                    const recentFailedAttempts = await prisma.loginAttempt.count({
                        where: {
                            ip,
                            success: false,
                            createdAt: { gte: cutoffTime },
                        },
                    });

                    if (recentFailedAttempts >= 5) {
                        throw new Error("Too many login attempts. Please try again after 15 minutes.");
                    }

                    // Look up user in DB by username or email (case-insensitive)
                    const user = await prisma.user.findFirst({
                        where: {
                            OR: [
                                { username: { equals: credentials.username, mode: 'insensitive' } },
                                { email: { equals: credentials.username, mode: 'insensitive' } }
                            ]
                        }
                    });

                    let isSuccess = false;
                    if (user) {
                        isSuccess = await bcrypt.compare(credentials.password, user.password);

                        // Check 2FA if enabled
                        if (isSuccess && user.twoFactorSecret) {
                            if (!credentials.token) {
                                throw new Error("2FA token required");
                            }
                            // Dynamic require to avoid stale type issues
                            // eslint-disable-next-line @typescript-eslint/no-var-requires
                            const authenticator = require("authenticator");
                            const isValidToken = authenticator.verifyToken(user.twoFactorSecret, credentials.token);
                            if (!isValidToken) {
                                throw new Error("Invalid 2FA token. Please try again.");
                            }
                        }
                    }

                    // Log the attempt
                    await prisma.loginAttempt.create({
                        data: { ip, success: isSuccess },
                    });

                    if (isSuccess && user) {
                        return { id: user.id, name: user.username, email: user.email, role: user.role };
                    }
                    throw new Error("Invalid username or password");

                } catch (err: any) {
                    // Re-throw deliberate errors
                    if (
                        err.message === "Too many login attempts. Please try again after 15 minutes." ||
                        err.message === "2FA token required" ||
                        err.message === "Invalid 2FA token. Please try again." ||
                        err.message === "Invalid username or password"
                    ) {
                        throw err;
                    }

                    // Production failsafe
                    if (process.env.NODE_ENV === 'production') {
                        throw new Error("Invalid username or password");
                    }

                    console.warn("[AUTH] Prisma DB error, using env fallback in dev:", err.message);
                    const adminUser = process.env.ADMIN_USERNAME || "admin";
                    const adminPass = process.env.ADMIN_PASSWORD || "admin123";
                    
                    if (credentials.username === adminUser && credentials.password === adminPass) {
                        return { id: "1", name: credentials.username, email: "velanarayaneeyam@gmail.com", role: "admin" };
                    }
                    throw new Error("Invalid username or password");
                }
            }
        }),
        ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET ? [
            GitHubProvider({
                clientId: process.env.GITHUB_ID,
                clientSecret: process.env.GITHUB_SECRET,
            })
        ] : []),
    ],
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-dev",
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours session expiry
    },
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).id = token.sub;
                (session.user as any).role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        }
    }
};
