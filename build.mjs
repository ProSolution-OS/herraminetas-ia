import { rm, mkdir, writeFile, readFile, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { layout } from './src/templates/layout.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const optional = async (rel) => (existsSync(join(here, rel)) ? import(pathToFileURL(join(here, rel)).href) : null);

/** Page = {key, lang, path, title, description, body, jsonld?, noindex?} */
export async function collectPages(config) {
  const pages = [];
  for (const rel of ['src/home.mjs', 'src/tools/index.mjs', 'src/legal.mjs']) {
    const mod = await optional(rel);
    if (mod) pages.push(...mod.pages(config));
  }
  return pages;
}

/** Colores propios del sitio (acento claro/oscuro) como variables CSS. */
export function themeStyle(theme) {
  if (!theme) return '';
  const hex = /^#[0-9a-fA-F]{6}$/;
  const { accent, accentDark } = theme;
  if (!hex.test(accent) || !hex.test(accentDark)) throw new Error('theme.accent y theme.accentDark deben ser #RRGGBB');
  return `<style>:root{--accent:${accent}}@media (prefers-color-scheme:dark){:root{--accent:${accentDark}}}</style>`;
}

const fileFor = (path) => (path.endsWith('/') ? path + 'index.html' : path);

export async function build(config, outDir) {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(join(outDir, 'assets'), { recursive: true });
  await cp(join(here, 'src/styles.css'), join(outDir, 'assets/styles.css'));
  await cp(join(here, 'src/fonts'), join(outDir, 'assets/fonts'), { recursive: true });
  if (existsSync(join(here, 'src/lib'))) await cp(join(here, 'src/lib'), join(outDir, 'assets/lib'), { recursive: true });

  const pages = await collectPages(config);
  const byKey = {};
  for (const p of pages) (byKey[p.key] ??= {})[p.lang] = p.path;
  const consent = await optional('src/consent.mjs');
  const written = [];
  for (const p of pages) {
    p.alternates = byKey[p.key];
    const extra = consent ? consent.consentParts(config, p.lang) : {};
    extra.extraHead = themeStyle(config.theme) + (extra.extraHead ?? '');
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
  // Sitio a construir: SITE=<id> o primer argumento (por defecto "ia"). Config en sites/<id>.json.
  // En Vercel (VERCEL=1) se escribe en dist/; en local, en dist/<id>/. "--all" construye todos.
  const { readdir } = await import('node:fs/promises');
  const available = (await readdir(join(here, 'sites'))).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5));
  // Si el repo contiene un único sitio (export con scripts/export-site.mjs), se usa ese sin necesidad de SITE.
  const ids = process.argv[2] === '--all'
    ? available
    : [process.argv[2] ?? process.env.SITE ?? (available.length === 1 ? available[0] : 'ia')];
  for (const id of ids) {
    const config = JSON.parse(await readFile(join(here, 'sites', `${id}.json`), 'utf8'));
    const out = process.env.VERCEL ? join(here, 'dist') : join(here, 'dist', id);
    const files = await build(config, out);
    console.log(`[${id}] ${files.length} páginas en ${out}`);
  }
}
