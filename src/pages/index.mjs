import { site, services, servicePath } from '../site.mjs';
import { photo, faqText, serviceNode, ids } from '../lib.mjs';
import { quiz } from '../quiz.mjs';

const faq = [
  { q: '¿Qué hacen exactamente?', a: 'Implementamos sistemas preventivos de derecho laboral empresarial en tu empresa. Diseñamos contratos, políticas internas y demás medidas para prevenir demandas y contingencias laborales.' },
  { q: '¿Necesito ya tener un problema para contactarlos?', a: 'No. Nuestro enfoque es preventivo: actuamos antes de que un error se convierta en una multa o en una contingencia costosa.' },
  { q: '¿Qué pasa si un empleado me demanda?', a: 'Te representamos en todo el proceso: desde la conciliación laboral obligatoria ante el Centro de Conciliación hasta el litigio laboral si es necesario. La defensa patronal oportuna reduce el riesgo de condenas económicas altas.' },
  { q: '¿Qué empresas los necesitan?', a: 'Cualquier empresa en México con personal contratado, desde pymes en expansión hasta corporativos que buscan ordenar sus operaciones, evitar multas o cumplir auditorías.' },
  { q: 'Ya tengo contador o abogado general, ¿aún así aplica?', a: 'Sí. Los contadores y abogados corporativos atienden temas fiscales, comerciales o litigios. Nosotros aportamos la especialización en derecho laboral empresarial y relaciones laborales para empresas.' },
  { q: '¿Atienden a trabajadores?', a: 'No. Solo representamos a empresas y patrones. Si eres trabajador, la Procuraduría de la Defensa del Trabajo te asesora sin costo.' },
  { q: '¿Cuánto cuesta el diagnóstico?', a: 'Nada. El diagnóstico laboral es gratis durante 2026: respondes siete preguntas y Joel te dice por WhatsApp qué le falta a tu empresa y qué es urgente.' },
  { q: '¿Dónde están?', a: `En ${site.addressDisplay}. Atendemos ${site.hours.toLowerCase()}, en persona o de forma remota.` }
];

const prevenir = [
  ['contratos-laborales', '#015df7', 'Contratos y convenios por puesto'],
  ['compliance-laboral', '#e0387b', 'Reglamento, comisiones y protocolos'],
  ['capacitacion-stps', '#fec303', 'Capacitación, constancias e inspecciones'],
  ['repse', '#ff6b1a', 'Registro, ICSOE y SISUB'],
  ['asesoria-laboral', '#015df7', 'Remota o presencial']
];

