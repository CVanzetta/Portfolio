import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { initialValues, sortFrames, verifyExample } from './algorithms';
import { profile, projects, secondary } from './content';
import { projectTranslations, secondaryTranslations } from './content.en';
import './style.css';
import SnakeEvolution from './SnakeEvolution';
import AnalyticsConsent from './AnalyticsConsent';

const asset = (name) => `${import.meta.env.BASE_URL}${name}`;
const tx = (lang, fr, en) => lang === 'en' ? en : fr;
function Arrow({ diagonal = false }) { return <span aria-hidden="true">{diagonal ? '↗' : '↗'}</span>; }
function External({ href, children, className = '', lang = 'fr' }) { return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only">{tx(lang, ' (nouvel onglet)', ' (opens in a new tab)')}</span></a>; }

function SortDemo({ lang }) {
  const [algorithm, setAlgorithm] = useState('quick');
  const [values, setValues] = useState(initialValues);
  const frames = useMemo(() => sortFrames(values, algorithm), [values, algorithm]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(true);
  const panel = useRef(null);
  const frame = frames[Math.min(index, frames.length - 1)];
  const done = index === frames.length - 1;
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(panel.current); return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const pauseHidden = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener('visibilitychange', pauseHidden);
    return () => document.removeEventListener('visibilitychange', pauseHidden);
  }, []);
  useEffect(() => {
    if (!inView) setPlaying(false);
  }, [inView]);
  useEffect(() => {
    if (!playing) return;
    if (done) { setPlaying(false); return; }
    const timer = setTimeout(() => setIndex(i => i + 1), 85);
    return () => clearTimeout(timer);
  }, [playing, index, done]);
  function changeAlgorithm(e) { setAlgorithm(e.target.value); setIndex(0); setPlaying(false); }
  function toggle() { if (done) setIndex(0); setPlaying(p => !p); }
  function shuffle() {
    const next = [...values];
    for (let i = next.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [next[i], next[j]] = [next[j], next[i]]; }
    setValues(next); setIndex(0); setPlaying(false);
  }
  return <div className="sort-demo" ref={panel}>
    <div className="demo-top"><span className="mono">LAB / 01</span><span className="demo-tag">{tx(lang, 'ALGORITHME EN ACTION', 'ALGORITHM IN ACTION')}</span></div>
    <div className="demo-heading"><h2>{tx(lang, 'Un peu d’ordre.', 'Putting things in order.')}<br/><span>{tx(lang, 'Étape par étape.', 'Step by step.')}</span></h2><span className="asterisk" aria-hidden="true">↳</span></div>
    <div className="bars" role="img" aria-label={tx(lang, `Tableau de ${frame.values.length} valeurs. ${done ? 'Tri terminé.' : 'Tri en cours de démonstration.'} Valeurs : ${frame.values.join(', ')}`, `Array of ${frame.values.length} values. ${done ? 'Sorting complete.' : 'Sorting demonstration in progress.'} Values: ${frame.values.join(', ')}`)}>
      {frame.values.map((v, i) => <div className={`bar ${frame.active.includes(i) ? 'active' : ''} ${done ? 'sorted' : ''}`} style={{ height: `${v}%` }} key={i}><span>{v}</span></div>)}
    </div>
    <div className="chart-axis"><span>01</span><span>{done ? tx(lang, 'TABLEAU TRIÉ', 'SORTED ARRAY') : tx(lang, '24 VALEURS · DONNÉES D’EXEMPLE', '24 VALUES · SAMPLE DATA')}</span><span>24</span></div>
    <div className="demo-controls">
      <label className="select-wrap"><span className="sr-only">{tx(lang, 'Algorithme de tri', 'Sorting algorithm')}</span><select value={algorithm} onChange={changeAlgorithm}><option value="quick">Quick Sort</option><option value="bubble">Bubble Sort</option><option value="insertion">Insertion Sort</option></select></label>
      <button className="play" onClick={toggle}>{playing ? 'Ⅱ Pause' : done ? tx(lang, '↻ Rejouer', '↻ Replay') : tx(lang, '▶ Lancer', '▶ Play')}</button>
      <button className="shuffle" onClick={shuffle} aria-label={tx(lang, 'Mélanger les valeurs', 'Shuffle values')}>↻</button>
      <button className="step" onClick={() => { setPlaying(false); setIndex(i => Math.min(i + 1, frames.length - 1)); }} disabled={done}>{tx(lang, 'Un pas', 'Step')}</button>
    </div>
    <div className="demo-stats"><span>{String(index).padStart(2, '0')}<small> / {frames.length - 1} {tx(lang, 'étapes', 'steps')}</small></span><span>{frame.comparisons}<small> {tx(lang, frame.comparisons > 1 ? 'comparaisons' : 'comparaison', frame.comparisons > 1 ? 'comparisons' : 'comparison')}</small></span></div>
    <p className="demo-caption">{tx(lang, 'Adaptation interactive pour ce portfolio, d’après mon projet ', 'Interactive adaptation for this portfolio, based on my project ')}<a href="#algovisualizer">AlgoVisualizer ↗</a>.</p>
    <span className="sr-only" role="status">{done ? tx(lang, 'Tri terminé', 'Sorting complete') : playing ? tx(lang, 'Lecture', 'Playing') : tx(lang, 'En pause', 'Paused')}</span>
  </div>;
}

