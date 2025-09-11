import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Nunito, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { Suspense } from "react"
import GuideModalProvider from "@/components/guide-modal-provider"
import GoogleAnalytics from "@/components/GoogleAnalytics"
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
        <script
  dangerouslySetInnerHTML={{
    __html: `
      !function(t,e){
        var o,n,p,r;
        e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){
          function g(t,e){
            var o=e.split(".");
            2==o.length&&(t=t[o[0]],e=o[1]);
            t[e]=function(){
              t.push([e].concat(Array.prototype.slice.call(arguments,0)))
            }
          }
          (p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",
          (r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);
          var u=e;
          for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){
            var e="posthog";
            return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e
          },u.people.toString=function(){
            return u.toString(1)+".people (stub)"
          },o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);
          e._i.push([i,s,a])
        },e.__SV=1)
      }(document,window.posthog||[]);

      // Wait for the PostHog library to load before initializing
      (function pollForPosthog() {
        if (window.posthog && typeof window.posthog.init === 'function') {
          window.posthog.init('phc_UfN3a0MHqVk1VzHz2os4M1BHLxzj5JTEdrhzLP3Bj8z', {
            api_host: 'https://eu.i.posthog.com',
            person_profiles: 'identified_only',
            capture_pageview: true,
            capture_heatmaps: true,
            session_recording: {
              enabled: true,
              recordCrossOriginIframes: true
            }
          });
        } else {
          setTimeout(pollForPosthog, 50);
        }
      })();
    `,
  }}
/>
      </head>
      <body className={`${montserrat.variable} ${nunito.variable} ${caveat.variable} font-sans`}>
        <GuideModalProvider>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </GuideModalProvider>
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
