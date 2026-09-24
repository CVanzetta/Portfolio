# Sources éditoriales — 22 septembre 2026

## Sources personnelles

- CV fourni : `Design (1).pdf`, une page, lu et inspecté visuellement. Repris tel quel dans `public/CV-Charles-Vanzetta.pdf`.
- Confirmation directe de Charles : `charles.vanzetta@gmail.com` est l’adresse à utiliser.
- Confirmation directe : ENERVISION, rôle de PO, organisation du temps et du travail, ETL, entraînement des modèles, mise en place et alerting. Hébergement scolaire coupé après l’examen.
- Confirmation directe : POC professionnel en Python / OpenCode, modèles Qwen ou GLM 5.2, analyse de tickets Jira, lancement de l’application avec Playwright, écriture / modification / lancement de tests, couche FastAPI. Le code ne peut pas être montré. Aucune validation humaine ni autonomie complète n’a été supposée.
- Le CV sert de source actuelle pour Fortil, le parcours, Séoul 2018–2019, le badminton en compétition et le mahjong Riichi. Aucun classement sportif, nombre de pays ou résultat de modèle n’a été inventé.
- Portrait retenu pour l’accueil : fichier fourni `Image Codex 24 sept. 2026, 15_35_25.png`, redimensionné et compressé en deux WebP transparents. Aucune nouvelle génération de visage pendant l’intégration. Photo extérieure retirée à la demande de Charles ; photo de badminton non encore fournie.

## Sources publiques inspectées

Inventaire des 29 dépôts publics du compte GitHub. Les dépôts retenus ci-dessous ont été clonés en lecture locale ; leurs README et les fichiers utiles ont été lus. Les dépôts des projets sont utilisés comme sources en lecture seule ; le dépôt Portfolio reçoit les sources de la refonte sur autorisation de Charles.

| Source | Preuves consultées | Traitement |
| --- | --- | --- |
| [Portfolio existant](https://github.com/CVanzetta/Portfolio) | README, package.json, Vite, constantes des projets, contact, médias | React/Vite et verrou npm conservés. Contenu réécrit et vérifié. |
| [Profil GitHub](https://github.com/CVanzetta) | Présentation et lien LinkedIn | Positionnement, lien de contact ; les fonctions actuelles viennent du CV fourni. |
| [AlgoVisualizer](https://github.com/CVanzetta/AlgoVisualizer) | README, capture screenshot2.png, implémentations Java, QuickSortTest.java, arborescence des tests | Projet principal et adaptation JavaScript. Contributions externes explicitement signalées. |
| [PDF Verifier](https://github.com/CVanzetta/pdf-verifier) | README, Tests.json, routes FastAPI OCR, extraction, détection et vérification, matching.py | Projet principal. OCR Tesseract et ORB/SIFT vérifiables ; absence de pipeline LLM/RAG dans ce code. |
| [Snake AI](https://github.com/CVanzetta/snake-AI) | README, agent.py, snake_game_logic.py, train_genetic_algorithm.py | Réseau simple et algorithme génétique. Problème de perception décrit précisément. |
| [Chess Bot](https://github.com/CVanzetta/chess-bot) | README, chess_bot_model.py, chess_bot_module.py, main.py et présence des journaux | TensorFlow et entraînement contre Stockfish. Aucun Elo ni taux de victoire repris. |
| [Face ID](https://github.com/CVanzetta/face-id) | README, moteur InsightFace, arborescence API et stockage | Sélection secondaire. Pas de revendication de conformité juridique ni de benchmarks non reproduits. |
| [summer_olympics](https://github.com/CVanzetta/summer_olympics) | README, scripts PBIP/TMDL/LookML, test minimal du convertisseur | Sélection data. Limites DAX reprises du README. |
| [Jan Blunár](https://www.blunar.cz/) | Page web et premier écran observé dans Chrome | Principes d’impact, encadrements et personnalité ; ni composition ni médias copiés. |

## Corrections importantes

- L’ancien portfolio présente Chess Bot comme un Minimax. Le dépôt actuel montre une approche TensorFlow avec exploration epsilon-greedy. Cette dernière est retenue.
- AlgoVisualizer est une application Java / Spring Boot ; Snake AI est un dépôt Python distinct. Aucune fusion de leurs fonctionnalités.
- PDF Verifier ne doit pas être présenté comme une preuve de RAG ou de VLM dans sa version publique examinée.
- Le `win_rate` du script d’échecs compte des récompenses positives. Ce n’est pas une preuve suffisante de taux de victoire.
- Snake AI : la perception du jeu retourne huit valeurs, contre 26 entrées calculées dans l’entraînement avec une portée de 2. Le réseau possède par défaut une couche cachée de 20 neurones et quatre sorties. Aucune exécution du modèle n’a été prétendue.
- Les médias génériques de projets de l’ancien portfolio n’ont pas été réutilisés comme captures authentiques de l’IA.
- Le nom ENERVISION suit le CV, avec le contexte scolaire et le rôle confirmés par Charles.

## Éléments pouvant enrichir une prochaine version

- Vidéo authentique d’ENERVISION et image de couverture ; lecteur déjà prévu sans emplacement vide public.
- Données utilisables publiquement, modèle exact, protocole d’évaluation et résultats d’ENERVISION, si partageables.
- Exemple anonymisé et autorisé du POC professionnel, et description de sa validation humaine, si partageables.
- Classement de badminton avec discipline et saison, uniquement si Charles souhaite le publier.

Le site livré fonctionne sans ces compléments.
