// Partner Auth State
import type { User, AuthTokens } from '~/types'
const accessToken = ref<string>(''); const refreshTokenValue = ref<string>(''); const user = ref<User | null>(null)
const isAuthenticated = computed(() => !!accessToken.value && !!user.value)

export function useAuthState() {
    if (import.meta.client && !accessToken.value) {
        const tc = useCookie<string>('wk_partner_token'); const rc = useCookie<string>('wk_partner_refresh'); const uc = useCookie<User | null>('wk_partner_user')
        if (tc.value) accessToken.value = tc.value; if (rc.value) refreshTokenValue.value = rc.value; if (uc.value) user.value = uc.value
    }
    function setAuth(userData: User, tokens: AuthTokens) {
        accessToken.value = tokens.accessToken; refreshTokenValue.value = tokens.refreshToken; user.value = userData
        useCookie('wk_partner_token', { maxAge: 3600 }).value = tokens.accessToken
        useCookie('wk_partner_refresh', { maxAge: 604800 }).value = tokens.refreshToken
        useCookie('wk_partner_user', { maxAge: 604800 }).value = JSON.stringify(userData) as any
    }
    function logout() { accessToken.value = ''; refreshTokenValue.value = ''; user.value = null; useCookie('wk_partner_token').value = null; useCookie('wk_partner_refresh').value = null; useCookie('wk_partner_user').value = null }
    async function refresh(): Promise<boolean> { if (!refreshTokenValue.value) return false; try { const config = useRuntimeConfig(); const r = await $fetch<any>(`${config.public.apiBase}/auth/refresh`, { method: 'POST', body: { refreshToken: refreshTokenValue.value } }); if (r?.data?.tokens) { setAuth(r.data.user || user.value!, r.data.tokens); return true }; return false } catch { logout(); return false } }
    return { accessToken: readonly(accessToken), refreshToken: readonly(refreshTokenValue), user: readonly(user), isAuthenticated, setAuth, logout, refresh }
}
