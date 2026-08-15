<script setup>
import logoWhite from '../../assets/logo-white.png'
</script>

<template>
  <div class="nav">
    <RouterLink to="/" class="nav__logo">
      <img :src="logoWhite" alt="Resuelta" />
    </RouterLink>
    <div class="nav__links">
      <a href="/#inicio">Inicio</a>
      <a href="/#servicios">Servicios</a>
      <a href="/#nosotros">Nosotros</a>
      <a href="/#contacto">Contacto</a>
    </div>
  </div>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--navy);
  padding: 16px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__logo img {
  height: 34px;
  width: auto;
  display: block;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 28px;
  font-size: 14px;
  font-weight: 600;
  flex-wrap: wrap;
}

.nav__links a {
  color: #fff;
  text-decoration: none;
}

.nav__links a:hover {
  text-decoration: underline;
}

@media (max-width: 760px) {
  .nav {
    padding: 14px 20px;
  }
  .nav__links {
    gap: 12px;
  }
}
</style>
