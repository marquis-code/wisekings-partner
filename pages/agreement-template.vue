<template>
  <div class="min-h-screen bg-slate-50 font-inter text-slate-800">
    <nav class="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/welcome" class="flex items-center gap-2 group">
          <Icon name="lucide:arrow-left" size="18" class="group-hover:-translate-x-1 transition-transform" />
          <span class="font-bold text-sm">Back to Home</span>
        </NuxtLink>
        <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">WiseKings Partnership Vault</span>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto px-6 py-20">
      <div class="bg-white rounded-[2.5rem] p-10 md:p-20 shadow-2xl shadow-slate-200/50 border border-slate-200 space-y-12 relative overflow-hidden reveal transition-all duration-1000 transform translate-y-12">
        <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[120px] -z-0"></div>
        
        <header class="text-center space-y-4 border-b border-slate-100 pb-12 relative z-10">
          <div class="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
             <Icon name="lucide:file-signature" size="28" />
          </div>
          <h1 class="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">Master Partnership Agreement</h1>
          <p class="text-slate-500 font-bold tracking-[0.3em] uppercase text-[10px]">WiseKings Africa x Independent Partner | Global Edition</p>
        </header>

        <div class="prose prose-slate max-w-none space-y-12 text-slate-700 relative z-10">
           <section>
              <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">I. Preamble</h2>
              <p class="leading-relaxed">This Master Partnership Agreement ("Agreement") defines the operational and financial relationship between **WiseKings Africa**, hereinafter referred to as "The Company", and the **Signed Partner**, hereinafter referred to as "The Partner". The goal is to leverage capital and referrals for the scale-up of decentralized snacks commerce.</p>
           </section>

           <section>
              <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">II. Operational Tiers & Commitment</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                 <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                    <h4 class="font-black text-amber-700 mb-3 uppercase tracking-widest text-xs">Gold Tier Engagement</h4>
                    <p class="text-sm leading-relaxed">The Partner provides credit for purchase order financing. The Company guarantees the return of principal plus a net profit margin upon the successful completion of the commodity trade cycle.</p>
                 </div>
                 <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                    <h4 class="font-black text-indigo-700 mb-3 uppercase tracking-widest text-xs">Diamond Tier Engagement</h4>
                    <p class="text-sm leading-relaxed">The Partner acquires equity shares in the Company's expansion units. Gains are realized through asset appreciation and quarterly dividend distributions.</p>
                 </div>
              </div>
           </section>

           <section>
              <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">III. Performance & Reporting</h2>
              <p>The Company shall provide a real-time digital Dashboard for the Partner to monitor capital deployment, inventory movement, and estimated returns. This digital record serves as the primary source of truth for all transactional settlements.</p>
           </section>

           <section class="p-10 bg-slate-950 text-white rounded-[2.5rem] space-y-8 overflow-hidden relative">
              <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <h3 class="text-lg font-black uppercase tracking-[0.2em] text-indigo-400">Electronic Consent & Validity</h3>
              <p class="text-sm text-slate-400 leading-relaxed font-medium">
                 By completing the digital signature process or clicking the "Accept Agreement" trigger within the Partner Portal, the Partner acknowledges full understanding of these terms. This electronic consent carries the same legal weight as a physical signature under the Digital Evidence Act and relevant global e-commerce statutes.
              </p>
              <div class="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-600">
                 <Icon name="lucide:shield-check" size="16" />
                 <span>Verified Secure Digital Signature Protocol</span>
              </div>
           </section>
        </div>

        <footer class="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100 italic text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
           <p>Document Ref: WK-MPA-2026-V3</p>
           <p>Certified for All Active Expansion Regions</p>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useScrollReveal } from '@/composables/core/useScrollReveal'
useScrollReveal()
definePageMeta({ layout: false })
</script>

<style scoped>
.reveal {
  opacity: 0;
  will-change: transform, opacity;
}
.reveal-visible {
  opacity: 1 !important;
  transform: translate(0, 0) scale(1) !important;
}
</style>
