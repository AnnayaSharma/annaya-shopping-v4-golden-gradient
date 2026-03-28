'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/store/useStore';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const router = useRouter();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalSavings = cart.reduce(
    (acc, item) => acc + (item.originalPrice - item.price) * item.quantity,
    0
  );

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const itemsList = cart
      .map(
        (item) =>
          `• *${item.name}* (${item.selectedSize}/${typeof item.selectedColor === 'object' ? (item.selectedColor as any).name : item.selectedColor
          }) x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
      )
      .join('\n');

    const message = `Hello Annaya Boutique! 🛍️\nI'd like to place an order for:\n\n${itemsList}\n\n*Total: ${formatPrice(subtotal)}*\n\nPlease confirm availability!`;
    window.open(`https://wa.me/917494954286?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div
        className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden text-center"
        style={{ background: 'linear-gradient(135deg, #2B1600 0%, #1A0B00 50%, #0D0700 100%)' }}
      >
        <div className="absolute top-[-20%] right-[-10%] w-64 md:w-96 h-64 md:h-96 bg-gold-amber/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-48 md:w-72 h-48 md:h-72 bg-copper/15 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full glass-dark border border-gold-amber/20 shadow-[-10px_-10px_30px_rgba(255,255,255,0.05),_10px_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center text-gold-glow mb-10 transition-all hover:scale-110">
            <ShoppingBag size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-6 tracking-wide drop-shadow-xl">
            Your Bag <span className="italic grad-text-gold">is Empty</span>
          </h2>
          <p className="text-ivory/60 mb-12 max-w-lg text-base sm:text-lg leading-relaxed font-light">
            Looks like you haven&apos;t added any breathtaking luxury pieces to your collection yet. Let&apos;s change that.
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
        className="relative w-full overflow-hidden pt-32 sm:pt-40 pb-16 sm:pb-24 px-6 border-b border-gold-amber/50 shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #2B1600 0%, #1A0B00 50%, #0D0700 100%)' }}
      >
        {/* Ambient Glow */}
        <div className="absolute top-[-20%] right-[-10%] w-64 md:w-96 h-64 md:h-96 bg-gold-amber/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-48 md:w-72 h-48 md:h-72 bg-copper/15 rounded-full blur-[60px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <span className="text-gold-amber font-bold tracking-[0.3em] uppercase text-xs mb-4 block drop-shadow-md">
              Secure Checkout
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-ivory drop-shadow-xl">
              Your <span className="italic grad-text-gold">Bag</span>
            </h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}-${typeof item.selectedColor === 'object' ? (item.selectedColor as any).name : item.selectedColor
                    }-${index}`}
                  layout
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border border-gold-amber/10 shadow-[0_20px_40px_rgba(43,22,0,0.05)] hover:shadow-[0_20px_50px_rgba(212,137,26,0.1)] flex flex-row gap-4 sm:gap-8 items-center sm:items-stretch transition-all duration-300"
                >
                  <div className="relative w-28 sm:w-36 aspect-[3/4] rounded-[1.5rem] overflow-hidden border border-gold-amber/20 flex-shrink-0 shadow-inner">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                      unoptimized
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-2 sm:py-2 h-full min-h-[6rem]">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-serif text-espresso mb-1 line-clamp-1">{item.name}</h3>
                        <p className="text-espresso/60 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium">
                          {item.selectedSize} | {typeof item.selectedColor === 'object' ? (item.selectedColor as any).name : item.selectedColor}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="text-espresso/30 hover:text-copper hover:scale-110 hover:bg-copper/5 p-2 rounded-full transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-4 sm:mt-6">
                      <div className="flex items-center bg-espresso/[0.03] backdrop-blur-xl border border-gold-amber/10 rounded-2xl px-2 sm:px-3 py-1.5 shadow-sm">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity - 1
                            )
                          }
                          className="p-1 sm:p-2 text-espresso/60 hover:text-gold-amber transition-colors"
                        >
                          <Minus size={14} strokeWidth={3} />
                        </button>
                        <span className="w-6 sm:w-10 text-center text-espresso font-bold text-sm sm:text-base">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity + 1
                            )
                          }
                          className="p-1 sm:p-2 text-espresso/60 hover:text-gold-amber transition-colors"
                        >
                          <Plus size={14} strokeWidth={3} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xl sm:text-3xl font-serif text-espresso">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        {item.originalPrice > item.price && (
                          <p className="text-xs sm:text-sm text-espresso/40 line-through mt-1">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div 
              className="p-8 sm:p-10 rounded-[2.5rem] border border-gold-amber/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] sticky top-32"
              style={{ background: 'linear-gradient(135deg, #2B1600 0%, #1A0B00 50%, #0D0700 100%)' }}
            >
              <h3 className="text-2xl font-serif text-ivory mb-8 border-b border-gold-amber/20 pb-4">
                Order Summary
              </h3>

              <div className="space-y-5 mb-8 text-sm">
                <div className="flex justify-between text-ivory/70 font-medium tracking-wide">
                  <span>Subtotal</span>
                  <span className="text-ivory">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ivory/70 font-medium tracking-wide">
                  <span>Shipping</span>
                  <span className="text-gold-amber font-bold uppercase tracking-[0.2em] text-[10px] mt-1">Complimentary</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-copper font-medium p-4 bg-gradient-to-r from-copper/10 to-transparent rounded-2xl border-l-2 border-copper">
                    <span>Total Savings</span>
                    <span>-{formatPrice(totalSavings)}</span>
                  </div>
                )}
                <div className="pt-6 border-t border-gold-amber/20 flex justify-between text-ivory text-2xl font-serif mt-2">
                  <span>Total</span>
                  <span className="grad-text-gold">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="space-y-5">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-5 [background:var(--background-whatsapp)] text-white font-bold rounded-[1.5rem] flex items-center justify-center space-x-3 shadow-[0_10px_30px_rgba(37,211,102,0.25)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.4)] hover:-translate-y-1 transition-all duration-300"
                >
                  <MessageCircle size={22} />
                  <span className="tracking-[0.15em] uppercase text-sm text-white">Secure via WhatsApp</span>
                </button>
                <div className="text-center space-y-2">
                  <p className="text-[10px] text-ivory/50 uppercase tracking-[0.2em] leading-relaxed">
                    End-to-End Encrypted Checkout
                  </p>
                  <p className="text-[10px] text-ivory/40 uppercase tracking-[0.1em] leading-relaxed">
                    We personally confirm availability <br /> and guarantee your details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
