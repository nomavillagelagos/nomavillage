'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Star } from "lucide-react"

interface ReviewsSummary {
  rating?: number
  user_ratings_total?: number
  url?: string
}

export function GoogleReviewsWrapper() {
  const [reviewsSummary, setReviewsSummary] = useState<ReviewsSummary | null>(null)

  useEffect(() => {
    // Fetch summary for Google reviews (rating, total, url)
    fetch('/api/google-reviews', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then((data) => {
        if (data) {
          setReviewsSummary({ 
            rating: data.rating, 
            user_ratings_total: data.user_ratings_total, 
            url: data.url 
          })
        }
      })
      .catch(() => {})
  }, [])

  if (!reviewsSummary) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-1 text-sm font-nunito">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(reviewsSummary.rating || 0)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-white/30'
            }`}
          />
        ))}
      </div>
      <span className="ml-1">{reviewsSummary.rating?.toFixed(1) || '4.8'}</span>
      <span className="mx-1">·</span>
      <Link
        href={reviewsSummary.url || "https://maps.google.com/?cid=12085466010589542175"}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:no-underline"
      >
        {reviewsSummary.user_ratings_total ? `${reviewsSummary.user_ratings_total} Google Reviews` : '18 Google Reviews'}
      </Link>
    </div>
  )
}
