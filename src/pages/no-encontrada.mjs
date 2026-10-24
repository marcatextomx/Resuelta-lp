import { services, servicePath } from '../site.mjs';
import { esc, photo } from '../lib.mjs';

const dots = ['#015df7', '#e0387b', '#fec303', '#ff6b1a'];

export default function () {
  const body = `
<section class="sec">
  <div class="wrap rows-sec">
    <div class="rows-sec__text">
      <h1 class="display">Esta página no existe</h1>
      <p class="lead" style="margin-top: 28px">Puede que la dirección haya cambiado. Estos son los servicios laborales que más buscan las empresas en Hermosillo.</p>
      <ul class="rows" style="margin-top: 32px">
        ${services.map((s, i) => `<li><a href="${servicePath(s.slug)}"><span class="dot" style="--c: ${dots[i % 4]}"></span>${esc(s.long)}</a></li>`).join('\n        ')}
      </ul>
      <div class="actions" style="margin-top: 32px"><a class="btn" href="/">Ir al inicio</a><a class="link" href="/diagnostico/">Hacer diagnóstico gratis</a></div>
    </div>
    <figure class="rows-sec__pic">
      ${photo('puerta-verde-centro-hermosillo', 'Puertas de arco cerradas en una fachada verde y rosa del centro de Hermosillo', { sizes: '(min-width: 900px) 40vw, 100vw', pos: '24% 50%' })}
      <figcaption>Una puerta cerrada en el centro de Hermosillo.</figcaption>
    </figure>
  </div>
</section>`;

  return {
    meta: {
      path: '/404.html',
      file: '404.html',
      title: 'Página no encontrada | Resuelta',
      description: 'Esta página no existe. Ve a los servicios laborales para empresas de Resuelta en Hermosillo.',
      noindex: true
    },
    body
  };
}
