"use client";

import React, { useState } from 'react';
import { Upload, Link as LinkIcon, Save, X } from 'lucide-react';
import { createCarouselImage } from '@/lib/actions';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function CarouselUploadForm() {
    const [loading, setLoading] = useState(false);
    const [uploadMode, setUploadMode] = useState<'url' | 'file'>('file');
    const [previewUrl, setPreviewUrl] = useState("");
    const [filePreview, setFilePreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const url = URL.createObjectURL(files[0]);
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
        try {
            const result = await createCarouselImage(formData);
            if (result.success) {
                // Reset form on success
                setPreviewUrl("");
                setFilePreview(null);
                const form = document.getElementById('carousel-upload-form') as HTMLFormElement;
                if (form) form.reset();
            } else {
                alert(result.error || "Failed to upload image");
            }
        } catch (error: any) {
            console.error("Upload error:", error);
            alert("A network error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form id="carousel-upload-form" action={handleSubmit} className="bg-slate-900/50 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                <span>Upload Image</span>
            </h2>

            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-dashed border-white/10 flex flex-col items-center justify-center">
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                    <div className="text-center p-6">
                        <Upload className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                        <p className="text-slate-500 text-xs font-medium">Image Preview</p>
                    </div>
                )}
            </div>

            <div className="flex bg-slate-950/50 p-1 rounded-xl border border-white/5">
                <button
                    type="button"
                    onClick={() => setUploadMode('file')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all",
                        uploadMode === 'file' ? "bg-primary text-white" : "text-slate-500 hover:text-slate-300"
                    )}
                >
                    <Upload className="w-3 h-3" />
                    File
                </button>
                <button
                    type="button"
                    onClick={() => setUploadMode('url')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all",
                        uploadMode === 'url' ? "bg-primary text-white" : "text-slate-500 hover:text-slate-300"
                    )}
                >
                    <LinkIcon className="w-3 h-3" />
                    URL
                </button>
            </div>

            <div>
                {uploadMode === 'file' ? (
                    <div className="relative group">
                        <input
                            name="image-file"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            required={!previewUrl}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-slate-400 text-xs outline-none group-hover:border-primary/50 transition-all flex items-center gap-3">
                            <Upload className="w-4 h-4" />
                            <span className="truncate">
                                {filePreview ? 'File(s) selected' : 'Click to select multiple images...'}
                            </span>
                        </div>
                    </div>
                ) : (
                    <input
                        name="image-url"
                        type="text"
                        value={previewUrl}
                        onChange={(e) => setPreviewUrl(e.target.value)}
                        placeholder="Paste image URL..."
                        required={!filePreview}
                        className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white text-xs outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                    />
                )}
            </div>

            <Button
                type="submit"
                className="w-full py-4 text-sm font-bold rounded-2xl gap-2"
                disabled={loading}
            >
                <Save className="w-4 h-4" />
                {loading ? "Uploading..." : "Upload Image"}
            </Button>
        </form>
    );
}
