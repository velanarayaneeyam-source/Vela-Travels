import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;

        if (!user || !pass) {
            return NextResponse.json({ 
                success: false, 
                message: "Missing SMTP_USER or SMTP_PASS in Vercel environment variables",
                foundKeys: Object.keys(process.env).filter(k => k.includes('SMTP') || k.includes('FROM'))
            });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: true,
            auth: { user, pass }
        });

        await transporter.verify();

        // Check if database can find the user
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        const dbUser = await prisma.user.findFirst({
            where: { email: 'velanarayaneeyam@gmail.com' }
        });

        const info = await transporter.sendMail({
            from: process.env.FROM_EMAIL || '"Vela Travels" <velanarayaneeyam@gmail.com>',
            to: user,
            subject: 'VERCEL LIVE TEST',
            text: `This was sent from the live Vercel server!\n\nDatabase Check:\nWas user found in Vercel's DB? ${dbUser ? 'YES' : 'NO'}`
        });

        return NextResponse.json({ 
            success: true, 
            message: "Email sent successfully from Vercel!",
            userFoundInDB: !!dbUser,
            info: info.messageId
        });
    } catch (error: any) {
        return NextResponse.json({ 
            success: false, 
            message: "Failed to send email", 
            error: error.message 
        });
    }
}
