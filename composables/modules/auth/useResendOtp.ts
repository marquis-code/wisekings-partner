import { ref } from 'vue'
import { auth_api } from '@/api_factory/modules/auth'
import { useCustomToast } from '@/composables/core/useCustomToast'

export const useResendOtp = () => {
    const loading = ref(false)
    const { showToast } = useCustomToast()

    const resendOtp = async (payload: { email: string }) => {
        loading.value = true
        try {
            await auth_api.resendOtp(payload)
            showToast({ title: 'Success', message: 'OTP resent successfully. Check your email.', toastType: 'success' })
            return true
        } catch (error: any) {
            showToast({ title: 'Error', message: error.message || 'Failed to resend OTP', toastType: 'error' })
            return false
        } finally {
            loading.value = false
        }
    }

    return { loading, resendOtp }
}
