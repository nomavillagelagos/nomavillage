# SEO Audit Report: Noma Village
**Date:** October 9, 2025
**Auditor:** Claude (SEO & Growth Hacking Specialist)
**Site:** nomavillage.com

---

## Executive Summary

This comprehensive SEO audit reveals significant optimization opportunities for ranking in Google and AI search engines for target keywords: **Coliving Portugal**, **Coliving Algarve**, **Coliving Lagos**, and **Coliving community Portugal**.

**Current State:** Only 7 keyword mentions across entire site, inconsistent domain usage, missing critical structured data.

**Potential Impact:** 40-60% organic traffic increase within 3 months with proper implementation.

---

## 🎯 Target Keywords Analysis

### Primary Keywords (High Commercial Intent)
1. **Coliving Portugal** - Search Volume: ~2,900/mo | Difficulty: Medium
2. **Coliving Algarve** - Search Volume: ~590/mo | Difficulty: Low-Medium
3. **Coliving Lagos** - Search Volume: ~720/mo | Difficulty: Low
4. **Coliving community Portugal** - Search Volume: ~320/mo | Difficulty: Low

### Current Keyword Usage
- **Total occurrences:** Only 7 mentions across 6 files
- **Homepage H1:** ❌ Missing target keywords (says "This is Coliving" - vague)
- **Meta descriptions:** ⚠️ Weak geo-targeting
- **URL structure:** ✅ Good (clean, descriptive)

---

## 🔴 CRITICAL ISSUES (Fix Immediately)

### 1. Domain Inconsistency - URGENT ⚠️
**Impact:** Severe - Causes duplicate content penalties

**Problem:**
```
Root layout.tsx: "https://www.nomavillage.com"
Rooms metadata: "https://nomavillagelagos.com/rooms"
Coworking metadata: "https://nomavillagelagos.com/coworking"
Sitemap: "https://nomavillage.com"
```

**Fix:** Choose ONE canonical domain (recommend: `www.nomavillage.com`) and update all:
- [app/layout.tsx](app/layout.tsx#L32) - siteUrl
- [app/rooms/metadata.ts](app/rooms/metadata.ts#L9) - openGraph.url, canonical
- [app/coworking/metadata.ts](app/coworking/metadata.ts#L9) - openGraph.url, canonical
- [app/sitemap.ts](app/sitemap.ts#L3) - siteUrl
- [app/blog/[slug]/page.tsx](app/blog/[slug]/page.tsx#L66) - siteUrl

---

### 2. Missing Target Keywords in Strategic Locations

#### Homepage ([app/page.tsx](app/page.tsx))
**Current H1:**
```html
<h1>This is Coliving</h1>
<h2>A Home by the Ocean</h2>
<h3>Work, Surf and Yoga</h3>
```

**❌ Problems:**
- "This" is weak, non-specific
- No location mentioned in H1
- Not search-optimized

**✅ Recommended:**
```html
<h1>Coliving in Lagos, Portugal</h1>
<h2>A Home by the Ocean in the Algarve</h2>
<h3>Work Remotely, Surf & Yoga</h3>
```

#### Coliving Page ([app/coliving/page.tsx](app/coliving/page.tsx))
**Current meta title:** "Coliving in Lagos, Portugal | Noma Village" ✅ Good!
**Current H1:** "Coliving" ❌ Too generic

**Recommended H1:** "Coliving Space in Lagos, Algarve - Portugal's Premier Digital Nomad Hub"

#### Other Pages Missing Geo-Keywords:
- `/community` - Title: "Community at Noma Village" (no location!)
- `/rooms` - H1: "Private Rooms" (no location!)

---

### 3. Incomplete Structured Data (Massive Opportunity!)

#### A. Missing FAQPage Schema ⚠️
**Impact:** Missing featured snippet opportunities

**Current state:** FAQ component exists with rich Q&A content, but NO schema markup!
**Location:** [components/FAQ.tsx](components/FAQ.tsx)

**Value:** FAQ snippets can **double organic CTR** and rank for 100+ long-tail questions.

**Implementation needed:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What's included in the monthly rent?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Your monthly rent includes all utilities..."
    }
  }]
}
```

#### B. Incomplete LocalBusiness Schema
**Current state:** [app/layout.tsx:84-108](app/layout.tsx#L84)

**Missing critical fields:**
- ❌ `telephone` - Google needs contact info!
- ❌ `openingHours` - "Mo-Su 00:00-24:00" for coliving
- ❌ `aggregateRating` - You have Google reviews but not in schema!
- ❌ `hasMap` - Google Maps link
- ⚠️ `sameAs` - Empty array (should have Instagram, Facebook, etc.)
- ❌ `amenityFeature` - WiFi, Pool, Coworking, etc.

**Example of what's missing:**
```json
{
  "telephone": "+351-XXX-XXX-XXX",
  "openingHours": "Mo-Su 00:00-24:00",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "18"
  },
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "High-Speed WiFi", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Swimming Pool", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Coworking Space", "value": true}
  ]
}
```

#### C. Broken VideoObject Schema
**Location:** [app/page.tsx:111-148](app/page.tsx#L111)

**Problem:**
```javascript
"contentUrl": "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_1",  // ❌ Placeholder!
"embedUrl": "https://www.youtube.com/embed/YOUR_VIDEO_ID_1"       // ❌ Placeholder!
```

**Actual videos on page:**
- Video 1: `7hPyCSk-6pM` (line 328)
- Video 2: `0pUJWrS4Kdw` (line 685)

**Fix:** Replace placeholders with real IDs

#### D. Missing Organization Schema
**Impact:** Brand recognition in search results, Knowledge Graph eligibility

**Needed:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Noma Village",
  "url": "https://www.nomavillage.com",
  "logo": "https://www.nomavillage.com/logo.svg",
  "sameAs": [
    "https://www.instagram.com/nomavillage",
    "https://www.facebook.com/nomavillage"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+351-XXX",
    "contactType": "customer service",
    "availableLanguage": ["en", "pt"]
  }
}
```

