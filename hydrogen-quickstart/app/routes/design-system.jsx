/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file design-system.jsx
 * @description Route module: design-system — Pawra Pet Shop page or API handler.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {Button} from '~/components/ui/Button';
import {Badge} from '~/components/ui/Badge';
import {Card} from '~/components/ui/Card';
import {Icon} from '~/components/ui/Icon';
import {Logo} from '~/components/ui/Logo';
import {PulseRing} from '~/components/ui/PulseRing';
import {PawraLogo} from '~/components/ui/PawraLogo';
import {PawraIcon} from '~/components/ui/PawraIcon';
import {PawraWordmark} from '~/components/ui/PawraWordmark';
import {PawraBadge} from '~/components/ui/PawraBadge';
import {PawraSpinner} from '~/components/ui/PawraSpinner';
import {PawraPattern} from '~/components/ui/PawraPattern';
import {PawraSocialAvatar} from '~/components/ui/PawraSocialAvatar';
import {BRAND} from '~/lib/branding';

export const meta = () => {
  return [{title: `PAWRA Design System | ${BRAND.domain}`}];
};

const COLORS = [
  {name: 'Page BG (Stone)', token: 'page-bg', hex: '#F8F6F4'},
  {name: 'Surface (Cloud)', token: 'surface', hex: '#FDFBF9'},
  {name: 'Text Primary', token: 'text-primary', hex: '#1E293B'},
  {name: 'Text Secondary', token: 'text-secondary', hex: '#6B7280'},
  {name: 'Border Subtle', token: 'border-subtle', hex: '#E3DFD8'},
  {name: 'Focus Ring', token: 'focus-ring', hex: '#5EEAD4'},
  {name: 'Action Primary', token: 'action-primary', hex: '#0D9488'},
  {name: 'Action Secondary', token: 'action-secondary', hex: '#F2EFEB'},
  {name: 'Accent (Amber)', token: 'accent', hex: '#D97706'},
  {name: 'Sale / Destructive', token: 'sale', hex: '#E11D48'},
  {name: 'Success', token: 'success', hex: '#059669'},
  {name: 'Inverse', token: 'inverse', hex: '#0F172A'},
];

const TYPE_SCALE = [
  {name: 'display-xl', className: 'font-sans text-display-xl text-text-primary'},
  {name: 'display-l', className: 'font-sans text-display-l text-text-primary'},
  {name: 'display-m', className: 'font-sans text-display-m text-text-primary'},
  {name: 'display-s', className: 'font-sans text-display-s text-text-primary'},
  {name: 'heading-xl', className: 'font-sans text-heading-xl text-text-primary'},
  {name: 'heading-l', className: 'font-sans text-heading-l text-text-primary'},
  {name: 'heading-m', className: 'font-sans text-heading-m text-text-primary'},
  {name: 'heading-s', className: 'font-sans text-heading-s text-text-primary'},
  {name: 'heading-xs', className: 'font-sans text-heading-xs text-text-primary'},
  {name: 'body-xl', className: 'font-sans text-body-xl text-text-primary'},
  {name: 'body-l', className: 'font-sans text-body-l text-text-primary'},
  {name: 'body-m', className: 'font-sans text-body-m text-text-primary'},
  {name: 'body-s', className: 'font-sans text-body-s text-text-secondary'},
  {name: 'body-xs', className: 'font-sans text-body-xs text-text-secondary'},
  {name: 'mono-l', className: 'font-mono text-mono-l text-text-primary'},
  {name: 'mono-m', className: 'font-mono text-mono-m text-text-primary'},
  {name: 'mono-s', className: 'font-mono text-mono-s text-text-secondary'},
];

const BADGE_TYPES = [
  'new',
  'best-seller',
  'coming-soon',
  'walker-approved',
  'care-plan',
  'sale',
  'in-stock',
  'low-stock',
];

const ICON_NAMES = [
  'cart',
  'search',
  'user',
  'heart',
  'paw',
  'walker',
  'gps',
  'check',
  'arrow-right',
  'menu',
  'close',
  'star',
  'plus',
  'minus',
  'shield',
  'leaf',
];

