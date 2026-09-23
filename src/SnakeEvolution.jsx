import React, { useEffect, useRef, useState } from 'react';

const STAGES = [
  { title: 'Un agent explore.', text: 'Un serpent, un environnement, des décisions à prendre.' },
  { title: 'Une population essaie.', text: 'Le dézoom révèle 500 parcours illustratifs, tous différents.' },
  { title: 'Garder les 20 % meilleurs.', text: '100 agents sont conservés ; les 400 autres sont écartés.' },
  { title: 'Croiser. Muter. Recommencer.', text: 'Les parents sélectionnés donnent naissance à une nouvelle population.' },
];
const DURATION = 20000;
const retained = id => ((id * 137 + 41) % 500) < 100;
const clamp = x => Math.min(1, Math.max(0, x));
const ease = x => { const t = clamp(x); return t * t * (3 - 2 * t); };
export function stageAt(ms) {
  const t = ((ms % DURATION) + DURATION) % DURATION;
  return t < 4500 ? 0 : t < 9500 ? 1 : t < 14000 ? 2 : 3;
}

// Educational choreography. Paths and rankings are illustrative, not model output.
function draw(ctx, w, h, ms) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#172b25'; ctx.fillRect(0, 0, w, h);
  const t = ms % DURATION;
  const zoomOut = ease((t - 2200) / 4300);
  const zoomIn = ease((t - 18500) / 1500);
  const zoom = zoomOut * (1 - zoomIn);
  const columns = 25, rows = 20;
  const cell = Math.min((w - 24) / columns, (h - 24) / rows);
  const selectedX = 12, selectedY = 10;
  const scale = (Math.min(w, h) * .7 / cell) * (1 - zoom) + zoom;
  const focusX = (selectedX + .5) * cell, focusY = (selectedY + .5) * cell;
  const centerX = focusX * (1 - zoom) + columns * cell * .5 * zoom;
  const centerY = focusY * (1 - zoom) + rows * cell * .5 * zoom;
  const select = ease((t - 9500) / 1000);
  const rebirth = ease((t - 14500) / 2500);
  const step = Math.floor(ms / 155);
  ctx.save(); ctx.translate(w / 2, h / 2); ctx.scale(scale, scale); ctx.translate(-centerX, -centerY);
  for (let id = 0; id < 500; id++) {
    const x = id % columns, y = Math.floor(id / columns);
    const px = x * cell, py = y * cell;
    if (Math.abs(px - centerX) > w / scale / 2 + cell || Math.abs(py - centerY) > h / scale / 2 + cell) continue;
    const winner = retained(id);
    ctx.globalAlpha = (winner ? 1 : 1 - select * .93 * (1 - rebirth)) * (id === selectedY * columns + selectedX ? 1 : ease(zoom * 2));
    ctx.fillStyle = '#244435'; ctx.fillRect(px + .6, py + .6, cell - 1.2, cell - 1.2);
    const unit = cell / 12;
    if (scale > 3) {
      ctx.strokeStyle = '#3e604d'; ctx.lineWidth = .08;
      for (let j = 1; j < 12; j++) { ctx.beginPath(); ctx.moveTo(px + j * unit, py); ctx.lineTo(px + j * unit, py + cell); ctx.stroke(); ctx.beginPath(); ctx.moveTo(px, py + j * unit); ctx.lineTo(px + cell, py + j * unit); ctx.stroke(); }
    }
    // Each path traverses a small rectangular circuit with a distinct offset/speed.
    const wide = 5 + id % 4, tall = 4 + (id * 3) % 5;
    const perimeter = 2 * (wide + tall);
    const locate = n => {
      const p = ((n % perimeter) + perimeter) % perimeter;
      if (p < wide) return [1 + p, 1];
      if (p < wide + tall) return [1 + wide, 1 + p - wide];
      if (p < 2 * wide + tall) return [1 + wide - (p - wide - tall), 1 + tall];
      return [1, 1 + tall - (p - 2 * wide - tall)];
    };
    const current = Math.floor(step * (.55 + (id % 9) / 12)) + id * 7;
    for (let k = 5 + id % 4; k >= 0; k--) {
      const [sx, sy] = locate(current - k);
      ctx.fillStyle = k === 0 ? '#eff8f0' : winner && select > .3 ? '#9addb0' : '#65b483';
      ctx.fillRect(px + sx * unit, py + sy * unit, unit * .88, unit * .88);
    }
    // The fruit stays on a cell until the head reaches it, then respawns.
    const firstFruitStep = id * 7 + 9;
    const eaten = Math.max(0, Math.floor((current - firstFruitStep) / 9) + 1);
    const [fx, fy] = locate(firstFruitStep + eaten * 9);
    ctx.fillStyle = '#ffb68a'; ctx.fillRect(px + fx * unit, py + fy * unit, unit * .75, unit * .75);
    if (winner && select > .1) { ctx.strokeStyle = '#b7dfc7'; ctx.lineWidth = .55 * select * (1 - rebirth); ctx.strokeRect(px + 1, py + 1, cell - 2, cell - 2); }
  }
  ctx.restore(); ctx.globalAlpha = 1;
}