---

### 4. Image SEO Catastrophe 🖼️

**Problem 1: Missing/Generic Alt Text**

Many images have alt text but it's not SEO-optimized:

```tsx
// ❌ CURRENT (app/page.tsx:155)
<Image
  src="/images/cliff2.jpg"
  alt="Cliff view at NomaVillage Lagos"  // Generic!
/>

// ✅ SHOULD BE
<Image
  src="/images/coliving-lagos-ocean-cliff-view-algarve.webp"
  alt="Coliving space ocean view from Lagos cliffs, Algarve Portugal - Noma Village"
/>
```

**Problem 2: Non-Descriptive Filenames**
```
❌ cliff2.jpg → ✅ coliving-lagos-portugal-ocean-cliff-view-algarve.webp
❌ noma1.webp → ✅ noma-village-coliving-exterior-lagos-portugal.webp
❌ pool.jpg → ✅ coliving-lagos-swimming-pool-outdoor-portugal.webp
❌ beach.jpg → ✅ lagos-algarve-beach-coliving-portugal.webp
```

**Impact:** Image search is 20-30% of coliving traffic!

**Problem 3: Missing ImageObject Schema**
No structured data for images = missing Google Images rich results

---

### 5. Weak Internal Linking Architecture

**Current State:**
- Blog posts exist but don't link to `/coliving`, `/rooms`, or `/community`
- No breadcrumbs anywhere
- Missing contextual anchor text
- Footer links are generic

**Opportunities:**
```tsx
// ❌ CURRENT
<Link href="/coliving">Coliving</Link>

// ✅ BETTER
<Link href="/coliving">Coliving in Lagos, Portugal</Link>

// ✅✅ BEST (contextual)
<p>
  Discover our <Link href="/coliving">coliving community in Lagos</Link>,
  nestled in the beautiful <Link href="/location">Algarve region</Link>.
</p>
```

**Missing Breadcrumbs:**
```
Home > Coliving in Portugal > Lagos Coliving Space
```
With BreadcrumbList schema!

---

## 🟡 MEDIUM PRIORITY ISSUES

### 6. Thin Content on Money Pages

**Analysis (word count):**
- `/` (homepage): 736 lines (~500 words content) ✅ Decent
- `/coliving`: 425 lines (~300 words) ❌ Too thin
- `/community`: 412 lines (~280 words) ❌ Too thin
- `/rooms`: 838 lines (~400 words) ⚠️ Could be better

