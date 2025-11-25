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

<template>
  <div class="min-h-screen bg-[#050B19] text-slate-100">
    <Header />

    <main class="px-4 sm:px-6 lg:px-12 py-10 space-y-16">
      <section class="text-center space-y-6">
        <div class="inline-flex items-center px-4 py-1 rounded-full bg-white/5 text-indigo-300 text-xs tracking-[0.3em] uppercase">
          <Globe class="mr-2" size="14" />
          Future of Business
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-white">
          ProductManager is your connected business universe
        </h1>
        <p class="text-slate-400 max-w-3xl mx-auto text-base sm:text-lg">
          The all-in-one platform that syncs inventory, restocking, operations, and intelligence in a single, beautifully orchestrated workspace.
        </p>
      </section>

      <section class="bg-[#0E1525] border border-white/5 rounded-3xl shadow-2xl p-6 sm:p-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-[#050B19] border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
            <div class="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
              <Box class="w-4 h-4 text-emerald-300" />
              Inventory
            </div>
            <div class="grid grid-cols-2 gap-3 text-center">
              <div class="bg-white/5 rounded-xl py-3">
                <p class="text-lg font-semibold text-white">1.4k</p>
                <p class="text-[10px] text-slate-400">In stock</p>
              </div>
              <div class="bg-white/5 rounded-xl py-3">
                <p class="text-lg font-semibold text-amber-300">24</p>
                <p class="text-[10px] text-slate-400">Low</p>
              </div>
              <div class="bg-white/5 rounded-xl py-3">
                <p class="text-lg font-semibold text-emerald-300">94%</p>
                <p class="text-[10px] text-slate-400">Availability</p>
              </div>
              <div class="bg-white/5 rounded-xl py-3">
                <p class="text-lg font-semibold text-indigo-300">28</p>
                <p class="text-[10px] text-slate-400">Orders</p>
              </div>
            </div>
          </div>

          <div class="bg-[#050B19] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
            <div class="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
              <Users class="w-4 h-4 text-indigo-300" />
              Staff
            </div>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="bg-white/5 rounded-xl px-3 py-2 flex items-center gap-2 text-slate-300">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                Active · 8
              </div>
              <div class="bg-white/5 rounded-xl px-3 py-2 flex items-center gap-2 text-slate-300">
                <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                On Leave · 2
              </div>
            </div>
            <div class="flex items-end gap-1 h-20">
              <span
                v-for="(val, i) in [8,5,7,4,6]"
                :key="i"
                class="flex-1 bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-full"
                :style="{ height: `${val * 10}%` }"
              />
            </div>
          </div>

          <div class="bg-[#050B19] border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
            <div class="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
              <TrendingUp class="w-4 h-4 text-emerald-300" />
              Revenue
            </div>
            <p class="text-3xl font-semibold text-white">$18.5k</p>
            <div class="flex-1 flex items-center">
              <svg class="w-full h-32" viewBox="0 0 100 50" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="url(#grad)"
                  stroke-width="3"
                  points="0,35 12,30 25,20 38,25 52,15 65,10 80,14 100,5"
                />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#34d399" />
                    <stop offset="100%" stop-color="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="flex justify-between text-[10px] text-slate-500">
              <span v-for="day in ['M','T','W','T','F','S','S']" :key="day">{{ day }}</span>
            </div>
          </div>

          <div class="bg-[#050B19] border border-white/5 rounded-2xl p-4 flex flex-col gap-4">
            <div class="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
              <Settings class="w-4 h-4 text-indigo-300" />
              Control
            </div>
            <p class="text-lg text-slate-300">
              Unify inventory, workforce, logistics, and finance through a single control pane.
            </p>
            <button class="mt-auto bg-indigo-500 text-white rounded-2xl py-3 px-4 text-sm font-semibold hover:bg-indigo-400 transition">
              Launch Console
            </button>
          </div>
        </div>
      </section>

      <section class="bg-[#0E1525] border border-white/5 rounded-3xl p-8">
        <div class="text-center mb-10 space-y-3">
          <p class="text-xs uppercase tracking-[0.35em] text-slate-500">Capability Suite</p>
          <h2 class="text-2xl md:text-3xl font-semibold text-white">One platform, infinite possibilities</h2>
          <p class="text-slate-400 max-w-3xl mx-auto">
            ProductManager brings every part of your business into perfect harmony with tailored tools for each team.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="(feature, i) in features"
            :key="i"
            class="bg-[#050B19] border border-white/5 rounded-2xl p-5 hover:border-indigo-400/40 transition"
          >
            <div class="w-12 h-12 rounded-xl bg-white/5 text-indigo-300 flex items-center justify-center mb-4">
              <component :is="feature.icon" :size="24" />
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-slate-400">{{ feature.description }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>