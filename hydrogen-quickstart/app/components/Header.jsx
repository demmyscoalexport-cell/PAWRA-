/**
 * @file Header.jsx
 * @description Chewy-style header: shop-by-pet mega nav, predictive search, cart.
 */

import {Suspense, useEffect, useId, useRef, useState} from 'react';
import {Await, NavLink, useAsyncValue, useRouteLoaderData} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {Logo} from '~/components/ui/Logo';
import {Icon} from '~/components/ui/Icon';
import {SEARCH_ENDPOINT, SearchFormPredictive} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';
import {getNavItemById, MEGA_NAV_ITEMS, NAV_MAIN, NAV_PAGE_LINKS} from '~/lib/mobileNav';
import {ThemeToggle} from '~/components/ThemeToggle';

/**
 * Sticky site header with logo, mega-nav (desktop), hamburger (mobile), search, cart.
 * @param {HeaderProps} props
 */
export function Header({cart, isLoggedIn}) {
  const rootData = useRouteLoaderData('root');
  const wishlistUrl = rootData?.integrations?.swym?.wishlistUrl || '/account/wishlist';
  const wishlistEnabled = Boolean(rootData?.integrations?.swym);
  const {open} = useAside();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(null);
  const megaCloseTimer = useRef(null);

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

  function openMega(id) {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    setMegaOpen(id);
  }

  function scheduleCloseMega() {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = setTimeout(() => setMegaOpen(null), 160);
  }

  return (
    <>
      <header
        className={`pawra-header sticky top-0 z-50 bg-header transition-all duration-base ${
          scrolled ? 'border-b border-electric-jade/15 bg-header/95 backdrop-blur-md' : ''
        }`}
        onMouseLeave={scheduleCloseMega}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-3 px-4 md:gap-6 md:px-8">
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              className="reset lg:hidden"
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

          {/* Desktop shop-by-pet mega nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Shop by pet">
            {MEGA_NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => openMega(item.id)}
                onFocus={() => openMega(item.id)}
              >
                <NavLink
                  to={item.path || '#'}
                  className={`inline-flex items-center gap-1 rounded-md px-3 py-2 font-sans text-body-s font-semibold no-underline transition-colors ${
                    megaOpen === item.id
                      ? 'bg-cloud/10 text-electric-jade'
                      : 'text-cloud hover:bg-cloud/10 hover:text-electric-jade'
                  }`}
                  aria-expanded={megaOpen === item.id}
                  aria-haspopup="true"
                >
                  {item.title}
                  <Icon name="chevron-right" size="sm" color="text-cloud/70" className="rotate-90" />
                </NavLink>
              </div>
            ))}
            {NAV_MAIN.filter((item) => !item.children?.length).map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className="rounded-md px-3 py-2 font-sans text-body-s font-medium text-cloud no-underline transition-colors hover:bg-cloud/10 hover:text-electric-jade"
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          {/* Center search — opens predictive results (Chewy autosuggest) */}
          <div className="mx-auto hidden min-w-0 flex-1 max-w-xl md:block">
            <HeaderSearchField />
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-3 md:gap-4">
            <ThemeToggle />
            <button
              type="button"
              className="reset md:hidden"
              onClick={() => open('search')}
              aria-label="Search"
            >
              <Icon name="search" size="md" color="text-cloud" />
            </button>
            {wishlistEnabled ? (
              <NavLink to={wishlistUrl} className="reset hidden sm:inline-flex" aria-label="Wishlist">
                <Icon name="heart" size="md" color="text-cloud" />
              </NavLink>
            ) : null}
            <AccountToggle isLoggedIn={isLoggedIn} />
            <CartToggle cart={cart} />
          </div>
        </div>

        {megaOpen ? (
          <MegaMenu
            item={getNavItemById(megaOpen)}
            onClose={() => setMegaOpen(null)}
            onMouseEnter={() => openMega(megaOpen)}
          />
        ) : null}
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

function HeaderSearchField() {
  const queriesDatalistId = useId();
  const [focused, setFocused] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function onPointerDown(event) {
      if (!containerRef.current?.contains(event.target)) {
        setFocused(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <SearchFormPredictive className="w-full">
        {({fetchResults, goToSearch, inputRef}) => (
          <div className="flex items-center gap-2 rounded-md bg-cloud px-3 py-2 shadow-sm">
            <Icon name="search" size="sm" color="text-forest-green/70" />
            <input
              name="q"
              onChange={(event) => {
                setFocused(true);
                fetchResults(event);
              }}
              onFocus={(event) => {
                setFocused(true);
                fetchResults(event);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  goToSearch();
                  setFocused(false);
                }
              }}
              placeholder="Search food, treats, beds…"
              ref={inputRef}
              type="search"
              list={queriesDatalistId}
              className="w-full border-0 bg-transparent font-sans text-body-s text-ink outline-none placeholder:text-ink/45"
              aria-label="Search products"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => {
                goToSearch();
                setFocused(false);
              }}
              className="reset shrink-0 rounded-md bg-forest-green px-3 py-1.5 font-sans text-body-s font-semibold text-cloud"
            >
              Search
            </button>
          </div>
        )}
      </SearchFormPredictive>

      {focused ? (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[70] max-h-[70vh] overflow-y-auto rounded-lg border border-forest-green/10 bg-cloud p-3 shadow-lg">
          <SearchResultsPredictive>
            {({items, total, term, state, closeSearch}) => {
              const {articles, collections, pages, products, queries} = items;
              if (state === 'loading' && term.current) {
                return <p className="px-2 py-3 font-sans text-body-s text-ink/60">Searching…</p>;
              }
              if (!term.current) {
                return (
                  <p className="px-2 py-3 font-sans text-body-s text-ink/60">
                    Try “dog food”, “cat bed”, or a brand name.
                  </p>
                );
              }
              if (!total) {
                return <SearchResultsPredictive.Empty term={term} />;
              }
              return (
                <>
                  <SearchResultsPredictive.Queries queries={queries} queriesDatalistId={queriesDatalistId} />
                  <SearchResultsPredictive.Products
                    products={products}
                    closeSearch={() => {
                      closeSearch();
                      setFocused(false);
                    }}
                    term={term}
                  />
                  <SearchResultsPredictive.Collections
                    collections={collections}
                    closeSearch={() => {
                      closeSearch();
                      setFocused(false);
                    }}
                    term={term}
                  />
                  <SearchResultsPredictive.Pages
                    pages={pages}
                    closeSearch={() => {
                      closeSearch();
                      setFocused(false);
                    }}
                    term={term}
                  />
                  <SearchResultsPredictive.Articles
                    articles={articles}
                    closeSearch={() => {
                      closeSearch();
                      setFocused(false);
                    }}
                    term={term}
                  />
                  {term.current && total ? (
                    <NavLink
                      to={`${SEARCH_ENDPOINT}?q=${encodeURIComponent(term.current)}`}
                      className="mt-2 block px-2 py-2 font-sans text-body-s font-semibold text-forest-green no-underline"
                      onClick={() => setFocused(false)}
                    >
                      View all results for <q>{term.current}</q> →
                    </NavLink>
                  ) : null}
                </>
              );
            }}
          </SearchResultsPredictive>
        </div>
      ) : null}
    </div>
  );
}

function MegaMenu({item, onClose, onMouseEnter}) {
  if (!item?.children?.length) return null;

  return (
    <div
      className="absolute left-0 right-0 top-full border-t border-cloud/10 bg-cloud shadow-lg"
      onMouseEnter={onMouseEnter}
      role="region"
      aria-label={`${item.title} categories`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-[220px_1fr] md:px-8">
        <div>
          <p className="font-serif text-display-s text-forest-green">{item.title}</p>
          <p className="mt-2 font-sans text-body-s text-ink/65">
            Shop {item.title.toLowerCase()} essentials the way you would on a pet superstore — food, comfort, and care.
          </p>
          {item.path ? (
            <NavLink
              to={item.path}
              onClick={onClose}
              className="mt-4 inline-flex font-sans text-body-s font-semibold text-forest-green no-underline hover:underline"
            >
              Shop all {item.title} →
            </NavLink>
          ) : null}
        </div>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {item.children.map((child) => (
            <li key={child.id}>
              <NavLink
                to={child.path}
                onClick={onClose}
                className="flex items-center justify-between rounded-md border border-forest-green/10 bg-warm-oat/60 px-4 py-3 font-sans text-body-m font-medium text-ink no-underline transition-colors hover:border-forest-green/30 hover:bg-warm-oat"
              >
                {child.title}
                <Icon name="chevron-right" size="sm" color="text-forest-green/50" />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
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
 * Mobile + tablet; desktop uses mega menu.
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
            <nav className="flex h-full w-1/2 flex-col gap-1 overflow-y-auto p-5">
              <p className="mb-2 px-3 font-sans text-body-s font-semibold uppercase tracking-wide text-cloud/50">
                Shop by pet
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

              <div className="mt-4 flex items-center justify-between rounded-md px-3 py-3">
                <span className="font-sans text-body-m font-medium text-cloud/90">Appearance</span>
                <ThemeToggle />
              </div>
            </nav>

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
