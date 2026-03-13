<template>
  <div class="flex h-screen overflow-hidden bg-gray-50/50">
    <aside :class="['fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-gray-100 transition-all duration-300 shadow-sm', open ? 'w-64' : 'w-20']">
      <div class="flex items-center h-20 px-6 border-b border-gray-50">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-white text-base shadow-lg shadow-purple-600/20">P</div>
          <span v-if="open" class="text-xl font-bold text-gray-900 whitespace-nowrap tracking-tight">Partner</span>
        </div>
      </div>
      <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 style-scrollbar">
        <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path"
          :class="['flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group relative', route.path === item.path ? 'bg-purple-50 text-purple-600' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50']">
          <Icon :name="item.icon" :class="['w-5 h-5 flex-shrink-0 transition-colors', route.path === item.path ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-900']" />
          <span v-if="open" class="whitespace-nowrap">{{ item.label }}</span>
          <div v-if="route.path === item.path" class="absolute left-0 w-1 h-6 bg-purple-600 rounded-r-full"></div>
        </NuxtLink>
      </nav>
      <div class="p-4 border-t border-gray-50">
        <button @click="open = !open" class="w-full flex items-center justify-center px-4 py-3 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all">
          <Icon :name="open ? 'lucide:panel-left-close' : 'lucide:panel-left-open'" class="w-5 h-5" />
        </button>
      </div>
    </aside>
    <div :class="['flex-1 flex flex-col transition-all duration-300', open ? 'ml-64' : 'ml-20']">
      <header class="sticky top-0 z-30 h-20 flex items-center justify-between px-8 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <h1 class="text-xl font-bold text-gray-900 tracking-tight">{{ pageTitle }}</h1>
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 cursor-pointer">
            <div class="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-purple-600/20">{{ user?.fullName?.[0] || '?' }}</div>
            <div class="hidden md:block text-left">
              <p class="text-sm font-bold text-gray-900 leading-tight">{{ user?.fullName }}</p>
              <p class="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">Partner Account</p>
            </div>
          </div>
          <button @click="handleLogout" class="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
            <Icon name="lucide:log-out" class="w-5 h-5" />
          </button>
        </div>
      </header>
      <main class="flex-1 overflow-y-auto p-8 style-scrollbar relative flex flex-col">
        <div class="flex-1">
          <slot />
        </div>
        
        <!-- Footer Links -->
        <footer class="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 pb-4">
          <div class="flex items-center gap-6">
            <NuxtLink to="/terms" class="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-purple-600 transition-colors">Terms of Service</NuxtLink>
            <NuxtLink to="/privacy" class="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-purple-600 transition-colors">Privacy Policy</NuxtLink>
            <NuxtLink to="/risk-disclosure" class="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-purple-600 transition-colors">Risk Disclosure</NuxtLink>
          </div>
          <div class="text-[10px] font-black uppercase tracking-widest text-gray-300">
            &copy; 2026 WiseKings Africa. All Rights Reserved.
          </div>
        </footer>
      </main>
    </div>

    <!-- Floating Chat Widget -->
    <ChatWidget />
  </div>
</template>

<script setup lang="ts">
import { useLogout } from '@/composables/modules/auth/useLogout'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useConfirm } from '@/composables/core/useConfirm'
import ChatWidget from '@/components/chat/ChatWidget.vue'

const route = useRoute(); const open = ref(true)
const { user } = useAuthState(); const { showToast } = useCustomToast()
const { logout: logoutAction, loading } = useLogout()
const { confirmLogout } = useConfirm()

async function handleLogout() {
  if (await confirmLogout()) {
    logoutAction()
  }
}

const navItems = [
  { label: 'Dashboard', icon: 'lucide:layout-dashboard', path: '/' },
  { label: 'My Network', icon: 'lucide:users', path: '/network' },
  { label: 'Commissions', icon: 'lucide:percent', path: '/commissions' },
  { label: 'Wallet', icon: 'lucide:wallet', path: '/wallet' },
  { label: 'Referrals', icon: 'lucide:share-2', path: '/referrals' },
  { label: 'KYC Verification', icon: 'lucide:shield-check', path: '/kyc' },
  { label: 'Support Chat', icon: 'lucide:message-square', path: '/chat' },
  { label: 'Profile', icon: 'lucide:user', path: '/profile' },
]
const pageTitle = computed(() => navItems.find((i) => i.path === route.path)?.label || 'Partner')
</script>
