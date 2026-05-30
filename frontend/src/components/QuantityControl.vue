<script setup lang="ts">
defineProps<{
  quantity: number
  maxStock: number
}>()

const emit = defineEmits<{ change: [qty: number] }>()
</script>

<template>
  <div class="quantity-control">
    <label class="quantity-label">Quantity</label>
    <div class="quantity-input-group">
      <button
        class="qty-btn"
        :disabled="quantity <= 1"
        @click="emit('change', quantity - 1)"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span class="qty-value">{{ quantity }}</span>
      <button
        class="qty-btn"
        :disabled="quantity >= maxStock"
        @click="emit('change', quantity + 1)"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  </div>
</template>
