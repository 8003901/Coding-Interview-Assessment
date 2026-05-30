<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { Variant, ToastMessage } from '../types'
import { getProductDetail, addToCart } from '../api/mockApi'
import ProductImage from './ProductImage.vue'
import VariantSelector from './VariantSelector.vue'
import QuantityControl from './QuantityControl.vue'
import AddToCartButton from './AddToCartButton.vue'
import Toast from './Toast.vue'

const props = defineProps<{ productId: string }>()
const emit = defineEmits<{ cartUpdate: [count: number] }>()

const loading = ref(true)
const error = ref<string | null>(null)
const product = ref<Awaited<ReturnType<typeof getProductDetail>> | null>(null)

const selectedColor = ref<string | null>(null)
const selectedSize = ref<string | null>(null)
const quantity = ref(1)
const addingToCart = ref(false)
const toast = ref<ToastMessage | null>(null)

let toastTimer: ReturnType<typeof setTimeout> | null = null

function reloadPage() {
  window.location.reload()
}

function showToast(msg: ToastMessage) {
  if (toastTimer) clearTimeout(toastTimer)
  toast.value = msg
  toastTimer = setTimeout(() => {
    toast.value = null
  }, 3000)
}

onMounted(async () => {
  try {
    const data = await getProductDetail(props.productId)
    product.value = data
    loading.value = false

    const colors = [...new Set(data.variants.map((v) => v.color))]
    const sizes = [...new Set(data.variants.map((v) => v.size))]
    if (colors.length > 0) selectedColor.value = colors[0]
    if (sizes.length > 0) selectedSize.value = sizes[0]
  } catch {
    loading.value = false
    error.value = 'Failed to load product details. Please try again.'
  }
})

onUnmounted(() => {
  if (toastTimer) clearTimeout(toastTimer)
})

// Reset quantity when variant changes
watch([selectedColor, selectedSize], () => {
  quantity.value = 1
})

const colors = () => product.value ? [...new Set(product.value.variants.map((v) => v.color))] : []
const sizes = () => product.value ? [...new Set(product.value.variants.map((v) => v.size))] : []

const currentVariant = (): Variant | undefined =>
  product.value?.variants.find(
    (v) => v.color === selectedColor.value && v.size === selectedSize.value,
  )

const outOfStock = () => !currentVariant() || currentVariant()!.stock === 0
const maxStock = () => currentVariant()?.stock ?? 0

async function handleAddToCart() {
  const variant = currentVariant()
  if (!variant || outOfStock()) return

  addingToCart.value = true
  try {
    const res = await addToCart({
      productId: props.productId,
      skuId: variant.skuId,
      quantity: quantity.value,
    })
    if (res.success) {
      showToast({ type: 'success', text: 'Added to cart!' })
      emit('cartUpdate', res.cartCount ?? 0)
    } else {
      showToast({ type: 'error', text: res.message ?? 'Failed to add to cart.' })
    }
  } catch {
    showToast({ type: 'error', text: 'An unexpected error occurred.' })
  } finally {
    addingToCart.value = false
  }
}
</script>

<template>
  <div v-if="loading" class="product-detail loading-state">
    <div class="skeleton-image" />
    <div class="skeleton-info">
      <div class="skeleton-line skeleton-title" />
      <div class="skeleton-line skeleton-price" />
      <div class="skeleton-line skeleton-text" />
      <div class="skeleton-line skeleton-text" />
      <div class="skeleton-line skeleton-text short" />
    </div>
  </div>

  <div v-else-if="error" class="product-detail error-state">
    <div class="error-card">
      <p class="error-icon">⚠️</p>
      <p class="error-text">{{ error }}</p>
      <button class="retry-btn" @click="reloadPage">
        Retry
      </button>
    </div>
  </div>

  <div v-else-if="product" class="product-detail">
    <Toast :message="toast" />
    <ProductImage :images="product.images" :name="product.name" />
    <div class="product-info">
      <h1 class="product-name">{{ product.name }}</h1>
      <p class="product-price">
        ${{ currentVariant()?.price.toLocaleString() ?? '—' }}
      </p>
      <p class="stock-status" :class="outOfStock() ? 'out-of-stock' : 'in-stock'">
        {{ outOfStock() ? 'Out of Stock' : `In Stock (${currentVariant()!.stock} available)` }}
      </p>
      <p class="product-description">{{ product.description }}</p>

      <VariantSelector
        :variants="product.variants"
        :colors="colors()"
        :sizes="sizes()"
        :selected-color="selectedColor"
        :selected-size="selectedSize"
        @color-change="selectedColor = $event"
        @size-change="selectedSize = $event"
      />

      <QuantityControl
        v-if="!outOfStock()"
        :quantity="quantity"
        :max-stock="maxStock()"
        @change="quantity = $event"
      />

      <AddToCartButton
        :disabled="outOfStock() || addingToCart || !currentVariant()"
        :loading="addingToCart"
        :out-of-stock="outOfStock()"
        @click="handleAddToCart"
      />
    </div>
  </div>
</template>
