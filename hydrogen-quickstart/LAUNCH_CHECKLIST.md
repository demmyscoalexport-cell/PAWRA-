# PAWRA Launch Checklist — 2026

Complete these steps in Shopify Admin to go live and start selling on **pawrapetshop.com**.

## 1. Shopify Store Setup

- [ ] **Shopify plan** — Activate Shopify Basic or higher on `pawrapetshop.myshopify.com`
- [ ] **Store details** — Settings → Store details: business name, address (Presque Isle, ME), contact email
- [ ] **Domains** — Settings → Domains: connect `pawrapetshop.com` as primary
- [ ] **Legal pages** — Settings → Policies: refund, shipping, privacy, terms (auto-generated or custom)

## 2. Payments (Required to Sell)

Shopify Checkout handles all payment processing. Enable in **Settings → Payments**:

- [ ] **Shopify Payments** — Primary processor (Visa, Mastercard, Amex, Apple Pay, Google Pay, Shop Pay)
- [ ] **PayPal** — Optional second method for buyer trust
- [ ] **Shop Pay** — Enabled automatically with Shopify Payments (one-click checkout)
- [ ] **Test mode** — Use Bogus Gateway or Shopify Payments test mode before going live
- [ ] **Payout account** — Connect bank account for deposits

> Hydrogen uses Shopify Checkout — no custom payment integration needed in code. Cart → Checkout redirects to Shopify's secure hosted checkout.

## 3. Products & Collections

Reference: `scripts/shopify-collections-setup.json`

### Tag every product

| Tag | When to use |
|-----|-------------|
| `dogs` or `cats` | Species (required) |
| `grooming`, `toys`, `treats`, etc. | Category |
| `bestseller` | Best Sellers collection |
| `new-pet` | New Pet Essentials collection |

### Create automated collections

Create collections with handles matching `app/lib/pawraCollections.js`:

- `dogs`, `cats` — species parents
- `dogs-grooming`, `dogs-toys`, … — dog subcategories
- `cats-grooming`, `cats-toys`, … — cat subcategories
- `best-sellers`, `new-pet-essentials`, `food-and-treats`, `grooming-wellness`

### Product fields

- **Product type** — Match taxonomy (Grooming, Toys, Treats, Feeding, etc.)
- **Vendor** — PAWRA
- **Images** — Minimum 1 high-res image per product
- **Price & inventory** — Set compare-at price for sale badges
- **Shipping** — Mark weight for accurate rates

## 4. Hydrogen / Headless Channel

- [ ] **Headless sales channel** — Install Headless in Admin → Sales channels
- [ ] **Storefront API token** — Create public + private tokens
- [ ] **Environment variables** — Copy `.env.example` → `.env` in `hydrogen-quickstart/`:

```env
SESSION_SECRET="generate-a-random-32-char-string"
PUBLIC_STOREFRONT_API_TOKEN="your_public_token"
PUBLIC_STORE_DOMAIN="pawrapetshop.myshopify.com"
PUBLIC_STOREFRONT_ID="your_storefront_id"
PRIVATE_STOREFRONT_API_TOKEN="your_private_token"
PUBLIC_CHECKOUT_DOMAIN="pawrapetshop.myshopify.com"
```

- [ ] **Customer accounts** — Settings → Customer accounts → enable for `/account` routes

## 5. Subscribe & Save (Optional — Recurring Revenue)

- [ ] Install **Shopify Subscriptions** app (free from Shopify)
- [ ] Enable selling plans on eligible products (treats, food, litter)
- [ ] Configure 10% recurring discount to match `/pages/subscribe-and-save`

## 6. Shipping & Tax

- [ ] **Shipping rates** — Settings → Shipping: free shipping over $75 (matches site copy)
- [ ] **Tax** — Settings → Taxes: enable US sales tax collection
- [ ] **Fulfillment** — Set processing time (1–2 business days recommended)

## 7. Deploy to Oxygen (Shopify Hosting)

From `hydrogen-quickstart/`:

```bash
npm run build
npm run deploy
```

Or connect GitHub for automatic Oxygen deployments:

- [ ] Link repo in Shopify Admin → Hydrogen / Oxygen
- [ ] Set environment variables in Oxygen dashboard
- [ ] Deploy from branch `cursor/chewy-ia-commerce-b08c` or `main` after merge

## 8. Pre-Launch QA

- [ ] Homepage loads — species entry, best sellers, subscribe banner
- [ ] Dogs / Cats mega menu — all category links work
- [ ] Collection filters — price, category, sort
- [ ] Product page — add to cart, variant selection
- [ ] Checkout — complete test order with Bogus Gateway
- [ ] Search — find products by name
- [ ] Mobile — menu accordion, filters, cart drawer
- [ ] Account — login, order history (if Customer Account API configured)

## 9. Growth (Post-Launch)

- [ ] **Google Analytics** — Add GA4 tag in `root.jsx` or Shopify pixels
- [ ] **Meta Pixel** — Settings → Customer events
- [ ] **Email marketing** — Shopify Email or Klaviyo for abandoned cart
- [ ] **Reviews app** — Judge.me or Yotpo (product page has placeholder ratings)
- [ ] **SEO** — Submit sitemap at `/sitemap.xml` to Google Search Console

---

**Support:** support@pawrapetshop.com  
**Storefront code:** `hydrogen-quickstart/`  
**Collection config:** `app/lib/pawraCollections.js`
