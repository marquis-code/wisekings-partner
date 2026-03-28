<template>
  <main class="min-h-screen flex items-center justify-center bg-[#fff9f0] p-6 relative overflow-hidden">
    <!-- Playful Background Decorations -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-[120px] -mr-64 -mt-64"></div>
    <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] -ml-64 -mb-64"></div>

    <div class="w-full max-w-md relative z-10 transition-all duration-700 ease-out" :class="[mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
      <div class="text-center mb-10">
        <NuxtLink to="/" class="inline-block mb-8">
            <div class="w-20 h-20 rounded-[2rem] bg-purple-600 flex items-center justify-center font-black text-white text-3xl shadow-[0_20px_40px_rgba(147,51,234,0.3)] mx-auto relative group overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent group-hover:translate-x-full duration-1000 transition-transform"></div>
                WK
            </div>
        </NuxtLink>
        <h1 class="text-3xl font-black text-gray-900 tracking-tight mb-2">Partner OTP</h1>
        <p class="text-gray-500 font-medium italic text-sm">Security code sent to your email.</p>
      </div>

      <div class="bg-white rounded-[3rem] p-10 shadow-[0_30px_70px_rgba(147,51,234,0.1)] border border-white relative overflow-hidden">
        <!-- Inner glow -->
        <div class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-amber-50/30 to-transparent pointer-events-none"></div>

        <div class="text-center mb-10 relative">
            <div class="px-4 py-2 bg-amber-50 rounded-full inline-block border border-amber-100/50 mb-3">
                <p class="text-[10px] font-black text-amber-600 uppercase tracking-widest">{{ email }}</p>
            </div>
        </div>

        <form @submit.prevent="handleVerify" class="space-y-10 relative">
          <div class="flex justify-between items-center gap-2">
            <input
              v-for="(digit, index) in 6"
              :key="index"
              :id="'otp-' + index"
              v-model="otp[index]"
              type="text"
              maxlength="1"
              inputmode="numeric"
              autocomplete="one-time-code"
              class="w-12 h-16 text-center text-2xl font-black bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-400 focus:ring-8 focus:ring-purple-400/5 transition-all outline-none shadow-sm"
              @input="onInput($event, index)"
              @keydown="onKeydown($event, index)"
              @paste="onPaste"
              required
            />
          </div>

          <div class="space-y-6">
            <button 
              type="submit" 
              :disabled="loading || otpValue.length < 6"
              class="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-[1.5rem] shadow-2xl shadow-purple-600/20 transition-all flex items-center justify-center gap-3 group disabled:opacity-50 active:scale-95"
            >
              <span v-if="loading" class="flex items-center gap-2">
                <Icon name="lucide:loader-2" class="w-5 h-5 animate-spin" />
                Verifying...
              </span>
              <template v-else>
                Verify & Join
                <Icon name="lucide:fingerprint" class="w-5 h-5 group-hover:scale-125 duration-300 text-amber-300" />
              </template>
            </button>

            <div class="flex flex-col items-center gap-4">
                <p class="text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                    Code missing? 
                    <button 
                      type="button" 
                      @click="handleResend" 
                      :disabled="resending || countdown > 0" 
                      class="text-purple-600 font-black hover:underline disabled:opacity-50 disabled:no-underline ml-1"
                    >
                      {{ countdown > 0 ? `Retry in ${countdown}s` : 'Resend Now' }}
                    </button>
                </p>
                <NuxtLink to="/login" class="text-[10px] font-black text-gray-400 hover:text-gray-600 uppercase tracking-tighter flex items-center gap-1 transition-all">
                    <Icon name="lucide:arrow-left" class="w-3 h-3" />
                    Back to Login
                </NuxtLink>
            </div>
          </div>
        </form>
      </div>

      <div class="mt-10 text-center">
        <p class="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <Icon name="lucide:shield-check" class="w-3 h-3" />
            Partner Security Layer
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVerifyOtp } from '@/composables/modules/auth/useVerifyOtp'
import { useResendOtp } from '@/composables/modules/auth/useResendOtp'

definePageMeta({ layout: false })

const route = useRoute()
const router = useRouter()
const email = ref((route.query.email as string) || '')
const type = ref((route.query.type as string) || '')

const { verifyOtp, loading } = useVerifyOtp()
const { resendOtp, loading: resending } = useResendOtp()

const otp = ref(['', '', '', '', '', ''])
const mounted = ref(false)
const countdown = ref(0)
let timer: any = null

onMounted(() => {
  setTimeout(() => mounted.value = true, 100)
  if (!email.value) {
    router.push('/login')
  }
  const firstInput = document.getElementById('otp-0')
  if (firstInput) firstInput.focus()
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
    const nextInput = document.getElementById(`otp-${index + 1}`)
    nextInput?.focus()
  }
}

const onKeydown = (e: KeyboardEvent, index: number) => {
  if (e.key === 'Backspace' && !otp.value[index] && index > 0) {
    const prevInput = document.getElementById(`otp-${index - 1}`)
    prevInput?.focus()
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
  const nextInput = document.getElementById(`otp-${focusIndex}`)
  nextInput?.focus()
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
    const firstInput = document.getElementById('otp-0')
    firstInput?.focus()
  }
}
</script>
