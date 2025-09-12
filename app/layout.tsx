import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Nunito, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { Suspense } from "react"
import GuideModalProvider from "@/components/guide-modal-provider"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import "./globals.css"
import PostHogProvider from "@/components/PostHogProvider"

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

export const metadata: Metadata = {
  title: "Lagos Coliving & Coworking - Portugal",
  description:
    "Modern coliving and coworking space in beautiful Lagos, Portugal. Join our vibrant community of digital nomads and remote workers.",
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
        <GoogleAnalytics />
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1087343619857001');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${montserrat.variable} ${nunito.variable} ${caveat.variable} font-sans`}>
        <PostHogProvider>
          <GuideModalProvider>
            <Suspense fallback={null}>
              {children}
            </Suspense>
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
