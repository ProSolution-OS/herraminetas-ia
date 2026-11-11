import { LANGS, copyOf, homePath, toolPath } from './i18n.mjs';
import { tokenSpans } from './templates/tokens.mjs';
import { rateCard } from './templates/ratecard.mjs';
import { toolsFor } from './tools/index.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function pages(config) {
  const tools = toolsFor(config);
  const c = (lang, key) => copyOf(config, lang, key);
  return LANGS.map((lang) => ({
    key: 'home', lang, path: homePath(lang), title: c(lang, 'homeTitle'), description: c(lang, 'homeDesc'),
    body: `<section class="hero">
<h1${config.heroTokens === false ? ' class=\"plain\"' : ''}>${config.heroTokens === false ? esc(c(lang, 'homeH1')) : tokenSpans(c(lang, 'homeH1'))}</h1>
<p class="hero-sub">${esc(c(lang, 'homeIntro'))}</p>
<div class="hero-actions">
<a class="btn" href="${toolPath(lang, tools[0].slug[lang])}">${esc(c(lang, 'ctaPrimary'))}</a>
<a class="btn ghost" href="${toolPath(lang, tools[1].slug[lang])}">${esc(c(lang, 'ctaSecondary'))}</a>
</div></section>
<h2 class="section-title">${esc(c(lang, 'toolsTitle'))}</h2>
${rateCard(lang, tools)}`,
  }));
}
