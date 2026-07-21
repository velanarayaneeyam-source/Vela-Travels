import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://velatravelsco.com';

  // Core pages
  const routes = ['', '/about', '/contact', '/tours', '/fleet'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  // Dynamic pages (Cars and Tours)
  try {
    const tours = await prisma.tour.findMany({
      select: { id: true, updatedAt: true },
    });

    const cars = await prisma.car.findMany({
      select: { id: true, updatedAt: true },
    });

    const tourRoutes = tours.map((tour) => ({
      url: `${baseUrl}/tours/${tour.id}`,
      lastModified: tour.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    const carRoutes = cars.map((car) => ({
      url: `${baseUrl}/cars`, // or if there's a dynamic car page: /cars/${car.id}
      lastModified: car.updatedAt,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }));

    return [...routes, ...tourRoutes, ...carRoutes];
  } catch (error) {
    return routes;
  }
}
