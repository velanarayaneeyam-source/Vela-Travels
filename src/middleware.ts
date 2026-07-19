import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-dev" });
    const url = req.nextUrl.pathname;

    // Block access to /veela-travels-2026 if not logged in or not an admin
    if (url.startsWith("/veela-travels-2026")) {
        if (!token || typeof token.role !== 'string' || token.role.toLowerCase() !== "admin") {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/veela-travels-2026/:path*"],
};
