import { ArrowLeft, Shield, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-foreground tracking-tight">
              OXYD
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mentions Légales</h1>
            <p className="text-muted-foreground">Dernière mise à jour : Février 2026</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Éditeur du site</h2>
            <div className="glass-card p-6 rounded-xl space-y-2">
              <p className="text-foreground font-medium">Oxyd Studio</p>
              <p className="text-muted-foreground">Forme juridique : [À compléter]</p>
              <p className="text-muted-foreground">SIRET : [À compléter]</p>
              <p className="text-muted-foreground">Capital social : [À compléter]</p>
              <p className="text-muted-foreground">Adresse : [À compléter]</p>
              <p className="text-muted-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                contact@oxyd.studio
              </p>
              <p className="text-muted-foreground">Directeur de la publication : [À compléter]</p>
              <p className="text-xs text-muted-foreground/60 mt-3 pt-3 border-t border-border/30">
                ⚠️ Ces informations légales doivent être complétées avant mise en production.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Hébergement</h2>
            <div className="glass-card p-6 rounded-xl space-y-2">
              <p className="text-muted-foreground">
                Le site est hébergé par Lovable (GPT Engineer, Inc.)
              </p>
              <p className="text-muted-foreground">
                Adresse : San Francisco, CA, États-Unis
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Propriété intellectuelle</h2>
            <p className="text-muted-foreground leading-relaxed">
              L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) 
              est la propriété exclusive d'Oxyd Studio, à l'exception des marques, logos ou 
              contenus appartenant à d'autres sociétés partenaires ou auteurs.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Toute reproduction, distribution, modification, adaptation, retransmission ou 
              publication, même partielle, de ces différents éléments est strictement interdite 
              sans l'accord exprès par écrit d'Oxyd Studio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Limitation de responsabilité</h2>
            <p className="text-muted-foreground leading-relaxed">
              Oxyd Studio ne pourra être tenu responsable des dommages directs et indirects 
              causés au matériel de l'utilisateur, lors de l'accès au site, et résultant soit 
              de l'utilisation d'un matériel ne répondant pas aux spécifications techniques 
              requises, soit de l'apparition d'un bug ou d'une incompatibilité.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Les informations contenues sur ce site sont aussi précises que possible et le 
              site remis à jour à différentes périodes de l'année, mais peut toutefois 
              contenir des inexactitudes ou des omissions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Droit applicable</h2>
            <p className="text-muted-foreground leading-relaxed">
              Le présent site est soumis au droit français. En cas de litige, les tribunaux 
              français seront seuls compétents.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pour toute question ou demande d'information concernant le site, ou tout 
              signalement de contenu ou d'activités illicites, l'utilisateur peut contacter 
              l'éditeur à l'adresse email suivante : contact@oxyd.studio
            </p>
          </section>

        </div>
      </main>

      {/* Footer simple */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Oxyd Studio — Paris, France
            </p>
            <div className="flex gap-6">
              <Link to="/mentions-legales" className="text-sm text-primary">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
