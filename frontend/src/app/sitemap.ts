import type { MetadataRoute } from 'next';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://taitai-tech.com').replace(/\/$/, '');

const ROUTE_PATHS: string[] = ['/', '/services', '/process', '/team', '/blog'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTE_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}

