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
  kelhel,
  ENI,
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
    title: "Frontend Developer",
    icon: frontend,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "AI Prompting",
    icon: ux,
  },
  {
    title: "Application Designer and Developer",
    icon: prototyping,
  },
];

const technologies = [
  // {
  //   name: "HTML 5",
  //   icon: html,
  // },
  // {
  //   name: "CSS 3",
  //   icon: css,
  // },
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

  {
    name: "php",
    icon: php,
  },

  {
    name: "symfony",
    icon: symfony,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "flutter",
    icon: flutter,
  },
];

const experiences = [
  {
    title: "Student",
    company_name: "ENI ecole informatique",
    icon: ENI,
    iconBg: "#333333",
    date: "jun 2023 - jan 2024",
  },
  {
    title: "Intern Full stack Developer",
    company_name: "Pauline Le DU Boucard",
    icon: kelhel,
    iconBg: "#333333",
    date: "nov 2023 - jan 2024",
  },
  {
    title: "Independent Developer",
    company_name: "Focusing on personal projects",
    icon: dcc,
    iconBg: "#333333",
    date: "feb 2024 - Present",
  },
];

const projects = [
  {
    id: "project-1",
    name: "App-Meteo",
    description: "A weather app that offers city-specific forecasts.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: meteo,
    repo: "https://github.com/CVanzetta/App-meteo/tree/main",
    // demo: "https://shaqdeff.github.io/KomiKult/",
  },
  {
    id: "project-2",
    name: "Thérapeute 86",
    description:
      "A showcase website with a reservation calendar for therapists, powered by Angular for streamlined appointment management.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: therapeute,
    repo: "https://github.com/CVanzetta/Therapeute86",
    demo: "https://xn--thrapeute86-cbb.fr/",
  },
  {
    id: "project-3",
    name: "Calculatrice",
    description: "This is a single-page calculator app built with JS",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: math,
    repo: "https://github.com/CVanzetta/Calculatrice/tree/main",
    // demo: "https://inspiring-medovik-37d3b3.netlify.app/",
  },
  {
    id: "project-4",
    name: "Sortir.com",
    description: `A dynamic platform built with Symfony for organizing and joining group outings. Register and connect with various events around you.`,
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: sortir,
    repo: "https://github.com/CVanzetta/Sortir.com",
    // demo: "https://movie-metro.netlify.app/",
  },
];

export { services, technologies, experiences, projects };
