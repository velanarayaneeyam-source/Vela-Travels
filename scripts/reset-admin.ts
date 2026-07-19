import { prisma } from '../src/lib/db';
import bcrypt from 'bcryptjs';

async function reset() {
    const username = 'admin';
    const newPassword = 'password123';
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    console.log(`Resetting password for user: ${username}`);
    
    await prisma.user.upsert({
        where: { username },
        update: { password: hashedPassword },
        create: {
            username,
            email: 'admin@gptour.com',
            password: hashedPassword,
            role: 'admin'
        }
    });

    console.log('-----------------------------------');
    console.log(`NEW LOGIN CREDENTIALS:`);
    console.log(`Username: ${username}`);
    console.log(`Password: ${newPassword}`);
    console.log('-----------------------------------');
}

reset()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
