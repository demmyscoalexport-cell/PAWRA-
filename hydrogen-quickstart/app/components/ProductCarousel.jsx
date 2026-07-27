/**
 * Horizontal product rail with Next / Previous controls.
 */

import {useCallback, useEffect, useRef, useState} from 'react';
import {PawraProductCard} from '~/components/PawraProductCard';
import {Icon} from '~/components/ui/Icon';

/**
 * @param {{
 *   products: Array<import('storefrontapi.generated').ProductItemFragment | import('~/lib/homepageProducts').HomepageProduct>;
 *   title?: string;
 *   subtitle?: string;
 *   emptyMessage?: string;
 * }} props
 */
export function ProductCarousel({
  products = [],
  title = 'Bestsellers',
  subtitle = '',
  emptyMessage = 'Products will appear here once published.',
}) {
  const scrollerRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, {passive: true});
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [products, updateArrows]);

  function scrollByPage(direction) {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.85, 280);
    el.scrollBy({left: direction * amount, behavior: 'smooth'});
  }

  return (
    <section className="bg-page-bg px-4 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-1440">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-heading-m text-action-primary md:text-heading-l">{title}</h2>
            {subtitle ? (
              <p className="mt-2 max-w-xl font-sans text-body-m text-text-secondary">{subtitle}</p>
            ) : null}
          </div>
          {products.length > 0 ? (
            <div className="flex gap-2">
              <button
                type="button"
                className="reset flex h-11 w-11 items-center justify-center rounded-sm border border-border-subtle text-text-primary disabled:opacity-30"
                onClick={() => scrollByPage(-1)}
                disabled={!canPrev}
                aria-label="Previous products"
              >
                <Icon name="chevron-left" size="md" />
              </button>
              <button
                type="button"
                className="reset flex h-11 w-11 items-center justify-center rounded-sm border border-border-subtle text-text-primary disabled:opacity-30"
                onClick={() => scrollByPage(1)}
                disabled={!canNext}
                aria-label="Next products"
              >
                <Icon name="chevron-right" size="md" />
              </button>
            </div>
          ) : null}
        </div>

        {products.length > 0 ? (
          <div
            ref={scrollerRef}
            className="mt-10 flex gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-8"
          >
            {products.map((product, index) => (
              <div key={product.id} className="w-[240px] shrink-0 sm:w-[260px] lg:w-[280px]">
                <PawraProductCard product={product} loading={index < 4 ? 'eager' : 'lazy'} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 font-sans text-body-m text-text-secondary">{emptyMessage}</p>
        )}
      </div>
    </section>
  );
}
