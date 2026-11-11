export function analyzeText(text) {
  const trimmed = text.trim();
  if (trimmed === '') return { words: 0, chars: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0, minutes: 0 };
  const words = trimmed.split(/\s+/).length;
  const sentences = (trimmed.match(/[^.!?¡¿]+[.!?]+/g) ?? []).length || 1;
  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length;
  return {
    words, chars: [...text].length, charsNoSpaces: [...text.replace(/\s/g, '')].length,
    sentences, paragraphs, minutes: Math.ceil(words / 200),
  };
}

/** mode: 'upper' | 'lower' | 'title' | 'sentence'. */
export function convertCase(text, mode) {
  switch (mode) {
    case 'upper': return text.toLocaleUpperCase();
    case 'lower': return text.toLocaleLowerCase();
    case 'title': return text.toLocaleLowerCase().replace(/(^|[\s\-(¿¡"'])(\p{L})/gu, (_, p, c) => p + c.toLocaleUpperCase());
    case 'sentence': return text.toLocaleLowerCase().replace(/(^\s*|[.!?]\s+|\n\s*)(\p{L})/gu, (_, p, c) => p + c.toLocaleUpperCase());
    default: throw new RangeError('Modo desconocido: ' + mode);
  }
}

export function slugify(text) {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
