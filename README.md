# Portfolio de Charles Vanzetta

[Voir le portfolio en ligne](https://cvanzetta.github.io/Portfolio/)

Portfolio bilingue consacré au développement logiciel, à l’IA agentique, à l’automatisation de tests et à la vision par ordinateur. Le site est construit avec React et Vite et publié sur GitHub Pages.

## Démonstrations

- **Orchestrateur IA** — une même tâche passe dans trois circuits. Chaque circuit exécute la tâche, vérifie sa sortie avec trois contrôles et la livre une fois validée. Le circuit léger montre un échec puis une reprise par le modèle expert. Les tarifs, durées et résultats sont simulés.
- **Agent QA / Playwright** — deux demandes prédéfinies illustrent la réutilisation des fixtures et des Page Objects. La démo génère un test d’exemple et sa commande de lancement. Le code du POC professionnel reste privé.
- **YOLO Badminton** — six points simulés illustrent comment repérer une habitude de frappe et en tirer une piste d’entraînement.
- **Autres projets** — contrôle d’une clause avec PDF Verifier, tri interactif avec AlgoVisualizer, sélection génétique illustrée avec Snake AI et pipeline de données ENERVISION.

## Lancer le site

Avec Node.js 22 et npm :

```sh
npm ci
npm test
npm run dev
```

Ouvrir l’adresse affichée par Vite avec le chemin `/Portfolio/`. Ajouter `?lang=en` pour ouvrir la version anglaise. Pour vérifier le build statique :

```sh
npm run build
npm run preview
```

## Mettre à jour le contenu

- `src/PortfolioExperience.jsx` contient l’accueil, les projets mis en avant et le profil.
- `src/content.js` et `src/content.en.js` contiennent les textes des autres projets et leurs traductions.
- `src/OrchestrationDemo.jsx` et `src/orchestration.js` contiennent la simulation, les hypothèses de coûts et les contrôles.
- Les CV servis par le site sont `public/francais.pdf` et `public/Anglais.pdf`.
- Les vidéos facultatives de Playwright et d’AlgoVisualizer sont détectées au démarrage ou au build dans `public/videos/`. Utiliser les noms `ai-playwright-demo` et `algo-visualizer-demo` avec l’extension `.mp4` ou `.webm`. Une image de couverture du même nom est facultative.

Les références des projets et les sources éditoriales sont dans [docs/SOURCES.md](docs/SOURCES.md). Les notices des polices [IBM Plex Mono](public/licenses/ibm-plex.txt) et [Space Mono](public/licenses/space-mono.txt) accompagnent les fichiers distribués.

## Publier

Un push sur `main` lance le [workflow GitHub Pages](.github/workflows/pages.yml). Il installe les dépendances, lance les tests, construit `dist/` et publie le résultat. Dans les paramètres Pages du dépôt, la source est **GitHub Actions**.

Les paramètres facultatifs de GA4 sont dans [.env.example](.env.example). Le site charge Google Analytics uniquement après acceptation du bandeau de consentement. Le lien « Confidentialité & cookies » permet de modifier le choix.
