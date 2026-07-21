"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const slides = [
    {
        id: 1,
        image: '/hotel-1.jpg',
        title: "Discover Kerala's Finest Stays",
        subtitle: "World-class hospitality meets traditional elegance. Experience the pinnacle of luxury."
    },
    {
        id: 2,
        image: '/hotel-2.jpg',
        title: "Ocean-View Luxury Suites",
        subtitle: "Wake up to the soothing sound of the waves and breathtaking panoramic views."
    },
    {
        id: 3,
        image: '/hotel-3.jpg',
        title: "Heritage Wellness Villas",
        subtitle: "Immerse yourself in authentic luxury, comfort, and centuries-old healing traditions."
    },
    {
        id: 4,
        image: '/hotel-4.jpg',
        title: "Eco-Friendly Sanctuaries",
        subtitle: "Sustainable retreats nestled in nature, offering absolute peace and tranquility."
    }
];

export const HotelHeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <section className="relative w-full h-[85vh] md:h-[95vh] overflow-hidden bg-slate-900">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slides[currentIndex].image}
                        alt={slides[currentIndex].title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-start z-10 px-6 max-w-7xl mx-auto">
                <div className="max-w-3xl pt-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-sm font-bold tracking-widest uppercase border border-white/20 mb-6">
                                Premium Hospitality
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 drop-shadow-xl">
                                {slides[currentIndex].title}
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-200 font-medium max-w-2xl leading-relaxed mb-10 drop-shadow-md">
                                {slides[currentIndex].subtitle}
                            </p>
                            
                            <a 
                                href="#book"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald-500 text-white font-bold text-lg tracking-wide hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/25 group"
                            >
                                Book a Consultation
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 right-10 z-20 flex gap-4">
                <button 
                    onClick={handlePrev}
                    className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                    onClick={handleNext}
                    className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-12 left-6 md:left-[50%] md:-translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`transition-all duration-500 rounded-full ${
                            currentIndex === idx 
                                ? 'w-12 h-2.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                                : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};
