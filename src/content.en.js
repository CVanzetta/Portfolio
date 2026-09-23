// English copy mirrors the French case studies while retaining shared IDs and links.
export const projectTranslations = {
  'pdf-verifier': {
    type: 'Professional project · sanitized public version', category: 'OCR / AUTOMATION',
    title: 'Check a document,\nnot just read it.',
    summary: 'Extract text from a PDF, check required wording, and compare visual elements against references.',
    contribution: 'Built a document checking tool with a Vue interface and a Python API. The public repository contains a generic version without business documents or results.',
    choices: 'FastAPI separates extraction, OCR, and visual checks. Tesseract reads scanned pages; OpenCV compares images using ORB or SIFT. Text rules are configured in JSON.',
    proof: 'The code exposes text checks, image matches, and expected positions. Generic rules are available in the repository.',
    limit: 'Business image templates and test sets are not public. Quality depends on references and thresholds; I do not claim a precision rate or time saving.',
    note: 'This repository demonstrates OCR and classical computer vision. It does not contain a verifiable LLM or RAG pipeline.',
  },
  algovisualizer: {
    type: 'Personal project · open contributions', category: 'JAVA / ALGORITHMS',
    title: 'See what happens\nbetween two results.',
    summary: 'An application that breaks sorting algorithms into visible, controllable steps in the browser.',
    contribution: 'Built the Java / Spring Boot visualizer and its web interface. The repository also includes external contributions.',
    choices: 'Each algorithm produces snapshots of the array. A shared interface and a Spring service separate computation from rendering in Canvas.',
    proof: 'The sorting implementations and JUnit tests are present. For example, the QuickSort test verifies that [3, 2, 1] becomes [1, 2, 3] in three snapshots.',
    limit: 'Storing every step uses more memory as the array grows. The demo at the top of this page is a standalone JavaScript adaptation, not the original Java server.',
    note: 'An algorithms project, separate from Snake AI and the LLM projects.',
  },
  'snake-ai': {
    type: 'Personal project · experiment', category: 'PYTHON / LEARNING',
    title: 'Learn to play.\nUnderstand failure.',
    summary: 'A neural agent whose weights evolve through selection, crossover, and mutation to control Snake.',
    contribution: 'Implemented the game logic, decision network, and genetic evolution loop in Python.',
    choices: 'The network computes four possible actions with a hidden layer of 20 neurons. Fitness combines score, distance to food, and a penalty for repetitive moves.',
    proof: 'The code makes perception and fitness inspectable. The README documents a failure: with vision range set to 2, the agent stops immediately with a score of zero.',
    limit: 'The interface between perception and input size still needs work: perception currently returns 8 values, while training expects 26 with range_vision = 2. No stable performance score is claimed.',
    note: 'The animation illustrates selection, crossover, and mutation; the paths do not come from a trained model.',
  },
  enervision: {
    type: 'Academic project · Master’s level · 2026', category: 'ETL / MACHINE LEARNING',
    title: 'From energy data\nto a monitored model.',
    summary: 'Smart Energy Optimizer: a data and machine learning pipeline presented at my final exam.',
    contribution: 'As Product Owner, I organized the work and schedule. I also handled ETL, model training, deployment, and alerting.',
    choices: 'Architecture described in my CV: FastAPI, Vue 3, and PostgreSQL; Docker containers, GitHub Actions, Trivy, and Terraform. The project includes drift monitoring and retraining.',
    proof: 'My scope is documented in my CV and my personal role is specified. The application was hosted on school servers that were shut down after the exam.',
    limit: 'There is no active public service. Without a repository or evaluation report available here, the data, exact model, and performance are not detailed.',
    note: 'The diagram shows my scope of work; it is not a screenshot of the application.',
  },
};

export const secondaryTranslations = [
  { area: 'Machine learning · personal project', description: 'TensorFlow network, epsilon-greedy exploration, and games against Stockfish. TensorBoard logs are available; there is no validated Elo rating. The metric named win_rate is based on positive reward, not a reliable measure of wins.' },
  { area: 'Computer vision · personal project', description: 'FastAPI API, InsightFace embeddings, and FAISS / Qdrant vector search. The code is available; I do not repeat the performance figures from the README because the evaluation protocol has not been verified.' },
  { area: 'Data · summer_olympics repository', description: 'Python scripts inspect TMDL relationships and generate LookML. Changes can be previewed before application. Documented limit: complex DAX measures require manual work.' },
];
