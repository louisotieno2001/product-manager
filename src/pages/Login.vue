<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Eye as IconEye, EyeOff as IconEyeOff, Lock as IconLock } from 'lucide-vue-next'
import axios from 'axios'

interface User {
  email: string;
  username: string;
  // add other fields if necessary
}

const identification = ref('')
const password = ref('')
const error = ref('')
const isPasswordVisible = ref(false)
const rememberMe = ref(false)

const auth = useAuthStore()
const router = useRouter()

function isEmail(input: string): boolean {
  const emailRegex = /^[\w.\-]+@([\w\-]+\.)+[\w\-]{2,4}$/
  return emailRegex.test(input)
}

async function getUsernameByEmail(email: string): Promise<string | null> {
  try {
    const response = await axios.get('https://dummyjson.com/users')
    const userList = response.data.users as User[]
    const dummyUser = userList.find((u: User) => u.email.toLowerCase() === email.toLowerCase())
    if (!dummyUser) {
      return null
    }
    return dummyUser.username
  } catch {
    return null
  }
}

async function handleLogin() {
  error.value = ''
  try {
    let usernameToLogin = identification.value

    if (isEmail(identification.value)) {
      const username = await getUsernameByEmail(identification.value)
      if (!username) {
        error.value = 'No user found with this email'
        return
      }
      usernameToLogin = username
    }

    await auth.login(usernameToLogin, password.value)
    router.push('/products')
  } catch (e: any) {
    error.value = e.message || 'Invalid username/email or password'
  }
}


function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<template>
  <div class="min-h-screen bg-[#050B19] flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-md">
      <div class="bg-[#0E1525] border border-white/5 rounded-3xl shadow-2xl p-8 text-slate-100">
        <div class="text-center mb-8">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <IconLock :size="28" class="text-indigo-300" />
          </div>
          <p class="text-xs uppercase tracking-[0.35em] text-slate-500">Portal</p>
          <h1 class="text-3xl font-semibold text-white mt-2">Welcome Back</h1>
          <p class="text-slate-400 mt-2">Sign in to continue to ProductManager</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-2">
            <label for="identification" class="text-sm font-semibold text-slate-300">Username or Email</label>
            <input
              v-model="identification"
              id="identification"
              type="text"
              class="w-full bg-[#050B19] border border-white/10 rounded-2xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="username or you@example.com"
              required
            />
          </div>

          <div class="space-y-2">
            <label for="password" class="text-sm font-semibold text-slate-300">Password</label>
            <div class="relative">
              <input
                v-model="password"
                id="password"
                :type="isPasswordVisible ? 'text' : 'password'"
                class="w-full bg-[#050B19] border border-white/10 rounded-2xl px-4 py-3 pr-12 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-white"
              >
                <IconEyeOff v-if="isPasswordVisible" :size="20" />
                <IconEye v-else :size="20" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-slate-400 text-sm">
            <label class="flex items-center gap-2">
              <input v-model="rememberMe" type="checkbox" class="h-4 w-4 rounded border-white/10 bg-transparent text-indigo-400 focus:ring-indigo-500/50" />
              Remember me
            </label>
            <a href="#" class="text-indigo-300 hover:text-white transition">Forgot password?</a>
          </div>

          <div v-if="error" class="text-rose-300 text-sm font-medium p-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-center">
            {{ error }}
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-500 text-white font-semibold py-3 px-4 rounded-2xl hover:bg-indigo-400 transition disabled:opacity-50"
          >
            Sign In
          </button>
        </form>

        <p class="mt-8 text-center text-xs text-slate-500">
          By signing in, you agree to our
          <a href="#" class="text-indigo-300 hover:text-white underline">Terms and Conditions</a>.
        </p>
      </div>
    </div>
  </div>
</template>