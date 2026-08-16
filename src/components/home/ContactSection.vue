<script setup>
import { reactive, ref, computed } from 'vue'
import logoWhite from '../../assets/logo-white.png'

const form = reactive({ nombre: '', telefono: '', empresa: '', empleados: '' })
const attemptedSubmit = ref(false)
const sending = ref(false)

const formValid = computed(
  () => !!(form.nombre.trim() && form.telefono.trim() && form.empresa.trim() && String(form.empleados).trim()),
)

const errors = computed(() =>
  attemptedSubmit.value
    ? {
        nombre: !form.nombre.trim(),
        telefono: !form.telefono.trim(),
        empresa: !form.empresa.trim(),
        empleados: !String(form.empleados).trim(),
      }
    : { nombre: false, telefono: false, empresa: false, empleados: false },
)

async function onSubmit() {
  if (!formValid.value) {
    attemptedSubmit.value = true
    return
  }
  sending.value = true
  try {
    // Loaded on demand: most visitors never submit, so this keeps the
    // Firebase SDK out of the initial page weight entirely.
    const { createLead } = await import('../../firebase/leads')
    await createLead({ ...form })
  } catch (e) {
    console.error('No se pudo guardar el contacto', e)
  } finally {
    sending.value = false
  }
  const msg = `Hola, quiero agendar una cita.\nNombre: ${form.nombre}\nTeléfono: ${form.telefono}\nEmpresa: ${form.empresa}\n# Empleados: ${form.empleados}`
  window.open(`https://wa.me/526623188301?text=${encodeURIComponent(msg)}`, '_blank')
}
</script>

<template>
  <div id="contacto" class="contact">
    <div class="contact__box">
      <div class="contact__info">
        <img
          :src="logoWhite"
          alt="Resuelta — abogados laborales para empresas"
          class="contact__logo"
          width="201"
          height="53"
          loading="lazy"
        />
        <a href="https://wa.me/526623188301" target="_blank" rel="noopener" class="contact__whatsapp">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#25d366" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 4 3.4.6.2 1 .4 1.3.5.6.2 1.1.1 1.5-.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3z" />
          </svg>
          (662) 318 8301
        </a>
        <p class="contact__email">
          <a href="mailto:contacto@resuelta.mx" class="contact__email-link">contacto@resuelta.mx</a>
        </p>
        <address class="contact__address">
          Blvd. Paseo las Quintas #77A, casi esquina con Navarrete, Colonia Santa Fe, CP 83249, Hermosillo,
          Sonora.
        </address>
        <p class="contact__hours">Lunes a Viernes | 8 AM – 3 PM</p>
        <div class="contact__socials">
          <a href="https://instagram.com/resuelta.legal" target="_blank" rel="noopener" aria-label="Instagram de Resuelta">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.3" cy="6.7" r="1.1" fill="#fff" stroke="none" />
            </svg>
          </a>
          <a href="https://facebook.com/resuelta.legal" target="_blank" rel="noopener" aria-label="Facebook de Resuelta">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
              <path d="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46H16.5V4.34C16.24 4.3 15.35 4.22 14.31 4.22c-2.16 0-3.64 1.32-3.64 3.74V10.5H8v3h2.67V21h2.83z" />
            </svg>
          </a>
        </div>
      </div>
      <div class="contact__form">
        <h2 class="contact__form-title">Agenda una cita</h2>
        <p class="contact__form-subtitle">Obtén un diagnóstico laboral legal gratis, solo durante 2026.</p>
        <div class="contact__fields">
          <div class="contact__field">
            <label>Nombre</label>
            <input
              v-model="form.nombre"
              type="text"
              placeholder="Tu nombre"
              :class="{ 'contact__input--error': errors.nombre }"
              class="contact__input"
            />
            <span v-if="errors.nombre" class="contact__error">* Es necesario</span>
          </div>
          <div class="contact__field">
            <label>Teléfono</label>
            <input
              v-model="form.telefono"
              type="tel"
              placeholder="662 000 0000"
              :class="{ 'contact__input--error': errors.telefono }"
              class="contact__input"
            />
            <span v-if="errors.telefono" class="contact__error">* Es necesario</span>
          </div>
          <div class="contact__field">
            <label>Empresa</label>
            <input
              v-model="form.empresa"
              type="text"
              placeholder="Nombre de tu empresa"
              :class="{ 'contact__input--error': errors.empresa }"
              class="contact__input"
            />
            <span v-if="errors.empresa" class="contact__error">* Es necesario</span>
          </div>
          <div class="contact__field">
            <label># Empleados</label>
            <input
              v-model="form.empleados"
              type="number"
              placeholder="Ej. 25"
              :class="{ 'contact__input--error': errors.empleados }"
              class="contact__input"
            />
            <span v-if="errors.empleados" class="contact__error">* Es necesario</span>
          </div>
          <button
            class="contact__submit"
            :class="{ 'contact__submit--disabled': !formValid }"
            :disabled="sending"
            @click="onSubmit"
          >
            Enviar&nbsp;<span>→</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact {
  background: var(--bg-alt);
  width: 100%;
  padding: 104px 48px;
  position: relative;
  overflow: hidden;
}

.contact__box {
  max-width: 1100px;
  margin: 0 auto;
  background: var(--dark-blue);
  border-radius: 20px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.contact__info {
  padding: 48px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 353px;
}

.contact__logo {
  height: 53px;
  width: 201px;
  display: block;
  margin-bottom: 22px;
}

.contact__whatsapp {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 14px 0;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact__email {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 14px 0;
}

.contact__email-link {
  color: #fff;
  text-decoration: none;
}

.contact__email-link:hover {
  color: #fff;
  text-decoration: underline;
}

.contact__address {
  font-style: normal;
  display: block;
  color: var(--lavender);
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 14px 0;
  max-width: 320px;
}

.contact__hours {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 18px 0;
}

.contact__socials {
  display: flex;
  align-items: center;
  gap: 14px;
}

.contact__socials a {
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact__form {
  padding: 48px 44px;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
}

.contact__form-title {
  color: var(--dark-blue);
  font-size: 30px;
  font-weight: 800;
  margin: 0 0 8px 0;
}

.contact__form-subtitle {
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 22px 0;
}

.contact__fields {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.contact__field {
  position: relative;
}

.contact__field label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4px;
  color: var(--dark-blue);
  margin-bottom: 5px;
  text-transform: uppercase;
}

.contact__input {
  width: 100%;
  padding: 11px 12px;
  border-radius: 8px;
  border: 1px solid #eceff4;
  font-size: 13.5px;
  color: #000;
  font-weight: 500;
  background: var(--bg);
}

.contact__input--error {
  border-color: var(--pink);
}

.contact__error {
  position: absolute;
  right: 12px;
  top: 35px;
  font-size: 11px;
  font-weight: 600;
  color: var(--pink);
}

.contact__submit {
  background: var(--blue);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  padding: 13px 18px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 6px;
  height: 30px;
  width: 203px;
  align-self: flex-end;
  transition: background 0.2s;
}

.contact__submit:hover {
  background: #2b2f3a;
}

.contact__submit--disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 760px) {
  .contact {
    padding: 64px 20px;
  }
  .contact__box {
    grid-template-columns: 1fr;
  }
  .contact__info {
    width: 100%;
    padding: 36px 28px;
  }
  .contact__form {
    padding: 36px 28px;
  }
}
</style>
