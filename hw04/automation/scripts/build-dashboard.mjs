// Builds reports/index.html: a visual summary of every run found in reports/<feature>/<browser>.json.
// - KPI cards, a feature x browser matrix with links to each Playwright HTML report,
// - per feature: a test-case x browser grid, and every failure with its error message + screenshot.
// Failure screenshots are copied to reports/<feature>/<browser>-shots/ so they survive test-results cleanup.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPORTS = path.join(ROOT, 'reports');
const STUDENT_ID = '23120409';
const BROWSERS = ['chromium', 'firefox', 'webkit'];
const FEATURE_NAMES = {
  fr01: 'FR-01 · Registration',
  fr09: 'FR-09 · Discount Coupons',
  fr17: 'FR-17 · Coupon CRUD (Admin)',
};

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const stripAnsi = (s) => String(s ?? '').replace(/\u001b\[[0-9;]*m/g, '');
const slug = (s) => s.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);

// Playwright HTML report keeps its data zipped inside index.html, so "Run by" is only visible once JS renders it.
// Also write it as plain text in <title> and <meta>, using the metadata Playwright recorded for that run.
function stampReport(htmlPath, meta, feature, browser) {
  if (!fs.existsSync(htmlPath)) return;
  const runBy = meta['Run by'] ?? STUDENT_ID;
  const runAt = meta['Run at (ISO 8601)'] ?? '';
  let html = fs.readFileSync(htmlPath, 'utf8');
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(`Run by: ${runBy} | ${feature}-${browser} | ${runAt}`)}</title>`);
  html = html.replace(/\s*<meta name="run-(by|at)"[^>]*>/g, '');
  html = html.replace(
    /<\/title>/,
    `</title>\n    <meta name="run-by" content="${esc(runBy)}">\n    <meta name="run-at" content="${esc(runAt)}">`,
  );
  // Windows may briefly lock a file that was just written (antivirus / indexer): retry a few times.
  for (let attempt = 1; ; attempt++) {
    try {
      fs.writeFileSync(htmlPath, html);
      return;
    } catch (err) {
      if (attempt >= 10) {
        console.warn(`Could not stamp ${htmlPath}: ${err.code} — close any open report and rerun build-dashboard.`);
        return;
      }
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 500);
    }
  }
}

// ---------- collect ----------
function flattenSpecs(suite, parents = []) {
  const titles = suite.title && !suite.title.endsWith('.ts') ? [...parents, suite.title] : parents;
  const out = [];
  for (const spec of suite.specs ?? []) out.push({ spec, titlePath: [...titles, spec.title], file: spec.file });
  for (const child of suite.suites ?? []) out.push(...flattenSpecs(child, titles));
  return out;
}

const runs = []; // { feature, browser, startTime, stats, tests: [...] }
if (fs.existsSync(REPORTS)) {
  for (const feature of fs.readdirSync(REPORTS).sort()) {
    const fdir = path.join(REPORTS, feature);
    if (!fs.statSync(fdir).isDirectory()) continue;
    for (const browser of BROWSERS) {
      const jsonPath = path.join(fdir, `${browser}.json`);
      if (!fs.existsSync(jsonPath)) continue;
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      stampReport(path.join(fdir, browser, 'index.html'), data.config?.metadata ?? {}, feature, browser);
      const tests = [];
      for (const top of data.suites ?? []) {
        for (const { spec, titlePath, file } of flattenSpecs(top)) {
          for (const t of spec.tests ?? []) {
            const last = t.results?.[t.results.length - 1] ?? {};
            const status =
              t.status === 'expected' ? 'passed' : t.status === 'skipped' ? 'skipped' : t.status === 'flaky' ? 'flaky' : 'failed';
            const ann = Object.fromEntries((t.annotations ?? []).map((a) => [a.type, a.description]));
            let shot = null;
            const att = (last.attachments ?? []).find((a) => a.contentType?.startsWith('image/') && a.path);
            const shotDir = path.join(fdir, `${browser}-shots`);
            const shotName = `${slug(titlePath.join(' '))}.png`;
            if (att && fs.existsSync(att.path)) {
              fs.mkdirSync(shotDir, { recursive: true });
              fs.copyFileSync(att.path, path.join(shotDir, shotName));
            }
            if (status === 'failed' && fs.existsSync(path.join(shotDir, shotName))) shot = `${feature}/${browser}-shots/${shotName}`;
            tests.push({
              key: `${file}::${titlePath.join(' › ')}`,
              title: titlePath.join(' › '),
              status,
              duration: last.duration ?? 0,
              error: stripAnsi((last.errors ?? []).map((e) => e.message).join('\n\n')).trim(),
              type: ann.type ?? '',
              note: ann.note ?? '',
              shot,
            });
          }
        }
      }
      const count = (s) => tests.filter((t) => t.status === s).length;
      runs.push({
        feature,
        browser,
        startTime: data.stats?.startTime ?? '',
        duration: data.stats?.duration ?? 0,
        tests,
        passed: count('passed'),
        failed: count('failed'),
        flaky: count('flaky'),
        skipped: count('skipped'),
      });
    }
  }
}

// ---------- render ----------
const features = [...new Set(runs.map((r) => r.feature))];
const total = runs.reduce((n, r) => n + r.tests.length, 0);
const passed = runs.reduce((n, r) => n + r.passed, 0);
const failed = runs.reduce((n, r) => n + r.failed + r.flaky, 0);
const generatedAt = new Date().toISOString();
const runOf = (f, b) => runs.find((r) => r.feature === f && r.browser === b);

const badge = (status) =>
  `<span class="badge ${status}">${{ passed: '✓ Pass', failed: '✗ Fail', flaky: '~ Flaky', skipped: '– Skip' }[status] ?? '·'}</span>`;

const kpi = (label, value, cls = '') => `<div class="kpi ${cls}"><div class="kpi-value">${value}</div><div class="kpi-label">${label}</div></div>`;

const matrix = `
<table class="matrix">
  <thead><tr><th>Feature</th>${BROWSERS.map((b) => `<th>${b}</th>`).join('')}</tr></thead>
  <tbody>
  ${features
    .map(
      (f) => `<tr><th scope="row"><a href="#${f}">${esc(FEATURE_NAMES[f] ?? f)}</a></th>${BROWSERS.map((b) => {
        const r = runOf(f, b);
        if (!r) return '<td class="empty">chưa chạy</td>';
        const n = r.tests.length;
        return `<td>
          <div class="cell-top"><strong>${r.passed}/${n}</strong> pass${r.failed ? ` · <span class="fail-text">${r.failed} fail</span>` : ''}</div>
          <div class="bar"><span class="bar-pass" style="width:${pct(r.passed, n)}%"></span><span class="bar-fail" style="width:${pct(r.failed + r.flaky, n)}%"></span></div>
          <div class="cell-meta">${esc(r.startTime)} · ${(r.duration / 1000).toFixed(1)}s</div>
          <a class="open" href="${f}/${b}/index.html">Mở HTML report →</a>
        </td>`;
      }).join('')}</tr>`,
    )
    .join('')}
  </tbody>
