import { b as __nuxt_component_1 } from './server.mjs';
import { defineComponent, ref, resolveComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as usePartnerDashboardApi } from './usePartnerApi-CH91lEhH.mjs';
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
  __name: "commissions",
  __ssrInlineRender: true,
  setup(__props) {
    usePartnerDashboardApi();
    const items = ref([]);
    const loading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_definePageMeta = resolveComponent("definePageMeta");
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_definePageMeta, { layout: "dashboard" }, null, _parent));
      _push(`<h1 class="text-2xl font-bold text-white mb-6">My Commissions</h1><div class="table-container"><table class="data-table"><thead><tr><th>Order</th><th>Amount</th><th>Rate</th><th>Layer</th><th>Status</th><th>Date</th></tr></thead><tbody>`);
      if (unref(loading)) {
        _push(`<tr><td colspan="6" class="text-center py-12 text-dark-400">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:loader-2",
          class: "w-6 h-6 animate-spin mx-auto"
        }, null, _parent));
        _push(`</td></tr>`);
      } else if (unref(items).length === 0) {
        _push(`<tr><td colspan="6" class="text-center py-12 text-dark-400">No commissions yet</td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(items), (c) => {
          var _a, _b;
          _push(`<tr><td class="text-dark-200 text-sm">${ssrInterpolate(typeof c.orderId === "object" ? (_a = c.orderId) == null ? void 0 : _a.orderNumber : c.orderId)}</td><td class="font-medium text-white">\u20A6${ssrInterpolate((_b = c.amount) == null ? void 0 : _b.toLocaleString())}</td><td>${ssrInterpolate(c.rate)}%</td><td><span class="badge-info">Level ${ssrInterpolate(c.layer || 1)}</span></td><td><span class="${ssrRenderClass(c.status === "paid" ? "badge-success" : "badge-warning")}">${ssrInterpolate(c.status)}</span></td><td class="text-dark-400 text-xs">${ssrInterpolate(new Date(c.createdAt).toLocaleDateString())}</td></tr>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/commissions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=commissions-CGrW9z71.mjs.map
