import {BRAND} from '~/lib/branding';

/**
 * Newsletter signup — Klaviyo embed when configured, otherwise mailto fallback.
 * @param {{ companyId?: string | null; formId?: string | null }} props
 */
export function FooterNewsletter({companyId, formId}) {
  const embedId = formId || companyId;

  return (
    <div className="mt-8 border-b border-footer-fg/20 pb-4">
      <p className="font-sans text-body-s font-medium text-footer-fg">Newsletter</p>
      <p className="mt-1 font-sans text-body-xs text-footer-fg/70">
        New arrivals and quiet updates.
      </p>
      {companyId && embedId ? (
        <div className={`klaviyo-form-${embedId} mt-4`} />
      ) : (
        <a
          href={`mailto:${BRAND.supportEmail}?subject=${encodeURIComponent('PAWRA newsletter')}`}
          className="mt-4 inline-flex h-11 items-center justify-center border border-footer-fg/30 px-4 font-sans text-body-s font-medium text-footer-fg no-underline hover:border-footer-fg hover:bg-footer-fg/10"
        >
          Email to join
        </a>
      )}
    </div>
  );
}
