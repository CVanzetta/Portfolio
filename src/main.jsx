import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { initialValues, sortFrames, verifyExample } from './algorithms';
import { profile, projects, secondary } from './content';
import './style.css';
import SnakeEvolution from './SnakeEvolution';
import AnalyticsConsent from './AnalyticsConsent';

const asset = (name) => `${import.meta.env.BASE_URL}${name}`;
function Arrow({ diagonal = false }) { return <span aria-hidden="true">{diagonal ? '↗' : '↗'}</span>; }
function External({ href, children, className = '' }) { return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (nouvel onglet)</span></a>; }

function SortDemo() {
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
    <div className="demo-top"><span className="mono">LAB / 01</span><span className="demo-tag">ALGORITHME EN ACTION</span></div>
    <div className="demo-heading"><h2>Un peu d’ordre.<br/><span>Étape par étape.</span></h2><span className="asterisk" aria-hidden="true">↳</span></div>
    <div className="bars" role="img" aria-label={`Tableau de ${frame.values.length} valeurs. ${done ? 'Tri terminé.' : 'Tri en cours de démonstration.'} Valeurs : ${frame.values.join(', ')}`}>
      {frame.values.map((v, i) => <div className={`bar ${frame.active.includes(i) ? 'active' : ''} ${done ? 'sorted' : ''}`} style={{ height: `${v}%` }} key={i}><span>{v}</span></div>)}
    </div>
    <div className="chart-axis"><span>01</span><span>{done ? 'TABLEAU TRIÉ' : '24 VALEURS · DONNÉES D’EXEMPLE'}</span><span>24</span></div>
    <div className="demo-controls">
      <label className="select-wrap"><span className="sr-only">Algorithme de tri</span><select value={algorithm} onChange={changeAlgorithm}><option value="quick">Quick Sort</option><option value="bubble">Bubble Sort</option><option value="insertion">Insertion Sort</option></select></label>
      <button className="play" onClick={toggle}>{playing ? 'Ⅱ Pause' : done ? '↻ Rejouer' : '▶ Lancer'}</button>
      <button className="shuffle" onClick={shuffle} aria-label="Mélanger les valeurs">↻</button>
      <button className="step" onClick={() => { setPlaying(false); setIndex(i => Math.min(i + 1, frames.length - 1)); }} disabled={done}>Un pas</button>
    </div>
    <div className="demo-stats"><span>{String(index).padStart(2, '0')}<small> / {frames.length - 1} étapes</small></span><span>{frame.comparisons}<small> {frame.comparisons > 1 ? "comparaisons" : "comparaison"}</small></span></div>
    <p className="demo-caption">Adaptation interactive pour ce portfolio, d’après mon projet <a href="#algovisualizer">AlgoVisualizer ↗</a>.</p>
    <span className="sr-only" role="status">{done ? 'Tri terminé' : playing ? 'Lecture' : 'En pause'}</span>
  </div>;
}

function PDFDemo() {
  const [text, setText] = useState('Document de démonstration');
  const passed = verifyExample(text);
  return <div className="pdf-demo">
    <div className="visual-label"><span>01 / CONTRÔLE DE TEXTE</span><span aria-hidden="true">[ PDF ]</span></div>
    <div className="document-example"><span className="mono">EXEMPLE SYNTHÉTIQUE</span><label htmlFor="sample-text">Titre extrait du document</label><input id="sample-text" maxLength={120} value={text} onChange={e => setText(e.target.value)} /><div className="document-lines" aria-hidden="true"><i/><i/><i/></div><p>Règle : le texte contient<br/><strong>« document de démonstration »</strong></p></div>
    <div className={`check-result ${passed ? '' : 'failed'}`} role="status"><span>{passed ? '✓' : '!'}</span><div><strong>{passed ? 'Mention trouvée' : 'Mention absente'}</strong><small>{passed ? 'La règle de présence est satisfaite.' : 'Le document nécessite une vérification.'}</small></div></div>
    <p className="visual-footnote">Modifiez le titre pour essayer la règle. Exemple local inspiré du dépôt ; aucun PDF ni OCR n’est exécuté ici.</p>
  </div>;
}

