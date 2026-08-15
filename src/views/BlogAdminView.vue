<script setup>
import { ref, onMounted } from 'vue'
import logoWhite from '../assets/logo-white.png'
import BlockItem from '../components/admin/BlockItem.vue'
import { useAuth } from '../composables/useAuth'
import {
  listArticles,
  createArticle,
  updateArticle,
  deleteArticle as deleteArticleDoc,
  uploadArticleImage,
  deleteArticleImage,
  youtubeEmbedUrl,
} from '../firebase/articles'

const { logout } = useAuth()

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
}

const tab = ref('new')
const title = ref('')
const seo = ref('')
const blocks = ref([{ id: uid(), type: 'text', content: '' }])
const editingId = ref(null)
const articles = ref([])
const saving = ref(false)
const loadingArticles = ref(true)

async function refreshArticles() {
  loadingArticles.value = true
  try {
    articles.value = await listArticles()
  } catch (e) {
    console.error('No se pudieron cargar los artículos', e)
  } finally {
    loadingArticles.value = false
  }
}

onMounted(refreshArticles)

function resetEditor() {
  title.value = ''
  seo.value = ''
  blocks.value = [{ id: uid(), type: 'text', content: '' }]
  editingId.value = null
}

function addBlock(index, type) {
  const b = type === 'video' ? { id: uid(), type, content: '' } : type === 'image' ? { id: uid(), type } : { id: uid(), type, content: '' }
  blocks.value.splice(index + 1, 0, b)
}

function removeBlock(id) {
  blocks.value = blocks.value.filter((b) => b.id !== id)
  if (blocks.value.length === 0) blocks.value = [{ id: uid(), type: 'text', content: '' }]
}

function updateBlock(id, patch) {
  blocks.value = blocks.value.map((b) => (b.id === id ? patch : b))
}

function startEdit(article) {
  tab.value = 'new'
  title.value = article.title
  seo.value = article.seo || ''
  editingId.value = article.id
  blocks.value = (article.blocks && article.blocks.length ? article.blocks : [{ type: 'text', content: '' }]).map(
    (b) => ({ ...b, id: uid() }),
  )
}

function cancelEdit() {
  resetEditor()
}

async function save() {
  if (!title.value.trim() || saving.value) return
  saving.value = true
  try {
    const finalBlocks = []
    for (const b of blocks.value) {
      if (b.type === 'text') {
        if (b.content && b.content.trim()) finalBlocks.push({ type: 'text', content: b.content.trim() })
      } else if (b.type === 'image') {
        if (b.file) {
          const { url, path } = await uploadArticleImage(b.file, b.id)
          finalBlocks.push({ type: 'image', url, path })
        } else if (b.url) {
          finalBlocks.push({ type: 'image', url: b.url, path: b.path || null })
        }
      } else if (b.type === 'video') {
        const embed = youtubeEmbedUrl(b.content)
        if (embed) finalBlocks.push({ type: 'video', content: b.content, embed })
      }
    }
    if (editingId.value) {
      await updateArticle(editingId.value, { title: title.value.trim(), seo: seo.value, blocks: finalBlocks })
    } else {
      await createArticle({ title: title.value.trim(), seo: seo.value, blocks: finalBlocks })
    }
    await refreshArticles()
    resetEditor()
    tab.value = 'list'
  } catch (e) {
    console.error('No se pudo guardar el artículo', e)
    alert('No se pudo guardar el artículo. Intenta de nuevo.')
  } finally {
    saving.value = false
  }
}

async function removeArticle(article) {
  if (!confirm(`¿Eliminar "${article.title}"? Esta acción no se puede deshacer.`)) return
  try {
    await Promise.all((article.blocks || []).filter((b) => b.type === 'image' && b.path).map((b) => deleteArticleImage(b.path)))
    await deleteArticleDoc(article.id)
    await refreshArticles()
  } catch (e) {
    console.error('No se pudo eliminar el artículo', e)
    alert('No se pudo eliminar el artículo.')
  }
}
</script>

