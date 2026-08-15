<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const testimonials = [
  { name: 'José Ruiz', company: 'Marcatexto', quote: 'Son muy profesionales, tienen gran atención y me ayudaron a crear un sistema legal laboral. Los recomiendo ampliamente.' },
  { name: 'Ana Bustamante', company: 'Grupo Sonora Alimentos', quote: 'Nos ayudaron a ordenar contratos y políticas internas antes de que se convirtieran en un problema. Un equipo muy sólido.' },
  { name: 'Roberto Elías', company: 'Constructora del Noroeste', quote: 'El acompañamiento en materia de REPSE fue clave para renovar nuestro registro sin contratiempos. Excelente respuesta.' },
  { name: 'Marina Loustaunau', company: 'Textiles Hermosillo', quote: 'Su enfoque preventivo nos dio tranquilidad. Ya no operamos con incertidumbre legal en temas laborales.' },
  { name: 'Diego Salcido', company: 'Logística Frontera', quote: 'Atención rápida y clara, siempre explican las cosas en términos que entendemos como empresa.' },
  { name: 'Paola Duarte', company: 'Clínica Sonora Salud', quote: 'Nos guiaron paso a paso en la gestoría patronal. Recomendados totalmente para cualquier empresa.' },
]

const index = ref(0)
const testimonial = computed(() => testimonials[index.value])
let timer

onMounted(() => {
  timer = setInterval(() => {
    index.value = (index.value + 1) % testimonials.length
  }, 5000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="testimonial">
    <div class="testimonial__card">
      <div class="testimonial__stars">★★★★★</div>
      <p class="testimonial__quote">
        "{{ testimonial.quote }}"
        <span class="testimonial__author">— {{ testimonial.name }}, {{ testimonial.company }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.testimonial {
  background: var(--blue);
  padding: 18px 48px;
  text-align: center;
}

.testimonial__card {
  background: #fff;
  border-radius: 14px;
  padding: 16px 24px;
  max-width: 720px;
  margin: 0 auto;
}

.testimonial__stars {
  color: var(--yellow);
  font-size: 11px;
  margin-bottom: 5px;
}

.testimonial__quote {
  font-size: 13px;
  line-height: 1.4;
  color: var(--dark-blue);
  font-weight: 600;
  margin: 0 auto;
  max-width: 680px;
}

.testimonial__author {
  color: var(--blue);
  font-weight: 700;
}

@media (max-width: 760px) {
  .testimonial {
    padding: 16px 24px;
  }
}
</style>
