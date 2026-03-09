import { defineComponent, resolveComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { c as useAuthState } from './server.mjs';
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
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuthState();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      const _component_definePageMeta = resolveComponent("definePageMeta");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_definePageMeta, { layout: "dashboard" }, null, _parent));
      _push(`<h1 class="text-2xl font-bold text-white mb-6">Profile</h1><div class="max-w-xl card space-y-4"><div class="text-center mb-4"><div class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-2xl font-bold mx-auto">${ssrInterpolate((_b = (_a = unref(user)) == null ? void 0 : _a.fullName) == null ? void 0 : _b[0])}</div></div><div><label class="label">Company</label><input${ssrRenderAttr("value", (_c = unref(user)) == null ? void 0 : _c.companyName)} class="input" disabled></div><div><label class="label">Contact Person</label><input${ssrRenderAttr("value", (_d = unref(user)) == null ? void 0 : _d.contactPerson)} class="input" disabled></div><div><label class="label">Email</label><input${ssrRenderAttr("value", (_e = unref(user)) == null ? void 0 : _e.email)} class="input" disabled></div><div><label class="label">Partner Code</label><input${ssrRenderAttr("value", (_f = unref(user)) == null ? void 0 : _f.partnerCode)} class="input" disabled></div><div><label class="label">Commission Rate</label><input${ssrRenderAttr("value", `${((_g = unref(user)) == null ? void 0 : _g.commissionRate) || 0}%`)} class="input" disabled></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-CtffaOSl.mjs.map
