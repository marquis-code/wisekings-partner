<template>
  <div class="space-y-10 pb-20">
    <definePageMeta :layout="'dashboard'" />

    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-3xl font-black text-gray-900 tracking-tight">Referral History</h1>
        <p class="text-gray-500 font-medium mt-1">Track every partner who joined through your unique link.</p>
      </div>
      <div class="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-2xl border border-indigo-100">
        <Icon name="lucide:users" class="w-5 h-5 text-indigo-600" />
        <span class="text-sm font-black text-indigo-700">{{ referrals?.length || 0 }} Total</span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && referrals.length === 0" class="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-20 text-center relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-indigo-50/20 to-transparent pointer-events-none"></div>
      <div class="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10">
        <Icon name="lucide:user-plus-2" class="w-10 h-10 text-indigo-400 opacity-50" />
      </div>
      <h2 class="text-2xl font-black text-gray-900 mb-2 relative z-10">No Referrals Yet</h2>
      <p class="text-gray-500 max-w-sm mx-auto mb-10 relative z-10">Your referral history will appear here once new partners sign up using your link.</p>
      <NuxtLink to="/" class="inline-flex items-center gap-2 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20">
        Get Sharing Link
        <Icon name="lucide:arrow-right" class="w-5 h-5" />
      </NuxtLink>
    </div>

    <!-- Referrals Table -->
    <div v-else class="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-50 bg-gray-50/30">
              <th class="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Partner Details</th>
              <th class="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th class="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Joined Date</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="r in referrals" :key="r._id" class="hover:bg-indigo-50/30 transition-colors group">
              <td class="px-8 py-6">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <span class="text-xs font-black uppercase">{{ (r.fullName || r.email)?.[0] }}</span>
                  </div>
                  <div>
                    <p class="text-sm font-black text-gray-900">{{ r.fullName || 'Anonymous Partner' }}</p>
                    <p class="text-[10px] text-gray-400 font-bold tracking-tight">{{ r.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-8 py-6">
                <span :class="['px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border', 
                  r.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                ]">
                  {{ r.isActive ? 'Active' : 'Pending' }}
                </span>
              </td>
              <td class="px-8 py-6 text-right">
                <p class="text-xs font-bold text-gray-500">{{ new Date(r.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchReferrals } from '@/composables/modules/partners/useFetchReferrals'

definePageMeta({ layout: 'dashboard' })

const { referrals, fetchReferrals, loading } = useFetchReferrals()

onMounted(() => fetchReferrals())
</script>
