import { useState, useEffect } from 'react';
import { scrollToTop } from '@/hooks/useScrollTo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
        Skip to content
      </a>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-inset-top ${
          scrolled ? 'glass-nav' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-center">
            <a
              href="#"
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              aria-label="OXYD Studio - Back to top"
            >
              <span className="text-sm font-medium text-muted-foreground tracking-widest hover:text-foreground transition-colors">
                OXYD
              </span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
