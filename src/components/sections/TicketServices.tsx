
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, Bus, Plane, ArrowRight, X, MessageCircle, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CONTACT_INFO } from '@/lib/data';

const SERVICES = [
  {
    id: 'flight',
    title: 'Air Tickets',
    description: 'Domestic and International flight bookings at the most competitive rates. Secure your seat with your favorite airlines instantly.',
    icon: Plane,
    color: 'from-blue-500 to-indigo-600',
    shadow: 'shadow-blue-500/20'
  },
  {
    id: 'train',
    title: 'Train Tickets',
    description: 'Avoid the long queues. We offer seamless IRCTC train ticket bookings for all classes across India in just a few clicks.',
    icon: Train,
    color: 'from-orange-500 to-red-600',
    shadow: 'shadow-orange-500/20'
  },
  {
    id: 'bus',
    title: 'Bus Tickets',
    description: 'Book your luxury AC or sleeper bus tickets across all major routes. Experience comfort and safety on every journey.',
    icon: Bus,
    color: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/20'
  }
];

export const TicketServices = () => {
    const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

    const closeModal = () => setSelectedService(null);

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase"
                    >
                        Ultimate Travel Hub
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
                    >
                        Your One-Stop <span className="text-primary italic">Booking</span> Destination
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        Beyond tours and rentals, we manage every step of your travel. Save time and money with our seamless ticket booking services.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, type: 'spring', damping: 20 }}
                            whileHover={{ y: -8 }}
                            className="group relative"
                        >
                            <div className="h-full bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 border border-slate-200 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 flex flex-col">
                                {/* Icon Container */}
                                <div className={cn(
                                    "w-16 h-16 rounded-[1.5rem] flex items-center justify-center bg-gradient-to-br transition-all duration-500 group-hover:scale-110",
                                    service.color,
                                    service.shadow
                                )}>
                                    <service.icon className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-8 mb-4 tracking-tight group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                                    {service.description}
                                </p>

                                <motion.button 
                                    onClick={() => setSelectedService(service)}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 text-primary font-bold tracking-wide uppercase text-sm group/btn group-hover:gap-4 transition-all"
                                >
                                    Book Now
                                    <ArrowRight className="w-4 h-4 transition-transform" />
                                </motion.button>

                                {/* Decorative background number */}
                                <span className="absolute bottom-6 right-10 text-8xl font-black text-slate-500/5 select-none transition-all group-hover:text-primary/10">
                                    0{index + 1}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Booking Contact Modal */}
            <AnimatePresence>
                {selectedService && (
                    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-white/10"
                        >
                            <div className={cn("p-8 text-white bg-gradient-to-br", selectedService.color)}>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="p-3 bg-white/20 rounded-2xl">
                                        <selectedService.icon className="w-8 h-8" />
                                    </div>
                                    <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <h3 className="text-3xl font-black tracking-tight mb-2">Book Your {selectedService.title}</h3>
                                <p className="text-white/80 font-medium leading-relaxed italic">
                                    Choose your preferred way to contact our booking specialist.
                                </p>
                            </div>

                            <div className="p-8 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
                                <a 
                                    href={`https://wa.me/919207050525?text=Hi Vela Travels, I would like to book ${selectedService.title}. Please provide more information.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-emerald-500 transition-all group shadow-sm hover:shadow-emerald-500/10"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <MessageCircle className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm mb-1">WhatsApp Us</p>
                                            <p className="text-xs text-slate-500 font-medium text-emerald-600 font-bold tracking-tight">Direct to 9207050525</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-2 transition-all" />
                                </a>

                                <a 
                                    href={`tel:+919207050525`}
                                    className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-primary transition-all group shadow-sm hover:shadow-primary/10"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Phone className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm mb-1">Call Now</p>
                                            <p className="text-xs text-slate-500 font-medium font-bold text-primary tracking-tight">Talk to 9207050525</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                                </a>

                                <a 
                                    href="/contact"
                                    className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-slate-900 transition-all group shadow-sm"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Mail className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm mb-1">Inquiry Form</p>
                                            <p className="text-xs text-slate-500 font-medium">Send detailed request</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-2 transition-all" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

