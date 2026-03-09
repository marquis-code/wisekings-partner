import { defineComponent, ref, resolveComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as usePartnerDashboardApi } from './usePartnerApi-CH91lEhH.mjs';
import { a as useToast } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'vue-router';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "wallet",
  __ssrInlineRender: true,
  setup(__props) {
    usePartnerDashboardApi();
    useToast();
    const wallet = ref(null);
    const withdrawals = ref([]);
    const submitting = ref(false);
    const form = ref({ amount: 0, bankDetails: { bankName: "", accountNumber: "", accountName: "" } });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_definePageMeta = resolveComponent("definePageMeta");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_definePageMeta, { layout: "dashboard" }, null, _parent));
      _push(`<h1 class="text-2xl font-bold text-white mb-6">Wallet</h1><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"><div class="stat-card"><span class="text-dark-400 text-sm">Balance</span><p class="text-2xl font-bold text-white">\u20A6${ssrInterpolate((((_a = unref(wallet)) == null ? void 0 : _a.balance) || 0).toLocaleString())}</p></div><div class="stat-card"><span class="text-dark-400 text-sm">Total Earned</span><p class="text-2xl font-bold text-white">\u20A6${ssrInterpolate((((_b = unref(wallet)) == null ? void 0 : _b.totalEarned) || 0).toLocaleString())}</p></div></div><div class="card mb-6"><h2 class="text-lg font-semibold text-white mb-4">Request Withdrawal</h2><form class="space-y-4"><div class="grid grid-cols-2 gap-4"><div><label class="label">Amount (\u20A6)</label><input${ssrRenderAttr("value", unref(form).amount)} type="number" min="10000" class="input" required></div><div><label class="label">Bank Name</label><input${ssrRenderAttr("value", unref(form).bankDetails.bankName)} type="text" class="input" required></div><div><label class="label">Account Number</label><input${ssrRenderAttr("value", unref(form).bankDetails.accountNumber)} type="text" class="input" required></div><div><label class="label">Account Name</label><input${ssrRenderAttr("value", unref(form).bankDetails.accountName)} type="text" class="input" required></div></div><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""}>${ssrInterpolate(unref(submitting) ? "Submitting..." : "Request Withdrawal")}</button></form></div><div class="card"><h2 class="text-lg font-semibold text-white mb-4">Withdrawal History</h2><div class="table-container"><table class="data-table"><thead><tr><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>`);
      if (unref(withdrawals).length === 0) {
        _push(`<tr><td colspan="3" class="text-center py-8 text-dark-400">No withdrawals</td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(withdrawals), (w) => {
          var _a2;
          _push(`<tr><td class="font-medium text-white">\u20A6${ssrInterpolate((_a2 = w.amount) == null ? void 0 : _a2.toLocaleString())}</td><td><span class="${ssrRenderClass(w.status === "paid" ? "badge-success" : w.status === "rejected" ? "badge-danger" : "badge-warning")}">${ssrInterpolate(w.status)}</span></td><td class="text-dark-400 text-xs">${ssrInterpolate(new Date(w.createdAt).toLocaleDateString())}</td></tr>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/wallet.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=wallet-B0rZWXKu.mjs.map
