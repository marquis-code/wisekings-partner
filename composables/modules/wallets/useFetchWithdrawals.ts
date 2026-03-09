import { ref } from "vue"
import { wallets_api } from "@/api_factory/modules/wallets"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useFetchWithdrawals = () => {
    const loading = ref(false)
    const withdrawals = ref<any[]>([])
    const total = ref(0)
    const { showToast } = useCustomToast()

    const fetchWithdrawals = async (params?: any) => {
        loading.value = true
        try {
            const res = await wallets_api.getWithdrawals(params) as any
            withdrawals.value = res.data || []
            total.value = res.total || 0
        } catch (err: any) {
            showToast({ title: "Error", message: err.message || "Failed to fetch withdrawals", toastType: "error" })
        } finally {
            loading.value = false
        }
    }

    return { loading, withdrawals, total, fetchWithdrawals }
}
