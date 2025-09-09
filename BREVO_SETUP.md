# Brevo CRM Direct Integration Setup

## Overview
Your coliving website now uses direct Brevo CRM API integration as the primary method for capturing leads, with webhook fallbacks for reliability.

## Integration Features

### ✅ Direct Brevo API Integration
- **Primary**: Direct contact creation in Brevo CRM
- **Smart handling**: Automatically updates existing contacts
- **List management**: Separate lists for newsletter and guide requests
- **Rich data**: Captures form type, signup date, and source tracking

### ✅ Fallback System
- **Zapier webhook**: Activates only if Brevo API fails
- **Make.com webhook**: Secondary fallback option
- **Reliability**: Ensures no leads are lost

## Required Environment Variables

Add these to your `.env.local` file:

```env
# Brevo CRM API Configuration (Primary integration)
BREVO_API_KEY=your-brevo-api-key-here
BREVO_DEFAULT_LIST_ID=1
BREVO_GUIDE_LIST_ID=2

# Zapier Webhook Configuration (Fallback)
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/13042322/udqwdo8/
```

## Getting Your Brevo API Key

1. **Login to Brevo**: Go to [app.brevo.com](https://app.brevo.com)
2. **Navigate to API Keys**: Settings → API Keys
3. **Create New Key**: Click "Generate a new API key"
4. **Copy the key**: Add it to your environment variables

## Setting Up Contact Lists

### Default Newsletter List
1. Go to **Contacts** → **Lists** in Brevo
2. Create or note the ID of your main newsletter list
3. Add the list ID as `BREVO_DEFAULT_LIST_ID`

### Guide Requests List (Optional)
1. Create a separate list for Lagos guide requests
2. Add the list ID as `BREVO_GUIDE_LIST_ID`
3. This helps segment guide requests from general newsletter signups

## Data Structure Sent to Brevo

### Newsletter Signup
```json
{
  "email": "user@example.com",
  "attributes": {
    "FIRSTNAME": "John",
    "LASTNAME": "Doe", 
    "SOURCE": "newsletter",
    "SIGNUP_DATE": "2025-01-10T00:13:58.000Z",
    "FORM_TYPE": "detailed"
  },
  "listIds": [1]
}
```

### Guide Request
```json
{
  "email": "user@example.com",
  "attributes": {
    "SOURCE": "guide-modal",
    "SIGNUP_DATE": "2025-01-10T00:13:58.000Z", 
    "FORM_TYPE": "guide-request"
  },
  "listIds": [1, 2]
}
```

## Contact Attributes in Brevo

The integration automatically creates these custom attributes:
- **FIRSTNAME**: Contact's first name
- **LASTNAME**: Contact's last name  
- **SOURCE**: Form source (newsletter, guide-modal, etc.)
- **SIGNUP_DATE**: When they signed up
- **FORM_TYPE**: Type of form used (detailed, simple, guide-request)

## Error Handling

### Duplicate Contacts
- If contact already exists, the system automatically updates their information
- Adds them to new lists while preserving existing list memberships

### API Failures
- Logs detailed error information for debugging
- Falls back to Zapier webhook if Brevo API fails
- User experience remains smooth regardless of backend issues

## Testing the Integration

1. **Submit test forms** on your website
2. **Check Brevo contacts** to verify data appears correctly
3. **Monitor Vercel logs** for any API errors
4. **Verify list assignments** are working as expected

## Monitoring & Debugging

### Vercel Function Logs
- Check for "Successfully created contact in Brevo" messages
- Look for any "Brevo API error" entries
- Monitor fallback webhook usage

### Brevo Dashboard
- Monitor contact creation in real-time
- Check list growth and segmentation
- Review contact attributes for data quality

## Benefits of Direct Integration

1. **Faster processing**: No third-party webhook delays
2. **Better error handling**: Immediate API response feedback
3. **Richer data**: More contact attributes and metadata
4. **List management**: Automatic list assignment based on form type
5. **Cost effective**: No Zapier task usage for successful Brevo calls
6. **Reliability**: Multiple fallback options ensure no data loss
