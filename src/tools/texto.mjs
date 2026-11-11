const L = (es, en) => ({ es, en });

const counterForm = (lang) => {
  const T = lang === 'es'
    ? { t: 'Pega o escribe tu texto', w: 'Palabras', c: 'Caracteres', n: 'Caracteres sin espacios', s: 'Frases', p: 'Párrafos', m: 'Lectura (min)' }
    : { t: 'Paste or type your text', w: 'Words', c: 'Characters', n: 'Characters without spaces', s: 'Sentences', p: 'Paragraphs', m: 'Reading time (min)' };
  return `<label for="t">${T.t}</label><textarea id="t" rows="9"></textarea>
<div class="result" id="r" aria-live="polite"></div>
<script type="module">
import { analyzeText } from '/assets/lib/text-tools.mjs';
const $ = (id) => document.getElementById(id);
const labels = ${JSON.stringify([['words', T.w], ['chars', T.c], ['charsNoSpaces', T.n], ['sentences', T.s], ['paragraphs', T.p], ['minutes', T.m]])};
const update = () => { const r = analyzeText($('t').value); $('r').textContent = labels.map(([k, l]) => l + ': ' + r[k]).join('\\n'); };
$('t').addEventListener('input', update); update();
</script>`;
};

const caseForm = (lang) => {
  const T = lang === 'es'
    ? { t: 'Texto', u: 'MAYÚSCULAS', l: 'minúsculas', ti: 'Título', se: 'Frase', o: 'Resultado', cp: 'Copiar' }
    : { t: 'Text', u: 'UPPERCASE', l: 'lowercase', ti: 'Title Case', se: 'Sentence case', o: 'Result', cp: 'Copy' };
  return `<label for="t">${T.t}</label><textarea id="t" rows="5"></textarea>
<p><button type="button" data-m="upper">${T.u}</button> <button type="button" data-m="lower">${T.l}</button> <button type="button" data-m="title">${T.ti}</button> <button type="button" data-m="sentence">${T.se}</button></p>
<label for="o">${T.o}</label><textarea id="o" rows="5" readonly></textarea>
<button type="button" id="cp" class="ghost">${T.cp}</button>
<script type="module">
import { convertCase } from '/assets/lib/text-tools.mjs';
const $ = (id) => document.getElementById(id);
document.querySelectorAll('button[data-m]').forEach((b) => b.addEventListener('click', () => { $('o').value = convertCase($('t').value, b.dataset.m); }));
$('cp').addEventListener('click', () => navigator.clipboard?.writeText($('o').value));
</script>`;
};

const slugForm = (lang) => {
  const T = lang === 'es' ? { t: 'Título o frase', o: 'Slug para la URL', cp: 'Copiar' } : { t: 'Title or phrase', o: 'URL slug', cp: 'Copy' };
  return `<label for="t">${T.t}</label><input id="t" autocomplete="off">
<label for="o">${T.o}</label><input id="o" readonly>
<button type="button" id="cp">${T.cp}</button>
<script type="module">
import { slugify } from '/assets/lib/text-tools.mjs';
const $ = (id) => document.getElementById(id);
$('t').addEventListener('input', () => { $('o').value = slugify($('t').value); });
$('cp').addEventListener('click', () => navigator.clipboard?.writeText($('o').value));
</script>`;
};

