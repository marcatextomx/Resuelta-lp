# Resuelta.mx

Landing page de Resuelta (abogados laborales, Hermosillo, Sonora). Construida en
**Vue 3 + Vite**, sin backend propio — el único dato que se guarda es el formulario de
contacto, en **Firestore** (Firebase).

## Stack

- Vue 3 (`<script setup>`) + Vite
- Vue Router 4
- Firebase: Firestore (leads del formulario de contacto), Hosting (deploy del sitio estático)
- GitHub Actions para deploy automático a Firebase Hosting

No hay servidor propio: el build es 100% estático y el SDK de Firebase corre en el
navegador del visitante.

## Estructura

```
src/
  assets/            Logos y foto del abogado
  components/
    layout/          NavBar, botón flotante de WhatsApp
    home/             Secciones de la landing (hero, servicios, FAQ, contacto, etc.)
  firebase/
    config.js         Inicialización del SDK (lee variables de entorno)
    leads.js            Guardado de leads del formulario de contacto en Firestore
  router/index.js      Ruta única (/) + 404
  views/                HomeView, NotFoundView
firestore.rules         Reglas de seguridad de Firestore
firebase.json             Configuración de Hosting/Firestore
.github/workflows/        Deploy automático (producción + previews de PR)
```

## 1. Requisitos

- Node.js 20+
- Una cuenta de Firebase (gratis) y, opcionalmente, la CLI: `npm i -g firebase-tools`
- Un repositorio en GitHub si quieres el deploy automático

## 2. Crear el proyecto de Firebase

