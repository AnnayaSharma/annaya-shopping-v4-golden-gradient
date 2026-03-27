import { Suspense } from 'react';
import HomeClient from './HomeClient';

async function getProducts() {
  // Server-side fetch during SSR — relative URL needs absolute base in server context
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/products`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-obsidian text-gold-amber text-2xl font-serif italic">
          Loading...
        </div>
      }
    >
      <HomeClient products={products} />
    </Suspense>
  );
}
