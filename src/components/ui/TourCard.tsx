"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tour } from '@prisma/client';
import { logContactClick } from '@/lib/actions';
import { CONTACT_INFO } from '@/lib/data';

export const TourCard = ({ tour }: { tour: Tour }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -12 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="group relative bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden border border-slate-200/50 dark:border-white/10 shadow-2xl hover:shadow-primary/10 transition-all duration-500"
        >
            {/* Mirror Shine Effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-shine pointer-events-none" />

            <div className="relative h-72 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-40" />
                
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-5 py-2 rounded-2xl text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest shadow-xl flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-primary" />
                        {tour.destination}
                    </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-1.5 text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1 drop-shadow-md">
                            <Clock className="w-3 h-3" />
                            {tour.duration}
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-lg leading-tight">
                            {tour.title}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="p-8 flex flex-col h-full">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-2 mb-8 leading-relaxed">
                    {tour.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price per person</span>
                        <span className="text-2xl font-black text-primary tracking-tighter">{tour.price}</span>
                    </div>
                    
                    <div className="flex gap-3">
                        <a
                            href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                            onClick={() => logContactClick('whatsapp', 'Tour Card')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 hover:scale-110 shadow-lg shadow-emerald-500/20 transition-all duration-300"
                            title="WhatsApp for Booking"
                        >
                            <MessageCircle className="w-6 h-6" />
                        </a>
                        <Link
                            href={`/tours/${tour.id}`}
                            className="w-12 h-12 flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl hover:bg-primary dark:hover:bg-primary dark:hover:text-white hover:scale-110 shadow-lg transition-all duration-300"
                            title="View Details"
                        >
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
