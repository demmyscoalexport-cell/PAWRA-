# PAWRA Design Lock — Canonical Visual System

> **Status:** LOCKED as of 2026-07-28  
> **Brand:** PAWRA PET CARES · pawrapetcares.com  
> **Themes:** Light = *Trust & Warmth* · Dark = *Sleek & Cozy*  
> **Primary implementation:** `hydrogen-quickstart/` (Shopify Hydrogen storefront)  
> **Machine-readable twin:** `hydrogen-quickstart/app/assets/tokens/design-lock.json`  
> **Live reference route:** `/design-system`

**Use this document as the single source of truth when starting the next project.**  
Do not invent new colors, fonts, radii, shadows, or hero patterns unless explicitly asked to evolve the system.

---

## 1. Brand identity

| Field | Value |
|---|---|
| Full name | `PAWRA PET CARES` |
| Short name | `PAWRA` |
| Tagline | `Premium Pets Products Store` |
| Domain | `pawrapetcares.com` |
| URL | `https://pawrapetcares.com` |
| Support | `support@pawrapetcares.com` |
| Address | 76 Main St, Sparrow Bush, NY 12780, United States |
| Copyright | `© 2025 Pawra LLC · Sparrow Bush, NY · pawrapetcares.com` |
| Legal entity | Pawra LLC |

### Social

| Platform | URL |
|---|---|
| Instagram | https://www.instagram.com/pawrapetcares |
| TikTok | https://www.tiktok.com/@pawrapetcares |
| Facebook | https://www.facebook.com/pawrapetcares |
| Pinterest | https://www.pinterest.com/pawrapetcares |

### Logo system

| Asset | Component / file | Rules |
|---|---|---|
| Primary lockup | `PawraLogo` variant `primary` | Forest `#2C4A3E` mark + wordmark on light |
| Light lockup | `PawraLogo` variant `light` | White on dark / hero / footer |
| Icon only | `PawraLogo` variant `icon-only` | 48×48 viewBox mark |
| Wordmark | `PawraWordmark` | Standalone wordmark |
| Seal / badge | `PawraBadge` | Circular brand seal |
| Spinner | `PawraSpinner` | Loading state using mark |
| Social avatar | `PawraSocialAvatar` | Square social profile mark |
| Pattern | `PawraPattern` | Low-opacity repeating paw×leaf (default opacity `0.12–0.14`, rotate `12°`, tile `64×64`) |

**Mark geometry:** abstract paw pad + four toe pads + leaf accent (`BrandMarkPaths` in `brandMark.jsx`).  
**Fill rule:** `currentColor` — never hardcode conflicting brand colors in consumers.  
**Legacy SVG logos** (still available): `logo-primary.svg`, `logo-horizontal.svg`, `logo-icon.svg`, `logo-light.svg`, `logo-dark.svg`, `pawra-brand-logo-concept.png`.

**Brand hex constants** (`brandMark.jsx`):

```
BRAND_FOREST   #2C4A3E
BRAND_INK      #1E1E1E
BRAND_STONE    #FDFBF7
BRAND_WHITE    #FFFFFF
BRAND_ACCENT   #E8A538   (Golden Honey — also BRAND_CORAL / BRAND_JADE aliases)
BRAND_CHESTNUT #8B5A3C
```

Deprecated aliases still exported for compatibility: `BRAND_TEAL`, `BRAND_BLACK` → forest.

---

## 2. Design philosophy (non-negotiables)

1. **Trust & Warmth** in light mode — cream page, deep forest actions, chestnut secondary, golden honey urgency.
2. **Sleek & Cozy** in dark mode — muted forest-black base, layered charcoal surfaces, forest-pop CTAs, same gold accent.
3. **Enterprise calm** — minimal elevation, soft borders, no neon, no purple glow, no glassmorphism stacks.
4. **Brand-first heroes** — full-bleed lifestyle image; brand logo as a hero-level signal; one headline, one support line, one CTA group.
5. **No hero clutter** — no floating badges, chips, stat strips, or promo stickers on hero media.
6. **Cards are quiet** — rounded-md/lg surfaces; light mode may use soft chestnut-tinted shadows; dark mode uses borders, **no shadows**.
7. **Motion is presence, not noise** — short reveals (≤400ms), subtle hover scale `1.02`, respect `prefers-reduced-motion`.
8. **Serif for display / section titles; sans for UI/body; mono for codes, stats, copyright.**

