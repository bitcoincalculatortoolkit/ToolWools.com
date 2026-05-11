'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/marketing/Hero';
import { StatsBar } from '@/components/marketing/StatsBar';
import { ToolDemo } from '@/components/marketing/ToolDemo';
import { ToolsGrid } from '@/components/marketing/ToolsGrid';
import { FeatureShowcase } from '@/components/marketing/FeatureShowcase';
import { Testimonials } from '@/components/marketing/Testimonials';
import { CTABanner } from '@/components/marketing/CTABanner';
import { FAQ } from '@/components/marketing/FAQ';

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <ToolDemo />
        <ToolsGrid />
        <FeatureShowcase />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
      <FAQ />

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 grid h-12 w-12 place-items-center rounded-full bg-white/90 shadow-premium backdrop-blur-xl border border-white/40 text-dark transition-all duration-300 hover:shadow-premium-xl hover:scale-110 hover:bg-white"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
