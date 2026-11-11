const form = (lang) => {
  const L = lang === 'es'
    ? { t: 'Pega tu texto', b: 'Contar', w: 'Palabras', c: 'Caracteres', k: 'Tokens estimados' }
    : { t: 'Paste your text', b: 'Count', w: 'Words', c: 'Characters', k: 'Estimated tokens' };
  return `<label for="t">${L.t}</label><textarea id="t" rows="8"></textarea>
<div class="result" id="r" aria-live="polite">${L.w}: 0 · ${L.c}: 0 · ${L.k}: 0</div>
<script type="module">
import { countText } from '/assets/lib/text-count.mjs';
const $ = (id) => document.getElementById(id);
const update = () => {
  const { words, chars, estTokens } = countText($('t').value);
  $('r').textContent = '${L.w}: ' + words + ' · ${L.c}: ' + chars + ' · ${L.k}: ' + estTokens;
};
$('t').addEventListener('input', update);
</script>`;
};

export default {
  id: 'token-counter',
  slug: { es: 'contador-tokens', en: 'token-counter' },
  title: { es: 'Contador de tokens, palabras y caracteres para IA', en: 'Token, Word and Character Counter for AI' },
  description: {
    es: 'Pega un texto y obtén al instante palabras, caracteres y una estimación de tokens para modelos de lenguaje. Gratis y sin registro.',
    en: 'Paste text and instantly get words, characters and an estimate of tokens for language models. Free, no sign-up.',
  },
  form,
  content: {
    es: {
      h1: 'Contador de tokens, palabras y caracteres',
      intro: [
        'Los modelos de lenguaje no leen palabras sino tokens, y cada modelo tiene un límite de tokens por conversación además de un precio por token. Esta herramienta te da en tiempo real el número de palabras, el de caracteres y una estimación de tokens mientras escribes o pegas un texto, sin enviar nada a ningún servidor: el cálculo ocurre en tu navegador.',
        'Es útil para comprobar si un documento cabe en la ventana de contexto de un modelo, para recortar un prompt demasiado largo y para anticipar el gasto antes de lanzar una petición grande a una API.',
      ],
      steps: [
        'Pega o escribe el texto en el cuadro. El recuento se actualiza con cada pulsación de tecla.',
        'Mira el número de palabras para tener una referencia humana de la longitud.',
        'Consulta los caracteres: se cuentan como caracteres reales, de modo que un emoji cuenta como uno solo.',
        'Usa la estimación de tokens como referencia aproximada, calculada a razón de un token por cada cuatro caracteres.',
        'Compara el resultado con el límite de tu modelo y recorta o divide el texto si te pasas.',
      ],
      example: 'Si pegas la frase «hola 😀 mundo», la herramienta muestra 3 palabras, 12 caracteres y 3 tokens estimados. Un artículo de 1.200 palabras en español ronda los 7.000 caracteres, que equivalen a unos 1.750 tokens según esta regla, un tamaño cómodo para casi cualquier modelo actual.',
      faq: [
        ['¿La estimación de tokens es exacta?', 'No. Cada modelo usa su propio tokenizador, por lo que el número real puede diferir. La regla de un token por cuatro caracteres es una aproximación útil para presupuestar.'],
        ['¿Se guarda o se envía mi texto?', 'No. Todo el cálculo se hace en tu navegador y el texto nunca sale de tu dispositivo.'],
        ['¿Por qué el español gasta más tokens que el inglés?', 'Los tokenizadores se entrenan sobre todo con inglés, así que las palabras largas y los acentos del español se dividen en más fragmentos.'],
        ['¿Cuenta bien los emojis y los saltos de línea?', 'Sí. Los caracteres se cuentan por puntos de código Unicode y los saltos de línea múltiples cuentan como un solo separador de palabras.'],
      ],
    },
    en: {
      h1: 'Token, word and character counter',
      intro: [
        'Language models do not read words, they read tokens, and every model has a token limit per conversation as well as a price per token. This tool shows the number of words, the number of characters and an estimate of tokens in real time as you type or paste text, without sending anything to a server: the calculation runs in your browser.',
        'It helps you check whether a document fits in a model\'s context window, trim a prompt that has grown too long, and anticipate the cost before launching a large request to an API.',
      ],
      steps: [
        'Paste or type your text in the box. The count updates on every keystroke.',
        'Look at the word count for a human reference of the length.',
        'Check the characters: they are counted as real characters, so an emoji counts as one.',
        'Use the token estimate as a rough guide, calculated at one token for every four characters.',
        'Compare the result with your model\'s limit and trim or split the text if you go over.',
      ],
      example: 'If you paste the phrase "hello 😀 world", the tool shows 3 words, 13 characters and 4 estimated tokens. A 1,200-word English article is around 7,000 characters, which equals roughly 1,750 tokens by this rule, a comfortable size for almost any current model.',
      faq: [
        ['Is the token estimate exact?', 'No. Each model uses its own tokenizer, so the real number may differ. The rule of one token per four characters is a handy approximation for budgeting.'],
        ['Is my text saved or sent anywhere?', 'No. All the calculation happens in your browser and the text never leaves your device.'],
        ['Why does non-English text use more tokens?', 'Tokenizers are trained mostly on English, so long words and accented characters in other languages are split into more pieces.'],
        ['Does it handle emojis and line breaks correctly?', 'Yes. Characters are counted by Unicode code point and several consecutive line breaks count as a single word separator.'],
      ],
    },
  },
};
