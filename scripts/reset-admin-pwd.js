const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  const newPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.update({
    where: { username: 'admin' },
    data: { password: newPassword }
  });
  
  console.log('Admin password reset to: admin123');
  await prisma.$disconnect();
}

main().catch(console.error);
