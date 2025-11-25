<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useProductStore } from '../stores/products'
import {
  Package,
  Boxes,
  ShoppingBag,
  Shuffle,
  Truck,
  Users,
  Settings,
  Bell,
  SunMedium,
  Expand,
  Search as SearchIcon,
  Menu,
  Store
} from 'lucide-vue-next'

const router = useRouter()
const auth = useAuthStore()
const productStore = useProductStore()

const searchQuery = ref('')
const isUserMenuOpen = ref(false)
const profileMenuRef = ref<HTMLElement | null>(null)
const isMobileSidebarOpen = ref(false)
const expandedNav = ref<string | null>('Products')

const priceFilter = ref({ min: 0, max: 0 })
const stockFilter = ref<'any' | 'inStock' | 'lowStock' | 'outOfStock'>('any')
const sortOption = ref<'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc' | 'stockDesc' | 'category'>('nameAsc')
const ratingFilter = ref(0)
const discountOnly = ref(false)
const selectedCategories = ref<string[]>([])

const primaryNav = [
  { label: 'Products', icon: Package },
  { label: 'Inventory', icon: Boxes },
  { label: 'Orders', icon: ShoppingBag },
  { label: 'Suppliers', icon: Store },
  { label: 'Logistics', icon: Truck },
  { label: 'Transactions', icon: Shuffle }
]

const businessProfile = {
  name: 'Interkonnekted Business',
  email: 'business@02025',
  image: 'https://i.pravatar.cc/120?img=67'
}

const userProfile = {
  name: 'Olivia Rhye',
  role: 'Product Manager',
  avatar: 'https://i.pravatar.cc/100?img=47'
}

onMounted(async () => {
  if (!productStore.products.length) {
    await productStore.fetchProducts()
  }
  document.addEventListener('click', handleGlobalClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick)
})

const filteredProducts = computed(() => {
  let list = [...productStore.products]

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter(product =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
  }

  const minPrice = Math.min(priceFilter.value.min, priceFilter.value.max || priceFilter.value.min)
  const maxPrice = Math.max(priceFilter.value.min, priceFilter.value.max || priceFilter.value.min)
  if (maxPrice > 0) {
    list = list.filter(product => product.price >= minPrice && product.price <= maxPrice)
  }

  list = list.filter(product => {
    if (stockFilter.value === 'inStock') return product.stock > 25
    if (stockFilter.value === 'lowStock') return product.stock > 0 && product.stock <= 25
    if (stockFilter.value === 'outOfStock') return product.stock === 0
    return true
  })

  if (selectedCategories.value.length) {
    list = list.filter(product => selectedCategories.value.includes(product.category))
  }

  if (ratingFilter.value > 0) {
    list = list.filter(product => (product.rating ?? 0) >= ratingFilter.value)
  }

  if (discountOnly.value) {
    list = list.filter(product => (product.discountPercentage ?? 0) >= 10)
  }

  switch (sortOption.value) {
    case 'nameAsc':
      list.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'nameDesc':
      list.sort((a, b) => b.title.localeCompare(a.title))
      break
    case 'priceAsc':
      list.sort((a, b) => a.price - b.price)
      break
    case 'priceDesc':
      list.sort((a, b) => b.price - a.price)
      break
    case 'stockDesc':
      list.sort((a, b) => b.stock - a.stock)
      break
    case 'category':
      list.sort((a, b) => a.category.localeCompare(b.category))
      break
  }

  return list
})

const priceBounds = computed(() => {
  if (!productStore.products.length) {
    return { min: 0, max: 0 }
  }
  const prices = productStore.products.map(p => p.price)
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices))
  }
})

watch(priceBounds, bounds => {
  priceFilter.value = { ...bounds }
}, { immediate: true })

const categories = computed(() => {
  const unique = new Set(productStore.products.map(p => p.category))
  return Array.from(unique).sort()
})

const totalRevenue = computed(() =>
  productStore.products.reduce((sum, product) => sum + product.price, 0)
)

