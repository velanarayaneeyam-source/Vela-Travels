import React from 'react';
import Image from 'next/image';
import { Leaf, Droplets, Heart, Sparkles, Phone, ArrowRight, CheckCircle2, Star, Shield } from 'lucide-react';
import { AyurvedicTreatments } from '@/components/sections/AyurvedicTreatments';
import { HotelBookingSection } from '@/components/sections/HotelBookingSection';
import { HotelHeroCarousel } from '@/components/sections/HotelHeroCarousel';
export const dynamic = 'force-dynamic';

export default function AyurvedaPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-12 overflow-hidden font-sans">
            <HotelHeroCarousel />

            <div id="booking-section">
                <HotelBookingSection />
            </div>


            {/* Core Benefits Section (New) */}
            <section className="py-20 px-6 bg-emerald-950 text-emerald-50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center mb-4">
                            <Shield className="w-6 h-6 text-emerald-300" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Boost Immunity</h3>
                        <p className="text-emerald-200/80 leading-relaxed text-sm">Traditional herbal remedies and detox therapies naturally strengthen your immune system.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center mb-4">
                            <Heart className="w-6 h-6 text-emerald-300" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Stress Relief</h3>
                        <p className="text-emerald-200/80 leading-relaxed text-sm">Specialized massages and essential oils melt away anxiety and calm the nervous system.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center mb-4">
                            <Droplets className="w-6 h-6 text-emerald-300" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Deep Detox</h3>
                        <p className="text-emerald-200/80 leading-relaxed text-sm">Panchakarma treatments cleanse toxins from the cellular level, restoring inner balance.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center mb-4">
                            <Sparkles className="w-6 h-6 text-emerald-300" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Skin Rejuvenation</h3>
                        <p className="text-emerald-200/80 leading-relaxed text-sm">Ayurvedic facials and body scrubs using organic ingredients for a natural, youthful glow.</p>
                    </div>
                </div>
            </section>


            {/* Immersive Gallery Section (New) */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">A Glimpse of Wellness</h2>
                    <p className="text-slate-600 dark:text-slate-400">Immerse yourself in the serene environment of our authentic healing centers.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[500px]">
                    <div className="relative rounded-3xl overflow-hidden md:col-span-2 shadow-xl group min-h-[300px]">
                        <Image src="/kerala_retreat.png" alt="Kerala Nature Retreat" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-white font-bold text-xl">Eco-friendly Nature Retreats</p>
                            <p className="text-white/80 text-sm">Experience healing surrounded by Kerala's lush greenery</p>
                        </div>
                    </div>
                    <div className="grid grid-rows-2 gap-6">
                        <div className="relative rounded-3xl overflow-hidden shadow-xl group min-h-[200px]">
                            <Image src="/ayurveda_herbs.png" alt="Ayurvedic Herbs and Oils" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-white font-bold">100% Organic Ingredients</p>
                            </div>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden shadow-xl group min-h-[200px]">
                            <Image src="/yoga.png" alt="Yoga and Meditation" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-white font-bold">Guided Yoga & Meditation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Kerala Section */}
            <section className="py-12 px-6 max-w-7xl mx-auto">
                <div className="bg-slate-900 dark:bg-slate-900 rounded-[3rem] overflow-hidden relative border border-slate-800 dark:border-white/10 shadow-2xl">
                    <div className="absolute inset-0 opacity-40">
                        <Image 
                            src="/spa-retreat.png" 
                            alt="Spa Retreat" 
                            fill 
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
                    </div>
                    
                    <div className="relative z-10 p-12 lg:p-20 max-w-3xl">
                        <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">Why Ayurveda in Kerala?</h2>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                                <span className="text-slate-300 text-lg"><strong>Ideal Climate:</strong> The cool monsoons and equable climate are perfectly suited for Ayurveda's restorative programs.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                                <span className="text-slate-300 text-lg"><strong>Rich Biodiversity:</strong> Home to dense forests with an abundance of rare medicinal plants and herbs used in authentic treatments.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                                <span className="text-slate-300 text-lg"><strong>Generational Expertise:</strong> Practitioners trace their lineage back centuries, preserving the true essence of the ancient science.</span>
                            </li>
                        </ul>
                        
                        <a 
                            href="tel:919207050525" 
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-slate-900 font-bold uppercase tracking-widest hover:bg-emerald-50 transition-colors"
                        >
                            <Phone className="w-5 h-5 text-emerald-600" />
                            Call to Plan Your Retreat
                        </a>
                    </div>
                </div>
            </section>

            <AyurvedicTreatments />
        </div>
    );
}
