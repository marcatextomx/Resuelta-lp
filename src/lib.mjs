// Utilidades que usan las páginas y el generador.
import { site, services, servicePath } from './site.mjs';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const stripTags = (s) => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

// Fotos usadas por la página en curso (el generador las lee para los créditos).
export const used = { photos: new Set() };

// Medidas reales de cada foto (variante grande)
const photos = {
  'puerta-azul-centro-hermosillo': [1200, 900],
  'puerta-verde-centro-hermosillo': [1200, 900],
  'vista-hermosillo': [1200, 685],
  'palacio-de-gobierno-hermosillo': [1200, 900],
  'centro-de-gobierno-sonora': [1200, 900],
  'calle-centro-hermosillo-cerro': [900, 1200],
  'cerro-de-la-campana': [1200, 900],
  'atardecer-hermosillo': [1200, 800],
  'firma-documento': [1200, 800]
};

export function photo(key, alt, { sizes = '(min-width: 900px) 50vw, 100vw', eager = false, cls = '', pos = '' } = {}) {
  const [w, h] = photos[key];
  used.photos.add(key);
  const small = Math.round((640 / Math.max(w, h)) * w);
  return `<img${cls ? ` class="${cls}"` : ''} src="/img/${key}-1200.jpg" srcset="/img/${key}-640.jpg ${small}w, /img/${key}-1200.jpg ${w}w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"${pos ? ` style="object-position: ${pos}"` : ''}>`;
}

// Preguntas frecuentes como texto de lectura; el mismo arreglo alimenta el schema FAQPage.
export function faqText(items, { cols = 2 } = {}) {
  return `<div class="faq-text${cols === 1 ? ' faq-text--one' : ''}">\n${items
    .map((q) => `<p><strong>${esc(q.q)}</strong> ${q.a}</p>`)
    .join('\n')}\n</div>`;
}

export function breadcrumbs(trail) {
  return `<nav class="crumbs" aria-label="Ruta"><ol>${trail
    .map(([name, path], i) =>
      i === trail.length - 1 ? `<li><span aria-current="page">${esc(name)}</span></li>` : `<li><a href="${path}">${esc(name)}</a></li>`
    )
    .join('')}</ol></nav>`;
}

export const serviceBySlug = (slug) => services.find((s) => s.slug === slug);

// El cubo resuelto del logo, dibujado como geometría exacta.
export function cube(size = 32) {
  const faces = [
    { o: [20, 3], u: [16, 8], v: [-16, 8], fill: ['#fec303', '#fec303', '#fec303', '#fec303'] },
    { o: [4, 11], u: [16, 8], v: [0, 18], fill: ['#ff6b1a', '#ff6b1a', '#ff6b1a', '#ff6b1a'] },
    { o: [20, 19], u: [16, -8], v: [0, 18], fill: ['#015df7', '#015df7', '#e0387b', '#e0387b'] }
  ];
  const g = 0.08;
  const pt = (f, a, b) =>
    [f.o[0] + a * f.u[0] + b * f.v[0], f.o[1] + a * f.u[1] + b * f.v[1]].map((n) => +n.toFixed(2)).join(',');
  const polys = [];
  for (const f of faces) {
    let k = 0;
    for (const j of [0, 1])
      for (const i of [0, 1]) {
        const a0 = i / 2 + g / 2, a1 = (i + 1) / 2 - g / 2, b0 = j / 2 + g / 2, b1 = (j + 1) / 2 - g / 2;
        polys.push(`<polygon fill="${f.fill[k++]}" points="${pt(f, a0, b0)} ${pt(f, a1, b0)} ${pt(f, a1, b1)} ${pt(f, a0, b1)}"/>`);
      }
  }
  return `<svg class="cube" width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true" focusable="false">${polys.join('')}</svg>`;
}

// ---------- schema.org ----------

export const ids = {
  org: `${site.url}/#organizacion`,
  site: `${site.url}/#sitio`,
  person: `${site.url}${site.founder.path}#persona`
};

