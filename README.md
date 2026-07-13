# PAWRA - Premium Pet Lifestyle Ecommerce Platform

A unified headless Shopify storefront for dogs and cats — built with **Shopify Hydrogen**, one brand, one catalog, one app.

## Quick Start

The **entire PAWRA storefront** lives in `hydrogen-quickstart/`. From the repo root:

```bash
# Install dependencies (root + Hydrogen workspace)
npm install

# Start the PAWRA Hydrogen storefront
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:3000/`).

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

Shopify env vars go in `hydrogen-quickstart/.env` (create from Shopify Hydrogen link / mock.shop setup).

## Architecture

### Project Structure

```
hydrogen-quickstart/          # ← The PAWRA app (run npm run dev from repo root)
├── app/
│   ├── components/           # UI, sections, cart, header, footer
│   ├── routes/               # Homepage, collections, PDP, cart, account, blog
│   ├── lib/                  # Static pages, collections, blog data
│   └── styles/               # Tailwind + app CSS
├── package.json              # Workspace: pawra-store
└── vite.config.js

src/                          # Legacy Vite prototype (not used by npm run dev)
```

## Key Features

### E-commerce
- ✅ Product catalog with 200+ items
- ✅ Collections (Dogs, Cats, Categories)
- ✅ Shopping cart with state persistence
- ✅ Product filtering and sorting
- ✅ Search functionality
- ✅ Product detail pages
- ✅ Wishlist support

### Design System
- ✅ Luxury color palette
- ✅ Enterprise typography
- ✅ Component library
- ✅ Framer Motion animations
- ✅ Responsive design
- ✅ Dark mode ready

### State Management
- ✅ Zustand stores for UI, cart, auth
- ✅ React Query for server state
- ✅ LocalStorage persistence
- ✅ SessionStorage support

### Developer Experience
- ✅ TypeScript ready
- ✅ Hot module replacement
- ✅ Path aliases
- ✅ ESLint configuration
- ✅ Prettier formatting

## Shopify Integration

### Environment Variables

```
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_token_here
VITE_API_BASE_URL=http://localhost:5173
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_COMMERCE_CURRENCY=USD
```

### API Features

- GraphQL queries for products, collections, customers
- Cart management mutations
- Search functionality
- Customer authentication
- Order retrieval

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Animations**: Framer Motion
- **UI Library**: Headless UI
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **3D Graphics**: Three.js (ready for AR)
- **Routing**: React Router v6

## Components

### Layout
- Header with navigation, search, cart
- Footer with links, newsletter signup
- Mobile-responsive menu

### Product
- ProductCard with image, price, rating
- ProductGrid with lazy loading
- Product detail page with gallery
- Related products carousel

### Cart
- Cart drawer with quantity management
- Price calculation with discounts
- Checkout button
- Cart persistence

### Search
- Real-time search drawer
- Debounced input
- Product suggestions
- Keyboard navigation

## Performance Optimizations

- Code splitting by route
- Image lazy loading
- Debounced search
- Memoized components
- Optimized bundle size
- CSS purging with Tailwind

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Production Deployment

### Build

```bash
npm run build
```

### Deploy to Shopify Oxygen

See **[DEPLOYMENT.md](DEPLOYMENT.md)** — PAWRA deploys via Hydrogen to Oxygen, not Vercel/Netlify.

```bash
cd hydrogen-quickstart
npx shopify hydrogen deploy --env-branch main
```

## Future Features

- AI-powered recommendations
- CMS integration (Sanity/Contentful)
- Mobile app (React Native)
- AR product viewer
- Social commerce (TikTok, Instagram)
- Subscription management
- Multi-currency support
- Internationalization
- Analytics dashboard

## Contributing

This is an enterprise project. Please follow:
- Commit message conventions
- Code style guidelines
- Component documentation
- Testing requirements

## License

Private - PAWRA Brand

## Support

For technical support, contact: support@pawrapetshop.com

---

Built with ❤️ for pet parents worldwide.
