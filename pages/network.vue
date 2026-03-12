<template>
  <div class="space-y-10 pb-20">
    <definePageMeta :layout="'dashboard'" />

    <!-- Header & Summary -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 class="text-3xl font-black text-gray-900 tracking-tight">Multi-Level Network</h1>
        <p class="text-gray-500 font-medium mt-1">Visualize your growing partnership ecosystem across all tiers.</p>
      </div>
      <div class="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
        <div class="px-4 py-2 text-center">
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Reach</p>
          <p class="text-xl font-black text-indigo-600">{{ total || 0 }}</p>
        </div>
        <div class="w-px h-8 bg-gray-100"></div>
        <div class="px-4 py-2 text-center">
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active nodes</p>
          <p class="text-xl font-black text-emerald-500">{{ stats?.active || 0 }}</p>
        </div>
      </div>
    </div>

    <!-- Network Empty State -->
    <div v-if="!hasNetworkData" class="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-20 text-center relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-indigo-50/20 to-transparent pointer-events-none"></div>
      <div class="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10">
        <Icon name="lucide:share-2" class="w-10 h-10 text-indigo-400 animate-pulse" />
      </div>
      <h2 class="text-2xl font-black text-gray-900 mb-2 relative z-10">Your Network is Empty</h2>
      <p class="text-gray-500 max-w-sm mx-auto mb-10 relative z-10">Start sharing your referral link to build your team and earn massive overrides on every sale they make.</p>
      <NuxtLink to="/" class="inline-flex items-center gap-2 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 relative z-10">
        Get Referral Link
        <Icon name="lucide:arrow-right" class="w-5 h-5" />
      </NuxtLink>
    </div>

    <!-- Tiered View -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Tier 1: Direct Referrals -->
      <div class="space-y-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
             <Icon name="lucide:user-check" class="w-5 h-5" />
          </div>
          <h3 class="text-xl font-black text-gray-900 tracking-tight">Tier 1: Direct Partners</h3>
        </div>

        <div v-if="!network.tier1?.length" class="p-10 border-2 border-dashed border-gray-100 rounded-[2rem] text-center text-gray-400 text-sm font-medium">
          No direct referrals yet.
        </div>
        
        <div v-else class="space-y-4">
          <div v-for="m in network.tier1" :key="m._id" class="p-6 bg-white rounded-3xl border border-transparent hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <span class="text-sm font-black">{{ m.fullName?.[0] || 'P' }}</span>
              </div>
              <div>
                <p class="text-base font-black text-gray-900">{{ m.fullName || 'Partner' }}</p>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Joined {{ new Date(m.createdAt).toLocaleDateString() }}</p>
              </div>
            </div>
            <span :class="['px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border', m.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100']">
              {{ m.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Tier 2: Indirect Referrals -->
      <div class="space-y-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg">
             <Icon name="lucide:users" class="w-5 h-5" />
          </div>
          <h3 class="text-xl font-black text-gray-900 tracking-tight">Tier 2: Indirect Rewards</h3>
        </div>

        <div v-if="!network.tier2?.length" class="p-10 border-2 border-dashed border-gray-100 rounded-[2rem] text-center text-gray-400 text-sm font-medium">
          No tier 2 members yet.
        </div>

        <div v-else class="space-y-4">
          <div v-for="m in network.tier2" :key="m._id" class="p-6 bg-white rounded-3xl border border-transparent hover:border-purple-100 hover:shadow-xl hover:shadow-purple-500/5 transition-all group flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <span class="text-sm font-black">{{ m.fullName?.[0] || 'P' }}</span>
              </div>
              <div>
                <p class="text-base font-black text-gray-900">{{ m.fullName || 'Partner' }}</p>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Joined {{ new Date(m.createdAt).toLocaleDateString() }}</p>
              </div>
            </div>
            <p class="text-[10px] font-black text-purple-600 uppercase tracking-widest">Tier 2 Member</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchNetwork } from '@/composables/modules/partners/useFetchNetwork'

definePageMeta({ layout: 'dashboard' })

const { network, fetchNetwork, total, loading } = useFetchNetwork()

const hasNetworkData = computed(() => {
  if (Array.isArray(network.value)) return network.value.length > 0
  return (network.value?.tier1?.length || network.value?.tier2?.length)
})

const stats = computed(() => {
  if (Array.isArray(network.value)) return { active: network.value.filter((m: any) => m.isActive).length }
  return network.value?.summary || { active: 0 }
})

onMounted(() => fetchNetwork())
</script>
