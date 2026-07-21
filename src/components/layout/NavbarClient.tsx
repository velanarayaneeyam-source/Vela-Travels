
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, LogOut, LayoutDashboard } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { CONTACT_INFO } from '@/lib/data';
import { TravelBot } from '@/components/chat/TravelBot';

const NAV_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'Vehicles', href: '/cars' },
    { name: 'Spa, Massage & Hotel', href: '/ayurveda' },
    { name: 'Tour', href: '/tours' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export const NavbarClient = ({ 
    settings,
    tours = [],
    cars = []
}: { 
    settings: Record<string, string>,
    tours?: any[],
    cars?: any[]
}) => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const phone = settings.phone || CONTACT_INFO.phone;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when pathname changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-[900] transition-all duration-500 gpu-boost",
                    (scrolled || isOpen || pathname !== "/") 
                        ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-white/5 py-3 shadow-md text-slate-900 dark:text-white" 
                        : "bg-gradient-to-b from-black/15 via-transparent to-transparent text-white"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 relative z-[910]">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative h-28 min-w-[200px] flex flex-col items-start justify-center group-hover:scale-105 transition-transform duration-500 shrink-0">
                            <img 
                                src={settings.logoUrl || "/logo-v4.png"} 
                                alt="Vela Travels Logo" 
                                className={cn(
                                    "h-24 w-auto object-contain transition-all duration-500 rounded-2xl mb-1",
                                    (scrolled || isOpen || pathname !== "/") 
                                    ? "brightness-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]" 
                                    : "filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                                )}
                            />
                            <span className={cn(
                                "text-lg font-black tracking-tighter transition-all duration-500 leading-none",
                                (scrolled || isOpen || pathname !== "/")
                                ? "text-slate-900 dark:text-white"
                                : "text-white"
                            )}>
                                Vela<span className="text-primary italic">Travels</span>
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-[15px] font-bold tracking-wide transition-all duration-300 relative",
                                    pathname === link.href 
                                        ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                                        : (scrolled || isOpen || pathname !== "/")
                                            ? "text-slate-600 dark:text-slate-400 hover:text-primary"
                                            : "text-white hover:text-primary-foreground drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {session && (
                            <>
                                <div className="h-6 w-px bg-border/20 mx-2" />
                                <div className="flex items-center gap-6">
                                    <Link
                                        href="/veela-travels-2026"
                                        className="text-sm font-bold text-primary flex items-center gap-2 hover:opacity-80 transition-opacity"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Admin
                                    </Link>
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className={cn(
                                            "text-sm font-bold transition-colors flex items-center gap-2 hover:text-red-500",
                                            (scrolled || isOpen || pathname !== "/")
                                                ? "text-slate-600 dark:text-slate-400"
                                                : "text-white hover:text-red-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                                        )}
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}

                        <Button href={`tel:${phone}`} size="sm" className="gap-2">
                            <Phone className="w-4 h-4" />
                            Book Now
                        </Button>
                    </div>

                    {/* Mobile Hamburger - Massive Hit-Box */}
                    <button 
                        onClick={() => setIsOpen(true)}
                        className={cn(
                            "md:hidden p-4 -mr-2 rounded-2xl transition-all duration-300 active:scale-90 relative z-[999]",
                            (scrolled || isOpen || pathname !== "/") 
                                ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white" 
                                : "bg-white/20 backdrop-blur-md text-white border border-white/20"
                        )}
                        aria-label="Toggle Menu"
                    >
                        <Menu className="w-7 h-7" />
                    </button>
                </div>
            </nav>

            {/* Mobile Nav Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-white dark:bg-slate-950 z-[1000] md:hidden transition-all duration-500 ease-in-out px-6 py-8 flex flex-col items-center gpu-boost animate-in fade-in slide-in-from-top-6 duration-500 overflow-y-auto"
                >
                    {/* Mobile Header Inside Overlay */}
                    <div className="w-full flex items-center justify-between mb-12 relative z-[1010]">
                        <div className="h-28 w-40 relative flex flex-col items-center justify-center">
                            <Image 
                                src={settings.logoUrl || "/logo-v4.png"} 
                                alt="Vela Travels Logo" 
                                width={100}
                                height={100}
                                className="object-contain rounded-xl mb-1" 
                                priority
                            />
                            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                Vela<span className="text-primary italic">Travels</span>
                            </span>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="p-5 bg-slate-100 dark:bg-white/10 rounded-full text-slate-900 dark:text-white transition-all active:scale-95 active:rotate-90 shadow-lg border border-slate-200 dark:border-white/10"
                        >
                            <X className="w-7 h-7" />
                        </button>
                    </div>

                    <div className="w-full max-w-sm flex flex-col gap-4 text-center relative z-[1020] pointer-events-auto">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "flex items-center justify-between px-8 h-20 rounded-[1.75rem] border transition-all duration-300 font-black text-sm tracking-[0.1em] uppercase shadow-md active:scale-95",
                                    pathname === link.href 
                                        ? "bg-primary text-white border-primary shadow-xl shadow-primary/30" 
                                        : "bg-white border-slate-100 text-slate-900"
                                )}
                            >
                                <span className="flex-1 text-center">{link.name}</span>
                            </Link>
                        ))}

                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/10 flex flex-col gap-4">
                            {session && (
                                <>
                                    <Link
                                        href="/veela-travels-2026"
                                        className="h-18 flex items-center justify-center gap-3 rounded-[1.5rem] bg-indigo-500 text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-indigo-500/20 active:scale-95"
                                    >
                                        <LayoutDashboard className="w-5 h-5" />
                                        Admin Panel
                                    </Link>
                                    <button
                                        onClick={() => {
                                            signOut({ callbackUrl: '/' });
                                            setIsOpen(false);
                                        }}
                                        className="h-16 flex items-center justify-center gap-3 rounded-[1.5rem] bg-red-500/10 border border-red-500/20 text-red-500 font-black text-sm uppercase tracking-widest active:scale-95"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Sign Out
                                    </button>
                                </>
                            )}

                            <Button href={`tel:${phone}`} size="lg" className="w-full h-20 rounded-[1.75rem] text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 bg-primary text-white flex items-center justify-center gap-3 active:scale-95">
                                <Phone className="w-5 h-5" />
                                Book with us Now
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <TravelBot tours={tours} cars={cars} settings={settings} />
        </>
    );
};
