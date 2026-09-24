# Portfolio de Charles Vanzetta

Portfolio français / anglais, compatible avec `https://cvanzetta.github.io/Portfolio/`.
React 18 et Vite conservés depuis le projet existant. Les dépendances et le verrou npm d’origine sont préservés ; le site n’importe ni Three.js, ni EmailJS, ni les bibliothèques d’animation. Aucun backend, formulaire d’envoi fictif ou secret côté navigateur.

## Lancer

Avec Node.js 22 et npm, dans ce dossier :

```sh
npm ci
npm run dev
```

Ouvrir l’adresse affichée, avec `/Portfolio/`. Ne pas ouvrir `index.html` par double-clic : les modules demandent un serveur HTTP.

## Vérifier la version de production

```sh
node --test src/algorithms.test.js src/analytics.test.js
npm run build
npm run preview
```

La sortie `dist/` est entièrement statique. Le chemin de base est défini dans `vite.config.js` ; les liens d’ancrage ne demandent aucune réécriture serveur. Images, fonte, favicon et CV sont servis localement.

## Publier

Le push des sources est distinct du déploiement du site. Le dossier historique `docs/` du dépôt est conservé pour ne pas remplacer le site existant pendant cette révision.

1. Les sources sont prévues pour le dépôt `CVanzetta/Portfolio`.
2. Dans les paramètres GitHub du dépôt, **Pages → Source → GitHub Actions**.
3. Un push ou merge sur `main` lance **Publier le portfolio sur GitHub Pages**. Le workflow reste aussi déclenchable manuellement depuis **Actions**.

Le site est construit avec Vite puis le dossier `dist/` est publié. La configuration vise le dépôt `Portfolio` avec cette casse exacte. Le workflow Jekyll concurrent, qui pouvait publier l’ancien contenu, a été supprimé.

## Modifier le contenu

- `src/content.js` : email, liens, études de cas et sélection secondaire.
- `src/main.jsx` : assemblage de la page, projets, loisirs et démonstrations PDF / tri.
- `src/PortfolioExperience.jsx` : accueil avec portrait, navigation par domaines, POC professionnel, accordéons et manifeste.
- `src/DemoVideo.jsx` : lecteur vidéo différé et état « Démo vidéo à venir ».
- `src/editorial.css` : composition du portrait et styles de cette révision.
- `src/style.css` : couleurs, typographie et mises en page adaptatives.
- `src/content.en.js` : traduction anglaise des études de cas et projets secondaires.
- `public/francais.pdf` et `public/Anglais.pdf` : CV téléchargé selon la langue active du portfolio.
- `public/portrait-cutout-v2-{540,900}.webp` : portrait détouré retenu, optimisé en deux tailles (77 / 198 ko). Le PNG source fourni est conservé.

### Vidéos à fournir

Ajouter les enregistrements réels dans `public/videos/` :

- `ai-playwright-demo.mp4` : demande du testeur, utilisation du socle Playwright, résultat et trace éventuelle.
- `algo-visualizer-demo.mp4` : démonstration de l’application Java originale.

WebM est également accepté. Une couverture facultative peut porter le même nom avec l’extension `.webp`, `.png` ou `.jpg`. Les fichiers sont détectés au démarrage / build par `vite.config.js` : **redémarrer le serveur après leur ajout**. Le prochain build GitHub Pages les intégrera automatiquement. Aucun fichier absent n’est demandé ; le lecteur apparaît seulement lorsqu’une vidéo existe. Les vidéos ne démarrent pas automatiquement, sont muettes par défaut et se mettent en pause hors écran. La capture originale reste visible pour AlgoVisualizer en attendant. Le tri interactif se trouve désormais dans cette carte, via « Essayer un tri ».

Pour intégrer la vidéo originale d’ENERVISION : ajouter la vidéo et une image de couverture à `public/`, puis renseigner `enervisionVideo` et `enervisionPoster` dans `src/content.js` (noms relatifs à `public/`). Les deux sont nécessaires. Le lecteur dispose de commandes, reste muet par défaut, se charge à la demande et se met en pause hors écran. Cette branche reste sans média tant que ces champs sont vides.

