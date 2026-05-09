# Quick Reference - PAWRA Store Commands

## 🚀 Start Here

```bash
# Navigate to project
cd "c:/pwara e commerce headless store"

# Install all dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 📋 All Available Commands

### Development

```bash
# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint

# Format code with Prettier
npm run format
```

### Configuration

**Environment Variables** (update in `.env`):
```
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_token
VITE_API_BASE_URL=http://localhost:5173
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_COMMERCE_CURRENCY=USD
```

---

## 🎨 Key Files to Customize

| File | Purpose |
|------|---------|
| `tailwind.config.js` | Colors, fonts, spacing |
| `src/data/mockProducts.js` | Product data |
| `src/components/layout/Header.jsx` | Header navigation |
| `.env` | API credentials |
| `src/pages/HomePage.jsx` | Homepage content |

---

## 📁 Project Structure Map

```
src/
├── pages/              ← Main page components
├── components/         ← React components (organized by feature)
├── api/               ← Shopify API integration
├── stores/            ← Zustand state management
├── hooks/             ← Custom React hooks
├── utils/             ← Helper functions
├── data/              ← Mock products & data
├── constants/         ← App-wide constants
├── styles/            ← Global CSS
├── animations/        ← Animation configs
└── App.jsx            ← Main app component
```

---

## 🔗 Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | HomePage | Landing page with hero |
| `/collections` | CollectionsPage | All products |
| `/collections/dogs` | CollectionsPage | Dogs products only |
| `/collections/cats` | CollectionsPage | Cats products only |
| `/product/:handle` | ProductPage | Individual product |

---

## 🧩 Component Library

### Base Components (`src/components/ui/`)
- `Button` - Multi-variant button
- `Card` - Container card
- `Input` - Text input
- `Badge` - Status badge
- `Spinner` - Loading spinner
- And more...

### Layout Components
- `Header` - Navigation bar
- `Footer` - Page footer

### Page Components
- `HomePage` - Homepage
- `CollectionsPage` - Collection view
- `ProductPage` - Product detail

---

## 🪝 Custom Hooks

### Data Fetching
```jsx
import { useProducts, useProduct, useCollections, useSearch } from '@/hooks/useShopify';

// Get all products
const { data: products, isLoading } = useProducts({ first: 20 });

// Get single product
const { data: product } = useProduct(handle);

// Search products
const { data: results } = useSearch('dog toys');
```

### State Management
```jsx
import { useCartStore, useAuthStore, useUIStore } from '@/stores';

const cart = useCartStore((state) => state.cart);
const user = useAuthStore((state) => state.user);
const isCartOpen = useUIStore((state) => state.isCartOpen);
```

### Storage Hooks
```jsx
const [value, setValue] = useLocalStorage('key', defaultValue);
const [value, setValue] = useSessionStorage('key', defaultValue);
```

---

## 🛒 Shopping Cart Example

```jsx
import { useCartStore } from '@/stores/cartStore';

export function AddToCart({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  
  const handleAdd = () => {
    addItem({
      id: product.id,
      quantity: 1,
      merchandise: {
        id: product.id,
        title: product.title,
        price: { amount: product.price },
        product: product,
      },
    });
  };
  
  return <button onClick={handleAdd}>Add to Cart</button>;
}
```

---

## 📱 Responsive Design

Use Tailwind's responsive prefixes:
```jsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

Breakpoints:
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

---

## 🎬 Animations

```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

Pre-built animations in `src/animations/index.js`

---

## 🎨 Colors (Tailwind)

```
Primary: matte-black, ivory, warm-white
Accents: soft-emerald, muted-gold, frost-blue
Neutrals: charcoal, stone, sand, muted-sage
```

Usage:
```jsx
<div className="bg-ivory text-matte-black">Light background</div>
<div className="bg-matte-black text-ivory">Dark background</div>
<div className="bg-soft-emerald text-ivory">Accent background</div>
```

---

## 🚢 Deployment

### Vercel
```bash
npm install -g vercel
vercel
vercel --prod  # Production
```

### Netlify
```bash
npm run build
# Drag dist/ folder to Netlify, or:
netlify deploy --prod --dir=dist
```

---

## 🐛 Troubleshooting

### Port already in use
```bash
npm run dev -- --port 3000
```

### Dependencies issue
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear build
```bash
rm -rf dist
npm run build
```

### Check bundle size
```bash
npm run build -- --analyze
```

---

## 📚 Documentation Files

- **README.md** - Full project overview
- **SETUP_GUIDE.md** - Installation & configuration
- **PROJECT_COMPLETE.md** - What's included
- **VERIFICATION.md** - Checklist of all features
- **This file** - Quick reference

---

## 🔑 Key Files

| File | When to Edit |
|------|--------------|
| `package.json` | Add/remove dependencies |
| `tailwind.config.js` | Change colors/fonts |
| `.env` | Update API credentials |
| `src/App.jsx` | Add new routes |
| `src/components/` | Create components |
| `src/pages/` | Add pages |
| `src/utils/` | Add helpers |

---

## 💡 Tips

1. **Hot reload**: Changes save instantly while dev server runs
2. **Tailwind**: Use class names, no CSS files needed
3. **Components**: Keep them small and reusable
4. **State**: Use Zustand stores, not local state for global data
5. **Hooks**: Use React Query for server state, not useState
6. **Images**: Optimize before adding to assets/
7. **Mobile**: Test in browser mobile view (F12)
8. **Performance**: Check Lighthouse score regularly

---

## ✅ Pre-launch Checklist

- [ ] Run `npm run build` successfully
- [ ] Test all routes work
- [ ] Check mobile responsiveness
- [ ] Update brand colors
- [ ] Add your products
- [ ] Update Shopify credentials
- [ ] Test cart functionality
- [ ] Check Lighthouse score
- [ ] Run linter (`npm run lint`)
- [ ] Format code (`npm run format`)

---

## 🆘 Getting Help

1. Check the component's JSDoc comments
2. Look at example components
3. Check React/Tailwind/Framer Motion docs
4. Review SETUP_GUIDE.md for common issues

---

**You're all set! Start developing:**

```bash
npm run dev
```

🐾 Build something amazing with PAWRA!
