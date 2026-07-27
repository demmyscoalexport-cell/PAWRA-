/**
 * @file CategoryCard.jsx
 * @description Navigation card for taxonomy sub-categories.
 */

import {Link} from 'react-router';
import {Icon} from '~/components/ui/Icon';

/**
 * @param {{
 *   title: string;
 *   href: string;
 *   description?: string;
 *   imageUrl?: string | null;
 *   icon?: import('~/components/ui/Icon').IconName;
 * }} props
 */
export function CategoryCard({
  title,
  href,
  description,
  imageUrl = null,
  icon = 'paw',
}) {
  return (
    <Link
      to={href}
      prefetch="intent"
      className="group flex flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface transition-shadow duration-base hover:shadow-sm no-underline"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-action-secondary">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-base group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Icon name={icon} size="lg" color="text-action-primary" className="!h-12 !w-12 opacity-70" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="font-sans text-heading-s text-text-primary">{title}</h3>
          {description ? (
            <p className="mt-1 line-clamp-2 font-sans text-body-s text-text-secondary">{description}</p>
          ) : null}
        </div>
        <Icon
          name="arrow-right"
          size="md"
          color="text-text-secondary"
          className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-action-primary"
        />
      </div>
    </Link>
  );
}
