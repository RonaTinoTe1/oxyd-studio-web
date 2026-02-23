

# Audit de coherence et mise en ligne du site OXYD

## Problemes identifies

### 1. Incoherences dans les chiffres et le ton

- **index.html** : Le title, les meta descriptions, Open Graph et JSON-LD disent encore "Multipliez vos conversions par 3" et "47 000 EUR/an" -- ca contredit tout le travail de credibilite fait sur le site
- **TensionSection** : Affiche encore "-47 000 EUR/an*" dans la premiere carte, alors qu'on a retire ce chiffre du Hero car il manquait de contexte
- **Index.tsx** : Le micro-insight #4 mentionne encore "~130 EUR/jour" (qui vient du calcul 47 000/365) -- meme probleme
- **Truismes dupliques** : Le Hero ET la TensionSection commencent tous les deux par "Vous avez du trafic." -- effet de repetition qui casse la progression

### 2. Donnees qui ressemblent a du faux

- **MetricsSection** : Les "objectifs types par secteur" sont presentes en format avant/apres (barre, fleche vers le haut) ce qui donne l'impression de vrais resultats clients alors qu'il n'y en a pas encore
- Le compteur "3x" dans les metriques contredit le "x2 a x3" de la SolutionSection

### 3. Formulaire non fonctionnel

- Le formulaire de contact fait un `setTimeout` de 1.5s puis affiche "Demande envoyee" sans rien envoyer -- pas acceptable pour la mise en ligne

---

## Plan d'action

### Etape 1 : Corriger index.html (meta, OG, JSON-LD)

Remplacer toutes les mentions de "Multipliez vos conversions par 3" et "47 000 EUR" par un message coherent avec le nouveau ton :
- Title : "Oxyd Studio | Votre site attire du monde. On le fait vendre."
- Description : "Votre site a du trafic mais ne convertit pas assez. On installe un systeme de conversion mesurable. Diagnostic gratuit de 30 min."
- Mettre a jour OG, Twitter et JSON-LD en coherence

### Etape 2 : Nettoyer la TensionSection

- Remplacer "-47 000 EUR/an*" par une formulation relative ("Jusqu'a 50% de votre CA potentiel perdu") plus credible sans chiffre absolu invente
- Varier les truismes pour eviter la repetition avec le Hero

### Etape 3 : Corriger le micro-insight #4 dans Index.tsx

- Remplacer "~130 EUR/jour" par une stat generique credible ou un message qualitatif sans chiffre invente

### Etape 4 : Harmoniser les metriques

- Dans MetricsSection : changer le "3x" en "x2-3" pour etre coherent avec SolutionSection
- Reformuler les case studies pour qu'ils soient clairement presentes comme des "objectifs types" et non des resultats obtenus

### Etape 5 : Rendre le formulaire fonctionnel

- Ajouter un envoi reel par `mailto:` ou par un service gratuit comme Formspree/Web3Forms (pas besoin de backend)
- Alternative : integration avec un lien `mailto:` en attendant un service de formulaire

### Etape 6 : Mise en ligne

- Cliquer sur "Publier" dans Lovable pour deployer le site
- Le site sera accessible sur votre sous-domaine Lovable (ex: oxyd.lovable.app)

### Etape 7 : Connecter votre domaine Namecheap

Pour connecter votre nom de domaine achete sur Namecheap :

1. Dans Lovable : aller dans les **Parametres du projet** puis l'onglet **Domaines**
2. Cliquer sur **Connecter un domaine** et entrer votre nom de domaine (ex: oxyd.studio)
3. Lovable vous donnera des enregistrements DNS a ajouter
4. Dans **Namecheap** : aller dans Domain List, cliquer sur "Manage" sur votre domaine, puis "Advanced DNS"
5. Ajouter les enregistrements suivants :
   - **A Record** pour `@` pointant vers `185.158.133.1`
   - **A Record** pour `www` pointant vers `185.158.133.1`
   - **TXT Record** `_lovable` avec la valeur fournie par Lovable
6. Attendre la propagation DNS (quelques minutes a 72h)
7. Le SSL (https) sera provisionne automatiquement

---

## Resume des fichiers modifies

| Fichier | Modification |
|---|---|
| index.html | Meta, title, OG, Twitter, JSON-LD |
| TensionSection.tsx | Chiffres + truismes |
| Index.tsx | Micro-insight #4 |
| MetricsSection.tsx | Compteur 3x et presentation case studies |
| ContactSection.tsx | Envoi reel du formulaire |

