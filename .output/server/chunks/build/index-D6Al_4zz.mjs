import { a as useToast, b as __nuxt_component_1 } from './server.mjs';
import { defineComponent, ref, computed, resolveComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    usePartnerDashboardApi();
    useToast();
    const profile = ref(null);
    const stats = ref({});
    const commissions = ref([]);
    const statsCards = computed(() => {
      var _a, _b, _c, _d;
      return [
        { label: "Total Earnings", value: `\u20A6${((((_a = stats.value) == null ? void 0 : _a.totalSalesValue) || 0) / 1e3).toFixed(0)}k`, icon: "lucide:trending-up", iconColor: "text-purple-400" },
        { label: "This Month", value: `\u20A6${((((_b = stats.value) == null ? void 0 : _b.monthlySalesValue) || 0) / 1e3).toFixed(0)}k`, icon: "lucide:calendar", iconColor: "text-blue-400" },
        { label: "Network Size", value: ((_c = stats.value) == null ? void 0 : _c.totalReferrals) || 0, icon: "lucide:network", iconColor: "text-emerald-400" },
        { label: "Commission Rate", value: `${((_d = profile.value) == null ? void 0 : _d.commissionRate) || 0}%`, icon: "lucide:percent", iconColor: "text-amber-400" }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
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
      _push(`<!--]--></div><div class="card mb-6"><h2 class="text-lg font-semibold text-white mb-3">Your Referral Link</h2><div class="flex items-center gap-2"><input${ssrRenderAttr("value", (_a = unref(profile)) == null ? void 0 : _a.referralLink)} readonly class="input flex-1"><button class="btn-secondary btn-sm">`);
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
        var _a2;
        _push(`<div class="flex items-center justify-between py-2 border-b border-dark-700/50 last:border-0"><p class="text-sm font-medium text-dark-200">\u20A6${ssrInterpolate((_a2 = c.amount) == null ? void 0 : _a2.toLocaleString())}</p><span class="${ssrRenderClass(c.status === "paid" ? "badge-success" : "badge-warning")}">${ssrInterpolate(c.status)}</span></div>`);
      });
      _push(`<!--]--></div><div class="card"><h2 class="text-lg font-semibold text-white mb-4">Network Overview</h2><div class="space-y-3"><div class="flex justify-between text-sm"><span class="text-dark-400">Total Referrals</span><span class="text-white font-medium">${ssrInterpolate(((_b = unref(stats)) == null ? void 0 : _b.totalReferrals) || 0)}</span></div><div class="flex justify-between text-sm"><span class="text-dark-400">Active Referrals</span><span class="text-white font-medium">${ssrInterpolate(((_c = unref(stats)) == null ? void 0 : _c.activeReferrals) || 0)}</span></div><div class="flex justify-between text-sm"><span class="text-dark-400">Network Depth</span><span class="text-white font-medium">${ssrInterpolate(((_d = unref(stats)) == null ? void 0 : _d.networkDepth) || 0)} levels</span></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D6Al_4zz.mjs.map