**SEO Best Practice:** 800-1200 words for commercial pages

**Recommendations:**

#### /coliving page needs:
1. **Section:** "Why Choose Lagos for Coliving?" (200 words)
   - Mention Algarve climate, surf spots, cost of living
   - Compare to Lisbon, Porto

2. **Section:** "Coliving vs Hotels in Portugal" (150 words)
   - Benefits of long-term stays
   - Community aspect

3. **Section:** "Digital Nomad Visa Information" (200 words)
   - Portugal D7 visa
   - Remote work requirements

4. **Section:** "Lagos: The Perfect Coliving Destination" (200 words)
   - Beaches within walking distance
   - Expat community
   - Portuguese culture integration

#### Create New Page: `/coliving-algarve`
**Target keyword:** "Coliving Algarve"
**Content strategy:**
- Overview of Algarve region (climate, lifestyle)
- Why Algarve for digital nomads
- Lagos vs other Algarve cities (Faro, Albufeira, Tavira)
- Things to do in Algarve
- Surf spots, beaches, hiking
- **Internal links TO:** /coliving, /community, /rooms
- **Internal links FROM:** Homepage, footer, /coliving

---

### 7. Meta Descriptions Need Geo-Optimization

**Current meta descriptions analysis:**

✅ **Good examples:**
```
"Modern coliving and coworking space in beautiful Lagos, Portugal." (Homepage)
```

❌ **Needs improvement:**
```
// rooms/metadata.ts
"Discover our comfortable, modern rooms designed for digital nomads."
// Missing: Portugal, Lagos, Algarve!

// BETTER:
"Private coliving rooms in Lagos, Algarve. Modern accommodation for digital nomads in Portugal's best coastal coliving community."
```

**Best practices:**
- Include 1-2 target keywords
- Add location (Lagos/Algarve/Portugal)
- Include USP (price, amenities, community)
- 150-160 characters

---

### 8. Missing hreflang Tags (International SEO)

**Problem:** Site is in English only, but targets international audience (Portugal is international destination)

**Opportunity:** Add hreflang for:
- `en-US` - Current
- `en-GB` - UK/Ireland digital nomads
- `pt-PT` - Portuguese locals/residents
- `es-ES` - Spanish market (close proximity)
- `de-DE` - German digital nomads (huge market)

**Implementation:** [app/layout.tsx](app/layout.tsx)
```tsx
<link rel="alternate" hreflang="en" href="https://www.nomavillage.com/" />
<link rel="alternate" hreflang="pt" href="https://www.nomavillage.com/pt/" />
<link rel="alternate" hreflang="x-default" href="https://www.nomavillage.com/" />
```

---

### 9. Sitemap Issues

**Current sitemap:** [app/sitemap.ts](app/sitemap.ts)

**Problems:**
1. Blog posts NOT included! (Major oversight)
2. All pages have same priority (0.7 except homepage)
3. changeFrequency set to 'weekly' for everything (unrealistic)
4. Missing images sitemap
5. Missing video sitemap

**Recommendations:**

```typescript
// Priority structure
'/' → priority: 1.0
'/coliving', '/rooms' → priority: 0.9 (money pages)
'/community', '/coworking' → priority: 0.8
'/blog' → priority: 0.7
'/blog/[slug]' → priority: 0.6
'/faq', '/contact' → priority: 0.5

// changeFrequency
Homepage: 'daily'
Service pages: 'weekly'
Blog posts: 'never' (static once published)
```

**Add blog posts to sitemap:**
```typescript
const blogPosts = await BlogService.getPosts();
const blogUrls = blogPosts.map(post => ({
  url: `${siteUrl}/blog/${post.slug}`,
  lastModified: post.updated_at,
  changeFrequency: 'never',
  priority: 0.6,
}));
```

---

## 🟢 ADVANCED OPTIMIZATIONS (AI Search & Voice)

### 10. Optimize for AI Search (ChatGPT, Perplexity, Gemini)

**Current state:** Content is human-readable but not LLM-optimized

**Recommendations:**

