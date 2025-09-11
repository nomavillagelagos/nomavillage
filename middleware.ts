import { NextRequest, NextResponse } from 'next/server'

const EXPERIMENT_COOKIE = 'ab_test_variant'
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 // 30 days in seconds

export function middleware(request: NextRequest) {
  // Only run A/B test on landing page routes
  if (!request.nextUrl.pathname.startsWith('/landing')) {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  
  try {
    // Check if user already has a variant assigned
    let variant = request.cookies.get(EXPERIMENT_COOKIE)?.value

    // If no variant exists, assign one randomly (50/50 split)
    if (!variant || (variant !== 'A' && variant !== 'B')) {
      variant = Math.random() < 0.5 ? 'A' : 'B'
      
      // Set cookie with 30-day expiration
      response.cookies.set(EXPERIMENT_COOKIE, variant, {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: false, // Allow client-side access for analytics
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      })
    }

    // Route to appropriate variant
    if (request.nextUrl.pathname === '/landing') {
      const url = request.nextUrl.clone()
      url.pathname = `/landing-${variant.toLowerCase()}`
      
      // Add variant info to headers for analytics
      const rewriteResponse = NextResponse.rewrite(url)
      rewriteResponse.headers.set('x-ab-variant', variant)
      rewriteResponse.headers.set('x-experiment-name', 'landing_page_test')
      
      // Copy the cookie to the rewrite response
      const cookieValue = response.cookies.get(EXPERIMENT_COOKIE)
      if (cookieValue) {
        rewriteResponse.cookies.set(EXPERIMENT_COOKIE, cookieValue.value, {
          maxAge: COOKIE_MAX_AGE,
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/'
        })
      }
      
      return rewriteResponse
    }

    // For direct variant access, respect the URL and don't redirect
    if (request.nextUrl.pathname === '/landing-a' || request.nextUrl.pathname === '/landing-b') {
      const requestedVariant = request.nextUrl.pathname === '/landing-a' ? 'A' : 'B'
      
      // Set headers for analytics with the requested variant
      response.headers.set('x-ab-variant', requestedVariant)
      response.headers.set('x-experiment-name', 'landing_page_test')
    }

    return response
  } catch (error) {
    // Fallback to variant A on any error
    console.error('A/B testing middleware error:', error)
    
    if (request.nextUrl.pathname === '/landing') {
      const url = request.nextUrl.clone()
      url.pathname = '/landing-a'
      return NextResponse.rewrite(url)
    }
    
    return response
  }
}

export const config = {
  matcher: [
    '/landing',
    '/landing-a',
    '/landing-b'
  ]
}
