<template>
  <div class="p-6 bg-white min-h-screen">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 class="text-3xl font-black text-gray-900 tracking-tight">My Investment Portfolio</h1>
          <p class="text-gray-500 font-medium">Tracking your growth and realized returns with WiseKings.</p>
        </div>
        <div class="flex gap-3">
          <NuxtLink to="/investments/opportunities" class="px-5 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition active:scale-95">
            New Investment
          </NuxtLink>
        </div>
      </div>

      <!-- High Level Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div v-for="stat in portfolioStats" :key="stat.label" class="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <p class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{{ stat.label }}</p>
          <p class="text-3xl font-black text-gray-900">{{ stat.value }}</p>
          <p class="text-xs text-green-500 font-bold mt-2" v-if="stat.growth">{{ stat.growth }}</p>
        </div>
      </div>

      <!-- Investment Records (Digital Spreadsheet) -->
      <div class="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
        <div class="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h2 class="font-bold text-gray-800">Transaction Records</h2>
          <button class="text-xs font-bold text-blue-600 uppercase tracking-wider">Download Statement</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                <th class="px-8 py-5">Invoice No.</th>
                <th class="px-8 py-5">Customer</th>
                <th class="px-8 py-5">Value (₦)</th>
                <th class="px-8 py-5">Due Date</th>
                <th class="px-8 py-5">Status</th>
                <th class="px-8 py-5 text-right">Investor Return</th>
                <th class="px-8 py-5 text-right">Realized Return</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="item in investments" :key="item._id" class="group hover:bg-gray-50/50 transition">
                <td class="px-8 py-6 text-sm font-mono text-gray-500">{{ item.invoiceNo }}</td>
                <td class="px-8 py-6">
                  <div class="text-sm font-bold text-gray-900">{{ item.customer }}</div>
                </td>
                <td class="px-8 py-6 text-sm font-medium text-gray-700">{{ formatCurrency(item.invoiceValue) }}</td>
                <td class="px-8 py-6 text-sm text-gray-500">{{ formatDate(item.dueDate) }}</td>
                <td class="px-8 py-6">
                  <span 
                    :class="[
                      'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-block',
                      item.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    ]"
                  >
                    {{ item.paymentStatus }}
                  </span>
                </td>
                <td class="px-8 py-6 text-sm font-bold text-gray-900 text-right">₦{{ formatCurrency(item.investorReturn) }}</td>
                <td class="px-8 py-6 text-sm font-bold text-blue-600 text-right">
                  ₦{{ formatCurrency(item.realizedReturn || 0) }}
                </td>
              </tr>
              <tr v-if="investments.length === 0">
                <td colspan="7" class="px-8 py-20 text-center text-gray-400 font-medium">
                  No investment records found. <NuxtLink to="/investments/opportunities" class="text-blue-600 underline">Browse opportunities</NuxtLink>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const investments = ref([]);

const portfolioStats = computed(() => {
  const total = investments.value.reduce((acc, curr) => acc + curr.invoiceValue, 0);
  const realized = investments.value.reduce((acc, curr) => acc + (curr.realizedReturn || 0), 0);
  const pending = investments.value.filter(i => i.paymentStatus !== 'paid').length;

  return [
    { label: 'Total Invested', value: `₦${formatCurrency(total)}` },
    { label: 'Realized Return', value: `₦${formatCurrency(realized)}`, growth: '+12.5% vs last month' },
    { label: 'Active Transactions', value: pending }
  ];
});

const fetchInvestments = async () => {
  try {
    // Note: partnerId should be retrieved from auth state/store in a real scenario
    const { data } = await axios.get('/api/investments/my-investments');
    investments.value = data;
  } catch (err) {
    console.error('Failed to fetch investments');
  }
};

const formatCurrency = (val) => new Intl.NumberFormat('en-NG').format(val || 0);
const formatDate = (date) => date ? new Date(date).toLocaleDateString() : 'N/A';

onMounted(fetchInvestments);
</script>

<style scoped>
.font-black { font-weight: 900; }
</style>
