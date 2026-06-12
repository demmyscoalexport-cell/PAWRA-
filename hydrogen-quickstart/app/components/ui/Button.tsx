import {forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type Ref} from 'react';
import {Link} from 'react-router';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'accent'
  | 'premium'
  | 'destructive';

export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-forest-green text-cloud border border-forest-green hover:bg-forest-night active:bg-midnight focus-visible:ring-electric-jade',
  secondary:
    'bg-transparent text-forest-green border border-forest-green hover:bg-forest-green/5 active:bg-forest-green/10 focus-visible:ring-electric-jade',
  ghost:
    'bg-transparent text-forest-green border border-transparent hover:bg-forest-green/5 active:bg-forest-green/10 focus-visible:ring-electric-jade',
  accent:
    'bg-electric-jade text-midnight border border-electric-jade hover:brightness-95 active:brightness-90 focus-visible:ring-forest-green shadow-jade-glow',
  premium:
    'bg-champagne text-midnight border border-champagne hover:brightness-95 active:brightness-90 focus-visible:ring-forest-green',
  destructive:
    'bg-coral text-cloud border border-coral hover:brightness-95 active:brightness-90 focus-visible:ring-coral',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-body-s',
  md: 'h-11 px-6 text-body-m',
  lg: 'h-[52px] px-8 text-body-l',
};

type ButtonProps = (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>) & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
};

function buttonClasses(variant: ButtonVariant, size: ButtonSize, className: string, disabled?: boolean) {
  return [
    'inline-flex items-center justify-center rounded-md font-sans font-medium transition-all duration-base no-underline',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-oat',
    disabled ? 'cursor-not-allowed opacity-45 pointer-events-none' : '',
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
