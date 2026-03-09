<template>
  <div>
    <definePageMeta :layout="'dashboard'" />
    <h1 class="text-2xl font-bold text-white mb-6">My Commissions</h1>
    <div class="table-container">
      <table class="data-table">
        <thead><tr><th>Order</th><th>Amount</th><th>Rate</th><th>Layer</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>
          <tr v-if="loading"><td colspan="6" class="text-center py-12 text-dark-400"><Icon name="lucide:loader-2" class="w-6 h-6 animate-spin mx-auto" /></td></tr>
          <tr v-else-if="items.length === 0"><td colspan="6" class="text-center py-12 text-dark-400">No commissions yet</td></tr>
          <tr v-for="c in items" :key="c._id" v-else>
            <td class="text-dark-200 text-sm">{{ typeof c.orderId === 'object' ? (c.orderId as any)?.orderNumber : c.orderId }}</td>
            <td class="font-medium text-white">₦{{ c.amount?.toLocaleString() }}</td>
            <td>{{ c.rate }}%</td>
            <td><span class="badge-info">Level {{ c.layer || 1 }}</span></td>
            <td><span :class="c.status === 'paid' ? 'badge-success' : 'badge-warning'">{{ c.status }}</span></td>
            <td class="text-dark-400 text-xs">{{ new Date(c.createdAt).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchCommissions } from '@/composables/modules/commissions/useFetchCommissions'

definePageMeta({ layout: 'dashboard' })

const { commissions: items, loading, fetchCommissions } = useFetchCommissions()

onMounted(() => fetchCommissions({ limit: 50 }))
</script>
