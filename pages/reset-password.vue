<template>
  <div>
    <div class="mb-10 text-center lg:text-left">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-2">Reset Password</h2>
      <p class="text-gray-500 font-medium">Please enter your new password below.</p>
    </div>

    <form @submit.prevent="handleReset" class="space-y-6">
      <div class="space-y-5">
        <div class="space-y-2">
          <label for="password" class="text-sm font-semibold text-gray-700 ml-1">New Password</label>
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

        <div class="space-y-2">
          <label for="confirmPassword" class="text-sm font-semibold text-gray-700 ml-1">Confirm New Password</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-600 transition-colors">
              <Icon name="lucide:check-circle" size="18" />
            </div>
            <input 
              id="confirmPassword"
              v-model="confirmPassword" 
              :type="showConfirmPassword ? 'text' : 'password'" 
              placeholder="••••••••"
              required
              class="block w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600 transition-all outline-none font-medium placeholder:text-gray-400"
            >
            <button 
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon :name="showConfirmPassword ? 'lucide:eye-off' : 'lucide:eye'" size="18" />
            </button>
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        class="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-black/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none"
        :disabled="loading || password !== confirmPassword"
      >
        <span v-if="loading">Resetting password...</span>
        <template v-else>
          Reset Password
          <Icon name="lucide:refresh-cw" size="18" class="group-hover:rotate-180 transition-transform duration-500" />
        </template>
      </button>

      <div class="pt-4 text-center">
        <p class="text-gray-500 font-medium">
          Remember your password? 
          <NuxtLink to="/login" class="text-orange-600 font-extrabold hover:text-orange-700 transition-colors">Sign in</NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useResetPassword } from '@/composables/modules/auth/useResetPassword'

definePageMeta({ 
  layout: 'auth' 
})

const route = useRoute()
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const { loading, resetPassword } = useResetPassword()

async function handleReset() {
  if (password.value !== confirmPassword.value) return
  
  const token = route.query.token as string
  if (!token) {
    alert('Invalid or missing reset token.')
    return
  }

  const res = await resetPassword({ token, newPassword: password.value })
  if (res?.data) {
    alert('Password reset successful! You can now sign in with your new password.')
    navigateTo('/login')
  }
}
</script>
