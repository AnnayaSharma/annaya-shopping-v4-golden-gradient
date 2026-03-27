'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Star, Sparkles, Shirt, Heart } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/store/useStore';

interface Props {
  products: Product[];
}

export default function HomeClient({ products }: Props) {
  const featuredProducts = products.filter((p) => p.isFeatured);
  const newArrivals = products.filter((p) => p.isNewArrival);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center [background:var(--background-hero)] px-6">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gold-amber/10 blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 15, repeat: Infinity, delay: 2 }}
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-copper/10 blur-[100px]"
          />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1 className="text-6xl md:text-8xl font-serif pt-20 md:pt-0 text-amber-300 leading-[1.1] mb-8">
              Draped in{' '}
              <span className="italic grad-text-gold">Elegance</span>.
              <br />
              Defined by You.
            </h1>

            <div className="glass p-8 rounded-2xl max-w-md mb-10">
              <p className="text-ivory/80 text-lg leading-relaxed mb-8">
                Discover our exclusive festive collection featuring handpicked designs and premium
                fabrics crafted for your most memorable moments.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="px-8 py-4 [background:var(--background-gold)] text-obsidian font-bold rounded-full shadow-[0_0_30px_rgba(212,137,26,0.4)] hover:scale-105 transition-transform flex items-center space-x-2"
                >
                  <span>Discover Collection</span>
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/shop?filter=new"
                  className="px-8 py-4 glass text-ivory font-bold rounded-full hover:bg-gold-amber/10 transition-colors"
                >
                  Shop New Arrivals
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right — Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold-amber/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <Image
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop"
                alt="Luxury Fashion"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-10 -left-10 glass p-6 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gold-amber/20 flex items-center justify-center text-gold-glow">
                  <Star fill="currentColor" />
                </div>
                <div>
                  <p className="text-ivory font-bold">Premium Quality</p>
                  <p className="text-ivory/60 text-xs">Handpicked Fabrics</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="bg-obsidian border-y border-gold-amber/20 py-6 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-12 mx-6">
              <span className="text-gold-glow font-serif text-xl italic tracking-widest">Free Shipping</span>
              <span className="text-ivory/20">•</span>
              <span className="text-gold-glow font-serif text-xl italic tracking-widest">Handpicked Designs</span>
              <span className="text-ivory/20">•</span>
              <span className="text-gold-glow font-serif text-xl italic tracking-widest">Premium Fabrics</span>
              <span className="text-ivory/20">•</span>
              <span className="text-gold-glow font-serif text-xl italic tracking-widest">Festive Exclusives</span>
              <span className="text-ivory/20">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <section className="py-24 px-6 [background:var(--background-section)] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gold-amber/20" />
        <div className="absolute inset-0 [background:var(--background-glow)] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-between items-end mb-14">
            <div>
              <span className="text-gold-amber font-bold tracking-[0.35em] uppercase text-xs mb-3 block">
                Curated Selection
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-espresso leading-tight">
                Trending <span className="italic text-gold-amber">Now</span>
              </h2>
              <div className="mt-4 h-[2px] w-16 [background:var(--background-gold)] rounded-full" />
            </div>
            <Link
              href="/shop"
              className="group flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gold-amber text-espresso font-bold text-sm hover:[background:var(--background-gold)] hover:text-obsidian hover:shadow-[0_0_20px_rgba(212,137,26,0.3)] transition-all duration-300"
            >
              View All
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-amber/15" />
      </section>

      {/* Festive Picks */}
      <section className="py-24 bg-obsidian px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-gold-amber/5 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-gold-amber font-bold tracking-[0.35em] uppercase text-xs mb-4 block">
              The Season&apos;s Finest
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-ivory mb-6">
              Festive <span className="italic grad-text-gold">Picks</span>
            </h2>
            <div className="w-24 h-[3px] [background:var(--background-gold)] mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Large Left Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative group overflow-hidden rounded-3xl aspect-video md:aspect-auto h-full min-h-[500px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Frocks Collection"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-gold-amber/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-10">
                <span className="text-gold-amber tracking-[0.3em] uppercase text-xs font-bold mb-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  Featured Collection
                </span>
                <h3 className="text-4xl md:text-5xl font-serif text-ivory mb-6 leading-tight">
                  Elegant <span className="italic text-amber-300">Frocks</span>
                </h3>
                <Link
                  href="/shop?category=Frock"
                  className="w-fit px-8 py-3 [background:var(--background-gold)] text-obsidian font-bold rounded-full shadow-[0_0_25px_rgba(212,137,26,0.3)] hover:scale-105 hover:shadow-[0_0_40px_rgba(212,137,26,0.5)] transition-all duration-300"
                >
                  Explore Collection
                </Link>
              </div>
            </motion.div>

            {/* Right — Products */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-2 gap-4 sm:gap-6"
            >
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Annaya Promise */}
      <section className="py-24 [background:var(--background-hero)] px-6 relative overflow-hidden">
        <div className="absolute inset-0 [background:var(--background-glow)] opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gold-amber/15" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-amber/15" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-gold-amber font-bold tracking-[0.35em] uppercase text-xs mb-4 block">
              Our Commitment
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-ivory mb-6">
              The Annaya <span className="italic grad-text-gold">Promise</span>
            </h2>
            <div className="w-24 h-[3px] [background:var(--background-gold)] mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Crafted with Care',
                desc: 'Every piece is hand-selected and quality-checked by our experts before it reaches you.',
                icon: Sparkles,
              },
              {
                title: 'Styled for Life',
                desc: 'Designs that blend traditional roots with contemporary flair for every occasion.',
                icon: Shirt,
              },
              {
                title: 'Priced with Heart',
                desc: 'Luxury fashion made accessible without ever compromising on quality or craft.',
                icon: Heart,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="glass border border-gold-amber/20 p-10 rounded-3xl text-center group hover:border-gold-amber/40 hover:shadow-[0_0_40px_rgba(212,137,26,0.1)] transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-gold-amber/10 border border-gold-amber/20 flex items-center justify-center mx-auto mb-8 group-hover:bg-gold-amber/20 group-hover:border-gold-amber/40 transition-all duration-500">
                  <item.icon size={26} className="text-gold-glow group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-serif text-gold-glow mb-4">{item.title}</h3>
                <div className="w-10 h-[2px] [background:var(--background-gold)] mx-auto mb-5 rounded-full opacity-60" />
                <p className="text-ivory/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 [background:var(--background-section)] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-espresso">
              What Our <span className="italic">Clients Say</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                text: 'The quality of the silk is absolutely stunning. I wore the Midnight Zari Saree for my sister\'s wedding and received so many compliments!',
                rating: 5,
              },
              {
                name: 'Ananya Iyer',
                text: 'Annaya Boutique has become my go-to for festive wear. Their designs are unique and the fit is always perfect.',
                rating: 5,
              },
              {
                name: 'Meera Kapoor',
                text: 'Fast shipping and beautiful packaging. The Copper Rust gown is even more beautiful in person.',
                rating: 4,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-gold-amber/10 shadow-xl"
              >
                <div className="flex text-gold-amber mb-4">
                  {[...Array(item.rating)].map((_, j) => (
                    <Star key={j} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-espresso italic mb-6">&quot;{item.text}&quot;</p>
                <p className="font-bold text-espresso">— {item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Mosaic */}
      <section className="py-24 bg-obsidian px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
            {[
              { src: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop', className: 'col-span-2 row-span-2' },
              { src: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop', className: '' },
              { src: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop', className: '' },
              { src: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop', className: 'col-span-2' },
            ].map((img, i) => (
              <div key={i} className={`${img.className} relative group overflow-hidden rounded-3xl`}>
                <Image
                  src={img.src}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="Gallery"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gold-amber/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
