import React, { useEffect, useId, useRef, useState } from 'react';
import DemoVideo, { demoMedia } from './DemoVideo';
import { cvFile } from './content';
import POCContext from './POCContext';
import AgentLab from './AgentLab';
import BadmintonReplay from './BadmintonReplay';
import OrchestrationDemo from './OrchestrationDemo';
import WindowBar from './RetroWindow';
import portraitUrl from './portrait-cutout-v2-540.webp';

const tx = (lang, fr, en) => lang === 'en' ? en : fr;
const asset = name => `${import.meta.env.BASE_URL}${name}`;
export function SiteLogo({ lang }) {
  return <a href="#accueil" className="wordmark" aria-label={tx(lang, 'Charles Vanzetta, accueil', 'Charles Vanzetta, home')}>
    <img src={asset('favicon.svg')} alt="" width="42" height="42"/>
  </a>;
}

export function SiteHeader({ lang, onLanguageChange }) {
  const header = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const measure = () => document.documentElement.style.setProperty('--header-height', `${header.current.getBoundingClientRect().height}px`);
    const resize = new ResizeObserver(measure);
    resize.observe(header.current);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll(); measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { resize.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);
  return <header ref={header} className={`header editorial-header ${scrolled ? 'is-scrolled' : ''}`}>
    <SiteLogo lang={lang}/>
    <span className="header-label">CHARLES VANZETTA<br/><span>{tx(lang, 'DÉVELOPPEMENT & IA', 'DEVELOPMENT & AI')}</span></span>
    <nav aria-label={tx(lang, 'Navigation principale', 'Main navigation')}>
      <a href="#agentique">{tx(lang, 'IA agentique', 'Agentic AI')}</a>
      <a href="#projets">{tx(lang, 'Projets', 'Projects')}</a>
      <a href="#apropos">{tx(lang, 'À propos', 'About')}</a>
      <a className="nav-contact" href="#contact">Contact</a>
    </nav>
    <div className="language-switch" role="group" aria-label={tx(lang, 'Langue du site', 'Site language')}>
      <button type="button" lang="fr" aria-label="Français" aria-pressed={lang === 'fr'} onClick={() => onLanguageChange('fr')}>FR</button>
      <button type="button" lang="en" aria-label="English" aria-pressed={lang === 'en'} onClick={() => onLanguageChange('en')}>EN</button>
    </div>
  </header>;
}

export function Hero({ lang }) {
  return <section className="hero agent-hero" id="accueil" aria-labelledby="hero-title">
    <div className="agent-intro">
      <p className="agent-byline"><span aria-hidden="true">▰</span> {tx(lang, 'Charles Vanzetta / Développeur', 'Charles Vanzetta / Developer')}</p>
      <h1 id="hero-title">{tx(lang, 'Je construis', 'I build')}<br/><em>{tx(lang, 'des agents IA.', 'AI agents.')}</em></h1>
      <p className="agent-lede">{tx(lang, 'Je développe des agents qui s’appuient sur des outils existants. Suivez une même tâche dans trois circuits, du choix du modèle aux contrôles avant livraison.', 'I build agents that use existing tools. Follow the same task through three workflows, from model selection to the checks before delivery.')}</p>
      <div className="agent-actions">
        <a className="agent-primary" href="#projets">{tx(lang, 'Explorer mes projets', 'Explore my projects')}</a>
        <a className="agent-cv" href={asset(cvFile(lang))} download>{tx(lang, 'Télécharger mon CV', 'Download my CV')}</a>
      </div>
    </div>
    <OrchestrationDemo lang={lang}/>
  </section>;
}

