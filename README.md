# Resuelta.mx

Sitio web de Resuelta (abogados laborales, Hermosillo, Sonora): landing page + blog con
panel de administración. Construido en **Vue 3 + Vite**, sin backend propio — toda la
persistencia (artículos del blog, imágenes, leads del formulario de contacto y login del
administrador) vive en **Firebase** (Firestore, Storage, Auth, Hosting).

## Stack

- Vue 3 (`<script setup>`) + Vite
- Vue Router 4
- Firebase: Auth (email/password), Firestore (artículos y leads), Storage (imágenes del
  blog), Hosting (deploy del sitio estático)
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
    blog/             Renderizado de bloques de artículo (texto/imagen/video)
    admin/            Editor de bloques del panel
  composables/
    useAuth.js        Estado de sesión (Firebase Auth)
  firebase/
    config.js         Inicialización del SDK (lee variables de entorno)
    articles.js        CRUD de artículos en Firestore + subida de imágenes a Storage
    leads.js            Guardado de leads del formulario de contacto
  router/index.js      Rutas + guard de autenticación para /blog-admin
  views/                Una vista por página (Home, BlogList, BlogArticle, BlogLogin, BlogAdmin)
firestore.rules         Reglas de seguridad de Firestore
storage.rules            Reglas de seguridad de Storage
firebase.json             Configuración de Hosting/Firestore/Storage
.github/workflows/        Deploy automático (producción + previews de PR)
```

## 1. Requisitos

- Node.js 20+
- Una cuenta de Firebase (gratis) y, opcionalmente, la CLI: `npm i -g firebase-tools`
- Un repositorio en GitHub si quieres el deploy automático

## 2. Crear el proyecto de Firebase

1. Ve a [console.firebase.google.com](https://console.firebase.google.com) → **Agregar
   proyecto** (puede ser el plan gratuito **Spark**; Hosting/Firestore/Storage/Auth
   funcionan en Spark para un sitio de este tamaño).
2. Dentro del proyecto, crea una **app web** (ícono `</>`) y copia el objeto
   `firebaseConfig` que te muestra — lo vas a necesitar para el `.env`.
3. Activa los tres servicios que usa el sitio:
   - **Authentication** → pestaña *Sign-in method* → habilita **Correo electrónico/contraseña**.
     Luego en *Users* crea manualmente el usuario administrador (tu correo + una
     contraseña) — este es el login del panel del blog, no hay registro público.
   - **Firestore Database** → *Crear base de datos* → modo producción → elige una región
     (por ejemplo `us-central` o la más cercana a Hermosillo).
   - **Storage** → *Comenzar* → modo producción, misma región.
4. Cuando corras `firebase deploy` (manual o vía GitHub Actions) las reglas de
   `firestore.rules` y `storage.rules` de este repo se publican automáticamente:
   lectura pública de artículos, escritura solo si hay sesión iniciada.

## 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Rellena `.env` con los valores del `firebaseConfig` del paso anterior. Este archivo
nunca se sube a git (está en `.gitignore`).

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

Eso publica Hosting + reglas de Firestore/Storage. Tu sitio queda en
`https://TU-PROYECTO.web.app`.

## 6. Deploy automático (GitHub Actions)

Este repo ya trae dos workflows:

- `.github/workflows/deploy.yml` — al hacer push a `main`, compila y despliega a Hosting
  (canal `live`) y publica las reglas de Firestore/Storage.
- `.github/workflows/deploy-preview.yml` — en cada Pull Request, despliega un canal de
  vista previa temporal de Firebase Hosting (útil para revisar cambios antes de fusionar).

Para que funcionen, agrega estos **secrets** en GitHub (`Settings → Secrets and
variables → Actions → New repository secret`):

| Secret | De dónde sale |
|---|---|
| `VITE_FIREBASE_API_KEY` | del `firebaseConfig` |
| `VITE_FIREBASE_AUTH_DOMAIN` | del `firebaseConfig` |
| `VITE_FIREBASE_PROJECT_ID` | del `firebaseConfig` |
| `VITE_FIREBASE_STORAGE_BUCKET` | del `firebaseConfig` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | del `firebaseConfig` |
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
git commit -m "Initial commit: Resuelta landing + blog en Vue 3 + Firebase"
git branch -M main
git remote add origin <URL-de-tu-repo-en-GitHub>
git push -u origin main
```

En cuanto agregues los secrets de GitHub (paso 6) y hagas este primer push, el workflow
de deploy corre automáticamente.

## Notas sobre el panel de administración

- El login (`/blog-login`) usa Firebase Auth real (correo + contraseña) — reemplaza el
  usuario/contraseña fijos ("admin" / "resuelta2026") del prototipo original.
- Los artículos y las imágenes ya no se guardan en `localStorage` del navegador: viven en
  Firestore y Storage, así que son los mismos para todos los visitantes y persisten entre
  dispositivos.
- El formulario de contacto guarda cada intento en la colección `leads` de Firestore
  (visible desde la consola de Firebase) antes de abrir WhatsApp, para no perder
  prospectos que no completan el envío por WhatsApp.
