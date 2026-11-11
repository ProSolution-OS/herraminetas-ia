# Sitio de herramientas IA bilingüe (monetizable con AdSense) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generar un sitio estático bilingüe (es/en) de herramientas gratuitas de IA, listo para AdSense e indexable en Google Search Console, que se sube a hosting propio.

**Architecture:** Un script Node (`build.mjs`) sin dependencias genera `dist/` (HTML estático) desde plantillas y datos de herramientas. La lógica de cada herramienta vive en `src/lib/` (pura y testeada) y el HTML solo la invoca desde un `<script>` pequeño. SEO (sitemap, hreflang, canonical, JSON-LD) y legal/consentimiento se generan en el build, para que añadir un sitio o herramienta nueva solo requiera datos nuevos.

**Tech Stack:** Node 20+ (módulos ESM, `node:test`, sin frameworks), HTML/CSS/JS vanilla.

**Spec:** No hay documento de spec. Los requisitos son las respuestas del usuario en la conversación del 2026-11-11: nicho = herramientas IA/calculadoras; monetización = Google AdSense; hosting = propio (el usuario sube `dist/` por FTP/panel); idioma = es + en con hreflang.

## Global Constraints

- Node >= 20, cero dependencias npm de runtime.
- Idiomas: `es` (por defecto, en `/`) y `en` (en `/en/`). Cada página existe en ambos y se enlaza con `hreflang` recíproco más `x-default` apuntando a `es`.
- URLs con barra final (`/herramientas/costo-llm/`), canonical absoluto con `config.domain`.
- El script de AdSense NO se carga hasta que el visitante acepte cookies de publicidad (cumplimiento RGPD/EEE).
- Páginas obligatorias para aprobación de AdSense: Privacidad, Contacto, Sobre nosotros, Términos, en ambos idiomas.
- `site.config.json` contiene `domain`, `siteName`, `adsensePublisherId` (formato `pub-XXXXXXXXXXXXXXXX`, vacío hasta que Google lo apruebe), `contactEmail`.
- Contenido original: cada herramienta incluye mínimo 300 palabras de texto explicativo propio (AdSense rechaza sitios de "contenido escaso").

## Review Focus

- Entradas vacías, negativas, `NaN` o enormes en las calculadoras: deben mostrar un mensaje, nunca `NaN` ni `Infinity`.
- Decimales con coma (`1,5`) en español y con punto en inglés: ambos deben interpretarse bien.
- Texto con emojis, tildes y saltos de línea en el contador de tokens: cuenta caracteres Unicode reales, no unidades UTF-16.
- Sitemap y hreflang: toda URL del sitemap existe en `dist/` y cada alternativa hreflang apunta de vuelta (reciprocidad); nada de páginas `noindex` en el sitemap.
- AdSense antes del consentimiento: ninguna petición a `googlesyndication.com` antes de aceptar; y con `adsensePublisherId` vacío no se inyecta nada.

---

### Task 1: Scaffold y pipeline de build

**Files:**
- Create: `package.json`, `site.config.json`, `build.mjs`, `src/templates/layout.mjs`, `src/styles.css`, `src/i18n.mjs`, `test/build.test.mjs`

**Interfaces:**
- Produces:
  - `build(config: SiteConfig, outDir: string): Promise<string[]>`, que devuelve las rutas relativas de las páginas HTML escritas.
  - `layout({lang, title, description, path, body, config}): string`, que devuelve el HTML completo con `<head>` (title, description, canonical, hreflang, Open Graph) y cabecera/pie con selector de idioma.
  - `t(lang: 'es'|'en', key: string): string` en `src/i18n.mjs`.
  - `SiteConfig = {domain, siteName, adsensePublisherId, contactEmail}`.

- [ ] **Step 1: Test** `build escribe dist/index.html y dist/en/index.html con canonical y hreflang`. Aserciones: ambos archivos existen; `dist/index.html` contiene `<link rel="canonical" href="https://ejemplo.com/">` y `hreflang="en" href="https://ejemplo.com/en/"` y `hreflang="x-default"`.
- [ ] **Step 2:** `node --test test/build.test.mjs`; esperado: FAIL (`build` no existe).
- [ ] **Step 3:** Implementar `build.mjs`, `layout.mjs` e `i18n.mjs` con la firma indicada. Usar `fs/promises`; limpiar `outDir` antes de escribir; copiar `styles.css` a `dist/assets/`. CSS mobile-first, un solo archivo, con huecos reservados para anuncios (`.ad-slot` con `min-height` para evitar saltos de maquetación).
- [ ] **Step 4:** Misma prueba; esperado: PASS.
- [ ] **Step 5:** Commit `feat: scaffold del build bilingüe`.

---

