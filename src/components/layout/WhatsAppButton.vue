<template>
  <a
    href="https://wa.me/526623188301"
    target="_blank"
    rel="noopener"
    class="wa-button"
  >
    Contactar
  </a>
</template>

<style scoped>
.wa-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 30;
  background: var(--whatsapp);
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  padding: 14px 24px;
  border-radius: 30px;
  box-shadow: 0 8px 20px rgba(37, 211, 102, 0.35);
}

.wa-button:hover {
  background: var(--whatsapp-hover);
  color: #fff;
}
</style>
