'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, useStore } from '@/store/useStore';
import { cn, formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, wishlist, addToCart } = useStore();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative bg-[var(--background-card)] rounded-2xl overflow-hidden border border-gold-amber/10 shadow-[0_8px_40px_rgba(212,137,26,0.1)] hover:shadow-[0_8px_40px_rgba(212,137,26,0.2)] transition-all duration-500"
    >
      {/* Clickable Area */}
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badges */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-col gap-2">
            {product.discountPercent > 0 && (
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-copper text-white text-[8px] sm:text-[10px] font-bold tracking-widest uppercase shadow-lg">
                {product.discountPercent}% OFF
              </span>
            )}
            {product.isNewArrival && (
              <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[var(--background-gold)] text-obsidian text-[8px] sm:text-[10px] font-bold tracking-widest uppercase shadow-lg">
                New Arrival
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-6">
          <div className="flex justify-between items-start mb-1 sm:mb-2">
            <span className="text-[8px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] uppercase text-black/60 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              {product.category}
            </span>
            <div className="flex items-center space-x-0.5 sm:space-x-1 text-gold-glow">
              <Star size={8} className="sm:hidden" fill="currentColor" />
              <Star size={10} className="hidden sm:block" fill="currentColor" />
              <span className="text-[8px] sm:text-[10px] font-bold">{product.rating}</span>
            </div>
          </div>

          <h3 className="font-serif text-sm sm:text-lg text-black mb-1 sm:mb-3 line-clamp-1 group-hover:text-amber-300 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="text-base sm:text-xl font-bold grad-text-gold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] sm:text-sm text-black/40 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className={cn(
          'absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full glass z-20 flex items-center justify-center transition-all duration-300',
          isWishlisted ? 'bg-copper text-white border-copper' : 'text-ivory hover:bg-gold-amber/20'
        )}
      >
        <Heart size={14} className="sm:hidden" fill={isWishlisted ? 'currentColor' : 'none'} />
        <Heart
          size={18}
          className="hidden sm:block"
          fill={isWishlisted ? 'currentColor' : 'none'}
        />
      </button>

      {/* Quick Add Button */}
      <div className="absolute top-[50%] -translate-y-1/2 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none md:pointer-events-auto">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product, product.sizes[0], product.colors[0]?.name || '');
          }}
          className="w-full py-2 sm:py-3 glass-dark text-ivory font-bold text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase flex items-center justify-center space-x-1 sm:space-x-2 hover:bg-gold-amber/20 transition-colors shadow-2xl pointer-events-auto"
        >
          <ShoppingBag size={12} className="sm:hidden" />
          <ShoppingBag size={14} className="hidden sm:block" />
          <span>Quick Add</span>
        </button>
      </div>
    </motion.div>
  );
};
