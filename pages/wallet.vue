<template>
  <div class="space-y-10 pb-20">
    <definePageMeta :layout="'dashboard'" />

    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 class="text-3xl font-black text-gray-900 tracking-tight">Financial Overview</h1>
        <p class="text-gray-500 font-medium mt-1">Manage your earnings, balance, and withdrawal requests.</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="px-4 py-2 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-2">
           <div class="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></div>
           <span class="text-[10px] font-black text-indigo-700 uppercase tracking-widest">Real-time Balance</span>
        </div>
      </div>
    </div>

    <!-- Wallet Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Balance Card -->
      <div class="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
        <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-[60px] group-hover:scale-110 transition-transform duration-700"></div>
        <div class="relative z-10 flex flex-col justify-between h-full min-h-[160px]">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-white/60 text-xs font-black uppercase tracking-widest mb-1">Available Balance</p>
              <h2 class="text-5xl font-black tracking-tighter">₦{{ (wallet?.balance || 0).toLocaleString() }}</h2>
            </div>
            <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <Icon name="lucide:wallet" class="w-7 h-7" />
            </div>
          </div>
          <div class="flex items-center gap-3 mt-8">
            <span class="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">WK Partner Fund</span>
            <span class="text-white/40 text-[10px] font-bold uppercase tracking-widest">Instant Settlement</span>
          </div>
        </div>
      </div>

      <!-- Total Earned Card -->
      <div class="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
        <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-[60px] group-hover:translate-x-4 transition-transform duration-700"></div>
        <div class="relative z-10 flex flex-col justify-between h-full min-h-[160px]">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Lifetime Earnings</p>
              <h2 class="text-5xl font-black tracking-tighter">₦{{ (wallet?.totalEarned || 0).toLocaleString() }}</h2>
            </div>
            <div class="w-14 h-14 rounded-2xl bg-indigo-500/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
              <Icon name="lucide:trending-up" class="w-7 h-7 text-indigo-400" />
            </div>
          </div>
          <div class="flex items-center gap-3 mt-8 text-emerald-400">
            <Icon name="lucide:arrow-up-right" class="w-4 h-4" />
            <span class="text-xs font-black uppercase tracking-widest">+ ₦12,400 this week</span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Withdrawal Form -->
      <div class="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-indigo-600 border border-gray-100">
            <Icon name="lucide:arrow-down-to-line" class="w-5 h-5" />
          </div>
          <h3 class="text-xl font-black text-gray-900 tracking-tight">Request Withdrawal</h3>
        </div>

        <form @submit.prevent="handleRequestWithdrawal" class="space-y-6">
          <div class="space-y-4">
            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Withdrawal Amount (₦)</label>
              <div class="relative">
                <Icon name="lucide:banknote" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input v-model.number="form.amount" type="number" min="1000" 
                  class="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-sans" 
                  placeholder="Min ₦1,000" required />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mb-2 ml-1">Bank Name</label>
                <input v-model="form.bankDetails.bankName" type="text" 
                  class="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" 
                  placeholder="e.g. GTBank" required />
              </div>
              <div>
                 <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mb-2 ml-1">Account Number</label>
                 <input v-model="form.bankDetails.accountNumber" type="text" maxlength="10"
                   class="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" 
                   placeholder="10 digits" required />
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mb-2 ml-1">Account Holder Name</label>
              <input v-model="form.bankDetails.accountName" type="text"
                class="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" 
                placeholder="Full Name as on Bank" required />
            </div>
          </div>

          <button type="submit" :disabled="submitting || !form.amount"
            class="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-[0.1em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2">
            <span v-if="submitting">Processing Request...</span>
            <template v-else>
               Send Withdrawal Request
               <Icon name="lucide:send" class="w-5 h-5" />
            </template>
          </button>
        </form>
      </div>

      <!-- Withdrawal History -->
      <div class="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 flex flex-col">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
              <Icon name="lucide:history" class="w-5 h-5" />
            </div>
            <h3 class="text-xl font-black text-gray-900 tracking-tight">Withdrawal History</h3>
          </div>
        </div>

        <div v-if="withdrawals.length === 0" class="flex-1 flex flex-col items-center justify-center py-20 text-center opacity-40">
           <Icon name="lucide:clock" class="w-16 h-16 mb-4 text-gray-300" />
           <p class="text-gray-900 font-black text-lg">No history yet</p>
           <p class="text-gray-500 text-sm">Your past requests will appear here.</p>
        </div>

        <div v-else class="space-y-4 overflow-y-auto max-h-[400px] pr-2 style-scrollbar text-sm">
          <div v-for="w in withdrawals" :key="w._id" 
            class="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-white transition-all group">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Icon name="lucide:banknote" class="w-5 h-5 text-gray-400 group-hover:text-white" />
              </div>
              <div>
                 <p class="text-sm font-black text-gray-900">₦{{ w.amount?.toLocaleString() }}</p>
                 <p class="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{{ new Date(w.createdAt).toLocaleDateString() }}</p>
              </div>
            </div>
            <span :class="['px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border', 
              w.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
              w.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
              'bg-amber-50 text-amber-600 border-amber-100'
            ]">
              {{ w.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchWallet } from '@/composables/modules/wallets/useFetchWallet'
import { useFetchWithdrawals } from '@/composables/modules/wallets/useFetchWithdrawals'
import { useRequestWithdrawal } from '@/composables/modules/wallets/useRequestWithdrawal'
import { useConfirm } from '@/composables/core/useConfirm'

definePageMeta({ layout: 'dashboard' })

const { wallet, fetchWallet } = useFetchWallet()
const { withdrawals, fetchWithdrawals } = useFetchWithdrawals()
const { loading: submitting, requestWithdrawal: submitWithdrawal } = useRequestWithdrawal()
const { openConfirm } = useConfirm()

const form = ref({
  amount: 0,
  bankDetails: {
    bankName: '',
    accountNumber: '',
    accountName: ''
  }
})

async function handleRequestWithdrawal() {
  if (await openConfirm({
    title: 'Confirm Withdrawal',
    message: `You are about to request a withdrawal of ₦${form.value.amount.toLocaleString()} to ${form.value.bankDetails.bankName}. Proceed?`,
    confirmText: 'Yes, Submit Request',
    confirmClass: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-600/20',
    icon: 'lucide:wallet-cards'
  })) {
    const success = await submitWithdrawal(form.value)
    if (success) {
      form.value.amount = 0
      await handleFetchData()
    }
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

<style scoped>
.style-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.style-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.style-scrollbar::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 10px;
}
.style-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #D1D5DB;
}
</style>
