
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useProductStore } from '../stores/products'

const router = useRouter()
const auth = useAuthStore()
const productStore = useProductStore()

const searchQuery = ref('')

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts()
  }
})

const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return productStore.products
  }
  return productStore.products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function viewDetails(id: number) {
  router.push(`/products/${id}`)
}

function goToAddProduct() {
  router.push('/products/new')
}

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold text-primary">Products</h1>
          <button @click="handleLogout" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Add Product Bar -->
      <div class="mb-6 flex gap-4 items-center">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products by title..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          @click="goToAddProduct"
          class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 font-semibold"
        >
          Add New Product
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="productStore.isLoading" class="text-center py-12">
        <p class="text-gray-600">Loading products...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="productStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {{ productStore.error }}
      </div>

      <!-- Products Table -->
      <div v-else class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="min-w-full">
          <thead class="bg-gray-200 border-b">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Thumbnail</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Stock</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr
              v-for="product in filteredProducts"
              :key="product.id"
              @click="viewDetails(product.id)"
              class="hover:bg-gray-50 cursor-pointer transition"
            >
              <td class="px-6 py-4">
                <img
                  :src="product.thumbnail"
                  :alt="product.title"
                  class="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ product.title }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ product.description.substring(0, 50) }}...
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ product.category }}</td>
              <td class="px-6 py-4 text-sm font-semibold text-primary">${{ product.price.toFixed(2) }}</td>
              <td class="px-6 py-4 text-sm">
                <span
                  :class="{
                    'px-3 py-1 rounded-full text-white': true,
                    'bg-green-600': product.stock > 0,
                    'bg-red-600': product.stock === 0
                  }"
                >
                  {{ product.stock }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="text-center py-12">
          <p class="text-gray-600">No products found matching your search.</p>
        </div>
      </div>
    </div>
  </div>
</template>