function EnergyDiagram() {
  const video = useRef(null);
  useEffect(() => {
    if (!video.current) return;
    const observer = new IntersectionObserver(([e]) => { if (!e.isIntersecting) video.current?.pause(); });
    observer.observe(video.current); return () => observer.disconnect();
  }, []);
  if (profile.enervisionVideo && profile.enervisionPoster) return <video ref={video} controls muted playsInline preload="none" poster={asset(profile.enervisionPoster)} src={asset(profile.enervisionVideo)} aria-label="Démonstration originale ENERVISION" />;
  return <div className="energy-demo"><div className="visual-label"><span>04 / DU PIPELINE AU SUIVI</span><span>PROJET D’EXAMEN</span></div><div className="pipeline"><div><small>01 / PRÉPARER</small><strong>Données → ETL</strong></div><span aria-hidden="true">↓</span><div><small>02 / APPRENDRE</small><strong>Entraînement du modèle</strong></div><span aria-hidden="true">↓</span><div><small>03 / EXPLOITER</small><strong>Mise en place & alerting</strong></div></div><div className="energy-bottom"><span className="mono">MON PÉRIMÈTRE</span><p>Product Owner · ETL · entraînement · alerting</p></div><p className="visual-footnote">Schéma de mon intervention. Hébergement scolaire arrêté après l’examen.</p></div>;
}

function Project({ project: p }) {
  return <article id={p.id} className={`project project-${p.id}`}>
    <div className="project-visual">{p.id === 'pdf-verifier' ? <PDFDemo/> : p.id === 'algovisualizer' ? <figure className="algo-original"><div className="visual-label"><span>02 / LE PROJET ORIGINAL</span><span>JAVA 21</span></div><img src={asset('algovisualizer.webp')} width="1200" height="559" loading="lazy" alt="Capture originale de l’accueil AlgoVisualizer : accès aux tris, graphes et labyrinthes"/><figcaption>Capture originale issue du dépôt GitHub.<a href="#accueil">Essayer l’adaptation ↑</a></figcaption></figure> : p.id === 'snake-ai' ? <SnakeEvolution/> : <EnergyDiagram/>}</div>
    <div className="project-content"><div className="project-kicker"><span>{p.number} — {p.name}</span><span>{p.category}</span></div><h3>{p.title.split('\n').map((line, i) => <React.Fragment key={line}>{i > 0 && <br/>}{line}</React.Fragment>)}</h3><p className="project-summary">{p.summary}</p><p className="project-type">{p.type}</p><details><summary>Dans le projet <span aria-hidden="true">+</span></summary><div className="case-study"><h4>Ma contribution</h4><p>{p.contribution}</p><h4>Choix techniques</h4><p>{p.choices}</p><h4>Ce qui est vérifiable</h4><p>{p.proof}</p><h4>Limite actuelle</h4><p>{p.limit}</p><p className="case-note">{p.note}</p></div></details><div className="project-links">{p.repo ? <External href={p.repo}>Explorer le code <Arrow/></External> : <a href={asset('CV-Charles-Vanzetta.pdf')} download>Voir le projet dans mon CV ↓</a>}</div></div>
  </article>;
}

function Contact() {
  const [copyState, setCopyState] = useState('');
  async function copy() {
    try { await navigator.clipboard.writeText(profile.email); setCopyState('Adresse copiée'); }
    catch { setCopyState('Copie indisponible : sélectionnez l’adresse ci-dessus.'); }
  }
  return <section className="contact section" id="contact"><div className="section-eyebrow">04 / CONTACT</div><div className="contact-heading"><h2>Parlons de ce<br/>qu’on peut <em>construire.</em></h2><a className="contact-circle" href={`mailto:${profile.email}`} aria-label="Envoyer un email à Charles Vanzetta">↗</a></div><div className="contact-bottom"><div><a className="email" href={`mailto:${profile.email}`}>{profile.email}</a><button className="copy" onClick={copy} aria-label="Copier l’adresse email">Copier l’adresse ⧉</button><span className="copy-status" role="status">{copyState}</span></div><div className="socials"><External href={profile.github}>GitHub ↗</External><External href={profile.linkedin}>LinkedIn ↗</External><a href={asset('CV-Charles-Vanzetta.pdf')} download>Télécharger mon CV ↓</a></div></div></section>;
}

