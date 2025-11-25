<template>
  <header class="bg-background text-primary flex items-center justify-between px-6 py-4 sticky top-0 z-50">

    <!-- Logo -->
    <div class="text-2xl font-bold tracking-wide">
    ProductManager
    </div>

    <!-- Auth Buttons -->
    <div class="hidden md:flex items-center space-x-6">
      <!-- Home  -->
      <button
        @click="$router.push('/')"
        class="flex items-center space-x-1 hover:text-blue-200 transition-colors cursor-pointer"
      >
      <HomeIcon :size="20" />
        Home
      </button>

      <!-- Login -->
      <button
        v-if="!auth.isAuthenticated"
        @click="$router.push('/login')"
        class="flex items-center space-x-1 hover:text-blue-200 transition-colors cursor-pointer"
      >
      <LoginIcon :size="20" />
        Login
      </button>

      <!-- Logout -->
      <button
        v-else
        @click="auth.logout"
        class="border border-card px-4 py-2 rounded-lg font-semibold hover:bg-card hover:text-primary transition"
      >
        <LogoutIcon :size="20" />
        Logout
      </button>

      <!-- Theme toggler -->
      <button @click="themeStore.toggleTheme" class="p-2 rounded-full hover:bg-card transition-colors">
        <Sun v-if="themeStore.theme === 'dark'" :size="20" />
        <Moon v-else :size="20" />
      </button>
    </div>

  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useThemeStore } from '@/stores/theme';
import { House as HomeIcon, LogIn as LoginIcon, LogOut as LogoutIcon, Sun, Moon } from 'lucide-vue-next';

const auth = useAuthStore();
const themeStore = useThemeStore();
</script>

<style scoped> 
body { 
  margin: 0;
  padding: 0;
}
</style>

