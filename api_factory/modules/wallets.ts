import { GATEWAY_ENDPOINT } from '../axios.config'

export const wallets_api = {
    get: () => GATEWAY_ENDPOINT.get('/wallets/me'),
    withdraw: (payload: { amount: number; bankDetails: any }) => GATEWAY_ENDPOINT.post('/wallets/withdraw', payload),
    getWithdrawals: (params?: any) => GATEWAY_ENDPOINT.get('/wallets/withdrawals/me', { params }),
    fund: (payload: { amount: number; proofUrl: string; description?: string }) => GATEWAY_ENDPOINT.post('/wallets/fund', payload),
    getTransactions: (params?: any) => GATEWAY_ENDPOINT.get('/wallets/transactions/me', { params }),
}
