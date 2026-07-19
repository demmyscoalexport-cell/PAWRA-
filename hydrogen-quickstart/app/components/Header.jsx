/**
 * @file Header.jsx
 * @description Sticky header + nested Collections hamburger (mobile & desktop).
 */

import {Suspense, useEffect, useState} from 'react';
import {Await, NavLink, useAsyncValue, useRouteLoaderData} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {Logo} from '~/components/ui/Logo';
import {Icon} from '~/components/ui/Icon';
import {getNavItemById, NAV_MAIN, NAV_PAGE_LINKS} from '~/lib/mobileNav';

/**
 * Sticky site header with logo, hamburger collections menu, search, account, cart.
 * @param {HeaderProps} props
 */
export function Header({cart, isLoggedIn}) {
  const rootData = useRouteLoaderData('root');
  const wishlistUrl = rootData?.integrations?.swym?.wishlistUrl || '/account/wishlist';
  const wishlistEnabled = Boolean(rootData?.integrations?.swym);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`pawra-header sticky top-0 z-50 bg-forest-green transition-all duration-base ${
          scrolled ? 'border-b border-electric-jade/15 bg-forest-green/95 backdrop-blur-md' : ''
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="reset"
              onClick={() => setMenuOpen(true)}
              aria-label="Open collections menu"
              aria-expanded={menuOpen}
            >
              <Icon name="menu" size="lg" color="text-cloud" />
            </button>

            <NavLink to="/" className="no-underline" aria-label="PAWRA home">
              <Logo variant="icon" height={34} />
            </NavLink>
          </div>

          <NavLink
            to="/collections/all"
            className="hidden font-sans text-body-s font-medium text-cloud no-underline transition-colors hover:text-electric-jade sm:inline"
          >
            Shop
          </NavLink>

          <div className="flex items-center gap-4">
            <NavLink to="/search" className="reset" aria-label="Search">
              <Icon name="search" size="md" color="text-cloud" />
            </NavLink>
            {wishlistEnabled ? (
              <NavLink to={wishlistUrl} className="reset hidden sm:inline-flex" aria-label="Wishlist">
                <Icon name="heart" size="md" color="text-cloud" />
              </NavLink>
            ) : null}
            <AccountToggle isLoggedIn={isLoggedIn} />
            <CartToggle cart={cart} />
          </div>
        </div>
      </header>

      <CollectionsDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        wishlistUrl={wishlistUrl}
        wishlistEnabled={wishlistEnabled}
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

/**
 * Nested Collections drawer — Level 1 (main) → Level 2 (sub-collections).
 * Works on mobile and desktop.
 */
function CollectionsDrawer({open, onClose, isLoggedIn, wishlistUrl, wishlistEnabled}) {
  const [panel, setPanel] = useState('root');
  const activeItem = panel === 'root' ? null : getNavItemById(panel);

  useEffect(() => {
    if (open) setPanel('root');
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Collections menu">
      <button
        type="button"
        className="absolute inset-0 bg-midnight/60 reset"
        onClick={onClose}
        aria-label="Close menu overlay"
      />
      <aside className="absolute left-0 top-0 flex h-full w-[min(400px,92vw)] flex-col bg-midnight shadow-xl md:w-[420px]">
        <div className="flex items-center justify-between border-b border-cloud/10 px-5 py-4">
          {panel === 'root' ? (
            <Logo variant="light" height={28} />
          ) : (
            <button
              type="button"
              className="flex items-center gap-2 reset font-sans text-body-m font-medium text-cloud"
              onClick={() => setPanel('root')}
            >
              <Icon name="chevron-left" size="md" color="text-cloud" />
              Back
            </button>
          )}
          <button type="button" className="reset" onClick={onClose} aria-label="Close menu">
            <Icon name="close" size="md" color="text-cloud" />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div
            className={`flex h-full w-[200%] transition-transform duration-300 ease-out ${
              panel === 'root' ? 'translate-x-0' : '-translate-x-1/2'
            }`}
          >
            {/* Level 1 */}
            <nav className="flex h-full w-1/2 flex-col gap-1 overflow-y-auto p-5">
              <p className="mb-2 px-3 font-sans text-body-s font-semibold uppercase tracking-wide text-cloud/50">
                Collections
              </p>
              {NAV_MAIN.map((item) =>
                item.children?.length ? (
                  <button
                    key={item.id}
                    type="button"
                    className="flex items-center justify-between rounded-md px-3 py-3.5 text-left font-sans text-body-m font-medium text-cloud reset hover:bg-forest-green/50"
                    onClick={() => setPanel(item.id)}
                  >
                    {item.title}
                    <Icon name="chevron-right" size="sm" color="text-cloud/70" />
                  </button>
                ) : (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-md px-3 py-3.5 font-sans text-body-m font-medium text-cloud no-underline hover:bg-forest-green/50"
                  >
                    {item.title}
                  </NavLink>
                ),
              )}

              <div className="my-3 border-t border-cloud/10" />

              {NAV_PAGE_LINKS.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className="rounded-md px-3 py-3 font-sans text-body-m font-medium text-cloud/90 no-underline hover:bg-forest-green/50"
                >
                  {item.title}
                </NavLink>
              ))}

              {wishlistEnabled && (
                <NavLink
                  to={wishlistUrl}
                  onClick={onClose}
                  className="rounded-md px-3 py-3 font-sans text-body-m font-medium text-cloud/90 no-underline hover:bg-forest-green/50"
                >
                  Wishlist
                </NavLink>
              )}
              <NavLink
                to={isLoggedIn ? '/account' : '/account/login'}
                onClick={onClose}
                className="rounded-md px-3 py-3 font-sans text-body-m font-medium text-cloud/90 no-underline hover:bg-forest-green/50"
              >
                {isLoggedIn ? 'My Account' : 'Sign In'}
              </NavLink>
            </nav>

            {/* Level 2 */}
            <nav className="flex h-full w-1/2 flex-col gap-1 overflow-y-auto p-5">
              {activeItem ? (
                <>
                  <p className="mb-2 px-3 font-sans text-body-l font-semibold text-cloud">
                    {activeItem.title}
                  </p>
                  {activeItem.children?.map((child) => (
                    <NavLink
                      key={child.id}
                      to={child.path}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-md px-3 py-3.5 font-sans text-body-m font-medium text-cloud no-underline hover:bg-forest-green/50"
                    >
                      {child.title}
                      <Icon name="chevron-right" size="sm" color="text-cloud/70" />
                    </NavLink>
                  ))}
                </>
              ) : null}
            </nav>
          </div>
        </div>
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
