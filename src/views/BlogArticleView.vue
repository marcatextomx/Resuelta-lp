<script setup>
import { ref, watchEffect } from 'vue'
import logoWhite from '../assets/logo-white.png'
import logoIcon from '../assets/logo-icon.png'
import ArticleBlocks from '../components/blog/ArticleBlocks.vue'
import { getArticle, listArticles, readTime } from '../firebase/articles'

const props = defineProps({ id: { type: String, required: true } })

const article = ref(null)
const relatedArticles = ref([])
const notFound = ref(false)
const loading = ref(true)

watchEffect(async () => {
  loading.value = true
  notFound.value = false
  article.value = null
  try {
    const [found, all] = await Promise.all([getArticle(props.id), listArticles()])
    if (!found) {
      notFound.value = true
    } else {
      article.value = found
      relatedArticles.value = all.filter((a) => a.id !== found.id).slice(0, 2)
    }
  } catch (e) {
    console.error('No se pudo cargar el artículo', e)
    notFound.value = true
  } finally {
    loading.value = false
  }
})

function firstTextBlock(a) {
  return (a.blocks || []).find((b) => b.type === 'text')?.content || ''
}
</script>

<template>
  <div class="topbar">
    <img :src="logoWhite" alt="Resuelta" class="topbar__logo" />
    <RouterLink to="/blog" class="topbar__back">&larr; Volver al sitio</RouterLink>
  </div>

  <template v-if="article">
    <div class="hero">
      <div class="hero__inner">
        <span class="hero__tag">Derecho laboral</span>
        <h1 class="hero__title">{{ article.title }}</h1>
        <div class="hero__author">
          <img :src="logoIcon" alt="" class="hero__avatar" />
          <div>
            <p class="hero__author-name">Lic. Joel Pérez</p>
            <p class="hero__meta">{{ article.date }} &middot; {{ readTime(article) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <ArticleBlocks :blocks="article.blocks" />

      <div class="content__back">
        <RouterLink to="/blog" class="content__back-link">&larr; Volver al blog</RouterLink>
      </div>

      <div v-if="relatedArticles.length" class="related">
        <p class="related__title">¿Y si le echas un ojo a estos otros?</p>
        <div class="related__grid">
          <RouterLink
            v-for="rel in relatedArticles"
            :key="rel.id"
            :to="`/blog/${rel.id}`"
            class="related__card"
          >
            <h3 class="related__card-title">{{ rel.title }}</h3>
            <p class="related__card-body">{{ firstTextBlock(rel) }}</p>
          </RouterLink>
        </div>
      </div>
    </div>
  </template>

  <div v-else-if="!loading && notFound" class="content">
    <p class="not-found">No encontramos este artículo.</p>
    <RouterLink to="/blog" class="content__back-link">&larr; Volver al blog</RouterLink>
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

.hero {
  background: var(--dark-blue);
  border-radius: 0 0 32px 32px;
  padding: 64px 24px 48px;
}

.hero__inner {
  max-width: 800px;
  margin: 0 auto;
}

.hero__tag {
  display: inline-block;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 20px;
  margin-bottom: 18px;
}

.hero__title {
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -1px;
  color: #fff;
  margin: 0 0 22px 0;
  line-height: 1.15;
}

.hero__author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hero__avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
}

.hero__author-name {
  font-size: 13.5px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.hero__meta {
  font-size: 12px;
  color: var(--lavender);
  margin: 0;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 56px 24px;
}

.content__back {
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  margin-bottom: 44px;
}

.content__back-link {
  display: inline-block;
  color: var(--blue);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.related {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}

.related__title {
  text-align: center;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #f27c1e;
  margin: 0;
  padding: 16px;
  border-bottom: 1px solid var(--border);
}

.related__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.related__card {
  padding: 28px;
  text-decoration: none;
  border-right: 1px solid var(--border);
  display: block;
}

.related__card:last-child {
  border-right: none;
}

.related__card:hover {
  background: var(--bg);
}

.related__card-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--dark-blue);
  margin: 0 0 10px 0;
  line-height: 1.25;
}

.related__card-body {
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--text-muted);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.not-found {
  color: var(--text-muted);
  font-size: 15px;
}

@media (max-width: 760px) {
  .topbar {
    padding: 14px 20px;
  }
  .hero {
    padding: 40px 24px 32px;
  }
  .hero__title {
    font-size: 30px;
  }
  .content {
    padding: 32px 20px;
  }
  .related__grid {
    grid-template-columns: 1fr;
  }
  .related__card {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}
</style>
