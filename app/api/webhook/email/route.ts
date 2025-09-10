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
        const brevoContact: BrevoContact = {
          email: emailData.email,
          attributes: {
            FIRSTNAME: emailData.firstName || emailData.name || '',
            LASTNAME: emailData.lastName || '',
            SOURCE: emailData.source,
            SIGNUP_DATE: emailData.timestamp,
            FORM_TYPE: emailData.metadata?.formType || 'unknown'
          }
        }

        // Add to default list if specified
        const defaultListId = process.env.BREVO_DEFAULT_LIST_ID
        if (defaultListId) {
          brevoContact.listIds = [parseInt(defaultListId)]
        }

        // Add to guide-specific list for guide requests
        if (emailData.metadata?.requestType === 'lagos-algarve-guide') {
          const guideListId = process.env.BREVO_GUIDE_LIST_ID
          if (guideListId) {
            brevoContact.listIds = brevoContact.listIds 
              ? [...brevoContact.listIds, parseInt(guideListId)]
              : [parseInt(guideListId)]
          }
        }

        console.log('Sending to Brevo:', JSON.stringify(brevoContact, null, 2))
        
        const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': brevoApiKey
          },
          body: JSON.stringify(brevoContact)
        })

        if (brevoResponse.ok) {
          brevoSuccess = true
          console.log('Successfully created contact in Brevo with list assignment')
        } else {
          const errorData = await brevoResponse.json()
          console.error('Brevo API error:', errorData)
          
          // If contact already exists, try to update and add to list
          if (brevoResponse.status === 400 && errorData.code === 'duplicate_parameter') {
            console.log('Contact exists, updating and ensuring list membership...')
            
            // First update the contact
            const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${emailData.email}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'api-key': brevoApiKey
              },
              body: JSON.stringify({
                attributes: brevoContact.attributes
              })
            })
            
            // Then explicitly add to list using the list-specific endpoint
            if (brevoContact.listIds && brevoContact.listIds.length > 0) {
              for (const listId of brevoContact.listIds) {
                try {
                  const addToListResponse = await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}/contacts/add`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'api-key': brevoApiKey
                    },
                    body: JSON.stringify({
                      emails: [emailData.email]
                    })
                  })
                  
                  if (addToListResponse.ok) {
                    console.log(`Successfully added contact to list ${listId}`)
                  } else {
                    const listError = await addToListResponse.json()
                    console.error(`Failed to add to list ${listId}:`, listError)
                  }
                } catch (listError) {
                  console.error(`Error adding to list ${listId}:`, listError)
                }
              }
            }
            
            if (updateResponse.ok) {
              brevoSuccess = true
              console.log('Successfully updated existing contact and added to lists')
            }
          }
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
