const T = {
  es: ['Actúa como ', 'Tu tarea: ', 'Formato de la respuesta: ', 'Tono: ', 'Si falta información, pregúntame antes de responder.'],
  en: ['Act as ', 'Your task: ', 'Response format: ', 'Tone: ', 'If any information is missing, ask me before answering.'],
};

/** Construye un prompt estructurado; omite los campos vacíos. `lang` es opcional (por defecto 'es'). */
export function buildPrompt({ role = '', task = '', format = '', tone = '', lang = 'es' }) {
  const [r, k, f, o] = [role, task, format, tone].map((s) => String(s ?? '').trim());
  const [pr, pk, pf, po, tail] = T[lang] ?? T.es;
  const lines = [];
  if (r) lines.push(`${pr}${r}.`);
  if (k) lines.push(`${pk}${k}.`);
  if (f) lines.push(`${pf}${f}.`);
  if (o) lines.push(`${po}${o}.`);
  lines.push(tail);
  return lines.join('\n');
}
