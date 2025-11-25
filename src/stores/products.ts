import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  stock: number
  thumbnail: string
  rating?: number
  discountPercentage?: number
}

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const getProducts = computed(() => products.value)

  async function fetchProducts() {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.get('https://dummyjson.com/products')
      products.value = response.data.products
    } catch (err) {
      error.value = 'Failed to fetch products'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchProductById(id: number) {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`)
      return response.data
    } catch (err) {
      error.value = 'Failed to fetch product'
      throw err
    }
  }

  async function deleteProduct(id: number) {
    const auth = useAuthStore()
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      })
      products.value = products.value.filter(p => p.id !== id)
      return true
    } catch (err) {
      error.value = 'Failed to delete product'
      throw err
    }
  }

  async function addProduct(productData: Omit<Product, 'id'>) {
    const auth = useAuthStore()
    try {
      const response = await axios.post('https://dummyjson.com/products/add', productData, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      })
      products.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = 'Failed to add product'
      throw err
    }
  }

  return {
    products,
    isLoading,
    error,
    getProducts,
    fetchProducts,
    fetchProductById,
    deleteProduct,
    addProduct
  }
})
