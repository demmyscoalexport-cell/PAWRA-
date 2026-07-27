import {openGorgiasChat} from '~/lib/gorgias';
import {Icon} from '~/components/ui/Icon';

/**
 * Opens the Gorgias chat widget. Use on Contact, cart, PDP, and FAQ.
 *
 * @param {{
 *   label?: string;
 *   variant?: 'primary' | 'secondary' | 'link';
 *   className?: string;
 *   fullWidth?: boolean;
 * }} props
 */
export function GorgiasChatButton({
  label = 'Chat with PAWRA',
  variant = 'secondary',
  className = '',
  fullWidth = false,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-md font-sans font-semibold transition-colors reset';
  const width = fullWidth ? 'w-full' : '';

  const variants = {
    primary:
      'h-12 px-5 bg-action-primary text-action-primary-label hover:bg-action-primary/90 focus-visible:ring-2 focus-visible:ring-focus-ring',
    secondary:
      'h-12 px-5 border border-action-primary/25 bg-page-bg text-action-primary hover:border-action-primary hover:bg-action-primary hover:text-action-primary-label focus-visible:ring-2 focus-visible:ring-focus-ring',
    link: 'h-auto px-0 py-1 text-action-primary underline-offset-4 hover:underline',
  };

  return (
    <button
      type="button"
      className={`${base} ${variants[variant] || variants.secondary} ${width} ${className}`.trim()}
      onClick={() => {
        void openGorgiasChat();
      }}
    >
      {variant !== 'link' ? (
        <Icon name="chat" size="sm" color="text-inherit" />
      ) : null}
      <span>{label}</span>
    </button>
  );
}
