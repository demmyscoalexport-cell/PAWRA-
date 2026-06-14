import {Suspense, useEffect, useState} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {Logo} from '~/components/ui/Logo';
import {Icon} from '~/components/ui/Icon';

export const PAWRA_HEADER_MENU = {
  id: 'gid://shopify/Menu/pawra-main',
  items: [
    {id: 'shop', title: 'Shop', url: '/collections/all'},
    {id: 'collections', title: 'Collections', url: '/collections'},
    {id: 'walker', title: 'Walker Program', url: '/pages/walker-program'},
    {id: 'about', title: 'About', url: '/pages/about'},
    {id: 'blog', title: 'Blog', url: '/blogs/journal'},
  ],
};

/**
 * @param {HeaderProps}
 */
export function Header({cart}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`pawra-header sticky top-0 z-50 bg-forest-green transition-all duration-base ${
          scrolled ? 'border-b border-electric-jade/15 bg-forest-green/95 backdrop-blur-md' : ''
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 md:px-8">
          <button
            type="button"
            className="reset md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" size="lg" color="text-cloud" />
          </button>

          <NavLink to="/" className="hidden no-underline md:flex" aria-label="PAWRA home">
            <Logo variant="icon" height={36} />
          </NavLink>
          <NavLink to="/" className="no-underline md:hidden" aria-label="PAWRA home">
            <Logo variant="icon" height={32} />
          </NavLink>

          <nav className="hidden items-center gap-8 md:flex" role="navigation">
            {PAWRA_HEADER_MENU.items.map((item) => (
              <NavLink
                key={item.id}
                to={item.url}
                className="font-sans text-body-s font-medium text-cloud no-underline transition-colors hover:text-electric-jade"
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <SearchToggle />
            <button type="button" className="reset hidden sm:inline-flex" aria-label="Wishlist">
              <Icon name="heart" size="md" color="text-cloud" />
            </button>
            <CartToggle cart={cart} />
          </div>
        </div>
      </header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function MobileDrawer({open, onClose}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-midnight/60 reset"
        onClick={onClose}
        aria-label="Close menu overlay"
      />
      <aside className="absolute left-0 top-0 flex h-full w-[min(320px,85vw)] flex-col bg-midnight shadow-xl">
        <div className="flex items-center justify-between border-b border-cloud/10 px-5 py-4">
          <Logo variant="light" height={28} />
          <button type="button" className="reset" onClick={onClose} aria-label="Close menu">
            <Icon name="close" size="md" color="text-cloud" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-5">
          {PAWRA_HEADER_MENU.items.map((item) => (
            <NavLink
              key={item.id}
              to={item.url}
              onClick={onClose}
              className="rounded-md px-3 py-3 font-sans text-body-m font-medium text-cloud no-underline hover:bg-forest-green/50"
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button type="button" className="reset" onClick={() => open('search')} aria-label="Search">
      <Icon name="search" size="md" color="text-cloud" />
    </button>
  );
}

function CartBadge({count}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      className="relative inline-flex items-center no-underline"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {cart, prevCart, shop, url: window.location.href || ''});
      }}
      aria-label={`Cart, ${count} items`}
    >
      <Icon name="cart" size="lg" color="text-cloud" />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-pill bg-electric-jade px-1 font-mono text-mono-s font-medium text-midnight">
          {count}
        </span>
      )}
    </a>
  );
}

function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

/** @typedef {Object} HeaderProps
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {string} [publicStoreDomain]
 * @property {string} [primaryDomainUrl]
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
