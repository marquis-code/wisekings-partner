<template>
  <div class="space-y-10 pb-20">

    <!-- KYC Alert Banner -->
    <div v-if="profile?.kyc?.status !== 'approved' && profile?.kyc?.status !== 'pending'" 
      class="bg-gradient-to-br from-amber-500 to-orange-600 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
      <div class="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-700"></div>
      
      <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div class="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div class="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
            <Icon name="lucide:shield-alert" class="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 class="text-2xl font-black mb-2 tracking-tight">KYC Verification Required</h2>
            <p v-if="profile?.kyc?.status === 'rejected'" class="text-white font-bold mb-1">Reason: {{ profile?.kyc?.rejectionReason }}</p>
            <p class="text-white/80 text-base max-w-xl leading-relaxed">Please complete your identity verification to enable commission withdrawals and partner financing.</p>
          </div>
        </div>
        <NuxtLink to="/kyc" class="shrink-0 bg-white text-orange-600 px-10 py-4 rounded-2xl font-black hover:bg-orange-50 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 group/btn">
          Verify Identity
          <Icon name="lucide:shield-check" class="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
    </div>

    <!-- Welcome & Quick Stats -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-3xl font-black text-gray-900 tracking-tight">Welcome back, {{ user?.fullName?.split(' ')[0] }}! 👋</h1>
        <p class="text-gray-500 font-medium mt-1">Here's what's happening with your partnership today.</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="px-4 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span class="text-xs font-bold text-gray-600 uppercase tracking-widest">Live Status: Active</span>
        </div>
      </div>
    </div>

    <!-- Agreement Alert Banner -->
    <div v-if="profile?.applicationStatus === 'approved' && profile?.agreementStatus === 'pending_signature'" 
      class="bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
      <div class="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-700"></div>
      <div class="absolute -left-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-700"></div>
      
      <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div class="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div class="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
            <Icon name="lucide:file-signature" class="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 class="text-2xl font-black mb-2 tracking-tight">Action Required: Sign Financing Agreement</h2>
            <p class="text-white/80 text-base max-w-xl leading-relaxed">Your partnership application is approved! Please sign the LPO Financing Agreement to unlock your full dashboard and start earning commissions.</p>
          </div>
        </div>
        <NuxtLink to="/agreement" class="shrink-0 bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black hover:bg-indigo-50 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 group/btn">
          Sign Agreement Now
          <Icon name="lucide:arrow-right" class="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="s in statsCards" :key="s.label" 
        class="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
        <div class="flex flex-col gap-4 relative z-10">
          <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:rotate-6', s.bgColor || 'bg-gray-50']">
            <Icon :name="s.icon" :class="['w-7 h-7', s.iconColor]" />
          </div>
          <div>
            <span class="text-gray-400 text-[11px] font-black uppercase tracking-[0.15em]">{{ s.label }}</span>
            <p class="text-3xl font-black text-gray-900 mt-1.5 tracking-tighter">{{ s.value }}</p>
          </div>
        </div>
        <div class="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between">
           <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">+12.5%</span>
              <span class="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">vs last month</span>
           </div>
           <Icon name="lucide:trending-up" class="w-4 h-4 text-emerald-500" />
        </div>
      </div>
    </div>

    <!-- Referral Link Asset Card -->
    <div class="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
      <div class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
        <div class="max-w-xl">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <Icon name="lucide:share-2" class="w-6 h-6 text-indigo-400" />
            </div>
            <h2 class="text-2xl font-black tracking-tight">Your Referral Engine</h2>
          </div>
          <p class="text-gray-400 text-lg leading-relaxed mb-8">
            This is your unique partnership key. Share it with your network to earn competitive commissions on every successful referral.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="relative flex-1 group">
              <input :value="profile?.referralLink" readonly 
                class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm font-mono text-indigo-300 outline-none focus:border-indigo-500/50 transition-all" />
              <button @click="copy" class="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white active:scale-90">
                <Icon name="lucide:copy" class="w-5 h-5" />
              </button>
            </div>
            <button @click="copy" class="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-1 active:translate-y-0">
              Copy Link
            </button>
          </div>
        </div>
        
        <div class="shrink-0 flex flex-col items-center gap-4">
          <div class="p-6 bg-white rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border border-gray-100">
            <div class="w-40 h-40 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden">
               <template v-if="qrCode">
                 <img :src="qrCode" alt="Referral QR" class="w-full h-full object-contain p-2" />
               </template>
               <div v-else class="w-full h-full flex items-center justify-center">
                  <Icon name="lucide:loader-2" class="w-10 h-10 text-indigo-500 animate-spin" />
               </div>
            </div>
            <p class="text-[10px] font-black text-gray-500 mt-4 uppercase tracking-widest text-center">Scan to Register</p>
          </div>
          <div class="flex items-center gap-2">
            <button @click="shareLink" class="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl border border-white/10 hover:bg-white/20 transition-all text-[10px] font-black uppercase tracking-widest">
              <Icon name="lucide:share-2" class="w-3.5 h-3.5" />
              Share
            </button>
            <button @click="downloadQr" v-if="qrCode" class="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl border border-white/10 hover:bg-white/20 transition-all text-[10px] font-black uppercase tracking-widest leading-none">
              <Icon name="lucide:download" class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Recent Earnings -->
      <div class="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
        <div class="flex items-center justify-between mb-10 relative z-10">
          <div>
            <h2 class="text-2xl font-black text-gray-900 tracking-tight">Recent Earnings</h2>
            <p class="text-sm text-gray-500 font-medium">Your latest commission payouts</p>
          </div>
          <NuxtLink to="/commissions" class="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-all group">
            <Icon name="lucide:arrow-right" class="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>

        <div v-if="commissions.length === 0" class="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
          <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Icon name="lucide:banknote" class="w-10 h-10 text-gray-300" />
          </div>
          <p class="text-gray-900 font-black text-lg">No earnings yet</p>
          <p class="text-gray-500 text-sm mt-1">Start referring to see your growth here.</p>
        </div>

        <div v-else class="space-y-4 relative z-10">
          <div v-for="c in commissions" :key="c._id" 
            class="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-50 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group">
            <div class="flex items-center gap-5">
              <div class="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Icon name="lucide:award" class="w-6 h-6" />
              </div>
              <div>
                <p class="text-lg font-black text-gray-900">₦{{ c.amount?.toLocaleString() }}</p>
                <p class="text-xs text-gray-500 font-bold uppercase tracking-tighter">Performance Reward</p>
              </div>
            </div>
            <div class="text-right">
               <span :class="['px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border', 
                c.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
               ]">
                  {{ c.status }}
               </span>
               <p class="text-[10px] text-gray-400 font-bold mt-2">{{ new Date().toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Network Overview -->
      <div class="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-[100px]"></div>
        
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="text-2xl font-black tracking-tight">Network Health</h2>
            <p class="text-white/60 text-sm font-medium">Your partnership viral growth</p>
          </div>
          <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <Icon name="lucide:bar-chart-3" class="w-7 h-7 text-white" />
          </div>
        </div>

        <div class="space-y-6">
          <div class="p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl flex items-center justify-between hover:bg-white/15 transition-all cursor-default">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Icon name="lucide:user-plus" class="w-5 h-5" />
              </div>
              <span class="text-base font-bold text-white/90">Direct Members</span>
            </div>
            <span class="text-3xl font-black">{{ stats?.totalReferrals || 0 }}</span>
          </div>

          <div class="p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl flex items-center justify-between hover:bg-white/15 transition-all cursor-default">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center">
                <Icon name="lucide:zap" class="w-5 h-5 text-emerald-300" />
              </div>
              <span class="text-base font-bold text-white/90">Active Partners</span>
            </div>
            <span class="text-3xl font-black">{{ stats?.activeReferrals || 0 }}</span>
          </div>

           <div class="p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl flex items-center justify-between hover:bg-white/15 transition-all cursor-default">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-amber-500/30 flex items-center justify-center">
                <Icon name="lucide:layers" class="w-5 h-5 text-amber-300" />
              </div>
              <span class="text-base font-bold text-white/90">Network Depth</span>
            </div>
            <div class="text-right">
              <span class="text-3xl font-black">{{ stats?.networkDepth || 1 }}</span>
              <span class="text-[11px] font-black text-white/40 block tracking-widest uppercase">Tiers</span>
            </div>
          </div>
        </div>

        <NuxtLink to="/network" class="mt-12 w-full py-5 bg-white text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-900/40">
          Expand Network View
          <Icon name="lucide:chevron-right" class="w-5 h-5" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchProfile } from '@/composables/modules/partners/useFetchProfile'
import { useFetchStats } from '@/composables/modules/partners/useFetchStats'
import { useFetchCommissions } from '@/composables/modules/commissions/useFetchCommissions'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useAuthState } from '@/composables/useAuthState'
import { partners_api } from '@/api_factory/modules/partners'

