<template>
  <div>
    <definePageMeta :layout="'dashboard'" />
    <h1 class="text-2xl font-bold text-white mb-6">My Network</h1>
    <p class="text-dark-400 text-sm mb-6">View your multi-level referral network and the commissions from each layer.</p>
    <div v-if="network.length === 0" class="text-center py-20 text-dark-400">
      <Icon name="lucide:network" class="w-12 h-12 mx-auto mb-4 opacity-50" />
      <p>No network members yet. Share your referral link!</p>
    </div>
    <div v-else class="space-y-4">
      <div v-for="(layer, idx) in network" :key="idx" class="card">
        <h3 class="text-md font-semibold text-white mb-3">Layer {{ idx + 1 }}</h3>
        <div class="space-y-2">
          <div v-for="m in layer" :key="m._id" class="flex items-center justify-between py-2 border-b border-dark-700/30 last:border-0">
            <div><p class="text-sm font-medium text-dark-200">{{ m.fullName || m.companyName || m.email }}</p><p class="text-xs text-dark-400">Joined {{ new Date(m.createdAt).toLocaleDateString() }}</p></div>
            <span :class="m.isActive ? 'badge-success' : 'badge-warning'">{{ m.isActive ? 'Active' : 'Pending' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchNetwork } from '@/composables/modules/partners/useFetchNetwork'

definePageMeta({ layout: 'dashboard' })

const { network, fetchNetwork } = useFetchNetwork()

onMounted(() => fetchNetwork())
</script>
