import { approveAdmin } from "@/lib/actions";
import Link from "next/link";
import { CheckCircle2, XCircle, ShieldCheck } from "lucide-react";

interface Props {
    params: { token: string };
}

export const metadata = {
    title: "Approve Admin - Vela Travels",
    robots: "noindex, nofollow",
};

export default async function ApproveAdminPage({ params }: Props) {
    const result = await approveAdmin(params.token);

    if (result.success) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-slate-900 border border-emerald-500/20 p-12 rounded-3xl backdrop-blur-xl text-center shadow-2xl">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h1 className="text-2xl font-black text-white mb-3">Account Approved!</h1>
                    <p className="text-slate-400 mb-8">
                        The admin account has been successfully activated. They can now log in to the Vela Travels admin panel.
                    </p>
                    <Link
                        href="/veela-travels-2026"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-2xl transition-colors"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Go to Admin Panel
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-slate-900 border border-red-500/20 p-12 rounded-3xl backdrop-blur-xl text-center shadow-2xl">
                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                    <XCircle className="w-10 h-10 text-red-500" />
                </div>
                <h1 className="text-2xl font-black text-white mb-3">Approval Failed</h1>
                <p className="text-slate-400 mb-8">{result.error}</p>
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-2xl transition-colors"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    );
}