import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { build } from '../build.mjs';
import { sitemapXml, robotsTxt } from '../src/seo.mjs';

const config = { domain: 'https://ejemplo.com', siteName: 'Test', adsensePublisherId: '', contactEmail: 'a@ejemplo.com' };
const fileFor = (p) => (p.endsWith('/') ? p + 'index.html' : p);

test('cada <loc> del sitemap existe en dist y hay reciprocidad hreflang', async () => {
  const out = await mkdtemp(join(tmpdir(), 'site-'));
  await build(config, out);
  const xml = await readFile(join(out, 'sitemap.xml'), 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.ok(locs.length >= 8);
  for (const l of locs) await access(join(out, fileFor(l.replace(config.domain, ''))));
  // reciprocidad: el HTML de cada alternativa declara de vuelta a la página original
  for (const l of locs) {
    const html = await readFile(join(out, fileFor(l.replace(config.domain, ''))), 'utf8');
    const alts = [...html.matchAll(/hreflang="(?:es|en)" href="([^"]+)"/g)].map((m) => m[1]);
    assert.ok(alts.includes(l), `${l} debe declararse a sí misma`);
    for (const a of alts) {
      const back = await readFile(join(out, fileFor(a.replace(config.domain, ''))), 'utf8');
      assert.ok(back.includes(`hreflang="${l.includes('/en/') ? 'en' : 'es'}" href="${l}"`), `${a} no enlaza de vuelta a ${l}`);
    }
  }
});

test('una página noindex no aparece en el sitemap', () => {
  const pages = [
    { path: '/', lang: 'es', alternates: { es: '/' } },
    { path: '/oculta/', lang: 'es', alternates: { es: '/oculta/' }, noindex: true },
  ];
  const xml = sitemapXml(pages, 'https://ejemplo.com');
  assert.ok(xml.includes('https://ejemplo.com/'));
  assert.ok(!xml.includes('/oculta/'));
});

test('robots.txt apunta al sitemap y no bloquea /assets/', () => {
  const r = robotsTxt('https://ejemplo.com');
  assert.match(r, /Sitemap: https:\/\/ejemplo\.com\/sitemap\.xml/);
  assert.ok(!/Disallow:\s*\/assets/.test(r));
});
