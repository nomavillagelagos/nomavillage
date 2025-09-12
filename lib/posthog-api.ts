// PostHog API client for server-side data retrieval
// Requires personal API key for authentication

const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com'

if (!POSTHOG_PERSONAL_API_KEY) {
  console.warn('POSTHOG_PERSONAL_API_KEY not found. GET requests to PostHog API will fail.')
}

export class PostHogAPI {
  private baseUrl: string
  private headers: Record<string, string>

  constructor() {
    this.baseUrl = `${POSTHOG_HOST}/api`
    this.headers = {
      'Authorization': `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
      'Content-Type': 'application/json'
    }
  }

  // Generic GET request method
  async get(endpoint: string, params?: Record<string, any>) {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.headers
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(`PostHog API Error ${response.status}: ${error.detail || response.statusText}`)
    }

    return response.json()
  }

  // Example: Get project info
  async getProject(projectId: string) {
    return this.get(`/projects/${projectId}/`)
  }

  // Example: Get events
  async getEvents(projectId: string, params?: {
    event?: string
    after?: string
    before?: string
    limit?: number
  }) {
    return this.get(`/projects/${projectId}/events/`, params)
  }

  // Example: Get insights
  async getInsights(projectId: string) {
    return this.get(`/projects/${projectId}/insights/`)
  }

  // Example: Get feature flags
  async getFeatureFlags(projectId: string) {
    return this.get(`/projects/${projectId}/feature_flags/`)
  }
}

export const posthogAPI = new PostHogAPI()