</table>`;

const featureSection = (f) => {
  const fr = runs.filter((r) => r.feature === f);
  const keys = [...new Map(fr.flatMap((r) => r.tests).map((t) => [t.key, t])).values()];
  const failures = fr.flatMap((r) => r.tests.filter((t) => t.status === 'failed' || t.status === 'flaky').map((t) => ({ ...t, browser: r.browser })));
  return `
<section id="${f}">
  <h2>${esc(FEATURE_NAMES[f] ?? f)}</h2>
  <table class="grid">
    <thead><tr><th>Test case</th><th>Loại</th>${BROWSERS.map((b) => `<th>${b}</th>`).join('')}</tr></thead>
    <tbody>
    ${keys
      .map((k) => {
        const cells = BROWSERS.map((b) => {
          const t = runOf(f, b)?.tests.find((x) => x.key === k.key);
          return `<td>${t ? badge(t.status) : '<span class="badge none">—</span>'}</td>`;
        }).join('');
        const note = k.note ? `<div class="note">${esc(k.note)}</div>` : '';
        return `<tr><td class="tc">${esc(k.title)}${note}</td><td><span class="type">${esc(k.type || '—')}</span></td>${cells}</tr>`;
      })
      .join('')}
    </tbody>
  </table>
  ${
    failures.length
      ? `<h3>Lỗi phát hiện (${failures.length})</h3>
  <div class="failures">
  ${failures
    .map(
      (t) => `<article class="failure">
      <header><span class="browser">${t.browser}</span> ${esc(t.title)}</header>
      <div class="failure-body">
        <pre>${esc(t.error || '(không có thông báo lỗi)')}</pre>
        ${t.shot ? `<a class="shot" href="${esc(t.shot)}"><img src="${esc(t.shot)}" alt="Screenshot lúc fail: ${esc(t.title)} trên ${t.browser}" loading="lazy"></a>` : '<div class="noshot">không có screenshot</div>'}
      </div>
    </article>`,
    )
    .join('')}
  </div>`
      : '<p class="allpass">Không có test fail ở tính năng này.</p>'
  }
