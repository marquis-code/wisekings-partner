import { GATEWAY_ENDPOINT } from '../axios.config'

export const auth_api = {
    login: (payload: { email: string; password: string }) => GATEWAY_ENDPOINT.post('/auth/login', payload),
    register: (payload: any) => GATEWAY_ENDPOINT.post('/auth/register', payload),
    refreshToken: (refreshToken: string) => GATEWAY_ENDPOINT.post('/auth/refresh', { refreshToken }),
    logout: () => GATEWAY_ENDPOINT.post('/auth/logout'),
    forgotPassword: (email: string) => GATEWAY_ENDPOINT.post('/auth/forgot-password', { email }),
    resetPassword: (payload: { token: string; newPassword: string }) => GATEWAY_ENDPOINT.post('/auth/reset-password', payload),
}
