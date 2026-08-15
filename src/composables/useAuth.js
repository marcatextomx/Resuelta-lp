import { ref } from 'vue'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase/config'

const user = ref(null)
// If Firebase isn't configured there's no auth state to wait for — treat as ready
// immediately so the admin guard doesn't hang forever.
const authReady = ref(!auth)

if (auth) {
  onAuthStateChanged(auth, (u) => {
    user.value = u
    authReady.value = true
  })
}

export function useAuth() {
  async function login(email, password) {
    if (!auth) throw new Error('Firebase no está configurado (faltan variables VITE_FIREBASE_* en .env).')
    await signInWithEmailAndPassword(auth, email, password)
  }

  async function logout() {
    if (!auth) return
    await signOut(auth)
  }

  /** Resolves once Firebase has reported the initial auth state. */
  function ready() {
    if (authReady.value || !auth) return Promise.resolve()
    return new Promise((resolve) => {
      const stop = onAuthStateChanged(auth, () => {
        stop()
        resolve()
      })
    })
  }

  return { user, authReady, login, logout, ready }
}
