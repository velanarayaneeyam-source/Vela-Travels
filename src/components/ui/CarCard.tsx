"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Car as CarIcon, IndianRupee, Phone, MessageCircle, Info, ImageIcon, X, ZoomIn, ZoomOut, Settings2, Users, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car } from '@prisma/client';
import { logContactClick } from '@/lib/actions';
import { CONTACT_INFO } from '@/lib/data';

interface CarCardProps {
    car: Car;
    settings?: Record<string, string>;
}

export const CarCard = ({ car, settings }: CarCardProps) => {
    const whatsapp = settings?.whatsapp || CONTACT_INFO.whatsapp;
    const phone = settings?.phone || CONTACT_INFO.phone;

    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [zoom, setZoom] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const getGalleryImages = () => {
        const images = [{ src: car.image || "/placeholder-car.jpg", alt: "Exterior View" }];
        
        if (car.images && car.images.length > 0) {
            car.images.forEach((img, idx) => {
                images.push({ src: img, alt: `Gallery Image ${idx + 1}` });
            });
        } else {
            const nameStr = car.name.toLowerCase();
            if (nameStr.includes("suv") || nameStr.includes("range") || nameStr.includes("premium")) {
                images.push({ src: '/suv-interior-front.png', alt: 'Front Interior & Dashboard' });
                images.push({ src: '/suv-interior-rear.png', alt: 'Rear Seating & Sunroof' });
            } else if (nameStr.includes("traveller") || nameStr.includes("force") || nameStr.includes("van")) {
                images.push({ src: '/traveller-interior.png', alt: 'Spacious Interior' });
            }
        }
        
        return images;
    };

    const galleryImages = getGalleryImages();

    const openGallery = () => {
        setIsGalleryOpen(true);
        setActiveImageIdx(0);
        setZoom(1);
    };

    const closeGallery = () => {
        setIsGalleryOpen(false);
        setZoom(1);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative bg-[#0f172a]/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all duration-500"
            >
                <div 
                    className="relative h-72 w-full overflow-hidden bg-[#0f172a] cursor-pointer"
                    onClick={openGallery}
                >
                    <Image
                        src={car.image || "/placeholder-car.jpg"}
                        alt={car.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/20 to-transparent opacity-60" />
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/50 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 text-white flex items-center gap-2">
                            <ImageIcon className="w-5 h-5" />
                            <span className="font-bold tracking-widest text-sm uppercase">View Gallery</span>
                        </div>
                    </div>
                    
                    {car.hourlyPrice && (
                        <div className="absolute top-6 right-6">
                            <span className="bg-primary px-5 py-2 rounded-2xl text-xs font-black text-white shadow-xl shadow-primary/20 flex items-center gap-2">
                                <IndianRupee className="w-3.5 h-3.5" />
                                {car.hourlyPrice}
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <CarIcon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors cursor-pointer" onClick={openGallery}>
                            {car.name}
                        </h3>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                        <span className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 font-medium shadow-inner">
                            <Settings2 className="w-3 h-3 text-primary" /> {car.transmission || "Automatic"}
                        </span>
                        <span className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 font-medium shadow-inner">
                            <Users className="w-3 h-3 text-primary" /> {car.seats || "5 Seats"}
                        </span>
                        <span className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 font-medium shadow-inner">
                            <Wind className="w-3 h-3 text-primary" /> {car.ac || "Dual A/C"}
                        </span>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex gap-3">
                            <div className="mt-1">
                                <Info className="w-4 h-4 text-slate-500" />
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                                {car.details}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                        <a
                            href={`https://wa.me/${whatsapp}?text=Hi, I'm interested in booking the ${car.name}.`}
                            onClick={() => logContactClick('whatsapp', `Car: ${car.name}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/10"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                        </a>
                        <a
                            href={`tel:${phone}`}
                            onClick={() => logContactClick('phone', `Car: ${car.name}`)}
                            className="p-4 bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black rounded-2xl transition-all"
                            title="Call for Booking"
                        >
                            <Phone className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Interactive Zoomable Gallery Modal */}
            <AnimatePresence>
                {isGalleryOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10">
                            <div>
                                <h3 className="text-white text-2xl font-bold">{car.name} - Detailed View</h3>
                                <p className="text-slate-300 text-sm">Drag to pan, use controls to zoom.</p>
                            </div>
                            <button 
                                onClick={closeGallery}
                                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Interactive Viewer */}
                        <div className="flex-1 relative overflow-hidden flex items-center justify-center cursor-move" ref={containerRef}>
                            <motion.div
                                drag
                                dragConstraints={containerRef}
                                dragElastic={0.2}
                                animate={{ scale: zoom }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="relative w-full h-full max-w-6xl max-h-[70vh] mx-auto"
                            >
                                <Image
                                    src={galleryImages[activeImageIdx].src}
                                    alt={galleryImages[activeImageIdx].alt}
                                    fill
                                    className="object-contain pointer-events-none"
                                />
                            </motion.div>

                            {/* Zoom Controls */}
                            <div className="absolute right-6 bottom-32 flex flex-col gap-2 z-10">
                                <button 
                                    onClick={() => setZoom(prev => Math.min(prev + 0.5, 4))}
                                    className="p-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-full text-white transition-colors shadow-lg"
                                >
                                    <ZoomIn className="w-6 h-6" />
                                </button>
                                <button 
                                    onClick={() => setZoom(prev => Math.max(prev - 0.5, 1))}
                                    className="p-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-full text-white transition-colors shadow-lg"
                                >
                                    <ZoomOut className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {galleryImages.length > 1 && (
                            <div className="bg-slate-900/80 backdrop-blur-md border-t border-white/10 p-4 md:p-6 pb-8">
                                <div className="flex gap-4 overflow-x-auto justify-center">
                                    {galleryImages.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setActiveImageIdx(i);
                                                setZoom(1);
                                            }}
                                            className={`relative w-32 h-24 rounded-xl overflow-hidden shrink-0 transition-all ${activeImageIdx === i ? 'ring-2 ring-primary scale-105 opacity-100' : 'opacity-50 hover:opacity-100'}`}
                                        >
                                            <Image
                                                src={img.src}
                                                alt={img.alt}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                                                <p className="text-white text-[10px] font-bold truncate">{img.alt}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
