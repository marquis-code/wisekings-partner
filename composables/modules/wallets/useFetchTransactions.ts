import { wallets_api } from '@/api_factory/modules/wallets'

export const useFetchTransactions = () => {
    const transactions = ref([])
    const loading = ref(false)

    const fetchTransactions = async (params?: any) => {
        loading.value = true
        try {
            const res = await wallets_api.getTransactions(params) as any
            transactions.value = res.data?.data || res.data || []
        } catch (err) {
            console.error('Failed to fetch transactions', err)
        } finally {
            loading.value = false
        }
    }

    return { transactions, loading, fetchTransactions }
}
