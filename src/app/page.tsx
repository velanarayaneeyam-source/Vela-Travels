export const dynamic = 'force-dynamic';
import { Suspense } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedTours } from "@/components/sections/FeaturedTours";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { QuickContact } from "@/components/sections/QuickContact";
import { VehicleRentals } from "@/components/sections/VehicleRentals";
import { SpaAndWellness } from "@/components/sections/SpaAndWellness";
import { AyurvedicTreatments } from "@/components/sections/AyurvedicTreatments";
import { prisma } from "@/lib/db";
import { getSiteSettings, getTestimonials } from "@/lib/settings";
import { SectionSkeleton } from "@/components/ui/Skeletons";

export const revalidate = 0; // Disable cache to show fresh content instantly

async function FeaturedToursData() {
    const tours = await prisma.tour.findMany({
        where: { featured: true },
        take: 3
    });
    return <FeaturedTours tours={tours} />;
}

async function VehicleRentalsWrapper() {
    const settings = await getSiteSettings();
    return <VehicleRentals settings={settings} />;
}

async function TestimonialsData() {
    const testimonials = await getTestimonials();
    return <Testimonials testimonials={testimonials} />;
}

async function HeroWrapper() {
  const settings = await getSiteSettings();
  return <HeroSection settings={settings} />;
}

async function QuickContactWrapper() {
  const settings = await getSiteSettings();
  return <QuickContact settings={settings} />;
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Suspense fallback={<div className="min-h-screen bg-slate-900 animate-pulse" />}>
        <HeroWrapper />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse" />}>
        <VehicleRentalsWrapper />
      </Suspense>

      <SpaAndWellness />

      <AyurvedicTreatments />

      <WhyChooseUs />

      <Suspense fallback={<div className="h-96" />}>
        <TestimonialsData />
      </Suspense>

      <Suspense fallback={<div className="h-48 bg-slate-100 animate-pulse" />}>
        <QuickContactWrapper />
      </Suspense>
    </main>
  );
}
