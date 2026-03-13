<template>
  <div class="space-y-10 pb-20">

    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 class="text-3xl font-black text-gray-900 tracking-tight">Partner Profile</h1>
        <p class="text-gray-500 font-medium mt-1">Manage your account details and partnership credentials.</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
           <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
           Verified Partner
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Profile Sidebar -->
      <div class="lg:col-span-1 space-y-8">
        <div class="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm text-center relative overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="relative z-10">
            <div class="w-32 h-32 rounded-[2.5rem] bg-indigo-600 flex items-center justify-center text-white text-4xl font-black mx-auto mb-6 shadow-xl shadow-indigo-600/20 rotate-3 hover:rotate-0 transition-transform duration-500">
              {{ user?.fullName?.[0] }}
            </div>
            <h2 class="text-2xl font-black text-gray-900 tracking-tight">{{ user?.fullName || 'Partner' }}</h2>
            <p class="text-gray-400 font-bold text-sm uppercase tracking-tighter mt-1">{{ user?.role || 'Partner' }}</p>
            
            <div class="mt-8 pt-8 border-t border-gray-50 flex flex-col gap-3">
               <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent">
                  <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Partner Code</span>
                  <span class="text-sm font-black text-indigo-600 font-mono">{{ (user as any)?.partnerCode || 'N/A' }}</span>
               </div>
                <div class="flex items-center justify-between p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/20">
                  <span class="text-[10px] font-black text-white/60 uppercase tracking-widest">Commission Rate</span>
                  <span class="text-lg font-black">{{ (user as any)?.commissionRate || 3 }}%</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Profile Form -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
           <div class="flex items-center gap-3 mb-10">
              <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                <Icon name="lucide:user" class="w-5 h-5" />
              </div>
              <h3 class="text-xl font-black text-gray-900 tracking-tight">Account Details</h3>
            </div>

            <div class="space-y-8">
               <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="space-y-2">
                     <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Full Legal Name</label>
                     <div class="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 flex items-center gap-3">
                        <Icon name="lucide:user" class="w-4 h-4 text-gray-400" />
                        {{ user?.fullName }}
                     </div>
                  </div>
                  <div class="space-y-2">
                     <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                     <div class="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 flex items-center gap-3">
                        <Icon name="lucide:mail" class="w-4 h-4 text-gray-400" />
                        {{ user?.email }}
                     </div>
                  </div>
               </div>

               <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="space-y-2">
                     <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Company Name</label>
                     <div class="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 flex items-center gap-3">
                        <Icon name="lucide:building-2" class="w-4 h-4 text-gray-400" />
                        {{ (user as any)?.companyName || 'N/A' }}
                     </div>
                  </div>
                  <div class="space-y-2">
                     <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Contact Person</label>
                     <div class="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 flex items-center gap-3">
                        <Icon name="lucide:user-plus" class="w-4 h-4 text-gray-400" />
                        {{ (user as any)?.contactPerson || 'N/A' }}
                     </div>
                  </div>
               </div>

               <div class="pt-10 border-t border-gray-50">
                  <div class="bg-amber-50 rounded-3xl p-6 border border-amber-100 flex gap-4">
                     <div class="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                        <Icon name="lucide:info" class="w-5 h-5 text-white" />
                     </div>
                     <div>
                        <h4 class="text-sm font-black text-amber-900 mb-1">Information Immutable</h4>
                        <p class="text-xs text-amber-700 font-medium leading-relaxed">Profile information remains locked for security and financial audit purposes. If you need to update any of your details, please contact the WiseKings support team.</p>
                     </div>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthState } from '@/composables/useAuthState'
definePageMeta({ layout: 'dashboard' })
const { user } = useAuthState()
</script>
