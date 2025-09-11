# A/B Testing Setup with PostHog & Vercel Edge Middleware

This document outlines the complete A/B testing implementation for the NomaVillage Next.js App Router project.

## 🚀 Features Implemented

- ✅ **Edge-based A/B Testing** with Vercel Middleware
- ✅ **50/50 Split** between variants A and B
- ✅ **30-day Cookie Persistence** for consistent user experience
- ✅ **PostHog Analytics** with heatmaps and session recordings
- ✅ **Google Analytics** integration alongside PostHog
- ✅ **Zero CLS** (Cumulative Layout Shift) implementation
- ✅ **Production-ready** error handling and fallbacks

## 📁 File Structure

```
├── middleware.ts                    # Edge-based A/B testing logic
├── lib/posthog.ts                  # PostHog configuration and utilities
├── components/
│   ├── PostHogProvider.tsx         # PostHog React provider
│   └── ABTestDebugger.tsx          # Development debugging tool
├── app/
│   ├── layout.tsx                  # Updated with analytics providers
│   ├── landing-a/page.tsx          # Variant A landing page
│   └── landing-b/page.tsx          # Variant B landing page
└── env.example                     # Environment variables template
```

## 🔧 Setup Instructions

### 1. Environment Variables

Copy the PostHog configuration to your `.env.local`:

```bash
# PostHog Analytics Configuration
NEXT_PUBLIC_POSTHOG_KEY=phc_UfN3aOMHgVklYzHz2os4MlBHLxzjSJTEdrHZLP3Bj8z
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com

# Google Analytics Configuration (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-measurement-id
```

### 2. Install Dependencies

```bash
npm install posthog-js
```

### 3. Test the Implementation

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Visit Landing Page**:
   - Go to `http://localhost:3000/landing`
   - You'll be automatically assigned variant A or B (50/50 split)

3. **Debug A/B Testing**:
   - The debugger appears automatically in development
   - Or add `?debug=true` to any URL in production
   - Use the debugger to force specific variants or clear assignments

## 📊 Analytics Events Tracked

### PostHog Events

1. **`experiment_viewed`** - Fired when user sees a landing page variant
   ```javascript
   {
     experiment_name: 'landing_page_test',
     variant: 'A' | 'B',
     page: '/landing-a' | '/landing-b',
     timestamp: '2024-01-01T00:00:00.000Z'
   }
   ```

2. **`cta_clicked`** - Fired when user clicks CTA buttons
   ```javascript
   {
     button_text: 'Secure Your Spot Now',
     page: 'landing-a' | 'landing-b',
     location: 'hero' | 'private-space' | 'final_cta',
     form_type: 'application',
     experiment_name: 'landing_page_test',
     variant: 'A' | 'B',
     timestamp: '2024-01-01T00:00:00.000Z'
   }
   ```

### Google Analytics Events

- **`cta_click`** - CTA button interactions
- **`guide_click`** - Guide download interactions
- **`$pageview`** - Page view tracking

## 🛠 How It Works

### 1. Middleware Logic (`middleware.ts`)

- Runs on Vercel Edge Runtime for zero latency
- Checks for existing `ab_test_variant` cookie
- Assigns random variant (A/B) with 50/50 split if none exists
- Rewrites `/landing` to `/landing-a` or `/landing-b`
- Sets 30-day persistent cookie
- Adds variant headers for analytics

### 2. PostHog Integration

- **Automatic Initialization**: PostHog loads on app start
- **Page View Tracking**: Tracks all page views with variant info
- **Event Tracking**: Custom events for experiment analysis
- **Heatmaps**: Enabled for user behavior analysis
- **Session Recordings**: Captures user interactions
- **EU Compliance**: Uses EU PostHog instance

### 3. Landing Page Variants

**Variant A** (`/landing-a`):
- Uses `/images/surf.jpg` as hero background
- Standard testimonial copy
- Tracks as variant 'A' in analytics

**Variant B** (`/landing-b`):
- Uses `/images/cliff2.jpg` as hero background  
- Enhanced testimonial copy with more detail
- Tracks as variant 'B' in analytics

## 🔍 Testing & Debugging

### Development Mode
- A/B Test Debugger appears automatically
- Force specific variants for testing
- Clear variant assignments
- Real-time variant display

### Production Testing
- Add `?debug=true` to any URL to show debugger
- Check browser cookies for `ab_test_variant`
- Monitor PostHog dashboard for events
- Verify Google Analytics integration

## 📈 Analytics Dashboard

### PostHog Dashboard
1. Go to PostHog EU instance
2. Check "Events" for `experiment_viewed` and `cta_clicked`
3. Create insights comparing variants A vs B
4. Monitor conversion rates and user behavior

### Key Metrics to Track
- **Experiment Views**: Total users seeing each variant
- **CTA Click Rate**: Conversion rate by variant
- **Form Completions**: End-to-end conversion tracking
- **Session Duration**: User engagement by variant
- **Bounce Rate**: Page effectiveness comparison

## 🚨 Error Handling

- **Middleware Fallback**: Defaults to variant A on any error
- **PostHog Fallback**: Graceful degradation if PostHog fails
- **Cookie Issues**: Automatic variant reassignment
- **Network Failures**: Events queued and retried

## 🔒 Privacy & Compliance

- **Cookie Consent**: Consider implementing cookie banner
- **Data Retention**: PostHog respects EU data laws
- **User Privacy**: No PII collected in events
- **GDPR Compliance**: EU PostHog instance used

## 📝 Next Steps

1. **Set up PostHog Dashboard** with conversion funnels
2. **Configure Alerts** for significant performance differences
3. **Add More Variants** by extending middleware logic
4. **Implement Feature Flags** for dynamic testing
5. **A/B Test Other Pages** using the same infrastructure

## 🐛 Troubleshooting

### Common Issues

1. **Variant not assigned**: Check middleware configuration and cookie settings
2. **PostHog not loading**: Verify environment variables and network access
3. **Events not tracking**: Check browser console for errors
4. **Debugger not showing**: Ensure development mode or `?debug=true` parameter

### Debug Commands

```bash
# Check middleware logs
npm run dev

# Verify PostHog connection
console.log(window.posthog)

# Check variant cookie
document.cookie.split(';').find(c => c.includes('ab_test_variant'))
```

---

**Implementation Complete!** 🎉

Your A/B testing infrastructure is now production-ready with comprehensive analytics tracking, error handling, and debugging tools.
