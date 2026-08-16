<script setup>
import { onMounted, onUnmounted } from 'vue'

// SPA fallback always returns HTTP 200, so tell crawlers explicitly not to
// index broken URLs via a robots meta tag instead.
let meta
onMounted(() => {
  meta = document.createElement('meta')
  meta.name = 'robots'
  meta.content = 'noindex, nofollow'
  document.head.appendChild(meta)
})
onUnmounted(() => {
  meta?.remove()
})
</script>

<template>
  <div class="wrap">
    <div>
      <p class="title">Página no encontrada.</p>
      <RouterLink to="/" class="link">&larr; Volver al inicio</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.title {
  font-size: 15px;
  color: var(--text-muted);
  margin: 0 0 14px 0;
}

.link {
  color: var(--blue);
  font-weight: 700;
  text-decoration: none;
}
</style>
