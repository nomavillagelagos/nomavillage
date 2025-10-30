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
import MetaPixelEvents from "@/components/MetaPixelEvents"
import TikTokPixelEvents from "@/components/TikTokPixelEvents"

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nomavillage.com"
const gtmId = process.env.NEXT_PUBLIC_GTM_ID || ""

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
    <html lang="en" suppressHydrationWarning>
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
              "Modern coliving and coworking space in beautiful Lagos, Algarve, Portugal. Join our vibrant community of digital nomads and remote workers.",
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
            openingHours: "Mo-Su 00:00-24:00",
            telephone: "+4917669299755",
            hasMap: "https://maps.google.com/?cid=12085466010589542175",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "18",
              bestRating: "5",
              worstRating: "1"
            },
            sameAs: [
              "https://www.instagram.com/nomavillage_lagos",
              "https://www.facebook.com/nomavillagelagos",
              "https://maps.google.com/?cid=12085466010589542175"
            ],
            priceRange: "€€",
            amenityFeature: [
              {
                "@type": "LocationFeatureSpecification",
                "name": "High-Speed WiFi",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Swimming Pool",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Coworking Space",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Private Rooms",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Shared Kitchen",
                "value": true
              }
            ]
          })}
        </Script>
        {/* Organization Structured Data */}
        <Script id="schema-organization" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Noma Village",
            alternateName: "Noma Village Lagos",
            url: siteUrl,
            logo: `${siteUrl}/logo.svg`,
            description:
              "Premium coliving and coworking space for digital nomads and remote workers in Lagos, Algarve, Portugal. We create meaningful connections and provide the perfect environment for work and life balance in the Algarve.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Lagos",
              addressRegion: "Faro",
              addressCountry: "PT",
            },
            sameAs: [
              "https://www.instagram.com/nomavillage_lagos",
              "https://www.facebook.com/nomavillage_lagos",
              "https://maps.google.com/?cid=12085466010589542175"
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+4917669299755",
              contactType: "customer service",
              availableLanguage: ["English", "Portuguese"],
              areaServed: "PT"
            }
          })}
        </Script>
        {/* Google Tag Manager (conditional via NEXT_PUBLIC_GTM_ID) */}
        {gtmId ? (
          <Script id="gtm-base" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        ) : null}
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
        {/* Meta Pixel (Facebook) base code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1087343619857001');
          `}
        </Script>
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

              ttq.load('D3TOG6RC77U1N95E9IF0');
              ttq.page();
            }(window, document, 'ttq');
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
            <MetaPixelEvents />
            <TikTokPixelEvents />
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
