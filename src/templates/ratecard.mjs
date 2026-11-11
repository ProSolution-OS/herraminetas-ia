import { toolPath } from '../i18n.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const HINTS = {
  'llm-cost': { es: 'USD por millón de tokens', en: 'USD per million tokens' },
  'token-counter': { es: 'unos 4 caracteres por token', en: 'about 4 characters per token' },
  'prompt-generator': { es: 'rol + tarea + formato', en: 'role + task + format' },
};

/** Lista de herramientas como tarifa: nombre, descripción y una cifra de referencia a la derecha. */
export function rateCard(lang, tools) {
  const rows = tools.map((x) => `<li><a class="rate" href="${toolPath(lang, x.slug[lang])}">
<span class="rate-name">${esc(x.title[lang])}</span>
<p class="rate-desc">${esc(x.description[lang])}</p>
<span class="rate-hint">${esc(x.hint?.[lang] ?? HINTS[x.id]?.[lang] ?? '')}</span></a></li>`);
  return `<ul class="rates">${rows.join('\n')}</ul>`;
}
