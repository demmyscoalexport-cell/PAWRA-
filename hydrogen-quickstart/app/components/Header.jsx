/**
 * @file Header.jsx
 * @description Chewy-style header: shop-by-pet mega nav, predictive search, cart.
 */

import {Suspense, useEffect, useId, useRef, useState} from 'react';
import {Await, NavLink, useAsyncValue, useRouteLoaderData} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {PawraLogo} from '~/components/ui/PawraLogo';
import {Icon} from '~/components/ui/Icon';
import {SEARCH_ENDPOINT, SearchFormPredictive} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';
import {getNavItemById, getNavMegaColumns, MEGA_NAV_ITEMS, NAV_MAIN, NAV_PAGE_LINKS, CARE_NAV_LINKS} from '~/lib/mobileNav';
import {ThemeToggle} from '~/components/ThemeToggle';
import {LocaleSwitcher} from '~/components/locale/LocaleSwitcher';
import {VisualSearchButton} from '~/components/search/VisualSearch';
import {VoiceSearchButton} from '~/components/search/VoiceSearch';
import {AISearchPanel} from '~/components/search/AISearchPanel';

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
        className={`pawra-header sticky top-0 z-50 border-b border-border-subtle bg-header/80 text-header-fg backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'shadow-sm dark:shadow-none' : ''
        }`}
        onMouseLeave={scheduleCloseMega}
      >
        <div className="mx-auto flex h-[72px] max-w-1440 items-center gap-3 px-4 md:gap-6 md:px-10">
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              className="reset inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-action-secondary lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open collections menu"
              aria-expanded={menuOpen}
            >
              <Icon name="menu" size="lg" color="text-header-fg" />
            </button>

            <NavLink to="/" className="no-underline" aria-label="PAWRA home">
              <PawraLogo variant="primary" height={34} className="lg:hidden" />
              <PawraLogo variant="primary" height={32} className="hidden lg:block" />
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
                      ? 'bg-action-secondary text-action-primary'
                      : 'text-header-fg hover:bg-action-secondary hover:text-action-primary'
                  }`}
                  aria-expanded={megaOpen === item.id}
                  aria-haspopup="true"
                >
                  {item.title}
                  <Icon name="chevron-right" size="sm" color="text-text-secondary" className="rotate-90" />
                </NavLink>
              </div>
            ))}
            {NAV_MAIN.filter((item) => !item.children?.length).map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className="rounded-md px-3 py-2 font-sans text-body-s font-medium text-header-fg no-underline transition-colors hover:bg-action-secondary hover:text-action-primary"
              >
                {item.title}
              </NavLink>
            ))}
            {CARE_NAV_LINKS.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className="hidden rounded-md px-3 py-2 font-sans text-body-s font-medium text-text-secondary no-underline transition-colors hover:bg-action-secondary hover:text-action-primary xl:inline-flex"
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          {/* Center search — opens predictive results (Chewy autosuggest) */}
          <div className="mx-auto hidden min-w-0 flex-1 max-w-xl md:block">
            <HeaderSearchField />
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 md:gap-3">
            <LocaleSwitcher className="hidden xl:inline-flex" />
            <ThemeToggle iconColor="text-header-fg" className="hover:bg-action-secondary" />
            <button
              type="button"
              className="reset inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-action-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring md:hidden"
              onClick={() => open('search')}
              aria-label="Search"
            >
              <Icon name="search" size="md" color="text-header-fg" />
            </button>
            {wishlistEnabled ? (
              <NavLink to={wishlistUrl} className="reset hidden rounded-md p-2 hover:bg-action-secondary sm:inline-flex" aria-label="Wishlist">
                <Icon name="heart" size="md" color="text-header-fg" />
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
  const [mode, setMode] = useState(/** @type {'shop' | 'ai'} */ ('shop'));
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
          <div className="flex items-center gap-1 rounded-md border border-border-subtle bg-surface px-2 py-1.5 shadow-sm dark:shadow-none">
            <Icon name="search" size="sm" color="text-text-secondary" />
            <input
              name="q"
              onChange={(event) => {
                setFocused(true);
                setMode('shop');
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
              className="w-full border-0 bg-transparent font-sans text-body-m text-text-primary outline-none placeholder:text-text-secondary/70"
              aria-label="Search products"
              autoComplete="off"
            />
            <VisualSearchButton />
            <VoiceSearchButton />
            <button
              type="button"
              onClick={() => {
                setFocused(true);
                setMode('ai');
              }}
              className="reset shrink-0 rounded-md px-2 py-1.5 font-sans text-body-xs font-semibold text-forest-green hover:bg-page-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              aria-label="Open AI search"
            >
              AI
            </button>
            <button
              type="button"
              onClick={() => {
                goToSearch();
                setFocused(false);
              }}
              className="reset shrink-0 rounded-md bg-forest-green px-3 py-1.5 font-sans text-body-s font-semibold text-white"
            >
              Search
            </button>
          </div>
        )}
      </SearchFormPredictive>

      {focused ? (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[70] max-h-[70vh] overflow-y-auto rounded-lg border border-border-subtle bg-surface p-3 shadow-sm">
          <div className="mb-3 flex gap-2 border-b border-border-subtle pb-3">
            <button
              type="button"
              className={`reset rounded-md px-3 py-1.5 font-sans text-body-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${
                mode === 'shop' ? 'bg-action-primary text-action-primary-label' : 'bg-action-secondary text-text-primary'
              }`}
              onClick={() => setMode('shop')}
            >
              Products
            </button>
            <button
              type="button"
              className={`reset rounded-md px-3 py-1.5 font-sans text-body-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${
                mode === 'ai' ? 'bg-action-primary text-action-primary-label' : 'bg-action-secondary text-text-primary'
              }`}
              onClick={() => setMode('ai')}
            >
              Ask AI
            </button>
          </div>
          {mode === 'ai' ? (
            <AISearchPanel />
          ) : (
            <SearchResultsPredictive>
              {({items, total, term, state, closeSearch}) => {
                const {articles, collections, pages, products, queries} = items;
                if (state === 'loading' && term.current) {
                  return <p className="px-2 py-3 font-sans text-body-s text-text-secondary">Searching…</p>;
                }
                if (!term.current) {
                  return (
                    <p className="px-2 py-3 font-sans text-body-s text-text-secondary">
                      Try “dog food”, “cat bed”, or open Ask AI for natural language.
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
                        className="mt-2 block px-2 py-2 font-sans text-body-s font-semibold text-action-primary no-underline"
                        onClick={() => setFocused(false)}
                      >
                        View all results for <q>{term.current}</q> →
                      </NavLink>
                    ) : null}
                  </>
                );
              }}
            </SearchResultsPredictive>
          )}
        </div>
      ) : null}
    </div>
  );
}

function MegaMenu({item, onClose, onMouseEnter}) {
  if (!item) return null;
  const columns = getNavMegaColumns(item.id);

  return (
    <div
      className="absolute left-0 right-0 top-full border-t border-border-subtle bg-surface-elevated shadow-sm"
      onMouseEnter={onMouseEnter}
      role="region"
      aria-label={`${item.title} categories`}
    >
      <div className="mx-auto max-w-1440 px-4 py-8 md:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-sans text-heading-m text-text-primary">{item.title}</p>
            <p className="mt-2 max-w-xl font-sans text-body-s text-text-secondary">
              Browse by category.
            </p>
          </div>
          {item.path ? (
            <NavLink
              to={item.path}
              onClick={onClose}
              className="font-sans text-body-s font-medium text-action-primary no-underline hover:underline"
            >
              Shop all {item.title} →
            </NavLink>
          ) : null}
        </div>

        {columns.length ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {columns.map((column) => (
              <div key={column.href}>
                <NavLink
                  to={column.href}
                  onClick={onClose}
                  className="font-sans text-body-m font-semibold text-text-primary no-underline hover:text-action-primary"
                >
                  {column.title}
                </NavLink>
                {column.links?.length ? (
                  <ul className="mt-3 space-y-2">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <NavLink
                          to={link.href}
                          onClick={onClose}
                          className="font-sans text-body-s text-text-secondary no-underline transition-colors hover:text-action-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                        >
                          {link.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        ) : item.children?.length ? (
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {item.children.map((child) => (
              <li key={child.id}>
                <NavLink
                  to={child.path}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-md border border-border-subtle bg-action-secondary px-4 py-3 font-sans text-body-m font-medium text-text-primary no-underline transition-colors hover:bg-page-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  {child.title}
                  <Icon name="chevron-right" size="sm" color="text-text-secondary" />
                </NavLink>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function AccountToggle({isLoggedIn}) {
  return (
    <NavLink
      to={isLoggedIn ? '/account' : '/account/login'}
      className="reset hidden rounded-md p-2 hover:bg-action-secondary sm:inline-flex"
      aria-label={isLoggedIn ? 'Account' : 'Sign in'}
    >
      <Icon name="user" size="md" color="text-header-fg" />
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
        className="absolute inset-0 bg-text-primary/40 reset"
        onClick={onClose}
        aria-label="Close menu overlay"
      />
      <aside className="absolute left-0 top-0 flex h-full w-[min(400px,92vw)] flex-col bg-surface-elevated shadow-sm md:w-[420px]">
        <div className="flex items-center justify-between border-b border-border-subtle px-4 py-4">
          {panel === 'root' ? (
            <PawraLogo variant="primary" height={28} />
          ) : (
            <button
              type="button"
              className="flex items-center gap-2 reset font-sans text-body-m font-medium text-text-primary"
              onClick={() => setPanel('root')}
            >
              <Icon name="chevron-left" size="md" color="text-text-primary" />
              Back
            </button>
          )}
          <button type="button" className="reset" onClick={onClose} aria-label="Close menu">
            <Icon name="close" size="md" color="text-text-primary" />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div
            className={`flex h-full w-[200%] transition-transform duration-300 ease-out ${
              panel === 'root' ? 'translate-x-0' : '-translate-x-1/2'
            }`}
          >
            <nav className="flex h-full w-1/2 flex-col gap-1 overflow-y-auto p-4">
              <p className="mb-2 px-3 font-sans text-body-s font-semibold uppercase tracking-wide text-text-secondary">
                Shop by pet
              </p>
              {NAV_MAIN.map((item) =>
                item.children?.length ? (
                  <button
                    key={item.id}
                    type="button"
                    className="flex items-center justify-between rounded-md px-3 py-3.5 text-left font-sans text-body-m font-medium text-text-primary reset hover:bg-action-secondary"
                    onClick={() => setPanel(item.id)}
                  >
                    {item.title}
                    <Icon name="chevron-right" size="sm" color="text-text-secondary" />
                  </button>
                ) : (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-md px-3 py-3.5 font-sans text-body-m font-medium text-text-primary no-underline hover:bg-action-secondary"
                  >
                    {item.title}
                  </NavLink>
                ),
              )}

              <div className="my-3 border-t border-border-subtle" />

              {NAV_PAGE_LINKS.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className="rounded-md px-3 py-3 font-sans text-body-m font-medium text-text-primary no-underline hover:bg-action-secondary"
                >
                  {item.title}
                </NavLink>
              ))}

              {wishlistEnabled && (
                <NavLink
                  to={wishlistUrl}
                  onClick={onClose}
                  className="rounded-md px-3 py-3 font-sans text-body-m font-medium text-text-primary no-underline hover:bg-action-secondary"
                >
                  Wishlist
                </NavLink>
              )}
              <NavLink
                to={isLoggedIn ? '/account' : '/account/login'}
                onClick={onClose}
                className="rounded-md px-3 py-3 font-sans text-body-m font-medium text-text-primary no-underline hover:bg-action-secondary"
              >
                {isLoggedIn ? 'My Account' : 'Sign In'}
              </NavLink>

              <div className="mt-4 flex items-center justify-between rounded-md px-3 py-3">
                <span className="font-sans text-body-m font-medium text-text-primary">Appearance</span>
                <ThemeToggle />
              </div>
            </nav>

            <nav className="flex h-full w-1/2 flex-col gap-1 overflow-y-auto p-4">
              {activeItem ? (
                <>
                  <div className="mb-2 flex items-center justify-between gap-2 px-3">
                    <p className="font-sans text-body-l font-semibold text-text-primary">
                      {activeItem.title}
                    </p>
                    <NavLink
                      to={activeItem.path}
                      onClick={onClose}
                      className="font-sans text-body-xs font-medium text-action-primary no-underline"
                    >
                      View all
                    </NavLink>
                  </div>
                  {activeItem.children?.map((child) => (
                    <div key={child.id} className="mb-1">
                      <NavLink
                        to={child.path}
                        onClick={onClose}
                        className="flex items-center justify-between rounded-md px-3 py-3 font-sans text-body-m font-medium text-text-primary no-underline hover:bg-action-secondary"
                      >
                        {child.title}
                        <Icon name="chevron-right" size="sm" color="text-text-secondary" />
                      </NavLink>
                      {child.children?.length ? (
                        <ul className="mb-2 ml-3 space-y-1 border-l border-border-subtle pl-3">
                          {child.children.map((leaf) => (
                            <li key={leaf.id}>
                              <NavLink
                                to={leaf.path}
                                onClick={onClose}
                                className="block rounded-md px-2 py-2 font-sans text-body-s text-text-secondary no-underline hover:bg-action-secondary hover:text-text-primary"
                              >
                                {leaf.title}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
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
      <Icon name="cart" size="lg" color="text-header-fg" />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 font-mono text-mono-s font-medium text-accent-label animate-bounce">
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
