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

                    {/* 4 Feature Cards Grid with Bright, Colorful Light Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        
                        {/* Card 1: Hill Station & Eco Tours (Fresh Emerald Light Card) */}
                        <div className="group relative bg-emerald-50/90 border-2 border-emerald-300 hover:border-emerald-600 p-8 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2.5 overflow-hidden shadow-xl shadow-emerald-500/10">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-3xl mb-6 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                                🌲
                            </div>
                            <h3 className="text-2xl font-black text-emerald-950 mb-3 tracking-tight">
                                Hill Station & Eco Tours
                            </h3>
                            <p className="text-emerald-900 text-sm font-semibold leading-relaxed mb-8">
                                Explore Nelliampathy Hills, Seetharkundu viewpoint, tea estates & Pothundi Dam with expert guidance.
                            </p>
                            <a 
                                href="/contact" 
                                className="inline-flex items-center gap-2 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 px-6 py-3.5 rounded-2xl transition-all uppercase tracking-wider shadow-lg shadow-emerald-600/30"
                            >
                                Explore Routes &rarr;
                            </a>
                        </div>

                        {/* Card 2: Premium Car & Cab Rentals (Vibrant Royal Blue Light Card) */}
                        <div className="group relative bg-blue-50/90 border-2 border-blue-300 hover:border-blue-600 p-8 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2.5 overflow-hidden shadow-xl shadow-blue-500/10">
                            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-3xl mb-6 shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                                🚗
                            </div>
                            <h3 className="text-2xl font-black text-blue-950 mb-3 tracking-tight">
                                Car & Cab Rental Fleet
                            </h3>
                            <p className="text-blue-900 text-sm font-semibold leading-relaxed mb-8">
                                Toyota Innova Crysta, Suzuki Ertiga, Swift Dzire & Tempo Travellers available with AC for outstation trips.
                            </p>
                            <a 
                                href="/cars" 
                                className="inline-flex items-center gap-2 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 px-6 py-3.5 rounded-2xl transition-all uppercase tracking-wider shadow-lg shadow-blue-600/30"
                            >
                                View Cabs Fleet &rarr;
                            </a>
                        </div>

                        {/* Card 3: Temple & Heritage Tours (Warm Amber Light Card) */}
                        <div className="group relative bg-amber-50/90 border-2 border-amber-300 hover:border-amber-600 p-8 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2.5 overflow-hidden shadow-xl shadow-amber-500/10">
                            <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-white text-3xl mb-6 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                                🛕
                            </div>
                            <h3 className="text-2xl font-black text-amber-950 mb-3 tracking-tight">
                                Pilgrimage & Heritage
                            </h3>
                            <p className="text-amber-900 text-sm font-semibold leading-relaxed mb-8">
                                Comfortable spiritual journeys to Guruvayur, Palani, Sabarimala & Chottanikara with family packages.
                            </p>
                            <a 
                                href="/contact" 
                                className="inline-flex items-center gap-2 text-xs font-black text-white bg-amber-600 hover:bg-amber-700 px-6 py-3.5 rounded-2xl transition-all uppercase tracking-wider shadow-lg shadow-amber-600/30"
                            >
                                Book Pilgrimage &rarr;
                            </a>
                        </div>

                        {/* Card 4: Airport & Outstation Pickup (Radiant Purple Light Card) */}
                        <div className="group relative bg-purple-50/90 border-2 border-purple-300 hover:border-purple-600 p-8 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2.5 overflow-hidden shadow-xl shadow-purple-500/10">
                            <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center text-white text-3xl mb-6 shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform">
                                ✈️
                            </div>
                            <h3 className="text-2xl font-black text-purple-950 mb-3 tracking-tight">
                                Airport Transfers 24/7
                            </h3>
                            <p className="text-purple-900 text-sm font-semibold leading-relaxed mb-8">
                                Timely airport pickup and drop for Cochin International (COK) & Coimbatore Airport (CJB).
                            </p>
                            <a 
                                href="/contact" 
                                className="inline-flex items-center gap-2 text-xs font-black text-white bg-purple-600 hover:bg-purple-700 px-6 py-3.5 rounded-2xl transition-all uppercase tracking-wider shadow-lg shadow-purple-600/30"
                            >
                                Book Airport Taxi &rarr;
                            </a>
                        </div>
                    </div>

                    {/* Popular Routes Pills Bar (Bright Light Theme) */}
                    <div className="bg-slate-50 border-2 border-slate-200 p-8 md:p-10 rounded-[2.5rem] text-center space-y-6 shadow-xl">
                        <p className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                            <span>🔥</span> Popular Destinations & Taxi Routes from Nenmara
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {[
                                { name: 'Nelliampathy Hills' },
                                { name: 'Pothundi Dam' },
                                { name: 'Seetharkundu Viewpoint' },
                                { name: 'Malampuzha Dam' },
                                { name: 'Parambikulam Tiger Reserve' },
                                { name: 'Cochin Airport Drop' },
                                { name: 'Guruvayur Temple' },
                                { name: 'Munnar Backwaters' }
                            ].map((route) => (
                                <span 
                                    key={route.name} 
                                    className="px-5 py-3 rounded-2xl bg-white hover:bg-primary border-2 border-slate-200 hover:border-primary text-slate-800 hover:text-white font-extrabold text-xs tracking-wide shadow-md transition-all cursor-default flex items-center gap-2"
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
