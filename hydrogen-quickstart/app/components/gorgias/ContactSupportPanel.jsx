import {BRAND} from '~/lib/branding';
import {GorgiasChatButton} from '~/components/gorgias/GorgiasChatButton';

/**
 * Contact page support panel — live chat first, email fallback.
 */
export function ContactSupportPanel() {
  return (
    <div className="mt-10 rounded-lg border border-border-subtle bg-page-bg p-6 md:p-8">
      <p className="font-sans text-body-xs font-medium uppercase tracking-[0.18em] text-action-primary">
        Prefer live help?
      </p>
      <h2 className="mt-2 font-serif text-display-s text-action-primary">Chat with PAWRA</h2>
      <p className="mt-3 max-w-xl font-sans text-body-m text-text-secondary">
        Our AI Agent can track orders, answer product questions, explain shipping, and help with
        discounts — usually in seconds. Humans step in when you need them.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <GorgiasChatButton label="Start live chat" variant="primary" />
        <a
          href={`mailto:${BRAND.supportEmail}`}
          className="inline-flex h-12 items-center justify-center rounded-md border border-border-subtle px-5 font-sans text-body-s font-semibold text-action-primary no-underline hover:bg-surface"
        >
          Email {BRAND.supportEmail}
        </a>
      </div>
      <p className="mt-4 font-sans text-body-s text-text-secondary">
        Typical email reply: within one business day.
      </p>
    </div>
  );
}
