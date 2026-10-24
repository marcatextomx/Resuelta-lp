// Cuestionario de diagnóstico + comprobante que se llena con las respuestas.
// Sin JavaScript es un formulario normal; main.js lo convierte en una pregunta a la vez
// y arma el mensaje de WhatsApp.
import { site } from './site.mjs';
import { esc } from './lib.mjs';

export const questions = [
  { key: 'personas', label: 'Personas', title: '¿Cuántas personas trabajan en tu empresa?', options: ['Menos de 10', 'Entre 10 y 20', 'Entre 21 y 50', 'Entre 51 y 200', 'Más de 200'] },
  { key: 'puesto', label: 'Puesto', title: '¿Cuál es tu puesto en la empresa?', options: ['Dueño o socio', 'Director general', 'Recursos Humanos', 'Administración o contabilidad'] },
  { key: 'imss', label: 'IMSS', title: '¿Tu personal está dado de alta ante el IMSS?', options: ['Sí, todos', 'Solo una parte', 'Todavía no'] },
  { key: 'motivo', label: 'Motivo', title: '¿Qué te trae aquí?', options: ['Me llegó un citatorio o una demanda', 'Quiero despedir a alguien y hacerlo bien', 'Ya tuve un problema laboral y no quiero que se repita', 'Sé que mis contratos y documentos no están en orden', 'Solo estoy investigando por ahora'] },
  { key: 'cuando', label: 'Plazo', title: '¿Para cuándo necesitas resolverlo?', options: ['Es urgente, ya tengo el problema encima', 'En los próximos 30 días', 'En los próximos tres meses', 'Todavía no tengo fecha'] },
  { key: 'empresa', label: 'Empresa', title: '¿Cómo se llama tu empresa?', text: { autocomplete: 'organization', placeholder: 'Nombre comercial o razón social' } },
  { key: 'giro', label: 'Giro', title: '¿A qué se dedica tu empresa?', text: { autocomplete: 'off', placeholder: 'Ej. constructora, restaurante, seguridad privada' } }
];

function step(q, i) {
  if (q.text) {
    return `<div class="q step" data-key="${q.key}">
  <label for="q-${q.key}">${esc(q.title)}</label>
  <input class="field" id="q-${q.key}" name="${q.key}" type="text" autocomplete="${q.text.autocomplete}" placeholder="${esc(q.text.placeholder)}" required>
</div>`;
  }
  return `<fieldset class="q step" data-key="${q.key}">
  <legend>${esc(q.title)}</legend>
  ${q.options
    .map(
      (o, j) =>
        `<label class="opt"><input type="radio" name="${q.key}" value="${esc(o)}"${j === 0 ? ' required' : ''}><span>${esc(o)}</span><span class="opt__ring" aria-hidden="true"></span></label>`
    )
    .join('\n  ')}
</fieldset>`;
}

export function quiz({ headingTag = 'h2', id = 'diagnostico', title = 'Diagnóstico laboral gratis' } = {}) {
  const groups = [
    ['Tu empresa', ['empresa', 'giro', 'personas', 'imss']],
    ['Tu caso', ['motivo', 'cuando', 'puesto']],
    ['Contacto', ['nombre']]
  ];
  const labelOf = (k) => (k === 'nombre' ? 'Nombre' : questions.find((q) => q.key === k).label);
  return `<section class="sec sec--dark" id="${id}" aria-labelledby="${id}-t">
  <div class="wrap slip-grid">
    <div>
      <${headingTag} id="${id}-t" class="${headingTag === 'h1' ? 'display' : 'h2'}">${title}</${headingTag}>
      <p class="body-copy">Siete preguntas, menos de un minuto. Joel revisa tus respuestas y te escribe por WhatsApp. Gratis durante 2026.</p>
      <form class="quiz" action="${site.whatsapp}" method="get" data-quiz data-phone="526623188301">
        ${questions.map(step).join('\n')}
        <div class="q step" data-key="nombre">
          <label for="q-nombre">¿A quién le escribimos?</label>
          <input class="field" id="q-nombre" name="nombre" type="text" autocomplete="name" placeholder="Tu nombre" required>
          <label class="check"><input type="checkbox" name="acepto" required><span>Acepto el <a href="/aviso-de-privacidad/">aviso de privacidad</a>. WhatsApp nos mostrará tu número.</span></label>
        </div>
        <p class="quiz__error" aria-live="polite"></p>
        <div class="quiz__nav">
          <button class="link quiz__back no-js-hide" type="button" hidden>Atrás</button>
          <span class="quiz__count no-js-hide" aria-live="polite"></span>
          <button class="btn quiz__next no-js-hide" type="button" hidden>Siguiente</button>
          <button class="btn quiz__send" type="submit">Enviar por WhatsApp</button>
        </div>
        <div class="quiz__done" tabindex="-1" hidden>
          <h3>Listo. Se abrió WhatsApp con tus respuestas.</h3>
          <p>Joel las revisa y te escribe de lunes a viernes, de 8:00 a 15:00. Si WhatsApp no se abrió, <a class="quiz__retry" href="${site.whatsapp}">ábrelo aquí</a>.</p>
          <div class="urgent" hidden>
            <p>Si ya tienes un citatorio o una demanda, hay plazos corriendo. Llámanos ahora.</p>
            <a class="btn btn--quiet" href="${site.phoneHref}">Llamar al ${site.phoneDisplay}</a>
          </div>
          <div class="actions"><button class="link quiz__restart" type="button">Volver a empezar</button></div>
        </div>
      </form>
    </div>
    <aside class="slip slip--live" aria-label="Resumen de tu diagnóstico">
      <p class="slip__title">Diagnóstico laboral</p>
      <p class="slip__meta">Resuelta · Blvd. Paseo las Quintas 77A, Hermosillo</p>
      ${groups
        .map(
          ([g, keys]) => `<p class="slip__group">${g}</p>
      <ul>${keys
        .map((k) => `<li><span>${labelOf(k)}</span><span class="slip__dots" aria-hidden="true"></span><span data-slip="${k}">—</span></li>`)
        .join('')}</ul>`
        )
        .join('\n      ')}
      <ul><li class="slip__end"><span>Gratis durante 2026 · respuesta por WhatsApp</span></li></ul>
    </aside>
  </div>
</section>`;
}
