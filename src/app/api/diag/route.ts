import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const userCount = await prisma.user.count();
        const tourCount = await prisma.tour.count();
        const carCount = await prisma.car.count();
        
        return NextResponse.json({
            status: "ok",
            database: "connected",
            counts: {
                users: userCount,
                tours: tourCount,
                cars: carCount
            },
            env: {
                has_supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
                has_service_role: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
                service_role_format: process.env.SUPABASE_SERVICE_ROLE_KEY?.startsWith('sb_secret_') ? 'sb_secret' : 'jwt'
            }
        });
    } catch (error: any) {
        return NextResponse.json({
            status: "error",
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
