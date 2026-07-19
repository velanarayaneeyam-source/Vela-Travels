"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Flower2, Sparkles, HeartPulse, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

const features = [
  {
    icon: <Flower2 className="w-6 h-6 text-pink-500" />,
    title: "Ayurvedic Treatments",
    desc: "Ancient healing therapies with traditional herbs and oils."
  },
  {
    icon: <Sparkles className="w-6 h-6 text-purple-500" />,
    title: "Luxury Spa",
    desc: "Premium spa services in a serene, relaxing environment."
  },
  {
    icon: <HeartPulse className="w-6 h-6 text-rose-500" />,
    title: "Therapeutic Massage",
    desc: "Deep tissue, Swedish, and reflexology massages."
  },
  {
    icon: <Droplets className="w-6 h-6 text-teal-500" />,
    title: "Wellness Packages",
    desc: "Holistic retreats designed to rejuvenate mind and body."
  }
];

export const SpaAndWellness = () => {
  return (
    <section className="py-24 px-6 overflow-hidden bg-white dark:bg-slate-950 relative">
      {/* Background colorful blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20 z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-pink-300 blur-[100px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[30%] h-[50%] rounded-full bg-purple-300 blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[20%] h-[30%] rounded-full bg-teal-200 blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-pink-600 dark:text-pink-400 font-bold tracking-widest text-xs uppercase mb-4 block flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Rejuvenate Your Soul
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 bg-clip-text text-transparent"
            >
              Spa & Ayurveda Retreat
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 dark:text-slate-300 mb-8"
            >
              Escape the hustle and discover profound relaxation. We offer premium spa experiences, traditional Ayurvedic therapies, and therapeutic massages designed to restore your inner balance.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button href="/ayurveda" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-pink-500/30 rounded-full px-8 py-6 text-lg">
                Explore Treatments
              </Button>
            </motion.div>
          </div>

          {/* Image Collage */}
          <div className="relative h-[600px] w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute top-0 right-0 w-[80%] h-[70%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 z-10"
            >
              <Image 
                src="/spa-retreat.png" 
                alt="Luxury Spa Retreat" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">Premium Spa</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute bottom-0 left-0 w-[65%] h-[55%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 z-20"
            >
              <Image 
                src="/ayurveda.png" 
                alt="Ayurvedic Treatment" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-lg font-bold">Ayurvedic Therapies</h3>
              </div>
            </motion.div>

            {/* Decorative element */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-30 pointer-events-none"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-70">
                <path id="textPath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text className="text-[11px] font-bold fill-purple-600 dark:fill-purple-400 uppercase tracking-[4px]">
                  <textPath href="#textPath" startOffset="0%">
                    RELAX • REJUVENATE • RESTORE • 
                  </textPath>
                </text>
              </svg>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
