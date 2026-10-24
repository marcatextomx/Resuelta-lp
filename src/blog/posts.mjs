// Guías del blog. La más reciente va primero.
// reviewed: false → la firma dice "Resuelta"; true → agrega "Revisado por Lic. Joel Pérez" y reviewedBy en el schema.
// [PENDIENTE] Joel revisa cada guía y se cambia reviewed a true.

const LFT = 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf';

export const posts = [
  {
    slug: 'finiquito-o-liquidacion',
    title: 'Finiquito o liquidación: qué le toca pagar a tu empresa',
    h1: 'Finiquito o liquidación',
    dek: 'Qué le toca pagar a tu empresa en cada caso, cómo se calcula paso a paso y un ejemplo con números.',
    figure2: ['palacio-de-gobierno-hermosillo', 'Fachada blanca del Palacio de Gobierno de Hermosillo', 'Palacio de Gobierno, centro de Hermosillo.'],
    metaTitle: 'Finiquito o Liquidación: Qué Paga la Empresa | Resuelta',
    description: 'Diferencia entre finiquito y liquidación para empresas: qué conceptos se pagan, cómo se calculan paso a paso y un ejemplo con números. Con artículos de la LFT.',
    service: 'despidos-finiquitos',
    section: 'Despidos y finiquitos',
    keywords: ['finiquito', 'liquidación', 'despido injustificado', 'prima de antigüedad', 'cálculo de finiquito'],
    published: '2026-10-24',
    updated: '2026-10-24',
    reviewed: false,
    photo: ['firma-documento', 'Mano que escribe en una libreta junto a una computadora', 'Todo pago de salida debe quedar por escrito, concepto por concepto.'],
    summary:
      'El finiquito se paga siempre que termina la relación laboral: salarios pendientes, aguinaldo, vacaciones y prima vacacional proporcionales. La liquidación se suma solo cuando el despido es injustificado: tres meses de salario, prima de antigüedad y, en algunos casos, veinte días por año trabajado.',
    body: `
<h2 id="finiquito">¿Qué es el finiquito?</h2>
<p>El finiquito es el pago de lo que la empresa le debe al trabajador por el tiempo que ya trabajó. Se paga siempre que termina la relación laboral: por renuncia, por despido justificado o injustificado, o porque terminó un contrato temporal.</p>
<p>Incluye los salarios que falten por pagar, el aguinaldo proporcional (LFT, art. 87), las vacaciones que no haya disfrutado y su prima vacacional de al menos 25 % (arts. 76, 79 y 80). Si el trabajador renuncia con quince años o más de antigüedad, también le corresponde la prima de antigüedad (art. 162).</p>

<h2 id="liquidacion">¿Qué es la liquidación?</h2>
<p>La liquidación es la indemnización que la empresa paga cuando despide a alguien sin una causa justificada, o sin poder probarla. Se suma al finiquito; no lo sustituye.</p>
<p>Comprende tres meses de salario (arts. 48 y 50), la prima de antigüedad de doce días por año trabajado (art. 162) y, cuando la empresa se niega a reinstalar al trabajador en los casos que permite la ley, veinte días de salario por cada año de servicio (arts. 49 y 50). Si el asunto llega a juicio y la empresa lo pierde, también se suman salarios vencidos de hasta doce meses (art. 48).</p>

<h2 id="tabla">¿Qué se paga en cada caso?</h2>
<div class="data">
  <table>
    <thead><tr><th scope="col">Concepto</th><th scope="col">Finiquito</th><th scope="col">Liquidación</th><th scope="col">LFT</th></tr></thead>
    <tbody>
      <tr><th scope="row">Salarios pendientes</th><td data-col="Finiquito">Sí</td><td data-col="Liquidación">Sí</td><td data-col="LFT">Arts. 82 y 88</td></tr>
      <tr><th scope="row">Aguinaldo proporcional</th><td data-col="Finiquito">Sí</td><td data-col="Liquidación">Sí</td><td data-col="LFT">Art. 87</td></tr>
      <tr><th scope="row">Vacaciones y prima vacacional</th><td data-col="Finiquito">Sí</td><td data-col="Liquidación">Sí</td><td data-col="LFT">Arts. 76, 79 y 80</td></tr>
      <tr><th scope="row">Prima de antigüedad</th><td data-col="Finiquito">Si renuncia con 15 años o más</td><td data-col="Liquidación">Sí</td><td data-col="LFT">Art. 162</td></tr>
      <tr><th scope="row">Tres meses de salario</th><td data-col="Finiquito">No</td><td data-col="Liquidación">Sí</td><td data-col="LFT">Arts. 48 y 50</td></tr>
      <tr><th scope="row">Veinte días por año</th><td data-col="Finiquito">No</td><td data-col="Liquidación">Según el caso</td><td data-col="LFT">Arts. 49 y 50</td></tr>
    </tbody>
  </table>
</div>

<h2 id="injustificado">¿Cuándo un despido se considera injustificado?</h2>
<p>Cuando la empresa no tiene una de las causas que enumera el artículo 47 de la LFT, cuando no la puede probar o cuando no entrega al trabajador el aviso por escrito con la fecha y la causa del despido.</p>
<p>Ese aviso se entrega en persona o por medio del Centro de Conciliación. Sin él, la ley presume que la separación fue injustificada, aunque la causa existiera.</p>

<h2 id="calculo">¿Cómo se calcula, paso a paso?</h2>
<ol class="steps-list">
  <li><strong>Junta los datos.</strong> Salario diario, salario diario integrado, fecha de ingreso, fecha de salida y vacaciones pendientes de años anteriores.</li>
  <li><strong>Aguinaldo proporcional.</strong> Quince días de salario por año, en proporción a los días trabajados en el año en curso (art. 87).</li>
  <li><strong>Vacaciones proporcionales.</strong> Desde 2023 son doce días el primer año y aumentan dos por año hasta veinte en el quinto; a partir del sexto, dos días más por cada cinco años (art. 76). Se pagan en proporción al año en curso, más las que no se hayan disfrutado.</li>
  <li><strong>Prima vacacional.</strong> Al menos 25 % sobre el pago de vacaciones (art. 80).</li>
  <li><strong>Si el despido es injustificado.</strong> Suma noventa días de salario, la prima de antigüedad (doce días por año, con el salario topado al doble del mínimo, arts. 162, 485 y 486) y, si aplica, veinte días por año.</li>
</ol>
<p>La indemnización se calcula con el salario diario integrado, que incluye las prestaciones además del salario base (arts. 84 y 89). Lo que recibe el trabajador puede estar sujeto a retención de ISR.</p>

<h2 id="ejemplo">Ejemplo con números</h2>
<p>Una persona con salario diario de $500 entró el 1 de enero de 2023 y sale el 30 de junio de 2026: tres años y medio de antigüedad, sin vacaciones pendientes de años anteriores. Para simplificar, se usa el mismo salario como base e integrado y no se calcula el ISR.</p>
<div class="calc" data-reveal>
  <ol class="slip">
    <li class="slip__group-row"><span>Finiquito</span></li>
    <li><span>Aguinaldo proporcional (15 × 181/365 días)</span><span class="slip__dots" aria-hidden="true"></span><span>$3,719</span></li>
    <li><span>Vacaciones proporcionales (18 días × ½ año)</span><span class="slip__dots" aria-hidden="true"></span><span>$4,500</span></li>
    <li><span>Prima vacacional (25 %)</span><span class="slip__dots" aria-hidden="true"></span><span>$1,125</span></li>
    <li class="slip__total"><span>Total del finiquito</span><span class="slip__dots" aria-hidden="true"></span><span>$9,344</span></li>
    <li class="slip__group-row"><span>Si el despido fuera injustificado, se suman</span></li>
    <li><span>Tres meses de salario (90 días)</span><span class="slip__dots" aria-hidden="true"></span><span>$45,000</span></li>
    <li><span>Prima de antigüedad (12 días × 3.5 años)</span><span class="slip__dots" aria-hidden="true"></span><span>$21,000</span></li>
    <li class="slip__end"><span>Total con liquidación: $75,344</span></li>
  </ol>
</div>
<p class="note">Ejemplo ilustrativo. Cada caso cambia según el contrato, las prestaciones y la causa de la salida. El tope de la prima de antigüedad no aplica aquí porque $500 está por debajo del doble del salario mínimo.</p>

<h2 id="convenio">¿Cómo se cierra la salida sin riesgo?</h2>
<p>Con un convenio por escrito que detalle cada concepto pagado. Para que tenga plena validez, el convenio de terminación debe ratificarse ante el Centro de Conciliación o el Tribunal laboral (art. 33). Un recibo firmado en la empresa no impide que después se reclame.</p>
<p>Si la salida es por despido, prepara antes el aviso por escrito y las pruebas de la causa. Si es por mutuo acuerdo, cierra el convenio y ratifícalo.</p>`,
    faq: [
      { q: '¿El finiquito se paga aunque el trabajador renuncie?', a: 'Sí. El finiquito es lo que ya se ganó: salarios pendientes, aguinaldo, vacaciones y prima vacacional proporcionales. Se paga en cualquier forma de terminación, incluida la renuncia.' },
      { q: '¿La prima de antigüedad se paga en una renuncia?', a: 'Solo si el trabajador tiene quince años o más de antigüedad (LFT, art. 162). En un despido se paga siempre, sin importar los años trabajados.' },
      { q: '¿Cuánto tiempo tiene el trabajador para reclamar un despido?', a: 'Dos meses a partir del día siguiente al despido (LFT, art. 518). Antes de demandar debe pasar por la conciliación ante el Centro de Conciliación.' },
      { q: '¿Qué pasa si no hay contrato por escrito?', a: 'La falta de contrato se le imputa al patrón (LFT, art. 26). En un conflicto, la empresa tendrá que probar sin el documento el salario, la jornada y la antigüedad.' }
    ],
    sources: [
      ['Ley Federal del Trabajo, arts. 26, 33, 47 a 50, 76, 79, 80, 84, 87, 89, 162, 485, 486 y 518', LFT, 'Cámara de Diputados']
    ],
    related: ['repse-quien-lo-necesita']
  },
  {
    slug: 'repse-quien-lo-necesita',
    title: 'Registro REPSE: quién lo necesita y qué obligaciones trae',
    h1: 'Quién necesita el REPSE',
    dek: 'Qué es el registro de servicios especializados, qué empresas deben tenerlo, qué obligaciones trae y qué pasa si no te registras.',
    figure2: ['puerta-azul-centro-hermosillo', 'Puertas de arco en una fachada azul del centro de Hermosillo', 'Calle del centro de Hermosillo.'],
    metaTitle: 'Registro REPSE: Quién lo Necesita y Obligaciones | Resuelta',
    description: 'Qué es el REPSE, qué empresas deben registrarse, qué obligaciones trae (ICSOE, SISUB, renovación) y qué pasa si no te registras. Con artículos de la ley.',
    service: 'repse',
    section: 'REPSE',
    keywords: ['REPSE', 'servicios especializados', 'ICSOE', 'SISUB', 'subcontratación'],
    published: '2026-10-24',
    updated: '2026-10-24',
    reviewed: false,
    photo: ['centro-de-gobierno-sonora', 'Centro de Gobierno del Estado de Sonora, en Hermosillo', 'Centro de Gobierno del Estado de Sonora, en Hermosillo.'],
    summary:
      'El REPSE es el padrón de la STPS donde deben registrarse las empresas que prestan servicios u obras especializadas con su propio personal a un cliente. Sin registro, el cliente no puede deducir esos pagos ni acreditar su IVA. El registro dura tres años y obliga a presentar informativas cada cuatro meses.',
    body: `
<h2 id="que-es">¿Qué es el REPSE?</h2>
<p>Es el Registro de Prestadoras de Servicios Especializados u Obras Especializadas, a cargo de la Secretaría del Trabajo y Previsión Social. Nació con la reforma de 2021 que prohibió la subcontratación de personal (LFT, art. 12) y dejó permitidos solo los servicios y las obras especializadas (art. 13).</p>

<h2 id="especializado">¿Qué es un servicio especializado?</h2>
<p>Es un servicio u obra que no forma parte del objeto social ni de la actividad económica preponderante de la empresa que lo contrata (LFT, art. 13).</p>
<p>Por ejemplo, un despacho contable que contrata a otra empresa para la limpieza de sus oficinas recibe un servicio especializado: limpiar no es su actividad. En cambio, una empresa no puede contratar a otra para que le ponga personal en su actividad principal; eso es subcontratación de personal y está prohibido.</p>

<h2 id="quien">¿Quién necesita registrarse?</h2>
<ul class="ticks">
  <li>Empresas de seguridad privada, limpieza o mantenimiento que trabajan en instalaciones de sus clientes.</li>
  <li>Contratistas que ejecutan obras especializadas para otra empresa.</li>
  <li>Personas físicas o morales que ponen a su personal a disposición de un cliente para un servicio especializado (art. 15).</li>
</ul>

<h2 id="obligaciones">¿Qué obligaciones trae?</h2>
<div class="data">
  <table>
    <thead><tr><th scope="col">Obligación</th><th scope="col">Ante quién</th><th scope="col">Cada cuándo</th><th scope="col">Base legal</th></tr></thead>
    <tbody>
      <tr><th scope="row">Registro en el padrón REPSE</th><td data-col="Ante quién">STPS</td><td data-col="Cada cuándo">Renovación cada tres años</td><td data-col="Base">LFT, art. 15</td></tr>
      <tr><th scope="row">Informativa ICSOE</th><td data-col="Ante quién">IMSS</td><td data-col="Cada cuándo">Cada cuatro meses</td><td data-col="Base">LSS, art. 15-A</td></tr>
      <tr><th scope="row">Informativa SISUB</th><td data-col="Ante quién">INFONAVIT</td><td data-col="Cada cuándo">Cada cuatro meses</td><td data-col="Base">Ley del INFONAVIT, art. 29 Bis</td></tr>
      <tr><th scope="row">Contrato con el cliente</th><td data-col="Ante quién">Con tu cliente, con número REPSE</td><td data-col="Cada cuándo">Por cada contrato</td><td data-col="Base">LFT, art. 15</td></tr>
    </tbody>
  </table>
</div>

<h2 id="sin-registro">¿Qué pasa si no te registras?</h2>
<p>La empresa se expone a multas de la STPS (LFT, arts. 1004-A y 1004-C). Además, el cliente que te paga no puede deducir esos pagos ni acreditar el IVA de tus facturas, así que muchos clientes piden el número de registro antes de firmar o de pagar.</p>

<h2 id="tramite">¿Cómo se tramita?</h2>
<ol class="steps-list">
  <li><strong>Revisa tu actividad.</strong> Confirma que el servicio es especializado frente a la actividad de tus clientes.</li>
  <li><strong>Ponte al corriente.</strong> Opinión de cumplimiento positiva ante el SAT, el IMSS y el INFONAVIT.</li>
  <li><strong>Solicita el registro.</strong> En la <a href="https://repse.stps.gob.mx">plataforma REPSE de la STPS</a>, con la acreditación de tu objeto social y del servicio especializado.</li>
  <li><strong>Lleva el calendario.</strong> Informativas cada cuatro meses y renovación antes de que venzan los tres años.</li>
</ol>`,
    faq: [
      { q: '¿Una persona física puede registrarse en el REPSE?', a: 'Sí. El registro es para personas físicas o morales que prestan servicios u obras especializadas (LFT, art. 15).' },
      { q: '¿Cada cuánto se presentan el ICSOE y el SISUB?', a: 'Cada cuatro meses: el ICSOE ante el IMSS y el SISUB ante el INFONAVIT. Te conviene llevar un calendario para no dejar pasar ninguno.' },
      { q: '¿Cuánto dura el registro?', a: 'Tres años. La renovación se solicita antes de que venza para no quedar sin registro mientras sigues prestando el servicio.' },
      { q: '¿Qué pasa si mi cliente me pide el número de REPSE y no lo tengo?', a: 'Sin registro, tu cliente no puede deducir tus facturas ni acreditar su IVA. Lo más seguro es tramitarlo antes de firmar o renovar el contrato.' }
    ],
    sources: [
      ['Ley Federal del Trabajo, arts. 12, 13, 15, 1004-A y 1004-C', LFT, 'Cámara de Diputados'],
      ['Plataforma REPSE', 'https://repse.stps.gob.mx', 'Secretaría del Trabajo y Previsión Social']
    ],
    related: ['finiquito-o-liquidacion']
  }
];
