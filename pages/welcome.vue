<template>
  <div class="min-h-screen bg-[#F8FAFC] text-slate-900 font-inter selection:bg-indigo-100 overflow-x-hidden">
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">

    <!-- Professional Navigation -->
    <nav :class="['fixed top-0 w-full z-[100] transition-all duration-300 border-b', scrolled ? 'bg-white/90 backdrop-blur-xl border-slate-200 py-3 shadow-sm' : 'bg-transparent border-transparent py-5']">
      <div class="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
            <span class="text-white text-lg font-black italic">W</span>
          </div>
          <span class="text-xl font-black font-outfit uppercase tracking-tighter text-slate-900">WiseKings</span>
        </div>

        <div class="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
          <a href="#how" class="hover:text-indigo-600 transition-colors">How it Works</a>
          <a href="#vision" class="hover:text-indigo-600 transition-colors">Global Vision</a>
          <a href="#plans" class="hover:text-indigo-600 transition-colors">Partnership Plans</a>
          <a href="#calc" class="hover:text-indigo-600 transition-colors">Earnings Estimator</a>
        </div>

        <div class="flex items-center gap-4">
          <NuxtLink to="/login" class="text-slate-600 hover:text-slate-900 font-bold text-sm px-4">Log In</NuxtLink>
          <NuxtLink to="/signup" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/10 transition-all active:scale-95">
            Join Now
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Enhanced Hero Section -->
    <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <div class="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-20 rounded-l-[100px] -z-0"></div>
      
      <div class="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div class="space-y-8 reveal transition-all duration-1000 transform translate-y-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700">
            <span class="text-[10px] font-black uppercase tracking-widest">Global Partnership Program 2026</span>
          </div>
          
          <h1 class="text-5xl lg:text-7xl font-black font-outfit leading-[1.1] tracking-tight text-slate-900">
            Shape the future of <br/>
            <span class="text-indigo-600">Global Commerce.</span>
          </h1>

          <p class="text-lg text-slate-500 leading-relaxed max-w-lg font-medium">
            WiseKings is expanding beyond borders. Whether you want to fund specific local trades or own equity in our global expansion, we have a seat at the table for you.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 pt-2">
            <NuxtLink to="/signup" class="px-7 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-base shadow-xl hover:bg-slate-800 transition-all flex items-center gap-3 justify-center">
              Become a Global Partner
              <Icon name="lucide:globe" size="20" />
            </NuxtLink>
            <div class="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div class="flex -space-x-2">
                   <img v-for="i in 3" :key="i" :src="`https://i.pravatar.cc/100?u=p${i}`" class="w-8 h-8 rounded-full border-2 border-white" />
                </div>
              <p class="text-xs font-bold text-slate-600">Join <span class="text-indigo-600">1,250+</span> visionaries</p>
            </div>
          </div>
        </div>

        <div class="relative group reveal transition-all duration-1000 delay-300 transform scale-95 opacity-0">
          <div class="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl relative border border-slate-200">
            <img src="@/assets/images/hero2.jpg" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Global Partnership" />
            
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>

            <!-- ROI floating card -->
            <div class="absolute bottom-6 left-6 right-6 p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 animate-float">
              <div class="flex items-center gap-4">
                 <div class="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                    <Icon name="lucide:check-check" size="24" />
                 </div>
                 <div>
                    <p class="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-0.5">Vetted Returns</p>
                    <p class="text-lg font-black text-slate-900">Profits paid on-time, every time.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Global Vision Section -->
    <section id="vision" class="py-24 bg-white border-y border-slate-100 overflow-hidden">
       <div class="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div class="order-2 lg:order-1 reveal transition-all duration-1000 transform -translate-x-12">
             <div class="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1000&auto=format&fit=crop" class="rounded-3xl h-64 w-full object-cover shadow-lg" alt="Global Trade" />
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" class="rounded-3xl h-64 w-full object-cover shadow-lg translate-y-8" alt="Data Analytics" />
             </div>
          </div>
          <div class="order-1 lg:order-2 space-y-6 reveal transition-all duration-1000 transform translate-x-12">
             <h2 class="text-4xl lg:text-5xl font-black font-outfit tracking-tighter">A Vision for <br/><span class="text-indigo-600">Universal Scaling.</span></h2>
             <p class="text-lg text-slate-500 font-medium leading-relaxed">
                WiseKings is more than a snack company; it's a financial engine for the African continent. By digitizing purchase orders and decentralizing equity, we enable anyone, anywhere, to profit from the real-world growth of our commerce network.
             </p>
             <div class="space-y-4 pt-4">
                <div v-for="(v, i) in visionPoints" :key="i" 
                     class="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all hover:translate-x-2">
                   <div class="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-black">{{ i + 1 }}</div>
                   <p class="font-bold text-slate-700">{{ v }}</p>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- Ways to Partner (Plans) -->
    <section id="plans" class="py-24 bg-slate-50/50">
      <div class="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16 reveal transition-all duration-1000 transform translate-y-8">
        <h2 class="text-3xl lg:text-5xl font-black font-outfit mb-4 uppercase">Partnership Plans</h2>
        <p class="text-lg text-slate-500 font-medium max-w-2xl mx-auto">Choose a plan that fits your financial goals.</p>
      </div>

      <div class="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Gold Card -->
        <div class="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-1000 transform translate-y-12 reveal delay-100">
          <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6 border border-amber-100">
            <Icon name="lucide:coins" class="text-amber-600" size="24" />
          </div>
          <h3 class="text-2xl font-black font-outfit mb-3">Gold Tier (Credit)</h3>
          <p class="text-slate-500 font-medium mb-8 leading-relaxed">
            Finance raw materials or specific purchase orders. Your funds are used to drive production cycles, returning fixed profits in just 60 days.
          </p>
          <ul class="space-y-3 mb-8">
            <li v-for="t in ['Quick 60-day cycles', 'Up to 6.5% flat return', 'Real-time order tracking', 'Secured capital']" :key="t" class="flex items-center gap-3 text-sm font-bold text-slate-600">
               <Icon name="lucide:check" class="text-emerald-500" size="18" />
               {{ t }}
            </li>
          </ul>
          <NuxtLink to="/signup" class="block w-full text-center py-3 bg-slate-900 text-white rounded-xl font-bold text-sm">Invest in Gold</NuxtLink>
        </div>

        <!-- Diamond Card -->
        <div class="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-1000 transform translate-y-12 reveal delay-300">
          <div class="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 border border-indigo-100">
            <Icon name="lucide:gem" class="text-indigo-600" size="24" />
          </div>
          <h3 class="text-2xl font-black font-outfit mb-3">Diamond Tier (Equity)</h3>
          <p class="text-slate-500 font-medium mb-8 leading-relaxed">
            Become a shareholder in WiseKings Africa. Own a percentage of the company and share in our periodic profits while we scale across the continent.
          </p>
          <ul class="space-y-3 mb-8">
            <li v-for="t in ['Official company equity', 'Quarterly profit sharing', 'Voting rights in scaling', 'Premium networking events']" :key="t" class="flex items-center gap-3 text-sm font-bold text-slate-600">
               <Icon name="lucide:check" class="text-indigo-600" size="18" />
               {{ t }}
            </li>
          </ul>
          <NuxtLink to="/signup" class="block w-full text-center py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm">Become a Shareholder</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ROI Calculator -->
    <section id="calc" class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-12 bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden reveal transition-all duration-1000 transform scale-95">
        <div class="absolute -right-20 -top-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]"></div>
        
        <div class="relative z-10 text-center mb-12">
          <h2 class="text-3xl font-black font-outfit mb-2">Earnings Estimator</h2>
          <p class="text-slate-400 font-medium">Estimate your profits as a Gold Partner.</p>
        </div>

        <div class="relative z-10 space-y-10">
          <div class="space-y-4">
            <div class="flex justify-between font-bold text-sm tracking-widest uppercase text-slate-400">
              <span>Investment Amount</span>
              <span class="text-white">₦{{ amount.toLocaleString() }}</span>
            </div>
            <input type="range" v-model="amount" min="10000" max="1000000" step="10000" class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
            <div class="flex justify-between text-[10px] font-black uppercase text-slate-500">
              <span>₦10k</span>
              <span>₦1M</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-white/10">
            <div class="p-6 bg-white/5 border border-white/10 rounded-2xl">
               <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Profit (60 Days @ 6.5%)</p>
               <p class="text-3xl font-black text-indigo-400">₦{{ (amount * 0.065).toLocaleString() }}</p>
            </div>
            <div class="p-6 bg-white/5 border border-white/10 rounded-2xl">
               <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Expected Payout</p>
               <p class="text-3xl font-black text-white">₦{{ (amount * 1.065).toLocaleString() }}</p>
            </div>
          </div>
          
          <NuxtLink to="/signup" class="block w-full text-center py-4 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all">Start Your First Cycle</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Simple Step Section -->
    <section id="how" class="py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <div class="text-center mb-16 reveal transition-all duration-1000 transform translate-y-8">
           <h2 class="text-4xl font-black font-outfit mb-4 uppercase">How to Get Started</h2>
           <p class="text-slate-500 font-medium">We've made it as simple as possible to join our network.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
           <div v-for="(step, i) in steps" :key="i" class="text-center space-y-4 reveal transition-all duration-1000 transform translate-y-12" :style="{ transitionDelay: `${i * 200}ms` }">
              <div class="relative mb-6">
                <div class="w-20 h-20 bg-indigo-600 text-white rounded-3xl flex items-center justify-center font-black text-2xl mx-auto shadow-xl shadow-indigo-600/20 rotate-12 group-hover:rotate-0 transition-transform">
                    {{ i + 1 }}
                </div>
                <!-- Mini decorative images for steps -->
                <img :src="step.image" class="absolute -bottom-2 -right-2 w-12 h-12 rounded-xl object-cover border-4 border-white shadow-lg" />
              </div>
              <h4 class="font-bold text-slate-900 text-xl">{{ step.title }}</h4>
              <p class="text-slate-500 font-medium text-sm leading-relaxed px-4">{{ step.desc }}</p>
           </div>
        </div>
      </div>
    </section>

    <!-- Professional Footer -->
    <footer class="bg-slate-950 text-white pt-20 pb-10 mt-20">
      <div class="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div class="col-span-1 md:col-span-2 space-y-6">
          <div class="flex items-center gap-2">
             <div class="w-7 h-7 bg-white rounded flex items-center justify-center font-black text-slate-900 italic">W</div>
             <span class="text-lg font-black font-outfit uppercase">WiseKings</span>
          </div>
          <p class="text-slate-400 max-w-sm text-sm leading-relaxed">
            Building a decentralized financial bridge for real-world snacks commerce across the African continent and beyond.
          </p>
        </div>
        
        <div>
           <h5 class="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 font-outfit">Partnership Center</h5>
           <ul class="space-y-4 text-sm font-bold text-slate-400">
              <li><NuxtLink to="/terms" class="hover:text-indigo-400 transition-colors">Terms of Service</NuxtLink></li>
              <li><NuxtLink to="/privacy" class="hover:text-indigo-400 transition-colors">Privacy Policy</NuxtLink></li>
              <li><NuxtLink to="/risk-disclosure" class="hover:text-indigo-400 transition-colors">Risk Disclosure</NuxtLink></li>
              <li><NuxtLink to="/agreement-template" class="hover:text-indigo-400 transition-colors">Partnership Agreement</NuxtLink></li>
           </ul>
        </div>

        <div>
           <h5 class="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 font-outfit">Connect With Us</h5>
           <div class="flex gap-4">
             <a href="https://x.com/WisekingsS" target="_blank" class="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-all cursor-pointer">
                <Icon name="lucide:twitter" size="16" />
             </a>
             <a href="https://www.instagram.com/wisekingsproducts/" target="_blank" class="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-all cursor-pointer">
                <Icon name="lucide:instagram" size="16" />
             </a>
             <a href="https://web.facebook.com/profile.php?id=61583785186822" target="_blank" class="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-all cursor-pointer">
                <Icon name="lucide:facebook" size="16" />
             </a>
           </div>
           <p class="mt-8 text-[10px] font-bold text-slate-600 uppercase">Support: hello@wisekings.ng</p>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto px-6 lg:px-12 border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
         <p class="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">&copy; 2026 WiseKings Africa. All rights reserved.</p>
         <div class="flex gap-4">
            <Icon v-for="i in ['credit-card', 'shield-check', 'globe']" :key="i" :name="`lucide:${i}`" class="text-slate-800" size="16" />
         </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '@/composables/core/useScrollReveal'
