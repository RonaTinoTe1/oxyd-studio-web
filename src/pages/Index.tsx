import { lazy, Suspense } from 'react';
import { Navbar, HeroSection, Footer } from '@/components/sections';
import { Brain, Clock, Zap, Target } from 'lucide-react';

// Lazy load below-the-fold sections for better initial bundle size
const TensionSection = lazy(() => import('@/components/sections/TensionSection').then(m => ({ default: m.TensionSection })));
const SolutionSection = lazy(() => import('@/components/sections/SolutionSection').then(m => ({ default: m.SolutionSection })));
const MetricsSection = lazy(() => import('@/components/sections/MetricsSection').then(m => ({ default: m.MetricsSection })));
const ProcessSection = lazy(() => import('@/components/sections/ProcessSection').then(m => ({ default: m.ProcessSection })));
const DifferentiationSection = lazy(() => import('@/components/sections/DifferentiationSection').then(m => ({ default: m.DifferentiationSection })));
const AntiProfileSection = lazy(() => import('@/components/sections/AntiProfileSection').then(m => ({ default: m.AntiProfileSection })));
const GuaranteeSection = lazy(() => import('@/components/sections/GuaranteeSection').then(m => ({ default: m.GuaranteeSection })));
const PricingSection = lazy(() => import('@/components/sections/PricingSection').then(m => ({ default: m.PricingSection })));
const FinalCTASection = lazy(() => import('@/components/sections/FinalCTASection').then(m => ({ default: m.FinalCTASection })));
const ContactSection = lazy(() => import('@/components/sections/ContactSection').then(m => ({ default: m.ContactSection })));
const InsightBreak = lazy(() => import('@/components/sections/InsightBreak').then(m => ({ default: m.InsightBreak })));

// Loading placeholder for sections
const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Subtle background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      </div>

      {/* Main content */}
      <Navbar />

      <main id="main-content" role="main">
        {/* 1. Hero - Hook des 7 secondes (critical - not lazy) */}
        <HeroSection />

        <Suspense fallback={<SectionLoader />}>
          {/* Micro-insight #1 - Récompense variable */}
          <InsightBreak
            icon={Brain}
            stat="3 secondes"
            insight="Trois secondes pour convaincre. Trois secondes pour perdre."
            source="Google / Nielsen Norman Group"
          />

          {/* 2. Tension - Amplifier le problème */}
          <TensionSection />

          {/* Micro-insight #2 */}
          <InsightBreak
            icon={Clock}
            stat="69.8%"
            insight="Près de 7 paniers sur 10 sont abandonnés avant le paiement."
            source="Baymard Institute, 2024"
          />

          {/* 3. Solution - La révélation */}
          <SolutionSection />

          {/* 4. Preuves - Métriques et graphiques */}
          <MetricsSection />

          {/* Micro-insight #3 */}
          <InsightBreak
            icon={Zap}
            stat="24/7"
            insight="L'IA ne dort pas, ne doute pas, ne rate pas. Elle qualifie."
          />

          {/* 5. Méthode - Comment ça marche */}
          <section id="methode">
            <ProcessSection />
          </section>

          {/* 6. Différenciation - Pourquoi nous */}
          <DifferentiationSection />

          {/* Micro-insight #4 */}
          <InsightBreak
            icon={Target}
            stat="1 visiteur sur 2"
            insight="Un prospect qui hésite plus de 10 secondes sans réponse quitte le site définitivement."
            source="Forrester Research"
          />

          {/* 7. Qualification - Anti-profil */}
          <AntiProfileSection />

          {/* 8. Risk Reversal - Garantie de performance */}
          <GuaranteeSection />

          {/* 9. Investissement - Pricing */}
          <PricingSection />

          {/* 10. CTA Final - Passage à l'action */}
          <FinalCTASection />

          {/* 11. Section Contact - Formulaire + Booking */}
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
