"use client";

import React, { useState } from 'react';
import { Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { deleteTour } from '@/lib/actions';
import { cn } from '@/lib/utils';

interface DeleteTourButtonProps {
    tourId: string;
    tourTitle: string;
}

export function DeleteTourButton({ tourId, tourTitle }: DeleteTourButtonProps) {
    const [isConfirming, setIsConfirming] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);
        try {
            await deleteTour(tourId);
        } catch (error) {
            console.error('Delete error:', error);
            setIsDeleting(false);
            setIsConfirming(false);
        }
    }

    if (isConfirming) {
        return (
            <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Are you sure?</span>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                    title="Confirm Delete"
                >
                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
                <button
                    onClick={() => setIsConfirming(false)}
                    disabled={isDeleting}
                    className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Cancel"
                >
                    <span className="text-[10px] font-bold uppercase tracking-tighter px-1">No</span>
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setIsConfirming(true)}
            className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all group"
            title={`Delete ${tourTitle}`}
        >
            <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
    );
}
