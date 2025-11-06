import Script from 'next/script'
import { BlogPost } from '@/types/blog'

export function BlogSEO({ post }: { post: BlogPost }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nomavillage.com'
  const url = `${siteUrl}/blog/${post.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featured_image ? [post.featured_image] : undefined,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Noma Village',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.svg`,
      },
    },
    mainEntityOfPage: url,
    datePublished: post.published_at,
    dateModified: post.updated_at,
  }

  return (
    <Script id={`article-${post.slug}-jsonld`} type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(jsonLd)}
    </Script>
  )
}
