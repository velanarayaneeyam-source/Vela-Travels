"use client";

import React, { useState } from 'react';
import { Mail, ChevronLeft, Loader2, CheckCircle2, Phone, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { requestPasswordReset } from '@/lib/actions';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);
        try {
            const result = await requestPasswordReset(formData);
            if (result.success) {
                setSuccess(true);
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#020617] p-6">
                <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-2xl border border-white/5 p-12 rounded-[3rem] text-center">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-4">Check Your Inbox!</h1>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        If an account exists with that identifier, we've sent a recovery link to your **registered Gmail**.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl text-left">
                            <Mail className="w-5 h-5 text-primary" />
                            <span className="text-xs text-slate-300">Check your Email Inbox</span>
                        </div>
                    </div>
                    <Button href="/login" variant="outline" className="w-full h-14 rounded-2xl mt-8">
                        Back to Login
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#020617] p-6 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <Link 
                    href="/login" 
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-8"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Login
                </Link>

                <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/5 p-12 rounded-[3rem]">
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-white tracking-tight mb-4">Recovery</h1>
                        <p className="text-slate-400">Enter your username or email to reset your admin password.</p>
                    </div>

                    <form action={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Account Identifier</label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                                <input
                                    name="identifier"
                                    type="text"
                                    placeholder="Username or Email"
                                    className="w-full pl-14 pr-5 py-5 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <p className="text-red-500 text-xs font-bold leading-tight">{error}</p>
                            </div>
                        )}

                        <Button 
                            type="submit" 
                            className="w-full h-16 rounded-2xl text-base font-black uppercase tracking-widest gap-3 shadow-xl shadow-primary/20"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
                        </Button>
                    </form>

                    <p className="text-center mt-8 text-xs text-slate-600 font-medium">
                        For security reasons, your admin account must be registered and verified before you can use this feature.
                    </p>
                </div>
            </div>
        </main>
    );
}
