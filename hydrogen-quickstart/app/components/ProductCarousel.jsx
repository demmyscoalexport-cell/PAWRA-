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
  title = 'Popular right now',
  subtitle = 'Fresh picks for cats and dogs — start shopping in one tap.',
  emptyMessage = 'Products will appear here once published to your Hydrogen storefront.',
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
    <section className="bg-cloud px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-display-s text-forest-green">{title}</h2>
            {subtitle ? (
              <p className="mt-2 max-w-xl font-sans text-body-m text-ink/70">{subtitle}</p>
            ) : null}
          </div>
          {products.length > 0 ? (
            <div className="flex gap-2">
              <button
                type="button"
                className="reset flex h-12 w-12 items-center justify-center rounded-md border border-forest-green/25 bg-warm-oat text-forest-green disabled:opacity-35"
                onClick={() => scrollByPage(-1)}
                disabled={!canPrev}
                aria-label="Previous products"
              >
                <Icon name="chevron-left" size="md" />
              </button>
              <button
                type="button"
                className="reset flex h-12 min-w-[7.5rem] items-center justify-center gap-1 rounded-md bg-forest-green px-4 font-sans text-body-s font-semibold text-cloud disabled:opacity-35"
                onClick={() => scrollByPage(1)}
                disabled={!canNext}
                aria-label="Next products"
              >
                Next
                <Icon name="chevron-right" size="md" color="text-cloud" />
              </button>
            </div>
          ) : null}
        </div>

        {products.length > 0 ? (
          <div
            ref={scrollerRef}
            className="mt-8 flex gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product, index) => (
              <div key={product.id} className="w-[240px] shrink-0 sm:w-[260px]">
                <PawraProductCard product={product} loading={index < 4 ? 'eager' : 'lazy'} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 font-sans text-body-m text-ink/60">{emptyMessage}</p>
        )}
      </div>
    </section>
  );
}
