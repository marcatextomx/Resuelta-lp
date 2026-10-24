import { photo, serviceBySlug, serviceNode, servicePage } from '../lib.mjs';
import { servicePath } from '../site.mjs';

const s = serviceBySlug('repse');

const faq = [
  { q: '¿Qué es un servicio especializado?', a: 'Es un servicio u obra que no forma parte del objeto social ni de la actividad económica preponderante de la empresa que lo contrata (LFT, art. 13). Si tu personal trabaja en instalaciones de un cliente haciendo algo que ese cliente no hace, probablemente necesitas REPSE.' },
  { q: '¿Cuánto tarda la STPS en dar el registro?', a: 'La ley le da a la STPS veinte días para responder a una solicitud completa (LFT, art. 15). El tiempo real depende de que el expediente fiscal, del IMSS y del INFONAVIT esté al corriente desde el inicio.' },
  { q: '¿Qué pasa si presto servicios especializados sin REPSE?', a: 'La empresa se expone a multas de la STPS y, además, su cliente no puede deducir los pagos ni acreditar el IVA de tus facturas. Por eso muchos clientes piden el número de registro antes de firmar.' },
  { q: '¿Cada cuánto se renueva el REPSE?', a: 'El registro tiene una vigencia de tres años y la renovación debe solicitarse antes de que venza. Te avisamos con tiempo para que no haya un periodo sin registro.' }
];

export default function () {
  const body = servicePage(s, {
    lead: 'El REPSE es el padrón de la STPS en el que debe registrarse toda empresa que presta servicios u obras especializadas con su propio personal. Tramitamos el registro y su renovación, presentamos las informativas ICSOE ante el IMSS y SISUB ante el INFONAVIT, y afiliamos tu empresa a FONACOT.',
    photoAside: photo('vista-hermosillo', 'Vista de Hermosillo con edificios y palmeras', { sizes: '(min-width: 900px) 30vw, 100vw', pos: '20% 50%' }),
    situations: [
      'Tu personal trabaja en instalaciones de tus clientes: seguridad, limpieza, mantenimiento.',
      'Eres contratista y ejecutas obras especializadas.',
      'Tu cliente te pidió tu número de registro REPSE para pagarte.',
      'Tu registro está por vencer o te lo negaron.'
    ],
    block: `<div class="block__head" data-reveal>
      <h2 id="bloque" class="h2">Obligaciones REPSE: ante quién y cada cuándo</h2>
      <p>El registro es solo el principio. Después vienen las informativas y la renovación.</p>
    </div>
    <div class="data">
      <table>
        <thead><tr><th scope="col">Obligación</th><th scope="col">Ante quién</th><th scope="col">Cada cuándo</th><th scope="col">Base legal</th></tr></thead>
        <tbody>
          <tr><th scope="row">Registro en el padrón REPSE</th><td data-col="Ante quién">STPS</td><td data-col="Cada cuándo">Renovación cada tres años</td><td data-col="Base">LFT, art. 15</td></tr>
          <tr><th scope="row">Informativa ICSOE</th><td data-col="Ante quién">IMSS</td><td data-col="Cada cuándo">Cada cuatro meses</td><td data-col="Base">LSS, art. 15-A</td></tr>
          <tr><th scope="row">Informativa SISUB</th><td data-col="Ante quién">INFONAVIT</td><td data-col="Cada cuándo">Cada cuatro meses</td><td data-col="Base">Ley del INFONAVIT, art. 29 Bis</td></tr>
          <tr><th scope="row">Contrato de servicios especializados</th><td data-col="Ante quién">Con tu cliente, con número REPSE</td><td data-col="Cada cuándo">Por cada contrato</td><td data-col="Base">LFT, art. 15</td></tr>
          <tr><th scope="row">Afiliación a FONACOT</th><td data-col="Ante quién">Instituto FONACOT</td><td data-col="Cada cuándo">Una vez</td><td data-col="Base">LFT, art. 132, fr. XXVI Bis</td></tr>
        </tbody>
      </table>
    </div>`,
    includes: [
      ['Registro y renovación REPSE', 'Integración del expediente y seguimiento ante la STPS.'],
      ['Informativas ICSOE y SISUB', 'Presentación cada cuatrimestre, sin que se te pasen.'],
      ['Contratos de servicios especializados', 'Con los requisitos que pide la ley para que tu cliente pueda deducir.'],
      ['Gestoría patronal', 'Afiliación y trámites ante FONACOT.']
    ],
    stepsTitle: 'Cómo tramitamos tu REPSE',
    steps: [
      ['Revisamos si tu actividad es especializada', 'Diagnóstico'],
      ['Integramos el expediente fiscal, IMSS e INFONAVIT', 'Expediente'],
      ['Solicitamos el registro y atendemos requerimientos', 'STPS'],
      ['Llevamos tu calendario de informativas', 'Seguimiento']
    ],
    cta: 'Registro vigente e informativas al día',
    pics: [["centro-de-gobierno-sonora", "Centro de Gobierno del Estado de Sonora, en Hermosillo", "Centro de Gobierno de Sonora."], ["puerta-azul-centro-hermosillo", "Puertas de arco en una fachada azul del centro de Hermosillo", "Calle del centro de Hermosillo."], ["cerro-de-la-campana", "El Cerro de la Campana, Hermosillo", "Cerro de la Campana."]],
    faqTitle: "Preguntas sobre REPSE",
    faq,
    related: ['contratos-laborales', 'compliance-laboral', 'capacitacion-stps']
  });

  return {
    meta: {
      path: servicePath(s.slug),
      title: 'Registro REPSE, ICSOE y SISUB en Hermosillo | Resuelta',
      description: 'Registro y renovación REPSE en Hermosillo, informativas ICSOE ante el IMSS y SISUB ante el INFONAVIT, y afiliación a FONACOT para tu empresa.',
      trail: [['Inicio', '/'], ['Servicios', '/servicios/'], [s.name, servicePath(s.slug)]],
      faq,
      about: serviceNode(s)['@id'],
      schema: [serviceNode(s)]
    },
    body
  };
}
