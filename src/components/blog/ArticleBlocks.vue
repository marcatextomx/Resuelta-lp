<script setup>
defineProps({
  blocks: { type: Array, default: () => [] },
  imageHeight: { type: String, default: '340px' },
})
</script>

<template>
  <template v-for="(block, i) in blocks" :key="i">
    <p v-if="block.type === 'text'" class="block-text">{{ block.content }}</p>
    <img
      v-else-if="block.type === 'image' && block.url"
      :src="block.url"
      alt=""
      class="block-image"
      :style="{ height: imageHeight }"
    />
    <div v-else-if="block.type === 'video' && block.embed" class="block-video" :style="{ paddingTop: '56.25%' }">
      <iframe :src="block.embed" allowfullscreen frameborder="0"></iframe>
    </div>
  </template>
</template>

<style scoped>
.block-text {
  font-size: 17px;
  line-height: 1.8;
  color: #2b3350;
  margin: 0 0 22px 0;
  white-space: pre-wrap;
}

.block-image {
  width: 100%;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 22px;
  display: block;
}

.block-video {
  position: relative;
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 22px;
}

.block-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
