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
  <div class="min-h-screen bg-[#050B19] text-slate-100 px-4 sm:px-6 lg:px-10 py-8">
    <div class="flex items-center justify-between mb-8">
      <button
        @click="goBack"
        class="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition"
      >
        ← Back to Products
      </button>
      <span v-if="product" class="text-xs uppercase tracking-[0.4em] text-slate-500">Product</span>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center h-64 text-slate-400">
      Loading product...
    </div>

    <div v-else-if="product" class="bg-[#0E1525] border border-white/5 rounded-3xl shadow-2xl overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div class="p-8 flex items-center justify-center bg-[#050B19] border-r border-white/5">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="w-full max-w-md object-cover rounded-2xl border border-white/10"
          />
        </div>

        <div class="p-8 space-y-6">
          <div>
            <p class="text-xs uppercase tracking-[0.4em] text-slate-500">Overview</p>
            <h1 class="text-4xl font-semibold text-white mt-2">{{ product.title }}</h1>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-[#050B19] border border-white/5 rounded-2xl p-4">
              <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Category</p>
              <p class="text-lg font-semibold text-white mt-1 capitalize">{{ product.category }}</p>
            </div>
            <div class="bg-[#050B19] border border-white/5 rounded-2xl p-4">
              <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Price</p>
              <p class="text-2xl font-semibold text-emerald-300 mt-1">${{ product.price.toFixed(2) }}</p>
            </div>
            <div class="bg-[#050B19] border border-white/5 rounded-2xl p-4">
              <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Stock</p>
              <p
                class="text-lg font-semibold mt-1"
                :class="product.stock > 0 ? 'text-emerald-300' : 'text-rose-300'"
              >
                {{ product.stock }} units
              </p>
            </div>
            <div class="bg-[#050B19] border border-white/5 rounded-2xl p-4" v-if="product.rating">
              <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Rating</p>
              <p class="text-lg font-semibold text-white mt-1">⭐ {{ product.rating }}/5</p>
            </div>
            <div class="bg-[#050B19] border border-white/5 rounded-2xl p-4" v-if="product.discountPercentage">
              <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Discount</p>
              <p class="text-lg font-semibold text-amber-300 mt-1">{{ product.discountPercentage }}% off</p>
            </div>
          </div>

          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">Description</p>
            <p class="text-slate-300 leading-relaxed">
              {{ product.description }}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="goBack"
              class="flex-1 px-6 py-3 rounded-2xl border border-white/10 text-slate-200 hover:bg-white/5 transition"
            >
              Back to Products
            </button>
            <button
              @click="showDeleteModal = true"
              class="flex-1 px-6 py-3 rounded-2xl bg-rose-500 text-white font-semibold hover:bg-rose-400 transition"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-slate-400 py-20 space-y-4">
      <p class="text-2xl">Product not found.</p>
      <button
        @click="goBack"
        class="px-6 py-3 bg-indigo-500 text-white rounded-2xl hover:bg-indigo-400 transition"
      >
        Back to Products
      </button>
    </div>

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-[#0E1525] border border-white/5 rounded-3xl p-6 w-full max-w-sm space-y-4">
        <h3 class="text-xl font-semibold text-white">Delete Product?</h3>
        <p class="text-slate-300 text-sm">
          Are you sure you want to delete "<span class="font-semibold">{{ product?.title }}</span>"? This action cannot be undone.
        </p>
        <div class="flex gap-3">
          <button
            @click="showDeleteModal = false"
            :disabled="isDeleting"
            class="flex-1 px-4 py-2 rounded-2xl border border-white/10 text-slate-200 hover:bg-white/5 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            @click="handleDelete"
            :disabled="isDeleting"
            class="flex-1 px-4 py-2 rounded-2xl bg-rose-500 text-white font-semibold hover:bg-rose-400 transition disabled:opacity-50"
          >
            {{ isDeleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
