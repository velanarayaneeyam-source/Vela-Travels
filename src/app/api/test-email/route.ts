import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    // Mask all environment values for security, but show the exact keys
    const safeEnv: Record<string, string> = {};
    for (const key in process.env) {
        if (key.includes('SMTP') || key.includes('FROM') || key.includes('DATABASE')) {
            const val = process.env[key];
            safeEnv[key] = val ? `[EXISTS: length ${val.length}]` : '[EMPTY]';
        }
    }

    return NextResponse.json({
        success: true,
        message: "Vercel Environment Debugger",
        environmentKeysDetected: safeEnv,
        NODE_ENV: process.env.NODE_ENV,
        rawKeys: Object.keys(process.env).filter(k => k.includes('SMTP') || k.includes('FROM'))
    });
}
