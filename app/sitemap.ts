import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nomavillage.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Only canonical, indexable URLs
  const routes = [
    '/',
    '/coliving',
    '/community',
    '/rooms',
    '/coworking',
    '/faq',
    '/join',
    '/landing',
  ]

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.7,
  }))
}