export const contadorPalabras = {
  id: 'word-counter',
  slug: { es: 'contador-de-palabras', en: 'word-counter' },
  title: { es: 'Contador de palabras, caracteres y tiempo de lectura', en: 'Word, Character and Reading Time Counter' },
  description: {
    es: 'Cuenta palabras, caracteres, frases y párrafos de cualquier texto y calcula su tiempo de lectura al instante. Gratis.',
    en: 'Count the words, characters, sentences and paragraphs of any text and get its reading time instantly. Free.',
  },
  hint: L('palabras y tiempo de lectura', 'words and reading time'),
  form: counterForm,
  content: {
    es: {
      h1: 'Contador de palabras',
      intro: [
        'Un ensayo de 1.500 palabras, un tuit de 280 caracteres, una descripción de producto de 160: casi cualquier texto que escribes tiene un límite. Este contador te da en tiempo real palabras, caracteres con y sin espacios, frases, párrafos y el tiempo que tarda en leerse mientras escribes o pegas.',
        'El cálculo se hace en tu navegador. El texto no se envía a ningún servidor ni se guarda, así que puedes pegar borradores privados sin preocuparte. El tiempo de lectura se estima a 200 palabras por minuto, una velocidad media para texto en español.',
      ],
      steps: [
        'Pega tu texto o empieza a escribir en el cuadro.',
        'Mira cómo se actualizan las cifras con cada pulsación de tecla.',
        'Compara las palabras con el mínimo o máximo que te pidan.',
        'Comprueba los caracteres si publicas en una red social o en un campo con límite.',
        'Usa el tiempo de lectura para decidir si conviene recortar o dividir el texto.',
      ],
      example: 'Un artículo de 1.000 palabras tarda unos 5 minutos en leerse. Un texto de 45 palabras con tres frases cortas ocupa un solo párrafo y se lee en menos de un minuto, que se redondea a 1. Dos saltos de línea seguidos separan un párrafo del siguiente.',
      faq: [
        ['¿Cómo cuenta las palabras?', 'Separa el texto por espacios y saltos de línea. Un guion o una barra unen dos partes en una sola palabra si no hay espacio entre ellas.'],
        ['¿Cuenta bien los emojis y las tildes?', 'Sí. Los caracteres se cuentan por símbolo real, así que un emoji cuenta como uno.'],
        ['¿Cómo se cuentan las frases?', 'Por los puntos, signos de cierre de interrogación y de exclamación. Un texto sin puntuación se considera una frase.'],
        ['¿Se guarda lo que pego?', 'No. Todo ocurre en tu navegador y el texto nunca sale de tu dispositivo.'],
        ['¿Cuántas palabras debería tener mi texto?', 'Depende del formato. Una entrada de blog bien posicionada suele tener entre 800 y 1.500 palabras, una descripción de producto entre 50 y 150 y un correo menos de 200.'],
      ],
    },
    en: {
      h1: 'Word counter',
      intro: [
        'A 1,500-word essay, a 280-character post, a 160-character product description: almost everything you write has a limit. This counter gives you words, characters with and without spaces, sentences, paragraphs and reading time in real time as you type or paste.',
        'The count runs in your browser. The text is not sent to any server or saved, so you can paste private drafts without worry. Reading time is estimated at 200 words per minute, an average speed for English text.',
      ],
      steps: [
        'Paste your text or start typing in the box.',
        'Watch the figures update with every keystroke.',
        'Compare the words with the minimum or maximum you were given.',
        'Check the characters if you publish on social media or in a field with a limit.',
        'Use the reading time to decide whether to cut or split the text.',
      ],
      example: 'A 1,000-word article takes about 5 minutes to read. A 45-word text with three short sentences is a single paragraph and reads in under a minute, rounded up to 1. Two line breaks in a row separate one paragraph from the next.',
      faq: [
        ['How are words counted?', 'The text is split on spaces and line breaks. A hyphen or slash joins two parts into one word when there is no space between them.'],
        ['Does it handle emojis and accents correctly?', 'Yes. Characters are counted by real symbol, so an emoji counts as one.'],
        ['How are sentences counted?', 'By full stops, question marks and exclamation marks. A text with no punctuation counts as one sentence.'],
        ['Is what I paste saved?', 'No. Everything happens in your browser and the text never leaves your device.'],
        ['What word count should I aim for?', 'It depends on the format. A blog post that ranks well is often between 800 and 1,500 words, a product description 50 to 150, and an email under 200.'],
      ],
    },
  },
};

