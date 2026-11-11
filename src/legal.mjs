import { LANGS, LEGAL_IDS, legalPath, t } from './i18n.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Plantillas genéricas: el titular del sitio debe revisarlas según su país. */
const BODY = {
  es: {
    privacy: (c) => `<p>Última actualización: ${new Date().getFullYear()}. Esta política explica qué datos trata ${esc(c.siteName)} y cómo.</p>
<h2>Datos que no recopilamos</h2><p>Las herramientas funcionan en tu navegador. Los textos y números que introduces no se envían a nuestros servidores ni se almacenan.</p>
<h2>Cookies y publicidad</h2><p>Mostramos anuncios mediante Google AdSense. Google y sus socios pueden usar cookies para personalizar anuncios y medir su rendimiento. Solo se cargan si las aceptas en el aviso de cookies.</p>
<h2>Tu derecho a rechazar</h2><p>Puedes rechazar las cookies de publicidad en el aviso. También puedes gestionar la personalización de anuncios en la configuración de anuncios de Google y borrar las cookies desde tu navegador. Si las rechazas, el sitio sigue funcionando igual.</p>
<h2>Contacto</h2><p>Para cualquier consulta sobre privacidad escribe a ${esc(c.contactEmail)}.</p>`,
    contact: (c) => `<p>¿Tienes una duda, una sugerencia o quieres reportar un error? Escríbenos a <a href="mailto:${esc(c.contactEmail)}">${esc(c.contactEmail)}</a> y responderemos lo antes posible.</p>`,
    about: (c) => `<p>${esc(c.siteName)} reúne herramientas gratuitas y sencillas para quien trabaja con inteligencia artificial: calculadoras de costos, contadores de tokens y generadores de prompts. Cada herramienta se acompaña de una explicación en español e inglés para que entiendas el resultado y no solo veas un número.</p><p>Nos financiamos con publicidad, lo que nos permite mantener todo gratis y sin registro.</p>`,
    terms: (c) => `<p>Al usar ${esc(c.siteName)} aceptas estos términos.</p><h2>Uso de las herramientas</h2><p>Los resultados son estimaciones informativas. No garantizamos su exactitud y no nos hacemos responsables de decisiones tomadas a partir de ellos; verifica siempre los precios y límites oficiales de cada proveedor.</p><h2>Propiedad</h2><p>El contenido del sitio es propio salvo indicación contraria y no puede copiarse sin permiso.</p><h2>Cambios</h2><p>Podemos modificar estos términos y el sitio en cualquier momento.</p>`,
  },
  en: {
    privacy: (c) => `<p>Last updated: ${new Date().getFullYear()}. This policy explains what data ${esc(c.siteName)} handles and how.</p>
<h2>Data we do not collect</h2><p>The tools run in your browser. The text and numbers you enter are not sent to our servers or stored.</p>
<h2>Cookies and advertising</h2><p>We show ads through Google AdSense. Google and its partners may use cookies to personalise ads and measure their performance. They are only loaded if you accept them in the cookie notice.</p>
<h2>Your right to reject</h2><p>You can reject advertising cookies in the notice. You can also manage ad personalisation in Google's ad settings and delete cookies from your browser. If you reject them, the site works exactly the same.</p>
<h2>Contact</h2><p>For any privacy question write to ${esc(c.contactEmail)}.</p>`,
    contact: (c) => `<p>Have a question, a suggestion or a bug to report? Write to us at <a href="mailto:${esc(c.contactEmail)}">${esc(c.contactEmail)}</a> and we will reply as soon as we can.</p>`,
    about: (c) => `<p>${esc(c.siteName)} brings together free, simple tools for people working with artificial intelligence: cost calculators, token counters and prompt generators. Each tool comes with an explanation in English and Spanish so you understand the result and not just a number.</p><p>We are funded by advertising, which lets us keep everything free and without sign-up.</p>`,
    terms: (c) => `<p>By using ${esc(c.siteName)} you accept these terms.</p><h2>Use of the tools</h2><p>Results are informational estimates. We do not guarantee their accuracy and are not liable for decisions made from them; always verify each provider's official prices and limits.</p><h2>Ownership</h2><p>Site content is our own unless stated otherwise and may not be copied without permission.</p><h2>Changes</h2><p>We may change these terms and the site at any time.</p>`,
  },
};

export function pages(config) {
  return LANGS.flatMap((lang) => LEGAL_IDS.map((id) => ({
    key: 'legal-' + id, lang, path: legalPath(lang, id), title: `${t(lang, id)} | ${config.siteName}`, description: `${t(lang, id)} — ${config.siteName}`,
    body: `<h1>${t(lang, id)}</h1>\n${BODY[lang][id](config)}`,
  })));
}
