export function countText(text) {
  const chars = [...text].length;
  const trimmed = text.trim();
  const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  return { words, chars, estTokens: Math.ceil(chars / 4) };
}
