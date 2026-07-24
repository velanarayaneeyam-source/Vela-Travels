"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "Where is Vela Travels located in Nenmara, Palakkad?",
    answer: "Vela Travels is located at Ayilur, Near NSS College, Nenmara, Palakkad District, Kerala (PIN: 678508). We serve Nenmara, Chittur, Kollengode, Vadakkencherry, and surrounding areas in Palakkad."
  },
  {
    question: "Do you offer airport taxi pickup and drop-off to Cochin and Coimbatore airports?",
    answer: "Yes, we provide 24/7 dedicated airport transfers to Cochin International Airport (COK) and Coimbatore International Airport (CJB) with prompt pickups, experienced drivers, and transparent pricing."
  },
  {
    question: "Are self-drive car rentals available at Vela Travels in Nenmara?",
    answer: "Yes, we offer well-maintained luxury and economy self-drive cars with flexible hourly and daily rental packages in Nenmara and Palakkad."
  },
  {
    question: "How can I book a cab or tour package with Vela Travels?",
    answer: "You can book instantly through our website, call us directly at +91 9207050525, or message us on WhatsApp for immediate confirmation and driver allocation."
  },
  {
    question: "What types of tour packages do you provide in Kerala?",
    answer: "We offer customized Kerala sightseeing packages including Neliyampathy hill station tours, Ayurveda wellness & spa retreats, Palakkad heritage trips, and backwater tours."
  }
];

interface FaqSectionProps {
  faqs?: FaqItem[];
  title?: string;
  subtitle?: string;
}

export function FaqSection({
  faqs = DEFAULT_FAQS,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our car rentals, airport taxis & tour packages in Nenmara, Palakkad."
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section aria-labelledby="faq-heading" className="relative py-20 px-6 md:px-14 bg-gradient-to-br from-[#0c162c] via-[#14264d] to-[#0d2d38] rounded-[3.5rem] my-20 border-2 border-indigo-500/40 shadow-2xl shadow-indigo-950/80 overflow-hidden">
      
      {/* 2026 Shining Multi-Color Glowing Mesh Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-emerald-500/30 via-cyan-500/20 to-blue-500/30 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border-2 border-indigo-400/40 text-cyan-300 text-xs font-black uppercase tracking-[0.25em] shadow-lg backdrop-blur-md">
            <HelpCircle className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Got Questions?</span>
          </div>
          <h2 id="faq-heading" className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Nenmara & Palakkad <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-amber-300 to-emerald-300 drop-shadow-[0_0_25px_rgba(99,102,241,0.6)]">Car Rental FAQs</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500 border-2 ${
                  isOpen
                    ? 'bg-gradient-to-r from-slate-900/95 via-indigo-950/80 to-slate-900/95 border-indigo-400/60 shadow-[0_0_35px_rgba(99,102,241,0.3)]'
                    : 'bg-slate-900/70 border-white/10 hover:border-cyan-400/40 hover:bg-slate-900/90 shadow-lg'
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full py-6 px-8 text-left flex items-center justify-between gap-4 font-black text-white hover:text-cyan-300 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg md:text-xl tracking-tight leading-snug">{faq.question}</span>
                  <div className={`p-2 rounded-xl transition-transform duration-300 shrink-0 ${isOpen ? 'bg-indigo-500/30 text-cyan-300 rotate-180 border border-indigo-400/40' : 'bg-white/5 text-slate-400'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-8 pb-8 pt-2 text-slate-200 text-base leading-relaxed border-t border-white/10 font-medium"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