---

## 3. Color system

Colors are stored as **space-separated RGB channels** in CSS variables so Tailwind can do `rgb(var(--color-*) / <alpha>)`.

### 3.1 Brand raw palette

| Token name | Hex | RGB | Role |
|---|---|---|---|
| Forest Green | `#2C4A3E` | `44 74 62` | Primary action (light), brand |
| Chestnut | `#8B5A3C` | `139 90 60` | Secondary outline / warm accent |
| Golden Honey | `#E8A538` | `232 165 56` | Urgent CTA, sale, focus, warning |
| Warm Ivory | `#FDFBF7` | `253 251 247` | Page background (light) |
| Near Black | `#1E1E1E` | `30 30 30` | Primary text (light) |
| Soft Charcoal | `#5A5A5A` | `90 90 90` | Secondary text (light) |
| Warm Taupe | `#E8E2D9` | `232 226 217` | Subtle borders (light) |
| Muted Forest Black | `#111514` | `17 21 20` | Page background (dark) |
| Layered Charcoal | `#1E2422` | `30 36 34` | Surface (dark) |
| Forest Pop | `#4A7C65` | `74 124 101` | Primary action (dark) |

### 3.2 Semantic tokens — Light (*Trust & Warmth*)

| CSS var | RGB | Hex (approx) | Usage |
|---|---|---|---|
| `--color-page-bg` | `253 251 247` | `#FDFBF7` | Page / body |
| `--color-surface` | `255 255 255` | `#FFFFFF` | Cards, panels |
| `--color-surface-elevated` | `255 255 255` | `#FFFFFF` | Asides, sticky panels |
| `--color-text-primary` | `30 30 30` | `#1E1E1E` | Headings, body |
| `--color-text-secondary` | `90 90 90` | `#5A5A5A` | Muted copy |
| `--color-text-inverse` | `253 251 247` | `#FDFBF7` | Text on dark |
| `--color-border-subtle` | `232 226 217` | `#E8E2D9` | Dividers, card edges |
| `--color-border-strong` | `197 186 170` | `#C5BAAA` | Stronger dividers / scrollbars |
| `--color-focus-ring` | `232 165 56` | `#E8A538` | Focus rings |
| `--color-action-primary` | `44 74 62` | `#2C4A3E` | Primary buttons, announcement bar |
| `--color-action-primary-hover` | `31 54 44` | `#1F362C` | Primary hover |
| `--color-action-primary-label` | `255 255 255` | `#FFFFFF` | Label on primary |
| `--color-action-secondary-bg` | `253 251 247` | `#FDFBF7` | Ghost hover / secondary fill |
| `--color-action-destructive` | `196 74 58` | `#C44A3A` | Destructive |
| `--color-accent` | `232 165 56` | `#E8A538` | Golden CTA / sale |
| `--color-accent-label` | `30 30 30` | `#1E1E1E` | Text on gold |
| `--color-chestnut` | `139 90 60` | `#8B5A3C` | Secondary CTA outline |
| `--color-success` | `44 74 62` | `#2C4A3E` | Success = forest |
| `--color-warning` / `--color-sale` | `232 165 56` | `#E8A538` | Warning / sale |
| `--color-inverse` | `17 21 20` | `#111514` | Deep inverse blocks |
| `--color-header` | `253 251 247` | `#FDFBF7` | Header bg |
| `--color-header-fg` | `30 30 30` | `#1E1E1E` | Header text |
| `--color-footer` | `44 74 62` | `#2C4A3E` | Footer bg |
| `--color-footer-fg` | `240 237 232` | `#F0EDE8` | Footer text |
| `--color-hero-overlay-from/to` | `44 74 62` | `#2C4A3E` | Hero gradient base |

Aliases mapped in Tailwind: `forest-green`, `warm-oat`, `cloud`, `ink`, `electric-jade` (= accent), `midnight`/`forest-night` (= inverse), `coral`/`champagne` (= sale/accent), `cta-primary*`.

