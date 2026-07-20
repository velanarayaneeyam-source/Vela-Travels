const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function testLogin(inputUsername, inputPassword) {
  try {
    console.log("Testing query for:", inputUsername);
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: { equals: inputUsername, mode: 'insensitive' } },
          { email: { equals: inputUsername, mode: 'insensitive' } }
        ]
      }
    });
    console.log("Found user:", user ? user.username : "NOT FOUND");
    if (user) {
      const match = await bcrypt.compare(inputPassword, user.password);
      console.log("Password match result:", match);
    }
  } catch (err) {
    console.error("Query Error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

testLogin("adminvela", "admin1234");