Le sélecteur FR / EN dans l’en-tête traduit le site, ses démonstrations et le bandeau de consentement. Le choix reste enregistré dans le navigateur et met à jour l’attribut `lang` ainsi que le titre et les métadonnées de la page. L’adresse `?lang=en` ouvre directement la version anglaise. Tous les liens de téléchargement utilisent `francais.pdf` en français et `Anglais.pdf` en anglais.

## Démonstrations et transparence

- **Tri** : vraie exécution JavaScript de Quick Sort, Bubble Sort et Insertion Sort, créée pour le portfolio. L’application Java d’origine n’est pas lancée. Données synthétiques, compteurs calculés, aucun benchmark temporel. L’animation démarre uniquement sur demande, s’arrête en fin de tri, à la sortie de l’écran et lorsque l’onglet devient caché.
- **PDF** : animation d’un contrôle de clause sur un contrat fictif, avec cas manquant puis cas corrigé. L’exemple est identifié comme synthétique ; il n’exécute pas l’OCR ou l’API du projet et ne détermine aucune validité juridique.
- **Snake AI** : animation Canvas pédagogique en boucle : un agent, dézoom sur 500 agents illustratifs, sélection de 100 parents, renouvellement. La pomme reste en place jusqu’au passage de la tête du serpent. Le script original utilise 100 agents et conserve 20 %. Pause, étapes manuelles, arrêt hors écran et préférence de mouvement réduit pris en charge. Aucun modèle entraîné ne joue dans la page.
- **ENERVISION** : schéma du rôle personnel confirmé par Charles ; pas de bouton vers un service arrêté.
- **POC IA professionnel** : présentation narrative fondée sur les précisions de Charles, sans code interne, capture fabriquée ni performances inventées.

## Références et limites

Voir `docs/SOURCES.md` pour les sources, les corrections de l’ancien portfolio et les informations manquantes. Voir [la révision du 24 septembre](docs/EXPERIENCE-2026-09.md) pour les derniers contrôles et `docs/VERIFICATIONS.md` pour l’historique.

Les crédits et la licence de la base d’origine sont conservés dans `ORIGINAL-LICENSE.md`. La capture AlgoVisualizer vient du dépôt de ce projet ; elle n’a pas été recréée. Space Mono provient des fichiers du portfolio existant. IBM Plex Mono est embarquée localement pour l’accueil ; sa licence est conservée dans `docs/IBM-PLEX-LICENSE.txt`.

## Google Analytics

L’identifiant GA4 public `G-DKNH9QNFVC` est configuré dans le site. Le script Google se charge uniquement après le choix « Accepter » du bandeau de consentement. Il n’est pas nécessaire d’ajouter la balise `gtag.js` dans `index.html`.

Pour utiliser un autre identifiant, définir `VITE_GA_MEASUREMENT_ID` dans les variables GitHub Actions ou dans un fichier `.env.local`, puis reconstruire le site.

Refuser est proposé au même niveau. Le lien « Confidentialité & cookies » permet de modifier son choix ; le retrait désactive la collecte, efface les cookies GA accessibles puis recharge la page. Choix conservé 180 jours. Fonctions publicitaires désactivées. La collecte réelle n’a pas été vérifiée dans la propriété GA4.

## Direction visuelle de la révision

Vert profond et vert clair sur papier chaud, sans année dans la signature. Grand portrait détouré entre « FULLSTACK / DEVELOPER » et « APPLIED AI », avec composition simplifiée sur mobile. Bebas Neue produit les grandes lettres hautes et condensées qui traversent le portrait, tandis qu’IBM Plex Mono conserve le registre code de la présentation. La présentation contient une ligne typographique animée, figée si la réduction des mouvements est active. Navigation par domaines synchronisée au scroll. Le POC compact distingue le socle existant, le prototype, la contribution transverse et le parcours cible dans un accordéon ; AlgoVisualizer porte le numéro 03 et affiche directement le tri interactif. Une vraie vidéo apparaîtra comme mode supplémentaire lorsqu’elle sera fournie. Le manifeste conserve ses trois étapes et sa grande flèche.
