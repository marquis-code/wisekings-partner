import { ref } from "vue"
import { partners_api } from "@/api_factory/modules/partners"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useFetchProfile = () => {
    const loading = ref(false)
    const profile = ref<any>(null)
    const { showToast } = useCustomToast()

    const fetchProfile = async () => {
        loading.value = true
        try {
            const res = await partners_api.getProfile() as any
            profile.value = res.data || res
        } catch (err: any) {
            showToast({ title: "Error", message: err.message || "Failed to fetch profile", toastType: "error" })
        } finally {
            loading.value = false
        }
    }

    return { loading, profile, fetchProfile }
}
