import {BRAND} from '~/lib/branding';

/**
 * Newsletter signup — Klaviyo embed when configured, otherwise mailto fallback.
 * @param {{ companyId?: string | null; formId?: string | null }} props
 */
export function FooterNewsletter({companyId, formId}) {
  const embedId = formId || companyId;

  return (
    <div className="mt-8 border-b border-border-subtle pb-5">
      <p className="font-sans text-body-s font-medium text-text-primary">Newsletter</p>
      <p className="mt-1 font-sans text-body-xs text-text-secondary">
        New arrivals and quiet updates.
      </p>
      {companyId && embedId ? (
        <div className={`klaviyo-form-${embedId} mt-4`} />
      ) : (
        <a
          href={`mailto:${BRAND.supportEmail}?subject=${encodeURIComponent('PAWRA newsletter')}`}
          className="mt-4 inline-flex h-11 items-center justify-center border border-border-subtle px-4 font-sans text-body-s font-medium text-text-primary no-underline hover:border-text-primary"
        >
          Email to join
        </a>
      )}
    </div>
  );
}