function PDFDemo({ lang }) {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const panel = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .2 });
    observer.observe(panel.current);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => setReduced(media.matches);
    media.addEventListener('change', onMotionChange);
    return () => { observer.disconnect(); media.removeEventListener('change', onMotionChange); };
  }, []);
  useEffect(() => {
    if (!playing || !inView || reduced) return;
    const timer = setInterval(() => { if (!document.hidden) setFrame(previous => (previous + 1) % 6); }, 2200);
    return () => clearInterval(timer);
  }, [playing, inView, reduced]);
  const hasClause = frame >= 3;
  const clauseFound = verifyExample(hasClause ? tx(lang, 'Article 04 : Protection des données', 'Section 04: Data protection') : tx(lang, 'Article 04 : Prestations', 'Section 04: Services'), tx(lang, 'protection des données', 'data protection'));
  const phase = frame % 3;
  const result = phase === 0 ? tx(lang, 'Contrat reçu', 'Contract received') : phase === 1 ? tx(lang, 'Recherche de la clause…', 'Checking for the clause…') : clauseFound ? tx(lang, 'Contrôle satisfait', 'Check passed') : tx(lang, 'Contrôle à reprendre', 'Review required');
  return <div className="pdf-demo" ref={panel}>
    <div className="visual-label"><span>{tx(lang, '01 / CONTRÔLE D’UNE CLAUSE', '01 / CLAUSE CHECK')}</span><span>{tx(lang, 'EXEMPLE FICTIF', 'FICTIONAL EXAMPLE')}</span></div>
    <div className="pdf-steps" aria-label={tx(lang, 'Étapes du contrôle', 'Check stages')}><span className={phase === 0 ? 'current' : ''}>01 {tx(lang, 'Recevoir', 'Receive')}</span><span className={phase === 1 ? 'current' : ''}>02 {tx(lang, 'Vérifier', 'Check')}</span><span className={phase === 2 ? 'current' : ''}>03 {tx(lang, 'Signaler', 'Flag')}</span></div>
    <div className={`document-example contract-example ${phase === 1 ? 'scanning' : ''}`}>
      <span className="mono">{tx(lang, 'CONTRAT FOURNISSEUR · DÉMONSTRATION', 'SUPPLIER CONTRACT · DEMO')}</span>
      <h4>{tx(lang, 'Accord de prestation', 'Service agreement')}</h4>
      <div className="document-lines" aria-hidden="true"><i/><i/><i/></div>
      <p className={`contract-clause ${clauseFound ? 'present' : phase === 2 ? 'missing' : ''}`}><span>{tx(lang, 'ARTICLE 04', 'SECTION 04')}</span><strong>{clauseFound ? tx(lang, 'Protection des données', 'Data protection') : tx(lang, 'Prestations et livraison', 'Services and delivery')}</strong></p>
      {phase === 1 && <span className="pdf-scan-line" aria-hidden="true"/>}
    </div>
    <div className={`check-result pdf-result ${phase === 2 && !clauseFound ? 'failed' : ''}`} role="status"><span>{phase === 2 ? clauseFound ? '✓' : '!' : phase === 1 ? '⌕' : '↓'}</span><div><strong>{result}</strong><small>{phase === 2 ? clauseFound ? tx(lang, 'La clause attendue est repérée.', 'The required clause was found.') : tx(lang, 'Clause manquante : revue humaine requise.', 'Missing clause: human review required.') : tx(lang, 'Règle : repérer la clause de protection des données.', 'Rule: find the data protection clause.')}</small></div></div>
    <div className="pdf-controls"><button type="button" aria-pressed={!hasClause} onClick={() => { setPlaying(false); setFrame(2); }}>{tx(lang, 'Clause absente', 'Clause missing')}</button><button type="button" aria-pressed={hasClause} onClick={() => { setPlaying(false); setFrame(5); }}>{tx(lang, 'Clause ajoutée', 'Clause added')}</button><button type="button" onClick={() => { if (playing) setPlaying(false); else { setFrame(0); setPlaying(true); } }} disabled={reduced}>{playing && !reduced ? 'Ⅱ Pause' : tx(lang, '▶ Revoir', '▶ Replay')}</button></div>
    <p className="pdf-benefit">{tx(lang, 'Un contrôle répétitif automatisé peut signaler un oubli avant validation et libérer du temps pour la revue humaine.', 'An automated routine check can flag an omission before approval and free up time for human review.')}</p>
  </div>;
}

