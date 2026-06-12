export function MockShopNotice() {
  return (
    <section
      className="mock-shop-notice"
      aria-labelledby="mock-shop-notice-heading"
    >
      <div className="inner">
        <h2 id="mock-shop-notice-heading" className="font-serif text-forest-green">
          PAWRA — Premium Pet Lifestyle
        </h2>
        <p>
          You&rsquo;re browsing a demo catalog at{' '}
          <strong>shoppawra.com</strong> with sample products while your Shopify
          store is being connected.
        </p>
        <p>
          Link your store by running <code>npx shopify hydrogen link</code> in
          your terminal.
        </p>
      </div>
    </section>
  );
}
