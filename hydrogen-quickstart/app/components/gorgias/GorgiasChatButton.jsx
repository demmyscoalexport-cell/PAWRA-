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
      'h-12 px-5 bg-forest-green text-cloud hover:bg-forest-green/90 focus-visible:ring-2 focus-visible:ring-electric-jade',
    secondary:
      'h-12 px-5 border border-forest-green/25 bg-warm-oat text-forest-green hover:border-forest-green hover:bg-forest-green hover:text-cloud focus-visible:ring-2 focus-visible:ring-electric-jade',
    link: 'h-auto px-0 py-1 text-forest-green underline-offset-4 hover:underline',
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
