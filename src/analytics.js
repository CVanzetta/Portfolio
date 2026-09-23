export const CONSENT_KEY = 'cv-analytics-consent-v1';
export const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
export function validMeasurementId(value) { return /^G-[A-Z0-9]{5,20}$/.test(value || ''); }
export function readConsent(storage, now = Date.now()) {
  try {
    const saved = JSON.parse(storage.getItem(CONSENT_KEY));
    if (!saved || !['accepted', 'refused'].includes(saved.choice) || !Number.isFinite(saved.time) || saved.time > now || now - saved.time >= CONSENT_LIFETIME) return null;
    return saved.choice;
  } catch { return null; }
}
export function storeConsent(storage, choice, now = Date.now()) {
  if (!['accepted', 'refused'].includes(choice)) throw new Error('Choix de consentement invalide');
  try { storage.setItem(CONSENT_KEY, JSON.stringify({ choice, time: now })); } catch { /* Session-only choice when storage is unavailable. */ }
}
export function enableAnalytics(id, environment = window) {
  if (!validMeasurementId(id)) return false;
  environment[`ga-disable-${id}`] = false;
  if (environment.document.getElementById('cv-google-analytics')) return true;
  environment.dataLayer = environment.dataLayer || [];
  environment.gtag = function () { environment.dataLayer.push(arguments); };
  environment.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  environment.gtag('js', new Date());
  environment.gtag('config', id, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: environment.location.origin + environment.location.pathname,
    page_referrer: '',
    cookie_flags: 'SameSite=Lax;Secure',
  });
  const script = environment.document.createElement('script');
  script.id = 'cv-google-analytics'; script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  environment.document.head.appendChild(script);
  return true;
}
export function disableAnalytics(id, environment = window) {
  environment[`ga-disable-${id}`] = true;
  const names = environment.document.cookie.split(';').map(cookie => cookie.split('=')[0].trim()).filter(name => name === '_ga' || name.startsWith('_ga_'));
  for (const name of names) {
    for (const path of ['/', '/Portfolio', '/Portfolio/']) {
      for (const domain of ['', environment.location.hostname, `.${environment.location.hostname}`]) {
        environment.document.cookie = `${name}=; Max-Age=0; path=${path}${domain ? `; domain=${domain}` : ''}; SameSite=Lax`;
      }
    }
  }
}
