import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'Annaya Boutique — Draped in Elegance',
  description:
    'Discover our exclusive festive collection featuring handpicked designs and premium fabrics crafted for your most memorable moments.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen pb-24 md:pb-0">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
