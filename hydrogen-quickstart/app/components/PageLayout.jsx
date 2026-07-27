/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET CARES               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetcares.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file PageLayout.jsx
 * @description Shared component: PageLayout.
 * @author Pawra LLC
 * @website pawrapetcares.com
 */

import {Await, Link} from 'react-router';
import {Suspense, useId} from 'react';
import {JudgemeReviewsTab} from '@judgeme/shopify-hydrogen';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header} from '~/components/Header';
import {AnnouncementBar} from '~/components/sections/AnnouncementBar';
import {CartMain} from '~/components/CartMain';
import {SEARCH_ENDPOINT, SearchFormPredictive} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';
import {useOptimisticCart} from '@shopify/hydrogen';
import {CompareProvider} from '~/components/compare/CompareContext';
import {CompareBar} from '~/components/compare/CompareBar';
import {LocaleProvider} from '~/components/locale/LocaleSwitcher';

export function PageLayout({
  cart,
  children = null,
  header,
  isLoggedIn,
  publicStoreDomain,
  judgeme,
}) {
  return (
    <LocaleProvider>
      <CompareProvider>
        <Aside.Provider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-action-primary focus:px-4 focus:py-2 focus:font-sans focus:text-body-s focus:font-semibold focus:text-action-primary-label focus:outline-none focus:ring-2 focus:ring-focus-ring"
          >
            Skip to content
          </a>
          <CartAside cart={cart} />
          <SearchAside />
          <AnnouncementBar />
          {header && (
            <Suspense fallback={<Header cart={cart} isLoggedIn={false} />}>
              <Await resolve={isLoggedIn}>
                {(loggedIn) => <Header cart={cart} isLoggedIn={loggedIn} />}
              </Await>
            </Suspense>
          )}
          <main id="main-content">{children}</main>
          <Footer />
          <CompareBar />
          {judgeme ? <JudgemeReviewsTab /> : null}
        </Aside.Provider>
      </CompareProvider>
    </LocaleProvider>
  );
}

function CartAside({cart}) {
  return (
    <Aside type="cart" heading={<CartAsideHeading cart={cart} />}>
      <Suspense fallback={<p className="p-4 font-sans text-body-s">Loading cart…</p>}>
        <Await resolve={cart}>
          {(cartData) => <CartMain cart={cartData} layout="aside" />}
        </Await>
      </Suspense>
    </Aside>
  );
}

function CartAsideHeading({cart}) {
  return (
    <Suspense fallback="Your cart">
      <Await resolve={cart}>
        {(cartData) => <CartAsideHeadingInner cart={cartData} />}
      </Await>
    </Suspense>
  );
}

function CartAsideHeadingInner({cart}) {
  const optimisticCart = useOptimisticCart(cart);
  const count = optimisticCart?.totalQuantity ?? 0;
  return `Your cart${count ? ` (${count})` : ''}`;
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="Search">
      <div className="predictive-search p-4">
        <SearchFormPredictive>
          {({fetchResults, goToSearch, inputRef}) => (
            <>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search PAWRA…"
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
                className="w-full rounded-md border border-border-subtle bg-action-secondary px-3 py-3 font-sans text-body-m text-text-primary outline-none placeholder:text-text-secondary focus:ring-2 focus:ring-focus-ring"
              />
              <button type="button" onClick={goToSearch} className="mt-3 inline-flex h-11 items-center rounded-md bg-action-primary px-4 font-sans text-body-s font-medium text-action-primary-label">
                Search
              </button>
            </>
          )}
        </SearchFormPredictive>
        <SearchResultsPredictive>
          {({items, total, term, state, closeSearch}) => {
            const {articles, collections, pages, products, queries} = items;
            if (state === 'loading' && term.current) return <div>Loading…</div>;
            if (!total) return <SearchResultsPredictive.Empty term={term} />;
            return (
              <>
                <SearchResultsPredictive.Queries queries={queries} queriesDatalistId={queriesDatalistId} />
                <SearchResultsPredictive.Products products={products} closeSearch={closeSearch} term={term} />
                <SearchResultsPredictive.Collections collections={collections} closeSearch={closeSearch} term={term} />
                <SearchResultsPredictive.Pages pages={pages} closeSearch={closeSearch} term={term} />
                <SearchResultsPredictive.Articles articles={articles} closeSearch={closeSearch} term={term} />
                {term.current && total ? (
                  <Link onClick={closeSearch} to={`${SEARCH_ENDPOINT}?q=${term.current}`}>
                    <p>View all results for <q>{term.current}</q> →</p>
                  </Link>
                ) : null}
              </>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}

/** @typedef {Object} PageLayoutProps
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<FooterQuery|null>} [footer]
 * @property {HeaderQuery} header
 * @property {Promise<boolean>} [isLoggedIn]
 * @property {string} publicStoreDomain
 * @property {React.ReactNode} [children]
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