### Task 2: Lógica de las tres herramientas

**Files:**
- Create: `src/lib/llm-cost.mjs`, `src/lib/text-count.mjs`, `src/lib/parse-number.mjs`, `test/lib.test.mjs`

**Interfaces:**
- Produces:
  - `parseNumber(input: string, lang: 'es'|'en'): number | null`, que devuelve `null` si no es un número finito y no negativo.
  - `llmCost({inputTokens, outputTokens, inputPricePerM, outputPricePerM}: number): number`, con coste en USD = `inputTokens/1e6*inputPricePerM + outputTokens/1e6*outputPricePerM`.
  - `countText(text: string): {words: number, chars: number, estTokens: number}`, con `chars` contando puntos de código Unicode (`[...text].length`) y `estTokens = Math.ceil(chars/4)`.

- [ ] **Step 1: Tests**
  - `llmCost({inputTokens:1_000_000, outputTokens:500_000, inputPricePerM:3, outputPricePerM:15}) === 10.5`
  - `parseNumber('1,5','es') === 1.5`, `parseNumber('1.5','en') === 1.5`, `parseNumber('-2','en') === null`, `parseNumber('abc','es') === null`, `parseNumber('','en') === null`
  - `countText('hola 😀 mundo')` → `{words:3, chars:12, estTokens:3}`; `countText('')` → todo ceros.
  - `llmCost` con cualquier entrada no finita lanza `RangeError`.
- [ ] **Step 2:** `node --test test/lib.test.mjs`; esperado: FAIL.
- [ ] **Step 3:** Implementar los tres módulos con las firmas indicadas.
- [ ] **Step 4:** Mismo comando; esperado: PASS.
- [ ] **Step 5:** Commit `feat: lógica de calculadora de costo LLM, contador y parser numérico`.

---

### Task 3: Páginas de herramientas con contenido SEO

**Files:**
- Create: `src/tools/costo-llm.mjs`, `src/tools/contador-tokens.mjs`, `src/tools/generador-prompts.mjs`, `src/tools/index.mjs`, `src/lib/prompt-template.mjs`, `test/tools.test.mjs`
- Modify: `build.mjs` (recorrer `tools` y escribir una página por herramienta e idioma, más páginas índice de herramientas)

**Interfaces:**
- Consumes: `layout`, `t`, `build` (Task 1) y las funciones de Task 2.
- Produces:
  - `Tool = {slug: {es:string,en:string}, title: {es,en}, description: {es,en}, render(lang): string, article(lang): string}`; `tools: Tool[]` exportado desde `src/tools/index.mjs`.
  - `buildPrompt({role, task, format, tone}: string): string` en `src/lib/prompt-template.mjs`.

- [ ] **Step 1: Tests** (`test/tools.test.mjs`): tras `build`, existe `dist/herramientas/costo-llm/index.html` y `dist/en/tools/llm-cost/index.html`; cada página contiene un `<h1>` y como mínimo 300 palabras en el texto visible; incluye JSON-LD `SoftwareApplication`; `buildPrompt({role:'editor',task:'resumir',format:'lista',tone:'formal'})` contiene las cuatro entradas.
- [ ] **Step 2:** `node --test test/tools.test.mjs`; esperado: FAIL.
- [ ] **Step 3:** Implementar. Cada herramienta aporta un formulario, un `<script type="module">` que importa su lib desde `/assets/` (copiar `src/lib` a `dist/assets/lib/` en el build), y un `article()` con texto original: qué es, cómo usarla, un ejemplo resuelto y 4 preguntas frecuentes (marcadas con JSON-LD `FAQPage`). Los precios por defecto de la calculadora son editables por el usuario y llevan la nota "verifica el precio oficial del proveedor".
- [ ] **Step 4:** Mismo comando; esperado: PASS.
- [ ] **Step 5:** Commit `feat: tres herramientas bilingües con artículo SEO`.

---

### Task 4: SEO técnico (sitemap, robots, hreflang recíproco)

**Files:**
- Create: `src/seo.mjs`, `test/seo.test.mjs`
- Modify: `build.mjs`

**Interfaces:**
- Consumes: la lista de páginas escritas por `build` (Task 1/3), cada una con `{path, lang, alternates: {es?:string, en?:string}, noindex?: boolean}`.
- Produces: `sitemapXml(pages, domain): string`, con `<xhtml:link rel="alternate">` por URL; `robotsTxt(domain): string`.

- [ ] **Step 1: Tests**
  - Cada `<loc>` del sitemap corresponde a un archivo existente en `dist/`.
  - Reciprocidad hreflang: si A declara a B, B declara a A.
  - Una página con `noindex` no aparece en el sitemap.
  - `robots.txt` contiene `Sitemap: https://ejemplo.com/sitemap.xml` y no bloquea `/assets/`.
