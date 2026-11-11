const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const H = {
  es: { what: 'Qué es y para qué sirve', how: 'Cómo usarla paso a paso', ex: 'Ejemplo resuelto', faq: 'Preguntas frecuentes' },
  en: { what: 'What it is and what it is for', how: 'How to use it, step by step', ex: 'Worked example', faq: 'Frequently asked questions' },
};

/** content = {h1, intro: string[], steps: string[], example: string, faq: [q, a][]} */
export function articleHtml(lang, c) {
  const h = H[lang];
  return `<article>
<h2>${h.what}</h2>
${c.intro.map((p) => `<p>${esc(p)}</p>`).join('\n')}
<h2>${h.how}</h2>
<ol>${c.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
<h2>${h.ex}</h2>
<p>${esc(c.example)}</p>
<h2>${h.faq}</h2>
${c.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('\n')}
</article>`;
}

export const faqJsonLd = (c) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});
