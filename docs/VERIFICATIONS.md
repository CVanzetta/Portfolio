# Vérifications de livraison

Effectuées le 22 septembre 2026 sur Windows, Node.js 22.11.0 et Chrome.

## Réalisation et production

- Installation `npm ci` réussie avec le verrou du projet existant.
- Compilation finale `npm run build` réussie, 35 modules transformés.
- JavaScript produit : environ 177 Ko, 58 Ko compressés gzip ; CSS : environ 28 Ko, 7 Ko gzip.
- Version compilée servie et inspectée sous `http://127.0.0.1:4173/Portfolio/`.
- Réponses HTTP 200 vérifiées pour l’accueil, le CV, les deux images et le favicon.
- Les six liens vers les dépôts de projets répondent HTTP 200. Le lien LinkedIn correspond au lien fourni par le profil GitHub ; aucune connexion LinkedIn ni prise de contact n’a été effectuée.
- Les liens d’ancrage pointent tous vers des identifiants existants. Les ressources utilisent `/Portfolio/`.
- Aucun média cassé observé dans le navigateur. Le CV fourni est téléchargeable comme PDF ; il n’a pas été modifié.

## Mise en page

Rendu réel inspecté sur ordinateur, tablette et téléphone. Dimensions finales contrôlées avec l’outil de viewport du navigateur :

| Largeur demandée | Largeur utile (hors barre de défilement) | Largeur du document | Débordement horizontal |
| --- | --- | --- | --- |
| 320 px | 305 px | 305 px | Aucun |
| 390 px | 375 px | 375 px | Aucun |
| 820 px | 805 px | 805 px | Aucun |
| 1440 px | 1425 px | 1425 px | Aucun |

Le premier écran a aussi été observé à la largeur initiale du navigateur. Les projets, l’étude de cas PDF ouverte, ENERVISION, le portrait, les loisirs et le contact ont fait l’objet de contrôles visuels. Un débordement du titre « Recommencer » à 320 px et le placement de la légende du portrait ont été corrigés.

## Interactions

- Quick Sort : lancement, pause, progression pas à pas, fin de tri et disponibilité de « Rejouer » vérifiés.
- Changement d’algorithme et mélange des valeurs : réinitialisation vérifiée.
- Pause lors de la sortie du visualiseur : vérifiée en lançant Bubble Sort puis en accédant aux projets ; le bouton est revenu à « Lancer » avant la fin.
- Contrôle PDF : modification du texte vers une mention absente, affichage de l’échec, puis restauration du texte valide et de la réussite.
- Études de cas : ouverture et fermeture, notamment au clavier avec Entrée.
- Snake : sélection manuelle de la phase 20 %, affichage de 100 / 500 parents et mise en pause vérifiés dans Chrome.
- Mahjong : activation avec Espace, état passé du dragon rouge au vent d’est.
- Email : clic sur le bouton de copie, confirmation « Adresse copiée » observée.
- Lien d’évitement : premier Tab, focus visible, puis Entrée ; le focus atteint réellement `main`.
- Navigation : ancres Projets, À propos et Contact vérifiées ; navigation persistante et aucun piège de focus ajouté.

## Tests automatisés de la logique

`node --test src/algorithms.test.js src/analytics.test.js` : **7 tests réussis, 0 échec**. Les tests Analytics vérifient les identifiants invalides, la persistance et expiration du choix, ainsi que le chargement unique après appel explicite (environnement simulé).

Les trois tris sont vérifiés sur tableau vide, valeur unique, doublons et nombres négatifs, tableau inversé, tableau déjà trié et jeu initial du portfolio. Assertions sur l’ordre final, la conservation des valeurs à chaque instantané, l’absence de mutation de l’entrée, les indices actifs et la progression du compteur.

Le contrôle de texte est vérifié pour réussite, échec, chaîne vide, casse et accents Unicode décomposés.

## Accessibilité et mouvement

- HTML avec en-tête, navigation, main, sections, articles, titres, formulaires étiquetés et détails natifs.
- Focus visible et contrôles utilisables au clavier observés.
- Le tri démarre sur action explicite. Snake démarre lorsqu’il devient visible, avec pause disponible ; sa lecture automatique est désactivée si prefers-reduced-motion est actif.
- La règle `prefers-reduced-motion: reduce` a été inspectée dans la feuille CSS effectivement chargée : désactivation des transitions/animations et du défilement animé.
- La préférence système de réduction du mouvement n’a pas été activée artificiellement dans Chrome : il s’agit d’un contrôle de la règle chargée et du code de prise en compte de cette préférence, pas d’une émulation système complète.

## Limites exactes des contrôles

- Pas d’exécution dans Safari ou Firefox, ni sur téléphone physique, ni d’audit par lecteur d’écran ou certification WCAG.
- Aucun backend des projets d’origine, aucun entraînement de modèle, aucune API LLM interne n’a été exécuté. Les démonstrations locales sont identifiées comme telles.
- La vidéo originale d’ENERVISION n’étant pas fournie, la branche du lecteur vidéo n’a pas été testée avec un média réel ; le schéma de remplacement est visible et fonctionnel.
- Des avertissements React liés au remplacement de code à chaud ont été observés pendant le développement et le montage de la racine a été corrigé. Aucun avertissement ni erreur propre à la version de production n’a été observé dans les journaux consultés.
- Aucune publication ni exécution distante du workflow GitHub Actions. Les versions des actions Pages et leur configuration ont été comparées à la [documentation officielle GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) et à [setup-node](https://github.com/actions/setup-node).

## Fichiers livrés

Le dossier comprend les sources, le verrou npm, les médias, le CV, les tests, le build `dist/` et un workflow de publication manuelle. L’archive exclut `node_modules/`. Les captures d’écran sont des rendus réels du site compilé, et non des maquettes.

## Révision visuelle

Palette bleue, portrait à l’accueil, retrait de la date et de la photo extérieure. Absence de script Google confirmée dans le DOM de production sans identifiant. La collecte réelle et le bandeau configuré n’ont pas été vérifiés avec une propriété GA4.
