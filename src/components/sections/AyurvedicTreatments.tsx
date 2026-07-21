"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplet, Sparkles, Wind, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

const treatments = [
    {
        id: "abhyanga",
        title: "Abhyanga Massage",
        desc: "A full-body massage using warm, medicated herbal oils to nourish the skin, mobilize toxins, and deeply relax the nervous system.",
        icon: <Droplet className="w-8 h-8 text-teal-500" />,
        image: "/abhyanga.png",
        duration: "60 / 90 mins",
        price: "From ₹2,500"
    },
    {
        id: "shirodhara",
        title: "Shirodhara",
        desc: "A continuous, gentle pouring of warm herbal oil over the forehead to induce a profound state of relaxation and mental clarity.",
        icon: <Wind className="w-8 h-8 text-purple-500" />,
        image: "/shirodhara.png",
        duration: "45 mins",
        price: "₹3,000"
    },
    {
        id: "udvartana",
        title: "Udvartana",
        desc: "An invigorating full-body massage using herbal powders. Excellent for exfoliating the skin, improving circulation, and weight management.",
        icon: <Leaf className="w-8 h-8 text-green-500" />,
        image: "/udvartana.png",
        duration: "60 mins",
        price: "₹2,800"
    },
    {
        id: "panchakarma",
        title: "Panchakarma Detox",
        desc: "A comprehensive detoxification program tailored to your body type, designed to cleanse the body of deep-rooted toxins and restore balance.",
        icon: <Sparkles className="w-8 h-8 text-pink-500" />,
        image: "/panchakarma.png",
        duration: "Multiple Days",
        price: "Custom Package"
    }
];

export const AyurvedicTreatments = () => {
    return (
        <section className="py-24 px-6 overflow-hidden bg-slate-50 dark:bg-slate-900 relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-teal-600 dark:text-teal-400 font-bold tracking-widest text-xs uppercase mb-4 block"
                    >
                        Holistic Healing
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black tracking-tight mb-6"
                    >
                        Signature Treatments
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-600 dark:text-slate-400"
                    >
                        Experience the ancient wisdom of Ayurveda. Our authentic therapies are designed to balance your doshas, detoxify your body, and bring profound peace to your mind.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {treatments.map((treatment, idx) => (
                        <motion.div
                            key={treatment.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-700 relative group flex flex-col hover:-translate-y-2"
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={treatment.image}
                                    alt={treatment.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md rounded-xl p-2 border border-white/20">
                                    {React.cloneElement(treatment.icon, { className: "w-6 h-6 text-white" })}
                                </div>
                            </div>
                            
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {treatment.title}
                                </h3>
                                
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
                                    {treatment.desc}
                                </p>
                                
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end items-end mt-auto">
                                <div className="text-right">
                                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</span>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{treatment.duration}</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Button href="/ayurveda" variant="outline" className="w-full group/btn">
                                    Book Session
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
