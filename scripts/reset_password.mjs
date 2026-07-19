import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const p = new PrismaClient()
const newPassword = 'GpTravels@2026'
const hashed = await bcrypt.hash(newPassword, 10)

const updated = await p.user.update({
  where: { username: 'gptraveller' },
  data: { password: hashed },
  select: { username: true, email: true }
})

console.log('Password reset successful!')
console.log('Username:', updated.username)
console.log('Email:', updated.email)
console.log('New Password:', newPassword)

await p.$disconnect()
