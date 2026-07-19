const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('@krishnagp2026', 10)
    const user = await prisma.user.create({
      data: {
        username: 'gptraveller',
        email: 'kris77.gp@gmail.com',
        password: hashedPassword,
        role: 'admin'
      }
    })
    console.log('SUCCESS: Final Admin User Created Successfully!')
  } catch (err) {
    console.error('SERVER ERROR during registration:', err.message)
  }
}

main().finally(() => prisma.$disconnect())
