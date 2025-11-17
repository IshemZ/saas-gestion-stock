# Landing page – SaaS de gestion des stocks pour restaurateurs

Ce document structure la conception de la landing page pour un produit SaaS qui aide les restaurateurs à mieux gérer leurs stocks, anticiper les ruptures et maximiser leur marge. Il sert de référence pour le copywriting, le design, le tracking et l’A/B testing.

## Objectifs

- Convertir des visiteurs en inscrits (lead ou essai gratuit) via un seul CTA.
- Expliquer clairement la proposition de valeur en 1 phrase.
- Rassurer avec bénéfices concrets, preuves sociales et informations de paiement.
- Optimiser pour le mobile et la vitesse (Core Web Vitals) et préparer l’A/B testing.

## Persona (cible principale)

- Profil: Gérant·e de restaurant indépendant, petite chaîne (1–10 établissements).
- Douleurs actuelles: ruptures imprévues, surstocks périssables, inventaires longs et manuels, visibilité limitée sur la marge.
- Motivations: anticiper les commandes, réduire les pertes, gagner du temps, piloter la marge en temps réel.

## Proposition de valeur (one‑liner)

« Anticipez les ruptures et réduisez le gaspillage: l’outil simple qui automatise vos inventaires et optimise vos commandes pour protéger votre marge. »

## Promesse et bénéfices (pas des features)

- Anticipation: prévenir les ruptures grâce aux alertes et prévisions.
- Économie: moins de surstocks et de pertes sur produits périssables.
- Temps: inventaires 2× plus rapides, commandes préparées en 1 clic.
- Sérénité: visibilité claire sur les coûts, marge et écarts.

## Appel à l’action (unique sur la page)

- CTA principal: « Commencer mon essai gratuit » ou « Rejoindre la liste d’attente » (selon phase produit).
- Lien d’ancrage identique répété aux sections clés (hero et mid‑page).
- Tracking événement: `cta_click` (voir plan de tracking plus bas).

## Structure de la page

1. Hero (au‑dessus de la ligne de flottaison)

  — Accroche (H1) = proposition de valeur en 1 phrase
  — Sous‑titre orienté bénéfices
  — Visuel produit (mockup dashboard mobile/desktop)
  — CTA unique

1. Bénéfices/Douleurs

  — 3–5 bénéfices concrets reliés aux douleurs du persona

1. CTA répété

1. Preuve sociale

  — Témoignages, note moyenne, logos clients, ou chiffres clés

1. Fonctionnalités (secondaires par rapport aux bénéfices)

  — Liste courte et claire (alertes, prévisions, inventaires mobiles, intégrations…)

1. FAQ + Rassurance paiement

  — Essai gratuit, annulation, sécurité, méthode de paiement

1. Footer

  — Mentions, contact, liens légaux

## Brouillon de copywriting (base à itérer)

### Hero

- H1: « Moins de ruptures, moins de pertes. Plus de marge. »
- Sous‑titre: « Gérez vos stocks en 10 minutes par jour avec des alertes intelligentes et des prévisions qui vous aident à commander juste ce qu’il faut. »
- CTA: « Commencer mon essai gratuit »

### Bénéfices

- « Anticipez les ruptures »: recevez des alertes avant qu’un produit critique manque.
- « Réduisez le gaspillage »: évitez les surstocks sur les produits périssables.
- « Gagnez du temps »: inventaire mobile, commandes pré‑remplies, moins d’erreurs.
- « Suivez votre marge »: visualisez vos coûts matières et écart réels.

### Preuve sociale

- Témoignage 1 (chef/gerant): « Nous avons réduit nos ruptures de 40% en 6 semaines. »
- Témoignage 2: « 2h gagnées chaque semaine sur l’inventaire et les commandes. »
- Chiffres: « +120 restaurants inscrits » (à adapter dès que disponible).

### Fonctionnalités

- Alertes de stocks bas et prévisions de consommation.
- Inventaires sur mobile, lecture code‑barres.
- Commandes fournisseurs semi‑automatiques, export en 1 clic.
- Intégrations POS/ERP (à préciser selon roadmap).
- Rapports coût matière et marge.

### FAQ (exemples)

- « Puis‑je annuler à tout moment ? » Oui.
- « Comment je paie ? » Par carte bancaire via Stripe (paiement sécurisé).
- « Un essai gratuit est‑il disponible ? » Oui, sans CB / avec CB (à définir).
- « Mes données sont‑elles sécurisées ? » Oui, chiffrage en transit et au repos (à préciser techniquement).

## Paiement

- Afficher une section prix simple (1 offre au lancement pour limiter la friction).
- Proposer un lien/bouton vers Stripe Checkout ou un formulaire de paiement hébergé.
- Mentionner la sécurité et la possibilité d’annuler.
- Si pré‑lancement: remplacer par « Rejoindre la liste d’attente » + collecte d’e‑mail.

## Tracking et analytics

- Outils possibles: Google Analytics 4 via Google Tag Manager, ou Plausible/Umami pour simplicité et respect vie privée.
- Événements:
  - `page_view`: page affichée
  - `cta_view`: CTA visible (optionnel via IntersectionObserver)
  - `cta_click`: clic sur bouton principal
  - `signup_start`: début formulaire
  - `signup_submit`: formulaire soumis
  - `checkout_start` / `checkout_complete` (si Stripe)
- Conversions principales: `cta_click` → `signup_submit`.
- UTMs: définir `utm_source`, `utm_medium`, `utm_campaign` pour chaque canal.

## A/B testing

- Objectif: améliorer le CTR du CTA et le taux d’inscription.
- Variables à tester (une par test):
  - Accroche H1 (ex: bénéfice « marge » vs « ruptures »)
  - Libellé CTA (ex: « Essai gratuit » vs « Découvrir la démo »)
  - Preuve sociale (témoignages vs métriques)
  - Section bénéfices (ordre, formulation)
