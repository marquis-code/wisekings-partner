import { ref } from "vue"
import { partners_api } from "@/api_factory/modules/partners"
import { useCustomToast } from "@/composables/core/useCustomToast"
import { useFetchProfile } from "./useFetchProfile"

export const useSignAgreement = () => {
    const loading = ref(false)
    const { showToast } = useCustomToast()
    const { fetchProfile } = useFetchProfile()

    const signAgreement = async () => {
        loading.value = true
        try {
            await partners_api.signAgreement()
            showToast({ title: "Agreement Signed", message: "You have successfully signed the LPO Financing Agreement.", toastType: "success" })
            await fetchProfile()
            return true
        } catch (err: any) {
            showToast({ title: "Error", message: err.message || "Failed to sign agreement", toastType: "error" })
            return false
        } finally {
            loading.value = false
        }
    }

    return { loading, signAgreement }
}
