# PAWRA Session Handoff — Save Point

**Saved:** July 21, 2026  
**Branch:** `main` (up to date with origin)  
**Remote:** https://github.com/demmyscoalexport-cell/PAWRA-.git  
**Live domain:** https://pawrapetcares.com  
**Shopify store:** PAWRA PET CARES (`pawra-pet-cares` / also shows `emderi-ry.myshopify.com`)  
**Tagline:** Every moment. Every pet. Every life.

**Latest commits:**
- `73605eb` — Judge.me shop domain example → `pawrapetcares.com`
- `bf4fe7b` — Full Judge.me Hydrogen widgets (`@judgeme/shopify-hydrogen`)
- `44b9269` — Chewy-like frontend merge (PR #9)

---

## Quick start

```powershell
cd "c:\pwara e commerce headless store\hydrogen-quickstart"
npm run dev
```

- Local: http://localhost:3000  
- Deploy: push to `main` → GitHub Actions → Oxygen Production  
- Env checklist: `npm run oxygen:env-checklist`  
- Mirror file (gitignored): `hydrogen-quickstart/oxygen-env-to-mirror.env`

---

## What’s done

### Domain
- Custom domain **`pawrapetcares.com`** connected and assigned to **Hydrogen Production** (not Online Store)
- Branding in code uses `pawrapetcares.com` (`app/lib/branding.js`)
- Recommended checkout host: `checkout.pawrapetcares.com` → Online Store target  
  Local `.env`: `PUBLIC_CHECKOUT_DOMAIN=checkout.pawrapetcares.com`

### Judge.me (storefront code)
- Official package: `@judgeme/shopify-hydrogen`
- `useJudgeme` in `app/root.jsx`
- Product review widget + Write a review (`JudgeMeReviews` / `JudgemeReviewWidget`)
- Preview badges on cards + PDP
- Homepage `JudgemeCarousel`
- Floating `JudgemeReviewsTab`
- `/pages/reviews` + footer rating/count
- Server API helpers in `app/lib/judgeme.js` (private token)
- Env keys:
  - `PUBLIC_JUDGEME_SHOP_DOMAIN` (currently `pawrapetcares.com` in local/.env + mirror)
  - `PUBLIC_JUDGEME_PUBLIC_TOKEN`
  - `JUDGEME_API_TOKEN` (private, server only)
  - `PUBLIC_JUDGEME_CDN_HOST=https://cdn.judge.me`

### Other storefront
- Walker Referral Program (`/pages/walker-program`)
- Nested Collections hamburger
- Chewy-like homepage pieces (carousel, shop by pet, theme toggle from PR #9)
- Cloudinary media helpers

---

## Customer login (email OTP) — perfect setup

Auth is Shopify Customer Account API (not a custom password system).

### Application setup values
| Field | Values |
|-------|--------|
| Callback URI(s) | `https://pawrapetcares.com/account/authorize` and `https://www.pawrapetcares.com/account/authorize` |
| Javascript origin(s) | `https://pawrapetcares.com` and `https://www.pawrapetcares.com` |
| Logout URI | `https://pawrapetcares.com` and `https://www.pawrapetcares.com` |

Also add Oxygen preview host if testing `*.o2.myshopify.dev` (same paths).

### Admin checklist
1. **Settings → Customer accounts** → new Customer accounts **enabled**
2. Client type = **Public**
3. Application URIs saved (table above)
4. Oxygen Production has `PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID` + `PUBLIC_CUSTOMER_ACCOUNT_API_URL`
5. Test only on **https://pawrapetcares.com** (not localhost) in Incognito
6. Flow: Login → Shopify page → enter email → code email → return to `/account/authorize`

### If still broken
- Error `redirect_uri` mismatch → Callback URI wrong/missing
- Never leave PAWRA → button/env/config issue
- Reach Shopify, no email → spam, wrong inbox, or Shopify notification delay
- Code works but return fails → Callback URI / authorize route

---

## Do next (in order)

### 1. Oxygen Production env (critical)
Hydrogen → Environments → Production — paste Judge.me + checkout vars from `oxygen-env-to-mirror.env`.

If widgets fail with `pawrapetcares.com` as shop domain, use the domain shown in **Judge.me → Settings → Integrations** (often `*.myshopify.com`).

### 2. Verify live
- https://pawrapetcares.com (carousel / floating tab)
- Any product page → reviews + Write a review
- https://pawrapetcares.com/pages/reviews
- Hard refresh: Ctrl+Shift+R

### 3. Sell-ready Admin
- Products Active + published to **Hydrogen**
- Test checkout (small order)
- Payments, shipping, taxes
- Refund / shipping / privacy policies
- Judge.me dashboard: auto review-request emails + moderation
- Monitor `support@pawrapetcares.com`

### 4. Apps still to install + paste keys
| Priority | App | Env var(s) | Code status |
|----------|-----|------------|-------------|
| A | Judge.me | (above) | Done — finish Oxygen |
| A | Klaviyo | `PUBLIC_KLAVIYO_COMPANY_ID` | Script hook ready |
| A | GA4 | `PUBLIC_GA4_MEASUREMENT_ID` | Script hook ready |
| B | Gorgias / Inbox | `PUBLIC_GORGIAS_WIDGET_ID` | Hook ready |
| B | Smile.io | `PUBLIC_SMILE_PUBLISHABLE_KEY` | Page + hook ready |
| B | Swym Wishlist | `PUBLIC_SWYM_STORE_ID` | Hook ready |
| C | Loop Returns | `PUBLIC_LOOP_RETURNS_URL` | Footer link ready |
| C | Recharge | `PUBLIC_RECHARGE_STORE_IDENTIFIER` | Only if subscriptions |

---

## Remaining to build (code) — only after keys exist
- Deeper Klaviyo events / forms
- Live Swym wishlist UI
- Live Smile rewards panel
- Gorgias chat bubble
- Recharge subscribe UI (if needed)
- Meta / TikTok pixels (not wired yet)
- Optional Judge.me webhooks

**Not code:** emails, QR packaging, inventory, Doba, bank/payments approval.

---

## Key paths

| Path | Purpose |
|------|---------|
| `hydrogen-quickstart/app/lib/branding.js` | Brand domain / email / social |
| `hydrogen-quickstart/app/lib/judgeme.js` | Judge.me API |
| `hydrogen-quickstart/app/lib/integrations.js` | App env switches |
| `hydrogen-quickstart/app/root.jsx` | `useJudgeme` + public integrations |
| `hydrogen-quickstart/app/components/product/JudgeMe*.jsx` | Review UI |
| `hydrogen-quickstart/LAUNCH_CHECKLIST.md` | Launch checklist |
| `DEPLOYMENT.md` | Oxygen / domain deploy notes |
| `hydrogen-quickstart/oxygen-env-to-mirror.env` | Secrets checklist (gitignored) |

---

## Resume prompt for next session

> Continue PAWRA Hydrogen at `pawrapetcares.com`. Read `SESSION_HANDOFF.md`. Domain and Judge.me storefront code are done. Next: confirm Oxygen Production has Judge.me env vars, verify live widgets, then sell-ready checklist (checkout, policies, catalog publish). Do not commit secrets.

---

**PAWRA LLC** · Presque Isle, ME · support@pawrapetcares.com
