<template>
  <div class="space-y-10 p-6 lg:p-12 bg-white min-h-screen">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-4xl font-serif text-gray-900 tracking-tight">My Commissions</h1>
        <p class="text-gray-500 text-sm mt-2 font-serif">Track and manage your earnings across your network tiers with ease.</p>
      </div>
      <div class="flex items-center gap-4">
        <button 
          @click="fetchCommissions({ limit: 50 })" 
          class="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-[0.98]"
        >
          <Icon name="lucide:refresh-cw" :class="['w-4 h-4', loading ? 'animate-spin' : '']" />
          <span class="text-xs font-serif font-medium">Refresh Activity</span>
        </button>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Total Earned Card -->
      <div class="group relative bg-[#0f172a] p-8 rounded-[2rem] shadow-2xl border border-white/5 overflow-hidden transition-all hover:scale-[1.02] duration-500">
        <div class="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-500">
          <div class="w-32 h-32 bg-indigo-500 rounded-full blur-[60px]"></div>
        </div>
        <div class="relative z-10">
          <div class="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-indigo-500/20">
            <Icon name="lucide:wallet" class="w-7 h-7 text-indigo-400" />
          </div>
          <p class="text-indigo-100/40 text-[10px] font-serif font-bold uppercase tracking-[0.2em] mb-2">Total Accumulated</p>
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-serif text-white tracking-tighter">₦{{ totalEarned.toLocaleString() }}</span>
            <div class="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 rounded-full">
              <Icon name="lucide:arrow-up-right" class="w-3 h-3 text-emerald-400" />
              <span class="text-[10px] font-bold text-emerald-400">+12%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Rate Card -->
      <div class="group relative bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden transition-all hover:scale-[1.02] duration-500">
        <div class="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
          <Icon name="lucide:trending-up" class="w-64 h-64 text-gray-900" />
        </div>
        <div class="relative z-10">
          <div class="w-14 h-14 bg-emerald-500/5 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/10">
            <Icon name="lucide:zap" class="w-7 h-7 text-emerald-500" />
          </div>
          <p class="text-gray-400 text-[10px] font-serif font-bold uppercase tracking-[0.2em] mb-2">Active Commission Rate</p>
          <h3 class="text-4xl font-serif text-gray-900 tracking-tighter leading-none">{{ activeRate }}%</h3>
          <p class="text-[11px] text-gray-400 mt-3 font-serif italic">Optimized for Tier 1 Performance</p>
        </div>
      </div>

      <!-- Network Tiers Card -->
      <div class="group relative bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden transition-all hover:scale-[1.02] duration-500">
        <div class="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
          <Icon name="lucide:layers" class="w-64 h-64 text-gray-900" />
        </div>
        <div class="relative z-10">
          <div class="w-14 h-14 bg-amber-500/5 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/10">
            <Icon name="lucide:share-2" class="w-7 h-7 text-amber-500" />
          </div>
          <p class="text-gray-400 text-[10px] font-serif font-bold uppercase tracking-[0.2em] mb-2">Multi-Level Network</p>
          <h3 class="text-4xl font-serif text-gray-900 tracking-tighter leading-none">2 Levels</h3>
          <p class="text-[11px] text-gray-400 mt-3 font-serif italic">Compounding Rewards Active</p>
        </div>
      </div>
    </div>

    <!-- Commissions Table -->
    <div class="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
      <div class="px-10 py-8 border-b border-gray-50 flex items-center justify-between">
        <div>
          <h3 class="text-xl font-serif text-gray-900">Recent Transactions</h3>
          <p class="text-xs text-gray-400 mt-1 font-serif">Detailed breakdown of your most recent earnings activity.</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="px-4 py-1.5 bg-gray-50 text-[10px] font-serif font-bold uppercase tracking-widest text-gray-400 rounded-full border border-gray-100">
            {{ items.length }} Records Found
          </span>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="text-[10px] font-serif font-bold text-gray-400 uppercase tracking-[0.2em] bg-gray-50/50">
              <th class="px-10 py-5">Order Reference</th>
              <th class="px-10 py-5">Earnings</th>
              <th class="px-10 py-5">Structure</th>
              <th class="px-10 py-5">Status</th>
              <th class="px-10 py-5 text-right">Date</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="loading">
              <td colspan="5" class="px-10 py-32 text-center">
                <div class="flex flex-col items-center">
                  <div class="w-16 h-16 border-4 border-indigo-50 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
                  <p class="text-sm font-serif text-gray-400 animate-pulse uppercase tracking-widest">Synchronizing records...</p>
                </div>
              </td>
            </tr>
            <tr v-else-if="items.length === 0">
              <td colspan="5" class="px-10 py-32 text-center">
                <div class="max-w-xs mx-auto">
                  <div class="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gray-100">
                    <Icon name="lucide:inbox" class="w-10 h-10 text-gray-300" />
                  </div>
                  <h4 class="text-lg font-serif text-gray-900 mb-2">No Earnings Yet</h4>
                  <p class="text-sm text-gray-400 font-serif leading-relaxed">Commission data will appear here as soon as your referrals start making purchases.</p>
                </div>
              </td>
            </tr>
            <tr v-for="c in items" :key="c._id" v-else class="hover:bg-gray-50/50 transition-all group">
              <td class="px-10 py-7">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 group-hover:bg-white transition-colors">
                    <Icon name="lucide:shopping-bag" class="w-5 h-5 text-gray-400" />
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm font-serif font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      #{{ getOrderNumber(c) }}
                    </span>
                    <span class="text-[10px] text-gray-400 font-serif uppercase tracking-wider mt-0.5">External Transaction</span>
                  </div>
                </div>
              </td>
              <td class="px-10 py-7">
                <div class="flex flex-col">
                  <span class="text-lg font-serif text-gray-900 tracking-tight">
                    ₦{{ c.amount?.toLocaleString() }}
                  </span>
                  <span class="text-[10px] text-emerald-500 font-serif font-bold uppercase tracking-wider mt-0.5">Net Earnings</span>
                </div>
              </td>
              <td class="px-10 py-7">
                <div class="flex items-center gap-3">
                  <div class="flex flex-col">
                    <span class="text-xs font-serif font-bold text-gray-700">{{ c.rate }}% Rate</span>
                    <div class="flex items-center gap-1.5 mt-1.5">
                      <div class="flex gap-0.5">
                        <div v-for="i in 3" :key="i" :class="['w-1 h-1 rounded-full', i <= (c.layer || 1) ? 'bg-amber-500' : 'bg-gray-200']"></div>
                      </div>
                      <span class="text-[9px] font-serif font-bold text-amber-600 uppercase tracking-widest">Level {{ c.layer || 1 }}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-10 py-7">
                <span 
                  :class="[
                    'px-3 py-1 rounded-full text-[10px] font-serif font-bold uppercase tracking-widest border transition-all',
                    c.status === 'paid' 
                      ? 'bg-emerald-50/50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-50' 
                      : 'bg-amber-50/50 text-amber-600 border-amber-100 group-hover:bg-amber-50'
                  ]"
                >
                  {{ c.status }}
                </span>
              </td>
              <td class="px-10 py-7 text-right">
                <div class="flex flex-col items-end">
                  <span class="text-sm font-serif text-gray-900">
                    {{ formatDate(c.createdAt) }}
                  </span>
                  <span class="text-[10px] text-gray-400 font-serif mt-0.5 uppercase tracking-wider">Processed</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchCommissions } from '@/composables/modules/commissions/useFetchCommissions'
import { format } from 'date-fns'

definePageMeta({ layout: 'dashboard' })

const { commissions: items, loading, total: totalCount, fetchCommissions } = useFetchCommissions()

const totalEarned = computed(() => {
  return items.value.reduce((acc, curr) => acc + (curr.amount || 0), 0)
})

const activeRate = computed(() => {
  if (items.value.length === 0) return 3
  return items.value[0].rate || 3
})

function getOrderNumber(c: any) {
  if (typeof c.orderId === 'object') return c.orderId?.orderNumber || 'N/A'
  return c.orderId?.substring(0, 8).toUpperCase() || 'N/A'
}

function formatDate(date: any) {
  if (!date) return 'N/A'
  return format(new Date(date), 'MMM d, yyyy')
}

onMounted(() => fetchCommissions({ limit: 50 }))
</script>
