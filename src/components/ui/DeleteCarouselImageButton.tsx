"use client";

import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteCarouselImage } from '@/lib/actions';

export function DeleteCarouselImageButton({
    imageId,
}: {
    imageId: string;
}) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this image from the carousel?')) {
            return;
        }

        setIsDeleting(true);
        try {
            await deleteCarouselImage(imageId);
        } catch (error) {
            console.error('Failed to delete image:', error);
            alert('Failed to delete image. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
            title="Delete Image"
        >
            <Trash2 className="w-5 h-5" />
        </button>
    );
}