- [ ] **Step 2:** `node --test test/seo.test.mjs`; esperado: FAIL.
- [ ] **Step 3:** Implementar `sitemapXml` y `robotsTxt` y escribirlos en `dist/` al final de `build`.
- [ ] **Step 4:** Mismo comando; esperado: PASS.
- [ ] **Step 5:** Commit `feat: sitemap, robots y hreflang recíproco`.

---

### Task 5: Páginas legales, consentimiento y AdSense

**Files:**
- Create: `src/legal.mjs`, `src/consent.mjs`, `test/adsense.test.mjs`
- Modify: `build.mjs`, `src/templates/layout.mjs` (pie con enlaces legales, banner de cookies)

**Interfaces:**
- Produces:
  - `legalPages(lang, config): {slug:string, title:string, body:string}[]` con privacidad, contacto, sobre nosotros y términos.
  - `adsenseSnippet(config): string`, que devuelve `''` si `adsensePublisherId` está vacío.
  - `consentScript(config): string`, un script inline: guarda la elección en `localStorage` y solo entonces inyecta `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-<id>`.
  - `adsTxt(config): string`, con `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`; si no hay ID, devuelve un comentario.

- [ ] **Step 1: Tests**
  - Con `adsensePublisherId:''`, ningún HTML de `dist/` contiene `googlesyndication`.
  - Con ID `pub-1234567890123456`, el HTML contiene el script solo dentro de `consentScript`, nunca como `<script src>` estático.
  - Existen privacidad/contacto/sobre/términos en `es` y `en`, enlazados desde el pie de todas las páginas.
  - `dist/ads.txt` contiene la línea exacta indicada.
  - La política de privacidad menciona AdSense, cookies y el derecho a rechazar.
- [ ] **Step 2:** `node --test test/adsense.test.mjs`; esperado: FAIL.
- [ ] **Step 3:** Implementar. El banner ofrece "Aceptar" y "Rechazar" con el mismo peso visual. Los textos legales son una plantilla genérica: indicar en el README que el usuario debe revisarlos para su país.
- [ ] **Step 4:** `npm test` completo; esperado: todo PASS.
- [ ] **Step 5:** Commit `feat: páginas legales, consentimiento y AdSense condicionado`.

---

### Task 6: Publicación e indexación (pasos manuales del usuario)

**Files:**
- Create: `README.md` con esta checklist y el comando `node build.mjs`.

**Interfaces:**
- Consumes: `dist/` completo.

- [ ] **Step 1: Datos que debes darme (o rellenar en `site.config.json`):** dominio definitivo, nombre del sitio, email de contacto. Si todavía no tienes dominio, necesitas comprar uno (AdSense no aprueba subdominios gratuitos) y tener acceso a su panel de DNS.
- [ ] **Step 2:** `node build.mjs` y sube el contenido de `dist/` a la raíz pública de tu hosting. Verifica que `https://tudominio/sitemap.xml`, `/robots.txt` y `/ads.txt` responden con 200.
- [ ] **Step 3: Search Console.** En search.google.com/search-console → "Añadir propiedad" → tipo **Dominio** → verifica con el registro TXT en tu DNS (si no puedes tocar el DNS, usa tipo "Prefijo de URL" con el archivo HTML o la metaetiqueta de verificación; dímelo y lo añado al build).
- [ ] **Step 4:** En Search Console → Sitemaps → envía `sitemap.xml`. Luego, en "Inspección de URLs", inspecciona la home y una herramienta y pulsa "Solicitar indexación".
- [ ] **Step 5:** Espera entre 3 y 14 días para ver páginas indexadas. Publica contenido nuevo cada semana (artículos en `src/tools/`) y enlaza entre herramientas.
- [ ] **Step 6: AdSense.** Solicita el alta en adsense.google.com con tu dominio. Cuando Google apruebe, copia el `pub-…` en `site.config.json`, ejecuta `node build.mjs` y vuelve a subir. Aprobar suele tardar entre días y un par de semanas, y tener tráfico y contenido original ayuda.

---

## Self-Review

- **Cobertura de requisitos:** nicho (Task 3), AdSense (Task 5), hosting propio (Task 6, salida estática), bilingüe (Tasks 1, 3, 4), indexación en Search Console (Tasks 4 y 6).
- **Consistencia de tipos:** `layout`, `build`, `Tool` y `countText`/`llmCost`/`parseNumber` se usan con las mismas firmas en todas las tareas.
- **Riesgo conocido:** ningún plan garantiza ingresos ni la aprobación de AdSense. Depende del tráfico y de que el contenido sea útil y original, por eso el texto de cada herramienta es un requisito y no un adorno.
