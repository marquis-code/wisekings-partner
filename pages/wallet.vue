<template>
  <div>
    <definePageMeta :layout="'dashboard'" />
    <h1 class="text-2xl font-bold text-white mb-6">Wallet</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div class="stat-card"><span class="text-dark-400 text-sm">Balance</span><p class="text-2xl font-bold text-white">₦{{ (wallet?.balance || 0).toLocaleString() }}</p></div>
      <div class="stat-card"><span class="text-dark-400 text-sm">Total Earned</span><p class="text-2xl font-bold text-white">₦{{ (wallet?.totalEarned || 0).toLocaleString() }}</p></div>
    </div>
    <div class="card mb-6">
      <h2 class="text-lg font-semibold text-white mb-4">Request Withdrawal</h2>
      <form @submit.prevent="handleRequestWithdrawal" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="label">Amount (₦)</label><input v-model.number="form.amount" type="number" min="10000" class="input" required /></div>
          <div><label class="label">Bank Name</label><input v-model="form.bankDetails.bankName" type="text" class="input" required /></div>
          <div><label class="label">Account Number</label><input v-model="form.bankDetails.accountNumber" type="text" class="input" required /></div>
          <div><label class="label">Account Name</label><input v-model="form.bankDetails.accountName" type="text" class="input" required /></div>
        </div>
        <button type="submit" class="btn-primary" :disabled="submitting">{{ submitting ? 'Submitting...' : 'Request Withdrawal' }}</button>
      </form>
    </div>
    <div class="card">
      <h2 class="text-lg font-semibold text-white mb-4">Withdrawal History</h2>
      <div class="table-container">
        <table class="data-table">
          <thead><tr><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            <tr v-if="withdrawals.length === 0"><td colspan="3" class="text-center py-8 text-dark-400">No withdrawals</td></tr>
            <tr v-for="w in withdrawals" :key="w._id" v-else>
              <td class="font-medium text-white">₦{{ w.amount?.toLocaleString() }}</td>
              <td><span :class="w.status === 'paid' ? 'badge-success' : w.status === 'rejected' ? 'badge-danger' : 'badge-warning'">{{ w.status }}</span></td>
              <td class="text-dark-400 text-xs">{{ new Date(w.createdAt).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchWallet } from '@/composables/modules/wallets/useFetchWallet'
import { useFetchWithdrawals } from '@/composables/modules/wallets/useFetchWithdrawals'
import { useRequestWithdrawal } from '@/composables/modules/wallets/useRequestWithdrawal'

definePageMeta({ layout: 'dashboard' })

const { wallet, fetchWallet } = useFetchWallet()
const { withdrawals, fetchWithdrawals } = useFetchWithdrawals()
const { loading: submitting, requestWithdrawal: submitWithdrawal } = useRequestWithdrawal()

const form = ref({
  amount: 0,
  bankDetails: {
    bankName: '',
    accountNumber: '',
    accountName: ''
  }
})

async function handleRequestWithdrawal() {
  const success = await submitWithdrawal(form.value)
  if (success) {
    form.value.amount = 0
    await handleFetchData()
  }
}

async function handleFetchData() {
  await Promise.allSettled([
    fetchWallet(),
    fetchWithdrawals()
  ])
}

onMounted(handleFetchData)
</script>
