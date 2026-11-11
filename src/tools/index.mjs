import costo from './costo-llm.mjs';
import contador from './contador-tokens.mjs';
import generador from './generador-prompts.mjs';
import { articleHtml, faqJsonLd } from './article.mjs';
import { LANGS, t, toolsPath, toolPath } from '../i18n.mjs';

export const tools = [costo, contador, generador];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function pages(config) {
  const out = [];
  for (const lang of LANGS) {
    out.push({
      key: 'tools', lang, path: toolsPath(lang), title: t(lang, 'toolsTitle'), description: t(lang, 'toolsDesc'),
      body: `<h1>${t(lang, 'toolsTitle')}</h1><ul>${tools.map((x) => `<li><a href="${toolPath(lang, x.slug[lang])}">${esc(x.title[lang])}</a> — ${esc(x.description[lang])}</li>`).join('')}</ul>`,
    });
    for (const tool of tools) {
      const c = tool.content[lang];
      out.push({
        key: 'tool-' + tool.id, lang, path: toolPath(lang, tool.slug[lang]), title: tool.title[lang], description: tool.description[lang],
        body: `<h1>${esc(c.h1)}</h1>\n${tool.form(lang)}\n<div class="ad-slot" aria-hidden="true"></div>\n${articleHtml(lang, c)}`,
        jsonld: [
          { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: tool.title[lang], description: tool.description[lang],
            applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', inLanguage: lang,
            url: config.domain + toolPath(lang, tool.slug[lang]), offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
          faqJsonLd(c),
        ],
      });
    }
  }
  return out;
}
