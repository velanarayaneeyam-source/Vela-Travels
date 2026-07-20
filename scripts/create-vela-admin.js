const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  try {
    // Delete existing users
    await prisma.user.deleteMany({});
    
    const hashedPassword = await bcrypt.hash('admin1234', 10);
    const user = await prisma.user.create({
      data: {
        username: 'adminvela',
        email: 'admin@velatravelsco.com',
        password: hashedPassword,
        role: 'admin'
      }
    });
    console.log('SUCCESS: Admin User Created:', user.username);
  } catch (err) {
    console.error('ERROR creating admin:', err.message);
  }
}

main().finally(() => prisma.$disconnect());
