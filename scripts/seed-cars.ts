import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding cars...');

  const cars = [
    {
      name: 'Toyota Land Cruiser V8',
      image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=1964&auto=format&fit=crop',
      details: 'Spacious SUV perfect for long distances and rough terrains. Seats 7 comfortably with premium leather interior and dual-zone AC.',
      hourlyPrice: '₹1,200/hr'
    },
    {
      name: 'Mercedes-Benz Sprinter',
      image: 'https://images.unsplash.com/photo-1627637819842-9f3796696cca?q=80&w=1887&auto=format&fit=crop',
      details: 'Luxury van for group transfers. Ideal for airport pick-ups and corporate team outings. Features include high-roof, luggage space, and entertainment system.',
      hourlyPrice: '₹2,500/hr'
    },
    {
      name: 'Audi A6 Black Edition',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop',
      details: 'Premium sedan for VIP transfers and elegant city tours. Sophisticated design with advanced safety features and smooth handling.',
      hourlyPrice: '₹1,800/hr'
    }
  ];

  for (const car of cars) {
    await prisma.car.create({
      data: car
    });
  }

  console.log('Cars seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
