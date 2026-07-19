const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const attempts = await prisma.loginAttempt.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });
  console.log('Recent login attempts:', attempts);
  await prisma.$disconnect();
}
check();
