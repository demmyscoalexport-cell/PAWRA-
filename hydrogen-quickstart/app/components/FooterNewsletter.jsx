/**
 * Klaviyo newsletter signup — renders when PUBLIC_KLAVIYO_COMPANY_ID is set.
 * @param {{ companyId?: string | null }} props
 */
export function FooterNewsletter({companyId}) {
  if (!companyId) return null;

  return (
    <div className="mt-8 rounded-xl border border-cloud/10 bg-cloud/5 p-5">
      <p className="font-sans text-body-s font-semibold text-cloud">Join the PAWRA pack</p>
      <p className="mt-1 font-sans text-body-xs text-cloud/60">
        Tips, deals, and new arrivals for pet parents.
      </p>
      <div className={`klaviyo-form-${companyId} mt-4`} />
    </div>
  );
}
