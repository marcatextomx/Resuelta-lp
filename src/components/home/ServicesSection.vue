<script setup>
const services = [
  { num: '01', title: 'Contratación y Blindaje Documental', desc: 'Contratos a medida, convenios de confidencialidad y formatos operativos.' },
  { num: '02', title: 'Compliance y Normatividad', desc: 'Comisiones Mixtas, Reglamento Interior (RIT) ante CFCRL y Protocolos Obligatorios.' },
  { num: '03', title: 'Capacitación y Registros STPS', desc: 'Planes y programas de capacitación y adiestramiento.' },
  { num: '04', title: 'Gestión de Terminaciones y Conciliación', desc: 'Cálculos de finiquitos, convenios de salida y representación conciliatoria.' },
  { num: '05', title: 'Especialización REPSE y Gestoría Patronal', desc: 'Trámites FONACOT, padrón REPSE e informativas (ICSOE/SISUB).' },
  { num: '06', title: 'Consultoría y Capacitación Continua', desc: 'Asesoría remota y/o presencial en materia laboral, y talleres ejecutivos.' },
]
</script>

<template>
  <div id="servicios" class="services">
    <h2 class="services__title">Así podemos ayudarte</h2>
    <div class="services__grid">
      <div v-for="s in services" :key="s.num" class="services__card">
        <span class="services__num">{{ s.num }}</span>
        <h3 class="services__card-title">{{ s.title }}</h3>
        <p class="services__card-desc">{{ s.desc }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.services {
  padding: 128px 48px 136px 48px;
  background: var(--bg);
  position: relative;
  overflow: hidden;
}

.services__title {
  text-align: center;
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -1px;
  color: var(--dark-blue);
  margin: 0 0 44px 0;
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1100px;
  margin: 0 auto;
}

.services__card {
  background: #fff;
  border-radius: 16px;
  padding: 26px;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.services__num {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--blue);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}

.services__card-title {
  font-size: 17px;
  font-weight: 800;
  color: var(--dark-blue);
  margin: 0 0 8px 0;
  line-height: 1.25;
}

.services__card-desc {
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--text-muted);
  margin: 0;
}

@media (max-width: 760px) {
  .services {
    padding: 72px 20px 80px 20px;
  }
  .services__grid {
    grid-template-columns: 1fr;
  }
}
</style>
