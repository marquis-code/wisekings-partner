import { ref } from "vue"
import { partners_api } from "@/api_factory/modules/partners"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useFetchReferrals = () => {
    const loading = ref(false)
    const referrals = ref<any[]>([])
    const total = ref(0)
    const { showToast } = useCustomToast()

    const fetchReferrals = async (params?: any) => {
        loading.value = true
        try {
            const res = await partners_api.getReferrals(params) as any
            referrals.value = res.data || []
            total.value = res.total || 0
        } catch (err: any) {
            showToast({ title: "Error", message: err.message || "Failed to fetch referrals", toastType: "error" })
        } finally {
            loading.value = false
        }
    }

    return { loading, referrals, total, fetchReferrals }
}
