import { NextRequest, NextResponse } from 'next/server'

interface EmailData {
  email: string
  name?: string
  firstName?: string
  lastName?: string
  source?: string
  timestamp?: string
  metadata?: Record<string, any>
}

interface BrevoContact {
  email: string
  attributes: {
    FIRSTNAME?: string
    LASTNAME?: string
    SOURCE?: string
  }
  listIds?: number[]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required email field
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Structure the email data
    const emailData: EmailData = {
      email: body.email,
      name: body.name,
      firstName: body.firstName || body.first_name || body.name || '',
      lastName: body.lastName || body.last_name || '',
      source: body.source || 'website',
      timestamp: new Date().toISOString(),
      metadata: {
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        ...body.metadata
      }
    }

    // Send to Zapier webhook (primary)
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL
    if (zapierWebhookUrl) {
      try {
        await fetch(zapierWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData)
        })
      } catch (error) {
        console.error('Failed to send to Zapier webhook:', error)
      }
    }

    // Send to Make webhook (alternative)
    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL
    if (makeWebhookUrl) {
      try {
        await fetch(makeWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData)
        })
      } catch (error) {
        console.error('Failed to send to Make webhook:', error)
      }
    }

    // Send to Brevo directly (optional fallback)
    const brevoApiKey = process.env.BREVO_API_KEY
    if (brevoApiKey) {
      try {
        const brevoContact: BrevoContact = {
          email: emailData.email,
          attributes: {
            FIRSTNAME: emailData.firstName || emailData.name || '',
            LASTNAME: emailData.lastName || '',
            SOURCE: emailData.source
          }
        }

        // Add to default list if specified
        const defaultListId = process.env.BREVO_DEFAULT_LIST_ID
        if (defaultListId) {
          brevoContact.listIds = [parseInt(defaultListId)]
        }

        await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': brevoApiKey
          },
          body: JSON.stringify(brevoContact)
        })
      } catch (error) {
        console.error('Failed to send to Brevo:', error)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Email data processed successfully',
      data: {
        email: emailData.email,
        timestamp: emailData.timestamp
      }
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Email webhook endpoint is active',
    endpoint: '/api/webhook/email',
    methods: ['POST'],
    requiredFields: ['email'],
    optionalFields: ['firstName', 'lastName', 'source', 'metadata']
  })
}
