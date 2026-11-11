import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { build } from '../build.mjs';

export const config = { domain: 'https://ejemplo.com', siteName: 'Test', adsensePublisherId: '', contactEmail: 'a@ejemplo.com' };

test('build escribe dist/index.html y dist/en/index.html con canonical y hreflang', async () => {
  const out = await mkdtemp(join(tmpdir(), 'site-'));
  await build(config, out);
  const es = await readFile(join(out, 'index.html'), 'utf8');
  const en = await readFile(join(out, 'en/index.html'), 'utf8');
  assert.match(es, /<link rel="canonical" href="https:\/\/ejemplo\.com\/">/);
  assert.match(es, /hreflang="en" href="https:\/\/ejemplo\.com\/en\/"/);
  assert.match(es, /hreflang="x-default"/);
  assert.match(en, /<link rel="canonical" href="https:\/\/ejemplo\.com\/en\/">/);
});
