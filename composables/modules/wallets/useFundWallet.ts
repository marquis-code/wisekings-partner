import { wallets_api } from '@/api_factory/modules/wallets'
import { useCustomToast } from '@/composables/core/useCustomToast'

export const useFundWallet = () => {
    const loading = ref(false)
    const { showToast } = useCustomToast()

    const fundWallet = async (payload: { amount: number; proofUrl: string; description?: string }) => {
        loading.value = true
        try {
            const res = await wallets_api.fund(payload) as any
            showToast({
                title: 'Success',
                message: 'Funding request submitted. Funds will reflect after verification.',
                toastType: 'success'
            })
            return true
        } catch (err: any) {
            showToast({
                title: 'Error',
                message: err.response?.data?.message || 'Failed to submit funding request',
                toastType: 'error'
            })
            return false
        } finally {
            loading.value = false
        }
    }

    return { loading, fundWallet }
}
