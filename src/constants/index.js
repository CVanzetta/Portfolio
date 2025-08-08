import {
  frontend,
  backend,
  ux,
  prototyping,
  javascript,
  typescript,
  html,
  css,
  github,
  tailwind,
  nodejs,
  git,
  figma,
  flutter,
  symfony,
  angular,
  php,
  meteo,
  therapeute,
  math,
  sortir,
  nyeusi,
  space,
  coverhunt,
  dcc,
  Fortil,
  kelhel,
  ENI,
  react,
  node,
  pandas,
  numpy,
  tensorflow,
  gitlab,
  vue,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Fullstack Development",
    icon: frontend,
  },
  {
    title: "AI & Machine Learning",
    icon: backend,
  },
  {
    title: "Technical Consulting",
    icon: ux,
  },
  {
    title: "DevOps & Automation",
    icon: prototyping,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "github",
    icon: github,
  },

  {
    name: "Tailwind CSS",
    icon: tailwind,
  },

  {
    name: "angular",
    icon: angular,
  },

  // {
  //   name: "php",
  //   icon: php,
  // },
  // {
  //   name: "symfony",
  //   icon: symfony,
  // },
  {
    name: "git",
    icon: git,
  },
  // {
  //   name: "figma",
  //   icon: figma,
  // },
    {
    name: "flutter",
    icon: flutter,
    },
    {
      name: "React",
      icon: react, 
    },
    {
      name: "Node.js",
      icon: node, 
    },
    {
      name: "Pandas",
      icon: pandas, 
    },
    {
      name: "NumPy",
      icon: numpy, 
    },
    {
      name: "TensorFlow",
      icon: tensorflow, 
    },
    {
      name: "GitLab",
      icon: gitlab,
    },
    {
      name: "Vue.js 3",
      icon: vue, 
    },
];

const experiences = [
  {
    title: "Student - Computer Science",
    company_name: "ENI École Informatique",
    icon: ENI,
    iconBg: "#333333",
    date: "June 2023 - January 2024",
  },
  {
    title: "Fullstack Developer Intern",
    company_name: "Pauline Le DU Boucard",
    icon: kelhel,
    iconBg: "#333333",
    date: "November 2023 - March 2024",
  },
  {
    title: "Software Development Consultant",
    company_name: "Fortil",
    icon: Fortil,
    iconBg: "#333333",
    date: "April 2024 - Present",
  },
];

const projects = [
  {
    id: "project-1",
    name: "Chess Bot AI",
    description: "Bot d'échecs intelligent utilisant l'algorithme Minimax avec élagage Alpha-Beta. Évaluation de positions, prédiction de coups optimaux et interface graphique intégrée pour l'analyse stratégique en temps réel.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "minimax",
        color: "green-text-gradient",
      },
      {
        name: "pygame",
        color: "pink-text-gradient",
      },
    ],
    image: space,
    repo: "https://github.com/CVanzetta/chess-bot",
    demo: null,
  },
  {
    id: "project-2",
    name: "Mobumoney - Crypto Monitor",
    description: "Bot Python sophistiqué surveillant les nouvelles inscriptions Binance avec notifications Windows temps réel. Architecture multi-threading, gestion d'erreurs robuste et interface utilisateur intuitive.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "binance-api",
        color: "green-text-gradient",
      },
      {
        name: "automation",
        color: "pink-text-gradient",
      },
    ],
    image: nyeusi,
    repo: "https://github.com/CVanzetta/Mobumoney",
    demo: null,
  },
  {
    id: "project-3",
    name: "Thérapeute 86",
    description: "Site vitrine professionnel Angular avec système de réservation en ligne. Architecture modulaire, responsive design, optimisation SEO et intégration de calendrier dynamique pour cabinet de thérapie.",
    tags: [
      {
        name: "angular",
        color: "blue-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
      {
        name: "sass",
        color: "pink-text-gradient",
      },
    ],
    image: therapeute,
    repo: "https://github.com/CVanzetta/Therapeute86",
    demo: "https://xn--thrapeute86-cbb.fr/",
  },
  {
    id: "project-4",
    name: "Finance Tracker Pro",
    description: "Application React de gestion financière avec tableaux de bord interactifs, analyse predictive des dépenses, catégorisation automatique et export de rapports détaillés.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "chart.js",
        color: "green-text-gradient",
      },
      {
        name: "localstorage",
        color: "pink-text-gradient",
      },
    ],
    image: math,
    repo: "https://github.com/CVanzetta/Finance-Tracker",
    demo: null,
  },
  {
    id: "project-5",
    name: "AlgoVisualizer Suite",
    description: "Collection d'outils de visualisation algorithmique : Snake AI avec deep learning, algorithmes de tri interactifs, et visualiseur de structures de données complexes pour l'apprentissage.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "tensorflow",
        color: "green-text-gradient",
      },
      {
        name: "visualization",
        color: "pink-text-gradient",
      },
    ],
    image: sortir,
    repo: "https://github.com/CVanzetta/AlgoVisualizer",
    demo: null,
  },
  {
    id: "project-6", 
    name: "Projet Enchères",
    description: "Plateforme d'enchères en ligne complète développée en Java/Spring. Architecture MVC, gestion d'utilisateurs, système d'enchères en temps réel avec validation de transactions sécurisées.",
    tags: [
      {
        name: "java",
        color: "blue-text-gradient",
      },
      {
        name: "spring",
        color: "green-text-gradient",
      },
      {
        name: "mysql",
        color: "pink-text-gradient",
      },
    ],
    image: meteo,
    repo: "https://github.com/CVanzetta/ProjetEncheres",
    demo: null,
  },
];

export { services, technologies, experiences, projects };
