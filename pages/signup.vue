<template>
  <div>
    <div class="mb-10 text-center lg:text-left">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-2">Create Account</h2>
      <p class="text-gray-500 font-medium">Join us as a Partner and start growing your business.</p>
    </div>

    <form @submit.prevent="handleSignup" class="space-y-6">
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label for="firstName" class="text-sm font-semibold text-gray-700 ml-1">First Name</label>
            <input 
              id="firstName"
              v-model="form.firstName" 
              type="text" 
              placeholder="John"
              required
              class="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600 transition-all outline-none font-medium placeholder:text-gray-400"
            >
          </div>
          <div class="space-y-2">
            <label for="lastName" class="text-sm font-semibold text-gray-700 ml-1">Last Name</label>
            <input 
              id="lastName"
              v-model="form.lastName" 
              type="text" 
              placeholder="Doe"
              required
              class="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600 transition-all outline-none font-medium placeholder:text-gray-400"
            >
          </div>
        </div>

        <div class="space-y-2">
          <label for="email" class="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-600 transition-colors">
              <Icon name="lucide:mail" size="18" />
            </div>
            <input 
              id="email"
              v-model="form.email" 
              type="email" 
              placeholder="name@company.com"
              required
              class="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600 transition-all outline-none font-medium placeholder:text-gray-400"
            >
          </div>
        </div>

        <div class="space-y-2">
          <label for="password" class="text-sm font-semibold text-gray-700 ml-1">Password</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-600 transition-colors">
              <Icon name="lucide:lock" size="18" />
            </div>
            <input 
              id="password"
              v-model="form.password" 
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

      <div class="flex items-start space-x-2 px-1">
        <input 
          id="terms" 
          type="checkbox" 
          required
          class="custom-checkbox"
        >
        <label for="terms" class="text-sm font-medium text-gray-600 cursor-pointer select-none leading-relaxed">
          I agree to the <NuxtLink to="/terms" class="text-orange-600 font-bold hover:underline">Terms of Service</NuxtLink> and <NuxtLink to="/privacy" class="text-orange-600 font-bold hover:underline">Privacy Policy</NuxtLink>.
        </label>
      </div>

      <button 
        type="submit" 
        class="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-black/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none"
        :disabled="loading"
      >
        <span v-if="loading">Creating account...</span>
        <template v-else>
          Create Account
          <Icon name="lucide:user-plus" size="18" class="group-hover:translate-x-1 transition-transform" />
        </template>
      </button>

      <div class="pt-4 text-center">
        <p class="text-gray-500 font-medium">
          Already have an account? 
          <NuxtLink to="/login" class="text-orange-600 font-extrabold hover:text-orange-700 transition-colors">Sign in</NuxtLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useSignup } from '@/composables/modules/auth/useSignup'

definePageMeta({ 
  layout: 'auth' 
})

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})

const showPassword = ref(false)
const { loading, signup } = useSignup()

async function handleSignup() {
  const res = await signup({
    fullName: `${form.firstName} ${form.lastName}`,
    email: form.email,
    password: form.password
  })
  if (res) {
    const data = res.data || res;
    if (data.requireOtp) {
      navigateTo(`/otp?email=${encodeURIComponent(form.email)}`)
    } else {
      navigateTo('/login')
    }
  }
}
</script>
