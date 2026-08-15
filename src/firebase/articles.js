import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from './config'

function requireDb() {
  if (!db) throw new Error('Firebase no está configurado (faltan variables VITE_FIREBASE_* en .env).')
  return db
}

function requireStorage() {
  if (!storage) throw new Error('Firebase no está configurado (faltan variables VITE_FIREBASE_* en .env).')
  return storage
}

function articlesCol() {
  return collection(requireDb(), 'articles')
}

function wordCount(article) {
  const text = (article.blocks || [])
    .filter((b) => b.type === 'text')
    .map((b) => b.content)
    .join(' ')
  return text.split(/\s+/).filter(Boolean).length || 1
}

export function readTime(article) {
  return `${Math.max(1, Math.round(wordCount(article) / 200))} min de lectura`
}

function fromDoc(docSnap) {
  const data = docSnap.data()
  return {
    id: docSnap.id,
    title: data.title || '',
    seo: data.seo || '',
    blocks: data.blocks || [],
    date: data.date || '',
    createdAt: data.createdAt || null,
  }
}

/** All published articles, newest first. */
export async function listArticles() {
  const q = query(articlesCol(), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(fromDoc)
}

export async function getArticle(id) {
  const snap = await getDoc(doc(requireDb(), 'articles', id))
  return snap.exists() ? fromDoc(snap) : null
}

export async function createArticle({ title, seo, blocks }) {
  const docRef = await addDoc(articlesCol(), {
    title,
    seo: seo || '',
    blocks,
    date: new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }),
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateArticle(id, { title, seo, blocks }) {
  await updateDoc(doc(requireDb(), 'articles', id), { title, seo: seo || '', blocks })
}

export async function deleteArticle(id) {
  await deleteDoc(doc(requireDb(), 'articles', id))
}

/** Uploads an image block's file to Storage and returns its public URL. */
export async function uploadArticleImage(file, slotId) {
  const path = `articles/${slotId}-${Date.now()}-${file.name}`
  const ref = storageRef(requireStorage(), path)
  await uploadBytes(ref, file)
  const url = await getDownloadURL(ref)
  return { url, path }
}

export async function deleteArticleImage(path) {
  if (!path) return
  try {
    await deleteObject(storageRef(requireStorage(), path))
  } catch {
    // Image may already be gone; ignore.
  }
}

export function youtubeEmbedUrl(url) {
  if (!url) return null
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/)
  return m ? `https://www.youtube.com/embed/${m[1]}` : null
}
