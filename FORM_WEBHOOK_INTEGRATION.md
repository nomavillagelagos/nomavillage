# Form Webhook Integration - Make.com

## Overview
The `/form` page now sends form submission data to Make.com webhook after successful Supabase storage.

## Webhook URL
```
https://hook.eu1.make.com/caxaxq4u39shva6swr6ctty5fmguvdba
```

## Implementation Details

### Location
- **File**: `/app/form/page.tsx`
- **Function**: `handleSubmit()`
- **Line**: After line 458 (after `setSubmitSuccess(true)`)

### Execution Flow
1. User completes all form steps
2. Form data is validated
3. Data is saved to Supabase `user_signups` table
4. Partial signup entry is deleted
5. **✅ Webhook is triggered** (non-blocking)
6. Confetti animation plays
7. User is redirected to `/thankyou`

### Data Sent to Webhook

```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+351 912 345 678",
  "ageRange": "26-32",
  "workStyle": "🌍 Remote employee or freelancer",
  "colivePreference": "Both of the Above",
  "arrivalDate": "2025-11-01",
  "departureDate": "2025-11-15",
  "additionalNotes": "Looking forward to joining!",
  "source": "form_page",
  "timestamp": "2025-10-11T13:16:00.000Z",
  "sessionId": "abc123-def456-ghi789"
}
```

### Key Features

#### Non-Blocking Execution
- Uses `.then().catch()` instead of `await`
- Form submission succeeds even if webhook fails
- User experience is never interrupted

#### Error Handling
- Wrapped in try-catch block
- Logs success/failure to console
- Fails silently without breaking the form

#### Complete Data
- All form fields included
- Null values for optional fields
- Metadata: source, timestamp, sessionId

## Console Logs

### Success
```
✅ Successfully sent form data to Make.com webhook
```

### Failure
```
⚠️ Make.com webhook returned non-OK status: 500
⚠️ Failed to send to Make.com webhook: NetworkError
⚠️ Webhook call failed: Error message
```

## Testing

### Local Testing
1. Fill out the form at `http://localhost:3000/form`
2. Complete all steps and submit
3. Check browser console for webhook logs
4. Verify data in Make.com scenario history

### Production Testing
1. Submit a test form at `https://www.nomavillage.com/form`
2. Check Make.com scenario runs
3. Verify data structure matches expected format

## Make.com Scenario Setup

Your Make.com scenario should:

1. **Webhook Module** (Trigger)
   - Receives POST request with JSON data
   - Data structure matches the format above

2. **Router/Filter** (Optional)
   - Filter by `source: "form_page"`
   - Validate required fields (email, firstName, lastName)

3. **Data Processing**
   - Extract fields from webhook payload
   - Transform data as needed

4. **Actions**
   - Send to CRM (Brevo, HubSpot, etc.)
   - Send notification email
   - Add to spreadsheet
   - Trigger automation workflows

## Troubleshooting

### Webhook Not Firing
- Check browser console for errors
- Verify Supabase submission succeeded first
- Check network tab for POST request to Make.com

### Data Not Received in Make.com
- Verify webhook URL is correct
- Check Make.com scenario is active
- Review Make.com execution history for errors

### Missing Fields
- Check form validation is passing
- Verify all form steps are completed
- Review `formData` state before webhook call

## Related Files
- `/app/form/page.tsx` - Main form component with webhook integration
- `/app/api/webhook/email/route.ts` - Separate webhook for email signups
- `WEBHOOK_INTEGRATION.md` - Email webhook documentation
- `WEBHOOK_SETUP.md` - General webhook setup guide

## Notes
- This webhook is separate from the email signup webhook
- Both can run simultaneously without conflicts
- Form data is always saved to Supabase first (primary source of truth)
- Webhook is a secondary notification/integration mechanism
