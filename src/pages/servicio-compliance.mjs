import { photo, serviceBySlug, serviceNode, servicePage } from '../lib.mjs';
import { servicePath } from '../site.mjs';

const s = serviceBySlug('compliance-laboral');

const faq = [
  { q: '¿Es obligatorio el Reglamento Interior de Trabajo?', a: 'La Ley Federal del Trabajo regula cómo se elabora, qué contiene y cómo se deposita (arts. 422 a 425). En la práctica, sin un reglamento depositado las sanciones que aplicas son mucho más fáciles de impugnar, por eso lo recomendamos a toda empresa con personal.' },
  { q: '¿Cómo se deposita el reglamento ante el CFCRL?', a: 'Lo formula una comisión mixta de representantes de la empresa y de los trabajadores. Una vez firmado, cualquiera de las partes lo deposita ante el Centro Federal de Conciliación y Registro Laboral dentro de los ocho días siguientes (art. 424). Después hay que difundirlo entre el personal.' },
  { q: '¿Qué empresas deben cumplir la NOM-035?', a: 'Todas las que tienen trabajadores. Lo que cambia es el alcance: con hasta 15 personas basta la política y la atención a eventos traumáticos; de 16 a 50 se suma la identificación de factores de riesgo psicosocial; con más de 50 también se evalúa el entorno organizacional.' },
  { q: '¿Qué pasa si no tengo comisiones mixtas?', a: 'Es de lo primero que revisa un inspector de la STPS. Sin las actas de instalación y de sus sesiones, la empresa no puede probar que cumple, y cada omisión puede convertirse en una multa.' }
];

export default function () {
  const body = servicePage(s, {
    lead: 'El compliance laboral es tener por escrito, firmado y funcionando lo que la ley pide dentro de tu empresa: el Reglamento Interior de Trabajo depositado ante el CFCRL, las comisiones mixtas con sus actas, el protocolo contra hostigamiento y acoso y la política de la NOM-035.',
    photoAside: photo('centro-de-gobierno-sonora', 'Centro de Gobierno del Estado de Sonora, en Hermosillo', { sizes: '(min-width: 900px) 30vw, 100vw', pos: '30% 50%' }),
    situations: [
      'No tienes reglamento interior, o el que tienes nunca se depositó.',
      'Sancionas faltas sin un documento que lo respalde.',
      'No sabes si tus comisiones mixtas existen o tienen actas.',
      'Un cliente, un auditor o la STPS te pidió tus protocolos.'
    ],
    block: `<div class="block__head" data-reveal>
      <h2 id="bloque" class="h2">Documentos de compliance que pide la ley</h2>
      <p>Algunos aplican a toda empresa con trabajadores; otros dependen del tamaño o de la actividad. El diagnóstico te dice cuáles te tocan.</p>
    </div>
    <div class="data">
      <table>
        <thead><tr><th scope="col">Documento</th><th scope="col">Para qué sirve</th><th scope="col">Dónde queda</th><th scope="col">Base legal</th></tr></thead>
        <tbody>
          <tr><th scope="row">Reglamento Interior de Trabajo</th><td data-col="Para qué">Horarios, disciplina y sanciones que sí puedes aplicar.</td><td data-col="Dónde">Depósito ante el CFCRL</td><td data-col="Base">LFT, arts. 422 a 425</td></tr>
          <tr><th scope="row">Comisión Mixta de Seguridad e Higiene</th><td data-col="Para qué">Detectar y prevenir riesgos de trabajo.</td><td data-col="Dónde">Actas internas</td><td data-col="Base">LFT, art. 509 · NOM-019-STPS</td></tr>
          <tr><th scope="row">Comisión Mixta de Capacitación</th><td data-col="Para qué">Vigilar los planes de capacitación.</td><td data-col="Dónde">Actas internas</td><td data-col="Base">LFT, art. 153-E</td></tr>
          <tr><th scope="row">Comisión Mixta de PTU</th><td data-col="Para qué">Repartir utilidades a los trabajadores.</td><td data-col="Dónde">Actas internas</td><td data-col="Base">LFT, art. 125</td></tr>
          <tr><th scope="row">Política de la NOM-035</th><td data-col="Para qué">Identificar y prevenir riesgos psicosociales.</td><td data-col="Dónde">Evidencia interna</td><td data-col="Base">NOM-035-STPS-2018</td></tr>
          <tr><th scope="row">Protocolo contra hostigamiento y acoso</th><td data-col="Para qué">Prevenir y atender la violencia laboral.</td><td data-col="Dónde">Documento interno</td><td data-col="Base">LFT, art. 132, fr. XXXI</td></tr>
        </tbody>
      </table>
    </div>`,
    includes: [
      ['Reglamento Interior de Trabajo', 'Redacción a la medida y depósito ante el CFCRL.'],
      ['Comisiones mixtas', 'Integración, actas de instalación y calendario de sesiones.'],
      ['Protocolos obligatorios', 'Hostigamiento y acoso, NOM-035 y los que apliquen a tu giro.'],
      ['Capacitación a tu equipo', 'Para que mandos y Recursos Humanos los apliquen en el día a día.']
    ],
    stepsTitle: 'Cómo implementamos el compliance',
    steps: [
      ['Auditamos qué tienes y qué te toca', 'Diagnóstico'],
      ['Redactamos reglamento, protocolos y actas', 'A la medida'],
      ['Depositamos e instalamos comisiones', 'Registro'],
      ['Te avisamos de sesiones y cambios de ley', 'Seguimiento']
    ],
    cta: 'Reglamento, comisiones y protocolos al día',
    pics: [["palacio-de-gobierno-hermosillo", "Fachada blanca del Palacio de Gobierno de Hermosillo", "Palacio de Gobierno, Hermosillo."], ["calle-centro-hermosillo-cerro", "Calle del centro de Hermosillo con el Cerro de la Campana al fondo", "Centro de Hermosillo."], ["puerta-azul-centro-hermosillo", "Puertas de arco en una fachada azul del centro de Hermosillo", "Calle del centro de Hermosillo."]],
    faqTitle: "Preguntas sobre compliance",
    faq,
    related: ['capacitacion-stps', 'contratos-laborales', 'asesoria-laboral']
  });

  return {
    meta: {
      path: servicePath(s.slug),
      title: 'Compliance Laboral para Empresas en Hermosillo | Resuelta',
      description: 'Compliance laboral en Hermosillo: Reglamento Interior de Trabajo ante el CFCRL, comisiones mixtas, NOM-035 y protocolo contra hostigamiento y acoso.',
      trail: [['Inicio', '/'], ['Servicios', '/servicios/'], [s.name, servicePath(s.slug)]],
      faq,
      about: serviceNode(s)['@id'],
      schema: [serviceNode(s)]
    },
    body
  };
}
