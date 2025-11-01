import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

// POST /api/revalidate-reviews?secret=YOUR_TOKEN
// Triggers cache purge for the 'google-reviews' tag
export async function POST(req: Request) {
  const url = new URL(req.url)
  const token = url.searchParams.get('secret') || (await req.text()) || ''
  const expected = process.env.REVALIDATE_SECRET || ''

  if (!expected || token.trim() !== expected.trim()) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    revalidateTag('google-reviews')
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Failed' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  // Convenience GET support, same semantics as POST for manual triggering
  return POST(req)
}
