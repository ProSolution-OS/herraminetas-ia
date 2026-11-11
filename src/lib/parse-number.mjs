/** Devuelve un número finito >= 0, o null si la entrada no es válida. */
export function parseNumber(input, lang) {
  let s = String(input).trim().replace(/\s/g, '');
  if (!/^\d[\d.,]*$/.test(s)) return null;
  if (lang === 'es') {
    if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
    else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  } else {
    s = s.replace(/,/g, '');
  }
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 ? n : null;
}
