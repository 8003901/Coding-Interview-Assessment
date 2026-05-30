<script setup lang="ts">
defineProps<{
  disabled: boolean
  loading: boolean
  outOfStock: boolean
}>()

defineEmits<{ click: [] }>()
</script>

<template>
  <button
    class="add-to-cart-btn"
    :class="{ 'out-of-stock': outOfStock }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span v-if="loading" class="btn-loading">
      <span class="spinner" />
      Adding...
    </span>
    <span v-else-if="outOfStock">Out of Stock</span>
    <span v-else>Add to Cart</span>
  </button>
</template>
