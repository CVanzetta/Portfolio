import React from 'react';

export default function POCContext({ lang }) {
  const en = lang === 'en';
  const dimensions = en ? [
    ['Business need', 'Start with the tester’s actual task: prepare a contract, reproduce a bug, or run regression tests.'],
    ['Agent scope', 'Decide which actions to delegate and which rules and checks should remain deterministic.'],
    ['Models', 'Explore the right model for each task, including several specialized models rather than assuming one model should do everything.'],
    ['Tools', 'Connect the agent to existing tools, including the Playwright foundation I developed, through Python / FastAPI orchestration.'],
    ['Control & observability', 'Examine Playwright results and logs, with screenshots or videos when available and human validation when needed.'],
    ['Evaluation', 'Compare changes on the same scenarios, inspect failures, and check whether the behavior actually improves. No measured gain is claimed here.'],
    ['Security & data', 'Discuss access boundaries, the data supplied to models, and the conditions under which AI can be used in the company.'],
    ['Industrialization', 'Identify what remains before a controlled proof of concept can become a usable tool, then a maintained production system.'],
  ] : [
    ['Besoin métier', 'Partir du travail réel du testeur : préparer un contrat, reproduire une anomalie ou lancer des tests de non-régression.'],
    ['Périmètre des agents', 'Déterminer les actions à déléguer et les règles et vérifications qui doivent rester déterministes.'],
    ['Modèles', 'Explorer le modèle adapté à chaque tâche, y compris plusieurs modèles spécialisés plutôt qu’un modèle unique pour tout faire.'],
    ['Outils', 'Relier l’agent aux outils existants, dont le socle Playwright que j’ai développé, via une orchestration Python / FastAPI.'],
    ['Contrôle & observabilité', 'Examiner les résultats Playwright et les logs, avec captures ou vidéos lorsqu’elles existent et validation humaine si nécessaire.'],
    ['Évaluation', 'Comparer les évolutions sur les mêmes scénarios, examiner les échecs et vérifier si le comportement s’améliore. Aucun gain mesuré n’est annoncé ici.'],
    ['Sécurité & données', 'Réfléchir aux limites d’accès, aux données transmises aux modèles et aux conditions d’utilisation de l’IA dans l’entreprise.'],
    ['Industrialisation', 'Identifier ce qui reste à construire pour passer d’un POC contrôlé à un outil utilisable, puis à un système maintenu en production.'],
  ];
  return <section className="poc-context" aria-labelledby="poc-context-title">
    <p className="section-eyebrow">{en ? 'A CROSS-FUNCTIONAL CONTRIBUTION' : 'UNE CONTRIBUTION TRANSVERSE'}</p>
    <h4 id="poc-context-title">{en ? 'Build the agent. Build the conditions for trust.' : 'Construire l’agent. Construire le cadre de confiance.'}</h4>
    <p className="context-intro">{en ? 'Within a group of around ten people, I contribute to discussions about AI governance, technical choices, and the gradual integration of the proof of concept. These are areas of reflection and experimentation, not a claim that every mechanism is already in production.' : 'Au sein d’un groupe d’environ dix personnes, je participe aux réflexions de gouvernance IA, aux choix techniques et à l’intégration progressive du POC. Ce sont des axes de réflexion et d’expérimentation ; tous ces mécanismes ne sont pas présentés comme industrialisés.'}</p>
    <dl className="context-grid">{dimensions.map(([title, text], i) => <div key={i}><dt><span className="mono">0{i + 1}</span>{title}</dt><dd>{text}</dd></div>)}</dl>
    <div className="poc-maturity"><span className="mono">{en ? 'A PATH TO WORK TOWARDS' : 'UNE TRAJECTOIRE À CONSTRUIRE'}</span><p>{en ? 'Idea → prototype → controlled proof of concept → usable tool → industrialization' : 'Idée → prototype → POC contrôlé → outil utilisable → industrialisation'}</p></div>
  </section>;
}
