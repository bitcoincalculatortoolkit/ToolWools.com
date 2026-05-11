import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/marketing/Hero';
import { ToolsExplorer } from '@/components/marketing/ToolsExplorer';
import { FeatureShowcase } from '@/components/marketing/FeatureShowcase';
import { StatsStrip } from '@/components/marketing/StatsStrip';
import { CTASection } from '@/components/marketing/CTASection';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <ToolsExplorer />
        <FeatureShowcase />
        <StatsStrip />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
