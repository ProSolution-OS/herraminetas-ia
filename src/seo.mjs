const esc = (s) => s.replace(/&/g, '&amp;');

/** pages: {path, alternates: {es?, en?}, noindex?}[] */
export function sitemapXml(pages, domain) {
  const urls = pages.filter((p) => !p.noindex).map((p) => {
    const alts = Object.entries(p.alternates ?? {})
      .map(([l, path]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${esc(domain + path)}"/>`);
    if (p.alternates?.es) alts.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${esc(domain + p.alternates.es)}"/>`);
    return `<url><loc>${esc(domain + p.path)}</loc>${alts.join('')}</url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}

export function robotsTxt(domain) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${domain}/sitemap.xml\n`;
}
