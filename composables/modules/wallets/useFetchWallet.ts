import { ref } from "vue"
import { wallets_api } from "@/api_factory/modules/wallets"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useFetchWallet = () => {
    const loading = ref(false)
    const wallet = ref<any>(null)
    const { showToast } = useCustomToast()

    const fetchWallet = async () => {
        loading.value = true
        try {
            const res = await wallets_api.get() as any
            wallet.value = res.data || res
        } catch (err: any) {
            showToast({ title: "Error", message: err.message || "Failed to fetch wallet", toastType: "error" })
        } finally {
            loading.value = false
        }
    }

    return { loading, wallet, fetchWallet }
}
