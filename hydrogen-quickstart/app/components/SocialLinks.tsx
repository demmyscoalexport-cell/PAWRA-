import {SOCIAL_LINKS} from '~/lib/branding';
import {SocialIcon, SOCIAL_BRAND_COLORS} from '~/components/ui/SocialIcon';
import type {SocialPlatform} from '~/components/ui/SocialIcon';

type SocialLinksProps = {
  /** `footer` — light icons on dark bg; `light` — dark icons on light bg */
  variant?: 'footer' | 'light';
  className?: string;
};

/**
 * Row of linked social platform logos with brand-color hover states.
 */
export function SocialLinks({variant = 'footer', className = ''}: SocialLinksProps) {
  const isFooter = variant === 'footer';

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {SOCIAL_LINKS.map((link) => {
        const platform = link.platform as SocialPlatform;
        return (
        <a
          key={link.platform}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`PAWRA on ${link.label}`}
          title={link.label}
          className={`group inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-base ${
            isFooter
              ? 'border-cloud/20 bg-cloud/5 text-cloud hover:border-transparent hover:text-white'
              : 'border-forest-green/15 bg-cloud text-forest-green hover:border-transparent hover:text-white'
          }`}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = SOCIAL_BRAND_COLORS[platform];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isFooter ? 'rgba(255,255,255,0.05)' : '';
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = SOCIAL_BRAND_COLORS[platform];
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = isFooter ? 'rgba(255,255,255,0.05)' : '';
          }}
        >
          <SocialIcon platform={platform} className="h-5 w-5" />
        </a>
        );
      })}
    </div>
  );
}
