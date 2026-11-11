import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { build } from '../build.mjs';

const base = { domain: 'https://ejemplo.com', siteName: 'Test', contactEmail: 'a@ejemplo.com' };
const ID = 'pub-1234567890123456';

async function allHtml(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true, recursive: true })) {
    if (e.isFile() && e.name.endsWith('.html')) out.push(await readFile(join(e.parentPath, e.name), 'utf8'));
  }
  return out;
}

test('sin publisher ID no se inyecta nada de AdSense ni banner', async () => {
  const out = await mkdtemp(join(tmpdir(), 'site-'));
  await build({ ...base, adsensePublisherId: '' }, out);
  for (const html of await allHtml(out)) {
    assert.ok(!html.includes('googlesyndication'));
    assert.ok(!html.includes('cookie-banner'));
  }
});

test('con ID el script de AdSense solo vive dentro del script de consentimiento', async () => {
  const out = await mkdtemp(join(tmpdir(), 'site-'));
  await build({ ...base, adsensePublisherId: ID }, out);
  const home = await readFile(join(out, 'index.html'), 'utf8');
  assert.ok(home.includes('googlesyndication.com'));
  assert.ok(!/<script[^>]+src="[^"]*googlesyndication/.test(home), 'no debe haber <script src> estático');
  assert.ok(/<script>[^]*localStorage[^]*googlesyndication[^]*<\/script>/.test(home));
  assert.ok(home.includes(`ca-${ID}`));
  assert.match(home, /id="cookie-banner"/);
});

test('existen las 4 páginas legales en es y en, enlazadas desde el pie', async () => {
  const out = await mkdtemp(join(tmpdir(), 'site-'));
  await build({ ...base, adsensePublisherId: '' }, out);
  const paths = { es: ['privacidad', 'contacto', 'sobre-nosotros', 'terminos'], en: ['en/privacy', 'en/contact', 'en/about', 'en/terms'] };
  for (const [lang, list] of Object.entries(paths)) {
    const home = await readFile(join(out, lang === 'es' ? 'index.html' : 'en/index.html'), 'utf8');
    for (const p of list) {
      await readFile(join(out, p, 'index.html'), 'utf8');
      assert.ok(home.includes(`href="/${p}/"`), `${p} no enlazada`);
    }
  }
});

test('ads.txt con la línea exacta y política de privacidad completa', async () => {
  const out = await mkdtemp(join(tmpdir(), 'site-'));
  await build({ ...base, adsensePublisherId: ID }, out);
  assert.ok((await readFile(join(out, 'ads.txt'), 'utf8')).includes(`google.com, ${ID}, DIRECT, f08c47fec0942fa0`));
  const priv = await readFile(join(out, 'privacidad/index.html'), 'utf8');
  for (const w of ['AdSense', 'cookies']) assert.ok(priv.includes(w));
  assert.match(priv, /rechaz/i);
  const privEn = await readFile(join(out, 'en/privacy/index.html'), 'utf8');
  assert.match(privEn, /AdSense/);
  assert.match(privEn, /reject|opt out/i);
});

test('sin ID ads.txt es solo un comentario', async () => {
  const out = await mkdtemp(join(tmpdir(), 'site-'));
  await build({ ...base, adsensePublisherId: '' }, out);
  const ads = await readFile(join(out, 'ads.txt'), 'utf8');
  assert.ok(ads.trim().startsWith('#'));
  assert.ok(!ads.includes('DIRECT'));
});