function EnergyDiagram({ lang }) {
  const video = useRef(null);
  useEffect(() => {
    if (!video.current) return;
    const observer = new IntersectionObserver(([e]) => { if (!e.isIntersecting) video.current?.pause(); });
    observer.observe(video.current); return () => observer.disconnect();
  }, []);
  if (profile.enervisionVideo && profile.enervisionPoster) return <video ref={video} controls muted playsInline preload="none" poster={asset(profile.enervisionPoster)} src={asset(profile.enervisionVideo)} aria-label={tx(lang, 'Démonstration originale ENERVISION', 'Original ENERVISION demo')} />;
  return <div className="energy-demo"><div className="visual-label"><span>{tx(lang, '04 / DU PIPELINE AU SUIVI', '04 / FROM PIPELINE TO MONITORING')}</span><span>{tx(lang, 'PROJET D’EXAMEN', 'FINAL EXAM PROJECT')}</span></div><div className="pipeline"><div><small>{tx(lang, '01 / PRÉPARER', '01 / PREPARE')}</small><strong>{tx(lang, 'Données → ETL', 'Data → ETL')}</strong></div><span aria-hidden="true">↓</span><div><small>{tx(lang, '02 / APPRENDRE', '02 / TRAIN')}</small><strong>{tx(lang, 'Entraînement du modèle', 'Model training')}</strong></div><span aria-hidden="true">↓</span><div><small>{tx(lang, '03 / EXPLOITER', '03 / OPERATE')}</small><strong>{tx(lang, 'Mise en place & alerting', 'Deployment & alerts')}</strong></div></div><div className="energy-bottom"><span className="mono">{tx(lang, 'MON PÉRIMÈTRE', 'MY ROLE')}</span><p>{tx(lang, 'Product Owner · ETL · entraînement · alerting', 'Product Owner · ETL · training · alerting')}</p></div><p className="visual-footnote">{tx(lang, 'Schéma de mon intervention. Hébergement scolaire arrêté après l’examen.', 'Diagram of my work. School hosting ended after the exam.')}</p></div>;
}

