# Webhook Integration Setup Guide

## Overview
Your coliving website has a complete data integration system that captures leads from two forms and sends them to Zapier webhooks, which then forward the data to Bevo CRM.

## Forms Integrated
1. **Newsletter Signup Form** - Captures firstName, lastName, email
2. **Lagos Guide Popup** - Captures email only

## API Endpoint
Both forms use the same endpoint: `/api/webhook/email`

### Data Structure Sent to Zapier
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "source": "website|guide-modal|newsletter",
  "timestamp": "2025-01-09T21:56:48.000Z",
  "metadata": {
    "formType": "detailed|simple|guide-request",
    "userAgent": "Mozilla/5.0...",
    "ip": "192.168.1.1",
    "requestType": "lagos-algarve-guide" // only for guide modal
  }
}
```

## Environment Variables Setup

### Required for Zapier Integration
```env
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID_HERE
```

### Optional Fallbacks
```env
# Make.com alternative
MAKE_WEBHOOK_URL=https://hook.eu1.make.com/your-webhook-id-here

# Direct Brevo integration
BREVO_API_KEY=your-brevo-api-key-here
BREVO_DEFAULT_LIST_ID=1

# Security (optional)
WEBHOOK_SECRET=your-webhook-secret-key
```

## Zapier Setup Instructions

### Step 1: Create Zapier Webhook
1. Go to Zapier.com and create a new Zap
2. Choose "Webhooks by Zapier" as the trigger
3. Select "Catch Hook" as the trigger event
4. Copy the webhook URL provided by Zapier
5. Add it to your `.env.local` file as `ZAPIER_WEBHOOK_URL`

### Step 2: Configure Bevo CRM Action
1. Add Bevo CRM as the action app in your Zap
2. Map the fields from the webhook data:
   - Email → Bevo Email field
   - First Name → Bevo First Name field
   - Last Name → Bevo Last Name field
   - Source → Bevo Lead Source field
   - Timestamp → Bevo Date Created field

### Step 3: Test the Integration
1. Submit a test form on your website
2. Check Zapier's task history to see if the webhook was received
3. Verify the data appears correctly in Bevo CRM

## Form Usage Examples

### Newsletter Signup (with names)
```tsx
<EmailSignupForm 
  title="Stay Connected"
  description="Get updates on community events"
  source="newsletter"
  showNames={true}
/>
```

### Simple Email Capture
```tsx
<EmailSignupForm 
  title="Get Updates"
  description="Join our mailing list"
  source="footer"
  showNames={false}
/>
```

### Lagos Guide Modal
The guide modal is automatically configured and triggers when users click the guide button.

## Error Handling
- Forms show loading states during submission
- Success/error messages are displayed to users
- Failed webhook calls are logged but don't break the user experience
- Multiple webhook destinations can be configured as fallbacks

## Security Features
- Email validation on both client and server
- Rate limiting protection (via Vercel)
- User agent and IP tracking for analytics
- Optional webhook secret for additional security

## Monitoring
- Check Vercel function logs for webhook delivery status
- Monitor Zapier task history for successful triggers
- Review Bevo CRM for lead data accuracy
