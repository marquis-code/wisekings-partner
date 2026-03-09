import { defineComponent, ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from "vue/server-renderer";
import "/Users/mac/Documents/wisekings/partner/node_modules/hookable/dist/index.mjs";
import { u as useAuthApi } from "./useAuthApi-BFs6vWwx.js";
import { c as useAuthState, a as useToast } from "../server.mjs";
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const err = ref("");
    useAuthApi();
    useAuthState();
    useToast();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-dark-950 p-4" }, _attrs))}><div class="w-full max-w-md"><div class="text-center mb-8"><div class="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 items-center justify-center mb-4"><span class="text-2xl font-bold text-white">P</span></div><h1 class="text-2xl font-bold text-white">Partner Portal</h1><p class="text-dark-400 mt-1">Sign in to your investor partner account</p></div><form class="card space-y-5"><div><label class="label">Email</label><input${ssrRenderAttr("value", unref(email))} type="email" class="input" required></div><div><label class="label">Password</label><input${ssrRenderAttr("value", unref(password))} type="password" class="input" required></div><button type="submit" class="btn-primary w-full"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>${ssrInterpolate(unref(loading) ? "Signing in..." : "Sign in")}</button>`);
      if (unref(err)) {
        _push(`<p class="text-red-400 text-sm text-center">${ssrInterpolate(unref(err))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=login-Ch10EaPN.js.map
