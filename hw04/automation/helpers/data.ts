import fs from 'node:fs';

export type TestCase<I = Record<string, unknown>, E = Record<string, unknown>> = {
  id: string; // FRxx-AT-NN
  source: string; // TC gốc trong HW02
  type: 'Positive' | 'Negative' | 'Edge';
  title: string;
  note?: string;
  input: I;
  expected: E;
};

let emailCounter = 0;

/** Email chưa tồn tại trong DB: <prefix>-<timestamp>-<số thứ tự>-<ngẫu nhiên>@test.com */
export function uniqueEmail(prefix: string): string {
  return `${prefix}-${Date.now()}-${emailCounter++}-${Math.random().toString(36).slice(2, 6)}@test.com`;
}

/** Đọc data/<fr>.json; mỗi giá trị "{{unique}}" được thay bằng một email riêng cho TC đó. */
export function loadCases<I = Record<string, unknown>, E = Record<string, unknown>>(fr: string): TestCase<I, E>[] {
  const raw = fs.readFileSync(new URL(`../data/${fr}.json`, import.meta.url), 'utf8');
  return (JSON.parse(raw) as TestCase<I, E>[]).map((tc) => {
    const email = uniqueEmail(fr);
    return JSON.parse(JSON.stringify(tc), (_key, value) => (value === '{{unique}}' ? email : value));
  });
}
