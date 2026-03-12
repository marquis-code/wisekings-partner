import { auth_api } from '@/api_factory/modules/auth'

export const useResetPassword = () => {
    const loading = ref(false)
    const resetPassword = async (payload: any) => {
        loading.value = true
        try {
            const res = await auth_api.resetPassword(payload)
            return res
        } catch (error) {
            console.error('Reset password error:', error)
        } finally {
            loading.value = false
        }
    }

    return { loading, resetPassword }
}