const quickStats = computed(() => [
  { title: 'Total Revenue', value: formatCurrency(totalRevenue.value), icon: Package },
  { title: 'Orders', value: filteredProducts.value.length ? `${filteredProducts.value.length * 3}` : 'N/A', icon: ShoppingBag },
  { title: 'Products', value: `${productStore.products.length}`, icon: Boxes },
  { title: 'Users', value: 'N/A', icon: Users }
])

function viewDetails(id: number) {
  router.push(`/products/${id}`)
}

function goToAddProduct() {
  router.push('/products/new')
}

function handleLogout() {
  closeUserMenu()
  auth.logout()
  router.push('/login')
}

function goToHome() {
  closeUserMenu()
  router.push('/')
}

function goToSettings() {
  closeUserMenu()
  router.push('/settings').catch(() => {
    console.warn('Settings route not configured')
  })
}

function toggleUserMenu(event?: MouseEvent) {
  event?.stopPropagation()
  isUserMenuOpen.value = !isUserMenuOpen.value
}

function closeUserMenu() {
  isUserMenuOpen.value = false
}

function toggleSidebar() {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

function handleGlobalClick(event: MouseEvent) {
  if (!profileMenuRef.value) return
  if (!profileMenuRef.value.contains(event.target as Node)) {
    closeUserMenu()
  }
}

function toggleNavSection(label: string) {
  expandedNav.value = expandedNav.value === label ? null : label
}

function toggleCategory(category: string) {
  const index = selectedCategories.value.indexOf(category)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(category)
  }
}

function resetFilters() {
  searchQuery.value = ''
  stockFilter.value = 'any'
  sortOption.value = 'nameAsc'
  ratingFilter.value = 0
  discountOnly.value = false
  selectedCategories.value = []
  priceFilter.value = { ...priceBounds.value }
}

function formatCurrency(value: number) {
  if (!value) return '$N/A'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value)
}
</script>

