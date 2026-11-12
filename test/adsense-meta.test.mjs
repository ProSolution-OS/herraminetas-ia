import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { build } from '../build.mjs';

const base = { domain: 'https://ejemplo.com', siteName: 'Test', contactEmail: 'a@ejemplo.com' };
const ID = 'pub-3747681331852269';

test('con ID, todas las páginas llevan la metaetiqueta de verificación de AdSense y ningún script estático', async () => {
  const out = await mkdtemp(join(tmpdir(), 'site-'));
  await build({ ...base, adsensePublisherId: ID }, out);
  for (const p of ['index.html', 'en/index.html', 'herramientas/costo-llm/index.html', 'privacidad/index.html']) {
    const html = await readFile(join(out, p), 'utf8');
    assert.ok(html.includes(`<meta name="google-adsense-account" content="ca-${ID}">`), p);
    assert.ok(!/<script[^>]+src="[^"]*googlesyndication/.test(html), p);
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
    assert.ok(head.includes('google-adsense-account'), `${p}: la metaetiqueta debe estar en <head>`);
  }
});

test('sin ID no hay metaetiqueta de AdSense', async () => {
  const out = await mkdtemp(join(tmpdir(), 'site-'));
  await build({ ...base, adsensePublisherId: '' }, out);
  assert.ok(!(await readFile(join(out, 'index.html'), 'utf8')).includes('google-adsense-account'));
});

test('un ID con formato incorrecto hace fallar el build', async () => {
  const out = await mkdtemp(join(tmpdir(), 'site-'));
  await assert.rejects(build({ ...base, adsensePublisherId: 'ca-pub-123' }, out), /adsensePublisherId/);
  await assert.rejects(build({ ...base, adsensePublisherId: 'pub-12<script>' }, out), /adsensePublisherId/);
});
