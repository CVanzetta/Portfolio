export const initialValues = [42, 18, 71, 29, 91, 53, 12, 65, 36, 83, 24, 59, 96, 47, 7, 76, 32, 88, 15, 62, 39, 80, 21, 56];

// Snapshot-based browser adaptation; the original project calculates steps in Java.
export function sortFrames(input, algorithm = 'quick') {
  const a = [...input];
  let comparisons = 0;
  const frames = [{ values: [...a], active: [], comparisons }];
  const record = (active) => frames.push({ values: [...a], active, comparisons });
  const swap = (i, j) => { [a[i], a[j]] = [a[j], a[i]]; record([i, j]); };
  if (algorithm === 'quick') {
    const quick = (low, high) => {
      if (low >= high) return;
      const pivot = a[high]; let i = low;
      for (let j = low; j < high; j++) {
        comparisons++;
        if (a[j] < pivot) { swap(i, j); i++; }
      }
      swap(i, high); quick(low, i - 1); quick(i + 1, high);
    };
    quick(0, a.length - 1);
  } else if (algorithm === 'bubble') {
    for (let i = 0; i < a.length - 1; i++) {
      let changed = false;
      for (let j = 0; j < a.length - i - 1; j++) {
        comparisons++;
        if (a[j] > a[j + 1]) { swap(j, j + 1); changed = true; }
      }
      if (!changed) break;
    }
  } else if (algorithm === 'insertion') {
    for (let i = 1; i < a.length; i++) {
      let j = i;
      while (j > 0) {
        comparisons++;
        if (a[j - 1] <= a[j]) break;
        swap(j - 1, j); j--;
      }
    }
  } else throw new Error('Algorithme inconnu');
  frames.push({ values: [...a], active: [], comparisons });
  return frames;
}

export function verifyExample(text) {
  return text.normalize('NFC').toLocaleLowerCase('fr').includes('document de démonstration');
}
