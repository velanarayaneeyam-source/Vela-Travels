"use client";

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/data';
import { logContactClick } from '@/lib/actions';

interface FloatingContactButtonsProps {
    settings: Record<string, string>;
}

export const FloatingContactButtons = ({ settings }: FloatingContactButtonsProps) => {
    const whatsapp = settings.whatsapp || CONTACT_INFO.whatsapp;
    const phone = settings.phone || CONTACT_INFO.phone;

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
            {/* WhatsApp Button */}
            <a
                href={`https://wa.me/${whatsapp}`}
                onClick={() => logContactClick('whatsapp', 'Floating Button')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 group"
                aria-label="Contact on WhatsApp"
            >
                <MessageCircle className="w-7 h-7" />
                <span className="absolute right-full mr-4 px-3 py-1 bg-white text-slate-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                    WhatsApp Me
                </span>
            </a>

            {/* Call Button */}
            <a
                href={`tel:${phone}`}
                onClick={() => logContactClick('phone', 'Floating Button')}
                className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-primary/90 hover:scale-110 transition-all duration-300 group"
                aria-label="Call Now"
            >
                <Phone className="w-6 h-6" />
                <span className="absolute right-full mr-4 px-3 py-1 bg-white text-slate-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                    Call Now
                </span>
            </a>
        </div>
    );
};
