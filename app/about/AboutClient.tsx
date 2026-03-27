'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Star, Shield, Heart, Sparkles } from 'lucide-react';

export default function AboutClient() {
  return (
    <div className="overflow-hidden bg-ivory pb-24">
      {/* Full Width Hero Header */}
      <section 
        className="relative w-full overflow-hidden text-center pt-40 pb-24 px-6 border-b border-gold-amber/20 shadow-2xl" 
        style={{ background: 'linear-gradient(135deg, #2B1600 0%, #1A0B00 50%, #0D0700 100%)' }}
      >
        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[10%] w-64 md:w-96 h-64 md:h-96 bg-gold-amber/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[10%] w-48 md:w-72 h-48 md:h-72 bg-copper/15 rounded-full blur-[60px] pointer-events-none" />
        
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <Image
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2000&auto=format&fit=crop"
            fill
            className="object-cover"
            alt="Annaya Boutique Heritage"
            unoptimized
            priority
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-gold-amber tracking-[0.4em] uppercase text-xs font-bold mb-6 block drop-shadow-md">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-ivory leading-tight mb-10 drop-shadow-xl">
              &quot;Draped in <span className="italic grad-text-gold">Elegance</span>.
              <br />
              Defined by You.&quot;
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-amber to-transparent mx-auto opacity-70" />
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-gold-amber/20 shadow-[0_20px_50px_rgba(43,22,0,0.15)] relative">
              <Image
                src="https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1000&auto=format&fit=crop"
                fill
                className="object-cover"
                alt="Annaya Founder"
                unoptimized
              />
            </div>
            {/* Overlay Quote */}
            <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] border border-gold-amber/20 shadow-2xl max-w-[280px] sm:max-w-xs">
              <p className="text-espresso font-serif italic text-base sm:text-lg mb-4 leading-relaxed">
                &quot;Fashion is the most powerful art there is. It&apos;s movement, design, and
                architecture all in one.&quot;
              </p>
              <div className="w-8 h-px bg-gold-amber mb-3" />
              <p className="font-bold text-espresso/60 uppercase tracking-widest text-[10px] sm:text-xs">
                Annaya, Founder
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <span className="text-gold-amber font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
              The Heritage
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-espresso mb-8 leading-tight">
              A Legacy of <br /><span className="italic grad-text-gold">Craftsmanship</span>
            </h2>
            <div className="space-y-6 text-espresso/75 text-lg leading-relaxed font-light">
              <p>
                Founded in 2020, Annaya Boutique began with a single, elegant vision: to bring the breathtaking opulence
                of traditional Indian craftsmanship securely into the modern woman&apos;s everyday wardrobe.
              </p>
              <p>
                Our journey started in an intimate studio in Mumbai, where we hand-selected the finest
                silks, rich brocades, and collaborated intimately with local artisans. We demanded excellence from thread to finish. Today, we
                continue that unrelenting legacy, ensuring every handcrafted garment feels like a masterpiece of breathtaking quality.
              </p>
              <p>
                We believe that clothing extends far beyond mere fabric; it serves as a profound expression of
                radiant confidence, rich heritage, and undeniable personal style. At Annaya, we don&apos;t just sell
                clothes—we curate heirloom experiences.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 px-6 relative mt-12 rounded-[3rem] mx-4 sm:mx-8 shadow-2xl border border-gold-amber/20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0B00 0%, #2B1600 50%, #0D0700 100%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-full max-w-4xl bg-gold-amber/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-ivory mb-4">
              Our <span className="italic grad-text-gold">Philosophy</span>
            </h2>
            <p className="text-ivory/60 max-w-xl mx-auto">
              The foundational pillars that guide our curation and design, ensuring you receive nothing but the ultimate in luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: 'Handpicked Designs',
                icon: <Sparkles className="text-gold-glow" size={32} />,
                desc: 'Every garment is meticulously curated to guarantee sweeping elegance.',
              },
              {
                title: 'Roots & Modernity',
                icon: <Heart className="text-gold-glow" size={32} />,
                desc: 'A flawless fusion of ancestral Indian roots and striking contemporary silhouettes.',
              },
              {
                title: 'Quality Assured',
                icon: <Shield className="text-gold-glow" size={32} />,
                desc: 'Premium hand-loomed fabrics and meticulous craftsmanship in every stitch.',
              },
              {
                title: 'Confidence First',
                icon: <Star className="text-gold-glow" size={32} />,
                desc: 'Empowering women with designs that make them feel like royalty.',
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-dark p-8 sm:p-10 rounded-[2rem] text-center border border-gold-amber/10 shadow-xl hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-gold-amber/10 flex justify-center items-center mx-auto mb-6 border border-gold-amber/20 shadow-inner">
                  {value.icon}
                </div>
                <h3 className="text-xl font-serif text-ivory mb-3">{value.title}</h3>
                <p className="text-ivory/60 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
