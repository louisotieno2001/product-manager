<template>
  <header class="bg-[#050B19] text-slate-100 border-b border-white/5 sticky top-0 z-40">
    <div class="px-4 sm:px-6 py-4 flex items-center justify-between relative">
      <!-- Logo -->
      <div class="text-2xl font-bold tracking-wide">
        ProductManager
      </div>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center space-x-6">
        <button
          @click="navigate('/')"
          class="flex items-center space-x-1 hover:text-indigo-300 transition-colors cursor-pointer"
        >
          <HomeIcon :size="20" />
          Home
        </button>

        <button
          v-if="!auth.isAuthenticated"
          @click="navigate('/login')"
          class="flex items-center space-x-1 hover:text-indigo-300 transition-colors cursor-pointer"
        >
          <LoginIcon :size="20" />
          Login
        </button>

        <button
          v-else
          @click="handleLogout"
          class="flex items-center space-x-1 hover:text-rose-300 transition-colors cursor-pointer"
        >
          <LogoutIcon :size="20" />
          Logout
        </button>

        <button @click="toggleTheme" class="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
          <Sun v-if="themeStore.theme === 'dark'" :size="20" />
          <Moon v-else :size="20" />
        </button>
      </div>

      <!-- Mobile Controls -->
      <div class="md:hidden flex items-center gap-3">
        <button @click="toggleTheme" class="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
          <Sun v-if="themeStore.theme === 'dark'" :size="20" />
          <Moon v-else :size="20" />
        </button>
        <button @click="toggleMobileMenu" class="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
          <MenuIcon v-if="!isMobileMenuOpen" :size="22" />
          <CloseIcon v-else :size="22" />
        </button>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden border-t border-white/5 bg-[#0E1525] px-4 py-4 space-y-3 text-sm"
      >
        <button
          @click="navigate('/')"
          class="w-full flex items-center gap-2 px-3 py-2 rounded-2xl border border-white/5 text-left hover:bg-white/5"
        >
          <HomeIcon :size="18" />
          Home
        </button>
        <button
          v-if="!auth.isAuthenticated"
          @click="navigate('/login')"
          class="w-full flex items-center gap-2 px-3 py-2 rounded-2xl border border-white/5 text-left hover:bg-white/5"
        >
          <LoginIcon :size="18" />
          Login
        </button>
        <button
          v-else
          @click="handleLogout"
          class="w-full flex items-center gap-2 px-3 py-2 rounded-2xl border border-white/5 text-left hover:bg-white/5 text-rose-200"
        >
          <LogoutIcon :size="18" />
          Logout
        </button>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { House as HomeIcon, LogIn as LoginIcon, LogOut as LogoutIcon, Sun, Moon, Menu as MenuIcon, X as CloseIcon } from 'lucide-vue-next'

const router = useRouter()
const auth = useAuthStore()
const themeStore = useThemeStore()

const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function navigate(path: string) {
  router.push(path)
  isMobileMenuOpen.value = false
}

function handleLogout() {
  auth.logout()
  isMobileMenuOpen.value = false
}

function toggleTheme() {
  themeStore.toggleTheme()
}
</script>

<style scoped> 
body { 
  margin: 0;
  padding: 0;
}
</style>