</section>`;
};

const html = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Run by: ${STUDENT_ID} · EShop HW04 dashboard</title>
<style>
:root {
  --bg: #f6f7f9; --surface: #ffffff; --text: #1b1f24; --muted: #5d6673; --line: #e3e6ea;
  --pass: #1a7f37; --pass-bg: #dcf5e3; --fail: #c2261d; --fail-bg: #fde3e1; --flaky: #9a6700; --flaky-bg: #fff3c4;
  --accent: #2557d6; --code-bg: #f1f3f5;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0f1216; --surface: #171b21; --text: #e6e9ee; --muted: #9aa3ae; --line: #2a3039;
    --pass: #4ac26b; --pass-bg: #12331c; --fail: #ff7b72; --fail-bg: #3d1513; --flaky: #e3b341; --flaky-bg: #3a2d0b;
    --accent: #79a6ff; --code-bg: #0f1216;
  }
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--text); font: 14px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
main { max-width: 1180px; margin: 0 auto; padding: 24px 16px 64px; }
a { color: var(--accent); }
header.top { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; align-items: end; margin-bottom: 20px; }
h1 { margin: 0; font-size: 22px; }
.runby { font-size: 15px; font-weight: 600; }
.sub { color: var(--muted); font-size: 13px; }
h2 { margin: 36px 0 12px; font-size: 18px; }
h3 { margin: 20px 0 10px; font-size: 15px; }
.kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
.kpi { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px; }
.kpi-value { font-size: 26px; font-weight: 700; font-variant-numeric: tabular-nums; }
.kpi-label { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: .04em; }
.kpi.pass .kpi-value { color: var(--pass); } .kpi.fail .kpi-value { color: var(--fail); }
.scroll { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
th, td { padding: 10px 12px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
thead th { font-size: 12px; text-transform: uppercase; letter-spacing: .04em; color: var(--muted); background: var(--bg); }
.matrix td { min-width: 200px; }
.cell-top { font-variant-numeric: tabular-nums; }
.fail-text { color: var(--fail); font-weight: 600; }
.bar { display: flex; height: 8px; border-radius: 4px; background: var(--line); overflow: hidden; margin: 6px 0; }
.bar-pass { background: var(--pass); } .bar-fail { background: var(--fail); }
.cell-meta { color: var(--muted); font-size: 12px; }
.open { font-size: 13px; }
td.empty { color: var(--muted); font-style: italic; }
.grid td.tc { min-width: 280px; }
.type { color: var(--muted); font-size: 12px; }
.note { color: var(--flaky); font-size: 12px; margin-top: 2px; }
.badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 600; white-space: nowrap; }
.badge.passed { color: var(--pass); background: var(--pass-bg); }
.badge.failed { color: var(--fail); background: var(--fail-bg); }
.badge.flaky { color: var(--flaky); background: var(--flaky-bg); }
.badge.skipped, .badge.none { color: var(--muted); background: var(--bg); }
.failures { display: grid; gap: 12px; }
.failure { background: var(--surface); border: 1px solid var(--line); border-left: 4px solid var(--fail); border-radius: 10px; overflow: hidden; }
.failure header { padding: 10px 14px; font-weight: 600; border-bottom: 1px solid var(--line); }
.browser { display: inline-block; font-size: 11px; text-transform: uppercase; letter-spacing: .04em; padding: 1px 6px; border: 1px solid var(--line); border-radius: 4px; margin-right: 6px; color: var(--muted); }
.failure-body { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 14px; padding: 14px; }
pre { margin: 0; padding: 12px; background: var(--code-bg); border: 1px solid var(--line); border-radius: 8px; white-space: pre-wrap; word-break: break-word; font: 12px/1.5 ui-monospace, Consolas, monospace; max-height: 320px; overflow: auto; }
.shot img { width: 100%; border: 1px solid var(--line); border-radius: 8px; display: block; }
.noshot { color: var(--muted); font-style: italic; }
.allpass { color: var(--pass); }
@media (max-width: 760px) { .failure-body { grid-template-columns: 1fr; } }
</style>
</head>
<body>
<main>
  <header class="top">
    <div>
      <h1>EShop HW04 · Automation dashboard</h1>
      <div class="sub">Playwright · data-driven · Chromium / Firefox / WebKit</div>
    </div>
    <div style="text-align:right">
      <div class="runby">Run by: ${STUDENT_ID}</div>
      <div class="sub">Generated at ${generatedAt}</div>
    </div>
  </header>

  <div class="kpis">
    ${kpi('Tính năng', features.length)}
    ${kpi('Lượt chạy browser', runs.length)}
    ${kpi('Lượt test đã chạy', total)}
    ${kpi('Pass', passed, 'pass')}
    ${kpi('Fail', failed, 'fail')}
    ${kpi('Tỉ lệ pass', `${pct(passed, total)}%`)}
  </div>

  <h2>Kết quả theo tính năng × trình duyệt</h2>
  <div class="scroll">${runs.length ? matrix : '<p class="sub">Chưa có lượt chạy nào.</p>'}</div>

  ${features.map((f) => `<div class="scroll">${featureSection(f)}</div>`).join('')}
</main>
</body>
</html>`;

fs.mkdirSync(REPORTS, { recursive: true });
fs.writeFileSync(path.join(REPORTS, 'index.html'), html);
console.log(`Dashboard: ${path.relative(process.cwd(), path.join(REPORTS, 'index.html'))} (${runs.length} runs, ${total} tests)`);
