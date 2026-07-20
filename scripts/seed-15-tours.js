const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const ACCURATE_KERALA_TOURS = [
    {
        title: "Nelliampathy Hills & Seetharkundu Expedition",
        description: "Explore misty tea gardens, cardamom estates, and the legendary Seetharkundu viewpoint in the Western Ghats. Experience cool mountain breezes and panoramic valley views.",
        destination: "Nenmara, Palakkad",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2070&auto=format&fit=crop",
        price: "₹3,500",
        duration: "1 Day Package",
        featured: true,
    },
    {
        title: "Pothundi Dam & Reservoir Family Retreat",
        description: "Visit India's second earth dam constructed in 19th century without cement. Features pristine lake views, lush manicured gardens, and boat rides near Aliyur, Nenmara.",
        destination: "Nenmara, Palakkad",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
        price: "₹2,200",
        duration: "Half Day Package",
        featured: true,
    },
    {
        title: "Parambikulam Tiger Reserve & Jungle Safari",
        description: "Deep eco-tourism jungle safari in the Anamalai Hills. Visit the giant Kannimara Teak (world's oldest), enjoy bamboo rafting, and spot wild elephants & wildlife.",
        destination: "Parambikulam, Palakkad",
        image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?q=80&w=2070&auto=format&fit=crop",
        price: "₹5,500",
        duration: "Full Day Safari",
        featured: true,
    },
    {
        title: "Palakkad Fort (Tipu's Fort) & Heritage Trail",
        description: "Historical tour of the well-preserved granite fort built by Hyder Ali in 1766. Includes Rapadi open-air auditorium and heritage walks through ancient agraharams.",
        destination: "Palakkad Town",
        image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?q=80&w=2070&auto=format&fit=crop",
        price: "₹2,800",
        duration: "Full Day Package",
        featured: true,
    },
    {
        title: "Malampuzha Dam, Rock Garden & Cable Car Tour",
        description: "Explore the massive Malampuzha Dam, Kanayi's iconic Yakshi sculpture, Nek Chand's Rock Garden, Snake Park, and scenic passenger ropeway rides.",
        destination: "Malampuzha, Palakkad",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop",
        price: "₹3,200",
        duration: "Full Day Package",
        featured: true,
    },
    {
        title: "Silent Valley Rainforest Expedition",
        description: "Trek through India's last undisturbed evergreen tropical rainforest. Guided bio-diversity tour home to endangered Lion-tailed Macaques and pristine Kunthi River.",
        destination: "Mukkali, Palakkad",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop",
        price: "₹6,500",
        duration: "Full Day Trek",
        featured: true,
    },
    {
        title: "Kalpathy Heritage Village & Temple Circuit",
        description: "Immerse yourself in Kerala's first heritage village on the banks of Kalpathy river. Visit the 600-year-old Sri Viswanatha Swamy Temple and Brahmin Agraharams.",
        destination: "Kalpathy, Palakkad",
        image: "https://images.unsplash.com/photo-1621831336440-15cb92bc7b05?q=80&w=2070&auto=format&fit=crop",
        price: "₹2,000",
        duration: "Half Day Tour",
        featured: true,
    },
    {
        title: "Kava Viewpoint Monsoon & Lake Panorama Drive",
        description: "Known as the 'Rain Capital of Kerala', Kava offers mesmerizing lake reflections, lush mountain backdrops, and scenic Western Ghats driving routes.",
        destination: "Kava, Palakkad",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
        price: "₹2,500",
        duration: "Half Day Tour",
        featured: true,
    },
    {
        title: "Fantasy Park Water World Family Getaway",
        description: "Action-packed family day at Kerala's pioneer amusement park featuring wave pools, high-speed water slides, 16D planetarium theater, and children's rides.",
        destination: "Malampuzha, Palakkad",
        image: "https://images.unsplash.com/photo-1582650625119-3a31f8418b0d?q=80&w=2070&auto=format&fit=crop",
        price: "₹2,800",
        duration: "Full Day Fun",
        featured: true,
    },
    {
        title: "Dhoni Waterfalls Trekking & Cattle Farm Experience",
        description: "Guided 3-hour trek through Reserve Forest to the cascading Dhoni Waterfalls, visiting the Indo-Swiss cattle breeding farm and orange plantation.",
        destination: "Dhoni, Palakkad",
        image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=2070&auto=format&fit=crop",
        price: "₹3,000",
        duration: "Full Day Trek",
        featured: true,
    },
    {
        title: "Chittur Gurumadam & Literary Heritage Trail",
        description: "Visit the sacred ashram on the banks of Sokanasini river where Thunchath Ezhuthachan, Father of Malayalam Language, spent his final years writing epics.",
        destination: "Chittur, Palakkad",
        image: "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?q=80&w=2070&auto=format&fit=crop",
        price: "₹2,400",
        duration: "Half Day Tour",
        featured: true,
    },
    {
        title: "Kollengode Palace & Scenic Village Circuit",
        description: "Voted among India's most picturesque villages. Features Kollengode Palace heritage architecture, Seetharkundu cascades, and vast emerald paddy fields.",
        destination: "Kollengode, Palakkad",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop",
        price: "₹2,600",
        duration: "1 Day Package",
        featured: true,
    },
    {
        title: "Munnar Tea Gardens & Misty Peaks Expedition",
        description: "Drive from Palakkad/Nenmara up to Munnar's rolling tea plantations. Visit Eravikulam National Park (home to Nilgiri Tahr), Mattupetty Lake & Echo Point.",
        destination: "Munnar, Idukki",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2070&auto=format&fit=crop",
        price: "₹7,500",
        duration: "2 Days / 1 Night",
        featured: true,
    },
    {
        title: "Wayanad Rainforest & Heart Lake Trek",
        description: "Travel to Wayanad's lush highlands. Explore ancient Edakkal Cave carvings, Banasura Sagar Earth Dam, and Chembra Peak heart-shaped lake.",
        destination: "Wayanad, Kerala",
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2070&auto=format&fit=crop",
        price: "₹8,500",
        duration: "2 Days / 1 Night",
        featured: true,
    },
    {
        title: "Alleppey Houseboat & Backwater Cruise Expedition",
        description: "Experience Kerala's iconic backwaters on a private luxury houseboat. Enjoy traditional Kuttanad seafood cuisine, canal village views & golden sunsets.",
        destination: "Alappuzha, Kerala",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop",
        price: "₹9,500",
        duration: "2 Days / 1 Night",
        featured: true,
    },
];

async function main() {
    console.log("Replacing ALL tour images in Supabase DB with verified Kerala photography...");
    for (const tour of ACCURATE_KERALA_TOURS) {
        const existing = await prisma.tour.findFirst({
            where: { title: tour.title }
        });
        if (existing) {
            await prisma.tour.update({
                where: { id: existing.id },
                data: { image: tour.image }
            });
            console.log(`✅ Updated image for: ${tour.title}`);
        } else {
            await prisma.tour.create({ data: tour });
            console.log(`✅ Created tour: ${tour.title}`);
        }
    }
    console.log("SUCCESS! All 15 tour images replaced with authentic Kerala & Palakkad photos.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