function Project({ project: p, lang }) {
  return <article id={p.id} className={`project project-${p.id}`}>
    <div className="project-visual">{p.id === 'pdf-verifier' ? <PDFDemo lang={lang}/> : p.id === 'algovisualizer' ? <figure className="algo-original"><div className="visual-label"><span>{tx(lang, '02 / LE PROJET ORIGINAL', '02 / THE ORIGINAL PROJECT')}</span><span>JAVA 21</span></div><img src={asset('algovisualizer.webp')} width="1200" height="559" loading="lazy" alt={tx(lang, 'Capture originale de l’accueil AlgoVisualizer : accès aux tris, graphes et labyrinthes', 'Original AlgoVisualizer home screen showing sorting, graphs, and mazes')}/><figcaption>{tx(lang, 'Capture originale issue du dépôt GitHub.', 'Original screenshot from the GitHub repository.')}<a href="#accueil">{tx(lang, 'Essayer l’adaptation ↑', 'Try the adaptation ↑')}</a></figcaption></figure> : p.id === 'snake-ai' ? <SnakeEvolution lang={lang}/> : <EnergyDiagram lang={lang}/>}</div>
    <div className="project-content"><div className="project-kicker"><span>{p.number} — {p.name}</span><span>{p.category}</span></div><h3>{p.title.split('\n').map((line, i) => <React.Fragment key={line}>{i > 0 && <br/>}{line}</React.Fragment>)}</h3><p className="project-summary">{p.summary}</p><p className="project-type">{p.type}</p><details><summary>{tx(lang, 'Dans le projet', 'Inside the project')} <span aria-hidden="true">+</span></summary><div className="case-study"><h4>{tx(lang, 'Ma contribution', 'My contribution')}</h4><p>{p.contribution}</p><h4>{tx(lang, 'Choix techniques', 'Technical choices')}</h4><p>{p.choices}</p><h4>{tx(lang, 'Ce qui est vérifiable', 'What you can verify')}</h4><p>{p.proof}</p><h4>{tx(lang, 'Limite actuelle', 'Current limitation')}</h4><p>{p.limit}</p><p className="case-note">{p.note}</p></div></details><div className="project-links">{p.repo ? <External href={p.repo} lang={lang}>{tx(lang, 'Explorer le code', 'Explore the code')} <Arrow/></External> : <a href={asset('CV-Charles-Vanzetta.pdf')} download>{tx(lang, 'Voir le projet dans mon CV ↓', 'See this project in my French CV ↓')}</a>}</div></div>
  </article>;
}

function Contact({ lang }) {
  const [copyState, setCopyState] = useState('');
  async function copy() {
    try { await navigator.clipboard.writeText(profile.email); setCopyState('copied'); }
    catch { setCopyState('error'); }
  }
  return <section className="contact section" id="contact"><div className="section-eyebrow">04 / CONTACT</div><div className="contact-heading"><h2>{tx(lang, 'Parlons de ce', 'Let’s talk about what')}<br/>{tx(lang, 'qu’on peut ', 'we can ')}<em>{tx(lang, 'construire.', 'build.')}</em></h2><a className="contact-circle" href={`mailto:${profile.email}`} aria-label={tx(lang, 'Envoyer un email à Charles Vanzetta', 'Email Charles Vanzetta')}>↗</a></div><div className="contact-bottom"><div><a className="email" href={`mailto:${profile.email}`}>{profile.email}</a><button className="copy" onClick={copy} aria-label={tx(lang, 'Copier l’adresse email', 'Copy email address')}>{tx(lang, 'Copier l’adresse ⧉', 'Copy address ⧉')}</button><span className="copy-status" role="status">{copyState === 'copied' ? tx(lang, 'Adresse copiée', 'Email address copied') : copyState === 'error' ? tx(lang, 'Copie indisponible : sélectionnez l’adresse ci-dessus.', 'Copy unavailable: select the address above.') : ''}</span></div><div className="socials"><External href={profile.github} lang={lang}>GitHub ↗</External><External href={profile.linkedin} lang={lang}>LinkedIn ↗</External><a href={asset('CV-Charles-Vanzetta.pdf')} download>{tx(lang, 'Télécharger mon CV ↓', 'Download my French CV ↓')}</a></div></div></section>;
}

