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
  return (
    <>
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
    </>
  );
}
