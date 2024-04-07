import {
  Gt,
  tt
} from "./chunk-EWTIEDG5.js";
import "./chunk-6VGCA36B.js";

// node_modules/.pnpm/@shikijs+vitepress-twoslash@1.2.4_typescript@5.3.3/node_modules/@shikijs/vitepress-twoslash/dist/client.mjs
var isMobile = typeof navigator !== "undefined" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var TwoslashFloatingVue = {
  install: (app, options = {}) => {
    if (typeof window !== "undefined") {
      window.addEventListener("click", (e) => {
        const path = e.composedPath();
        if (path.some((el) => {
          var _a, _b, _c, _d;
          return ((_b = (_a = el == null ? void 0 : el.classList) == null ? void 0 : _a.contains) == null ? void 0 : _b.call(_a, "vp-code-group")) || ((_d = (_c = el == null ? void 0 : el.classList) == null ? void 0 : _c.contains) == null ? void 0 : _d.call(_c, "tabs"));
        }))
          tt();
      }, { passive: true });
    }
    app.use(Gt, {
      ...options,
      themes: {
        "twoslash": {
          $extend: "dropdown",
          triggers: isMobile ? ["touch"] : ["hover", "touch"],
          popperTriggers: isMobile ? ["touch"] : ["hover", "touch"],
          placement: "bottom-start",
          overflowPadding: 10,
          delay: 0,
          handleResize: false,
          autoHide: true,
          instantMove: true,
          flip: false,
          arrowPadding: 8,
          autoBoundaryMaxSize: true
        },
        "twoslash-query": {
          $extend: "twoslash",
          triggers: ["click"],
          popperTriggers: ["click"],
          autoHide: false
        },
        "twoslash-completion": {
          $extend: "twoslash-query",
          triggers: ["click"],
          popperTriggers: ["click"],
          autoHide: false,
          distance: 0,
          arrowOverflow: true
        },
        ...options.theme
      }
    });
  }
};
export {
  TwoslashFloatingVue as default
};
//# sourceMappingURL=@shikijs_vitepress-twoslash_client.js.map
