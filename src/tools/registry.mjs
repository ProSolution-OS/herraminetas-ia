import costo from './costo-llm.mjs';
import contador from './contador-tokens.mjs';
import generador from './generador-prompts.mjs';
import { finanzasTools } from './finanzas.mjs';
import { saludTools } from './salud.mjs';
import { textoTools } from './texto.mjs';

/** Todas las herramientas disponibles, por id. Cada sitio elige las suyas en config.tools. */
const all = [costo, contador, generador, ...finanzasTools, ...saludTools, ...textoTools];
export const registry = Object.fromEntries(all.map((x) => [x.id, x]));
