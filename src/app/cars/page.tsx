
import React, { Suspense } from 'react';
import { Search, Car as CarIcon, Info, ShieldCheck, Sparkles, Clock, MapPin } from 'lucide-react';
import { CarCard } from '@/components/ui/CarCard';
import { SearchInput } from '@/components/ui/SearchInput';
import { prisma } from '@/lib/db';
import { getSiteSettings } from '@/lib/settings';
import { CONTACT_INFO } from '@/lib/data';
import { CarCardSkeleton } from '@/components/ui/Skeletons';
import { FaqSection } from '@/components/seo/FaqSection';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const revalidate = 3600;

async function CarsContent({ search }: { search?: string }) {
    const [cars, settings] = await Promise.all([
        prisma.car.findMany({
            where: search ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { details: { contains: search, mode: 'insensitive' } },
                ],
            } : {},
            orderBy: { createdAt: 'desc' },
            take: 100
        }),
        getSiteSettings()
    ]);

    if (cars.length === 0) {
        return (
            <div className="py-32 text-center rounded-[3rem] border border-dashed border-white/5 bg-white/[0.02]">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <CarIcon className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No vehicles found</h3>
                <p className="text-slate-500">Try adjusting your search filters or check back later.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cars.map((car) => (
                <CarCard key={car.id} car={car} settings={settings} />
            ))}
        </div>
    );
}

async function CarsCTA() {
    const settings = await getSiteSettings();
    return (
        <div className="mt-32 relative group overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] group-hover:bg-primary/30 transition-colors duration-700" />
            <div className="relative bg-slate-900/50 backdrop-blur-2xl border border-white/5 p-16 md:p-24 rounded-[4rem] flex flex-col items-center text-center">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                    Need a Custom <span className="text-primary italic">Transfer?</span>
                </h2>
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                    Whether it's an airport transfer, a corporate event, or a wedding, our fleet is at your service. Contact our logistics team now.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6">
                    <a 
                        href={`https://wa.me/${settings.whatsapp || CONTACT_INFO.whatsapp}`}
                        className="px-10 py-5 bg-white text-black hover:bg-primary hover:text-white rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300"
                    >
                        Get Instant Quote
                    </a>
                    <a 
                        href={`tel:${settings.phone || CONTACT_INFO.phone}`}
                        className="px-10 py-5 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300"
                    >
                        Call Concierge
                    </a>
                </div>
            </div>
        </div>
    );
}

