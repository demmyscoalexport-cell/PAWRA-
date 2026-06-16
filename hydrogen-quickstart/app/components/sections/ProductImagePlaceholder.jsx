/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file ProductImagePlaceholder.jsx
 * @description Homepage/marketing section: ProductImagePlaceholder.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

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
