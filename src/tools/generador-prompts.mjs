const form = (lang) => {
  const L = lang === 'es'
    ? { r: 'Rol (por ejemplo, editor de textos)', k: 'Tarea', f: 'Formato de salida', o: 'Tono', b: 'Generar prompt', cp: 'Copiar' }
    : { r: 'Role (for example, copy editor)', k: 'Task', f: 'Output format', o: 'Tone', b: 'Generate prompt', cp: 'Copy' };
  return `<form id="f"><label for="r1">${L.r}</label><input id="r1">
<label for="k">${L.k}</label><textarea id="k" rows="3"></textarea>
<label for="fm">${L.f}</label><input id="fm">
<label for="o">${L.o}</label><input id="o">
<button type="submit">${L.b}</button> <button type="button" id="cp">${L.cp}</button></form>
<pre class="result" id="out" aria-live="polite" style="white-space:pre-wrap"></pre>
<script type="module">
import { buildPrompt } from '/assets/lib/prompt-template.mjs';
const $ = (id) => document.getElementById(id);
$('f').addEventListener('submit', (e) => {
  e.preventDefault();
  $('out').textContent = buildPrompt({ role: $('r1').value, task: $('k').value, format: $('fm').value, tone: $('o').value, lang: '${lang}' });
});
$('cp').addEventListener('click', () => navigator.clipboard?.writeText($('out').textContent));
</script>`;
};

export default {
  id: 'prompt-generator',
  slug: { es: 'generador-prompts', en: 'prompt-generator' },
  title: { es: 'Generador de prompts para IA con rol, tarea y formato', en: 'AI Prompt Generator with Role, Task and Format' },
  description: {
    es: 'Crea prompts claros y estructurados para ChatGPT, Claude u otros modelos indicando rol, tarea, formato y tono. Gratis.',
    en: 'Build clear, structured prompts for ChatGPT, Claude or other models by setting role, task, format and tone. Free.',
  },
  form,
  content: {
    es: {
      h1: 'Generador de prompts para IA',
      intro: [
        'Un buen prompt marca la diferencia entre una respuesta genérica y una que realmente te sirve. Esta herramienta te ayuda a estructurar tus instrucciones en cuatro piezas que casi siempre mejoran el resultado: el rol que debe adoptar el modelo, la tarea concreta, el formato de salida y el tono de la respuesta.',
        'No necesitas conocimientos técnicos. Rellenas los campos que te importan, dejas vacíos los demás y obtienes un texto listo para copiar y pegar en cualquier asistente de inteligencia artificial.',
      ],
      steps: [
        'Escribe el rol que quieres que adopte el modelo, como editor, analista financiero o profesor de matemáticas.',
        'Describe la tarea con un verbo claro: resumir, traducir, comparar, corregir o proponer ideas.',
        'Indica el formato de salida, por ejemplo lista con viñetas, tabla, correo corto o tres párrafos.',
        'Añade el tono si importa: formal, cercano, técnico o humorístico.',
        'Pulsa Generar prompt, copia el resultado y pégalo en tu asistente de IA favorito.',
      ],
      example: 'Con rol «editor», tarea «resumir el texto que te pase», formato «lista de cinco puntos» y tono «formal», se genera un prompt de cinco líneas que empieza con «Actúa como editor» y termina pidiendo que se aclare cualquier dato que falte antes de responder. Esa última línea reduce las respuestas inventadas.',
      faq: [
        ['¿Funciona con cualquier modelo de IA?', 'Sí. El resultado es texto plano, así que puedes usarlo con cualquier asistente de lenguaje que acepte instrucciones escritas.'],
        ['¿Tengo que rellenar los cuatro campos?', 'No. Los campos vacíos se omiten y el prompt se construye solo con lo que escribas.'],
        ['¿Por qué se añade una línea final pidiendo aclaraciones?', 'Porque invitar al modelo a preguntar cuando falta información reduce las suposiciones y las respuestas inventadas.'],
        ['¿Se guarda lo que escribo?', 'No. El prompt se genera en tu navegador y no se envía a ningún servidor.'],
      ],
    },
    en: {
      h1: 'AI prompt generator',
      intro: [
        'A good prompt is the difference between a generic answer and one that is actually useful. This tool helps you structure your instructions into four pieces that almost always improve the result: the role the model should adopt, the specific task, the output format and the tone of the answer.',
        'You do not need any technical background. Fill in the fields you care about, leave the rest empty and get text ready to copy and paste into any artificial intelligence assistant.',
      ],
      steps: [
        'Type the role you want the model to adopt, such as editor, financial analyst or maths teacher.',
        'Describe the task with a clear verb: summarise, translate, compare, proofread or suggest ideas.',
        'State the output format, for example bullet list, table, short email or three paragraphs.',
        'Add the tone if it matters: formal, friendly, technical or humorous.',
        'Press Generate prompt, copy the result and paste it into your favourite AI assistant.',
      ],
      example: 'With role "editor", task "summarise the text I give you", format "five-point list" and tone "formal", the tool produces a five-line prompt that starts with "Act as editor" and ends by asking the model to clarify any missing detail before answering. That last line cuts down on made-up answers.',
      faq: [
        ['Does it work with any AI model?', 'Yes. The output is plain text, so you can use it with any language assistant that accepts written instructions.'],
        ['Do I have to fill in all four fields?', 'No. Empty fields are skipped and the prompt is built only from what you write.'],
        ['Why is there a final line asking for clarification?', 'Because inviting the model to ask when information is missing reduces guesses and invented answers.'],
        ['Is what I type saved?', 'No. The prompt is generated in your browser and is not sent to any server.'],
      ],
    },
  },
};