### 3.3 Semantic tokens — Dark (*Sleek & Cozy*)

| CSS var | RGB | Hex (approx) | Notes |
|---|---|---|---|
| `--color-page-bg` | `17 21 20` | `#111514` | |
| `--color-surface` | `30 36 34` | `#1E2422` | |
| `--color-surface-elevated` | `30 36 34` | `#1E2422` | |
| `--color-text-primary` | `240 237 232` | `#F0EDE8` | |
| `--color-text-secondary` | `176 168 158` | `#B0A89E` | |
| `--color-text-inverse` | `17 21 20` | `#111514` | |
| `--color-border-subtle` | `46 53 50` | `#2E3532` | |
| `--color-border-strong` | `58 68 64` | `#3A4440` | |
| `--color-focus-ring` | `232 165 56` | `#E8A538` | Same gold |
| `--color-action-primary` | `74 124 101` | `#4A7C65` | Forest pop |
| `--color-action-primary-hover` | `58 99 80` | `#3A6350` | |
| `--color-action-primary-label` | `255 255 255` | `#FFFFFF` | |
| `--color-action-secondary-bg` | `30 36 34` | `#1E2422` | |
| `--color-action-destructive` | `224 120 104` | `#E07868` | Softened |
| `--color-accent` | `232 165 56` | `#E8A538` | Same gold |
| `--color-accent-label` | `30 30 30` | `#1E1E1E` | |
| `--color-chestnut` | `168 117 83` | `#A87553` | Brightened for contrast |
| `--color-success` | `74 124 101` | `#4A7C65` | |
| `--color-warning` / `--color-sale` | `232 165 56` | `#E8A538` | |
| `--color-inverse` | `10 12 11` | `#0A0C0B` | |
| `--color-header` | `17 21 20` | `#111514` | |
| `--color-header-fg` | `232 226 217` | `#E8E2D9` | |
| `--color-footer` | `10 12 11` | `#0A0C0B` | |
| `--color-footer-fg` | `240 237 232` | `#F0EDE8` | |
| `--color-hero-overlay-from/to` | `17 21 20` | `#111514` | Darker overlay |

**Dark mode rule:** `--shadow-sm/md/lg` are all `none`. Use borders instead of elevation.

### 3.4 Forbidden / avoid

- Purple-on-white or purple→indigo gradients
- Pure black `#000000` surfaces (use forest-black / layered charcoal)
- Neon jade / electric `#2EE8A0` (legacy design-system swatches — **do not use**)
- Champagne `#C9A96E` / coral `#FF6B5B` as brand accents (superseded by Golden Honey)
- Heavy multi-layer drop shadows, glow stacks, glassmorphism as default look

---

## 4. Typography

### Fonts (Google Fonts)

```
Playfair Display — 400, 500, 600, 700 + italic 400
Inter — 400, 500, 600, 700
JetBrains Mono — 400, 500
```

Load URL (from `root.jsx`):

```
https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap
```

### Families

| Token | Stack |
|---|---|
| `font-serif` | `"Playfair Display", Georgia, serif` |
| `font-sans` | `Inter, system-ui, sans-serif` |
| `font-mono` | `"JetBrains Mono", ui-monospace, monospace` |

### Usage rules

- `h1–h3` → `font-serif` (base layer in `tailwind.css`)
- UI, buttons, badges, nav, body → `font-sans`
- Codes, stats values, copyright microcopy → `font-mono`
- Body antialiased always

### Type scale (Tailwind)

