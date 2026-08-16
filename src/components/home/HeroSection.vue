<script setup>
import logoWhite from '../../assets/logo-white.png'
</script>

<template>
  <div id="inicio" class="hero">
    <div class="hero__content">
      <img :src="logoWhite" alt="Resuelta" class="hero__logo" />
      <h1 class="hero__title">
        Abogados Laborales
        <span class="hero__title--accent">para Empresas</span>
      </h1>
      <p class="hero__subtitle">Hermosillo, Sonora</p>
      <a href="#servicios" class="hero__arrow" aria-label="Ir a servicios">
        <svg width="20" height="32" viewBox="0 0 24 36" fill="none" stroke="#fff" stroke-width="2">
          <path d="M12 0v28M5 21l7 7 7-7" />
        </svg>
      </a>
    </div>
  </div>
</template>

<style scoped>
.hero {
  width: 100%;
  aspect-ratio: 16 / 8.999;
  background: var(--navy);
  position: relative;
  overflow: hidden;
  padding: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__content {
  position: relative;
  z-index: 1;
  max-width: 640px;
  text-align: center;
}

.hero__logo {
  height: 75px;
  width: 245px;
  display: block;
  margin: 0 auto 36px auto;
}

.hero__title {
  color: #fff;
  font-size: clamp(24px, 5.2vw, 60px);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -1.5px;
  margin: 0 0 5% 0;
}

.hero__title--accent {
  display: block;
  color: var(--blue);
  margin-top: 6px;
}

.hero__subtitle {
  color: var(--lavender);
  font-size: 18px;
  line-height: 1.6;
  font-weight: 500;
  margin: 0 auto 40px auto;
  max-width: 420px;
}

.hero__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

@media (max-width: 760px) {
  .hero {
    aspect-ratio: auto;
    min-height: 560px;
    padding: 56px 24px;
  }
  .hero__logo {
    height: 52px;
    width: 170px;
  }
}
</style>
