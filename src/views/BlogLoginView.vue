<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logo from '../assets/logo.png'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const route = useRoute()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const error = ref(false)
const submitting = ref(false)

async function onSubmit() {
  if (!email.value || !password.value) {
    error.value = true
    return
  }
  submitting.value = true
  error.value = false
  try {
    await login(email.value, password.value)
    router.push(route.query.redirect || '/blog-admin')
  } catch (e) {
    error.value = true
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="wrap">
    <div class="card">
      <img :src="logo" alt="Resuelta" class="card__logo" />
      <h1 class="card__title">Iniciar sesión</h1>
      <p class="card__subtitle">Acceso de administrador del blog</p>
      <form class="card__form" @submit.prevent="onSubmit">
        <input v-model="email" type="email" placeholder="Correo" class="card__input" autocomplete="username" />
        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          class="card__input"
          autocomplete="current-password"
        />
        <p v-if="error" class="card__error">Usuario o contraseña incorrectos.</p>
        <button type="submit" class="card__submit" :disabled="submitting">
          {{ submitting ? 'Entrando…' : 'Entrar' }}
        </button>
        <RouterLink to="/" class="card__back">&larr; Volver al inicio</RouterLink>
      </form>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--navy);
}

.card {
  width: 100%;
  max-width: 380px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
}

.card__logo {
  height: 36px;
  width: auto;
  display: block;
  margin: 0 auto 20px auto;
}

.card__title {
  font-size: 20px;
  font-weight: 800;
  color: var(--dark-blue);
  margin: 0 0 4px 0;
  text-align: center;
}

.card__subtitle {
  font-size: 13px;
  color: var(--text-faint);
  margin: 0 0 24px 0;
  text-align: center;
}

.card__form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card__input {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  font-size: 14px;
  color: var(--dark-blue);
  outline: none;
}

.card__error {
  color: var(--pink);
  font-size: 12.5px;
  font-weight: 600;
  margin: 0;
}

.card__submit {
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.card__submit:disabled {
  opacity: 0.7;
  cursor: default;
}

.card__back {
  text-align: center;
  font-size: 13px;
  color: var(--text-faint);
  text-decoration: none;
  margin-top: 4px;
}
</style>
