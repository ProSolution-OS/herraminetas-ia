const dict = {
  es: {
    home: 'Inicio', tools: 'Herramientas', language: 'English',
    homeTitle: 'Herramientas de IA gratuitas: calculadoras y utilidades',
    homeDesc: 'Calculadora de costo de APIs de IA, contador de tokens y generador de prompts. Gratis y sin registro.',
    homeH1: 'Herramientas de IA gratuitas',
    homeIntro: 'Utilidades sencillas para quien trabaja con modelos de lenguaje: calcula costos, mide textos y prepara mejores prompts.',
    toolsTitle: 'Todas las herramientas de IA', toolsDesc: 'Listado de calculadoras y utilidades gratuitas para trabajar con IA.',
    privacy: 'Privacidad', contact: 'Contacto', about: 'Sobre nosotros', terms: 'Términos',
    cookieText: 'Usamos cookies de publicidad de Google AdSense. ¿Las aceptas?', accept: 'Aceptar', reject: 'Rechazar',
    rights: 'Todos los derechos reservados.',
  },
  en: {
    home: 'Home', tools: 'Tools', language: 'Español',
    homeTitle: 'Free AI Tools: Calculators and Utilities',
    homeDesc: 'AI API cost calculator, token counter and prompt generator. Free, no sign-up.',
    homeH1: 'Free AI tools',
    homeIntro: 'Simple utilities for anyone working with language models: estimate costs, measure text and build better prompts.',
    toolsTitle: 'All AI tools', toolsDesc: 'List of free calculators and utilities for working with AI.',
    privacy: 'Privacy', contact: 'Contact', about: 'About', terms: 'Terms',
    cookieText: 'We use Google AdSense advertising cookies. Do you accept them?', accept: 'Accept', reject: 'Reject',
    rights: 'All rights reserved.',
  },
};
export const LANGS = ['es', 'en'];
export const t = (lang, key) => dict[lang][key] ?? key;

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
