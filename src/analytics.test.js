import test from 'node:test';
import assert from 'node:assert/strict';
import { readConsent, storeConsent, validMeasurementId, enableAnalytics, CONSENT_LIFETIME } from './analytics.js';

test('GA disabled with missing or invalid IDs', () => {
  for (const value of ['', undefined, 'UA-123', 'G-<script>']) {
    assert.equal(validMeasurementId(value), false);
    assert.equal(enableAnalytics(value, {}), false);
  }
});
test('choice persistence, expiry and malformed storage', () => {
  const store = { value: null, getItem() { return this.value; }, setItem(k, v) { this.value = v; } };
  assert.equal(readConsent(store), null);
  storeConsent(store, 'accepted', 1000);
  assert.equal(readConsent(store, 1001), 'accepted');
  assert.equal(readConsent(store, 1000 + CONSENT_LIFETIME), null);
  storeConsent(store, 'refused', 2000);
  assert.equal(readConsent(store, 2001), 'refused');
  store.value = 'malformed'; assert.equal(readConsent(store), null);
  assert.equal(readConsent({ getItem() { throw new Error('blocked'); } }), null);
});
test('opt-in loads once, disables ads and excludes query/hash from page URL', () => {
  const nodes = [], environment = {
    document: { getElementById: id => nodes.find(n => n.id === id), createElement: () => ({}), head: { appendChild: element => nodes.push(element) } },
    location: { origin: 'https://example.com', pathname: '/Portfolio/', search: '?private=value', hash: '#contact' },
  };
  assert.equal(enableAnalytics('G-TEST1234', environment), true);
  assert.equal(enableAnalytics('G-TEST1234', environment), true);
  assert.equal(nodes.length, 1);
  const configuration = [...environment.dataLayer[2]][2];
  assert.equal(configuration.page_location, 'https://example.com/Portfolio/');
  assert.equal(configuration.allow_google_signals, false);
  assert.equal(configuration.allow_ad_personalization_signals, false);
});
