import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kub-site.ru';
  
  // Статические страницы
  const staticPages = [
    '',
    '/services',
    '/services/grants',
    '/services/skolkovo',
    '/services/tax',
    '/services/patents',
    '/services/licensing',
    '/contacts',
    '/cases',
    '/about',
  ];

  return staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}