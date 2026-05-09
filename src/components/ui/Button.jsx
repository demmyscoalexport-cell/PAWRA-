import React from 'react';

export const Button = React.forwardRef(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-matte-black text-ivory hover:bg-charcoal focus:ring-matte-black',
      secondary: 'bg-ivory border-2 border-matte-black text-matte-black hover:bg-warm-white focus:ring-matte-black',
      accent: 'bg-soft-emerald text-ivory hover:bg-opacity-90 focus:ring-soft-emerald',
      ghost: 'text-matte-black hover:bg-warm-white focus:ring-matte-black',
      danger: 'bg-error text-ivory hover:bg-opacity-90 focus:ring-error',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl',
    };

    const finalClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <button
        ref={ref}
        className={finalClassName}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