| Token | Size | Line height | Tracking | Weight |
|---|---|---|---|---|
| `display-xl` | 4.5rem | 5rem | -0.02em | 500 |
| `display-l` | 3.5rem | 4rem | -0.02em | 500 |
| `display-m` | 2.5rem | 3rem | -0.02em | 500 |
| `display-s` | 2rem | 2.5rem | -0.02em | 500 |
| `heading-xl` / `heading-l` | 1.75rem | 2.25rem | — | 500 |
| `heading-m` | 1.375rem | 1.875rem | — | 500 |
| `heading-s` | 1.125rem | 1.625rem | — | 500 |
| `heading-xs` | 1rem | 1.5rem | — | 500 |
| `body-xl` / `body-l` | 1.125rem | 1.75rem | — | 400 |
| `body-m` | 1rem | 1.5rem | — | 400 |
| `body-s` | 0.875rem | 1.25rem | — | 400 |
| `body-xs` | 0.75rem | 1rem | — | 400 |
| `mono-l` / `mono-m` | 1rem | 1.5rem | — | 400 |
| `mono-s` | 0.875rem | 1.25rem | — | 400 |

**Hero headline pattern:** `font-serif text-display-m md:text-display-l` in white over image.  
**Section titles:** `font-serif text-heading-l text-action-primary` (or `text-text-primary`).  
**Eyebrows / labels:** `font-mono text-mono-s uppercase tracking-widest` or `font-sans text-body-xs uppercase tracking-wide`.

---

## 5. Spacing, layout, radius, elevation

### Spacing scale (rem)

`1=0.25 · 2=0.5 · 3=0.75 · 4=1 · 5=1.25 · 6=1.5 · 8=2 · 10=2.5 · 12=3 · 16=4 · 20=5 · 24=6`

Common section padding: `px-4 py-16 md:px-10 md:py-24`  
Hero vertical: `py-24` inside `min-h-[78vh] md:min-h-[88vh]`  
Header height: **72px** (`--header-height`)  
Content max width: **1440px** (`max-w-1440`)  
Aside width: **400px** (`--aside-width`)  
Grid item min: **355px** (`--grid-item-width`)  
Product / collection grids: `gap-1.5rem`, 2 cols mobile → 4 cols desktop for recommended products

### Border radius

| Token | Value | Notes |
|---|---|---|
| `sm` | 0.25rem | |
| `md` | 0.5rem | Default buttons, cards, inputs, badges |
| `lg` | 0.75rem | Product cards, fieldsets |
| `xl` / `2xl` / `3xl` | **1rem** | Capped — do not escalate to large soft blobs |
| `pill` / `full` | 9999px | Scrollbars, pulse only |

Default `img { border-radius: 0.5rem }` — override to `rounded-none` inside product card media.

### Shadows (light only)

Chestnut-tinted, never pure black:

```
--shadow-sm: 0 2px 8px rgba(139, 90, 60, 0.08);
--shadow-md: 0 8px 24px rgba(139, 90, 60, 0.1);
--shadow-lg: 0 16px 40px rgba(139, 90, 60, 0.12);
```

Tailwind maps: `shadow-xs/sm` → sm, `shadow-md/elevated` → md, `shadow-lg/xl` → lg.  
Focus accents: `jade-glow` = `0 0 0 3px rgb(accent / 0.35)`; `jade-glow-lg` = soft 24px (use sparingly).

**Dark:** all shadows `none`; use `border-border-subtle` / `border-border-strong`.

### Layout shell

1. Announcement bar (dismissible, forest fill, white label)
2. Sticky header `bg-header/80 backdrop-blur-md`, border-b, height 72px, scroll shadow in light only
3. Main content on `bg-page-bg`
4. Footer `bg-footer text-footer-fg`, 5-col desktop grid, legal mono microcopy

---

## 6. Theme behavior

| Item | Value |
|---|---|
| Storage key | `pawra-theme` |
| Modes | `light` \| `dark` \| `system` |
| Default | `system` |
| Mechanism | `html.dark` class + `color-scheme` |
| Boot | Inline `THEME_BOOT_SCRIPT` before paint (no flash) |
| Toggle | Cycles light → dark → system; `animate-theme-spin` on icon |
| Color transition | `300ms ease` on html/body/main |

---

## 7. Components (locked API)

### Buttons (`Button.tsx` + `primaryButton.js`)

Base: `inline-flex items-center justify-center rounded-md font-sans font-semibold`, focus ring gold with offset to page-bg.

| Variant | Look |
|---|---|
| `primary` | Forest fill, white label, hover darker + scale 1.02 |
| `secondary` | Transparent, chestnut text + border, hover chestnut/10 |
| `ghost` | Transparent, hover action-secondary |
| `accent` / `golden` / `premium` | Golden Honey fill, near-black label |
| `destructive` | Transparent, destructive text + border |

