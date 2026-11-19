export const runPrices = {
  expert: { input: 6, output: 24 },
  light: { input: 1.5, output: 6 },
};

const workloads = {
  qa: {
    checks: ['filter', 'detail', 'regression'],
    expert: [64000, 9000, 15],
    light: [32000, 4500, 8],
  },
  documents: {
    checks: ['index', 'sources', 'compare'],
    expert: [67000, 8250, 16],
    light: [34000, 4200, 8],
  },
};

// One SVG speed across all lanes. Model time is accounted for separately.
export const movementSpeed = 108;
const entry = [120, 15];
const router = [120, 41];
const light = [59, 76];
const expert = [174, 76];
const soloExpert = [120, 76];
const checks = [[45, 137], [105, 137], [165, 137]];
const delivery = [174, 181];
const entryToRouter = [entry, router];
const forkTo = model => [router, [120, 56], [model[0], 56], model];
const firstCheckFrom = model => [model, [model[0], 107], [45, 107], checks[0]];
const retryPath = [checks[2], [220, 137], [220, 56], [expert[0], 56], expert];
const deliveryPath = [checks[2], [165, 162], [174, 162], delivery];

const layouts = {
  direct: {
    models: [[soloExpert, 'expert']],
    rails: [[entry, soloExpert], firstCheckFrom(soloExpert)],
  },
  fallback: {
    models: [[light, 'light'], [expert, 'expert']],
    rails: [[entry, [light[0], 15], light], firstCheckFrom(light), firstCheckFrom(expert)],
  },
  routed: {
    models: [[router, 'router'], [light, 'light'], [expert, 'expert']],
    rails: [entryToRouter, forkTo(light), forkTo(expert), firstCheckFrom(light), firstCheckFrom(expert)],
  },
};

function toward(from, to) {
  const distance = Math.hypot(to[0] - from[0], to[1] - from[1]);
  const ratio = Math.min(.5, 8 / distance);
  return [from[0] + (to[0] - from[0]) * ratio, from[1] + (to[1] - from[1]) * ratio];
}

function makeTrack(points) {
  const vertices = points.flatMap((point, index) => {
    if (index === 0 || index === points.length - 1) return [point];
    const before = toward(point, points[index - 1]);
    const after = toward(point, points[index + 1]);
    return Array.from({ length: 9 }, (_, sample) => {
      const t = sample / 8;
      return before.map((value, axis) => (1 - t) ** 2 * value + 2 * (1 - t) * t * point[axis] + t ** 2 * after[axis]);
    });
  });
  const distances = [0];
  for (let i = 1; i < vertices.length; i++) {
    distances.push(distances[i - 1] + Math.hypot(vertices[i][0] - vertices[i - 1][0], vertices[i][1] - vertices[i - 1][1]));
  }
  return { vertices, distances, length: distances.at(-1) };
}

const trackLine = points => makeTrack(points).vertices.map(point => point.join(',')).join(' ');

export function positionAtDistance(track, distance) {
  const next = track.distances.findIndex(value => value > distance);
  if (next < 0) return track.vertices.at(-1);
  const start = track.vertices[next - 1];
  const fraction = (distance - track.distances[next - 1]) / (track.distances[next] - track.distances[next - 1]);
  return start.map((value, axis) => value + (track.vertices[next][axis] - value) * fraction);
}

const sharedRails = [checks, deliveryPath];
export const circuitLayout = {
  entry, checks, delivery,
  lanes: Object.fromEntries(Object.entries(layouts).map(([id, layout]) => [
    id, { models: layout.models, rails: [...layout.rails, ...sharedRails].map(trackLine) },
  ])),
};

function buildRun(id, workload, useSkill) {
  const events = [];
  let playbackSeconds = 0;
  let state = { token: entry, outcomes: ['pending', 'pending', 'pending'], delivered: false, cost: 0, seconds: 0, retries: 0 };

  function add(duration, stage, detail) {
    const start = playbackSeconds;
    playbackSeconds += duration;
    events.push({ start, end: playbackSeconds, stage, detail, state });
  }

  function move(points, stage, detail) {
    const track = makeTrack(points);
    add(track.length / movementSpeed, stage, { ...detail, track });
    state = { ...state, token: points.at(-1) };
  }

  function call(model, budget, stage, useTargetedSkill = false) {
    const [input, output, duration] = budget;
    const rate = runPrices[model];
    const inputTokens = useTargetedSkill ? Math.round(input * .7) : input;
    const seconds = useTargetedSkill ? duration - 2 : duration;
    add(seconds * .068, stage, { model });
    state = { ...state, seconds: state.seconds + seconds, cost: state.cost + (inputTokens * rate.input + output * rate.output) / 1e6 };
  }

  function validate(modelPoint, fails) {
    for (let index = 0; index < checks.length; index++) {
      const path = index === 0 ? firstCheckFrom(modelPoint) : checks.slice(index - 1, index + 1);
      move(path, 'checking', { index });
      const outcome = fails && index === 2 ? 'failed' : 'done';
      state = {
        ...state,
        seconds: state.seconds + 1,
        outcomes: state.outcomes.map((previous, i) => i === index ? outcome : previous),
      };
      add(outcome === 'failed' ? .7 : .22, outcome === 'failed' ? 'failed' : 'checked', { index });
    }
  }

  if (id === 'fallback') {
    move([entry, [light[0], 15], light], 'executing', { model: 'light' });
    call('light', workload.light, 'executing');
    validate(light, true);
    state = { ...state, retries: 1 };
    move(retryPath, 'retrying', { retry: true });
    call('expert', workload.expert, 'retrying');
    state = { ...state, outcomes: ['pending', 'pending', 'pending'] };
    validate(expert, false);
  } else {
    const routed = id === 'routed';
    if (routed) {
      move(entryToRouter, 'routing');
      call('light', [1800, 180, 1], 'routing');
    }
    move(routed ? forkTo(expert) : [entry, soloExpert], 'executing', { model: 'expert' });
    call('expert', workload.expert, 'executing', routed && useSkill);
    validate(routed ? expert : soloExpert, false);
  }

  move(deliveryPath, 'delivering');
  state = { ...state, delivered: true };
  return { id, checks: workload.checks, events, playbackSeconds, final: state };
}

export function compareRuns(workload, useSkill) {
  return ['direct', 'fallback', 'routed'].map(id => buildRun(id, workloads[workload], useSkill));
}

export function playbackAt(run, elapsed, reduced = false) {
  const event = run.events.find(item => elapsed < item.end);
  if (!event) return { ...run.final, stage: 'delivered' };
  const { track, ...detail } = event.detail ?? {};
  const token = track && !reduced
    ? positionAtDistance(track, (elapsed - event.start) * movementSpeed)
    : event.state.token;
  return { ...event.state, ...detail, token, track, stage: event.stage };
}
