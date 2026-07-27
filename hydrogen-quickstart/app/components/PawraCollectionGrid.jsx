import {Pagination} from '@shopify/hydrogen';
import {PawraProductCard} from '~/components/PawraProductCard';

/**
 * Product grid with clear Previous / Next pagination buttons.
 * When client-side filters are active, cursor pagination is hidden so
 * Next/Previous never disagree with the filtered product list.
 * @param {{
 *   connection: { nodes?: unknown[]; pageInfo?: unknown };
 *   products: Array<import('storefrontapi.generated').ProductItemFragment>;
 *   emptyMessage?: string;
 *   filtersActive?: boolean;
 * }} props
 */
export function PawraCollectionGrid({
  connection,
  products,
  emptyMessage,
  filtersActive = false,
}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, NextLink, PreviousLink, hasNextPage, hasPreviousPage}) => {
        const displayProducts = products.length || filtersActive ? products : nodes;
        const showPagination = !filtersActive;

        return (
          <>
            {showPagination && hasPreviousPage ? (
              <div className="mb-6 flex justify-center">
                <PreviousLink className="inline-flex h-12 min-w-[12rem] items-center justify-center rounded-md border border-border-strong bg-surface px-6 font-sans text-body-m font-semibold text-action-primary no-underline hover:bg-page-bg">
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
              <p className="py-16 text-center font-sans text-body-m text-text-secondary">
                {emptyMessage ?? 'No products match your filters.'}
              </p>
            )}

            {showPagination && hasNextPage ? (
              <div className="mt-10 flex justify-center">
                <NextLink className="inline-flex h-14 min-w-[14rem] items-center justify-center rounded-md bg-action-primary px-8 font-sans text-body-l font-semibold text-action-primary-label no-underline shadow-sm hover:brightness-110">
                  {isLoading ? 'Loading…' : 'Next products →'}
                </NextLink>
              </div>
            ) : displayProducts.length > 0 ? (
              <p className="mt-10 text-center font-sans text-body-s text-text-secondary">
                {filtersActive
                  ? 'Showing matches from this page — clear filters to browse the full collection'
                  : "You've reached the end of this collection"}
              </p>
            ) : null}
          </>
        );
      }}
    </Pagination>
  );
}
