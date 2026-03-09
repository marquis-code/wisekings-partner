import { GATEWAY_ENDPOINT } from '../axios.config'

export const commissions_api = {
    get: (params?: any) => GATEWAY_ENDPOINT.get('/commissions/me', { params }),
}
