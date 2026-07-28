# PAWRA Design Lock — Agent Rule

When building **any new PAWRA page, surface, or project**, treat the locked design system as mandatory.

## Canonical sources (read these first)

1. `/DESIGN_LOCK.md` — full human-readable lock (every detail)
2. `/hydrogen-quickstart/app/assets/tokens/design-lock.json` — machine-readable twin
3. `/hydrogen-quickstart/app/assets/tokens/pawra-tokens.json` — compact brand tokens
4. Live CSS: `hydrogen-quickstart/app/styles/app.css`
5. Tailwind map: `hydrogen-quickstart/tailwind.config.ts`
6. Showcase: `/design-system` route

## Locked identity

- **Brand:** PAWRA PET CARES · pawrapetcares.com
- **Light:** Trust & Warmth — Ivory `#FDFBF7`, Forest `#2C4A3E`, Chestnut `#8B5A3C`, Golden Honey `#E8A538`
- **Dark:** Sleek & Cozy — `#111514` / `#1E2422`, Forest Pop `#4A7C65`, same gold
- **Fonts:** Playfair Display (display/serif) · Inter (UI/sans) · JetBrains Mono (mono)
- **Hero:** full-bleed only; brand + one headline + one line + CTA group; no chips/stats overlays
- **Shadows:** chestnut-tinted in light; **none** in dark (use borders)
- **Radius cap:** 1rem max for xl/2xl/3xl

## Do not

- Invent new brand colors or fonts
- Use neon jade, champagne, coral sale reds, purple gradients, or pure black
- Put cards, badges, or promo stickers in the hero first viewport
- Escalate to soft blob radii or glow stacks

Evolve the system only when the user explicitly asks for a design change.
