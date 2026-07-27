import {SOCIAL_LINKS} from '~/lib/branding';
import {SocialIcon} from '~/components/ui/SocialIcon';
import type {SocialPlatform} from '~/components/ui/SocialIcon';

type SocialLinksProps = {
  /** `footer` — muted icons on light footer; `light` — dark icons on light bg */
  variant?: 'footer' | 'light';
  className?: string;
};

/**
 * Row of linked social platform logos — monochrome, minimal.
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
            className={`group inline-flex h-10 w-10 items-center justify-center rounded-sm border transition-colors duration-base ${
              isFooter
                ? 'border-border-subtle bg-transparent text-text-secondary hover:border-text-primary hover:text-text-primary'
                : 'border-border-subtle bg-surface text-text-primary hover:border-text-primary'
            }`}
          >
            <SocialIcon platform={platform} className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
