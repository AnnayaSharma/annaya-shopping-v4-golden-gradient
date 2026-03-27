'use client';

import { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '@/components/ProductCard';
import { cn } from '@/lib/utils';
import { Product } from '@/store/useStore';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    
    const q = searchParams.get('q');
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    setVisibleCount(20);
  }, [selectedCategory, searchQuery, sortBy]);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const observer = useRef<IntersectionObserver | null>(null);
  const triggerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredProducts.length) {
          setVisibleCount((prev) => prev + 20);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, visibleCount, filteredProducts.length]
  );

  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Full Width Hero Header */}
      <section className="relative w-full overflow-hidden pt-32 sm:pt-40 pb-16 sm:pb-24 px-6 border-b border-gold-amber/20 shadow-2xl" style={{ background: 'linear-gradient(135deg, #2B1600 0%, #1A0B00 50%, #0D0700 100%)' }}>
        {/* Ambient Glow */}
        <div className="absolute top-[-20%] right-[-10%] w-64 md:w-96 h-64 md:h-96 bg-gold-amber/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-48 md:w-72 h-48 md:h-72 bg-copper/15 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-gold-amber font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
            Curated Masterpieces
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-ivory mb-6">
            The <span className="italic grad-text-gold">Collection</span>
          </h1>
          <p className="text-ivory/70 max-w-2xl text-base sm:text-lg leading-relaxed">
            Browse our curated selection of premium Indian fashion, from timeless sarees to
            contemporary fusion gowns.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 px-6 py-3 glass-dark text-ivory rounded-full hover:bg-gold-amber/20 transition-colors"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>

            <div className="relative flex-1 md:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso/50"
                size={18}
              />
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3 bg-white/50 border border-gold-amber/10 rounded-full focus:outline-none focus:border-gold-amber transition-colors placeholder:text-espresso/40"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="text-espresso/70 text-sm whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-3 bg-white/50 border border-gold-amber/10 rounded-full focus:outline-none focus:border-gold-amber transition-colors text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="glass p-8 rounded-3xl border-gold-amber/20">
                <h3 className="font-serif text-xl text-espresso mb-6">Categories</h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        'px-6 py-2 rounded-full text-sm font-medium transition-all',
                        selectedCategory === cat
                          ? 'bg-[var(--background-gold)] text-obsidian shadow-lg'
                          : 'bg-white/50 text-espresso/60 hover:bg-gold-amber/10'
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        {isLoading ? (
          <div className="text-center py-24 text-espresso/60 text-xl font-serif italic">
            Loading products...
          </div>
        ) : displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {displayedProducts.map((product, index) => (
              <div 
                key={product.id}
                ref={index === visibleCount - 6 ? triggerRef : null}
                className="h-full"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <h3 className="text-2xl font-serif text-espresso mb-4">No products found</h3>
            <p className="text-espresso/60">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-24 px-6 bg-ivory min-h-screen flex items-center justify-center">
          <div className="text-xl font-serif text-espresso/60 italic">Loading shop...</div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
