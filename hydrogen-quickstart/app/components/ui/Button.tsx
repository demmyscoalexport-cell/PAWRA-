/**
 * @file Button.tsx
 * @description Minimal PAWRA buttons — black primary, outline secondary.
 */

import {forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type Ref} from 'react';
import {Link} from 'react-router';
import {PRIMARY_CTA_CLASSES} from '~/lib/primaryButton';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'accent'
  | 'premium'
  | 'destructive';

export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: PRIMARY_CTA_CLASSES,
  secondary:
    'bg-transparent text-text-primary border border-border-subtle hover:border-text-primary active:bg-action-secondary focus-visible:ring-focus-ring',
  ghost:
    'bg-transparent text-text-primary border border-transparent hover:bg-action-secondary active:bg-action-secondary focus-visible:ring-focus-ring',
  accent:
    'bg-transparent text-accent border border-accent/40 hover:border-accent active:bg-accent/10 focus-visible:ring-focus-ring',
  premium:
    'bg-transparent text-accent border border-accent/40 hover:border-accent active:bg-accent/10 focus-visible:ring-focus-ring',
  destructive:
    'bg-transparent text-action-destructive border border-action-destructive/40 hover:border-action-destructive focus-visible:ring-action-destructive',
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
    'inline-flex items-center justify-center rounded-sm font-sans font-medium tracking-normal transition-colors duration-base no-underline',
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
