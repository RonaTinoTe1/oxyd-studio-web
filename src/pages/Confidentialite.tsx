import { ArrowLeft, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Confidentialite() {
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
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Politique de Confidentialité</h1>
            <p className="text-muted-foreground">Dernière mise à jour : Février 2026</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Oxyd Studio s'engage à protéger la vie privée des utilisateurs de son site. 
              Cette politique de confidentialité explique comment nous collectons, utilisons, 
              stockons et protégeons vos données personnelles conformément au Règlement Général 
              sur la Protection des Données (RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Responsable du traitement</h2>
             <div className="glass-card p-6 rounded-xl space-y-2">
               <p className="text-foreground font-medium">Oxyd Studio — [Forme juridique à compléter]</p>
               <p className="text-muted-foreground">SIRET : [À compléter]</p>
               <p className="text-muted-foreground">Adresse : [À compléter]</p>
               <p className="text-muted-foreground flex items-center gap-2">
                 <Mail className="w-4 h-4" />
                 contact@oxyd.studio
               </p>
               <p className="text-muted-foreground text-xs text-muted-foreground/70 mt-3">
                 Délégué à la Protection des Données : dpo@oxyd.studio
               </p>
               <p className="text-xs text-muted-foreground/60 mt-3 pt-3 border-t border-border/30">
                 ⚠️ Ces informations légales doivent être complétées avant mise en production.
               </p>
             </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Données collectées</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Nous pouvons collecter les données suivantes :
            </p>
            <ul className="space-y-2">
              <li className="text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Données d'identification :</strong> nom, prénom, adresse email professionnelle</span>
              </li>
              <li className="text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Données de contact :</strong> nom de l'entreprise, site web</span>
              </li>
              <li className="text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-foreground">Données de navigation :</strong> adresse IP, type de navigateur, pages visitées</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Finalités du traitement</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Vos données sont collectées pour les finalités suivantes :
            </p>
            <ul className="space-y-2">
              <li className="text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Répondre à vos demandes de diagnostic et de contact</span>
              </li>
              <li className="text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Vous fournir les services demandés</span>
              </li>
              <li className="text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Améliorer notre site et nos services</span>
              </li>
              <li className="text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Respecter nos obligations légales</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Base légale du traitement</h2>
            <p className="text-muted-foreground leading-relaxed">
              Le traitement de vos données repose sur votre consentement explicite lors de 
              la soumission du formulaire de contact, ainsi que sur notre intérêt légitime 
              à répondre à vos demandes et à améliorer nos services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Durée de conservation</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vos données personnelles sont conservées pendant une durée maximale de 3 ans 
              à compter de votre dernière interaction avec nous, sauf obligation légale 
              de conservation plus longue.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Vos droits</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <div className="glass-card p-6 rounded-xl">
              <ul className="space-y-2">
                <li className="text-muted-foreground">• <strong className="text-foreground">Droit d'accès :</strong> obtenir une copie de vos données</li>
                <li className="text-muted-foreground">• <strong className="text-foreground">Droit de rectification :</strong> corriger vos données inexactes</li>
                <li className="text-muted-foreground">• <strong className="text-foreground">Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li className="text-muted-foreground">• <strong className="text-foreground">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                <li className="text-muted-foreground">• <strong className="text-foreground">Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                <li className="text-muted-foreground">• <strong className="text-foreground">Droit de retirer votre consentement :</strong> à tout moment</li>
              </ul>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Pour exercer ces droits, contactez-nous à : contact@oxyd.studio
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Sécurité des données</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
              pour protéger vos données personnelles contre tout accès non autorisé, 
              modification, divulgation ou destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">9. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Notre site peut utiliser des cookies pour améliorer votre expérience de 
              navigation. Vous pouvez configurer votre navigateur pour refuser les cookies, 
              bien que cela puisse affecter certaines fonctionnalités du site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">10. Réclamation</h2>
            <p className="text-muted-foreground leading-relaxed">
              Si vous estimez que le traitement de vos données personnelles constitue une 
              violation du RGPD, vous avez le droit d'introduire une réclamation auprès de 
              la CNIL (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">11. Modifications</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nous nous réservons le droit de modifier cette politique de confidentialité 
              à tout moment. Les modifications prennent effet dès leur publication sur le site.
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
              <Link to="/mentions-legales" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="text-sm text-primary">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
