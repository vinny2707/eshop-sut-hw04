// Runs every feature on every browser as a separate Playwright invocation,
// so each of the runs gets its own HTML report in reports/<feature>-<browser>/.
// Usage: node scripts/run-all.mjs [feature ...]   e.g. node scripts/run-all.mjs fr01
import { spawnSync } from 'node:child_process';

const FEATURES = ['fr01', 'fr09', 'fr17'];
const BROWSERS = ['chromium', 'firefox', 'webkit'];

const features = process.argv.slice(2).length ? process.argv.slice(2) : FEATURES;
const results = [];

for (const feature of features) {
  for (const browser of BROWSERS) {
    const env = { ...process.env, FEATURE: feature, BROWSER: browser, RUN_AT: new Date().toISOString() };
    console.log(`\n=== ${feature} on ${browser} (${env.RUN_AT}) ===`);
    const r = spawnSync(`npx playwright test --project=${browser}`, {
      env,
      stdio: 'inherit',
      shell: true,
    });
    results.push({ run: `${feature}-${browser}`, exit: r.status });
  }
}

console.log('\nSummary (exit 0 = all passed, 1 = some tests failed):');
console.table(results);

// Rebuild reports/index.html from every run's JSON (including runs from earlier invocations).
spawnSync('node scripts/build-dashboard.mjs', { stdio: 'inherit', shell: true });
