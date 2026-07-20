# Deploy PAWRA to Shopify Oxygen

PAWRA runs on **Shopify Oxygen**. The Hydrogen app lives in **`hydrogen-quickstart/`**.

## New store setup (start here)

Old Shopify accounts and storefront IDs have been removed from this repo. Connect a **new** store:

### 1. Shopify Admin (new store)

1. **Basic+** plan
2. Install **Hydrogen** sales channel (not Headless — see below)
3. **Create storefront** (e.g. `PAWRA`)
4. **Settings → Customer accounts** — enable
5. **Settings → Payments** — configure Shopify Payments
6. Import or create products
7. **Products → Bulk edit → Sales channels** — publish to your **Hydrogen storefront** (not Online Store only)
8. **Settings → Domains** — connect `pawrapercares.com`
9. **Hydrogen → Domains** — assign domain to **Production**

### 2. Link locally

```bash
cd hydrogen-quickstart
cp .env.example .env
npx shopify hydrogen link      # pick NEW store → create/link storefront
npx shopify hydrogen env pull  # fills .env with tokens
npm run dev                    # http://localhost:3000
```

### 3. Oxygen Production env vars

**Hydrogen → Storefront settings → Environments → Production** — paste from `env pull`:

| Variable | Description |
|----------|-------------|
| `SESSION_SECRET` | Random 32+ char string |
| `PUBLIC_STOREFRONT_API_TOKEN` | Public Storefront API token |
| `PRIVATE_STOREFRONT_API_TOKEN` | Private Storefront API token |
| `PUBLIC_STORE_DOMAIN` | `your-store.myshopify.com` |
| `PUBLIC_STOREFRONT_ID` | Hydrogen storefront ID |
| `PUBLIC_CHECKOUT_DOMAIN` | Same as store domain |
| `PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID` | Customer Account API |
| `PUBLIC_CUSTOMER_ACCOUNT_API_URL` | `https://shopify.com/...` |

### 4. GitHub CI/CD

1. **Hydrogen → Oxygen deployments** → create deployment token
2. **GitHub → repo → Settings → Secrets → Actions**
3. Add secret: **`SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN`** (token value)
4. Push to `main` → Production deploy (auto-promoted)
5. Push to feature branches → Preview only

Workflow: [`.github/workflows/oxygen-deploy.yml`](.github/workflows/oxygen-deploy.yml)

If Shopify opens a PR with its own `oxygen-deployment-XXXXXXXX.yml`, you may merge that instead — use **one** workflow, not both.

### 5. First production deploy

```bash
cd hydrogen-quickstart
npx shopify hydrogen deploy --env-branch main
```

Or merge to `main` after the GitHub secret is set.

---

## Hydrogen vs Headless channel

| Channel | Use for PAWRA? |
|---------|----------------|
| **Hydrogen** | **Yes** — Oxygen, `hydrogen link`, `hydrogen deploy`, product publishing |
| **Headless** | No — self-hosted only; cannot deploy to Oxygen |
| **Online Store** | Optional — separate from pawrapercares.com |

---

## CI/CD behavior

| Git event | Oxygen target | Live at pawrapercares.com? |
|-----------|---------------|---------------------------|
| Push to `main` | Production | Yes (after successful deploy) |
| Push to other branches | Preview | No |
| Failed build/deploy | Previous Production unchanged | Yes |

Rollback: **Hydrogen → Production → View deployments → Make current** (manual).

---

## Local commands

```bash
npm install          # from repo root
npm run dev          # Hydrogen dev server
npm run build        # production build
npm run deploy       # manual Oxygen deploy (from hydrogen-quickstart)
```

---

## Pre-launch checklist

- [ ] New store linked via `hydrogen link`
- [ ] Products published to **Hydrogen** sales channel
- [ ] Oxygen Production env vars set
- [ ] `SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN` in GitHub
- [ ] `pawrapercares.com` on Production environment
- [ ] `npm run build` passes
- [ ] `.env` not committed

---

## Walker Referral Program (ops)

1. Applicant emails support from `/pages/walker-program`
2. Approve in email; create a unique Shopify **Discount code** (e.g. `WALKER-MAYA10`)
3. Email the walker their code + share tips (checkout field)
4. Track redemptions under Shopify Admin → Discounts

Storefront page: `/pages/walker-program`

---

**PAWRA LLC** · Presque Isle, ME · support@pawrapercares.com
