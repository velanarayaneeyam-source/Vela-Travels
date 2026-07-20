import React, { Suspense } from 'react';
import { Search, MapPin, Clock, Phone, MessageCircle } from 'lucide-react';
import { TourCard } from '@/components/ui/TourCard';
import { SearchInput } from '@/components/ui/SearchInput';
import { prisma } from '@/lib/db';
import { getSiteSettings } from '@/lib/settings';
import { CONTACT_INFO, TOURS } from '@/lib/data';
import { SectionSkeleton } from '@/components/ui/Skeletons';

export const dynamic = 'force-dynamic';

async function ToursContent({ search }: { search?: string }) {
    const tours = await prisma.tour.findMany({
        where: search ? {
            OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { destination: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ],
        } : {},
        orderBy: { createdAt: 'desc' },
        take: 100
    });

    if (tours.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-900/40 rounded-[2.5rem] border border-white/5 p-8">
                <p className="text-slate-400 font-bold text-lg mb-2">No tour packages uploaded yet.</p>
                <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Log in to your <a href="/veela-travels-2026/tours/new" className="text-primary hover:underline">Admin Panel</a> to upload custom tour packages with your own photos!
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
            ))}
        </div>
    );
}

async function ContactCTA() {
    const settings = await getSiteSettings();
    return (
        <div className="mt-20 relative px-4">
            {/* Background Decorative Mesh Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative bg-white/10 backdrop-blur-3xl p-10 md:p-14 rounded-[3rem] text-center max-w-4xl mx-auto border border-white/40 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.05)] overflow-hidden group">
                {/* Internal Glass Shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/20 rounded-full blur-3xl pointer-events-none" />

                <span className="relative z-10 inline-block py-1.5 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                    Custom Rental Plans
                </span>
                
                <h2 className="relative z-10 text-3xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight leading-tight">
                    Don't see what you're <br/> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">looking for?</span>
                </h2>
                
                <p className="relative z-10 text-slate-600 mb-10 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
                    We specialize in <span className="text-primary font-bold">custom vehicle rentals</span> and corporate fleet services. Contact us directly to arrange your customized transportation plan.
                </p>
                
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                    {/* Glassic Button 1 */}
                    <a 
                        href={`tel:${settings.phone || CONTACT_INFO.phone}`} 
                        className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary transition-all shadow-xl shadow-slate-900/20"
                    >
                        <Phone className="w-5 h-5 mr-1" />
                        {settings.phone || CONTACT_INFO.phone}
                    </a>
                    
                    <div className="text-slate-300 font-bold text-xs uppercase tracking-widest hidden sm:block">OR</div>
                    
                    {/* Glassic Button 2 */}
                    <a 
                        href={`https://wa.me/${settings.whatsapp || CONTACT_INFO.whatsapp}`} 
                        className="flex items-center gap-3 bg-white/40 backdrop-blur-md border border-white/60 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:border-primary hover:text-primary transition-all shadow-lg"
                    >
                        <MessageCircle className="w-6 h-6 text-[#25D366]" />
                        WhatsApp Us
                    </a>
                </div>
            </div>
        </div>
    );
}

