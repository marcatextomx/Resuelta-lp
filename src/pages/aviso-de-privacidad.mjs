import { site } from '../site.mjs';
import { breadcrumbs } from '../lib.mjs';

// [PENDIENTE] Texto final revisado por Joel y razón social en site.mjs → legalName.
export default function () {
  const responsable = site.legalName
    ? `${site.legalName}, que opera con el nombre comercial Resuelta`
    : '<span class="pending">[Razón social pendiente]</span>, que opera con el nombre comercial Resuelta';
  const sections = [
    ['responsable', 'Responsable'],
    ['datos', 'Datos que recabamos'],
    ['finalidades', 'Para qué los usamos'],
    ['transferencias', 'Transferencias'],
    ['arco', 'Derechos ARCO'],
    ['cookies', 'Cookies'],
    ['cambios', 'Cambios a este aviso']
  ];
  const body = `
<div class="wrap doc">
  <nav class="doc__toc" aria-label="Secciones del aviso">
    <p>Contenido</p>
    ${sections.map(([id, t]) => `<a href="#${id}">${t}</a>`).join('\n    ')}
  </nav>
  <article class="doc__body">
    ${breadcrumbs([['Inicio', '/'], ['Aviso de privacidad', '/aviso-de-privacidad/']])}
    <h1 class="display">Aviso de privacidad de Resuelta</h1>
    <p class="lead" style="margin-top: 24px">Qué datos personales recaba Resuelta, abogados laborales para empresas en Hermosillo, para qué los usa y cómo ejercer tus derechos.</p>
    <p class="note">Última actualización: ${site.updatedDisplay}</p>
    <p>Este aviso explica qué datos personales recabamos a través de resuelta.mx, para qué los usamos y cómo puedes ejercer tus derechos, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>

    <h2 id="responsable">Responsable</h2>
    <p>${responsable}, con domicilio en ${site.addressDisplay}, es responsable del tratamiento de tus datos personales.</p>

    <h2 id="datos">Datos que recabamos</h2>
    <p>Cuando haces el diagnóstico o nos contactas por WhatsApp, teléfono o correo:</p>
    <ul>
      <li>Tu nombre y el número de WhatsApp desde el que nos escribes.</li>
      <li>El nombre de tu empresa, su giro y el número de personas que trabajan en ella.</li>
      <li>Tu puesto y el motivo de tu consulta.</li>
    </ul>
    <p>No pedimos datos personales sensibles en el sitio. El cuestionario no guarda tus respuestas en ningún servidor: arma un mensaje que tú envías por WhatsApp.</p>

    <h2 id="finalidades">Para qué los usamos</h2>
    <p><strong>Finalidades necesarias:</strong> responder tu solicitud, preparar tu diagnóstico laboral y darte seguimiento.</p>
    <p><strong>Finalidades adicionales:</strong> enviarte información sobre cambios en la ley laboral y sobre nuestros servicios. Puedes negarte en cualquier momento escribiendo a <a href="mailto:${site.email}">${site.email}</a>, sin que afecte la atención que te damos.</p>

    <h2 id="transferencias">Transferencias</h2>
    <p>No vendemos ni compartimos tus datos con terceros, salvo cuando una autoridad competente lo requiera o la ley lo permita.</p>

    <h2 id="arco">Derechos ARCO</h2>
    <p>Puedes acceder a tus datos, rectificarlos, cancelarlos u oponerte a su uso, y revocar tu consentimiento. Escribe a <a href="mailto:${site.email}">${site.email}</a> con tu nombre, el derecho que quieres ejercer y una copia de tu identificación, y te responderemos en los plazos que marca la ley.</p>

    <h2 id="cookies">Cookies</h2>
    <p>Este sitio no usa cookies propias. Las fuentes tipográficas se cargan desde Google Fonts. Si en el futuro usamos una herramienta de analítica, lo diremos aquí.</p>

    <h2 id="cambios">Cambios a este aviso</h2>
    <p>Publicaremos cualquier cambio en esta misma página, con su fecha de actualización.</p>
  </article>
</div>`;

  return {
    meta: {
      path: '/aviso-de-privacidad/',
      title: 'Aviso de Privacidad | Resuelta',
      description: 'Aviso de privacidad de Resuelta, abogados laborales para empresas en Hermosillo: qué datos recabamos, para qué los usamos y cómo ejercer tus derechos ARCO.',
      trail: [['Inicio', '/'], ['Aviso de privacidad', '/aviso-de-privacidad/']]
    },
    body
  };
}
