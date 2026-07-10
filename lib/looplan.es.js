import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createSlots as o, createVNode as s, defineAsyncComponent as c, defineComponent as l, getCurrentInstance as u, guardReactiveProps as d, h as f, markRaw as ee, mergeProps as te, normalizeClass as p, normalizeProps as ne, normalizeStyle as m, onErrorCaptured as re, onMounted as h, openBlock as g, reactive as _, ref as v, renderList as ie, renderSlot as ae, resolveDynamicComponent as oe, toDisplayString as se, toHandlers as ce, unref as le, useAttrs as y, useSlots as ue, watch as de, withCtx as fe, withModifiers as pe } from "vue";
import b from "axios";
//#region \0rolldown/runtime.js
var x = Object.defineProperty, S = (e, t) => {
	let n = {};
	for (var r in e) x(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || x(n, Symbol.toStringTag, { value: "Module" }), n;
};
//#endregion
//#region src/lib/string/index.ts
function C(e, t = !0) {
	if (typeof e != "string") return "";
	let n = e.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^a-zA-Z0-9]+/g, " ").split(" ");
	n = n.filter((e) => e !== "");
	for (let e = 0; e < n.length; e++) e === 0 && !t ? n[e] = n[e].toLowerCase() : n[e] = n[e].charAt(0).toUpperCase() + n[e].slice(1).toLowerCase();
	return n.join("");
}
//#endregion
//#region src/loader/component/lib/ComponentGateway.ts
var w = [];
function me(e) {
	w.find((t) => t.name === e.name) || w.push(e);
}
async function he(e) {
	let t = null;
	for (let n in w) {
		let r = w[n];
		if (r.packages && r.packages?.includes(e)) {
			t = r;
			break;
		}
	}
	let n = t || w[0];
	if (!n) throw Error("没有网关");
	let r = await b.post(n.url, { name: e });
	if (r.data.code !== 200) throw Error(r.data.msg);
	if (!r.data.data.row) throw Error("组件包不存在");
	let i = r.data.data.row;
	return i.loadStatus = 0, i;
}
//#endregion
//#region src/lib/index.ts
function ge(e, t = 100) {
	return new Promise((n) => {
		let r = setInterval(() => {
			e() && (clearInterval(r), n());
		}, t);
	});
}
//#endregion
//#region src/lib/ElementManager.ts
var _e = class {
	store = /* @__PURE__ */ new Map();
	meta = /* @__PURE__ */ new WeakMap();
	register(e, t, n) {
		this.store.has(e) || this.store.set(e, /* @__PURE__ */ new Map());
		let r = this.store.get(e);
		r.has(t) && this.unload(e, t);
		let i = typeof n == "function" ? n() : n;
		return r.set(t, i), this.meta.set(i, {
			el: i,
			group: e,
			value: t
		}), i;
	}
	unload(e, t) {
		let n = this.store.get(e);
		if (!n) return;
		if (t === void 0) {
			for (let [, e] of n) e.remove(), this.meta.delete(e);
			this.store.delete(e);
			return;
		}
		let r = n.get(t);
		r && (r.remove(), this.meta.delete(r), n.delete(t)), n.size === 0 && this.store.delete(e);
	}
	get(e, t) {
		return this.store.get(e)?.get(t) ?? null;
	}
	exists(e, t) {
		return this.store.get(e)?.has(t) ?? !1;
	}
	list(e) {
		return Array.from(this.store.get(e)?.values() ?? []);
	}
	unloadAll() {
		for (let e of Array.from(this.store.keys())) this.unload(e);
	}
}, T = new class {
	elementManager = new _e();
	loadingPromises = /* @__PURE__ */ new Map();
	parseName(e) {
		let t = e.split("@");
		return t.length === 1 ? { packageName: t[0] } : {
			packageName: t[0],
			componentName: t[1]
		};
	}
	createStyleLink(e) {
		return () => {
			let t = document.createElement("link");
			return t.rel = "stylesheet", t.href = e, t;
		};
	}
	async loadStyle(e, t, n = "") {
		let { packageName: r, componentName: i } = this.parseName(e), a = i ? `${r}@${i}` : r;
		if (this.loadingPromises.has(a)) return this.loadingPromises.get(a);
		if (this.isStyleLoaded(e)) return;
		let o = this.doLoadStyle(a, t, n, i);
		this.loadingPromises.set(a, o);
		try {
			await o;
		} finally {
			this.loadingPromises.delete(a);
		}
	}
	async doLoadStyle(e, t, n, r) {
		let i = t.map((t, i) => new Promise((a, o) => {
			let s = t.replace("__version__", n), c = this.createStyleLink(s)();
			c.onload = () => {
				console.debug(`已加载样式: %c${s}`, "color: green"), a();
			}, c.onerror = () => {
				console.error(`加载样式失败: ${s}`), document.head.removeChild(c), r ? (console.warn(`组件样式加载失败，继续执行: ${s}`), a()) : (console.error(`组件包样式加载失败: ${s}`, e), o(/* @__PURE__ */ Error(`加载样式失败: ${s}`)));
			}, this.elementManager.register(e, `style-${i}`, c), document.head.appendChild(c);
		}));
		console.log("loadPromises", t, i), await Promise.all(i);
	}
	unloadStyle(e) {
		let { packageName: t, componentName: n } = this.parseName(e);
		if (n) {
			let e = `${t}@${n}`;
			console.debug(`卸载组件样式: %c${e}`, "color: orange"), this.elementManager.unload(e);
		} else console.debug(`卸载组件包样式: %c${t}`, "color: orange"), this.elementManager.unload(t), this.getAllGroups().forEach((e) => {
			e.startsWith(`${t}@`) && this.elementManager.unload(e);
		});
	}
	isStyleLoaded(e) {
		let { packageName: t, componentName: n } = this.parseName(e), r = n ? `${t}@${n}` : t;
		return this.elementManager.list(r).length > 0;
	}
	getLoadedStyles(e) {
		let { packageName: t, componentName: n } = this.parseName(e), r = n ? `${t}@${n}` : t;
		return this.elementManager.list(r);
	}
	getAllGroups() {
		return [];
	}
	unloadAllStyles() {
		console.debug("卸载所有样式", "color: red"), this.elementManager.unloadAll();
	}
}(), ve = { mode: "es" }, ye = class e {
	static scriptLoadingMap = {};
	static async load(t) {
		return ve.mode === "es" ? await e.loadES(t) : await e.loadUMD(t);
	}
	static async loadES(e) {
		return await import(
			/* @vite-ignore */
			e
);
	}
	static async loadUMD(t) {
		if (document.querySelector(`script[data-looplan-src="${t}"]`)) return;
		let n = e.scriptLoadingMap[t];
		if (n) return await n;
		let r = new Promise((n, r) => {
			let i = document.createElement("script");
			i.src = t, i.async = !0, i.dataset.looplanSrc = t, i.onload = () => {
				n(), delete e.scriptLoadingMap[t];
			}, i.onerror = () => {
				delete e.scriptLoadingMap[t], r(/* @__PURE__ */ Error(`加载远程脚本失败: ${t}`));
			}, document.body.appendChild(i);
		});
		return e.scriptLoadingMap[t] = r, await r;
	}
}, E = {}, D = {}, be = class {
	components = {};
	pkgGatewayLoading = {};
	parseComponentName(e) {
		let [t, n] = e.split("@");
		return `${t}@${C(n)}`;
	}
	async component(e, t = null) {
		let n = this.parseComponentName(e);
		if (t) {
			this.components[n] = t;
			return;
		}
		console.log("getMember");
		let { row: r, componentOption: i, pkg: a, name: o } = await this.getMember(e);
		return console.log("getMember success"), i && i.styleImportCase === "use" && i.styleCdn && (await T.loadStyle(n, i.styleCdn, E[a]?.version || ""), console.log("loadStyle success")), this.isAsyncComponent(a, o) ? (console.debug("加载异步组件", n), r()) : r;
	}
	async getMember(e) {
		let t = this.parseComponentName(e), [n, r] = t.split("@");
		if (!E[n] && w.length) {
			let e = this.pkgGatewayLoading[n];
			if (e === 1) {
				if (await ge(() => {
					let e = this.pkgGatewayLoading[n];
					return !!E[n] || e === -1 || e === 200;
				}), !E[n]) throw Error(`从网关加载组件包失败: ${n}`);
			} else {
				e === -1 && (this.pkgGatewayLoading[n] = 0), this.pkgGatewayLoading[n] = 1;
				try {
					let e = await he(n);
					if (!e) throw Error(`从网关加载组件包失败: ${n}`);
					E[n] = e, this.pkgGatewayLoading[n] = 200;
				} catch (e) {
					throw this.pkgGatewayLoading[n] = -1, console.error("从网关加载组件包失败", n), e;
				}
			}
		}
		if (!D[n]) {
			let e = await this.getPackage(n);
			this.registerComponents(E[n], e);
		}
		let i = E[n];
		i && i.styleCdn && i.styleCdn.length > 0 && i.styleImportCase === "use" && await T.loadStyle(n, i.styleCdn, i.version || "");
		let a = this.getComponentOption(t), o = this.components[t];
		if (o ||= D[n][r], !o) throw Error(`未找到${t}`);
		return {
			pkgConfig: i,
			componentOption: a,
			row: o,
			pkg: n,
			name: r
		};
	}
	getComponentOptionObject(e) {
		return typeof e == "string" ? xe(e) : e;
	}
	registerComponents(e, t) {
		e.components.forEach((n) => {
			let r = C(this.getComponentOptionObject(n).name), i = `${e.name}@${r}`;
			this.components[i] = t[r];
		});
	}
	getComponentOption(e) {
		let [t, n] = this.parseComponentName(e).split("@"), r = E[t];
		if (!r) return;
		let i = r.components.find((e) => C(this.getComponentOptionObject(e).name) === n);
		return i ? this.getComponentOptionObject(i) : void 0;
	}
	isAsyncComponent(e, t) {
		let n = E[e];
		if (!n) return !1;
		if (n.asyncComponents) return n.asyncComponents.includes(t);
		let r = n.components.find((e) => C(this.getComponentOptionObject(e).name) === t);
		return r ? !!this.getComponentOptionObject(r).isAsync : !1;
	}
	async getPackage(e) {
		let t = E[e];
		if (!t) throw Error(`组件包不存在: ${e}`);
		if (D[e]) return D[e];
		if (t.type === "cdn") {
			if (t.loadStatus === -1 && (t.loadStatus = 0), t.loadStatus === 0) {
				t.loadStatus = 1;
				try {
					t.styleCdn && t.styleCdn.length > 0 && t.styleImportCase === "register" && await T.loadStyle(e, t.styleCdn, t.version || ""), D[e] = await this.loadOnlineComponentPackage(t), t.loadStatus = 200;
				} catch (e) {
					throw t.loadStatus = -1, e;
				}
			}
			if (t.loadStatus === 1 && (await ge(() => !!D[e] || t.loadStatus === -1), !D[e])) throw Error(`加载组件包失败: ${e}`);
		}
		return t.type === "local" && t.styleCdn && t.styleCdn.length > 0 && t.styleImportCase === "register" && await T.loadStyle(e, t.styleCdn, t.version || ""), D[e];
	}
	addLocalPackage(e, t) {
		E[e.name] = e, D[e.name] = t, this.registerComponents(e, t);
	}
	registerPackage(e) {
		e = Object.assign({
			loadStatus: 0,
			styleImportCase: "register"
		}, e), E[e.name] = e;
	}
	loadOnlineComponentPackage(e) {
		return new Promise(async (t, n) => {
			try {
				let { title: r, name: i, version: a, cdn: o, esCdn: s } = e, c = ve.mode === "es", l = c && s || o;
				if (!l) {
					n(/* @__PURE__ */ Error(`组件库 ${i} 未设置 ${c ? "ESM" : "CDN"} 地址`));
					return;
				}
				let u = l.replace("__version__", a || ""), d = await ye.load(u);
				if (c) {
					t(d && d.default && typeof d.default == "object" ? d.default : d);
					return;
				}
				if (!window[i]) {
					n(/* @__PURE__ */ Error(`组件未在全局命名空间中找到: ${i}`));
					return;
				}
				console.debug(`已加载在线组件库: %c${i}`, "color: green"), t(window[i]), e.keepOfWindow || delete window[i];
			} catch (t) {
				n(/* @__PURE__ */ Error(`加载 ${e.title || e.name} 组件库失败: ${t?.message || t}`));
			}
		});
	}
};
function xe(e) {
	return {
		title: e,
		name: e,
		modelType: "none"
	};
}
var O = new be(), Se = { class: "looplan-loading" }, Ce = /* @__PURE__ */ l({
	__name: "asyncLoading",
	setup(e) {
		let t = u();
		return console.log("loading instance", t), _({}), (e, t) => (g(), i("div", Se, " Loading... "));
	}
}), we = {
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
}, Te = class {
	static typeof(e) {
		return we[Object.prototype.toString.call(e)] || "unknow";
	}
	static isArray(e) {
		return Object.prototype.toString.call(e) === "[object Array]";
	}
	static isEmpty(e) {
		return e == null ? !0 : typeof e == "string" ? e.trim() === "" : Array.isArray(e) ? e.length === 0 : typeof e == "object" ? Object.keys(e).length === 0 : !1;
	}
	static copyObj(e) {
		return JSON.parse(JSON.stringify(e));
	}
};
function Ee(e) {
	switch (e) {
		case "number": return 0;
		case "string": return "";
		case "bool": return !1;
		case "array": return [];
		case "object": return {};
		case "undefined": return;
		case "function": return null;
		case "regexp": return null;
		case "date": return "";
		case "symbol": return null;
		default: return null;
	}
}
//#endregion
//#region src/loader/component/index.ts
function De(e) {
	return typeof e == "string" ? e.match(/^[a-zA-Z0-9-]+@[a-zA-Z0-9-_]+$/) : !1;
}
function Oe(e) {
	O.addLocalPackage(e.packageConfig, e);
}
function ke(e, t) {
	O.addLocalPackage(e, t);
}
function Ae(e) {
	O.registerPackage(e);
}
function je(e) {
	console.debug("%c注册组件包", "color:green;", e), O.registerPackage(e);
}
async function Me(e, t, n) {
	return T.loadStyle(e, t || [], n);
}
function Ne(e) {
	T.unloadStyle(e);
}
function Pe(e) {
	return T.isStyleLoaded(e);
}
function Fe(e) {
	return T.getLoadedStyles(e);
}
function Ie() {
	T.unloadAllStyles();
}
function Le(e = 500) {
	return c({ loader: () => new Promise(async (t, n) => {
		try {
			setTimeout(() => {
				t(function() {
					return "";
				});
			}, e);
		} catch (e) {
			n(e);
		}
	}) });
}
function Re(e) {
	return O.getComponentOption(e);
}
function ze(e, t = {}) {
	return e = O.parseComponentName(e), c({
		loader: () => new Promise(async (t, n) => {
			try {
				let r = await O.component(e);
				if (!r) {
					n(/* @__PURE__ */ Error("组件不存在:" + e));
					return;
				}
				t(r);
			} catch (e) {
				n(e);
			}
		}),
		...Object.assign({
			errorComponent: function(t) {
				return `组件加载失败:${e}`;
			},
			loadingComponent: Ce
		}, t)
	});
}
//#endregion
//#region src/components/lp-component/src/lp-component.vue?vue&type=script&setup=true&lang.ts
var Be = {
	key: 1,
	class: "lp-component-error"
}, Ve = { class: "error-msg" }, k = /* @__PURE__ */ l({
	name: "lp-component",
	inheritAttrs: !1,
	props: { is: {
		type: [
			String,
			Object,
			Function
		],
		default: ""
	} },
	setup(s, { expose: c }) {
		let l = s, u = v(!1), f = v(""), p = null, m = v(!1), h = v(null), _ = v(0), b = v(null);
		de(() => l.is, (e, t) => {
			if (e !== t && _.value++, h.value = null, u.value = !1, f.value = "", p = null, !e) {
				b.value = null;
				return;
			}
			typeof e == "string" && De(e) ? x(e) : b.value = ee(e);
		}, { immediate: !0 });
		function x(e) {
			b.value = ee(ze(e, {
				loadingComponent: Ce,
				errorComponent: function(e) {
					return "";
				},
				onError: (e, t, n, r) => {
					console.error("onError", r), p = t, u.value = !0, f.value = `error: ${e.message}`, n();
				}
			}));
		}
		async function S() {
			if (!m.value) {
				m.value = !0, u.value = !1, f.value = "";
				try {
					p?.();
				} finally {
					m.value = !1;
				}
			}
		}
		re((e, t, n) => (console.error(`err of ${l.is}`), console.error("onErrorCaptured", e), !1));
		let C = y(), w = ue(), me = t(() => Object.keys(C).reduce((e, t) => (t.startsWith("on") || (e[t] = C[t]), e), {})), he = t(() => Object.keys(C).reduce((e, t) => {
			if (t.startsWith("on")) {
				let n = t.slice(2).replace(/^\w/, (e) => e.toLowerCase());
				e[n] = C[t];
			}
			return e;
		}, {}));
		return t(() => {
			let e = {};
			return "modelValue" in C && (e.modelValue = C.modelValue), e;
		}), t(() => {
			let e = {};
			return "onUpdate:modelValue" in C && (e["update:modelValue"] = C["onUpdate:modelValue"]), e;
		}), c(new Proxy({}, {
			get(e, t) {
				return h.value?.[t];
			},
			set(e, t, n) {
				let r = h.value;
				return r ? (r[t] = n, !0) : !1;
			},
			has(e, t) {
				let n = h.value;
				return n ? t in n : !1;
			}
		})), (t, c) => (g(), i(e, null, [s.is ? (g(), n(oe(b.value), te({
			key: _.value,
			ref_key: "innerRef",
			ref: h
		}, me.value, ce(he.value)), o({ _: 2 }, [ie(le(w), (e, n) => ({
			name: n,
			fn: fe((e) => [ae(t.$slots, n, ne(d(e || {})))])
		}))]), 1040)) : r("", !0), u.value ? (g(), i("div", Be, [a("div", Ve, se(f.value), 1), a("button", {
			class: "btn btn-primary link",
			onClick: pe(S, ["stop"])
		}, "重试")])) : r("", !0)], 64));
	}
}), He = /* @__PURE__ */ S({
	LpComponent: () => k,
	default: () => Ue
}), Ue = { install: (e) => {
	e.component(k.name, k);
} }, We = typeof global == "object" && global && global.Object === Object && global, Ge = typeof self == "object" && self && self.Object === Object && self, A = We || Ge || Function("return this")(), j = A.Symbol, Ke = Object.prototype, qe = Ke.hasOwnProperty, Je = Ke.toString, M = j ? j.toStringTag : void 0;
function Ye(e) {
	var t = qe.call(e, M), n = e[M];
	try {
		e[M] = void 0;
		var r = !0;
	} catch {}
	var i = Je.call(e);
	return r && (t ? e[M] = n : delete e[M]), i;
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/_objectToString.js
var Xe = Object.prototype.toString;
function Ze(e) {
	return Xe.call(e);
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/_baseGetTag.js
var Qe = "[object Null]", $e = "[object Undefined]", et = j ? j.toStringTag : void 0;
function N(e) {
	return e == null ? e === void 0 ? $e : Qe : et && et in Object(e) ? Ye(e) : Ze(e);
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/isObjectLike.js
function P(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/isArray.js
var tt = Array.isArray;
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/isObject.js
function nt(e) {
	var t = typeof e;
	return e != null && (t == "object" || t == "function");
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/isFunction.js
var rt = "[object AsyncFunction]", it = "[object Function]", at = "[object GeneratorFunction]", ot = "[object Proxy]";
function st(e) {
	if (!nt(e)) return !1;
	var t = N(e);
	return t == it || t == at || t == rt || t == ot;
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/_coreJsData.js
var F = A["__core-js_shared__"], ct = function() {
	var e = /[^.]+$/.exec(F && F.keys && F.keys.IE_PROTO || "");
	return e ? "Symbol(src)_1." + e : "";
}();
function lt(e) {
	return !!ct && ct in e;
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/_toSource.js
var ut = Function.prototype.toString;
function I(e) {
	if (e != null) {
		try {
			return ut.call(e);
		} catch {}
		try {
			return e + "";
		} catch {}
	}
	return "";
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/_baseIsNative.js
var dt = /[\\^$.*+?()[\]{}|]/g, ft = /^\[object .+?Constructor\]$/, pt = Function.prototype, mt = Object.prototype, ht = pt.toString, gt = mt.hasOwnProperty, _t = RegExp("^" + ht.call(gt).replace(dt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function vt(e) {
	return !nt(e) || lt(e) ? !1 : (st(e) ? _t : ft).test(I(e));
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/_getValue.js
function yt(e, t) {
	return e?.[t];
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/_getNative.js
function L(e, t) {
	var n = yt(e, t);
	return vt(n) ? n : void 0;
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/_WeakMap.js
var R = L(A, "WeakMap"), bt = 9007199254740991;
function xt(e) {
	return typeof e == "number" && e > -1 && e % 1 == 0 && e <= bt;
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/isArrayLike.js
function St(e) {
	return e != null && xt(e.length) && !st(e);
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/_isPrototype.js
var Ct = Object.prototype;
function wt(e) {
	var t = e && e.constructor;
	return e === (typeof t == "function" && t.prototype || Ct);
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/_baseIsArguments.js
var Tt = "[object Arguments]";
function Et(e) {
	return P(e) && N(e) == Tt;
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/isArguments.js
var Dt = Object.prototype, Ot = Dt.hasOwnProperty, kt = Dt.propertyIsEnumerable, At = Et(function() {
	return arguments;
}()) ? Et : function(e) {
	return P(e) && Ot.call(e, "callee") && !kt.call(e, "callee");
};
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/stubFalse.js
function jt() {
	return !1;
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/isBuffer.js
var Mt = typeof exports == "object" && exports && !exports.nodeType && exports, Nt = Mt && typeof module == "object" && module && !module.nodeType && module, Pt = Nt && Nt.exports === Mt ? A.Buffer : void 0, Ft = (Pt ? Pt.isBuffer : void 0) || jt, It = "[object Arguments]", Lt = "[object Array]", Rt = "[object Boolean]", zt = "[object Date]", Bt = "[object Error]", Vt = "[object Function]", Ht = "[object Map]", Ut = "[object Number]", Wt = "[object Object]", Gt = "[object RegExp]", Kt = "[object Set]", qt = "[object String]", Jt = "[object WeakMap]", Yt = "[object ArrayBuffer]", Xt = "[object DataView]", Zt = "[object Float32Array]", Qt = "[object Float64Array]", $t = "[object Int8Array]", en = "[object Int16Array]", tn = "[object Int32Array]", nn = "[object Uint8Array]", rn = "[object Uint8ClampedArray]", an = "[object Uint16Array]", on = "[object Uint32Array]", z = {};
z[Zt] = z[Qt] = z[$t] = z[en] = z[tn] = z[nn] = z[rn] = z[an] = z[on] = !0, z[It] = z[Lt] = z[Yt] = z[Rt] = z[Xt] = z[zt] = z[Bt] = z[Vt] = z[Ht] = z[Ut] = z[Wt] = z[Gt] = z[Kt] = z[qt] = z[Jt] = !1;
function sn(e) {
	return P(e) && xt(e.length) && !!z[N(e)];
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/_baseUnary.js
function cn(e) {
	return function(t) {
		return e(t);
	};
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/_nodeUtil.js
var ln = typeof exports == "object" && exports && !exports.nodeType && exports, B = ln && typeof module == "object" && module && !module.nodeType && module, V = B && B.exports === ln && We.process, un = function() {
	try {
		return B && B.require && B.require("util").types || V && V.binding && V.binding("util");
	} catch {}
}(), dn = un && un.isTypedArray, fn = dn ? cn(dn) : sn;
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/_overArg.js
function pn(e, t) {
	return function(n) {
		return e(t(n));
	};
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/_nativeKeys.js
var mn = pn(Object.keys, Object), hn = Object.prototype.hasOwnProperty;
function gn(e) {
	if (!wt(e)) return mn(e);
	var t = [];
	for (var n in Object(e)) hn.call(e, n) && n != "constructor" && t.push(n);
	return t;
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/_Map.js
var H = L(A, "Map"), _n = L(A, "DataView"), vn = L(A, "Promise"), yn = L(A, "Set"), bn = "[object Map]", xn = "[object Object]", Sn = "[object Promise]", Cn = "[object Set]", wn = "[object WeakMap]", Tn = "[object DataView]", En = I(_n), Dn = I(H), On = I(vn), kn = I(yn), An = I(R), U = N;
(_n && U(new _n(/* @__PURE__ */ new ArrayBuffer(1))) != Tn || H && U(new H()) != bn || vn && U(vn.resolve()) != Sn || yn && U(new yn()) != Cn || R && U(new R()) != wn) && (U = function(e) {
	var t = N(e), n = t == xn ? e.constructor : void 0, r = n ? I(n) : "";
	if (r) switch (r) {
		case En: return Tn;
		case Dn: return bn;
		case On: return Sn;
		case kn: return Cn;
		case An: return wn;
	}
	return t;
});
var jn = U, Mn = "[object String]";
function Nn(e) {
	return typeof e == "string" || !tt(e) && P(e) && N(e) == Mn;
}
//#endregion
//#region node_modules/.store/lodash-es@4.17.21/node_modules/lodash-es/isEmpty.js
var Pn = "[object Map]", Fn = "[object Set]", In = Object.prototype.hasOwnProperty;
function Ln(e) {
	if (e == null) return !0;
	if (St(e) && (tt(e) || typeof e == "string" || typeof e.splice == "function" || Ft(e) || fn(e) || At(e))) return !e.length;
	var t = jn(e);
	if (t == Pn || t == Fn) return !e.size;
	if (wt(e)) return !gn(e).length;
	for (var n in e) if (In.call(e, n)) return !1;
	return !0;
}
//#endregion
//#region src/components/lp-icon/lib/IconGateway.ts
var W = [];
function Rn(e) {
	W.find((t) => t.name === e.name) || W.push(e);
}
async function zn(e) {
	console.log("## 获取图标包", e);
	let t = null;
	for (let n in W) {
		let r = W[n];
		if (r.packages && r.packages?.includes(e)) {
			t = r;
			break;
		}
	}
	let n = t || W[0];
	if (!n) throw console.log("没有网关", e, W), Error("没有网关");
	let r = await b.post(n.url, { name: e });
	if (r.data.code !== 200) throw Error(r.data.msg);
	if (!r.data.data.row) throw Error("图标包不存在");
	return r.data.data.row;
}
//#endregion
//#region src/components/lp-icon/lib/index.ts
var G = {}, K = {};
async function Bn(e) {
	let t = Hn(e), n = G[t.package];
	if (n ||= (K[t.package] && await ge(() => !!G[t.package]), G[t.package]), !n) try {
		K[t.package] = 1, n = await zn(t.package), G[t.package] = n, delete K[t.package];
	} catch (e) {
		throw delete K[t.package], console.error("加载图标包失败", e), e;
	}
	if (Un(n), !n.icons[t.icon]) throw console.error("图标不存在:", t), Error("图标不存在");
	return n.icons[t.icon];
}
function Vn(e) {
	G[e.name] = e;
}
function Hn(e) {
	if (!e.includes("@")) return {
		package: "default",
		icon: e
	};
	let [t, n] = e.split("@");
	return {
		package: t,
		icon: n
	};
}
var q = {};
function Un(e) {
	if (q[e.name]) return;
	let t = document.createElement("style");
	t.innerHTML = `
        @font-face {
            font-family: '${e.name || "iconfont"}';
            src: url('${e.data.woff2.startsWith("//"), e.data.woff2}') format('woff2'),
                 url('${e.data.woff.startsWith("//"), e.data.woff}') format('woff'),
                 url('${e.data.truetype.startsWith("//"), e.data.truetype}') format('truetype');
        }
    `, document.head.appendChild(t), q[e.name] = t, console.log("已挂载字体:", e.name);
}
function Wn(e) {
	let t = q[e.name];
	t && t.parentNode && (t.parentNode.removeChild(t), delete q[e.name], console.log("已卸载字体:", e.name));
}
//#endregion
//#region src/components/lp-icon/src/lp-icon.vue?vue&type=script&setup=true&lang.ts
var Gn = ["innerHTML"], J = /* @__PURE__ */ l({
	name: "lp-icon",
	props: {
		is: { default: "loading" },
		size: { default: 12 },
		color: { default: "#000000" }
	},
	emits: ["click"],
	setup(e, { emit: n }) {
		let r = n, a = y(), o = {}, s = v(""), c = e;
		de(() => c.is, async (e, t) => {
			if (!e) {
				s.value = "";
				return;
			}
			if (e !== t) {
				if (o[e]) {
					s.value = "&#x" + o[e];
					return;
				}
				try {
					o[e] = await Bn(e), s.value = "&#x" + o[e];
				} catch (e) {
					console.error("加载图标失败", e);
				}
			}
		}, { immediate: !0 });
		let l = t(() => {
			let { size: e, color: t } = c, n = e;
			return Nn(e) && (n = parseInt(e, 10)), {
				fontSize: `${n}px`,
				color: t,
				display: "inline-flex",
				fontFamily: "'default'"
			};
		}), u = (e) => {
			r("click", e);
		};
		return (e, t) => (g(), i("i", {
			class: p(["lp-icon", [le(a).class]]),
			style: m(l.value),
			innerHTML: s.value,
			onClick: u
		}, null, 14, Gn));
	}
}), Kn = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, qn = ["fill"], Jn = ["xlink:href"], Y = /* @__PURE__ */ Kn(/* @__PURE__ */ Object.assign({ name: "LpSvg" }, {
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
		let n = e, r = t(() => `#${n.icon}`), o = t(() => {
			let { size: e, color: t } = n, r = `${e}`;
			return r = `${r.replace("px", "")}px`, {
				width: r,
				fill: t,
				height: r
			};
		});
		return (t, n) => (g(), i("svg", {
			class: p([t.$attrs.class]),
			style: m(o.value),
			fill: e.color,
			"aria-hidden": "true"
		}, [a("use", { "xlink:href": r.value }, null, 8, Jn)], 14, qn));
	}
}), [["__scopeId", "data-v-4508aad0"]]), Yn = /* @__PURE__ */ S({
	LpIcon: () => J,
	LpSvg: () => Y,
	default: () => Xn
}), Xn = { install: (e) => {
	e.component(J.name, J), e.component(Y.name, Y);
} };
//#endregion
//#region src/components/lp-layout/lib/RenderComponent.ts
function Zn(e) {
	let t = {};
	for (let n in e) t[n] = () => e[n]?.map(X);
	return t;
}
function X(e) {
	if (typeof e == "string" || typeof e == "number") return e;
	let { component: t, props: n, children: r } = e, i = {};
	return e.slots && (i = {
		...i,
		...Zn(e.slots)
	}), r && r.length > 0 && (i.default = () => r?.map(X)), t.includes("@") ? s(k, {
		...n,
		is: t
	}, i) : s(t, n || {}, r?.map(X));
}
function Qn(e, t) {
	console.log("useRenderComponent", e);
	let n = _({ layout: e });
	return l({
		name: "DynamicLayout",
		setup() {
			return console.log("useRenderComponent setup", n.layout), () => f("div", {}, n.layout.map((e) => X(e)));
		}
	});
}
//#endregion
//#region src/components/lp-layout/src/lp-layout.vue?vue&type=script&setup=true&lang.ts
var $n = { class: "lp-layout" }, er = /* @__PURE__ */ l({
	name: "LpLayout",
	props: { data: {
		type: [Object, Array],
		default: () => []
	} },
	setup(e) {
		let t = y(), r = ue();
		_({});
		let a = Qn(e.data, r);
		return h(() => {
			console.log(t), console.log("layout slots", r);
		}), (e, t) => (g(), i("div", $n, [(g(), n(oe(le(a))))]));
	}
}), tr = /* @__PURE__ */ S({
	LpLayout: () => er,
	default: () => nr
}), nr = { install: (e) => {
	e.component(er.name, er);
} };
//#endregion
//#region src/components/index.ts
function rr(e) {
	let t = /* @__PURE__ */ Object.assign({
		"./lp-component/index.ts": He,
		"./lp-icon/index.ts": Yn,
		"./lp-layout/index.ts": tr
	});
	console.debug("%cglobalComponents", "color:green", t), Object.keys(t).forEach((n) => {
		let r = t[n].default;
		Ln(r) || e.use(r);
	});
}
//#endregion
//#region src/lib/component.ts
function ir(e, t) {
	if (!e) throw Error("Invalid component: " + e);
	if (typeof e == "string") {
		if (ar(e)) return ze(e);
		if (!t) throw Error("获取全局组件失败：未提供 Vue 应用实例");
		let n = t.component(e);
		if (!n) throw Error(`Component "${e}" not found in app registry`);
		return n;
	}
	if (typeof e == "object" && !("then" in e)) return e;
	if (e instanceof Promise || typeof e == "object" && "then" in e) return c(() => e.then((e) => e.default || e));
	if (typeof e == "function") {
		let t = e();
		return t instanceof Promise || typeof t == "object" && "then" in t ? c(() => t.then((e) => e.default || e)) : e;
	}
	throw Error("Unknown component type: " + e);
}
function ar(e) {
	return e.includes("@");
}
//#endregion
//#region src/api/AxiosRetryRunner.ts
function or(e) {
	return new Promise((t) => setTimeout(t, e));
}
var sr = class {
	retryOption;
	createRawClient;
	maxRetry;
	delay;
	constructor(e, t) {
		this.retryOption = e, this.createRawClient = t, this.maxRetry = e.maxRetry ?? 3, this.delay = e.delay ?? 1e3;
	}
	async shouldRetryByResponse(e) {
		return this.retryOption.check ? await this.retryOption.check(e) : e.status >= 500 || e.status === 429 || e.status === 408;
	}
	async requestAsResponse(e, t) {
		try {
			return await e.request(t);
		} catch (e) {
			let t = e?.response;
			if (t) return t;
			throw e;
		}
	}
	async run(e, t) {
		let n = this.createRawClient(), r = t;
		for (; await this.shouldRetryByResponse(r);) {
			let t = e.__retryCount ?? 0;
			if (t >= this.maxRetry || this.retryOption.handle && !await this.retryOption.handle(r)) return r;
			e.__retryCount = t + 1, e.__isRetry = !0, this.delay > 0 && await or(this.delay * e.__retryCount), r = await this.requestAsResponse(n, e);
		}
		return r;
	}
};
//#endregion
//#region src/api/index.ts
function cr(e) {
	e ||= {};
	let t = {
		baseURL: e.baseURL,
		timeout: e.timeout || 1e4,
		headers: { ...e.headers || {} }
	}, n = b.create(t);
	n.interceptors.request.use((t) => (e.requestInterceptors ? t = e.requestInterceptors(t) : e.baseInterceptors, t), (e) => Promise.reject(e));
	let r = null;
	return e.retry && (r = async (t) => {
		if (e.retry) {
			let n = e.retry;
			if (e.retry.check(t)) {
				let r = new sr(n, () => cr({
					baseURL: e.baseURL,
					timeout: e.timeout,
					headers: e.headers,
					requestInterceptors: e.requestInterceptors,
					baseInterceptors: !1,
					__retryMode: !0
				})), i = t?.config || {};
				return await r.run(i, t);
			}
		}
		return t;
	}), e.__retryMode || n.interceptors.response.use(async (t) => {
		if (r && (t = await r(t)), e.responseInterceptors) return e.responseInterceptors(t);
		if (e.baseInterceptors) return t.data;
	}, async (e) => {
		if (console.log("response err", { err: e }), r && e && e?.response) {
			let t = e?.response;
			return t = await r(t), t;
		}
		return Promise.reject(e);
	}), n;
}
//#endregion
//#region src/exception/LooplanException.ts
var Z = class e extends Error {
	code;
	data;
	name = "LooplanException";
	constructor(t, n = 0, r = {}) {
		super(t), this.code = n, this.data = r, Object.setPrototypeOf(this, e.prototype);
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
};
//#endregion
//#region src/loader/data/ModelClient.ts
function Q(e) {
	return {
		error: {
			code: 500,
			msg: "请求失败"
		},
		...e
	};
}
var lr = class {
	space;
	modelName;
	constructor(e, t) {
		this.space = e, this.modelName = t;
	}
	handleResult(e) {
		if (e.code !== 200) throw new Z(e.msg || "请求失败", e.code, e.data);
	}
	async list(e = {}) {
		let { instance: t } = this.space, n = await t.post(`${this.modelName}.list`, { ...e });
		return n ? {
			error: n.code === 200 ? null : {
				code: n.code,
				msg: n.msg || "请求失败"
			},
			result: n,
			list: n.data.list || []
		} : Q({
			list: [],
			result: n
		});
	}
	async paginate(e = 1, t = 10, n = {}) {
		let { instance: r } = this.space, i = await r.post(`${this.modelName}.paginate`, {
			page: e,
			psize: t,
			...n
		});
		if (!i) return Q({
			list: [],
			result: i
		});
		let a = i.data.list, o = a?.data || [];
		return delete a.list, {
			error: i.code === 200 ? null : {
				code: i.code,
				msg: i.msg || "请求失败"
			},
			result: i,
			list: o,
			pageStatus: a || {}
		};
	}
	async paginateX(e, t, n = {}) {
		let { instance: r } = this.space, i = await r.post(`${this.modelName}.paginateX`, {
			lastIndex: e,
			options: t || null,
			...n
		});
		if (!i) return Q({
			list: [],
			result: i
		});
		let a = i.data.list, o = a?.data || [];
		return delete a.list, {
			error: i.code === 200 ? null : {
				code: i.code,
				msg: i.msg || "请求失败"
			},
			result: i,
			list: o,
			pageStatus: a || {}
		};
	}
	async save(e, t, n = {}) {
		let { instance: r } = this.space, i = await r.post(`${this.modelName}.save`, {
			id: t,
			data: e,
			...n
		});
		return i ? {
			error: i.code === 200 ? null : {
				code: i.code,
				msg: i.msg || "请求失败"
			},
			result: i
		} : Q({ result: i });
	}
	async add(e, t = {}) {
		let { instance: n } = this.space, r = await n.post(`${this.modelName}.save`, {
			data: e,
			...t
		});
		return r ? {
			error: r.code === 200 ? null : {
				code: r.code,
				msg: r.msg || "请求失败"
			},
			result: r
		} : Q({ result: r });
	}
	async update(e, t, n = {}) {
		let { instance: r } = this.space, i = await r.post(`${this.modelName}.save`, {
			id: t,
			data: e,
			...n
		});
		return i ? {
			error: i.code === 200 ? null : {
				code: i.code,
				msg: i.msg || "请求失败"
			},
			result: i
		} : Q({ result: i });
	}
	async delete(e, t = {}) {
		let { instance: n } = this.space, r = await n.post(`${this.modelName}.delete`, {
			id: e,
			...t
		});
		return r ? {
			error: r.code === 200 ? null : {
				code: r.code,
				msg: r.msg || "请求失败"
			},
			result: r
		} : Q({ result: r });
	}
	async restore(e, t = {}) {
		let { instance: n } = this.space, r = await n.post(`${this.modelName}.restore`, {
			id: e,
			...t
		});
		return r ? {
			error: r.code === 200 ? null : {
				code: r.code,
				msg: r.msg || "请求失败"
			},
			result: r
		} : Q({ result: r });
	}
	async row(e, t = {}) {
		let { instance: n } = this.space, r = await n.post(`${this.modelName}.row`, {
			id: e,
			...t
		});
		return r ? {
			error: r.code === 200 ? null : {
				code: r.code,
				msg: r.msg || "请求失败"
			},
			result: r,
			row: r.data?.row || {}
		} : Q({
			result: r,
			row: null
		});
	}
	async saveOptions(e, t = {}, n = {}) {
		let { instance: r } = this.space, i = await r.post(`${this.modelName}.saveOptions`, {
			list: e,
			belong: t,
			...n
		});
		return i ? {
			error: i.code === 200 ? null : {
				code: i.code,
				msg: i.msg || "请求失败"
			},
			result: i
		} : Q({ result: i });
	}
	async count(e = null, t = {}) {
		let { instance: n } = this.space, r = await n.post(`${this.modelName}.count`, {
			filter: e,
			...t
		});
		return r ? {
			error: r.code === 200 ? null : {
				code: r.code,
				msg: r.msg || "请求失败"
			},
			result: r,
			count: r.data.count || 0
		} : Q({
			result: r,
			count: 0
		});
	}
	async saveField(e, t, n, r = {}) {
		let { instance: i } = this.space, a = await i.post(`${this.modelName}.saveField`, {
			id: e,
			field: t,
			value: n,
			...r
		});
		return a ? {
			error: a.code === 200 ? null : {
				code: a.code,
				msg: a.msg || "请求失败"
			},
			result: a
		} : Q({ result: a });
	}
	async exists(e = null, t = {}) {
		let { instance: n } = this.space, r = await n.post(`${this.modelName}.exists`, {
			filter: e,
			...t
		});
		return r ? {
			error: r.code === 200 ? null : {
				code: r.code,
				msg: r.msg || "请求失败"
			},
			result: r,
			exists: r.data?.isExist || !1
		} : Q({ result: r });
	}
	async multiSave(e) {
		let { instance: t } = this.space, n = await t.post(`${this.modelName}.multiSave`, { list: e });
		return n ? {
			error: n.code === 200 ? null : {
				code: n.code,
				msg: n.msg || "请求失败"
			},
			result: n
		} : Q({ result: n });
	}
	async multiDelete(e, t = {}) {
		let { instance: n } = this.space, r = await n.post(`${this.modelName}.multiDelete`, {
			ids: e,
			...t
		});
		return r ? {
			error: r.code === 200 ? null : {
				code: r.code,
				msg: r.msg || "请求失败"
			},
			result: r
		} : Q({ result: r });
	}
}, ur = class {
	url;
	options;
	instance;
	constructor(e) {
		this.url = e.url, this.options = e, this.createApiClient();
	}
	createApiClient() {
		let e;
		this.options.retry === !0 ? e = dr() : Te.typeof(this.options.retry) === "object" && (e = this.options.retry), this.instance = cr({
			baseURL: this.url,
			timeout: 1e4,
			headers: {},
			requestInterceptors: async (e) => {
				if (e.headers["Content-Type"] || (e.headers["Content-Type"] = "application/json"), this.options.provideToken) {
					let t = await this.options.provideToken?.(!!e.__isRetry) || "", n = this.options.tokenField || "Authorization";
					t && (e.headers[n] = t);
				}
				return this.options.requestInterceptors?.(e), e;
			},
			responseInterceptors: async (e) => e.data,
			retry: e
		});
	}
	useModel(e) {
		return new lr(this, e);
	}
	useCloudFunction(e, t) {
		return ((n) => this.callCloudFunction(e, n, t?.config || {}));
	}
	async callCloudFunction(e, t, n = {}) {
		try {
			return await this.instance.post(`/${e}`, t, n);
		} catch (e) {
			throw new Z(e.message || "云函数调用失败", e.code || 0, e.data || {});
		}
	}
	useCloudObject(e, t) {
		t = Object.assign({ args: !1 }, t || {});
		let n = this;
		return new Proxy({}, { get(r, i) {
			if (i !== "then") return (...r) => {
				let a = r.length > 0 ? r[0] : {};
				return t.args && (a = { $params: r }), n.callCloudObject(e, i, a, t.config);
			};
		} });
	}
	async callCloudObject(e, t, n, r) {
		let i = `${e}.${t}`;
		try {
			return await this.instance.post(`/${i}`, n, r);
		} catch (e) {
			throw new Z(e.message || "云对象调用失败", e.code || 0, e.data || {});
		}
	}
};
function dr() {
	return {
		maxRetry: 3,
		delay: 200,
		check: (e) => e.status === 401 || e.data?.code === 401,
		handle: async (e) => {
			try {
				if (e.data?.code === 401 || e.status === 401) {
					let e = fr("main");
					if (!e) return console.error("无法获取main空间实例"), !1;
					let t = await e.useCloudObject("Auth").dataToken();
					return t.code == 200 ? (localStorage.setItem("dataToken", t.data.token), !0) : (console.error("获取dataToken失败:", t), !1);
				}
			} catch (e) {
				console.error("处理重试时出错:", e);
			}
			return !1;
		}
	};
}
//#endregion
//#region src/loader/data/index.ts
var $ = /* @__PURE__ */ new Map(), fr = (e) => {
	if (!$.has(e)) throw new Z(`模型空间 ${e} 不存在`);
	return $.get(e);
};
//#endregion
//#region src/index.ts
function pr(e) {
	rr(e);
}
var mr = { install: pr };
//#endregion
export { G as IconPackages, Te as JsDataType, Z as LooplanException, k as LpComponent, J as LpIcon, Y as LpSvg, lr as ModelClient, ur as ModelSpace, Le as asyncComponentDelay, cr as createApi, mr as default, w as gatewayOptions, Re as getComponentOption, he as getComponentPackage, zn as getIconPackage, Fe as getLoadedStyles, W as iconGatewayOptions, pr as install, Pe as isStyleLoaded, ze as loadComponent, Bn as loadIcon, Me as loadStyle, ve as looplanConfig, $ as modelSpaceMap, Un as mountIconfont, De as nameIsUseAsyncComponent, Ae as regPkg, rr as registerLooplanComponents, je as registerPackage, ir as resolveComponent, Oe as setComponentPackage, me as setGateway, Rn as setIconGateway, Vn as setIconPackage, ke as setPkg, Ee as typeDefaultValue, Ie as unloadAllStyles, Ne as unloadStyle, Wn as unmountIconfont, fr as useModelSpace };
