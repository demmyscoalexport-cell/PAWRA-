/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file PageLayout.jsx
 * @description Shared component: PageLayout.
 * @author Pawra LLC
 * @website pawrapetshop.com
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

export function PageLayout({
  cart,
  children = null,
  header,
  isLoggedIn,
  publicStoreDomain,
  judgeme,
}) {
  return (
    <Aside.Provider>
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
      <main>{children}</main>
      <Footer />
      {judgeme ? <JudgemeReviewsTab /> : null}
    </Aside.Provider>
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
                className="w-full rounded-md border border-forest-green/20 px-3 py-2"
              />
              <button type="button" onClick={goToSearch} className="mt-2 font-sans text-body-s text-forest-green">
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
