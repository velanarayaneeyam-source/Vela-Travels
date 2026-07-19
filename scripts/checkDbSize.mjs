import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkSize() {
  try {
    const result = await prisma.$queryRaw`SELECT pg_size_pretty(pg_database_size(current_database())) as size;`;
    console.log("Database Size:", result[0].size);
  } catch (e) {
    console.error("Error querying size:", e);
  } finally {
    await prisma.$disconnect();
  }
}
checkSize();
