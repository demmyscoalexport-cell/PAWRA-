import {BRAND} from '~/lib/branding';

/**
 * Newsletter signup — Klaviyo embed when configured, otherwise mailto fallback.
 * @param {{ companyId?: string | null; formId?: string | null }} props
 */
export function FooterNewsletter({companyId, formId}) {
  const embedId = formId || companyId;

  return (
    <div className="mt-8 rounded-xl border border-cloud/10 bg-cloud/5 p-5">
      <p className="font-sans text-body-s font-semibold text-cloud">Join the PAWRA pack</p>
      <p className="mt-1 font-sans text-body-xs text-cloud/60">
        Tips, deals, and new arrivals for pet parents.
      </p>
      {companyId && embedId ? (
        <div className={`klaviyo-form-${embedId} mt-4`} />
      ) : (
        <a
          href={`mailto:${BRAND.supportEmail}?subject=${encodeURIComponent('Join the PAWRA pack')}`}
          className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-electric-jade px-4 font-sans text-body-s font-semibold text-midnight no-underline hover:brightness-95"
        >
          Email us to join
        </a>
      )}
    </div>
  );
}
