import { registry } from './registry.mjs';
import { articleHtml, faqJsonLd } from './article.mjs';
import { LANGS, copyOf, toolsPath, toolPath } from '../i18n.mjs';
import { rateCard } from '../templates/ratecard.mjs';

const DEFAULT_TOOLS = ['llm-cost', 'token-counter', 'prompt-generator'];

/** Herramientas del sitio, en el orden de config.tools. */
export function toolsFor(config) {
  return (config.tools ?? DEFAULT_TOOLS).map((id) => {
    if (!registry[id]) throw new Error(`Herramienta desconocida: ${id}`);
    return registry[id];
  });
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function pages(config) {
  const tools = toolsFor(config);
  const out = [];
  for (const lang of LANGS) {
    out.push({
      key: 'tools', lang, path: toolsPath(lang), title: copyOf(config, lang, 'toolsTitle'), description: copyOf(config, lang, 'toolsDesc'),
      body: `<h1>${copyOf(config, lang, 'toolsTitle')}</h1>${rateCard(lang, tools)}`,
    });
    for (const tool of tools) {
      const c = tool.content[lang];
      out.push({
        key: 'tool-' + tool.id, lang, path: toolPath(lang, tool.slug[lang]), title: tool.title[lang], description: tool.description[lang],
        body: `<h1>${esc(c.h1)}</h1>\n<section class="instrument">${tool.form(lang)}</section>\n<div class="ad-slot" aria-hidden="true"></div>\n${articleHtml(lang, c)}`,
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
