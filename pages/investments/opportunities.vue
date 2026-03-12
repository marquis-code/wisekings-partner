<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Investment Opportunities</h1>
        <p class="text-gray-500 mt-2">Scale your business and WiseKings through strategic partnerships.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Gold Tier Showcase -->
        <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group">
          <div class="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <div class="relative">
            <div class="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
              <span class="text-amber-600 font-bold text-xl">G</span>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Gold Credit Partner</h2>
            <p class="text-gray-600 mb-8 leading-relaxed">
              Invest in small amounts to enable purchase orders and raw material production. Earn fixed returns of 5% - 6.5% flat over 60 days.
            </p>
            
            <div class="space-y-4 mb-8">
              <div v-for="p in goldProposals" :key="p._id" class="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div class="flex justify-between items-center mb-1">
                  <span class="font-bold text-gray-900">{{ p.title }}</span>
                  <span class="text-amber-600 font-bold">{{ p.interestRate }}%</span>
                </div>
                <div class="text-sm text-gray-500 flex justify-between">
                  <span>Target: ₦{{ formatCurrency(p.targetAmount) }}</span>
                  <span>Duration: {{ p.durationDays }} Days</span>
                </div>
                <button class="w-full mt-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition">
                  Invest Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Diamond Tier Showcase -->
        <div class="bg-indigo-900 rounded-3xl p-8 shadow-xl relative overflow-hidden group text-white">
          <div class="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 transition-transform group-hover:scale-110"></div>
          <div class="relative">
            <div class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
              <span class="text-white font-bold text-xl">D</span>
            </div>
            <h2 class="text-2xl font-bold mb-2">Diamond Investor</h2>
            <p class="text-indigo-100/80 mb-8 leading-relaxed">
              Become a shareholder in WiseKings. Own a percentage of the business, participate in scaling, and share periodic profits.
            </p>

            <div class="space-y-4 mb-8">
              <div v-for="p in diamondProposals" :key="p._id" class="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div class="flex justify-between items-center mb-1">
                  <span class="font-bold">{{ p.title }}</span>
                  <span class="text-indigo-300 font-bold text-xs uppercase">Equity</span>
                </div>
                <div class="text-sm text-indigo-100/60 flex justify-between">
                  <span>Target: ₦{{ formatCurrency(p.targetAmount) }}</span>
                  <span>Offer: {{ p.equityOffered }}% Ownership</span>
                </div>
                <button class="w-full mt-4 py-2.5 bg-white text-indigo-900 rounded-xl text-sm font-bold hover:bg-indigo-50 transition">
                  Request Pitch Deck
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const proposals = ref([]);
const goldProposals = computed(() => proposals.value.filter(p => p.category === 'gold' && p.status === 'open'));
const diamondProposals = computed(() => proposals.value.filter(p => p.category === 'diamond' && p.status === 'open'));

const fetchProposals = async () => {
  try {
    const { data } = await axios.get('/api/investments/proposals');
    proposals.value = data;
  } catch (err) {
    console.error('Failed to fetch proposals');
  }
};

const formatCurrency = (val) => new Intl.NumberFormat('en-NG').format(val || 0);

onMounted(fetchProposals);
</script>
