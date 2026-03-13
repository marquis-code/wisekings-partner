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
          <p class="text-lg font-medium text-slate-700 leading-relaxed">At WiseKings, we treat your business and financial data with the same gravity as we do our own logistics. This policy outlines our stringent data collection, protection, and utilization protocols designed to safeguard your interests as a partner.</p>

          <div>
             <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">1. Data Acquisition & Governance</h2>
             <p>To facilitate a secure partnership and remain compliant with global financial standards, we collect the following datasets:</p>
             <ul class="list-disc pl-6 space-y-3 mt-4 font-bold text-slate-700">
                <li><span class="text-indigo-600">Identity Verification (KYC):</span> Government-issued identification, tax residency documents, and biometric verification data.</li>
                <li><span class="text-indigo-600">Financial Instrumentation:</span> Payout destination accounts, transaction history, and capital commitment records.</li>
                <li><span class="text-indigo-600">Digital Footprint:</span> IP addresses, device fingerprints, and geolocation data utilized exclusively for thwarting unauthorized portal access.</li>
             </ul>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">2. Strategic Information Utilization</h2>
            <p>Your data is processed strictly for the following operational purposes:</p>
            <ul class="list-disc pl-6 space-y-3 mt-4">
               <li>Automating trade cycle distributions and calculating quarterly equity dividends.</li>
               <li>Populating your private, real-time Performance Dashboard with high-fidelity analytics.</li>
               <li>Meeting mandatory regulatory reporting requirements for Anti-Money Laundering (AML) and Counter-Terrorism Financing (CTF) laws.</li>
            </ul>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">3. Sovereignty & Security Architecture</h2>
            <p>WiseKings employs a "Security by Design" architecture. We utilize TLS 1.3 encryption for all data in motion and industry-leading AES-256 encryption for data at rest. Your document assets are stored in isolated, cryptographically hardened "cold-storage" buckets. We maintain a zero-tolerance policy against the selling or trading of partner data with third-party marketing entities.</p>
          </div>

          <div class="p-8 bg-indigo-50 border border-indigo-100 rounded-3xl shadow-sm">
             <h3 class="text-indigo-900 font-black mb-2 uppercase tracking-widest text-sm">Cross-Border Data Integrity</h3>
             <p class="text-indigo-700/80 text-sm leading-relaxed">As a global enterprise, your data may be processed across multiple secure cloud regions. We ensure that all regional data processors adhere to the General Data Protection Regulation (GDPR) and equivalent local data protection frameworks to ensure consistent safety.</p>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">4. Your Data Stewardship Rights</h2>
            <p>Partners retain ultimate control over their data. You have the right to request a full transcript of your data logs, rectify inaccuracies, or request account decommissioning. Please note that account deletion is subject to the resolution of active trade cycles and mandatory regulatory data retention durations (typically 5 to 7 years).</p>
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
