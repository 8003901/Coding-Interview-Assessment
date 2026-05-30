<script setup lang="ts">
import { ref } from 'vue'
import ProductDetail from './components/ProductDetail.vue'
import CartBadge from './components/CartBadge.vue'

const cartCount = ref(0)
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1 class="app-logo">Shop</h1>
      <CartBadge :count="cartCount" />
    </header>
    <main class="app-main">
      <ProductDetail product-id="P001" @cart-update="cartCount = $event" />
    </main>
  </div>
</template>
