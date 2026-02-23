import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { CheckCircle2, Mail, User, MessageSquare, Send, Shield, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { MagneticButton } from '@/components/effects/MagneticButton';

// Hick's Law: ONE form. No alternatives. No Calendly placeholder. Just act.
// Using Netlify Forms for reliable form handling

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setHasError(false);
  };

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir votre nom et email.",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setHasError(false);

    try {
      // Submit to Netlify Forms
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          ...formData,
          message: formData.message || "Demande de diagnostic gratuit"
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Demande envoyée !",
          description: "Nous vous recontactons sous 24h."
        });
        // Reset form
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        throw new Error('Erreur serveur');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setHasError(true);
      toast({
        title: "Erreur d'envoi",
        description: "Veuillez réessayer ou nous contacter par email.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`Diagnostic Oxyd — ${formData.name || 'Nouveau contact'}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\nSite: ${formData.company}\nMessage: ${formData.message || 'Demande de diagnostic gratuit'}`
    );
    window.location.href = `mailto:contact@oxyd.studio?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
      <motion.div
        className="absolute top-20 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">

        <motion.div
          ref={ref}
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Réservez votre diagnostic{' '}
            <motion.span
              className="text-primary"
              animate={isInView ? { textShadow: ['0 0 0px transparent', '0 0 15px rgba(37, 99, 235, 0.4)', '0 0 0px transparent'] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
            >
              gratuit
            </motion.span>
          </motion.h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            30 minutes pour identifier votre potentiel de croissance.
          </p>
        </motion.div>

        {/* ONE form. Centered. Maximum focus. */}
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"
              animate={{ opacity: focusedField ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {isSubmitted ? (
              <motion.div
                className="text-center py-8 relative z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Demande reçue !</h3>
                <p className="text-muted-foreground">Nous vous recontactons sous 24h.</p>
                <Button
                  variant="ghost"
                  className="mt-4 text-primary"
                  onClick={() => setIsSubmitted(false)}
                >
                  Envoyer une autre demande
                </Button>
              </motion.div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-4 relative z-10"
              >
                {/* Honeypot field for spam protection */}
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don't fill this out if you're human:
                    <input name="bot-field" />
                  </label>
                </p>

                <motion.div
                  className="space-y-2"
                  animate={{ scale: focusedField === 'name' ? 1.01 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="name" className="text-foreground">Nom complet *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Jean Dupont"
                      className="pl-10"
                      required
                      aria-required="true"
                      autoComplete="name"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  animate={{ scale: focusedField === 'email' ? 1.01 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="email" className="text-foreground">Email professionnel *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="jean@entreprise.com"
                      className="pl-10"
                      required
                      aria-required="true"
                      autoComplete="email"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  animate={{ scale: focusedField === 'company' ? 1.01 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="company" className="text-foreground">Site web</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="www.votre-site.com"
                    autoComplete="url"
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  animate={{ scale: focusedField === 'message' ? 1.01 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label htmlFor="message" className="text-foreground">Message (optionnel)</Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Votre situation actuelle..."
                      className="pl-10 min-h-[80px]"
                    />
                  </div>
                </motion.div>

                {/* Error state with fallback option */}
                {hasError && (
                  <motion.div
                    className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                    <div className="flex-1 text-sm">
                      <p className="text-destructive font-medium">Erreur d'envoi</p>
                      <button
                        type="button"
                        onClick={handleMailtoFallback}
                        className="text-primary hover:underline"
                      >
                        Envoyer par email →
                      </button>
                    </div>
                  </motion.div>
                )}

                <MagneticButton strength={0.15} className="w-full">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full h-12 group relative overflow-hidden"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                      />
                      {isSubmitting ? (
                        <motion.span
                          className="flex items-center justify-center"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Envoi en cours...
                        </motion.span>
                      ) : (
                        <span className="relative z-10 flex items-center justify-center">
                          Réserver mon diagnostic gratuit
                          <Send className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </MagneticButton>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
                  <Shield className="w-3 h-3 text-primary/60" aria-hidden="true" />
                  <span>Aucun spam · Réponse sous 24h</span>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
