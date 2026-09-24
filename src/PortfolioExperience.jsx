import React, { useEffect, useId, useRef, useState } from 'react';
import DemoVideo, { demoMedia } from './DemoVideo';
import { cvFile } from './content';
import POCContext from './POCContext';

const tx = (lang, fr, en) => lang === 'en' ? en : fr;
const asset = name => `${import.meta.env.BASE_URL}${name}`;
const identityWords = {
  fr: ['développeur', 'compétiteur', 'traveler', 'explorer', 'deep worker'],
  en: ['developer', 'competitor', 'traveler', 'explorer', 'deep worker'],
};

function RotatingIdentity({ lang }) {
  const words = identityWords[lang];
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) { setWordIndex(0); setLength(words[0].length); setDeleting(false); return undefined; }
    const word = words[wordIndex];
    const complete = length === word.length;
    const empty = length === 0;
    const delay = complete && !deleting ? 1350 : deleting ? 55 : 95;
    const timer = window.setTimeout(() => {
      if (complete && !deleting) setDeleting(true);
      else if (empty && deleting) { setDeleting(false); setWordIndex(index => (index + 1) % words.length); }
      else setLength(value => value + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [deleting, length, wordIndex, words]);
  const current = words[wordIndex].slice(0, length);
  return <div className="hero-identity"><span aria-hidden="true">{lang === 'en' ? 'I’m a' : 'Je suis'} <strong>{current}<i>_</i></strong></span><span className="sr-only">{lang === 'en' ? 'Developer, competitor, traveler, explorer and deep worker.' : 'Développeur, compétiteur, traveler, explorer et deep worker.'}</span></div>;
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
    <a href="#accueil" className="wordmark" aria-label={tx(lang, 'Charles Vanzetta, accueil', 'Charles Vanzetta, home')}>cv</a>
    <span className="header-label">CHARLES VANZETTA<br/><span>{tx(lang, 'DÉVELOPPEMENT & IA', 'DEVELOPMENT & AI')}</span></span>
    <nav aria-label={tx(lang, 'Navigation principale', 'Main navigation')}>
      <a href="#projets">{tx(lang, 'Projets', 'Projects')}</a>
      <a href="#apropos">{tx(lang, 'À propos', 'About')}</a>
      <a className="nav-contact" href="#contact">Contact <span className="link-arrow" aria-hidden="true">↗</span></a>
    </nav>
    <div className="language-switch" role="group" aria-label={tx(lang, 'Langue du site', 'Site language')}>
      <button type="button" lang="fr" aria-label="Français" aria-pressed={lang === 'fr'} onClick={() => onLanguageChange('fr')}>FR</button>
      <button type="button" lang="en" aria-label="English" aria-pressed={lang === 'en'} onClick={() => onLanguageChange('en')}>EN</button>
    </div>
  </header>;
}

export function Hero({ lang }) {
  return <section className="hero hero-cover" id="accueil" aria-labelledby="hero-title">
    <div className="hero-overline"><span>{tx(lang, 'PORTFOLIO / LOGICIEL · IA · DATA', 'PORTFOLIO / SOFTWARE · AI · DATA')}</span><span>POITIERS · NIORT</span></div>
    <div className="cover-layout">
      <h1 className="sr-only" id="hero-title">{tx(lang, 'Charles Vanzetta — Développement logiciel et IA appliquée', 'Charles Vanzetta — Software development and applied AI')}</h1>
      <div className="cover-art">
        <span className="cover-type cover-type-back" aria-hidden="true"><span>FULLSTACK</span><span>DEVELOPER</span></span>
        <img className="cover-portrait" src={asset('portrait-cutout-v2-900.webp')} srcSet={`${asset('portrait-cutout-v2-540.webp')} 540w, ${asset('portrait-cutout-v2-900.webp')} 900w`} sizes="(max-width: 600px) 85vw, (max-width: 900px) 480px, 650px" width="900" height="1200" alt={tx(lang, 'Portrait de Charles Vanzetta', 'Portrait of Charles Vanzetta')} fetchPriority="high"/>
        <span className="cover-code-mark" aria-hidden="true">&lt;/&gt;</span>
        <span className="cover-type cover-type-front" aria-hidden="true">APPLIED AI</span>
        <span className="cover-caption mono">{tx(lang, 'AUTOMATISER. EXPLORER. CONSTRUIRE.', 'AUTOMATE. EXPLORE. BUILD.')}</span>
      </div>
      <div className="hero-copy cover-copy">
        <p className="hero-intro mono">{tx(lang, 'BONJOUR, MOI C’EST', 'HELLO, I’M')}<strong>Charles Vanzetta.</strong></p>
        <RotatingIdentity lang={lang}/>
        <p className="hero-role">{tx(lang, 'Développement logiciel', 'Software development')}<br/><span>{tx(lang, 'IA appliquée, LLM & data.', 'Applied AI, LLMs & data.')}</span></p>
        <p className="hero-description">{tx(lang, 'Je construis des outils pour automatiser les tâches, explorer des modèles et rendre les systèmes plus lisibles.', 'I build tools to automate tasks, explore models, and make systems easier to understand.')}</p>
        <div className="hero-actions"><a className="button primary" href="#projets">{tx(lang, 'Voir mes projets', 'View my projects')} <span aria-hidden="true">↓</span></a><a className="text-link" href="#contact">{tx(lang, 'Me contacter', 'Get in touch')} <span className="link-arrow" aria-hidden="true">↗</span></a></div>
        <a className="cover-cv" href={asset(cvFile(lang))} download>{tx(lang, 'Télécharger mon CV', 'Download my CV')} <span aria-hidden="true">↓</span></a>
      </div>
    </div>
  </section>;
}

const topics = [
  { id: 'poc-qa', fr: 'AUTOMATISATION', en: 'AUTOMATION', caption: '01 / PLAYWRIGHT' },
  { id: 'pdf-verifier', fr: 'ÉVALUATION', en: 'EVALUATION', caption: '02 / PDF VERIFIER' },
  { id: 'algovisualizer', fr: 'ALGORITHMIQUE', en: 'ALGORITHMS', caption: '03 / ALGOVISUALIZER' },
  { id: 'snake-ai', fr: 'IA APPLIQUÉE', en: 'APPLIED AI', caption: '04 / SNAKE AI' },
  { id: 'enervision', fr: 'DATA', en: 'DATA', caption: '05 / ENERVISION' },
];

export function TopicNav({ lang }) {
  const nav = useRef(null);
  const track = useRef(null);
  const [active, setActive] = useState(null);
  useEffect(() => {
    let observer;
    const header = document.querySelector('.editorial-header');
    const watch = () => {
      observer?.disconnect();
      const height = nav.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--topic-height', `${height}px`);
      const top = Math.min(header.getBoundingClientRect().height + height + 24, window.innerHeight - 80);
      const bottom = Math.max(0, window.innerHeight - top - 140);
      const visible = new Map();
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) visible.set(entry.target.id, entry.target); else visible.delete(entry.target.id); });
        const current = [...visible.values()].sort((a, b) => Math.abs(a.getBoundingClientRect().top - top) - Math.abs(b.getBoundingClientRect().top - top))[0];
        setActive(current?.id || null);
      }, { rootMargin: `-${top}px 0px -${bottom}px 0px`, threshold: 0 });
      topics.forEach(topic => { const node = document.getElementById(topic.id); if (node) observer.observe(node); });
    };
    const resize = new ResizeObserver(watch);
    resize.observe(header); resize.observe(nav.current);
    window.addEventListener('resize', watch);
    watch();
    return () => { observer?.disconnect(); resize.disconnect(); window.removeEventListener('resize', watch); };
  }, []);
  useEffect(() => {
    const item = track.current.querySelector('[aria-current="location"]');
    if (!item) return;
    const parentBox = track.current.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    if (itemBox.left < parentBox.left || itemBox.right > parentBox.right) {
      track.current.scrollTo({ left: track.current.scrollLeft + itemBox.left - parentBox.left - (parentBox.width - itemBox.width) / 2, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  }, [active]);
  return <nav className="topic-nav" ref={nav} aria-label={tx(lang, 'Explorer les projets par domaine', 'Explore projects by area')}>
    <div className="topic-track" ref={track}>{topics.map(topic => <a href={`#${topic.id}`} key={topic.id} aria-current={active === topic.id ? 'location' : undefined}>
      <span>{topic[lang]}</span><small>{topic.caption}</small>
    </a>)}</div>
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
  return <article className="work-poc poc-story" id="poc-qa" aria-labelledby="poc-title">
    <div className="poc-overview">
      <div className="poc-overview-copy">
        <p className="section-eyebrow">{en ? '01 / AT WORK · AUTOMATION & AI' : '01 / EN ENTREPRISE · AUTOMATISATION & IA'}</p>
        <span className="poc-badge">{en ? 'INTERNAL PROOF OF CONCEPT' : 'POC INTERNE'}</span>
        <h3 id="poc-title">{en ? 'From a tester’s request' : 'De la demande du testeur'}<br/><em>{en ? 'to a verifiable result.' : 'au résultat vérifiable.'}</em></h3>
        <p>{en ? 'I developed the Playwright foundation used by the agent. The goal: reduce repetitive test preparation while keeping control over the actions performed.' : 'J’ai développé le socle Playwright utilisé par l’agent. L’objectif : réduire la préparation répétitive des tests, tout en gardant le contrôle des actions effectuées.'}</p>
        <p className="poc-transverse">{en ? 'I also contribute to a group of around ten people with a cross-functional view of the proof of concept and its integration into the company.' : 'Je participe aussi à un groupe d’environ dix personnes avec une vision transverse du POC et de son intégration dans l’entreprise.'}</p>
      </div>
      <DemoVideo media={demoMedia.playwright} lang={lang} title={en ? 'AI agent × Playwright' : 'Agent IA × Playwright'} description={demoMedia.playwright.video ? (en ? 'Demonstration of the internal proof of concept.' : 'Démonstration du POC interne.') : (en ? 'Recording to come: request → agent → Playwright → application → result.' : 'Enregistrement à venir : demande → agent → Playwright → application → résultat.')}/>
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
    <POCContext lang={lang}/>
    <div className="poc-proof-notes">
      <div><span className="mono">{en ? 'WHAT THE DEMO WILL SHOW' : 'CE QUE MONTRERA LA DÉMO'}</span><ol className="proof-outline"><li>{en ? 'The tester’s request and its context.' : 'La demande du testeur et son contexte.'}</li><li>{en ? 'The agent using the Playwright foundation.' : 'L’agent qui utilise le socle Playwright.'}</li><li>{en ? 'The result, with a test trace where available.' : 'Le résultat, avec une trace du test si disponible.'}</li></ol><p>{en ? 'Internal project. Code and application are private; no public performance benchmark is claimed.' : 'Projet interne. Code et application non publics ; aucun benchmark de performance public n’est revendiqué.'}</p><a className="text-link" href="#contact">{en ? 'Discuss this work' : 'Échanger sur cette expérience'} <span className="link-arrow" aria-hidden="true">↗</span></a></div>
    </div>
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
  return <section className="about section about-manifesto" id="apropos" aria-labelledby="manifesto-title">
    <aside className="about-note" data-reveal><span className="mono">{en ? 'THE COMMON THREAD' : 'LE FIL CONDUCTEUR'}</span><p>{en ? 'An idea becomes useful' : 'Une idée devient utile'}<br/>{en ? 'when you can' : 'quand on peut'}<br/><em>{en ? 'put it to the test.' : 'la mettre à l’épreuve.'}</em></p><span className="about-arrow" aria-hidden="true">↳</span><span className="mono">{en ? 'AUTOMATION / AI / DATA' : 'AUTOMATISATION / IA / DATA'}</span></aside>
    <div className="about-copy"><p className="section-eyebrow">{en ? '02 / ABOUT · HOW I WORK' : '02 / À PROPOS · MA FAÇON DE TRAVAILLER'}</p><h2 className="sr-only" id="manifesto-title">{en ? 'Build. Observe. Iterate.' : 'Construire. Observer. Recommencer.'}</h2>
      <ol className="manifesto-steps">{manifesto.map(([title, description], index) => <li key={index} data-reveal><span className="mono">0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
      <div className="experience" data-reveal><span className="mono">{en ? '2024 → PRESENT' : '2024 → AUJOURD’HUI'}</span><h3>{en ? 'Automation & AI' : 'Automatisation & IA'}</h3><p>Fortil · Mutuelle de Poitiers Assurances</p><p>{en ? 'Playwright / TypeScript, GitLab CI/CD, and Python / LLM orchestration for QA: generating, diagnosing, and repairing tests.' : 'Playwright / TypeScript, GitLab CI/CD et orchestration Python / LLM pour la QA : génération, diagnostic et auto-correction de tests.'}</p><small>{en ? 'My professional scope is described in my CV. Code and evaluations are not public.' : 'Périmètre professionnel décrit dans mon CV. Le code et les évaluations ne sont pas publics.'}</small></div>
      <p className="about-intent">{en ? 'I want to continue building systems involving LLMs, applied AI, and data.' : 'Je souhaite poursuivre ce travail sur des systèmes liés aux LLM, à l’IA appliquée et à la data.'}</p>
      <a className="text-link" href={asset(cvFile(lang))} download>{en ? 'My full background in my CV' : 'Le parcours complet dans mon CV'} <span className="link-arrow" aria-hidden="true">↓</span></a>
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
