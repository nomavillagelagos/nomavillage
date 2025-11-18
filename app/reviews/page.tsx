import type { Metadata } from 'next'

export const revalidate = 60 * 60 * 12 // 12 hours ISR

export const metadata: Metadata = {
  title: 'Reviews',
  description: 'Read real Google reviews about Noma Village coliving and coworking in Lagos, Portugal.'
}

async function getReviews() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || ''
  const url = `${base}/api/google-reviews`
  try {
    const res = await fetch(url, { next: { revalidate, tags: ['google-reviews'] } })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function ReviewsPage() {
  const data = await getReviews()
  const reviews: Array<{
    author_name: string
    rating: number
    text: string
    relative_time_description?: string
    profile_photo_url?: string
    author_url?: string
  }> = data?.reviews || []
  const rating = data?.rating
  const total = data?.user_ratings_total
  const placeName = data?.name || 'Noma Village Lagos'

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-5xl px-4 py-16">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-gray-900">What people say about {placeName}</h1>
          {typeof rating === 'number' && typeof total === 'number' && (
            <p className="mt-3 text-gray-600 font-nunito">
              Google rating <span className="font-semibold">{rating}/5</span> · <span className="font-semibold">{total}</span> reviews
            </p>
          )}
        </header>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {reviews.length === 0 && (
            <div className="text-gray-600 font-nunito">No reviews available right now.</div>
          )}
          {reviews.map((r, i) => (
            <article key={i} className="border border-gray-100 shadow-sm rounded-2xl p-6 bg-white">
              <div className="mb-3 flex items-center gap-2">
                <div className="text-yellow-400">{'★★★★★'.slice(0, Math.max(1, Math.min(5, r.rating)))}</div>
                <span className="text-sm text-gray-500 font-medium">{r.rating}/5{r.relative_time_description ? ` · ${r.relative_time_description}` : ''}</span>
              </div>
              <p className="font-nunito text-gray-800 leading-relaxed">"{r.text}"</p>
              <div className="mt-4 flex items-center gap-3">
                {r.profile_photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.profile_photo_url} alt={r.author_name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lagos-blue-green to-lagos-aquamarine flex items-center justify-center text-white font-montserrat">
                    {r.author_name?.charAt(0) || '?'}
                  </div>
                )}
                {r.author_url ? (
                  <a href={r.author_url} target="_blank" rel="noopener noreferrer" className="font-montserrat font-semibold text-gray-900 hover:text-lagos-blue-green">
                    {r.author_name}
                  </a>
                ) : (
                  <div className="font-montserrat font-semibold text-gray-900">{r.author_name}</div>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-gray-500 font-nunito">
          Source: Google Reviews. Some short excerpts may be reordered for readability.
        </p>
      </section>
    </main>
  )
}
