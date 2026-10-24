// /blog/ y una página por guía. Devuelve varias páginas.
import { site, services, servicePath } from '../site.mjs';
import { photo, breadcrumbs, faqText, esc, stripTags, ids, serviceBySlug, used } from '../lib.mjs';
import { posts } from '../blog/posts.mjs';

export const blogPath = '/blog/';
export const postPath = (p) => `/blog/${p.slug}/`;
const blogId = `${site.url}${blogPath}#blog`;
const postId = (p) => `${site.url}${postPath(p)}#articulo`;

const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const mesesLargos = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const fecha = (iso, largo = false) => {
  const [y, m, d] = iso.split('-').map(Number);
  return largo ? `${d} de ${mesesLargos[m - 1]} de ${y}` : `${d} ${meses[m - 1]} ${y}`;
};
const words = (p) => stripTags(p.summary + ' ' + p.body + ' ' + p.faq.map((q) => q.q + ' ' + q.a).join(' ')).split(' ').length;
const minutes = (p) => Math.max(1, Math.round(words(p) / 200));
const toc = (p) => [...p.body.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)].map((m) => [m[1], m[2]]);
const sorted = [...posts].sort((a, b) => b.published.localeCompare(a.published));
const dots = ['#015df7', '#e0387b', '#fec303', '#ff6b1a'];
// Foto de cada servicio (la misma de su landing)
const servicePhoto = {
  'contratos-laborales': ['firma-documento', 'Mano que escribe en una libreta junto a una computadora'],
  'compliance-laboral': ['centro-de-gobierno-sonora', 'Centro de Gobierno del Estado de Sonora'],
  'capacitacion-stps': ['atardecer-hermosillo', 'Calle de Hermosillo al atardecer'],
  'despidos-finiquitos': ['calle-centro-hermosillo-cerro', 'Calle del centro de Hermosillo con el Cerro de la Campana'],
  repse: ['vista-hermosillo', 'Vista de Hermosillo con edificios y palmeras'],
  'asesoria-laboral': ['puerta-azul-centro-hermosillo', 'Puertas de arco en una fachada azul del centro de Hermosillo']
};
const thumb = (key, alt) => `<span class="thumb">${photo(key, alt, { sizes: '(min-width: 520px) 200px, 120px' })}</span>`;

function postNode(p, full = false) {
  const node = {
    '@type': 'BlogPosting',
    '@id': postId(p),
    headline: p.title,
    description: p.description,
    url: `${site.url}${postPath(p)}`,
    image: `${site.url}/img/${p.photo[0]}-1200.jpg`,
    datePublished: p.published,
    dateModified: p.updated,
    author: p.reviewed ? { '@id': ids.person } : { '@id': ids.org },
    publisher: { '@id': ids.org },
    isPartOf: { '@id': blogId },
    inLanguage: 'es-MX'
  };
  if (!full) return node;
  return {
    ...node,
    mainEntityOfPage: { '@id': `${site.url}${postPath(p)}#pagina` },
    articleSection: p.section,
    keywords: p.keywords.join(', '),
    wordCount: words(p),
    timeRequired: `PT${minutes(p)}M`,
    about: { '@id': `${site.url}${servicePath(p.service)}#servicio` },
    abstract: p.summary,
    citation: p.sources.map(([name, url, pub]) => ({ '@type': 'CreativeWork', name, url, publisher: { '@type': 'Organization', name: pub } })),
    ...(p.reviewed ? { reviewedBy: { '@id': ids.person } } : {})
  };
}

