const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const UI = {
  es: { bad: 'Revisa los datos: usa números válidos y mayores que cero donde corresponda.' },
  en: { bad: 'Check the values: use valid numbers, greater than zero where needed.' },
};

/**
 * Formulario de calculadora. `lib` es el módulo en src/lib (sin extensión), `fn` la función de cálculo
 * y `button` el texto del botón. fields: {id, label:{es,en}, value, options?: [[valor, {es,en}], ...]}.
 * La librería debe exportar `fn` (devuelve null si hay datos inválidos) y `describe[fn]`.
 */
export function calcForm(lang, { lib, fn, button, fields }) {
  const inputs = fields.map((f) => {
    const id = 'f-' + f.id;
    const control = f.options
      ? `<select id="${id}">${f.options.map(([v, l]) => `<option value="${esc(v)}"${v === f.value ? ' selected' : ''}>${esc(l[lang])}</option>`).join('')}</select>`
      : `<input id="${id}" inputmode="decimal" value="${esc(f.value)}">`;
    return `<label for="${id}">${esc(f.label[lang])}</label>${control}`;
  }).join('\n');
  const spec = JSON.stringify(fields.map((f) => [f.id, f.options ? 's' : 'n']));
  return `<form id="f" novalidate>
${inputs}
<button type="submit">${esc(button[lang])}</button></form>
<div class="result" id="r" aria-live="polite"></div>
<script type="module">
import { ${fn}, describe } from '/assets/lib/${lib}.mjs';
import { parseNumber } from '/assets/lib/parse-number.mjs';
const lang = '${lang}', $ = (id) => document.getElementById(id), spec = ${spec};
$('f').addEventListener('submit', (e) => {
  e.preventDefault();
  const values = {};
  for (const [id, kind] of spec) values[id] = kind === 's' ? $('f-' + id).value : parseNumber($('f-' + id).value, lang);
  const r = Object.values(values).includes(null) ? null : ${fn}(values);
  $('r').textContent = r ? describe.${fn}(r, lang) : ({ es: ${JSON.stringify(UI.es.bad)}, en: ${JSON.stringify(UI.en.bad)} })[lang];
});
</script>`;
}
