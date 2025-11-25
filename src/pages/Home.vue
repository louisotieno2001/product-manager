<script setup lang="ts">
import Header from '../components/Header.vue'
import { Box, Users, BarChart2, ShieldCheck, Settings, TrendingUp, Globe } from 'lucide-vue-next';

const features = [
  {
    icon: Box,
    title: "Inventory Mastery",
    description:
      "Real-time tracking across all locations with automated reordering",
  },
  {
    icon: Users,
    title: "Staff Orchestration",
    description: "Schedule, communicate, and manage your team effortlessly",
  },
  {
    icon: BarChart2,
    title: "Service Analytics",
    description: "Actionable insights to grow your service business",
  },
  {
    icon: ShieldCheck,
    title: "Unified Security",
    description: "Enterprise-grade protection for all your business data",
  },
];
</script>

<template class="bg-background min-h-screen items-center justify-center">
  <div>
    <Header />
    <div class="flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <div
        class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 mb-4 text-xs sm:text-sm"
      >
        <Globe class="mr-1 sm:mr-2" size="14" />
        <span>The Future of Business</span>
      </div>
      <h1
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight"
      >
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-blue-600"
          >ProductManager,</span
        >
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-blue-600"
          >Your Business Universe</span
        >
      </h1>

      <p
        class="text-base sm:text-lg md:text-xl text-primary mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-2"
      >
        The all-in-one platform that connects your inventory, restocking, management,
        and operations into one powerful ecosystem.
      </p>
    </div>
  </div>
  <!-- Centered Dashboard Mockup Section -->
  <section class="flex justify-center items-center py-12 bg-gray-100">
    <!-- Dashboard Mockup -->
    <div class="w-full max-w-6xl relative h-[24rem] sm:h-90 md:h-94 lg:h-80
           bg-background rounded-xl sm:rounded-2xl
           shadow-md sm:shadow-xl overflow-hidden
           border border-gray-800 sm:h-full">
      <div class="absolute inset-0"></div>

      <!-- Mock dashboard illustration -->
      <div class="absolute grid grid-cols-2 lg:grid-cols-4 gap-2 p-3 sm:gap-2 sm:p-4 w-full h-full">
        <!-- Inventory Summary -->
        <div class="col-span-1 bg-card rounded sm:rounded-lg shadow-xs sm:shadow-sm p-2 sm:p-2 flex flex-col">
          <div class="flex items-center mb-2">
            <Box class="text-primary mr-1" :size="12" />
            <span class="text-[11px] sm:text-xs font-medium text-primary">
              Inventory
            </span>
          </div>
          <div class="grid grid-cols-2 gap-2 flex-1">
            <div class="bg-background rounded flex flex-col items-center justify-center p-2">
              <span class="text-sm sm:text-sm font-bold text-primary">1.4k</span>
              <span class="text-[9px] sm:text-[8px] text-primary text-center">
                In Stock
              </span>
            </div>
            <div class="bg-background rounded flex flex-col items-center justify-center p-2">
              <span class="text-sm sm:text-sm font-bold text-orange-500">24</span>
              <span class="text-[9px] sm:text-[8px] text-primary text-center">
                Low
              </span>
            </div>
            <div class="bg-background rounded flex flex-col items-center justify-center p-2">
              <span class="text-sm sm:text-sm font-bold text-green-500">94%</span>
              <span class="text-[9px] sm:text-[8px] text-primary text-center">
                Avail
              </span>
            </div>
            <div class="bg-background rounded flex flex-col items-center justify-center p-2">
              <span class="text-sm sm:text-sm font-bold text-purple-500">28</span>
              <span class="text-[9px] sm:text-[8px] text-primary text-center">
                Orders
              </span>
            </div>
          </div>
        </div>

        <!-- Staff Management -->
        <div class="col-span-1 bg-card rounded sm:rounded-lg shadow-xs sm:shadow-sm p-2 flex flex-col">
          <div class="flex items-center mb-2">
            <Users class="text-primary mr-1" :size="12" />
            <span class="text-[11px] sm:text-xs font-medium text-primary">
              Staff
            </span>
          </div>
          <div class="flex-1 flex flex-col justify-between">
            <div class="grid grid-cols-2 gap-2 mb-2">
              <div class="bg-background rounded p-2 flex items-center">
                <div class="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                <span class="text-[9px] sm:text-[10px] text-primary">
                  Active: 8
                </span>
              </div>
              <div class="bg-background rounded p-2 flex items-center">
                <div class="w-2 h-2 rounded-full bg-orange-500 mr-1"></div>
                <span class="text-[9px] sm:text-[10px] text-primary">
                  On Leave: 2
                </span>
              </div>
            </div>
            <div class="h-16 sm:h-12 w-full bg-card rounded flex items-end">
              <div v-for="(val, i) in [8, 5, 7, 4, 6]" :key="i"
                class="flex-1 bg-yellow-600 hover:bg-green-800 transition-colors" :style="{ height: val * 10 + '%' }"
                :title="['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i] + ': ' + val + ' staff'"></div>
            </div>
          </div>
        </div>

        <!-- Sales Overview -->
        <div class="col-span-1 bg-card rounded sm:rounded-lg shadow-xs sm:shadow-sm p-2 flex flex-col">
          <div class="flex items-center mb-2">
            <svg class="text-primary mr-1" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <path d="M12 20V10M18 20V4M6 20v-4"></path>
            </svg>
            <span class="text-[11px] sm:text-xs font-medium text-primary">
              Sales
            </span>
          </div>
          <div class="flex-1 flex flex-col">
            <div class="text-sm font-bold text-primary mb-2">$24.8k</div>
            <div class="flex-1 flex items-end space-x-[3px]">
              <div v-for="(val, index) in [30, 45, 60, 35, 70, 50, 30]" :key="index"
                class="flex-1 bg-green-600 hover:bg-green-800 transition-colors" :style="{ height: val + '%' }"
                aria-label="Sales data point"></div>
            </div>
            <div class="flex justify-between mt-2">
              <span v-for="day in ['M', 'T', 'W', 'T', 'F', 'S', 'S']" :key="day"
                class="text-[7px] sm:text-[8px] text-primary">
                {{ day }}
              </span>
            </div>
          </div>
        </div>

        <!-- Revenue Trend -->
        <div class="col-span-1 bg-card rounded sm:rounded-lg shadow-xs sm:shadow-sm p-2 flex flex-col">
          <div class="flex items-center mb-2">
            <TrendingUp class="text-primary mr-1" :size="12" />
            <span class="text-[11px] sm:text-xs font-medium text-primary">
              Revenue
            </span>
          </div>
          <div class="flex-1 flex flex-col">
            <div class="text-sm font-bold text-primary mb-2">$18.5k</div>
            <div class="flex-1 flex items-center">
              <svg class="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                <polyline fill="none" stroke="currentColor" stroke-width="2"
                  points="0,40 14,35 28,25 42,30 56,20 70,15 84,10 100,5" class="text-green-600" />
              </svg>
            </div>
            <div class="flex justify-between mt-2">
              <span v-for="day in ['M', 'T', 'W', 'T', 'F', 'S', 'S']" :key="day"
                class="text-[7px] sm:text-[8px] text-primary">
                {{ day }}
              </span>
            </div>
          </div>
        </div>

        <!-- Center logo overlay -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="text-center p-3 sm:p-4 bg-background backdrop-blur-sm rounded sm:rounded-lg shadow-sm sm:shadow-lg">
            <Settings :size="16" class="mx-auto mb-2 text-primary" />
            <h3 class="text-sm font-semibold text-primary">Dashboard</h3>
            <p class="text-[9px] sm:text-[10px] text-primary">
              All business metrics
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Features Section -->
  <section class="py-12 md:py-20 bg-card px-4 sm:px-6">
    <div class="container mx-auto">
      <div class="text-center mb-8 md:mb-16">
        <h2 class="text-2xl sm:text-3xl font-bold text-primary mb-2 sm:mb-4">
          One Platform, Infinite Possibilities
        </h2>
        <p class="text-sm sm:text-base md:text-lg text-primary max-w-2xl mx-auto">
          ProductManager brings all your business operations together in perfect
          harmony
        </p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        <div v-for="(feature, i) in features" :key="i"
          class="bg-background p-4 sm:p-6 rounded-lg sm:rounded-xl hover:shadow-md transition-all hover:-translate-y-1 bg-background border border-background">
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 rounded-md sm:rounded-lg bg-primary/10 text-muted-foreground flex items-center justify-center mb-3 sm:mb-4">
            <component :is="feature.icon" :size="24" />
          </div>
          <h3 class="text-lg sm:text-xl font-semibold text-primary mb-1 sm:mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-sm sm:text-base text-primary">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>