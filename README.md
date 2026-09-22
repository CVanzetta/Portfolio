# Portfolio de Charles Vanzetta

Portfolio en français, compatible avec `https://cvanzetta.github.io/Portfolio/`.
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

## Publier, lorsque vous le décidez

Le push des sources est distinct du déploiement du site. Le dossier historique `docs/` du dépôt est conservé pour ne pas remplacer le site existant pendant cette révision.

1. Les sources sont prévues pour le dépôt `CVanzetta/Portfolio`.
2. Dans les paramètres GitHub du dépôt, **Pages → Source → GitHub Actions**.
3. Dans **Actions**, lancer manuellement **Publier le portfolio sur GitHub Pages**.

Le workflow fourni n’est déclenché que manuellement. Une simple mise à jour des sources ne publie pas le site. La configuration vise le dépôt `Portfolio` avec cette casse exacte. Aucun workflow distant n’a été exécuté ou testé depuis cette livraison.

## Modifier le contenu

- `src/content.js` : email, liens, études de cas et sélection secondaire.
- `src/main.jsx` : présentation, expérience professionnelle, POC IA, loisirs et composants des démonstrations.
- `src/style.css` : couleurs, typographie et mises en page adaptatives.
- `public/CV-Charles-Vanzetta.pdf` : CV original fourni, inchangé.
- `public/portrait.webp` : portrait fourni pour l’accueil, optimisé pour le web.

Pour intégrer la vidéo originale d’ENERVISION : ajouter la vidéo et une image de couverture à `public/`, puis renseigner `enervisionVideo` et `enervisionPoster` dans `src/content.js` (noms relatifs à `public/`). Les deux sont nécessaires. Le lecteur dispose de commandes, reste muet par défaut, se charge à la demande et se met en pause hors écran. Cette branche reste sans média tant que ces champs sont vides.

## Démonstrations et transparence

- **Tri** : vraie exécution JavaScript de Quick Sort, Bubble Sort et Insertion Sort, créée pour le portfolio. L’application Java d’origine n’est pas lancée. Données synthétiques, compteurs calculés, aucun benchmark temporel. L’animation démarre uniquement sur demande, s’arrête en fin de tri, à la sortie de l’écran et lorsque l’onglet devient caché.
- **PDF** : vérification locale d’une présence de texte, inspirée de `Tests.json`. L’exemple est identifié comme synthétique ; il n’exécute pas l’OCR ou l’API du projet.
- **Snake AI** : animation Canvas pédagogique en boucle : un agent, dézoom sur 500 agents illustratifs, sélection de 100 parents, renouvellement. Le script original utilise 100 agents et conserve 20 %. Pause, étapes manuelles, arrêt hors écran et préférence de mouvement réduit pris en charge. Aucun modèle entraîné ne joue dans la page.
- **ENERVISION** : schéma du rôle personnel confirmé par Charles ; pas de bouton vers un service arrêté.
- **POC IA professionnel** : présentation narrative fondée sur les précisions de Charles, sans code interne, capture fabriquée ni performances inventées.

## Références et limites

Voir `docs/SOURCES.md` pour les sources, les corrections de l’ancien portfolio et les informations manquantes. Voir `docs/VERIFICATIONS.md` pour le compte rendu des contrôles réellement effectués.

Les crédits et la licence de la base d’origine sont conservés dans `ORIGINAL-LICENSE.md`. La capture AlgoVisualizer vient du dépôt de ce projet ; elle n’a pas été recréée. Space Mono provient des fichiers du portfolio existant.

## Google Analytics (désactivé par défaut)

Aucun identifiant GA4 n’a été fourni : aucun script Google ni bandeau de consentement n’est chargé. Pour activer plus tard :

1. Créer une propriété GA4 et un flux Web, puis récupérer l’identifiant `G-…`.
2. Dans GitHub, Settings → Secrets and variables → Actions → Variables, définir `VITE_GA_MEASUREMENT_ID` avec cet identifiant public.
3. Relancer manuellement le workflow Pages. Pour travailler localement, copier `.env.example` en `.env.local`, renseigner la même variable puis reconstruire.

Une fois configuré, Google n’est chargé qu’après « Accepter ». Refuser est proposé au même niveau. Le lien « Confidentialité & cookies » permet de modifier son choix ; le retrait désactive la collecte, efface les cookies GA accessibles puis recharge la page. Choix conservé 180 jours. Fonctions publicitaires désactivées. Aucun test de collecte réelle n’a été effectué faute de propriété GA4.

## Direction visuelle de la révision

Bleu cobalt et bleu clair sur papier chaud, sans année dans la signature. Portrait à l’accueil avec une légère perspective CSS (pas un modèle 3D). Photo extérieure retirée. La future photo de badminton pourra être intégrée lorsqu’elle sera fournie.
