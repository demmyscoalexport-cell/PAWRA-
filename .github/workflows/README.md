# GitHub Actions — Oxygen deploy

## Active workflow

**[`oxygen-deploy.yml`](oxygen-deploy.yml)** — deploys `hydrogen-quickstart/` to Shopify Oxygen.

| Trigger | Target |
|---------|--------|
| Push to `main` | Production (`--env-branch main`) |
| Push to other branches | Preview (`--preview`) |
| Manual `workflow_dispatch` | Choose production or preview |

## Required secret

Add in **GitHub → Settings → Secrets and variables → Actions**:

| Name | Value |
|------|--------|
| `SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN` | From **Hydrogen Admin → Storefront settings → Oxygen deployments → Create token** |

## Removed (old store)

- `oxygen-deployment-1000148769.yml` — deleted (old storefront `1000148769`)
- `OXYGEN_DEPLOYMENT_TOKEN_1000148769` — delete from GitHub if still present

## Shopify auto-generated workflow

When you connect GitHub from Hydrogen Admin, Shopify may open a PR with `oxygen-deployment-XXXXXXXX.yml`. You can:

- **Option A:** Use this repo’s `oxygen-deploy.yml` + `SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN` (recommended)
- **Option B:** Merge Shopify’s PR and remove `oxygen-deploy.yml` to avoid duplicate deploys

Use **only one** Oxygen workflow.
