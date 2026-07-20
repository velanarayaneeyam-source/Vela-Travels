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
    answer: "Vela Travels is located at Aliyur, Near NSS College, Nenmara, Palakkad District, Kerala (PIN: 678508). We serve Nenmara, Chittur, Kollengode, Vadakkencherry, and surrounding areas in Palakkad."
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
    <section aria-labelledby="faq-heading" className="py-16 px-8 md:px-12 bg-white dark:bg-slate-900 rounded-[3rem] my-16 border-2 border-slate-200 dark:border-slate-800 shadow-xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 id="faq-heading" className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-slate-100 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-6 pb-6 pt-1 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60"
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