export function BadmintonProject({ lang }) {
  const en = lang === 'en';
  return <article className="featured-vision retro-window" id="yolo-badminton" aria-labelledby="badminton-title">
    <WindowBar title="badminton.exe" detail={en ? 'Match review · simulation' : 'Analyse de match · simulation'}/>
    <div className="retro-project-body">
      <div className="featured-vision-copy">
        <h3 id="badminton-title">YOLO Badminton</h3>
        <p>{en ? 'Film your match and review the patterns in your own game. The project uses YOLO to track the rally, then groups your shot choices in comparable situations so you can decide what to practise.' : 'Filme ton match pour repérer tes habitudes de jeu. Le projet s’appuie sur YOLO pour suivre les échanges, puis regroupe tes choix de frappe dans des situations comparables pour t’aider à choisir quoi travailler.'}</p>
        <div className="badminton-coaching">
          <h4>{en ? 'Try this in training' : 'À travailler à l’entraînement'}</h4>
          <p>{en ? 'From the backhand rear corner, alternate straight clears with straight drops when you’re balanced. Replay the points to see when you had time to vary the shot.' : 'En revers de fond de court, alterne dégagement droit et amorti droit quand tu es bien placé. Revois les points pour repérer les moments où tu avais le temps de varier.'}</p>
        </div>
      </div>
      <BadmintonReplay lang={lang}/>
    </div>
  </article>;
}

const topics = [
  { id: 'poc-qa', fr: 'Agent Playwright', en: 'Playwright agent' },
  { id: 'yolo-badminton', fr: 'YOLO Badminton', en: 'YOLO Badminton' },
  { id: 'pdf-verifier', fr: 'PDF Verifier', en: 'PDF Verifier' },
  { id: 'algovisualizer', fr: 'AlgoVisualizer', en: 'AlgoVisualizer' },
  { id: 'snake-ai', fr: 'Snake AI', en: 'Snake AI' },
  { id: 'enervision', fr: 'ENERVISION', en: 'ENERVISION' },
];

export function TopicNav({ lang }) {
  return <nav className="project-nav" aria-label={tx(lang, 'Accéder à un projet', 'Jump to a project')}>
    {topics.map(topic => <a href={`#${topic.id}`} key={topic.id}>{topic[lang]}</a>)}
  </nav>;
}

