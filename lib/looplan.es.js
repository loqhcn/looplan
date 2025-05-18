var V = Object.defineProperty;
var k = (n, e, t) => e in n ? V(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var $ = (n, e, t) => k(n, typeof e != "symbol" ? e + "" : e, t);
import { defineComponent as O, getCurrentInstance as M, reactive as A, createElementBlock as v, openBlock as C, defineAsyncComponent as I, ref as j, watch as q, onErrorCaptured as T, useAttrs as z, useSlots as R, computed as _, Fragment as B, createBlock as W, createCommentVNode as S, resolveDynamicComponent as Z, unref as P, mergeProps as D, toHandlers as J, createSlots as F, renderList as H, withCtx as K, renderSlot as G, normalizeProps as Q, guardReactiveProps as X, createElementVNode as E, toDisplayString as Y, withModifiers as N } from "vue";
import { isEmpty as ee } from "lodash";
import te from "axios";
function w(n, e = !0) {
  if (typeof n != "string")
    return "";
  let o = n.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^a-zA-Z0-9]+/g, " ").split(" ");
  o = o.filter((r) => r !== "");
  for (let r = 0; r < o.length; r++)
    r === 0 && !e ? o[r] = o[r].toLowerCase() : o[r] = o[r].charAt(0).toUpperCase() + o[r].slice(1).toLowerCase();
  return o.join("");
}
function oe(n) {
  return {
    title: n,
    name: n,
    modelType: "none"
  };
}
const p = {
  MuloLayer: {
    name: "MuloLayer",
    title: "MuloLayer",
    type: "cdn",
    version: "v1",
    cdn: "http://component.loqh.cn/mulo-layer/__version__/mulo-layer.umd.js",
    styleCdn: [],
    components: [
      {
        title: "测试组件",
        name: "MuloTest",
        modelType: "none"
      }
    ],
    loadStatus: 0
  }
}, f = {}, u = {};
class ne {
  constructor() {
    $(this, "components", {});
  }
  /**
   * 规范化组件名称，格式：包名@驼峰组件名
   */
  parseComponentName(e) {
    const [t, o] = e.split("@");
    return `${t}@${w(o)}`;
  }
  /**
   * 获取或注册组件。
   * @param nameRaw 原始名称，如 'MuloLayer@TestComponent'
   * @param component 可选，如果传入则注册该组件
   */
  async component(e, t = null) {
    const o = this.parseComponentName(e);
    if (t) {
      this.components[o] = t;
      return;
    }
    console.debug("加载组件", o);
    const [r, s] = o.split("@");
    if (!f[r]) {
      const a = await this.getPackage(r);
      this.registerComponents(p[r], a);
    }
    const i = this.getComponentOption(o);
    return i && i.styleImportCase === "use" && i.styleCdn && await this.loadComponentStyles(r, i), this.isAsyncComponent(r, s) ? (console.debug("加载异步组件", o), this.components[o]()) : this.components[o];
  }
  /**
   * 获取组件选项对象
   * @param item 组件选项或组件名称字符串
   * @returns 组件选项对象
   */
  getComponentOptionObject(e) {
    return typeof e == "string" ? oe(e) : e;
  }
  /**
   * 注册包内所有组件到 this.components
   */
  registerComponents(e, t) {
    console.log("注册组件包", e.name, t), e.components.forEach((o) => {
      const r = this.getComponentOptionObject(o), s = w(r.name), i = `${e.name}@${s}`;
      console.log("注册组件", i, t[s]), this.components[i] = t[s];
    });
  }
  /** 获取组件选项 */
  getComponentOption(e) {
    const t = this.parseComponentName(e), [o, r] = t.split("@"), s = p[o];
    if (!s) return;
    const i = s.components.find((a) => {
      const d = this.getComponentOptionObject(a);
      return w(d.name) === r;
    });
    return i ? this.getComponentOptionObject(i) : void 0;
  }
  /** 判断是否异步组件 */
  isAsyncComponent(e, t) {
    const o = p[e];
    if (!o) return !1;
    if (o.asyncComponents)
      return o.asyncComponents.includes(t);
    const r = o.components.find((s) => {
      const i = this.getComponentOptionObject(s);
      return w(i.name) === t;
    });
    return r ? !!this.getComponentOptionObject(r).isAsync : !1;
  }
  /** 异步加载组件包 */
  async getPackage(e) {
    console.debug("getPackage 加载组件包", e);
    const t = p[e];
    if (!t) throw new Error(`组件包不存在: ${e}`);
    if (f[e])
      return f[e];
    if (t.type === "cdn") {
      if (t.loadStatus === -1 && (t.loadStatus = 0), t.loadStatus === 0) {
        t.loadStatus = 1;
        try {
          t.styleCdn && t.styleCdn.length > 0 && t.styleImportCase === "register" && await this.loadPackageStyles(e);
          const o = await this.getOnlineComponentPackage(t);
          f[e] = o, t.loadStatus = 200;
        } catch (o) {
          throw t.loadStatus = -1, o;
        }
      }
      t.loadStatus === 1 && await this.waitComputeLoad(e);
    }
    return f[e];
  }
  /** 等待加载完成 */
  waitComputeLoad(e) {
    return new Promise((t) => {
      const o = setInterval(() => {
        f[e] && (clearInterval(o), t());
      }, 100);
    });
  }
  /** 手动添加本地组件包 */
  addLocalPackage(e, t) {
    p[e.name] = e, f[e.name] = t, this.registerComponents(e, t);
  }
  /** 添加组件包配置 */
  registerPackage(e) {
    e = Object.assign({
      loadStatus: 0,
      styleImportCase: "register"
      // 默认在注册时导入样式
    }, e), p[e.name] = e;
  }
  /** 通过 CDN 加载全局 UMD 包 */
  getOnlineComponentPackage(e) {
    return new Promise((t, o) => {
      console.debug(`开始加载在线组件库: %c${e.name}`, "color: blue");
      const { title: r, name: s, version: i, cdn: a } = e;
      if (!a) {
        o(new Error(`组件库 ${s} 未设置 CDN 地址`));
        return;
      }
      const d = a.replace("__version__", i || ""), l = document.createElement("script");
      l.src = d, l.onload = () => {
        window[s] ? (console.debug(`已加载在线组件库: %c${s}`, "color: green"), t(window[s]), e.keepOfWindow || delete window[s]) : o(new Error(`组件未在全局命名空间中找到: ${s}`)), document.body.removeChild(l);
      }, l.onerror = () => {
        document.body.removeChild(l), o(new Error(`加载 ${r || s} 组件库失败`));
      }, document.body.appendChild(l);
    });
  }
  /** 加载组件包的样式 */
  loadPackageStyles(e) {
    const t = p[e];
    if (!t || !t.styleCdn || t.styleCdn.length === 0)
      return Promise.resolve();
    console.debug(`加载组件包样式: %c${e}`, "color: blue");
    const o = t.version || "";
    u[e] || (u[e] = []);
    const r = t.styleCdn.map((s) => new Promise((i, a) => {
      const d = s.replace("__version__", o), l = document.createElement("link");
      l.rel = "stylesheet", l.href = d, l.onload = () => {
        console.debug(`已加载样式: %c${d}`, "color: green"), i(l);
      }, l.onerror = () => {
        console.error(`加载包样式失败: ${d}`), document.head.removeChild(l), a(new Error(`加载 ${t.title || e} 样式失败: ${d}`));
      }, document.head.appendChild(l), u[e].push(l);
    }));
    return Promise.all(r).then(() => {
    });
  }
  /** 加载组件特定的样式 */
  async loadComponentStyles(e, t) {
    if (!t.styleCdn || t.styleCdn.length === 0)
      return;
    console.debug(`加载组件特定样式: %c${e}@${t.name}`, "color: blue");
    const o = p[e], r = (o == null ? void 0 : o.version) || "", s = `${e}@${t.name}`;
    u[s] || (u[s] = []);
    const i = t.styleCdn.map((d) => new Promise((l) => {
      const g = d.replace("__version__", r), c = document.createElement("link");
      c.rel = "stylesheet", c.href = g, c.onload = () => {
        console.debug(`已加载组件样式: %c${g}`, "color: green"), l(c);
      }, c.onerror = () => {
        console.error(`加载组件样式失败: ${g}`), document.head.removeChild(c), l(null);
      }, document.head.appendChild(c), u[s].push(c);
    })), a = await Promise.all(i);
    u[s] = u[s].filter(
      (d) => a.includes(d)
    );
  }
  /** 卸载组件包的样式 */
  unloadPackageStyles(e) {
    u[e] && (u[e].forEach((t) => {
      document.head.contains(t) && document.head.removeChild(t);
    }), delete u[e]), Object.keys(u).forEach((t) => {
      t.startsWith(`${e}@`) && (u[t].forEach((o) => {
        document.head.contains(o) && document.head.removeChild(o);
      }), delete u[t]);
    });
  }
  /** 卸载特定组件的样式 */
  unloadComponentStyles(e) {
    const t = this.parseComponentName(e);
    u[t] && (u[t].forEach((o) => {
      document.head.contains(o) && document.head.removeChild(o);
    }), delete u[t]);
  }
  /** 获取所有已加载的样式链接 */
  getLoadedStyleLinks() {
    return u;
  }
}
const b = new ne(), re = { class: "m-tip" }, x = /* @__PURE__ */ O({
  __name: "asyncLoading",
  setup(n) {
    const e = M();
    return console.log("loading instance", e), A({}), (t, o) => (C(), v("div", re, " Loading... "));
  }
}), se = {
  "[object Number]": "number",
  "[object String]": "string",
  "[object Boolean]": "bool",
  "[object Array]": "array",
  "[object Object]": "object",
  "[object Undefined]": "undefined",
  "[object Function]": "function",
  "[object RegExp]": "regexp",
  "[object Date]": "date",
  "[object Symbol]": "symbol"
};
class _e {
  static typeof(e) {
    let t = Object.prototype.toString.call(e);
    return se[t] || "unknow";
  }
  static isArray(e) {
    return Object.prototype.toString.call(e) === "[object Array]";
  }
  static isEmpty(e) {
    return e == null ? !0 : typeof e == "string" ? e.trim() === "" : Array.isArray(e) ? e.length === 0 : typeof e == "object" ? Object.keys(e).length === 0 : !1;
  }
  /**
   * 复制对象|数组
   * @param {Array|Object} obj 
   * @returns {Array|Object} 复制的
   */
  static copyObj(e) {
    return JSON.parse(JSON.stringify(e));
  }
}
function we(n) {
  return typeof n != "string" ? !1 : n.match(/^[a-zA-Z0-9-]+@[a-zA-Z0-9-_]+$/);
}
function ve(n) {
  console.log("%c设置组件包", "color:green;", n), b.addLocalPackage(n.packageConfig, n);
}
function Oe(n) {
  console.debug("%c注册组件包", "color:green;", n), b.registerPackage(n);
}
function $e(n = 500) {
  return I({
    loader: () => new Promise(async (e, t) => {
      try {
        setTimeout(() => {
          e(function() {
            return "";
          });
        }, n);
      } catch (o) {
        t(o);
      }
    })
  });
}
function je(n) {
  return b.getComponentOption(n);
}
function ce(n, e = {}) {
  n = b.parseComponentName(n);
  const t = Object.assign({
    // 定义组件加载失败时显示的组件
    errorComponent: function(o) {
      return `组件加载失败:${n}`;
    },
    // 定义组件加载时显示的加载组件
    loadingComponent: x
  }, e);
  return I({
    // 异步加载组件的函数
    loader: () => new Promise(async (o, r) => {
      try {
        console.debug("-- 加载组件:", n);
        let s = await b.component(n);
        if (!s) {
          r(new Error("组件不存在:" + n));
          return;
        }
        o(s);
      } catch (s) {
        r(s);
      }
    }),
    // 展开合并后的配置项
    ...t
  });
}
const le = {
  key: 1,
  class: "m-component-error"
}, ie = { class: "error-msg" }, ae = {
  name: "lp-component",
  // 设置 inheritAttrs 为 false 以禁用默认的属性继承行为
  inheritAttrs: !1
}, L = /* @__PURE__ */ O({
  ...ae,
  props: {
    is: {
      type: String,
      default: ""
    }
  },
  setup(n) {
    const e = n, t = j(!1), o = j("");
    let r = null;
    const s = ce(e.is, {
      // //loading 延迟时间
      // delay: 200,
      // // 超时时间
      // timeout: 3000,
      loadingComponent: x,
      errorComponent: function(c) {
        return "";
      },
      onError: (c, m, y, h) => {
        console.error("onError", h), r = m, t.value = !0, o.value = `组件加载失败: ${c.message}`, y();
      }
    });
    q(() => e.is, (c, m) => {
    });
    function i() {
      t.value = !1, o.value = "", r == null || r();
    }
    T((c, m, y) => (console.log("onErrorCaptured", c, m, y), !1));
    const a = z(), d = R();
    console.log("$slots", d), console.log("$attrs", a);
    const l = _(() => Object.keys(a).reduce((c, m) => (m.startsWith("on") || (c[m] = a[m]), c), {})), g = _(() => Object.keys(a).reduce((c, m) => {
      if (m.startsWith("on")) {
        const y = m.slice(2).replace(/^\w/, (h) => h.toLowerCase());
        c[y] = a[m];
      }
      return c;
    }, {}));
    return _(() => {
      const c = {};
      return "modelValue" in a && (c.modelValue = a.modelValue), c;
    }), _(() => {
      const c = {};
      return "onUpdate:modelValue" in a && (c["update:modelValue"] = a["onUpdate:modelValue"]), c;
    }), console.log("filteredAttrs", l.value), console.log("formattedListeners", g.value), (c, m) => (C(), v(B, null, [
      n.is ? (C(), W(Z(P(s)), D({ key: 0 }, l.value, J(g.value)), F({ _: 2 }, [
        H(P(d), (y, h) => ({
          name: h,
          fn: K((U) => [
            G(c.$slots, h, Q(X(U || {})))
          ])
        }))
      ]), 1040)) : S("", !0),
      t.value ? (C(), v("div", le, [
        E("div", ie, Y(o.value), 1),
        E("button", {
          class: "btn btn-primary link",
          onClick: N(i, ["stop"])
        }, "重试")
      ])) : S("", !0)
    ], 64));
  }
});
let ue = {
  install: (n) => {
    n.component(L.name, L);
  }
};
const de = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ue
}, Symbol.toStringTag, { value: "Module" })), me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function pe(n) {
  const e = /* @__PURE__ */ Object.assign({ "./lp-component/index.ts": de, "./lp-upload/index.ts": me });
  console.debug("%cglobalComponents", "color:green", e), Object.keys(e).forEach((t) => {
    const o = e[t].default;
    ee(o) || n.use(o);
  });
}
const fe = { class: "m-layout" }, ge = {
  name: "UploadComponent"
}, Se = /* @__PURE__ */ O({
  ...ge,
  setup(n) {
    return A({}), (e, t) => (C(), v("div", fe, " 上传组件待开发 "));
  }
});
function Pe(n) {
  n = n || {};
  const e = te.create({
    baseURL: n.baseURL,
    timeout: n.timeout || 1e4,
    headers: {
      ...n.headers || {}
    }
  });
  return n.requestInterceptors && e.interceptors.request.use(n.requestInterceptors, (t) => (console.log("request", { err: t }), Promise.reject(t))), n.responseInterceptors && e.interceptors.response.use(n.responseInterceptors, (t) => (console.log("response err", { err: t }), Promise.reject(t))), n.baseInterceptors && !(n.requestInterceptors || n.responseInterceptors) && (e.interceptors.request.use((t) => (console.log("request", { config: t }), t)), e.interceptors.response.use((t) => (console.log("response", { response: t }), t.data))), e;
}
const Ee = {
  install(n) {
    pe(n);
  }
};
export {
  _e as JsDataType,
  Se as UploadComponent,
  $e as asyncComponentDelay,
  Pe as createApi,
  Ee as default,
  je as getComponentOption,
  ce as loadComponent,
  we as nameIsUseAsyncComponent,
  pe as registerLooplanComponents,
  Oe as registerPackage,
  ve as setComponentPackage
};
