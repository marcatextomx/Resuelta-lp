import { site, services, servicePath } from '../site.mjs';
import { photo, breadcrumbs, serviceNode, esc } from '../lib.mjs';

const groups = [
  ['Prevenir', 'Para tener todo en orden antes de que pase algo.', ['contratos-laborales', 'compliance-laboral', 'capacitacion-stps'], ['puerta-azul-centro-hermosillo', 'Puertas de arco en una fachada azul del centro de Hermosillo', 'Calle del centro de Hermosillo.']],
  ['Resolver un conflicto', 'Cuando ya hay un citatorio, una demanda o un despido pendiente.', ['despidos-finiquitos'], ['calle-centro-hermosillo-cerro', 'Calle del centro de Hermosillo con el Cerro de la Campana al fondo', 'Centro de Hermosillo.']],
  ['Cumplir trámites y acompañarte', 'Registros, informativas y un abogado laboral a la mano.', ['repse', 'asesoria-laboral'], ['palacio-de-gobierno-hermosillo', 'Fachada blanca del Palacio de Gobierno de Hermosillo', 'Palacio de Gobierno, Hermosillo.']]
];
const dots = ['#015df7', '#e0387b', '#fec303', '#ff6b1a'];

export default function () {
  const svc = (slug) => services.find((s) => s.slug === slug);
  let d = 0;
  const body = `
<section class="svc-hero">
  <div class="wrap">
    ${breadcrumbs([['Inicio', '/'], ['Servicios', '/servicios/']])}
    <div class="svc-hero__grid">
      <div class="svc-hero__text">
        <h1 class="display">Servicios laborales para empresas</h1>
        <p class="lead">En Hermosillo, Resuelta ofrece seis servicios laborales solo para empresas: contratos, compliance laboral, capacitación y STPS, despidos y conciliación, REPSE y asesoría continua. Todos empiezan con un diagnóstico gratis durante 2026.</p>
        <div class="actions"><a class="btn" href="/diagnostico/">Hacer diagnóstico gratis</a><a class="link" href="${site.phoneHref}">Llamar al ${site.phoneDisplay}</a></div>
      </div>
      <figure class="svc-hero__pic">${photo('centro-de-gobierno-sonora', 'Centro de Gobierno del Estado de Sonora, en Hermosillo', { sizes: '(min-width: 900px) 30vw, 100vw', pos: '35% 50%' })}</figure>
    </div>
  </div>
</section>

${groups
  .map(
    ([name, line, slugs, [pk, palt, pcap]], gi) => `<section class="sec${gi % 2 === 0 ? ' sec--tone' : ''}" aria-labelledby="g${gi}">
  <div class="wrap split">
    <div class="side" data-reveal>
      <div>
        <h2 id="g${gi}" class="h2">${esc(name)}</h2>
        <p style="margin-top: 14px; max-width: 30ch">${esc(line)}</p>
      </div>
      <figure class="side__pic">${photo(pk, palt, { sizes: '(min-width: 900px) 28vw, 100vw' })}<figcaption>${esc(pcap)}</figcaption></figure>
    </div>
    <ul class="rows rows--desc" data-reveal>
      ${slugs
        .map((slug) => {
          const s = svc(slug);
          return `<li><a href="${servicePath(slug)}"><span class="dot" style="--c: ${dots[d++ % 4]}"></span>${esc(s.long)}</a><span>${esc(s.summary)}</span></li>`;
        })
        .join('\n      ')}
    </ul>
  </div>
</section>`
  )
  .join('\n')}

<section class="closing">
  <div class="wrap">
    <p class="closing__line">¿No sabes cuál necesitas? Responde siete preguntas y Joel te dice por dónde empezar.</p>
    <a class="btn" href="/diagnostico/">Empezar diagnóstico</a>
  </div>
</section>`;

  return {
    meta: {
      path: '/servicios/',
      title: 'Servicios Laborales para Empresas en Hermosillo | Resuelta',
      description: 'Seis servicios laborales para empresas en Hermosillo: contratos, compliance laboral, capacitación STPS, despidos y conciliación, REPSE y asesoría laboral.',
      pageType: 'CollectionPage',
      trail: [['Inicio', '/'], ['Servicios', '/servicios/']],
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${site.url}${servicePath(s.slug)}`, name: s.long }))
      },
      schema: services.map((s) => serviceNode(s))
    },
    body
  };
}
