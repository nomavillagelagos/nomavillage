// PostHog utilities that work with script-loaded PostHog
declare global {
  interface Window {
    posthog?: any;
    __PH_INIT?: boolean;
  }
}

export const initPostHog = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY && window.posthog) {
    // Skip if already initialized by head snippet
    if (window.__PH_INIT) return
    try {
      window.posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com',
        person_profiles: 'identified_only',
        loaded: (posthogInstance: any) => {
          if (process.env.NODE_ENV === 'development') posthogInstance.debug()
        },
        capture_heatmaps: true,
        capture_pageview: false, // We'll capture manually
        session_recording: {
          enabled: true,
          recordCrossOriginIframes: true,
        },
        autocapture: {
          dom_event_allowlist: ['click', 'change', 'submit'],
          url_allowlist: [window.location.origin],
        },
        bootstrap: {
          distinctID: undefined,
        },
        persistence: 'localStorage+cookie',
        persistence_name: 'nomavillage_ph',
        cookie_expiration: 30, // 30 days
        cross_subdomain_cookie: false,
        secure_cookie: process.env.NODE_ENV === 'production',
      })
      // mark initialized
      window.__PH_INIT = true
    } catch (error) {
      console.warn('PostHog initialization failed:', error)
    }
  }
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.posthog && typeof window.posthog.capture === 'function') {
    try {
      window.posthog.capture(eventName, properties)
    } catch (error) {
      console.warn('PostHog trackEvent failed:', error)
    }
  }
}

export const trackPageView = (path: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.posthog && typeof window.posthog.capture === 'function') {
    try {
      window.posthog.capture('$pageview', {
        $current_url: window.location.href,
        path,
        ...properties,
      })
    } catch (error) {
      console.warn('PostHog trackPageView failed:', error)
    }
  }
}

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.posthog && typeof window.posthog.identify === 'function') {
    try {
      window.posthog.identify(userId, properties)
    } catch (error) {
      console.warn('PostHog identifyUser failed:', error)
    }
  }
}

export const getFeatureFlag = (flagKey: string): boolean | string | undefined => {
  if (typeof window !== 'undefined' && window.posthog && typeof window.posthog.getFeatureFlag === 'function') {
    try {
      return window.posthog.getFeatureFlag(flagKey)
    } catch (error) {
      console.warn('PostHog getFeatureFlag failed:', error)
    }
  }
  return undefined
}

export const isFeatureEnabled = (flagKey: string): boolean => {
  if (typeof window !== 'undefined' && window.posthog && typeof window.posthog.isFeatureEnabled === 'function') {
    try {
      return window.posthog.isFeatureEnabled(flagKey)
    } catch (error) {
      console.warn('PostHog isFeatureEnabled failed:', error)
    }
  }
  return false
}
