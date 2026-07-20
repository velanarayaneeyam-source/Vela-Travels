const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const tour1 = await prisma.tour.findFirst({
        where: { title: { contains: "Nelliampathy" } }
    });

    const imageUrl = "https://scontent.fcok4-1.fna.fbcdn.net/v/t1.6435-9/183009287_1661813764014249_5929653511122873607_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1080&ctp=p526x296&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=qWdrNE-hkPAQ7kNvwGpifiO&_nc_oc=AdpCw8oI5m3E7GcZxW7wmbI91EzgT0O5uNYsXGm4mW9SC5Wh2PmqSp110hHZPckAn8A&_nc_zt=23&_nc_ht=scontent.fcok4-1.fna&_nc_gid=p5JDB-3TFp4CSEcdQPxmfg&_nc_ss=7a289&oh=00_AQCjrYq7Lz3nboeUAee8Xb2hjlvwZTQy21WQ-aHw2PqFjQ&oe=6A854D5B";

    if (tour1) {
        await prisma.tour.update({
            where: { id: tour1.id },
            data: { image: imageUrl }
        });
        console.log("Updated Nelliampathy Hills with user image link!");
    } else {
        console.log("Nelliampathy tour not found");
    }
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
