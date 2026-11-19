import React, { useEffect, useMemo, useState } from 'react';
import WindowBar from './RetroWindow';
import OrchestrationCircuit from './OrchestrationCircuit';
import { compareRuns, runPrices } from './orchestration';

const copy = {
  fr: {
    demo: 'Simulation animée', mission: 'Mission', qa: 'Ajouter un test Playwright', documents: 'Analyser un dossier',
    skill: 'Skill ciblé', input: 'Une tâche, trois contrôles avant livraison',
    filter: 'Conventions', detail: 'Scénario attendu', regression: 'Régression',
    index: 'Indexer les pièces', compare: 'Comparer les preuves', sources: 'Vérifier les citations',
    direct: 'Tout en expert', fallback: 'Léger, puis expert si échec', routed: 'Routage avant exécution',
    expert: 'Expert', light: 'Léger', router: 'Routeur',
    routing: 'Choix du modèle', executing: 'Exécution', checking: 'Contrôle en cours', checked: 'Contrôle réussi', delivering: 'Livraison', delivered: 'Livré',
    pending: 'En attente', failed: 'Échec', done: 'Réussi', retrying: 'Reprise en cours', retryCount: 'reprise', retries: 'reprises', outputs: 'Résultats',
    start: 'Lancer', pause: 'Pause', resume: 'Reprendre', next: 'Étape', reset: 'Remise à zéro', replay: 'Rejouer',
    results: 'Résultats simulés', assumptions: 'Hypothèses de calcul',
    context: 'Le routeur évalue la complexité de la tâche et choisit le modèle avant l’exécution. Les trois contrôles vérifient la sortie. En cas d’échec, la sortie corrigée repasse les trois contrôles. Le skill réunit les conventions et les outils utiles à la mission pour réduire le contexte envoyé.',
    warning: 'Les tokens, les durées et les échecs sont des hypothèses. Le coût estimé couvre les appels aux modèles. Le temps affiché additionne l’exécution et les contrôles simulés.',
    unit: 'par million de tokens, entrée / sortie',
  },
  en: {
    demo: 'Animated simulation', mission: 'Task', qa: 'Add a Playwright test', documents: 'Review a document pack',
    skill: 'Task-specific skill', input: 'One task, three checks before delivery',
    filter: 'Conventions', detail: 'Expected behavior', regression: 'Regression',
    index: 'Index documents', compare: 'Compare evidence', sources: 'Check citations',
    direct: 'Expert for every task', fallback: 'Lightweight first, retry with expert', routed: 'Route before execution',
    expert: 'Expert', light: 'Lightweight', router: 'Router',
    routing: 'Selecting a model', executing: 'Running the task', checking: 'Checking', checked: 'Check passed', delivering: 'Delivering', delivered: 'Delivered',
    pending: 'Pending', failed: 'Failed', done: 'Passed', retrying: 'Retry in progress', retryCount: 'retry', retries: 'retries', outputs: 'Results',
    start: 'Run', pause: 'Pause', resume: 'Resume', next: 'Step', reset: 'Reset', replay: 'Replay',
    results: 'Simulated results', assumptions: 'Calculation assumptions',
    context: 'The router assesses the task and selects a model before execution. Three checks validate the output. After a failure, the revised output goes through all three checks again. A skill bundles the conventions and tools relevant to the task to reduce the context sent.',
    warning: 'Token counts, timings, and failures are assumptions. Estimated costs cover model calls. The displayed time adds simulated execution and checks.',
    unit: 'per million tokens, input / output',
  },
};

export default function OrchestrationDemo({ lang }) {
  const [workload, setWorkload] = useState('qa');
  const [useSkill, setUseSkill] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const t = copy[lang];
  const en = lang === 'en';
  const price = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }), [lang]);
  const runs = useMemo(() => compareRuns(workload, useSkill), [workload, useSkill]);
  const [direct, fallback, routed] = runs;
  const finish = Math.max(...runs.map(run => run.playbackSeconds));
  const beats = [...new Set(runs.flatMap(run => run.events.map(event => event.end)))].sort((a, b) => a - b);
  const done = elapsed >= finish;
  const savings = Math.round((1 - routed.final.cost / direct.final.cost) * 100);
  const timeSaved = fallback.final.seconds - routed.final.seconds;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => {
      setReduced(preference.matches);
      if (preference.matches) setPlaying(false);
    };
    preference.addEventListener('change', change);
    return () => preference.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    if (!playing || done) return;
    let previous;
    let frame;
    const tick = now => {
      if (previous !== undefined) {
        const delta = (now - previous) / 1000;
        setElapsed(value => Math.min(finish, value + delta));
      }
      previous = now;
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    const pauseWhenHidden = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', pauseWhenHidden);
    };
  }, [playing, done, finish]);

  function reset() {
    setPlaying(false);
    setElapsed(0);
  }

  function play() {
    if (playing && !done) { setPlaying(false); return; }
    if (reduced) {
      setElapsed(finish);
      return;
    }
    if (done) setElapsed(0);
    setPlaying(true);
  }

  return <div className="retro-window orchestration" id="agentique">
    <WindowBar title="orchestrateur.exe" detail={t.demo}/>
    <div className="orchestration-body">
      <div className="orchestration-controls">
        <label className="agent-select"><span>{t.mission}</span>
          <select value={workload} onChange={event => { setWorkload(event.target.value); reset(); }}>
            <option value="qa">{t.qa}</option><option value="documents">{t.documents}</option>
          </select>
        </label>
        <label className="skill-toggle"><input type="checkbox" checked={useSkill} onChange={event => { setUseSkill(event.target.checked); reset(); }}/>{t.skill}</label>
      </div>
      <p className="route-input-label">{t.input}</p>
      <ol className="route-queue">{direct.checks.map((check, index) => <li key={check}><span>{index + 1}</span> {t[check]}</li>)}</ol>
      <div className="route-controls">
        <button type="button" disabled={done && reduced} onClick={play}>{done && !reduced ? t.replay : reduced ? t.results : playing ? t.pause : elapsed ? t.resume : t.start}</button>
        <button type="button" disabled={done} onClick={() => { setPlaying(false); setElapsed(beats.find(beat => beat > elapsed) ?? finish); }}>{t.next}</button>
        <button type="button" disabled={!elapsed && !playing} onClick={reset}>{t.reset}</button>
      </div>
      <ul className="route-circuits">
        {runs.map(run => <OrchestrationCircuit key={run.id} run={run} elapsed={elapsed} copy={t} price={price} reduced={reduced}/>)}
      </ul>
      {done && <p className="orchestration-gain" role="status">
        <strong>{t.results}</strong>
        <span>{en ? `Routing costs ${savings}% less than expert-only and saves ${timeSaved} s compared to retrying.` : `Le routage coûte ${savings} % de moins que le tout-expert et gagne ${timeSaved} s sur la stratégie avec reprises.`}</span>
      </p>}
      <details className="orchestration-assumptions">
        <summary>{t.assumptions}<span aria-hidden="true">+</span></summary>
        <p>{t.context}</p>
        <p>{Object.entries(runPrices).map(([model, rate]) => `${t[model]} ${price.format(rate.input)} / ${price.format(rate.output)}`).join(' · ')} {t.unit}.</p>
        <p>{t.warning}</p>
      </details>
    </div>
  </div>;
}
