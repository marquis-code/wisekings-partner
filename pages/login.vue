<template>
  <div>
    <div class="mb-10 text-center lg:text-left">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
      <p class="text-gray-500 font-medium">Please enter your details to sign in as a Partner.</p>
    </div>

    <form @submit.prevent="handleLogin()" class="space-y-6">
      <div class="space-y-5">
        <div class="space-y-2">
          <label for="email" class="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-600 transition-colors">
              <Icon name="lucide:mail" size="18" />
            </div>
            <input 
              id="email"
              v-model="email" 
              type="email" 
              placeholder="name@company.com"
              required
              class="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600 transition-all outline-none font-medium placeholder:text-gray-400"
            >
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between px-1">
            <label for="password" class="text-sm font-semibold text-gray-700">Password</label>
            <NuxtLink to="/forgot-password" class="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">Forgot password?</NuxtLink>
          </div>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-600 transition-colors">
              <Icon name="lucide:lock" size="18" />
            </div>
            <input 
              id="password"
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="••••••••"
              required
              class="block w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600 transition-all outline-none font-medium placeholder:text-gray-400"
            >
            <button 
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" size="18" />
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-2 px-1">
        <input 
          id="remember" 
          type="checkbox" 
          class="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
        >
        <label for="remember" class="text-sm font-medium text-gray-600 cursor-pointer select-none">Remember for 30 days</label>
      </div>

      <button 
        type="submit" 
        class="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-black/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none"
        :disabled="loading"
      >
        <span v-if="loading">Processing...</span>
        <template v-else>
          Sign in
          <Icon name="lucide:arrow-right" size="18" class="group-hover:translate-x-1 transition-transform" />
        </template>
      </button>

      <div class="pt-4 text-center">
        <p class="text-gray-500 font-medium">
          Don't have an account? 
          <NuxtLink to="/signup" class="text-orange-600 font-extrabold hover:text-orange-700 transition-colors">Sign up as Partner</NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLogin } from '@/composables/modules/auth/useLogin'
import { useAuthState } from '@/composables/useAuthState'

definePageMeta({ 
  layout: 'auth' 
})

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const { loading, login } = useLogin()
const { setAuth } = useAuthState()

useSeoMeta({
  title: 'Partner Login | WiseKings Network',
  description: 'Access your partner dashboard to manage commissions, tracking, and growth tools.',
})

async function handleLogin() {
  const res = await login({ email: email.value, password: password.value })
  if (res?.mfaRequired) return

  const data = res?.data || res
  if (data?.user && (data?.accessToken || data?.tokens)) {
    setAuth(data.user, data.tokens || { accessToken: data.accessToken, refreshToken: data.refreshToken })
    navigateTo('/')
  }
}
</script>
