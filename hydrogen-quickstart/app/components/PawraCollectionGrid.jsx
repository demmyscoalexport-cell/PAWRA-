import {Pagination} from '@shopify/hydrogen';
import {PawraProductCard} from '~/components/PawraProductCard';

/**
 * Product grid with clear Previous / Next pagination buttons.
 * @param {{
 *   connection: { nodes?: unknown[]; pageInfo?: unknown };
 *   products: Array<import('storefrontapi.generated').ProductItemFragment>;
 *   emptyMessage?: string;
 * }} props
 */
export function PawraCollectionGrid({connection, products, emptyMessage}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, NextLink, PreviousLink, hasNextPage, hasPreviousPage}) => {
        const displayProducts = products.length ? products : nodes;

        return (
          <>
            {hasPreviousPage ? (
              <div className="mb-6 flex justify-center">
                <PreviousLink className="inline-flex h-12 min-w-[12rem] items-center justify-center rounded-md border border-forest-green/30 bg-cloud px-6 font-sans text-body-m font-semibold text-forest-green no-underline hover:bg-warm-oat">
                  {isLoading ? 'Loading…' : '← Previous'}
                </PreviousLink>
              </div>
            ) : null}

            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
              {displayProducts.map((product, index) => (
                <PawraProductCard
                  key={product.id}
                  product={product}
                  loading={index < 8 ? 'eager' : undefined}
                />
              ))}
            </div>

            {!displayProducts.length && (
              <p className="py-16 text-center font-sans text-body-m text-ink/60">
                {emptyMessage ?? 'No products match your filters.'}
              </p>
            )}

            {hasNextPage ? (
              <div className="mt-10 flex justify-center">
                <NextLink className="inline-flex h-14 min-w-[14rem] items-center justify-center rounded-md bg-forest-green px-8 font-sans text-body-l font-semibold text-cloud no-underline shadow-md hover:brightness-110">
                  {isLoading ? 'Loading…' : 'Next products →'}
                </NextLink>
              </div>
            ) : displayProducts.length > 0 ? (
              <p className="mt-10 text-center font-sans text-body-s text-ink/50">
                You&apos;ve reached the end of this collection
              </p>
            ) : null}
          </>
        );
      }}
    </Pagination>
  );
}
