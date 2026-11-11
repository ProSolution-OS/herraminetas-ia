/** Fragmento JS (sin etiquetas <script>) que carga AdSense. Cadena vacía si no hay ID. */
export function adsenseSnippet(config) {
  const id = (config.adsensePublisherId ?? '').trim();
  if (!id) return '';
  return `var s=document.createElement('script');s.async=true;s.crossOrigin='anonymous';s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${id}';document.head.appendChild(s);`;
}

export function adsTxt(config) {
  const id = (config.adsensePublisherId ?? '').trim();
  if (!id) return '# Añade adsensePublisherId en site.config.json cuando Google apruebe tu cuenta de AdSense.\n';
  return `google.com, ${id}, DIRECT, f08c47fec0942fa0\n`;
}
