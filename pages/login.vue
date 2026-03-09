<template>
  <div class="min-h-screen flex items-center justify-center bg-dark-950 p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 items-center justify-center mb-4"><span class="text-2xl font-bold text-white">P</span></div>
        <h1 class="text-2xl font-bold text-white">Partner Portal</h1>
        <p class="text-dark-400 mt-1">Sign in to your investor partner account</p>
      </div>
      <form @submit.prevent="handleLogin" class="card space-y-5">
        <div><label class="label">Email</label><input v-model="email" type="email" class="input" required /></div>
        <div><label class="label">Password</label><input v-model="password" type="password" class="input" required /></div>
        <button type="submit" class="btn-primary w-full" :disabled="loading">{{ loading ? 'Signing in...' : 'Sign in' }}</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogin } from '@/composables/modules/auth/useLogin'
import { useAuthState } from '@/composables/useAuthState'

definePageMeta({ layout: 'default' })

const email = ref('')
const password = ref('')
const { loading, login } = useLogin()
const { setAuth } = useAuthState()

async function handleLogin() {
  const res = await login({ email: email.value, password: password.value })
  if (res?.data) {
    setAuth(res.data.user, res.data.tokens)
    navigateTo('/')
  }
}
</script>
