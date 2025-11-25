<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'

const router = useRouter()
const productStore = useProductStore()

const title = ref('')
const description = ref('')
const category = ref('')
const price = ref('')
const stock = ref('')
const thumbnail = ref('')
const error = ref('')
const isSubmitting = ref(false)

async function handleSubmit() {
  error.value = ''

  // Validation
  if (!title.value || !description.value || !category.value || !price.value || !stock.value || !thumbnail.value) {
    error.value = 'All fields are required'
    return
  }

  if (isNaN(Number(price.value)) || Number(price.value) < 0) {
    error.value = 'Price must be a valid positive number'
    return
  }

  if (isNaN(Number(stock.value)) || Number(stock.value) < 0) {
    error.value = 'Stock must be a valid non-negative number'
    return
  }

  isSubmitting.value = true

  try {
    const newProduct = {
      title: title.value,
      description: description.value,
      category: category.value,
      price: Number(price.value),
      stock: Number(stock.value),
      thumbnail: thumbnail.value
    }

    await productStore.addProduct(newProduct)
    router.push('/products')
  } catch (err) {
    error.value = 'Failed to add product. Please try again.'
    console.error(err)
  } finally {
    isSubmitting.value = false
  }
}

function goBack() {
  router.push('/products')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 class="text-3xl font-bold mb-2 text-primary">Add New Product</h2>
      <p class="text-gray-600 mb-6">Fill in all the details to create a new product</p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Error Message -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <!-- Title -->
        <div>
          <label for="title" class="block mb-2 font-semibold text-gray-900">Title *</label>
          <input
            v-model="title"
            id="title"
            type="text"
            required
            placeholder="Product title"
            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block mb-2 font-semibold text-gray-900">Description *</label>
          <textarea
            v-model="description"
            id="description"
            rows="4"
            required
            placeholder="Product description"
            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block mb-2 font-semibold text-gray-900">Category *</label>
          <input
            v-model="category"
            id="category"
            type="text"
            required
            placeholder="e.g., Electronics"
            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <!-- Price -->
        <div>
          <label for="price" class="block mb-2 font-semibold text-gray-900">Price *</label>
          <input
            v-model="price"
            id="price"
            type="number"
            step="0.01"
            required
            placeholder="0.00"
            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <!-- Stock -->
        <div>
          <label for="stock" class="block mb-2 font-semibold text-gray-900">Stock *</label>
          <input
            v-model="stock"
            id="stock"
            type="number"
            required
            placeholder="0"
            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <!-- Thumbnail URL -->
        <div>
          <label for="thumbnail" class="block mb-2 font-semibold text-gray-900">Thumbnail URL *</label>
          <input
            v-model="thumbnail"
            id="thumbnail"
            type="url"
            required
            placeholder="https://example.com/image.jpg"
            class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <!-- Image Preview -->
        <div v-if="thumbnail" class="flex justify-center">
          <img
            :src="thumbnail"
            alt="Preview"
            class="max-w-xs max-h-48 object-cover rounded"
            @error="error = 'Invalid image URL'"
          />
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 pt-6">
          <button
            type="button"
            @click="goBack"
            class="flex-1 px-6 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-900 font-semibold disabled:opacity-50"
          >
            {{ isSubmitting ? 'Adding...' : 'Add Product' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>