function ProfessionalPOC({ lang }) {
  return <article className="work-poc" id="poc-qa"><div><p className="section-eyebrow">{tx(lang, 'EN ENTREPRISE / LLM & AUTOMATISATION', 'AT WORK / LLM & AUTOMATION')}</p><h3>{tx(lang, 'Un agent pour écrire', 'An agent to write')}<br/>{tx(lang, 'et lancer les tests.', 'and run tests.')}</h3><p>{tx(lang, 'POC IA interne : analyser un ticket Jira, ouvrir l’application avec Playwright, puis rédiger ou modifier les tests et les lancer.', 'Internal AI proof of concept: analyze a Jira ticket, open the application with Playwright, then write or update tests and run them.')}</p><small>{tx(lang, 'Projet professionnel · preuve de concept · code et application non publics.', 'Professional project · proof of concept · code and application are private.')}</small></div><div><div className="poc-flow" aria-label={tx(lang, 'Périmètre du POC', 'Proof of concept scope')}><span>{tx(lang, 'Ticket Jira', 'Jira ticket')}</span><b aria-hidden="true">→</b><span>{tx(lang, 'Agent IA', 'AI agent')}</span><b aria-hidden="true">→</b><span>Playwright {tx(lang, 'Tests', 'tests')}</span></div><p><strong>{tx(lang, 'Ma contribution.', 'My contribution.')}</strong> {tx(lang, 'Développement en Python avec OpenCode, utilisation de modèles Qwen ou GLM 5.2 et mise en place d’une couche FastAPI autour du dispositif.', 'Python development with OpenCode, use of Qwen or GLM 5.2 models, and a FastAPI layer around the system.')}</p><small>{tx(lang, 'Prototype interne, sans benchmark public. Le périmètre et les choix techniques peuvent être abordés en entretien.', 'Internal prototype without a public benchmark. I can discuss its scope and technical choices in an interview.')}</small><a href="#contact">{tx(lang, 'Échanger sur cette expérience ↗', 'Ask me about this work ↗')}</a></div></article>;
}

