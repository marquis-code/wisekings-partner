import { a as useToast, b as __nuxt_component_1 } from "../server.mjs";
import { defineComponent, ref, computed, resolveComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    usePartnerDashboardApi();
    useToast();
    const profile = ref(null);
    const stats = ref({});
    const commissions = ref([]);
    const statsCards = computed(() => [
      { label: "Total Earnings", value: `₦${((stats.value?.totalSalesValue || 0) / 1e3).toFixed(0)}k`, icon: "lucide:trending-up", iconColor: "text-purple-400" },
      { label: "This Month", value: `₦${((stats.value?.monthlySalesValue || 0) / 1e3).toFixed(0)}k`, icon: "lucide:calendar", iconColor: "text-blue-400" },
      { label: "Network Size", value: stats.value?.totalReferrals || 0, icon: "lucide:network", iconColor: "text-emerald-400" },
      { label: "Commission Rate", value: `${profile.value?.commissionRate || 0}%`, icon: "lucide:percent", iconColor: "text-amber-400" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_definePageMeta = resolveComponent("definePageMeta");
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_definePageMeta, { layout: "dashboard" }, null, _parent));
      _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"><!--[-->`);
      ssrRenderList(unref(statsCards), (s) => {
        _push(`<div class="stat-card"><div class="flex items-center justify-between"><span class="text-dark-400 text-sm">${ssrInterpolate(s.label)}</span>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: s.icon,
          class: ["w-5 h-5", s.iconColor]
        }, null, _parent));
        _push(`</div><p class="text-2xl font-bold text-white">${ssrInterpolate(s.value)}</p></div>`);
      });
      _push(`<!--]--></div><div class="card mb-6"><h2 class="text-lg font-semibold text-white mb-3">Your Referral Link</h2><div class="flex items-center gap-2"><input${ssrRenderAttr("value", unref(profile)?.referralLink)} readonly class="input flex-1"><button class="btn-secondary btn-sm">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:copy",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Copy</button></div><p class="text-xs text-dark-400 mt-2">Share this link to earn commissions. Every referred purchase generates income for you.</p></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="card"><h2 class="text-lg font-semibold text-white mb-4">Recent Commissions</h2>`);
      if (unref(commissions).length === 0) {
        _push(`<div class="text-center py-8 text-dark-400">No commissions yet</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(commissions), (c) => {
        _push(`<div class="flex items-center justify-between py-2 border-b border-dark-700/50 last:border-0"><p class="text-sm font-medium text-dark-200">₦${ssrInterpolate(c.amount?.toLocaleString())}</p><span class="${ssrRenderClass(c.status === "paid" ? "badge-success" : "badge-warning")}">${ssrInterpolate(c.status)}</span></div>`);
      });
      _push(`<!--]--></div><div class="card"><h2 class="text-lg font-semibold text-white mb-4">Network Overview</h2><div class="space-y-3"><div class="flex justify-between text-sm"><span class="text-dark-400">Total Referrals</span><span class="text-white font-medium">${ssrInterpolate(unref(stats)?.totalReferrals || 0)}</span></div><div class="flex justify-between text-sm"><span class="text-dark-400">Active Referrals</span><span class="text-white font-medium">${ssrInterpolate(unref(stats)?.activeReferrals || 0)}</span></div><div class="flex justify-between text-sm"><span class="text-dark-400">Network Depth</span><span class="text-white font-medium">${ssrInterpolate(unref(stats)?.networkDepth || 0)} levels</span></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-D6Al_4zz.js.map
