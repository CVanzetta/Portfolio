export const cvFile = lang => lang === 'en' ? 'Anglais.pdf' : 'francais.pdf';

export const profile = {
  email: 'charles.vanzetta@gmail.com',
  github: 'https://github.com/CVanzetta',
  linkedin: 'https://www.linkedin.com/in/charles-vanzetta/',
  // Optional authentic media: set BOTH video and poster to local public/ paths.
  enervisionVideo: null,
  enervisionPoster: null,
};

export const projects = [
  {
    problem: 'Repérer les mentions manquantes avant la validation d’un document.', technologies: ['Python', 'FastAPI', 'Vue', 'Tesseract', 'OpenCV'],
    id: 'pdf-verifier', number: '02', name: 'PDF Verifier', type: 'Développement professionnel · version publique assainie', category: 'OCR / AUTOMATISATION',
    title: 'Vérifier un document,\npas seulement le lire.',
    summary: 'Extraire le texte d’un PDF, contrôler les mentions attendues et comparer ses éléments visuels à des références.',
    contribution: 'Développement d’un outil de contrôle documentaire, avec interface Vue et API Python. Le dépôt public contient une version générique, sans documents ni résultats métier.',
    choices: 'FastAPI sépare extraction, OCR et contrôle visuel. Tesseract lit les pages numérisées ; OpenCV compare les images avec ORB ou SIFT. Les règles de texte sont configurées en JSON.',
    proof: 'Le code expose les contrôles de texte, les correspondances d’images et les positions attendues. Les règles génériques sont consultables dans le dépôt.',
    limit: 'Les modèles d’images et jeux de tests métier ne sont pas publics. La qualité dépend des références et des seuils ; aucun taux de précision ni gain de temps n’est revendiqué.',
    note: 'Ce dépôt démontre de l’OCR et de la vision classique. Il ne contient pas de pipeline LLM ou RAG vérifiable.',
    repo: 'https://github.com/CVanzetta/pdf-verifier',
  },
  {
    problem: 'Comprendre les étapes d’un algorithme, au-delà de son résultat final.', technologies: ['Java 21', 'Spring Boot', 'Canvas', 'JUnit'],
    id: 'algovisualizer', number: '03', name: 'AlgoVisualizer', type: 'Projet personnel · contributions ouvertes', category: 'JAVA / ALGORITHMIQUE',
    title: 'Voir ce qui se passe\nentre deux résultats.',
    summary: 'Une application qui décompose les algorithmes de tri en étapes visibles et pilotables dans le navigateur.',
    contribution: 'Développement du visualiseur Java / Spring Boot et de son interface web. Le dépôt comprend aussi des contributions externes.',
    choices: 'Chaque algorithme produit des instantanés du tableau. Une interface commune et un service Spring séparent le calcul de la restitution dans le Canvas.',
    proof: 'Les implémentations de tri et les tests JUnit sont présents. Le test QuickSort vérifie par exemple que [3, 2, 1] devient [1, 2, 3] en trois instantanés.',
    limit: 'Stocker les étapes consomme de la mémoire quand le tableau grandit. La démonstration interactive dans cette carte est une adaptation JavaScript autonome, pas le serveur Java original.',
    note: 'Projet d’algorithmique, distinct de Snake AI et des projets LLM.',
    repo: 'https://github.com/CVanzetta/AlgoVisualizer',
  },
  {
    problem: 'Observer comment une stratégie de jeu évolue et pourquoi elle échoue.', technologies: ['Python', 'Réseau neuronal', 'Algorithme génétique'],
    id: 'snake-ai', number: '04', name: 'Snake AI', type: 'Projet personnel · expérimentation', category: 'PYTHON / APPRENTISSAGE',
    title: 'Apprendre à jouer.\nComprendre les échecs.',
    summary: 'Un agent neuronal dont les poids évoluent par sélection, croisement et mutation pour contrôler un Snake.',
    contribution: 'Implémentation de la logique du jeu, du réseau de décision et de la boucle d’évolution génétique en Python.',
    choices: 'Le réseau calcule quatre actions possibles avec une couche cachée de 20 neurones. La fitness combine score, distance au fruit et pénalité de mouvements répétitifs.',
    proof: 'Le code rend la perception et la fonction de fitness inspectables. Le README documente un échec : avec une portée de vision réglée à 2, l’agent termine immédiatement avec un score nul.',
    limit: 'Le contrat entre perception et taille d’entrée demande encore du travail : la perception actuelle fournit 8 valeurs, alors que l’entraînement en attend 26 avec range_vision = 2. Aucun score de performance stabilisé n’est annoncé.',
    note: 'L’animation illustre la sélection, le croisement et la mutation ; les trajectoires ne proviennent pas d’un modèle entraîné.',
    repo: 'https://github.com/CVanzetta/snake-AI',
  },
  {
    problem: 'Relier la préparation des données au suivi d’un modèle en exploitation.', technologies: ['Python', 'FastAPI', 'Vue 3', 'PostgreSQL', 'Docker'],
    id: 'enervision', number: '05', name: 'ENERVISION', type: 'Projet scolaire · Bac+5 · 2026', category: 'ETL / MACHINE LEARNING',
    title: 'De la donnée énergie\nau modèle surveillé.',
    summary: 'Smart Energy Optimizer : un projet de chaîne de données et de Machine Learning, présenté lors de l’examen de fin d’études.',
    contribution: 'Rôle de Product Owner : organisation du travail et du temps. Prise en charge de l’ETL, de l’entraînement des modèles, de leur mise en place et de l’alerting.',
    choices: 'Architecture décrite dans mon CV : FastAPI, Vue 3 et PostgreSQL ; conteneurisation Docker, GitHub Actions, Trivy et Terraform. Le projet intègre la surveillance du drift et le réentraînement.',
    proof: 'Le périmètre est documenté dans mon CV et mon rôle précisé personnellement. L’application était hébergée sur les serveurs de l’école, coupés après l’examen.',
    limit: 'Pas de service public actif. Sans dépôt ni rapport d’évaluation disponibles ici, les données, le modèle exact et ses performances ne sont pas détaillés.',
    note: 'Le schéma présente le périmètre du projet ; ce n’est pas une capture de l’application.',
    repo: null,
  },
];

export const secondary = [
  { name: 'Chess Bot', area: 'Apprentissage · projet personnel', description: 'Réseau TensorFlow, exploration epsilon-greedy et parties contre Stockfish. Journaux TensorBoard présents ; aucun Elo validé. Le compteur nommé win_rate repose sur une récompense positive, pas sur une mesure fiable des victoires.', url: 'https://github.com/CVanzetta/chess-bot' },
  { name: 'Face ID', area: 'Vision · projet personnel', description: 'API FastAPI, embeddings InsightFace et recherche vectorielle FAISS / Qdrant. Le code est consultable ; les chiffres de performance annoncés dans le README ne sont pas repris faute de protocole vérifié.', url: 'https://github.com/CVanzetta/face-id' },
  { name: 'Power BI → Looker', area: 'Data · dépôt summer_olympics', description: 'Scripts Python pour inspecter les relations TMDL et générer du LookML. Aperçu des modifications avant application. Limite documentée : les mesures DAX complexes nécessitent une reprise manuelle.', url: 'https://github.com/CVanzetta/summer_olympics' },
];
