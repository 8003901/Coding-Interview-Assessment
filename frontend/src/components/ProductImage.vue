<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  images: string[]
  name: string
}>()

const src = computed(() =>
  props.images.length > 0
    ? props.images[0]
    : 'https://placehold.co/600x600/e2e8f0/64748b?text=No+Image',
)
</script>

<template>
  <div class="product-image">
    <img :src="src" :alt="name" />
  </div>
</template>
