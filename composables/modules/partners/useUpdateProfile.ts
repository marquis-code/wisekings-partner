import { ref } from "vue"
import { partners_api } from "@/api_factory/modules/partners"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useUpdateProfile = () => {
    const loading = ref(false)
    const { showToast } = useCustomToast()

    const updateProfile = async (payload: any) => {
        loading.value = true
        try {
            await partners_api.updateProfile(payload)
            showToast({ title: "Success", message: "Profile updated successfully", toastType: "success" })
            return true
        } catch (err: any) {
            showToast({ title: "Error", message: err.message || "Profile update failed", toastType: "error" })
            return false
        } finally {
            loading.value = false
        }
    }

    return { loading, updateProfile }
}
