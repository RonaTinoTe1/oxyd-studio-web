import { Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer
      className="relative py-12 border-t border-border/30 safe-area-inset-bottom"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-muted-foreground">
          <a
            href="mailto:contact@oxyd.studio"
            className="inline-flex items-center gap-2 text-sm hover:text-foreground transition-colors"
            aria-label="Email us at contact@oxyd.studio"
          >
            <Mail className="w-4 h-4" />
            <span>contact@oxyd.studio</span>
          </a>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/RonaTinoTe1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href="https://x.com/oxydstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="Twitter / X"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
