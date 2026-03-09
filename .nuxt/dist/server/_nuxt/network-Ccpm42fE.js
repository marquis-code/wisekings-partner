import { b as __nuxt_component_1 } from "../server.mjs";
import { defineComponent, ref, resolveComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import "/Users/mac/Documents/wisekings/partner/node_modules/hookable/dist/index.mjs";
import { u as usePartnerDashboardApi } from "./usePartnerApi-CH91lEhH.js";
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
  __name: "network",
  __ssrInlineRender: true,
  setup(__props) {
    usePartnerDashboardApi();
    const network = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_definePageMeta = resolveComponent("definePageMeta");
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_definePageMeta, { layout: "dashboard" }, null, _parent));
      _push(`<h1 class="text-2xl font-bold text-white mb-6">My Network</h1><p class="text-dark-400 text-sm mb-6">View your multi-level referral network and the commissions from each layer.</p>`);
      if (unref(network).length === 0) {
        _push(`<div class="text-center py-20 text-dark-400">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:network",
          class: "w-12 h-12 mx-auto mb-4 opacity-50"
        }, null, _parent));
        _push(`<p>No network members yet. Share your referral link!</p></div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(network), (layer, idx) => {
          _push(`<div class="card"><h3 class="text-md font-semibold text-white mb-3">Layer ${ssrInterpolate(idx + 1)}</h3><div class="space-y-2"><!--[-->`);
          ssrRenderList(layer, (m) => {
            _push(`<div class="flex items-center justify-between py-2 border-b border-dark-700/30 last:border-0"><div><p class="text-sm font-medium text-dark-200">${ssrInterpolate(m.fullName || m.companyName || m.email)}</p><p class="text-xs text-dark-400">Joined ${ssrInterpolate(new Date(m.createdAt).toLocaleDateString())}</p></div><span class="${ssrRenderClass(m.isActive ? "badge-success" : "badge-warning")}">${ssrInterpolate(m.isActive ? "Active" : "Pending")}</span></div>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/network.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=network-Ccpm42fE.js.map
