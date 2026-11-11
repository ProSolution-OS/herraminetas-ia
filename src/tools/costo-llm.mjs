const form = (lang) => {
  const L = lang === 'es'
    ? { i: 'Tokens de entrada', o: 'Tokens de salida', ip: 'Precio de entrada (USD por millón de tokens)', op: 'Precio de salida (USD por millón de tokens)', b: 'Calcular', note: 'Verifica el precio oficial del proveedor antes de decidir.', bad: 'Introduce números válidos y no negativos.', res: 'Costo estimado' }
    : { i: 'Input tokens', o: 'Output tokens', ip: 'Input price (USD per million tokens)', op: 'Output price (USD per million tokens)', b: 'Calculate', note: 'Check the provider\'s official pricing before deciding.', bad: 'Enter valid, non-negative numbers.', res: 'Estimated cost' };
  return `<form id="f" novalidate>
<label for="i">${L.i}</label><input id="i" inputmode="decimal" value="1000000">
<label for="o">${L.o}</label><input id="o" inputmode="decimal" value="500000">
<label for="ip">${L.ip}</label><input id="ip" inputmode="decimal" value="3">
<label for="op">${L.op}</label><input id="op" inputmode="decimal" value="15">
<button type="submit">${L.b}</button></form>
<div class="result" id="r" aria-live="polite"></div>
<p><small>${L.note}</small></p>
<script type="module">
import { llmCost } from '/assets/lib/llm-cost.mjs';
import { parseNumber } from '/assets/lib/parse-number.mjs';
const lang = '${lang}', $ = (id) => document.getElementById(id);
$('f').addEventListener('submit', (e) => {
  e.preventDefault();
  const v = ['i', 'o', 'ip', 'op'].map((id) => parseNumber($(id).value, lang));
  if (v.includes(null)) { $('r').textContent = '${L.bad}'; return; }
  const [inputTokens, outputTokens, inputPricePerM, outputPricePerM] = v;
  const c = llmCost({ inputTokens, outputTokens, inputPricePerM, outputPricePerM });
  $('r').textContent = '${L.res}: ' + new Intl.NumberFormat(lang, { style: 'currency', currency: 'USD', maximumFractionDigits: 4 }).format(c);
});
</script>`;
};

export default {
  id: 'llm-cost',
  slug: { es: 'costo-llm', en: 'llm-cost' },
  title: { es: 'Calculadora de costo de API de IA (LLM) en USD', en: 'AI API (LLM) Cost Calculator in USD' },
  description: {
    es: 'Calcula cuánto cuesta usar un modelo de lenguaje por API según tokens de entrada, tokens de salida y precio por millón. Gratis.',
    en: 'Estimate what a language model API costs from input tokens, output tokens and price per million tokens. Free.',
  },
  form,
  content: {
    es: {
      h1: 'Calculadora de costo de API de IA',
      intro: [
        'Esta calculadora estima cuánto pagarás por usar un modelo de lenguaje a través de una API. Los proveedores cobran por tokens, que son fragmentos de texto de aproximadamente cuatro caracteres, y casi siempre distinguen entre los tokens que envías (entrada) y los que el modelo genera (salida). La salida suele costar varias veces más que la entrada, de modo que mirar solo un número da una idea equivocada del gasto real.',
        'Sirve para comparar proveedores, presupuestar un proyecto antes de escribir una línea de código o detectar qué parte de una aplicación consume más dinero. Los precios se introducen a mano porque cambian con frecuencia, y así la herramienta nunca queda desactualizada.',
      ],
      steps: [
        'Escribe cuántos tokens de entrada esperas enviar en total, sumando instrucciones, contexto y mensajes del usuario.',
        'Escribe cuántos tokens de salida esperas recibir. Si dudas, usa entre la mitad y el doble de la entrada según el tipo de tarea.',
        'Copia de la página de precios de tu proveedor el costo por millón de tokens de entrada y de salida.',
        'Pulsa Calcular. El resultado aparece en dólares estadounidenses con hasta cuatro decimales.',
        'Repite con otros precios para comparar modelos y quédate con el que mejor equilibre calidad y costo.',
      ],
      example: 'Imagina un asistente que procesa 1.000.000 de tokens de entrada y genera 500.000 de salida al mes. Con un modelo que cobra 3 dólares por millón de entrada y 15 por millón de salida, el costo es 3 más 7,5, es decir 10,5 dólares. Si cambias a un modelo más económico de 0,5 y 2 dólares, el mismo uso baja a 1,5 dólares. La diferencia parece pequeña en un mes, pero se multiplica con miles de usuarios.',
      faq: [
        ['¿Qué es un token?', 'Es la unidad mínima de texto que procesa un modelo. En español, una palabra suele equivaler a entre uno y tres tokens, y cien tokens son alrededor de setenta palabras.'],
        ['¿Por qué la salida cuesta más que la entrada?', 'Generar texto exige más cómputo que leerlo, porque el modelo produce cada token de forma secuencial. Por eso los proveedores fijan un precio mayor para la salida.'],
        ['¿El resultado incluye impuestos o descuentos?', 'No. Es una estimación del precio de lista. Los descuentos por volumen, el almacenamiento en caché de prompts y los impuestos locales pueden cambiar la factura final.'],
        ['¿Puedo usar comas o puntos decimales?', 'Sí. En la versión en español puedes escribir 1,5 o 1.500,25, y la herramienta interpreta el formato por ti.'],
      ],
    },
    en: {
      h1: 'AI API cost calculator',
      intro: [
        'This calculator estimates what you will pay to use a language model through an API. Providers charge per token, a chunk of text roughly four characters long, and nearly always separate the tokens you send (input) from the tokens the model writes (output). Output is usually several times more expensive than input, so looking at one number alone gives a misleading picture of the real bill.',
        'Use it to compare providers, to budget a project before writing any code, or to spot which part of an application burns the most money. Prices are typed in by hand because they change often, which means the tool never goes out of date.',
      ],
      steps: [
        'Type how many input tokens you expect to send in total, adding instructions, context and user messages.',
        'Type how many output tokens you expect back. When unsure, use between half and double the input depending on the task.',
        'Copy the price per million input tokens and per million output tokens from your provider\'s pricing page.',
        'Press Calculate. The result appears in US dollars with up to four decimals.',
        'Repeat with other prices to compare models and keep the one that balances quality and cost best.',
      ],
      example: 'Picture an assistant that handles 1,000,000 input tokens and generates 500,000 output tokens per month. With a model charging 3 dollars per million input and 15 per million output, the cost is 3 plus 7.50, which is 10.50 dollars. Switch to a cheaper model at 0.5 and 2 dollars and the same usage drops to 1.50 dollars. The gap looks small in one month but multiplies quickly with thousands of users.',
      faq: [
        ['What is a token?', 'It is the smallest unit of text a model processes. In English one word is usually between one and two tokens, and one hundred tokens are about seventy-five words.'],
        ['Why does output cost more than input?', 'Generating text takes more computation than reading it, because the model produces each token one after another. Providers therefore set a higher price for output.'],
        ['Does the result include taxes or discounts?', 'No. It is an estimate based on list prices. Volume discounts, prompt caching and local taxes can change the final invoice.'],
        ['Can I use commas or decimal points?', 'Yes. In the English version type 1.5 or 1,500.25 and the tool reads the format for you.'],
      ],
    },
  },
};
