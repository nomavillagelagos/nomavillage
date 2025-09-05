# Webhook Setup Guide: Email Collection to Make → Brevo

This guide explains how to set up the email collection webhook system to integrate with Make.com and Brevo.

## Overview

The system collects email data through a Next.js API route and sends it to:
1. **Make.com** webhook for automation workflows
2. **Brevo** (optional direct integration as fallback)

## Setup Steps

### 1. Environment Variables

Copy `env.example` to `.env.local` and fill in your credentials:

```bash
cp env.example .env.local
```

Required variables:
- `MAKE_WEBHOOK_URL`: Your Make.com webhook URL
- `BREVO_API_KEY`: Your Brevo API key (optional)
- `BREVO_DEFAULT_LIST_ID`: Default contact list ID in Brevo (optional)

### 2. Make.com Setup

1. Create a new scenario in Make.com
2. Add a **Webhook** module as the trigger
3. Copy the webhook URL to your `.env.local` file as `MAKE_WEBHOOK_URL`
4. Add **Brevo** modules to process the email data:
   - Create/Update Contact
   - Add to List
   - Send Welcome Email (optional)

### 3. Brevo Setup

1. Get your API key from Brevo dashboard → API Keys
2. Create a contact list and note the List ID
3. Add these to your `.env.local` file

### 4. Webhook Endpoint

The webhook is available at: `/api/webhook/email`

**POST Request Format:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "source": "homepage",
  "metadata": {
    "customField": "value"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email data processed successfully",
  "data": {
    "email": "user@example.com",
    "timestamp": "2024-01-01T12:00:00Z"
  }
}
```

## Using the Email Signup Form Component

Import and use the `EmailSignupForm` component:

```tsx
import EmailSignupForm from '@/components/email-signup-form'

// Simple email only form
<EmailSignupForm 
  title="Join Our Newsletter"
  source="homepage"
/>

// Detailed form with names
<EmailSignupForm 
  title="Get Early Access"
  description="Be the first to know about new features"
  source="early-access"
  showNames={true}
/>
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "Stay Updated" | Form title |
| `description` | string | "Get the latest updates..." | Form description |
| `source` | string | "website" | Source identifier for tracking |
| `className` | string | "" | Additional CSS classes |
| `showNames` | boolean | false | Show first/last name fields |

## Testing

Test the webhook endpoint:

```bash
curl -X POST http://localhost:3000/api/webhook/email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"test"}'
```

## Make.com Workflow Example

1. **Webhook Trigger** → Receives email data
2. **Filter** → Check if email is valid
3. **Brevo: Create Contact** → Add to Brevo
4. **Brevo: Add to List** → Add to specific list
5. **Email** → Send welcome email (optional)

## Security Notes

- Email validation is performed server-side
- Rate limiting should be implemented for production
- Consider adding CAPTCHA for public forms
- Use HTTPS in production
- Store API keys securely in environment variables

## Troubleshooting

- Check browser console for client-side errors
- Check server logs for webhook processing errors
- Verify Make.com webhook URL is correct
- Test Brevo API key permissions
- Ensure environment variables are loaded correctly
