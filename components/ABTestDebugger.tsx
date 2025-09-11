'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function ABTestDebugger() {
  const [variant, setVariant] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Get variant from cookie
    const cookieVariant = document.cookie
      .split('; ')
      .find(row => row.startsWith('ab_test_variant='))
      ?.split('=')[1]
    
    setVariant(cookieVariant || null)
    
    // Show debugger only in development or when ?debug=true
    const urlParams = new URLSearchParams(window.location.search)
    const isDev = process.env.NODE_ENV === 'development'
    const hasDebugParam = urlParams.get('debug') === 'true'
    
    setIsVisible(isDev || hasDebugParam)
  }, [])

  const clearVariant = () => {
    document.cookie = 'ab_test_variant=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.location.reload()
  }

  const setVariantA = () => {
    document.cookie = 'ab_test_variant=A; max-age=2592000; path=/'
    window.location.reload()
  }

  const setVariantB = () => {
    document.cookie = 'ab_test_variant=B; max-age=2592000; path=/'
    window.location.reload()
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 shadow-lg border-2 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            A/B Test Debugger
            <Badge variant={variant === 'A' ? 'default' : variant === 'B' ? 'secondary' : 'outline'}>
              {variant || 'None'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-xs text-gray-600">
            Current variant: <strong>{variant || 'Not assigned'}</strong>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={setVariantA}>
              Force A
            </Button>
            <Button size="sm" variant="outline" onClick={setVariantB}>
              Force B
            </Button>
            <Button size="sm" variant="destructive" onClick={clearVariant}>
              Clear
            </Button>
          </div>
          
          <div className="text-xs text-gray-500">
            Add ?debug=true to URL to show in production
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
