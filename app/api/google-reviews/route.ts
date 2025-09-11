import { NextResponse } from 'next/server'

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
      'reviews',
      'url'
    ].join(',')

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${encodeURIComponent(fields)}&reviews_sort=newest&key=${encodeURIComponent(key)}`
    const res = await fetch(url, { next: { revalidate: 60 } })
    const data = await res.json()

    if (data.status !== 'OK' || !data.result) {
      throw new Error(`Google Places error: ${data.status}`)
    }

    const result = data.result
    // Normalize:
    const payload = {
      source: 'google-places',
      name: result.name,
      rating: result.rating,
      user_ratings_total: result.user_ratings_total,
      url: result.url,
      reviews: (result.reviews || []).map((r: any) => ({
        author_name: r.author_name,
        rating: r.rating,
        text: r.text,
        relative_time_description: r.relative_time_description,
        profile_photo_url: r.profile_photo_url,
        author_url: r.author_url,
      }))
    }

    return NextResponse.json(payload)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to fetch reviews' }, { status: 500 })
  }
}
