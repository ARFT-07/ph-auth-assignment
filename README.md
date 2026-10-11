# 🛒 বাজার দর — BazarDor

প্রয়োজনীয় পণ্যের (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) **আজকের বাজারদর এক নজরে**।
BazarDor is a Bengali-first grocery price tracker: see today's price, whether it went up or down
versus yesterday, and the per-market price range across Bangladesh's divisions.

- **Live link:** _add your Vercel URL here_
- **Data source:** `https://openapi.programming-hero.com/api/bazardor` (with automatic fallback to the two mirror URLs)

## ✨ Key features

1. **Live price ticker & rise/fall sections** – an infinite marquee under the navbar plus "আজ দাম বেড়েছে ▲" / "আজ দাম কমেছে ▼" (top 6 each) with green/red/grey change badges and Bengali numerals.
2. **Category pages with sorting** – skeleton loading, empty/404 states, and a `সাজান` dropdown (ডিফল্ট / কম থেকে বেশি / বেশি থেকে কম) that sorts on the numeric price, not the Bengali string.
3. **Protected product details** – min / max / average price, history (yesterday, last week, last month) and a division-wise table of every market's price range. Visitors who are not signed in are redirected to sign in with a toast.
4. **Authentication with Better Auth** – email + password, Google and GitHub login, validation errors and success toasts, auto-redirects.
5. **Profile & update information** – `/profile` shows the user; the update button opens a form that changes the name via Better Auth's `updateUser`.
6. **Fully responsive** – mobile, tablet and desktop layouts; scrollable category nav on small screens; custom 404 page with a "হোম পেজে ফিরে যান" button.

## 🧰 Technologies

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · DaisyUI 5 · Better Auth · MongoDB · react-hot-toast · Noto Sans Bengali

## 🚀 Getting started

```bash
npm install
cp .env.example .env.local        # fill in the values
npm run dev
```

### Environment variables

| Name | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string incl. database name (e.g. Atlas) |
| `BETTER_AUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | Public site URL (`http://localhost:3000` locally, your Vercel URL in production) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth (redirect URI: `<BETTER_AUTH_URL>/api/auth/callback/google`) |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth (callback: `<BETTER_AUTH_URL>/api/auth/callback/github`) |
| `API_BASE_URL` | _Optional._ Overrides the price API base URL |

A social button only works once its client id/secret pair is set.

## ☁️ Deploying to Vercel

1. Create a MongoDB Atlas cluster (allow access from anywhere, `0.0.0.0/0`, for Vercel) — collections are created automatically, no migration needed.
2. Import the repo in Vercel and add the environment variables above (`BETTER_AUTH_URL` = your Vercel URL).
3. Add the Vercel URL's callback URLs to your Google / GitHub OAuth apps.

Dynamic routes (`/category/[slug]`, `/product/[slug]`) are server-rendered, so reloading any page works.

## 📁 Structure

```
app/            routes (home, category, product, signin, signup, profile, API handler)
components/     Navbar, Ticker, Hero, ProductCard, forms …
lib/            api client, formatting (Bengali numerals), Better Auth server/client
```
