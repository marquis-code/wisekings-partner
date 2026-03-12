import { GATEWAY_ENDPOINT } from '../axios.config'

export const settings_api = {
  getKycDocuments: () => {
    return GATEWAY_ENDPOINT.get('/settings/kyc-documents')
  },
}
