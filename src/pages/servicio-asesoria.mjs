import { photo, serviceBySlug, serviceNode, servicePage } from '../lib.mjs';
import { servicePath, site } from '../site.mjs';

const s = serviceBySlug('asesoria-laboral');

const faq = [
  { q: '¿La asesoría puede ser remota?', a: 'Sí. La asesoría laboral para empresas puede ser remota, presencial o ambas, según lo que necesite tu equipo.' },
  { q: '¿En qué horario responden?', a: `${site.hours}, por WhatsApp, llamada o correo.` },
  { q: '¿Cuánto cuesta la asesoría laboral?', a: 'Depende del tamaño de tu empresa y de lo que necesites. Después del diagnóstico gratis te damos una propuesta por escrito, sin compromiso.' },
  { q: '¿Qué diferencia hay con mi abogado general?', a: 'Un abogado general atiende temas comerciales, civiles o corporativos. La asesoría laboral se enfoca en las decisiones del día a día con tu personal: contratar, sancionar, cambiar condiciones y despedir.' }
];

export default function () {
  const body = servicePage(s, {
    lead: 'La mayoría de los conflictos laborales empiezan con una decisión del día a día: una sanción, un cambio de horario, un permiso o una renuncia mal recibida. Con asesoría laboral, tu equipo de Recursos Humanos o dirección consulta antes de actuar, de forma remota o presencial.',
    photoAside: photo('puerta-azul-centro-hermosillo', 'Puerta de arco en una fachada azul del centro de Hermosillo', { sizes: '(min-width: 900px) 30vw, 100vw', pos: '82% 50%' }),
    situations: [
      'Tu empresa no tiene abogado laboral y las dudas las resuelve Recursos Humanos sola.',
      'Vas a sancionar, cambiar horarios o reducir personal.',
      'Tu contador o tu abogado general no atienden temas laborales.',
      'Quieres que tus mandos sepan qué no deben hacer.'
    ],
    block: `<div class="block__head" data-reveal>
      <h2 id="bloque" class="h2">Por evento o de forma continua</h2>
      <p>Dos maneras de trabajar. La propuesta exacta la recibes por escrito después del diagnóstico.</p>
    </div>
    <div class="plans" data-reveal>
      <div class="plan">
        <h3>Por evento</h3>
        <p>Para una duda puntual o una decisión concreta.</p>
        <ul><li>Consulta remota o presencial</li><li>Revisión de un documento o de un caso</li><li>Respuesta por escrito cuando hace falta</li></ul>
      </div>
      <div class="plan plan--main">
        <h3>Continua</h3>
        <p>Para empresas que toman decisiones laborales cada semana.</p>
        <ul><li>Un abogado laboral externo a la mano</li><li>Revisión previa de sanciones y bajas</li><li>Aviso cuando cambia la ley</li><li>Talleres para dirección, mandos y Recursos Humanos</li></ul>
      </div>
    </div>`,
    includes: [
      ['Consultas antes de actuar', 'Te decimos qué hacer y cómo dejarlo por escrito.'],
      ['Revisión de casos', 'Sanciones, cambios de condiciones, renuncias y bajas.'],
      ['Talleres ejecutivos', 'Prevención laboral para dirección, mandos medios y Recursos Humanos.'],
      ['Actualización legal', 'Qué cambia en la ley y cómo afecta a tu empresa.']
    ],
    stepsTitle: 'Cómo funciona la asesoría',
    steps: [
      ['Conocemos tu empresa y tu plantilla', 'Diagnóstico'],
      ['Abrimos un canal directo con Joel', 'WhatsApp o correo'],
      ['Consultas antes de decidir', 'Día a día'],
      ['Revisamos qué cambió en la ley y en tu empresa', 'Periódico']
    ],
    cta: 'Un abogado laboral antes de cada decisión',
    pics: [["firma-documento", "Mano que escribe en una libreta junto a una computadora", "Consulta antes de decidir."], ["vista-hermosillo", "Vista de Hermosillo con edificios y palmeras", "Hermosillo, Sonora."], ["atardecer-hermosillo", "Calle de Hermosillo al atardecer", "Hermosillo al atardecer."]],
    faqTitle: "Preguntas sobre asesoría",
    faq,
    related: ['compliance-laboral', 'despidos-finiquitos', 'contratos-laborales']
  });

  return {
    meta: {
      path: servicePath(s.slug),
      title: 'Asesoría Laboral para Empresas en Hermosillo | Resuelta',
      description: 'Asesoría laboral para empresas en Hermosillo, remota o presencial: consultas antes de sancionar, cambiar condiciones o despedir, y talleres de prevención.',
      trail: [['Inicio', '/'], ['Servicios', '/servicios/'], [s.name, servicePath(s.slug)]],
      faq,
      about: serviceNode(s)['@id'],
      schema: [serviceNode(s)]
    },
    body
  };
}
