import { defineComponent, ref, resolveComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as usePartnerDashboardApi } from './usePartnerApi-CH91lEhH.mjs';
import './server.mjs';
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
  __name: "referrals",
  __ssrInlineRender: true,
  setup(__props) {
    usePartnerDashboardApi();
    const referrals = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_definePageMeta = resolveComponent("definePageMeta");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_definePageMeta, { layout: "dashboard" }, null, _parent));
      _push(`<h1 class="text-2xl font-bold text-white mb-6">My Referrals</h1>`);
      if (unref(referrals).length === 0) {
        _push(`<div class="text-center py-20 text-dark-400">No referrals yet</div>`);
      } else {
        _push(`<div class="table-container"><table class="data-table"><thead><tr><th>Name</th><th>Status</th><th>Joined</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(unref(referrals), (r) => {
          _push(`<tr><td class="text-dark-200">${ssrInterpolate(r.fullName || r.email)}</td><td><span class="${ssrRenderClass(r.isActive ? "badge-success" : "badge-warning")}">${ssrInterpolate(r.isActive ? "Active" : "Pending")}</span></td><td class="text-dark-400 text-xs">${ssrInterpolate(new Date(r.createdAt).toLocaleDateString())}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/referrals.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=referrals-DFEG6QJM.mjs.map
