import nodemailer from 'nodemailer';

/**
 * Sends a password reset email using Gmail SMTP.
 * Note: You must use an "App Password" if your Gmail has 2FA enabled.
 */
export async function sendResetEmail(email: string, resetUrl: string) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: process.env.FROM_EMAIL || '"Vela Travels" <velanarayaneeyam@gmail.com>',
        to: email,
        subject: 'Reset Your Vela Travels Password',
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #10b981;">Password Reset Request</h2>
                <p>Hello,</p>
                <p>We received a request to reset your password for your Vela Travels account. Click the button below to set a new password:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" style="display: inline-block; padding: 14px 30px; background-color: #10b981; color: white; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">Reset My Password</a>
                </div>
                <p style="color: #64748b; font-size: 14px;">If you did not request this, please ignore this email. This link will expire in 1 hour.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="color: #94a3b8; font-size: 12px; text-align: center;">Best regards,<br/>The Vela Travels Team</p>
            </div>
        `,
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
        console.log(`[EMAIL] Reset sent to ${email}`);
    } else {
        console.log('--- [DEV ONLY] PASSWORD RESET EMAIL ---');
        console.log(`To: ${email}`);
        console.log(`URL: ${resetUrl}`);
        console.log('--- [CREDENTIALS MISSING IN .ENV] ---');
    }
}
