import React, { useEffect, useRef, useState } from 'react';

const asset = path => `${import.meta.env.BASE_URL}${path}`;
export const demoMedia = import.meta.env.PORTFOLIO_MEDIA;

export default function DemoVideo({ media, lang, title, description, fallbackImage, imageAlt }) {
  const container = useRef(null);
  const video = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const available = Boolean(media?.video) && !failed;
  const en = lang === 'en';

  useEffect(() => {
    if (!available) return;
    const player = video.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setReady(true);
      else video.current?.pause();
    }, { threshold: .1 });
    observer.observe(container.current);
    const pauseHidden = () => { if (document.hidden) video.current?.pause(); };
    document.addEventListener('visibilitychange', pauseHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', pauseHidden);
      player?.pause();
    };
  }, [available]);

  return <figure className="demo-video" ref={container} data-media-state={available ? 'available' : failed ? 'error' : 'coming-soon'}>
    <div className="media-window-bar"><span className="media-window-dots" aria-hidden="true"><i/><i/><i/></span><span>{title}</span><span className="mono">{available ? 'VIDEO' : en ? 'PREVIEW' : 'APERÇU'}</span></div>
    {available ? <video
      ref={video}
      controls
      muted
      playsInline
      preload="none"
      poster={media.poster ? asset(media.poster) : fallbackImage ? asset(fallbackImage) : undefined}
      src={ready ? asset(media.video) : undefined}
      aria-label={title}
      onError={() => setFailed(true)}
    /> : <div className={`media-placeholder ${fallbackImage ? 'has-image' : ''}`}>
      {fallbackImage ? <img src={asset(fallbackImage)} width="1200" height="559" loading="lazy" alt={imageAlt}/> : <>
        <span className="media-placeholder-mark" aria-hidden="true">↳</span>
        <p>{en ? 'From a tester’s request to a test result.' : 'De la demande du testeur au résultat du test.'}</p>
        <span className="mono">{en ? 'REQUEST → ACTION → EVIDENCE' : 'DEMANDE → ACTION → PREUVE'}</span>
      </>}
      <span className="media-status">{failed ? en ? 'Demo unavailable' : 'Démo indisponible' : en ? 'Video demo coming soon' : 'Démo vidéo à venir'}</span>
    </div>}
    <figcaption>{description}</figcaption>
  </figure>;
}
