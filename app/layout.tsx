import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Nunito, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import GuideModalProvider from "@/components/guide-modal-provider"
import "./globals.css"
import PostHogProvider from "@/components/PostHogProvider"
import ScrollDepthTracker from "@/components/ScrollDepthTracker"
import AnalyticsWrapper from "@/components/AnalyticsWrapper"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
})

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nomavillage.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Noma Village | Coliving & Coworking in Lagos, Portugal",
    template: "%s | Noma Village",
  },
  description:
    "Modern coliving and coworking space in beautiful Lagos, Portugal. Join our vibrant community of digital nomads and remote workers.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Noma Village",
    title: "Noma Village | Coliving & Coworking in Lagos, Portugal",
    description:
      "Modern coliving and coworking space in beautiful Lagos, Portugal. Join our vibrant community of digital nomads and remote workers.",
    images: [
      {
        url: "/images/noma1.webp",
        width: 1200,
        height: 630,
        alt: "Noma Village Lagos Coliving",
      },
    ],
    locale: "en_US",
  },
  generator: "v0.app",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* LocalBusiness Structured Data */}
        <Script id="schema-localbusiness" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Noma Village",
            url: siteUrl,
            image: `${siteUrl}/images/noma1.webp`,
            description:
              "Modern coliving and coworking space in beautiful Lagos, Portugal. Join our vibrant community of digital nomads and remote workers.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Lagos",
              addressRegion: "Faro",
              addressCountry: "PT",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 37.0925267,
              longitude: -8.6828956,
            },
            sameAs: [],
            priceRange: "€€",
          })}
        </Script>
        {/* Google Tag Manager */}
        <Script id="gtm-base" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-SJK9W4C7');
          `}
        </Script>
        {/* End Google Tag Manager */}
        {/* Google Ads global site tag (gtag.js) */}
        <Script
          id="gads-base"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17556363510"
          strategy="afterInteractive"
        />
        <Script id="gads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', 'AW-17556363510');
          `}
        </Script>
      </head>
      <body className={`${montserrat.variable} ${nunito.variable} ${caveat.variable} font-sans antialiased`}>
        <PostHogProvider>
          <GuideModalProvider>
            <Suspense fallback={null}>
              {children}
            </Suspense>
            <Suspense fallback={null}>
              <AnalyticsWrapper />
            </Suspense>
            <ScrollDepthTracker />
          </GuideModalProvider>
        </PostHogProvider>
        <Analytics />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1087343619857001&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
// For later reuse with environment variables:
// var key = ${JSON.stringify(process.env.NEXT_PUBLIC_POSTHOG_KEY || '')};
// var host = ${JSON.stringify(process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com')};
