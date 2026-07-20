import {Link} from 'react-router';

/**
 * Chewy-style breadcrumb trail for PLP / PDP orientation.
 * @param {{
 *   items: Array<{ label: string; to?: string }>;
 *   className?: string;
 * }} props
 */
export function Breadcrumbs({items, className = ''}) {
  if (!items?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 font-sans text-body-s text-ink/60">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.to ? `${item.to}-${item.label}` : item.label} className="inline-flex items-center gap-1.5">
              {index > 0 ? <span aria-hidden="true" className="text-ink/30">/</span> : null}
              {item.to && !isLast ? (
                <Link to={item.to} className="text-forest-green no-underline hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'font-medium text-ink' : undefined} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
