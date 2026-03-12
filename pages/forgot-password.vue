<template>
  <div>
    <div class="mb-10 text-center lg:text-left">
      <NuxtLink to="/login" class="inline-flex items-center text-sm font-bold text-orange-600 hover:text-orange-700 mb-6 transition-colors group">
        <Icon name="lucide:arrow-left" size="16" class="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Sign in
      </NuxtLink>
      <h2 class="text-3xl font-extrabold text-gray-900 mb-2">Forgot Password?</h2>
      <p class="text-gray-500 font-medium">Enter your email and we'll send you a link to reset your password.</p>
    </div>

    <form @submit.prevent="handleForgot" class="space-y-6">
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

      <button 
        type="submit" 
        class="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-black/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none"
        :disabled="loading"
      >
        <span v-if="loading">Sending reset link...</span>
        <template v-else>
          Send Reset Link
          <Icon name="lucide:send" size="18" class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
import { useForgotPassword } from '@/composables/modules/auth/useForgotPassword'

definePageMeta({ 
  layout: 'auth' 
})

const email = ref('')
const { loading, forgotPassword } = useForgotPassword()

async function handleForgot() {
  const res = await forgotPassword(email.value)
  if (res?.data) {
    // Optionally show a success message or navigate
    alert('Reset link sent! Please check your email.')
  }
}
</script>
