# resuelta.mx · sitio estático

HTML estático generado con un script de Node sin dependencias. Todo el contenido, el schema y el FAQ salen en el HTML desde el servidor: nada depende de JavaScript para leerse.

## Comandos

```bash
node build.mjs          # genera dist/
node serve.mjs 4321     # revisa dist/ en http://localhost:4321 (URLs limpias y 404 como en Firebase)
node tools/check.mjs    # revisa enlaces, h1, títulos, imágenes y JSON-LD
firebase deploy --only hosting
```

Publicación: al hacer merge a `main`, GitHub Actions (`.github/workflows/deploy.yml`) compila con `npm run build` y publica `dist/` en Firebase Hosting, proyecto `resuelta-d4663` (resuelta.mx). Un pull request a `main` genera una vista previa en un canal temporal de Firebase.

## Estructura

| Ruta | Qué es |
| --- | --- |
| `src/site.mjs` | Datos únicos: nombre, dirección, teléfono, horario, servicios. Cambiar aquí cambia todo el sitio y el schema. |
| `src/lib.mjs` | Fotos, FAQ, migas de pan, cubo del logo, nodo `Service` y la plantilla de página de servicio. |
| `src/quiz.mjs` | Cuestionario de diagnóstico (7 preguntas + contacto) y comprobante que se llena con las respuestas. |
| `src/pages/*.mjs` | Una página por archivo: `meta` (título, descripción, ruta, FAQ, schema) y `body`. |
| `src/blog/posts.mjs` | Las guías del blog: título, H1, resumen citable, cuerpo, FAQ, fuentes y fechas. Agregar una guía = agregar un objeto. |
| `src/pages/blog.mjs` | Índice `/blog/` y la página de cada guía (schema `Blog`, `BlogPosting`, `FAQPage`). |
| `src/static/` | `styles.css`, `main.js`, `robots.txt`, fotos en `img/`, `og.png`, `logo.png`. |
| `build.mjs` | Layout, schema `@graph`, `sitemap.xml`, `llms.txt`, `favicon.svg`. |
| `assets/` | Fotos originales y `credits.json` con licencia y autor de cada una. |
| `firebase.json` | `cleanUrls`, barra final, 404 real, caché y encabezados de seguridad. |

## URLs

`/` · `/servicios/` · `/servicios/contratos-laborales/` · `/servicios/compliance-laboral/` · `/servicios/capacitacion-stps/` · `/servicios/despidos-finiquitos/` · `/servicios/repse/` · `/servicios/asesoria-laboral/` · `/nosotros/joel-perez/` · `/diagnostico/` · `/blog/` · `/blog/<guía>/` · `/aviso-de-privacidad/` · `404.html` · `/blog/feed.xml` (RSS)

## Schema

Cada página publica un `@graph` con `LegalService` (un solo `@id` para todo el sitio), `WebSite`, la página (`WebPage`, `CollectionPage` o `ProfilePage`), `BreadcrumbList` y, donde aplica, `Service`, `Person` y `FAQPage`. Las preguntas del `FAQPage` se generan del mismo arreglo que el texto visible, así nunca difieren.

## Blog

Cada guía abre con "En resumen" (40–60 palabras citables), usa H2 en forma de pregunta, tiene tabla o ejemplo, preguntas frecuentes abiertas, fuentes con enlace a la ley oficial, fechas visibles y su enlace al servicio relacionado. Entra sola al sitemap, al feed RSS y a `llms.txt`. Para publicar una guía nueva: agregar su objeto en `src/blog/posts.mjs` y correr `node build.mjs`.

## Diagnóstico

El formulario no usa servidor: al enviar, arma el mensaje y abre `wa.me/526623188301`. Sin JavaScript se muestra como formulario normal. Si existe `gtag`, dispara el evento `generate_lead`.

## Fotografías

Fotos de Hermosillo de Wikimedia Commons (CC BY-SA y CC0), con crédito en el pie de cada página que las usa. Lista completa en `assets/credits.json`. Ninguna muestra al despacho ni a su equipo.