| Size | Height | Padding | Type |
|---|---|---|---|
| `sm` | h-9 | px-4 | body-s |
| `md` | h-11 | px-6 | body-m |
| `lg` | h-12 | px-8 | body-m |

Disabled: `opacity-40 pointer-events-none`.  
Supports `href` → React Router `Link`.

### Badges (`Badge.tsx`)

Shape: `rounded-md px-2.5 py-1 text-body-xs font-medium tracking-wide`

| Type | Style |
|---|---|
| `new` | forest/10 + forest text |
| `best-seller` | accent/15 + accent text |
| `coming-soon` | secondary bg + border + secondary text |
| `walker-approved` | forest/10 + forest |
| `care-plan` | secondary + border |
| `sale` | solid accent + accent-label (+ shadow-sm light only) |
| `in-stock` | success/10 |
| `low-stock` | warning/15 |
| `rx-required` | forest/10 |

### Cards (`Card.tsx`)

Base: `rounded-md bg-surface overflow-hidden` — **minimal elevation**.

| Variant | Notes |
|---|---|
| `product` | Square image, p-4, hover shadow-sm |
| `product-hero` | 4/3 image, display-m title |
| `feature` | Border, p-6 |
| `stat` | Mono display value, uppercase label |
| `testimonial` | Left border accent, quote |
| `walker-program` | Inverse bg, light text |

Utility class `.card-surface`: `rounded-lg bg-surface border-transparent shadow-sm` → dark: no shadow + subtle border.

### Product card (`PawraProductCard`)

- `rounded-lg`, light: transparent border + `shadow-sm` → hover `shadow-md`
- Dark: `border-border-subtle`, no shadow, hover stronger border
- Image: aspect-square, hover scale `1.02`
- Sale / Rx badges top-left over media
- Title: `text-body-s font-semibold line-clamp-2`

### Icons (`Icon.tsx`)

Stroke icons, `strokeWidth 1.75`, sizes: sm `16` / md `20` / lg `24`.  
Names include: cart, search, user, heart, paw, walker, gps, check, arrow-right, menu, close, star, plus, minus, shield, leaf, truck, wifi, chevrons, sun, moon, socials, chat.

### PulseRing

Soft dual-circle pulse using `action-primary` — **no glow effects**. Sizes sm/md/lg.

### Skeleton

`animate-pulse rounded-md bg-action-secondary` — variants: line, card, avatar, panel.

### Aside / cart drawer

Fixed right, 400px, `rounded-l-xl`, surface-elevated, slide 200ms. Overlay 400ms fade, `rgba(0,0,0,0.2)`.

---

## 8. Page & section patterns

### Hero (locked)

```
Full-bleed image (object-cover, edge-to-edge)
Gradient overlay: from-hero-overlay-from/70 via/40 to/20
  (dark: /85 · /60 · /40)
Centered column max-w-1440
1) PawraLogo light (height ~28)
2) Serif display headline (white)
3) One body-m support line (white/85)
4) CTA group: golden primary + ghost white outline
5) Optional micro guarantee line (body-xs white/70)
NO badges, chips, stats, or secondary promo blocks in first viewport
```

### Homepage section rhythm

1. Hero  
2. Trust bar — 4 icon+label cells, border-y, py-12  
3. Shop / ecosystem / kits sections — one job each  
4. Product grids  
5. Journal / FAQ / testimonials  
6. Guarantee band  
7. Footer  

Use `SectionReveal` for below-fold: opacity 0→1, y 16→0, 350ms, ease `[0.22, 1, 0.36, 1]`, once; skip if `eager` or reduced motion.

### Announcement bar

`bg-action-primary text-action-primary-label`, centered `body-xs/md:body-s`, dismissible (`pawra-announcement-closed`).

### Header

Chewy-style: logo, mega-nav (desktop), hamburger (mobile), predictive search, wishlist, theme toggle, locale, cart.  
Nav hover: `bg-action-secondary text-action-primary`. Icon buttons: `h-11 w-11 rounded-md`.

