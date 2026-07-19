import { prisma } from '../src/lib/db';

async function test() {
    console.log('Testing connection...');
    try {
        await prisma.$connect();
        console.log('Connected successfully!');
        const count = await prisma.siteSettings.count();
        console.log('Site settings count:', count);
    } catch (e) {
        console.error('Connection failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

test();
