const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const toUpsert = [
    { key: 'contact_email', value: 'velanarayaneeyam@gmail.com' },
    { key: 'email', value: 'velanarayaneeyam@gmail.com' }
  ];

  for (const item of toUpsert) {
    await prisma.siteSettings.upsert({
      where: { key: item.key },
      update: { value: item.value },
      create: { key: item.key, value: item.value }
    });
  }

  const newSettings = await prisma.siteSettings.findMany();
  console.log('New settings:', newSettings);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