export default function SnakeEvolution() {
  const canvas = useRef(null), wrapper = useRef(null), elapsed = useRef(0);
  const [paused, setPaused] = useState(false), [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [stage, setStage] = useState(0);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => { setReduced(media.matches); if (media.matches) setPaused(true); };
    media.addEventListener('change', change);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    observer.observe(wrapper.current);
    const hidden = () => { if (document.hidden) setPaused(true); };
    document.addEventListener('visibilitychange', hidden);
    return () => { observer.disconnect(); media.removeEventListener('change', change); document.removeEventListener('visibilitychange', hidden); };
  }, []);
  useEffect(() => {
    let frameId, last = 0;
    const paint = time => {
      const element = canvas.current;
      const rect = element.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(rect.width * ratio), height = Math.round(rect.height * ratio);
      if (element.width !== width || element.height !== height) { element.width = width; element.height = height; }
      if (last && !paused && !reduced && visible) elapsed.current += Math.min(time - last, 60);
      last = time;
      draw(element.getContext('2d'), width, height, elapsed.current);
      setStage(previous => { const next = stageAt(elapsed.current); return previous === next ? previous : next; });
      if (!paused && !reduced && visible) frameId = requestAnimationFrame(paint);
    };
    frameId = requestAnimationFrame(paint);
    const repaint = () => { last = 0; cancelAnimationFrame(frameId); frameId = requestAnimationFrame(paint); };
    const resize = new ResizeObserver(repaint); resize.observe(canvas.current);
    return () => { cancelAnimationFrame(frameId); resize.disconnect(); };
  }, [paused, reduced, visible, stage, revision]);
  function jump(index) { setRevision(n => n + 1); elapsed.current = [0, 7000, 12000, 17500][index]; setStage(index); setPaused(true); }
  const running = !paused && !reduced;
  return <div className="evolution-demo" ref={wrapper}>
    <div className="visual-label"><span>03 / UNE POPULATION ÉVOLUE</span><span>ILLUSTRATION</span></div>
    <div className="evolution-screen"><canvas ref={canvas} role="img" aria-label="Animation pédagogique : un Snake, un dézoom sur 500 agents illustratifs, une sélection de 100 parents, puis la reconstitution de la population."/><div className="evolution-counter"><strong>{stage === 0 ? '01' : stage === 2 ? '100 / 500' : '500'}</strong><span>{stage === 0 ? 'AGENT' : stage === 2 ? 'PARENTS RETENUS' : 'AGENTS ILLUSTRÉS'}</span></div></div>
    <div className="evolution-controls"><button onClick={() => setPaused(p => !p)} disabled={reduced} aria-label={running ? 'Mettre en pause l’animation Snake' : 'Lire l’animation Snake'}>{running ? 'Ⅱ Pause' : '▶ Lire'}</button><button onClick={() => { elapsed.current = 0; setRevision(n => n + 1); setStage(0); setPaused(reduced); }}>↻ Recommencer</button></div>
    <div className="evolution-stages" aria-label="Étapes de la sélection génétique">{['Explorer', 'Dézoomer', 'Sélectionner', 'Reproduire'].map((label, index) => <button key={label} onClick={() => jump(index)} aria-pressed={index === stage}>{String(index + 1).padStart(2, '0')}<span>{label}</span></button>)}</div>
    <div className="evolution-copy" aria-live="polite"><h4>{STAGES[stage].title}</h4><p>{STAGES[stage].text}</p></div>
    <p className="visual-footnote">Animation pédagogique, pas un entraînement enregistré. Les trajectoires et le classement sont illustratifs. Le script original démarre avec 100 agents ; la sélection des 20 % est celle du code.</p>
    {reduced && <p className="motion-note">Mouvement réduit : explorez les quatre étapes avec les boutons.</p>}
  </div>;
}
