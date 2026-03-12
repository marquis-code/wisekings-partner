<template>
  <div class="min-h-screen bg-slate-50 font-inter text-slate-800">
    <nav class="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/welcome" class="flex items-center gap-2 group">
          <Icon name="lucide:arrow-left" size="18" class="group-hover:-translate-x-1 transition-transform" />
          <span class="font-bold text-sm">Back to Home</span>
        </NuxtLink>
        <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">WiseKings Risk Advisory</span>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto px-6 py-20">
      <div class="bg-white rounded-[2.5rem] p-10 md:p-20 shadow-xl shadow-slate-200/50 border border-slate-200 space-y-12 overflow-hidden relative">
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50"></div>
        
        <header class="border-b border-slate-100 pb-12 relative z-10">
          <div class="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-8 border border-amber-200 shadow-sm animate-pulse-slow">
            <Icon name="lucide:alert-triangle" class="text-amber-600" size="32" />
          </div>
          <h1 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Risk Disclosure</h1>
          <p class="text-slate-500 font-bold text-sm italic">All partners must read and acknowledge these risks before capital commitment.</p>
        </header>

        <section class="space-y-12 text-slate-600 leading-relaxed relative z-10">
          <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100 font-medium italic text-slate-700">
             "WiseKings Africa maintains a perfect repayment record for over 3 years, but past performance is never a guarantee of future returns. Business participation involves inherent risks that every partner must understand."
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div class="space-y-4">
                <h2 class="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                   <span class="w-2 h-2 bg-amber-500 rounded-full"></span>
                   1. Cycle Interruption Risk
                </h2>
                <p class="text-sm">Commodity trade cycles (Gold Tier) are subject to logistical and supply chain factors. While rare, extreme events like port strikes or regional instability can extend a 60-day cycle. Capital is always prioritized, but profit timing may vary.</p>
             </div>

             <div class="space-y-4">
                <h2 class="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                   <span class="w-2 h-2 bg-amber-500 rounded-full"></span>
                   2. Asset Liquidity Risk
                </h2>
                <p class="text-sm">Once capital is committed to a purchase order, it is deployed into physical inventory. This capital is illiquid until the inventory is sold and the cycle concludes. Early withdrawals are not permitted to maintain system stability for all partners.</p>
             </div>

             <div class="space-y-4">
                <h2 class="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                   <span class="w-2 h-2 bg-indigo-500 rounded-full"></span>
                   3. Equity Valuation Risk
                </h2>
                <p class="text-sm">Diamond Tier shareholders face market-driven valuation risks. The the price of private equity is determined by company performance, expansion success, and overall sector appetite. Equity should be viewed as a 3-5 year horizon commitment.</p>
             </div>

             <div class="space-y-4">
                <h2 class="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                   <span class="w-2 h-2 bg-indigo-500 rounded-full"></span>
                   4. Operational Risk
                </h2>
                <p class="text-sm">WiseKings operates across multiple jurisdictions. Regulatory changes in local markets regarding snacks import/export or financial technology can impact operational overhead and net margins.</p>
             </div>
          </div>

          <div class="p-8 bg-slate-900 text-white rounded-[2rem] space-y-4">
             <h3 class="text-lg font-black uppercase tracking-widest text-amber-400">Prudent Participation</h3>
             <p class="text-sm text-slate-400 leading-relaxed">
                We strongly advise all partners to diversify their participation. Invest only capital that you can afford to commit for the specified durations. If you are unsure of your financial standing, please consult with a certified financial advisor before joining.
             </p>
          </div>
        </section>

        <footer class="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-300">
           <p>Doc Ref: WK-RD-2026-FINAL</p>
           <p>Risk Management Department</p>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}
.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}
</style>
