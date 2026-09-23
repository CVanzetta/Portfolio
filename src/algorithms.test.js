import test from 'node:test';
import assert from 'node:assert/strict';
import { sortFrames, initialValues, verifyExample } from './algorithms.js';

for (const algorithm of ['quick', 'bubble', 'insertion']) {
  test(`${algorithm}: sorted output, unchanged input, valid snapshots`, () => {
    for (const input of [[], [1], [4, 4, 1, -2, 0], [3, 2, 1], [1, 2, 3], initialValues]) {
      const original = [...input];
      const sorted = [...input].sort((a, b) => a - b);
      const frames = sortFrames(input, algorithm);
      assert.deepEqual(input, original);
      assert.deepEqual(frames.at(-1).values, sorted);
      for (const [index, frame] of frames.entries()) {
        assert.deepEqual([...frame.values].sort((a,b) => a-b), sorted);
        assert.ok(frame.active.every(i => i >= 0 && i < input.length));
        assert.ok(frame.comparisons >= (frames[index - 1]?.comparisons ?? 0));
      }
      if (frames.length > 1) assert.notEqual(frames[0].values, frames[1].values);
    }
  });
}
test('text presence: success, failure, case and Unicode accents', () => {
  assert.equal(verifyExample('Article 04 : Protection des données'), true);
  assert.equal(verifyExample('PROTECTION DES DONNÉES'), true);
  assert.equal(verifyExample('Protection des données'.normalize('NFD')), true);
  assert.equal(verifyExample('Contrat sans cette clause'), false);
  assert.equal(verifyExample(''), false);
});
