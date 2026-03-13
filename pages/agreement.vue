<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Financing Agreement</h1>
      <p class="text-gray-500 text-sm mt-1 font-medium">Review and electronically sign your LPO Financing Agreement.</p>
    </div>

    <!-- Signed State -->
    <div v-if="profile?.agreementStatus === 'signed'" class="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 flex flex-col items-center justify-center text-center">
      <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600">
        <Icon name="lucide:check-circle" size="40" />
      </div>
      <h2 class="text-2xl font-bold text-emerald-900 mb-2">Agreement Signed Successfully</h2>
      <p class="text-emerald-700 max-w-lg mb-8">Thank you, {{ profile?.fullName }}. Your account is fully active and you can now start providing financing.</p>
      
      <NuxtLink to="/" class="btn-primary !px-8 !py-3">
        Return to Dashboard
      </NuxtLink>
    </div>

    <!-- Signing Container -->
    <div v-else class="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative">
      <div class="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-orange-500 to-amber-500"></div>
      
      <div class="p-8 md:p-12">
        <!-- Document Title -->
        <div class="text-center mb-12 border-b border-gray-100 pb-8">
          <div class="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon name="lucide:file-text" size="24" class="text-gray-400" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 uppercase tracking-widest mb-4">LPO Financing & Receivable Financing Agreement</h2>
          <p class="text-gray-500 font-medium">Between <span class="font-bold text-gray-900">Wisekings Ventures</span> and <span class="font-bold text-gray-900">{{ profile?.fullName || profile?.companyName }}</span></p>
        </div>

        <!-- Document Content (Scrollable) -->
        <div class="prose prose-sm md:prose-base max-w-none text-gray-600 h-[60vh] overflow-y-auto pr-6 custom-scrollbar space-y-6">
          <p class="font-bold text-gray-900">This Agreement establishes the terms under which {{ profile?.fullName || profile?.companyName }} ("Investor") shall provide short-term financing to Wisekings Ventures ("Wisekings") for the purpose of funding production and supply of Wisekings Branded Plantain Chips, Potato Chips, and Popcorn Snacks to supermarkets and other reputable organizations, who operate within a 60-day credit cycle.</p>
          
          <div>
            <h3 class="text-lg font-bold text-gray-900">1. Purpose of Agreement</h3>
            <p>This Agreement establishes the terms under which Investor shall provide short-term financing to Wisekings Ventures for the purpose of funding production and supply of Wisekings Branded Snacks to supermarkets and other reputable organizations, who operate within a 60-day credit cycle.</p>
          </div>

          <div>
            <h3 class="text-lg font-bold text-gray-900">2. Financing Structure</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong>Approved Purchase Orders:</strong> Investor advances funds against approved purchase Orders or Confirmed invoices.</li>
              <li><strong>Tenor:</strong> 60 days only.</li>
              <li><strong>Commencement:</strong> The 60-days from the date of disbursement.</li>
              <li><strong>Investor Return:</strong> 6.5% flat return.</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold text-gray-900">3. Rights and Obligations</h3>
            <p>Wisekings shall ensure timely production and delivery. The Investor shall provide funds completely upon execution of this document for the agreed upon duration.</p>
          </div>

          <div>
            <h3 class="text-lg font-bold text-gray-900">4. Settlement</h3>
            <p>Upon maturity of the 60 days cycle, Wisekings shall remit the principal plus the 6.5% interest to the Investor's designated bank account.</p>
          </div>
          
          <div class="p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-500 italic">
            This digital record represents clauses 1-13 as presented in the master servicing LPO agreement. Your electronic signature carries the same legal weight as a wet physical signature.
          </div>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="bg-gray-50 p-8 border-t border-gray-100">
        <label class="flex items-start gap-3 cursor-pointer mb-6 group">
          <div class="relative flex items-center justify-center shrink-0 mt-0.5">
            <input type="checkbox" v-model="hasRead" class="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-orange-500/20 checked:bg-orange-500 checked:border-orange-500 transition-all cursor-pointer" />
            <Icon name="lucide:check" class="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
          </div>
          <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">By checking this box, I acknowledge that I have completely read, understood, and agree to be bound by the terms and conditions outlined in this LPO Financing Agreement.</span>
        </label>

        <div class="flex justify-end gap-4">
          <NuxtLink to="/" class="btn-secondary !px-6 py-3">Cancel</NuxtLink>
          <button 
            @click="handleSign" 
            :disabled="!hasRead || signing" 
            class="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2"
          >
            <Icon v-if="signing" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
            <Icon v-else name="lucide:pen-tool" class="w-5 h-5" />
            Sign Digitally
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

import { useFetchProfile } from '@/composables/modules/partners/useFetchProfile'
import { useSignAgreement } from '@/composables/modules/partners/useSignAgreement'

const { profile, fetchProfile } = useFetchProfile()
const { signAgreement, loading: signing } = useSignAgreement()

const hasRead = ref(false)

onMounted(() => {
  fetchProfile()
})

const handleSign = async () => {
  if (!hasRead.value) return
  
  const success = await signAgreement()
  if (success) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #f3f4f6;
  border-radius: 20px;
}
</style>