# Sitios de herramientas (es/en)

Generador de sitios estáticos bilingües, sin dependencias. Un solo repositorio, varios sitios.

| Sitio | Config | Dominio | Herramientas |
|---|---|---|---|
| ia | `sites/ia.json` | calculadora.fqsolution.site | costo de API LLM, contador de tokens, generador de prompts |
| finanzas | `sites/finanzas.json` | finanzas.fqsolution.site | interés compuesto, cuota de préstamo, meta de ahorro |
| salud | `sites/salud.json` | salud.fqsolution.site | IMC, calorías diarias, proteína diaria |
| texto | `sites/texto.json` | text.fqsolution.site | contador de palabras, mayúsculas/minúsculas, slug |

## Uso

```bash
npm test                  # tests de todos los sitios
node build.mjs finanzas   # genera dist/finanzas/
node build.mjs --all      # genera dist/<sitio>/ para todos
```

## Desplegar en Vercel (un proyecto por sitio)

Cada sitio es un proyecto de Vercel distinto sobre este mismo repositorio. `vercel.json` ya define el build (`node build.mjs`, salida `dist/`). Lo único que cambia es la variable de entorno:

1. Vercel → Add New → Project → importa este repositorio.
2. Antes de pulsar Deploy, en **Environment Variables** añade `SITE` con el id del sitio (`finanzas`, `salud` o `texto`). El sitio `ia` no necesita la variable.
3. Deploy. Después, Settings → Domains → añade el subdominio (por ejemplo `finanzas.fqsolution.site`).
4. En Namecheap → Advanced DNS, crea un registro `CNAME` con host `finanzas` (o `salud`, `texto`) y valor `cname.vercel-dns.com` (usa el que indique Vercel).

## Añadir un sitio o una herramienta

- **Sitio nuevo:** copia `sites/finanzas.json` a `sites/<id>.json` y cambia dominio, nombre, `theme`, `tools` y `copy`. Los tests lo recogen solos.
- **Herramienta nueva:** lógica pura en `src/lib/`, un módulo en `src/tools/` con `id`, `slug`, `title`, `description`, `form(lang)` y `content` (es/en), y se registra en `src/tools/registry.mjs`. Cada página necesita 300+ palabras de texto propio y 4 preguntas frecuentes.

## Antes de publicar

- Revisa los textos legales (`src/legal.mjs`): son plantillas genéricas.
- El email de contacto de cada sitio está en su `sites/<id>.json`.

## Search Console y AdSense

1. [Search Console](https://search.google.com/search-console) → propiedad **Dominio** `fqsolution.site` (verifica con un registro TXT en Namecheap). Cubre todos los subdominios.
2. En Sitemaps envía `sitemap.xml` (solo la ruta, no la home) de cada subdominio.
3. Inspección de URLs: solicita la indexación de la home y de cada herramienta.
4. AdSense: pide el alta cuando haya páginas indexadas. Con tu `pub-…`, ponlo en `adsensePublisherId` del sitio, haz push y se activan anuncios y `ads.txt`. El script de anuncios solo se carga si el visitante acepta las cookies.

La aprobación de AdSense depende del tráfico y de que el contenido sea útil y original; no hay garantía de ingresos.
