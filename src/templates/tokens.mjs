const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Parte cada palabra en trozos de hasta 4 caracteres, sin dejar colas de 1 letra. */
export function chunk(word) {
  const chars = [...word];
  const n = Math.ceil(chars.length / 4);
  const size = Math.ceil(chars.length / n);
  const out = [];
  for (let i = 0; i < chars.length; i += size) out.push(chars.slice(i, i + size).join(''));
  return out;
}

/** Devuelve el texto como fichas <span class="tok"> (el texto visible sigue siendo el original). */
export function tokenSpans(text) {
  let i = 0;
  return text.split(/\s+/).filter(Boolean).map((word, wi) =>
    chunk(word).map((piece, pi) => `<span class="tok${wi > 0 && pi === 0 ? ' w' : ''}" style="--i:${i++}">${esc(piece)}</span>`).join(''),
  ).join('');
}
