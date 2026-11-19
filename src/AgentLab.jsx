import React, { useEffect, useState } from 'react';
import WindowBar from './RetroWindow';

const scenarios = {
  filter: {
    fr: 'Ajoute un test qui filtre les contrats actifs.',
    en: 'Add a test that filters active contracts.',
    filename: 'contracts-filter.spec.ts',
    test: 'filters active contracts',
    action: "await contracts.filterByStatus('active');",
    assertion: "await expect(contracts.statusCells).toHaveText(['Active']);",
  },
  detail: {
    fr: 'Ajoute un test qui ouvre le détail d’un contrat.',
    en: 'Add a test that opens a contract’s details.',
    filename: 'contracts-detail.spec.ts',
    test: 'opens the requested contract',
    action: "await contracts.openContract('CTR-101');",
    assertion: "await expect(contracts.heading).toHaveText('CTR-101');",
  },
};

function buildSpec(scenario) {
  return [
    "import { test, expect } from '../fixtures/contracts';",
    '',
    `test('${scenario.test}', async ({ contracts }) => {`,
    '  await contracts.goto();',
    `  ${scenario.action}`,
    `  ${scenario.assertion}`,
    '});',
  ].join('\n');
}

function AgentSprite() {
  return <div className="agent-stage" aria-hidden="true">
    <span className="agent-grid"/>
    <span className="agent-scanner"/>
    <img className="agent-sprite" src={`${import.meta.env.BASE_URL}favicon.svg`} width="64" height="64" alt=""/>
  </div>;
}

export default function AgentLab({ lang }) {
  const [mission, setMission] = useState('filter');
  const [step, setStep] = useState(0);
  const en = lang === 'en';
  const running = step > 0 && step < 4;
  const scenario = scenarios[mission];
  const trace = en ? [
    'Identify the scenario from the request.',
    'Load the Playwright skill and locate the existing page and fixture.',
    'Generate a spec and prepare a targeted test run.',
  ] : [
    'Identifier le scénario à partir de la demande.',
    'Charger le skill Playwright et repérer la page et la fixture existantes.',
    'Générer le test et préparer une exécution ciblée.',
  ];

  useEffect(() => {
    if (!running) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStep(4); return; }
    const timer = window.setTimeout(() => setStep(step + 1), 620);
    return () => window.clearTimeout(timer);
  }, [running, step]);

  return <div className={`agent-console qa-console is-visible${running ? ' is-running' : ''}`}>
    <WindowBar title="agent-qa.exe" detail={en ? 'Playwright demo' : 'Démo Playwright'}/>
    <div className="qa-console-intro">
      <AgentSprite/>
      <p>{en ? 'Give the agent a test request. It reuses the fixtures and page objects in an example Playwright architecture and prepares a spec for review.' : 'Donne une demande de test à l’agent. Il réutilise les fixtures et les Page Objects d’une architecture Playwright d’exemple, puis prépare un test à relire.'}</p>
    </div>
    <div className="agent-controls">
      <label className="agent-select">
        <span className="sr-only">{en ? 'Test request' : 'Demande de test'}</span>
        <select value={mission} onChange={event => { setMission(event.target.value); setStep(0); }}>
          {Object.entries(scenarios).map(([id, item]) => <option key={id} value={id}>{item[lang]}</option>)}
        </select>
      </label>
      <button type="button" disabled={running} onClick={() => setStep(1)}>{en ? 'Generate' : 'Générer'}</button>
    </div>
    <div className="agent-status" role="status">{running ? trace[step - 1] : step === 4 ? (en ? 'Spec ready for review' : 'Test prêt à relire') : (en ? 'Waiting for a request' : 'En attente d’une demande')}</div>
    {step > 0 && <ol className="qa-trace">{trace.slice(0, step).map(item => <li key={item}>{item}</li>)}</ol>}
    {step === 4 && <div className="agent-result">
      <p><code>{scenario.filename}</code></p>
      <pre><code>{buildSpec(scenario)}</code></pre>
      <p>{en ? 'Suggested command' : 'Commande proposée'}</p>
      <pre><code>{`npx playwright test ${scenario.filename}`}</code></pre>
      <small>{en ? 'Illustrative repository and generated spec. Execution is represented by the command.' : 'Dépôt d’exemple et test généré. La commande représente l’étape d’exécution.'}</small>
    </div>}
  </div>;
}
