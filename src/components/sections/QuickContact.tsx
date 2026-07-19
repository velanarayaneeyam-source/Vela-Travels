"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, ChevronRight } from 'lucide-react';
import { CONTACT_INFO } from "@/lib/data";

interface QuickContactProps {
  settings: any;
}

export const QuickContact = ({ settings }: QuickContactProps) => {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-[#020617]">
      {/* Advanced Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block py-2 px-6 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6"
          >
            Tailor-Made Journeys
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Don't see what you're <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">looking for?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            We specialize in <span className="text-white">custom itineraries</span> and group tours. <br className="hidden md:block"/>
            Contact us directly to build your dream trip from scratch.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Phone Card */}
          <motion.a 
            href={`tel:${settings.phone || CONTACT_INFO.phone}`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative h-72 rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
            
            <div className="relative h-full p-10 flex flex-col justify-between z-10">
              <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all duration-500">
                <Phone className="w-8 h-8" />
              </div>
              <div>
                <div className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-2">Speak to an Expert</div>
                <div className="text-3xl md:text-4xl font-black text-white tracking-widest leading-none">
                  {settings.phone || CONTACT_INFO.phone}
                </div>
              </div>
            </div>
            
            {/* Animated Shine */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />
          </motion.a>

          {/* WhatsApp Card */}
          <motion.a 
            href={`https://wa.me/${settings.whatsapp || CONTACT_INFO.whatsapp}`}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative h-72 rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-800" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />

            <div className="relative h-full p-10 flex flex-col justify-between z-10">
              <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-emerald-600 transition-all duration-500">
                <MessageCircle className="w-9 h-9" />
              </div>
              <div>
                <div className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-2">Instant Support</div>
                <div className="text-3xl md:text-4xl font-black text-white tracking-widest leading-none flex items-center gap-3">
                  WhatsApp Us <ChevronRight className="w-8 h-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </div>
              </div>
            </div>

            {/* Animated Shine */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />
          </motion.a>
        </div>
        
        <div className="mt-12 text-center text-slate-600 font-black text-xs uppercase tracking-[0.5em] opacity-50">
          Available 24/7 for Global Inquiries
        </div>
      </div>
    </section>
  );
};
