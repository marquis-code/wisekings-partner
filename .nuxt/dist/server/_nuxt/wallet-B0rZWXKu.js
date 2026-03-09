import { defineComponent, ref, resolveComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import "/Users/mac/Documents/wisekings/partner/node_modules/hookable/dist/index.mjs";
import { u as usePartnerDashboardApi } from "./usePartnerApi-CH91lEhH.js";
import { a as useToast } from "../server.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/mac/Documents/wisekings/partner/node_modules/unctx/dist/index.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/mac/Documents/wisekings/partner/node_modules/defu/dist/defu.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/ufo/dist/index.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/destr/dist/index.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/ohash/dist/index.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/klona/dist/index.mjs";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "/Users/mac/Documents/wisekings/partner/node_modules/@unhead/vue/dist/index.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/perfect-debounce/dist/index.mjs";
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
      const _component_definePageMeta = resolveComponent("definePageMeta");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_definePageMeta, { layout: "dashboard" }, null, _parent));
      _push(`<h1 class="text-2xl font-bold text-white mb-6">Wallet</h1><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"><div class="stat-card"><span class="text-dark-400 text-sm">Balance</span><p class="text-2xl font-bold text-white">₦${ssrInterpolate((unref(wallet)?.balance || 0).toLocaleString())}</p></div><div class="stat-card"><span class="text-dark-400 text-sm">Total Earned</span><p class="text-2xl font-bold text-white">₦${ssrInterpolate((unref(wallet)?.totalEarned || 0).toLocaleString())}</p></div></div><div class="card mb-6"><h2 class="text-lg font-semibold text-white mb-4">Request Withdrawal</h2><form class="space-y-4"><div class="grid grid-cols-2 gap-4"><div><label class="label">Amount (₦)</label><input${ssrRenderAttr("value", unref(form).amount)} type="number" min="10000" class="input" required></div><div><label class="label">Bank Name</label><input${ssrRenderAttr("value", unref(form).bankDetails.bankName)} type="text" class="input" required></div><div><label class="label">Account Number</label><input${ssrRenderAttr("value", unref(form).bankDetails.accountNumber)} type="text" class="input" required></div><div><label class="label">Account Name</label><input${ssrRenderAttr("value", unref(form).bankDetails.accountName)} type="text" class="input" required></div></div><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""}>${ssrInterpolate(unref(submitting) ? "Submitting..." : "Request Withdrawal")}</button></form></div><div class="card"><h2 class="text-lg font-semibold text-white mb-4">Withdrawal History</h2><div class="table-container"><table class="data-table"><thead><tr><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>`);
      if (unref(withdrawals).length === 0) {
        _push(`<tr><td colspan="3" class="text-center py-8 text-dark-400">No withdrawals</td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(withdrawals), (w) => {
          _push(`<tr><td class="font-medium text-white">₦${ssrInterpolate(w.amount?.toLocaleString())}</td><td><span class="${ssrRenderClass(w.status === "paid" ? "badge-success" : w.status === "rejected" ? "badge-danger" : "badge-warning")}">${ssrInterpolate(w.status)}</span></td><td class="text-dark-400 text-xs">${ssrInterpolate(new Date(w.createdAt).toLocaleDateString())}</td></tr>`);
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
export {
  _sfc_main as default
};
//# sourceMappingURL=wallet-B0rZWXKu.js.map
