import {NavLink} from 'react-router';
import {Logo} from '~/components/ui/Logo';
import {Icon} from '~/components/ui/Icon';

const SHOP_LINKS = [
  {label: 'GPS Collar', to: '/collections/all'},
  {label: 'Fountain', to: '/collections/all'},
  {label: 'Feeder', to: '/collections/all'},
  {label: 'LED Collar', to: '/collections/all'},
  {label: 'Tracker', to: '/collections/all'},
];

const COMPANY_LINKS = [
  {label: 'About', to: '/pages/about'},
  {label: 'Walker Program', to: '/pages/walker-program'},
  {label: 'Blog', to: '/blogs/journal'},
  {label: 'Press', to: '/pages/about'},
];

const SUPPORT_LINKS = [
  {label: 'Track Order', to: '/account/orders'},
  {label: 'Contact', to: '/pages/about'},
  {label: 'Returns', to: '/policies/refund-policy'},
  {label: 'FAQ', to: '/#faq'},
  {label: 'Shipping', to: '/policies/shipping-policy'},
];

const SOCIAL = [
  {label: 'Instagram', icon: 'instagram', href: 'https://instagram.com/shoppawra'},
  {label: 'TikTok', icon: 'tiktok', href: 'https://tiktok.com/@shoppawra'},
  {label: 'Facebook', icon: 'facebook', href: 'https://facebook.com/shoppawra'},
  {label: 'Pinterest', icon: 'pinterest', href: 'https://pinterest.com/shoppawra'},
];

function FooterColumn({title, links}) {
  return (
    <div>
      <p className="mb-4 font-sans text-body-s font-semibold uppercase tracking-wide text-cloud">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.to}
              className="font-sans text-body-s text-cloud/70 no-underline transition-colors hover:text-cloud"
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-electric-jade bg-forest-night text-cloud">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo variant="light" height={36} />
            <p className="mt-4 font-serif text-body-l italic text-cloud">
              Every moment. Every pet. Every life.
            </p>
            <div className="mt-6 flex gap-4">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-cloud/70 transition-colors hover:text-cloud"
                >
                  <Icon name={s.icon} size="md" color="text-cloud" />
                </a>
              ))}
            </div>
          </div>
          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Support" links={SUPPORT_LINKS} />
        </div>
        <div className="mt-12 border-t border-cloud/10 pt-8">
          <p className="text-center font-mono text-[12px] text-cloud/40">
            © 2025 PAWRA Group LLC · New York, NY · shoppawra.com
          </p>
        </div>
      </div>
    </footer>
  );
}
