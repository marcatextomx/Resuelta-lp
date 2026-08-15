import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/blog',
    name: 'blog-list',
    component: () => import('../views/BlogListView.vue'),
  },
  {
    path: '/blog/:id',
    name: 'blog-article',
    component: () => import('../views/BlogArticleView.vue'),
    props: true,
  },
  {
    path: '/blog-login',
    name: 'blog-login',
    component: () => import('../views/BlogLoginView.vue'),
  },
  {
    path: '/blog-admin',
    name: 'blog-admin',
    component: () => import('../views/BlogAdminView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true
  const { user, ready } = useAuth()
  await ready()
  if (!user.value) {
    return { name: 'blog-login', query: { redirect: to.fullPath } }
  }
  return true
})

export default router