export const conversorMayusculas = {
  id: 'case-converter',
  slug: { es: 'cambiar-mayusculas-minusculas', en: 'case-converter' },
  title: { es: 'Convertir a mayúsculas, minúsculas, título y frase', en: 'Case Converter: Upper, Lower, Title and Sentence Case' },
  description: {
    es: 'Pasa cualquier texto a MAYÚSCULAS, minúsculas, Tipo Título o formato de frase con un clic, respetando tildes y la ñ. Gratis.',
    en: 'Turn any text into UPPERCASE, lowercase, Title Case or Sentence case in one click, respecting accents. Free.',
  },
  hint: L('cuatro formatos con un clic', 'four formats in one click'),
  form: caseForm,
  content: {
    es: {
      h1: 'Cambiar mayúsculas y minúsculas',
      intro: [
        'A veces escribes un párrafo entero con el bloqueo de mayúsculas puesto, o copias un titular que viene todo en minúsculas. Volver a escribirlo a mano es una pérdida de tiempo. Esta herramienta convierte el texto a cuatro formatos con un solo clic: todo en mayúsculas, todo en minúsculas, tipo título y formato de frase.',
        'Funciona bien con el español: respeta las tildes, la diéresis y la ñ, de modo que «ÁRBOL» pasa a «árbol» sin perder ningún acento. El texto se procesa en tu navegador y no se guarda en ningún sitio.',
      ],
      steps: [
        'Pega o escribe el texto en el primer cuadro.',
        'Pulsa el formato que quieras: MAYÚSCULAS, minúsculas, Título o Frase.',
        'Revisa el resultado en el segundo cuadro.',
        'Pulsa Copiar y pégalo donde lo necesites.',
        'Si no te convence, prueba otro formato sobre el mismo texto original.',
      ],
      example: 'Con el texto «hola mundo. otra frase», el formato de mayúsculas da «HOLA MUNDO. OTRA FRASE», el de título da «Hola Mundo. Otra Frase» y el de frase da «Hola mundo. Otra frase». Los nombres propios habrá que revisarlos a mano, porque la herramienta no los reconoce.',
      faq: [
        ['¿Qué diferencia hay entre Título y Frase?', 'En Título cada palabra empieza en mayúscula. En Frase solo la primera palabra de cada oración.'],
        ['¿Respeta las tildes y la ñ?', 'Sí. Las letras con acento y la ñ se convierten correctamente en ambos sentidos.'],
        ['¿Reconoce nombres propios o siglas?', 'No. Al pasar a minúsculas o a frase, tendrás que volver a poner a mano las mayúsculas de nombres y siglas.'],
        ['¿Hay límite de longitud?', 'No hay un límite fijo. Depende de la memoria de tu navegador, y un texto de varias páginas se convierte sin problema.'],
      ],
    },
    en: {
      h1: 'Change uppercase and lowercase',
      intro: [
        'Sometimes you type a whole paragraph with caps lock on, or copy a headline that arrives entirely in lowercase. Retyping it by hand is a waste of time. This tool converts text into four formats with a single click: all uppercase, all lowercase, title case and sentence case.',
        'It also works well with accented letters, so a word like "ÁRBOL" becomes "árbol" without losing any accent. The text is processed in your browser and is not stored anywhere.',
      ],
      steps: [
        'Paste or type the text into the first box.',
        'Press the format you want: UPPERCASE, lowercase, Title Case or Sentence case.',
        'Check the result in the second box.',
        'Press Copy and paste it wherever you need it.',
        'If it is not what you wanted, try another format on the same original text.',
      ],
      example: 'With the text "hello world. another sentence", the uppercase format gives "HELLO WORLD. ANOTHER SENTENCE", title case gives "Hello World. Another Sentence" and sentence case gives "Hello world. Another sentence". Proper names will need a manual check, because the tool does not recognise them.',
      faq: [
        ['What is the difference between Title and Sentence case?', 'In title case every word starts with a capital. In sentence case only the first word of each sentence does.'],
        ['Does it respect accents?', 'Yes. Accented letters convert correctly in both directions.'],
        ['Does it recognise proper names or acronyms?', 'No. When you switch to lowercase or sentence case you will need to restore capitals on names and acronyms by hand.'],
        ['Is there a length limit?', 'There is no fixed limit. It depends on your browser memory, and a text several pages long converts without trouble.'],
      ],
    },
  },
};

