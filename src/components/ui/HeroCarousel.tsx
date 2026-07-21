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
        }, 2500); // 2.5 seconds

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