export default function () {
  const svc = (slug) => services.find((s) => s.slug === slug);
  const body = `
<section class="doors" aria-labelledby="titulo">
  <h1 id="titulo" class="display">Abogados laborales para empresas</h1>
  <p class="lead">En Hermosillo, prevenimos demandas, multas e inspecciones con contratos, reglamentos y protocolos que dejamos funcionando en tu empresa.</p>
  <div class="actions"><a class="btn" href="#diagnostico">Hacer diagnóstico gratis</a></div>
  <div class="doors__pair">
    <a class="door" href="#prevenir">
      <figure>${photo('puerta-azul-centro-hermosillo', 'Puerta de arco en una fachada azul del centro de Hermosillo', { eager: true, sizes: '(min-width: 600px) 22vw, 50vw', pos: '82% 50%' })}</figure>
      <span class="door__name">Quiero prevenir</span>
      <span class="door__line">Contratos, reglamento, protocolos, STPS y REPSE en orden.</span>
    </a>
    <a class="door" href="#resolver">
      <figure>${photo('puerta-verde-centro-hermosillo', 'Puerta de arco en una fachada verde y rosa del centro de Hermosillo', { eager: true, sizes: '(min-width: 600px) 22vw, 50vw', pos: '24% 50%' })}</figure>
      <span class="door__name">Ya tengo un problema</span>
      <span class="door__line">Citatorio, demanda, despido o inspección.</span>
    </a>
  </div>
</section>

<section class="intro" aria-label="Qué es Resuelta">
  <div class="wrap" data-reveal>
    <p class="intro__lead">Resuelta es un despacho de abogados laborales en Hermosillo que solo atiende a empresas: dejamos por escrito lo que la ley pide y te defendemos si hay conflicto.</p>
    <div class="intro__cols">
      <p><strong>Para quién.</strong> Dueños, directores y áreas de Recursos Humanos de empresas con personal dado de alta ante el IMSS, desde pymes hasta corporativos. No representamos a trabajadores contra su empresa.</p>
      <p><strong>Qué hacemos.</strong> Contratos laborales, Reglamento Interior de Trabajo, comisiones mixtas, protocolos, capacitación y registros ante la STPS, REPSE, despidos y conciliación, y asesoría laboral continua.</p>
      <p><strong>Dónde.</strong> ${site.addressDisplay}. Atendemos ${site.hours.toLowerCase()}, en persona o de forma remota.</p>
      <p><strong>Cómo empezar.</strong> Con el <a href="/diagnostico/">diagnóstico laboral gratis</a>: siete preguntas y Joel te dice qué le falta a tu empresa. También por WhatsApp o al <a href="${site.phoneHref}">${site.phoneDisplay}</a>.</p>
    </div>
  </div>
</section>

<section class="sec sec--tone" id="prevenir" aria-labelledby="prevenir-t">
  <div class="wrap rows-sec">
    <div class="rows-sec__text" data-reveal>
      <h2 id="prevenir-t" class="h2">Para prevenir</h2>
      <p>Cada servicio tiene su página con lo que incluye, la ley que lo pide y las preguntas que más nos hacen.</p>
      <ul class="rows">
        ${prevenir
          .map(([slug, c, v]) => `<li><a href="${servicePath(slug)}"><span class="dot" style="--c: ${c}"></span>${svc(slug).long}</a><span>${v}</span></li>`)
          .join('\n        ')}
      </ul>
      <p class="note" style="margin-top: 28px"><a href="/servicios/">Ver todos los servicios laborales</a></p>
    </div>
    <figure class="rows-sec__pic" data-reveal>
      ${photo('palacio-de-gobierno-hermosillo', 'Fachada blanca del Palacio de Gobierno de Hermosillo, Sonora', { sizes: '(min-width: 900px) 40vw, 100vw', pos: '30% 50%' })}
      <figcaption>Palacio de Gobierno, centro de Hermosillo.</figcaption>
    </figure>
  </div>
</section>

<section class="sec compare" aria-labelledby="compara-t">
  <div class="wrap">
    <div class="compare__head" data-reveal>
      <h2 id="compara-t" class="h2">Con papeles o sin papeles</h2>
      <p>La diferencia casi nunca es la buena fe. Es lo que puedes probar por escrito el día que alguien lo pide.</p>
    </div>
    <table>
      <thead><tr><th scope="col">Tema</th><th scope="col">Sin papeles</th><th scope="col" class="is-ours">Con Resuelta</th></tr></thead>
      <tbody>
        <tr><th scope="row">Despido</th><td data-col="Sin papeles">Si no entregas el aviso por escrito, el despido se considera injustificado.<span class="law">LFT, art. 47</span></td><td class="is-ours" data-col="Con Resuelta">Causa documentada y aviso entregado en tiempo.</td></tr>
        <tr><th scope="row">Contrato</th><td data-col="Sin papeles">La falta de contrato escrito se le imputa al patrón.<span class="law">LFT, art. 26</span></td><td class="is-ours" data-col="Con Resuelta">Un contrato firmado por cada puesto.</td></tr>
        <tr><th scope="row">Sanciones</th><td data-col="Sin papeles">Sin reglamento, una suspensión es fácil de impugnar.</td><td class="is-ours" data-col="Con Resuelta">Reglamento Interior depositado ante el CFCRL.</td></tr>
        <tr><th scope="row">Inspección STPS</th><td data-col="Sin papeles">Cada documento que falta puede convertirse en multa.</td><td class="is-ours" data-col="Con Resuelta">Expediente revisado antes de la visita.</td></tr>
        <tr><th scope="row">Servicios especializados</th><td data-col="Sin papeles">Sin registro REPSE, tu cliente no puede deducir tu factura.</td><td class="is-ours" data-col="Con Resuelta">Registro vigente e informativas al día.</td></tr>
        <tr><th scope="row">Citatorio</th><td data-col="Sin papeles">Faltar a la audiencia de conciliación genera multa y te manda directo a juicio.</td><td class="is-ours" data-col="Con Resuelta">Te representamos desde la primera audiencia.</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="sec sec--tone" id="resolver" aria-labelledby="resolver-t">
  <div class="wrap rows-sec rows-sec--flip">
    <div class="rows-sec__text" data-reveal>
      <h2 id="resolver-t" class="h2">Si el problema ya llegó</h2>
      <p>Hay plazos que corren desde el primer día. Llámanos antes de responder, firmar o despedir.</p>
      <ul class="rows">
        <li><a href="${servicePath('despidos-finiquitos')}"><span class="dot" style="--c: #e0387b"></span>Me llegó un citatorio del Centro de Conciliación</a><span>Conciliación</span></li>
        <li><a href="${servicePath('despidos-finiquitos')}"><span class="dot" style="--c: #e0387b"></span>Un trabajador me demandó</a><span>Defensa patronal</span></li>
        <li><a href="${servicePath('despidos-finiquitos')}"><span class="dot" style="--c: #fec303"></span>Tengo que despedir a alguien esta semana</a><span>Finiquito o liquidación</span></li>
        <li><a href="${servicePath('capacitacion-stps')}"><span class="dot" style="--c: #015df7"></span>Llegó o viene un inspector de la STPS</a><span>Inspección</span></li>
      </ul>
      <div class="actions" style="margin-top: 32px"><a class="btn btn--quiet" href="${site.phoneHref}">Llamar al ${site.phoneDisplay}</a><a class="link" href="${site.whatsapp}">Escribir por WhatsApp</a></div>
    </div>
    <figure class="rows-sec__pic" data-reveal>
      ${photo('calle-centro-hermosillo-cerro', 'Calle del centro de Hermosillo con el Cerro de la Campana al fondo', { sizes: '(min-width: 900px) 36vw, 100vw' })}
      <figcaption>Centro de Hermosillo y el Cerro de la Campana.</figcaption>
    </figure>
  </div>
</section>

${quiz()}

<section class="sec" id="nosotros" aria-labelledby="carta-t">
  <div class="wrap">
    <article class="letter" data-reveal>
      <h2 id="carta-t" class="h2">Quién te atiende</h2>
      <p>La mayoría de las empresas que llegan con nosotros no hicieron nada mal a propósito. Contrataron sin contrato, sancionaron sin reglamento o despidieron sin aviso por escrito, porque nadie les dijo cómo.</p>
      <p>Fundé Resuelta para que eso no pase. Trabajamos solo con empresas, y nuestro trabajo es dejar por escrito lo que la Ley Federal del Trabajo pide dentro de la tuya.</p>
      <p>No te entregamos un formato para que lo llenes solo: <mark>lo implementamos contigo</mark>, y capacitamos a quien lo va a aplicar. Si el problema ya llegó, te representamos desde la conciliación hasta el juicio.</p>
      <p>El primer paso es el diagnóstico. Es gratis durante 2026 y lo reviso yo.</p>
      <div class="letter__sign">
        <p class="letter__name">Joel Pérez</p>
        <p class="letter__role">Socio fundador de Resuelta · Especialista en compliance laboral y gestión de riesgo patronal</p>
      </div>
      <a class="link" href="${site.founder.path}">Conoce a Joel</a>
    </article>
  </div>
</section>

<section class="sec sec--tone" aria-labelledby="ante-t">
  <div class="wrap names">
    <h2 id="ante-t" class="h2">Ante quién actuamos</h2>
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
      <li class="kind">Normas que implementamos</li>
      <li>Ley Federal del Trabajo</li>
      <li>NOM-035-STPS-2018</li>
      <li>NOM-019-STPS-2011</li>
      <li>Ley del Seguro Social</li>
    </ul>
  </div>
</section>

<section class="sec" id="preguntas" aria-labelledby="preguntas-t">
  <div class="wrap qa">
    <h2 id="preguntas-t" class="h2">Preguntas frecuentes</h2>
    ${faqText(faq)}
  </div>
</section>

<section class="sec sec--tone" id="contacto" aria-labelledby="contacto-t">
  <div class="wrap contact" data-reveal>
    <div class="contact__line">
      <h2 id="contacto-t" class="h2">Contacto</h2>
      <p class="statement" style="margin-top: 20px">Escríbenos si tu empresa tiene personal en Hermosillo y quieres saber qué le falta.</p>
    </div>
    <figure class="contact__pic">${photo('cerro-de-la-campana', 'El Cerro de la Campana, Hermosillo', { sizes: '(min-width: 960px) 14vw, 40vw', pos: '40% 50%' })}</figure>
    <div class="contact__how">
      <h3>¿Prefieres hablar?</h3>
      <ul>
        <li><a href="${site.whatsapp}">WhatsApp ${site.phoneDisplay}</a></li>
        <li><a href="${site.phoneHref}">Llamar al ${site.phoneDisplay}</a></li>
        <li><a href="mailto:${site.email}">${site.email}</a></li>
        <li><a href="${site.mapUrl}">Cómo llegar</a></li>
      </ul>
      <p>${site.addressDisplay}. ${site.hours}.</p>
    </div>
  </div>
</section>

<section class="closing">
  <div class="wrap">
    <p class="closing__line">Empieza por saber qué te falta. Son siete preguntas y la respuesta llega por WhatsApp.</p>
    <a class="btn" href="/diagnostico/">Hacer diagnóstico gratis</a>
  </div>
</section>`;

  return {
    meta: {
      path: '/',
      title: 'Abogados Laborales para Empresas en Hermosillo | Resuelta',
      description: 'Abogados laborales para empresas en Hermosillo: contratos, reglamento interior, STPS, REPSE, despidos y conciliación. Diagnóstico laboral gratis en 2026.',
      darkHeader: true,
      faq,
      schema: services.map((s) => serviceNode(s)),
      about: ids.org
    },
    body
  };
}
