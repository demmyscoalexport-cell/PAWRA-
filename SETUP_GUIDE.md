# PAWRA Setup Guide

## Prerequisites

- Node.js 16+ (recommended 18+)
- npm or yarn package manager
- A Shopify store with Storefront API access

## Installation

### 1. Clone/Download the Project

```bash
cd c:/pwara\ e\ commerce\ headless\ store
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- React 18
- Vite
- Tailwind CSS
- TanStack React Query
- Zustand
- Framer Motion
- And 15+ more libraries

**Estimated installation time:** 2-3 minutes

### 3. Configure Environment Variables

#### Option A: Quick Start with Mock Data

The `.env` file is already configured with mock credentials. You can start immediately:

```bash
npm run dev
```

The app will run on `http://localhost:5173`

#### Option B: Connect Your Shopify Store

1. Get your Shopify credentials:
   - Go to your Shopify Admin
   - Navigate to Apps > App and sales channel settings
   - Create a new sales channel / app
   - Generate Storefront API credentials
   - Copy your store domain and access token

2. Update `.env` file:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token_here
VITE_API_BASE_URL=http://localhost:5173
VITE_GOOGLE_ANALYTICS_ID=G-YOUR_ID_HERE
VITE_COMMERCE_CURRENCY=USD
```

3. Restart dev server

```bash
npm run dev
```

## Development Commands

### Start Development Server
```bash
npm run dev
```
- Opens browser to `http://localhost:5173`
- Hot Module Replacement (HMR) enabled
- Auto-reload on file changes

### Build for Production
```bash
npm run build
```
- Creates optimized production build
- Outputs to `dist/` directory
- Code splitting, minification, tree-shaking applied

### Preview Production Build
```bash
npm run preview
```
- Serves the production build locally
- Test before deploying

### Linting
```bash
npm run lint
```
- Checks code quality
- Reports ESLint errors

### Code Formatting
```bash
npm run format
```
- Formats code with Prettier
- Runs on entire src/ directory

## Project Structure Guide

### Key Directories

**`src/api/shopify/`**
- GraphQL queries and mutations
- Shopify API service layer
- Add more queries here for new features

**`src/components/`**
- React components organized by feature
- Add new UI components to `components/ui/`
- Page-specific components in their directories

**`src/pages/`**
- Top-level page components
- Connected to React Router
- Add new pages and routes here

**`src/stores/`**
- Zustand store definitions
- CartStore, AuthStore, UIStore
- Add new stores for new features

**`src/hooks/`**
- Custom React hooks
- useShopify.js contains 20+ hooks
- Add query/mutation hooks here

**`src/utils/`**
- Helper functions
- Formatting, validation, storage utilities
- Keep organized by purpose

**`src/styles/`**
- Global CSS and Tailwind directives
- Component base styles
- Animations and utilities

**`src/data/`**
- Mock data for development
- Product database
- Replace with real data when ready

## Customization Guide

### Brand Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  // Luxury neutrals
  ivory: '#FFFBF5',
  'matte-black': '#1A1814',
  'soft-emerald': '#4A6B5C',
  'muted-gold': '#C4A962',
  // Add your brand colors here
}
```

### Typography

Edit `tailwind.config.js` fontFamily section:

```javascript
fontFamily: {
  sans: ['Your Font', 'system-ui'],
  serif: ['Your Serif', 'serif'],
}
```

### Adding New Collections

1. Update mock products in `src/data/mockProducts.js`
2. Add collection handle to `src/constants/index.js`
3. Update `src/pages/CollectionsPage.jsx` filter logic

### Adding New Pages

1. Create page component in `src/pages/`
2. Import in `src/App.jsx`
3. Add route in Routes component

```jsx
<Route path="/new-page" element={<NewPage />} />
```

### Connecting Real Products

In any component:

```jsx
import { useProducts } from '@/hooks/useShopify';

export function MyComponent() {
  const { data: products, isLoading } = useProducts({ first: 20 });
  
  // Use products...
}
```

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Deploy to Netlify

```bash
# Build locally
npm run build

# Deploy to Netlify (drag & drop dist folder)
# Or use Netlify CLI:
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to Custom Server

```bash
# Build
npm run build

# Upload dist/ folder to your server
# Configure server for SPA routing
```

## Troubleshooting

### Port 5173 Already in Use

```bash
# Use different port
npm run dev -- --port 3000
```

### Dependencies Not Installing

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Shopify API Errors

- Verify credentials in `.env`
- Check store domain is correct format
- Ensure Storefront API is enabled
- Check API scope permissions

### Styling Issues

```bash
# Rebuild Tailwind
rm -rf dist
npm run build
```

## Testing the Store

### Without Shopify Connection

Use mock products included in `src/data/mockProducts.js`

### With Shopify Connection

1. Update `.env` with your credentials
2. Restart dev server
3. Mock products will be replaced with real products

### Test Features

- ✅ Browse collections: `/collections` or `/collections/dogs`
- ✅ View product: Click any product card
- ✅ Add to cart: Use "Add to Cart" button
- ✅ Search: Click search icon in header
- ✅ Filter/Sort: Use collection sidebar
- ✅ Mobile view: Resize browser

## Performance Optimization

### Lighthouse Tips

1. Images: Use next-gen formats (WebP)
2. Caching: Configure cache headers
3. Minification: Already done by Vite
4. Code splitting: Already configured
5. Remove unused CSS: Tailwind handles this

### Monitor Performance

```bash
npm run build
npm run preview
# Check bundle size:
npm run build -- --analyze
```

## Security Checklist

- ✅ Keep `.env` out of version control (add to `.gitignore`)
- ✅ Don't commit API tokens
- ✅ Use HTTPS in production
- ✅ Validate user input
- ✅ Keep dependencies updated: `npm audit`
- ✅ Use environment variables for secrets

## Next Steps

1. **Start dev server**: `npm run dev`
2. **Explore the app**: Visit `http://localhost:5173`
3. **Customize branding**: Edit colors in Tailwind config
4. **Add real products**: Connect Shopify or update mock data
5. **Deploy**: Push to production hosting

## Support & Resources

- **Vite Documentation**: https://vitejs.dev
- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Shopify Storefront API**: https://shopify.dev/api/storefront
- **Zustand**: https://github.com/pmndrs/zustand

---

**Ready to launch your luxury pet store!** 🐾

Questions? Check the code comments or README.md for more details.
