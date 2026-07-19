"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Car, Shield, Clock, X, ImageIcon, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export interface Vehicle {
    id: string;
    name: string;
    desc: string;
    thumb: string;
    images: { src: string; alt: string }[];
}

interface VehicleRentalsProps {
    settings: Record<string, string>;
}

export const VehicleRentals = ({ settings }: VehicleRentalsProps) => {
    const vehicles: Vehicle[] = [
        {
            id: 'suv',
            name: 'Premium SUV',
            desc: 'Travel in style with our luxury 5-seater.',
            thumb: settings.homeVehicle1Image || '/premium-car.png',
            images: [
                { src: settings.homeVehicle1Image || '/premium-car.png', alt: 'Exterior View' },
                { src: '/suv-interior-front.png', alt: 'Front Interior & Dashboard' },
                { src: '/suv-interior-rear.png', alt: 'Rear Seating & Sunroof' }
            ]
        },
        {
            id: 'traveller',
            name: 'Force Traveller',
            desc: 'Perfect for group tours and corporate trips.',
            thumb: settings.homeVehicle2Image || '/hero-traveller.png',
            images: [
                { src: settings.homeVehicle2Image || '/hero-traveller.png', alt: 'Exterior View' },
                { src: '/traveller-interior.png', alt: 'Spacious Interior' }
            ]
        }
    ];

    const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null);
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [zoom, setZoom] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const openGallery = (vehicle: Vehicle) => {
        setActiveVehicle(vehicle);
        setActiveImageIdx(0);
        setZoom(1);
    };

    const closeGallery = () => {
        setActiveVehicle(null);
        setZoom(1);
    };

    return (
        <section className="py-24 px-6 overflow-hidden bg-slate-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block"
                        >
                            Premium Fleet
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black tracking-tight"
                        >
                            Explore Our Vehicles
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <Button href="/cars" variant="outline" className="group">
                            View Full Fleet
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {vehicles.map((vehicle, i) => (
                        <motion.div
                            key={vehicle.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-xl cursor-pointer group"
                            onClick={() => openGallery(vehicle)}
                        >
                            <Image
                                src={vehicle.thumb}
                                alt={vehicle.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                                <div>
                                    <h3 className="text-white font-bold text-2xl mb-2">{vehicle.name}</h3>
                                    <p className="text-slate-200 text-sm">{vehicle.desc}</p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/30 text-white hover:bg-white/30 transition-colors flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5" />
                                    <span className="text-sm font-bold">View Gallery</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Interactive 360/Zoom Gallery Modal */}
            <AnimatePresence>
                {activeVehicle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10">
                            <div>
                                <h3 className="text-white text-2xl font-bold">{activeVehicle.name} - Detailed View</h3>
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
                                    src={activeVehicle.images[activeImageIdx].src}
                                    alt={activeVehicle.images[activeImageIdx].alt}
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
                        <div className="bg-slate-900/80 backdrop-blur-md border-t border-white/10 p-4 md:p-6 pb-8">
                            <div className="flex gap-4 overflow-x-auto justify-center">
                                {activeVehicle.images.map((img, i) => (
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
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
