# GitHub Actions — Oxygen deploy

## Workflow

[`oxygen-deploy.yml`](./oxygen-deploy.yml) deploys the Hydrogen app in `hydrogen-quickstart/`.

| Event | Oxygen target |
|-------|----------------|
| Push to `main` | Production (`--env-branch main`) |
| Push to other branches | Preview |
| Manual `workflow_dispatch` | Choose production or preview |

## Required secret

| Name | Where to create |
|------|-----------------|
| `SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN` | Shopify Admin → **Hydrogen** → Storefront settings → **Oxygen deployments** → Create token |

Add it at: **GitHub → Settings → Secrets and variables → Actions**

Use **one** Oxygen deploy workflow only. If Shopify opens a PR with `oxygen-deployment-XXXXXXXX.yml`, either adopt that file **or** keep `oxygen-deploy.yml` — not both.
