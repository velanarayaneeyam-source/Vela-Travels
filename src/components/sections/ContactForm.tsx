"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { createInquiry } from '@/lib/actions';

export const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleAction = async (formData: FormData) => {
        setStatus('loading');
        setErrorMessage(null);
        try {
            const result = await createInquiry(formData);
            if (result?.success) {
                setStatus('success');
            } else {
                setStatus('error');
                setErrorMessage(result?.error || "An error occurred. Please check your inputs.");
            }
        } catch (error) {
            console.error('Inquiry Error:', error);
            setStatus('error');
            setErrorMessage("Server error. Please try again later.");
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900/50 p-6 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-primary/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
            
            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-12"
                    >
                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Message Sent!</h3>
                        <p className="text-muted-foreground dark:text-slate-400 mb-8">
                            Thank you for reaching out. Our team will contact you shortly to discuss your travel plans.
                        </p>
                        <Button onClick={() => setStatus('idle')} variant="outline">
                            Send Another Message
                        </Button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        action={handleAction}
                        className="flex flex-col gap-8"
                    >
                        {/* 2026 Error Alert */}
                        {errorMessage && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-2xl text-sm font-bold flex items-center gap-3"
                            >
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                {errorMessage}
                            </motion.div>
                        )}

                        {/* 2026 Model Compact Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-col gap-4 group/field"
                            >
                                <label htmlFor="name" className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    Full Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="Viswajith"
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] px-6 py-4 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-500 shadow-sm text-slate-900 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 text-sm"
                                    />
                                    {/* Input Shine Effect */}
                                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-focus-within/field:opacity-100 pointer-events-none transition-opacity duration-700" />
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col gap-4 group/field"
                            >
                                <label htmlFor="phone" className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        placeholder="+91 98765 43210"
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] px-6 py-4 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-500 shadow-sm text-slate-900 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 text-sm"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col gap-4 group/field"
                        >
                            <label htmlFor="message" className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                Your Message
                            </label>
                            <div className="relative">
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder="I'm interested in the Alpine Adventure tour..."
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-[2rem] px-6 py-5 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-500 shadow-sm text-slate-900 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 resize-none text-sm"
                                ></textarea>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full relative py-7 rounded-2xl font-black text-lg bg-gradient-to-r from-slate-900 to-slate-800 dark:from-primary dark:to-blue-600 text-white hover:from-primary hover:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-700 shadow-2xl shadow-primary/20 overflow-hidden group/btn"
                                disabled={status === 'loading'}
                            >
                                {/* Button Mirror Shine */}
                                <div className="absolute top-0 -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-0 group-hover/btn:animate-shine pointer-events-none" />

                                {status === 'loading' ? (
                                    <span className="flex items-center justify-center gap-4">
                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                        SENDING...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-4">
                                        <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-primary transition-colors">
                                            <Send className="w-4 h-4" />
                                        </div>
                                        SEND INQUIRY
                                    </span>
                                )}
                            </Button>
                        </motion.div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};
