<script setup lang="ts">
import { computed } from 'vue'
import type { Variant } from '../types'

const props = defineProps<{
  variants: Variant[]
  colors: string[]
  sizes: string[]
  selectedColor: string | null
  selectedSize: string | null
}>()

const emit = defineEmits<{
  colorChange: [color: string]
  sizeChange: [size: string]
}>()

const availableSizesForColor = computed(() =>
  props.selectedColor
    ? props.variants.filter((v) => v.color === props.selectedColor).map((v) => v.size)
    : [],
)

const availableColorsForSize = computed(() =>
  props.selectedSize
    ? props.variants.filter((v) => v.size === props.selectedSize).map((v) => v.color)
    : [],
)
</script>

<template>
  <div class="variant-selector">
    <div class="variant-group">
      <label class="variant-label">Color</label>
      <div class="variant-options">
        <button
          v-for="color in colors"
          :key="color"
          class="variant-btn"
          :class="{ selected: selectedColor === color }"
          :disabled="selectedSize !== null && !availableColorsForSize.includes(color)"
          @click="emit('colorChange', color)"
        >
          {{ color }}
        </button>
      </div>
    </div>

    <div class="variant-group">
      <label class="variant-label">Size</label>
      <div class="variant-options">
        <button
          v-for="size in sizes"
          :key="size"
          class="variant-btn"
          :class="{ selected: selectedSize === size }"
          :disabled="selectedColor !== null && !availableSizesForColor.includes(size)"
          @click="emit('sizeChange', size)"
        >
          {{ size }}
        </button>
      </div>
    </div>
  </div>
</template>