function indexPage() {
  const [first] = sorted;
  const topics = services.map((s) => `<li><a class="chip" href="${servicePath(s.slug)}">${esc(s.name)}</a></li>`).join('');
  const rows = sorted
    .map(
      (p) => `<li>${thumb(p.photo[0], p.photo[1])}<div><a href="${postPath(p)}">${esc(p.title)}</a><p>${esc(p.section)} · ${minutes(p)} min · <time datetime="${p.published}">${fecha(p.published)}</time></p></div></li>`
    )
    .join('\n      ');
  const body = `
<section class="svc-hero">
  <div class="wrap">
    ${breadcrumbs([['Inicio', '/'], ['Blog', blogPath]])}
    <div class="svc-hero__grid blog-head">
      <div class="svc-hero__text">
        <h1 class="display">Guías laborales para empresas</h1>
        <p class="lead">Respuestas claras a las dudas laborales de dueños y Recursos Humanos en Hermosillo, con el artículo de la Ley Federal del Trabajo que respalda cada una.</p>
      </div>
      <nav class="topics" aria-label="Temas">
        <p class="note">Temas</p>
        <ul>${topics}</ul>
      </nav>
    </div>
  </div>
</section>

<section class="sec sec--tone" aria-labelledby="destacada">
  <div class="wrap feature" data-reveal>
    <a class="feature__pic" href="${postPath(first)}" tabindex="-1" aria-hidden="true">${photo(first.photo[0], first.photo[1], { sizes: '(min-width: 900px) 50vw, 100vw' })}</a>
    <div class="feature__text">
      <h2 id="destacada" class="h2"><a href="${postPath(first)}">${esc(first.h1)}</a></h2>
      <p class="note">${esc(first.section)} · ${minutes(first)} min de lectura · <time datetime="${first.published}">${fecha(first.published)}</time></p>
      <p>${esc(first.summary)}</p>
      <a class="link" href="${postPath(first)}">Leer la guía</a>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="todas">
  <div class="wrap split">
    <div class="side" data-reveal>
      <div>
        <h2 id="todas" class="h2">Todas las guías</h2>
        <p style="margin-top: 14px">De la más reciente a la más antigua. También por <a href="/blog/feed.xml">RSS</a>.</p>
      </div>
      <figure class="side__pic">${photo('cerro-de-la-campana', 'El Cerro de la Campana, Hermosillo', { sizes: '(min-width: 900px) 28vw, 100vw' })}<figcaption>Cerro de la Campana, Hermosillo.</figcaption></figure>
    </div>
    <ul class="rows-thumb" data-reveal>
      ${rows}
    </ul>
  </div>
</section>

<section class="closing">
  <div class="wrap" data-reveal>
    <p class="closing__line">¿Tu caso no está en las guías? Responde siete preguntas y Joel te dice qué hacer.</p>
    <a class="btn" href="/diagnostico/">Hacer diagnóstico gratis</a>
  </div>
</section>`;
  return {
    meta: {
      path: blogPath,
      title: 'Guías Laborales para Empresas en Hermosillo | Resuelta',
      description: 'Guías de derecho laboral para empresas en Hermosillo: finiquito y liquidación, REPSE, contratos y STPS, con el artículo de la LFT que respalda cada respuesta.',
      pageType: 'CollectionPage',
      trail: [['Inicio', '/'], ['Blog', blogPath]],
      mainEntity: { '@id': blogId },
      schema: [
        {
          '@type': 'Blog',
          '@id': blogId,
          name: 'Guías laborales para empresas',
          url: `${site.url}${blogPath}`,
          publisher: { '@id': ids.org },
          inLanguage: 'es-MX',
          blogPost: sorted.map((p) => ({ '@id': postId(p) }))
        },
        ...sorted.map((p) => postNode(p))
      ]
    },
    body
  };
}

// Segunda foto: después del primer párrafo de la segunda sección, para que su pie nunca quede sobre un título.
function withFigure(p) {
  const fig = `<figure class="post-pic" data-reveal>${photo(p.figure2[0], p.figure2[1], { sizes: '(min-width: 1100px) 720px, 100vw' })}<figcaption>${esc(p.figure2[2])}</figcaption></figure>`;
  const second = p.body.indexOf('<h2', p.body.indexOf('<h2') + 1);
  const end = p.body.indexOf('</p>', second) + 4;
  return p.body.slice(0, end) + '\n' + fig + p.body.slice(end);
}

