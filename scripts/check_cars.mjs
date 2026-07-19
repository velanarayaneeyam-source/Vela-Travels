
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const cars = await prisma.car.findMany()
    console.log('Cars in DB:', cars.length)
    console.log(JSON.stringify(cars, null, 2))
  } catch (err) {
    console.error('Error fetching cars:', err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
