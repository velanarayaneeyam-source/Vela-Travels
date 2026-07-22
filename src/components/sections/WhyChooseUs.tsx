"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShieldCheck, Zap, Globe2, HeadphonesIcon } from 'lucide-react';

const FEATURES = [
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "Well-Maintained Fleet",
        description: "Your safety is our top priority. All our vehicles are regularly serviced and thoroughly inspected."
    },
    {
        icon: <Globe2 className="w-8 h-8" />,
        title: "Professional Drivers",
        description: "Our experienced and courteous drivers ensure a smooth, safe, and pleasant journey."
    },
    {
        icon: <Zap className="w-8 h-8" />,
        title: "Fast Booking",
        description: "Quick and easy vehicle booking via phone or WhatsApp. No complex forms needed."
    },
    {
        icon: <HeadphonesIcon className="w-8 h-8" />,
        title: "24/7 Support",
        description: "We're here for you at any time, before, during, and after your trip."
    }
];

export const WhyChooseUs = () => {
    return (
        <section className="py-24 px-6 bg-slate-950 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block"
                        >
                            The Premium Rental Advantage
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black tracking-tight mb-8 leading-tight"
                        >
                            Why Hundreds of Travelers <br />
                            Choose Our Vehicles
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-slate-400 text-lg mb-12 leading-relaxed max-w-lg"
                        >
                            We don't just rent vehicles; we provide comfortable, reliable transportation that makes your journey unforgettable. Our premium fleet ensures every trip is tailored to your needs.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {FEATURES.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="space-y-4"
                                >
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-secondary border border-white/10">
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-xl font-bold">{feature.title}</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="aspect-square relative rounded-[3rem] overflow-hidden">
                            <Image
                                src="/vela 9.jpg"
                                alt="Comfortable Vehicle Journey"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        </div>

                        {/* Floating Card */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl max-w-xs hidden md:block"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                                    4.9
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-900">Average Rating</h5>
                                    <p className="text-xs text-slate-600 uppercase font-bold">Google Reviews</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed italic">
                                "Outstanding service from start to finish. Best vehicle rental service in town!"
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
