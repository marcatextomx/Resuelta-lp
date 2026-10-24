import { photo, serviceBySlug, serviceNode, servicePage } from '../lib.mjs';
import { servicePath } from '../site.mjs';

const s = serviceBySlug('despidos-finiquitos');

const faq = [
  { q: '¿Cuánto tiempo tiene un trabajador para demandar por despido?', a: 'Dos meses a partir del día siguiente al despido (LFT, art. 518). Antes de demandar debe pasar por la conciliación, así que lo normal es que el primer aviso que recibas sea un citatorio del Centro de Conciliación.' },
  { q: '¿Es obligatoria la conciliación antes de una demanda?', a: 'Sí, salvo excepciones como los casos de discriminación, acoso u hostigamiento sexual (LFT, art. 685 Ter). En Sonora se lleva ante el Centro de Conciliación Laboral del estado. Si la empresa no asiste a la audiencia, recibe una multa y el trabajador queda libre para demandar.' },
  { q: '¿Puedo despedir sin pagar liquidación?', a: 'Solo con una causa justificada de las que enumera el artículo 47 de la LFT, que puedas probar, y entregando al trabajador el aviso por escrito con la fecha y la causa. Sin ese aviso, el despido se considera injustificado.' },
  { q: '¿Qué son los salarios vencidos?', a: 'Son los salarios que la empresa debe pagar desde el despido mientras dura el juicio, si lo pierde. La ley los limita a doce meses (LFT, art. 48); después corren intereses sobre quince meses de salario.' }
];

export default function () {
  const body = servicePage(s, {
    lead: 'Un despido mal hecho puede costarle a tu empresa la indemnización, salarios vencidos de hasta doce meses y un juicio. Calculamos el finiquito o la liquidación exacta, redactamos el convenio de salida y te representamos en la conciliación ante el Centro de Conciliación Laboral de Sonora.',
    photoAside: photo('calle-centro-hermosillo-cerro', 'Calle del centro de Hermosillo con el Cerro de la Campana al fondo', { sizes: '(min-width: 900px) 30vw, 100vw' }),
    situations: [
      'Vas a despedir a alguien y quieres saber si hay causa justificada.',
      'Un trabajador renunció y necesitas calcular su finiquito.',
      'Te llegó un citatorio del Centro de Conciliación.',
      'Quieres cerrar una salida con convenio y sin juicio.'
    ],
    block: `<div class="block__head" data-reveal>
      <h2 id="bloque" class="h2">Finiquito o liquidación: qué se paga</h2>
      <p>El finiquito se paga siempre que termina la relación laboral. La liquidación se suma cuando el despido es injustificado.</p>
    </div>
    <div class="data">
      <table>
        <thead><tr><th scope="col">Concepto</th><th scope="col">Finiquito</th><th scope="col">Liquidación</th><th scope="col">Base en la LFT</th></tr></thead>
        <tbody>
          <tr><th scope="row">Salarios pendientes</th><td data-col="Finiquito">Sí</td><td data-col="Liquidación">Sí</td><td data-col="Base">Arts. 82 y 88</td></tr>
          <tr><th scope="row">Aguinaldo proporcional</th><td data-col="Finiquito">Sí</td><td data-col="Liquidación">Sí</td><td data-col="Base">Art. 87</td></tr>
          <tr><th scope="row">Vacaciones y prima vacacional proporcionales</th><td data-col="Finiquito">Sí</td><td data-col="Liquidación">Sí</td><td data-col="Base">Arts. 76, 79 y 80</td></tr>
          <tr><th scope="row">Prima de antigüedad</th><td data-col="Finiquito">Si renuncia con 15 años o más</td><td data-col="Liquidación">Sí</td><td data-col="Base">Art. 162</td></tr>
          <tr><th scope="row">Indemnización de tres meses</th><td data-col="Finiquito">No</td><td data-col="Liquidación">Sí</td><td data-col="Base">Arts. 48 y 50</td></tr>
          <tr><th scope="row">Veinte días por año trabajado</th><td data-col="Finiquito">No</td><td data-col="Liquidación">Según el caso</td><td data-col="Base">Arts. 49 y 50</td></tr>
        </tbody>
      </table>
    </div>`,
    includes: [
      ['Cálculo de finiquito o liquidación', 'Con desglose por concepto y la base legal de cada uno.'],
      ['Revisión de la causa de despido', 'Si hay causa justificada, qué pruebas necesitas y cómo dar el aviso por escrito.'],
      ['Convenio de salida', 'Redactado para que la terminación quede cerrada.'],
      ['Representación en conciliación', 'Ante el Centro de Conciliación, y en juicio si no hay acuerdo.']
    ],
    stepsTitle: 'Cómo trabajamos un despido',
    steps: [
      ['Nos cuentas el caso: contrato, antigüedad y salario', 'Hoy'],
      ['Te decimos el riesgo de cada camino', 'Análisis'],
      ['Preparamos aviso, cálculo y convenio', 'Documentos'],
      ['Cerramos la salida o vamos a conciliación', 'Cierre']
    ],
    cta: 'Una salida cerrada, por escrito',
    pics: [["palacio-de-gobierno-hermosillo", "Fachada blanca del Palacio de Gobierno de Hermosillo", "Palacio de Gobierno, Hermosillo."], ["atardecer-hermosillo", "Calle de Hermosillo al atardecer", "Hermosillo al atardecer."], ["firma-documento", "Mano que escribe en una libreta junto a una computadora", "Todo acuerdo de salida, por escrito."]],
    faqTitle: "Preguntas sobre despidos",
    faq,
    related: ['contratos-laborales', 'compliance-laboral', 'asesoria-laboral']
  });

  return {
    meta: {
      path: servicePath(s.slug),
      title: 'Despidos, Finiquitos y Conciliación en Hermosillo | Resuelta',
      description: 'Cómo despedir a un trabajador legalmente en Hermosillo: cálculo de finiquito o liquidación, convenio de salida y conciliación ante el Centro de Conciliación.',
      trail: [['Inicio', '/'], ['Servicios', '/servicios/'], [s.name, servicePath(s.slug)]],
      faq,
      about: serviceNode(s)['@id'],
      schema: [serviceNode(s)]
    },
    body
  };
}
