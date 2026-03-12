<template>
  <div class="min-h-screen bg-slate-50 font-inter text-slate-800">
    <nav class="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/welcome" class="flex items-center gap-2 group">
          <Icon name="lucide:arrow-left" size="18" class="group-hover:-translate-x-1 transition-transform" />
          <span class="font-bold text-sm">Back to Home</span>
        </NuxtLink>
        <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">WiseKings Data Shield</span>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto px-6 py-20">
      <div class="bg-white rounded-[2.5rem] p-10 md:p-20 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[100px] -z-0"></div>
        
        <header class="border-b border-slate-100 pb-12 mb-12 relative z-10">
          <div class="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-600/20">
             <Icon name="lucide:shield-check" size="32" />
          </div>
          <h1 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Privacy Policy</h1>
          <p class="text-slate-500 font-bold font-mono text-xs uppercase tracking-[0.2em]">Safety & Transparency | Last Updated: March 2026</p>
        </header>

        <section class="prose prose-slate max-w-none space-y-12 text-slate-600 leading-relaxed relative z-10">
          <p class="text-lg font-medium text-slate-700">At WiseKings, we treat your business and financial data with the same gravity as we do our own inventory. This policy outlines how we collect, protect, and utilize your information as a partner.</p>

          <div>
             <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">1. Data Collection & Purpose</h2>
             <p>We collect only what is necessary to facilitate your partnership and comply with global financial regulations:</p>
             <ul class="list-disc pl-6 space-y-2 mt-4 font-bold text-slate-700">
                <li>KYC Information: National identification and tax residency details.</li>
                <li>Financial Data: Payout destination accounts and transaction history.</li>
                <li>Security Logs: IP addresses and device fingerprints to prevent unauthorized portal access.</li>
             </ul>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">2. Use of Information</h2>
            <p>Your data is strictly used for:</p>
            <ul class="list-disc pl-6 space-y-2 mt-4">
               <li>Processing trade cycle distributions and equity dividends.</li>
               <li>Providing real-time performance analytics on your private Dashboard.</li>
               <li>Complying with Anti-Money Laundering (AML) and Counter-Terrorism Financing (CTF) laws.</li>
            </ul>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">3. Data Security & Sovereignty</h2>
            <p>We use TLS 1.3 encryption for all data in transit and AES-256 for data at rest. Your sensitive documents are stored in isolated, encrypted buckets. We do not sell, rent, or trade your personal data with third-party marketing firms under any circumstances.</p>
          </div>

          <div class="p-8 bg-indigo-50 border border-indigo-100 rounded-3xl">
             <h3 class="text-indigo-900 font-black mb-2 uppercase tracking-widest text-sm">International Data Transfers</h3>
             <p class="text-indigo-700/80 text-sm">As a global platform, your data may be processed in multiple cloud regions. We ensure all regional processors adhere to GDPR and equivalent local data protection standards.</p>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">4. Your Rights</h2>
            <p>You have the right to request a full transcript of your data, correct inaccuracies, or request account deletion (subject to the completion of active trade cycles and regulatory retention periods).</p>
          </div>
        </section>

        <footer class="mt-20 pt-10 border-t border-slate-100 relative z-10 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
           <p>WiseKings Africa | Information Security Office</p>
           <p>Doc Ref: WK-PP-2026-V1</p>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
</script>
