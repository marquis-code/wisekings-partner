import { _ as __nuxt_component_0 } from "./nuxt-link-DmurPrYl.js";
import { e as useRoute, c as useAuthState, a as useToast, b as __nuxt_component_1 } from "../server.mjs";
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { u as useAuthApi } from "./useAuthApi-BFs6vWwx.js";
import "/Users/mac/Documents/wisekings/partner/node_modules/ufo/dist/index.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/mac/Documents/wisekings/partner/node_modules/hookable/dist/index.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/unctx/dist/index.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/mac/Documents/wisekings/partner/node_modules/defu/dist/defu.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/destr/dist/index.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/ohash/dist/index.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/klona/dist/index.mjs";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "/Users/mac/Documents/wisekings/partner/node_modules/@unhead/vue/dist/index.mjs";
import "/Users/mac/Documents/wisekings/partner/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const open = ref(true);
    const { user } = useAuthState();
    useAuthApi();
    useToast();
    const navItems = [
      { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/" },
      { label: "Commissions", icon: "lucide:percent", path: "/commissions" },
      { label: "Wallet", icon: "lucide:wallet", path: "/wallet" },
      { label: "Network", icon: "lucide:network", path: "/network" },
      { label: "Referrals", icon: "lucide:share-2", path: "/referrals" },
      { label: "Profile", icon: "lucide:user", path: "/profile" }
    ];
    const pageTitle = computed(() => navItems.find((i) => i.path === route.path)?.label || "Partner");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen overflow-hidden bg-dark-950" }, _attrs))}><aside class="${ssrRenderClass(["fixed inset-y-0 left-0 z-40 flex flex-col bg-dark-900 border-r border-dark-700 transition-all duration-300", unref(open) ? "w-64" : "w-20"])}"><div class="flex items-center h-16 px-4 border-b border-dark-700"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center font-bold text-white text-sm">P</div>`);
      if (unref(open)) {
        _push(`<span class="text-lg font-bold text-white whitespace-nowrap">Partner</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1"><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.path,
          to: item.path,
          class: ["flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all", unref(route).path === item.path ? "bg-purple-600/10 text-purple-400 border border-purple-500/20" : "text-dark-400 hover:text-dark-200 hover:bg-dark-800"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: item.icon,
                class: "w-5 h-5 flex-shrink-0"
              }, null, _parent2, _scopeId));
              if (unref(open)) {
                _push2(`<span class="whitespace-nowrap"${_scopeId}>${ssrInterpolate(item.label)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_component_Icon, {
                  name: item.icon,
                  class: "w-5 h-5 flex-shrink-0"
                }, null, 8, ["name"]),
                unref(open) ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "whitespace-nowrap"
                }, toDisplayString(item.label), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="p-3 border-t border-dark-700"><button class="w-full flex items-center justify-center px-3 py-2 rounded-lg text-dark-400 hover:text-dark-200 hover:bg-dark-800 transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(open) ? "lucide:panel-left-close" : "lucide:panel-left-open",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button></div></aside><div class="${ssrRenderClass(["flex-1 flex flex-col transition-all duration-300", unref(open) ? "ml-64" : "ml-20"])}"><header class="sticky top-0 z-30 h-16 flex items-center justify-between px-6 bg-dark-900/80 backdrop-blur-xl border-b border-dark-700"><h1 class="text-lg font-semibold text-white">${ssrInterpolate(unref(pageTitle))}</h1><div class="flex items-center gap-3"><div class="flex items-center gap-2 px-3 py-1.5 rounded-lg"><div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-semibold">${ssrInterpolate(unref(user)?.fullName?.[0] || "?")}</div><span class="text-sm text-dark-200 hidden md:block">${ssrInterpolate(unref(user)?.fullName)}</span></div><button class="btn-ghost btn-sm text-red-400">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:log-out",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button></div></header><main class="flex-1 overflow-y-auto p-6">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=dashboard-DKBH9U8K.js.map
