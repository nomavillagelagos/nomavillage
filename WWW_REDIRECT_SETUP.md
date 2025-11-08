# 🌐 WWW vs Non-WWW Setup

## Current Status

Your `.env.local` is set to: `https://www.nomavillage.com`

This means your sitemap will use `www.nomavillage.com` for all URLs.

---

## ⚠️ Important: Choose One Domain

For SEO, you **must** choose either:
- ✅ `nomavillage.com` (non-www) - **RECOMMENDED**
- ✅ `www.nomavillage.com` (www)

Then redirect the other to your chosen version.

---

## 🎯 Recommended: Non-WWW (nomavillage.com)

### Why Non-WWW?
- ✅ Shorter, cleaner URLs
- ✅ Modern standard (most sites use non-www now)
- ✅ Easier to type and remember
- ✅ Better for branding

### Setup Steps

#### 1. Update Environment Variable
```bash
# In .env.local
NEXT_PUBLIC_SITE_URL=https://nomavillage.com
```

#### 2. Configure DNS/Hosting
**If using Vercel:**
1. Go to your project settings
2. Domains section
3. Add both domains:
   - `nomavillage.com` (primary)
   - `www.nomavillage.com` (redirect to primary)
4. Vercel automatically handles the redirect

**If using other hosting:**
Add redirect rule (e.g., in Netlify `_redirects` or Nginx config):
```
https://www.nomavillage.com/* https://nomavillage.com/:splat 301!
```

#### 3. Update Google Search Console
1. Add both properties:
   - `https://nomavillage.com`
   - `https://www.nomavillage.com`
2. Set `https://nomavillage.com` as preferred domain
3. Submit sitemap to the non-www version

---

## 🔄 Alternative: Keep WWW

If you prefer `www.nomavillage.com`:

### Setup Steps

#### 1. Keep Current Environment Variable
```bash
# In .env.local (already set)
NEXT_PUBLIC_SITE_URL=https://www.nomavillage.com
```

#### 2. Configure DNS/Hosting
Redirect non-www to www:
```
https://nomavillage.com/* https://www.nomavillage.com/:splat 301!
```

#### 3. Update Google Search Console
Set `https://www.nomavillage.com` as preferred domain

---

## ✅ Current Sitemap URLs

With current setting (`www.nomavillage.com`), your sitemap shows:
```xml
<loc>https://www.nomavillage.com/</loc>
<loc>https://www.nomavillage.com/coliving</loc>
<loc>https://www.nomavillage.com/community</loc>
<!-- etc -->
```

This is **fine** as long as:
1. ✅ All internal links use `www.nomavillage.com`
2. ✅ Non-www redirects to www
3. ✅ Google Search Console uses www version

---

## 🚨 What NOT to Do

❌ **Don't have both versions accessible**
- This creates duplicate content
- Splits your SEO authority
- Confuses search engines

❌ **Don't mix URLs in sitemap**
- All URLs should use the same domain
- Either all www or all non-www

---

## 🧪 Test Your Setup

### Check Redirect
```bash
# Test if non-www redirects to www (or vice versa)
curl -I https://nomavillage.com
# Should show: Location: https://www.nomavillage.com

# Or test if www redirects to non-www
curl -I https://www.nomavillage.com  
# Should show: Location: https://nomavillage.com
```

### Verify Sitemap
```bash
# Check sitemap uses consistent domain
curl https://nomavillage.com/sitemap.xml | grep "<loc>"
# All URLs should use same domain (www or non-www)
```

---

## 📊 SEO Impact

### Correct Setup (Choose One)
- ✅ All link equity goes to one domain
- ✅ No duplicate content issues
- ✅ Clear canonical URLs
- ✅ Better search rankings

### Incorrect Setup (Both Accessible)
- ❌ Link equity split between two domains
- ❌ Duplicate content penalties
- ❌ Confused search engines
- ❌ Lower rankings

---

## 🎯 My Recommendation

**Use non-www:** `https://nomavillage.com`

1. Update `.env.local`:
   ```bash
   NEXT_PUBLIC_SITE_URL=https://nomavillage.com
   ```

2. Configure hosting to redirect www → non-www

3. Restart dev server to see changes:
   ```bash
   npm run dev
   ```

4. Verify sitemap:
   ```bash
   curl http://localhost:3002/sitemap.xml | grep "<loc>"
   ```

5. Deploy and test in production

---

## ✅ Action Items

- [ ] Decide: www or non-www?
- [ ] Update `.env.local` if changing
- [ ] Configure redirect in hosting
- [ ] Test redirect works (301 status)
- [ ] Update Google Search Console
- [ ] Submit sitemap to preferred domain
- [ ] Check all internal links use preferred domain

---

**Current Status:** Using `www.nomavillage.com` ✅  
**Recommended:** Switch to `nomavillage.com` (but current setup works if you keep it consistent)
