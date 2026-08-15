<script setup>
import { ref, onMounted } from 'vue'
import logoWhite from '../assets/logo-white.png'
import { listArticles, readTime } from '../firebase/articles'
import { useAuth } from '../composables/useAuth'

const articles = ref([])
const loaded = ref(false)
const { user, logout } = useAuth()

onMounted(async () => {
  try {
    articles.value = await listArticles()
  } catch (e) {
    console.error('No se pudieron cargar los artículos', e)
  } finally {
    loaded.value = true
  }
})

function firstTextBlock(article) {
  return (article.blocks || []).find((b) => b.type === 'text')?.content || ''
}
</script>

<template>
  <div class="topbar">
    <img :src="logoWhite" alt="Resuelta" class="topbar__logo" />
    <RouterLink to="/" class="topbar__back">&larr; Volver al sitio</RouterLink>
  </div>

  <div class="page">
    <h1 class="page__title">Blog de Resuelta</h1>
    <p class="page__subtitle">Artículos y actualizaciones sobre derecho laboral.</p>

    <div v-if="user" class="page__auth-row">
      <RouterLink to="/blog-admin" class="page__admin-link">Panel de administración</RouterLink>
      <span class="page__logout" @click="logout">Cerrar sesión</span>
    </div>
    <RouterLink v-else to="/blog-login" class="page__login-link">Iniciar sesión</RouterLink>

    <div class="list">
      <p v-if="loaded && articles.length === 0" class="list__empty">Aún no hay artículos publicados.</p>
      <div v-for="article in articles" :key="article.id" class="card">
        <div class="card__head">
          <h3 class="card__title">{{ article.title }}</h3>
        </div>
        <p class="card__body">{{ firstTextBlock(article) }}</p>
        <div class="card__meta">
          <p class="card__date">{{ article.date }}</p>
          <RouterLink :to="`/blog/${article.id}`" class="card__link">Leer &middot; {{ readTime(article) }}</RouterLink>
        </div>
      </div>
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
  height: 26px;
  width: auto;
  display: block;
}

.topbar__back {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}

.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 56px 24px;
}

.page__title {
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -1px;
  color: var(--dark-blue);
  margin: 0 0 8px 0;
}

.page__subtitle {
  font-size: 15px;
  color: var(--text-muted);
  margin: 0 0 32px 0;
}

.page__auth-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.page__admin-link {
  color: var(--blue);
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
}

.page__logout {
  color: var(--text-faint);
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
}

.page__login-link {
  display: inline-block;
  color: var(--blue);
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
  margin-bottom: 32px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.list__empty {
  color: var(--text-faint);
  font-size: 14px;
  text-align: center;
  padding: 20px 0;
}

.card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 22px;
}

.card__title {
  font-size: 19px;
  font-weight: 800;
  color: var(--dark-blue);
  margin: 0 0 8px 0;
}

.card__body {
  font-size: 14px;
  line-height: 1.6;
  color: #4b5170;
  margin: 0 0 14px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card__date {
  font-size: 11px;
  color: var(--text-faint);
  font-weight: 400;
  margin: 0;
}

.card__link {
  font-size: 12.5px;
  color: var(--blue);
  font-weight: 700;
  white-space: nowrap;
  text-decoration: none;
}

@media (max-width: 760px) {
  .topbar {
    padding: 14px 20px;
  }
  .page {
    padding: 32px 20px;
  }
}
</style>
