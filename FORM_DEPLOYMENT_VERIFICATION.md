# Form Deployment Verification - Lead & Full Variants

## 🎯 Overview

The form now supports **two variants**:
1. **Full Form** (`/form`) - 10 steps with dates, work style, etc.
2. **Lead Form** (`/form?variant=lead`) - 5 steps for quick lead capture

Both variants share the same codebase and save to the same database tables with a `lead_source` field to differentiate them.

---

## ✅ Pre-Deployment Checklist

### 1. Environment Variables
```bash
# Verify these are set in production
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Database Schema Verification

Run this query in Supabase SQL Editor to verify all required columns exist:

```sql
-- Check user_signups table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'user_signups'
ORDER BY ordinal_position;

-- Check partial_signups table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'partial_signups'
ORDER BY ordinal_position;
```

**Required columns for both tables:**
- `email` (TEXT)
- `first_name` (TEXT)
- `last_name` (TEXT)
- `phone_number` (TEXT)
- `age_range` (TEXT) - nullable
- `work_style` (TEXT) - nullable
- `colive_preference` (TEXT)
- `arrival_date` (DATE) - nullable
- `departure_date` (DATE) - nullable
- `additional_notes` (TEXT) - nullable
- `lead_source` (TEXT) - **CRITICAL** - 'full' or 'short'
- `created_at` (TIMESTAMPTZ)

**Additional for partial_signups:**
- `session_id` (TEXT PRIMARY KEY)
- `current_step` (INTEGER)
- `is_completed` (BOOLEAN)
- `updated_at` (TIMESTAMPTZ)

### 3. Missing Column Fix

If `lead_source` column is missing, run:

```sql
-- Add lead_source to user_signups
ALTER TABLE user_signups ADD COLUMN IF NOT EXISTS lead_source TEXT;

-- Add lead_source to partial_signups
ALTER TABLE partial_signups ADD COLUMN IF NOT EXISTS lead_source TEXT;

-- Add index for filtering
CREATE INDEX IF NOT EXISTS idx_user_signups_lead_source ON user_signups(lead_source);
```

---

## 🧪 Testing Both Form Variants

### Full Form Testing (`/form`)

**Flow:** Welcome → Email → Work Style → Colive Preference → Dates → First Name → Last Name → Phone → Notes → Submit

1. **Navigate to:** `http://localhost:3000/form`
2. **Verify URL parameter:** Should NOT have `?variant=lead`
3. **Check `leadSource` in console:** Should be `'full'`

**Step-by-Step:**
- ✅ Step 1: Welcome screen
- ✅ Step 2: Email input
- ✅ Step 4: Work style (4 options: Remote employee, Entrepreneur, Building something, In transition)
- ✅ Step 5: Colive preference (3 options: Community, Professional, Both)
- ✅ Step 6: Dates with calendar pickers + "Not sure yet" option
- ✅ Step 7: First name
- ✅ Step 8: Last name
- ✅ Step 9: Phone (optional)
- ✅ Step 10: Additional notes (optional)

**Database Check:**
```sql
SELECT email, first_name, last_name, lead_source, work_style, arrival_date, departure_date
FROM user_signups 
WHERE lead_source = 'full'
ORDER BY created_at DESC 
LIMIT 1;
```

**Expected:** `lead_source = 'full'`, all fields populated

---

### Lead Form Testing (`/form?variant=lead`)

**Flow:** Welcome → First Name → Email → What's Important → Phone → Submit

1. **Navigate to:** `http://localhost:3000/form?variant=lead`
2. **Verify URL parameter:** Should have `?variant=lead`
3. **Check `leadSource` in console:** Should be `'short'`

**Step-by-Step:**
- ✅ Step 1: Welcome screen (same as full)
- ✅ Step 2: First name input
- ✅ Step 3: Email input
- ✅ Step 4: What's most important (4 options: Surf & Beach, Coworking, Yoga, All of the Above)
- ✅ Step 5: Phone (optional) - **LAST STEP, triggers submit**

**Key Differences:**
- No work style question
- No dates question
- No last name question (only first name)
- No additional notes
- Different colive preference options (lifestyle-focused vs community-focused)
- Only 5 steps total vs 10 steps

**Database Check:**
```sql
SELECT email, first_name, last_name, lead_source, colive_preference, arrival_date
FROM user_signups 
WHERE lead_source = 'short'
ORDER BY created_at DESC 
LIMIT 1;
```

**Expected:** 
- `lead_source = 'short'`
- `first_name` populated
- `last_name` should be NULL or empty
- `work_style` should be NULL
- `arrival_date` and `departure_date` should be NULL
- `colive_preference` populated with lifestyle option

---

## 🔍 Critical Validation Points

### 1. Lead Source Tracking
```typescript
// In form code (lines 66-71)
useEffect(() => {
  setFormData(prev => ({
    ...prev,
    leadSource: isLeadForm ? 'short' : 'full'
  }));
}, [isLeadForm]);
```

