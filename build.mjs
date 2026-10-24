// Genera el sitio estático: src/pages/*.mjs → dist/<ruta>/index.html
// Uso: node build.mjs
import { readdir, readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { site, services, servicePath } from './src/site.mjs';
import { esc, stripTags, used, cube, ids } from './src/lib.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist');

// Foto publicada → archivo original con su crédito en assets/credits.json
const sources = {
  'puerta-azul-centro-hermosillo': 'calles-de-hermosillo-sonora-2022-1',
  'puerta-verde-centro-hermosillo': 'calles-de-hermosillo-sonora-2022',
  'vista-hermosillo': 'skyline-hermosillo',
  'palacio-de-gobierno-hermosillo': 'palacio-de-gobierno-de-hermosillo-2022',
  'centro-de-gobierno-sonora': 'centro-de-gobierno-sonora',
  'calle-centro-hermosillo-cerro': 'centro-hermosillo-40439663383',
  'cerro-de-la-campana': 'cerro-de-la-campana-hmo',
  'atardecer-hermosillo': 'hermosillo-30385050197',
  'firma-documento': 'left-handed-writing-with-wristwatch'
};

// ---------- schema.org ----------

function orgNode() {
  return {
    '@type': 'LegalService',
    '@id': ids.org,
    name: site.name,
    ...(site.legalName ? { legalName: site.legalName } : {}),
    url: `${site.url}/`,
    logo: `${site.url}/logo.png`,
    image: `${site.url}/og.png`,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country
    },
    hasMap: site.mapUrl,
    areaServed: [{ '@type': 'City', name: 'Hermosillo' }, { '@type': 'State', name: 'Sonora' }],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '15:00'
    },
    founder: { '@id': ids.person },
    sameAs: site.sameAs,
    knowsLanguage: 'es-MX',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios laborales para empresas',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@id': `${site.url}${servicePath(s.slug)}#servicio` }
      }))
    }
  };
}

function graph(meta) {
  const url = `${site.url}${meta.path}`;
  const nodes = [
    orgNode(),
    { '@type': 'WebSite', '@id': ids.site, url: `${site.url}/`, name: site.name, inLanguage: 'es-MX', publisher: { '@id': ids.org } },
    {
      '@type': meta.pageType || 'WebPage',
      '@id': `${url}#pagina`,
      url,
      name: meta.title,
      description: meta.description,
      inLanguage: 'es-MX',
      isPartOf: { '@id': ids.site },
      about: { '@id': meta.about || ids.org },
      dateModified: site.updated,
      ...(meta.trail ? { breadcrumb: { '@id': `${url}#ruta` } } : {}),
      ...(meta.mainEntity ? { mainEntity: meta.mainEntity } : {})
    }
  ];
  if (meta.trail) {
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#ruta`,
      itemListElement: meta.trail.map(([name, path], i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name,
        item: `${site.url}${path}`
      }))
    });
  }
  if (meta.faq) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#preguntas`,
      isPartOf: { '@id': `${url}#pagina` },
      mainEntity: meta.faq.map((q) => ({
        '@type': 'Question',
        name: q.q,
        acceptedAnswer: { '@type': 'Answer', text: stripTags(q.a) }
      }))
    });
  }
  for (const n of meta.schema || []) nodes.push(n);
  return { '@context': 'https://schema.org', '@graph': nodes };
}

// ---------- layout ----------

const nav = [
  ['Servicios', '/servicios/'],
  ['Nosotros', site.founder.path],
  ['Preguntas', '/#preguntas'],
  ['Contacto', '/#contacto']
];

function header(meta) {
  const links = nav
    .map(([name, href]) => {
      const here = href === meta.path || (href === '/servicios/' && meta.path.startsWith('/servicios/'));
      return `<li><a href="${href}"${here ? ' aria-current="page"' : ''}>${name}</a></li>`;
    })
    .join('');
  return `<header class="bar${meta.darkHeader ? ' bar--dark' : ''}">
  <div class="bar__in">
    <a class="mark" href="/" aria-label="Resuelta, inicio">${cube(30)}<span>Resuelta</span></a>
    <nav class="bar__nav" aria-label="Principal"><ul>${links}</ul></nav>
    <a class="bar__tel" href="${site.phoneHref}">${site.phoneDisplay}</a>
    <a class="btn btn--small bar__cta" href="/diagnostico/">Diagnóstico gratis</a>
    <details class="menu">
      <summary>Menú</summary>
      <div class="menu__panel"><ul>${links}<li><a href="/diagnostico/">Diagnóstico gratis</a></li><li><a href="${site.phoneHref}">Llamar al ${site.phoneDisplay}</a></li></ul></div>
    </details>
  </div>
</header>`;
}

