const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const tours = await prisma.tour.findMany()
  const cars = await prisma.car.findMany()
  
  console.log('--- TOURS IN DATABASE ---')
  tours.forEach(t => console.log(`Title: ${t.title} | Image: ${t.image}`))
  
  console.log('--- CARS IN DATABASE ---')
  cars.forEach(c => console.log(`Name: ${c.name} | Image: ${c.image}`))
}

main().finally(() => prisma.$disconnect())
