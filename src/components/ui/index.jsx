import React from 'react';

export { Button } from './Button';

export const Card = React.forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`bg-ivory rounded-lg border border-sand/20 shadow-base p-6 transition-all duration-300 hover:shadow-luxury-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: 'bg-matte-black text-ivory',
    secondary: 'bg-warm-white border border-matte-black text-matte-black',
    success: 'bg-soft-emerald text-ivory',
    warning: 'bg-muted-gold text-matte-black',
    error: 'bg-error text-ivory',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export const Divider = ({ className = '', ...props }) => {
  return <div className={`bg-sand/20 h-px w-full ${className}`} {...props} />;
};

export const Spinner = ({ size = 'md', className = '', ...props }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div
      className={`inline-flex animate-spin rounded-full border-2 border-sand border-t-matte-black ${sizes[size]} ${className}`}
      {...props}
    />
  );
};

export const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={`bg-sand/20 animate-pulse rounded-lg ${className}`}
      {...props}
    />
  );
};

export const Input = React.forwardRef(({ className = '', error = false, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full px-4 py-3 border rounded-lg transition-colors duration-300 bg-ivory text-matte-black placeholder-stone focus:outline-none focus:ring-2 focus:ring-soft-emerald focus:ring-opacity-50 ${
        error ? 'border-error' : 'border-sand/30'
      } ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export const Textarea = React.forwardRef(({ className = '', error = false, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full px-4 py-3 border rounded-lg transition-colors duration-300 bg-ivory text-matte-black placeholder-stone focus:outline-none focus:ring-2 focus:ring-soft-emerald focus:ring-opacity-50 resize-none ${
        error ? 'border-error' : 'border-sand/30'
      } ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export const Select = React.forwardRef(({ className = '', error = false, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={`w-full px-4 py-3 border rounded-lg transition-colors duration-300 bg-ivory text-matte-black focus:outline-none focus:ring-2 focus:ring-soft-emerald focus:ring-opacity-50 ${
        error ? 'border-error' : 'border-sand/30'
      } ${className}`}
      {...props}
    />
  );
});

Select.displayName = 'Select';

export const Checkbox = React.forwardRef(({ className = '', label, ...props }, ref) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        ref={ref}
        type="checkbox"
        className={`w-5 h-5 rounded border-2 border-sand cursor-pointer transition-colors duration-300 accent-soft-emerald ${className}`}
        {...props}
      />
      {label && <span className="ml-3 text-base text-matte-black">{label}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export const Radio = React.forwardRef(({ className = '', label, ...props }, ref) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        ref={ref}
        type="radio"
        className={`w-5 h-5 rounded-full border-2 border-sand cursor-pointer transition-colors duration-300 accent-soft-emerald ${className}`}
        {...props}
      />
      {label && <span className="ml-3 text-base text-matte-black">{label}</span>}
    </label>
  );
});

Radio.displayName = 'Radio';
