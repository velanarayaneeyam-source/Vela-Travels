import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const userCount = await prisma.user.count()
  console.log(`User Count: ${userCount}`)
  const users = await prisma.user.findMany({ select: { username: true, email: true } })
  console.log('Users:', users)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
