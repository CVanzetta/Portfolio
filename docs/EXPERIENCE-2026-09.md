# Révision du 24 septembre 2026

Ce compte rendu concerne le portrait et la narration du portfolio. Il complète les vérifications historiques de `VERIFICATIONS.md`.

## Modifications

- Stack React 18 / Vite conservée, sans nouvelle dépendance de production.
- PNG détouré fourni par Charles : deux WebP avec transparence, 540 × 720 (72 ko) et 900 × 1200 (196 ko), chargés par `srcset`. Le fichier source est conservé.
- Accueil à trois couches CSS avec « FULLSTACK / DEVELOPER » derrière le portrait et « APPLIED AI » devant. Présentation élargie et identité animée par frappe, désactivée avec la réduction des mouvements. Navigation principale sans bordure, menu par domaines sticky avec IntersectionObserver et défilement horizontal sur petit écran.
- Récit professionnel fondé sur le brief : aperçu compact, détail dépliable, socle Playwright développé par Charles, participation à un groupe transverse d’environ dix personnes, prototype interne et objectifs explicitement distingués. Aucune préparation automatique de contrat ou restitution autonome présentée comme achevée.
- Ordre : POC 01, PDF Verifier 02, AlgoVisualizer 03, Snake AI 04, ENERVISION 05, projets secondaires 06–08.
- Tri JavaScript conservé dans l’onglet « Essayer un tri » d’AlgoVisualizer. Les catégories graphes / labyrinthes sont des indications du projet original, pas de fausses démonstrations interactives.
- Accordéons natifs utilisables au clavier, état ARIA, traitement visuel distinct à l’ouverture, repositionnement seulement si le résumé est hors de la zone de lecture.
- Manifeste Construire / Observer / Recommencer et grande flèche conservés. Révélations par IntersectionObserver, désactivées avec la réduction des mouvements.
- Traductions françaises et anglaises, consentement Analytics et déploiement Pages conservés.
- Correction du favicon en développement : Vite appliquait deux fois `/Portfolio/` au chemin utilisant `%BASE_URL%`. Le chemin public `/favicon.svg` est réécrit correctement au build.

## Contrôles effectués

- `npm test` : 7 tests réussis, aucun échec.
- `npm run build` : réussi. Bundle JS d’environ 207 ko, 68 ko gzip ; CSS d’environ 44 ko, 10 ko gzip.
- Aucun script ni configuration de lint dans le dépôt ; aucun résultat de lint n’est revendiqué.
- Tests navigateur automatisés avec Playwright et Edge headless, installés dans un dossier temporaire sans modifier les dépendances du projet.
- Build de production servi sous `/Portfolio/` : largeurs 1920, 1440, 1280, 1024, 768 et 390 px, dans les deux langues. Aucune largeur de document supérieure au viewport.
- Ancres des cinq domaines : correspondance de l’état actif, hauteur des barres fixes et visibilité du début de chaque projet vérifiées.
- Accordéons ouverts / fermés avec Entrée et Espace, `aria-expanded` vérifié dans les douze configurations.
- FR / EN, URL `?lang=en`, persistance après rechargement ; tri manuel et lecture ; clause absente / ajoutée ; étapes Snake : contrôles réussis.
- Préférence de mouvement réduit émulée : défilement automatique plutôt qu’animé, révélations visibles, interactions manuelles opérationnelles.
- Deux états « vidéo à venir », aucun lecteur ni requête vidéo cassée en l’absence de médias. Aucun chargement Google Analytics après refus.
- Aucun `pageerror` ni réponse HTTP en erreur durant le parcours de production testé.
- Inspection de captures réelles : accueil, projets, accordéon, manifeste, workflow et emplacement vidéo. Placement du prénom corrigé ; largeur du placeholder vidéo corrigée sur mobile.

## Médias et limites

À fournir dans `public/videos/` : `ai-playwright-demo.mp4` et `algo-visualizer-demo.mp4` (ou `.webm`). Couverture facultative de même nom en WebP / PNG / JPG. Redémarrer Vite après ajout ; la détection s’effectue au démarrage / build.

Aucun enregistrement réel n’étant fourni, la lecture et les codecs des futures vidéos restent à vérifier. La capture originale d’AlgoVisualizer est conservée. Les capacités internes ne sont pas vérifiables dans ce dépôt public. Aucun benchmark inventé.

Les contrôles portent sur Edge desktop avec viewports émulés, pas sur Safari, Firefox, un téléphone physique ou un lecteur d’écran. La collecte dans la propriété GA4 et une exécution distante GitHub Actions n’ont pas été testées. Aucun commit, push ou déploiement effectué.
