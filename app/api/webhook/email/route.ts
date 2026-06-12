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
    SIGNUP_DATE?: string
    FORM_TYPE?: string
  }
  listIds?: number[]
  updateEnabled?: boolean
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

    // Send to Brevo CRM (primary integration)
    const brevoApiKey = process.env.BREVO_API_KEY
    let brevoSuccess = false
    
    if (!brevoApiKey) {
      console.error('BREVO_API_KEY not found in environment variables')
    }
    
    if (brevoApiKey) {
      try {
        const brevoContact = {
          attributes: {
            FIRSTNAME: emailData.firstName || emailData.name || '',
            LASTNAME: emailData.lastName || '',
            SOURCE: emailData.source,
            SIGNUP_DATE: emailData.timestamp,
            FORM_TYPE: emailData.metadata?.formType || 'unknown'
          }
        }

        const defaultListId = process.env.BREVO_DEFAULT_LIST_ID
        const doiTemplateId = process.env.BREVO_DOI_TEMPLATE_ID || '25'

        const doiPayload = {
          email: emailData.email,
          attributes: brevoContact.attributes,
          includeListIds: defaultListId ? [parseInt(defaultListId)] : [],
          templateId: parseInt(doiTemplateId),
          redirectionUrl: 'https://nomavillage.com/thankyou'
        }

        console.log('Sending DOI request to Brevo:', JSON.stringify(doiPayload, null, 2))

        const brevoResponse = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': brevoApiKey
          },
          body: JSON.stringify(doiPayload)
        })

        if (brevoResponse.ok) {
          brevoSuccess = true
          console.log('Successfully triggered Brevo DOI confirmation email')
        } else {
          const errorData = await brevoResponse.json()
          console.error('Brevo DOI API error:', errorData)
        }
      } catch (error) {
        console.error('Failed to send to Brevo:', error)
      }
    }

    // Fallback to Make.com webhook (only if Brevo fails)
    if (!brevoSuccess) {
      const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL
      if (makeWebhookUrl) {
        try {
          const makeResponse = await fetch(makeWebhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
          })
          
          if (makeResponse.ok) {
            console.log('Successfully sent to Make.com webhook as fallback')
          } else {
            console.error('Make.com webhook failed with status:', makeResponse.status)
          }
        } catch (error) {
          console.error('Failed to send to Make.com webhook:', error)
        }
      } else {
        console.error('No fallback webhook configured and Brevo API failed')
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
