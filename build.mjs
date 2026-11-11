import { rm, mkdir, writeFile, readFile, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { layout } from './src/templates/layout.mjs';
import { LANGS, t, homePath, toolsPath } from './src/i18n.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const optional = async (rel) => (existsSync(join(here, rel)) ? import(pathToFileURL(join(here, rel)).href) : null);

/** Page = {key, lang, path, title, description, body, jsonld?, noindex?} */
function corePages() {
  return LANGS.map((lang) => ({
    key: 'home', lang, path: homePath(lang), title: t(lang, 'homeTitle'), description: t(lang, 'homeDesc'),
    body: `<h1>${t(lang, 'homeH1')}</h1><p>${t(lang, 'homeIntro')}</p><p><a href="${toolsPath(lang)}">${t(lang, 'tools')}</a></p>`,
  }));
}

export async function collectPages(config) {
  const pages = corePages();
  for (const rel of ['src/tools/index.mjs', 'src/legal.mjs']) {
    const mod = await optional(rel);
    if (mod) pages.push(...mod.pages(config));
  }
  return pages;
}

const fileFor = (path) => (path.endsWith('/') ? path + 'index.html' : path);

export async function build(config, outDir) {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(join(outDir, 'assets'), { recursive: true });
  await cp(join(here, 'src/styles.css'), join(outDir, 'assets/styles.css'));
  if (existsSync(join(here, 'src/lib'))) await cp(join(here, 'src/lib'), join(outDir, 'assets/lib'), { recursive: true });

  const pages = await collectPages(config);
  const byKey = {};
  for (const p of pages) (byKey[p.key] ??= {})[p.lang] = p.path;
  const consent = await optional('src/consent.mjs');
  const written = [];
  for (const p of pages) {
    p.alternates = byKey[p.key];
    const extra = consent ? consent.consentParts(config, p.lang) : {};
    const file = fileFor(p.path);
    await mkdir(dirname(join(outDir, file)), { recursive: true });
    await writeFile(join(outDir, file), layout({ ...p, config, ...extra }));
    written.push(file);
  }
  const seo = await optional('src/seo.mjs');
  if (seo) {
    await writeFile(join(outDir, 'sitemap.xml'), seo.sitemapXml(pages, config.domain));
    await writeFile(join(outDir, 'robots.txt'), seo.robotsTxt(config.domain));
  }
  const ads = await optional('src/adsense.mjs');
  if (ads) await writeFile(join(outDir, 'ads.txt'), ads.adsTxt(config));
  return written;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const config = JSON.parse(await readFile(join(here, 'site.config.json'), 'utf8'));
  const files = await build(config, join(here, 'dist'));
  console.log(`Generadas ${files.length} páginas en dist/`);
}
