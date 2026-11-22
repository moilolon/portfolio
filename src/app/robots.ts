import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// /robots.txt: everything can be crawled but the API
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
