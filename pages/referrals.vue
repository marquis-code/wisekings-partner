<template>
  <div>
    <definePageMeta :layout="'dashboard'" />
    <h1 class="text-2xl font-bold text-white mb-6">My Referrals</h1>
    <div v-if="referrals.length === 0" class="text-center py-20 text-dark-400">No referrals yet</div>
    <div v-else class="table-container">
      <table class="data-table">
        <thead><tr><th>Name</th><th>Status</th><th>Joined</th></tr></thead>
        <tbody><tr v-for="r in referrals" :key="r._id"><td class="text-dark-200">{{ r.fullName || r.email }}</td><td><span :class="r.isActive ? 'badge-success' : 'badge-warning'">{{ r.isActive ? 'Active' : 'Pending' }}</span></td><td class="text-dark-400 text-xs">{{ new Date(r.createdAt).toLocaleDateString() }}</td></tr></tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchReferrals } from '@/composables/modules/partners/useFetchReferrals'

definePageMeta({ layout: 'dashboard' })

const { referrals, fetchReferrals } = useFetchReferrals()

onMounted(() => fetchReferrals())
</script>
