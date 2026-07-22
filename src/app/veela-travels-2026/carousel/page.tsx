import React from 'react';
import { prisma } from '@/lib/db';
import { ImageIcon } from 'lucide-react';
import CarouselUploadForm from '@/components/forms/CarouselUploadForm';
import { DeleteCarouselImageButton } from '@/components/ui/DeleteCarouselImageButton';

export default async function ManageCarouselPage() {
    const images = await prisma.carouselImage.findMany({
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">Vehicles Page Carousel</h1>
                    <p className="text-slate-400">Manage the large auto-playing images at the top of the Vehicles page.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload Form */}
                <div className="lg:col-span-1">
                    <CarouselUploadForm />
                </div>

                {/* Images List */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-900/50 border border-white/5 rounded-[2rem] p-8 backdrop-blur-xl">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-primary" />
                            <span>Current Images ({images.length})</span>
                        </h2>

                        {images.length === 0 ? (
                            <div className="p-12 text-center border border-dashed border-white/10 rounded-3xl">
                                <ImageIcon className="w-10 h-10 text-slate-600 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-white mb-2">No images yet</h3>
                                <p className="text-slate-500 text-sm">Upload images using the form to see them here.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {images.map((img) => (
                                    <div key={img.id} className="relative group rounded-2xl overflow-hidden border border-white/10 bg-slate-950 aspect-[4/3]">
                                        <img 
                                            src={img.imageUrl} 
                                            alt="Carousel" 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                            <div className="flex justify-end">
                                                <DeleteCarouselImageButton imageId={img.id} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
