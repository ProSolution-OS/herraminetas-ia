import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from '../build.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ids = (await readdir(join(root, 'sites'))).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5));
const fileFor = (p) => (p.endsWith('/') ? p + 'index.html' : p);
const visibleWords = (html) => html.match(/<main>([\s\S]*)<\/main>/)[1]
  .replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

test('hay al menos 4 sitios y sus dominios son distintos', async () => {
  assert.ok(ids.length >= 4, ids.join());
  const domains = new Set();
  for (const id of ids) {
    const c = JSON.parse(await readFile(join(root, 'sites', id + '.json'), 'utf8'));
    assert.match(c.domain, /^https:\/\/[a-z0-9.-]+$/, id);
    domains.add(c.domain);
  }
  assert.equal(domains.size, ids.length);
});

for (const id of ids) {
  test(`sitio ${id}: páginas de herramienta completas, canonical y sitemap coherentes`, async () => {
    const config = JSON.parse(await readFile(join(root, 'sites', id + '.json'), 'utf8'));
    const out = await mkdtemp(join(tmpdir(), `site-${id}-`));
    await build(config, out);

    const xml = await readFile(join(out, 'sitemap.xml'), 'utf8');
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    assert.equal(locs.length, 12 + config.tools.length * 2);
    for (const l of locs) {
      assert.ok(l.startsWith(config.domain + '/'), l);
      await access(join(out, fileFor(l.replace(config.domain, ''))));
    }

    const home = await readFile(join(out, 'index.html'), 'utf8');
    assert.ok(home.includes(`rel="canonical" href="${config.domain}/"`));
    assert.ok(!home.includes('ejemplo.com'));

    const toolLocs = locs.filter((l) => /\/(herramientas|en\/tools)\/[^/]+\/$/.test(l.replace(config.domain, '')));
    assert.equal(toolLocs.length, config.tools.length * 2);
    for (const l of toolLocs) {
      const html = await readFile(join(out, fileFor(l.replace(config.domain, ''))), 'utf8');
      assert.match(html, /<h1>/, l);
      assert.ok(visibleWords(html) >= 300, `${l}: ${visibleWords(html)} palabras`);
      assert.match(html, /"@type":"FAQPage"/, l);
      assert.match(html, /"@type":"SoftwareApplication"/, l);
      assert.ok((html.match(/<h3>/g) ?? []).length >= 4, l);
    }
  });
}

test('un tema con color inválido hace fallar el build', async () => {
  const out = await mkdtemp(join(tmpdir(), 'site-'));
  await assert.rejects(build({ domain: 'https://x.test', siteName: 'X', adsensePublisherId: '', contactEmail: 'a@b.c', theme: { accent: 'rojo', accentDark: '#fff' } }, out));
});

test('un id de herramienta desconocido hace fallar el build', async () => {
  const out = await mkdtemp(join(tmpdir(), 'site-'));
  await assert.rejects(build({ domain: 'https://x.test', siteName: 'X', adsensePublisherId: '', contactEmail: 'a@b.c', tools: ['no-existe'] }, out), /desconocida/);
});
