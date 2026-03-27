'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Heart, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, wishlist } = useStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
  ];

  const isLightPage = ['/product'].some((p) =>
    pathname.startsWith(p)
  );
  const isTransparent = !isScrolled;
  const useDarkText = isTransparent && isLightPage;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4',
        isScrolled ? 'glass-dark py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center">
          <span className="text-2xl md:text-3xl font-serif font-bold tracking-widest grad-text-gold uppercase">
            Annaya
          </span>
          <span
            className={cn(
              'text-[10px] tracking-[0.3em] uppercase -mt-1',
              useDarkText ? 'text-espresso/60' : 'text-ivory/60'
            )}
          >
            Boutique
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={cn(
                'text-sm font-medium tracking-widest uppercase transition-colors hover:text-gold-glow',
                pathname === link.path
                  ? 'text-gold-amber'
                  : useDarkText
                    ? 'text-espresso'
                    : 'text-ivory'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection..."
                onBlur={() => !searchQuery && setIsSearchOpen(false)}
                className={cn(
                  "w-32 sm:w-48 pl-4 pr-8 py-1.5 rounded-full text-sm border-none outline-none focus:ring-1 focus:ring-gold-amber transition-all",
                  useDarkText 
                    ? "bg-espresso/5 text-espresso placeholder-espresso/50" 
                    : "glass text-ivory placeholder-ivory/50"
                )}
              />
              <button 
                type="button" 
                onClick={() => setIsSearchOpen(false)} 
                className="absolute right-2"
              >
                <X size={14} className={useDarkText ? "text-espresso/60" : "text-ivory/60"} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                'transition-colors hover:text-gold-glow',
                useDarkText ? 'text-espresso' : 'text-ivory'
              )}
            >
              <Search size={20} />
            </button>
          )}

          <Link
            href="/wishlist"
            className={cn(
              'relative transition-colors hover:text-gold-glow',
              useDarkText ? 'text-espresso' : 'text-ivory'
            )}
          >
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-copper text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className={cn(
              'relative transition-colors hover:text-gold-glow',
              useDarkText ? 'text-espresso' : 'text-ivory'
            )}
          >
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-amber text-obsidian font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};
