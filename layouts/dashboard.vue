<template>
  <div class="flex h-screen overflow-hidden bg-dark-950">
    <aside :class="['fixed inset-y-0 left-0 z-40 flex flex-col bg-dark-900 border-r border-dark-700 transition-all duration-300', open ? 'w-64' : 'w-20']">
      <div class="flex items-center h-16 px-4 border-b border-dark-700">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center font-bold text-white text-sm">P</div>
          <span v-if="open" class="text-lg font-bold text-white whitespace-nowrap">Partner</span>
        </div>
      </div>
      <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path"
          :class="['flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all', route.path === item.path ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20' : 'text-dark-400 hover:text-dark-200 hover:bg-dark-800']">
          <Icon :name="item.icon" class="w-5 h-5 flex-shrink-0" />
          <span v-if="open" class="whitespace-nowrap">{{ item.label }}</span>
        </NuxtLink>
      </nav>
      <div class="p-3 border-t border-dark-700">
        <button @click="open = !open" class="w-full flex items-center justify-center px-3 py-2 rounded-lg text-dark-400 hover:text-dark-200 hover:bg-dark-800 transition-colors">
          <Icon :name="open ? 'lucide:panel-left-close' : 'lucide:panel-left-open'" class="w-5 h-5" />
        </button>
      </div>
    </aside>
    <div :class="['flex-1 flex flex-col transition-all duration-300', open ? 'ml-64' : 'ml-20']">
      <header class="sticky top-0 z-30 h-16 flex items-center justify-between px-6 bg-dark-900/80 backdrop-blur-xl border-b border-dark-700">
        <h1 class="text-lg font-semibold text-white">{{ pageTitle }}</h1>
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-semibold">{{ user?.fullName?.[0] || '?' }}</div>
            <span class="text-sm text-dark-200 hidden md:block">{{ user?.fullName }}</span>
          </div>
          <button @click="handleLogout" class="btn-ghost btn-sm text-red-400"><Icon name="lucide:log-out" class="w-4 h-4" /></button>
        </div>
      </header>
      <main class="flex-1 overflow-y-auto p-6"><slot /></main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute(); const open = ref(true)
const { user, logout: authLogout } = useAuthState(); const authApi = useAuthApi(); const toast = useToast()
const navItems = [
  { label: 'Dashboard', icon: 'lucide:layout-dashboard', path: '/' },
  { label: 'Commissions', icon: 'lucide:percent', path: '/commissions' },
  { label: 'Wallet', icon: 'lucide:wallet', path: '/wallet' },
  { label: 'Network', icon: 'lucide:network', path: '/network' },
  { label: 'Referrals', icon: 'lucide:share-2', path: '/referrals' },
  { label: 'Profile', icon: 'lucide:user', path: '/profile' },
]
const pageTitle = computed(() => navItems.find((i) => i.path === route.path)?.label || 'Partner')
async function handleLogout() { try { await authApi.logout() } catch {} authLogout(); navigateTo('/login'); toast.success('Signed out') }
</script>
