import { PrismaClient } from '@prisma/client'
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
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
  console.log('Username: admin_gptour')
  console.log('Email: admin@gptour.com')
}

main()
  .catch((e) => {
    console.error('ERROR during registration:', e.message)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
