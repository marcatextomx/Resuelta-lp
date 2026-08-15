<script setup>
const props = defineProps({
  block: { type: Object, required: true },
  canRemove: { type: Boolean, default: false },
})
const emit = defineEmits(['update', 'remove', 'add-text', 'add-image', 'add-video'])

function onTextInput(e) {
  emit('update', { ...props.block, content: e.target.value })
}

function onVideoInput(e) {
  emit('update', { ...props.block, content: e.target.value })
}

function onFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  emit('update', { ...props.block, file, previewUrl: URL.createObjectURL(file) })
}
</script>

<template>
  <div class="block">
    <textarea
      v-if="block.type === 'text'"
      :value="block.content"
      placeholder="Escribe el contenido aquí..."
      rows="4"
      class="block__textarea"
      @input="onTextInput"
    ></textarea>

    <div v-else-if="block.type === 'image'" class="block__image-wrap">
      <img v-if="block.previewUrl || block.url" :src="block.previewUrl || block.url" alt="" class="block__image-preview" />
      <label class="block__image-drop" :class="{ 'block__image-drop--has-image': block.previewUrl || block.url }">
        <span v-if="!(block.previewUrl || block.url)">Arrastra o selecciona una imagen</span>
        <span v-else class="block__image-replace">Cambiar imagen</span>
        <input type="file" accept="image/*" class="block__file-input" @change="onFileChange" />
      </label>
      <span class="block__remove-badge" @click="emit('remove')">&times;</span>
    </div>

    <div v-else-if="block.type === 'video'" class="block__video-row">
      <input
        type="text"
        :value="block.content"
        placeholder="Link de YouTube"
        class="block__video-input"
        @input="onVideoInput"
      />
      <span class="block__video-remove" @click="emit('remove')">Quitar</span>
    </div>

    <div class="block__actions">
      <span class="block__action" @click="emit('add-text')">+ Texto</span>
      <span class="block__action" @click="emit('add-image')">+ Imagen</span>
      <span class="block__action" @click="emit('add-video')">+ Video</span>
      <span v-if="canRemove && block.type === 'text'" class="block__action block__action--remove" @click="emit('remove')">
        Eliminar bloque
      </span>
    </div>
  </div>
</template>

<style scoped>
.block__textarea {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  font-size: 14px;
  line-height: 1.6;
  color: var(--dark-blue);
  outline: none;
  resize: vertical;
  font-family: inherit;
}

.block__image-wrap {
  position: relative;
}

.block__image-preview {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}

.block__image-drop {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 220px;
  border-radius: 10px;
  border: 1.5px dashed var(--border);
  color: var(--text-faint);
  font-size: 13px;
  cursor: pointer;
  background: var(--bg);
}

.block__image-drop--has-image {
  position: absolute;
  inset: 0;
  height: auto;
  background: rgba(13, 43, 78, 0.35);
  border: none;
  opacity: 0;
  transition: opacity 0.15s;
}

.block__image-drop--has-image:hover {
  opacity: 1;
}

.block__image-replace {
  color: #fff;
  font-weight: 700;
}

.block__file-input {
  display: none;
}

.block__remove-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #fff;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: var(--pink);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.block__video-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.block__video-input {
  flex: 1;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  font-size: 14px;
  color: var(--dark-blue);
  outline: none;
}

.block__video-remove {
  color: var(--pink);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}

.block__actions {
  display: flex;
  gap: 14px;
  padding: 8px 2px;
}

.block__action {
  font-size: 12px;
  color: var(--text-faint);
  font-weight: 700;
  cursor: pointer;
}

.block__action--remove {
  color: var(--pink);
  margin-left: auto;
}
</style>
