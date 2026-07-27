/**
 * @file ShoppableGallery.jsx
 * @description Instagram-style shoppable UGC grid.
 */

import {Link} from 'react-router';
import {UGC_GALLERY} from '~/data/platform';

export function ShoppableGallery() {
  return (
    <section className="bg-surface px-5 py-16 md:px-10">
      <div className="mx-auto max-w-1440">
        <p className="text-center font-sans text-body-xs font-medium uppercase tracking-[0.2em] text-action-primary">
          #PAWRApets
        </p>
        <h2 className="mt-3 text-center font-serif text-display-s text-text-primary">Shop the look</h2>
        <p className="mx-auto mt-3 max-w-xl text-center font-sans text-body-m text-text-secondary">
          Real pets, real products — hover a photo to shop tagged items.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {UGC_GALLERY.map((item) => (
            <Link
              key={item.id}
              to={`/products/${item.productHandle}`}
              className="group relative aspect-square overflow-hidden rounded-lg no-underline"
            >
              <img src={item.image} alt={item.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-base group-hover:scale-[1.03]" />
              <span className="absolute bottom-3 left-3 right-3 translate-y-2 rounded-md bg-surface/95 px-3 py-2 font-sans text-body-xs font-medium text-text-primary opacity-0 shadow-sm transition-all group-hover:translate-y-0 group-hover:opacity-100">
                Shop {item.productTitle}
              </span>
              <span className="absolute right-3 top-3 h-3 w-3 rounded-full bg-action-primary ring-4 ring-action-primary/30" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
