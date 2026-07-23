"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CarouselImage } from '@prisma/client';
import { cn } from '@/lib/utils';

interface HeroCarouselProps {
    images: CarouselImage[];
    heightClass?: string;
    containerClass?: string;
}

export function HeroCarouselClient({ images, heightClass = "h-[60vh] md:h-[80vh]", containerClass = "w-full" }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 1800); // 1.8 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    if (images.length === 0) return null;

    const currentImage = images[currentIndex];

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section className={cn(`relative ${heightClass} overflow-hidden bg-slate-950 my-16`, containerClass)}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Blurred Background to fill empty space */}
                    <img 
                        src={currentImage.imageUrl} 
                        alt="Background Blur" 
                        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110"
                    />
                    
                    {/* Main uncropped image */}
                    <img 
                        src={currentImage.imageUrl} 
                        alt="Hero Carousel Image" 
                        className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
                    />
                    
                    <div className="absolute inset-0 bg-black/10" /> {/* Very light overlay */}

                    {/* Book Vehicle License Plate Badge Button Overlay */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
                        <a
                            href={`https://wa.me/919207050525?text=${encodeURIComponent("Hi Vela Travels! I would like to book this vehicle.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(245,158,11,0.7)] hover:scale-105 transition-all duration-300 border-2 border-white/40 backdrop-blur-xl flex items-center gap-2.5"
                            title="Covering vehicle license plate - Click to Book"
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                            <span>BOOK VEHICLE</span>
                            <span className="px-2 py-0.5 text-[9px] bg-black/50 text-amber-300 rounded font-mono border border-amber-400/40">
                                KL-OFFICIAL
                            </span>
                        </a>
                    </div>
                </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
                <>
                    <button 
                        onClick={goToPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors z-10 hidden md:block"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors z-10 hidden md:block"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={cn(
                                    "w-3 h-3 rounded-full transition-all",
                                    currentIndex === idx ? "bg-white scale-110" : "bg-white/40 hover:bg-white/60"
                                )}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
