const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const updated = await prisma.user.updateMany({
        where: {
            username: "adminvela"
        },
        data: {
            email: "velanarayaneeyam@gmail.com"
        }
    });
    console.log("Updated admin email count:", updated.count);

    const user = await prisma.user.findFirst({
        where: { username: "adminvela" }
    });
    console.log("=== UPDATED ADMIN USER RECORD ===");
    console.log(JSON.stringify(user, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
