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
const thumbnailFile = ref<File | null>(null)
const error = ref('')
const isSubmitting = ref(false)

function onFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files
  if (!files || files.length === 0) return
  const file = files[0]
  if (file) {
    thumbnailFile.value = file
    thumbnail.value = URL.createObjectURL(file)
  }
}

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
  <div class="min-h-screen bg-[#050B19] flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-3xl bg-[#0E1525] border border-white/5 rounded-3xl shadow-2xl p-8 text-slate-100">
      <div class="mb-8 text-center space-y-2">
        <p class="text-xs uppercase tracking-[0.35em] text-slate-500">Catalog</p>
        <h2 class="text-3xl font-semibold text-white">Add New Product</h2>
        <p class="text-slate-400">Provide the details below to publish an item into your marketplace.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div v-if="error" class="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-200 text-sm">
          {{ error }}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="space-y-2">
            <label for="title" class="text-sm font-semibold text-slate-300">Title *</label>
            <input
              v-model="title"
              id="title"
              type="text"
              required
              placeholder="Product title"
              class="w-full bg-[#050B19] border border-white/10 rounded-2xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>

          <div class="space-y-2">
            <label for="category" class="text-sm font-semibold text-slate-300">Category *</label>
            <input
              v-model="category"
              id="category"
              type="text"
              required
              placeholder="e.g., Electronics"
              class="w-full bg-[#050B19] border border-white/10 rounded-2xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:outline-none"
            />
          </div>

          <div class="space-y-2">
            <label for="price" class="text-sm font-semibold text-slate-300">Price *</label>
            <input
              v-model="price"
              id="price"
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              class="w-full bg-[#050B19] border border-white/10 rounded-2xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:outline-none"
            />
          </div>

          <div class="space-y-2">
            <label for="stock" class="text-sm font-semibold text-slate-300">Stock *</label>
            <input
              v-model="stock"
              id="stock"
              type="number"
              required
              placeholder="0"
              class="w-full bg-[#050B19] border border-white/10 rounded-2xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:outline-none"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label for="description" class="text-sm font-semibold text-slate-300">Description *</label>
          <textarea
            v-model="description"
            id="description"
            rows="4"
            required
            placeholder="Tell buyers what makes this product special"
            class="w-full bg-[#050B19] border border-white/10 rounded-2xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/40 focus:outline-none"
          ></textarea>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-300">Thumbnail *</label>
          <label
            class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer bg-[#050B19]/60 hover:border-indigo-400/60 transition"
          >
            <input
              type="file"
              accept="image/*"
              class="hidden"
              @change="onFileChange"
            />
            <span class="text-sm text-slate-400">Click to upload an image (JPG, PNG, GIF)</span>
            <span v-if="thumbnailFile" class="text-xs text-slate-500 mt-2">{{ thumbnailFile?.name }}</span>
          </label>
        </div>

        <div v-if="thumbnail" class="bg-[#050B19] border border-white/10 rounded-2xl p-4 flex justify-center">
          <img
            :src="thumbnail"
            alt="Preview"
            class="max-w-sm max-h-56 object-cover rounded-xl border border-white/5"
          />
        </div>

        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="button"
            @click="goBack"
            class="flex-1 px-6 py-3 rounded-2xl border border-white/10 text-slate-200 hover:bg-white/5 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 px-6 py-3 rounded-2xl bg-indigo-500 text-white font-semibold hover:bg-indigo-400 transition disabled:opacity-50"
          >
            {{ isSubmitting ? 'Adding...' : 'Add Product' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
