import { NextResponse } from 'next/server'

// Server-side fallback endpoint to forward analytics events to PostHog
// Accepts: { event: string, properties?: Record<string, any>, distinct_id?: string }
// Uses server API key and host to forward to PostHog capture API.

export async function POST(req: Request) {
  try {
    const { event, properties = {}, distinct_id } = await req.json()

    if (!event || typeof event !== 'string') {
      return NextResponse.json({ error: 'Missing event' }, { status: 400 })
    }

    const apiKey = process.env.POSTHOG_SERVER_KEY || process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = (process.env.POSTHOG_HOST || process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com').replace(/\/$/, '')

    if (!apiKey) {
      return NextResponse.json({ error: 'PostHog server key not configured' }, { status: 500 })
    }

    // Build payload according to PostHog HTTP API
    const payload = {
      api_key: apiKey,
      event,
      properties: {
        ...properties,
        distinct_id: distinct_id || properties.distinct_id || undefined,
      },
    }

    const resp = await fetch(`${host}/capture/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // keepalive helps on page unloads
      keepalive: true,
      // Do not revalidate edge caches
      cache: 'no-store',
    })

    if (!resp.ok) {
      const text = await resp.text().catch(() => '')
      return NextResponse.json({ error: 'Upstream error', status: resp.status, body: text }, { status: 502 })
    }

    // Pass through success
    return new NextResponse(null, { status: 204 })
  } catch (err: any) {
    return NextResponse.json({ error: 'Invalid request', message: err?.message || 'unknown' }, { status: 400 })
  }
}
