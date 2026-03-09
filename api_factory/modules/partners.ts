import { GATEWAY_ENDPOINT } from '../axios.config'

export const partners_api = {
    getProfile: () => GATEWAY_ENDPOINT.get('/partners/me'),
    updateProfile: (payload: any) => GATEWAY_ENDPOINT.put('/partners/me', payload),
    getStats: () => GATEWAY_ENDPOINT.get('/partners/me/stats'),
    getReferrals: (params?: any) => GATEWAY_ENDPOINT.get('/partners/me/referrals', { params }),
    getNetwork: (params?: any) => GATEWAY_ENDPOINT.get('/partners/me/network', { params }),
}