import goal from "@/assets/images/goal.jpg"

const scrolled = ref(false)
const amount = ref(100000)

useScrollReveal()

const steps = [
  { 
    title: 'Digital Onboarding', 
    desc: 'Securely register your identity and documents in under 5 minutes.',
    image: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=400&auto=format&fit=crop'
  },
  { 
    title: 'Goal Setting', 
    desc: 'Pick your tier: Finance specific cycles or own long-term equity.',
    image: goal
  },
  { 
    title: 'Live Dashboard', 
    desc: 'Track your money in real-time as we fulfill orders across Africa.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop'
  }
]

const visionPoints = [
  'Decentralized Trade Financing',
  'Automated Profit Distribution',
  'Inter-Continental Logistics Scaling',
  'Transparent Blockchain Recordkeeping'
]

if (import.meta.client) {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 20
  })
}

definePageMeta({ layout: false })
</script>

<style scoped>
.font-inter { font-family: 'Inter', sans-serif; }
.font-outfit { font-family: 'Outfit', sans-serif; }

/* Reveal Animation Classes */
.reveal {
  opacity: 0;
  will-change: transform, opacity;
}

.reveal-visible {
  opacity: 1 !important;
  transform: translate(0, 0) scale(1) !important;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-float {
  animation: float 5s ease-in-out infinite;
}

/* Range slider styling */
input[type=range]::-webkit-slider-thumb {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #4F46E5;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  background: #1E293B;
  border-radius: 4px;
}
</style>