export const generadorSlug = {
  id: 'slug-generator',
  slug: { es: 'generador-de-slug', en: 'slug-generator' },
  title: { es: 'Generador de slug para URLs amigables (SEO)', en: 'URL Slug Generator for SEO-Friendly Links' },
  description: {
    es: 'Convierte un título en un slug limpio para tu URL: sin tildes, sin símbolos y con guiones. Ideal para SEO. Gratis.',
    en: 'Turn a title into a clean URL slug: no accents, no symbols and with hyphens. Ideal for SEO. Free.',
  },
  hint: L('título a URL limpia', 'title to clean URL'),
  form: slugForm,
  content: {
    es: {
      h1: 'Generador de slug para URLs',
      intro: [
        'El slug es la parte final de una dirección web que identifica una página, por ejemplo la de «mi-primera-receta» en un blog. Un buen slug es corto, legible y está formado solo por letras minúsculas, números y guiones. Los buscadores lo leen como una pista del contenido, y las personas lo entienden de un vistazo cuando comparten el enlace.',
        'Esta herramienta convierte cualquier título en un slug listo para usar: quita las tildes y la ñ, elimina signos y símbolos, pasa todo a minúsculas y une las palabras con guiones. Funciona en tu navegador y no guarda nada.',
      ],
      steps: [
        'Escribe o pega el título de tu página en el primer campo.',
        'Mira cómo aparece el slug en el segundo campo mientras escribes.',
        'Pulsa Copiar para llevarte el slug.',
        'Pégalo en el campo de dirección o enlace permanente de tu gestor de contenidos.',
        'Si el slug es muy largo, quita palabras de relleno como artículos y preposiciones.',
      ],
      example: 'El título «Ñandú rápido: ¡Hola Mundo!» se convierte en «nandu-rapido-hola-mundo». Los dos puntos, los signos de exclamación y las tildes desaparecen, y los espacios pasan a ser guiones. Un slug de entre tres y cinco palabras suele ser un buen punto de equilibrio.',
      faq: [
        ['¿Por qué usar guiones y no guiones bajos?', 'Google trata el guion como separador de palabras. El guion bajo puede unir las palabras en una sola.'],
        ['¿Por qué quitar las tildes?', 'Los caracteres acentuados se codifican de forma poco legible en una URL y pueden dar problemas en algunos sistemas.'],
        ['¿Debo cambiar un slug que ya está publicado?', 'Mejor no. Si lo haces, crea una redirección desde la dirección antigua para no perder visitas ni posicionamiento.'],
        ['¿Importa la longitud?', 'Conviene que sea corto y descriptivo. Evita repetir en el slug palabras que ya están en la ruta de la web.'],
      ],
    },
    en: {
      h1: 'URL slug generator',
      intro: [
        'The slug is the final part of a web address that identifies a page, such as "my-first-recipe" on a blog. A good slug is short, readable and made only of lowercase letters, numbers and hyphens. Search engines read it as a hint about the content, and people understand it at a glance when they share the link.',
        'This tool turns any title into a ready-to-use slug: it strips accents, removes punctuation and symbols, lowercases everything and joins the words with hyphens. It works in your browser and saves nothing.',
      ],
      steps: [
        'Type or paste your page title into the first field.',
        'Watch the slug appear in the second field as you type.',
        'Press Copy to take the slug with you.',
        'Paste it into the address or permalink field of your content system.',
        'If the slug is too long, drop filler words such as articles and prepositions.',
      ],
      example: 'The title "Ñandú rápido: ¡Hello World!" becomes "nandu-rapido-hello-world". The colon, the exclamation marks and the accents disappear, and spaces turn into hyphens. A slug of three to five words is usually a good balance.',
      faq: [
        ['Why hyphens and not underscores?', 'Google treats a hyphen as a word separator. An underscore can join the words into one.'],
        ['Why strip accents?', 'Accented characters are encoded in an unreadable way inside a URL and can cause trouble in some systems.'],
        ['Should I change a slug that is already published?', 'Better not to. If you do, set up a redirect from the old address so you do not lose visits or ranking.'],
        ['Does length matter?', 'It is best to keep it short and descriptive. Avoid repeating in the slug words that are already in the site path.'],
      ],
    },
  },
};

export const textoTools = [contadorPalabras, conversorMayusculas, generadorSlug];
