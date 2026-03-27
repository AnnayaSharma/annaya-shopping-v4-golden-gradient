import Link from 'next/link';
import { Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const socialLinks = [
    { Icon: Instagram, label: 'Instagram' },
    { Icon: Facebook, label: 'Facebook' },
    { Icon: Twitter, label: 'Twitter' },
  ];

  const quickLinks = [
    { label: 'Shop All', to: '/shop' },
    { label: 'Categories', to: '/categories' },
    { label: 'Our Story', to: '/about' },
    { label: 'Wishlist', to: '/wishlist' },
  ];

  const careLinks = ['Shipping Policy', 'Returns & Exchanges', 'Size Guide', 'FAQs'];

  return (
    <footer className="[background:var(--background-footer)] text-ivory pt-20 pb-10 px-6 relative overflow-hidden">
      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-gold-amber/5 blur-[80px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gold-amber/20" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
        {/* Brand */}
        <div className="space-y-6">
          <Link href="/" className="flex flex-col w-fit">
            <span className="text-3xl font-serif font-bold tracking-widest grad-text-gold uppercase">
              Annaya
            </span>
            <span className="text-xs tracking-[0.3em] uppercase text-ivory/50 -mt-1">
              Boutique
            </span>
          </Link>

          <p className="text-ivory/60 text-sm leading-relaxed max-w-xs">
            Draped in Elegance. Defined by You. Experience the finest Indian luxury fashion curated
            for the modern woman.
          </p>

          <div className="flex space-x-3">
            {socialLinks.map(({ Icon, label }) => (
              <a
                href="#"
                key={label}
                aria-label={label}
                className="w-10 h-10 rounded-full glass border border-gold-amber/15 flex items-center justify-center text-ivory/60 hover:text-gold-glow hover:border-gold-amber/40 hover:bg-gold-amber/10 transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-lg mb-6 text-gold-glow">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {quickLinks.map(({ label, to }) => (
              <li key={label}>
                <Link
                  href={to}
                  className="text-ivory/60 hover:text-gold-amber transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-[1px] [background:var(--background-gold)] transition-all duration-300 rounded-full" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-serif text-lg mb-6 text-gold-glow">Customer Care</h4>
          <ul className="space-y-3 text-sm">
            {careLinks.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className="text-ivory/60 hover:text-gold-amber transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-[1px] [background:var(--background-gold)] transition-all duration-300 rounded-full" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-lg mb-6 text-gold-glow">Contact Us</h4>
          <div className="space-y-5">
            <p className="text-ivory/60 text-sm leading-relaxed">
              123 Luxury Lane, Fashion District
              <br />
              Mumbai, MH 400001
            </p>
            <a
              href="https://wa.me/917494954286"
              className="inline-flex items-center space-x-3 px-6 py-3 rounded-full [background:var(--background-whatsapp)] text-ivory font-bold text-sm shadow-[0_0_20px_rgba(37,211,102,0.25)] hover:scale-105 hover:shadow-[0_0_35px_rgba(37,211,102,0.4)] transition-all duration-300"
            >
              <MessageCircle size={17} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-gold-amber/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-ivory/30 text-[10px] tracking-widest uppercase">
          © 2026 Annaya Boutique. All Rights Reserved.
        </p>
        <div className="flex space-x-8 text-[10px] tracking-widest uppercase text-ivory/30">
          <a href="#" className="hover:text-gold-amber transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gold-amber transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};