function articlePage(p) {
  const svc = serviceBySlug(p.service);
  const items = toc(p);
  const related = p.related.map((slug) => posts.find((x) => x.slug === slug)).filter(Boolean);
  const byline = p.reviewed
    ? `Por Resuelta · Revisado por <a href="${site.founder.path}">Lic. Joel Pérez</a>`
    : 'Por el equipo de Resuelta';
  const body = `
<article class="post">
  <header class="post-head">
    <div class="wrap">
      ${breadcrumbs([['Inicio', '/'], ['Blog', blogPath], [p.title, postPath(p)]])}
      <h1 class="display post-head__title">${esc(p.h1)}</h1>
      <p class="lead post-head__dek">${esc(p.dek)}</p>
      <p class="post-head__meta">${byline} · En <a href="${servicePath(svc.slug)}">${esc(p.section)}</a> · Publicado el <time datetime="${p.published}">${fecha(p.published, true)}</time>${p.updated !== p.published ? ` · Actualizado el <time datetime="${p.updated}">${fecha(p.updated, true)}</time>` : ''} · ${minutes(p)} min de lectura</p>
    </div>
  </header>

  <div class="wrap post-grid">
    <div class="post-body prose">
      <div class="tldr">
        <p class="tldr__label">En resumen</p>
        <p>${esc(p.summary)}</p>
      </div>
      <figure class="post-pic">${photo(p.photo[0], p.photo[1], { sizes: '(min-width: 1100px) 720px, 100vw', eager: true })}<figcaption>${esc(p.photo[2])}</figcaption></figure>
      ${withFigure(p)}
      <h2 id="preguntas">Preguntas frecuentes</h2>
      ${faqText(p.faq, { cols: 1 })}
      <h2 id="fuentes">Fuentes</h2>
      <ol class="sources">
        ${p.sources.map(([name, url, pub]) => `<li><a href="${url}">${esc(name)}</a> · ${esc(pub)}</li>`).join('\n        ')}
      </ol>
      <aside class="author-box" aria-label="Sobre el autor" data-reveal>
        <p class="author-box__name">Resuelta, abogados laborales para empresas</p>
        <p>Despacho de Hermosillo, Sonora, que solo atiende a empresas. Lo dirige el <a href="${site.founder.path}">Lic. Joel Pérez</a>, especialista en compliance laboral y gestión de riesgo patronal. Esta guía es información general; para tu caso, <a href="/diagnostico/">haz el diagnóstico gratis</a>.</p>
      </aside>
    </div>
    <aside class="post-aside" data-reveal>
      <nav class="toc" aria-label="En esta guía">
        <p class="toc__title">En esta guía</p>
        <ol>${items.map(([id, t]) => `<li><a href="#${id}">${esc(t)}</a></li>`).join('')}<li><a href="#preguntas">Preguntas frecuentes</a></li><li><a href="#fuentes">Fuentes</a></li></ol>
      </nav>
      <div class="aside-cta">
        <p class="aside-cta__title">${esc(svc.long)}</p>
        <p>${esc(svc.summary)}</p>
        <a class="btn btn--small" href="${servicePath(svc.slug)}">Ver el servicio</a>
      </div>
    </aside>
  </div>
</article>

<section class="sec sec--tone" aria-labelledby="sigue">
  <div class="wrap split">
    <h2 id="sigue" class="h2">Sigue leyendo</h2>
    <ul class="rows-thumb" data-reveal>
      ${related.map((r) => `<li>${thumb(r.photo[0], r.photo[1])}<div><a href="${postPath(r)}">${esc(r.title)}</a><p>${esc(r.summary.split('. ')[0])}.</p></div></li>`).join('\n      ')}
      <li>${thumb(...servicePhoto[svc.slug])}<div><a href="${servicePath(svc.slug)}">${esc(svc.long)}</a><p>${esc(svc.summary)}</p></div></li>
      <li>${thumb('cerro-de-la-campana', 'El Cerro de la Campana, Hermosillo')}<div><a href="${blogPath}">Todas las guías laborales</a><p>El blog de Resuelta.</p></div></li>
    </ul>
  </div>
</section>

<section class="closing">
  <div class="wrap">
    <p class="closing__line">Cada caso cambia. Responde siete preguntas y Joel te dice qué aplica a tu empresa.</p>
    <a class="btn" href="/diagnostico/">Hacer diagnóstico gratis</a>
  </div>
</section>`;

  return {
    meta: {
      path: postPath(p),
      title: p.metaTitle,
      description: p.description,
      ogType: 'article',
      ogImage: `${site.url}/img/${p.photo[0]}-1200.jpg`,
      published: p.published,
      modified: p.updated,
      section: p.section,
      trail: [['Inicio', '/'], ['Blog', blogPath], [p.title, postPath(p)]],
      mainEntity: { '@id': postId(p) },
      about: postId(p),
      faq: p.faq,
      schema: [
        postNode(p, true),
        { '@type': 'Blog', '@id': blogId, name: 'Guías laborales para empresas', url: `${site.url}${blogPath}`, publisher: { '@id': ids.org } }
      ]
    },
    body
  };
}

// Cada página registra sus propias fotos: el generador llama a cada función por separado.
export default function () {
  return [indexPage, ...sorted.map((p) => () => articlePage(p))];
}

export { posts, sorted, fecha, minutes, used };
