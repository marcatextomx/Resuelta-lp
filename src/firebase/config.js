import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// All values come from Vite env vars (see .env.example).
// They are safe to expose client-side — Firebase security is enforced
// by firestore.rules / storage.rules, not by hiding these values.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const missingFirebaseConfig = !firebaseConfig.apiKey || !firebaseConfig.projectId

if (missingFirebaseConfig && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    '[firebase] Faltan variables VITE_FIREBASE_* — copia .env.example a .env y complétalo. ' +
      'El sitio se renderiza, pero blog/login/leads no funcionarán hasta configurarlo.',
  )
}

let app = null
let db = null
let auth = null
let storage = null

// Guard init so a missing/incomplete Firebase config never blank-screens the
// landing page — it just disables the Firebase-backed features.
if (!missingFirebaseConfig) {
  try {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
    db = getFirestore(app)
    auth = getAuth(app)
    storage = getStorage(app)
  } catch (e) {
    console.error('[firebase] No se pudo inicializar Firebase:', e)
  }
}

export { db, auth, storage }
export default app