function Section({title, children}) {
  return (
    <section className="mb-16">
      <h2 className="mb-6 border-b border-border-subtle pb-3 font-sans text-heading-l text-text-primary">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DesignSystem() {
  return (
    <div className="design-system mx-auto max-w-6xl px-6 py-12">
      <header className="mb-12">
        <p className="mb-2 font-mono text-mono-s uppercase tracking-widest text-action-primary">
          PAWRA Design System
        </p>
        <h1 className="font-sans text-display-m text-text-primary">Brand Experience Tokens</h1>
        <p className="mt-3 max-w-2xl font-sans text-body-l text-text-secondary">
          {BRAND.tagline} — Visual reference for colors, typography,
          spacing, components, and animations at {BRAND.domain}.
        </p>
      </header>

      <Section title="Brand identity">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-border-subtle bg-surface p-6">
            <p className="mb-4 font-sans text-body-s text-text-secondary">Primary lockup</p>
            <PawraLogo variant="primary" height={40} />
          </div>
          <div className="rounded-lg bg-inverse p-6">
            <p className="mb-4 font-sans text-body-s text-text-inverse/70">Light on inverse</p>
            <PawraLogo variant="light" height={40} />
          </div>
          <div className="rounded-lg border border-border-subtle bg-surface p-6">
            <p className="mb-4 font-sans text-body-s text-text-secondary">Icon + wordmark</p>
            <div className="flex flex-wrap items-center gap-6">
              <PawraIcon size={48} />
              <PawraWordmark height={28} />
            </div>
          </div>
          <div className="rounded-lg border border-border-subtle bg-surface p-6">
            <p className="mb-4 font-sans text-body-s text-text-secondary">Seal · spinner · avatar</p>
            <div className="flex flex-wrap items-center gap-6">
              <PawraBadge size={88} />
              <PawraSpinner size={40} />
              <PawraSocialAvatar size={88} />
            </div>
          </div>
          <div className="relative col-span-full min-h-[120px] overflow-hidden rounded-lg border border-border-subtle bg-page-bg p-6">
            <PawraPattern id="ds-pattern" asBackground opacity={0.14} />
            <p className="relative font-sans text-body-m text-text-primary">
              Signature pattern texture — understated, enterprise, on-brand.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Legacy logo assets">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-page-bg p-6 shadow-sm">
            <p className="mb-4 font-sans text-body-s text-text-secondary">Primary</p>
            <Logo variant="primary" height={64} />
          </div>
          <div className="rounded-lg bg-page-bg p-6 shadow-sm">
            <p className="mb-4 font-sans text-body-s text-text-secondary">Horizontal</p>
            <Logo variant="horizontal" height={40} />
          </div>
          <div className="rounded-lg bg-page-bg p-6 shadow-sm">
            <p className="mb-4 font-sans text-body-s text-text-secondary">Icon</p>
            <Logo variant="icon" height={48} />
          </div>
          <div className="rounded-lg bg-action-primary p-6 shadow-sm">
            <p className="mb-4 font-sans text-body-s text-text-inverse/70">Light</p>
            <Logo variant="light" height={40} />
          </div>
          <div className="rounded-lg bg-page-bg p-6 shadow-sm">
            <p className="mb-4 font-sans text-body-s text-text-secondary">Dark</p>
            <Logo variant="dark" height={40} />
          </div>
        </div>
      </Section>

      <Section title="Color Palette">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {COLORS.map((color) => (
            <div key={color.token} className="overflow-hidden rounded-lg shadow-sm">
              <div className={`h-20 bg-${color.token}`} style={{backgroundColor: color.hex}} />
              <div className="bg-surface p-3">
                <p className="font-sans text-body-s font-medium text-text-primary">{color.name}</p>
                <p className="font-mono text-mono-s text-text-secondary">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div className="space-y-4 rounded-lg bg-surface p-6 shadow-sm">
          {TYPE_SCALE.map((size) => (
            <div key={size.name} className="flex flex-wrap items-baseline gap-4 border-b border-border-subtle pb-3 last:border-0">
              <span className="w-28 shrink-0 font-mono text-mono-s text-text-secondary">{size.name}</span>
              <p className={size.className}>
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Icons">
        <div className="grid grid-cols-4 gap-6 sm:grid-cols-8">
          {ICON_NAMES.map((name) => (
            <div key={name} className="flex flex-col items-center gap-2 rounded-lg bg-surface p-4 shadow-sm">
              <Icon name={name} size="lg" />
              <span className="font-mono text-mono-s text-text-secondary">{name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Buttons">
        <div className="space-y-8">
          {['primary', 'secondary', 'ghost', 'accent', 'premium', 'destructive'].map((variant) => (
            <div key={variant}>
              <p className="mb-3 font-mono text-mono-s uppercase text-text-secondary">{variant}</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant={variant} size="lg">
                  Large
                </Button>
                <Button variant={variant} size="md">
                  Default
                </Button>
                <Button variant={variant} size="sm">
                  Small
                </Button>
                <Button variant={variant} size="md" disabled>
                  Disabled
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap gap-3">
          {BADGE_TYPES.map((type) => (
            <Badge key={type} type={type} />
          ))}
        </div>
      </Section>

      <Section title="Pulse Ring — Status indicator">
        <div className="flex items-center gap-6 rounded-lg bg-inverse p-8">
          <PulseRing size="sm" />
          <PulseRing size="md" />
          <PulseRing size="lg" />
          <p className="font-sans text-body-m text-text-inverse/80">
            Soft teal status indicator for live / active states
          </p>
        </div>
      </Section>

      <Section title="Cards">
        <div className="grid gap-6 md:grid-cols-2">
          <Card
            variant="product"
            title="Premium Dog Leash"
            description="Durable braided leash for daily walks."
            badge="new"
            image={<div className="flex h-full items-center justify-center bg-page-bg font-sans text-heading-s text-text-primary/30">Product</div>}
          />
          <Card
            variant="product-hero"
            title="Cozy Pet Beds"
            description="Comfort essentials for cats and dogs."
            badge="best-seller"
            image={<div className="flex h-full items-center justify-center font-sans text-heading-l text-action-primary/40">Hero</div>}
          />
          <Card
            variant="feature"
            title="Grooming Collection"
            description="Health and hygiene supplies for every pet."
          />
          <Card variant="stat" value="2,400+" title="Happy Pets" description="Across the United States" />
          <Card
            variant="testimonial"
            quote="PAWRA has everything we need for our cat and dog in one place."
            author="Sarah M., Maine"
            description="Verified customer"
          />
          <Card
            variant="walker-program"
            title="Shop Food & Treats"
            description="Premium nutrition curated for cats and dogs."
            badge="best-seller"
            action={<Button variant="accent" size="sm">Shop Now</Button>}
          />
        </div>
      </Section>

      <Section title="Shadows & Spacing">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-surface p-6 shadow-sm">shadow-sm</div>
          <div className="rounded-lg bg-surface p-6 shadow-md">shadow-md</div>
          <div className="rounded-lg bg-surface p-6 shadow-none">shadow-none</div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {[4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160].map((px) => (
            <div key={px} className="flex flex-col items-center">
              <div className="bg-action-primary" style={{width: px, height: 16}} />
              <span className="mt-1 font-mono text-mono-s text-text-secondary">{px}px</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