<template>
  <div class="h-screen overflow-hidden flex bg-[#050B19] text-slate-100">
    <div
      class="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity"
      v-if="isMobileSidebarOpen"
      @click="toggleSidebar"
    />
    <aside
      :class="[
        'fixed z-40 lg:z-auto inset-y-0 left-0 w-72 bg-[#050B19] border-r border-white/5 flex-col h-full transform transition-transform duration-300 ease-in-out',
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:relative lg:flex'
      ]"
    >
      <div class="px-8 pt-10 pb-6 flex flex-col items-center text-center gap-4">
        <div>
          <h2 class="text-xl font-semibold">{{ businessProfile.name }}</h2>
          <p class="text-sm text-slate-400">{{ businessProfile.email }}</p>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto pb-6">
        <nav class="px-4 space-y-1">
          <p class="px-4 text-xs uppercase tracking-[0.3em] text-slate-500 mb-4">Products</p>
          <div v-for="item in primaryNav" :key="item.label" class="space-y-2">
            <button
              class="w-full flex items-center justify-between gap-3 px-4 py-2 rounded-xl text-sm transition bg-white/5 hover:bg-white/10"
              @click="toggleNavSection(item.label)"
            >
              <div class="flex items-center gap-3">
                <component :is="item.icon" class="w-4 h-4" />
                <span>{{ item.label }}</span>
              </div>
              <svg
                v-if="item.label === 'Products'"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 transition-transform"
                :class="expandedNav === 'Products' ? 'rotate-180' : ''"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              v-if="item.label === 'Products' && expandedNav === 'Products'"
              class="bg-white/5 rounded-2xl p-4 space-y-4 text-sm"
            >
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-[0.3em] text-slate-500">Search</label>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search catalog..."
                  class="w-full rounded-xl bg-[#050B19] border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              <div class="flex items-center justify-between">
                <span class="text-xs uppercase tracking-[0.3em] text-slate-500">Price Range</span>
                <button class="text-xs text-indigo-300 hover:text-white" @click="resetFilters">Reset</button>
              </div>
              <div class="flex gap-2">
                <input
                  v-model.number="priceFilter.min"
                  type="number"
                  class="flex-1 rounded-xl bg-[#050B19] border border-white/10 px-3 py-2 text-sm"
                  placeholder="Min"
                />
                <input
                  v-model.number="priceFilter.max"
                  type="number"
                  class="flex-1 rounded-xl bg-[#050B19] border border-white/10 px-3 py-2 text-sm"
                  placeholder="Max"
                />
              </div>

              <div class="space-y-2">
                <span class="text-xs uppercase tracking-[0.3em] text-slate-500">Stock</span>
                <div class="space-y-2">
                  <label class="flex items-center gap-2 text-slate-300 text-sm">
                    <input type="radio" value="any" v-model="stockFilter" />
                    Any availability
                  </label>
                  <label class="flex items-center gap-2 text-slate-300 text-sm">
                    <input type="radio" value="inStock" v-model="stockFilter" />
                    In stock (>25)
                  </label>
                  <label class="flex items-center gap-2 text-slate-300 text-sm">
                    <input type="radio" value="lowStock" v-model="stockFilter" />
                    Low stock (≤25)
                  </label>
                  <label class="flex items-center gap-2 text-slate-300 text-sm">
                    <input type="radio" value="outOfStock" v-model="stockFilter" />
                    Out of stock
                  </label>
                </div>
              </div>

              <div class="space-y-2">
                <span class="text-xs uppercase tracking-[0.3em] text-slate-500">Sort</span>
                <select
                  v-model="sortOption"
                  class="w-full bg-[#050B19] border border-white/10 rounded-xl px-3 py-2 text-sm"
                >
                  <option value="nameAsc">Alphabetical (A-Z)</option>
                  <option value="nameDesc">Alphabetical (Z-A)</option>
                  <option value="priceAsc">Price · Low to High</option>
                  <option value="priceDesc">Price · High to Low</option>
                  <option value="stockDesc">Stock · High to Low</option>
                  <option value="category">Category</option>
                </select>
              </div>

              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs uppercase tracking-[0.3em] text-slate-500">Categories</span>
                  <span class="text-xs text-slate-400">{{ selectedCategories.length }} selected</span>
                </div>
                <div class="max-h-32 overflow-y-auto space-y-2 pr-1">
                  <label
                    v-for="category in categories"
                    :key="category"
                    class="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <input type="checkbox" :value="category" :checked="selectedCategories.includes(category)" @change="toggleCategory(category)" />
                    {{ category }}
                  </label>
                </div>
              </div>

              <div class="space-y-2">
                <span class="text-xs uppercase tracking-[0.3em] text-slate-500">Rating</span>
                <input type="range" min="0" max="5" step="0.5" v-model.number="ratingFilter" class="w-full" />
                <p class="text-xs text-slate-400">{{ ratingFilter }}★ & above</p>
              </div>

              <label class="flex items-center justify-between text-sm text-slate-300">
                <span>Only discounted</span>
                <input type="checkbox" v-model="discountOnly" />
              </label>
            </div>
          </div>
        </nav>
      </div>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="h-20 border-b border-white/5 bg-[#050B19] px-4 sm:px-6 flex items-center gap-4 sm:gap-6">
        <button class="lg:hidden rounded-full border border-white/10 p-2" @click="toggleSidebar">
          <Menu class="w-5 h-5" />
        </button>
        <div class="text-lg font-semibold tracking-wide hidden md:block">In</div>
        <div class="flex-1 max-w-xl">
          <div class="relative">
            <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full bg-[#0E1525] border border-white/5 rounded-2xl pl-10 pr-4 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>
        </div>
        <div class="flex items-center gap-4 ml-auto">
          <div class="flex items-center gap-3 text-slate-400">
            <SunMedium class="w-5 h-5" />
            <Expand class="w-5 h-5" />
            <div class="relative">
              <Bell class="w-5 h-5" />
              <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] flex items-center justify-center">0</span>
            </div>
          </div>
          <div ref="profileMenuRef" class="relative">
            <button
              class="flex items-center gap-3 rounded-full border border-white/10 bg-[#0E1525] pr-4 pl-1 py-1"
              @click="toggleUserMenu"
            >
              <img :src="userProfile.avatar" alt="avatar" class="w-10 h-10 rounded-full object-cover border border-white/20" />
              <div class="hidden sm:block text-left">
                <p class="text-sm font-semibold text-white leading-tight">{{ userProfile.name }}</p>
                <p class="text-xs text-slate-400">{{ userProfile.role }}</p>
              </div>
            </button>
            <transition name="fade">
              <div
                v-if="isUserMenuOpen"
                class="absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 bg-[#0E1525] shadow-2xl z-20 overflow-hidden"
              >
                <button class="block w-full text-left px-4 py-2 text-sm hover:bg-white/5" @click="goToHome">Home</button>
                <button class="block w-full text-left px-4 py-2 text-sm hover:bg-white/5" @click="goToSettings">Settings</button>
                <button class="block w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10" @click="handleLogout">Logout</button>
              </div>
            </transition>
          </div>
        </div>
      </header>

      <main class="flex-1 flex flex-col overflow-hidden px-6 py-8 bg-[#050B19] space-y-8">

        <section class="flex-1 bg-[#0E1525] rounded-3xl border border-white/5 flex flex-col overflow-hidden">
          <div class="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-white/5 shrink-0">
            <div>
              <p class="text-sm text-slate-400">Products overview</p>
              <p class="text-2xl font-semibold text-white">{{ filteredProducts.length }} items</p>
            </div>
            <button
              @click="goToAddProduct"
              class="inline-flex items-center gap-2 bg-indigo-500 text-white px-5 py-2 rounded-2xl text-sm font-semibold hover:bg-indigo-400"
            >
              + Add product
            </button>
          </div>

          <div class="flex-1 overflow-auto px-6 py-6">
            <div v-if="productStore.isLoading" class="text-center text-slate-400 py-12">
              Loading products...
            </div>
            <div v-else-if="productStore.error" class="text-center text-rose-400 py-12">
              {{ productStore.error }}
            </div>
            <div v-else>
              <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                  <thead>
                    <tr class="text-left text-xs uppercase tracking-[0.3em] text-slate-500">
                      <th class="py-4 pr-6">Product</th>
                      <th class="py-4 pr-6">Category</th>
                      <th class="py-4 pr-6">Price</th>
                      <th class="py-4 pr-6">Stock</th>
                      <th class="py-4 pr-6">Rating</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/5">
                    <tr
                      v-for="product in filteredProducts"
                      :key="product.id"
                      class="hover:bg-white/5 cursor-pointer transition"
                      @click="viewDetails(product.id)"
                    >
                      <td class="py-4 pr-6">
                        <div class="flex items-center gap-4">
                          <img :src="product.thumbnail" :alt="product.title" class="w-12 h-12 rounded-2xl object-cover border border-white/10" />
                          <div>
                            <p class="font-semibold text-white">{{ product.title }}</p>
                            <p class="text-xs text-slate-400 line-clamp-1">{{ product.description }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="py-4 pr-6 capitalize text-slate-300">{{ product.category }}</td>
                      <td class="py-4 pr-6 font-semibold text-white">${{ product.price.toFixed(2) }}</td>
                      <td class="py-4 pr-6">
                        <span
                          class="px-3 py-1 rounded-full text-xs font-semibold"
                          :class="{
                            'bg-emerald-500/20 text-emerald-300': product.stock > 25,
                            'bg-amber-500/20 text-amber-300': product.stock > 0 && product.stock <= 25,
                            'bg-rose-500/20 text-rose-300': product.stock === 0
                          }"
                        >
                          {{ product.stock }} units
                        </span>
                      </td>
                      <td class="py-4 pr-6 text-slate-300">
                        <div class="flex items-center gap-1">
                          <span class="font-semibold text-white">{{ product.rating ?? '—' }}</span>
                          <span class="text-amber-400">★</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="!filteredProducts.length" class="text-center text-slate-400 py-12">
                No products match the current search.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
