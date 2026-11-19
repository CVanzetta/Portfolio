import React from 'react';
import { circuitLayout, playbackAt } from './orchestration';

export default function OrchestrationCircuit({ run, elapsed, copy: t, price, reduced }) {
  const frame = playbackAt(run, elapsed, reduced);
  const { entry, checks, delivery, lanes } = circuitLayout;
  const layout = lanes[run.id];
  const model = frame.stage === 'retrying' ? 'expert' : frame.model;
  const activeTrack = frame.track?.vertices.map(point => point.join(',')).join(' ');
  const waitingAt = !frame.track && (frame.stage === 'routing' ? 'router' : model);
  const showToken = frame.track || !elapsed || waitingAt;

  return <li className={`route-circuit route-${run.id}`}>
    <h3>{t[run.id]}</h3>
    <svg className="route-diagram" viewBox="0 0 240 204" aria-hidden="true">
      {layout.rails.map((points, index) => <polyline key={index} className="route-rail" points={points}/>)}
      {activeTrack && <polyline className={frame.retry ? 'route-detour' : 'route-active-rail'} points={activeTrack}/>}
      <circle className="route-entry" cx={entry[0]} cy={entry[1]} r="6"/>
      {layout.models.map(([[x, y], kind]) => <g key={kind} className="route-model" data-model={kind} data-active={waitingAt === kind}>
        <rect x={x - 30} y={y - 11} width="60" height="22" rx="2"/>
        <text x={x} y={waitingAt === kind ? y - 18 : y} textAnchor="middle" dominantBaseline="central">{t[kind]}</text>
      </g>)}
      {checks.map(([x, y], index) => {
        const outcome = frame.outcomes[index];
        return <g key={index} className="route-result" data-outcome={outcome} transform={`translate(${x} ${y})`}>
          {outcome !== 'pending' && <circle key={outcome} className="route-result-pulse" r="12"/>}
          <circle className="route-result-disc" r="12"/>
          <text textAnchor="middle" dominantBaseline="central">{outcome === 'failed' ? '×' : outcome === 'done' ? '✓' : index + 1}</text>
        </g>;
      })}
      <text className="route-result-caption" x="52" y="179" textAnchor="middle">{t.outputs}</text>
      <g className="route-delivery" data-delivered={frame.delivered} transform={`translate(${delivery.join(' ')})`}>
        <rect x="-32" y="-11" width="64" height="22" rx="3"/>
        <text textAnchor="middle" dominantBaseline="central">{t.delivered}</text>
      </g>
      {showToken && <g transform={`translate(${frame.token.join(' ')})`} className={frame.retry ? 'route-token is-retry' : 'route-token'}>
        <circle r="8"/>
        <text textAnchor="middle" dominantBaseline="central">1</text>
      </g>}
    </svg>
    <p className={frame.stage === 'retrying' || frame.stage === 'failed' ? 'route-current is-retry' : 'route-current'}>
      {t[frame.stage]}
      {frame.index !== undefined && <span>{frame.index + 1}. {t[run.checks[frame.index]]}</span>}
      {model && <span>{t[model]}</span>}
    </p>
    <ol className="sr-only" aria-label={t.outputs}>
      {run.checks.map((check, index) => <li key={check}>{t[check]} · {t[frame.outcomes[index]]}</li>)}
    </ol>
    <p className="route-metrics">
      <strong>{frame.cost ? price.format(frame.cost) : '—'}</strong>
      <span>{frame.seconds} s</span>
      <span>{frame.retries} {frame.retries === 1 ? t.retryCount : t.retries}</span>
    </p>
    <span className="route-progress" aria-hidden="true"><i style={{ width: `${Math.min(1, elapsed / run.playbackSeconds) * 100}%` }}/></span>
  </li>;
}
