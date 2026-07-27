/**
 * @file ShoppableGallery.jsx
 * @description Minimal shoppable lifestyle grid.
 */

import {Link} from 'react-router';
import {UGC_GALLERY} from '~/data/platform';

export function ShoppableGallery() {
  return (
    <section className="bg-page-bg px-4 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-1440">
        <h2 className="text-center font-sans text-heading-m text-text-primary">#PAWRApets</h2>
        <p className="mx-auto mt-3 max-w-md text-center font-sans text-body-s text-text-secondary">
          Lifestyle moments. Shop the look.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {UGC_GALLERY.map((item) => (
            <Link
              key={item.id}
              to={`/products/${item.productHandle}`}
              className="group relative aspect-square overflow-hidden rounded-md no-underline"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
              />
              <span className="absolute bottom-3 left-3 right-3 translate-y-1 bg-page-bg/95 px-3 py-2 font-sans text-body-xs text-text-primary opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                {item.productTitle}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
