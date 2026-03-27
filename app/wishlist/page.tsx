'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ArrowLeft } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useStore();
  const router = useRouter();

  if (wishlist.length === 0) {
    return (
      <div 
        className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden text-center" 
        style={{ background: 'linear-gradient(135deg, #2B1600 0%, #1A0B00 50%, #0D0700 100%)' }}
      >
        <div className="absolute top-[-20%] right-[-10%] w-64 md:w-96 h-64 md:h-96 bg-gold-amber/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-48 md:w-72 h-48 md:h-72 bg-copper/15 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full glass-dark border border-gold-amber/20 shadow-[-10px_-10px_30px_rgba(255,255,255,0.05),_10px_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center text-copper mb-10 transition-all hover:scale-110">
            <Heart size={40} className="fill-copper/20" />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-6 tracking-wide drop-shadow-xl">
            Wishlist <span className="italic grad-text-gold">Empty</span>
          </h2>
          <p className="text-ivory/60 mb-12 max-w-lg text-base sm:text-lg leading-relaxed font-light">
            You haven&apos;t saved any of your favorite luxury pieces yet. Find something breathtaking to remember.
          </p>
          <Link
            href="/shop"
            className="px-10 py-5 bg-gradient-to-r from-gold-amber to-gold-glow text-obsidian font-bold uppercase tracking-[0.2em] text-sm rounded-full shadow-[0_0_40px_rgba(212,137,26,0.3)] hover:shadow-[0_0_60px_rgba(212,137,26,0.6)] hover:scale-[1.02] transition-all duration-500"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Full Width Hero Header */}
      <section 
        className="relative w-full overflow-hidden pt-32 sm:pt-40 pb-16 sm:pb-24 px-6 border-b border-gold-amber/30 shadow-2xl" 
        style={{ background: 'linear-gradient(135deg, #2B1600 0%, #1A0B00 50%, #0D0700 100%)' }}
      >
        {/* Ambient Glow */}
        <div className="absolute top-[-20%] right-[-10%] w-64 md:w-96 h-64 md:h-96 bg-gold-amber/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-48 md:w-72 h-48 md:h-72 bg-copper/15 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <span className="text-gold-amber font-bold tracking-[0.3em] uppercase text-xs mb-4 block drop-shadow-md">
              Saved Masterpieces
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-ivory drop-shadow-xl">
              Your <span className="italic grad-text-gold">Wishlist</span>
            </h1>
            <p className="text-ivory/60 mt-6 max-w-xl text-base sm:text-lg font-light leading-relaxed">
              A meticulously curated collection of your most desired luxury pieces.
            </p>
          </div>
          <button
            onClick={() => router.push('/shop')}
            className="flex items-center space-x-2 text-ivory/60 hover:text-gold-amber transition-colors mt-8 sm:mt-0 font-light"
          >
            <ArrowLeft size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Continue Shopping</span>
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
          {wishlist.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
