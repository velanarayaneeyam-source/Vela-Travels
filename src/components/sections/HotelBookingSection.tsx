"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Check, ArrowRight, BedDouble, Coffee, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

const hotels = [
    {
        id: "heritage-palace",
        name: "Heritage Wellness Palace",
        location: "Kumarakom Backwaters",
        rating: 5,
        reviews: 124,
        desc: "Experience regal luxury nestled in the serene backwaters. This heritage property combines traditional Kerala architecture with world-class wellness facilities.",
        image: "/hotel-5.jpg",
        amenities: [
            { icon: <BedDouble className="w-4 h-4" />, text: "Royal Suites" },
            { icon: <Coffee className="w-4 h-4" />, text: "Organic Dining" },
            { icon: <Wifi className="w-4 h-4" />, text: "High-speed WiFi" },
        ]
    },
    {
        id: "eco-retreat",
        name: "Backwater Eco-Retreat",
        location: "Alleppey",
        rating: 4.8,
        reviews: 89,
        desc: "Disconnect from the chaos and reconnect with nature. A fully sustainable eco-resort offering immersive Ayurvedic therapies surrounded by lush green landscapes.",
        image: "/hotel-2.jpg",
        amenities: [
            { icon: <BedDouble className="w-4 h-4" />, text: "Lakeview Villas" },
            { icon: <Check className="w-4 h-4" />, text: "Private Yoga Deck" },
            { icon: <Coffee className="w-4 h-4" />, text: "Ayurvedic Meals" },
        ]
    },
    {
        id: "beachfront-resort",
        name: "Beachfront Ayurveda Resort",
        location: "Varkala Beach",
        rating: 4.9,
        reviews: 210,
        desc: "Wake up to the sound of ocean waves. This premium clifftop resort offers exclusive sea-facing spa pavilions and sunset meditation sessions.",
        image: "/hotel-3.jpg",
        amenities: [
            { icon: <BedDouble className="w-4 h-4" />, text: "Ocean Suites" },
            { icon: <Check className="w-4 h-4" />, text: "Infinity Pool" },
            { icon: <Wifi className="w-4 h-4" />, text: "Premium Spa" },
        ]
    }
];

export const HotelBookingSection = () => {
    return (
        <section className="py-24 px-6 overflow-hidden bg-white dark:bg-slate-950 relative">
            <div className="absolute top-0 left-0 w-full h-[300px] bg-emerald-900/5 dark:bg-emerald-500/5 -skew-y-3 origin-top-left -z-10" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest text-xs uppercase mb-4 block"
                        >
                            Premium Accommodations
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white"
                        >
                            Stay in Luxury & Comfort
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-slate-600 dark:text-slate-400"
                        >
                            Complement your wellness journey with our handpicked selection of premium resorts and heritage hotels across Kerala.
                        </motion.p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {hotels.map((hotel, idx) => (
                        <motion.div
                            key={hotel.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-900/20 transition-all border border-slate-100 dark:border-white/5 flex flex-col hover:-translate-y-2 duration-300"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                {/* Using fallback image logic if the premium images don't exist yet */}
                                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
                                <Image
                                    src={hotel.image} // Using the image from the data object
                                    alt={hotel.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 z-10"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10" />
                                
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1 shadow-lg z-20">
                                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                    <span className="text-sm font-bold text-slate-900">{hotel.rating}</span>
                                </div>

                            </div>
                            
                            <div className="p-6 flex flex-col flex-grow">

                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                    {hotel.desc}
                                </p>
                                
                                <div className="space-y-3 mb-8">
                                    {hotel.amenities.map((amenity, i) => (
                                        <div key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                                {amenity.icon}
                                            </div>
                                            <span className="text-sm font-medium">{amenity.text}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <a 
                                        href={`https://wa.me/919207050525?text=Hi, I want to book the ${hotel.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-full gap-2 px-6 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white transition-all group/btn shadow-lg"
                                    >
                                        Book Your Stay
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
