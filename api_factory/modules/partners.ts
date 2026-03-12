import { GATEWAY_ENDPOINT } from '../axios.config'

export const partners_api = {
    getProfile: () => GATEWAY_ENDPOINT.get('/partners/me'),
    updateProfile: (payload: any) => GATEWAY_ENDPOINT.put('/partners/me', payload),
    getDashboard: () => GATEWAY_ENDPOINT.get('/partners/me/dashboard'),
    getReferrals: (params?: any) => GATEWAY_ENDPOINT.get('/partners/me/referrals', { params }),
    getNetwork: (params?: any) => GATEWAY_ENDPOINT.get('/partners/me/network', { params }),
    signAgreement: () => GATEWAY_ENDPOINT.post('/users/me/sign-agreement'),
    getKyc: () => GATEWAY_ENDPOINT.get('/partners/me/kyc'),
    submitKycDocument: (payload: any) => GATEWAY_ENDPOINT.post('/partners/me/kyc/document', payload),
    getReferralQr: () => GATEWAY_ENDPOINT.get('/partners/me/referral-qr'),
}
