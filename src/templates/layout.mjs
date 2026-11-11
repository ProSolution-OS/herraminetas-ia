import { t, LANGS, homePath, toolsPath, legalPath, LEGAL_IDS } from '../i18n.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** alternates: {es?: path, en?: path} */
export function layout({ lang, title, description, path, body, config, alternates = {}, noindex = false, jsonld = [], extraHead = '', extraFoot = '' }) {
  const abs = (p) => config.domain + p;
  const hreflangs = LANGS.filter((l) => alternates[l])
    .map((l) => `<link rel="alternate" hreflang="${l}" href="${abs(alternates[l])}">`)
    .concat(alternates.es ? [`<link rel="alternate" hreflang="x-default" href="${abs(alternates.es)}">`] : [])
    .join('\n');
  const other = LANGS.find((l) => l !== lang);
  const switcher = alternates[other] ? `<a href="${alternates[other]}" hreflang="${other}" lang="${other}">${t(lang, 'language')}</a>` : '';
  const ld = jsonld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n');
  const legal = LEGAL_IDS.map((id) => `<a href="${legalPath(lang, id)}">${t(lang, id)}</a>`).join(' · ');
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${abs(path)}">
${hreflangs}
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${abs(path)}">
<link rel="stylesheet" href="/assets/styles.css">
${ld}
${extraHead}
</head>
<body>
<header class="site-header"><a class="brand" href="${homePath(lang)}">${esc(config.siteName)}</a>
<nav><a href="${homePath(lang)}">${t(lang, 'home')}</a> <a href="${toolsPath(lang)}">${t(lang, 'tools')}</a> ${switcher}</nav></header>
<main>
${body}
</main>
<footer class="site-footer"><p>${legal}</p><p>© ${new Date().getFullYear()} ${esc(config.siteName)}. ${t(lang, 'rights')}</p></footer>
${extraFoot}
</body>
</html>
`;
}
