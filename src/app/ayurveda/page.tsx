import React from 'react';
import Image from 'next/image';
import { Leaf, Droplets, Heart, Sparkles, Phone, ArrowRight, CheckCircle2, Star, Shield } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AyurvedaPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-12 overflow-hidden font-sans">
            {/* Hero Section */}
            <section className="relative px-6 py-20 lg:py-32 max-w-7xl mx-auto">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold tracking-widest uppercase border border-emerald-100 dark:border-emerald-500/20">
                            <Leaf className="w-4 h-4" />
                            Authentic Kerala Wellness
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                            Rejuvenate Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                                Mind, Body & Soul
                            </span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                            Experience the ancient healing traditions of Kerala. Our curated Ayurvedic treatments and spa retreats are designed to restore your natural balance and vitality.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <a 
                                href="https://wa.me/919207050525?text=Hi Vela Travels, I would like to know more about your Ayurveda & Spa packages." 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-white font-bold tracking-wide hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/25 group"
                            >
                                Book a Consultation
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000">
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-900/20 border border-white/10">
                            <Image 
                                src="/ayurveda.png" 
                                alt="Authentic Kerala Ayurveda Treatment" 
                                fill 
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                priority
                            />
                        </div>
                        
                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/10 animate-bounce">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Certified</p>
                                    <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm">Therapists</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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

            {/* Treatments Section */}
            <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">Our Signature Treatments</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Tailored therapies to detoxify, de-stress, and revitalize.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 transition-all shadow-lg shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 duration-300 flex flex-col">
                            <div className="w-14 h-14 bg-teal-50 dark:bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Droplets className="w-7 h-7 text-teal-600 dark:text-teal-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Shirodhara</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">A continuous stream of warm herbal oil poured gently on the forehead. Perfect for relieving stress, anxiety, and improving sleep quality.</p>
                            <span className="text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2 cursor-pointer group-hover:text-teal-700 dark:group-hover:text-teal-300">
                                Book This Therapy <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>

                        <div className="group bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 transition-all shadow-lg shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 duration-300 flex flex-col">
                            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Heart className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Abhyanga Massage</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">A full-body massage using warm medicated oils. It nourishes the skin, improves circulation, and pacifies the Vata dosha for deep relaxation.</p>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2 cursor-pointer group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                                Book This Therapy <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>

                        <div className="group bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 transition-all shadow-lg shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 duration-300 flex flex-col">
                            <div className="w-14 h-14 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Leaf className="w-7 h-7 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Panchakarma</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">The ultimate mind-body healing experience. A comprehensive 14-21 day detox program that cleanses toxins and restores immune function.</p>
                            <span className="text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2 cursor-pointer group-hover:text-orange-700 dark:group-hover:text-orange-300">
                                Book This Therapy <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
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
        </div>
    );
}
