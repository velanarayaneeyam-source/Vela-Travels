"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { Lock, User, Mail, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { registerAdmin } from '@/lib/actions';
import Link from 'next/link';

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setError("");
        try {
            const result = await registerAdmin(formData);
            if (result.success) {
                setSuccess(true);
                setTimeout(() => router.push("/login"), 3000);
            }
        } catch (err: any) {
            setError(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
                <div className="w-full max-w-md bg-slate-900 border border-white/10 p-12 rounded-3xl backdrop-blur-xl">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                    <h1 className="text-2xl font-bold text-white mb-4">Registration Successful!</h1>
                    <p className="text-slate-400">Your admin account has been created successfully. You can now use the "Forgot Password" feature with your registered email.</p>
                    <p className="text-slate-500 text-xs mt-4 italic text-[10px]">Redirecting you to login in 3 seconds...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
             {/* Decorative Background Orbs */}
             <div className="absolute top-0 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none opacity-50" />
             <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none opacity-50" />

            <div className="w-full max-w-md relative z-10">
                <div className="bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-inner">
                            <User className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Admin Sign Up</h1>
                        <p className="text-slate-400 mt-2">Create your account to manage your travel packages</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm font-bold animate-in bounce-in duration-300">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Username</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 transition-colors group-focus-within:text-primary" />
                                <input
                                    name="username"
                                    type="text"
                                    className="block w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                    placeholder="e.g. travel_admin"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email <span className="text-primary tracking-normal font-medium normal-case ml-1">(Used for password reset)</span></label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 transition-colors group-focus-within:text-primary" />
                                <input
                                    name="email"
                                    type="email"
                                    className="block w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                    placeholder="your-email@gmail.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 transition-colors group-focus-within:text-primary" />
                                <input
                                    name="password"
                                    type="password"
                                    className="block w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                />
                            </div>
                        </div>



                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 transition-colors group-focus-within:text-primary" />
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    className="block w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 mt-6 text-sm"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Admin Account"}
                        </Button>

                        <p className="text-center text-slate-500 text-[11px] mt-6 font-bold uppercase tracking-widest">
                            Already registered?{" "}
                            <Link href="/login" className="text-primary hover:text-white transition-colors ml-1">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
