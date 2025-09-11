import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Nunito, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import GuideModalProvider from "@/components/guide-modal-provider"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import PostHogProvider from "@/components/PostHogProvider"
import ABTestDebugger from "@/components/ABTestDebugger"
import "./globals.css"

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
        {/* PostHog Web Snippet in head to load on all pages */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
              (function(){
                try {
                  var key = ${JSON.stringify(process.env.NEXT_PUBLIC_POSTHOG_KEY || '')};
                  var host = ${JSON.stringify(process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com')};
                  if (key && window.posthog && typeof window.posthog.init === 'function') {
                    window.posthog.init(key, { api_host: host, person_profiles: 'identified_only' });
                    window.__PH_INIT = true;
                  }
                } catch (e) { console.warn('PostHog init error', e); }
              })();
            `,
          }}
        />
      </head>
      <body className={`font-sans ${montserrat.variable} ${nunito.variable} ${caveat.variable}`}>
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <PostHogProvider>
            <GuideModalProvider>
              {children}
            </GuideModalProvider>
          </PostHogProvider>
          <Analytics />
        </Suspense>
        <ABTestDebugger />
      </body>
    </html>
  )
}