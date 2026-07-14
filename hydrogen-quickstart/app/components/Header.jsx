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
 * @description Shared component: Header.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {Suspense, useEffect, useState} from 'react';
import {Await, NavLink, useAsyncValue, useRouteLoaderData} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {Logo} from '~/components/ui/Logo';
import {Icon} from '~/components/ui/Icon';
import {PAWRA_COLLECTIONS} from '~/lib/pawraCollections';

// ─── Navigation Config ────────────────────────────────────────────────────────

/** Primary desktop/mobile nav links — Collections uses a hover dropdown. */
export const PAWRA_HEADER_MENU = [
  {id: 'shop', title: 'Shop', url: '/collections/all'},
  {id: 'collections', title: 'Collections', url: '/collections', hasDropdown: true},
  {id: 'about', title: 'About', url: '/pages/about'},
  {id: 'blog', title: 'Blog', url: '/blog'},
];

/** Extra links shown only in the mobile drawer. */
export const PAWRA_MOBILE_EXTRA = [
  {id: 'how-it-works', title: 'How It Works', url: '/pages/how-it-works'},
  {id: 'contact', title: 'Contact', url: '/pages/contact'},
];

// ─── Header Component ─────────────────────────────────────────────────────────

/**
 * Sticky site header with logo, navigation, search, account, cart, and mobile drawer.
 * @param {HeaderProps} props
 */
export function Header({cart, isLoggedIn}) {
  const rootData = useRouteLoaderData('root');
  const wishlistUrl = rootData?.integrations?.swym?.wishlistUrl || '/account/wishlist';
  const wishlistEnabled = Boolean(rootData?.integrations?.swym);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  // ─── Scroll Shadow ───
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Mobile Drawer Body Lock ───
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
          {/* ─── Mobile Menu Toggle ─── */}
          <button
            type="button"
            className="reset md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" size="lg" color="text-cloud" />
          </button>

          {/* ─── Logo ─── */}
          <NavLink to="/" className="hidden no-underline md:flex" aria-label="PAWRA home">
            <Logo variant="icon" height={36} />
          </NavLink>
          <NavLink to="/" className="no-underline md:hidden" aria-label="PAWRA home">
            <Logo variant="icon" height={32} />
          </NavLink>

          {/* ─── Desktop Navigation ─── */}
          <nav className="hidden items-center gap-8 md:flex" role="navigation">
            {PAWRA_HEADER_MENU.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setCollectionsOpen(true)}
                  onMouseLeave={() => setCollectionsOpen(false)}
                >
                  <NavLink
                    to={item.url}
                    className="font-sans text-body-s font-medium text-cloud no-underline transition-colors hover:text-electric-jade"
                  >
                    {item.title}
                  </NavLink>
                  {collectionsOpen && (
                    <div className="absolute left-0 top-full z-50 mt-2 min-w-[220px] rounded-lg border border-cloud/10 bg-midnight py-2 shadow-lg">
                      {PAWRA_COLLECTIONS.map((col) => (
                        <NavLink
                          key={col.title}
                          to={col.path}
                          className="block px-4 py-2 font-sans text-body-s text-cloud no-underline hover:bg-forest-green/50"
                        >
                          {col.title}
                        </NavLink>
                      ))}
                    </div>
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

          {/* ─── Utility Actions ─── */}
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

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isLoggedIn={isLoggedIn}
        wishlistUrl={wishlistUrl}
        wishlistEnabled={wishlistEnabled}
      />
    </>
  );
}

// ─── Account Link ─────────────────────────────────────────────────────────────

/** Account icon — routes to login or account dashboard based on auth state. */
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

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

/** Full-screen slide-out nav for viewports below md breakpoint. */
function MobileDrawer({open, onClose, isLoggedIn, wishlistUrl, wishlistEnabled}) {
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);

  if (!open) return null;

  const topLinks = PAWRA_HEADER_MENU.filter((item) => !item.hasDropdown);

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
        <nav className="flex flex-col gap-1 overflow-y-auto p-5">
          {topLinks.map((item) => (
            <NavLink
              key={item.id}
              to={item.url}
              onClick={onClose}
              className="rounded-md px-3 py-3 font-sans text-body-m font-medium text-cloud no-underline hover:bg-forest-green/50"
            >
              {item.title}
            </NavLink>
          ))}

          <button
            type="button"
            className="flex items-center justify-between rounded-md px-3 py-3 text-left font-sans text-body-m font-medium text-cloud reset hover:bg-forest-green/50"
            onClick={() => setCollectionsExpanded((v) => !v)}
            aria-expanded={collectionsExpanded}
          >
            Collections
            <Icon
              name="chevron-down"
              size="sm"
              color="text-cloud"
              className={`transition-transform duration-base ${collectionsExpanded ? 'rotate-180' : ''}`}
            />
          </button>
          {collectionsExpanded && (
            <div className="ml-3 flex flex-col gap-1 border-l border-cloud/10 pl-3">
              {PAWRA_COLLECTIONS.map((col) => (
                <NavLink
                  key={col.handle}
                  to={col.path}
                  onClick={onClose}
                  className="rounded-md px-3 py-2 font-sans text-body-s text-cloud/90 no-underline hover:bg-forest-green/50"
                >
                  {col.title}
                </NavLink>
              ))}
            </div>
          )}

          {PAWRA_MOBILE_EXTRA.map((item) => (
            <NavLink
              key={item.id}
              to={item.url}
              onClick={onClose}
              className="rounded-md px-3 py-3 font-sans text-body-m font-medium text-cloud no-underline hover:bg-forest-green/50"
            >
              {item.title}
            </NavLink>
          ))}

          {wishlistEnabled && (
            <NavLink
              to={wishlistUrl}
              onClick={onClose}
              className="rounded-md px-3 py-3 font-sans text-body-m font-medium text-cloud no-underline hover:bg-forest-green/50"
            >
              Wishlist
            </NavLink>
          )}
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

// ─── Cart Badge & Toggle ────────────────────────────────────────────────────────

/** Cart icon with optimistic quantity badge; opens cart aside drawer. */
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

/** Suspense boundary around deferred cart promise from root loader. */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

/** Resolves cart and applies optimistic updates for instant badge feedback. */
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
