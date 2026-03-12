import { ref } from 'vue'
import { auth_api } from '@/api_factory/modules/auth'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useAuthState } from '@/composables/useAuthState'
import { useRouter } from 'vue-router'

export const useVerifyOtp = () => {
    const loading = ref(false)
    const { showToast } = useCustomToast()
    const { setAuth } = useAuthState()
    const router = useRouter()

    const verifyOtp = async (payload: { email: string; otpCode: string; type?: string }) => {
        loading.value = true
        try {
            const res = payload.type === 'login' 
                ? await auth_api.verifyLoginOtp({ email: payload.email, otpCode: payload.otpCode })
                : await auth_api.verifyOtp({ email: payload.email, otpCode: payload.otpCode })
            
            showToast({ title: 'Success', message: 'Authentication successful', toastType: 'success' })

            const d = res?.data || res
            if (d?.user && (d?.accessToken || d?.tokens)) {
                setAuth(d.user, d.tokens || { accessToken: d.accessToken, refreshToken: d.refreshToken })
                router.push('/')
            } else {
                router.push('/login')
            }
            return true
        } catch (error: any) {
            showToast({ title: 'Error', message: error.message || 'Verification failed', toastType: 'error' })
            return false
        } finally {
            loading.value = false
        }
    }

    return { loading, verifyOtp }
}
