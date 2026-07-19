import { prisma } from './db';
import { unstable_cache } from 'next/cache';

export const getSiteSettings = unstable_cache(
    async () => {
        try {
            const settings = await prisma.siteSettings.findMany();
            const settingsMap: Record<string, string> = {};
            settings.forEach(s => {
                settingsMap[s.key] = s.value;
            });
            return settingsMap;
        } catch (error) {
            console.error('Failed to fetch site settings:', error);
            return {};
        }
    },
    ['site-settings'],
    { tags: ['settings'] }
);

export const getTestimonials = unstable_cache(
    async () => {
        return await prisma.testimonial.findMany({
            orderBy: { createdAt: 'desc' }
        });
    },
    ['testimonials'],
    { tags: ['testimonials'] }
);

export const getTours = unstable_cache(
    async () => {
        return await prisma.tour.findMany({
            orderBy: { createdAt: 'desc' }
        });
    },
    ['all-tours'],
    { tags: ['tours'] }
);

export const getCars = unstable_cache(
    async () => {
        return await prisma.car.findMany({
            orderBy: { createdAt: 'desc' }
        });
    },
    ['all-cars'],
    { tags: ['cars'] }
);

export const CONTACT_INFO = {
    phone: '+919207050525',
    whatsapp: '919207050525',
};