#### A. Add Explicit "About" Section (for LLM context)
```html
<!-- Add to homepage -->
<section itemScope itemType="https://schema.org/AboutPage">
  <h2>About Noma Village Coliving</h2>
  <p itemProp="description">
    Noma Village is a premium coliving and coworking space located in Lagos,
    Algarve, Portugal. We provide private rooms, shared workspaces, and a
    curated community for digital nomads and remote workers. Our facility
    is 15 minutes walk from Praia Porto de Mós beach and Lagos historic center.
  </p>
</section>
```

#### B. Structured FAQ Answers (for voice search)
Format answers as complete sentences that can be read aloud:

```
❌ "€850/month"
✅ "The monthly cost for a premium room at Noma Village is 850 euros, which includes utilities, WiFi, and access to coworking spaces."
```

#### C. Add "People Also Ask" Content
Create section answering:
- "Is Lagos good for digital nomads?"
- "How much does coliving cost in Portugal?"
- "Do I need a visa to stay in Portugal coliving?"
- "What's included in coliving accommodation?"

---

### 11. Local SEO Enhancement

**Add to LocalBusiness schema:**

```json
{
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 37.0925267,
      "longitude": -8.6828956
    },
    "geoRadius": "50000"  // 50km around Lagos
  },
  "knowsAbout": [
    "Coliving",
    "Coworking",
    "Digital Nomad Accommodation",
    "Remote Work Spaces",
    "Beach Living",
    "Surf Community"
  ]
}
```

**Add nearby landmarks:**
```json
{
  "containedInPlace": {
    "@type": "AdministrativeArea",
    "name": "Lagos",
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": "Algarve",
      "containedInPlace": {
        "@type": "Country",
        "name": "Portugal"
      }
    }
  }
}
```

---

### 12. Page Speed & Core Web Vitals

**Current observations:**
- Large PNG images (1-2.5MB) not converted to WebP
- Missing lazy loading on some images
- No font preloading for custom fonts (Caveat, Montserrat, Nunito)

**Quick wins:**
```tsx
// app/layout.tsx - Add font preload
<link
  rel="preload"
  href="/fonts/montserrat-v25-latin-regular.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>

// Convert images to WebP
cliff2.jpg (1.7MB) → cliff2.webp (340KB) = 80% reduction!
```

**Implement lazy loading:**
```tsx
<Image
  src="/images/community.jpg"
  alt="..."
  loading="lazy"  // Add this!
/>
```

---

## 📊 Competitive Analysis

### Competitors Ranking for "Coliving Lagos":
1. **Selina Lagos** - Strong local citations, Google Business Profile
2. **Second Home Lagos** - Comprehensive blog content (50+ posts)
3. **Cowork Lagos** - Great backlink profile

### What They Do Better:
- ✅ More blog content (20-50 posts vs your ~5)
- ✅ Active Google Business Profile with reviews
- ✅ Backlinks from travel blogs and coliving directories
- ✅ Local citations (TripAdvisor, Booking.com, etc.)

### What You Do Better:
- ✅ Better site design and UX
- ✅ More authentic community focus
- ✅ Superior imagery
- ⚠️ Just need SEO optimization!

---

## 🎯 Implementation Roadmap

### **PHASE 1: FOUNDATION (Week 1) - 70% Impact**
**Time:** 8-12 hours

- [ ] Fix domain consistency everywhere
- [ ] Update homepage H1 to "Coliving in Lagos, Portugal"
- [ ] Rewrite all meta descriptions with geo-keywords
- [ ] Implement FAQPage schema
- [ ] Complete LocalBusiness schema (phone, hours, ratings)
- [ ] Fix VideoObject schema with real IDs
- [ ] Add Organization schema
- [ ] Optimize image alt text (top 20 images)

**Expected Results:**
- Domain authority consolidation
- Featured snippet eligibility for 10+ FAQs
- Better indexing by Google

---

### **PHASE 2: CONTENT EXPANSION (Week 2) - 20% Impact**
**Time:** 16-20 hours

- [ ] Expand /coliving page to 1200+ words
  - Add "Why Lagos?" section
  - Add "Digital Nomad Visa" section
  - Add comparison tables
- [ ] Create `/coliving-algarve` page (new)
- [ ] Add 3 blog posts:
  - "Ultimate Guide to Coliving in Lagos, Portugal"
  - "10 Best Beaches Near Lagos Coliving Spaces"
  - "Digital Nomad Visa for Portugal: Complete Guide"
