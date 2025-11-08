var Ge = Object.defineProperty;
var Re = (e, t, n) => t in e ? Ge(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var f = (e, t, n) => Re(e, typeof t != "symbol" ? t + "" : t, n);
import { defineComponent as M, getCurrentInstance as Ve, reactive as re, createElementBlock as O, openBlock as b, defineAsyncComponent as U, ref as H, watch as Ce, onErrorCaptured as Be, useAttrs as se, useSlots as $e, computed as C, Fragment as De, createBlock as _e, createCommentVNode as ie, resolveDynamicComponent as ve, unref as z, mergeProps as We, toHandlers as qe, createSlots as He, renderList as Je, withCtx as Ze, renderSlot as Ke, normalizeProps as Xe, guardReactiveProps as Qe, createElementVNode as J, toDisplayString as Ye, withModifiers as et, normalizeStyle as Se, normalizeClass as Oe, h as tt, createVNode as ce, onMounted as nt } from "vue";
import ae from "axios";
function N(e, t = !0) {
  if (typeof e != "string")
    return "";
  let o = e.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^a-zA-Z0-9]+/g, " ").split(" ");
  o = o.filter((r) => r !== "");
  for (let r = 0; r < o.length; r++)
    r === 0 && !t ? o[r] = o[r].toLowerCase() : o[r] = o[r].charAt(0).toUpperCase() + o[r].slice(1).toLowerCase();
  return o.join("");
}
const S = [];
function bo(e) {
  S.find((n) => n.name === e.name) || S.push(e);
}
async function ot(e) {
  var s;
  let t = null;
  for (let a in S) {
    let i = S[a];
    if (i.packages && ((s = i.packages) != null && s.includes(e))) {
      t = i;
      break;
    }
  }
  let n = t || S[0];
  if (!n)
    throw new Error("没有网关");
  let o = await ae.post(n.url, {
    name: e
  });
  if (o.data.code !== 200)
    throw new Error(o.data.msg);
  if (!o.data.data.row)
    throw new Error("组件包不存在");
  const r = o.data.data.row;
  return r.loadStatus = 0, r;
}
function Z(e, t = 100) {
  return new Promise((n) => {
    const o = setInterval(() => {
      e() && (clearInterval(o), n());
    }, t);
  });
}
class rt {
  constructor() {
    // group -> value -> HTMLElement
    f(this, "store", /* @__PURE__ */ new Map());
    // metadata (自动 GC，不会泄漏)
    f(this, "meta", /* @__PURE__ */ new WeakMap());
  }
  /**
   * 注册或更新元素
   * @param group 分组名称
   * @param value 元素值，可选
   * @param elementOrFn 元素实例或创建函数
   * @returns 注册或更新后的元素实例
   */
  register(t, n, o) {
    this.store.has(t) || this.store.set(t, /* @__PURE__ */ new Map());
    const r = this.store.get(t);
    r.has(n) && this.unload(t, n);
    const s = typeof o == "function" ? o() : o;
    return r.set(n, s), this.meta.set(s, { el: s, group: t, value: n }), s;
  }
  /**
   * 注销元素
   * @param group 分组名称
   * @param value 元素值，可选
   */
  unload(t, n) {
    const o = this.store.get(t);
    if (!o) return;
    if (n === void 0) {
      for (const [, s] of o)
        s.remove(), this.meta.delete(s);
      this.store.delete(t);
      return;
    }
    const r = o.get(n);
    r && (r.remove(), this.meta.delete(r), o.delete(n)), o.size === 0 && this.store.delete(t);
  }
  // 可选：取值
  get(t, n) {
    var o;
    return ((o = this.store.get(t)) == null ? void 0 : o.get(n)) ?? null;
  }
  // 可选：检查存在
  exists(t, n) {
    var o;
    return ((o = this.store.get(t)) == null ? void 0 : o.has(n)) ?? !1;
  }
  // 可选：列出组内容
  list(t) {
    var n;
    return Array.from(((n = this.store.get(t)) == null ? void 0 : n.values()) ?? []);
  }
  // 可选：卸载所有
  unloadAll() {
    for (const t of Array.from(this.store.keys()))
      this.unload(t);
  }
}
class st {
  constructor() {
    f(this, "elementManager", new rt());
    f(this, "loadingPromises", /* @__PURE__ */ new Map());
  }
  /**
   * 解析样式名称，判断是组件包还是具体组件
   * @param name 样式名称，格式：包名 或 包名@组件名
   * @returns 解析结果
   */
  parseName(t) {
    const n = t.split("@");
    return n.length === 1 ? { packageName: n[0] } : { packageName: n[0], componentName: n[1] };
  }
  /**
   * 创建样式链接元素
   * @param href 样式链接地址
   * @returns 样式链接元素创建函数
   */
  createStyleLink(t) {
    return () => {
      const n = document.createElement("link");
      return n.rel = "stylesheet", n.href = t, n;
    };
  }
  /**
   * 加载样式
   * @param name 样式名称，格式：包名 或 包名@组件名
   * @param styleUrls 样式URL数组
   * @param version 版本号，用于替换__version__占位符
   * @returns Promise
   */
  async loadStyle(t, n, o = "") {
    const { packageName: r, componentName: s } = this.parseName(t), a = s ? `${r}@${s}` : r;
    if (this.loadingPromises.has(a))
      return console.debug(`样式正在加载中，等待完成: %c${a}`, "color: orange"), this.loadingPromises.get(a);
    if (this.isStyleLoaded(t)) {
      console.debug(`样式已加载，跳过: %c${a}`, "color: blue");
      return;
    }
    console.debug(`加载样式: %c${a}`, "color: red");
    const i = this.doLoadStyle(a, n, o, s);
    this.loadingPromises.set(a, i);
    try {
      await i;
    } finally {
      this.loadingPromises.delete(a);
    }
  }
  /**
   * 实际执行样式加载的方法
   * @param group 样式组名
   * @param styleUrls 样式URL数组
   * @param version 版本号
   * @param componentName 组件名（可选）
   * @returns Promise
   */
  async doLoadStyle(t, n, o, r) {
    const s = n.map((a, i) => new Promise((d, l) => {
      const p = a.replace("__version__", o), c = this.createStyleLink(p)();
      c.onload = () => {
        console.debug(`已加载样式: %c${p}`, "color: green"), d();
      }, c.onerror = () => {
        console.error(`加载样式失败: ${p}`), document.head.removeChild(c), r ? (console.warn(`组件样式加载失败，继续执行: ${p}`), d()) : (console.error(`组件包样式加载失败: ${p}`, t), l(new Error(`加载样式失败: ${p}`)));
      }, this.elementManager.register(t, `style-${i}`, c), document.head.appendChild(c);
    }));
    console.log("loadPromises", n, s), await Promise.all(s);
  }
  /**
   * 卸载样式
   * @param name 样式名称，格式：包名 或 包名@组件名
   */
  unloadStyle(t) {
    const { packageName: n, componentName: o } = this.parseName(t);
    if (o) {
      const r = `${n}@${o}`;
      console.debug(`卸载组件样式: %c${r}`, "color: orange"), this.elementManager.unload(r);
    } else
      console.debug(`卸载组件包样式: %c${n}`, "color: orange"), this.elementManager.unload(n), this.getAllGroups().forEach((s) => {
        s.startsWith(`${n}@`) && this.elementManager.unload(s);
      });
  }
  /**
   * 检查样式是否已加载
   * @param name 样式名称，格式：包名 或 包名@组件名
   * @returns 是否已加载
   */
  isStyleLoaded(t) {
    const { packageName: n, componentName: o } = this.parseName(t), r = o ? `${n}@${o}` : n;
    return this.elementManager.list(r).length > 0;
  }
  getLoadedStyles(t) {
    const { packageName: n, componentName: o } = this.parseName(t), r = o ? `${n}@${o}` : n;
    return this.elementManager.list(r);
  }
  /**
   * 获取所有已注册的组名（私有方法，用于内部遍历）
   * @returns 组名数组
   */
  getAllGroups() {
    return [];
  }
  /**
   * 卸载所有样式
   */
  unloadAllStyles() {
    console.debug("卸载所有样式", "color: red"), this.elementManager.unloadAll();
  }
}
const y = new st();
function at(e) {
  return {
    title: e,
    name: e,
    modelType: "none"
  };
}
const g = {
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
}, h = {};
class it {
  constructor() {
    f(this, "components", {});
    /**
     * TODO -- 组件包网关加载状态
     * 0 -- 未加载
     * 1 -- 加载中
     * 200 -- 已加载
     */
    f(this, "pkgGatewayLoading", {});
  }
  /**
   * 规范化组件名称，格式：包名@驼峰组件名
   */
  parseComponentName(t) {
    const [n, o] = t.split("@");
    return `${n}@${N(o)}`;
  }
  /**
   * 获取或注册组件。
   * TODO -- 获取或注册组件。
   * @param nameRaw 原始名称，如 'MuloLayer@TestComponent'
   * @param component 可选，如果传入则注册该组件
   */
  async component(t, n = null) {
    var l;
    const o = this.parseComponentName(t);
    if (n) {
      this.components[o] = n;
      return;
    }
    console.debug("component 加载组件", o);
    const [r, s] = o.split("@");
    if (!g[r] && S.length)
      if (this.pkgGatewayLoading[r] == 0 || this.pkgGatewayLoading[r] == null) {
        this.pkgGatewayLoading[r] = 1;
        try {
          const p = await ot(r);
          g[r] = p;
        } catch (p) {
          console.error("从网关加载组件包失败", r, p);
        }
      } else
        await Z(() => !!g[r]);
    if (!h[r]) {
      const p = await this.getPackage(r);
      this.registerComponents(g[r], p);
    }
    const a = g[r];
    a && a.styleCdn && a.styleCdn.length > 0 && a.styleImportCase === "use" && await y.loadStyle(r, a.styleCdn, a.version || "");
    const i = this.getComponentOption(o);
    i && i.styleImportCase === "use" && i.styleCdn && await y.loadStyle(o, i.styleCdn, ((l = g[r]) == null ? void 0 : l.version) || "");
    let d = this.components[o];
    if (d || (d = h[r][s]), !d)
      throw new Error(`未找到${o}`);
    return this.isAsyncComponent(r, s) ? (console.debug("加载异步组件", o), d()) : d;
  }
  /**
   * TODO -- 获取组件选项对象
   * @param item 组件选项或组件名称字符串
   * @returns 组件选项对象
   */
  getComponentOptionObject(t) {
    return typeof t == "string" ? at(t) : t;
  }
  /**
   * 注册包内所有组件到 this.components
   * TODO -- 注册
   */
  registerComponents(t, n) {
    t.components.forEach((o) => {
      const r = this.getComponentOptionObject(o), s = N(r.name), a = `${t.name}@${s}`;
      this.components[a] = n[s];
    });
  }
  /**
   * TODO -- 获取组件选项对象
   * @param raw 组件名称字符串
   * @returns 组件选项对象
   */
  getComponentOption(t) {
    const n = this.parseComponentName(t), [o, r] = n.split("@"), s = g[o];
    if (!s) return;
    const a = s.components.find((i) => {
      const d = this.getComponentOptionObject(i);
      return N(d.name) === r;
    });
    return a ? this.getComponentOptionObject(a) : void 0;
  }
  /**
   * TODO -- 判断是否异步组件
   * @param pkg 包名
   * @param comp 组件名
   * @returns 
   */
  isAsyncComponent(t, n) {
    const o = g[t];
    if (!o) return !1;
    if (o.asyncComponents)
      return o.asyncComponents.includes(n);
    const r = o.components.find((s) => {
      const a = this.getComponentOptionObject(s);
      return N(a.name) === n;
    });
    return r ? !!this.getComponentOptionObject(r).isAsync : !1;
  }
  /**
   * TODO -- 异步加载组件包
   * 
   * @todo 加载组件文件到内存
   * @param packageName 组件包名称
   * @returns 组件包数据
   */
  async getPackage(t) {
    let n = g[t];
    if (!n) throw new Error(`组件包不存在: ${t}`);
    if (h[t])
      return h[t];
    if (n.type === "cdn") {
      if (n.loadStatus === -1 && (n.loadStatus = 0), n.loadStatus === 0) {
        n.loadStatus = 1;
        try {
          n.styleCdn && n.styleCdn.length > 0 && n.styleImportCase === "register" && await y.loadStyle(t, n.styleCdn, n.version || "");
          const o = await this.loadOnlineComponentPackage(n);
          h[t] = o, n.loadStatus = 200;
        } catch (o) {
          throw n.loadStatus = -1, o;
        }
      }
      n.loadStatus === 1 && await Z(() => !!h[t]);
    }
    return n.type === "local" && n.styleCdn && n.styleCdn.length > 0 && n.styleImportCase === "register" && await y.loadStyle(t, n.styleCdn, n.version || ""), h[t];
  }
  /**
   * TODO -- 手动添加本地组件包
   * @param cfg 组件包配置
   * @param data 组件包数据
   */
  addLocalPackage(t, n) {
    g[t.name] = t, h[t.name] = n, this.registerComponents(t, n);
  }
  /**
   * TODO -- 添加组件包配置
   * @param cfg 组件包配置
   */
  registerPackage(t) {
    t = Object.assign({
      loadStatus: 0,
      styleImportCase: "register"
      // 默认在注册时导入样式
    }, t), g[t.name] = t;
  }
  /**
   * TODO -- 通过 CDN 加载全局 UMD 包
   * @todo 添加script
   * @todo 读取已加载数据
   * @param packageInfo 组件包配置
   * @returns 组件包数据
   */
  loadOnlineComponentPackage(t) {
    return new Promise((n, o) => {
      const { title: r, name: s, version: a, cdn: i } = t;
      if (!i) {
        o(new Error(`组件库 ${s} 未设置 CDN 地址`));
        return;
      }
      const d = i.replace("__version__", a || ""), l = document.createElement("script");
      l.src = d, l.onload = () => {
        window[s] ? (console.debug(`已加载在线组件库: %c${s}`, "color: green"), n(window[s]), t.keepOfWindow || delete window[s]) : o(new Error(`组件未在全局命名空间中找到: ${s}`)), document.body.removeChild(l);
      }, l.onerror = () => {
        document.body.removeChild(l), o(new Error(`加载 ${r || s} 组件库失败`));
      }, document.body.appendChild(l);
    });
  }
  // TODO ## 加载
  // TODO ## 装载
}
const x = new it(), ct = { class: "m-tip" }, Te = /* @__PURE__ */ M({
  __name: "asyncLoading",
  setup(e) {
    const t = Ve();
    return console.log("loading instance", t), re({}), (n, o) => (b(), O("div", ct, " Loading... "));
  }
}), lt = {
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
class wo {
  static typeof(t) {
    let n = Object.prototype.toString.call(t);
    return lt[n] || "unknow";
  }
  static isArray(t) {
    return Object.prototype.toString.call(t) === "[object Array]";
  }
  static isEmpty(t) {
    return t == null ? !0 : typeof t == "string" ? t.trim() === "" : Array.isArray(t) ? t.length === 0 : typeof t == "object" ? Object.keys(t).length === 0 : !1;
  }
  /**
   * 复制对象|数组
   * @param {Array|Object} obj 
   * @returns {Array|Object} 复制的
   */
  static copyObj(t) {
    return JSON.parse(JSON.stringify(t));
  }
}
function jo(e) {
  return typeof e != "string" ? !1 : e.match(/^[a-zA-Z0-9-]+@[a-zA-Z0-9-_]+$/);
}
function Co(e) {
  console.log("%c设置组件包", "color:green;", e), x.addLocalPackage(e.packageConfig, e);
}
function $o(e) {
  console.debug("%c注册组件包", "color:green;", e), x.registerPackage(e);
}
async function _o(e, t, n) {
  return y.loadStyle(e, t || [], n);
}
function vo(e) {
  y.unloadStyle(e);
}
function So(e) {
  return y.isStyleLoaded(e);
}
function Oo(e) {
  return y.getLoadedStyles(e);
}
function To() {
  y.unloadAllStyles();
}
function Po(e = 500) {
  return U({
    loader: () => new Promise(async (t, n) => {
      try {
        setTimeout(() => {
          t(function() {
            return "";
          });
        }, e);
      } catch (o) {
        n(o);
      }
    })
  });
}
function ko(e) {
  return x.getComponentOption(e);
}
function Pe(e, t = {}) {
  e = x.parseComponentName(e);
  const n = Object.assign({
    // 定义组件加载失败时显示的组件
    errorComponent: function(o) {
      return `组件加载失败:${e}`;
    },
    // 定义组件加载时显示的加载组件
    loadingComponent: Te
  }, t);
  return U({
    // 异步加载组件的函数
    loader: () => new Promise(async (o, r) => {
      try {
        console.debug("-- 加载组件:", e);
        let s = await x.component(e);
        if (!s) {
          r(new Error("组件不存在:" + e));
          return;
        }
        o(s);
      } catch (s) {
        r(s);
      }
    }),
    // 展开合并后的配置项
    ...n
  });
}
const ut = {
  key: 1,
  class: "m-component-error"
}, pt = { class: "error-msg" }, dt = {
  name: "lp-component",
  // 设置 inheritAttrs 为 false 以禁用默认的属性继承行为
  inheritAttrs: !1
}, G = /* @__PURE__ */ M({
  ...dt,
  props: {
    is: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e, n = H(!1), o = H("");
    let r = null;
    const s = Pe(t.is, {
      // //loading 延迟时间
      // delay: 200,
      // // 超时时间
      // timeout: 3000,
      loadingComponent: Te,
      errorComponent: function(c) {
        return "";
      },
      onError: (c, m, P, _) => {
        console.error("onError", _), r = m, n.value = !0, o.value = `组件加载失败: ${c.message}`, P();
      }
    });
    Ce(() => t.is, (c, m) => {
    });
    function a() {
      n.value = !1, o.value = "", r == null || r();
    }
    Be((c, m, P) => !1);
    const i = se(), d = $e(), l = C(() => Object.keys(i).reduce((c, m) => (m.startsWith("on") || (c[m] = i[m]), c), {})), p = C(() => Object.keys(i).reduce((c, m) => {
      if (m.startsWith("on")) {
        const P = m.slice(2).replace(/^\w/, (_) => _.toLowerCase());
        c[P] = i[m];
      }
      return c;
    }, {}));
    return C(() => {
      const c = {};
      return "modelValue" in i && (c.modelValue = i.modelValue), c;
    }), C(() => {
      const c = {};
      return "onUpdate:modelValue" in i && (c["update:modelValue"] = i["onUpdate:modelValue"]), c;
    }), (c, m) => (b(), O(De, null, [
      e.is ? (b(), _e(ve(z(s)), We({ key: 0 }, l.value, qe(p.value)), He({ _: 2 }, [
        Je(z(d), (P, _) => ({
          name: _,
          fn: Ze((ze) => [
            Ke(c.$slots, _, Xe(Qe(ze || {})))
          ])
        }))
      ]), 1040)) : ie("", !0),
      n.value ? (b(), O("div", ut, [
        J("div", pt, Ye(o.value), 1),
        J("button", {
          class: "btn btn-primary link",
          onClick: et(a, ["stop"])
        }, "重试")
      ])) : ie("", !0)
    ], 64));
  }
});
let ft = {
  install: (e) => {
    e.component(G.name, G);
  }
};
const mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpComponent: G,
  default: ft
}, Symbol.toStringTag, { value: "Module" }));
var ke = typeof global == "object" && global && global.Object === Object && global, gt = typeof self == "object" && self && self.Object === Object && self, w = ke || gt || Function("return this")(), R = w.Symbol, Ae = Object.prototype, yt = Ae.hasOwnProperty, ht = Ae.toString, k = R ? R.toStringTag : void 0;
function bt(e) {
  var t = yt.call(e, k), n = e[k];
  try {
    e[k] = void 0;
    var o = !0;
  } catch {
  }
  var r = ht.call(e);
  return o && (t ? e[k] = n : delete e[k]), r;
}
var wt = Object.prototype, jt = wt.toString;
function Ct(e) {
  return jt.call(e);
}
var $t = "[object Null]", _t = "[object Undefined]", le = R ? R.toStringTag : void 0;
function T(e) {
  return e == null ? e === void 0 ? _t : $t : le && le in Object(e) ? bt(e) : Ct(e);
}
function D(e) {
  return e != null && typeof e == "object";
}
var Ee = Array.isArray;
function xe(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var vt = "[object AsyncFunction]", St = "[object Function]", Ot = "[object GeneratorFunction]", Tt = "[object Proxy]";
function Le(e) {
  if (!xe(e))
    return !1;
  var t = T(e);
  return t == St || t == Ot || t == vt || t == Tt;
}
var W = w["__core-js_shared__"], ue = function() {
  var e = /[^.]+$/.exec(W && W.keys && W.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Pt(e) {
  return !!ue && ue in e;
}
var kt = Function.prototype, At = kt.toString;
function $(e) {
  if (e != null) {
    try {
      return At.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Et = /[\\^$.*+?()[\]{}|]/g, xt = /^\[object .+?Constructor\]$/, Lt = Function.prototype, Mt = Object.prototype, It = Lt.toString, Nt = Mt.hasOwnProperty, Ft = RegExp(
  "^" + It.call(Nt).replace(Et, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ut(e) {
  if (!xe(e) || Pt(e))
    return !1;
  var t = Le(e) ? Ft : xt;
  return t.test($(e));
}
function zt(e, t) {
  return e == null ? void 0 : e[t];
}
function I(e, t) {
  var n = zt(e, t);
  return Ut(n) ? n : void 0;
}
var K = I(w, "WeakMap"), Gt = 9007199254740991;
function Me(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Gt;
}
function Rt(e) {
  return e != null && Me(e.length) && !Le(e);
}
var Vt = Object.prototype;
function Ie(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || Vt;
  return e === n;
}
var Bt = "[object Arguments]";
function pe(e) {
  return D(e) && T(e) == Bt;
}
var Ne = Object.prototype, Dt = Ne.hasOwnProperty, Wt = Ne.propertyIsEnumerable, qt = pe(/* @__PURE__ */ function() {
  return arguments;
}()) ? pe : function(e) {
  return D(e) && Dt.call(e, "callee") && !Wt.call(e, "callee");
};
function Ht() {
  return !1;
}
var Fe = typeof exports == "object" && exports && !exports.nodeType && exports, de = Fe && typeof module == "object" && module && !module.nodeType && module, Jt = de && de.exports === Fe, fe = Jt ? w.Buffer : void 0, Zt = fe ? fe.isBuffer : void 0, Kt = Zt || Ht, Xt = "[object Arguments]", Qt = "[object Array]", Yt = "[object Boolean]", en = "[object Date]", tn = "[object Error]", nn = "[object Function]", on = "[object Map]", rn = "[object Number]", sn = "[object Object]", an = "[object RegExp]", cn = "[object Set]", ln = "[object String]", un = "[object WeakMap]", pn = "[object ArrayBuffer]", dn = "[object DataView]", fn = "[object Float32Array]", mn = "[object Float64Array]", gn = "[object Int8Array]", yn = "[object Int16Array]", hn = "[object Int32Array]", bn = "[object Uint8Array]", wn = "[object Uint8ClampedArray]", jn = "[object Uint16Array]", Cn = "[object Uint32Array]", u = {};
u[fn] = u[mn] = u[gn] = u[yn] = u[hn] = u[bn] = u[wn] = u[jn] = u[Cn] = !0;
u[Xt] = u[Qt] = u[pn] = u[Yt] = u[dn] = u[en] = u[tn] = u[nn] = u[on] = u[rn] = u[sn] = u[an] = u[cn] = u[ln] = u[un] = !1;
function $n(e) {
  return D(e) && Me(e.length) && !!u[T(e)];
}
function _n(e) {
  return function(t) {
    return e(t);
  };
}
var Ue = typeof exports == "object" && exports && !exports.nodeType && exports, E = Ue && typeof module == "object" && module && !module.nodeType && module, vn = E && E.exports === Ue, q = vn && ke.process, me = function() {
  try {
    var e = E && E.require && E.require("util").types;
    return e || q && q.binding && q.binding("util");
  } catch {
  }
}(), ge = me && me.isTypedArray, Sn = ge ? _n(ge) : $n;
function On(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var Tn = On(Object.keys, Object), Pn = Object.prototype, kn = Pn.hasOwnProperty;
function An(e) {
  if (!Ie(e))
    return Tn(e);
  var t = [];
  for (var n in Object(e))
    kn.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var X = I(w, "Map"), Q = I(w, "DataView"), Y = I(w, "Promise"), ee = I(w, "Set"), ye = "[object Map]", En = "[object Object]", he = "[object Promise]", be = "[object Set]", we = "[object WeakMap]", je = "[object DataView]", xn = $(Q), Ln = $(X), Mn = $(Y), In = $(ee), Nn = $(K), j = T;
(Q && j(new Q(new ArrayBuffer(1))) != je || X && j(new X()) != ye || Y && j(Y.resolve()) != he || ee && j(new ee()) != be || K && j(new K()) != we) && (j = function(e) {
  var t = T(e), n = t == En ? e.constructor : void 0, o = n ? $(n) : "";
  if (o)
    switch (o) {
      case xn:
        return je;
      case Ln:
        return ye;
      case Mn:
        return he;
      case In:
        return be;
      case Nn:
        return we;
    }
  return t;
});
var Fn = "[object String]";
function Un(e) {
  return typeof e == "string" || !Ee(e) && D(e) && T(e) == Fn;
}
var zn = "[object Map]", Gn = "[object Set]", Rn = Object.prototype, Vn = Rn.hasOwnProperty;
function Bn(e) {
  if (e == null)
    return !0;
  if (Rt(e) && (Ee(e) || typeof e == "string" || typeof e.splice == "function" || Kt(e) || Sn(e) || qt(e)))
    return !e.length;
  var t = j(e);
  if (t == zn || t == Gn)
    return !e.size;
  if (Ie(e))
    return !An(e).length;
  for (var n in e)
    if (Vn.call(e, n))
      return !1;
  return !0;
}
const v = [];
function Ao(e) {
  v.find((n) => n.name === e.name) || v.push(e);
}
async function Dn(e) {
  var s;
  console.log("## 获取图标包", e);
  let t = null;
  for (let a in v) {
    let i = v[a];
    if (i.packages && ((s = i.packages) != null && s.includes(e))) {
      t = i;
      break;
    }
  }
  let n = t || v[0];
  if (!n)
    throw console.log("没有网关", e, v), new Error("没有网关");
  let o = await ae.post(n.url, {
    name: e
  });
  if (o.data.code !== 200)
    throw new Error(o.data.msg);
  if (!o.data.data.row)
    throw new Error("图标包不存在");
  return o.data.data.row;
}
const A = {}, F = {};
async function Wn(e) {
  let t = qn(e), n = A[t.package];
  if (n || (F[t.package] && await Z(() => !!A[t.package]), n = A[t.package]), !n)
    try {
      F[t.package] = 1, n = await Dn(t.package), A[t.package] = n, delete F[t.package];
    } catch (o) {
      throw delete F[t.package], console.error("加载图标包失败", o), o;
    }
  if (Hn(n), !n.icons[t.icon])
    throw console.error("图标不存在:", t), new Error("图标不存在");
  return n.icons[t.icon];
}
function Eo(e) {
  A[e.name] = e;
}
function qn(e) {
  if (!e.includes("@"))
    return {
      package: "default",
      icon: e
    };
  let [t, n] = e.split("@");
  return {
    package: t,
    icon: n
  };
}
const V = {};
function Hn(e) {
  if (V[e.name])
    return;
  const t = document.createElement("style"), n = e.name || "iconfont", o = (e.data.woff2.startsWith("//"), e.data.woff2), r = (e.data.woff.startsWith("//"), e.data.woff), s = (e.data.truetype.startsWith("//"), e.data.truetype);
  t.innerHTML = `
        @font-face {
            font-family: '${n}';
            src: url('${o}') format('woff2'),
                 url('${r}') format('woff'),
                 url('${s}') format('truetype');
        }
    `, document.head.appendChild(t), V[e.name] = t, console.log("已挂载字体:", e.name);
}
function xo(e) {
  const t = V[e.name];
  t && t.parentNode && (t.parentNode.removeChild(t), delete V[e.name], console.log("已卸载字体:", e.name));
}
const Jn = ["innerHTML"], Zn = {
  name: "lp-icon"
}, te = /* @__PURE__ */ M({
  ...Zn,
  props: {
    is: { default: "loading" },
    size: { default: 12 },
    color: { default: "#000000" }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = t, o = se(), r = {}, s = H(""), a = e;
    Ce(() => a.is, async (l, p) => {
      if (l !== p) {
        if (r[l]) {
          s.value = "&#x" + r[l];
          return;
        }
        try {
          r[l] = await Wn(l), s.value = "&#x" + r[l];
        } catch (c) {
          console.error("加载图标失败", c);
        }
      }
    }, {
      // 初始化时加载图标
      immediate: !0
    });
    const i = C(() => {
      const { size: l, color: p } = a;
      let c = l;
      return Un(l) && (c = parseInt(l, 10)), {
        fontSize: `${c}px`,
        color: p,
        display: "inline-flex",
        fontFamily: "'default'"
      };
    }), d = (l) => {
      n("click", l);
    };
    return (l, p) => (b(), O("i", {
      class: Oe(["lp-icon", [z(o).class]]),
      style: Se(i.value),
      innerHTML: s.value,
      onClick: d
    }, null, 14, Jn));
  }
}), Kn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Xn = ["fill"], Qn = ["xlink:href"], Yn = {
  name: "LpSvg"
}, eo = /* @__PURE__ */ Object.assign(Yn, {
  props: {
    icon: {
      type: String,
      required: !0
    },
    size: {
      type: [Number, String],
      default: 12
    },
    color: {
      type: String,
      default: "#000000"
    }
  },
  setup(e) {
    const t = e, n = C(() => `#${t.icon}`), o = C(() => {
      const { size: r, color: s } = t;
      let a = `${r}`;
      return a = `${a.replace("px", "")}px`, {
        width: a,
        fill: s,
        height: a
      };
    });
    return (r, s) => (b(), O("svg", {
      class: Oe([r.$attrs.class]),
      style: Se(o.value),
      fill: e.color,
      "aria-hidden": "true"
    }, [
      J("use", { "xlink:href": n.value }, null, 8, Qn)
    ], 14, Xn));
  }
}), ne = /* @__PURE__ */ Kn(eo, [["__scopeId", "data-v-4508aad0"]]);
let to = {
  install: (e) => {
    e.component(te.name, te), e.component(ne.name, ne);
  }
};
const no = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpIcon: te,
  LpSvg: ne,
  default: to
}, Symbol.toStringTag, { value: "Module" }));
function oo(e) {
  let t = {};
  for (const n in e)
    t[n] = () => {
      var o;
      return (o = e[n]) == null ? void 0 : o.map(B);
    };
  return t;
}
function B(e) {
  if (typeof e == "string" || typeof e == "number") return e;
  const { component: t, props: n, children: o } = e;
  let r = {};
  return e.slots && (r = {
    ...r,
    ...oo(e.slots)
  }), o && o.length > 0 && (r.default = () => o == null ? void 0 : o.map(B)), t.includes("@") ? ce(
    G,
    { ...n, is: t },
    r
  ) : ce(
    t,
    n || {},
    o == null ? void 0 : o.map(B)
  );
}
function ro(e, t) {
  console.log("useRenderComponent", e);
  const n = re({ layout: e });
  return M({
    name: "DynamicLayout",
    setup() {
      return console.log("useRenderComponent setup", n.layout), () => tt("div", {}, n.layout.map((o) => B(o)));
    }
  });
}
const so = { class: "lp-layout" }, ao = {
  name: "LpLayout"
}, oe = /* @__PURE__ */ M({
  ...ao,
  props: {
    data: {
      type: [Object, Array],
      default: () => []
    }
  },
  setup(e) {
    const t = se(), n = $e();
    re({});
    const r = ro(e.data);
    return nt(() => {
      console.log(t), console.log("layout slots", n);
    }), (s, a) => (b(), O("div", so, [
      (b(), _e(ve(z(r))))
    ]));
  }
});
let io = {
  install: (e) => {
    e.component(oe.name, oe);
  }
};
const co = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpLayout: oe,
  default: io
}, Symbol.toStringTag, { value: "Module" }));
function lo(e) {
  const t = /* @__PURE__ */ Object.assign({ "./lp-component/index.ts": mt, "./lp-icon/index.ts": no, "./lp-layout/index.ts": co });
  console.debug("%cglobalComponents", "color:green", t), Object.keys(t).forEach((n) => {
    const o = t[n].default;
    Bn(o) || e.use(o);
  });
}
function Lo(e, t) {
  if (!e)
    throw new Error("Invalid component: " + e);
  if (typeof e == "string") {
    if (uo(e))
      return Pe(e);
    if (!t)
      throw new Error("获取全局组件失败：未提供 Vue 应用实例");
    const n = t.component(e);
    if (!n)
      throw new Error(`Component "${e}" not found in app registry`);
    return n;
  }
  if (typeof e == "object" && !("then" in e))
    return e;
  if (e instanceof Promise || typeof e == "object" && "then" in e)
    return U(() => e.then((n) => n.default || n));
  if (typeof e == "function") {
    const n = e();
    return n instanceof Promise || typeof n == "object" && "then" in n ? U(
      () => n.then((o) => o.default || o)
    ) : e;
  }
  throw new Error("Unknown component type: " + e);
}
function uo(e) {
  return e.includes("@");
}
function po(e) {
  e = e || {};
  const t = ae.create({
    baseURL: e.baseURL,
    timeout: e.timeout || 1e4,
    headers: {
      ...e.headers || {}
    }
  });
  return e.requestInterceptors && t.interceptors.request.use(e.requestInterceptors, (n) => (console.log("request", { err: n }), Promise.reject(n))), e.responseInterceptors && t.interceptors.response.use(e.responseInterceptors, (n) => (console.log("response err", { err: n }), Promise.reject(n))), e.baseInterceptors && !(e.requestInterceptors || e.responseInterceptors) && (t.interceptors.request.use((n) => (console.log("request", { config: n }), n)), t.interceptors.response.use((n) => (console.log("response", { response: n }), n.data))), t;
}
class L extends Error {
  constructor(n, o = 0, r = {}) {
    super(n);
    f(this, "code");
    f(this, "data");
    f(this, "name", "LooplanException");
    this.code = o, this.data = r, Object.setPrototypeOf(this, L.prototype);
  }
  getData() {
    return this.data;
  }
  getCode() {
    return this.code;
  }
  getMessage() {
    return this.message;
  }
}
class fo {
  constructor(t, n) {
    f(this, "space");
    f(this, "modelName");
    this.space = t, this.modelName = n;
  }
  handleResult(t) {
    if (t.code !== 200)
      throw new L(t.msg || "请求失败", t.code, t.data);
  }
  /**
   * 列表
   */
  async list() {
    const { instance: t } = this.space;
    let n = await t.post(`${this.modelName}.list`);
    return {
      code: n.code,
      msg: n.msg || "请求成功",
      data: n.data || {},
      list: n.data.list || []
    };
  }
  /**
   * 分页列表
   */
  async paginate(t = 1, n = 10, o = {}) {
    const { instance: r } = this.space;
    let s = await r.post(`${this.modelName}.paginate`, {
      page: t,
      psize: n,
      ...o
    }), a = s.data.list, i = (a == null ? void 0 : a.data) || [];
    return delete a.list, {
      code: s.code,
      msg: s.msg || "请求成功",
      data: s.data || {},
      list: i,
      pageStatus: a || {}
    };
  }
  async paginateX(t, n, o = {}) {
    const { instance: r } = this.space;
    let s = await r.post(`${this.modelName}.paginateX`, {
      lastIndex: t,
      options: n || null,
      ...o
    }), a = s.data.list, i = (a == null ? void 0 : a.data) || [];
    return delete a.list, {
      code: s.code,
      msg: s.msg || "请求成功",
      data: s.data || {},
      list: i,
      pageStatus: a || {}
    };
  }
  /**
   * 保存
   */
  async save(t, n) {
    const { instance: o } = this.space;
    return await o.post(`${this.modelName}.save`, {
      id: n,
      data: t
    });
  }
  /**
   * 添加
   */
  async add(t) {
    const { instance: n } = this.space;
    return await n.post(`${this.modelName}.save`, {
      data: t
    });
  }
  /**
   * 更新
   */
  async update(t, n) {
    const { instance: o } = this.space;
    return await o.post(`${this.modelName}.save`, {
      id: n,
      data: t
    });
  }
  /**
   * 删除
   */
  async delete(t) {
    const { instance: n } = this.space;
    return await n.post(`${this.modelName}.delete`, {
      id: t
    });
  }
  /**
   * 详情
   */
  async row(t) {
    const { instance: n } = this.space;
    return await n.post(`${this.modelName}.row`, {
      id: t
    });
  }
  // 批量保存
  async multiSave(t) {
    const { instance: n } = this.space;
    return await n.post(`${this.modelName}.multiSave`, {
      list: t
    });
  }
}
class Mo {
  constructor(t) {
    f(this, "url");
    f(this, "options");
    /**
     * 实例化后的API客户端
     */
    f(this, "instance");
    this.url = t.url, this.options = t, this.createApiClient();
  }
  createApiClient() {
    this.instance = po({
      baseURL: this.url,
      timeout: 1e4,
      headers: {},
      /**
      * 请求拦截器
      * @param config 请求配置
      * @returns 返回配置
      */
      requestInterceptors: (t) => {
        var r, s;
        console.log(t), t.headers["Content-Type"] || (t.headers["Content-Type"] = "application/json");
        const n = ((s = (r = this.options).provideToken) == null ? void 0 : s.call(r)) || "", o = this.options.tokenField || "Authorization";
        return n && (t.headers[o] = n), t;
      },
      /**
       * 响应拦截器
       * @param response 响应数据
       * @returns 返回数据
       */
      responseInterceptors: (t) => (console.log(t), t.data)
    });
  }
  /**
   * 
   * @param name 模型名称(space/name)
   * @returns 模型API
   */
  useModel(t) {
    return new fo(this, t);
  }
  /**
   * 导入云函数
   * @param name 云函数名称
   */
  useCloudFunction(t) {
    return (n) => this.callCloudFunction(t, n);
  }
  /**
   * 导入云对象
   * @param name 云对象名称
   */
  useCloudObject(t) {
    const n = this;
    return new Proxy({}, {
      get(o, r) {
        if (r !== "then")
          return (...s) => {
            const a = s.length > 0 ? s[0] : {};
            return n.callCloudObject(t, r, a);
          };
      }
    });
  }
  /**
   * 调用云对象方法
   * @param objectName 云对象名称
   * @param methodName 方法名称
   * @param params 调用参数
   */
  async callCloudObject(t, n, o) {
    const r = `${t}.${n}`;
    try {
      return console.log(`调用云对象: ${r}`, o), await this.instance.post(`/${r}`, o);
    } catch (s) {
      throw new L(s.message || "云对象调用失败", s.code || 0, s.data || {});
    }
  }
  /**
   * 调用云函数
   * @param name 云函数名称
   * @param params 调用参数
   */
  async callCloudFunction(t, n) {
    try {
      return console.log(`调用云函数: ${t}`, n), await this.instance.post(`/${t}`, n);
    } catch (o) {
      throw new L(o.message || "云函数调用失败", o.code || 0, o.data || {});
    }
  }
}
function mo(e) {
  lo(e);
}
const Io = { install: mo };
export {
  A as IconPackages,
  wo as JsDataType,
  L as LooplanException,
  G as LpComponent,
  te as LpIcon,
  ne as LpSvg,
  fo as ModelClient,
  Mo as ModelSpace,
  Po as asyncComponentDelay,
  po as createApi,
  Io as default,
  S as gatewayOptions,
  ko as getComponentOption,
  ot as getComponentPackage,
  Dn as getIconPackage,
  Oo as getLoadedStyles,
  v as iconGatewayOptions,
  mo as install,
  So as isStyleLoaded,
  Pe as loadComponent,
  Wn as loadIcon,
  _o as loadStyle,
  Hn as mountIconfont,
  jo as nameIsUseAsyncComponent,
  lo as registerLooplanComponents,
  $o as registerPackage,
  Lo as resolveComponent,
  Co as setComponentPackage,
  bo as setGateway,
  Ao as setIconGateway,
  Eo as setIconPackage,
  To as unloadAllStyles,
  vo as unloadStyle,
  xo as unmountIconfont
};
