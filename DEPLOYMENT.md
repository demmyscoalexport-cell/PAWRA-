# Deploy PAWRA to Shopify Oxygen

PAWRA runs on **Shopify Oxygen** (Cloudflare Workers). Do not deploy this Hydrogen app to Vercel or Netlify.

## CI/CD overview (GitHub → Oxygen)

| Git event | Oxygen environment | Live at pawrapetshop.com? |
|-----------|-------------------|---------------------------|
| Push / merge to **`main`** | **Production** (auto-promoted) | Yes — after successful deploy |
| Push to any **other branch** | **Preview** only | No — unique preview URL only |
| Failed build or deploy | Previous Production unchanged | Yes — last good deploy stays live |

Workflow file: [`.github/workflows/oxygen-deployment-1000148769.yml`](.github/workflows/oxygen-deployment-1000148769.yml)

### How automatic Production promotion works

Shopify Oxygen does **not** require a manual **“Make current for Production”** step for normal CI/CD:

1. A push to `main` runs `shopify hydrogen deploy --env-branch main` (Production environment).
2. On success, Oxygen **automatically** points the Production environment URL to the new deployment.
3. When **www.pawrapetshop.com** is connected to the Production environment in Hydrogen settings, it serves that deployment immediately (zero-downtime pointer swap).

**“Make current for Production”** in Admin is for **rollbacks** only — reverting to an older deployment without redeploying code.

### Why you might still see manual promotion

| Cause | Fix |
|-------|-----|
| Production environment linked to wrong branch | **Hydrogen → Storefront settings → Environments** → Production → set branch to **`main`** |
| Deploy ran with `--preview` or from a feature branch | Merge to `main`; only the Production job updates live traffic |
| GitHub secret missing or wrong storefront ID | Reconnect GitHub in **Hydrogen → Oxygen deployments**; merge Shopify’s workflow PR |
| Custom domain not on Production environment | **Hydrogen → Domains** → assign **pawrapetshop.com** to Production |
| Old storefront (`1000148769`) vs new Headless store | Connect new storefront; use the new workflow + `OXYGEN_DEPLOYMENT_TOKEN_<id>` secret |

### Rollback (keep this manual)

1. **Hydrogen → Production → View deployments**
2. Select a previous successful deployment → **Make this the current deployment**
3. Production URL (and pawrapetshop.com) revert instantly — no code change required

The next push to `main` will deploy forward again and restore normal auto-promotion.

### Preview deployments (feature branches)

Every push to a non-`main` branch runs:

```bash
shopify hydrogen deploy --preview
```

Enable PR preview links: **Hydrogen → Oxygen deployments → Comment on pull requests with deployment preview links**.

### Required GitHub secret

| Secret | Source |
|--------|--------|
| `OXYGEN_DEPLOYMENT_TOKEN_1000148769` | Auto-created when GitHub is connected in **Hydrogen → Oxygen deployments** |

If you migrate to a **new Hydrogen storefront**, Shopify generates a **new** workflow file and secret name. Merge that PR and retire the old workflow.

### Manual deploy (emergency)

**Actions → Storefront 1000148769 → Run workflow** → choose **production** or **preview**.

---

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

Select your Shopify store when prompted. This writes store credentials locally and prepares the Oxygen project.

## 2. Local environment

```bash
cp .env.example .env
```

Fill in values from Shopify Admin → **Sales channels → Headless** (or from `hydrogen link` output). At minimum:

| Variable | Description |
|----------|-------------|
| `SESSION_SECRET` | Long random string (required) |
| `PUBLIC_STOREFRONT_API_TOKEN` | Storefront API public token |
| `PUBLIC_STORE_DOMAIN` | `your-store.myshopify.com` |
| `PUBLIC_STOREFRONT_ID` | Headless storefront ID |
| `PUBLIC_CHECKOUT_DOMAIN` | Same as store domain |
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

## 4. Deploy to Oxygen (local)

The Hydrogen app lives in **`hydrogen-quickstart/`**. Oxygen must build from that folder (not the repo root).

```bash
cd hydrogen-quickstart
npx shopify hydrogen deploy --env-branch main
```

Preview (never updates Production):

```bash
npx shopify hydrogen deploy --preview
```

## 5. Custom domain (www.pawrapetshop.com)

1. **Shopify Admin → Settings → Domains** — connect **pawrapetshop.com**
2. **Hydrogen → Storefront settings → Domains** — assign domain to **Production** environment
3. SSL is automatic on Oxygen

Verify Production branch is **`main`** under **Environments and variables**.

## 6. Shopify Admin checklist

- [ ] GitHub repo connected (**Hydrogen → Oxygen deployments**)
- [ ] Workflow PR merged (`.github/workflows/oxygen-deployment-*.yml`)
- [ ] Production environment branch = **`main`**
- [ ] Environment variables set for Production (and Preview if needed)
- [ ] **pawrapetshop.com** assigned to Production environment
- [ ] Shopify Flow publishes products to Headless channel

## Pre-deployment checklist

- [ ] `npm run build` passes in `hydrogen-quickstart/`
- [ ] Store linked via `shopify hydrogen link`
- [ ] Real products published to Headless sales channel
- [ ] `.env` not committed; `.env.example` has placeholders only
- [ ] Support email support@pawrapetshop.com is monitored

## Support

**PAWRA LLC** · 256 Chapman Road, Presque Isle, ME 04769 · support@pawrapetshop.com