function App() {
  const [tile, setTile] = useState(false);
  const [lang, setLang] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (requested === 'en' || requested === 'fr') return requested;
    try { return localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'fr'; } catch { return 'fr'; }
  });
  const localizedProjects = lang === 'en' ? projects.map(project => ({ ...project, ...projectTranslations[project.id] })) : projects;
  const localizedSecondary = lang === 'en' ? secondary.map((project, index) => ({ ...project, ...secondaryTranslations[index] })) : secondary;
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = tx(lang, 'Charles Vanzetta — Développement, IA appliquée & data', 'Charles Vanzetta — Software development, applied AI & data');
    const metadata = {
      'meta[name="description"]': tx(lang, 'Portfolio de Charles Vanzetta : automatisation, IA appliquée et data. Découvrez mes projets, leurs choix techniques et leurs limites.', 'Charles Vanzetta’s portfolio: automation, applied AI, and data. Explore my projects, technical choices, and limitations.'),
      'meta[property="og:title"]': tx(lang, 'Charles Vanzetta — Du code aux preuves.', 'Charles Vanzetta — Code backed by evidence.'),
      'meta[property="og:description"]': tx(lang, 'Développement logiciel, IA appliquée et data. Projets, démonstrations et choix techniques.', 'Software development, applied AI, and data. Projects, demos, and technical choices.'),
      'meta[property="og:locale"]': lang === 'en' ? 'en_US' : 'fr_FR',
    };
    for (const [selector, value] of Object.entries(metadata)) document.querySelector(selector)?.setAttribute('content', value);
  }, [lang]);
  function chooseLanguage(next) {
    setLang(next);
    try { localStorage.setItem('portfolio-language', next); } catch { /* Keep the choice for this visit. */ }
    const url = new URL(window.location.href);
    if (next === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }
  return <>
    <a className="skip" href="#main">{tx(lang, 'Aller au contenu', 'Skip to content')}</a>
    <header className="header"><a href="#accueil" className="wordmark" aria-label={tx(lang, 'Charles Vanzetta, accueil', 'Charles Vanzetta, home')}>cv<span>_</span></a><span className="header-label">CHARLES VANZETTA<br/><span>{tx(lang, 'DÉVELOPPEMENT & IA', 'DEVELOPMENT & AI')}</span></span><nav aria-label={tx(lang, 'Navigation principale', 'Main navigation')}><a href="#projets">{tx(lang, 'Projets', 'Projects')}</a><a href="#apropos">{tx(lang, 'À propos', 'About')}</a><a className="nav-contact" href="#contact">Contact <Arrow/></a></nav><div className="language-switch" role="group" aria-label={tx(lang, 'Langue du site', 'Site language')}><button type="button" lang="fr" aria-pressed={lang === 'fr'} onClick={() => chooseLanguage('fr')}>FR</button><button type="button" lang="en" aria-pressed={lang === 'en'} onClick={() => chooseLanguage('en')}>EN</button></div></header>
    <main id="main" tabIndex={-1}><section className="hero" id="accueil"><div className="hero-copy"><div className="hero-overline"><span>PORTFOLIO</span><span>POITIERS · NIORT</span></div><div className="identity-row"><h1>Charles<br/><span>Vanzetta<span className="name-dot">.</span></span></h1><figure className="hero-portrait"><img src={asset('portrait.webp')} width="540" height="720" alt={tx(lang, 'Portrait de Charles Vanzetta', 'Portrait of Charles Vanzetta')} fetchPriority="high"/></figure></div><p className="hero-role">{tx(lang, 'Développement logiciel', 'Software development')}<br/><span>{tx(lang, 'IA appliquée, LLM & data.', 'Applied AI, LLMs & data.')}</span></p><p className="hero-description">{tx(lang, 'Je construis des outils pour automatiser les tâches, explorer des modèles et rendre les algorithmes lisibles.', 'I build tools to automate tasks, explore models, and make algorithms easier to understand.')}</p><div className="hero-actions"><a className="button primary" href="#projets">{tx(lang, 'Voir mes projets', 'View my projects')} <span aria-hidden="true">↓</span></a><a className="text-link" href="#contact">{tx(lang, 'Me contacter', 'Get in touch')} <Arrow/></a></div><div className="hero-footer"><span className="mono">{tx(lang, 'COMPRENDRE → CONSTRUIRE → VÉRIFIER', 'UNDERSTAND → BUILD → VERIFY')}</span><a href={asset('CV-Charles-Vanzetta.pdf')} download>{tx(lang, 'Mon CV ↓', 'My CV (FR) ↓')}</a></div></div><SortDemo lang={lang}/></section>
    <div className="ticker" aria-label={tx(lang, 'Domaines de travail', 'Areas of work')}><span>{tx(lang, 'AUTOMATISATION', 'AUTOMATION')}</span><span aria-hidden="true">✳</span><span>{tx(lang, 'IA APPLIQUÉE', 'APPLIED AI')}</span><span aria-hidden="true">✳</span><span>{tx(lang, 'ALGORITHMIQUE', 'ALGORITHMS')}</span><span aria-hidden="true">✳</span><span>DATA</span><span aria-hidden="true">✳</span><span>{tx(lang, 'ÉVALUATION', 'EVALUATION')}</span></div>
    <section className="section projects" id="projets"><div className="section-title"><div><p className="section-eyebrow">{tx(lang, '01 / PROJETS CHOISIS', '01 / SELECTED PROJECTS')}</p><h2>{tx(lang, 'Du code.', 'Code.')}<br/><em>{tx(lang, 'Des preuves.', 'Evidence.')}</em></h2></div><p>{tx(lang, 'Un POC en entreprise et quatre projets pour voir', 'One workplace proof of concept and four projects showing')}<br className="desktop"/> {tx(lang, 'ce que je construis, des choix techniques aux limites.', 'what I build, from technical choices to limitations.')}</p></div><ProfessionalPOC lang={lang}/><div className="project-list">{localizedProjects.map(p => <Project project={p} lang={lang} key={p.id}/>)}</div><div className="more-projects"><h3>{tx(lang, 'D’autres terrains d’exploration', 'More areas to explore')}<span> / 03</span></h3>{localizedSecondary.map((p, i) => <details key={p.name}><summary><span className="mono">0{i + 5}</span><strong>{p.name}</strong><span className="secondary-area">{p.area}</span><span className="plus" aria-hidden="true">+</span></summary><div><p>{p.description}</p><External href={p.url} lang={lang}>{tx(lang, 'Consulter le dépôt ↗', 'View the repository ↗')}</External></div></details>)}</div></section>
    <section className="about section" id="apropos"><aside className="about-note"><span className="mono">{tx(lang, 'LE FIL CONDUCTEUR', 'THE COMMON THREAD')}</span><p>{tx(lang, 'Une idée devient utile', 'An idea becomes useful')}<br/>{tx(lang, 'quand on peut', 'when you can')}<br/><em>{tx(lang, 'la mettre à l’épreuve.', 'put it to the test.')}</em></p><span className="about-arrow" aria-hidden="true">↳</span><span className="mono">{tx(lang, 'AUTOMATISATION / IA / DATA', 'AUTOMATION / AI / DATA')}</span></aside><div className="about-copy"><p className="section-eyebrow">{tx(lang, '02 / À PROPOS', '02 / ABOUT')}</p><h2>{tx(lang, 'Construire.', 'Build.')}<br/>{tx(lang, 'Observer.', 'Observe.')}<br/><em>{tx(lang, 'Recommencer.', 'Iterate.')}</em></h2><p>{tx(lang, 'Développeur logiciel orienté IA et data, je travaille sur l’automatisation et les outils qui permettent de vérifier le comportement d’un système.', 'I am a software developer focused on AI and data. I work on automation and tools that make it possible to verify how a system behaves.')}</p><div className="experience"><span className="mono">{tx(lang, '2024 → AUJOURD’HUI', '2024 → PRESENT')}</span><h3>{tx(lang, 'Automatisation & IA', 'Automation & AI')}</h3><p>Fortil · Mutuelle de Poitiers Assurances</p><p>{tx(lang, 'Tests Playwright / TypeScript, intégration GitLab CI/CD et orchestration Python / LLM pour la QA : génération, diagnostic et auto-correction de tests.', 'Playwright / TypeScript tests, GitLab CI/CD integration, and Python / LLM orchestration for QA: generating, diagnosing, and repairing tests.')}</p><small>{tx(lang, 'Périmètre professionnel décrit dans mon CV. Le code et les évaluations de ces outils ne sont pas publics.', 'My professional scope is described in my CV. The code and evaluations for these tools are not public.')}</small></div><p className="about-intent">{tx(lang, 'Je souhaite poursuivre ce travail sur des postes liés aux LLM, à l’IA appliquée et à la data.', 'I want to continue this work in roles involving LLMs, applied AI, and data.')}</p><a className="text-link" href={asset('CV-Charles-Vanzetta.pdf')} download>{tx(lang, 'Le parcours complet dans mon CV ↓', 'My full background in my French CV ↓')}</a></div></section>
    <section className="method section"><div className="section-title"><div><p className="section-eyebrow">{tx(lang, 'UNE FAÇON DE TRAVAILLER', 'HOW I WORK')}</p><h2>{tx(lang, 'Rendre le résultat', 'Make the result')}<br/><em>{tx(lang, 'vérifiable.', 'verifiable.')}</em></h2></div><p>{tx(lang, 'Du problème initial aux limites du système,', 'From the initial problem to the system’s limitations,')}<br className="desktop"/> {tx(lang, 'chaque étape doit pouvoir s’expliquer.', 'every step should be explainable.')}</p></div><div className="method-grid"><div><span>{tx(lang, '01 / COMPRENDRE', '01 / UNDERSTAND')}</span><h3>{tx(lang, 'Définir ce qu’on contrôle.', 'Define what to check.')}</h3><p>{tx(lang, 'Dans PDF Verifier, une règle explicite ce que le document doit contenir.', 'In PDF Verifier, a rule specifies what the document must contain.')}</p></div><div><span>{tx(lang, '02 / CONSTRUIRE', '02 / BUILD')}</span><h3>{tx(lang, 'Séparer les responsabilités.', 'Separate responsibilities.')}</h3><p>{tx(lang, 'Dans AlgoVisualizer, le calcul des étapes est séparé de leur affichage.', 'In AlgoVisualizer, step calculation is separate from rendering.')}</p></div><div><span>{tx(lang, '03 / ÉVALUER', '03 / EVALUATE')}</span><h3>{tx(lang, 'Regarder aussi les échecs.', 'Study failures too.')}</h3><p>{tx(lang, 'Dans Snake AI, la limite de perception est documentée au lieu d’être cachée.', 'In Snake AI, the perception limitation is documented rather than hidden.')}</p></div><div><span>{tx(lang, '04 / RENDRE UTILISABLE', '04 / MAKE IT USEFUL')}</span><h3>{tx(lang, 'Penser au suivi.', 'Plan for monitoring.')}</h3><p>{tx(lang, 'Dans ENERVISION, mon périmètre inclut la mise en place du modèle et l’alerting.', 'In ENERVISION, my scope includes model deployment and alerting.')}</p></div></div></section>
    <section className="hobbies section"><div className="section-title"><div><p className="section-eyebrow">{tx(lang, '03 / EN DEHORS DE L’ÉCRAN', '03 / AWAY FROM THE SCREEN')}</p><h2>{tx(lang, 'Et à côté', 'Beyond work')}<span className="name-dot">.</span></h2></div><p>{tx(lang, 'Un terrain, un voyage, une nouvelle partie.', 'A court, a journey, another game.')}</p></div><div className="hobby-grid"><article className="hobby badminton"><span className="mono">01 / BADMINTON</span><strong>{tx(lang, 'Compétition', 'Competition')}</strong><p>{tx(lang, 'Je pratique le badminton en compétition.', 'I play competitive badminton.')}</p><span className="hobby-marker">{tx(lang, 'SUR LE TERRAIN', 'ON THE COURT')}</span></article><article className="hobby travel"><span className="mono">{tx(lang, '02 / VOYAGES', '02 / TRAVEL')}</span><strong>{tx(lang, 'Séoul', 'Seoul')}<span>2018–2019</span></strong><p>{tx(lang, 'J’y ai travaillé et appris le coréen en autonomie. L’Asie reste un de mes centres d’intérêt.', 'I worked there and taught myself Korean. Asia remains one of my interests.')}</p><span className="hobby-marker">{tx(lang, '서울 / CORÉE DU SUD', '서울 / SOUTH KOREA')}</span></article><article className="hobby mahjong"><span className="mono">03 / MAHJONG</span><div className="mahjong-heading"><strong>Riichi</strong><button className={`mahjong-tile ${tile ? 'turned' : ''}`} onClick={() => setTile(!tile)} aria-pressed={tile} aria-label={tx(lang, 'Retourner la tuile de mahjong', 'Flip the mahjong tile')}><span aria-hidden="true">{tile ? '東' : '中'}</span></button></div><p>{tx(lang, 'Je joue au mahjong japonais.', 'I play Japanese mahjong.')}</p><span className="hobby-marker" aria-live="polite">{tile ? tx(lang, '東 / VENT D’EST', '東 / EAST WIND') : tx(lang, '中 / DRAGON ROUGE', '中 / RED DRAGON')} · {tx(lang, 'RETOURNEZ LA TUILE', 'FLIP THE TILE')}</span></article></div></section>
    <Contact lang={lang}/></main><footer className="footer"><a className="wordmark" href="#accueil" aria-label={tx(lang, 'Retour à l’accueil', 'Back to home')}>cv<span>_</span></a><p>Charles Vanzetta · Portfolio</p><a href="#projets">{tx(lang, 'Retour aux projets ↑', 'Back to projects ↑')}</a><AnalyticsConsent lang={lang}/></footer>
  </>;
}
const root = import.meta.hot?.data.root ?? createRoot(document.getElementById('root'));
if (import.meta.hot) import.meta.hot.data.root = root;
root.render(<App/>);
