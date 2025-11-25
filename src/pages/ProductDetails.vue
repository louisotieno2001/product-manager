<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const product = ref<any>(null)
const isLoading = ref(false)
const showDeleteModal = ref(false)
const isDeleting = ref(false)

const productId = Number(route.params.id)

onMounted(async () => {
  await loadProduct()
})

async function loadProduct() {
  isLoading.value = true
  try {
    product.value = await productStore.fetchProductById(productId)
  } catch (error) {
    console.error('Failed to load product:', error)
  } finally {
    isLoading.value = false
  }
}

async function handleDelete() {
  isDeleting.value = true
  try {
    await productStore.deleteProduct(productId)
    router.push('/products')
  } catch (error) {
    console.error('Failed to delete product:', error)
    isDeleting.value = false
  }
}

function goBack() {
  router.push('/products')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          @click="goBack"
          class="text-primary hover:text-blue-900 font-semibold mb-4"
        >
          ← Back to Products
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p class="text-center text-gray-600">Loading product...</p>
    </div>

    <!-- Product Details -->
    <div v-else-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <!-- Product Image -->
          <div class="flex items-center justify-center">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full max-w-md object-cover rounded-lg"
            />
          </div>

          <!-- Product Info -->
          <div>
            <h1 class="text-4xl font-bold text-primary mb-4">{{ product.title }}</h1>

            <div class="mb-6 space-y-3">
              <div>
                <label class="text-gray-600 font-semibold">Category:</label>
                <p class="text-gray-900">{{ product.category }}</p>
              </div>
              <div>
                <label class="text-gray-600 font-semibold">Price:</label>
                <p class="text-3xl font-bold text-primary">${{ product.price.toFixed(2) }}</p>
              </div>
              <div>
                <label class="text-gray-600 font-semibold">Stock:</label>
                <p :class="{ 'text-green-600': product.stock > 0, 'text-red-600': product.stock === 0 }">
                  {{ product.stock }} units available
                </p>
              </div>
              <div v-if="product.rating">
                <label class="text-gray-600 font-semibold">Rating:</label>
                <p class="text-gray-900">⭐ {{ product.rating }}/5</p>
              </div>
              <div v-if="product.discountPercentage">
                <label class="text-gray-600 font-semibold">Discount:</label>
                <p class="text-red-600 font-semibold">{{ product.discountPercentage }}% off</p>
              </div>
            </div>

            <div class="mb-6">
              <label class="text-gray-600 font-semibold block mb-2">Description:</label>
              <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4">
              <button
                @click="goBack"
                class="flex-1 px-6 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 font-semibold"
              >
                Back to Home
              </button>
              <button
                @click="showDeleteModal = true"
                class="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <p class="text-red-600 text-xl mb-4">Product not found</p>
        <button
          @click="goBack"
          class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-900"
        >
          Back to Products
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 class="text-xl font-bold mb-4">Delete Product?</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete "{{ product.title }}"? This action cannot be undone.
        </p>
        <div class="flex gap-4">
          <button
            @click="showDeleteModal = false"
            :disabled="isDeleting"
            class="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            @click="handleDelete"
            :disabled="isDeleting"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            {{ isDeleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
