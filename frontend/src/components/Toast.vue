<script setup lang="ts">
import type { ToastMessage } from '../types'

defineProps<{
  message: ToastMessage | null
}>()
</script>

<template>
  <Transition name="toast">
    <div v-if="message" class="toast" :class="`toast-${message.type}`">
      <span class="toast-icon">{{ message.type === 'success' ? '✓' : '✕' }}</span>
      <span class="toast-text">{{ message.text }}</span>
    </div>
  </Transition>
</template>
