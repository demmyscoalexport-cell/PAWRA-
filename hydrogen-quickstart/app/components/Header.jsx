/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file Header.jsx
 * @description Sticky header with species mega menus, search, account, and cart.
 */

import {Suspense, useEffect, useState} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {Logo} from '~/components/ui/Logo';
import {Icon} from '~/components/ui/Icon';
import {MegaMenu, MobileSpeciesMenu} from '~/components/MegaMenu';
import {PAWRA_HEADER_MENU, PAWRA_MOBILE_EXTRA} from '~/lib/pawraCollections';

/**
 * Sticky site header with logo, navigation, search, account, cart, and mobile drawer.
 * @param {HeaderProps} props
 */
export function Header({cart, isLoggedIn}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState(null);
  const [mobileSpeciesOpen, setMobileSpeciesOpen] = useState(null);

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

  function closeMobile() {
    setMobileOpen(false);
    setMobileSpeciesOpen(null);
  }

  return (
    <>
      <header
        className={`pawra-header sticky top-0 z-50 bg-forest-green transition-all duration-base ${
          scrolled ? 'border-b border-electric-jade/15 bg-forest-green/95 backdrop-blur-md' : ''
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <button
            type="button"
            className="reset md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" size="lg" color="text-cloud" />
          </button>

          <NavLink to="/" className="hidden shrink-0 no-underline md:flex" aria-label="PAWRA home">
            <Logo variant="icon" height={36} />
          </NavLink>
          <NavLink to="/" className="shrink-0 no-underline md:hidden" aria-label="PAWRA home">
            <Logo variant="icon" height={32} />
          </NavLink>

          <nav className="hidden flex-1 items-center justify-center gap-6 lg:gap-8 md:flex" role="navigation">
            {PAWRA_HEADER_MENU.map((item) =>
              item.hasMegaMenu ? (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setOpenMegaMenu(item.speciesId)}
                  onMouseLeave={() => setOpenMegaMenu(null)}
                >
                  <NavLink
                    to={item.url}
                    className="font-sans text-body-s font-medium text-cloud no-underline transition-colors hover:text-electric-jade"
                  >
                    {item.title}
                  </NavLink>
                  {openMegaMenu === item.speciesId && (
                    <MegaMenu speciesId={item.speciesId} />
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.id}
                  to={item.url}
                  className="font-sans text-body-s font-medium text-cloud no-underline transition-colors hover:text-electric-jade"
                >
                  {item.title}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <NavLink
              to="/search"
              className="hidden max-w-[200px] flex-1 items-center gap-2 rounded-md border border-cloud/20 bg-forest-green/50 px-3 py-2 no-underline lg:flex xl:max-w-[260px]"
              aria-label="Search products"
            >
              <Icon name="search" size="sm" color="text-cloud/70" />
              <span className="truncate font-sans text-body-s text-cloud/60">Search products…</span>
            </NavLink>
            <NavLink to="/search" className="reset lg:hidden" aria-label="Search">
              <Icon name="search" size="md" color="text-cloud" />
            </NavLink>
            <button type="button" className="reset hidden sm:inline-flex" aria-label="Wishlist">
              <Icon name="heart" size="md" color="text-cloud" />
            </button>
            <AccountToggle isLoggedIn={isLoggedIn} />
            <CartToggle cart={cart} />
          </div>
        </div>
      </header>

      <MobileDrawer
        open={mobileOpen}
        onClose={closeMobile}
        isLoggedIn={isLoggedIn}
        speciesOpen={mobileSpeciesOpen}
        setSpeciesOpen={setMobileSpeciesOpen}
      />
    </>
  );
}

function AccountToggle({isLoggedIn}) {
  return (
    <NavLink
      to={isLoggedIn ? '/account' : '/account/login'}
      className="reset hidden sm:inline-flex"
      aria-label={isLoggedIn ? 'Account' : 'Sign in'}
    >
      <Icon name="user" size="md" color="text-cloud" />
    </NavLink>
  );
}

function MobileDrawer({open, onClose, isLoggedIn, speciesOpen, setSpeciesOpen}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-midnight/60 reset"
        onClick={onClose}
        aria-label="Close menu overlay"
      />
      <aside className="absolute left-0 top-0 flex h-full w-[min(320px,85vw)] flex-col overflow-y-auto bg-midnight shadow-xl">
        <div className="flex items-center justify-between border-b border-cloud/10 px-5 py-4">
          <Logo variant="light" height={28} />
          <button type="button" className="reset" onClick={onClose} aria-label="Close menu">
            <Icon name="close" size="md" color="text-cloud" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-5">
          {PAWRA_HEADER_MENU.map((item) =>
            item.hasMegaMenu ? (
              <div key={item.id}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left font-sans text-body-m font-medium text-cloud reset hover:bg-forest-green/50"
                  onClick={() =>
                    setSpeciesOpen(speciesOpen === item.speciesId ? null : item.speciesId)
                  }
                >
                  {item.title}
                  <span className="text-cloud/50">{speciesOpen === item.speciesId ? '−' : '+'}</span>
                </button>
                {speciesOpen === item.speciesId && (
                  <MobileSpeciesMenu speciesId={item.speciesId} onNavigate={onClose} />
                )}
              </div>
            ) : (
              <NavLink
                key={item.id}
                to={item.url}
                onClick={onClose}
                className="rounded-md px-3 py-3 font-sans text-body-m font-medium text-cloud no-underline hover:bg-forest-green/50"
              >
                {item.title}
              </NavLink>
            ),
          )}
          {PAWRA_MOBILE_EXTRA.map((item) => (
            <NavLink
              key={item.id}
              to={item.url}
              onClick={onClose}
              className="rounded-md px-3 py-3 font-sans text-body-m font-medium text-cloud/80 no-underline hover:bg-forest-green/50"
            >
              {item.title}
            </NavLink>
          ))}
          <NavLink
            to={isLoggedIn ? '/account' : '/account/login'}
            onClick={onClose}
            className="rounded-md px-3 py-3 font-sans text-body-m font-medium text-cloud no-underline hover:bg-forest-green/50"
          >
            {isLoggedIn ? 'My Account' : 'Sign In'}
          </NavLink>
        </nav>
      </aside>
    </div>
  );
}

function CartBadge({count}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      type="button"
      className="relative inline-flex items-center reset"
      onClick={() => {
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
    </button>
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
 * @property {Promise<boolean>} [isLoggedIn]
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
