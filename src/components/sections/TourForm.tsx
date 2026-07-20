"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    Save,
    Image as ImageIcon,
    Upload,
    Link as LinkIcon,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import { Tour } from '@prisma/client';
import { createTour, updateTour } from '@/lib/actions';
import { Button } from '@/components/ui/Button';

interface TourFormProps {
    tour?: Tour;
}

export default function TourForm({ tour }: TourFormProps) {
    const isEditing = !!tour;
    const [loading, setLoading] = useState(false);
    const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const router = useRouter();

    const [previewUrl, setPreviewUrl] = useState(tour?.image || "");
    const [filePreview, setFilePreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setFilePreview(url);
            setPreviewUrl(url);
        }
    };

    React.useEffect(() => {
        return () => {
            if (filePreview) {
                URL.revokeObjectURL(filePreview);
            }
        };
    }, [filePreview]);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setStatus(null);
        try {
            const imageFile = formData.get("image-file") as File;
            const imageUrl = formData.get("image-url") as string;

            if (!isEditing && (!imageFile || imageFile.size === 0) && !imageUrl && !previewUrl) {
                setStatus({ type: 'error', message: 'Please select an image file or paste an image link.' });
                setLoading(false);
                return;
            }

            let res;
            if (isEditing) {
                res = await updateTour(tour.id, formData);
            } else {
                res = await createTour(formData);
            }

            if (res && res.success === false) {
                setStatus({ type: 'error', message: res.error || 'Failed to save tour.' });
            } else {
                setStatus({ type: 'success', message: isEditing ? 'Tour updated successfully!' : 'Tour created successfully!' });
                setTimeout(() => {
                    router.push("/veela-travels-2026/tours");
                    router.refresh();
                }, 1000);
            }
        } catch (error: any) {
            console.error(error);
            setStatus({ type: 'error', message: error.message || 'Something went wrong.' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="max-w-2xl mx-auto space-y-8">
            <div className="bg-slate-900/80 border border-white/10 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl space-y-8">
                
                {/* 1. Main Image Upload (Mandatory) */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-primary" />
                            <span>Tour Image (Only Required Field)</span>
                        </label>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                            Required
                        </span>
                    </div>

                    <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border-2 border-dashed border-white/15 flex flex-col items-center justify-center group">
                        {previewUrl ? (
                            <>
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <p className="text-white text-xs font-bold uppercase tracking-widest bg-slate-900/80 px-4 py-2 rounded-xl border border-white/10">
                                        {uploadMode === 'file' ? 'Click below to change file' : 'Update URL below'}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                                    <Upload className="w-8 h-8 text-primary" />
                                </div>
                                <p className="text-white font-bold text-sm mb-1">Select or Upload Tour Photo</p>
                                <p className="text-slate-500 text-xs">Supports JPG, PNG, WEBP up to 25MB</p>
                            </div>
                        )}
                    </div>

                    <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-white/10">
                        <button
                            type="button"
                            onClick={() => setUploadMode('file')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all",
                                uploadMode === 'file' ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-white"
                            )}
                        >
                            <Upload className="w-4 h-4" />
                            Upload Photo File
                        </button>
                        <button
                            type="button"
                            onClick={() => setUploadMode('url')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all",
                                uploadMode === 'url' ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-white"
                            )}
                        >
                            <LinkIcon className="w-4 h-4" />
                            Paste Image URL
                        </button>
                    </div>

                    {uploadMode === 'file' ? (
                        <div className="relative group">
                            <input
                                name="image-file"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="w-full px-6 py-5 bg-slate-950/80 border border-white/10 rounded-2xl text-slate-300 text-sm outline-none group-hover:border-primary transition-all flex items-center gap-3">
                                <Upload className="w-5 h-5 text-primary" />
                                <span className="truncate font-bold">
                                    {filePreview ? 'Photo Selected! Ready to Save' : 'Click here to choose photo from device...'}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <input
                            name="image-url"
                            type="text"
                            value={previewUrl}
                            onChange={(e) => setPreviewUrl(e.target.value)}
                            placeholder="Paste direct image link..."
                            className="w-full px-6 py-5 bg-slate-950/80 border border-white/10 rounded-2xl text-white text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono"
                        />
                    )}
                </div>

                {/* Optional Tour Title */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Tour Name / Title (Optional)
                    </label>
                    <input
                        name="title"
                        type="text"
                        defaultValue={tour?.title}
                        placeholder="e.g. Kerala Package (Optional - Leave blank to auto-name)"
                        className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                    />
                </div>

                {/* Optional Extra Details Drawer */}
                <details className="group">
                    <summary className="text-xs font-bold text-slate-500 hover:text-slate-300 cursor-pointer py-2 flex items-center gap-2 select-none">
                        <span>+ Optional Extra Details (Description, Price, Destination)</span>
                    </summary>
                    <div className="space-y-6 pt-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Description (Optional)</label>
                            <textarea
                                name="description"
                                rows={3}
                                defaultValue={tour?.description}
                                placeholder="Optional description..."
                                className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white text-sm outline-none"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">Destination (Optional)</label>
                                <input
                                    name="destination"
                                    type="text"
                                    defaultValue={tour?.destination}
                                    placeholder="Optional destination"
                                    className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white text-sm outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">Price (Optional)</label>
                                <input
                                    name="price"
                                    type="text"
                                    defaultValue={tour?.price}
                                    placeholder="Optional price"
                                    className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white text-sm outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </details>

                {/* Status Messages */}
                {status && (
                    <div className={cn(
                        "p-5 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300",
                        status.type === 'success' ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border border-red-500/20 text-red-400"
                    )}>
                        {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                        <p className="text-sm font-bold">{status.message}</p>
                    </div>
                )}

                {/* Submit Action */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                    <Button
                        type="submit"
                        className="w-full py-5 text-lg font-black rounded-2xl tracking-wide gap-3 shadow-xl"
                        disabled={loading}
                    >
                        <Save className="w-6 h-6" />
                        {loading ? "Saving Tour..." : (isEditing ? "Update Tour" : "Create Tour")}
                    </Button>
                </div>
            </div>
        </form>
    );
}
