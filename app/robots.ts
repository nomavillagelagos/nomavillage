import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nomavillage.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        // Disallow internal/testing routes if any
        '/api/',
        '/archive/',
        '/thankyou', // Thank you page should not be indexed
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