- Méthode:
  - Split 50/50 du trafic (ex: via GrowthBook, Vercel Edge, ou GTM + redirection serverless).
  - Définir une hypothèse, une métrique primaire (CTR CTA ou `signup_submit`) et une durée fixe.
  - Taille d’échantillon: viser ≥ 400–800 conversions par variante pour des effets modestes; ajuster selon le trafic.
- Gouvernance des tests: 1 test à la fois sur la même métrique primaire.

## Performance et mobile-first

- Cibles Core Web Vitals: LCP < 2,5s, CLS < 0,1, INP < 200ms.
- Pratiques:
  - Images optimisées (`<picture>`, WebP/AVIF), lazy‑loading below the fold.
  - CSS critique inline, police système (éviter grosses webfonts).
  - Bundle minimal (pas de framework lourd si inutile).
  - Composants accessibles, tailles tactiles ≥ 44px, contrastes AA.

## KPI de succès

- CTR du CTA (hero et répété)
- Taux d’inscription (`signup_submit` / sessions)
- Coût par lead (si acquisition payante)
- Temps de chargement (LCP) et taux de rebond mobile

## Checklist de mise en ligne

- [ ] Domaine et HTTPS configurés
- [ ] Pixel/GA4/GTM/Plausible en place
- [ ] Événements et conversions testés
- [ ] Variantes A/B validées et planifiées
- [ ] Textes relus et témoignages approuvés
- [ ] Images compressées, métas SEO/Social (OpenGraph/Twitter) ajoutées

## Prochaines étapes (tech)

- Choix du stack statique et léger (ex: Astro ou Next.js + images optimisées).
- Intégrer un outil d’analytics (GA4/GTM ou Plausible) et une solution A/B (GrowthBook).
- Mettre en place Stripe Checkout si la vente est active; sinon, collecte d’e‑mails (waitlist).
Implémenter la page unique avec ancrages CTA et suivre le plan de tracking.

## Copy finale pour la landing page

### Accroche (H1)

Fini les ruptures. Fini le gaspillage. Plus de marge.

### Sous‑titre (Hero)

L’outil simple qui anticipe vos besoins et automatise l’inventaire pour commander juste ce qu’il faut — en 10 minutes par jour.

### Douleurs et bénéfices

#### Douleurs

- Ruptures imprévues qui déçoivent les clients.
- Surstocks périssables qui grignotent la marge.
- Inventaires longs, erreurs de saisie et fichiers épars.
- Visibilité limitée: coûts matière flous, écarts non expliqués.

#### Bénéfices attendus

- Anticipation des commandes grâce aux alertes et prévisions.
- Réduction du gaspillage, marge protégée et maîtrisée.
- Inventaires 2× plus rapides, moins d’erreurs et de saisie.
- Décisions pilotées par des chiffres clairs (CM, marge, écarts).

### Fonctionnalités clés

- Alertes de stock bas et prévisions de consommation.
- Inventaire mobile avec lecture de codes‑barres.
- Commandes fournisseurs pré‑remplies et export en 1 clic.
- Intégrations POS/ERP (à préciser selon votre stack).
- Tableaux de bord coût matière et marge.
- Multi‑établissements et gestion des rôles.

## Hébergement gratuit avec GitHub Pages (Option B)

Super simple si la landing est déjà codée en HTML/CSS/JS statiques.

### Étapes rapides

1. Créer un dépôt sur GitHub (public de préférence pour Pages).
2. Uploader vos fichiers (ex: `index.html`, `styles.css`, `assets/`).
3. Aller dans `Settings` → `Pages`.
4. Source: choisir la branche `main` et le dossier `/root`.
5. GitHub fournit une URL publique après le build.
6. Connecter un domaine:

  — Si sous‑domaine (ex: `www.mondomaine.com`): ajouter un enregistrement DNS `CNAME` → `<username>.github.io`.

  — Si domaine racine (ex: `mondomaine.com`): ajouter 4 enregistrements `A` vers: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.

1. (Optionnel) Ajouter un fichier `CNAME` à la racine du dépôt contenant votre domaine (ex: `www.mondomaine.com`).
1. Dans `Settings` → `Pages`, activer « Enforce HTTPS » lorsque disponible.

Propagation DNS: cela peut prendre de quelques minutes à 24h selon votre registrar.

### Commandes utiles (macOS/zsh)

Initialiser le dépôt local et pousser sur GitHub:

```zsh
git init
git add .
git commit -m "chore: initial landing"
# Créer le repo via l'UI GitHub OU avec GitHub CLI (si installé):
# gh repo create <owner>/<repo> --public --source=. --remote=origin --push
git remote add origin git@github.com:<owner>/<repo>.git
git branch -M main
git push -u origin main
```

Ajouter le fichier `CNAME` (si domaine custom):

```zsh
echo "www.mondomaine.com" > CNAME
git add CNAME && git commit -m "chore(pages): add CNAME"
git push
```

Vérifier la résolution DNS (remplacez par votre domaine/username):

```zsh
dig +short www.mondomaine.com CNAME
dig +short mondomaine.com A
```

### Notes pratiques

- Pour une « User/Org Page » (repo nommé `<username>.github.io`), le site vit à cette URL par défaut.
- Pour une « Project Page » (repo classique), l’URL sera de la forme `<username>.github.io/<repo>` si pas de domaine custom.
- Si vous utilisez un bundler (Vite/Next/Astro), publiez des fichiers statiques dans la branche/dossier configuré par Pages (ex: `dist` → `main`/`root` ou `docs`).
