import posthog from '@/lib/posthog'
import { getStoredAttribution } from '@/lib/utm'
import { trackEvent } from '@/components/GoogleAnalytics'

export type EventProps = Record<string, any>

function getVariant(): 'A' | 'B' {
  try {
    if (typeof window === 'undefined') return 'A'
    const fromPath = window.location.pathname.includes('landing-b') ? 'B' : (window.location.pathname.includes('landing-a') ? 'A' : null)
    if (fromPath) return fromPath
    const cookie = document.cookie.split('; ').find(r => r.startsWith('ab_test_variant='))?.split('=')[1]
    return cookie === 'B' ? 'B' : 'A'
  } catch {
    return 'A'
  }
}

function mergeAttribution(props?: EventProps): EventProps {
  const attrib = getStoredAttribution() || {}
  const variant = getVariant()
  return {
    experiment_name: 'landing_page_test',
    variant,
    ab_variant: variant.toLowerCase(),
    ...attrib,
    ...props,
  }
}

export function captureWithAttribution(event: string, properties?: EventProps) {
  const merged = mergeAttribution(properties)
  try {
    posthog.capture(event, merged)
  } catch {
    // Best-effort fallback to server
    try {
      // Whitelist critical events; otherwise apply sampling to reduce volume
      const CRITICAL = new Set(['apply_click', 'cta_clicked'])
      const SAMPLE_RATE = 0.1 // 10% sampling for non-critical events
      const shouldSend = CRITICAL.has(event) || Math.random() < SAMPLE_RATE
      if (shouldSend) {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          body: JSON.stringify({ event, properties: merged })
        }).catch(() => {})
      }
    } catch {}
  }
}

export function trackEventWithAttribution(event: string, properties?: EventProps) {
  const merged = mergeAttribution(properties)
  try {
    trackEvent(event, merged)
  } catch {}
}
