var He = Object.defineProperty;
var Je = (e, t, n) => t in e ? He(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var g = (e, t, n) => Je(e, typeof t != "symbol" ? t + "" : t, n);
import { defineComponent as N, getCurrentInstance as Ke, reactive as se, createElementBlock as k, openBlock as $, defineAsyncComponent as z, ref as O, watch as Se, markRaw as le, onErrorCaptured as Ze, useAttrs as ae, useSlots as Oe, computed as _, Fragment as Xe, createBlock as Te, createCommentVNode as ue, resolveDynamicComponent as Pe, mergeProps as Qe, toHandlers as Ye, createSlots as et, renderList as tt, unref as ce, withCtx as nt, renderSlot as ot, normalizeProps as rt, guardReactiveProps as st, createElementVNode as K, toDisplayString as at, withModifiers as ct, normalizeStyle as ke, normalizeClass as xe, h as it, createVNode as pe, onMounted as lt } from "vue";
import ie from "axios";
function R(e, t = !0) {
  if (typeof e != "string")
    return "";
  let o = e.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^a-zA-Z0-9]+/g, " ").split(" ");
  o = o.filter((r) => r !== "");
  for (let r = 0; r < o.length; r++)
    r === 0 && !t ? o[r] = o[r].toLowerCase() : o[r] = o[r].charAt(0).toUpperCase() + o[r].slice(1).toLowerCase();
  return o.join("");
}
const P = [];
function Oo(e) {
  P.find((n) => n.name === e.name) || P.push(e);
}
async function ut(e) {
  var s;
  let t = null;
  for (let a in P) {
    let c = P[a];
    if (c.packages && ((s = c.packages) != null && s.includes(e))) {
      t = c;
      break;
    }
  }
  let n = t || P[0];
  if (!n)
    throw new Error("没有网关");
  let o = await ie.post(n.url, {
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
class pt {
  constructor() {
    // group -> value -> HTMLElement
    g(this, "store", /* @__PURE__ */ new Map());
    // metadata (自动 GC，不会泄漏)
    g(this, "meta", /* @__PURE__ */ new WeakMap());
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
class dt {
  constructor() {
    g(this, "elementManager", new pt());
    g(this, "loadingPromises", /* @__PURE__ */ new Map());
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
    const c = this.doLoadStyle(a, n, o, s);
    this.loadingPromises.set(a, c);
    try {
      await c;
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
    const s = n.map((a, c) => new Promise((d, i) => {
      const f = a.replace("__version__", o), m = this.createStyleLink(f)();
      m.onload = () => {
        console.debug(`已加载样式: %c${f}`, "color: green"), d();
      }, m.onerror = () => {
        console.error(`加载样式失败: ${f}`), document.head.removeChild(m), r ? (console.warn(`组件样式加载失败，继续执行: ${f}`), d()) : (console.error(`组件包样式加载失败: ${f}`, t), i(new Error(`加载样式失败: ${f}`)));
      }, this.elementManager.register(t, `style-${c}`, m), document.head.appendChild(m);
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
const w = new dt();
function ft(e) {
  return {
    title: e,
    name: e,
    modelType: "none"
  };
}
const h = {
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
}, j = {};
class mt {
  constructor() {
    g(this, "components", {});
    /**
     * TODO -- 组件包网关加载状态
     * 0 -- 未加载
     * 1 -- 加载中
     * 200 -- 已加载
     */
    g(this, "pkgGatewayLoading", {});
  }
  /**
   * 规范化组件名称，格式：包名@驼峰组件名
   */
  parseComponentName(t) {
    const [n, o] = t.split("@");
    return `${n}@${R(o)}`;
  }
  /**
   * 获取或注册组件。
   * TODO -- 获取或注册组件。
   * @param nameRaw 原始名称，如 'MuloLayer@TestComponent'
   * @param component 可选，如果传入则注册该组件
   */
  async component(t, n = null) {
    var i;
    const o = this.parseComponentName(t);
    if (n) {
      this.components[o] = n;
      return;
    }
    console.debug("component 加载组件", o);
    const [r, s] = o.split("@");
    if (!h[r] && P.length)
      if (this.pkgGatewayLoading[r] == 0 || this.pkgGatewayLoading[r] == null) {
        this.pkgGatewayLoading[r] = 1;
        try {
          const f = await ut(r);
          h[r] = f;
        } catch (f) {
          console.error("从网关加载组件包失败", r, f);
        }
      } else
        await Z(() => !!h[r]);
    if (!j[r]) {
      const f = await this.getPackage(r);
      this.registerComponents(h[r], f);
    }
    const a = h[r];
    a && a.styleCdn && a.styleCdn.length > 0 && a.styleImportCase === "use" && await w.loadStyle(r, a.styleCdn, a.version || "");
    const c = this.getComponentOption(o);
    c && c.styleImportCase === "use" && c.styleCdn && await w.loadStyle(o, c.styleCdn, ((i = h[r]) == null ? void 0 : i.version) || "");
    let d = this.components[o];
    if (d || (d = j[r][s]), !d)
      throw new Error(`未找到${o}`);
    return this.isAsyncComponent(r, s) ? (console.debug("加载异步组件", o), d()) : d;
  }
  /**
   * TODO -- 获取组件选项对象
   * @param item 组件选项或组件名称字符串
   * @returns 组件选项对象
   */
  getComponentOptionObject(t) {
    return typeof t == "string" ? ft(t) : t;
  }
  /**
   * 注册包内所有组件到 this.components
   * TODO -- 注册
   */
  registerComponents(t, n) {
    t.components.forEach((o) => {
      const r = this.getComponentOptionObject(o), s = R(r.name), a = `${t.name}@${s}`;
      this.components[a] = n[s];
    });
  }
  /**
   * TODO -- 获取组件选项对象
   * @param raw 组件名称字符串
   * @returns 组件选项对象
   */
  getComponentOption(t) {
    const n = this.parseComponentName(t), [o, r] = n.split("@"), s = h[o];
    if (!s) return;
    const a = s.components.find((c) => {
      const d = this.getComponentOptionObject(c);
      return R(d.name) === r;
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
    const o = h[t];
    if (!o) return !1;
    if (o.asyncComponents)
      return o.asyncComponents.includes(n);
    const r = o.components.find((s) => {
      const a = this.getComponentOptionObject(s);
      return R(a.name) === n;
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
    let n = h[t];
    if (!n) throw new Error(`组件包不存在: ${t}`);
    if (j[t])
      return j[t];
    if (n.type === "cdn") {
      if (n.loadStatus === -1 && (n.loadStatus = 0), n.loadStatus === 0) {
        n.loadStatus = 1;
        try {
          n.styleCdn && n.styleCdn.length > 0 && n.styleImportCase === "register" && await w.loadStyle(t, n.styleCdn, n.version || "");
          const o = await this.loadOnlineComponentPackage(n);
          j[t] = o, n.loadStatus = 200;
        } catch (o) {
          throw n.loadStatus = -1, o;
        }
      }
      n.loadStatus === 1 && await Z(() => !!j[t]);
    }
    return n.type === "local" && n.styleCdn && n.styleCdn.length > 0 && n.styleImportCase === "register" && await w.loadStyle(t, n.styleCdn, n.version || ""), j[t];
  }
  /**
   * TODO -- 手动添加本地组件包
   * @param cfg 组件包配置
   * @param data 组件包数据
   */
  addLocalPackage(t, n) {
    h[t.name] = t, j[t.name] = n, this.registerComponents(t, n);
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
    }, t), h[t.name] = t;
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
      const { title: r, name: s, version: a, cdn: c } = t;
      if (!c) {
        o(new Error(`组件库 ${s} 未设置 CDN 地址`));
        return;
      }
      const d = c.replace("__version__", a || ""), i = document.createElement("script");
      i.src = d, i.onload = () => {
        window[s] ? (console.debug(`已加载在线组件库: %c${s}`, "color: green"), n(window[s]), t.keepOfWindow || delete window[s]) : o(new Error(`组件未在全局命名空间中找到: ${s}`)), document.body.removeChild(i);
      }, i.onerror = () => {
        document.body.removeChild(i), o(new Error(`加载 ${r || s} 组件库失败`));
      }, document.body.appendChild(i);
    });
  }
  // TODO ## 加载
  // TODO ## 装载
}
const I = new mt(), gt = { class: "m-tip" }, Ae = /* @__PURE__ */ N({
  __name: "asyncLoading",
  setup(e) {
    const t = Ke();
    return console.log("loading instance", t), se({}), (n, o) => ($(), k("div", gt, " Loading... "));
  }
}), yt = {
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
class To {
  static typeof(t) {
    let n = Object.prototype.toString.call(t);
    return yt[n] || "unknow";
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
function ht(e) {
  return typeof e != "string" ? !1 : e.match(/^[a-zA-Z0-9-]+@[a-zA-Z0-9-_]+$/);
}
function Po(e) {
  console.log("%c设置组件包", "color:green;", e), I.addLocalPackage(e.packageConfig, e);
}
function ko(e) {
  console.debug("%c注册组件包", "color:green;", e), I.registerPackage(e);
}
async function xo(e, t, n) {
  return w.loadStyle(e, t || [], n);
}
function Ao(e) {
  w.unloadStyle(e);
}
function Eo(e) {
  return w.isStyleLoaded(e);
}
function Mo(e) {
  return w.getLoadedStyles(e);
}
function Lo() {
  w.unloadAllStyles();
}
function Io(e = 500) {
  return z({
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
function No(e) {
  return I.getComponentOption(e);
}
function Ee(e, t = {}) {
  e = I.parseComponentName(e);
  const n = Object.assign({
    // 定义组件加载失败时显示的组件
    errorComponent: function(o) {
      return `组件加载失败:${e}`;
    },
    // 定义组件加载时显示的加载组件
    loadingComponent: Ae
  }, t);
  return z({
    // 异步加载组件的函数
    loader: () => new Promise(async (o, r) => {
      try {
        console.debug("-- 加载组件:", e);
        let s = await I.component(e);
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
const bt = {
  key: 1,
  class: "m-component-error"
}, wt = { class: "error-msg" }, jt = {
  name: "lp-component",
  // 设置 inheritAttrs 为 false 以禁用默认的属性继承行为
  inheritAttrs: !1
}, G = /* @__PURE__ */ N({
  ...jt,
  props: {
    is: {
      type: [String, Object, Function],
      default: ""
    }
  },
  setup(e, { expose: t }) {
    const n = e, o = O(!1), r = O("");
    let s = null;
    const a = O(null), c = O(0), d = O(null);
    Se(() => n.is, (l, p) => {
      if (l !== p && c.value++, a.value = null, o.value = !1, r.value = "", s = null, !l) {
        d.value = null;
        return;
      }
      typeof l == "string" && ht(l) ? i(l) : d.value = le(l);
    }, { immediate: !0 });
    function i(l) {
      d.value = le(Ee(l, {
        loadingComponent: Ae,
        errorComponent: function(p) {
          return "";
        },
        onError: (p, y, b, V) => {
          console.error("onError", V), s = y, o.value = !0, r.value = `组件加载失败: ${p.message}`, b();
        }
      }));
    }
    function f() {
      o.value = !1, r.value = "", s == null || s();
    }
    Ze((l, p, y) => !1);
    const m = ae(), qe = Oe(), Be = _(() => Object.keys(m).reduce((l, p) => (p.startsWith("on") || (l[p] = m[p]), l), {})), We = _(() => Object.keys(m).reduce((l, p) => {
      if (p.startsWith("on")) {
        const y = p.slice(2).replace(/^\w/, (b) => b.toLowerCase());
        l[y] = m[p];
      }
      return l;
    }, {}));
    _(() => {
      const l = {};
      return "modelValue" in m && (l.modelValue = m.modelValue), l;
    }), _(() => {
      const l = {};
      return "onUpdate:modelValue" in m && (l["update:modelValue"] = m["onUpdate:modelValue"]), l;
    });
    const Ve = new Proxy({}, {
      get(l, p) {
        const y = a.value;
        return y == null ? void 0 : y[p];
      },
      set(l, p, y) {
        const b = a.value;
        return b ? (b[p] = y, !0) : !1;
      },
      has(l, p) {
        const y = a.value;
        return y ? p in y : !1;
      }
    });
    return t(Ve), (l, p) => ($(), k(Xe, null, [
      e.is ? ($(), Te(Pe(d.value), Qe({
        key: c.value,
        ref_key: "innerRef",
        ref: a
      }, Be.value, Ye(We.value)), et({ _: 2 }, [
        tt(ce(qe), (y, b) => ({
          name: b,
          fn: nt((V) => [
            ot(l.$slots, b, rt(st(V || {})))
          ])
        }))
      ]), 1040)) : ue("", !0),
      o.value ? ($(), k("div", bt, [
        K("div", wt, at(r.value), 1),
        K("button", {
          class: "btn btn-primary link",
          onClick: ct(f, ["stop"])
        }, "重试")
      ])) : ue("", !0)
    ], 64));
  }
});
let $t = {
  install: (e) => {
    e.component(G.name, G);
  }
};
const vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpComponent: G,
  default: $t
}, Symbol.toStringTag, { value: "Module" }));
var Me = typeof global == "object" && global && global.Object === Object && global, Ct = typeof self == "object" && self && self.Object === Object && self, v = Me || Ct || Function("return this")(), D = v.Symbol, Le = Object.prototype, _t = Le.hasOwnProperty, St = Le.toString, E = D ? D.toStringTag : void 0;
function Ot(e) {
  var t = _t.call(e, E), n = e[E];
  try {
    e[E] = void 0;
    var o = !0;
  } catch {
  }
  var r = St.call(e);
  return o && (t ? e[E] = n : delete e[E]), r;
}
var Tt = Object.prototype, Pt = Tt.toString;
function kt(e) {
  return Pt.call(e);
}
var xt = "[object Null]", At = "[object Undefined]", de = D ? D.toStringTag : void 0;
function A(e) {
  return e == null ? e === void 0 ? At : xt : de && de in Object(e) ? Ot(e) : kt(e);
}
function W(e) {
  return e != null && typeof e == "object";
}
var Ie = Array.isArray;
function Ne(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Et = "[object AsyncFunction]", Mt = "[object Function]", Lt = "[object GeneratorFunction]", It = "[object Proxy]";
function Fe(e) {
  if (!Ne(e))
    return !1;
  var t = A(e);
  return t == Mt || t == Lt || t == Et || t == It;
}
var H = v["__core-js_shared__"], fe = function() {
  var e = /[^.]+$/.exec(H && H.keys && H.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Nt(e) {
  return !!fe && fe in e;
}
var Ft = Function.prototype, Rt = Ft.toString;
function S(e) {
  if (e != null) {
    try {
      return Rt.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Ut = /[\\^$.*+?()[\]{}|]/g, zt = /^\[object .+?Constructor\]$/, Gt = Function.prototype, Dt = Object.prototype, qt = Gt.toString, Bt = Dt.hasOwnProperty, Wt = RegExp(
  "^" + qt.call(Bt).replace(Ut, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Vt(e) {
  if (!Ne(e) || Nt(e))
    return !1;
  var t = Fe(e) ? Wt : zt;
  return t.test(S(e));
}
function Ht(e, t) {
  return e == null ? void 0 : e[t];
}
function F(e, t) {
  var n = Ht(e, t);
  return Vt(n) ? n : void 0;
}
var X = F(v, "WeakMap"), Jt = 9007199254740991;
function Re(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Jt;
}
function Kt(e) {
  return e != null && Re(e.length) && !Fe(e);
}
var Zt = Object.prototype;
function Ue(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || Zt;
  return e === n;
}
var Xt = "[object Arguments]";
function me(e) {
  return W(e) && A(e) == Xt;
}
var ze = Object.prototype, Qt = ze.hasOwnProperty, Yt = ze.propertyIsEnumerable, en = me(/* @__PURE__ */ function() {
  return arguments;
}()) ? me : function(e) {
  return W(e) && Qt.call(e, "callee") && !Yt.call(e, "callee");
};
function tn() {
  return !1;
}
var Ge = typeof exports == "object" && exports && !exports.nodeType && exports, ge = Ge && typeof module == "object" && module && !module.nodeType && module, nn = ge && ge.exports === Ge, ye = nn ? v.Buffer : void 0, on = ye ? ye.isBuffer : void 0, rn = on || tn, sn = "[object Arguments]", an = "[object Array]", cn = "[object Boolean]", ln = "[object Date]", un = "[object Error]", pn = "[object Function]", dn = "[object Map]", fn = "[object Number]", mn = "[object Object]", gn = "[object RegExp]", yn = "[object Set]", hn = "[object String]", bn = "[object WeakMap]", wn = "[object ArrayBuffer]", jn = "[object DataView]", $n = "[object Float32Array]", vn = "[object Float64Array]", Cn = "[object Int8Array]", _n = "[object Int16Array]", Sn = "[object Int32Array]", On = "[object Uint8Array]", Tn = "[object Uint8ClampedArray]", Pn = "[object Uint16Array]", kn = "[object Uint32Array]", u = {};
u[$n] = u[vn] = u[Cn] = u[_n] = u[Sn] = u[On] = u[Tn] = u[Pn] = u[kn] = !0;
u[sn] = u[an] = u[wn] = u[cn] = u[jn] = u[ln] = u[un] = u[pn] = u[dn] = u[fn] = u[mn] = u[gn] = u[yn] = u[hn] = u[bn] = !1;
function xn(e) {
  return W(e) && Re(e.length) && !!u[A(e)];
}
function An(e) {
  return function(t) {
    return e(t);
  };
}
var De = typeof exports == "object" && exports && !exports.nodeType && exports, L = De && typeof module == "object" && module && !module.nodeType && module, En = L && L.exports === De, J = En && Me.process, he = function() {
  try {
    var e = L && L.require && L.require("util").types;
    return e || J && J.binding && J.binding("util");
  } catch {
  }
}(), be = he && he.isTypedArray, Mn = be ? An(be) : xn;
function Ln(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var In = Ln(Object.keys, Object), Nn = Object.prototype, Fn = Nn.hasOwnProperty;
function Rn(e) {
  if (!Ue(e))
    return In(e);
  var t = [];
  for (var n in Object(e))
    Fn.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var Q = F(v, "Map"), Y = F(v, "DataView"), ee = F(v, "Promise"), te = F(v, "Set"), we = "[object Map]", Un = "[object Object]", je = "[object Promise]", $e = "[object Set]", ve = "[object WeakMap]", Ce = "[object DataView]", zn = S(Y), Gn = S(Q), Dn = S(ee), qn = S(te), Bn = S(X), C = A;
(Y && C(new Y(new ArrayBuffer(1))) != Ce || Q && C(new Q()) != we || ee && C(ee.resolve()) != je || te && C(new te()) != $e || X && C(new X()) != ve) && (C = function(e) {
  var t = A(e), n = t == Un ? e.constructor : void 0, o = n ? S(n) : "";
  if (o)
    switch (o) {
      case zn:
        return Ce;
      case Gn:
        return we;
      case Dn:
        return je;
      case qn:
        return $e;
      case Bn:
        return ve;
    }
  return t;
});
var Wn = "[object String]";
function Vn(e) {
  return typeof e == "string" || !Ie(e) && W(e) && A(e) == Wn;
}
var Hn = "[object Map]", Jn = "[object Set]", Kn = Object.prototype, Zn = Kn.hasOwnProperty;
function Xn(e) {
  if (e == null)
    return !0;
  if (Kt(e) && (Ie(e) || typeof e == "string" || typeof e.splice == "function" || rn(e) || Mn(e) || en(e)))
    return !e.length;
  var t = C(e);
  if (t == Hn || t == Jn)
    return !e.size;
  if (Ue(e))
    return !Rn(e).length;
  for (var n in e)
    if (Zn.call(e, n))
      return !1;
  return !0;
}
const T = [];
function Fo(e) {
  T.find((n) => n.name === e.name) || T.push(e);
}
async function Qn(e) {
  var s;
  console.log("## 获取图标包", e);
  let t = null;
  for (let a in T) {
    let c = T[a];
    if (c.packages && ((s = c.packages) != null && s.includes(e))) {
      t = c;
      break;
    }
  }
  let n = t || T[0];
  if (!n)
    throw console.log("没有网关", e, T), new Error("没有网关");
  let o = await ie.post(n.url, {
    name: e
  });
  if (o.data.code !== 200)
    throw new Error(o.data.msg);
  if (!o.data.data.row)
    throw new Error("图标包不存在");
  return o.data.data.row;
}
const M = {}, U = {};
async function Yn(e) {
  let t = eo(e), n = M[t.package];
  if (n || (U[t.package] && await Z(() => !!M[t.package]), n = M[t.package]), !n)
    try {
      U[t.package] = 1, n = await Qn(t.package), M[t.package] = n, delete U[t.package];
    } catch (o) {
      throw delete U[t.package], console.error("加载图标包失败", o), o;
    }
  if (to(n), !n.icons[t.icon])
    throw console.error("图标不存在:", t), new Error("图标不存在");
  return n.icons[t.icon];
}
function Ro(e) {
  M[e.name] = e;
}
function eo(e) {
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
const q = {};
function to(e) {
  if (q[e.name])
    return;
  const t = document.createElement("style"), n = e.name || "iconfont", o = (e.data.woff2.startsWith("//"), e.data.woff2), r = (e.data.woff.startsWith("//"), e.data.woff), s = (e.data.truetype.startsWith("//"), e.data.truetype);
  t.innerHTML = `
        @font-face {
            font-family: '${n}';
            src: url('${o}') format('woff2'),
                 url('${r}') format('woff'),
                 url('${s}') format('truetype');
        }
    `, document.head.appendChild(t), q[e.name] = t, console.log("已挂载字体:", e.name);
}
function Uo(e) {
  const t = q[e.name];
  t && t.parentNode && (t.parentNode.removeChild(t), delete q[e.name], console.log("已卸载字体:", e.name));
}
const no = ["innerHTML"], oo = {
  name: "lp-icon"
}, ne = /* @__PURE__ */ N({
  ...oo,
  props: {
    is: { default: "loading" },
    size: { default: 12 },
    color: { default: "#000000" }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = t, o = ae(), r = {}, s = O(""), a = e;
    Se(() => a.is, async (i, f) => {
      if (i !== f) {
        if (r[i]) {
          s.value = "&#x" + r[i];
          return;
        }
        try {
          r[i] = await Yn(i), s.value = "&#x" + r[i];
        } catch (m) {
          console.error("加载图标失败", m);
        }
      }
    }, {
      // 初始化时加载图标
      immediate: !0
    });
    const c = _(() => {
      const { size: i, color: f } = a;
      let m = i;
      return Vn(i) && (m = parseInt(i, 10)), {
        fontSize: `${m}px`,
        color: f,
        display: "inline-flex",
        fontFamily: "'default'"
      };
    }), d = (i) => {
      n("click", i);
    };
    return (i, f) => ($(), k("i", {
      class: xe(["lp-icon", [ce(o).class]]),
      style: ke(c.value),
      innerHTML: s.value,
      onClick: d
    }, null, 14, no));
  }
}), ro = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, so = ["fill"], ao = ["xlink:href"], co = {
  name: "LpSvg"
}, io = /* @__PURE__ */ Object.assign(co, {
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
    const t = e, n = _(() => `#${t.icon}`), o = _(() => {
      const { size: r, color: s } = t;
      let a = `${r}`;
      return a = `${a.replace("px", "")}px`, {
        width: a,
        fill: s,
        height: a
      };
    });
    return (r, s) => ($(), k("svg", {
      class: xe([r.$attrs.class]),
      style: ke(o.value),
      fill: e.color,
      "aria-hidden": "true"
    }, [
      K("use", { "xlink:href": n.value }, null, 8, ao)
    ], 14, so));
  }
}), oe = /* @__PURE__ */ ro(io, [["__scopeId", "data-v-4508aad0"]]);
let lo = {
  install: (e) => {
    e.component(ne.name, ne), e.component(oe.name, oe);
  }
};
const uo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpIcon: ne,
  LpSvg: oe,
  default: lo
}, Symbol.toStringTag, { value: "Module" }));
function po(e) {
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
    ...po(e.slots)
  }), o && o.length > 0 && (r.default = () => o == null ? void 0 : o.map(B)), t.includes("@") ? pe(
    G,
    { ...n, is: t },
    r
  ) : pe(
    t,
    n || {},
    o == null ? void 0 : o.map(B)
  );
}
function fo(e, t) {
  console.log("useRenderComponent", e);
  const n = se({ layout: e });
  return N({
    name: "DynamicLayout",
    setup() {
      return console.log("useRenderComponent setup", n.layout), () => it("div", {}, n.layout.map((o) => B(o)));
    }
  });
}
const mo = { class: "lp-layout" }, go = {
  name: "LpLayout"
}, re = /* @__PURE__ */ N({
  ...go,
  props: {
    data: {
      type: [Object, Array],
      default: () => []
    }
  },
  setup(e) {
    const t = ae(), n = Oe();
    se({});
    const r = fo(e.data);
    return lt(() => {
      console.log(t), console.log("layout slots", n);
    }), (s, a) => ($(), k("div", mo, [
      ($(), Te(Pe(ce(r))))
    ]));
  }
});
let yo = {
  install: (e) => {
    e.component(re.name, re);
  }
};
const ho = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpLayout: re,
  default: yo
}, Symbol.toStringTag, { value: "Module" }));
function bo(e) {
  const t = /* @__PURE__ */ Object.assign({ "./lp-component/index.ts": vt, "./lp-icon/index.ts": uo, "./lp-layout/index.ts": ho });
  console.debug("%cglobalComponents", "color:green", t), Object.keys(t).forEach((n) => {
    const o = t[n].default;
    Xn(o) || e.use(o);
  });
}
function zo(e, t) {
  if (!e)
    throw new Error("Invalid component: " + e);
  if (typeof e == "string") {
    if (wo(e))
      return Ee(e);
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
    return z(() => e.then((n) => n.default || n));
  if (typeof e == "function") {
    const n = e();
    return n instanceof Promise || typeof n == "object" && "then" in n ? z(
      () => n.then((o) => o.default || o)
    ) : e;
  }
  throw new Error("Unknown component type: " + e);
}
function wo(e) {
  return e.includes("@");
}
function jo(e) {
  e = e || {};
  const t = ie.create({
    baseURL: e.baseURL,
    timeout: e.timeout || 1e4,
    headers: {
      ...e.headers || {}
    }
  });
  return e.requestInterceptors && t.interceptors.request.use(e.requestInterceptors, (n) => (console.log("request", { err: n }), Promise.reject(n))), e.responseInterceptors && t.interceptors.response.use(e.responseInterceptors, (n) => (console.log("response err", { err: n }), Promise.reject(n))), e.baseInterceptors && !(e.requestInterceptors || e.responseInterceptors) && (t.interceptors.request.use((n) => (console.log("request", { config: n }), n)), t.interceptors.response.use((n) => (console.log("response", { response: n }), n.data))), t;
}
class x extends Error {
  constructor(n, o = 0, r = {}) {
    super(n);
    g(this, "code");
    g(this, "data");
    g(this, "name", "LooplanException");
    this.code = o, this.data = r, Object.setPrototypeOf(this, x.prototype);
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
class $o {
  constructor(t, n) {
    g(this, "space");
    g(this, "modelName");
    this.space = t, this.modelName = n;
  }
  handleResult(t) {
    if (t.code !== 200)
      throw new x(t.msg || "请求失败", t.code, t.data);
  }
  /**
   * 列表数据
   * TODO list
   * @param params 其他参数
   */
  async list(t = {}) {
    const { instance: n } = this.space;
    let o = await n.post(`${this.modelName}.list`, {
      ...t
    });
    return {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o,
      list: o.data.list || []
    };
  }
  /**
   * 分页列表
   * TODO paginate
   * @param page 页码
   * @param psize 每页数量
   * @param params 其他参数
   */
  async paginate(t = 1, n = 10, o = {}) {
    const { instance: r } = this.space;
    let s = await r.post(`${this.modelName}.paginate`, {
      page: t,
      psize: n,
      ...o
    }), a = s.data.list, c = (a == null ? void 0 : a.data) || [];
    return delete a.list, {
      error: s.code === 200 ? null : {
        code: s.code,
        msg: s.msg || "请求失败"
      },
      result: s,
      list: c,
      pageStatus: a || {}
    };
  }
  /**
   * 大数据分页列表
   * TODO paginateX
   */
  async paginateX(t, n, o = {}) {
    const { instance: r } = this.space;
    let s = await r.post(`${this.modelName}.paginateX`, {
      lastIndex: t,
      options: n || null,
      ...o
    }), a = s.data.list, c = (a == null ? void 0 : a.data) || [];
    return delete a.list, {
      error: s.code === 200 ? null : {
        code: s.code,
        msg: s.msg || "请求失败"
      },
      result: s,
      list: c,
      pageStatus: a || {}
    };
  }
  /**
   * 保存
   * TODO save
   * @param data 要保存的数据
   * @param id 要保存的记录ID
   * @param params 其他参数
   */
  async save(t, n, o = {}) {
    const { instance: r } = this.space;
    let s = await r.post(`${this.modelName}.save`, {
      id: n,
      data: t,
      ...o
    });
    return {
      error: s.code === 200 ? null : {
        code: s.code,
        msg: s.msg || "请求失败"
      },
      result: s
    };
  }
  /**
   * 添加
   * TODO add
   * @param data 要添加的数据
   * @param params 其他参数
   */
  async add(t, n = {}) {
    const { instance: o } = this.space;
    let r = await o.post(`${this.modelName}.save`, {
      data: t,
      ...n
    });
    return {
      error: r.code === 200 ? null : {
        code: r.code,
        msg: r.msg || "请求失败"
      },
      result: r
    };
  }
  /**
   * 更新
   * TODO update
   * @param data 要更新的数据
   * @param id 要更新的记录ID
   * @param params 其他参数
   */
  async update(t, n, o = {}) {
    const { instance: r } = this.space;
    let s = await r.post(`${this.modelName}.save`, {
      id: n,
      data: t,
      ...o
    });
    return {
      error: s.code === 200 ? null : {
        code: s.code,
        msg: s.msg || "请求失败"
      },
      result: s
    };
  }
  /**
   * 删除
   * TODO delete
   * @param id 要删除的记录ID
   * @param params 其他参数
   */
  async delete(t, n = {}) {
    const { instance: o } = this.space;
    let r = await o.post(`${this.modelName}.delete`, {
      id: t,
      ...n
    });
    return {
      error: r.code === 200 ? null : {
        code: r.code,
        msg: r.msg || "请求失败"
      },
      result: r
    };
  }
  /**
   * 恢复删除
   * TODO restore
   * @param id 要恢复删除的记录ID
   * @param params 其他参数
   */
  async restore(t, n = {}) {
    const { instance: o } = this.space;
    let r = await o.post(`${this.modelName}.restore`, {
      id: t,
      ...n
    });
    return {
      error: r.code === 200 ? null : {
        code: r.code,
        msg: r.msg || "请求失败"
      },
      result: r
    };
  }
  /**
   * 详情
   * TODO row
   */
  async row(t, n = {}) {
    var s;
    const { instance: o } = this.space;
    let r = await o.post(`${this.modelName}.row`, {
      id: t,
      ...n
    });
    return {
      error: r.code === 200 ? null : {
        code: r.code,
        msg: r.msg || "请求失败"
      },
      result: r,
      row: ((s = r.data) == null ? void 0 : s.row) || {}
    };
  }
  /**
   * 保存选项
   * TODO saveOptions
   */
  async saveOptions(t, n = {}, o = {}) {
    const { instance: r } = this.space;
    let s = await r.post(`${this.modelName}.saveOptions`, {
      list: t,
      belong: n,
      ...o
    });
    return {
      error: s.code === 200 ? null : {
        code: s.code,
        msg: s.msg || "请求失败"
      },
      result: s
    };
  }
  /**
   * 统计数量
   * TODO count
   * @param filterOption 过滤选项
   * @param params 其他参数
   */
  async count(t = null, n = {}) {
    const { instance: o } = this.space;
    let r = await o.post(`${this.modelName}.count`, {
      filter: t,
      ...n
    });
    return {
      error: r.code === 200 ? null : {
        code: r.code,
        msg: r.msg || "请求失败"
      },
      result: r,
      count: r.data.count || 0
    };
  }
  /**
   * 保存字段
   * TODO saveField
   * 
   * @param id 数据ID
   * @param field 字段名
   * @param value 字段值
   * @param params 其他参数
   */
  async saveField(t, n, o, r = {}) {
    const { instance: s } = this.space;
    let a = await s.post(`${this.modelName}.saveField`, {
      id: t,
      field: n,
      value: o,
      ...r
    });
    return {
      error: a.code === 200 ? null : {
        code: a.code,
        msg: a.msg || "请求失败"
      },
      result: a
    };
  }
  /**
   * 检查是否存在
   * TODO exists
   */
  async exists(t = null, n = {}) {
    var s;
    const { instance: o } = this.space;
    let r = await o.post(`${this.modelName}.exists`, {
      filter: t,
      ...n
    });
    return {
      error: r.code === 200 ? null : {
        code: r.code,
        msg: r.msg || "请求失败"
      },
      result: r,
      exists: ((s = r.data) == null ? void 0 : s.isExist) || !1
    };
  }
  /**
   * 批量保存
   * TODO multiSave
   */
  async multiSave(t) {
    const { instance: n } = this.space;
    let o = await n.post(`${this.modelName}.multiSave`, {
      list: t
    });
    return {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o
    };
  }
  /**
   * 批量删除
   * TODO multiDelete
   */
  async multiDelete(t, n = {}) {
    const { instance: o } = this.space;
    let r = await o.post(`${this.modelName}.multiDelete`, {
      ids: t,
      ...n
    });
    return {
      error: r.code === 200 ? null : {
        code: r.code,
        msg: r.msg || "请求失败"
      },
      result: r
    };
  }
}
class Go {
  constructor(t) {
    g(this, "url");
    g(this, "options");
    /**
     * 实例化后的API客户端
     */
    g(this, "instance");
    this.url = t.url, this.options = t, this.createApiClient();
  }
  createApiClient() {
    this.instance = jo({
      baseURL: this.url,
      timeout: 1e4,
      headers: {},
      /**
      * 请求拦截器
      * @param config 请求配置
      * @returns 返回配置
      */
      requestInterceptors: (t) => {
        var r, s, a, c;
        t.headers["Content-Type"] || (t.headers["Content-Type"] = "application/json");
        const n = ((s = (r = this.options).provideToken) == null ? void 0 : s.call(r)) || "", o = this.options.tokenField || "Authorization";
        return n && (t.headers[o] = n), (c = (a = this.options).requestInterceptors) == null || c.call(a, t), t;
      },
      /**
       * 响应拦截器
       * @param response 响应数据
       * @returns 返回数据
       */
      responseInterceptors: (t) => t.data
    });
  }
  /**
   * 
   * @param name 模型名称(space/name)
   * @returns 模型API
   */
  useModel(t) {
    return new $o(this, t);
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
      return await this.instance.post(`/${r}`, o);
    } catch (s) {
      throw new x(s.message || "云对象调用失败", s.code || 0, s.data || {});
    }
  }
  /**
   * 调用云函数
   * @param name 云函数名称
   * @param params 调用参数
   */
  async callCloudFunction(t, n) {
    try {
      return await this.instance.post(`/${t}`, n);
    } catch (o) {
      throw new x(o.message || "云函数调用失败", o.code || 0, o.data || {});
    }
  }
}
const _e = /* @__PURE__ */ new Map(), Do = (e) => {
  if (!_e.has(e))
    throw new x(`模型空间 ${e} 不存在`);
  return _e.get(e);
};
function vo(e) {
  bo(e);
}
const qo = { install: vo };
export {
  M as IconPackages,
  To as JsDataType,
  x as LooplanException,
  G as LpComponent,
  ne as LpIcon,
  oe as LpSvg,
  $o as ModelClient,
  Go as ModelSpace,
  Io as asyncComponentDelay,
  jo as createApi,
  qo as default,
  P as gatewayOptions,
  No as getComponentOption,
  ut as getComponentPackage,
  Qn as getIconPackage,
  Mo as getLoadedStyles,
  T as iconGatewayOptions,
  vo as install,
  Eo as isStyleLoaded,
  Ee as loadComponent,
  Yn as loadIcon,
  xo as loadStyle,
  _e as modelSpaceMap,
  to as mountIconfont,
  ht as nameIsUseAsyncComponent,
  bo as registerLooplanComponents,
  ko as registerPackage,
  zo as resolveComponent,
  Po as setComponentPackage,
  Oo as setGateway,
  Fo as setIconGateway,
  Ro as setIconPackage,
  Lo as unloadAllStyles,
  Ao as unloadStyle,
  Uo as unmountIconfont,
  Do as useModelSpace
};
