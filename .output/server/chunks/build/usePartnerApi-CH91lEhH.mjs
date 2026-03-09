import { d as useNuxtApp } from './server.mjs';

function usePartnerDashboardApi() {
  const { $api } = useNuxtApp();
  return {
    getMyProfile() {
      return $api("/partners/me");
    },
    updateProfile(data) {
      return $api("/partners/me", { method: "PUT", body: data });
    },
    getMyStats() {
      return $api("/partners/me/stats");
    },
    getMyCommissions(params) {
      return $api("/commissions/me", { params });
    },
    getMyWallet() {
      return $api("/wallets/me");
    },
    requestWithdrawal(data) {
      return $api("/wallets/withdraw", { method: "POST", body: data });
    },
    getMyWithdrawals(params) {
      return $api("/wallets/withdrawals/me", { params });
    },
    getMyReferrals(params) {
      return $api("/partners/me/referrals", { params });
    },
    getMyNetwork(params) {
      return $api("/partners/me/network", { params });
    }
  };
}

export { usePartnerDashboardApi as u };
//# sourceMappingURL=usePartnerApi-CH91lEhH.mjs.map
