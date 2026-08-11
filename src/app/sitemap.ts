import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nexgentechacademy.com';

  const courses = await prisma.course.findMany({
    select: { slug: true, updatedAt: true },
  });

  const courseUrls = courses.map((c) => ({
    url: `${baseUrl}/courses/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    '',
    '/about',
    '/courses',
    '/batches',
    '/placements',
    '/campus',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  return [...staticPages, ...courseUrls];
}
