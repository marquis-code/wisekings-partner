<template>
  <div class="min-h-screen bg-slate-50 font-inter text-slate-800">
    <nav class="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/welcome" class="flex items-center gap-2 group">
          <Icon name="lucide:arrow-left" size="18" class="group-hover:-translate-x-1 transition-transform" />
          <span class="font-bold text-sm">Back to Home</span>
        </NuxtLink>
        <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">WiseKings Legal Framework</span>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto px-6 py-20">
      <div class="bg-white rounded-[2.5rem] p-10 md:p-20 shadow-xl shadow-slate-200/50 border border-slate-100">
        <header class="border-b border-slate-100 pb-12 mb-12">
          <div class="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg">
             <Icon name="lucide:scroll-text" size="32" />
          </div>
          <h1 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Terms of Service</h1>
          <p class="text-slate-500 font-bold font-mono text-xs uppercase tracking-[0.2em]">Version 2.4 | Last Modified: March 12, 2026</p>
        </header>

        <section class="prose prose-slate max-w-none space-y-12 text-slate-600 leading-relaxed">
          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">1. The Partnership Mandate</h2>
            <p>By accessing the WiseKings Partner Portal and registering an account, you enter into a binding agreement with WiseKings Africa ("The Company"). This partnership is established to facilitate the growth of decentralized trade financing and equity participation in the consumer goods sector.</p>
          </div>

          <div>
             <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">2. Capital Commitment & Tiers</h2>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                   <h4 class="font-black text-slate-900 mb-2">Gold Tier (PO Financing)</h4>
                   <p class="text-sm">Partners commit capital to specific commodity purchase orders. These cycles are fixed-term (60 days) and carry a pre-defined profit margin.</p>
                </div>
                <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                   <h4 class="font-black text-slate-900 mb-2">Diamond Tier (Equity)</h4>
                   <p class="text-sm">Partners acquire fractional ownership of WiseKings expansion units. Rewards are distributed through quarterly dividends based on operational success.</p>
                </div>
             </div>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">3. Profit Distribution Mechanics</h2>
            <p>Profits are calculated based on the net margin of successful trade cycles. WiseKings guarantees transparency through the real-time Dashboard. Payouts are made to the internal Wallet and can be withdrawn to verified bank accounts subject to standard KYC/AML verification times (24-48 hours).</p>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">4. Professional Ethics & Compliance</h2>
            <p>Partners are strictly prohibited from misrepresenting the Company's brand, guaranteed returns (which are subject to market conditions in some tiers), or engaging in predatory marketing. Multi-account fraud or exploitation of referral bonuses will result in immediate account termination and forfeiture of pending commissions.</p>
          </div>

          <div>
             <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">5. Risk & Liability</h2>
             <p>While WiseKings employs rigorous logistical and financial risk management, all business participation involves inherent risk. Partners acknowledge that they have read the <NuxtLink to="/risk-disclosure" class="text-indigo-600 font-bold underline">Risk Disclosure</NuxtLink> and are investing capital they can afford to lock for the specified cycle durations.</p>
          </div>

          <div>
             <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">6. Termination of Agreement</h2>
             <p>Either party may terminate the partnership with 30 days notice. Upon termination, all active cycles must reach completion before final capital repatriation is processed.</p>
          </div>
        </section>

        <footer class="mt-20 pt-10 border-t border-slate-100">
           <div class="flex flex-col md:flex-row items-center justify-between gap-6">
              <div class="flex items-center gap-4">
                 <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Icon name="lucide:mail" class="text-slate-400" size="18" />
                 </div>
                 <p class="text-sm font-bold text-slate-500">Legal Support: <span class="text-slate-900 underline">legal@wisekings.ng</span></p>
              </div>
              <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest">&copy; 2026 WiseKings Governance Board</p>
           </div>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
</script>
