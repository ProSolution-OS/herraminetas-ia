import { LANGS, t, homePath, toolsPath, toolPath } from './i18n.mjs';
import { tokenSpans } from './templates/tokens.mjs';
import { rateCard } from './templates/ratecard.mjs';
import { tools } from './tools/index.mjs';

export function pages() {
  return LANGS.map((lang) => ({
    key: 'home', lang, path: homePath(lang), title: t(lang, 'homeTitle'), description: t(lang, 'homeDesc'),
    body: `<section class="hero">
<h1>${tokenSpans(t(lang, 'homeH1'))}</h1>
<p class="hero-sub">${t(lang, 'homeIntro')}</p>
<div class="hero-actions">
<a class="btn" href="${toolPath(lang, tools[0].slug[lang])}">${t(lang, 'ctaPrimary')}</a>
<a class="btn ghost" href="${toolPath(lang, tools[1].slug[lang])}">${t(lang, 'ctaSecondary')}</a>
</div></section>
<h2 class="section-title">${t(lang, 'toolsTitle')}</h2>
${rateCard(lang, tools)}`,
  }));
}
