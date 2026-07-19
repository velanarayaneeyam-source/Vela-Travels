const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    const tours = await prisma.tour.count()
    const cars = await prisma.car.count()
    console.log(`Successfully connected to DB!`)
    console.log(`Tour count: ${tours}`)
    console.log(`Car count: ${cars}`)
    if (tours > 0) {
      const allTours = await prisma.tour.findMany()
      allTours.forEach(t => console.log(`- ${t.title}: ${t.image}`))
    }
  } catch (err) {
    console.error(`DB connection failed:`, err.message)
  } finally {
    await prisma.$disconnect()
  }
}

main()
