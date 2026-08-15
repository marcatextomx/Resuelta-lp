import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './config'

/** Stores a contact-form submission so no lead is lost even if the visitor
 * never presses "send" inside WhatsApp. */
export async function createLead({ nombre, telefono, empresa, empleados }) {
  if (!db) throw new Error('Firebase no está configurado (faltan variables VITE_FIREBASE_* en .env).')
  await addDoc(collection(db, 'leads'), {
    nombre,
    telefono,
    empresa,
    empleados,
    createdAt: serverTimestamp(),
  })
}
