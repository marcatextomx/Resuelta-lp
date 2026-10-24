import { photo, serviceBySlug, serviceNode, servicePage } from '../lib.mjs';
import { servicePath } from '../site.mjs';

const s = serviceBySlug('contratos-laborales');

const faq = [
  { q: '¿Es obligatorio tener contrato por escrito?', a: 'Sí. La Ley Federal del Trabajo pide que las condiciones de trabajo consten por escrito (art. 24), y si falta el contrato la omisión se le imputa al patrón (art. 26). En un juicio, eso significa que tu empresa tiene que probar salario, jornada y antigüedad sin el documento que mejor lo probaría.' },
  { q: '¿Cuánto puede durar un periodo de prueba?', a: 'Hasta 30 días, o hasta 180 días para puestos de dirección, gerenciales, de confianza o técnicos y profesionales especializados (art. 39-A). Debe pactarse por escrito y solo aplica en relaciones por tiempo indeterminado o de más de 180 días.' },
  { q: '¿Sirve un contrato descargado de internet?', a: 'Rara vez protege. Un formato genérico no describe el puesto, la jornada ni el lugar reales, y no justifica por qué una relación es temporal. Si el contrato no coincide con la realidad, en un conflicto vale más lo que pasó que lo que dice el papel.' },
  { q: '¿Qué pasa si renuevo una y otra vez un contrato por tiempo determinado?', a: 'Si al vencer el término subsiste la materia del trabajo, la relación se prorroga mientras dure esa circunstancia (art. 39). Encadenar contratos temporales para un puesto permanente es uno de los errores que más terminan en demanda.' }
];

export default function () {
  const body = servicePage(s, {
    lead: 'Sin contrato por escrito, en un juicio tu empresa tiene que probar sin papeles el salario, la jornada y la antigüedad. Redactamos contratos individuales a la medida de cada puesto, convenios de confidencialidad y los formatos de alta, cambios y bajas.',
    photoAside: photo('firma-documento', 'Mano que escribe en una libreta junto a una computadora', { sizes: '(min-width: 900px) 30vw, 100vw', pos: '60% 50%' }),
    situations: [
      'Tu personal trabaja sin contrato firmado o con uno genérico.',
      'Vas a contratar y quieres un periodo de prueba válido.',
      'Un puesto maneja clientes, precios o información que no debe salir.',
      'Tus contratos no reflejan el salario, horario o puesto reales.'
    ],
    block: `<div class="block__head" data-reveal>
      <h2 id="bloque" class="h2">Tipos de contrato y cuándo usar cada uno</h2>
      <p>La ley presume que la relación es por tiempo indeterminado. Los demás tipos solo valen si el contrato explica por qué.</p>
    </div>
    <div class="data">
      <table>
        <thead><tr><th scope="col">Tipo</th><th scope="col">Cuándo se usa</th><th scope="col">Base en la LFT</th></tr></thead>
        <tbody>
          <tr><th scope="row">Tiempo indeterminado</th><td data-col="Cuándo">La regla general para puestos permanentes.</td><td data-col="Base">Art. 35</td></tr>
          <tr><th scope="row">Tiempo determinado</th><td data-col="Cuándo">Sustituir a alguien o cubrir una necesidad temporal que se pueda justificar.</td><td data-col="Base">Art. 37</td></tr>
          <tr><th scope="row">Obra determinada</th><td data-col="Cuándo">Un proyecto con inicio y fin claros.</td><td data-col="Base">Art. 36</td></tr>
          <tr><th scope="row">Periodo de prueba</th><td data-col="Cuándo">Verificar que la persona cumple con el puesto antes de la contratación definitiva.</td><td data-col="Base">Art. 39-A</td></tr>
          <tr><th scope="row">Capacitación inicial</th><td data-col="Cuándo">Formar a alguien para el puesto que va a ocupar.</td><td data-col="Base">Art. 39-B</td></tr>
          <tr><th scope="row">Por temporada</th><td data-col="Cuándo">Trabajos que se repiten en ciertas épocas del año.</td><td data-col="Base">Art. 39-F</td></tr>
        </tbody>
      </table>
    </div>`,
    includes: [
      ['Contrato individual por puesto', 'Funciones, salario, jornada, lugar de trabajo y prestaciones por escrito.'],
      ['Convenio de confidencialidad', 'Para puestos con acceso a clientes, precios o procesos.'],
      ['Formatos operativos', 'Alta, cambio de puesto o salario, permisos y baja.'],
      ['Revisión de lo que ya firmaste', 'Qué corregir en tus contratos actuales y en qué orden.']
    ],
    stepsTitle: 'Cómo trabajamos tus contratos',
    steps: [
      ['Revisamos tu plantilla y contratos', 'Diagnóstico'],
      ['Definimos el tipo de contrato por puesto', 'Plan'],
      ['Redactamos contratos y convenios', 'A la medida'],
      ['Te decimos cómo firmarlos y archivarlos', 'Entrega']
    ],
    cta: 'Cada persona con su contrato firmado',
    pics: [["palacio-de-gobierno-hermosillo", "Fachada blanca del Palacio de Gobierno de Hermosillo", "Palacio de Gobierno, Hermosillo."], ["puerta-verde-centro-hermosillo", "Puertas de arco en una fachada verde y rosa del centro de Hermosillo", "Calle del centro de Hermosillo."], ["cerro-de-la-campana", "El Cerro de la Campana, Hermosillo", "Cerro de la Campana."]],
    faqTitle: "Preguntas sobre contratos",
    faq,
    related: ['compliance-laboral', 'despidos-finiquitos', 'asesoria-laboral']
  });

  return {
    meta: {
      path: servicePath(s.slug),
      title: 'Contratos Laborales para Empresas en Hermosillo | Resuelta',
      description: 'Contratos laborales a la medida para empresas en Hermosillo: contrato individual por puesto, periodo de prueba, confidencialidad y formatos de alta y baja.',
      trail: [['Inicio', '/'], ['Servicios', '/servicios/'], [s.name, servicePath(s.slug)]],
      faq,
      about: serviceNode(s)['@id'],
      schema: [serviceNode(s)]
    },
    body
  };
}
