const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { key: 'site_name' },
    update: { value: 'Vela Travels' },
    create: { key: 'site_name', value: 'Vela Travels' }
  });
  console.log('Updated site_name to Vela Travels');
}

main().catch(console.error).finally(() => prisma.$disconnect());