export function ProjectDetails({ title, children, className = '' }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const summary = useRef(null);
  function onToggle(event) {
    const expanded = event.currentTarget.open;
    setOpen(expanded);
    if (!expanded) return;
    requestAnimationFrame(() => {
      if (!summary.current) return;
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const top = summary.current.getBoundingClientRect().top;
      if (top < offset || top > window.innerHeight - 60) summary.current.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  }
  return <details className={`project-details ${className}`} onToggle={onToggle}>
    <summary ref={summary} aria-expanded={open} aria-controls={id}>{title}<span className="plus" aria-hidden="true">+</span></summary>
    <div id={id} className="accordion-content">{children}</div>
  </details>;
}

export function AlgoShowcase({ lang, children }) {
  const [mode, setMode] = useState('sort');
  const id = useId();
  const hasVideo = Boolean(demoMedia.algorithms.video);
  return <div className="algo-showcase">
    <div className="visual-label"><span>{tx(lang, '03 / RENDRE LE CALCUL VISIBLE', '03 / MAKE COMPUTATION VISIBLE')}</span><span>JAVA 21</span></div>
    {hasVideo && <div className="algo-modes" role="group" aria-label={tx(lang, 'Présentation AlgoVisualizer', 'AlgoVisualizer presentation')}>
      <button type="button" aria-pressed={mode === 'sort'} aria-controls={id} onClick={() => setMode('sort')}>{tx(lang, 'Tri interactif', 'Interactive sorting')}</button>
      <button type="button" aria-pressed={mode === 'video'} aria-controls={id} onClick={() => setMode('video')}>{tx(lang, 'Voir la vidéo', 'Watch the video')} <span aria-hidden="true">↗</span></button>
    </div>}
    <div id={id}>
      {mode === 'video' && hasVideo ? <DemoVideo media={demoMedia.algorithms} lang={lang} title="AlgoVisualizer" description={tx(lang, 'Démonstration de l’application originale.', 'Demonstration of the original application.')}/> : children}
    </div>
    <ul className="algo-categories" aria-label={tx(lang, 'Domaines présents dans le projet', 'Areas covered by the project')}><li>{tx(lang, 'TRIS', 'SORTING')}</li><li>{tx(lang, 'GRAPHES', 'GRAPHS')}</li><li>{tx(lang, 'LABYRINTHES', 'MAZES')}</li></ul>
  </div>;
}

export function ProfessionalPOC({ lang }) {
  const en = lang === 'en';
  const steps = en ? ['Request', 'Ticket / intent', 'AI agent', 'Playwright', 'Application', 'Result', 'Report / evidence'] : ['Demande', 'Ticket / intention', 'Agent IA', 'Playwright', 'Application', 'Résultat', 'Rapport / preuve'];
  return <article className="work-poc poc-story retro-window" id="poc-qa" aria-labelledby="poc-title">
    <WindowBar title="playwright-agent.exe" detail={en ? 'Workplace proof of concept' : 'POC en entreprise'}/>
    <div className="poc-overview retro-project-body">
      <div className="poc-overview-copy">
        <h3 id="poc-title">{en ? 'An agent that evolves the test suite' : 'Un agent qui fait évoluer les tests'}</h3>
        <p>{en ? 'I built the Playwright / TypeScript foundation. The proof of concept explores how an agent can take a tester’s request, reuse the existing architecture, and add or update a test before running it and reporting the result.' : 'J’ai conçu le socle Playwright / TypeScript. Le POC explore comment un agent peut partir d’une demande du testeur, réutiliser l’architecture en place, puis ajouter ou modifier un test avant de le lancer et de rendre compte du résultat.'}</p>
        <p className="poc-transverse">{en ? 'I also contribute to a group of around ten people with a cross-functional view of the proof of concept and its integration into the company.' : 'Je participe aussi à un groupe d’environ dix personnes avec une vision transverse du POC et de son intégration dans l’entreprise.'}</p>
        <details className="agent-skill-preview">
          <summary>{en ? 'Agent architecture · QA skill' : 'Architecture agentique · skill QA'}</summary>
          <dl>
            <div><dt>{en ? 'Instructions' : 'Consignes'}</dt><dd>{en ? 'Reuse existing fixtures and Page Objects. Add the smallest test that covers the request.' : 'Réutiliser les fixtures et les Page Objects. Écrire le plus petit test qui couvre la demande.'}</dd></div>
            <div><dt>{en ? 'Tools' : 'Outils'}</dt><dd>{en ? 'Read the existing suite, write the spec, run the targeted scenario, and inspect the Playwright trace.' : 'Lire la suite existante, écrire le test, lancer le scénario ciblé et consulter la trace Playwright.'}</dd></div>
            <div><dt>{en ? 'Autonomy limits' : 'Limites d’autonomie'}</dt><dd>{en ? 'Cap retries. If the test still fails or the requirement is ambiguous, return the evidence for human review.' : 'Limiter les tentatives. Si le test échoue encore ou si le besoin est ambigu, transmettre les éléments à une personne pour décision.'}</dd></div>
          </dl>
        </details>
      </div>
      <AgentLab lang={lang}/>
    </div>
    <ProjectDetails className="poc-details" title={en ? 'Explore the approach, my role and the scope' : 'Comprendre la démarche, mon rôle et le périmètre'}>
    <div className="poc-story-grid">
      <div className="poc-story-copy">
        <span className="mono">{tx(lang, 'LE BESOIN MÉTIER', 'THE BUSINESS NEED')}</span>
        <p>{tx(lang, 'Avant de vérifier une anomalie ou de lancer une TNR, un testeur doit souvent retrouver un contrat dans le bon état, naviguer dans l’application et préparer son scénario.', 'Before checking a bug or running regression tests, a tester often needs to find a contract in the right state, navigate the application, and prepare the scenario.')}</p>
        <blockquote><span className="mono">{tx(lang, 'EXEMPLE DE DEMANDE VISÉE', 'EXAMPLE OF A TARGET REQUEST')}</span><p>{tx(lang, '« Prépare un contrat dans cet état, reproduis le scénario du ticket et indique ce qui échoue. »', '“Prepare a contract in this state, reproduce the ticket’s scenario, and tell me what fails.”')}</p></blockquote>
        <p className="poc-purpose">{tx(lang, 'L’objectif : formuler le besoin en langage naturel et déléguer la préparation répétitive au système, pour se concentrer sur le résultat.', 'The goal: describe the need in natural language and delegate repetitive preparation to the system, so the tester can focus on the result.')}</p>
      </div>
      <div className="poc-contribution">
        <span className="mono">{tx(lang, 'MA CONTRIBUTION', 'MY CONTRIBUTION')}</span>
        <h4>{tx(lang, 'Le socle Playwright utilisé par l’agent.', 'The Playwright foundation used by the agent.')}</h4>
        <p>{tx(lang, 'J’ai développé ce socle d’automatisation en Playwright / TypeScript. Le POC s’appuie sur lui pour agir dans l’application et lancer les tests.', 'I developed this automation foundation in Playwright / TypeScript. The proof of concept uses it to interact with the application and run tests.')}</p>
        <dl className="poc-stack">
          <div><dt>Playwright / TypeScript</dt><dd>{tx(lang, 'Navigation, scénarios de test et intégration CI/CD.', 'Navigation, test scenarios, and CI/CD integration.')}</dd></div>
          <div><dt>Python / FastAPI</dt><dd>{tx(lang, 'Orchestration du POC et couche API autour du dispositif.', 'Proof of concept orchestration and its API layer.')}</dd></div>
          <div><dt>Jira / LLM</dt><dd>{tx(lang, 'Analyse de la demande et travail sur les tests avec OpenCode et les modèles Qwen ou GLM.', 'Request analysis and work on tests using OpenCode and Qwen or GLM models.')}</dd></div>
        </dl>
      </div>
    </div>
    <div className="poc-scope">
      <section><span className="scope-label">{en ? 'EXISTS TODAY' : 'EXISTANT'}</span><h4>{en ? 'An automation foundation.' : 'Un socle d’automatisation.'}</h4><p>{en ? 'The Playwright / TypeScript foundation I developed, with test work and CI/CD integration.' : 'Le socle Playwright / TypeScript que j’ai développé, le travail sur les tests et leur intégration CI/CD.'}</p></section>
      <section><span className="scope-label">{en ? 'PROTOTYPE' : 'EN POC'}</span><h4>{en ? 'An agent connected to testing.' : 'Un agent relié aux tests.'}</h4><p>{en ? 'Jira analysis, application access via Playwright, test writing or updates, and test execution through Python orchestration.' : 'Analyse Jira, accès à l’application via Playwright, écriture ou modification des tests et lancement via une orchestration Python.'}</p></section>
      <section><span className="scope-label">{en ? 'TARGET' : 'OBJECTIF'}</span><h4>{en ? 'From request to report.' : 'De la demande au compte rendu.'}</h4><p>{en ? 'Prepare or create the right contract, run the scenario, analyze the result, and return evidence. End-to-end autonomy is not claimed.' : 'Préparer ou créer le bon contrat, exécuter le scénario, analyser le résultat et restituer une preuve. L’autonomie de bout en bout n’est pas revendiquée.'}</p></section>
    </div>
    <div className="poc-workflow">
      <div className="poc-workflow-heading"><h4>{en ? 'The intended workflow' : 'Le parcours visé'}</h4><span className="mono">{en ? 'PROOF OF CONCEPT / TARGET FLOW' : 'POC / PARCOURS CIBLE'}</span></div>
      <ol aria-label={en ? 'Intended workflow, not a claim of a fully autonomous system' : 'Parcours cible, sans revendication d’autonomie complète'}>{steps.map((step, index) => <li key={index}><span className="mono">0{index + 1}</span><strong>{step}</strong>{index < steps.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}</li>)}</ol>
    </div>
    {demoMedia.playwright.video && <DemoVideo media={demoMedia.playwright} lang={lang} title={en ? 'AI agent × Playwright' : 'Agent IA × Playwright'} description={en ? 'Recording of the internal proof of concept.' : 'Enregistrement du POC interne.'}/>}
    <POCContext lang={lang}/>
    </ProjectDetails>
  </article>;
}

export function AboutSection({ lang }) {
  const en = lang === 'en';
  const manifesto = en ? [
    ['Build.', 'Start from a concrete problem and make something that can be tested.'],
    ['Observe.', 'Measure, instrument, and understand what the system actually does.'],
    ['Iterate.', 'Correct, simplify, and improve until the result is robust.'],
  ] : [
    ['Construire.', 'Partir d’un problème concret et produire quelque chose que l’on peut tester.'],
    ['Observer.', 'Mesurer, instrumenter et comprendre ce que fait réellement le système.'],
    ['Recommencer.', 'Corriger, simplifier et améliorer jusqu’à obtenir quelque chose de robuste.'],
  ];
  return <section className="section retro-window profile-window" id="apropos" aria-labelledby="profile-title">
    <WindowBar title="profil.txt" detail={en ? 'About' : 'À propos'}/>
    <div className="profile-grid">
      <div className="profile-identity">
        <h2 id="profile-title">Charles Vanzetta</h2>
        <figure className="profile-portrait">
          <img src={portraitUrl} width="540" height="720" alt={tx(lang, 'Portrait de Charles Vanzetta', 'Portrait of Charles Vanzetta')} decoding="async"/>
        </figure>
      </div>
      <div className="profile-copy">
        <h3>{en ? 'How I work' : 'Ma façon de travailler'}</h3>
        {en
          ? <p>I use AI to explore ideas, automate repetitive tasks, and get feedback quickly. I take time to frame the problem, check the results, and make the decision. I like the principle behind Cal Newport’s <cite>Deep Work</cite> and set aside time without interruptions for problems that need my full attention.</p>
          : <p>J’utilise l’IA pour explorer des idées, automatiser les tâches répétitives et obtenir un premier retour. Je prends le temps de poser le problème, de vérifier les résultats et de décider. Je me retrouve dans l’idée du <cite>Deep Work</cite> de Cal Newport et je réserve du temps sans interruption aux problèmes qui demandent toute mon attention.</p>}
        <ol className="profile-steps">{manifesto.map(([title, description]) => <li key={title}><strong>{title}</strong><p>{description}</p></li>)}</ol>
        <div className="experience">
          <h3>{en ? 'Automation & AI' : 'Automatisation & IA'}</h3>
          <p>Fortil · Mutuelle de Poitiers Assurances</p>
          <p>{en ? 'Playwright / TypeScript, GitLab CI/CD, and Python / LLM orchestration for QA: generating, diagnosing, and repairing tests.' : 'Playwright / TypeScript, GitLab CI/CD et orchestration Python / LLM pour la QA : génération, diagnostic et auto-correction de tests.'}</p>
          <a className="text-link" href={asset(cvFile(lang))} download>{en ? 'Download my CV' : 'Télécharger mon CV'}</a>
        </div>
      </div>
    </div>
  </section>;
}

export function usePageExperience() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll('[data-reveal]')];
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .06 });
    nodes.forEach(node => { node.classList.add('reveal-ready'); observer.observe(node); });
    const revealAll = () => { if (preference.matches) { nodes.forEach(node => node.classList.add('is-visible')); observer.disconnect(); } };
    revealAll();
    preference.addEventListener('change', revealAll);
    return () => { observer.disconnect(); preference.removeEventListener('change', revealAll); };
  }, []);
}
