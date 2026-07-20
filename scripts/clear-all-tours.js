const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log("Removing all tour records and images from Supabase DB...");
    const deleted = await prisma.tour.deleteMany({});
    console.log(`Deleted ${deleted.count} tour records from database.`);
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
