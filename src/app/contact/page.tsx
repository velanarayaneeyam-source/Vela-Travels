import React, { Suspense } from "react";
import { ContactForm } from "@/components/sections/ContactForm";
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { CONTACT_INFO } from "@/lib/data";
import { getSiteSettings } from "@/lib/settings";

export const revalidate = 3600;

async function ContactContent() {
    const settings = await getSiteSettings();
    const phone = settings.phone || CONTACT_INFO.phone;
    const whatsapp = settings.whatsapp || CONTACT_INFO.whatsapp;
    const email = settings.email || CONTACT_INFO.email;
    const address = settings.address || CONTACT_INFO.address;
    const map = settings.googleMapsEmbed || CONTACT_INFO.googleMapsEmbed;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Details */}
            <div className="lg:col-span-1 space-y-8">
                <div className="bg-white dark:bg-slate-900/80 p-8 md:p-12 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-[0_32px_64px_-16px_rgba(37,99,235,0.08)] group hover:-translate-y-2 transition-all duration-700 backdrop-blur-xl">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-12 tracking-tight">Contact Information</h3>
                    
                    <div className="space-y-8">
                        <a 
                            href={`tel:${phone}`} 
                            className="flex items-center gap-6 group/item"
                        >
                            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white group-hover/item:scale-110 transition-all duration-500">
                                <Phone className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Call Us</p>
                                <p className="font-black text-xl text-slate-800 dark:text-slate-200 tracking-tight">{phone}</p>
                            </div>
                        </a>

                        <a 
                            href={`https://wa.me/${whatsapp}`} 
                            target="_blank"
                            className="flex items-center gap-6 group/item"
                        >
                            <div className="w-14 h-14 bg-[#25D366]/10 text-[#25D366] rounded-2xl flex items-center justify-center group-hover/item:bg-[#25D366] group-hover/item:text-white group-hover/item:scale-110 transition-all duration-500">
                                <MessageCircle className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-[0.2em] mb-1">WhatsApp</p>
                                <p className="font-black text-xl text-slate-800 dark:text-slate-200 tracking-tight">Message Now</p>
                            </div>
                        </a>

                        <div className="flex items-center gap-6 group/item">
                            <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl flex items-center justify-center group-hover/item:bg-slate-900 group-hover/item:text-white group-hover/item:scale-110 transition-all duration-500">
                                <Mail className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Email Us</p>
                                <p className="font-black text-xl text-slate-800 dark:text-slate-200 tracking-tight">{email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 group/item">
                            <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl flex items-center justify-center group-hover/item:bg-slate-900 group-hover/item:text-white group-hover/item:scale-110 transition-all duration-500">
                                <Clock className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-[0.2em] mb-1">Working Hours</p>
                                <p className="font-black text-xl text-slate-800 dark:text-slate-200 tracking-tight italic text-slate-500 font-medium">Mon - Sat: 9AM - 6PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/80 p-8 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-[0_32px_64px_-16px_rgba(37,99,235,0.08)] group hover:-translate-y-2 transition-all duration-700 backdrop-blur-xl">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-4 tracking-tight">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <MapPin className="text-primary w-6 h-6" />
                        </div>
                        Office Location
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium pl-2">
                        {address}
                    </p>
                    <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700 shadow-inner">
                        <iframe
                            src={map}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Contact Form & Trust Section */}
            <div className="lg:col-span-2 space-y-12">
                <ContactForm />
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <Zap className="w-5 h-5 text-amber-500" />,
                            title: "Instant Response",
                            desc: "Our team typically responds within 2 hours.",
                            bg: "bg-amber-50/50"
                        },
                        {
                            icon: <Sparkles className="w-5 h-5 text-primary" />,
                            title: "Expert Guidance",
                            desc: "Get personalized tips from travel specialists.",
                            bg: "bg-primary/5"
                        },
                        {
                            icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
                            title: "Secure Data",
                            desc: "Your information is protected by industry standards.",
                            bg: "bg-emerald-50/50"
                        }
                    ].map((item, i) => (
                        <div key={i} className={`p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900/80 shadow-xl shadow-primary/5 group hover:-translate-y-2 transition-all duration-500 backdrop-blur-xl`}>
                            <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {item.icon}
                            </div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white mb-3 uppercase tracking-widest">{item.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-48 pb-32 px-6 bg-slate-50/50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none opacity-50" />
                    <div className="relative z-10">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">
                            Get in <span className="text-primary italic">Touch</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                            Have questions or ready to book your next adventure? <br className="hidden md:block" /> We're just a message or call away.
                        </p>
                    </div>
                </div>

                <Suspense fallback={<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-pulse"><div className="h-96 bg-slate-100 rounded-[3rem]" /><div className="lg:col-span-2 h-96 bg-slate-100 rounded-[3rem]" /></div>}>
                    <ContactContent />
                </Suspense>
            </div>
        </main>
    );
}
