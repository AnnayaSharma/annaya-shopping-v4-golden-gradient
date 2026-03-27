'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, LayoutGrid, Info, BaggageClaim } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

export const BottomNav = () => {
  const pathname = usePathname();
  const { cart } = useStore();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: ShoppingBag, label: 'Shop', path: '/shop' },
    { icon: LayoutGrid, label: 'Categories', path: '/categories' },
    {
      icon: BaggageClaim,
      label: 'Cart',
      path: '/cart',
      badge: cart.reduce((acc, item) => acc + item.quantity, 0),
    },
    { icon: Info, label: 'About', path: '/about' },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <nav className="glass-dark rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-gold-amber/20 overflow-hidden">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.path}
                className={cn(
                  'relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200',
                  isActive ? 'text-gold-amber' : 'text-ivory/60 hover:text-ivory'
                )}
              >
                <div className="relative">
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {item.badge && item.badge > 0 ? (
                    <span className="absolute -top-1.5 -right-2 bg-gold-amber text-obsidian font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] tracking-wider font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
