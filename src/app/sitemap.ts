import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.gptourstravel.com';

  // Core pages
  const routes = ['', '/about', '/contact', '/tours', '/fleet'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  // Dynamic tour pages
  try {
    const tours = await prisma.tour.findMany({
      select: { id: true, updatedAt: true },
    });

    const tourRoutes = tours.map((tour) => ({
      url: `${baseUrl}/tours/${tour.id}`,
      lastModified: tour.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...routes, ...tourRoutes];
  } catch (error) {
    return routes;
  }
}
