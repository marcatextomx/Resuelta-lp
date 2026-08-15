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

## Notas

- El formulario de contacto guarda cada intento en la colección `leads` de Firestore
  (visible desde la consola de Firebase) antes de abrir WhatsApp, para no perder
  prospectos que no completan el envío por WhatsApp.
- El sitio no tiene blog ni panel de administración — es una landing page de una sola
  ruta (`/`).
