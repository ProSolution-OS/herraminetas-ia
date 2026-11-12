/** ID de editor validado ('' si no hay). Formato: pub- y 16 dígitos. */
export function publisherId(config) {
  const id = (config.adsensePublisherId ?? '').trim();
  if (id && !/^pub-\d{16}$/.test(id)) throw new Error(`adsensePublisherId inválido: "${id}" (formato pub-XXXXXXXXXXXXXXXX)`);
  return id;
}

/** Fragmento JS (sin etiquetas <script>) que carga AdSense. Cadena vacía si no hay ID. */
export function adsenseSnippet(config) {
  const id = publisherId(config);
  if (!id) return '';
  return `var s=document.createElement('script');s.async=true;s.crossOrigin='anonymous';s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${id}';document.head.appendChild(s);`;
}

/** Metaetiqueta de verificación de propiedad: no carga anuncios ni usa cookies. */
export function adsenseMeta(config) {
  const id = publisherId(config);
  return id ? `<meta name="google-adsense-account" content="ca-${id}">` : '';
}

export function adsTxt(config) {
  const id = publisherId(config);
  if (!id) return '# Añade adsensePublisherId en el config del sitio cuando Google apruebe tu cuenta de AdSense.\n';
  return `google.com, ${id}, DIRECT, f08c47fec0942fa0\n`;
}
