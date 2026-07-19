import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
try {
  const count = await p.tour.count()
  console.log('DB Connection OK! Tours:', count)
} catch (e) {
  console.error('DB ERROR:', e.message)
} finally {
  await p.$disconnect()
}
