
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true
      }
    })
    console.log('Registered Users:', users.length)
    console.log(JSON.stringify(users, null, 2))
  } catch (err) {
    console.error('Error fetching users:', err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
