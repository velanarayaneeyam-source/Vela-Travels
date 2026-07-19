
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const car = await prisma.car.create({
      data: {
        name: 'Script Created Car',
        details: 'This car was created by a script to test DB connection and schema.',
        image: '/placeholder-car.jpg',
        hourlyPrice: '450'
      }
    })
    console.log('Successfully created car:', car.id)
  } catch (err) {
    console.error('Error creating car:', err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
