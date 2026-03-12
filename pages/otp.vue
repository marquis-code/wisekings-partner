<template>
  <main class="w-full">
    <div class="mb-10 lg:mb-12 cursor-pointer transition-transform hover:scale-105 inline-block">
      <img src="@/assets/images/logo.jpg" alt="WiseKings Logo" class="h-10 lg:h-12 w-auto object-contain" />
    </div>

    <div class="space-y-4 mb-10">
      <h1 class="text-3xl lg:text-[40px] font-bold text-gray-900 tracking-tight leading-tight">
        Verify your email
      </h1>
      <p class="text-gray-500 font-medium text-base lg:text-lg max-w-md">
        We've sent a 6-digit verification code to <span class="text-gray-900 font-bold">{{ email }}</span>. Please enter it below.
      </p>
    </div>

    <form @submit.prevent="handleVerify" class="space-y-8 max-w-md">
      <div>
        <div class="flex gap-3 justify-between">
          <input 
            v-for="(digit, index) in 6" 
            :key="index"
            :ref="el => { if (el) inputs[index] = el }"
            v-model="otp[index]"
            type="text"
            maxlength="1"
            class="w-12 h-14 text-center text-2xl font-bold text-gray-900 bg-gray-50 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all placeholder:text-gray-300"
            @input="e => onInput(e, index)"
            @keydown="e => onKeydown(e, index)"
            @paste="onPaste"
          />
        </div>
      </div>

      <button
        type="submit"
        :disabled="loading || otpValue.length !== 6"
        class="w-full flex items-center justify-center py-4 px-6 rounded-2xl text-white font-bold text-lg transition-all focus:outline-none focus:ring-4 focus:ring-purple-500/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/20"
      >
        <span v-if="loading" class="flex items-center gap-2">
          <Icon name="lucide:loader-2" class="w-5 h-5 animate-spin" />
          Verifying...
        </span>
        <span v-else>Verify Account</span>
      </button>

      <div class="text-center">
        <p class="text-gray-500 font-medium">
          Didn't receive the code? 
          <button 
            type="button" 
            @click="handleResend" 
            :disabled="resending || countdown > 0" 
            class="text-purple-600 font-bold hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ countdown > 0 ? `Resend in ${countdown}s` : 'Resend now' }}
          </button>
        </p>
      </div>

      <div class="text-center mt-6">
        <NuxtLink to="/login" class="text-gray-500 hover:text-gray-900 font-bold text-sm transition-colors flex items-center justify-center gap-2">
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
          Back to Login
        </NuxtLink>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVerifyOtp } from '@/composables/modules/auth/useVerifyOtp'
import { useResendOtp } from '@/composables/modules/auth/useResendOtp'

definePageMeta({ layout: 'auth' })

const route = useRoute()
const router = useRouter()
const email = ref((route.query.email as string) || '')
const type = ref((route.query.type as string) || '')

const { verifyOtp, loading } = useVerifyOtp()
const { resendOtp, loading: resending } = useResendOtp()

const otp = ref(['', '', '', '', '', ''])
const inputs = ref<any[]>([])

const countdown = ref(0)
let timer: any = null

onMounted(() => {
  if (!email.value) {
    router.push('/login')
  }
  // Focus first input
  setTimeout(() => {
    if (inputs.value[0]) inputs.value[0].focus()
  }, 100)
})

const startCountdown = () => {
  countdown.value = 60
  clearInterval(timer)
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)
}

const otpValue = computed(() => otp.value.join(''))

const onInput = (e: Event, index: number) => {
  const target = e.target as HTMLInputElement
  const val = target.value
  
  if (val && !/^\d+$/.test(val)) {
    otp.value[index] = ''
    return
  }

  if (val && index < 5) {
    inputs.value[index + 1]?.focus()
  }
}

const onKeydown = (e: KeyboardEvent, index: number) => {
  if (e.key === 'Backspace' && !otp.value[index] && index > 0) {
    inputs.value[index - 1]?.focus()
  }
}

const onPaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const pastedData = e.clipboardData?.getData('text/plain')
  if (!pastedData) return

  const digits = pastedData.replace(/\D/g, '').slice(0, 6).split('')
  for (let i = 0; i < digits.length; i++) {
    otp.value[i] = digits[i]
  }

  const focusIndex = Math.min(digits.length, 5)
  if (inputs.value[focusIndex]) {
    inputs.value[focusIndex].focus()
  }
}

const handleVerify = async () => {
  if (otpValue.value.length !== 6 || !email.value) return
  await verifyOtp({ email: email.value, otpCode: otpValue.value, type: type.value })
}

const handleResend = async () => {
  if (!email.value || countdown.value > 0) return
  const success = await resendOtp({ email: email.value })
  if (success) {
    startCountdown()
    otp.value = ['', '', '', '', '', '']
    inputs.value[0]?.focus()
  }
}
</script>
