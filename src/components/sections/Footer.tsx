import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

// Hick's Law: Footer = legal obligation only. No navigation choices.

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative py-12 border-t border-border/50 safe-area-inset-bottom"
      role="contentinfo"
      aria-label="Pied de page"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-foreground tracking-tight" aria-hidden="true">OXYD</span>
            <span className="text-sm text-muted-foreground">© {currentYear} Oxyd Studio</span>
          </div>

          <a
            href="mailto:contact@oxyd.studio"
            className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            aria-label="Nous contacter par email à contact@oxyd.studio"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            contact@oxyd.studio
          </a>

          <nav aria-label="Liens légaux" className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link
              to="/mentions-legales"
              className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              Mentions légales
            </Link>
            <Link
              to="/confidentialite"
              className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              Confidentialité
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
