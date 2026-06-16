# Deploy PAWRA to Shopify Oxygen

PAWRA runs on **Shopify Oxygen** (Cloudflare Workers). Do not deploy this Hydrogen app to Vercel or Netlify.

## Prerequisites

- Node.js 22+ and npm
- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) (`npm install -g @shopify/cli @shopify/cli-hydrogen`)
- Shopify store: **pawrapetshop.myshopify.com**
- GitHub repo: https://github.com/demmyscoalexport-cell/PAWRA-.git

## 1. Link the storefront

From the repo root:

```bash
cd hydrogen-quickstart
npx shopify hydrogen link
```

Select **pawrapetshop.myshopify.com** when prompted. This writes store credentials locally and prepares the Oxygen project.

## 2. Local environment

```bash
cp .env.example .env
```

Fill in values from Shopify Admin → **Sales channels → Headless** (or from `hydrogen link` output). At minimum:

| Variable | Description |
|----------|-------------|
| `SESSION_SECRET` | Long random string (required) |
| `PUBLIC_STOREFRONT_API_TOKEN` | Storefront API public token |
| `PUBLIC_STORE_DOMAIN` | `pawrapetshop.myshopify.com` |
| `PUBLIC_STOREFRONT_ID` | Headless storefront ID |
| `PUBLIC_CHECKOUT_DOMAIN` | `pawrapetshop.myshopify.com` |
| `PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID` | Customer Account API client ID |
| `PUBLIC_CUSTOMER_ACCOUNT_API_URL` | Customer Account API URL |

Run locally from repo root:

```bash
npm run dev
```

Storefront: http://localhost:3000

## 3. Production build

```bash
npm run build
```

Fix any errors before deploying.

## 4. Deploy to Oxygen

The Hydrogen app lives in **`hydrogen-quickstart/`**. Oxygen must build from that folder (not the repo root).

```bash
cd hydrogen-quickstart
npx shopify hydrogen deploy
```

Or from repo root:

```bash
npx shopify hydrogen deploy --path hydrogen-quickstart
```

### GitHub → Oxygen (fixes 404 on deploy)

This repo includes `.github/workflows/oxygen-deployment-1000148769.yml`, which:

- Installs dependencies from `hydrogen-quickstart/package-lock.json`
- Runs `shopify hydrogen deploy` inside `hydrogen-quickstart/`

Ensure GitHub has the secret **`OXYGEN_DEPLOYMENT_TOKEN_1000148769`** (Shopify adds this when you connect the repo in **Hydrogen → Storefront settings → Oxygen deployments**).

If you previously connected GitHub without merging Shopify’s workflow PR, delete any root-level workflow that runs `npm ci` at the repo root — the root `package-lock.json` is legacy and not the Hydrogen app.

Follow CLI prompts. Verify env vars in **Shopify Admin → Hydrogen → Environment variables**.

## 5. Custom domain

In Shopify Admin:

1. **Settings → Domains** — connect **pawrapetshop.com**
2. Point your Oxygen storefront to the primary domain
3. Enable SSL (automatic on Oxygen)

## 6. GitHub workflow

Push `main` to https://github.com/demmyscoalexport-cell/PAWRA-.git. You can connect the repo to Oxygen for CI deploys from Shopify Admin after the first manual deploy.

## Pre-deployment checklist

- [ ] All placeholder NYC / GPS / walker content removed
- [ ] `.env` not committed; `.env.example` has placeholders only
- [ ] `npm run build` passes
- [ ] Store linked via `shopify hydrogen link`
- [ ] Real products and collections exist in Shopify Admin
- [ ] Custom domain DNS configured for pawrapetshop.com
- [ ] Support email support@pawrapetshop.com is monitored

## Support

**PAWRA LLC** · 256 Chapman Road, Presque Isle, ME 04769 · support@pawrapetshop.com
