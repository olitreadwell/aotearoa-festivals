import { readFileSync } from 'node:fs';

const THRESHOLD = 80;

try {
  const summary = JSON.parse(readFileSync('coverage/coverage-summary.json', 'utf8'));
  const { total } = summary;
  const metrics = ['lines', 'statements', 'functions', 'branches'];
  let passed = true;

  for (const metric of metrics) {
    const pct = total[metric].pct;
    const status = pct >= THRESHOLD ? 'PASS' : 'FAIL';
    console.error(`  ${status}: ${metric} ${pct}% (threshold: ${THRESHOLD}%)`);
    if (pct < THRESHOLD) passed = false;
  }

  process.exit(passed ? 0 : 1);
} catch {
  console.error('No coverage report found. Run tests with coverage first.');
  process.exit(1);
}
