"use client";

import React, { useState, use } from 'react';
import { Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { resetPassword } from '@/lib/actions';
import { Button } from '@/components/ui/Button';

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = use(params);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);
        try {
            const result = await resetPassword(formData);
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
                    <h1 className="text-3xl font-black text-white mb-4">Success!</h1>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Your password has been updated. You can now log in with your new credentials.
                    </p>
                    <Button href="/login" className="w-full h-14 rounded-2xl">
                        Log in Now
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#020617] p-6 relative overflow-hidden">
            <div className="absolute top-0 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/5 p-12 rounded-[3rem]">
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-white tracking-tight mb-4">New Password</h1>
                        <p className="text-slate-400">Set a secure password for your admin account.</p>
                    </div>

                    <form action={handleSubmit} className="space-y-6">
                        <input type="hidden" name="token" value={token} />
                        
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-14 pr-5 py-5 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    required
                                    minLength={8}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-14 pr-5 py-5 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    required
                                    minLength={8}
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
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save New Password"}
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
}
