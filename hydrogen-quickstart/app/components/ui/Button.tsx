/**
 * @file Button.tsx
 * @description PAWRA buttons — primary forest, chestnut outline, golden honey CTA.
 */

import {forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type Ref} from 'react';
import {Link} from 'react-router';
import {
  GOLDEN_CTA_CLASSES,
  PRIMARY_CTA_CLASSES,
  SECONDARY_CTA_CLASSES,
} from '~/lib/primaryButton';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'accent'
  | 'golden'
  | 'premium'
  | 'destructive';

export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: PRIMARY_CTA_CLASSES,
  secondary: SECONDARY_CTA_CLASSES,
  ghost:
    'bg-transparent text-text-primary border border-transparent hover:bg-action-secondary hover:scale-[1.02] active:scale-100 focus-visible:ring-focus-ring transition-all duration-base',
  accent: GOLDEN_CTA_CLASSES,
  golden: GOLDEN_CTA_CLASSES,
  premium: GOLDEN_CTA_CLASSES,
  destructive:
    'bg-transparent text-action-destructive border border-action-destructive/40 hover:border-action-destructive hover:scale-[1.02] active:scale-100 focus-visible:ring-action-destructive transition-all duration-base',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-body-s',
  md: 'h-11 px-6 text-body-m',
  lg: 'h-12 px-8 text-body-m',
};

type ButtonProps = (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>) & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
};

function buttonClasses(variant: ButtonVariant, size: ButtonSize, className: string, disabled?: boolean) {
  return [
    'inline-flex items-center justify-center rounded-md font-sans font-semibold tracking-normal no-underline',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg',
    disabled ? 'cursor-not-allowed opacity-40 pointer-events-none' : '',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({variant = 'primary', size = 'md', className = '', disabled, children, href, ...props}, ref) => {
    const classes = buttonClasses(variant, size, className, disabled);

    if (href) {
      return (
        <Link
          ref={ref as Ref<HTMLAnchorElement>}
          to={href}
          className={classes}
          aria-disabled={disabled || undefined}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        disabled={disabled}
        className={classes}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
