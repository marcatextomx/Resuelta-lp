<script setup>
import { ref, onMounted, computed } from 'vue'
import { listArticles, readTime } from '../../firebase/articles'

const articles = ref([])
const loaded = ref(false)
const scrollEl = ref(null)

onMounted(async () => {
  try {
    const all = await listArticles()
    articles.value = all.slice(0, 6)
  } catch (e) {
    console.error('No se pudieron cargar los artículos del blog', e)
  } finally {
    loaded.value = true
  }
})

const showArrows = computed(() => articles.value.length > 3)

function scrollBy(delta) {
  scrollEl.value?.scrollBy({ left: delta, behavior: 'smooth' })
}
</script>

<template>
  <div id="blog" class="blog">
    <h2 class="blog__title">Blog</h2>
    <div class="blog__wrap">
      <div ref="scrollEl" class="blog__scroll">
        <RouterLink
          v-for="article in articles"
          :key="article.id"
          :to="`/blog/${article.id}`"
          class="blog__card"
        >
          <h3 class="blog__card-title">{{ article.title }}</h3>
          <p class="blog__card-body">{{ (article.blocks || []).find(b => b.type === 'text')?.content || '' }}</p>
          <div class="blog__card-meta">
            <span class="blog__card-date">{{ article.date }} | {{ readTime(article) }}</span>
            <span class="blog__card-link">Leer &rarr;</span>
          </div>
        </RouterLink>
        <p v-if="loaded && articles.length === 0" class="blog__empty">
          Próximamente: artículos sobre derecho laboral.
        </p>
      </div>
      <template v-if="showArrows">
        <button class="blog__arrow blog__arrow--left" @click="scrollBy(-320)" aria-label="Anterior">&larr;</button>
        <button class="blog__arrow blog__arrow--right" @click="scrollBy(320)" aria-label="Siguiente">&rarr;</button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.blog {
  padding: 80px 48px;
  background: #fff;
}

.blog__title {
  text-align: center;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1px;
  color: var(--dark-blue);
  margin: 0 0 32px 0;
}

.blog__wrap {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
}

.blog__scroll {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 20px;
}

.blog__card {
  flex: 0 0 300px;
  background: var(--bg);
  border-radius: 16px;
  padding: 24px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  min-height: 260px;
  box-shadow: 0 0 0 rgba(13, 43, 78, 0);
  transition: box-shadow 0.2s, background 0.2s;
}

.blog__card:hover {
  box-shadow: 0 8px 20px rgba(13, 43, 78, 0.12);
  background: var(--bg-alt);
}

.blog__card-title {
  font-size: 17px;
  font-weight: 800;
  color: var(--dark-blue);
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.blog__card-body {
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--text-muted);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  flex: 1;
}

.blog__card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 14px;
}

.blog__card-date {
  font-size: 8.5px;
  color: var(--text-faint);
  font-weight: 400;
}

.blog__card-link {
  font-size: 13px;
  color: var(--blue);
  font-weight: 700;
  white-space: nowrap;
}

.blog__card:hover .blog__card-link {
  text-decoration: underline;
}

.blog__empty {
  color: var(--text-faint);
  font-size: 14px;
  margin: 0;
}

.blog__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 12px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(13, 43, 78, 0.1);
}

.blog__arrow:hover {
  background: var(--border);
  box-shadow: 0 3px 8px rgba(13, 43, 78, 0.18);
}

.blog__arrow--left {
  left: -8px;
}

.blog__arrow--right {
  right: -8px;
}

@media (max-width: 760px) {
  .blog {
    padding: 56px 24px;
  }
}
</style>
