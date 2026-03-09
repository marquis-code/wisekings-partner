import { ref } from "vue"
import { wallets_api } from "@/api_factory/modules/wallets"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useRequestWithdrawal = () => {
    const loading = ref(false)
    const { showToast } = useCustomToast()

    const requestWithdrawal = async (payload: { amount: number; bankDetails: any }) => {
        loading.value = true
        try {
            await wallets_api.withdraw(payload)
            showToast({ title: "Success", message: "Withdrawal request submitted", toastType: "success" })
            return true
        } catch (err: any) {
            showToast({ title: "Error", message: err.message || "Withdrawal request failed", toastType: "error" })
            return false
        } finally {
            loading.value = false
        }
    }

    return { loading, requestWithdrawal }
}
