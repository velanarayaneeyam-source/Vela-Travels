"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Plane, Users, MapPin, Globe, Star, Car, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CONTACT_INFO } from '@/lib/data';

interface HeroSectionProps {
    settings: Record<string, string>;
}

export const HeroSection = ({ settings }: HeroSectionProps) => {
    const title = settings.heroTitle || "Premium Traveller & Vehicle Rentals";
    const subtitle = settings.heroSubtitle || "Travel together in comfort and style. Whether it's a family getaway, corporate trip, or group tour, we provide the perfect vehicles for your journey.";
    const heroImage = settings.heroImageUrl || "/hero-traveller.png";

    return (
        <section className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-44 sm:pt-52 md:pt-44 gpu-boost bg-slate-950">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-[50vh] sm:h-full">
                    <Image
                        src={heroImage}
                        alt="Travel Background"
                        fill
                        className="object-cover object-center sm:object-[center_30%] scale-100 transition-opacity duration-700 brightness-[1.08]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-20" />
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center justify-center pt-4 sm:pt-8 md:pt-16 pb-12 md:pb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border-white/20 text-white mb-6 md:mb-8 shadow-xl bg-black/40 backdrop-blur-md"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                        <span className="text-xs sm:text-sm font-extrabold tracking-wider flex items-center gap-2 text-white">
                            <Plane className="w-4 h-4 text-pink-400" />
                            YOUR JOURNEY STARTS HERE
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-[1.1] drop-shadow-2xl"
                    >
                        {settings.heroTitle ? (
                            <span dangerouslySetInnerHTML={{ 
                                __html: settings.heroTitle
                                    .replace(/Amazing/gi, '<span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 font-black drop-shadow-[0_0_25px_rgba(236,72,153,0.9)]">Amazing</span>')
                                    .replace(/Traveller/gi, '<span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 font-black drop-shadow-[0_0_25px_rgba(236,72,153,0.9)]">Traveller</span>')
                                    .replace(/Vehicles/gi, '<span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 font-black drop-shadow-[0_0_25px_rgba(236,72,153,0.9)]">Vehicles</span>') 
                            }} />
                        ) : (
                            <>Vela Travels <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 font-black drop-shadow-[0_0_25px_rgba(236,72,153,0.9)]">Premium Vehicle Rent</span> & Tours</>
                        )}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base sm:text-lg md:text-xl text-slate-100 max-w-3xl mx-auto mb-6 md:mb-8 font-bold leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]"
                    >
                        {subtitle}
                    </motion.p>

                    {/* License Plate Overlay "Book Vehicle" Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mb-8 relative z-30 flex flex-col items-center"
                    >
                        <a
                            href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent("Hi Vela Travels! I would like to book the flower decorated vehicle.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white font-black text-sm md:text-base uppercase tracking-wider shadow-[0_0_30px_rgba(245,158,11,0.7)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/40 backdrop-blur-xl"
                            title="Covering vehicle number plate - Click to Book Flower Decorated Vehicle"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                            </span>
                            <Car className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
                            <span>BOOK VEHICLE</span>
                            <span className="px-2.5 py-1 text-[10px] bg-black/50 text-amber-300 rounded-lg font-mono border border-amber-400/40 uppercase tracking-widest">
                                KL-REGISTERED
                            </span>
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-10 md:mb-14 relative z-20"
                    >
                        <Button
                            href="/cars"
                            size="lg"
                            className="w-full sm:w-auto px-10 group bg-white text-slate-900 border-none hover:bg-white/90"
                        >
                            Rent a Vehicle
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <motion.a
                            href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hi, I would like to inquire about renting a vehicle.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-8 py-3 rounded-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-colors shadow-[0_0_15px_rgba(37,211,102,0.5)]"
                        >
                            <MessageCircle className="w-5 h-5 animate-pulse" />
                            WhatsApp Us
                        </motion.a>

                        <motion.a
                            href={`tel:${CONTACT_INFO.phone}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-8 py-3 rounded-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                        >
                            <Phone className="w-5 h-5 animate-bounce" />
                            Call Now
                        </motion.a>
                    </motion.div>
                </div>

                {/* 2026 Colorful Modern UI Address Showcase Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="w-full max-w-6xl mx-auto mb-16 relative z-20"
                >
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-slate-900/95 via-slate-950/98 to-slate-900/95 border-2 border-pink-500/30 p-6 md:p-8 shadow-[0_0_50px_rgba(236,72,153,0.2)] backdrop-blur-2xl">
                        {/* Futuristic Glow Orbs */}
                        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                            <div className="text-center lg:text-left space-y-2 max-w-md">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-400 text-xs font-black uppercase tracking-widest">
                                    <MapPin className="w-3.5 h-3.5 text-pink-400 animate-bounce" />
                                    2026 HUBS & PICKUP POINTS
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                    Our Express Pickup <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300">Address Locations</span>
                                </h3>
                                <p className="text-xs md:text-sm text-slate-300 font-medium">
                                    24/7 Doorstep Pickup & Drop Available Across All Nearby Locations
                                </p>
                            </div>

                            {/* 2026 Address Chips Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-auto">
                                {[
                                    { label: "Vadakanjerry", icon: "📍", gradient: "from-pink-500/20 via-rose-500/20 to-pink-500/10 border-pink-500/50 text-pink-300" },
                                    { label: "Cherupushpam School", icon: "🏫", gradient: "from-purple-500/20 via-indigo-500/20 to-purple-500/10 border-purple-500/50 text-purple-300" },
                                    { label: "Nenamra Bus stand", icon: "🚌", gradient: "from-amber-500/20 via-orange-500/20 to-amber-500/10 border-amber-500/50 text-amber-300" },
                                    { label: "NSS College", icon: "🎓", gradient: "from-emerald-500/20 via-teal-500/20 to-emerald-500/10 border-emerald-500/50 text-emerald-300" }
                                ].map((loc, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.05, y: -4 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        className={`bg-gradient-to-br ${loc.gradient} border-2 backdrop-blur-xl p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg transition-all duration-300 group cursor-pointer hover:shadow-2xl`}
                                    >
                                        <span className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">{loc.icon}</span>
                                        <span className="text-xs md:text-sm font-black tracking-wide leading-snug">{loc.label}</span>
                                        <span className="mt-1.5 text-[9px] uppercase tracking-widest font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/90">
                                            Service Hub
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Animated Scroll Prompt */}
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: [0, 8, 0] }}
                    transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center justify-center gap-3 pointer-events-none mb-8"
                >
                    <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)] bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm">
                        Scroll to Explore Our Premium Fleet
                    </span>
                    <div className="flex flex-col items-center">
                        <div className="w-1 h-10 bg-gradient-to-b from-secondary to-transparent rounded-full shadow-[0_0_20px_rgba(236,72,153,0.8)]" />
                        <div className="mt-[-4px] animate-bounce">
                            <svg className="w-6 h-6 text-secondary drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="w-full pb-8 md:pb-0 relative z-20">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 px-0 md:px-4">
                        {[
                            { label: "Happy Travelers", value: "10k+", icon: <Users className="w-5 h-5 text-blue-400" />, glow: "bg-blue-400/30" },
                            { label: "Premium Vehicles", value: "50+", icon: <Car className="w-5 h-5 text-emerald-400" />, glow: "bg-emerald-400/30" },
                            { label: "Cities Covered", value: "30+", icon: <MapPin className="w-5 h-5 text-purple-400" />, glow: "bg-purple-400/30" },
                            { label: "Trust Rating", value: "4.9/5", icon: <Star className="w-5 h-5 text-pink-400" />, glow: "bg-pink-400/30" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10, scale: 1.05 }}
                                transition={{
                                    opacity: { delay: 0.8 + i * 0.1 },
                                    y: { type: "spring", stiffness: 300, damping: 20 },
                                    scale: { duration: 0.2 }
                                }}
                                className="group relative gpu-boost"
                            >
                                <div className={`absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${stat.glow}`} />
                                <div className="relative h-full backdrop-blur-sm md:backdrop-blur-3xl bg-white/10 border border-white/20 p-4 md:p-6 rounded-3xl flex flex-col items-center justify-center text-center overflow-hidden">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                                        {stat.icon}
                                    </div>
                                    <div className="text-xl md:text-4xl font-black text-white md:text-pink-500 mb-1 md:mb-2 tracking-tight">
                                        {stat.value}
                                    </div>
                                    <div className="text-[8px] md:text-xs text-slate-300 md:text-pink-400 font-black uppercase tracking-[0.2em]">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