export default async function ToursPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    const { search } = await searchParams;

    return (
        <main className="min-h-screen pt-48 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                            Explore Your <span className="text-primary">Dream Destinations</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Discover and book the most unforgettable tour packages for your next adventure.
                        </p>
                    </div>

                    <SearchInput
                        defaultValue={search}
                        className="w-full md:w-96"
                    />
                </div>

                <Suspense fallback={<SectionSkeleton count={6} />}>
                    <ToursContent search={search} />
                </Suspense>

                {/* --- Rich Colorful Variety Section: Tours & Car Rental Showcase --- */}
                <div className="mt-28 space-y-20">
                    
                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-primary/10 to-blue-500/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.25em]">
                            ✨ Variety & Custom Services
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                            Everything You Need for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-500 to-blue-600">Kerala Travel</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg">
                            From scenic hill station getaways to luxury cab rentals with experienced local drivers in Nenmara & Palakkad.
                        </p>
                    </div>

                    {/* 4 Feature Cards Grid with Rich Colorful Full Gradients */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        
                        {/* Card 1: Hill Station & Eco Tours (Vibrant Emerald Gradient) */}
                        <div className="group relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-900 border-2 border-emerald-400/40 p-8 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2.5 overflow-hidden shadow-2xl shadow-emerald-600/30">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-3xl mb-6 shadow-inner border border-white/30 group-hover:scale-110 transition-transform">
                                🌲
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3 tracking-tight drop-shadow-md">
                                Hill Station & Eco Tours
                            </h3>
                            <p className="text-emerald-50 text-sm font-medium leading-relaxed mb-8 drop-shadow-sm">
                                Explore Nelliampathy Hills, Seetharkundu viewpoint, tea estates & Pothundi Dam with expert guidance.
                            </p>
                            <a 
                                href="/contact" 
                                className="inline-flex items-center gap-2 text-xs font-black text-white bg-white/20 hover:bg-white hover:text-emerald-950 px-5 py-3 rounded-xl border border-white/30 transition-all uppercase tracking-wider shadow-lg"
                            >
                                Explore Routes &rarr;
                            </a>
                        </div>

                        {/* Card 2: Premium Car & Cab Rentals (Vibrant Royal Blue Gradient) */}
                        <div className="group relative bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-900 border-2 border-blue-400/40 p-8 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2.5 overflow-hidden shadow-2xl shadow-blue-600/30">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-3xl mb-6 shadow-inner border border-white/30 group-hover:scale-110 transition-transform">
                                🚗
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3 tracking-tight drop-shadow-md">
                                Car & Cab Rental Fleet
                            </h3>
                            <p className="text-blue-50 text-sm font-medium leading-relaxed mb-8 drop-shadow-sm">
                                Toyota Innova Crysta, Suzuki Ertiga, Swift Dzire & Tempo Travellers available with AC for outstation trips.
                            </p>
                            <a 
                                href="/cars" 
                                className="inline-flex items-center gap-2 text-xs font-black text-white bg-white/20 hover:bg-white hover:text-blue-950 px-5 py-3 rounded-xl border border-white/30 transition-all uppercase tracking-wider shadow-lg"
                            >
                                View Cabs Fleet &rarr;
                            </a>
                        </div>

                        {/* Card 3: Temple & Heritage Tours (Vibrant Amber & Sunset Orange Gradient) */}
                        <div className="group relative bg-gradient-to-br from-amber-500 via-orange-600 to-amber-900 border-2 border-amber-400/40 p-8 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2.5 overflow-hidden shadow-2xl shadow-amber-600/30">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-3xl mb-6 shadow-inner border border-white/30 group-hover:scale-110 transition-transform">
                                🛕
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3 tracking-tight drop-shadow-md">
                                Pilgrimage & Heritage
                            </h3>
                            <p className="text-amber-50 text-sm font-medium leading-relaxed mb-8 drop-shadow-sm">
                                Comfortable spiritual journeys to Guruvayur, Palani, Sabarimala & Chottanikara with family packages.
                            </p>
                            <a 
                                href="/contact" 
                                className="inline-flex items-center gap-2 text-xs font-black text-white bg-white/20 hover:bg-white hover:text-amber-950 px-5 py-3 rounded-xl border border-white/30 transition-all uppercase tracking-wider shadow-lg"
                            >
                                Book Pilgrimage &rarr;
                            </a>
                        </div>

                        {/* Card 4: Airport & Outstation Pickup (Vibrant Purple & Fuchsia Gradient) */}
                        <div className="group relative bg-gradient-to-br from-purple-600 via-fuchsia-600 to-indigo-900 border-2 border-purple-400/40 p-8 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2.5 overflow-hidden shadow-2xl shadow-purple-600/30">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-3xl mb-6 shadow-inner border border-white/30 group-hover:scale-110 transition-transform">
                                ✈️
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3 tracking-tight drop-shadow-md">
                                Airport Transfers 24/7
                            </h3>
                            <p className="text-purple-50 text-sm font-medium leading-relaxed mb-8 drop-shadow-sm">
                                Timely airport pickup and drop for Cochin International (COK) & Coimbatore Airport (CJB).
                            </p>
                            <a 
                                href="/contact" 
                                className="inline-flex items-center gap-2 text-xs font-black text-white bg-white/20 hover:bg-white hover:text-purple-950 px-5 py-3 rounded-xl border border-white/30 transition-all uppercase tracking-wider shadow-lg"
                            >
                                Book Airport Taxi &rarr;
                            </a>
                        </div>
                    </div>

                    {/* Popular Routes Pills Bar (Rich High-Contrast Slate & Primary Theme) */}
                    <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-2 border-primary/40 p-8 md:p-10 rounded-[2.5rem] text-center space-y-6 shadow-2xl">
                        <p className="text-sm font-black text-primary uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                            <span>🔥</span> Popular Destinations & Taxi Routes from Nenmara
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {[
                                { name: 'Nelliampathy Hills', color: 'from-emerald-500 to-teal-600' },
                                { name: 'Pothundi Dam', color: 'from-teal-500 to-emerald-600' },
                                { name: 'Seetharkundu Viewpoint', color: 'from-blue-500 to-indigo-600' },
                                { name: 'Malampuzha Dam', color: 'from-indigo-500 to-purple-600' },
                                { name: 'Parambikulam Tiger Reserve', color: 'from-emerald-600 to-green-700' },
                                { name: 'Cochin Airport Drop', color: 'from-purple-500 to-pink-600' },
                                { name: 'Guruvayur Temple', color: 'from-amber-500 to-orange-600' },
                                { name: 'Munnar Backwaters', color: 'from-cyan-500 to-blue-600' }
                            ].map((route) => (
                                <span 
                                    key={route.name} 
                                    className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-primary border border-white/20 text-white font-bold text-xs tracking-wide shadow-lg hover:shadow-primary/50 transition-all cursor-default flex items-center gap-2"
                                >
                                    📍 {route.name}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 rounded-[3rem] mt-20" />}>
                    <ContactCTA />
                </Suspense>
            </div>
        </main>
    );
}
