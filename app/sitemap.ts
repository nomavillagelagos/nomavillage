import type { MetadataRoute } from 'next'
import { BlogService } from '@/lib/services/blogService'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nomavillage.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // All public pages that should be indexed (exclude noindex pages like /affiliate)
  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/coliving', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/community', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/rooms', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/coworking', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/join', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/form', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/reviews', priority: 0.7, changeFrequency: 'weekly' as const },
  ]

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // Blog posts
  const { posts } = await BlogService.getPosts({})
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.published_at || now),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries]
}
