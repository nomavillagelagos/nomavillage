import { NextResponse } from 'next/server'
import path from 'path'

// GET /api/google-reviews
// Requires env: GOOGLE_PLACES_API_KEY and GOOGLE_PLACES_PLACE_ID
export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID

  if (!key || !placeId) {
    // Fallback static sample reviews when not configured
    return NextResponse.json({
      source: 'static',
      name: 'Noma Village Lagos',
      rating: 4.8,
      user_ratings_total: 18,
      reviews: [
        { author_name: 'Fabienne S', rating: 5, text: 'The perfect balance of focus and connection. Great wifi, yoga and awesome hosts!', author_url: 'https://www.google.com/maps/contrib/113065037396401172905/reviews' },
        { author_name: 'Mr. X (volvic)', rating: 5, text: 'Super welcoming community and inspiring people. Loved the energy and the place.', author_url: 'https://www.google.com/maps/contrib/107772854416821939764/reviews' },
        { author_name: 'Pat Rick', rating: 5, text: 'Amazing month here. Beautiful setting, 10 minutes to the beach, genuine community.', author_url: 'https://www.google.com/maps/contrib/105503513928987597340/reviews' },
      ],
    }, { status: 200 })
  }

  try {
    const fields = [
      'name',
      'rating',
      'user_ratings_total',
      'reviews'
    ].join(',')

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${encodeURIComponent(fields)}&reviews_sort=newest&key=${encodeURIComponent(key)}`
    // Vercel/serverless-friendly caching: 12h revalidate + tag for manual purge
    const res = await fetch(url, { next: { revalidate: 60 * 60 * 12, tags: ['google-reviews'] } })
    const data = await res.json()

    if (data.status !== 'OK' || !data.result) {
      throw new Error(`Google Places error: ${data.status}`)
    }

    const result = data.result

    // Normalize Google reviews
    const liveReviews = (result.reviews || []).map((r: any) => ({
      author_name: r.author_name,
      rating: r.rating,
      text: r.text,
      relative_time_description: r.relative_time_description,
      profile_photo_url: r.profile_photo_url,
      author_url: r.author_url,
    }))

    // Read static extra reviews if present
    let extraReviews: any[] = []
    try {
      const file = path.join(process.cwd(), 'data', 'extra-reviews.json')
      const { promises: fs } = await import('fs')
      const raw = await fs.readFile(file, 'utf8')
      extraReviews = JSON.parse(raw)
    } catch (_) {
      extraReviews = []
    }

    // Merge, de-dupe (by text+author), sort: longer text first; short texts go to the end
    const all = [...liveReviews, ...extraReviews]
      .filter((r) => r && typeof r.text === 'string')

    const keyOf = (r: any) => `${(r.author_name || '').trim()}__${r.text.trim()}`
    const seen = new Set<string>()
    const deduped: any[] = []
    for (const r of all) {
      const k = keyOf(r)
      if (!seen.has(k)) {
        seen.add(k)
        deduped.push(r)
      }
    }

    const SHORT_LIMIT = 80
    const withText = deduped.filter(r => r.text.trim().length > 0)
    const long = withText.filter(r => r.text.trim().length >= SHORT_LIMIT).sort((a, b) => b.text.length - a.text.length)
    const short = withText.filter(r => r.text.trim().length < SHORT_LIMIT).sort((a, b) => b.rating - a.rating)
    const mergedReviews = [...long, ...short]

    const payload = {
      source: 'google-places',
      name: result.name,
      rating: result.rating,
      user_ratings_total: result.user_ratings_total,
      reviews: mergedReviews,
    }
    return NextResponse.json(payload)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to fetch reviews' }, { status: 500 })
  }
}
