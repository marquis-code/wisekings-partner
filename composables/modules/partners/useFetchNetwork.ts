import { ref } from "vue"
import { partners_api } from "@/api_factory/modules/partners"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useFetchNetwork = () => {
    const loading = ref(false)
    const network = ref<any[]>([])
    const total = ref(0)
    const { showToast } = useCustomToast()

    const fetchNetwork = async (params?: any) => {
        loading.value = true
        try {
            const res = await partners_api.getNetwork(params) as any
            network.value = res.data || []
            total.value = res.total || 0
        } catch (err: any) {
            showToast({ title: "Error", message: err.message || "Failed to fetch network", toastType: "error" })
        } finally {
            loading.value = false
        }
    }

    return { loading, network, total, fetchNetwork }
}
