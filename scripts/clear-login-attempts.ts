import { prisma } from '../src/lib/db';

async function clearAttempts() {
    console.log('Clearing all login attempts to reset rate limit...');
    
    const result = await (prisma as any).loginAttempt.deleteMany({});
    
    console.log(`Successfully cleared ${result.count} attempt records.`);
}

clearAttempts()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