definePageMeta({ layout: 'dashboard' })

const { user } = useAuthState()
const { profile, fetchProfile } = useFetchProfile()
const { stats, fetchStats } = useFetchStats()
const { commissions, fetchCommissions } = useFetchCommissions()
const { showToast } = useCustomToast()

useSeoMeta({
  title: 'Partner Dashboard | WiseKings Network',
  description: 'Manage your referrals, track commissions, and grow your snack empire network.',
})

const qrCode = ref('')

async function fetchQrCode() {
  try {
    const res = await partners_api.getReferralQr() as any
    qrCode.value = res.data
  } catch (err) {
    console.error('Failed to fetch QR', err)
  }
}

async function shareLink() {
  const link = profile.value?.referralLink
  if (!link) return

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'WiseKings Partnership',
        text: 'Join the WiseKings network and start earning.',
        url: link,
      })
      showToast({ title: 'Success', message: 'Shared successfully!', toastType: 'success' })
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        showToast({ title: 'Error', message: 'Could not share link', toastType: 'error' })
      }
    }
  } else {
    copy()
    showToast({ title: 'Info', message: 'Share not supported, link copied to clipboard.', toastType: 'info' })
  }
}

function downloadQr() {
  if (!qrCode.value) return
  const link = document.createElement('a')
  link.href = qrCode.value
  link.download = `wisekings-partner-${profile.value?.partnerCode || 'qr'}.png`
  link.click()
}

const statsCards = computed(() => [
  { label: 'Total Sales', value: `₦${((stats.value?.totalSalesValue || 0) / 1000).toFixed(0)}k`, icon: 'lucide:trending-up', iconColor: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  { label: 'Month Earning', value: `₦${((stats.value?.monthlySalesValue || 0) / 1000).toFixed(0)}k`, icon: 'lucide:banknote', iconColor: 'text-purple-600', bgColor: 'bg-purple-50' },
  { label: 'Referrals', value: stats.value?.totalReferrals || 0, icon: 'lucide:users-2', iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  { label: 'Commission', value: `${profile.value?.commissionRate || 3}%`, icon: 'lucide:star', iconColor: 'text-amber-500', bgColor: 'bg-amber-50' },
])

function copy() {
  if (profile.value?.referralLink) {
    navigator.clipboard.writeText(profile.value.referralLink)
    showToast({ title: 'Success', message: 'Referral link copied to clipboard!', toastType: 'success' })
  }
}

onMounted(async () => {
  await Promise.allSettled([
    fetchProfile(),
    fetchStats(),
    fetchQrCode(),
    fetchCommissions({ limit: 5 })
  ])
})
</script>

<style scoped>
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
