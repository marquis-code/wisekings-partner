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
            <p>By accessing the WiseKings Partner Portal and registering an account, you enter into a binding agreement with WiseKings Africa ("The Company"). This partnership is established to facilitate the growth of decentralized trade financing and equity participation in the consumer goods sector. Partners are defined as independent participants who provide capital or marketing reach to scale the distribution of WiseKings branded snack products across regional and international markets.</p>
          </div>

          <div>
             <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">2. Capital Commitment & Strategic Tiers</h2>
             <p>Participation in the WiseKings ecosystem is categorized into strategic tiers, each with distinct risk-reward profiles and commitment durations:</p>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                   <h4 class="font-black text-indigo-600 mb-2 uppercase tracking-widest text-xs">Gold Tier (LPO Financing)</h4>
                   <p class="text-sm leading-relaxed text-slate-600">Partners commit capital to fund specific commodity purchase orders (LPOs). These cycles operate on a strict 60-day tenor. Investors receive a fixed flat return of 6.5% upon successful completion of the trade cycle and customer settlement.</p>
                </div>
                <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                   <h4 class="font-black text-indigo-600 mb-2 uppercase tracking-widest text-xs">Diamond Tier (Equity Participation)</h4>
                   <p class="text-sm leading-relaxed text-slate-600">Partners acquire fractional ownership units of WiseKings expansion infrastructure. Rewards are distributed through quarterly dividends derived from net operational profits. This tier carries a long-term growth horizon (3-5 years).</p>
                </div>
             </div>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">3. Profit Distribution & Settlement</h2>
            <p>Profits are calculated based on the net margin of verified trade cycles. WiseKings guarantees absolute transparency through the cryptographically secured Partner Dashboard. Payouts are initially credited to the internal Partner Wallet and can be withdrawn to verified bank accounts. All withdrawals are subject to mandatory KYC/AML screening and typically clear within 24 to 48 business hours.</p>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">4. Professional Ethics & Compliance</h2>
            <p>Partners must maintain the highest standards of professional integrity. Prohibited activities include, but are not limited to: misrepresenting the Company's brand, making unauthorized guarantees of returns beyond stated tiers, engagement in predatory marketing, or multi-account exploitation. Any breach of these ethical standards will result in immediate disqualification from the partner program and forfeiture of pending incentives.</p>
          </div>

          <div>
             <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">5. Risk Acknowledgment & Liability</h2>
             <p>While WiseKings utilizes rigorous logistical auditing and financial risk-shielding, all business participation involves inherent market risks. Partners explicitly acknowledge that they have read and fully understood the <NuxtLink to="/risk-disclosure" class="text-indigo-600 font-bold underline decoration-2 underline-offset-4">Risk Disclosure</NuxtLink> statement and are committing capital that is within their individual risk tolerance thresholds.</p>
          </div>

          <div>
             <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">6. Term & Termination</h2>
             <p>This agreement remains in effect until terminated by either party. Termination requires a 30-day written notice. Upon notice of termination, all active capital commitments must reach their natural cycle conclusion before final capital repatriation is processed to the Partner's primary account.</p>
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
