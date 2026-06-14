export function ProductImagePlaceholder({label = 'Product', className = '', aspect = 'aspect-square'}) {
  return (
    <div
      className={`flex items-center justify-center bg-warm-oat ${aspect} ${className}`}
      aria-hidden="true"
    >
      <span className="font-serif text-body-s text-forest-green/25">{label}</span>
    </div>
  );
}
