import { site, services, servicePath } from '../site.mjs';
import { photo, breadcrumbs, ids, esc } from '../lib.mjs';

const practice = [
  ['contratos-laborales', 'Contratos laborales'],
  ['compliance-laboral', 'Reglamento Interior de Trabajo'],
  ['compliance-laboral', 'Comisiones mixtas y protocolos'],
  ['capacitacion-stps', 'Capacitación e inspecciones de la STPS'],
  ['despidos-finiquitos', 'Despidos, finiquitos y conciliación'],
  ['repse', 'REPSE, ICSOE y SISUB'],
  ['asesoria-laboral', 'Asesoría laboral para empresas']
];
const dots = ['#015df7', '#e0387b', '#fec303', '#ff6b1a'];

export default function () {
  const body = `
<section class="svc-hero">
  <div class="wrap">
    ${breadcrumbs([['Inicio', '/'], ['Joel Pérez', site.founder.path]])}
    <div class="svc-hero__grid">
      <div class="svc-hero__text">
        <h1 class="display">Lic. Joel Pérez, abogado laboral</h1>
        <p class="lead">Joel Pérez es abogado laboral y socio fundador de Resuelta, despacho de Hermosillo, Sonora, que solo atiende a empresas. Diseña e implementa esquemas de cumplimiento normativo para auditar, estructurar y reducir los riesgos legales en la gestión del personal.</p>
        <div class="actions"><a class="btn" href="/diagnostico/">Hacer diagnóstico con Joel</a><a class="link" href="${site.whatsapp}">Escribirle por WhatsApp</a></div>
      </div>
      <dl class="svc-hero__pic facts">
        <div><dt>Puesto</dt><dd>Socio fundador de Resuelta</dd></div>
        <div><dt>Especialidad</dt><dd>Compliance laboral y gestión de riesgo patronal</dd></div>
        <div><dt>Atiende</dt><dd>Solo empresas y patrones</dd></div>
        <div><dt>Ciudad</dt><dd>Hermosillo, Sonora</dd></div>
        <div><dt>Contacto</dt><dd><a href="mailto:${site.email}">${site.email}</a><br><a href="${site.phoneHref}">${site.phoneDisplay}</a></dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="sec sec--tone" aria-labelledby="carta-t">
  <div class="wrap letter-split">
    <figure class="letter-split__pic" data-reveal>${photo('palacio-de-gobierno-hermosillo', 'Fachada blanca del Palacio de Gobierno de Hermosillo', { sizes: '(min-width: 900px) 30vw, 100vw', pos: '30% 50%' })}<figcaption>Palacio de Gobierno, Hermosillo.</figcaption></figure>
    <article class="letter" data-reveal>
      <h2 id="carta-t" class="h2">Por qué fundé Resuelta</h2>
      <p>La mayoría de las empresas que llegan con nosotros no hicieron nada mal a propósito. Contrataron sin contrato, sancionaron sin reglamento o despidieron sin aviso por escrito, porque nadie les dijo cómo.</p>
      <p>En derecho laboral, lo que no está por escrito casi siempre se resuelve a favor del trabajador. Por eso mi trabajo empieza antes del conflicto: contratos por puesto, un reglamento depositado, comisiones con sus actas y protocolos que alguien en la empresa sabe aplicar.</p>
      <p>No entrego formatos para que los llenes solo. <mark>Los implemento contigo</mark> y capacito a quien los va a usar todos los días.</p>
      <p>Cuando el problema ya llegó, también estoy: represento a la empresa desde la audiencia de conciliación hasta el juicio.</p>
      <p>El diagnóstico es gratis durante 2026 y lo reviso personalmente.</p>
      <div class="letter__sign">
        <p class="letter__name">Joel Pérez</p>
        <p class="letter__role">Socio fundador de Resuelta</p>
      </div>
    </article>
  </div>
</section>

<section class="sec" aria-labelledby="areas-t">
  <div class="wrap rows-sec">
    <div class="rows-sec__text" data-reveal>
      <h2 id="areas-t" class="h2">Áreas de práctica</h2>
      <p>Cada área tiene su página con lo que incluye, la ley que lo pide y las preguntas frecuentes.</p>
      <ul class="rows">
        ${practice
          .map(([slug, name], i) => `<li><a href="${servicePath(slug)}"><span class="dot" style="--c: ${dots[i % 4]}"></span>${esc(name)}</a><span>Ver servicio</span></li>`)
          .join('\n        ')}
      </ul>
    </div>
    <figure class="rows-sec__pic" data-reveal>
      ${photo('firma-documento', 'Mano que escribe en una libreta junto a una computadora', { sizes: '(min-width: 900px) 40vw, 100vw', pos: '55% 50%' })}
      <figcaption>Lo que no está por escrito no se puede probar.</figcaption>
    </figure>
  </div>
</section>

<section class="sec sec--tone" aria-labelledby="ante-t">
  <div class="wrap names">
    <div class="side" data-reveal>
      <h2 id="ante-t" class="h2">Ante quién actúa</h2>
      <figure class="side__pic">${photo('centro-de-gobierno-sonora', 'Centro de Gobierno del Estado de Sonora, en Hermosillo', { sizes: '(min-width: 900px) 22vw, 100vw' })}<figcaption>Centro de Gobierno de Sonora.</figcaption></figure>
    </div>
    <ul class="names__cols" data-reveal>
      <li class="kind">Autoridades laborales</li>
      <li>Secretaría del Trabajo y Previsión Social</li>
      <li>Centro Federal de Conciliación y Registro Laboral</li>
      <li>Centro de Conciliación Laboral de Sonora</li>
      <li>Tribunales laborales de Sonora</li>
      <li class="kind">Seguridad social y vivienda</li>
      <li>IMSS</li>
      <li>INFONAVIT</li>
      <li>Instituto FONACOT</li>
    </ul>
  </div>
</section>

<section class="sec" aria-labelledby="contacto-t">
  <div class="wrap contact" data-reveal>
    <div class="contact__line">
      <h2 id="contacto-t" class="h2">Habla con Joel</h2>
      <p class="statement" style="margin-top: 20px">De lunes a viernes, de 8:00 a 15:00. El primer paso es el diagnóstico gratis.</p>
      <div class="actions" style="margin-top: 28px"><a class="btn" href="/diagnostico/">Hacer diagnóstico gratis</a></div>
    </div>
    <figure class="contact__pic">${photo('cerro-de-la-campana', 'El Cerro de la Campana, Hermosillo', { sizes: '(min-width: 960px) 14vw, 40vw', pos: '40% 50%' })}</figure>
    <div class="contact__how">
      <h3>Contacto directo</h3>
      <ul>
        <li><a href="${site.whatsapp}">WhatsApp ${site.phoneDisplay}</a></li>
        <li><a href="${site.phoneHref}">Llamar al ${site.phoneDisplay}</a></li>
        <li><a href="mailto:${site.email}">${site.email}</a></li>
      </ul>
      <p>${site.addressDisplay}.</p>
    </div>
  </div>
</section>`;

  const person = {
    '@type': 'Person',
    '@id': ids.person,
    name: site.founder.name,
    honorificPrefix: site.founder.honorific,
    jobTitle: site.founder.jobTitle,
    description: 'Abogado laboral y socio fundador de Resuelta, especialista en compliance laboral y gestión de riesgo patronal para empresas en Hermosillo, Sonora.',
    worksFor: { '@id': ids.org },
    url: `${site.url}${site.founder.path}`,
    email: site.email,
    telephone: site.phone,
    workLocation: { '@type': 'Place', name: 'Hermosillo, Sonora' },
    knowsAbout: services.map((s) => s.long),
    ...(site.founder.sameAs.length ? { sameAs: site.founder.sameAs } : {})
  };

  return {
    meta: {
      path: site.founder.path,
      title: 'Lic. Joel Pérez, Abogado Laboral en Hermosillo | Resuelta',
      description: 'Joel Pérez es abogado laboral y socio fundador de Resuelta en Hermosillo: compliance laboral y gestión de riesgo patronal solo para empresas.',
      pageType: 'ProfilePage',
      about: ids.person,
      mainEntity: { '@id': ids.person },
      trail: [['Inicio', '/'], ['Joel Pérez', site.founder.path]],
      schema: [person]
    },
    body
  };
}
