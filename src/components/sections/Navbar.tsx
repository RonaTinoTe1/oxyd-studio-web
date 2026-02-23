import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollTo, scrollToTop } from '@/hooks/useScrollTo';

// Hick's Law: Zero navigation choices. Logo + ONE action.
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const scrollTo = useScrollTo();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none"
      >
        Aller au contenu principal
      </a>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-inset-top ${
          scrolled ? 'glass-nav' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            <a
              href="#"
              className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              aria-label="OXYD Studio - Retour à l'accueil"
            >
              <span className="text-xl font-bold text-foreground tracking-tight">
                OXYD
              </span>
            </a>

            <Button
              size="sm"
              className="h-9 px-4 text-sm font-semibold group"
              onClick={() => scrollTo('contact')}
            >
              <span className="hidden sm:inline">Réserver mon diagnostic gratuit</span>
              <span className="sm:hidden">Diagnostic gratuit</span>
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
