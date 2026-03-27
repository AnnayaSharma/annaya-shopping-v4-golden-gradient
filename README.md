# Annaya Boutique — Next.js

Full-stack boutique e-commerce app built with **Next.js 15 (App Router)**, **Tailwind CSS v4**, **MongoDB Atlas**, and **Zustand**.

---

## What changed from the original React + Express project

| Before (Vite + Express)            | After (Next.js)                              |
|------------------------------------|----------------------------------------------|
| `server/index.ts` (Express)        | `app/api/` Route Handlers                    |
| `react-router-dom` `<Link>`        | `next/link` `<Link>`                         |
| `useNavigate` / `useLocation`      | `useRouter` / `usePathname` / `useSearchParams` |
| `useParams` from react-router      | `useParams` from `next/navigation`           |
| `<img>` tags                       | `next/image` `<Image>` (auto-optimized)      |
| `vite.config.ts` proxy → Express   | Built-in Next.js API routes (same origin)    |
| `src/index.css`                    | `app/globals.css`                            |
| `src/main.tsx` + `src/App.tsx`     | `app/layout.tsx`                             |
| `src/pages/*.tsx`                  | `app/**/page.tsx`                            |
| `concurrently` to run 2 processes  | Single `next dev` command                    |
| MongoDB singleton via Express      | `lib/mongodb.ts` singleton for API routes    |

---

## Project Structure

```
annaya-nextjs/
├── app/
│   ├── api/
│   │   ├── products/
│   │   │   ├── route.ts          ← GET /api/products
│   │   │   └── [slug]/route.ts   ← GET /api/products/:slug
│   │   └── categories/route.ts   ← GET /api/categories
│   ├── about/
│   │   ├── page.tsx
│   │   └── AboutClient.tsx
│   ├── cart/page.tsx
│   ├── categories/page.tsx
│   ├── product/[slug]/page.tsx
│   ├── shop/page.tsx
│   ├── wishlist/page.tsx
│   ├── globals.css
│   ├── HomeClient.tsx
│   ├── layout.tsx                ← Root layout (Navbar + Footer)
│   └── page.tsx                  ← Home (Server Component)
├── components/
│   ├── AddressForm.tsx
│   ├── BottomNav.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── ProductCard.tsx
├── lib/
│   ├── mongodb.ts                ← MongoDB singleton
│   └── utils.ts
├── store/
│   └── useStore.ts               ← Zustand cart + wishlist
├── .env.local
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Add your MongoDB URI to .env.local
MONGODB_URI=your_connection_string_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm start
```

---

## Key Decisions

- **Server Components for data fetching** — `app/page.tsx` (Home) fetches products server-side via `fetch()` with `revalidate: 60` for ISR caching. Client-heavy pages (Shop, Categories, Cart) use `useEffect` client-side fetches because they depend on URL search params or user state.
- **MongoDB singleton** — `lib/mongodb.ts` reuses the same connection across hot reloads in dev and across requests in production.
- **`next/image`** — All `<img>` tags replaced with `<Image>` for automatic WebP conversion, lazy loading, and size optimization. `remotePatterns` in `next.config.ts` whitelists Unsplash.
- **No more CORS** — Express needed `cors()` because the frontend (port 3000) called the backend (port 3005). With Next.js API routes, both live on the same origin.
