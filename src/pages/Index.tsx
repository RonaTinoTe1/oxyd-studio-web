import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectSection } from '@/components/sections/ProjectSection';
import { Footer } from '@/components/sections/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Subtle background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      </div>

      <Navbar />

      <main id="main-content" role="main">
        <HeroSection />
        <ProjectSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
