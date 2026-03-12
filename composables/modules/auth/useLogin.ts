import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"
import { useRouter } from "vue-router"
import { navigateTo } from "#app"

export const useLogin = () => {
    const loading = ref(false)
    const { showToast } = useCustomToast()
    const router = useRouter()

    const mfaRequired = ref(false)
    const otpCode = ref('')

    const login = async (payload: { email: string; password: string }) => {
        loading.value = true
        try {
            const res = await auth_api.login(payload) as any

            if (res.mfaRequired || res.data?.mfaRequired) {
                showToast({
                    title: "OTP Required",
                    message: "Please enter the code sent to your email",
                    toastType: "info",
                })
                const email = payload.email || res.email || res.data?.email
                await navigateTo(`/otp?email=${encodeURIComponent(email)}&type=login`)
                return { mfaRequired: true }
            }

            if (res.data) {
                showToast({ title: "Success", message: "Login successful", toastType: "success" })
                return res
            }
        } catch (err: any) {
            showToast({ title: "Error", message: err.message || "Login failed", toastType: "error" })

            if (err.message && err.message.toLowerCase().includes('verify your email')) {
                await navigateTo(`/otp?email=${encodeURIComponent(payload.email)}`)
            }

            return null
        } finally {
            loading.value = false
        }
    }

    const verifyOtp = async (email: string) => {
        loading.value = true
        try {
            const res = await auth_api.verifyLoginOtp({
                email,
                otpCode: otpCode.value
            }) as any

            if (res.data) {
                showToast({
                    title: "Success",
                    message: "Authentication successful",
                    toastType: "success",
                })
                return res
            }
        } catch (err: any) {
            showToast({
                title: "Error",
                message: err.message || "Invalid OTP",
                toastType: "error",
            })
            return null
        } finally {
            loading.value = false
        }
    }

    return { loading, login, mfaRequired, otpCode, verifyOtp }
}
