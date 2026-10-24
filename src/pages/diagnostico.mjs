import { site, servicePath } from '../site.mjs';
import { breadcrumbs, faqText, ids, photo } from '../lib.mjs';
import { quiz } from '../quiz.mjs';

const faq = [
  { q: '¿Qué recibo?', a: 'Una respuesta de Joel por WhatsApp con lo que le falta a tu empresa, qué es urgente y por dónde empezar. Si quieres seguir, una propuesta por escrito.' },
  { q: '¿Tiene costo?', a: 'No. El diagnóstico laboral es gratis durante 2026 y no te compromete a contratar nada.' },
  { q: '¿Qué hacen con mis datos?', a: 'Solo los usamos para responderte y preparar tu diagnóstico. Lo explicamos en el <a href="/aviso-de-privacidad/">aviso de privacidad</a>.' },
  { q: '¿Y si es urgente?', a: `Si ya tienes un citatorio, una demanda o una inspección, no esperes al cuestionario: llama al <a href="${site.phoneHref}">${site.phoneDisplay}</a>.` }
];

export default function () {
  const body = `
<div class="wrap" style="padding-top: 24px">${breadcrumbs([['Inicio', '/'], ['Diagnóstico gratis', '/diagnostico/']])}</div>
${quiz({ headingTag: 'h1', id: 'diagnostico', title: 'Diagnóstico laboral gratis' })}

<section class="sec" aria-labelledby="dudas-t">
  <div class="wrap qa">
    <div class="side" data-reveal>
      <h2 id="dudas-t" class="h2">Antes de empezar</h2>
      <figure class="side__pic">${photo('calle-centro-hermosillo-cerro', 'Calle del centro de Hermosillo con el Cerro de la Campana al fondo', { sizes: '(min-width: 900px) 28vw, 100vw' })}<figcaption>Centro de Hermosillo.</figcaption></figure>
    </div>
    ${faqText(faq)}
  </div>
</section>

<section class="doors" aria-labelledby="leer-t">
  <h2 id="leer-t" class="h2">¿Prefieres leer primero?</h2>
  <div class="doors__pair" data-reveal>
    <a class="door" href="/servicios/">
      <figure>${photo('puerta-azul-centro-hermosillo', 'Puerta de arco en una fachada azul del centro de Hermosillo', { sizes: '(min-width: 600px) 22vw, 50vw', pos: '82% 50%' })}</figure>
      <span class="door__name">Quiero prevenir</span>
      <span class="door__line">Los seis servicios laborales para empresas.</span>
    </a>
    <a class="door" href="${servicePath('despidos-finiquitos')}">
      <figure>${photo('puerta-verde-centro-hermosillo', 'Puerta de arco en una fachada verde y rosa del centro de Hermosillo', { sizes: '(min-width: 600px) 22vw, 50vw', pos: '24% 50%' })}</figure>
      <span class="door__name">Ya tengo un problema</span>
      <span class="door__line">Despidos, finiquitos y conciliación.</span>
    </a>
  </div>
</section>

<section class="sec sec--tone" aria-labelledby="contacto-t">
  <div class="wrap contact" data-reveal>
    <div class="contact__line">
      <h2 id="contacto-t" class="h2">¿Prefieres hablar?</h2>
      <p class="statement" style="margin-top: 20px">Llámanos o escríbenos de lunes a viernes, de 8:00 a 15:00.</p>
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

  return {
    meta: {
      path: '/diagnostico/',
      title: 'Diagnóstico Laboral Gratis para Empresas | Resuelta',
      description: 'Diagnóstico laboral gratis para empresas en Hermosillo: siete preguntas y Joel Pérez te dice por WhatsApp qué le falta a tu empresa. Gratis durante 2026.',
      trail: [['Inicio', '/'], ['Diagnóstico gratis', '/diagnostico/']],
      faq,
      about: ids.org
    },
    body
  };
}
