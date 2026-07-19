const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const t = await prisma.testimonial.findMany();
  console.log(t);
  await prisma.$disconnect();
}
check();
