"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OctoberABTest() {
  const router = useRouter()

  useEffect(() => {
    // Generate random number (0 or 1) for 50/50 split
    const randomVariant = Math.random() < 0.5 ? 'october-a' : 'october-b'
    
    // Redirect to the selected variant
    router.replace(`/${randomVariant}`)
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-lagos-pink mx-auto mb-4"></div>
        <p className="text-gray-600 font-nunito">Redirecting to your October experience...</p>
      </div>
    </div>
  )
}
