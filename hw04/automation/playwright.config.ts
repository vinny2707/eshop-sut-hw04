import { defineConfig, devices } from '@playwright/test';
import { STUDENT_ID, WEB_URL, ADMIN_URL, API_URL } from './helpers/env';

/**
 * One "browser run" = one feature (FEATURE) on one browser (--project).
 * scripts/run-all.mjs drives the 9 runs and sets FEATURE / BROWSER / RUN_AT.
 * Ad-hoc runs (no FEATURE) still work and report into reports/adhoc.
 */
const FEATURE = process.env.FEATURE ?? '';
const BROWSER = process.env.BROWSER ?? '';
// Set once in the main process so every worker and the report share the same timestamp.
process.env.RUN_AT ??= new Date().toISOString();
const RUN_AT = process.env.RUN_AT;

const runName = FEATURE && BROWSER ? `${FEATURE}-${BROWSER}` : 'adhoc';
// reports/<feature>/<browser>/index.html  (+ reports/<feature>/<browser>.json for the dashboard)
const reportDir = FEATURE && BROWSER ? `reports/${FEATURE}/${BROWSER}` : 'reports/adhoc';
const SUT_ROOT = '../..';

export default defineConfig({
  testDir: './tests',
  testMatch: FEATURE ? `${FEATURE}*.spec.ts` : '**/*.spec.ts',

  // The SUT shares one SQLite DB and in-memory carts: run serially to avoid cross-test interference.
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  outputDir: `test-results/${runName}`,

  metadata: {
    'Run by': STUDENT_ID,
    'Run at (ISO 8601)': RUN_AT,
    Feature: FEATURE || 'all',
    Browser: BROWSER || 'all',
  },

  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: reportDir,
        title: `Run by: ${STUDENT_ID} | ${runName} | ${RUN_AT}`,
        open: 'never',
      },
    ],
    // Machine-readable results, read by scripts/build-dashboard.mjs.
    // Kept OUTSIDE the html folder because the html reporter wipes its folder on every run.
    ['json', { outputFile: `${reportDir}.json` }],
  ],

  use: {
    baseURL: WEB_URL,
    // Evidence on failure = screenshot + the assertion error message (always in the report).
    screenshot: 'only-on-failure',
    trace: 'off',
    video: 'off',
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  webServer: [
    {
      // server.js requires ./database, which drops and reseeds every table on start.
      // Never reuse: a fresh backend per run = fresh DB + empty in-memory carts.
      name: 'backend',
      command: 'node server.js',
      cwd: `${SUT_ROOT}/backend`,
      url: `${API_URL}/api/products`,
      reuseExistingServer: false,
      timeout: 60_000,
    },
    {
      name: 'frontend-web',
      command: 'npm run dev -- --port 5173 --strictPort',
      cwd: `${SUT_ROOT}/frontend-web`,
      url: WEB_URL,
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      name: 'frontend-admin',
      command: 'npm run dev',
      cwd: `${SUT_ROOT}/frontend-admin`,
      url: ADMIN_URL,
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
});
