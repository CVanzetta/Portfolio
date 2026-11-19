import React, { useEffect, useRef, useState } from 'react';

const points = [
  [23, 74], [29, 63], [39, 47], [49, 35], [60, 28], [69, 25], [78, 28], [82, 34],
  [77, 29], [68, 29], [58, 32], [49, 38], [41, 47], [31, 59], [25, 72], [22, 81],
];

const examples = [
  { time: '00:42', shot: 'straight' },
  { time: '02:17', shot: 'straight' },
  { time: '03:08', shot: 'drop' },
  { time: '05:36', shot: 'straight' },
  { time: '08:14', shot: 'cross' },
  { time: '10:05', shot: 'straight' },
];
const shotLabels = {
  fr: { straight: 'Dégagement droit (long de ligne)', cross: 'Dégagement croisé', drop: 'Amorti droit' },
  en: { straight: 'Straight clear (down the line)', cross: 'Cross-court clear', drop: 'Straight drop' },
};
const destinations = { straight: [86, 84], cross: [22, 83], drop: [75, 58] };

function drawCourt(canvas, frame, shot) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { width, height } = canvas;
  const toPixel = ([x, y]) => [x * width / 100, y * height / 100];
  const path = (vertices, color, fill) => {
    ctx.beginPath();
    vertices.forEach((vertex, index) => {
      const [x, y] = toPixel(vertex);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  ctx.fillStyle = '#171e3d';
  ctx.fillRect(0, 0, width, height);
  ctx.lineWidth = 1;
  for (let x = 0; x < 100; x += 5) path([[x, 0], [x, 100]], '#293255');
  for (let y = 0; y < 100; y += 8) path([[0, y], [100, y]], '#293255');

  ctx.lineWidth = 2;
  path([[24, 20], [76, 20], [96, 91], [4, 91], [24, 20]], '#8b98da', '#313c79');
  const courtLines = [
    [[28, 20], [13, 91]], [[72, 20], [87, 91]], [[50, 20], [50, 91]],
    [[22, 28], [78, 28]], [[19, 39], [81, 39]], [[12, 64], [88, 64]], [[6, 83], [94, 83]],
  ];
  courtLines.forEach(line => path(line, '#aab4ef'));
  path([[14, 56], [14, 42], [86, 42], [86, 56], [14, 56]], '#bcc7f5', '#20294bc4');
  ctx.lineWidth = 1;
  for (let x = 17; x < 86; x += 3) path([[x, 42], [x, 56]], '#5865a0');
  path([[14, 47], [86, 47]], '#5865a0');
  path([[14, 52], [86, 52]], '#5865a0');

  const hitFrame = 7;
  const trajectory = points.map(([x, y], index) => {
    if (index <= hitFrame) return [x, y];
    const progress = (index - hitFrame) / (points.length - 1 - hitFrame);
    const [endX, endY] = destinations[shot];
    return [82 + (endX - 82) * progress, 34 + (endY - 34) * progress - 14 * Math.sin(Math.PI * progress)];
  });
  ctx.lineWidth = 3;
  const traceStart = Math.max(0, frame - 8);
  path(trajectory.slice(traceStart, frame + 1), '#eab672');
  const [x, y] = toPixel(trajectory[frame]);
  const box = 15;
  const corner = 7;
  ctx.strokeStyle = '#ffd477';
  ctx.beginPath();
  for (const [horizontal, vertical] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    const left = x + box * horizontal;
    const top = y + box * vertical;
    ctx.moveTo(left - corner * horizontal, top);
    ctx.lineTo(left, top);
    ctx.lineTo(left, top - corner * vertical);
  }
  ctx.stroke();
  ctx.fillStyle = '#ffd477';
  ctx.fillRect(x - 3, y - 3, 6, 6);
}

export default function BadmintonReplay({ lang }) {
  const canvas = useRef(null);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [example, setExample] = useState(0);
  const lastFrame = points.length - 1;
  const en = lang === 'en';
  const shot = examples[example].shot;
  const straightCount = examples.filter(item => item.shot === 'straight').length;

  useEffect(() => { drawCourt(canvas.current, frame, shot); }, [frame, shot]);

  useEffect(() => {
    if (!playing) return;
    if (frame === lastFrame) { setPlaying(false); return; }
    const timer = window.setTimeout(() => setFrame(frame + 1), 155);
    return () => window.clearTimeout(timer);
  }, [frame, playing, lastFrame]);

  useEffect(() => {
    const pauseHidden = () => { if (document.hidden) setPlaying(false); };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setPlaying(false);
    });
    observer.observe(canvas.current);
    document.addEventListener('visibilitychange', pauseHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', pauseHidden);
    };
  }, []);

  function toggle() {
    if (playing) { setPlaying(false); return; }
    if (frame === lastFrame) setFrame(0);
    setPlaying(true);
  }

  return <figure className="replay">
    <div className="badminton-finding">
      <span>{en ? 'Rear-court backhand' : 'Revers en fond de court'}</span>
      <strong>{straightCount}/{examples.length} {en ? 'straight clears' : 'dégagements droits'}</strong>
      <p>{en ? 'Repeated down-the-line clears give your opponent a pattern to anticipate.' : 'À force de dégager long de ligne, tu donnes à ton adversaire un schéma à anticiper.'}</p>
    </div>
    <div className="badminton-clip">
      <label className="agent-select"><span>{en ? 'Point from the match' : 'Point du match'}</span>
        <select value={example} onChange={event => { setPlaying(false); setFrame(0); setExample(Number(event.target.value)); }}>
          {examples.map(({ time, shot: type }, index) => <option key={time} value={index}>{time} · {shotLabels[lang][type]}</option>)}
        </select>
      </label>
    </div>
    <canvas ref={canvas} width="720" height="360" role="img" aria-label={en ? 'Badminton court diagram with a box around the shuttlecock and its recent trajectory' : 'Schéma du terrain avec cadre autour du volant et tracé de sa trajectoire récente'}/>
    <div className="replay-controls">
      <button type="button" onClick={toggle}>{playing ? 'Pause' : frame === lastFrame ? (en ? 'Replay' : 'Rejouer') : (en ? 'Play' : 'Lire')}</button>
      <input type="range" min="0" max={lastFrame} value={frame} aria-label={en ? 'Rally frame' : 'Image de l’échange'} onChange={event => { setPlaying(false); setFrame(Number(event.target.value)); }}/>
      <span>{String(frame + 1).padStart(2, '0')} / {points.length}</span>
    </div>
    <figcaption>{en ? 'Six simulated points from an example match.' : 'Six points simulés d’un match d’exemple.'}</figcaption>
  </figure>;
}
