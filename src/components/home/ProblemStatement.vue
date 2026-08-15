<template>
  <div class="problem">
    <p class="problem__text">
      Transformamos el cumplimiento laboral en
      <span class="problem__accent">estabilidad, <br />reputación y ventaja competitiva</span>
      para tu empresa.
    </p>
  </div>
</template>

<style scoped>
.problem {
  background: var(--blue);
  padding: 56px 48px;
  text-align: center;
}

.problem__text {
  font-size: 25px;
  line-height: 1.55;
  color: #fff;
  font-weight: 700;
  margin: 0 auto;
  max-width: 820px;
}

.problem__accent {
  color: rgb(199, 211, 255);
  font-weight: 600;
}

@media (max-width: 760px) {
  .problem {
    padding: 48px 24px;
  }
  .problem__text {
    font-size: 20px;
  }
}
</style>
