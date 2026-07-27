import {SOCIAL_LINKS} from '~/lib/branding';
import {SocialIcon, SOCIAL_BRAND_COLORS} from '~/components/ui/SocialIcon';
import type {SocialPlatform} from '~/components/ui/SocialIcon';
import type {CSSProperties} from 'react';

type SocialLinksProps = {
  /** `footer` — light icons on dark footer; `light` — dark icons on light bg */
  variant?: 'footer' | 'light';
  className?: string;
};

/**
 * Row of linked social platform logos — real brand marks, monochrome with color on hover.
 */
export function SocialLinks({variant = 'footer', className = ''}: SocialLinksProps) {
  const isFooter = variant === 'footer';

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {SOCIAL_LINKS.map((link) => {
        const platform = link.platform as SocialPlatform;
        const brandColor = SOCIAL_BRAND_COLORS[platform];
        const brandStyle = {'--social-brand': brandColor} as CSSProperties;

        return (
          <a
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`PAWRA on ${link.label}`}
            title={link.label}
            style={brandStyle}
            className={`group inline-flex h-10 w-10 items-center justify-center rounded-sm transition-colors duration-base ${
              isFooter
                ? 'border border-footer-fg/25 bg-transparent text-footer-fg hover:border-footer-fg/50 hover:bg-footer-fg/10'
                : 'border border-border-subtle bg-surface text-text-primary hover:border-text-primary'
            }`}
          >
            <SocialIcon
              platform={platform}
              className={`h-5 w-5 transition-colors duration-base ${
                isFooter
                  ? 'text-footer-fg group-hover:text-[var(--social-brand)]'
                  : 'text-text-primary group-hover:text-[var(--social-brand)]'
              }`}
            />
          </a>
        );
      })}
    </div>
  );
}
