import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
const users = await p.user.findMany({
  where: { email: 'kris77.gp@gmail.com' },
  select: { username: true, email: true, role: true, createdAt: true }
})
console.log('Results:', JSON.stringify(users, null, 2))
if (users.length === 0) {
  console.log('No user found with that email. Listing ALL users:')
  const all = await p.user.findMany({ select: { username: true, email: true, role: true } })
  all.forEach(u => console.log(`  ${u.username} | ${u.email} | ${u.role}`))
}
await p.$disconnect()
