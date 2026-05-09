# PAWRA - Premium Pet Lifestyle Ecommerce Platform

A luxury, enterprise-grade headless Shopify storefront built with React, Vite, and modern web technologies.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Shopify credentials

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Project Structure

```
src/
├── api/                    # Shopify API integration
├── components/             # React components
│   ├── ui/                 # Base UI components
│   ├── layout/             # Layout components
│   ├── product/            # Product components
│   ├── cart/               # Cart components
│   ├── collection/         # Collection components
│   └── ...
├── hooks/                  # Custom React hooks
├── stores/                 # Zustand state management
├── pages/                  # Page components
├── utils/                  # Utility functions
├── styles/                 # Global styles
├── constants/              # App constants
├── animations/             # Animation configurations
└── App.jsx                 # Main app component
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

### Deploy to Vercel

```bash
vercel
```

### Deploy to Netlify

```bash
netlify deploy --prod --dir=dist
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

For technical support, contact: support@pawra.com

---

Built with ❤️ for pet parents worldwide.
