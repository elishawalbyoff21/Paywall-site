# THE VAULT — Setup & Deployment Guide

## What You're Getting

A full pay-to-unlock content site with:
- Public storefront with locked/blurred content previews
- Stripe Checkout (no account needed for buyers)
- Instant access after payment via unique URL
- Secure admin dashboard (password-protected)
- Content management (add/edit/delete, set prices, toggle live/draft)
- Analytics (revenue, purchases, top-performing content)
- Unique shareable unlock links for DMs/social

---

## Stack

| Layer      | Technology         |
|------------|--------------------|
| Frontend   | Next.js 14 (React) |
| Backend    | Next.js API Routes (serverless) |
| Database   | Supabase (Postgres) |
| Payments   | Stripe Checkout    |
| Hosting    | Vercel             |
| Storage    | Supabase Storage or any CDN |

---

## Step 1 — Prerequisites

Install Node.js 18+ from https://nodejs.org

---

## Step 2 — Set Up Supabase (Database)

1. Go to https://supabase.com and create a free account
2. Create a new project (remember the DB password)
3. Go to **SQL Editor** and paste + run the contents of `supabase/schema.sql`
4. Go to **Project Settings → API** and copy:
   - `Project URL` → this is your `SUPABASE_URL`
   - `service_role` key (scroll down) → this is your `SUPABASE_SERVICE_KEY`
   - ⚠️ Use the **service_role** key, NOT the anon key. Keep it secret.

---

## Step 3 — Set Up Stripe (Payments)

1. Go to https://dashboard.stripe.com and create/log in to your account
2. Go to **Developers → API Keys**
   - Copy **Secret key** → `STRIPE_SECRET_KEY`
   - Copy **Publishable key** → `STRIPE_PUBLISHABLE_KEY`
3. Enable the payment methods you want:
   - Go to **Settings → Payment methods**
   - Enable: Cards, Apple Pay, Google Pay (all included in Checkout automatically)
   - For international: enable SEPA, iDEAL, etc. as needed
4. Set up the webhook (after deploying in Step 6):
   - Go to **Developers → Webhooks → Add endpoint**
   - URL: `https://yourdomain.vercel.app/api/webhook`
   - Events: select `checkout.session.completed`
   - Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`

> 💡 For local testing, use Stripe CLI:
> `stripe listen --forward-to localhost:3000/api/webhook`
> This gives you a temporary webhook secret for development.

---

## Step 4 — Set Up Content Storage

Your content files (images/videos) need to be hosted somewhere. Options:

### Option A: Supabase Storage (easiest)
1. Go to Supabase → **Storage** → Create a bucket called `content`
2. Set bucket to **Private** (important!)
3. Upload files and use signed URLs when serving (see access page)

### Option B: Cloudflare R2 (cheap, fast)
1. https://dash.cloudflare.com → R2 → Create bucket
2. Upload files, use the R2 public URL or signed URLs

### Option C: AWS S3
Standard S3 bucket with private ACL + pre-signed URLs

> For signed/expiring URLs (recommended for security), update `pages/access/[sessionId].js`
> to generate a signed URL from your storage provider instead of using a direct URL.

---

## Step 5 — Local Development

```bash
# Clone/copy the project folder
cd vault-site

# Install dependencies
npm install

# Copy env file and fill in your values
cp .env.example .env.local
# Edit .env.local with your Supabase, Stripe keys, etc.

# Run locally
npm run dev
# → Open http://localhost:3000
# → Admin at http://localhost:3000/admin
```

---

## Step 6 — Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow prompts)
vercel

# For production
vercel --prod
```

**OR** use the Vercel dashboard:
1. Go to https://vercel.com → New Project
2. Import your GitHub repo (push code to GitHub first)
3. Add environment variables in Vercel dashboard:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `NEXT_PUBLIC_BASE_URL` (your Vercel URL, e.g. `https://your-site.vercel.app`)
   - `ADMIN_PASSWORD` (your chosen admin password)
4. Deploy

---

## Step 7 — Add Your First Content (Admin)

1. Go to `https://yoursite.com/admin`
2. Enter your `ADMIN_PASSWORD`
3. Click **+ ADD CONTENT**
4. Fill in:
   - **Title**: e.g. "Private Session I"
   - **Price**: e.g. `9.99` (in dollars)
   - **Type**: image / video / text
   - **Content URL**: the URL to your file in storage
5. Save → toggle to **LIVE** when ready

---

## Step 8 — After Deploy: Verify Stripe Webhook

1. Make a test purchase (use Stripe test card `4242 4242 4242 4242`)
2. Check Stripe Dashboard → Webhooks → your endpoint → recent events
3. Confirm `checkout.session.completed` shows as ✅ Delivered
4. Confirm the access page works after payment

---

## Security Checklist

- [x] Admin dashboard is password-protected (server-validates every API call)
- [x] Content URLs are never exposed in the public API (only served after payment verification)
- [x] Stripe webhook signature is verified cryptographically
- [x] Rate limiting on checkout API (prevents abuse)
- [x] Right-click disabled on content pages
- [x] `noindex` meta on access pages (keeps content out of search engines)
- [x] Supabase RLS blocks all direct DB access (only service key works)
- [x] Security headers set (X-Frame-Options, CSP, etc.)
- [ ] For production: upgrade rate limiting to Redis (e.g. Upstash)
- [ ] For production: consider Cloudflare in front of Vercel for DDoS protection

---

## Customizing Branding

- **Site name**: Search & replace "THE VAULT" in all files
- **Colors**: Edit CSS variables in `styles/globals.css`
- **Font**: Change the Google Fonts import in `styles/globals.css`
- **Prices**: Set per-item in the admin dashboard
- **Currency**: Supported currencies set per-item in admin

---

## Future Features (Ready to Build On)

- **Subscriptions**: Add Stripe Billing with `mode: 'subscription'` in checkout
- **Bundles**: Group posts with a single price
- **Email delivery**: Add Resend/Sendgrid to email access links
- **Content expiry**: Add `expires_at` column to purchases table
- **Referral links**: Add `ref` parameter tracking to purchases

---

## File Structure

```
vault-site/
├── pages/
│   ├── index.js              ← Public storefront
│   ├── _app.js               ← App wrapper
│   ├── access/
│   │   └── [sessionId].js    ← Post-payment access page
│   └── api/
│       ├── checkout.js       ← Creates Stripe session
│       ├── webhook.js        ← Stripe payment confirmation
│       └── admin/
│           ├── auth.js       ← Login check
│           ├── posts.js      ← CRUD for content
│           ├── analytics.js  ← Revenue/purchase data
│           └── generate-link.js ← Shareable unlock links
├── components/
│   ├── HeroSection.js        ← Landing hero
│   ├── ContentCard.js        ← Locked content card
│   └── UnlockModal.js        ← Payment modal
├── lib/
│   ├── db.js                 ← Database abstraction (Supabase)
│   └── adminAuth.js          ← Server-side admin check
├── styles/
│   └── globals.css           ← Global dark theme
├── supabase/
│   └── schema.sql            ← DB setup script
├── next.config.js            ← Security headers
├── package.json
└── .env.example              ← Environment variable template
```
