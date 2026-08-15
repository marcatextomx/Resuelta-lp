import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Values come from Vite env vars (see .env.example). Safe to expose
// client-side — Firestore security is enforced by firestore.rules, not by
// hiding these values.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const missingFirebaseConfig = !firebaseConfig.apiKey || !firebaseConfig.projectId

if (missingFirebaseConfig && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    '[firebase] Faltan variables VITE_FIREBASE_* — copia .env.example a .env y complétalo. ' +
      'El sitio se renderiza, pero el formulario de contacto no podrá guardar leads hasta configurarlo.',
  )
}

let app = null
let db = null

// Guard init so a missing/incomplete Firebase config never blank-screens the
// landing page — it just disables Firestore-backed features (contact leads).
if (!missingFirebaseConfig) {
  try {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
    db = getFirestore(app)
  } catch (e) {
    console.error('[firebase] No se pudo inicializar Firebase:', e)
  }
}

export { db }
export default app