1. Ve a [console.firebase.google.com](https://console.firebase.google.com) → **Agregar
   proyecto** (el plan gratuito **Spark** alcanza para un sitio de este tamaño).
2. Dentro del proyecto, crea una **app web** (ícono `</>`) y copia el objeto
   `firebaseConfig` que te muestra — solo necesitas `apiKey`, `projectId` y `appId`.
3. **Firestore Database** → *Crear base de datos* → modo producción → elige una región
   (por ejemplo `us-central` o la más cercana a Hermosillo).
4. Cuando corras `firebase deploy` (manual o vía GitHub Actions) las reglas de
   `firestore.rules` de este repo se publican automáticamente: cualquiera puede
   *crear* un lead desde el formulario, pero nadie puede leerlos ni modificarlos desde
   la app — los revisas directamente en la consola de Firebase (pestaña Firestore).

## 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Rellena `.env` con `apiKey`, `projectId` y `appId` del paso anterior. Este archivo nunca
se sube a git (está en `.gitignore`).

## 4. Desarrollo local

```bash
npm install
npm run dev
```

## 5. Deploy manual (primera vez / puntual)

```bash
npm i -g firebase-tools   # una sola vez
firebase login
```

Edita `.firebaserc` y reemplaza `REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID` con el ID real de
tu proyecto (lo ves en Configuración del proyecto, en la consola de Firebase).

```bash
npm run build
firebase deploy
```

Eso publica Hosting + reglas de Firestore. Tu sitio queda en
`https://TU-PROYECTO.web.app`.

## 6. Deploy automático (GitHub Actions)

Este repo ya trae dos workflows:

- `.github/workflows/deploy.yml` — al hacer push a `main`, compila y despliega a Hosting
  (canal `live`) y publica las reglas de Firestore.
- `.github/workflows/deploy-preview.yml` — en cada Pull Request, despliega un canal de
  vista previa temporal de Firebase Hosting (útil para revisar cambios antes de fusionar).

Para que funcionen, agrega estos **secrets** en GitHub (`Settings → Secrets and
variables → Actions → New repository secret`):

| Secret | De dónde sale |
|---|---|
| `VITE_FIREBASE_API_KEY` | del `firebaseConfig` |
| `VITE_FIREBASE_PROJECT_ID` | del `firebaseConfig` |
| `VITE_FIREBASE_APP_ID` | del `firebaseConfig` |
| `FIREBASE_SERVICE_ACCOUNT` | JSON completo de una service account (ver abajo) |

Para generar `FIREBASE_SERVICE_ACCOUNT`:

1. En la consola de Firebase → ⚙️ *Configuración del proyecto* → **Cuentas de servicio**.
2. **Generar nueva clave privada** → descarga el JSON.
3. Copia todo el contenido del archivo JSON como valor del secret
   `FIREBASE_SERVICE_ACCOUNT` (pégalo tal cual, no hace falta codificarlo).

Con eso, cada push a `main` publica el sitio solo. No necesitas correr `firebase deploy`
a mano nunca más.

## 7. Git

```bash
git init
git add .
git commit -m "Initial commit: Resuelta landing en Vue 3 + Firebase"
git branch -M main
git remote add origin <URL-de-tu-repo-en-GitHub>
git push -u origin main
```

En cuanto agregues los secrets de GitHub (paso 6) y hagas este primer push, el workflow
de deploy corre automáticamente.

## SEO

Lo que está cubierto en el código (todo lo que se controla desde el sitio):

- `<title>` y meta description optimizados con marca + keyword + ciudad.
- Open Graph y Twitter Card completos (`index.html`) — vista previa correcta al compartir
  el link en WhatsApp/Facebook/X. La imagen usada es `public/og-image.png`.
- Datos estructurados JSON-LD tipo `LegalService` (schema.org) con dirección, teléfono,
  horario, redes, especialidades (`knowsAbout`) y los 6 servicios reales como `makesOffer`
  — ayuda a que Google entienda que es un despacho B2B (empresas, no trabajadores).
- `public/robots.txt` y `public/sitemap.xml`.
- `<link rel="canonical">` apuntando a `https://resuelta.mx/`.
- Un solo `<h1>` por página y jerarquía de encabezados correcta (`h1` → `h2` → `h3`).
- Página 404 marcada con `noindex` (el fallback de SPA siempre responde 200, así que se
  evita que Google indexe rutas rotas).
- Copy de servicios y FAQ alineado a las keywords comerciales objetivo (sin keyword
  stuffing — son los mismos 6 servicios reales, solo con títulos/descripciones más
  precisos).
- HTML semántico: `<address>` para la dirección, `mailto:` en el correo, `aria-label`
  en los íconos de redes sociales.
- Fuente cargada con `<link rel="preconnect">` + stylesheet directo en vez de `@import`
  (evita un salto extra de red antes de descubrir la tipografía).
- El SDK de Firebase (~123 KB gzip) se carga con `import()` dinámico solo cuando el
  visitante envía el formulario de contacto, no en la carga inicial de la página.

**Mantenimiento:** si editas los servicios en `ServicesSection.vue`, actualiza también
el bloque `makesOffer` del JSON-LD en `index.html` para que coincidan (no se generan
automáticamente el uno del otro). Si cambias de dominio o el copy principal, actualiza
también `og:url`, `og:title` y `public/sitemap.xml`.

Lo que **no** se resuelve desde el código, y toca hacer manualmente en las herramientas
de Google (esto pesa tanto o más que lo técnico para el posicionamiento local):

1. **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console))
   — agrega la propiedad `resuelta.mx`, envía `https://resuelta.mx/sitemap.xml` y pide
   indexación manual de la home la primera vez.
2. **Google Business Profile** ([business.google.com](https://business.google.com)) — el
   factor más importante para aparecer en el mapa/"3-pack" local de Hermosillo. Usa la
   misma dirección, teléfono y horario que están en el JSON-LD.
3. **Reseñas** en Google Business — cantidad y frecuencia de reseñas es señal de ranking
   local fuerte.
4. **Backlinks** — directorios de abogados en México, cámaras empresariales de Sonora,
   notas de prensa, etc. Nada de esto lo resuelve el código del sitio.

## Notas

- El formulario de contacto guarda cada intento en la colección `leads` de Firestore
  (visible desde la consola de Firebase) antes de abrir WhatsApp, para no perder
  prospectos que no completan el envío por WhatsApp.
- El sitio no tiene blog ni panel de administración — es una landing page de una sola
  ruta (`/`).
