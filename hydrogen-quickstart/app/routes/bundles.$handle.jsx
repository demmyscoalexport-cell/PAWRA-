/**
 * @file bundles.$handle.jsx
 * @description Starter kit detail — kit composition, guarantee, add items to cart when Shopify variants exist.
 */

import {Link, useLoaderData} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import {Button} from '~/components/ui/Button';
import {PawraProductCard} from '~/components/PawraProductCard';
import {useAside} from '~/components/Aside';
import {PRIMARY_CTA_CLASSES} from '~/lib/primaryButton';
import {
  getKitProducts,
  getStarterKitByHandle,
  PET_GUARANTEE,
  STARTER_KITS,
} from '~/data/starterKits';
import {buildSeoMeta, breadcrumbJsonLd} from '~/lib/seo';
import {FREE_SHIPPING_THRESHOLD_USD} from '~/lib/commerce';

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({params, context}) {
  const handle = params.handle;
  const kit = getStarterKitByHandle(handle);
  if (!kit) {
    throw new Response('Starter kit not found', {status: 404});
  }

  const mockProducts = getKitProducts(kit);
  /** @type {Array<{handle: string; variantId: string | null; title: string}>} */
  const resolved = [];

  for (const product of mockProducts) {
    let variantId = null;
    try {
      const {product: shopifyProduct} = await context.storefront.query(PRODUCT_VARIANT_QUERY, {
        variables: {handle: product.handle},
        cache: context.storefront.CacheShort(),
      });
      variantId = shopifyProduct?.selectedOrFirstAvailableVariant?.id || null;
    } catch {
      variantId = null;
    }
    resolved.push({
      handle: product.handle,
      title: product.title,
      variantId,
    });
  }

  const cartLines = resolved
    .filter((item) => item.variantId)
    .map((item) => ({
      merchandiseId: item.variantId,
      quantity: 1,
      attributes: [
        {key: '_starter_kit', value: kit.handle},
        {key: 'Starter kit', value: kit.title},
      ],
    }));

  return {kit, products: mockProducts, resolved, cartLines};
}

/**
 * @param {Route.MetaArgs} args
 */
export const meta = ({data}) => {
  const kit = data?.kit;
  return buildSeoMeta({
    title: kit?.title || 'Starter Kit',
    description: kit?.description || 'PAWRA curated starter kit with 30-day Pet Guarantee.',
    url: `/bundles/${kit?.handle || ''}`,
    jsonLd: breadcrumbJsonLd([
      {label: 'Home', to: '/'},
      {label: 'Starter kits', to: '/bundles/new-dog-starter'},
      {label: kit?.title || 'Kit'},
    ]),
  });
};

export default function StarterKitPage() {
  const {kit, products, cartLines} = useLoaderData();
  const {open} = useAside();
  const canAddKit = cartLines.length > 0;

  return (
    <div className="bg-page-bg">
      <section className="border-b border-border-subtle">
        <div className="mx-auto grid max-w-1440 gap-0 lg:grid-cols-2">
          <div className="min-h-[320px] overflow-hidden lg:min-h-[560px]">
            <img
              src={kit.image}
              alt=""
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="flex flex-col justify-center px-4 py-12 md:px-10 md:py-16">
            <p className="font-sans text-body-xs font-semibold uppercase tracking-widest text-action-primary">
              Starter kit · {kit.species === 'dog' ? 'Dogs' : 'Cats'}
            </p>
            <h1 className="mt-3 font-serif text-display-s text-action-primary md:text-display-m">
              {kit.title}
            </h1>
            <p className="mt-2 font-sans text-heading-s text-text-secondary">{kit.headline}</p>
            <p className="mt-4 max-w-xl font-sans text-body-m text-text-secondary">{kit.description}</p>

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="font-mono text-[1.5rem] font-semibold text-action-primary">
                ${kit.bundlePrice}
              </span>
              <span className="font-mono text-mono-s text-text-secondary line-through">
                ${kit.compareAtPrice}
              </span>
              <span className="rounded-md bg-sale/10 px-2 py-1 font-sans text-body-xs font-medium text-sale">
                {kit.savingsLabel}
              </span>
            </div>

            <ul className="mt-6 space-y-2">
              <li className="font-sans text-body-s text-text-primary">✓ {PET_GUARANTEE.short}</li>
              <li className="font-sans text-body-s text-text-primary">
                ✓ Free US shipping on orders over ${FREE_SHIPPING_THRESHOLD_USD}
              </li>
              <li className="font-sans text-body-s text-text-primary">
                ✓ {products.length} curated essentials in one order
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {canAddKit ? (
                <CartForm route="/cart" action={CartForm.ACTIONS.LinesAdd} inputs={{lines: cartLines}}>
                  {(fetcher) => (
                    <button
                      type="submit"
                      className={`reset inline-flex h-12 items-center justify-center rounded-md px-8 font-sans text-body-m font-semibold ${PRIMARY_CTA_CLASSES}`}
                      disabled={fetcher.state !== 'idle'}
                      onClick={() => open('cart')}
                    >
                      {fetcher.state !== 'idle' ? 'Adding…' : 'Add kit to cart'}
                    </button>
                  )}
                </CartForm>
              ) : (
                <Button variant="primary" size="lg" href={`#kit-items`}>
                  Shop kit items
                </Button>
              )}
              <Button variant="secondary" size="lg" href="/care/quiz">
                Retake care quiz
              </Button>
            </div>

            {!canAddKit ? (
              <p className="mt-4 font-sans text-body-s text-text-secondary">
                Kit items are ready to browse below. When products are published to your Hydrogen
                channel, “Add kit to cart” enables automatically.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section id="kit-items" className="mx-auto max-w-1440 px-4 py-16 md:px-10 md:py-24">
        <h2 className="font-serif text-heading-l text-action-primary">What’s inside</h2>
        <p className="mt-2 font-sans text-body-m text-text-secondary">
          Every item is available individually — or add the full kit when variants are live.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product, index) => (
            <PawraProductCard
              key={product.id}
              product={product}
              loading={index < 4 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-border-subtle bg-surface px-4 py-16 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-heading-l text-action-primary">{PET_GUARANTEE.title}</h2>
          <p className="mt-4 font-sans text-body-m text-text-secondary">{PET_GUARANTEE.detail}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/returns" className="font-sans text-body-s font-semibold text-action-primary no-underline hover:underline">
              Start a return →
            </Link>
            <Link to="/policies/refund-policy" className="font-sans text-body-s text-text-secondary no-underline hover:text-action-primary">
              Refund policy
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-1440 px-4 pb-16 md:px-10 md:pb-24">
        <h2 className="font-sans text-heading-m text-text-primary">More starter kits</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {STARTER_KITS.filter((item) => item.handle !== kit.handle).map((item) => (
            <Link
              key={item.handle}
              to={`/bundles/${item.handle}`}
              className="rounded-md border border-border-subtle bg-page-bg px-4 py-3 font-sans text-body-s font-medium text-text-primary no-underline hover:border-action-primary"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

const PRODUCT_VARIANT_QUERY = `#graphql
  query StarterKitProductVariant($handle: String!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      handle
      title
      selectedOrFirstAvailableVariant {
        id
        availableForSale
      }
    }
  }
`;

/** @typedef {import('./+types/bundles.$handle').Route} Route */
