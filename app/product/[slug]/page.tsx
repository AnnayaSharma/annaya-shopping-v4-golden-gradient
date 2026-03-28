'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag, MessageCircle, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '@/store/useStore';
import { Product } from '@/store/useStore';
import { cn, formatPrice, getWhatsAppUrl } from '@/lib/utils';
import { ProductCard } from '@/components/ProductCard';

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist } = useStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setErrorInfo(null);

    fetch(`/api/products/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}: Product not found for slug "${slug}"`);
        return res.json();
      })
      .then((data: Product) => {
        setProduct(data);
        setSelectedSize(data.sizes[0] || '');
        setSelectedColor(data.colors[0]?.name || '');

        // Fetch related products
        fetch('/api/products')
          .then((res) => res.json())
          .then((allProducts: Product[]) => {
            const filtered = allProducts
              .filter((p) => p.category === data.category && p.id !== data.id)
              .slice(0, 4);
            setRelatedProducts(filtered);
          })
          .catch(console.error);
      })
      .catch((err) => {
        setErrorInfo(err.message);
        setProduct(null);
      })
      .finally(() => setIsLoading(false));
  }, [slug]);

  const handleWhatsAppOrder = () => {
    if (!product) return;
    window.open(getWhatsAppUrl(product.name, selectedSize, selectedColor, product.price), '_blank');
  };

  if (isLoading) {
    return (
      <div className="pt-48 pb-24 px-6 text-center bg-[var(--background-section)] min-h-screen flex flex-col items-center justify-center">
        <div className="text-2xl font-serif text-espresso italic animate-pulse">
          Loading product details...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-24 px-6 text-center bg-[var(--background-section)] min-h-screen">
        <h2 className="text-3xl font-serif text-espresso">Product not found</h2>
        <p className="text-espresso/60 mb-8 mt-4">Debug Info: {errorInfo || 'Unknown error'}</p>
        <button onClick={() => router.push('/shop')} className="mt-6 text-gold-amber underline">
          Back to Shop
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="pt-20 pb-12 px-4 sm:pt-32 sm:pb-24 sm:px-6 bg-[var(--background-section)] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-espresso/60 text-[10px] sm:text-xs uppercase tracking-widest mb-6 sm:mb-12">
          <button onClick={() => router.push('/')} className="hover:text-gold-amber transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => router.push('/shop')} className="hover:text-gold-amber transition-colors">
            Shop
          </button>
          <span>/</span>
          <span className="text-espresso font-bold truncate max-w-[150px] sm:max-w-none">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Image Gallery */}
          <div className="space-y-4 sm:space-y-6">
            <motion.div
              layoutId={`product-image-${product.id}`}
              className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden border border-gold-amber/10 shadow-xl sm:shadow-2xl"
            >
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                priority
              />
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col gap-3 sm:gap-4">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    'w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center transition-all',
                    isWishlisted ? 'bg-copper text-white' : 'text-ivory hover:bg-gold-amber/20'
                  )}
                >
                  <Heart
                    size={18}
                    className="sm:hidden"
                    fill={isWishlisted ? 'currentColor' : 'none'}
                  />
                  <Heart
                    size={20}
                    className="hidden sm:block"
                    fill={isWishlisted ? 'currentColor' : 'none'}
                  />
                </button>
                <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-espresso hover:bg-gold-amber/20">
                  <Share2 size={18} className="sm:hidden" />
                  <Share2 size={20} className="hidden sm:block" />
                </button>
              </div>
            </motion.div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      'relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all',
                      activeImage === i ? 'border-gold-amber' : 'border-transparent opacity-60'
                    )}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info Panel */}
          <div className="glass p-6 sm:p-10 rounded-2xl sm:rounded-[3rem] border-gold-amber/10 h-fit">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8">
              <div>
                <span className="text-gold-amber font-bold tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-1 sm:mb-2 block">
                  {product.category}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-espresso leading-tight">
                  {product.name}
                </h1>
              </div>
              <div className="flex items-center space-x-2 bg-gold-amber/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-gold-amber self-start whitespace-nowrap">
                <Star size={14} fill="currentColor" />
                <span className="font-bold text-sm sm:text-base">{product.rating}</span>
                <span className="text-[10px] sm:text-xs text-espresso/50">({product.reviewCount})</span>
              </div>
            </div>

            <div className="flex items-baseline space-x-3 sm:space-x-4 mb-6 sm:mb-10">
              <span className="text-3xl sm:text-4xl font-bold grad-text-gold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg sm:text-xl text-espresso/40 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="px-3 py-0.5 sm:px-4 sm:py-1 rounded-full bg-copper/10 text-copper text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                  -{product.discountPercent}%
                </span>
              )}
            </div>

            <p className="text-espresso/70 leading-relaxed mb-8 sm:mb-10 text-base sm:text-lg">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-espresso mb-3 sm:mb-4">
                Select Size
              </h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'px-5 py-2 sm:px-6 sm:py-3 rounded-xl border text-xs sm:text-sm font-bold transition-all',
                      selectedSize === size
                        ? 'bg-espresso text-ivory border-espresso shadow-lg'
                        : 'border-gold-amber/20 text-espresso/60 hover:border-gold-amber'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8 sm:mb-10">
              <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-espresso mb-3 sm:mb-4">
                Select Color
              </h4>
              <div className="flex flex-wrap gap-2.5 sm:gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={cn(
                      'group flex items-center space-x-2 sm:space-x-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all',
                      selectedColor === color.name
                        ? 'border-gold-amber bg-gold-amber/5'
                        : 'border-transparent hover:bg-gold-amber/5'
                    )}
                  >
                    <div
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-gold-amber/20 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span
                      className={cn(
                        'text-[10px] sm:text-xs font-medium',
                        selectedColor === color.name ? 'text-espresso' : 'text-espresso/60'
                      )}
                    >
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Indicator */}
            <div className="mb-10">
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold mb-2">
                <span className={product.stock < 5 ? 'text-copper' : 'text-espresso/60'}>
                  {product.stock < 5 ? `Only ${product.stock} left in stock!` : 'In Stock'}
                </span>
                <span className="text-espresso/60">{product.stock} units</span>
              </div>
              <div className="h-1.5 w-full bg-gold-amber/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((product.stock / 30) * 100, 100)}%` }}
                  className={cn(
                    'h-full rounded-full',
                    product.stock < 5 ? 'bg-copper' : 'bg-gold-amber'
                  )}
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={() => addToCart(product, selectedSize, selectedColor)}
                className="py-4 sm:py-5 glass-dark text-ivory font-bold rounded-2xl flex items-center justify-center space-x-3 hover:bg-gold-amber/20 transition-all group"
              >
                <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                <span className="tracking-[0.1em] uppercase text-sm sm:text-base">Add to Bag</span>
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="py-4 sm:py-5 [background:var(--background-whatsapp)] text-ivory font-bold rounded-2xl flex items-center justify-center space-x-3 shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:scale-[1.02] transition-all group"
              >
                <MessageCircle size={18} className="group-hover:rotate-12 transition-transform" />
                <span className="tracking-[0.1em] uppercase text-sm sm:text-base">Order on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-32">
            <div className="flex justify-between items-end mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl font-serif text-espresso">
                You May Also <span className="italic">Like</span>
              </h2>
              <Link href="/shop" className="text-gold-amber font-bold border-b border-gold-amber pb-1 text-sm">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
