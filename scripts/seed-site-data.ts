import { prisma } from '../src/lib/db';
import { TESTIMONIALS, CONTACT_INFO } from '../src/lib/data';

async function main() {
    console.log('Seeding database...');

    // Seed Testimonials
    for (const t of TESTIMONIALS) {
        await prisma.testimonial.upsert({
            where: { id: t.id },
            update: {},
            create: {
                id: t.id,
                name: t.name,
                role: t.role,
                content: t.content,
                image: t.image,
            }
        });
    }
    console.log('Testimonials seeded.');

    // Seed Site Settings
    const settings = [
        { key: 'phone', value: CONTACT_INFO.phone },
        { key: 'whatsapp', value: CONTACT_INFO.whatsapp },
        { key: 'email', value: CONTACT_INFO.email },
        { key: 'address', value: CONTACT_INFO.address },
        { key: 'googleMapsEmbed', value: CONTACT_INFO.googleMapsEmbed },
        { key: 'heroTitle', value: 'Explore Amazing Destinations' },
        { key: 'heroSubtitle', value: 'Embark on unforgettable journeys with our curated tour packages. From serene mountain peaks to vibrant cityscapes, we bring the world to you.' }
    ];

    for (const s of settings) {
        await prisma.siteSettings.upsert({
            where: { key: s.key },
            update: { value: s.value },
            create: s
        });
    }
    console.log('Site Settings seeded.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