### Footer

Forest (light) / near-black (dark). Light logo. Columns: brand+newsletter | Shop | Company | Support. Legal row `text-body-xs`, copyright `font-mono text-[12px] opacity/60`.

---

## 9. Motion

| Token / pattern | Spec |
|---|---|
| `fade-in` | 400ms ease-out opacity |
| `slide-up` | 500ms ease-out, y 12→0 |
| `theme-spin` | 400ms, rotate -90→0, scale 0.85→1 |
| SectionReveal | 350ms custom ease, y 16 |
| Button hover | scale 1.02, duration-base 250ms |
| Theme / color | 300ms |
| Aside slide | 200ms ease-in-out |
| Overlay | 400ms |
| Durations | fast 150 · base 250 · slow 400 |

Always honor `useReducedMotion` / `prefers-reduced-motion`.

---

## 10. Forms & focus

- Inputs: `rounded-lg` (or `rounded-md`), border-subtle, surface bg, text-primary  
- Focus: `outline-none` + `ring-2 ring-focus-ring` (gold)  
- Order search fieldset: `rounded-lg` surface + subtle border  

---

## 11. Scrollbars

Thin 8px, thumb = border-strong, track transparent, pill radius. Firefox: `scrollbar-width: thin`.

---

## 12. Imagery & media

- Hero / lifestyle: real pets in bright modern homes — not abstract gradients as the main idea  
- Catalog: branded studio product images  
- Placeholders: `ProductImagePlaceholder` on page-bg  
- Aspect ratios: product 1:1; blog card ~16/10; blog article 3/2; product-hero card 4/3  

---

## 13. File map (where truth lives)

| Concern | Path |
|---|---|
| CSS semantic tokens | `hydrogen-quickstart/app/styles/app.css` |
| Tailwind theme | `hydrogen-quickstart/tailwind.config.ts` |
| Base font layer | `hydrogen-quickstart/app/styles/tailwind.css` |
| Raw brand JSON | `hydrogen-quickstart/app/assets/tokens/pawra-tokens.json` |
| **This lock (JSON)** | `hydrogen-quickstart/app/assets/tokens/design-lock.json` |
| Brand copy | `hydrogen-quickstart/app/lib/branding.js` |
| Theme helpers | `hydrogen-quickstart/app/lib/theme.js` |
| CTA class strings | `hydrogen-quickstart/app/lib/primaryButton.js` |
| Brand SVG geometry | `hydrogen-quickstart/app/components/ui/brandMark.jsx` |
| UI primitives | `hydrogen-quickstart/app/components/ui/*` |
| Design showcase | `hydrogen-quickstart/app/routes/design-system.jsx` |
| Fonts registration | `hydrogen-quickstart/app/root.jsx` |

### Legacy Vite prototype (`src/` + root `tailwind.config.js`)

Older ivory/emerald/gold luxury palette — **not canonical**. Prefer Hydrogen Trust & Warmth tokens for all new work.

---

## 14. Replication checklist (next project)

1. Copy brand hexes + semantic RGB CSS variables (light + dark).  
2. Wire Tailwind `darkMode: 'class'` with the same color/font/radius/shadow maps.  
3. Load Playfair Display + Inter + JetBrains Mono.  
4. Port `PawraLogo` / `brandMark` geometry or keep SVG assets.  
5. Implement Button / Badge / Card / Icon / ThemeToggle with the locked variants.  
6. Build full-bleed hero with brand, one headline, one line, CTA group only.  
7. Use chestnut-tinted shadows in light; borders-only in dark.  
8. SectionReveal + reduced-motion.  
9. Keep max content width 1440, header 72px, radius capped at 1rem.  
10. Do not reintroduce neon jade, champagne, or coral sale reds.

---

## 15. Voice & microcopy tone

- Calm, care-first, premium but approachable  
- Prefer “care essentials”, “starter kits”, “Pet Guarantee” language  
- Avoid hype stacks, emoji icon rows as primary UI, or broadsheet newspaper density  

---

*Locked for PAWRA Pet Cares. Evolve only via explicit design decisions — not by default AI palette drift.*
