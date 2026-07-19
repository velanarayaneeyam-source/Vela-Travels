const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function update() {
  const testimonials = await prisma.testimonial.findMany();
  
  const replacements = [
    {
      name: 'Michael Chen',
      role: 'Business Traveler',
      content: 'The Innova Crysta I rented was in pristine condition. The driver was punctual and very professional. Made my business trip across Kerala incredibly smooth!',
    },
    {
      name: 'Sarah Williams',
      role: 'Family Tourist',
      content: 'We rented a 12-seater tempo traveler for our family vacation. It was spacious, clean, and the AC worked perfectly throughout our entire journey.',
    },
    {
      name: 'David Sharma',
      role: 'Weekend Explorer',
      content: 'Renting a sedan for a weekend getaway was seamless. Great pricing, transparent billing, and the car was well-maintained. Highly recommended!',
    },
    {
      name: 'Priya Patel',
      role: 'Event Organizer',
      content: 'We hired multiple vehicles for a wedding event. The fleet arrived on time, completely spotless, and the coordination was top-notch.',
    }
  ];

  for (let i = 0; i < testimonials.length; i++) {
    if (i < replacements.length) {
      await prisma.testimonial.update({
        where: { id: testimonials[i].id },
        data: {
          name: replacements[i].name,
          role: replacements[i].role,
          content: replacements[i].content,
        }
      });
    }
  }

  console.log('Testimonials updated!');
  await prisma.$disconnect();
}
update();
