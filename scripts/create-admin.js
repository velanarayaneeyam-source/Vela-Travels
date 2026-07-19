const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('GP-Admin-2026-Security!', 10)
    const user = await prisma.user.create({
      data: {
        username: 'admin_gptour',
        email: 'admin@gptour.com',
        password: hashedPassword,
        role: 'admin'
      }
    })
    console.log('SUCCESS: Admin User Created Successfully!')
  } catch (err) {
    console.error('SERVER ERROR during registration:', err.message)
  }
}

main().finally(() => prisma.$disconnect())
