/**
 * Breadcrumb navigation for collection and product pages.
 */

import {Link} from 'react-router';

/**
 * @param {{crumbs: Array<{label: string; path?: string}>}} props
 */
export function Breadcrumbs({crumbs}) {
  if (!crumbs?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="font-sans text-body-s text-ink/60">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden="true" className="text-ink/30">/</span>}
              {isLast || !crumb.path ? (
                <span className={isLast ? 'font-medium text-forest-green' : ''}>{crumb.label}</span>
              ) : (
                <Link to={crumb.path} className="text-ink/60 no-underline hover:text-forest-green">
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
