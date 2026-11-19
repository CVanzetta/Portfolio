import test from 'node:test';
import assert from 'node:assert/strict';
import { circuitLayout, compareRuns, movementSpeed, playbackAt } from './orchestration.js';

test('the QA expert run uses an illustrative $0.60 model call', () => {
  const [expert] = compareRuns('qa', false);
  assert.ok(Math.abs(expert.final.cost - .60) < 1e-9);
  assert.equal(expert.final.seconds, 18);
});

test('one lightweight execution passes two checks, fails the third and then retries with the expert', () => {
  const [, fallback] = compareRuns('qa', true);
  const failure = fallback.events.find(event => event.stage === 'failed');
  assert.deepEqual(failure.state.outcomes, ['done', 'done', 'failed']);
  assert.equal(failure.state.delivered, false);
  const retry = fallback.events.find(event => event.detail?.retry);
  assert.equal(retry.start, failure.end);
  assert.deepEqual(retry.detail.track.vertices[0], circuitLayout.checks[2]);
  assert.deepEqual(playbackAt(fallback, retry.start).outcomes, failure.state.outcomes);
  assert.equal(fallback.events.filter(event => event.stage === 'checking').length, 6);
});

test('each circuit makes one delivery only after three checks have passed', () => {
  for (const workload of ['qa', 'documents']) {
    for (const run of compareRuns(workload, true)) {
      const deliveries = run.events.filter(event => event.stage === 'delivering');
      assert.equal(deliveries.length, 1);
      assert.deepEqual(deliveries[0].state.outcomes, ['done', 'done', 'done']);
      assert.equal(playbackAt(run, deliveries[0].start).delivered, false);
      const result = playbackAt(run, run.playbackSeconds);
      assert.equal(result.delivered, true);
      assert.deepEqual(result.token, circuitLayout.delivery);
    }
  }
});

test('every movement uses the same speed regardless of track length and model latency', () => {
  for (const run of compareRuns('qa', true)) {
    for (const { start, end, detail } of run.events) {
      if (!detail?.track) continue;
      assert.ok(Math.abs(detail.track.length / (end - start) - movementSpeed) < 1e-8);
    }
  }
});

test('the targeted skill only changes routed model execution', () => {
  for (const workload of ['qa', 'documents']) {
    const withSkill = compareRuns(workload, true);
    const withoutSkill = compareRuns(workload, false);
    assert.deepEqual(withSkill.slice(0, 2), withoutSkill.slice(0, 2));
    assert.ok(withSkill[2].final.cost < withoutSkill[2].final.cost);
    assert.ok(withSkill[2].final.seconds < withoutSkill[2].final.seconds);
    assert.ok(withSkill[1].final.seconds > withSkill[2].final.seconds);
  }
});