**Test:** Open browser console and check `formData.leadSource`

### 2. Step Configuration
```typescript
// Full form: 10 steps (lines 18-33)
// Lead form: 5 steps (lines 34-43)
```

**Test:** Progress bar should show correct total steps

### 3. Conditional Rendering
- Step 2: Email (full) vs First Name (lead)
- Step 3: Removed (full) vs Email (lead)
- Step 4: Work Style (full) vs What's Important (lead)
- Step 5: Colive Preference (full) vs Phone (lead)

**Test:** Navigate through both forms and verify correct questions appear

### 4. Webhook Integration
Both forms send to the same Make.com webhook with `leadSource` field:

```javascript
// Lines 577-592
const webhookData = {
  email: formData.email,
  firstName: formData.firstName,
  lastName: formData.lastName,
  // ... other fields
  leadSource: formData.leadSource, // 'full' or 'short'
  source: 'form_page',
  timestamp: new Date().toISOString(),
  sessionId: sessionId || null
};
```

**Test:** Check Make.com scenario receives `leadSource` field correctly

---

## 🚨 Common Issues & Fixes

### Issue 1: Lead form shows wrong steps
**Symptom:** Lead form shows 10 steps instead of 5
**Cause:** URL parameter not detected
**Fix:** Verify `useSearchParams()` is working and `isLeadForm` is set correctly

### Issue 2: Database insert fails
**Symptom:** "Configuration error" on submit
**Cause:** Missing `lead_source` column
**Fix:** Run the ALTER TABLE command above

### Issue 3: Wrong lead_source value saved
**Symptom:** Full form saves as 'short' or vice versa
**Cause:** `leadSource` not set in useEffect
**Fix:** Check lines 66-71 are present and working

### Issue 4: Phone step doesn't submit (lead form)
**Symptom:** Clicking submit does nothing on step 5 of lead form
**Cause:** Submit handler not triggered
**Fix:** Verify lines 956-960 handle Enter key correctly

---

## 📊 Analytics Verification

### PostHog Events to Check

Both forms should track:
- `form_session_started` - with `session_id`
- `form_step_entered` - with `step` and `step_name`
- `form_step_completed` - with timing data
- `form_submit_success` - with `lead_source` in properties

**Test:** Open PostHog dashboard and filter events by `lead_source` property

---

## 🎯 Acceptance Criteria

### Full Form (`/form`)
- [ ] All 10 steps render correctly
- [ ] Date picker works with calendar
- [ ] "Not sure yet" dates option works
- [ ] All fields save to database
- [ ] `lead_source = 'full'` in database
- [ ] Webhook receives full form data

### Lead Form (`/form?variant=lead`)
- [ ] Only 5 steps render
- [ ] First name comes before email
- [ ] Different colive preference options show
- [ ] No dates, no last name, no notes
- [ ] Phone step triggers submit
- [ ] `lead_source = 'short'` in database
- [ ] Webhook receives lead form data

### Both Forms
- [ ] Progressive save works (partial_signups)
- [ ] Resume feature works after abandonment
- [ ] Confetti shows on submit
- [ ] Redirect to /thankyou works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] PostHog events fire correctly

---

## 🚀 Deployment Steps

1. **Verify database schema** (run SQL checks above)
2. **Test locally** (both `/form` and `/form?variant=lead`)
3. **Check Supabase data** (verify `lead_source` field)
4. **Test webhook** (check Make.com receives data)
5. **Deploy to production**
6. **Test production URLs**
7. **Monitor PostHog events**
8. **Check first submissions in Supabase**

---

## 📈 Post-Deployment Monitoring

### Week 1 Metrics

**Full Form:**
- Completion rate: `(submissions with lead_source='full') / (sessions starting full form)`
- Average time to complete
- Drop-off by step

**Lead Form:**
- Completion rate: `(submissions with lead_source='short') / (sessions starting lead form)`
- Average time to complete
- Conversion rate comparison vs full form

**Query to compare:**
```sql
SELECT 
  lead_source,
  COUNT(*) as total_submissions,
  AVG(EXTRACT(EPOCH FROM (created_at - created_at))) as avg_time
FROM user_signups
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY lead_source;
```

---

## ✅ Final Checklist Before Deploy

- [ ] Both form variants tested locally
- [ ] Database has `lead_source` column
- [ ] Supabase RLS policies allow inserts
- [ ] Environment variables set in production
- [ ] Webhook URL is correct
- [ ] PostHog tracking works
- [ ] Mobile testing completed
- [ ] No console errors in either variant
- [ ] Data saves correctly for both variants
- [ ] Team knows about two form variants

---

## 🎉 Ready to Deploy!

If all checks pass, you're ready to deploy both form variants to production.

**Access URLs:**
- Full form: `https://nomavillage.com/form`
- Lead form: `https://nomavillage.com/form?variant=lead`

Good luck! 🚀