export default async function CarsPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    const { search } = await searchParams;

    return (
        <main className="min-h-screen pt-48 pb-24 px-6 bg-[#020617]">
            <div className="max-w-7xl mx-auto">
                <div className="relative mb-20">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-end justify-between gap-12 relative z-10">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                <CarIcon className="w-3.5 h-3.5" />
                                Premium Fleet
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                                Travel in <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">Ultimate</span> Comfort
                            </h1>
                            <p className="text-slate-400 text-xl md:text-2xl leading-relaxed">
                                Choose from our premium selection of vehicles for your tours and transfers. All vehicles are maintained to the highest standards.
                            </p>
                        </div>

                        <div className="w-full md:w-auto">
                            <SearchInput
                                defaultValue={search}
                                placeholder="Search by car or spec..."
                                className="w-full md:w-96"
                            />
                        </div>
                    </div>
                </div>

                {/* Premium Features Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                    {[
                        { icon: ShieldCheck, title: 'Fully Insured', desc: 'Comprehensive coverage for total peace of mind on the road' },
                        { icon: Sparkles, title: 'Pristine Clean', desc: 'Sanitized, detailed, and thoroughly inspected before every trip' },
                        { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock concierge and roadside assistance' },
                        { icon: MapPin, title: 'Doorstep Delivery', desc: 'We deliver your chosen vehicle directly to your location' },
                    ].map((feature, i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/5 hover:border-white/10 transition-all duration-300 group shadow-2xl shadow-black/50">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-blue-500/20 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-primary/20">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-white text-lg font-black tracking-wide mb-3">{feature.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* --- Premium Fleet Showcase Banner (Matching Reference Screenshot 2) --- */}
                <div className="mb-24 relative bg-gradient-to-br from-[#0b1d3a] via-[#122c54] to-[#0c383a] border-2 border-emerald-500/40 rounded-[3.5rem] p-8 md:p-16 overflow-hidden shadow-2xl shadow-blue-900/40">
                    {/* Floating Decorative Elements: Planes, Palms, Compass */}
                    <div className="absolute top-6 right-10 text-3xl opacity-60 animate-bounce pointer-events-none">✈️</div>
                    <div className="absolute bottom-6 left-8 text-4xl opacity-30 pointer-events-none">🌴</div>
                    <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                        
                        {/* Left Text & CTAs (Bold Orange & Crisp White Typography) */}
                        <div className="lg:col-span-7 space-y-6">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-[0.2em]">
                                🚗 Premium Taxi & Rental Fleet
                            </span>

                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                                Best <span className="text-amber-400">Car Rental & Taxi Fleet</span> For Travel Booking
                            </h2>

                            <p className="text-slate-300 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                                Toyota Innova Crysta, Suzuki Ertiga, Swift Dzire, and Tempo Travellers for outstation trips, airport transfers, and hill station packages in Nenmara & Palakkad.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-4">
                                <a
                                    href="https://wa.me/919207050525"
                                    className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-black rounded-2xl text-sm uppercase tracking-wider shadow-xl shadow-teal-500/30 transition-all flex items-center gap-2"
                                >
                                    Book Your Fleet Now &rarr;
                                </a>
                                <a
                                    href="tel:+919207050525"
                                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-extrabold rounded-2xl text-sm uppercase tracking-wider backdrop-blur-md transition-all"
                                >
                                    Call Concierge 24/7
                                </a>
                            </div>
                        </div>

                        {/* Right Multi-Device Mockup Cards (Matching Image 2 Badge & Device Grid) */}
                        <div className="lg:col-span-5 relative space-y-4">
                            
                            {/* Top Badge Pills Bar (Flex Wrap so all badges are visible) */}
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-4 py-2 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold flex items-center gap-1.5">
                                    ✈️ Airport Transfers
                                </span>
                                <span className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold flex items-center gap-1.5">
                                    🏨 Doorstep Pickup
                                </span>
                                <span className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                                    📍 Palakkad & Nenmara
                                </span>
                            </div>

                            {/* Main Interactive Fleet Mockup Card */}
                            <div className="bg-slate-900/90 border-2 border-white/15 p-6 rounded-3xl backdrop-blur-xl space-y-4 shadow-2xl">
                                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                    <span className="text-xs font-black text-amber-400 uppercase tracking-widest">🚗 Featured Fleet</span>
                                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">⭐ 4.9 Verified Cabs</span>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-black text-white">Toyota Innova Crysta</div>
                                            <div className="text-xs text-slate-400">7-Seater Luxury AC Cab</div>
                                        </div>
                                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-extrabold">AC Outstation</span>
                                    </div>

                                    <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-black text-white">Suzuki Ertiga / Dzire</div>
                                            <div className="text-xs text-slate-400">Family Sedan & MPV</div>
                                        </div>
                                        <span className="px-3 py-1.5 rounded-xl bg-blue-500/20 text-blue-300 text-xs font-extrabold">Best Rates</span>
                                    </div>

                                    <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-black text-white">Tempo Traveller (12-26 Seater)</div>
                                            <div className="text-xs text-slate-400">Group & Wedding Fleet</div>
                                        </div>
                                        <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 text-xs font-extrabold">Group Tours</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <Suspense fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[...Array(3)].map((_, i) => <CarCardSkeleton key={i} />)}
                    </div>
                }>
                    <CarsContent search={search} />
                </Suspense>

                <FaqSection
                    title="Nenmara & Palakkad Car Rental FAQs"
                    subtitle="Common questions about self-drive rentals, taxi fares, airport pickups, and booking policies."
                />

                <Suspense fallback={<div className="h-96 animate-pulse bg-white/5 rounded-[4rem] mt-32" />}>
                    <CarsCTA />
                </Suspense>
            </div>
        </main>
    );
}
