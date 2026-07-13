# PAWRA Launch Checklist — New Shopify Store

Use this after connecting a **new** Shopify account to the Hydrogen storefront.

## 1. Shopify store

- [ ] **Basic+** plan active
- [ ] **Hydrogen** channel installed (not Headless-only for Oxygen)
- [ ] Hydrogen storefront created (e.g. `PAWRA`)
- [ ] **Settings → Customer accounts** enabled
- [ ] **Settings → Payments** — Shopify Payments + bank
- [ ] **Settings → Domains** — `pawrapercares.com` connected

## 2. Products (critical)

- [ ] Products imported or created in Admin
- [ ] All products **Active** (not Draft)
- [ ] **Bulk edit → Sales channels** — published to **Hydrogen storefront** (not Online Store only)
- [ ] Verify: **Hydrogen → your storefront → Manage products** shows full catalog
- [ ] **Shopify Flow** (optional): auto-publish new products to Hydrogen channel

## 3. Collections & tags

- [ ] Tag products: `dogs` or `cats`, plus category tags (`grooming`, `toys`, etc.)
- [ ] Create collections: `dogs`, `cats`, `best-sellers`, `new-pet-essentials`, etc.
- [ ] Publish collections to **Hydrogen** channel

## 4. Hydrogen / Oxygen

- [ ] `npx shopify hydrogen link` + `npx shopify hydrogen env pull`
- [ ] Production env vars in **Hydrogen → Environments**
- [ ] GitHub secret `SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN` set
- [ ] Production environment branch = **`main`**
- [ ] Domain assigned to **Production** in Hydrogen settings

## 5. Verify

- [ ] `npm run build` passes locally
- [ ] `npm run dev` — products visible at localhost:3000
- [ ] Push to `main` — GitHub Action deploy succeeds
- [ ] https://www.pawrapercares.com/collections/all shows products
- [ ] Add to cart → Shopify Checkout works

## 6. Legal & support

- [ ] Refund, shipping, privacy policies in Admin
- [ ] support@pawrapercares.com monitored
