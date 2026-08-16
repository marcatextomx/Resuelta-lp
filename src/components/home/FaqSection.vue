<script setup>
import { ref } from 'vue'

const faqs = [
  {
    q: '¿Qué hacen exactamente?',
    a: 'Implementamos sistemas preventivos de derecho laboral empresarial en tu empresa. Diseñamos contratos, políticas internas y demás medidas para prevenir demandas y contingencias laborales.',
  },
  {
    q: '¿Necesito ya tener un problema para contactarlos?',
    a: 'No. Nuestro enfoque es 100% preventivo. Actuamos antes de que un error se convierta en una multa o una contingencia costosa.',
  },
  {
    q: '¿Qué pasa si un empleado me demanda?',
    a: 'Te representamos en todo el proceso: desde la conciliación laboral obligatoria ante el Centro de Conciliación hasta el litigio laboral si es necesario. La defensa patronal oportuna reduce el riesgo de condenas económicas altas.',
  },
  {
    q: '¿Qué empresas los necesitan?',
    a: 'Cualquier empresa en México con personal contratado, desde PyMEs en expansión hasta corporativos que buscan ordenar sus operaciones, evitar multas o cumplir auditorías.',
  },
  {
    q: 'Ya tengo contador o abogado general, ¿aún así aplica?',
    a: 'Sí. Los contadores y abogados corporativos atienden temas fiscales, comerciales o litigios. Nosotros aportamos la especialización en derecho laboral empresarial y relaciones laborales para empresas.',
  },
]

const openIndex = ref(0)
function toggle(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>

<template>
  <div class="faq">
    <div class="faq__grid">
      <div>
        <h2 class="faq__title">Preguntas <br />frecuentes</h2>
      </div>
      <div>
        <div v-for="(f, i) in faqs" :key="f.q" class="faq__item" @click="toggle(i)">
          <div class="faq__row">
            <span class="faq__question">{{ f.q }}</span>
            <span class="faq__symbol">{{ openIndex === i ? '–' : '+' }}</span>
          </div>
          <p v-if="openIndex === i" class="faq__answer">{{ f.a }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq {
  padding: 104px 48px;
  background: var(--bg);
}

.faq__grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 40px;
  max-width: 1100px;
  margin: 0 auto;
  align-items: start;
}

.faq__title {
  font-size: 34px;
  font-weight: 800;
  color: var(--dark-blue);
  letter-spacing: -1px;
  line-height: 1.15;
  margin: 10px 0 0 0;
}

.faq__item {
  border-bottom: 1px solid var(--border);
  padding: 22px 0;
  cursor: pointer;
}

.faq__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.faq__question {
  font-size: 18px;
  font-weight: 700;
  color: var(--dark-blue);
}

.faq__symbol {
  font-size: 20px;
  color: var(--text-faint);
  flex: none;
}

.faq__answer {
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--text-muted);
  margin: 14px 0 0 0;
  max-width: 560px;
}

@media (max-width: 760px) {
  .faq {
    padding: 64px 24px;
  }
  .faq__grid {
    grid-template-columns: 1fr;
  }
}
</style>
