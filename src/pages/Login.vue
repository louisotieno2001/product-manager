<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const error = ref('')

const auth = useAuthStore()
const router = useRouter()

async function handleLogin() {
  error.value = ''
  try {
    await auth.login(username.value, password.value)
    router.push('/products')
  } catch (e) {
    error.value = 'Invalid username or password'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-primary">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="username" class="block mb-1 font-semibold">Username</label>
          <input v-model="username" id="username" type="text" class="w-full border border-gray-300 rounded px-3 py-2" required />
        </div>
        <div>
          <label for="password" class="block mb-1 font-semibold">Password</label>
          <input v-model="password" id="password" type="password" class="w-full border border-gray-300 rounded px-3 py-2" required />
        </div>
        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
        <button type="submit" class="w-full bg-primary text-white py-2 rounded hover:bg-blue-900">Login</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>
