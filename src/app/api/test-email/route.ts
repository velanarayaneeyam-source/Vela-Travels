import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
    try {
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;

        if (!user || !pass) {
            return NextResponse.json({ 
                success: false, 
                message: "Missing SMTP_USER or SMTP_PASS in Vercel environment variables" 
            });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: true,
            auth: { user, pass }
        });

        await transporter.verify();

        const info = await transporter.sendMail({
            from: process.env.FROM_EMAIL || '"Vela Travels" <velanarayaneeyam@gmail.com>',
            to: user,
            subject: 'VERCEL LIVE TEST',
            text: 'This was sent from the live Vercel server!'
        });

        return NextResponse.json({ 
            success: true, 
            message: "Email sent successfully from Vercel!",
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
