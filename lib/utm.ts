export type UTMProps = {
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_term?: string | null
  utm_content?: string | null
  referrer?: string | null
}

const STORAGE_KEY = "nv_attribution_v1"

export function getUtmFromSearch(search?: string): UTMProps {
  const params = new URLSearchParams(search || (typeof window !== 'undefined' ? window.location.search : ''))
  const get = (k: string) => params.get(k) || params.get(k.toLowerCase())
  return {
    utm_source: get('utm_source'),
    utm_medium: get('utm_medium'),
    utm_campaign: get('utm_campaign'),
    utm_term: get('utm_term'),
    utm_content: get('utm_content'),
  }
}

export function withReferrer(props: UTMProps): UTMProps {
  try {
    if (typeof document !== 'undefined') {
      return { ...props, referrer: document.referrer || props.referrer || null }
    }
  } catch {}
  return props
}

export function storeAttribution(props: UTMProps & { ab_variant?: 'A' | 'B' }) {
  try {
    if (typeof window === 'undefined') return
    const existing = getStoredAttribution() || {}
    const merged = { ...existing, ...props }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  } catch {}
}

export function getStoredAttribution(): (UTMProps & { ab_variant?: 'A' | 'B' }) | null {
  try {
    if (typeof window === 'undefined') return null
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function buildAttribution(search?: string, variant?: 'A' | 'B'): UTMProps & { ab_variant?: 'A' | 'B' } {
  const utm = withReferrer(getUtmFromSearch(search))
  return { ...utm, ab_variant: variant }
}
