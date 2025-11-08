import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nomavillage.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/archive/',
          '/thankyou',
          '/landing-a',
          '/landing-b',
          '/landing-c',
          '/michael',
          '/apply', // If this is duplicate of /form
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
