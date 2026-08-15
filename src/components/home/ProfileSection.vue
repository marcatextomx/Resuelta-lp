<script setup>
import joelPhoto from '../../assets/joel-photo.png'
</script>

<template>
  <div id="nosotros" class="profile">
    <div class="profile__grid">
      <div class="profile__text">
        <h3 class="profile__name">Lic. Joel Pérez</h3>
        <div class="profile__line"></div>
        <p class="profile__role">Socio Fundador | Especialista en Compliance Laboral y Gestión de Riesgo Patronal</p>
        <p class="profile__desc">
          Especialista en el diseño e implementación de esquemas de cumplimiento normativo, enfocado en
          auditar, estructurar y mitigar riesgos legales en la gestión del capital humano.
        </p>
      </div>
      <img :src="joelPhoto" alt="Lic. Joel Pérez" class="profile__photo" />
    </div>
  </div>
</template>

<style scoped>
.profile {
  padding: 104px 48px;
  background: #fff;
  position: relative;
  overflow: hidden;
}

.profile__grid {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 32px;
  align-items: center;
  max-width: 760px;
  margin: 0 auto;
}

.profile__text {
  text-align: left;
  order: 1;
}

.profile__line {
  width: 48px;
  height: 4px;
  background: var(--blue);
  border-radius: 2px;
  margin: 10px 0 0 0;
}

.profile__name {
  font-size: 26px;
  font-weight: 800;
  color: var(--dark-blue);
  margin: 0 0 2px 0;
}

.profile__role {
  font-size: 12px;
  color: var(--text-faint);
  font-weight: 700;
  letter-spacing: 0.5px;
  margin: 16px 0 12px 0;
  text-transform: uppercase;
}

.profile__desc {
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-muted);
  font-weight: 500;
  margin: 0;
  max-width: 420px;
}

.profile__photo {
  width: 257px;
  height: 335px;
  object-fit: cover;
  border-radius: 16px;
  order: 2;
}

@media (max-width: 760px) {
  .profile {
    padding: 64px 24px;
  }
  .profile__grid {
    grid-template-columns: 1fr;
  }
  .profile__text {
    text-align: center;
    order: 2;
  }
  .profile__line {
    margin: 10px auto 0 auto;
  }
  .profile__desc {
    margin: 0 auto;
  }
  .profile__photo {
    order: 1;
    margin: 0 auto;
  }
}
</style>