<template>
  <div class="topbar">
    <img :src="logoWhite" alt="Resuelta" class="topbar__logo" />
    <div class="topbar__actions">
      <RouterLink to="/blog" class="topbar__link">Ver blog</RouterLink>
      <span class="topbar__logout" @click="logout">Cerrar sesión</span>
    </div>
  </div>

  <div class="page">
    <h1 class="page__title">Panel del blog</h1>

    <div class="tabs">
      <button class="tabs__btn" :class="{ 'tabs__btn--active': tab === 'new' }" @click="tab = 'new'">
        A) Nuevo artículo
      </button>
      <button class="tabs__btn" :class="{ 'tabs__btn--active': tab === 'list' }" @click="tab = 'list'">
        B) Editar artículos actuales
      </button>
    </div>

    <div v-if="tab === 'new'">
      <p v-if="editingId" class="editing-note">
        Editando artículo existente. <span class="editing-note__cancel" @click="cancelEdit">Cancelar</span>
      </p>

      <div class="fields">
        <input v-model="title" type="text" placeholder="Título del artículo" class="fields__title" />
        <input v-model="seo" type="text" placeholder="Palabras clave SEO (separadas por coma)" class="fields__seo" />
      </div>

      <div class="blocks">
        <BlockItem
          v-for="(block, i) in blocks"
          :key="block.id"
          :block="block"
          :can-remove="blocks.length > 1"
          @update="(b) => updateBlock(block.id, b)"
          @remove="removeBlock(block.id)"
          @add-text="addBlock(i, 'text')"
          @add-image="addBlock(i, 'image')"
          @add-video="addBlock(i, 'video')"
        />
      </div>

      <button class="save-btn" :disabled="saving" @click="save">
        {{ saving ? 'Guardando…' : editingId ? 'Guardar cambios' : 'Publicar artículo' }}
      </button>
    </div>

    <div v-else class="existing">
      <div v-for="a in articles" :key="a.id" class="existing__row">
        <div>
          <p class="existing__title">{{ a.title }}</p>
          <p class="existing__date">{{ a.date }}</p>
        </div>
        <div class="existing__actions">
          <span class="existing__edit" @click="startEdit(a)">Editar</span>
          <span class="existing__delete" @click="removeArticle(a)">Eliminar</span>
        </div>
      </div>
      <p v-if="!loadingArticles && articles.length === 0" class="existing__empty">No hay artículos todavía.</p>
    </div>
  </div>
</template>

<style scoped>
.topbar {
  background: var(--navy);
  padding: 16px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar__logo {
  height: 28px;
  width: auto;
  display: block;
}

.topbar__actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.topbar__link {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}

.topbar__logout {
  color: var(--lavender);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.page {
  max-width: 820px;
  margin: 0 auto;
  padding: 40px 24px;
}

.page__title {
  font-size: 26px;
  font-weight: 800;
  color: var(--dark-blue);
  margin: 0 0 24px 0;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 28px;
  border-bottom: 1.5px solid var(--border);
}

.tabs__btn {
  background: none;
  border: none;
  padding: 10px 4px;
  margin-left: 20px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  color: var(--text-faint);
  border-bottom: 2px solid transparent;
  margin-bottom: -1.5px;
}

.tabs__btn:first-child {
  margin-left: 0;
}

.tabs__btn--active {
  color: var(--blue);
  border-bottom-color: var(--blue);
}

.editing-note {
  font-size: 13px;
  color: var(--text-faint);
  font-weight: 600;
  margin: 0 0 16px 0;
}

.editing-note__cancel {
  color: var(--pink);
  cursor: pointer;
  font-weight: 700;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 24px;
}

.fields__title {
  padding: 13px 14px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  font-size: 16px;
  font-weight: 700;
  color: var(--dark-blue);
  outline: none;
}

.fields__seo {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  font-size: 13.5px;
  color: var(--dark-blue);
  outline: none;
}

.blocks {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.save-btn {
  margin-top: 12px;
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 13px 24px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.save-btn:disabled {
  opacity: 0.7;
  cursor: default;
}

.existing {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.existing__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px 18px;
}

.existing__title {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--dark-blue);
  margin: 0 0 3px 0;
}

.existing__date {
  font-size: 12px;
  color: var(--text-faint);
  margin: 0;
}

.existing__actions {
  display: flex;
  gap: 14px;
  flex: none;
}

.existing__edit {
  color: var(--blue);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.existing__delete {
  color: var(--pink);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.existing__empty {
  color: var(--text-faint);
  font-size: 14px;
  text-align: center;
  padding: 20px 0;
}
</style>