function ProfessionalPOC() {
  return <article className="work-poc" id="poc-qa"><div><p className="section-eyebrow">EN ENTREPRISE / LLM & AUTOMATISATION</p><h3>Un agent pour écrire<br/>et lancer les tests.</h3><p>POC IA interne : analyser un ticket Jira, ouvrir l’application avec Playwright, puis rédiger ou modifier les tests et les lancer.</p><small>Projet professionnel · preuve de concept · code et application non publics.</small></div><div><div className="poc-flow" aria-label="Périmètre du POC"><span>Ticket Jira</span><b aria-hidden="true">→</b><span>Agent IA</span><b aria-hidden="true">→</b><span>Tests Playwright</span></div><p><strong>Ma contribution.</strong> Développement en Python avec OpenCode, utilisation de modèles Qwen ou GLM 5.2 et mise en place d’une couche FastAPI autour du dispositif.</p><small>Prototype interne, sans benchmark public. Le périmètre et les choix techniques peuvent être abordés en entretien.</small><a href="#contact">Échanger sur cette expérience ↗</a></div></article>;
}

function App() {
  const [tile, setTile] = useState(false);
  return <>
    <a className="skip" href="#main">Aller au contenu</a>
    <header className="header"><a href="#accueil" className="wordmark" aria-label="Charles Vanzetta, accueil">cv<span>_</span></a><span className="header-label">CHARLES VANZETTA<br/><span>DÉVELOPPEMENT & IA</span></span><nav aria-label="Navigation principale"><a href="#projets">Projets</a><a href="#apropos">À propos</a><a className="nav-contact" href="#contact">Contact <Arrow/></a></nav></header>
    <main id="main" tabIndex={-1}><section className="hero" id="accueil"><div className="hero-copy"><div className="hero-overline"><span>PORTFOLIO</span><span>POITIERS · NIORT</span></div><div className="identity-row"><h1>Charles<br/><span>Vanzetta<span className="name-dot">.</span></span></h1><figure className="hero-portrait"><img src={asset('portrait.webp')} width="540" height="720" alt="Portrait de Charles Vanzetta" fetchPriority="high"/></figure></div><p className="hero-role">Développement logiciel<br/><span>IA appliquée, LLM & data.</span></p><p className="hero-description">Je construis des outils pour automatiser les tests, explorer des modèles et rendre les algorithmes lisibles.</p><div className="hero-actions"><a className="button primary" href="#projets">Voir mes projets <span aria-hidden="true">↓</span></a><a className="text-link" href="#contact">Me contacter <Arrow/></a></div><div className="hero-footer"><span className="mono">COMPRENDRE → CONSTRUIRE → VÉRIFIER</span><a href={asset('CV-Charles-Vanzetta.pdf')} download>Mon CV ↓</a></div></div><SortDemo/></section>
    <div className="ticker" aria-label="Domaines de travail"><span>AUTOMATISATION</span><span aria-hidden="true">✳</span><span>IA APPLIQUÉE</span><span aria-hidden="true">✳</span><span>ALGORITHMIQUE</span><span aria-hidden="true">✳</span><span>DATA</span><span aria-hidden="true">✳</span><span>ÉVALUATION</span></div>
    <section className="section projects" id="projets"><div className="section-title"><div><p className="section-eyebrow">01 / PROJETS CHOISIS</p><h2>Du code.<br/><em>Des preuves.</em></h2></div><p>Un POC en entreprise et quatre projets pour voir<br className="desktop"/> ce que je construis, des choix techniques aux limites.</p></div><ProfessionalPOC/><div className="project-list">{projects.map(p => <Project project={p} key={p.id}/>)}</div><div className="more-projects"><h3>D’autres terrains d’exploration<span> / 03</span></h3>{secondary.map((p, i) => <details key={p.name}><summary><span className="mono">0{i + 5}</span><strong>{p.name}</strong><span className="secondary-area">{p.area}</span><span className="plus" aria-hidden="true">+</span></summary><div><p>{p.description}</p><External href={p.url}>Consulter le dépôt ↗</External></div></details>)}</div></section>
    <section className="about section" id="apropos"><aside className="about-note"><span className="mono">LE FIL CONDUCTEUR</span><p>Une idée devient utile<br/>quand on peut<br/><em>la mettre à l’épreuve.</em></p><span className="about-arrow" aria-hidden="true">↳</span><span className="mono">AUTOMATISATION / IA / DATA</span></aside><div className="about-copy"><p className="section-eyebrow">02 / À PROPOS</p><h2>Construire.<br/>Observer.<br/><em>Recommencer.</em></h2><p>Développeur logiciel orienté IA et data, je travaille sur l’automatisation et les outils qui permettent de vérifier le comportement d’un système.</p><div className="experience"><span className="mono">2024 → AUJOURD’HUI</span><h3>Automatisation & IA</h3><p>Fortil · Mutuelle de Poitiers Assurances</p><p>Tests Playwright / TypeScript, intégration GitLab CI/CD et orchestration Python / LLM pour la QA : génération, diagnostic et auto-correction de tests.</p><small>Périmètre professionnel décrit dans mon CV. Le code et les évaluations de ces outils ne sont pas publics.</small></div><p className="about-intent">Je souhaite poursuivre ce travail sur des postes liés aux LLM, à l’IA appliquée et à la data.</p><a className="text-link" href={asset('CV-Charles-Vanzetta.pdf')} download>Le parcours complet dans mon CV ↓</a></div></section>
    <section className="method section"><div className="section-title"><div><p className="section-eyebrow">UNE FAÇON DE TRAVAILLER</p><h2>Rendre le résultat<br/><em>vérifiable.</em></h2></div><p>Du problème initial aux limites du système,<br className="desktop"/> chaque étape doit pouvoir s’expliquer.</p></div><div className="method-grid"><div><span>01 / COMPRENDRE</span><h3>Définir ce qu’on contrôle.</h3><p>Dans PDF Verifier, une règle explicite ce que le document doit contenir.</p></div><div><span>02 / CONSTRUIRE</span><h3>Séparer les responsabilités.</h3><p>Dans AlgoVisualizer, le calcul des étapes est séparé de leur affichage.</p></div><div><span>03 / ÉVALUER</span><h3>Regarder aussi les échecs.</h3><p>Dans Snake AI, la limite de perception est documentée au lieu d’être cachée.</p></div><div><span>04 / RENDRE UTILISABLE</span><h3>Penser au suivi.</h3><p>Dans ENERVISION, mon périmètre inclut la mise en place du modèle et l’alerting.</p></div></div></section>
    <section className="hobbies section"><div className="section-title"><div><p className="section-eyebrow">03 / EN DEHORS DE L’ÉCRAN</p><h2>Et à côté<span className="name-dot">.</span></h2></div><p>Un terrain, un voyage, une nouvelle partie.</p></div><div className="hobby-grid"><article className="hobby badminton"><span className="mono">01 / BADMINTON</span><strong>Compétition</strong><p>Je pratique le badminton en compétition.</p><span className="hobby-marker">SUR LE TERRAIN</span></article><article className="hobby travel"><span className="mono">02 / VOYAGES</span><strong>Séoul<span>2018–2019</span></strong><p>J’y ai travaillé en cuisine et appris le coréen en autonomie. L’Asie reste un de mes centres d’intérêt.</p><span className="hobby-marker">서울 / CORÉE DU SUD</span></article><article className="hobby mahjong"><span className="mono">03 / MAHJONG</span><div className="mahjong-heading"><strong>Riichi</strong><button className={`mahjong-tile ${tile ? 'turned' : ''}`} onClick={() => setTile(!tile)} aria-pressed={tile} aria-label="Retourner la tuile de mahjong"><span aria-hidden="true">{tile ? '東' : '中'}</span></button></div><p>Je joue au mahjong japonais.</p><span className="hobby-marker" aria-live="polite">{tile ? '東 / VENT D’EST' : '中 / DRAGON ROUGE'} · RETOURNEZ LA TUILE</span></article></div></section>
    <Contact/></main><footer className="footer"><a className="wordmark" href="#accueil" aria-label="Retour à l’accueil">cv<span>_</span></a><p>Charles Vanzetta · Portfolio</p><a href="#projets">Retour aux projets ↑</a><AnalyticsConsent/></footer>
  </>;
}
const root = import.meta.hot?.data.root ?? createRoot(document.getElementById('root'));
if (import.meta.hot) import.meta.hot.data.root = root;
root.render(<App/>);
