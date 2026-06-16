import {Button} from '~/components/ui/Button';
import {Badge} from '~/components/ui/Badge';
import {Card} from '~/components/ui/Card';
import {Icon} from '~/components/ui/Icon';
import {Logo} from '~/components/ui/Logo';
import {PulseRing} from '~/components/ui/PulseRing';
import {BRAND} from '~/lib/branding';

export const meta = () => {
  return [{title: `PAWRA Design System | ${BRAND.domain}`}];
};

const COLORS = [
  {name: 'Forest Green', token: 'forest-green', hex: '#1B3A2D'},
  {name: 'Electric Jade', token: 'electric-jade', hex: '#2EE8A0'},
  {name: 'Warm Oat', token: 'warm-oat', hex: '#F5F0E8'},
  {name: 'Midnight', token: 'midnight', hex: '#0E1A15'},
  {name: 'Forest Night', token: 'forest-night', hex: '#0F2318'},
  {name: 'Coral', token: 'coral', hex: '#FF6B5B'},
  {name: 'Cloud', token: 'cloud', hex: '#F2F2F0'},
  {name: 'Ink', token: 'ink', hex: '#1A1A1A'},
  {name: 'Champagne', token: 'champagne', hex: '#C9A96E'},
];

const TYPE_SCALE = [
  {name: 'display-xl', className: 'font-serif text-display-xl text-forest-green'},
  {name: 'display-l', className: 'font-serif text-display-l text-forest-green'},
  {name: 'display-m', className: 'font-serif text-display-m text-forest-green'},
  {name: 'display-s', className: 'font-serif text-display-s text-forest-green'},
  {name: 'heading-xl', className: 'font-serif text-heading-xl text-forest-green'},
  {name: 'heading-l', className: 'font-serif text-heading-l text-forest-green'},
  {name: 'heading-m', className: 'font-serif text-heading-m text-forest-green'},
  {name: 'heading-s', className: 'font-serif text-heading-s text-forest-green'},
  {name: 'heading-xs', className: 'font-serif text-heading-xs text-forest-green'},
  {name: 'body-xl', className: 'font-sans text-body-xl text-ink'},
  {name: 'body-l', className: 'font-sans text-body-l text-ink'},
  {name: 'body-m', className: 'font-sans text-body-m text-ink'},
  {name: 'body-s', className: 'font-sans text-body-s text-ink'},
  {name: 'body-xs', className: 'font-sans text-body-xs text-ink'},
  {name: 'mono-l', className: 'font-mono text-mono-l text-ink'},
  {name: 'mono-m', className: 'font-mono text-mono-m text-ink'},
  {name: 'mono-s', className: 'font-mono text-mono-s text-ink'},
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
      <h2 className="mb-6 border-b border-forest-green/15 pb-3 font-serif text-heading-l text-forest-green">
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
        <p className="mb-2 font-mono text-mono-s uppercase tracking-widest text-electric-jade">
          PAWRA Design System
        </p>
        <h1 className="font-serif text-display-m text-forest-green">Brand Experience Tokens</h1>
        <p className="mt-3 max-w-2xl font-sans text-body-l text-ink/70">
          {BRAND.tagline} — Visual reference for colors, typography,
          spacing, components, and animations at {BRAND.domain}.
        </p>
      </header>

      <Section title="Logos">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-warm-oat p-6 shadow-card">
            <p className="mb-4 font-sans text-body-s text-ink/60">Primary</p>
            <Logo variant="primary" height={64} />
          </div>
          <div className="rounded-xl bg-warm-oat p-6 shadow-card">
            <p className="mb-4 font-sans text-body-s text-ink/60">Horizontal</p>
            <Logo variant="horizontal" height={40} />
          </div>
          <div className="rounded-xl bg-warm-oat p-6 shadow-card">
            <p className="mb-4 font-sans text-body-s text-ink/60">Icon</p>
            <Logo variant="icon" height={48} />
          </div>
          <div className="rounded-xl bg-forest-green p-6 shadow-card">
            <p className="mb-4 font-sans text-body-s text-cloud/70">Light</p>
            <Logo variant="light" height={40} />
          </div>
          <div className="rounded-xl bg-warm-oat p-6 shadow-card">
            <p className="mb-4 font-sans text-body-s text-ink/60">Dark</p>
            <Logo variant="dark" height={40} />
          </div>
        </div>
      </Section>

      <Section title="Color Palette">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {COLORS.map((color) => (
            <div key={color.token} className="overflow-hidden rounded-lg shadow-sm">
              <div className={`h-20 bg-${color.token}`} style={{backgroundColor: color.hex}} />
              <div className="bg-cloud p-3">
                <p className="font-sans text-body-s font-medium text-ink">{color.name}</p>
                <p className="font-mono text-mono-s text-ink/60">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div className="space-y-4 rounded-xl bg-cloud p-6 shadow-card">
          {TYPE_SCALE.map((size) => (
            <div key={size.name} className="flex flex-wrap items-baseline gap-4 border-b border-forest-green/10 pb-3 last:border-0">
              <span className="w-28 shrink-0 font-mono text-mono-s text-ink/50">{size.name}</span>
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
            <div key={name} className="flex flex-col items-center gap-2 rounded-lg bg-cloud p-4 shadow-sm">
              <Icon name={name} size="lg" />
              <span className="font-mono text-mono-s text-ink/60">{name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Buttons">
        <div className="space-y-8">
          {['primary', 'secondary', 'ghost', 'accent', 'premium', 'destructive'].map((variant) => (
            <div key={variant}>
              <p className="mb-3 font-mono text-mono-s uppercase text-ink/50">{variant}</p>
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
        <div className="flex items-center gap-6 rounded-xl bg-forest-night p-8">
          <PulseRing size="sm" />
          <PulseRing size="md" />
          <PulseRing size="lg" />
          <p className="font-sans text-body-m text-cloud/80">
            Electric Jade breathing ring — scales 1 → 1.6 over 2000ms
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
            image={<div className="flex h-full items-center justify-center bg-warm-oat font-serif text-heading-s text-forest-green/30">Product</div>}
          />
          <Card
            variant="product-hero"
            title="Cozy Pet Beds"
            description="Comfort essentials for cats and dogs."
            badge="best-seller"
            image={<div className="flex h-full items-center justify-center font-serif text-heading-l text-electric-jade/40">Hero</div>}
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
          <div className="rounded-lg bg-cloud p-6 shadow-sm">shadow-sm</div>
          <div className="rounded-lg bg-cloud p-6 shadow-md">shadow-md</div>
          <div className="rounded-lg bg-cloud p-6 shadow-jade-glow">shadow-jade-glow</div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {[4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160].map((px) => (
            <div key={px} className="flex flex-col items-center">
              <div className="bg-electric-jade" style={{width: px, height: 16}} />
              <span className="mt-1 font-mono text-mono-s text-ink/50">{px}px</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