export function serviceNode(s, extra = {}) {
  return {
    '@type': 'Service',
    '@id': `${site.url}${servicePath(s.slug)}#servicio`,
    name: s.long,
    serviceType: s.name,
    description: s.summary,
    url: `${site.url}${servicePath(s.slug)}`,
    provider: { '@id': ids.org },
    areaServed: { '@type': 'City', name: 'Hermosillo' },
    audience: { '@type': 'BusinessAudience', name: 'Empresas con personal en México' },
    ...extra
  };
}

// Páginas de servicio: misma estructura, contenido propio.
export function servicePage(s, { lead, situations, block, includes, steps, stepsTitle, faq, faqTitle, related, cta, photoAside, pics }) {
  const path = servicePath(s.slug);
  const side = ([key, alt, caption]) =>
    `<figure class="side__pic">${photo(key, alt, { sizes: '(min-width: 900px) 28vw, 100vw' })}<figcaption>${esc(caption)}</figcaption></figure>`;
  const relatedHtml = related
    .map((slug) => {
      const r = serviceBySlug(slug);
      return `<li><a href="${servicePath(r.slug)}">${esc(r.long)}</a><span>${esc(r.summary)}</span></li>`;
    })
    .join('');
  return `
<section class="svc-hero">
  <div class="wrap">
    ${breadcrumbs([['Inicio', '/'], ['Servicios', '/servicios/'], [s.name, path]])}
    <div class="svc-hero__grid">
      <div class="svc-hero__text">
        <h1 class="display">${esc(s.long)}</h1>
        <p class="lead">${lead}</p>
        <div class="actions"><a class="btn" href="/diagnostico/">Hacer diagnóstico gratis</a><a class="link" href="${site.whatsapp}">Escribir por WhatsApp</a></div>
        <p class="note">En Hermosillo, Sonora · Actualizado el ${site.updatedDisplay}</p>
      </div>
      <figure class="svc-hero__pic">${photoAside}</figure>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="cuando">
  <div class="wrap split">
    <div class="side" data-reveal>
      <h2 id="cuando" class="h2">¿Cuándo lo necesitas?</h2>
      ${side(pics[0])}
    </div>
    <ul class="ticks" data-reveal>${situations.map((x) => `<li>${x}</li>`).join('')}</ul>
  </div>
</section>

<section class="sec sec--tone" aria-labelledby="bloque">
  <div class="wrap">
    ${block}
  </div>
</section>

<section class="sec" aria-labelledby="incluye">
  <div class="wrap split">
    <div class="side" data-reveal>
      <h2 id="incluye" class="h2">Qué incluye</h2>
      ${side(pics[1])}
    </div>
    <dl class="includes" data-reveal>${includes.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl>
  </div>
</section>

<section class="sec sec--dark" aria-labelledby="proceso">
  <div class="wrap slip-grid">
    <div data-reveal>
      <h2 id="proceso" class="h2">${esc(stepsTitle)}</h2>
      <p class="body-copy">Empieza con el diagnóstico gratis. Después decides si seguimos.</p>
    </div>
    <ol class="slip" data-reveal>
      ${steps.map(([t, v]) => `<li><span>${t}</span><span class="slip__dots" aria-hidden="true"></span><span>${v}</span></li>`).join('')}
      <li class="slip__end"><span>${cta}</span></li>
    </ol>
  </div>
</section>

<section class="sec" aria-labelledby="preguntas">
  <div class="wrap qa">
    <div class="side" data-reveal>
      <h2 id="preguntas" class="h2">${esc(faqTitle)}</h2>
      ${side(pics[2])}
    </div>
    ${faqText(faq)}
  </div>
</section>

<section class="sec sec--tone" aria-labelledby="relacionados">
  <div class="wrap split">
    <h2 id="relacionados" class="h2">Servicios relacionados</h2>
    <ul class="rows rows--desc" data-reveal>${relatedHtml}<li><a href="/">Abogados laborales para empresas en Hermosillo</a><span>Todos los servicios de Resuelta</span></li></ul>
  </div>
</section>

<section class="closing">
  <div class="wrap">
    <p class="closing__line">¿Quieres saber qué le falta a tu empresa? Son siete preguntas y Joel te responde por WhatsApp.</p>
    <a class="btn" href="/diagnostico/">Empezar diagnóstico</a>
  </div>
</section>`;
}