function footer(credits) {
  const svc = services.map((s) => `<a href="${servicePath(s.slug)}">${s.name}</a>`).join('');
  return `<footer class="foot">
  <div class="foot__line">
    <p class="foot__what">Resuelta · Abogados laborales para empresas en Hermosillo</p>
    <nav class="foot__links" aria-label="Servicios">${svc}</nav>
    <p class="foot__legal">© 2026 · <a href="/aviso-de-privacidad/">Aviso de privacidad</a></p>
  </div>
  <p class="foot__nap">${site.addressDisplay} · <a href="${site.phoneHref}">${site.phoneDisplay}</a> · <a href="mailto:${site.email}">${site.email}</a> · ${site.hours}</p>
  ${credits ? `<p class="foot__credits">Fotografías: ${credits}</p>` : ''}
</footer>`;
}

function layout(meta, body, credits) {
  const url = `${site.url}${meta.path}`;
  return `<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
${meta.noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="#081239">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/logo.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Resuelta">
<meta property="og:locale" content="es_MX">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:image" content="${site.url}/og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,500&amp;display=swap">
<link rel="stylesheet" href="/styles.css">
<script type="application/ld+json">${JSON.stringify(graph(meta)).replace(/</g, '\\u003c')}</script>
</head>
<body${meta.bodyClass ? ` class="${meta.bodyClass}"` : ''}>
<a class="skip" href="#contenido">Saltar al contenido</a>
${header(meta)}
<main id="contenido">
${body}
</main>
${footer(credits)}
<script src="/main.js" defer></script>
</body>
</html>
`;
}

// Resumen en texto plano para asistentes de IA (llmstxt.org)
function llms() {
  return `# Resuelta, abogados laborales para empresas en Hermosillo

> ${site.description} Lo dirige el Lic. ${site.founder.name}, socio fundador. Diagnóstico laboral gratis durante 2026.

Resuelta solo representa a empresas y patrones; no atiende a trabajadores contra su empresa.

## Servicios
${services.map((s) => `- [${s.long}](${site.url}${servicePath(s.slug)}): ${s.summary}`).join('\n')}

## Páginas clave
- [Todos los servicios](${site.url}/servicios/)
- [Diagnóstico laboral gratis](${site.url}/diagnostico/): siete preguntas; la respuesta llega por WhatsApp.
- [Lic. Joel Pérez](${site.url}${site.founder.path}): perfil del socio fundador.
- [Preguntas frecuentes](${site.url}/#preguntas)
- [Aviso de privacidad](${site.url}/aviso-de-privacidad/)

## Contacto
- Teléfono y WhatsApp: ${site.phoneDisplay}
- Correo: ${site.email}
- Dirección: ${site.addressDisplay}
- Horario: ${site.hours}
`;
}

// ---------- build ----------

async function build() {
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  await cp(join(root, 'src/static'), out, { recursive: true });

  const credits = JSON.parse(await readFile(join(root, 'assets/credits.json'), 'utf8'));
  const creditFor = (key) => {
    const c = credits.find((x) => x.file === `assets/${sources[key]}.jpg`);
    return c ? `<a href="${c.page}">${esc(c.title)}</a>, ${esc(c.creator)}, ${esc(c.license)}` : '';
  };

  const files = (await readdir(join(root, 'src/pages'))).filter((f) => f.endsWith('.mjs')).sort();
  const sitemap = [];
  for (const f of files) {
    used.photos.clear();
    const mod = await import(pathToFileURL(join(root, 'src/pages', f)).href);
    const { meta, body } = mod.default();
    const creditLine = [...used.photos].map(creditFor).filter(Boolean).join(' · ');
    const dest = meta.file ? join(out, meta.file) : join(out, meta.path, 'index.html');
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, layout(meta, body, creditLine));
    if (!meta.noindex) sitemap.push(meta.path);
    console.log(`  ${meta.path.padEnd(36)} título ${String(meta.title.length).padStart(2)} · descripción ${meta.description.length}`);
  }

  await writeFile(
    join(out, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap
      .map((p) => `  <url><loc>${site.url}${p}</loc><lastmod>${site.updated}</lastmod></url>`)
      .join('\n')}\n</urlset>\n`
  );
  await writeFile(join(out, 'favicon.svg'), cube(40).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '));
  await writeFile(join(out, 'llms.txt'), llms());
  console.log(`\n${files.length} páginas · sitemap con ${sitemap.length} URL`);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
