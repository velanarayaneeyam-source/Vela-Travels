import nodemailer from 'nodemailer';

function createTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

/**
 * Sends a password reset email using Gmail SMTP.
 */
export async function sendResetEmail(email: string, resetUrl: string) {
    const transporter = createTransporter();

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

/**
 * Sends an admin registration approval request to the Vela owner email.
 * The owner must click the link to activate the new admin account.
 */
export async function sendApprovalRequestEmail(
    approveUrl: string,
    username: string,
    applicantEmail: string
) {
    const ownerEmail = process.env.SMTP_USER || 'velanarayaneeyam@gmail.com';
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.FROM_EMAIL || '"Vela Travels" <velanarayaneeyam@gmail.com>',
        to: ownerEmail,
        subject: '⚠️ New Admin Registration Request — Action Required',
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc;">
                <h2 style="color: #0f172a; margin-bottom: 4px;">New Admin Registration Request</h2>
                <p style="color: #64748b; font-size: 14px; margin-top: 0;">Someone has requested to register as an admin on your Vela Travels website.</p>

                <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin: 20px 0;">
                    <p style="margin: 0 0 8px 0;"><strong>Username:</strong> ${username}</p>
                    <p style="margin: 0;"><strong>Email:</strong> ${applicantEmail}</p>
                </div>

                <p style="color: #0f172a;">If <strong>you</strong> made this request, click the button below to activate this account. If you did <strong>not</strong> request this, simply ignore this email — the account will never be activated.</p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${approveUrl}" style="display: inline-block; padding: 16px 36px; background-color: #10b981; color: white; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                        ✅ Approve & Activate Account
                    </a>
                </div>

                <p style="color: #ef4444; font-size: 13px; text-align: center;">⏰ This link expires in 24 hours.</p>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                <p style="color: #94a3b8; font-size: 12px; text-align: center;">Vela Travels Admin Security System</p>
            </div>
        `,
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
        console.log(`[EMAIL] Approval request sent to owner for user: ${username}`);
    } else {
        console.log('--- [DEV ONLY] ADMIN APPROVAL EMAIL ---');
        console.log(`To: ${ownerEmail}`);
        console.log(`Approve URL: ${approveUrl}`);
        console.log('--- [CREDENTIALS MISSING IN .ENV] ---');
    }
}
