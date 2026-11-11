# Sitio de herramientas IA (es/en)

Sitio estático bilingüe, sin dependencias. Genera `dist/` listo para subir a tu hosting.

## Uso

```bash
npm test          # ejecuta los tests
node build.mjs    # genera dist/
```

Edita `site.config.json` antes de publicar: `domain` (con https, sin barra final), `siteName`, `contactEmail` y, cuando Google apruebe AdSense, `adsensePublisherId` (formato `pub-XXXXXXXXXXXXXXXX`).

Los textos legales (`src/legal.mjs`) son plantillas genéricas: revísalos según las leyes de tu país antes de publicar.

## Publicar e indexar en Google Search Console

1. **Dominio propio**: compra uno (AdSense no aprueba subdominios gratuitos) y ten acceso a su DNS.
2. Rellena `site.config.json` y ejecuta `node build.mjs`.
3. Sube el contenido de `dist/` a la raíz pública del hosting. Comprueba que `/sitemap.xml`, `/robots.txt` y `/ads.txt` responden 200.
4. En [Search Console](https://search.google.com/search-console) → Añadir propiedad → tipo **Dominio** → verifica con el registro TXT en tu DNS. Sin acceso al DNS usa "Prefijo de URL" con el archivo HTML o la metaetiqueta.
5. Search Console → Sitemaps → envía `sitemap.xml`.
6. Inspección de URLs: inspecciona la home y una herramienta y pulsa "Solicitar indexación".
7. Espera entre 3 y 14 días. Publica contenido nuevo cada semana y enlaza entre herramientas.

## AdSense

1. Solicita el alta en adsense.google.com con tu dominio.
2. Al aprobarte, copia tu `pub-…` en `site.config.json`, ejecuta `node build.mjs` y vuelve a subir `dist/`.
3. El script de anuncios solo se carga cuando el visitante acepta las cookies, y `ads.txt` se genera solo.

La aprobación depende del tráfico y de que el contenido sea útil y original; no hay garantía de ingresos.
