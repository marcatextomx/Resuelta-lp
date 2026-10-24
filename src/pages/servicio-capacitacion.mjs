import { photo, serviceBySlug, serviceNode, servicePage } from '../lib.mjs';
import { servicePath, site } from '../site.mjs';

const s = serviceBySlug('capacitacion-stps');

const faq = [
  { q: '¿Qué hago si llega un inspector de la STPS?', a: 'Pide su credencial y la orden de inspección por escrito, y revisa que la orden traiga el nombre de tu empresa y lo que se va a revisar. Designa a una persona para atenderlo, no firmes el acta sin leerla y anota tus observaciones en ella. Y llámanos antes de entregar documentos.' },
  { q: '¿Qué es la constancia DC-3?', a: 'Es la constancia de competencias o de habilidades laborales que se entrega al trabajador que acredita un curso de capacitación. Se conserva en el expediente de cada persona y es la forma más directa de probar ante la STPS que capacitas a tu personal.' },
  { q: '¿De cuánto pueden ser las multas de la STPS?', a: 'La Ley Federal del Trabajo fija las multas en Unidades de Medida y Actualización (UMA) según la obligación incumplida (arts. 992 a 1010), y se calculan por cada infracción. Por eso un expediente incompleto puede sumar varias multas en una sola visita.' },
  { q: '¿La capacitación en línea cuenta?', a: 'Sí, siempre que forme parte de tus planes y programas de capacitación y quede constancia de que el trabajador la acreditó.' }
];

export default function () {
  const body = servicePage(s, {
    lead: 'En una inspección, la STPS revisa que puedas probar con documentos que capacitas a tu personal y que cumples las normas de tu giro. Armamos tus planes y programas de capacitación, emitimos las constancias y te acompañamos antes, durante y después de la visita.',
    photoAside: photo('atardecer-hermosillo', 'Calle de Hermosillo al atardecer', { sizes: '(min-width: 900px) 30vw, 100vw', pos: '45% 50%' }),
    situations: [
      'Te llegó un aviso o una orden de inspección de la STPS.',
      'Capacitas a tu personal pero no tienes cómo probarlo.',
      'Un cliente grande te pide constancias de capacitación.',
      'Tuviste un accidente de trabajo y temes una revisión.'
    ],
    block: `<div class="block__head" data-reveal>
      <h2 id="bloque" class="h2">Qué suele revisar un inspector de la STPS</h2>
      <p>La lista exacta depende del tipo de inspección y de tu giro. Estos son los documentos que más se piden.</p>
    </div>
    <ul class="checklist" data-reveal>
      <li>Contratos individuales de trabajo firmados</li>
      <li>Reglamento Interior de Trabajo depositado</li>
      <li>Actas de las comisiones mixtas</li>
      <li>Planes y programas de capacitación</li>
      <li>Constancias de habilidades (DC-3)</li>
      <li>Evidencia de cumplimiento de la NOM-035</li>
      <li>Protocolo contra hostigamiento y acoso</li>
      <li>Recibos de nómina y control de asistencia</li>
      <li>Normas de seguridad que aplican a tu giro</li>
      <li>Estudios de riesgo, cuando apliquen</li>
    </ul>`,
    includes: [
      ['Planes y programas de capacitación', 'Diseñados para tu plantilla y tus puestos.'],
      ['Constancias de habilidades', 'Emisión y archivo de la DC-3 de cada trabajador.'],
      ['Revisión antes de la inspección', 'Qué te van a pedir y qué te falta.'],
      ['Acompañamiento el día de la visita', 'Y respuesta a lo que el inspector deje asentado.']
    ],
    stepsTitle: 'Cómo te preparamos para una inspección',
    steps: [
      ['Revisamos tus documentos contra lo que pide la STPS', 'Diagnóstico'],
      ['Ordenamos qué corregir primero', 'Plan'],
      ['Capacitación y constancias', 'Evidencia'],
      ['Te acompañamos el día de la visita', 'Inspección']
    ],
    cta: 'Un expediente listo para la próxima visita',
    pics: [["centro-de-gobierno-sonora", "Centro de Gobierno del Estado de Sonora, en Hermosillo", "Centro de Gobierno de Sonora."], ["vista-hermosillo", "Vista de Hermosillo con edificios y palmeras", "Hermosillo, Sonora."], ["puerta-verde-centro-hermosillo", "Puertas de arco en una fachada verde y rosa del centro de Hermosillo", "Calle del centro de Hermosillo."]],
    faqTitle: "Preguntas sobre la STPS",
    faq,
    related: ['compliance-laboral', 'contratos-laborales', 'repse']
  });

  return {
    meta: {
      path: servicePath(s.slug),
      title: 'Capacitación STPS e Inspecciones en Hermosillo | Resuelta',
      description: 'Prepárate para una inspección de la STPS en Hermosillo: planes y programas de capacitación, constancias DC-3 y acompañamiento el día de la visita.',
      trail: [['Inicio', '/'], ['Servicios', '/servicios/'], [s.name, servicePath(s.slug)]],
      faq,
      about: serviceNode(s)['@id'],
      schema: [serviceNode(s)]
    },
    body
  };
}
