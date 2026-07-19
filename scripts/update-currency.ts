import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Updating currency symbol from $ to ₹...')

    const tours = await prisma.tour.findMany()

    for (const tour of tours) {
        if (tour.price.includes('$')) {
            const newPrice = tour.price.replace(/\$/g, '₹')
            await prisma.tour.update({
                where: { id: tour.id },
                data: { price: newPrice }
            })
            console.log(`Updated tour "${tour.title}": ${tour.price} -> ${newPrice}`)
        }
    }

    console.log('Update complete!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
