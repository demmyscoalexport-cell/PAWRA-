/**
 * @file NewArrivals.jsx
 * @description Homepage New Arrivals — staggered entrance so each product arrives uniquely.
 */

import {Link} from 'react-router';
import {motion, useInView, useReducedMotion} from 'framer-motion';
import {useRef} from 'react';
import {PawraProductCard} from '~/components/PawraProductCard';

const EASE = [0.22, 1, 0.36, 1];

/**
 * @param {{
 *   products?: import('~/lib/homepageProducts').HomepageProduct[];
 * }} props
 */
export function NewArrivals({products = []}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, {once: true, margin: '-80px'});

  if (!products.length) return null;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-action-primary px-4 py-16 text-action-primary-label md:px-10 md:py-24"
      aria-labelledby="new-arrivals-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 60%, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px, 64px 64px',
        }}
      />

      <div className="relative mx-auto max-w-1440">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
          <div>
            <p className="font-sans text-body-xs font-medium uppercase tracking-[0.18em] text-action-primary-label/70">
              Just landed
            </p>
            <h2
              id="new-arrivals-heading"
              className="mt-2 font-serif text-heading-m text-action-primary-label md:text-heading-l"
            >
              New Arrivals
            </h2>
            <p className="mt-2 max-w-md font-sans text-body-m text-action-primary-label/75">
              Fresh drops — each one steps in on its own beat.
            </p>
          </div>
          <Link
            to="/collections/all"
            className="font-sans text-body-s font-medium text-action-primary-label no-underline underline-offset-4 hover:underline"
          >
            View all new
          </Link>
        </div>

        <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 md:grid-cols-4 md:gap-6">
          {products.map((product, index) => {
            const delay = prefersReducedMotion ? 0 : 0.08 + index * 0.12;
            const fromY = prefersReducedMotion ? 0 : 36 + (index % 3) * 12;
            const fromRotate = prefersReducedMotion ? 0 : index % 2 === 0 ? -1.5 : 1.5;
            const fromScale = prefersReducedMotion ? 1 : 0.92;

            return (
              <motion.li
                key={product.id}
                initial={{opacity: 0, y: fromY, scale: fromScale, rotate: fromRotate}}
                animate={
                  isInView
                    ? {opacity: 1, y: 0, scale: 1, rotate: 0}
                    : {opacity: 0, y: fromY, scale: fromScale, rotate: fromRotate}
                }
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.55,
                  ease: EASE,
                  delay,
                }}
                className={index === 0 ? 'col-span-2 md:col-span-1' : undefined}
              >
                <div className="h-full [&_.bg-surface]:bg-surface [&_.bg-page-bg]:bg-page-bg">
                  <PawraProductCard
                    product={product}
                    showNew
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
