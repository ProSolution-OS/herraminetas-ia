const dict = {
  es: {
    home: 'Inicio', tools: 'Herramientas', language: 'English',
    homeTitle: 'Herramientas de IA gratuitas: calculadoras y utilidades',
    homeDesc: 'Calculadora de costo de APIs de IA, contador de tokens y generador de prompts. Gratis y sin registro.',
    homeH1: 'Cuenta los tokens antes de pagar por ellos',
    homeIntro: 'Cada recuadro de arriba es un token: el trozo de texto en que un modelo de IA lee tu mensaje y por el que cobra. Mide tus textos, calcula el gasto de una API y prepara mejores prompts, gratis y sin registro.',
    ctaPrimary: 'Calcular el costo', ctaSecondary: 'Contar tokens',
    toolsTitle: 'Todas las herramientas de IA', toolsDesc: 'Listado de calculadoras y utilidades gratuitas para trabajar con IA.',
    privacy: 'Privacidad', contact: 'Contacto', about: 'Sobre nosotros', terms: 'Términos',
    cookieText: 'Usamos cookies de publicidad de Google AdSense. ¿Las aceptas?', accept: 'Aceptar', reject: 'Rechazar',
    rights: 'Todos los derechos reservados.',
  },
  en: {
    home: 'Home', tools: 'Tools', language: 'Español',
    homeTitle: 'Free AI Tools: Calculators and Utilities',
    homeDesc: 'AI API cost calculator, token counter and prompt generator. Free, no sign-up.',
    homeH1: 'Count the tokens before you pay for them',
    homeIntro: 'Each block above is a token: the chunk of text an AI model reads your message in, and charges you for. Measure your text, work out what an API will cost and build better prompts, free and without sign-up.',
    ctaPrimary: 'Calculate the cost', ctaSecondary: 'Count tokens',
    toolsTitle: 'All AI tools', toolsDesc: 'List of free calculators and utilities for working with AI.',
    privacy: 'Privacy', contact: 'Contact', about: 'About', terms: 'Terms',
    cookieText: 'We use Google AdSense advertising cookies. Do you accept them?', accept: 'Accept', reject: 'Reject',
    rights: 'All rights reserved.',
  },
};
export const LANGS = ['es', 'en'];
export const t = (lang, key) => dict[lang][key] ?? key;
/** Texto propio del sitio (config.copy) con respaldo en el diccionario común. */
export const copyOf = (config, lang, key) => config?.copy?.[lang]?.[key] ?? t(lang, key);

const legalSlugs = {
  es: { privacy: 'privacidad', contact: 'contacto', about: 'sobre-nosotros', terms: 'terminos' },
  en: { privacy: 'privacy', contact: 'contact', about: 'about', terms: 'terms' },
};
const prefix = (lang) => (lang === 'es' ? '/' : '/en/');
export const homePath = (lang) => prefix(lang);
export const toolsPath = (lang) => prefix(lang) + (lang === 'es' ? 'herramientas/' : 'tools/');
export const toolPath = (lang, slug) => toolsPath(lang) + slug + '/';
export const legalPath = (lang, id) => prefix(lang) + legalSlugs[lang][id] + '/';
export const LEGAL_IDS = ['privacy', 'contact', 'about', 'terms'];
