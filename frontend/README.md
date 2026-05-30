# Product Detail Page — Vue 3 + TypeScript + Vite

A single-page e-commerce product detail view built with Vue 3 Composition API.

## How to run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (default: `http://localhost:5173`).

### Other commands

| Command | Description |
|---------|-------------|
| `npm run build` | Type-check with `vue-tsc` then build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on TypeScript and Vue files |

## Architecture

```
src/
├── main.ts               # Vue app entry point
├── App.vue               # Root component (header with cart badge + product detail)
├── env.d.ts              # Vue SFC type declarations
├── types.ts              # Shared TypeScript interfaces
├── index.css             # All styles (loading skeletons, transitions, responsive)
├── api/
│   └── mockApi.ts        # Simulated API with delay and random failures
├── data/
│   └── product.ts        # Mock product data (wireless headphones)
└── components/
    ├── ProductDetail.vue     # Main product view — loading/error/product states
    ├── ProductImage.vue      # Product image with fallback placeholder
    ├── VariantSelector.vue   # Color/size selection with cross-variant availability
    ├── QuantityControl.vue   # +/- stepper bounded by variant stock
    ├── AddToCartButton.vue   # Button with loading spinner and out-of-stock state
    ├── Toast.vue             # Success/error notification with enter/leave transition
    └── CartBadge.vue         # Header cart icon with item count
```

## Component tree & data flow

```
App.vue
├── CartBadge        (prop: count)
└── ProductDetail    (prop: productId, emit: cartUpdate → App)
    ├── Toast        (prop: message)
    ├── ProductImage (prop: images, name)
    ├── VariantSelector (props: variants/colors/sizes/selected, emit: colorChange/sizeChange)
    ├── QuantityControl  (props: quantity/maxStock, emit: change)
    └── AddToCartButton  (props: disabled/loading/outOfStock, emit: click)
```

**State flows up via emits; data flows down via props.**

## States covered

| State | How it's triggered | UI |
|-------|-------------------|-----|
| Loading | 800ms mock API delay | Skeleton shimmer placeholders |
| Error | API rejection | Error message with retry button |
| Empty | API returns null product | Not rendered (guarded by `v-if`) |
| Out of stock | Variant with `stock: 0` | Disabled button, hidden quantity control |
| Add-to-cart success | 90% chance from mock API | Green toast "Added to cart!", cart badge updates |
| Add-to-cart failure | 10% chance from mock API | Red toast "Insufficient stock" |
| Variant cross-filter | Color/size combinations not in data | Unavailable options are disabled |

## Assumptions

- **Mock API** — `getProductDetail` returns a single hardcoded product after an 800ms delay. `addToCart` succeeds 90% of the time and fails 10% to exercise error handling. Cart count is maintained in-memory and increments by the requested quantity — it resets on page reload.
- **No router** — This is a single-page product detail view; no routing library is needed.
- **Placeholder images** — Product images use `placehold.co` URLs; in production these would point to a CDN or image service.
- **No persistent state** — Cart count is ephemeral (no localStorage or backend).
- **Single product** — The page is hardcoded to `productId: "P001"`; a real app would use a router or product listing to select products.
