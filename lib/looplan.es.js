var Ze = Object.defineProperty;
var Xe = (t, e, n) => e in t ? Ze(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var m = (t, e, n) => Xe(t, typeof e != "symbol" ? e + "" : e, n);
import { defineComponent as U, getCurrentInstance as Qe, reactive as ie, createElementBlock as A, openBlock as _, defineAsyncComponent as z, ref as k, watch as Te, markRaw as de, onErrorCaptured as Ye, useAttrs as ce, useSlots as ke, computed as S, Fragment as et, createBlock as Pe, createCommentVNode as pe, resolveDynamicComponent as xe, mergeProps as tt, toHandlers as nt, createSlots as rt, renderList as ot, unref as le, withCtx as st, renderSlot as at, normalizeProps as it, guardReactiveProps as ct, createElementVNode as X, toDisplayString as lt, withModifiers as ut, normalizeStyle as Ae, normalizeClass as Ee, h as dt, createVNode as fe, onMounted as pt } from "vue";
import ue from "axios";
function D(t, e = !0) {
  if (typeof t != "string")
    return "";
  let r = t.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^a-zA-Z0-9]+/g, " ").split(" ");
  r = r.filter((o) => o !== "");
  for (let o = 0; o < r.length; o++)
    o === 0 && !e ? r[o] = r[o].toLowerCase() : r[o] = r[o].charAt(0).toUpperCase() + r[o].slice(1).toLowerCase();
  return r.join("");
}
const x = [];
function Nr(t) {
  x.find((n) => n.name === t.name) || x.push(t);
}
async function ft(t) {
  var s;
  let e = null;
  for (let a in x) {
    let i = x[a];
    if (i.packages && ((s = i.packages) != null && s.includes(t))) {
      e = i;
      break;
    }
  }
  let n = e || x[0];
  if (!n)
    throw new Error("没有网关");
  let r = await ue.post(n.url, {
    name: t
  });
  if (r.data.code !== 200)
    throw new Error(r.data.msg);
  if (!r.data.data.row)
    throw new Error("组件包不存在");
  const o = r.data.data.row;
  return o.loadStatus = 0, o;
}
function Q(t, e = 100) {
  return new Promise((n) => {
    const r = setInterval(() => {
      t() && (clearInterval(r), n());
    }, e);
  });
}
class mt {
  constructor() {
    // group -> value -> HTMLElement
    m(this, "store", /* @__PURE__ */ new Map());
    // metadata (自动 GC，不会泄漏)
    m(this, "meta", /* @__PURE__ */ new WeakMap());
  }
  /**
   * 注册或更新元素
   * @param group 分组名称
   * @param value 元素值，可选
   * @param elementOrFn 元素实例或创建函数
   * @returns 注册或更新后的元素实例
   */
  register(e, n, r) {
    this.store.has(e) || this.store.set(e, /* @__PURE__ */ new Map());
    const o = this.store.get(e);
    o.has(n) && this.unload(e, n);
    const s = typeof r == "function" ? r() : r;
    return o.set(n, s), this.meta.set(s, { el: s, group: e, value: n }), s;
  }
  /**
   * 注销元素
   * @param group 分组名称
   * @param value 元素值，可选
   */
  unload(e, n) {
    const r = this.store.get(e);
    if (!r) return;
    if (n === void 0) {
      for (const [, s] of r)
        s.remove(), this.meta.delete(s);
      this.store.delete(e);
      return;
    }
    const o = r.get(n);
    o && (o.remove(), this.meta.delete(o), r.delete(n)), r.size === 0 && this.store.delete(e);
  }
  // 可选：取值
  get(e, n) {
    var r;
    return ((r = this.store.get(e)) == null ? void 0 : r.get(n)) ?? null;
  }
  // 可选：检查存在
  exists(e, n) {
    var r;
    return ((r = this.store.get(e)) == null ? void 0 : r.has(n)) ?? !1;
  }
  // 可选：列出组内容
  list(e) {
    var n;
    return Array.from(((n = this.store.get(e)) == null ? void 0 : n.values()) ?? []);
  }
  // 可选：卸载所有
  unloadAll() {
    for (const e of Array.from(this.store.keys()))
      this.unload(e);
  }
}
class yt {
  constructor() {
    m(this, "elementManager", new mt());
    m(this, "loadingPromises", /* @__PURE__ */ new Map());
  }
  /**
   * 解析样式名称，判断是组件包还是具体组件
   * @param name 样式名称，格式：包名 或 包名@组件名
   * @returns 解析结果
   */
  parseName(e) {
    const n = e.split("@");
    return n.length === 1 ? { packageName: n[0] } : { packageName: n[0], componentName: n[1] };
  }
  /**
   * 创建样式链接元素
   * @param href 样式链接地址
   * @returns 样式链接元素创建函数
   */
  createStyleLink(e) {
    return () => {
      const n = document.createElement("link");
      return n.rel = "stylesheet", n.href = e, n;
    };
  }
  /**
   * 加载样式
   * @param name 样式名称，格式：包名 或 包名@组件名
   * @param styleUrls 样式URL数组
   * @param version 版本号，用于替换__version__占位符
   * @returns Promise
   */
  async loadStyle(e, n, r = "") {
    const { packageName: o, componentName: s } = this.parseName(e), a = s ? `${o}@${s}` : o;
    if (this.loadingPromises.has(a))
      return console.debug(`样式正在加载中，等待完成: %c${a}`, "color: orange"), this.loadingPromises.get(a);
    if (this.isStyleLoaded(e)) {
      console.debug(`样式已加载，跳过: %c${a}`, "color: blue");
      return;
    }
    console.debug(`加载样式: %c${a}`, "color: red");
    const i = this.doLoadStyle(a, n, r, s);
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
  async doLoadStyle(e, n, r, o) {
    const s = n.map((a, i) => new Promise((u, p) => {
      const h = a.replace("__version__", r), f = this.createStyleLink(h)();
      f.onload = () => {
        console.debug(`已加载样式: %c${h}`, "color: green"), u();
      }, f.onerror = () => {
        console.error(`加载样式失败: ${h}`), document.head.removeChild(f), o ? (console.warn(`组件样式加载失败，继续执行: ${h}`), u()) : (console.error(`组件包样式加载失败: ${h}`, e), p(new Error(`加载样式失败: ${h}`)));
      }, this.elementManager.register(e, `style-${i}`, f), document.head.appendChild(f);
    }));
    console.log("loadPromises", n, s), await Promise.all(s);
  }
  /**
   * 卸载样式
   * @param name 样式名称，格式：包名 或 包名@组件名
   */
  unloadStyle(e) {
    const { packageName: n, componentName: r } = this.parseName(e);
    if (r) {
      const o = `${n}@${r}`;
      console.debug(`卸载组件样式: %c${o}`, "color: orange"), this.elementManager.unload(o);
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
  isStyleLoaded(e) {
    const { packageName: n, componentName: r } = this.parseName(e), o = r ? `${n}@${r}` : n;
    return this.elementManager.list(o).length > 0;
  }
  getLoadedStyles(e) {
    const { packageName: n, componentName: r } = this.parseName(e), o = r ? `${n}@${r}` : n;
    return this.elementManager.list(o);
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
const j = new yt();
function gt() {
  if (typeof document < "u") {
    const t = document.currentScript;
    if ((t == null ? void 0 : t.type) === "module")
      return !0;
  }
  try {
    return typeof import.meta < "u" && typeof import.meta.url == "string";
  } catch {
    return !1;
  }
}
const ht = gt(), bt = {
  /**
   * 模块加载模式
   * - 'es'：加载 ES 模块
   * - 'umd'：加载 UMD 模块
   * @default 'es'
   */
  mode: ht ? "es" : "umd"
};
class R {
  /**
   * 加载远程模块
   * - 优先按当前运行模式加载，无对应地址时自动回退
   * @param packageInfo 组件包配置
   * @returns {Promise<any>}
   */
  static async load(e) {
    const { mode: n, url: r } = R.resolveTarget(e);
    return n === "es" ? await R.loadES(r) : await R.loadUMD(r, e);
  }
  /**
   * 根据当前模式选择远程地址
   */
  static resolveTarget(e) {
    const n = e.version || "", r = {
      es: e.esCdn,
      umd: e.cdn
    }, o = bt.mode, s = o === "es" ? "umd" : "es", a = r[o] || r[s];
    if (!a)
      throw new Error(`组件库 ${e.name} 未设置可用的远程地址`);
    return {
      mode: r[o] ? o : s,
      url: a.replace("__version__", n)
    };
  }
  /**
   * 加载 ES 模块
   * @param url 模块URL
   * @returns 模块导出
   */
  static async loadES(e) {
    const n = await import(
      /* @vite-ignore */
      e
    );
    return n.default && Object.keys(n).length === 1 ? n.default : n;
  }
  /**
   * 加载 UMD 模块
   * @param url 模块URL
   * @returns 模块导出
   */
  static async loadUMD(e, n) {
    if (typeof document > "u")
      throw new Error(`当前环境不支持通过 UMD 方式加载组件库: ${n.name}`);
    return await new Promise((r, o) => {
      const s = document.head || document.body;
      if (!s) {
        o(new Error(`页面尚未准备好，无法加载组件库: ${n.name}`));
        return;
      }
      const a = document.createElement("script");
      a.src = e, a.async = !0, a.onload = () => {
        const i = window[n.name];
        if (s.removeChild(a), !i) {
          o(new Error(`组件未在全局命名空间中找到: ${n.name}`));
          return;
        }
        r(i), n.keepOfWindow || delete window[n.name];
      }, a.onerror = () => {
        s.removeChild(a), o(new Error(`加载 ${n.title || n.name} 组件库失败`));
      }, s.appendChild(a);
    });
  }
}
function wt(t) {
  return {
    title: t,
    name: t,
    modelType: "none"
  };
}
const b = {
  MuloLayer: {
    name: "MuloLayer",
    title: "MuloLayer",
    type: "cdn",
    version: "v1",
    cdn: "http://component.loqh.cn/mulo-layer/__version__/mulo-layer.umd.js",
    esCdn: "http://component.loqh.cn/mulo-layer/__version__/mulo-layer.es.js",
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
}, C = {};
class jt {
  constructor() {
    m(this, "components", {});
    /**
     * TODO -- 组件包网关加载状态
     * 0 -- 未加载
     * 1 -- 加载中
     * 200 -- 已加载
     */
    m(this, "pkgGatewayLoading", {});
  }
  /**
   * 规范化组件名称，格式：包名@驼峰组件名
   */
  parseComponentName(e) {
    const [n, r] = e.split("@");
    return `${n}@${D(r)}`;
  }
  /**
   * 获取或注册组件。
   * TODO -- 获取或注册组件。
   * @param nameRaw 原始名称，如 'MuloLayer@TestComponent'
   * @param component 可选，如果传入则注册该组件
   */
  async component(e, n = null) {
    var u;
    const r = this.parseComponentName(e);
    if (n) {
      this.components[r] = n;
      return;
    }
    const {
      row: o,
      componentOption: s,
      pkg: a,
      name: i
    } = await this.getMember(e);
    return s && s.styleImportCase === "use" && s.styleCdn && await j.loadStyle(r, s.styleCdn, ((u = b[a]) == null ? void 0 : u.version) || ""), this.isAsyncComponent(a, i) ? (console.debug("加载异步组件", r), o()) : o;
  }
  /**
   * TODO -- 获取组件
   * @param name 组件名称
   * @returns 组件
   */
  async getMember(e) {
    const n = this.parseComponentName(e);
    console.debug("component 加载组件", n);
    const [r, o] = n.split("@");
    if (!b[r] && x.length)
      if (this.pkgGatewayLoading[r] == 0 || this.pkgGatewayLoading[r] == null) {
        this.pkgGatewayLoading[r] = 1;
        try {
          const u = await ft(r);
          b[r] = u;
        } catch (u) {
          console.error("从网关加载组件包失败", r, u);
        }
      } else
        await Q(() => !!b[r]);
    if (!C[r]) {
      const u = await this.getPackage(r);
      this.registerComponents(b[r], u);
    }
    const s = b[r];
    s && s.styleCdn && s.styleCdn.length > 0 && s.styleImportCase === "use" && await j.loadStyle(r, s.styleCdn, s.version || "");
    const a = this.getComponentOption(n);
    let i = this.components[n];
    if (i || (i = C[r][o]), !i)
      throw new Error(`未找到${n}`);
    return {
      pkgConfig: s,
      componentOption: a,
      row: i,
      pkg: r,
      name: o
    };
  }
  /**
   * TODO -- 获取组件选项对象
   * @param item 组件选项或组件名称字符串
   * @returns 组件选项对象
   */
  getComponentOptionObject(e) {
    return typeof e == "string" ? wt(e) : e;
  }
  /**
   * 注册包内所有组件到 this.components
   * TODO -- 注册
   */
  registerComponents(e, n) {
    e.components.forEach((r) => {
      const o = this.getComponentOptionObject(r), s = D(o.name), a = `${e.name}@${s}`;
      this.components[a] = n[s];
    });
  }
  /**
   * TODO -- 获取组件选项对象
   * @param raw 组件名称字符串
   * @returns 组件选项对象
   */
  getComponentOption(e) {
    const n = this.parseComponentName(e), [r, o] = n.split("@"), s = b[r];
    if (!s) return;
    const a = s.components.find((i) => {
      const u = this.getComponentOptionObject(i);
      return D(u.name) === o;
    });
    return a ? this.getComponentOptionObject(a) : void 0;
  }
  /**
   * TODO -- 判断是否异步组件
   * @param pkg 包名
   * @param comp 组件名
   * @returns 
   */
  isAsyncComponent(e, n) {
    const r = b[e];
    if (!r) return !1;
    if (r.asyncComponents)
      return r.asyncComponents.includes(n);
    const o = r.components.find((s) => {
      const a = this.getComponentOptionObject(s);
      return D(a.name) === n;
    });
    return o ? !!this.getComponentOptionObject(o).isAsync : !1;
  }
  /**
   * TODO -- 异步加载组件包
   * 
   * @todo 加载组件文件到内存
   * @param packageName 组件包名称
   * @returns 组件包数据
   */
  async getPackage(e) {
    let n = b[e];
    if (!n) throw new Error(`组件包不存在: ${e}`);
    if (C[e])
      return C[e];
    if (n.type === "cdn") {
      if (n.loadStatus === -1 && (n.loadStatus = 0), n.loadStatus === 0) {
        n.loadStatus = 1;
        try {
          n.styleCdn && n.styleCdn.length > 0 && n.styleImportCase === "register" && await j.loadStyle(e, n.styleCdn, n.version || "");
          const r = await this.loadOnlineComponentPackage(n);
          C[e] = r, n.loadStatus = 200;
        } catch (r) {
          throw n.loadStatus = -1, r;
        }
      }
      n.loadStatus === 1 && await Q(() => !!C[e]);
    }
    return n.type === "local" && n.styleCdn && n.styleCdn.length > 0 && n.styleImportCase === "register" && await j.loadStyle(e, n.styleCdn, n.version || ""), C[e];
  }
  /**
   * TODO -- 手动添加本地组件包
   * @param cfg 组件包配置
   * @param data 组件包数据
   */
  addLocalPackage(e, n) {
    b[e.name] = e, C[e.name] = n, this.registerComponents(e, n);
  }
  /**
   * TODO -- 添加组件包配置
   * @param cfg 组件包配置
   */
  registerPackage(e) {
    e = Object.assign({
      loadStatus: 0,
      styleImportCase: "register"
      // 默认在注册时导入样式
    }, e), b[e.name] = e;
  }
  /**
   * TODO -- 通过远程地址加载组件包
   * @param packageInfo 组件包配置
   * @returns 组件包数据
   */
  async loadOnlineComponentPackage(e) {
    return await R.load(e);
  }
  // TODO ## 加载
  // TODO ## 装载
}
const O = new jt(), Ct = { class: "m-tip" }, Me = /* @__PURE__ */ U({
  __name: "asyncLoading",
  setup(t) {
    const e = Qe();
    return console.log("loading instance", e), ie({}), (n, r) => (_(), A("div", Ct, " Loading... "));
  }
}), _t = {
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
class vt {
  static typeof(e) {
    let n = Object.prototype.toString.call(e);
    return _t[n] || "unknow";
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
function Rr(t) {
  switch (t) {
    case "number":
      return 0;
    case "string":
      return "";
    case "bool":
      return !1;
    case "array":
      return [];
    case "object":
      return {};
    case "undefined":
      return;
    case "function":
      return null;
    case "regexp":
      return null;
    case "date":
      return "";
    case "symbol":
      return null;
    default:
      return null;
  }
}
function $t(t) {
  return typeof t != "string" ? !1 : t.match(/^[a-zA-Z0-9-]+@[a-zA-Z0-9-_]+$/);
}
function Ir(t) {
  O.addLocalPackage(t.packageConfig, t);
}
function Ur(t, e) {
  O.addLocalPackage(t, e);
}
function Fr(t) {
  O.registerPackage(t);
}
function Dr(t) {
  console.debug("%c注册组件包", "color:green;", t), O.registerPackage(t);
}
async function Gr(t, e, n) {
  return j.loadStyle(t, e || [], n);
}
function zr(t) {
  j.unloadStyle(t);
}
function Br(t) {
  return j.isStyleLoaded(t);
}
function qr(t) {
  return j.getLoadedStyles(t);
}
function Wr() {
  j.unloadAllStyles();
}
function Vr(t = 500) {
  return z({
    loader: () => new Promise(async (e, n) => {
      try {
        setTimeout(() => {
          e(function() {
            return "";
          });
        }, t);
      } catch (r) {
        n(r);
      }
    })
  });
}
function Hr(t) {
  return O.getComponentOption(t);
}
function Le(t, e = {}) {
  t = O.parseComponentName(t);
  const n = Object.assign({
    // 定义组件加载失败时显示的组件
    errorComponent: function(r) {
      return `组件加载失败:${t}`;
    },
    // 定义组件加载时显示的加载组件
    loadingComponent: Me
  }, e);
  return z({
    // 异步加载组件的函数
    loader: () => new Promise(async (r, o) => {
      try {
        console.debug("-- 加载组件:", t);
        let s = await O.component(t);
        if (!s) {
          o(new Error("组件不存在:" + t));
          return;
        }
        r(s);
      } catch (s) {
        o(s);
      }
    }),
    // 展开合并后的配置项
    ...n
  });
}
const St = {
  key: 1,
  class: "m-component-error"
}, Ot = { class: "error-msg" }, Tt = {
  name: "lp-component",
  // 设置 inheritAttrs 为 false 以禁用默认的属性继承行为
  inheritAttrs: !1
}, B = /* @__PURE__ */ U({
  ...Tt,
  props: {
    is: {
      type: [String, Object, Function],
      default: ""
    }
  },
  setup(t, { expose: e }) {
    const n = t, r = k(!1), o = k("");
    let s = null;
    const a = k(null), i = k(0), u = k(null);
    Te(() => n.is, (c, d) => {
      if (c !== d && i.value++, a.value = null, r.value = !1, o.value = "", s = null, !c) {
        u.value = null;
        return;
      }
      typeof c == "string" && $t(c) ? p(c) : u.value = de(c);
    }, { immediate: !0 });
    function p(c) {
      u.value = de(Le(c, {
        loadingComponent: Me,
        errorComponent: function(d) {
          return "";
        },
        onError: (d, g, w, J) => {
          console.error("onError", J), s = g, r.value = !0, o.value = `组件加载失败: ${d.message}`, w();
        }
      }));
    }
    function h() {
      r.value = !1, o.value = "", s == null || s();
    }
    Ye((c, d, g) => !1);
    const f = ce(), Ve = ke(), He = S(() => Object.keys(f).reduce((c, d) => (d.startsWith("on") || (c[d] = f[d]), c), {})), Je = S(() => Object.keys(f).reduce((c, d) => {
      if (d.startsWith("on")) {
        const g = d.slice(2).replace(/^\w/, (w) => w.toLowerCase());
        c[g] = f[d];
      }
      return c;
    }, {}));
    S(() => {
      const c = {};
      return "modelValue" in f && (c.modelValue = f.modelValue), c;
    }), S(() => {
      const c = {};
      return "onUpdate:modelValue" in f && (c["update:modelValue"] = f["onUpdate:modelValue"]), c;
    });
    const Ke = new Proxy({}, {
      get(c, d) {
        const g = a.value;
        return g == null ? void 0 : g[d];
      },
      set(c, d, g) {
        const w = a.value;
        return w ? (w[d] = g, !0) : !1;
      },
      has(c, d) {
        const g = a.value;
        return g ? d in g : !1;
      }
    });
    return e(Ke), (c, d) => (_(), A(et, null, [
      t.is ? (_(), Pe(xe(u.value), tt({
        key: i.value,
        ref_key: "innerRef",
        ref: a
      }, He.value, nt(Je.value)), rt({ _: 2 }, [
        ot(le(Ve), (g, w) => ({
          name: w,
          fn: st((J) => [
            at(c.$slots, w, it(ct(J || {})))
          ])
        }))
      ]), 1040)) : pe("", !0),
      r.value ? (_(), A("div", St, [
        X("div", Ot, lt(o.value), 1),
        X("button", {
          class: "btn btn-primary link",
          onClick: ut(h, ["stop"])
        }, "重试")
      ])) : pe("", !0)
    ], 64));
  }
});
let kt = {
  install: (t) => {
    t.component(B.name, B);
  }
};
const Pt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpComponent: B,
  default: kt
}, Symbol.toStringTag, { value: "Module" }));
var Ne = typeof global == "object" && global && global.Object === Object && global, xt = typeof self == "object" && self && self.Object === Object && self, v = Ne || xt || Function("return this")(), q = v.Symbol, Re = Object.prototype, At = Re.hasOwnProperty, Et = Re.toString, L = q ? q.toStringTag : void 0;
function Mt(t) {
  var e = At.call(t, L), n = t[L];
  try {
    t[L] = void 0;
    var r = !0;
  } catch {
  }
  var o = Et.call(t);
  return r && (e ? t[L] = n : delete t[L]), o;
}
var Lt = Object.prototype, Nt = Lt.toString;
function Rt(t) {
  return Nt.call(t);
}
var It = "[object Null]", Ut = "[object Undefined]", me = q ? q.toStringTag : void 0;
function M(t) {
  return t == null ? t === void 0 ? Ut : It : me && me in Object(t) ? Mt(t) : Rt(t);
}
function H(t) {
  return t != null && typeof t == "object";
}
var Ie = Array.isArray;
function Ue(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Ft = "[object AsyncFunction]", Dt = "[object Function]", Gt = "[object GeneratorFunction]", zt = "[object Proxy]";
function Fe(t) {
  if (!Ue(t))
    return !1;
  var e = M(t);
  return e == Dt || e == Gt || e == Ft || e == zt;
}
var K = v["__core-js_shared__"], ye = function() {
  var t = /[^.]+$/.exec(K && K.keys && K.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Bt(t) {
  return !!ye && ye in t;
}
var qt = Function.prototype, Wt = qt.toString;
function T(t) {
  if (t != null) {
    try {
      return Wt.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Vt = /[\\^$.*+?()[\]{}|]/g, Ht = /^\[object .+?Constructor\]$/, Jt = Function.prototype, Kt = Object.prototype, Zt = Jt.toString, Xt = Kt.hasOwnProperty, Qt = RegExp(
  "^" + Zt.call(Xt).replace(Vt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Yt(t) {
  if (!Ue(t) || Bt(t))
    return !1;
  var e = Fe(t) ? Qt : Ht;
  return e.test(T(t));
}
function en(t, e) {
  return t == null ? void 0 : t[e];
}
function F(t, e) {
  var n = en(t, e);
  return Yt(n) ? n : void 0;
}
var Y = F(v, "WeakMap"), tn = 9007199254740991;
function De(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= tn;
}
function nn(t) {
  return t != null && De(t.length) && !Fe(t);
}
var rn = Object.prototype;
function Ge(t) {
  var e = t && t.constructor, n = typeof e == "function" && e.prototype || rn;
  return t === n;
}
var on = "[object Arguments]";
function ge(t) {
  return H(t) && M(t) == on;
}
var ze = Object.prototype, sn = ze.hasOwnProperty, an = ze.propertyIsEnumerable, cn = ge(/* @__PURE__ */ function() {
  return arguments;
}()) ? ge : function(t) {
  return H(t) && sn.call(t, "callee") && !an.call(t, "callee");
};
function ln() {
  return !1;
}
var Be = typeof exports == "object" && exports && !exports.nodeType && exports, he = Be && typeof module == "object" && module && !module.nodeType && module, un = he && he.exports === Be, be = un ? v.Buffer : void 0, dn = be ? be.isBuffer : void 0, pn = dn || ln, fn = "[object Arguments]", mn = "[object Array]", yn = "[object Boolean]", gn = "[object Date]", hn = "[object Error]", bn = "[object Function]", wn = "[object Map]", jn = "[object Number]", Cn = "[object Object]", _n = "[object RegExp]", vn = "[object Set]", $n = "[object String]", Sn = "[object WeakMap]", On = "[object ArrayBuffer]", Tn = "[object DataView]", kn = "[object Float32Array]", Pn = "[object Float64Array]", xn = "[object Int8Array]", An = "[object Int16Array]", En = "[object Int32Array]", Mn = "[object Uint8Array]", Ln = "[object Uint8ClampedArray]", Nn = "[object Uint16Array]", Rn = "[object Uint32Array]", l = {};
l[kn] = l[Pn] = l[xn] = l[An] = l[En] = l[Mn] = l[Ln] = l[Nn] = l[Rn] = !0;
l[fn] = l[mn] = l[On] = l[yn] = l[Tn] = l[gn] = l[hn] = l[bn] = l[wn] = l[jn] = l[Cn] = l[_n] = l[vn] = l[$n] = l[Sn] = !1;
function In(t) {
  return H(t) && De(t.length) && !!l[M(t)];
}
function Un(t) {
  return function(e) {
    return t(e);
  };
}
var qe = typeof exports == "object" && exports && !exports.nodeType && exports, I = qe && typeof module == "object" && module && !module.nodeType && module, Fn = I && I.exports === qe, Z = Fn && Ne.process, we = function() {
  try {
    var t = I && I.require && I.require("util").types;
    return t || Z && Z.binding && Z.binding("util");
  } catch {
  }
}(), je = we && we.isTypedArray, Dn = je ? Un(je) : In;
function Gn(t, e) {
  return function(n) {
    return t(e(n));
  };
}
var zn = Gn(Object.keys, Object), Bn = Object.prototype, qn = Bn.hasOwnProperty;
function Wn(t) {
  if (!Ge(t))
    return zn(t);
  var e = [];
  for (var n in Object(t))
    qn.call(t, n) && n != "constructor" && e.push(n);
  return e;
}
var ee = F(v, "Map"), te = F(v, "DataView"), ne = F(v, "Promise"), re = F(v, "Set"), Ce = "[object Map]", Vn = "[object Object]", _e = "[object Promise]", ve = "[object Set]", $e = "[object WeakMap]", Se = "[object DataView]", Hn = T(te), Jn = T(ee), Kn = T(ne), Zn = T(re), Xn = T(Y), $ = M;
(te && $(new te(new ArrayBuffer(1))) != Se || ee && $(new ee()) != Ce || ne && $(ne.resolve()) != _e || re && $(new re()) != ve || Y && $(new Y()) != $e) && ($ = function(t) {
  var e = M(t), n = e == Vn ? t.constructor : void 0, r = n ? T(n) : "";
  if (r)
    switch (r) {
      case Hn:
        return Se;
      case Jn:
        return Ce;
      case Kn:
        return _e;
      case Zn:
        return ve;
      case Xn:
        return $e;
    }
  return e;
});
var Qn = "[object String]";
function Yn(t) {
  return typeof t == "string" || !Ie(t) && H(t) && M(t) == Qn;
}
var er = "[object Map]", tr = "[object Set]", nr = Object.prototype, rr = nr.hasOwnProperty;
function or(t) {
  if (t == null)
    return !0;
  if (nn(t) && (Ie(t) || typeof t == "string" || typeof t.splice == "function" || pn(t) || Dn(t) || cn(t)))
    return !t.length;
  var e = $(t);
  if (e == er || e == tr)
    return !t.size;
  if (Ge(t))
    return !Wn(t).length;
  for (var n in t)
    if (rr.call(t, n))
      return !1;
  return !0;
}
const P = [];
function Jr(t) {
  P.find((n) => n.name === t.name) || P.push(t);
}
async function sr(t) {
  var s;
  console.log("## 获取图标包", t);
  let e = null;
  for (let a in P) {
    let i = P[a];
    if (i.packages && ((s = i.packages) != null && s.includes(t))) {
      e = i;
      break;
    }
  }
  let n = e || P[0];
  if (!n)
    throw console.log("没有网关", t, P), new Error("没有网关");
  let r = await ue.post(n.url, {
    name: t
  });
  if (r.data.code !== 200)
    throw new Error(r.data.msg);
  if (!r.data.data.row)
    throw new Error("图标包不存在");
  return r.data.data.row;
}
const N = {}, G = {};
async function ar(t) {
  let e = ir(t), n = N[e.package];
  if (n || (G[e.package] && await Q(() => !!N[e.package]), n = N[e.package]), !n)
    try {
      G[e.package] = 1, n = await sr(e.package), N[e.package] = n, delete G[e.package];
    } catch (r) {
      throw delete G[e.package], console.error("加载图标包失败", r), r;
    }
  if (cr(n), !n.icons[e.icon])
    throw console.error("图标不存在:", e), new Error("图标不存在");
  return n.icons[e.icon];
}
function Kr(t) {
  N[t.name] = t;
}
function ir(t) {
  if (!t.includes("@"))
    return {
      package: "default",
      icon: t
    };
  let [e, n] = t.split("@");
  return {
    package: e,
    icon: n
  };
}
const W = {};
function cr(t) {
  if (W[t.name])
    return;
  const e = document.createElement("style"), n = t.name || "iconfont", r = (t.data.woff2.startsWith("//"), t.data.woff2), o = (t.data.woff.startsWith("//"), t.data.woff), s = (t.data.truetype.startsWith("//"), t.data.truetype);
  e.innerHTML = `
        @font-face {
            font-family: '${n}';
            src: url('${r}') format('woff2'),
                 url('${o}') format('woff'),
                 url('${s}') format('truetype');
        }
    `, document.head.appendChild(e), W[t.name] = e, console.log("已挂载字体:", t.name);
}
function Zr(t) {
  const e = W[t.name];
  e && e.parentNode && (e.parentNode.removeChild(e), delete W[t.name], console.log("已卸载字体:", t.name));
}
const lr = ["innerHTML"], ur = {
  name: "lp-icon"
}, oe = /* @__PURE__ */ U({
  ...ur,
  props: {
    is: { default: "loading" },
    size: { default: 12 },
    color: { default: "#000000" }
  },
  emits: ["click"],
  setup(t, { emit: e }) {
    const n = e, r = ce(), o = {}, s = k(""), a = t;
    Te(() => a.is, async (p, h) => {
      if (p !== h) {
        if (o[p]) {
          s.value = "&#x" + o[p];
          return;
        }
        try {
          o[p] = await ar(p), s.value = "&#x" + o[p];
        } catch (f) {
          console.error("加载图标失败", f);
        }
      }
    }, {
      // 初始化时加载图标
      immediate: !0
    });
    const i = S(() => {
      const { size: p, color: h } = a;
      let f = p;
      return Yn(p) && (f = parseInt(p, 10)), {
        fontSize: `${f}px`,
        color: h,
        display: "inline-flex",
        fontFamily: "'default'"
      };
    }), u = (p) => {
      n("click", p);
    };
    return (p, h) => (_(), A("i", {
      class: Ee(["lp-icon", [le(r).class]]),
      style: Ae(i.value),
      innerHTML: s.value,
      onClick: u
    }, null, 14, lr));
  }
}), dr = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, o] of e)
    n[r] = o;
  return n;
}, pr = ["fill"], fr = ["xlink:href"], mr = {
  name: "LpSvg"
}, yr = /* @__PURE__ */ Object.assign(mr, {
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
  setup(t) {
    const e = t, n = S(() => `#${e.icon}`), r = S(() => {
      const { size: o, color: s } = e;
      let a = `${o}`;
      return a = `${a.replace("px", "")}px`, {
        width: a,
        fill: s,
        height: a
      };
    });
    return (o, s) => (_(), A("svg", {
      class: Ee([o.$attrs.class]),
      style: Ae(r.value),
      fill: t.color,
      "aria-hidden": "true"
    }, [
      X("use", { "xlink:href": n.value }, null, 8, fr)
    ], 14, pr));
  }
}), se = /* @__PURE__ */ dr(yr, [["__scopeId", "data-v-4508aad0"]]);
let gr = {
  install: (t) => {
    t.component(oe.name, oe), t.component(se.name, se);
  }
};
const hr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpIcon: oe,
  LpSvg: se,
  default: gr
}, Symbol.toStringTag, { value: "Module" }));
function br(t) {
  let e = {};
  for (const n in t)
    e[n] = () => {
      var r;
      return (r = t[n]) == null ? void 0 : r.map(V);
    };
  return e;
}
function V(t) {
  if (typeof t == "string" || typeof t == "number") return t;
  const { component: e, props: n, children: r } = t;
  let o = {};
  return t.slots && (o = {
    ...o,
    ...br(t.slots)
  }), r && r.length > 0 && (o.default = () => r == null ? void 0 : r.map(V)), e.includes("@") ? fe(
    B,
    { ...n, is: e },
    o
  ) : fe(
    e,
    n || {},
    r == null ? void 0 : r.map(V)
  );
}
function wr(t, e) {
  console.log("useRenderComponent", t);
  const n = ie({ layout: t });
  return U({
    name: "DynamicLayout",
    setup() {
      return console.log("useRenderComponent setup", n.layout), () => dt("div", {}, n.layout.map((r) => V(r)));
    }
  });
}
const jr = { class: "lp-layout" }, Cr = {
  name: "LpLayout"
}, ae = /* @__PURE__ */ U({
  ...Cr,
  props: {
    data: {
      type: [Object, Array],
      default: () => []
    }
  },
  setup(t) {
    const e = ce(), n = ke();
    ie({});
    const o = wr(t.data);
    return pt(() => {
      console.log(e), console.log("layout slots", n);
    }), (s, a) => (_(), A("div", jr, [
      (_(), Pe(xe(le(o))))
    ]));
  }
});
let _r = {
  install: (t) => {
    t.component(ae.name, ae);
  }
};
const vr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpLayout: ae,
  default: _r
}, Symbol.toStringTag, { value: "Module" }));
function $r(t) {
  const e = /* @__PURE__ */ Object.assign({ "./lp-component/index.ts": Pt, "./lp-icon/index.ts": hr, "./lp-layout/index.ts": vr });
  console.debug("%cglobalComponents", "color:green", e), Object.keys(e).forEach((n) => {
    const r = e[n].default;
    or(r) || t.use(r);
  });
}
function Xr(t, e) {
  if (!t)
    throw new Error("Invalid component: " + t);
  if (typeof t == "string") {
    if (Sr(t))
      return Le(t);
    if (!e)
      throw new Error("获取全局组件失败：未提供 Vue 应用实例");
    const n = e.component(t);
    if (!n)
      throw new Error(`Component "${t}" not found in app registry`);
    return n;
  }
  if (typeof t == "object" && !("then" in t))
    return t;
  if (t instanceof Promise || typeof t == "object" && "then" in t)
    return z(() => t.then((n) => n.default || n));
  if (typeof t == "function") {
    const n = t();
    return n instanceof Promise || typeof n == "object" && "then" in n ? z(
      () => n.then((r) => r.default || r)
    ) : t;
  }
  throw new Error("Unknown component type: " + t);
}
function Sr(t) {
  return t.includes("@");
}
function Or(t) {
  return new Promise((e) => setTimeout(e, t));
}
class Tr {
  constructor(e, n) {
    m(this, "maxRetry");
    m(this, "delay");
    this.retryOption = e, this.createRawClient = n, this.maxRetry = e.maxRetry ?? 3, this.delay = e.delay ?? 1e3;
  }
  /**
   * 根据响应判断是否需要重试
   * @param response 响应数据
   * @returns 是否需要重试
   */
  async shouldRetryByResponse(e) {
    return this.retryOption.check ? await this.retryOption.check(e) : e.status >= 500 || e.status === 429 || e.status === 408;
  }
  /**
   * 发送请求并返回响应
   * @param rawClient 原始请求客户端
   * @param config 请求配置
   * @returns 响应数据
   */
  async requestAsResponse(e, n) {
    try {
      return await e.request(n);
    } catch (r) {
      const o = r == null ? void 0 : r.response;
      if (o)
        return o;
      throw r;
    }
  }
  /**
   * 执行重试
   * @param config 
   * @param initialResponse 
   * @returns 
   */
  async run(e, n) {
    const r = this.createRawClient();
    let o = n;
    for (; await this.shouldRetryByResponse(o); ) {
      const s = e.__retryCount ?? 0;
      if (s >= this.maxRetry || this.retryOption.handle && !await this.retryOption.handle(o))
        return o;
      e.__retryCount = s + 1, e.__isRetry = !0, this.delay > 0 && await Or(this.delay * e.__retryCount), o = await this.requestAsResponse(r, e);
    }
    return o;
  }
}
function We(t) {
  t = t || {};
  const e = {
    baseURL: t.baseURL,
    timeout: t.timeout || 1e4,
    headers: {
      ...t.headers || {}
    }
  }, n = ue.create(e);
  n.interceptors.request.use((o) => (t.requestInterceptors ? o = t.requestInterceptors(o) : t.baseInterceptors, o), (o) => Promise.reject(o));
  let r = null;
  return t.retry && (r = async (o) => {
    if (t.retry) {
      const s = t.retry;
      if (t.retry.check(o)) {
        const i = () => We({
          baseURL: t.baseURL,
          timeout: t.timeout,
          headers: t.headers,
          requestInterceptors: t.requestInterceptors,
          baseInterceptors: !1,
          __retryMode: !0
        }), u = new Tr(s, i), p = (o == null ? void 0 : o.config) || {};
        return await u.run(p, o);
      }
    }
    return o;
  }), t.__retryMode || n.interceptors.response.use(async (o) => {
    if (r && (o = await r(o)), t.responseInterceptors)
      return t.responseInterceptors(o);
    if (t.baseInterceptors)
      return o.data;
  }, async (o) => {
    if (console.log("response err", { err: o }), r && o && (o != null && o.response)) {
      let s = o == null ? void 0 : o.response;
      return s = await r(s), s;
    }
    return Promise.reject(o);
  }), n;
}
class E extends Error {
  constructor(n, r = 0, o = {}) {
    super(n);
    m(this, "code");
    m(this, "data");
    m(this, "name", "LooplanException");
    this.code = r, this.data = o, Object.setPrototypeOf(this, E.prototype);
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
function y(t) {
  return {
    error: {
      code: 500,
      msg: "请求失败"
    },
    ...t
  };
}
class kr {
  constructor(e, n) {
    m(this, "space");
    m(this, "modelName");
    this.space = e, this.modelName = n;
  }
  handleResult(e) {
    if (e.code !== 200)
      throw new E(e.msg || "请求失败", e.code, e.data);
  }
  /**
   * 列表数据
   * TODO list
   * @param params 其他参数
   */
  async list(e = {}) {
    const { instance: n } = this.space;
    let r = await n.post(`${this.modelName}.list`, {
      ...e
    });
    return r ? {
      error: r.code === 200 ? null : {
        code: r.code,
        msg: r.msg || "请求失败"
      },
      result: r,
      list: r.data.list || []
    } : y({ list: [], result: r });
  }
  /**
   * 分页列表
   * TODO paginate
   * @param page 页码
   * @param psize 每页数量
   * @param params 其他参数
   */
  async paginate(e = 1, n = 10, r = {}) {
    const { instance: o } = this.space;
    let s = await o.post(`${this.modelName}.paginate`, {
      page: e,
      psize: n,
      ...r
    });
    if (!s)
      return y({ list: [], result: s });
    let a = s.data.list, i = (a == null ? void 0 : a.data) || [];
    return delete a.list, {
      error: s.code === 200 ? null : {
        code: s.code,
        msg: s.msg || "请求失败"
      },
      result: s,
      list: i,
      pageStatus: a || {}
    };
  }
  /**
   * 大数据分页列表
   * TODO paginateX
   */
  async paginateX(e, n, r = {}) {
    const { instance: o } = this.space;
    let s = await o.post(`${this.modelName}.paginateX`, {
      lastIndex: e,
      options: n || null,
      ...r
    });
    if (!s)
      return y({ list: [], result: s });
    let a = s.data.list, i = (a == null ? void 0 : a.data) || [];
    return delete a.list, {
      error: s.code === 200 ? null : {
        code: s.code,
        msg: s.msg || "请求失败"
      },
      result: s,
      list: i,
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
  async save(e, n, r = {}) {
    const { instance: o } = this.space;
    let s = await o.post(`${this.modelName}.save`, {
      id: n,
      data: e,
      ...r
    });
    return s ? {
      error: s.code === 200 ? null : {
        code: s.code,
        msg: s.msg || "请求失败"
      },
      result: s
    } : y({ result: s });
  }
  /**
   * 添加
   * TODO add
   * @param data 要添加的数据
   * @param params 其他参数
   */
  async add(e, n = {}) {
    const { instance: r } = this.space;
    let o = await r.post(`${this.modelName}.save`, {
      data: e,
      ...n
    });
    return o ? {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o
    } : y({ result: o });
  }
  /**
   * 更新
   * TODO update
   * @param data 要更新的数据
   * @param id 要更新的记录ID
   * @param params 其他参数
   */
  async update(e, n, r = {}) {
    const { instance: o } = this.space;
    let s = await o.post(`${this.modelName}.save`, {
      id: n,
      data: e,
      ...r
    });
    return s ? {
      error: s.code === 200 ? null : {
        code: s.code,
        msg: s.msg || "请求失败"
      },
      result: s
    } : y({ result: s });
  }
  /**
   * 删除
   * TODO delete
   * @param id 要删除的记录ID
   * @param params 其他参数
   */
  async delete(e, n = {}) {
    const { instance: r } = this.space;
    let o = await r.post(`${this.modelName}.delete`, {
      id: e,
      ...n
    });
    return o ? {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o
    } : y({ result: o });
  }
  /**
   * 恢复删除
   * TODO restore
   * @param id 要恢复删除的记录ID
   * @param params 其他参数
   */
  async restore(e, n = {}) {
    const { instance: r } = this.space;
    let o = await r.post(`${this.modelName}.restore`, {
      id: e,
      ...n
    });
    return o ? {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o
    } : y({ result: o });
  }
  /**
   * 详情
   * TODO row
   */
  async row(e, n = {}) {
    var s;
    const { instance: r } = this.space;
    let o = await r.post(`${this.modelName}.row`, {
      id: e,
      ...n
    });
    return o ? {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o,
      row: ((s = o.data) == null ? void 0 : s.row) || {}
    } : y({ result: o, row: null });
  }
  /**
   * 保存选项
   * TODO saveOptions
   */
  async saveOptions(e, n = {}, r = {}) {
    const { instance: o } = this.space;
    let s = await o.post(`${this.modelName}.saveOptions`, {
      list: e,
      belong: n,
      ...r
    });
    return s ? {
      error: s.code === 200 ? null : {
        code: s.code,
        msg: s.msg || "请求失败"
      },
      result: s
    } : y({ result: s });
  }
  /**
   * 统计数量
   * TODO count
   * @param filterOption 过滤选项
   * @param params 其他参数
   */
  async count(e = null, n = {}) {
    const { instance: r } = this.space;
    let o = await r.post(`${this.modelName}.count`, {
      filter: e,
      ...n
    });
    return o ? {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o,
      count: o.data.count || 0
    } : y({ result: o, count: 0 });
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
  async saveField(e, n, r, o = {}) {
    const { instance: s } = this.space;
    let a = await s.post(`${this.modelName}.saveField`, {
      id: e,
      field: n,
      value: r,
      ...o
    });
    return a ? {
      error: a.code === 200 ? null : {
        code: a.code,
        msg: a.msg || "请求失败"
      },
      result: a
    } : y({ result: a });
  }
  /**
   * 检查是否存在
   * TODO exists
   */
  async exists(e = null, n = {}) {
    var s;
    const { instance: r } = this.space;
    let o = await r.post(`${this.modelName}.exists`, {
      filter: e,
      ...n
    });
    return o ? {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o,
      exists: ((s = o.data) == null ? void 0 : s.isExist) || !1
    } : y({ result: o });
  }
  /**
   * 批量保存
   * TODO multiSave
   */
  async multiSave(e) {
    const { instance: n } = this.space;
    let r = await n.post(`${this.modelName}.multiSave`, {
      list: e
    });
    return r ? {
      error: r.code === 200 ? null : {
        code: r.code,
        msg: r.msg || "请求失败"
      },
      result: r
    } : y({ result: r });
  }
  /**
   * 批量删除
   * TODO multiDelete
   */
  async multiDelete(e, n = {}) {
    const { instance: r } = this.space;
    let o = await r.post(`${this.modelName}.multiDelete`, {
      ids: e,
      ...n
    });
    return o ? {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o
    } : y({ result: o });
  }
}
class Qr {
  constructor(e) {
    m(this, "url");
    m(this, "options");
    /**
     * 实例化后的API客户端
     */
    m(this, "instance");
    this.url = e.url, this.options = e, this.createApiClient();
  }
  createApiClient() {
    let e;
    this.options.retry === !0 ? e = Pr() : vt.typeof(this.options.retry) === "object" && (e = this.options.retry), console.log("重试配置:", e), this.instance = We({
      baseURL: this.url,
      timeout: 1e4,
      headers: {},
      /**
      * 请求拦截器
      * @param config 请求配置
      * @returns 返回配置
      */
      requestInterceptors: async (n) => {
        var r, o, s, a;
        if (n.headers["Content-Type"] || (n.headers["Content-Type"] = "application/json"), this.options.provideToken) {
          const i = await ((o = (r = this.options).provideToken) == null ? void 0 : o.call(r, !!n.__isRetry)) || "", u = this.options.tokenField || "Authorization";
          i && (n.headers[u] = i);
        }
        return (a = (s = this.options).requestInterceptors) == null || a.call(s, n), n;
      },
      /**
       * 响应拦截器
       * @param response 响应数据
       * @returns 返回数据
       */
      responseInterceptors: async (n) => n.data,
      retry: e
    });
  }
  /**
   * 
   * @param name 模型名称(space/name)
   * @returns 模型API
   */
  useModel(e) {
    return new kr(this, e);
  }
  /**
   * 导入云函数
   * @param name 云函数名称
   */
  useCloudFunction(e, n) {
    return (r) => this.callCloudFunction(e, r, (n == null ? void 0 : n.config) || {});
  }
  /**
   * 调用云函数
   * @param name 云函数名称
   * @param params 调用参数
   */
  async callCloudFunction(e, n, r = {}) {
    try {
      return await this.instance.post(`/${e}`, n, r);
    } catch (o) {
      throw new E(o.message || "云函数调用失败", o.code || 0, o.data || {});
    }
  }
  /**
   * 导入云对象
   * @param name 云对象名称
   */
  useCloudObject(e, n) {
    n = Object.assign({
      args: !1
    }, n || {});
    const r = this;
    return new Proxy({}, {
      get(o, s) {
        if (s !== "then")
          return (...a) => {
            let i = a.length > 0 ? a[0] : {};
            return n.args && (i = {
              $params: a
            }), r.callCloudObject(e, s, i, n.config);
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
  async callCloudObject(e, n, r, o) {
    const s = `${e}.${n}`;
    try {
      return await this.instance.post(`/${s}`, r, o);
    } catch (a) {
      throw new E(a.message || "云对象调用失败", a.code || 0, a.data || {});
    }
  }
}
function Pr() {
  return {
    // 最大重试次数
    maxRetry: 3,
    // 重试延迟时间(毫秒)
    delay: 200,
    // 检查是否需要重试
    check: (t) => {
      var e;
      return t.status === 401 || ((e = t.data) == null ? void 0 : e.code) === 401;
    },
    // 处理重试
    handle: async (t) => {
      var e;
      try {
        if (((e = t.data) == null ? void 0 : e.code) === 401 || t.status === 401) {
          const n = xr("main");
          if (!n)
            return console.error("无法获取main空间实例"), !1;
          const o = await n.useCloudObject("Auth").dataToken();
          return o.code != 200 ? (console.error("获取dataToken失败:", o), !1) : (localStorage.setItem("dataToken", o.data.token), !0);
        }
      } catch (n) {
        console.error("处理重试时出错:", n);
      }
      return !1;
    }
  };
}
const Oe = /* @__PURE__ */ new Map(), xr = (t) => {
  if (!Oe.has(t))
    throw new E(`模型空间 ${t} 不存在`);
  return Oe.get(t);
};
function Ar(t) {
  $r(t);
}
const Yr = { install: Ar };
export {
  N as IconPackages,
  vt as JsDataType,
  E as LooplanException,
  B as LpComponent,
  oe as LpIcon,
  se as LpSvg,
  kr as ModelClient,
  Qr as ModelSpace,
  Vr as asyncComponentDelay,
  We as createApi,
  Yr as default,
  x as gatewayOptions,
  Hr as getComponentOption,
  ft as getComponentPackage,
  sr as getIconPackage,
  qr as getLoadedStyles,
  P as iconGatewayOptions,
  Ar as install,
  Br as isStyleLoaded,
  Le as loadComponent,
  ar as loadIcon,
  Gr as loadStyle,
  Oe as modelSpaceMap,
  cr as mountIconfont,
  $t as nameIsUseAsyncComponent,
  Fr as regPkg,
  $r as registerLooplanComponents,
  Dr as registerPackage,
  Xr as resolveComponent,
  Ir as setComponentPackage,
  Nr as setGateway,
  Jr as setIconGateway,
  Kr as setIconPackage,
  Ur as setPkg,
  Rr as typeDefaultValue,
  Wr as unloadAllStyles,
  zr as unloadStyle,
  Zr as unmountIconfont,
  xr as useModelSpace
};
