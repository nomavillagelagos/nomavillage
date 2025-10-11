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
      <span className="mx-1 hidden sm:inline">·</span>
      <Link
        href={reviewsSummary.url || "https://maps.google.com/?cid=12085466010589542175"}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:no-underline whitespace-nowrap"
      >
        <span className="hidden sm:inline">{reviewsSummary.user_ratings_total || '17'} </span>
        <span className="sm:hidden">{reviewsSummary.user_ratings_total || '17'}</span>
        <span className="hidden sm:inline">Google Reviews</span>
      </Link>
    </div>
  )
}
