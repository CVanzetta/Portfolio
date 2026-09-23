import React, { useEffect, useState } from 'react';
import { readConsent, storeConsent, enableAnalytics, disableAnalytics, validMeasurementId } from './analytics';

const measurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-DKNH9QNFVC').trim();
const configured = validMeasurementId(measurementId);
const storage = {
  getItem(key) { try { return window.localStorage.getItem(key); } catch { return null; } },
  setItem(key, value) { try { window.localStorage.setItem(key, value); } catch { /* blocked storage */ } },
};

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState(() => configured ? readConsent(storage) : null);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    if (!configured) return;
    if (choice === 'accepted') enableAnalytics(measurementId);
    else disableAnalytics(measurementId);
  }, [choice]);
  if (!configured) return null;
  function choose(next) {
    storeConsent(storage, next);
    if (next === 'refused' && choice === 'accepted') {
      disableAnalytics(measurementId);
      // Unload the previously consented Google library after revocation.
      window.location.reload(); return;
    }
    setChoice(next); setEditing(false);
  }
  return <><button className="privacy-settings" onClick={() => setEditing(true)}>Confidentialité & cookies</button>{(!choice || editing) && <section className="consent-panel" aria-label="Choix de mesure d’audience"><div><h2>Mesurer les visites, avec votre accord.</h2><p>Google Analytics est chargé uniquement si vous acceptez. Il mesure les visites et des informations techniques de navigation. Les fonctions publicitaires sont désactivées. Vous pouvez refuser ou retirer votre accord ici à tout moment.</p><p className="consent-meta">Responsable : Charles Vanzetta · <a href="mailto:charles.vanzetta@gmail.com">Contact</a> · <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Confidentialité Google ↗</a>. Votre choix est conservé 6 mois.</p></div><div className="consent-actions"><button onClick={() => choose('refused')}>Refuser</button><button onClick={() => choose('accepted')}>Accepter</button>{choice && <button onClick={() => setEditing(false)}>Fermer</button>}</div></section>}</>;
}