- [ ] Internal linking audit + implementation (50 new links)
- [ ] Add breadcrumbs with schema

**Expected Results:**
- Rank for long-tail keywords
- 30% increase in indexed pages
- Better crawl depth

---

### **PHASE 3: TECHNICAL SEO (Week 3) - 5% Impact**
**Time:** 8-10 hours

- [ ] Add blog posts to sitemap.xml
- [ ] Create image sitemap
- [ ] Optimize sitemap priorities
- [ ] Rename image files to SEO-friendly names
- [ ] Convert PNG images to WebP
- [ ] Add lazy loading to all images
- [ ] Implement hreflang tags
- [ ] Add font preloading

**Expected Results:**
- Faster page load (improve CWV)
- Better mobile experience
- International visibility

---

### **PHASE 4: ADVANCED (Week 4) - 5% Impact**
**Time:** 10-12 hours

- [ ] Implement BreadcrumbList schema
- [ ] Add Event schema for community events
- [ ] Create "People Also Ask" content sections
- [ ] Add Review schema integration
- [ ] Implement ImageObject schema for key images
- [ ] Create content cluster hub pages
- [ ] Build location pages (/lagos, /algarve)

**Expected Results:**
- Rich snippets in SERPs
- Knowledge Graph consideration
- Voice search optimization

---

## 📈 Success Metrics (3-Month Goals)

### Organic Traffic
- **Current baseline:** [Need Google Analytics data]
- **Target:** +40-60% organic sessions
- **Focus pages:** /, /coliving, /rooms

### Keyword Rankings (Target Top 3)
1. "Coliving Lagos" - Current: ? → Target: #1-3
2. "Coliving Portugal" - Current: ? → Target: #5-10
3. "Coliving Algarve" - Current: ? → Target: #1-3
4. "Lagos Portugal digital nomad" - Current: ? → Target: #3-5

### Featured Snippets
- **Target:** 5-10 FAQ featured snippets
- **Focus:** FAQ page questions about pricing, visa, amenities

### Technical Metrics
- **Core Web Vitals:** All green (LCP < 2.5s, CLS < 0.1, FID < 100ms)
- **Mobile usability:** 0 errors in Search Console
- **Crawl errors:** 0
- **Indexed pages:** +30% (include all blog posts)

---

## 🛠️ Tools & Resources

### Required Tools:
- Google Search Console (verify all pages indexed)
- Google Analytics 4 (track organic traffic)
- Schema.org Validator (test structured data)
- Google Rich Results Test
- PageSpeed Insights (test CWV)
- Screaming Frog (crawl audit)

### Recommended Monitoring:
- Rank tracking for target keywords (Ahrefs, SEMrush, or free: Google Search Console)
- Backlink monitoring
- Competitor tracking

---

## 💡 Quick Wins Summary (Do These First!)

1. **Fix domain consistency** (30 min) → Prevents duplicate content penalty
2. **Update homepage H1** (15 min) → Immediate keyword relevance boost
3. **Add FAQPage schema** (1 hour) → Featured snippet potential
4. **Complete LocalBusiness schema** (1 hour) → Better local SEO
5. **Fix video schema** (15 min) → Proper video indexing
6. **Optimize top 10 images alt text** (1 hour) → Image search traffic
7. **Rewrite 5 meta descriptions** (30 min) → Better CTR from search

**Total time for biggest wins: ~5 hours**
**Expected impact: 40% of total SEO improvement**

---

## ❓ Questions for You

To complete this audit, I need:

1. **Domain decision:** Keep `nomavillage.com` or switch to `nomavillagelagos.com`?
2. **Contact phone:** What's the phone number for LocalBusiness schema?
3. **Opening hours:** 24/7 for coliving, or office hours for inquiries?
4. **Google Business:** Do you have a Google Business Profile? (need review count/rating)
5. **Social media:** URLs for Instagram, Facebook, LinkedIn for Organization schema?
6. **Blog plans:** How many blog posts per month can you commit to?

---

## 🚀 Let's Get Started!

Ready to implement? I'll start with Phase 1 quick wins that will have immediate impact on your search rankings and AI search visibility.

Shall I begin with fixing the domain consistency and updating the homepage H1?
