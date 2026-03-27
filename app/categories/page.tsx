'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';

interface Category {
  name: string;
  count: number;
  image: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Full Width Header Banner */}
      <section className="relative w-full overflow-hidden text-center pt-32 sm:pt-40 pb-16 sm:pb-24 px-6 border-b border-gold-amber/20 shadow-2xl" style={{ background: 'linear-gradient(135deg, #2B1600 0%, #1A0B00 50%, #0D0700 100%)' }}>
        {/* Ambient Glow */}
        <div className="absolute top-[-20%] left-[10%] w-64 md:w-96 h-64 md:h-96 bg-gold-amber/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[10%] w-48 md:w-72 h-48 md:h-72 bg-copper/15 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-gold-amber font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
            Curated Collections
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-ivory">
            Shop by <span className="italic grad-text-gold">Category</span>
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full text-center py-20 text-espresso/60 text-xl font-serif italic">
              Loading categories...
            </div>
          ) : (
            categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[500px] rounded-[2.5rem] overflow-hidden border border-gold-amber/10 shadow-2xl"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-60 transition-opacity" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <span className="text-gold-glow text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 drop-shadow-md">
                    {cat.count} Products
                  </span>
                  <h3 className="text-4xl md:text-5xl font-serif text-white mb-8 drop-shadow-2xl">
                    {cat.name}
                  </h3>
                  <Link
                    href={`/shop?category=${cat.name}`}
                    className="px-8 py-3 glass text-espresso font-bold rounded-full hover:bg-gold-amber hover:text-obsidian transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                  >
                    Explore Collection
                  </Link>
                </div>

                {/* Decorative Border */}
                <div className="absolute inset-4 border border-gold-amber rounded-[2rem] pointer-events-none group-hover:inset-6 transition-all duration-500" />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
