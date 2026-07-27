/**
 * @file MockProductDetail.jsx
 * @description Enterprise mock PDP for catalog items not in Shopify.
 */

import {useState} from 'react';
import {Link} from 'react-router';
import {Breadcrumbs} from '~/components/Breadcrumbs';
import {Button} from '~/components/ui/Button';
import {Badge} from '~/components/ui/Badge';
import {PawraBadge} from '~/components/ui/PawraBadge';
import {PhotoReviews} from '~/components/ugc/PhotoReviews';
import {Money} from '@shopify/hydrogen';
import {isPrescriptionRequired} from '~/lib/productFlags';

/**
 * @param {{ product: import('~/data/products').MockProduct; relatedProducts?: any[] }} props
 */
export function MockProductDetail({product, relatedProducts = []}) {
  const price = product.priceRange?.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const onSale =
    price && compareAt && Number(compareAt.amount) > Number(price.amount);
  const isRx = isPrescriptionRequired(product);
  const [autoship, setAutoship] = useState(false);

  return (
    <div className="bg-page-bg">
      <div className="mx-auto max-w-1440 px-4 py-8 md:px-10 md:py-12">
        <Breadcrumbs
          className="mb-8"
          items={[
            {label: 'Home', to: '/'},
            {label: 'Shop', to: '/collections'},
            {label: product.title},
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-lg border border-border-subtle bg-surface">
            {product.featuredImage?.url ? (
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                className="aspect-square w-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center bg-action-secondary font-sans text-heading-m text-text-secondary">
                PAWRA
              </div>
            )}
          </div>

          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {onSale ? <Badge type="sale" /> : null}
              {isRx ? <Badge type="rx-required" /> : null}
            </div>
            <h1 className="font-sans text-display-m text-text-primary">{product.title}</h1>
            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              {price ? (
                <p className="font-mono text-mono-m font-medium text-text-primary">
                  <Money data={price} />
                  {autoship ? (
                    <span className="ml-2 font-sans text-body-s text-action-primary">Autoship save 5%</span>
                  ) : null}
                </p>
              ) : null}
              {onSale && compareAt ? (
                <p className="font-mono text-mono-s text-text-secondary line-through">
                  <Money data={compareAt} />
                </p>
              ) : null}
            </div>
            <p className="mt-6 max-w-xl font-sans text-body-l text-text-secondary">
              Premium PAWRA selection — curated for pet wellness. This is a catalog preview item from
              the mock storefront dataset.
            </p>

            {isRx ? (
              <div className="mt-6 rounded-lg border border-action-primary/20 bg-action-primary/5 p-4">
                <p className="font-sans text-body-s font-semibold text-text-primary">Prescription required</p>
                <p className="mt-1 font-sans text-body-s text-text-secondary">
                  A valid vet Rx is needed before we can ship this item.
                </p>
                <Link
                  to="/pharmacy/upload"
                  className="mt-3 inline-block font-sans text-body-s font-semibold text-action-primary no-underline hover:underline"
                >
                  Upload a prescription →
                </Link>
              </div>
            ) : (
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-border-subtle bg-surface p-4">
                <input
                  id="mock-autoship"
                  type="checkbox"
                  checked={autoship}
                  onChange={(e) => setAutoship(e.target.checked)}
                  className="mt-1 accent-[rgb(var(--color-action-primary))]"
                />
                <label htmlFor="mock-autoship" className="cursor-pointer">
                  <span className="block font-sans text-body-s font-semibold text-text-primary">
                    Autoship &amp; Save
                  </span>
                  <span className="mt-1 block font-sans text-body-s text-text-secondary">
                    Deliver every 4 weeks and save 5%. Manage anytime in Account → Subscriptions.
                  </span>
                </label>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {isRx ? (
                <Button variant="primary" size="lg" href="/pharmacy/upload">
                  Start prescription
                </Button>
              ) : (
                <Button variant="primary" size="lg" href="/cart">
                  {autoship ? 'Add Autoship to cart' : 'Add to cart'}
                </Button>
              )}
              <Button variant="secondary" size="lg" href="/telehealth">
                Ask a vet
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-4 rounded-lg border border-border-subtle bg-surface p-4">
              <PawraBadge size={72} />
              <div>
                <p className="font-sans text-body-m font-medium text-text-primary">PAWRA quality standard</p>
                <p className="mt-1 font-sans text-body-s text-text-secondary">
                  Calm authority. Premium materials. Trusted care.
                </p>
              </div>
            </div>

            {(product.tags || []).length ? (
              <div className="mt-8">
                <p className="mb-2 font-sans text-body-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Collections
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.slice(0, 6).map((tag) => (
                    <Link
                      key={tag}
                      to={`/collections/${tag}`}
                      className="rounded-md border border-border-subtle bg-action-secondary px-3 py-1 font-sans text-body-xs text-text-primary no-underline hover:border-text-primary"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <PhotoReviews />

        {relatedProducts.length ? (
          <section className="mt-16">
            <h2 className="mb-6 font-sans text-heading-m text-text-primary">You may also like</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  to={`/products/${related.handle}`}
                  className="rounded-lg border border-border-subtle bg-surface p-3 no-underline transition-shadow hover:shadow-sm"
                >
                  <p className="font-sans text-body-s font-medium text-text-primary line-clamp-2">
                    {related.title}
                  </p>
                  {related.priceRange?.minVariantPrice ? (
                    <p className="mt-2 font-mono text-mono-s text-text-secondary">
                      <Money data={related.priceRange.minVariantPrice} />
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
