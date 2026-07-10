var ol = Object.defineProperty;
var sl = (n, e, l) => e in n ? ol(n, e, { enumerable: !0, configurable: !0, writable: !0, value: l }) : n[e] = l;
var se = (n, e, l) => sl(n, typeof e != "symbol" ? e + "" : e, l);
import { defineComponent as le, createElementBlock as _, openBlock as h, normalizeClass as G, createBlock as ye, createCommentVNode as V, renderSlot as ne, unref as U, createTextVNode as je, toDisplayString as te, ref as P, computed as A, createElementVNode as L, Fragment as he, renderList as $e, withCtx as Le, mergeModels as Ze, useModel as bt, inject as Oe, onMounted as ke, nextTick as ve, watch as ce, onUnmounted as wt, normalizeStyle as fe, provide as Be, withModifiers as Ne, createVNode as ue, Transition as $t, useAttrs as al, mergeProps as il, resolveDynamicComponent as Qe, reactive as Ce, getCurrentInstance as Zt, onBeforeUnmount as Ke, withDirectives as et, vShow as Qt, render as un, resolveComponent as cn, resolveDirective as rl, toRaw as Et, useSlots as Pn, useCssVars as en, vModelText as Bn, isRef as ul, markRaw as dn, TransitionGroup as cl } from "vue";
import { LpIcon as _e, resolveComponent as dl, loadComponent as pn, setIconGateway as pl, setComponentPackage as fl } from "looplan";
import Ct from "axios";
const hl = { name: "LpLoading" }, vl = /* @__PURE__ */ le({
  ...hl,
  props: {
    loading: { type: Boolean },
    size: { default: "default" },
    type: { default: "spinner" }
  },
  setup(n) {
    const e = n;
    return (l, t) => (h(), _("span", {
      class: G(["lp-loading", [`lp-loading-${e.type}`, l.size]]),
      "aria-hidden": "true"
    }, null, 2));
  }
}), Re = (n, e) => {
  const l = n.__vccOpts || n;
  for (const [t, o] of e)
    l[t] = o;
  return l;
}, st = /* @__PURE__ */ Re(vl, [["__scopeId", "data-v-5093ff88"]]), ml = ["disabled"], gl = {
  name: "LpButton"
}, Lt = /* @__PURE__ */ le({
  ...gl,
  props: {
    type: { default: "primary" },
    text: { default: "按钮" },
    size: { default: "" },
    loading: { type: Boolean, default: !1 },
    plain: { type: Boolean, default: !1 },
    icon: { default: "" },
    iconSize: { default: 16 },
    iconColor: { default: "" },
    iconPosition: { default: "left" },
    link: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = (s) => {
      l.loading || t("click", s);
    };
    return (s, i) => (h(), _("button", {
      class: G(["btn", ["btn-" + s.type, s.size, s.loading ? "is-loading" : "", s.plain ? "plain" : "", s.link ? "link" : "", s.icon ? "has-icon" : "", s.iconPosition === "right" ? "icon-right" : ""]]),
      disabled: s.loading,
      onClick: o
    }, [
      s.loading ? (h(), ye(st, {
        key: 0,
        size: s.size
      }, null, 8, ["size"])) : s.icon ? (h(), ye(U(_e), {
        key: 1,
        is: s.icon,
        size: s.iconSize,
        color: s.iconColor
      }, null, 8, ["is", "size", "color"])) : V("", !0),
      ne(s.$slots, "default", {}, () => [
        je(te(s.text), 1)
      ])
    ], 10, ml));
  }
}), yl = { class: "lp-button-group" }, _l = {
  name: "LpButtonGroup"
}, bl = /* @__PURE__ */ le({
  ..._l,
  setup(n) {
    return (e, l) => (h(), _("div", yl, [
      ne(e.$slots, "default", {}, void 0, !0)
    ]));
  }
}), Ot = /* @__PURE__ */ Re(bl, [["__scopeId", "data-v-04957fc5"]]);
let wl = {
  install: (n) => {
    n.component(Lt.name, Lt), n.component(Ot.name, Ot);
  }
};
const $l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpButton: Lt,
  LpButtonGroup: Ot,
  default: wl
}, Symbol.toStringTag, { value: "Module" })), Cl = { class: "lp-checkbox__input" }, kl = ["value", "name", "disabled", "checked", "midway"], Sl = {
  key: 0,
  class: "lp-checkbox__label"
}, xl = {
  name: "LpCheckbox"
}, at = /* @__PURE__ */ le({
  ...xl,
  props: {
    modelValue: { type: [Boolean, String, Number], default: !1 },
    value: { type: [Boolean, String, Number], default: void 0 },
    title: { type: [String, Number, Boolean] },
    trueLabel: {},
    falseLabel: {},
    disabled: { type: Boolean },
    name: {},
    size: { default: "default" },
    midway: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change", "click"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = P(), s = P(!1), i = A(() => l.value !== void 0 ? l.trueLabel !== void 0 || l.falseLabel !== void 0 ? l.value === l.trueLabel : !!l.value : l.trueLabel !== void 0 || l.falseLabel !== void 0 ? l.modelValue === l.trueLabel : !!l.modelValue), r = A(() => l.size), a = A(() => l.disabled), d = (c) => {
      if (l.value !== void 0) {
        t("click", i.value);
        return;
      }
      const v = c.target.checked;
      let w;
      l.trueLabel !== void 0 || l.falseLabel !== void 0 ? w = v ? l.trueLabel : l.falseLabel : w = v, t("update:modelValue", w), t("change", w);
    };
    return (c, k) => (h(), _("label", {
      class: G(["lp-checkbox", [
        `lp-checkbox--${r.value}`,
        {
          "is-disabled": a.value,
          "is-checked": i.value,
          "is-midway": c.midway
        }
      ]])
    }, [
      L("span", Cl, [
        L("input", {
          ref_key: "inputRef",
          ref: o,
          type: "checkbox",
          class: "lp-checkbox__original",
          value: c.title || c.trueLabel,
          name: c.name,
          disabled: a.value,
          checked: i.value,
          midway: c.midway,
          onChange: d,
          onFocus: k[0] || (k[0] = (v) => s.value = !0),
          onBlur: k[1] || (k[1] = (v) => s.value = !1)
        }, null, 40, kl),
        k[2] || (k[2] = L("span", { class: "lp-checkbox__inner" }, null, -1))
      ]),
      c.$slots.default || c.title ? (h(), _("span", Sl, [
        ne(c.$slots, "default", {}, () => [
          je(te(c.title), 1)
        ])
      ])) : V("", !0)
    ], 2));
  }
}), Tl = ["aria-label"], El = {
  name: "LpCheckboxGroup"
}, pt = /* @__PURE__ */ le({
  ...El,
  props: {
    modelValue: { default: () => [] },
    options: { default: () => [] },
    disabled: { type: Boolean, default: !1 },
    size: { default: "default" },
    min: { default: 0 },
    max: { default: 1 / 0 },
    ariaLabel: {}
  },
  emits: ["update:modelValue", "change"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = A(() => l.modelValue || []), s = (r, a) => {
      if (l.disabled) return;
      const d = !!a, c = [...o.value], k = c.indexOf(r);
      d ? k === -1 && c.push(r) : k > -1 && c.splice(k, 1), !(c.length < l.min) && (c.length > l.max || (t("update:modelValue", c), t("change", c)));
    }, i = (r) => o.value.includes(r) ? !1 : o.value.length >= l.max;
    return (r, a) => (h(), _("div", {
      class: G(["lp-checkbox-group", [
        `lp-checkbox-group--${r.size}`,
        {
          "is-disabled": r.disabled
        }
      ]]),
      role: "group",
      "aria-label": r.ariaLabel
    }, [
      (h(!0), _(he, null, $e(r.options, (d) => (h(), ye(at, {
        key: d.value,
        "model-value": o.value.includes(d.value),
        onChange: (c) => s(d.value, c),
        disabled: d.disabled || r.disabled || i(d.value),
        size: r.size
      }, {
        default: Le(() => [
          je(te(d.title), 1)
        ]),
        _: 2
      }, 1032, ["model-value", "onChange", "disabled", "size"]))), 128)),
      ne(r.$slots, "default")
    ], 10, Tl));
  }
}), Ll = (n) => {
  n.component(at.name, at), n.component(pt.name, pt);
}, Ol = {
  install: Ll,
  LpCheckbox: at,
  LpCheckboxGroup: pt
}, jl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpCheckbox: at,
  LpCheckboxGroup: pt,
  default: Ol
}, Symbol.toStringTag, { value: "Module" })), Al = {
  name: "lp-empty"
}, Ml = { class: "lp-empty" };
function Pl(n, e, l, t, o, s) {
  return h(), _("div", Ml, " 数据为空! ");
}
const jt = /* @__PURE__ */ Re(Al, [["render", Pl]]);
let Bl = {
  install: (n) => {
    n.component(jt.name, jt);
  }
};
const Il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpEmpty: jt,
  default: Bl
}, Symbol.toStringTag, { value: "Module" })), Rl = { class: "lp-fold-header-content" }, zl = {
  name: "LpFold"
}, Nl = /* @__PURE__ */ le({
  ...zl,
  props: /* @__PURE__ */ Ze({
    name: { default: "" },
    title: { default: "" },
    disabled: { type: Boolean, default: !1 },
    showArrow: { type: Boolean, default: !0 },
    active: { type: Boolean },
    expand: { type: Boolean, default: !1 }
  }, {
    active: { type: Boolean, default: !1 },
    activeModifiers: {}
  }),
  emits: /* @__PURE__ */ Ze(["change"], ["update:active"]),
  setup(n, { emit: e }) {
    const l = n, t = e, o = bt(n, "active"), s = Oe("lpCollapse", null), i = P(null), r = P("0px"), a = P(!1), d = P(!0), c = () => {
      if (s && s.activeNames && l.name) {
        const g = s.activeNames.value;
        a.value = Array.isArray(g) ? g.includes(l.name) : g === l.name;
      } else
        a.value = o.value || l.expand;
    }, k = () => {
      if (l.disabled) return;
      const g = !a.value;
      s && s.setActiveNames && l.name ? s.setActiveNames(l.name) : o.value = g, a.value = g, t("change", l.name, g), ve(() => {
        v();
      });
    }, v = () => {
      i.value && (r.value = a.value ? `${i.value.scrollHeight}px` : "0px");
    }, w = P(null);
    return ke(() => {
      c(), ve(() => {
        v(), requestAnimationFrame(() => {
          d.value = !1;
        });
      }), s && s.activeNames && l.name && ce(() => s.activeNames.value, () => {
        c(), ve(() => {
          v();
        });
      }), (!s || !l.name) && ce(o, (g) => {
        a.value = g, ve(() => {
          v();
        });
      }), ce(a, () => {
        ve(() => {
          v();
        });
      }), i.value && (w.value = new MutationObserver(() => {
        v();
      }), w.value.observe(i.value, {
        childList: !0,
        subtree: !0,
        attributes: !0
      }));
    }), wt(() => {
      w.value && w.value.disconnect();
    }), (g, R) => (h(), _("div", {
      class: G(["lp-fold", { "is-disabled": g.disabled }])
    }, [
      L("div", {
        class: G(["lp-fold-header", { "is-active": a.value, "is-disabled": g.disabled }]),
        onClick: k
      }, [
        L("div", Rl, [
          ne(g.$slots, "title", {}, () => [
            je(te(g.title), 1)
          ], !0)
        ]),
        g.showArrow ? (h(), _("div", {
          key: 0,
          class: G(["lp-fold-arrow", { "is-active": a.value }])
        }, R[0] || (R[0] = [
          L("svg", {
            viewBox: "0 0 1024 1024",
            width: "16",
            height: "16"
          }, [
            L("path", {
              d: "M832.064 320.064L512.064 640.064 192.064 320.064z",
              fill: "currentColor"
            })
          ], -1)
        ]), 2)) : V("", !0)
      ], 2),
      L("div", {
        class: G(["lp-fold-content", { "is-active": a.value, "no-transition": d.value }]),
        style: fe({ height: r.value })
      }, [
        L("div", {
          ref_key: "contentRef",
          ref: i,
          class: "lp-fold-content-inner"
        }, [
          ne(g.$slots, "default", {}, void 0, !0)
        ], 512)
      ], 6)
    ], 2));
  }
}), At = /* @__PURE__ */ Re(Nl, [["__scopeId", "data-v-fd0ed24b"]]), Fl = { class: "lp-collapse" }, Vl = {
  name: "LpCollapse"
}, Wl = /* @__PURE__ */ le({
  ...Vl,
  props: {
    modelValue: { default: () => [] },
    accordion: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = P(l.modelValue), s = (i) => {
      let r = [];
      if (l.accordion)
        r = o.value === i ? "" : i;
      else {
        const a = Array.isArray(o.value) ? [...o.value] : [o.value], d = a.indexOf(i);
        d > -1 ? a.splice(d, 1) : a.push(i), r = a;
      }
      o.value = r, t("update:modelValue", r), t("change", r);
    };
    return ce(() => l.modelValue, (i) => {
      o.value = i;
    }), Be("lpCollapse", {
      activeNames: o,
      setActiveNames: s
    }), (i, r) => (h(), _("div", Fl, [
      ne(i.$slots, "default", {}, void 0, !0)
    ]));
  }
}), Mt = /* @__PURE__ */ Re(Wl, [["__scopeId", "data-v-8355ddd5"]]);
let Dl = {
  install: (n) => {
    n.component(At.name, At), n.component(Mt.name, Mt);
  }
};
const Hl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpCollapse: Mt,
  LpFold: At,
  default: Dl
}, Symbol.toStringTag, { value: "Module" })), Ul = {
  name: "LpForm"
}, Pt = /* @__PURE__ */ le({
  ...Ul,
  props: {
    model: {},
    rules: {},
    inline: { type: Boolean, default: !1 },
    labelPosition: { default: "right" },
    labelWidth: {},
    labelSuffix: { default: "" },
    hideRequiredAsterisk: { type: Boolean, default: !1 },
    showMessage: { type: Boolean, default: !0 },
    inlineMessage: { type: Boolean, default: !1 },
    statusIcon: { type: Boolean, default: !1 },
    validateOnRuleChange: { type: Boolean, default: !0 },
    size: { default: "default" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["validate"],
  setup(n, { expose: e, emit: l }) {
    const t = n, o = l, s = P([]), i = (w) => {
      s.value.push(w);
    }, r = (w) => {
      const g = s.value.indexOf(w);
      g > -1 && s.value.splice(g, 1);
    }, a = async (w, g) => {
      const R = s.value.find((I) => I.prop === w);
      if (!R)
        return console.warn(`[LpForm] 找不到字段 ${w}`), !1;
      try {
        return await R.validate(), g == null || g(!0, ""), !0;
      } catch (I) {
        const j = I.message || "验证失败";
        return g == null || g(!1, j), !1;
      }
    }, d = async (w) => {
      const g = await Promise.allSettled(
        s.value.map((j) => j.validate())
      ), R = g.every((j) => j.status === "fulfilled"), I = g.filter((j) => j.status === "rejected").map((j) => j.reason.message).join("; ");
      return w == null || w(R, I), R;
    }, c = () => {
      s.value.forEach((w) => {
        w.resetField();
      });
    }, k = (w) => {
      const g = w ? Array.isArray(w) ? w : [w] : [];
      s.value.forEach((R) => {
        (!w || g.includes(R.prop)) && R.clearValidate();
      });
    }, v = async () => {
      await d();
    };
    return A(() => typeof t.labelWidth == "number" ? `${t.labelWidth}px` : t.labelWidth || "auto"), Be("lpForm", {
      props: t,
      addFormItem: i,
      removeFormItem: r,
      validateField: a,
      emit: o
    }), e({
      validate: d,
      validateField: a,
      resetFields: c,
      clearValidate: k
    }), (w, g) => (h(), _("form", {
      class: G(["lp-form", {
        "lp-form--inline": w.inline,
        "lp-form--disabled": w.disabled
      }]),
      onSubmit: Ne(v, ["prevent"])
    }, [
      ne(w.$slots, "default")
    ], 34));
  }
}), Gl = ["for"], Kl = {
  key: 0,
  class: "lp-form-item__label-suffix"
}, Yl = { class: "lp-form-item__content" }, Xl = {
  name: "LpFormItem"
}, Bt = /* @__PURE__ */ le({
  ...Xl,
  props: {
    label: {},
    labelWidth: {},
    prop: {},
    required: { type: Boolean },
    rules: {},
    error: {},
    showMessage: { type: Boolean, default: !0 },
    inlineMessage: { type: Boolean, default: !1 },
    size: { default: "default" },
    for: {}
  },
  setup(n, { expose: e }) {
    const l = n, t = Oe("lpForm", null), o = P(""), s = P(""), i = P(!1), r = A(() => {
      var f;
      return ((f = t == null ? void 0 : t.props) == null ? void 0 : f.labelPosition) || "right";
    }), a = A(() => {
      var f;
      return l.size || ((f = t == null ? void 0 : t.props) == null ? void 0 : f.size) || "default";
    }), d = A(() => l.required !== void 0 ? l.required : g().some((m) => m.required)), c = A(() => {
      var f;
      return ((f = t == null ? void 0 : t.props) == null ? void 0 : f.labelSuffix) || "";
    }), k = A(() => {
      var f;
      return o.value === "error" && l.showMessage && (((f = t == null ? void 0 : t.props) == null ? void 0 : f.showMessage) ?? !0);
    }), v = A(() => {
      var b;
      const f = {};
      if (r.value === "top")
        return f;
      const m = l.labelWidth || ((b = t == null ? void 0 : t.props) == null ? void 0 : b.labelWidth);
      return m && (f.width = typeof m == "number" ? `${m}px` : m), f;
    }), w = A(() => l.for || `lp-form-item-${Math.random().toString(36).substr(2, 9)}`), g = () => {
      var p;
      const f = (p = t == null ? void 0 : t.props) == null ? void 0 : p.rules, m = l.rules, b = [];
      if (f && l.prop) {
        const T = f[l.prop];
        T && b.push(...Array.isArray(T) ? T : [T]);
      }
      return m && b.push(...Array.isArray(m) ? m : [m]), b;
    }, R = () => {
      var m;
      const f = (m = t == null ? void 0 : t.props) == null ? void 0 : m.model;
      if (!(!f || !l.prop))
        return f[l.prop];
    }, I = async (f) => {
      if (!l.prop)
        return Promise.resolve();
      const m = g();
      if (!m.length)
        return Promise.resolve();
      const b = f ? m.filter((T) => !T.trigger || T.trigger === f) : m;
      if (!b.length)
        return Promise.resolve();
      o.value = "validating", i.value = !0;
      const p = R();
      return new Promise((T, H) => {
        let x = 0;
        const M = b.length, W = (X, N) => {
          var ee, C;
          if (X)
            x++;
          else {
            o.value = "error", s.value = N || "验证失败", i.value = !1, (ee = t == null ? void 0 : t.emit) == null || ee.call(t, "validate", l.prop, !1, N || ""), H(new Error(N || "验证失败"));
            return;
          }
          x === M && (o.value = "success", s.value = "", i.value = !1, (C = t == null ? void 0 : t.emit) == null || C.call(t, "validate", l.prop, !0, ""), T());
        };
        b.forEach((X) => {
          j(X, p, W);
        });
      });
    }, j = (f, m, b) => {
      if (f.required && (m == null || m === "")) {
        b(!1, f.message || "该字段为必填项");
        return;
      }
      if ((m == null || m === "") && !f.required) {
        b(!0);
        return;
      }
      if (f.min !== void 0 || f.max !== void 0 || f.len !== void 0) {
        const p = String(m).length;
        if (f.len !== void 0 && p !== f.len) {
          b(!1, f.message || `长度必须为 ${f.len} 个字符`);
          return;
        }
        if (f.min !== void 0 && p < f.min) {
          b(!1, f.message || `长度不能少于 ${f.min} 个字符`);
          return;
        }
        if (f.max !== void 0 && p > f.max) {
          b(!1, f.message || `长度不能超过 ${f.max} 个字符`);
          return;
        }
      }
      if (f.pattern && !f.pattern.test(String(m))) {
        b(!1, f.message || "格式不正确");
        return;
      }
      if (f.validator) {
        f.validator(f, m, (p) => {
          b(!p, p == null ? void 0 : p.message);
        });
        return;
      }
      b(!0);
    }, F = () => {
      var m;
      o.value = "", s.value = "", i.value = !1;
      const f = (m = t == null ? void 0 : t.props) == null ? void 0 : m.model;
      f && l.prop && (f[l.prop] = void 0);
    }, u = () => {
      o.value = "", s.value = "", i.value = !1;
    }, $ = {
      prop: l.prop || "",
      validate: I,
      resetField: F,
      clearValidate: u
    };
    return ke(() => {
      var f;
      l.prop && ((f = t == null ? void 0 : t.addFormItem) == null || f.call(t, $));
    }), wt(() => {
      var f;
      l.prop && ((f = t == null ? void 0 : t.removeFormItem) == null || f.call(t, $));
    }), ce(() => l.error, (f) => {
      f ? (o.value = "error", s.value = f) : (o.value = "", s.value = "");
    }, { immediate: !0 }), e({
      validate: I,
      resetField: F,
      clearValidate: u
    }), (f, m) => (h(), _("div", {
      class: G(["lp-form-item", {
        "lp-form-item--error": o.value === "error",
        "lp-form-item--success": o.value === "success",
        "lp-form-item--validating": o.value === "validating",
        "lp-form-item--required": d.value,
        [`lp-form-item--${r.value}`]: r.value,
        [`lp-form-item--${a.value}`]: a.value
      }])
    }, [
      f.label || f.$slots.label ? (h(), _("label", {
        key: 0,
        class: "lp-form-item__label",
        style: fe(v.value),
        for: w.value
      }, [
        ne(f.$slots, "label", {}, () => [
          je(te(f.label), 1)
        ]),
        c.value ? (h(), _("span", Kl, te(c.value), 1)) : V("", !0)
      ], 12, Gl)) : V("", !0),
      L("div", Yl, [
        ne(f.$slots, "default"),
        ue($t, { name: "lp-zoom-in-top" }, {
          default: Le(() => [
            k.value ? (h(), _("div", {
              key: 0,
              class: G(["lp-form-item__error", {
                "lp-form-item__error--inline": f.inlineMessage
              }])
            }, te(s.value), 3)) : V("", !0)
          ]),
          _: 1
        })
      ])
    ], 2));
  }
});
let ql = {
  install: (n) => {
    n.component(Pt.name, Pt), n.component(Bt.name, Bt);
  }
};
const Jl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpForm: Pt,
  LpFormItem: Bt,
  default: ql
}, Symbol.toStringTag, { value: "Module" })), Zl = {
  key: 0,
  class: "lp-input__prepend"
}, Ql = {
  key: 0,
  class: "lp-input__prefix"
}, eo = {
  key: 1,
  class: "lp-input__suffix"
}, to = {
  key: 1,
  class: "lp-input__append"
}, no = {
  name: "LpInput",
  inheritAttrs: !1
}, ft = /* @__PURE__ */ le({
  ...no,
  props: {
    modelValue: {},
    type: { default: "text" },
    placeholder: {},
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    clearable: { type: Boolean },
    showPassword: { type: Boolean },
    prefixIcon: {},
    suffixIcon: {},
    maxlength: {},
    minlength: {},
    autocomplete: {},
    name: {},
    form: {},
    tabindex: {},
    rows: { default: 2 },
    autosize: { type: [Boolean, Object], default: !1 },
    size: { default: "default" },
    validateEvent: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "input", "change", "focus", "blur", "clear", "keydown", "keyup"],
  setup(n, { expose: e, emit: l }) {
    const t = n, o = l, s = al(), i = Oe("lpFormItem", null), r = P(), a = P(), d = P(!1), c = P(!1), k = P(!1), v = P(!1), w = A(() => t.size || (i == null ? void 0 : i.size) || "default"), g = A(() => t.type === "textarea"), R = A(() => !!t.autosize), I = A(() => {
      if (t.autosize && typeof t.autosize == "object")
        return t.autosize;
    }), j = (S) => {
      const ie = {};
      return S.split(";").forEach((de) => {
        const [E, ...Z] = de.split(":"), q = E == null ? void 0 : E.trim(), K = Z.join(":").trim();
        !q || !K || (ie[q] = K);
      }), ie;
    }, F = (S) => S ? Array.isArray(S) ? S.reduce((ie, de) => (Object.assign(ie, F(de)), ie), {}) : typeof S == "string" ? j(S) : typeof S == "object" ? { ...S } : {} : {}, u = A(() => F(s.style)), $ = A(() => {
      const S = u.value.height;
      return S == null ? "" : String(S).trim();
    }), f = A(() => {
      const S = { ...u.value };
      return g.value && !R.value && delete S.height, S;
    }), m = A(() => {
      const { style: S, ...ie } = s;
      return ie;
    }), b = A(() => {
      if (!g.value)
        return v.value ? "text" : t.type;
    }), p = async () => {
      if (!g.value || !R.value) return;
      await ve();
      const S = a.value;
      if (!S) return;
      S.style.height = "auto";
      const ie = S.scrollHeight, de = I.value;
      if (!de) {
        S.style.height = `${ie}px`;
        return;
      }
      const E = window.getComputedStyle(S), Z = Number.parseFloat(E.lineHeight || "0") || 21, q = Number.parseFloat(E.paddingTop || "0") + Number.parseFloat(E.paddingBottom || "0"), K = Number.parseFloat(E.borderTopWidth || "0") + Number.parseFloat(E.borderBottomWidth || "0");
      let re = ie;
      if (de.minRows && de.minRows > 0 && (re = Math.max(re, de.minRows * Z + q + K)), de.maxRows && de.maxRows > 0) {
        const D = de.maxRows * Z + q + K;
        re = Math.min(re, D), S.style.overflowY = ie > D ? "auto" : "hidden";
      } else
        S.style.overflowY = "hidden";
      S.style.height = `${re}px`;
    }, T = () => {
      const S = a.value;
      S && (S.style.height = "", S.style.overflowY = "");
    }, H = async () => {
      if (!g.value || R.value || d.value) return;
      const S = $.value;
      if (!S) return;
      await ve();
      const ie = r.value, de = a.value;
      if (!ie || !de) return;
      let E = S;
      if (/^\d+(\.\d+)?$/.test(E) && (E = `${E}px`), /px$/i.test(E)) {
        const Z = window.getComputedStyle(ie), q = Number.parseFloat(Z.borderTopWidth || "0"), K = Number.parseFloat(Z.borderBottomWidth || "0"), re = Number.parseFloat(E), D = Math.max(0, re - q - K);
        de.style.height = `${D}px`;
      } else
        de.style.height = E;
      d.value = !0;
    }, x = async () => {
      var S;
      await ve(), (S = a.value) == null || S.focus();
    }, M = () => {
      var S;
      (S = a.value) == null || S.blur();
    }, W = () => {
      var S;
      (S = a.value) == null || S.select();
    }, X = () => {
      var S;
      o("update:modelValue", ""), o("input", ""), o("change", ""), o("clear"), t.validateEvent && ((S = i == null ? void 0 : i.validate) == null || S.call(i, "change"));
    }, N = (S) => {
      var E;
      const ie = S.target, { value: de } = ie;
      k.value || (p(), o("update:modelValue", de), o("input", de), t.validateEvent && ((E = i == null ? void 0 : i.validate) == null || E.call(i, "input")));
    }, ee = (S) => {
      var E;
      const ie = S.target, { value: de } = ie;
      o("change", de), t.validateEvent && ((E = i == null ? void 0 : i.validate) == null || E.call(i, "change"));
    }, C = (S) => {
      c.value = !0, o("focus", S);
    }, B = (S) => {
      var ie;
      c.value = !1, o("blur", S), t.validateEvent && ((ie = i == null ? void 0 : i.validate) == null || ie.call(i, "blur"));
    }, J = () => {
      c.value || x();
    }, me = (S) => {
      S.stopPropagation(), X();
    }, ge = () => {
      v.value = !v.value, x();
    }, Fe = (S) => {
      o("keydown", S);
    }, Ve = (S) => {
      o("keyup", S);
    }, xe = () => {
      k.value = !0;
    }, Me = () => {
    }, be = (S) => {
      k.value = !1, N(S);
    };
    return ce(() => t.modelValue, () => {
      R.value && p();
    }), ce([() => t.type, () => t.autosize, () => t.rows], () => {
      R.value ? p() : (T(), H());
    }), ce(() => s.style, () => {
      d.value = !1, R.value || (T(), H());
    }), ke(() => {
      R.value ? p() : (T(), H());
    }), e({
      focus: x,
      blur: M,
      select: W,
      clear: X,
      input: a
    }), (S, ie) => (h(), _("div", il({ class: "lp-input" }, m.value, {
      style: f.value,
      class: {
        "lp-input--disabled": S.disabled,
        "lp-input--readonly": S.readonly,
        "lp-input--clearable": S.clearable && !S.disabled && !S.readonly,
        "lp-input--prefix": S.$slots.prefix || S.prefixIcon,
        "lp-input--suffix": S.$slots.suffix || S.suffixIcon || S.clearable || S.showPassword && !g.value,
        "lp-input--password": S.showPassword && !g.value,
        "lp-input--textarea": g.value,
        "lp-input--textarea-autosize": g.value && R.value,
        [`lp-input--${w.value}`]: w.value
      },
      onClick: J
    }), [
      S.$slots.prepend ? (h(), _("div", Zl, [
        ne(S.$slots, "prepend")
      ])) : V("", !0),
      L("div", {
        ref_key: "wrapperRef",
        ref: r,
        class: "lp-input__wrapper"
      }, [
        S.$slots.prefix || S.prefixIcon ? (h(), _("span", Ql, [
          ne(S.$slots, "prefix", {}, () => [
            S.prefixIcon ? (h(), _("i", {
              key: 0,
              class: G(S.prefixIcon)
            }, null, 2)) : V("", !0)
          ])
        ])) : V("", !0),
        (h(), ye(Qe(g.value ? "textarea" : "input"), {
          ref_key: "inputRef",
          ref: a,
          class: "lp-input__inner",
          type: b.value,
          value: S.modelValue,
          placeholder: S.placeholder,
          disabled: S.disabled,
          readonly: S.readonly,
          maxlength: S.maxlength,
          minlength: S.minlength,
          rows: g.value ? S.rows : void 0,
          autocomplete: S.autocomplete,
          name: S.name,
          form: S.form,
          tabindex: S.tabindex,
          onInput: N,
          onChange: ee,
          onFocus: C,
          onBlur: B,
          onKeydown: Fe,
          onKeyup: Ve,
          onCompositionstart: xe,
          onCompositionupdate: Me,
          onCompositionend: be
        }, null, 40, ["type", "value", "placeholder", "disabled", "readonly", "maxlength", "minlength", "rows", "autocomplete", "name", "form", "tabindex"])),
        S.$slots.suffix || S.suffixIcon || S.clearable || S.showPassword && !g.value ? (h(), _("span", eo, [
          ne(S.$slots, "suffix", {}, () => [
            S.clearable && !S.disabled && !S.readonly && S.modelValue ? (h(), _("i", {
              key: 0,
              class: "lp-input__clear lp-icon-circle-close",
              onClick: me
            })) : V("", !0),
            S.showPassword && !g.value ? (h(), _("i", {
              key: 1,
              class: G(["lp-input__password", v.value ? "lp-icon-view" : "lp-icon-hide"]),
              onClick: ge
            }, null, 2)) : V("", !0),
            S.suffixIcon ? (h(), _("i", {
              key: 2,
              class: G(S.suffixIcon)
            }, null, 2)) : V("", !0)
          ])
        ])) : V("", !0)
      ], 512),
      S.$slots.append ? (h(), _("div", to, [
        ne(S.$slots, "append")
      ])) : V("", !0)
    ], 16));
  }
}), lo = { class: "lp-input-number__input-box" }, oo = {
  key: 0,
  class: "lp-input-number__prepend"
}, so = ["value", "placeholder", "disabled", "readonly", "name", "autocomplete"], ao = {
  key: 1,
  class: "lp-input-number__append"
}, io = {
  key: 2,
  class: "lp-input-number__controls"
}, ro = {
  name: "LpInputNumber"
}, It = /* @__PURE__ */ le({
  ...ro,
  props: {
    modelValue: {},
    min: {},
    max: {},
    step: { default: 1 },
    stepStrictly: { type: Boolean },
    precision: {},
    size: { default: "default" },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    controls: { type: Boolean, default: !0 },
    controlsPosition: {},
    name: {},
    placeholder: {},
    autocomplete: { default: "off" },
    validateEvent: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change", "input", "focus", "blur"],
  setup(n, { expose: e, emit: l }) {
    const t = n, o = l, s = Oe("lpFormItem", null), i = P(), r = P(null), a = P(!1), d = P(null), c = A(() => t.size || (s == null ? void 0 : s.size) || "default"), k = A(() => {
      if (t.precision !== void 0)
        return t.precision;
      const C = R(t.step), B = R(t.modelValue);
      return Math.max(C, B);
    }), v = A(() => r.value !== null ? r.value : t.modelValue === void 0 || t.modelValue === null ? "" : typeof t.modelValue == "number" ? t.modelValue.toFixed(k.value) : String(t.modelValue)), w = A(() => t.disabled || t.max !== void 0 && t.modelValue !== void 0 && t.modelValue >= t.max), g = A(() => t.disabled || t.min !== void 0 && t.modelValue !== void 0 && t.modelValue <= t.min), R = (C) => {
      if (C === void 0) return 0;
      const B = C.toString(), J = B.indexOf(".");
      return J !== -1 ? B.length - J - 1 : 0;
    }, I = (C, B) => (B === void 0 && (B = k.value), parseFloat(Math.round(C * Math.pow(10, B)) / Math.pow(10, B) + "")), j = (C) => I(C, k.value), F = (C) => t.max !== void 0 && C > t.max ? t.max : t.min !== void 0 && C < t.min ? t.min : C, u = (C) => t.stepStrictly ? (R(t.step), Math.round(C / t.step) * t.step) : C, $ = () => {
      var C;
      (C = i.value) == null || C.focus();
    }, f = () => {
      var C;
      (C = i.value) == null || C.blur();
    }, m = () => {
      var C;
      (C = i.value) == null || C.select();
    }, b = () => {
      if (w.value) return;
      const C = t.modelValue || 0, B = F(j(C + t.step));
      T(B);
    }, p = () => {
      if (g.value) return;
      const C = t.modelValue || 0, B = F(j(C - t.step));
      T(B);
    }, T = (C) => {
      var J;
      const B = t.modelValue;
      C !== void 0 && (C = u(j(C)), C = F(C)), B !== C && (r.value = null, o("update:modelValue", C), o("change", C, B), t.validateEvent && ((J = s == null ? void 0 : s.validate) == null || J.call(s, "change")));
    }, H = (C) => {
      const J = C.target.value;
      if (r.value = J, J === "") {
        o("update:modelValue", void 0), o("input", void 0);
        return;
      }
      const me = Number(J);
      isNaN(me) || o("input", me);
    }, x = () => {
      const C = r.value;
      if (C === null || C === "") {
        T(void 0);
        return;
      }
      const B = Number(C);
      if (isNaN(B)) {
        r.value = null;
        return;
      }
      T(B);
    }, M = (C) => {
      a.value = !0, o("focus", C);
    }, W = (C) => {
      var B;
      a.value = !1, r.value = null, o("blur", C), t.validateEvent && ((B = s == null ? void 0 : s.validate) == null || B.call(s, "blur"));
    }, X = (C) => {
      switch (C.key) {
        case "ArrowUp":
          C.preventDefault(), b();
          break;
        case "ArrowDown":
          C.preventDefault(), p();
          break;
      }
    }, N = (C, B) => {
      if (B.button !== 0) return;
      const J = C === "increase" ? b : p;
      J(), d.value = setTimeout(() => {
        const me = setInterval(J, 100), ge = () => {
          clearInterval(me), document.removeEventListener("mouseup", ge);
        };
        document.addEventListener("mouseup", ge);
      }, 300);
    }, ee = () => {
      d.value && (clearTimeout(d.value), d.value = null);
    };
    return ce(
      () => t.modelValue,
      (C) => {
        r.value = null;
      },
      { immediate: !0 }
    ), e({
      focus: $,
      blur: f,
      select: m,
      increase: b,
      decrease: p
    }), (C, B) => (h(), _("div", {
      class: G(["lp-input-number", {
        "lp-input-number--disabled": C.disabled,
        "lp-input-number--controls-right": C.controlsPosition === "right",
        [`lp-input-number--${c.value}`]: c.value
      }])
    }, [
      C.controlsPosition !== "right" ? (h(), _("span", {
        key: 0,
        class: G(["lp-input-number__decrease", {
          "lp-input-number__decrease--disabled": g.value
        }]),
        onMousedown: B[0] || (B[0] = (J) => N("decrease", J)),
        onMouseup: ee,
        onMouseleave: ee
      }, B[4] || (B[4] = [
        L("i", { class: "lp-input-number__decrease-icon text" }, "-", -1)
      ]), 34)) : V("", !0),
      L("div", lo, [
        C.$slots.prepend ? (h(), _("div", oo, [
          ne(C.$slots, "prepend")
        ])) : V("", !0),
        L("input", {
          ref_key: "inputRef",
          ref: i,
          class: G(["lp-input-number__inner", {
            "lp-input-number__inner--with-prepend": C.$slots.prepend,
            "lp-input-number__inner--with-append": C.$slots.append
          }]),
          type: "text",
          value: v.value,
          placeholder: C.placeholder,
          disabled: C.disabled,
          readonly: C.readonly,
          name: C.name,
          autocomplete: C.autocomplete,
          onInput: H,
          onChange: x,
          onFocus: M,
          onBlur: W,
          onKeydown: X
        }, null, 42, so),
        C.$slots.append ? (h(), _("div", ao, [
          ne(C.$slots, "append")
        ])) : V("", !0)
      ]),
      C.controlsPosition !== "right" ? (h(), _("span", {
        key: 1,
        class: G(["lp-input-number__increase", {
          "lp-input-number__increase--disabled": w.value
        }]),
        onMousedown: B[1] || (B[1] = (J) => N("increase", J)),
        onMouseup: ee,
        onMouseleave: ee
      }, B[5] || (B[5] = [
        L("i", { class: "lp-input-number__increase-icon text" }, "+", -1)
      ]), 34)) : V("", !0),
      C.controlsPosition === "right" ? (h(), _("div", io, [
        L("span", {
          class: G(["lp-input-number__increase", {
            "lp-input-number__increase--disabled": w.value
          }]),
          onMousedown: B[2] || (B[2] = (J) => N("increase", J)),
          onMouseup: ee,
          onMouseleave: ee
        }, B[6] || (B[6] = [
          L("i", { class: "lp-input-number__increase-icon" }, "▲", -1)
        ]), 34),
        L("span", {
          class: G(["lp-input-number__decrease", {
            "lp-input-number__decrease--disabled": g.value
          }]),
          onMousedown: B[3] || (B[3] = (J) => N("decrease", J)),
          onMouseup: ee,
          onMouseleave: ee
        }, B[7] || (B[7] = [
          L("i", { class: "lp-input-number__decrease-icon" }, "▼", -1)
        ]), 34)
      ])) : V("", !0)
    ], 2));
  }
});
let uo = {
  install: (n) => {
    n.component(ft.name, ft), n.component(It.name, It);
  }
};
const co = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Input: ft,
  InputNumber: It,
  default: uo
}, Symbol.toStringTag, { value: "Module" })), po = /* @__PURE__ */ le({
  __name: "base",
  props: {
    name: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["enter", "leave", "afterEnter", "afterLeave", "leaveCancelled"],
  setup(n, { emit: e }) {
    const l = e, t = (a) => {
      a instanceof HTMLElement && (a.getBoundingClientRect(), ve(() => {
        const d = a.offsetHeight, c = a.offsetWidth;
        l("enter", a, {
          height: d,
          width: c
        });
      }));
    }, o = (a) => {
      a instanceof HTMLElement && (a.style.overflowY = "", a.style.overflowX = ""), l("afterEnter", a);
    }, s = (a) => {
    }, i = (a) => {
      l("afterLeave", a);
    }, r = (a) => {
      l("leaveCancelled", a);
    };
    return ke(() => {
    }), (a, d) => (h(), ye($t, {
      name: n.disabled ? "" : n.name,
      onBeforeEnter: t,
      onAfterEnter: o,
      onBeforeLeave: s,
      onAfterLeave: i,
      onLeaveCancelled: r
    }, {
      default: Le(() => [
        ne(a.$slots, "default")
      ]),
      _: 3
    }, 8, ["name"]));
  }
});
function fo(n) {
  var T, H, x;
  const e = P(null), l = P(null);
  n && (e.value = n.target, l.value = n.options);
  const t = P(null), o = P(null), s = o;
  o.value = ((H = (T = l.value) == null ? void 0 : T.position) == null ? void 0 : H.split("-")[0]) || null;
  const i = P(8), r = Ce({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }), a = Ce({
    position: "absolute",
    width: "14px",
    height: "14px",
    backgroundColor: ((x = l.value) == null ? void 0 : x.arrowColor) || "#fff",
    transform: "rotate(45deg)"
  }), d = P(!1);
  function c() {
    var X;
    if (!((X = l.value) != null && X.arrow) || !s.value) return;
    const M = l.value.arrowSize || i.value, [, W = "center"] = (l.value.position || "bottom-center").split("-");
    switch (Object.assign(a, {
      position: "absolute",
      width: `${M}px`,
      height: `${M}px`,
      transform: "rotate(45deg)",
      top: "",
      left: "",
      right: "",
      bottom: "",
      marginTop: "",
      marginLeft: "",
      marginRight: "",
      marginBottom: ""
    }), s.value) {
      case "top":
        if (a.bottom = `-${M / 2}px`, W === "start") {
          const N = r.width / 2;
          a.left = `${N}px`, a.marginLeft = `-${M / 2}px`;
        } else if (W === "end") {
          const N = r.width / 2;
          a.right = `${N}px`, a.marginRight = `-${M / 2}px`;
        } else
          a.left = "50%", a.marginLeft = `-${M / 2}px`;
        break;
      case "right":
        if (a.left = `-${M / 2}px`, W === "start") {
          const N = r.height / 2;
          a.top = `${N}px`, a.marginTop = `-${M / 2}px`;
        } else if (W === "end") {
          const N = r.height / 2;
          a.bottom = `${N}px`, a.marginBottom = `-${M / 2}px`;
        } else
          a.top = "50%", a.marginTop = `-${M / 2}px`;
        break;
      case "bottom":
        if (a.top = `-${M / 2}px`, W === "start") {
          const N = r.width / 2;
          a.left = `${N}px`, a.marginLeft = `-${M / 2}px`;
        } else if (W === "end") {
          const N = r.width / 2;
          a.right = `${N}px`, a.marginRight = `-${M / 2}px`;
        } else
          a.left = "50%", a.marginLeft = `-${M / 2}px`;
        break;
      case "left":
        if (a.right = `-${M / 2}px`, W === "start") {
          const N = r.height / 2;
          a.top = `${N}px`, a.marginTop = `-${M / 2}px`;
        } else if (W === "end") {
          const N = r.height / 2;
          a.bottom = `${N}px`, a.marginBottom = `-${M / 2}px`;
        } else
          a.top = "50%", a.marginTop = `-${M / 2}px`;
        break;
    }
  }
  function k(M) {
    return M.getBoundingClientRect();
  }
  function v(M, W, X, N) {
    switch (N) {
      case "start":
        return M;
      case "end":
        return M + W - X;
      case "center":
      default:
        return M + (W - X) / 2;
    }
  }
  function w(M, W, X, N) {
    switch (N) {
      case "start":
        return M;
      case "end":
        return M + W - X;
      case "center":
      default:
        return M + (W - X) / 2;
    }
  }
  function g(M, W, X, N, ee, C) {
    let B = 0;
    return M < 0 && (B += Math.abs(M)), M + X > ee && (B += M + X - ee), W < 0 && (B += Math.abs(W)), W + N > C && (B += W + N - C), B;
  }
  function R(M, W, X, N, ee) {
    const C = M.map((B) => {
      const J = g(
        B.x,
        B.y,
        W,
        X,
        N,
        ee
      );
      return { ...B, overflow: J };
    });
    return C.sort((B, J) => B.overflow - J.overflow), C[0];
  }
  function I(M, W, X, N, ee, C, B) {
    if (!ee || !l.value) {
      console.error("calculateFollowPosition - missing container or options:", {
        container: !!ee,
        options: !!l.value
      });
      return;
    }
    r.x = M + X / 2, r.y = W + N / 2, r.width = X, r.height = N;
    const J = ee.getBoundingClientRect(), me = J.width, ge = J.height;
    if (me === 0 || ge === 0) {
      setTimeout(() => {
        I(M, W, X, N, ee, C, B);
      }, 100);
      return;
    }
    const Fe = window.innerWidth, Ve = window.innerHeight, [xe, Me = "center"] = l.value.position.split("-");
    let be = [];
    const S = l.value.arrowSize || i.value, ie = l.value.arrow ? S : 0, de = {
      left: {
        x: M - me - ie,
        y: w(W, N, ge, Me)
      },
      right: {
        x: M + X + ie,
        y: w(W, N, ge, Me)
      },
      top: {
        x: v(M, X, me, Me),
        y: W - ge - ie
      },
      bottom: {
        x: v(M, X, me, Me),
        y: W + N + ie
      }
    }, E = de[xe];
    E && be.push({ direction: xe, ...E });
    const Z = ["top", "right", "bottom", "left"];
    let q = Z.indexOf(xe);
    if (q !== -1)
      for (let re = 1; re < Z.length; re++) {
        const D = Z[(q + re) % Z.length];
        be.push({
          direction: D,
          ...de[D]
        });
      }
    const K = R(be, me, ge, Fe, Ve);
    s.value = K.direction, c(), C.left = `${K.x}px`, C.top = `${K.y}px`, C.transform = "", C.right = "", C.bottom = "", B && B();
  }
  function j(M, W, X, N) {
    if (!l.value) return;
    const { clientX: ee, clientY: C } = M;
    I(ee, C, 0, 0, W, X, N);
  }
  function F(M, W, X) {
    if (!e.value) {
      console.error("updateFollowPosition - no follow target set");
      return;
    }
    if (typeof e.value != "string") {
      if (!l.value) {
        console.error("updateFollowPosition - missing follow options");
        return;
      }
      try {
        if (!(e.value instanceof HTMLElement)) {
          console.error("updateFollowPosition - target is not an HTMLElement:", e.value);
          return;
        }
        if (!document.body.contains(e.value)) {
          console.error("updateFollowPosition - target not in document"), p();
          return;
        }
        const N = k(e.value), { x: ee, y: C, width: B, height: J } = N;
        I(ee, C, B, J, M, W, X);
      } catch (N) {
        console.error("updateFollowPosition - error calculating position:", N);
      }
    }
  }
  function u(M, W, X) {
    var J;
    t.value && cancelAnimationFrame(t.value);
    const ee = 1e3 / (((J = l.value) == null ? void 0 : J.fps) || 60);
    let C = 0;
    const B = (me) => {
      t.value = requestAnimationFrame(B), !(me - C < ee) && (C = me, F(M, W, X));
    };
    t.value = requestAnimationFrame(B);
  }
  let $ = null, f = null, m = null;
  function b(M, W, X) {
    var N, ee;
    return n ? (d.value = ((N = l.value) == null ? void 0 : N.arrow) || !1, (ee = l.value) != null && ee.arrow && (i.value = l.value.arrowSize || 8, c()), typeof e.value == "string" && e.value === "mouse" ? ($ = (C) => j(C, M, W, X), window.addEventListener("mousemove", $)) : (F(M, W, X), l.value && l.value.fps ? u(M, W, X) : (f = () => {
      F(M, W, X);
    }, m = () => {
      F(M, W, X);
    }, window.addEventListener("resize", f), window.addEventListener("scroll", m, !0))), !0) : !1;
  }
  function p() {
    $ && window.removeEventListener("mousemove", $), f && window.removeEventListener("resize", f), m && window.removeEventListener("scroll", m, !0), t.value && (cancelAnimationFrame(t.value), t.value = null);
  }
  return {
    followTarget: e,
    followOptions: l,
    followAnimationFrame: t,
    followDirection: o,
    arrowDirection: s,
    arrowSize: i,
    arrowStyle: a,
    targetCenter: r,
    showArrow: d,
    initFollow: b,
    updateFollowPosition: F,
    updateArrowStyle: c,
    cleanup: p
  };
}
function fn(n) {
  return new Promise((e, l) => {
    let t;
    const o = () => {
      const s = n();
      s !== void 0 ? (cancelAnimationFrame(t), e(s)) : t = requestAnimationFrame(o);
    };
    t = requestAnimationFrame(o);
  });
}
function hn(n, e = "px") {
  return n ? typeof n == "string" ? n : `${n}${e}` : "";
}
function vn(n, e) {
  console.warn(`[${n}] ${e}`);
}
function ho(n, e) {
  throw new Error(`[${n}] ${e}`);
}
function ut(n) {
  return typeof n == "number";
}
function vo(n) {
  return n !== null && typeof n == "object";
}
function In(n, e) {
  let l = Array.isArray(n) ? [...n] : [n], t = !1, o = !1;
  const s = () => {
    const d = [];
    for (const c of l)
      typeof c == "string" ? document.querySelectorAll(c).forEach((k) => d.push(k)) : c instanceof HTMLElement && d.push(c);
    return d;
  }, i = (d) => {
    t = s().some((k) => k.contains(d.target));
  }, r = (d) => {
    if (!o)
      return;
    const k = s().some((v) => v.contains(d.target));
    (!t || !k) && e();
  }, a = () => {
    o && e();
  };
  return document.addEventListener("mousedown", i), document.addEventListener("click", r), window.addEventListener("blur", a), setTimeout(() => {
    o = !0;
  }, 0), {
    unbind: () => {
      document.removeEventListener("mousedown", i), document.removeEventListener("click", r), window.removeEventListener("blur", a);
    },
    appendSelector: (d) => {
      const c = Array.isArray(d) ? d : [d];
      l.push(...c);
    }
  };
}
const mo = {
  name: "lp-layer"
}, go = /* @__PURE__ */ le({
  ...mo,
  props: {
    position: { default: () => ({}) },
    zIndex: { default: 1e3 },
    transition: { default: "fade" },
    layerObj: {},
    follow: { default: () => ({
      target: null,
      options: {}
    }) },
    enableResizeTransition: { type: Boolean, default: !0 }
  },
  emits: ["after-leave", "close"],
  setup(n, { expose: e, emit: l }) {
    const t = l, o = Zt(), s = n, i = P(!1), r = P(null), a = P(null), d = P(!1), c = P(""), k = P(!1), v = P(!1);
    let w = !1;
    const g = Ce({
      zIndex: s.zIndex,
      position: "fixed"
    }), R = Ce({});
    function I() {
      c.value = `lp-${s.transition}`;
    }
    I();
    const { showArrow: j, arrowStyle: F, followDirection: u, initFollow: $, updateFollowPosition: f, cleanup: m } = fo(s.follow), b = A(() => !!(s.follow && s.follow.target)), p = A(() => {
      const E = u.value;
      return {
        closeing: v.value,
        "lp-layer--follow": b.value,
        [`lp-layer--follow-${E}`]: b.value && !!E
      };
    }), T = [];
    s.layerObj.options.useBodyScroll && (R["overflow-x"] = "auto", R["overflow-y"] = "auto");
    let H = null;
    s.layerObj.getTransitionComponent() ? H = s.layerObj.getTransitionComponent() : H = po;
    let x = {
      /**
       * 是否过渡完成
       */
      enter: !1,
      width: 0,
      height: 0
    };
    const M = P(!1);
    function W(E) {
      if (E != null)
        return typeof E == "number" ? `${E}px` : E;
    }
    function X(E) {
      const { width: Z, height: q } = s.position || {}, K = W(Z), re = W(q);
      E.width = K ?? "", E.height = re ?? "";
    }
    function N(E) {
      x.enter = !0, x.width = E.offsetWidth, x.height = E.offsetHeight;
    }
    function ee(E) {
      M.value = !0;
    }
    async function C(E, Z = "size") {
      return E.zIndex = "-100", E.opacity = "0", Object.assign(g, E), i.value = !0, Z == "size" ? (await fn(() => {
        if (x.enter)
          return !0;
      }), x) : (w = !0, d.value = !0, await ve(), i.value = !1, await fn(() => {
        if (!w)
          return !0;
      }), d.value = !1, await ve(), console.log("预加载完成", x), x);
    }
    const B = P(!1);
    async function J() {
      var ze, Pe;
      const { width: E, height: Z, x: q, y: K, reverse: re } = s.position || {}, D = {
        zIndex: s.zIndex,
        position: "fixed",
        transform: "",
        top: "",
        left: "",
        right: "",
        bottom: "",
        width: "",
        height: ""
      };
      E != null && (D.width = typeof E == "number" ? `${E}px` : E), Z != null && (D.height = typeof Z == "number" ? `${Z}px` : Z);
      const Xe = me();
      if ((ze = s.layerObj.options) != null && ze.group) {
        await C(D), await ve(), (Pe = s.layerObj.options) != null && Pe.group && await s.layerObj.options.group.computePosition(D, s.layerObj), D.opacity = "1", D.zIndex = s.zIndex, Object.assign(g, D);
        return;
      }
      let Ee = [];
      re ? (q === "center" || q === void 0 ? (D.left = "50%", Ee.push("translateX(-50%)")) : q === "right" ? D.right = "0" : typeof q == "number" ? D.right = `${q}px` : q ? D.right = q : D.left = "0", K === "center" || K === void 0 ? (D.top = "50%", Ee.push("translateY(-50%)")) : K === "top" ? D.top = "50px" : K === "bottom" ? D.bottom = "0" : typeof K == "number" ? D.bottom = `${K}px` : K ? D.bottom = K : D.top = "0") : (q === "center" || q === void 0 ? (D.left = "50%", Ee.push("translateX(-50%)")) : q === "right" ? D.right = "0" : typeof q == "number" ? D.left = `${q}px` : q ? D.left = q : D.left = "0", K === "center" || K === void 0 ? (D.top = "50%", Ee.push("translateY(-50%)")) : K === "top" ? D.top = "50px" : K === "bottom" ? D.bottom = "50px" : typeof K == "number" ? D.top = `${K}px` : K ? D.top = K : D.top = "0"), Ee.length > 0 && (D.transform = Ee.join(" ")), Xe && (await C(D, "load"), Ve(D)), D.opacity = "1", D.zIndex = s.zIndex, Object.assign(g, D);
    }
    function me() {
      var D;
      if ((D = s.layerObj.options) != null && D.group)
        return !0;
      const { width: E, height: Z, x: q, y: K, reverse: re } = s.position || {};
      return E === "auto" || E === void 0 || E === null || Z == "auto" || Z === void 0 || Z === null || q == "center" || !q && q !== 0 || K == "center" || !K && K !== 0;
    }
    const ge = P(null);
    async function Fe() {
      if (s.follow && s.follow.target) {
        X(g), $(a.value, g, () => {
          k.value || (k.value = !0, g.opacity = "1", setTimeout(() => {
            d.value = !1;
          }, 50));
        });
        return;
      }
      await J(), k.value = !0;
    }
    function Ve(E, Z = !1) {
      var Pe, He;
      const q = (Pe = E.transform) == null ? void 0 : Pe.includes("translateX(-50%)"), K = (He = E.transform) == null ? void 0 : He.includes("translateY(-50%)");
      if (!Z && !q && !K || !x.width || !x.height) return;
      const re = x.width, D = x.height, Xe = window.innerWidth, Ee = window.innerHeight;
      let ze = [];
      E.transform && E.transform.split(" ").forEach((tt) => {
        tt.includes("translate") || ze.push(tt);
      }), (q || Z) && (Math.abs(re - Xe) <= 1 || re >= Xe ? E.left = "0" : E.left = `calc(50% - ${Math.floor(re / 2)}px)`), (K || Z) && (Math.abs(D - Ee) <= 1 || D >= Ee ? E.top = "0" : E.top = `calc(50% - ${Math.floor(D / 2)}px)`), ze.length > 0 ? E.transform = ze.join(" ") : E.transform = "";
    }
    const xe = (E = "layer") => {
      i.value = !1, v.value = !0, s.follow && s.follow.target && m(), t("close"), T.forEach(({ event: Z, callback: q }) => {
        Z === "close" && q && q();
      });
    };
    function Me() {
      if (w) {
        w = !1;
        return;
      }
      v.value = !1, t("after-leave");
    }
    s.layerObj.setLayerInstance(o), P(!1), Be("lp-layer:core", {
      on: (E, Z) => {
        T.push({
          event: E,
          callback: Z
        });
      },
      off: (E, Z) => {
        let q = T.findIndex((K) => K.event === E && K.callback === Z);
        q !== -1 && T.splice(q, 1);
      }
    }), Be("layerInstance", o);
    function be(E) {
      if (B.value) {
        console.log("已在进行resize操作，忽略此次调用");
        return;
      }
      B.value = !0;
      const Z = parseInt(g.width) || x.width, q = parseInt(g.height) || x.height, K = { ...g };
      K.transition = "width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease, transform 0.3s ease", console.log("resizeLayer", E);
      let re, D;
      typeof E == "number" ? (re = Math.round(Z * E), D = Math.round(q * E), K.width = `${re}px`, K.height = `${D}px`) : (re = E.width, D = E.height, K.width = `${re}px`, K.height = `${D}px`), x.width, x.height, x.width = re, x.height = D, Ve(K, !0), Object.assign(g, K), setTimeout(() => {
        g.transition = "", setTimeout(() => {
          B.value = !1;
        }, 50);
      }, 300);
    }
    function S() {
      if (B.value) {
        console.log("已在进行resize操作，忽略此次全屏调用");
        return;
      }
      B.value = !0, ge.value || (ge.value = {
        width: g.width,
        height: g.height,
        left: g.left,
        top: g.top,
        right: g.right,
        bottom: g.bottom,
        transform: g.transform
      });
      const E = { ...g };
      E.transition = "width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease, transform 0.3s ease", Object.assign(E, {
        width: "100vw",
        height: "100vh",
        left: "0",
        top: "0",
        right: "",
        bottom: "",
        transform: ""
      }), x.width, x.height, x.width = window.innerWidth, x.height = window.innerHeight, Object.assign(g, E), setTimeout(() => {
        g.transition = "", setTimeout(() => {
          B.value = !1;
        }, 50);
      }, 300);
    }
    function ie() {
      if (!ge.value) return;
      if (B.value) {
        console.log("已在进行resize操作，忽略此次退出全屏调用");
        return;
      }
      B.value = !0;
      const E = { ...g };
      E.transition = "width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease, transform 0.3s ease";
      const Z = parseInt(ge.value.width) || 0, q = parseInt(ge.value.height) || 0;
      x.width = Z || 300, x.height = q || 200, Object.assign(E, ge.value), Object.assign(g, E), ge.value = null, setTimeout(() => {
        g.transition = "", setTimeout(() => {
          B.value = !1;
        }, 50);
      }, 300);
    }
    e({
      close: xe,
      updatePosition: () => {
        s.follow ? f(a.value, g) : J();
      },
      changeContainerStyle: (E) => {
        Object.assign(g, E);
      },
      getContainerStyle: () => g,
      getInstance: () => o,
      // 全屏切换功能
      toggleFullscreen: () => {
        g.width === "100vw" && g.height === "100vh" ? ie() : S();
      },
      // 进入全屏
      useFullscreen: () => {
        S();
      },
      // 退出全屏
      exitFullscreen: () => {
        ie();
      },
      // 调整大小
      resizeLayer: (E) => {
        be(E);
      }
    });
    async function de() {
      await Fe(), i.value = !0;
    }
    return ke(() => {
      if (de(), s.layerObj.options.useOutsideClose) {
        let E = In(a.value, () => {
          t("close"), E.unbind();
        });
      }
    }), Ke(() => {
      s.follow && s.follow.target && m();
    }), (E, Z) => (h(), _("div", {
      class: G(["lp-layer", p.value]),
      style: fe(g),
      ref_key: "containerRef",
      ref: a
    }, [
      (h(), ye(Qe(U(H)), {
        name: c.value,
        disabled: d.value,
        onEnter: N,
        onAfterEnter: ee,
        onAfterLeave: Me
      }, {
        default: Le(() => [
          et(L("div", {
            class: "lp-layer__box",
            ref_key: "layerRef",
            ref: r
          }, [
            s.follow && U(j) ? (h(), _("div", {
              key: 0,
              class: "lp-layer__arrow",
              style: fe(U(F))
            }, null, 4)) : V("", !0),
            L("div", {
              class: "lp-layer__body",
              style: fe(R)
            }, [
              ne(E.$slots, "default")
            ], 4)
          ], 512), [
            [Qt, i.value]
          ])
        ]),
        _: 3
      }, 40, ["name", "disabled"]))
    ], 6));
  }
}), yo = { class: "lp-dialog" }, _o = { class: "lp-dialog__header flex align-center justify-between" }, bo = { class: "lp-dialog__title" }, wo = { class: "lp-dialog__body" }, $o = {
  key: 0,
  class: "lp-dialog__footer"
}, Rn = {
  __name: "dialog",
  props: {
    title: {
      type: String,
      default: ""
    },
    showClose: {
      type: Boolean,
      default: !0
    },
    showFooter: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["close", "confirm", "cancel"],
  setup(n, { emit: e }) {
    const l = e, t = Zt();
    Be("layerContainerInstance", t);
    const o = () => {
      l("confirm"), s();
    }, s = () => {
      l("close");
    };
    return (i, r) => (h(), _("div", yo, [
      L("div", _o, [
        L("div", bo, te(n.title), 1),
        n.showClose ? (h(), _("div", {
          key: 0,
          class: "lp-dialog__close",
          onClick: s
        }, [
          ue(U(_e), {
            class: "lp-dialog-close_icon",
            is: "close",
            size: "18px"
          })
        ])) : V("", !0)
      ]),
      L("div", wo, [
        ne(i.$slots, "default")
      ]),
      n.showFooter ? (h(), _("div", $o, [
        ne(i.$slots, "footer", {}, () => [
          L("button", {
            class: "btn btn-info",
            onClick: r[0] || (r[0] = (...a) => i.handleCancel && i.handleCancel(...a))
          }, "取消"),
          L("button", {
            class: "btn btn-primary",
            onClick: o
          }, "确定")
        ])
      ])) : V("", !0)
    ]));
  }
}, Co = { class: "lp-drawer__header" }, ko = { class: "lp-drawer__title" }, So = { class: "lp-drawer__body" }, xo = {
  __name: "drawer",
  props: {
    title: {
      type: String,
      default: "抽屉"
    },
    showClose: {
      type: Boolean,
      default: !0
    },
    direction: {
      type: String,
      default: "right",
      // right, left, top, bottom
      validator: (n) => ["right", "left", "top", "bottom"].includes(n)
    }
  },
  emits: ["close"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = A(() => `lp-drawer--${l.direction}`), s = () => {
      t("close");
    };
    return (i, r) => (h(), _("div", {
      class: G(["lp-drawer", [o.value]])
    }, [
      L("div", Co, [
        L("span", ko, te(n.title), 1),
        n.showClose ? (h(), _("button", {
          key: 0,
          class: "lp-drawer__close",
          onClick: s
        }, "×")) : V("", !0)
      ]),
      L("div", So, [
        ne(i.$slots, "default")
      ])
    ], 2));
  }
}, zn = {
  appContext: null
}, To = /* @__PURE__ */ le({
  __name: "mask",
  props: {
    zIndex: {
      type: Number,
      default: 999
    },
    // 是否显示
    visible: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["click", "mounted"],
  setup(n, { expose: e, emit: l }) {
    const t = P(!1), o = l, s = Oe("lp-layer:core");
    function i() {
      t.value = !0;
    }
    s.on("close", i);
    function r(d) {
      o("click", d);
    }
    function a(d) {
      console.log("setEventsNone", d), t.value = d;
    }
    return e({
      setEventsNone: a
    }), wt(() => {
      s.off("close", i);
    }), (d, c) => (h(), _("div", {
      class: G(["lp-mask", { "pointer-events-none": t.value }]),
      style: fe({ zIndex: n.zIndex }),
      onClick: r
    }, null, 6));
  }
});
let ht = !1, Nn = 0, Ge = [];
function Eo() {
  if (ht) return;
  ht = !0, Nn = window.scrollY || document.documentElement.scrollTop;
  const n = Lo();
  document.body.classList.add("lp-layer-lock-scroll"), document.body.style.width = `calc(100vw - ${n}px)`;
}
function Lo() {
  return window.innerWidth - document.documentElement.clientWidth;
}
function Oo() {
  ht && (ht = !1, document.body.classList.remove("lp-layer-lock-scroll"), document.body.style.width = "", window.scrollTo(0, Nn));
}
function jo(n) {
  Ge.push(n), Ge.some((l) => Fn(l)) && Eo();
}
function Ao(n) {
  let e = Ge.indexOf(n);
  e !== -1 && Ge.splice(e, 1), !Ge.some((o) => Fn(o)) && Oo();
}
function Fn(n) {
  return n.options.lockBodyScroll !== null ? !!n.options.lockBodyScroll : !!n.options.useMask;
}
function Mo() {
  return Ge;
}
function dt(n) {
  return Ge.filter((e) => e.options.group === n);
}
class Vn {
  /**
   * 管理组构造函数
   * @param mode 管理组模式 x | y | xy
   */
  constructor(e = "x") {
    /**
     * 管理组模式
     * x: 水平管理组
     * y: 垂直管理组
     * xy: 水平和垂直管理组(排列一行满了，自动换行)
     */
    se(this, "mode", "x");
    /**
     * 管理组内部对齐方式(类似flex布局的justify-content)
     * start: 左对齐
     * center: 居中对齐
     * end: 右对齐
     * null: 不进行对齐
     */
    se(this, "justifyContent", "start");
    /**
     * 管理组内部对齐方式(类似flex布局的align-items)
     * start: 顶部对齐
     * center: 居中对齐
     * end: 底部对齐
     */
    se(this, "alignItems", "start");
    /**
     * 管理组内部边距
     * 控制弹出层在可渲染区域内
     */
    se(this, "paddingSize", 10);
    /**
     * 层与层之间的间距
     * 两个层之间的间距
     */
    se(this, "spaceSize", 16);
    /**
     * 位置过渡动画时长（毫秒）
     */
    se(this, "transitionDuration", 300);
    /**
     * 位置过渡动画函数
     */
    se(this, "transitionTimingFunction", "ease");
    /**
     * xy模式下每行的最大宽度
     */
    se(this, "rowMaxWidth", 0);
    /**
     * xy模式下单个项的标准宽度（0表示自动）
     */
    se(this, "itemWidth", 0);
    /**
     * xy模式下每行最大项数
     */
    se(this, "itemsPerRow", 0);
    se(this, "groupElement", null);
    this.mode = e, this.groupElement = document.createElement("div"), this.groupElement.classList.add("lp-layer-group");
  }
  /**
   * 获取追加到的元素
   * @returns 
   */
  renderGroupElement() {
    return this.groupElement && !this.groupElement.parentElement && document.body.appendChild(this.groupElement), this.groupElement;
  }
  /**
   * 卸载从body中移除组元素
   */
  unmountGroupElement() {
    this.groupElement && this.groupElement.parentElement && this.groupElement.parentElement.removeChild(this.groupElement);
  }
  /**
   * 处理窗口大小变化
   */
  handleResize() {
    this.mode === "xy" && (this.rowMaxWidth = window.innerWidth - this.paddingSize * 2, this.updateLayersPosition());
  }
  /**
   * 设置xy模式下的行宽度
   */
  setRowMaxWidth(e) {
    return this.rowMaxWidth = e, this;
  }
  /**
   * 设置xy模式下的单个项标准宽度
   */
  setItemWidth(e) {
    return this.itemWidth = e, this;
  }
  /**
   * 设置xy模式下每行最大项数
   */
  setItemsPerRow(e) {
    return this.itemsPerRow = e, this;
  }
  /**
   * 设置位置过渡动画时长
   */
  transition(e, l = "ease") {
    return this.transitionDuration = e, this.transitionTimingFunction = l, this;
  }
  /**
   * 设置管理组内部边距
   */
  padding(e) {
    return this.paddingSize = e, this;
  }
  /**
   * 设置层与层之间的间距
   */
  space(e) {
    return this.spaceSize = e, this;
  }
  /**
   * 设置管理组内部对齐方式
   * @param justifyContent 水平对齐方式
   * @param alignItems 垂直对齐方式
   */
  align(e, l) {
    return this.justifyContent = e, this.alignItems = l, this;
  }
  /**
   * 初始化组容器样式
   */
  initGroupContainerStyle() {
    this.groupElement && (this.mode === "x" ? (this.groupElement.style.flexDirection = "row", this.groupElement.style.flexWrap = "nowrap") : this.mode === "y" ? (this.groupElement.style.flexDirection = "column", this.groupElement.style.flexWrap = "nowrap") : this.mode === "xy" && (this.groupElement.style.flexDirection = "row", this.groupElement.style.flexWrap = "wrap"), this.justifyContent && (this.groupElement.style.justifyContent = this.justifyContent), this.groupElement.style.alignItems = this.alignItems, this.groupElement.style.padding = `${this.paddingSize}px`, this.groupElement.style.gap = `${this.spaceSize}px`);
  }
  /**
   * TODO 计算层的位置
   * @param containerStyle 容器样式
   * @param layer 层对象
   */
  computePosition(e, l) {
    return new Promise((t, o) => {
      if (l.options.follow && l.options.follow.target)
        return;
      this.renderGroupElement(), this.initGroupContainerStyle(), dt(this).filter((a) => a.layerElement && !a.closing);
      let i = l.getLayerInfo(), r = this.getOrCreatePlaceholder(l);
      r.style.width = `${i.width}px`, r.style.height = `${i.height}px`, this.mode === "xy" && this.itemWidth > 0 && (r.style.width = `${this.itemWidth}px`), requestAnimationFrame(() => {
        const a = r.getBoundingClientRect();
        e.top = `${a.top}px`, e.left = `${a.left}px`, this.mode !== "x" && (e.width = `${i.width}px`), this.mode !== "y" && (e.height = `${i.height}px`), l.layerElement && Object.entries(e).forEach(([d, c]) => {
          c != null && (l.layerElement.style[d] = c);
        }), this.updateLayersPosition(), t(this);
      });
    });
  }
  /**
   * 获取或创建层的占位元素
   * @param layer 层对象
   * @returns 占位元素
   */
  getOrCreatePlaceholder(e) {
    this.groupElement || this.renderGroupElement();
    let l = `p-${e.id}`, t = document.getElementById(l);
    return t || (t = document.createElement("div"), t.id = l, t.className = "lp-layer-placeholder", t.dataset.layerId = e.id, this.groupElement.appendChild(t)), t;
  }
  /**
   * 更新组内所有层的位置
   * @todo 在有元素被移除后, 需要重新计算位置
   */
  updateLayersPosition() {
    this.renderGroupElement();
    const l = dt(this).filter((t) => t.layerElement && !t.closing);
    l.forEach((t) => {
      t.groupResetStatus = 1;
    }), this.cleanupPlaceholders(l), l.forEach((t) => {
      if (t.layerElement) {
        const o = t.getLayerInfo(), s = this.getOrCreatePlaceholder(t);
        s.style.width = `${o.width}px`, s.style.height = `${o.height}px`, this.mode === "xy" && this.itemWidth > 0 && (s.style.width = `${this.itemWidth}px`);
      }
    }), requestAnimationFrame(() => {
      l.forEach((t) => {
        if (t.layerElement) {
          const o = `p-${t.id}`, s = document.getElementById(o);
          if (s) {
            const i = s.getBoundingClientRect(), r = t.layerElement.style;
            let a = Object.assign({}, {
              transform: r.transform,
              transition: r.transition,
              top: r.top,
              left: r.left,
              right: r.right,
              bottom: r.bottom,
              width: r.width,
              height: r.height
            });
            a.transition = `left ${this.transitionDuration}ms ${this.transitionTimingFunction}, top ${this.transitionDuration}ms ${this.transitionTimingFunction}`, a.top = `${i.top}px`, a.left = `${i.left}px`;
            const d = t.getLayerInstance();
            d && d.exposed && d.exposed.changeContainerStyle(a);
          }
        }
      });
    });
  }
  /**
   * 清理不再可见的层的占位元素
   * @param visibleLayers 当前可见的层
   */
  cleanupPlaceholders(e) {
    if (!this.groupElement) return;
    const l = this.groupElement.querySelectorAll(".lp-layer-placeholder"), t = new Set(e.map((o) => o.id));
    l.forEach((o) => {
      const s = o.getAttribute("data-layer-id");
      s && !t.has(s) && o.remove();
    });
  }
  // SECTION 窗口大小变化事件
  /**
   * 注册窗口大小变化事件
   */
  regResizeEvent() {
    window.addEventListener("resize", this.handleResize.bind(this));
  }
  /**
   * 移除窗口大小变化事件
   */
  unregResizeEvent() {
    typeof window < "u" && window.removeEventListener("resize", this.handleResize.bind(this));
  }
  // !SECTION
  getLayers() {
    return dt(this).filter((l) => l.layerElement && !l.closing);
  }
}
let Po = 1e3;
const Bo = {
  dialog: Rn,
  drawer: xo
  // 可以在这里添加更多容器类型
};
class Ie {
  constructor() {
    /**
     * 层id
     */
    se(this, "id", "");
    se(this, "layerInstance", null);
    /**
     * 组重置状态
     * @todo 用于在层关闭时, 组内其它层需要重新计算位置
     */
    se(this, "groupResetStatus", 0);
    se(this, "options");
    se(this, "layerVnode", null);
    se(this, "contentVnode", null);
    se(this, "maskLayer", null);
    se(this, "closing", !1);
    se(this, "layerZIndex", 0);
    se(this, "maskZIndex", 0);
    se(this, "containerEl", null);
    se(this, "layerElement", null);
    se(this, "createTime", 0);
    this.options = {
      component: null,
      useMask: !1,
      useOutsideClose: !1,
      useBodyScroll: !0,
      transition: "fade",
      drawerDirection: "right",
      events: {},
      follow: {
        target: null,
        options: { position: "bottom-center" }
      },
      lockBodyScroll: null,
      sourceInstance: null
    };
  }
  // 为了兼容旧代码，提供vnode属性
  get vnode() {
    return this.layerVnode;
  }
  static src(e) {
    const l = new Ie();
    return l.options.component = e, l.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), l.createTime = Date.now(), l;
  }
  /**
   * 来源组件实例的上下文
   * @todo 实现读取组件的`provide`
   * @param instance 组件实例
   * @returns 
   */
  source(e) {
    return this.options.sourceInstance = e, this;
  }
  /**
   * 解析应用上下文
   * @returns 应用上下文或undefined
   */
  resolveAppContext() {
    const e = this.options.sourceInstance, l = (e == null ? void 0 : e.appContext) || zn.appContext;
    if (!l)
      return;
    if (!e) return l;
    const t = e.provides;
    return {
      ...l,
      provides: t || l.provides
    };
  }
  model(e) {
    return this.options.model = e, this;
  }
  zIndex(e) {
    return this.options.zIndex = e, this;
  }
  on(e, l) {
    return this.options.events[e] = l, this;
  }
  off(e) {
    return delete this.options.events[e], this;
  }
  /**
   * 设置容器
   * @param container 容器组件或容器名称
   * @returns 
   */
  container(e, l = {}) {
    return typeof e == "string" ? this.options.containerComponent = Bo[e] || null : this.options.containerComponent = e, this.options.containerProps = l, this;
  }
  /**
   * 设置过渡动画组件
   * @param transition 过渡动画组件
   * @returns 
   */
  transitionComponent(e) {
    return this.options.transitionComponent = e, this;
  }
  getTransitionComponent() {
    return this.options.transitionComponent;
  }
  group(e) {
    return this.options.group = e, this;
  }
  props(e) {
    return this.options.props = e, this;
  }
  containerProps(e) {
    return this.options.containerProps = e, this;
  }
  containerModel(e) {
    return this.options.containerModel = e, this;
  }
  appendTo(e) {
    let l = null;
    return typeof e == "string" ? l = document.querySelector(e) : l = e, this.options.appendTo = l, this;
  }
  /**
   * 设置是否开启遮罩层
   * @param use 是否开启(true时开启，false时关闭)
   * @param options 遮罩层配置 
   * - close: 是否点击遮罩层关闭层
   * @returns 
   */
  useMask(e = !0, l = {}) {
    return this.options.useMask = e, this.options.maskOptions = Object.assign({
      close: !0
    }, l), this;
  }
  /**
   * 开启外部点击事件关闭层
   */
  useOutsideClose() {
    return this.options.useOutsideClose = !0, this;
  }
  /**
   * 设置是否开启lp-layer-body滚动
   * @param use 是否开启(true时开启，false时关闭)
   * @returns 
   * 
   * - 默认开启
   */
  useBodyScroll(e = !0) {
    return this.options.useBodyScroll = e, this;
  }
  /**
   * 设置是否锁定body滚动
   * @param lock 是否锁定(null时根据useMask来决定)
   *
   * @todo null时根据useMask来决定
   * @todo true时锁定
   * @todo false时不锁定
   * 
   * @returns 
   */
  lockBodyScroll(e = !0) {
    return this.options.lockBodyScroll = e, this;
  }
  /**
   * 设置过渡类型
   * @param type 过渡类型
   * @example 'fade' | 'zoom' | 'slide-top' | 'slide-bottom' | 'slide-left' | 'slide-right' | 'expand' | 'expand-xy' | 'drawer-right' | 'drawer-left' | 'drawer-top' | 'drawer-bottom'
   * @returns 
   */
  transition(e) {
    return this.options.transition = e, this;
  }
  /**
   * 设置是否追踪某个dom
   * @param target 要跟随的目标元素，可以是DOM元素或"mouse"字符串表示跟随鼠标
   * @param options 跟随选项
   * @returns 
   */
  follow(e, l) {
    if (typeof e != "string" && !(e instanceof HTMLElement))
      throw console.error("Layer.follow - 无效的目标元素类型，必须是HTMLElement或字符串"), new Error("目标元素类型必须是HTMLElement或字符串");
    return this.options.follow = {
      target: e,
      options: l
    }, this;
  }
  /**
   * 设置抽屉方向
   * @param direction 方向
   * @returns 
   */
  drawerDirection(e) {
    return this.options.drawerDirection = e, this.options.transition = `drawer-${e}`, this;
  }
  getContentComponent() {
    return dl(this.options.component);
  }
  /**
   * 打开弹出层
   * @param position 弹出层位置
   * @returns 
   */
  async open(e = {}) {
    var a;
    this.closing = !1, this.options.follow && this.options.follow.target ? this.options.position = {
      width: e.width ?? "auto",
      height: e.height ?? "auto"
    } : this.options.position = e;
    let l = {
      onLayerFullscreen: () => {
        console.log("进入或退出全屏"), this.layerInstance && this.layerInstance.exposed && this.layerInstance.exposed.toggleFullscreen();
      },
      onLayerUseFullscreen: () => {
        console.log("进入全屏"), this.layerInstance && this.layerInstance.exposed && this.layerInstance.exposed.useFullscreen();
      },
      onLayerExitFullscreen: () => {
        console.log("退出全屏"), this.layerInstance && this.layerInstance.exposed && this.layerInstance.exposed.exitFullscreen();
      },
      onLayerResize: (d) => {
        console.log("缩放", d), this.layerInstance && this.layerInstance.exposed && this.layerInstance.exposed.resizeLayer(d);
      }
    };
    this.layerZIndex = this.options.zIndex || Po++, this.maskZIndex = this.layerZIndex - 1;
    const t = (d = "layer") => {
      this.closing || (this.hide(d), this.options.events.close && this.options.events.close());
    }, o = this.getContentComponent();
    let s = ue(o, {
      modelValue: this.options.model,
      ...this.options.props,
      "onUpdate:modelValue": (d) => {
        this.options.model && (this.options.model = d);
      },
      onClose: () => {
        t("content");
      },
      // 添加弹出层事件监听处理
      ...l,
      // 添加事件监听处理
      ...Object.keys(this.options.events).reduce((d, c) => (c !== "close" && (d[`on${c.charAt(0).toUpperCase() + c.slice(1)}`] = (...k) => {
        this.options.events[c] && this.options.events[c](...k);
      }), d), {})
    }), i = null;
    if (this.options.containerComponent) {
      const d = ((a = this.options.containerComponent) == null ? void 0 : a.default) || this.options.containerComponent, c = {
        ...this.options.containerProps,
        modelValue: this.options.containerModel,
        onClose: () => {
          t("container");
        },
        "onUpdate:modelValue": (k) => {
          this.options.containerModel && (this.options.containerModel = k);
        }
      };
      i = ue(d, c, {
        default: () => [s]
      });
    } else
      i = s;
    return this.layerVnode = ue(go, {
      position: this.options.position,
      zIndex: this.layerZIndex,
      transition: this.options.transition,
      onClose: () => {
        t("layer");
      },
      onAfterLeave: () => {
        this.handleAfterLeave();
      },
      layerObj: this,
      follow: this.options.follow
    }, {
      default: () => [i]
    }), this.contentVnode = s, this.layerVnode.appContext = this.resolveAppContext(), this.containerEl = this.getContainer(), this.options.useMask && this.createMask(t), await ve(), un(this.layerVnode, this.containerEl), this.layerElement = this.containerEl.firstElementChild, this.getAppendTo().appendChild(this.layerElement), jo(this), this;
  }
  /**
   * 显示层
   * @todo open方法代理
   * @param position 位置
   * @returns 
   */
  async show(e = {}) {
    return await this.open(e);
  }
  /**
   * 获取追加到的元素
   * @returns 
   */
  getAppendTo() {
    return this.options.group ? document.body : this.options.appendTo ? this.options.appendTo : document.body;
  }
  /**
   * 处理关闭后
   * @todo 关闭动画结束后，删除元素
   * 
   */
  handleAfterLeave() {
    if (this.options.group && this.id) {
      const l = `placeholder-${this.id}`, t = document.getElementById(l);
      t && t.parentNode && t.parentNode.removeChild(t);
    }
    this.removeElements(), Ao(this);
    const e = this.options.group;
    e && e.updateLayersPosition();
  }
  getContainer() {
    return document.createElement("div");
  }
  /**
   * 创建遮罩层
   * @param closeHandler 关闭回调
   */
  createMask(e) {
    this.maskLayer = Ie.src(To).props({
      zIndex: this.maskZIndex,
      visible: !0
    }).appendTo(this.getAppendTo()).on("click", (l) => {
      var t;
      (t = this.options.maskOptions) != null && t.close && e("mask"), this.emit("maskClick", l);
    }).zIndex(this.maskZIndex).transition("fade").useMask(!1), this.maskLayer.show({
      x: 0,
      y: 0,
      width: "100%",
      height: "100%"
    });
  }
  hide(e = "layer") {
    if (!this.closing)
      if (this.closing = !0, this.maskLayer && (this.maskLayer.hide(), this.maskLayer = null), this.layerVnode && this.layerVnode.component && this.layerVnode.component.exposed)
        try {
          this.layerVnode.component.exposed.close(e);
        } catch (l) {
          console.error("Error closing layer:", l), this.removeElements();
        }
      else
        console.debug("exposed 不存在"), this.removeElements();
  }
  /**
   * 移除所有DOM元素
   * 
   */
  removeElements() {
    try {
      this.containerEl && un(null, this.containerEl), this.layerElement && this.layerElement.parentNode && this.layerElement.parentNode.removeChild(this.layerElement), this.layerVnode = null, this.containerEl = null, this.layerElement = null;
    } catch (e) {
      console.error("Error removing layer elements:", e);
    }
    this.closing = !1;
  }
  // 触发自定义事件
  emit(e, ...l) {
    return this.options.events[e] && this.options.events[e](...l), this;
  }
  /**
   * 获取层大小
   * @returns 
   */
  getLayerInfo() {
    if (!this.layerElement) return { width: 0, height: 0, x: 0, y: 0 };
    const e = this.layerElement.getBoundingClientRect();
    return {
      width: e.width,
      height: e.height,
      x: this.layerElement.offsetLeft,
      y: this.layerElement.offsetTop
    };
  }
  /**
  * 设置层实例
  * @param layerInstance 层实例
  */
  setLayerInstance(e) {
    return this.layerInstance = e, this;
  }
  /**
   * 获取层实例
   * @returns 层实例
   */
  getLayerInstance() {
    return this.layerInstance;
  }
  // SECTION 外部操作方法
  /**
   * 关闭层
   */
  close(e = !1) {
    this.hide();
  }
  /**
   * 关闭所有层
   * @param check 过滤方法
   */
  static closeAll(e = null) {
    Mo().forEach((t) => {
      e && !e(t) || t.close();
    });
  }
  /**
   * 关闭组内所有层
   * @param group 组
   */
  static closeByGroup(e) {
    dt(e).forEach((t) => {
      t.close();
    });
  }
  // !SECTION
}
const Io = { class: "lp-toast__content" }, Ro = {
  key: 0,
  class: "lp-toast__icon"
}, zo = { class: "lp-toast__message" }, No = /* @__PURE__ */ le({
  __name: "toast",
  props: {
    message: { default: "" },
    duration: { default: 3e3 },
    type: { default: "info" }
  },
  emits: ["close", "shown"],
  setup(n, { emit: e }) {
    const l = n, t = {
      primary: "info-fill",
      success: "success-fill",
      warning: "warning-fill",
      danger: "error-fill",
      info: "info-fill"
    }, o = e;
    let s, i = l.duration, r = 0;
    const a = () => {
      s !== void 0 && (window.clearTimeout(s), s = void 0);
    }, d = (v) => {
      if (a(), v <= 0) {
        o("close");
        return;
      }
      r = Date.now(), s = window.setTimeout(() => {
        o("close");
      }, v);
    }, c = () => {
      if (l.duration <= 0 || s === void 0) return;
      const v = Date.now() - r;
      i = i - v, i < 500 && (i = 500), a();
    }, k = () => {
      l.duration <= 0 || s !== void 0 || d(i);
    };
    return ke(() => {
      o("shown"), l.duration > 0 && d(l.duration);
    }), Ke(() => {
      a();
    }), (v, w) => (h(), _("div", {
      class: G(["lp-toast", [`lp-toast-${v.type}`]]),
      onMouseenter: c,
      onMouseleave: k
    }, [
      L("div", Io, [
        t[v.type] ? (h(), _("div", Ro, [
          ue(U(_e), {
            is: t[v.type],
            size: "16",
            color: `var(--lp-color-${v.type})`
          }, null, 8, ["is", "color"])
        ])) : V("", !0),
        L("div", zo, [
          ne(v.$slots, "default", {}, () => [
            je(te(v.message), 1)
          ])
        ])
      ])
    ], 34));
  }
}), Wn = new Vn("y");
Wn.space(20).padding(20).align("start", "center");
async function tn(n, e) {
  return e = {
    message: n || "Toast",
    duration: (e == null ? void 0 : e.duration) || 2e3,
    type: (e == null ? void 0 : e.type) || "info"
  }, Ie.src(No).group(Wn).props({
    message: e == null ? void 0 : e.message,
    duration: e == null ? void 0 : e.duration,
    type: e == null ? void 0 : e.type
  }).transition("slide-top").show({
    width: "auto",
    height: "auto"
  });
}
async function Dn(n) {
  const e = typeof n == "string" ? { message: n } : n;
  return new Promise(async (l) => {
    const t = await import("./confirm-BGvYs8XV.js"), o = Ce({
      message: e.message || "确认执行此操作？"
    }), s = {
      onConfirm: () => {
        i.hide(), l(!0);
      },
      onCancel: () => {
        i.hide(), l(!1);
      }
    }, i = await Ie.src(t.default).useMask().container("dialog").containerModel({
      title: e.title || "确认",
      showClose: !0
    }).model(o).props(s).show();
  });
}
async function Hn(n) {
  const e = typeof n == "string" ? { message: n } : n;
  return new Promise(async (l) => {
    const t = await import("./alert-CItR2_B_.js"), o = Ce({
      message: e.message || ""
    }), s = {
      onClose: () => {
        i.hide(), l();
      }
    }, i = await Ie.src(t.default).useMask().useBodyScroll(!1).container("dialog").containerModel({
      title: e.title || "提示",
      showClose: !0
    }).model(o).props(s).show();
  });
}
let Fo = {
  install: (n) => {
    n.config.globalProperties.$toast = tn, n.config.globalProperties.$confirm = Dn, n.config.globalProperties.$alert = Hn, n.config.globalProperties.$layer = Ie;
  }
};
const Vo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DialogContainer: Rn,
  Layer: Ie,
  LayerGroup: Vn,
  alert: Hn,
  confirm: Dn,
  default: Fo,
  toast: tn,
  useOutsideClick: In
}, Symbol.toStringTag, { value: "Module" })), Wo = {
  name: "lp-layout"
}, Do = /* @__PURE__ */ le({
  ...Wo,
  props: {
    type: { default: "flex" },
    cols: {},
    rows: {},
    gap: {},
    gapX: {},
    gapY: {},
    justifyContent: {},
    alignContent: {},
    justifyItems: {},
    alignItems: {},
    height: {},
    width: {},
    minHeight: {},
    minWidth: {},
    direction: { default: "column" },
    wrap: { type: Boolean, default: !1 },
    template: {},
    gridTemplateColumns: {},
    gridTemplateRows: {},
    gridTemplateAreas: {}
  },
  setup(n) {
    const e = n, l = A(() => {
      const o = [];
      return e.template ? o.push("lp-grid-layout", e.template) : e.type === "grid" ? (o.push("lp-grid"), e.cols && (typeof e.cols == "number" ? o.push(`cols-${e.cols}`) : o.push(`cols-${e.cols}`)), e.rows && (typeof e.rows == "number" ? o.push(`rows-${e.rows}`) : typeof e.rows == "string" && o.push(`rows-${e.rows}`)), e.gap !== void 0 && typeof e.gap == "number" && o.push(`gap-${e.gap}`), e.gapX !== void 0 && typeof e.gapX == "number" && o.push(`gap-x-${e.gapX}`), e.gapY !== void 0 && typeof e.gapY == "number" && o.push(`gap-y-${e.gapY}`), e.justifyContent && o.push(`justify-${e.justifyContent}`), e.alignContent && o.push(`align-${e.alignContent}`), e.justifyItems && o.push(`justify-items-${e.justifyItems}`), e.alignItems && o.push(`items-${e.alignItems}`), e.height === "100vh" ? o.push("h-screen") : e.height === "100%" && o.push("h-full"), e.minHeight === "100vh" ? o.push("min-h-screen") : e.minHeight === "100%" && o.push("min-h-full"), e.width === "100%" ? o.push("w-full") : e.width === "100vw" && o.push("w-screen")) : (o.push("lp-layout"), e.direction && o.push(e.direction), e.wrap && o.push("wrap"), e.justifyContent && e.alignItems && o.push(`${e.justifyContent}-${e.alignItems}`)), o;
    }), t = A(() => {
      const o = {};
      return e.gridTemplateColumns && (o.gridTemplateColumns = e.gridTemplateColumns), e.gridTemplateRows && (o.gridTemplateRows = e.gridTemplateRows), e.gridTemplateAreas && (o.gridTemplateAreas = e.gridTemplateAreas), e.gap && typeof e.gap == "string" && (o.gap = e.gap), e.gapX && typeof e.gapX == "string" && (o.columnGap = e.gapX), e.gapY && typeof e.gapY == "string" && (o.rowGap = e.gapY), e.height && typeof e.height == "string" && !["100vh", "100%"].includes(e.height) ? o.height = e.height : typeof e.height == "number" && (o.height = `${e.height}px`), e.width && typeof e.width == "string" && !["100%", "100vw"].includes(e.width) ? o.width = e.width : typeof e.width == "number" && (o.width = `${e.width}px`), e.minHeight && typeof e.minHeight == "string" && !["100vh", "100%"].includes(e.minHeight) ? o.minHeight = e.minHeight : typeof e.minHeight == "number" && (o.minHeight = `${e.minHeight}px`), e.minWidth && typeof e.minWidth == "string" ? o.minWidth = e.minWidth : typeof e.minWidth == "number" && (o.minWidth = `${e.minWidth}px`), o;
    });
    return (o, s) => (h(), _("div", {
      class: G(l.value),
      style: fe(t.value)
    }, [
      ne(o.$slots, "default")
    ], 6));
  }
}), Ho = {
  name: "lp-grid-item"
}, Uo = /* @__PURE__ */ le({
  ...Ho,
  props: {
    colSpan: {},
    rowSpan: {},
    colStart: {},
    colEnd: {},
    rowStart: {},
    rowEnd: {},
    justifySelf: {},
    alignSelf: {},
    area: {},
    gridColumn: {},
    gridRow: {}
  },
  setup(n) {
    const e = n, l = A(() => {
      const o = ["lp-grid-item"];
      return e.colSpan && (typeof e.colSpan == "number" ? o.push(`col-span-${e.colSpan}`) : o.push(`col-span-${e.colSpan}`)), e.rowSpan && (typeof e.rowSpan == "number" ? o.push(`row-span-${e.rowSpan}`) : o.push(`row-span-${e.rowSpan}`)), e.colStart && o.push(`col-start-${e.colStart}`), e.colEnd && o.push(`col-end-${e.colEnd}`), e.rowStart && o.push(`row-start-${e.rowStart}`), e.rowEnd && o.push(`row-end-${e.rowEnd}`), e.justifySelf && o.push(`justify-self-${e.justifySelf}`), e.alignSelf && o.push(`align-self-${e.alignSelf}`), o;
    }), t = A(() => {
      const o = {};
      return e.area && (o.gridArea = e.area), e.gridColumn && (o.gridColumn = e.gridColumn), e.gridRow && (o.gridRow = e.gridRow), o;
    });
    return (o, s) => (h(), _("div", {
      class: G(l.value),
      style: fe(t.value)
    }, [
      ne(o.$slots, "default")
    ], 6));
  }
});
let Go = {
  install: (n) => {
  }
};
const Ko = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GridItem: Uo,
  Layout: Do,
  default: Go
}, Symbol.toStringTag, { value: "Module" })), Yo = { class: "item" }, Xo = {
  name: "lp-list"
}, mn = /* @__PURE__ */ Object.assign(Xo, {
  props: {
    data: {
      type: [Array],
      default: () => []
    },
    listX: {
      type: Boolean,
      default: !1
    }
  },
  setup(n) {
    return (e, l) => (h(), _("div", {
      class: G(["list", { "list-x": n.listX }])
    }, [
      (h(!0), _(he, null, $e(n.data, (t, o) => (h(), _("div", Yo, [
        ne(e.$slots, "default", { row: t })
      ]))), 256))
    ], 2));
  }
});
let qo = {
  install: (n) => {
    n.component(mn.name, mn);
  }
};
const Jo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qo
}, Symbol.toStringTag, { value: "Module" }));
let Zo = {
  install: (n) => {
    n.component(st.name, st);
  }
};
const Qo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpLoading: st,
  default: Zo
}, Symbol.toStringTag, { value: "Module" })), es = { class: "lp-tree__item-box flex items-center justify-between" }, ts = { class: "lp-tree__item-pre flex items-center" }, ns = { class: "lp-tree__item-cols flex" }, ls = {
  key: 0,
  class: "lp-tree__item-children"
}, os = {
  name: "LpTreeItem"
}, ss = /* @__PURE__ */ le({
  ...os,
  props: {
    item: {},
    itemSlot: {},
    itemFields: {},
    level: { default: 1 }
  },
  setup(n) {
    const e = n, l = Oe("treeColumns", P([])), t = Oe("treeHasColumns", P(!1)), o = Oe("treeSlots", {}), s = A(() => ({
      left: t.value ? "0px" : void 0
    })), i = Oe("treeRoot", {
      onNodeSelect: (u) => {
      },
      selectOptions: {},
      eventOptions: P({
        longpress: !1,
        contextmenu: !1
      }),
      onNodeEvent: (u) => {
      },
      registerNodeDom: (u, $) => {
      },
      unregisterNodeDom: (u) => {
      }
    }), r = P(null), a = A(() => {
      var $;
      const u = (($ = i.eventOptions) == null ? void 0 : $.value) ?? i.eventOptions;
      return {
        longpress: (u == null ? void 0 : u.longpress) === !0,
        contextmenu: (u == null ? void 0 : u.contextmenu) === !0
      };
    });
    ke(() => {
      var $, f;
      if (!r.value) return;
      const u = ($ = Zt()) == null ? void 0 : $.proxy;
      (f = i.registerNodeDom) == null || f.call(i, r.value, {
        level: e.level ?? 1,
        item: e.item,
        data: e.item.data,
        instance: u
      });
    }), Ke(() => {
      var u;
      r.value && ((u = i.unregisterNodeDom) == null || u.call(i, r.value));
    });
    function d(u) {
      return Array.isArray(u.children) && u.children.length > 0;
    }
    function c(u) {
      var $;
      return !!(d(u) || ($ = i.hasLoad) != null && $.value && !u.noChildren);
    }
    function k(u) {
      var $;
      return (($ = i.selectOptions) == null ? void 0 : $.foldIcon) === !1 ? !1 : c(u);
    }
    function v(u) {
      var f, m;
      return !(((f = i.selectOptions) == null ? void 0 : f.checkbox) === !1 || (((m = i.selectOptions) == null ? void 0 : m.parentSelect) ?? 1) === 0 && d(u));
    }
    function w(u) {
      if (c(u)) {
        R(u);
        return;
      }
      I(u);
    }
    function g(u) {
      (Array.isArray(u.children) ? u.children : []).forEach((f) => {
        Array.isArray(f.children) && f.children.length > 0 && (f.expanded = !0, g(f));
      });
    }
    async function R(u) {
      var f;
      if (u.loading || (!d(u) && i.loadChildren && !u.loaded && !u.noChildren && await i.loadChildren(u), u.noChildren)) return;
      u.expanded = !u.expanded;
      const $ = (f = i.expand) == null ? void 0 : f.deepExpandAll;
      u.expanded && typeof $ == "number" && $ > 0 && e.level === $ && g(u);
    }
    async function I(u) {
      u.disabled || await i.onNodeSelect(u);
    }
    function j(u) {
      if (a.value.longpress)
        return ($) => {
          i.onNodeEvent({
            type: "longpress",
            data: {
              item: u,
              data: u.data,
              event: $
            }
          });
        };
    }
    function F(u, $) {
      a.value.contextmenu && (u.preventDefault(), u.stopPropagation(), i.onNodeEvent({
        type: "contextmenu",
        data: {
          item: $,
          data: $.data,
          event: u
        }
      }));
    }
    return (u, $) => {
      const f = cn("lp-checkbox"), m = cn("lp-tree-item"), b = rl("longpress");
      return et((h(), _("div", {
        class: G(["lp-tree__item", { "is-pending": u.item.pending }]),
        ref_key: "itemRef",
        ref: r
      }, [
        L("div", es, [
          et((h(), _("div", {
            class: G(["lp-tree__item-content flex align-center", [{ active: u.item.selected === 1 }, U(t) && "sticky"]]),
            style: fe(s.value),
            onClick: $[4] || ($[4] = (p) => w(u.item)),
            onContextmenu: $[5] || ($[5] = (p) => F(p, u.item))
          }, [
            L("div", ts, [
              v(u.item) ? (h(), _("div", {
                key: 0,
                class: "lp-tree__item-checkbox",
                onClick: $[1] || ($[1] = Ne(() => {
                }, ["stop"]))
              }, [
                ue(f, {
                  value: !!u.item.selected,
                  disabled: u.item.disabled,
                  midway: u.item.selected === 2,
                  onClick: $[0] || ($[0] = (p) => I(u.item))
                }, null, 8, ["value", "disabled", "midway"])
              ])) : V("", !0),
              u.item.loading ? (h(), _("div", {
                key: 1,
                class: "lp-tree__item-icon",
                onClick: $[2] || ($[2] = Ne(() => {
                }, ["stop"]))
              }, [
                ue(st, { size: "mini" })
              ])) : k(u.item) ? (h(), _("div", {
                key: 2,
                class: "lp-tree__item-icon",
                onClick: $[3] || ($[3] = Ne((p) => R(u.item), ["stop"]))
              }, [
                ue(U(_e), {
                  is: "right",
                  class: G(["lp-tree__item-icon-right", { active: u.item.expanded }])
                }, null, 8, ["class"])
              ])) : V("", !0)
            ]),
            u.itemSlot ? (h(), ye(Qe(u.itemSlot), {
              key: 0,
              item: u.item
            }, null, 8, ["item"])) : (h(), _(he, { key: 1 }, [
              je(te(u.item.data[u.itemFields.title]), 1)
            ], 64))
          ], 38)), [
            [b, j(u.item)]
          ]),
          L("div", ns, [
            (h(!0), _(he, null, $e(U(l), (p) => (h(), _("div", {
              key: p.name,
              class: G(["lp-tree__item-col", `lp-tree__item-col-${p.name}`, p.fixed && `sticky fixed-${p.fixed}`]),
              style: fe({ width: p.computedWidth || p.computedMinWidth, minWidth: p.computedWidth || p.computedMinWidth, left: p.computedStickyLeft, right: p.computedStickyRight })
            }, [
              U(o)[`column.${p.name}`] ? (h(), ye(Qe(U(o)[`column.${p.name}`]), {
                key: 0,
                item: u.item
              }, null, 8, ["item"])) : (h(), _(he, { key: 1 }, [
                je(te(u.item.data[p.name]), 1)
              ], 64))
            ], 6))), 128))
          ])
        ]),
        u.item.expanded && u.item.children ? (h(), _("div", ls, [
          (h(!0), _(he, null, $e(u.item.children, (p) => (h(), ye(m, {
            key: p.data[u.itemFields.value] || p.data.id,
            item: p,
            itemSlot: u.itemSlot,
            itemFields: u.itemFields,
            level: (e.level ?? 1) + 1
          }, null, 8, ["item", "itemSlot", "itemFields", "level"]))), 128))
        ])) : V("", !0)
      ], 2)), [
        [Qt, !u.item.hidden]
      ]);
    };
  }
});
var nn = /* @__PURE__ */ ((n) => (n.STRING = "string", n.ARRAY = "array", n.OBJECT = "object", n.AUTO = "auto", n))(nn || {});
class Un {
  constructor(e = {}) {
    se(this, "selecteds", P([]));
    se(this, "limit");
    se(this, "valueType");
    se(this, "valueField");
    se(this, "labelField");
    this.limit = e.limit ?? 1, this.valueType = e.valueType ?? "auto", this.valueField = e.valueField ?? "value", this.labelField = e.labelField ?? "label";
  }
  /**
   * 设置已选数据
   */
  setSelecteds(e) {
    this.selecteds.value = e;
  }
  /**
   * 清空已选
   */
  clear() {
    this.selecteds.value = [];
  }
  /**
   * 判断是否选中
   */
  isSelected(e) {
    return this.selecteds.value.some((l) => l[this.valueField] === e[this.valueField]);
  }
  /**
   * 选择/取消选择
   * @param item 选项对象
   * @returns SelectResult
   */
  select(e) {
    if (this.isSelected(e)) {
      const t = this.selecteds.value.findIndex((o) => o[this.valueField] === e[this.valueField]);
      return t > -1 && this.selecteds.value.splice(t, 1), { success: !0, type: "remove", selected: !1 };
    } else
      return this.limit > 1 && this.selecteds.value.length >= this.limit ? { success: !1, type: "limit", selected: !1 } : (this.limit === 1 ? this.selecteds.value = [e] : this.selecteds.value.push(e), { success: !0, type: "add", selected: !0 });
  }
  /**
   * 根据 modelValue 刷新 selecteds
   * @param modelValue v-model 的值
   * @param findOption 根据 value 查找选项对象的方法
   */
  flush(e, l) {
    this.selecteds.value = [];
    const t = l;
    if (this.limit === 1)
      if (this.valueType === "object") {
        const o = e;
        let s;
        o && typeof o == "object" ? s = o[this.valueField] : s = o;
        const i = t(s);
        this.selecteds.value = i ? [i] : [];
      } else {
        const o = t(e);
        this.selecteds.value = o ? [o] : [];
      }
    else {
      let o = [];
      this.valueType === "object" ? o = (Array.isArray(e) ? e : []).map((i) => i && typeof i == "object" ? i[this.valueField] : i).filter((i) => i != null) : this.valueType === "string" || typeof e == "string" ? o = (typeof e == "string" ? e : "").split(",").map((i) => i.trim()).filter(Boolean) : Array.isArray(e) ? o = e : typeof e == "string" ? o = e.split(",").map((s) => s.trim()).filter(Boolean) : o = [], this.selecteds.value = o.map((s) => t(s)).filter((s) => !!s);
    }
  }
  /**
   * 获取 modelValue
   */
  getModelValue() {
    if (this.limit === 1)
      return this.valueType === "object" ? this.selecteds.value.length > 0 ? this.selecteds.value[0] : {} : this.selecteds.value.length > 0 ? this.selecteds.value[0][this.valueField] : "";
    if (this.valueType === "array" || this.valueType === "auto")
      return this.selecteds.value.map((e) => e[this.valueField]);
    if (this.valueType === "string")
      return this.selecteds.value.map((e) => e[this.valueField]).join(",");
    if (this.valueType === "object")
      return this.selecteds.value;
  }
  /**
   * 获取兼容 useSelect 的 modelValue (修正逻辑以匹配原 useSelect)
   * useSelect 中:
   * - AUTO/ARRAY: join(',')
   * - OBJECT: map(i => i.data)
   * - default: map(i => i.value)
   */
  getModelValueForUseSelect() {
    return this.limit === 1 ? this.valueType === "object" ? this.selecteds.value.length > 0 ? this.selecteds.value[0].data || this.selecteds.value[0] : {} : this.selecteds.value.length > 0 ? this.selecteds.value[0][this.valueField] : "" : this.valueType === "object" ? this.selecteds.value.map((e) => (e == null ? void 0 : e.data) ?? e) : this.valueType === "string" ? this.selecteds.value.map((e) => e == null ? void 0 : e[this.valueField]).join(",") : this.selecteds.value.map((e) => e == null ? void 0 : e[this.valueField]);
  }
}
function kt(n, e) {
  if (n === e) return !0;
  if (n.length !== e.length) return !1;
  for (let l = 0; l < n.length; l++)
    if (Et(n[l]) !== Et(e[l])) return !1;
  return !0;
}
function as(n, e) {
  const l = P([]), t = /* @__PURE__ */ new WeakMap(), o = () => {
    var r, a;
    return ((r = e.treeOption) == null ? void 0 : r.nodeChildren) || ((a = e.treeOption) == null ? void 0 : a.children) || "children";
  }, s = (r) => {
    const a = Et(r);
    let d = t.get(a);
    if (d || (d = {
      ...e.toNodeInfo(r),
      data: r
    }, t.set(a, d)), e.treeOption) {
      const c = e.treeOption.children, k = o(), v = r[c];
      if (Array.isArray(v) || e.isPending) {
        let w = Array.isArray(v) ? v.map(s) : [];
        if (e.isPending) {
          const R = d[k];
          if (Array.isArray(R)) {
            const I = R.filter((j) => e.isPending(j));
            I.length > 0 && (w = [...w, ...I]);
          }
        }
        const g = d[k];
        (!g || !kt(g, w)) && (d[k] = w);
      }
    }
    return d;
  }, i = (r) => {
    const a = r.data;
    if (e.treeOption) {
      const d = e.treeOption.children, c = o(), k = r[c];
      if (Array.isArray(k)) {
        const v = k.filter((g) => !e.isPending || !e.isPending(g)).map(i), w = a[d];
        (!w || !kt(w, v)) && (a[d] = v);
      }
    }
    return a;
  };
  return ce(n, (r) => {
    let a = r.map(s);
    if (e.isPending) {
      const c = l.value.filter((k) => e.isPending(k));
      c.length > 0 && (a = [...a, ...c]);
    }
    kt(a, l.value) || (l.value = a);
  }, { immediate: !0, deep: !0 }), ce(l, (r) => {
    const d = (e.isPending ? r.filter((c) => !e.isPending(c)) : r).map(i);
    n.value = d;
  }, { deep: !0 }), {
    list: l,
    wrap: s,
    unwrap: i
  };
}
function gn(n) {
  if (n !== void 0)
    return typeof n == "number" ? `${n}px` : /^\d+$/.test(n) ? `${n}px` : n;
}
function ct(n) {
  if (!n) return 0;
  const e = parseFloat(n.replace(/px|%|em|rem/g, ""));
  return Number.isNaN(e) ? 0 : e;
}
function Gn(n, e = {}) {
  const l = n.map((s) => ({
    ...s,
    computedWidth: gn(s.width),
    computedMinWidth: gn(s.minWidth)
  }));
  let t = e.stickyLeftOffset ?? 0;
  for (let s = 0; s < l.length; s++) {
    const i = l[s];
    if (i.fixed === "left") {
      const r = ct(i.computedWidth) || ct(i.computedMinWidth) || 100;
      i.computedStickyLeft = `${t}px`, t += r;
    } else
      i.computedStickyLeft = void 0;
  }
  let o = 0;
  for (let s = l.length - 1; s >= 0; s--) {
    const i = l[s];
    if (i.fixed === "right") {
      const r = ct(i.computedWidth) || ct(i.computedMinWidth) || 100;
      i.computedStickyRight = `${o}px`, o += r;
    } else
      i.computedStickyRight = void 0;
  }
  return l;
}
const is = {
  key: 0,
  class: "lp-tree__header flex items-center justify-between"
}, rs = {
  key: 0,
  class: "lp-tree__header-title"
}, us = { class: "lp-tree__header-cols flex" }, cs = {
  name: "LpTree"
}, vt = /* @__PURE__ */ le({
  ...cs,
  props: {
    modelValue: {},
    data: {},
    columns: {},
    itemFields: { default: () => ({
      children: "children",
      title: "title",
      value: "value"
    }) },
    nodeKey: {},
    nodeBaseWidth: {},
    load: {},
    loadFirst: { type: Boolean, default: !0 },
    selectOptions: {},
    header: { default: () => ({
      enabled: !1,
      title: "",
      search: !1,
      searchPlaceholder: "搜索"
    }) },
    expand: {},
    eventOptions: { default: () => ({
      longpress: !1,
      contextmenu: !1
    }) }
  },
  emits: ["update:modelValue", "change", "update:data", "event"],
  setup(n, { expose: e, emit: l }) {
    var tt, sn;
    const t = n, o = l, s = P(null), i = P(0);
    let r = null;
    const a = Pn();
    Be("treeSlots", a);
    const d = A(() => {
      var y;
      return (((y = t.columns) == null ? void 0 : y.length) ?? 0) > 0;
    }), c = A(() => t.nodeBaseWidth ?? i.value), k = A(() => ({
      left: d.value ? "0px" : void 0
    })), v = A(() => t.itemFields), w = A(
      () => Gn(t.columns ?? [], {
        stickyLeftOffset: d.value && c.value || 0
      })
    ), g = A(() => t.header ?? { enabled: !1, title: "", search: !1, searchPlaceholder: "搜索" }), R = A(() => t.nodeKey), I = A(() => R.value || v.value.value), j = A(() => {
      var y;
      return (((y = t.selectOptions) == null ? void 0 : y.limit) ?? 1) !== 1;
    }), F = A(() => {
      var y;
      return ((y = t.selectOptions) == null ? void 0 : y.includeChild) !== !1;
    }), u = A(() => {
      var y;
      return ((y = t.selectOptions) == null ? void 0 : y.parentSelect) ?? 1;
    }), $ = A(() => typeof t.load == "function"), f = A(() => {
      var y;
      return ((y = t.selectOptions) == null ? void 0 : y.limit1Cancel) === !0;
    }), m = A(() => {
      var y, O;
      return {
        longpress: ((y = t.eventOptions) == null ? void 0 : y.longpress) === !0,
        contextmenu: ((O = t.eventOptions) == null ? void 0 : O.contextmenu) === !0
      };
    }), b = P(""), p = new Un({
      limit: (tt = t.selectOptions) == null ? void 0 : tt.limit,
      valueType: (sn = t.selectOptions) == null ? void 0 : sn.valueType,
      valueField: t.itemFields.value,
      labelField: t.itemFields.title
    }), T = P(!1), H = P(null), x = /* @__PURE__ */ new WeakMap();
    function M(y, O) {
      x.set(y, O);
    }
    function W(y) {
      x.delete(y);
    }
    function X(y) {
      let O = y;
      for (; O; ) {
        const z = x.get(O);
        if (z) return z;
        O = O.parentElement;
      }
    }
    const N = A({
      get: () => t.data,
      set: (y) => o("update:data", y)
    }), ee = Ce({
      toNodeInfo: (y) => ({
        expanded: !1,
        draging: !1,
        selected: 0,
        disabled: !1,
        loading: !1,
        loaded: !1,
        noChildren: !1,
        hidden: !1,
        pending: !1
        // Default pending state
      }),
      isPending: (y) => y.pending === !0,
      // Check if node is pending
      treeOption: {
        children: v.value.children,
        nodeChildren: "children"
      }
    });
    ce(
      () => v.value.children,
      (y) => {
        ee.treeOption && (ee.treeOption.children = y);
      }
    );
    const { list: C, wrap: B } = as(N, ee);
    function J() {
      if (t.nodeBaseWidth !== void 0) {
        i.value = t.nodeBaseWidth;
        return;
      }
      const y = s.value;
      if (!y) return;
      const O = y.querySelector(".lp-tree__item-content"), z = y.querySelector(".lp-tree__header-left"), Y = Math.ceil((O == null ? void 0 : O.getBoundingClientRect().width) || 0), oe = Math.ceil((z == null ? void 0 : z.getBoundingClientRect().width) || 0), Q = Math.max(Y, oe);
      Q > 0 && Q !== i.value && (i.value = Q);
    }
    function me(y) {
      const O = [y];
      return Array.isArray(y.children) && y.children.forEach((z) => {
        O.push(...me(z));
      }), O;
    }
    function ge(y) {
      return $.value && !y.loaded && !y.noChildren ? !1 : (Array.isArray(y.children) ? y.children : []).length === 0;
    }
    function Fe(y) {
      return ge(y) ? [y] : (Array.isArray(y.children) ? y.children : []).flatMap((z) => Fe(z));
    }
    async function Ve(y) {
      if (y.disabled) return !1;
      const O = Array.isArray(y.children) && y.children.length > 0;
      if (j.value && u.value === 2) {
        !O && $.value && !y.loaded && !y.noChildren && await q(y);
        const Y = Fe(y).filter((ae) => !ae.disabled), oe = Y.length > 0 && Y.every((ae) => p.isSelected(ae.data));
        let Q = !1;
        return oe ? Y.forEach((ae) => {
          p.isSelected(ae.data) && p.select(ae.data).success && (Q = !0);
        }) : Y.forEach((ae) => {
          p.isSelected(ae.data) || p.select(ae.data).success && (Q = !0);
        }), Q;
      }
      if (j.value && F.value && O) {
        const Y = me(y).filter((ae) => !ae.disabled), oe = Y.length > 0 && Y.every((ae) => p.isSelected(ae.data));
        let Q = !1;
        return oe ? Y.forEach((ae) => {
          p.isSelected(ae.data) && p.select(ae.data).success && (Q = !0);
        }) : Y.forEach((ae) => {
          p.isSelected(ae.data) || p.select(ae.data).success && (Q = !0);
        }), Q;
      }
      return !j.value && !f.value && p.isSelected(y.data) ? !1 : p.select(y.data).success;
    }
    function xe(y) {
      const O = I.value, z = y && typeof y == "object" && O ? y[O] : y, Y = (oe, Q) => {
        var ae, Te, We, qe;
        for (let Je = 0; Je < oe.length; Je += 1) {
          const Ae = oe[Je];
          if (y && typeof y == "object") {
            if (Ae.data === y) return { node: Ae, parent: Q, index: Je };
            if (O && ((ae = Ae.data) == null ? void 0 : ae[O]) !== void 0 && ((Te = Ae.data) == null ? void 0 : Te[O]) === z) return { node: Ae, parent: Q, index: Je };
          } else if (O && ((We = Ae.data) == null ? void 0 : We[O]) !== void 0 && ((qe = Ae.data) == null ? void 0 : qe[O]) === z) return { node: Ae, parent: Q, index: Je };
          const an = Array.isArray(Ae.children) ? Ae.children : [];
          if (an.length > 0) {
            const rn = Y(an, Ae);
            if (rn) return rn;
          }
        }
        return null;
      };
      return Y(C.value, null);
    }
    function Me(y) {
      var O;
      return (O = xe(y)) == null ? void 0 : O.node;
    }
    function be() {
      const y = H.value, O = (Y) => {
        Y.forEach((oe) => {
          oe.hidden = !1, Array.isArray(oe.children) && O(oe.children);
        });
      };
      if (!y) {
        O(C.value);
        return;
      }
      const z = (Y) => {
        const oe = !!y(Y.data, Y), ae = (Array.isArray(Y.children) ? Y.children : []).map((We) => z(We)).some(Boolean), Te = oe || ae;
        return Y.hidden = !Te, ae && (Y.expanded = !0), Te;
      };
      C.value.forEach((Y) => z(Y));
    }
    function S(y) {
      if (typeof y == "function") {
        H.value = y, be();
        return;
      }
      const O = String(y ?? "").trim();
      if (!O) {
        H.value = null, be();
        return;
      }
      const z = v.value.title, Y = O.toLowerCase();
      H.value = (oe) => String((oe == null ? void 0 : oe[z]) ?? "").toLowerCase().includes(Y), be();
    }
    function ie(y, O, z = !1) {
      const Y = O === void 0 ? y : O, oe = O === void 0 ? null : y, Q = B(Y);
      if (Q.expanded = !1, Q.loaded = !0, Q.pending = z, Q.noChildren = !0, !oe)
        return C.value.push(Q), be(), Q;
      const ae = xe(oe);
      return ae ? (Array.isArray(ae.node.children) || (ae.node.children = []), ae.node.children.push(Q), ae.node.noChildren = !1, ae.node.loaded = !0, ae.node.expanded = !0, be(), Q) : (C.value.push(Q), be(), Q);
    }
    function de(y, O) {
      const z = B(y), Y = O ?? {};
      let oe = C.value, Q = null;
      (Y.parent !== void 0 || Y.parentKey !== void 0) && (Q = xe(Y.parent ?? Y.parentKey), Q && (Array.isArray(Q.node.children) || (Q.node.children = []), oe = Q.node.children, Q.node.noChildren = !1, Q.node.loaded = !0, Q.node.expanded = !0));
      const ae = Y.before ?? Y.beforeKey ?? Y.after ?? Y.afterKey;
      if (ae !== void 0) {
        const Te = xe(ae);
        if (Te) {
          oe = Te.parent ? Te.parent.children ?? [] : C.value;
          const We = oe.findIndex((qe) => qe === Te.node);
          if (We >= 0) {
            const qe = Y.before !== void 0 || Y.beforeKey !== void 0 ? We : We + 1;
            return oe.splice(qe, 0, z), be(), z;
          }
        }
      }
      return oe.push(z), be(), z;
    }
    function E(y) {
      if (!R.value) return !1;
      const O = xe(y);
      if (!O) return !1;
      const z = me(O.node);
      let Y = !1;
      if (z.forEach((oe) => {
        p.isSelected(oe.data) && p.select(oe.data).success && (Y = !0);
      }), O.parent) {
        const oe = O.parent.children ?? [];
        oe.splice(O.index, 1), O.parent.children = oe, (O.parent.children ?? []).length === 0 && (O.parent.noChildren = !0);
      } else
        C.value.splice(O.index, 1);
      return Pe(C.value), be(), Y && Ee(), !0;
    }
    function Z(y, O) {
      const z = xe(y);
      return z ? (Object.assign(z.node.data, O), z.node.pending = !1, !0) : !1;
    }
    async function q(y) {
      var O, z;
      if ($.value && !y.loading && !(y.loaded || y.noChildren)) {
        y.loading = !0;
        try {
          const Y = await ((O = t.load) == null ? void 0 : O.call(t, y.data));
          if (y.data && typeof y.data == "object") {
            const oe = v.value.children;
            y.data[oe] = Y;
          }
          y.loaded = !0, y.noChildren = !Y || Y.length === 0, y.noChildren && (y.expanded = !1), await ve(), (z = t.expand) != null && z.defaultExpandAll && y.children && K(y.children), p.flush(t.modelValue, (oe) => He(C.value, oe)), Pe(C.value);
        } finally {
          y.loading = !1;
        }
      }
    }
    function K(y) {
      y.forEach((O) => {
        const z = Array.isArray(O.children) ? O.children : [];
        z.length > 0 && (O.expanded = !0, K(z));
      });
    }
    function re(y) {
      var O;
      (O = t.expand) != null && O.defaultExpandAll && K(y);
    }
    async function D() {
      var y;
      if ($.value) {
        T.value = !0;
        try {
          const O = await ((y = t.load) == null ? void 0 : y.call(t, null));
          N.value = Array.isArray(O) ? O : [];
        } catch (O) {
          console.error("Failed to load root data", O), T.value = !1;
        }
      }
    }
    async function Xe() {
      if (H.value = null, b.value = "", p.clear(), Ee(), T.value = !0, N.value = [], await ve(), !$.value) {
        T.value = !1;
        return;
      }
      await D();
    }
    Be("treeRoot", {
      onNodeSelect: async (y) => {
        await Ve(y) && Ee();
      },
      loadChildren: q,
      hasLoad: $,
      selectOptions: t.selectOptions,
      expand: t.expand,
      eventOptions: m,
      onNodeEvent: (y) => {
        o("event", y);
      },
      registerNodeDom: M,
      unregisterNodeDom: W
    }), Be("treeColumns", w), Be("treeHasColumns", d);
    function Ee() {
      const y = p.getModelValue();
      o("update:modelValue", y), o("change", y);
    }
    function ze(y) {
      const O = p.isSelected(y.data), z = Array.isArray(y.children) ? y.children : [];
      if (z.length === 0 || (z.forEach((Q) => ze(Q)), !j.value))
        return y.selected = O ? 1 : 0, y.selected;
      const Y = z.some((Q) => (Q.selected ?? 0) > 0);
      return z.every((Q) => Q.selected === 1) ? (y.selected = 1, y.selected) : Y ? (y.selected = 2, y.selected) : (y.selected = O ? 1 : 0, y.selected);
    }
    function Pe(y) {
      y.forEach((O) => ze(O));
    }
    ce(
      p.selecteds,
      () => {
        Pe(C.value);
      },
      { deep: !0 }
    );
    function He(y, O) {
      for (const z of y) {
        if (z.data[t.itemFields.value] === O)
          return z.data;
        if (z.children) {
          const Y = He(z.children, O);
          if (Y) return Y;
        }
      }
    }
    return ce(
      () => t.modelValue,
      (y) => {
        C.value.length > 0 && p.flush(y, (O) => He(C.value, O));
      },
      { immediate: !0 }
    ), ce(
      C,
      async (y) => {
        if (console.log("dataRender change", y), y.length === 0 && $.value && !T.value && t.loadFirst) {
          await D();
          return;
        }
        ve(() => {
          re(y), p.flush(t.modelValue, (O) => He(y, O)), Pe(y), H.value && be(), J();
        });
      },
      { immediate: !0, deep: !0 }
    ), e({
      append: ie,
      remove: E,
      insert: de,
      getNode: Me,
      getNodeByDom: X,
      filter: S,
      saveItem: Z,
      reload: Xe
    }), ce(b, (y) => {
      var O;
      (O = g.value) != null && O.search && S(y);
    }), ce(
      () => t.nodeBaseWidth,
      () => {
        ve(() => {
          J();
        });
      },
      { immediate: !0 }
    ), ce(
      () => [t.columns, t.data, t.header],
      () => {
        t.nodeBaseWidth === void 0 && ve(() => {
          J();
        });
      },
      { deep: !0 }
    ), ke(() => {
      ve(() => {
        J(), s.value && (r = new ResizeObserver(() => {
          t.nodeBaseWidth === void 0 && J();
        }), r.observe(s.value));
      });
    }), Ke(() => {
      r == null || r.disconnect(), r = null;
    }), (y, O) => (h(), _("div", {
      class: "lp-tree",
      ref_key: "treeRef",
      ref: s
    }, [
      g.value.enabled ? (h(), _("div", is, [
        L("div", {
          class: G(["lp-tree__header-left", "flex", "items-center", d.value && "sticky"]),
          style: fe(k.value)
        }, [
          g.value.title ? (h(), _("div", rs, te(g.value.title), 1)) : V("", !0),
          g.value.search ? (h(), ye(ft, {
            key: 1,
            modelValue: b.value,
            "onUpdate:modelValue": O[0] || (O[0] = (z) => b.value = z),
            class: "lp-tree__header-search",
            placeholder: g.value.searchPlaceholder || "搜索",
            clearable: "",
            size: "mini"
          }, null, 8, ["modelValue", "placeholder"])) : V("", !0)
        ], 6),
        L("div", us, [
          (h(!0), _(he, null, $e(w.value, (z) => (h(), _("div", {
            key: z.name,
            class: G(["lp-tree__header-col", `lp-tree__header-col-${z.name}`, z.fixed && `sticky fixed-${z.fixed}`]),
            style: fe({ width: z.computedWidth || z.computedMinWidth, minWidth: z.computedWidth || z.computedMinWidth, left: z.computedStickyLeft, right: z.computedStickyRight })
          }, te(z.title), 7))), 128))
        ])
      ])) : V("", !0),
      (h(!0), _(he, null, $e(U(C), (z) => (h(), ye(ss, {
        key: z.data[v.value.value] || z.data.id,
        item: z,
        itemSlot: U(a).item,
        itemFields: v.value,
        level: 1
      }, null, 8, ["item", "itemSlot", "itemFields"]))), 128))
    ], 512));
  }
}), ds = { class: "lp-menu" }, ps = { class: "lp-menu__node" }, fs = { class: "lp-menu__node-left" }, hs = { class: "lp-menu__label" }, vs = {
  name: "LpMenu"
}, Rt = /* @__PURE__ */ le({
  ...vs,
  props: {
    modelValue: { default: void 0 },
    data: { default: () => [] },
    keys: { default: () => ({
      children: "children",
      label: "title",
      value: "id",
      icon: "icon"
    }) },
    mode: { default: "vertical" },
    searchable: { type: Boolean, default: !1 },
    searchPlaceholder: { default: "搜索" },
    defaultOpeneds: { default: () => [] },
    indent: { default: 16 },
    load: {},
    selectOptions: { default: () => ({}) },
    eventOptions: {}
  },
  emits: ["update:modelValue", "change", "select", "event"],
  setup(n, { expose: e, emit: l }) {
    en((m) => ({
      "2f8cd996": g.value
    }));
    const t = n, o = l, s = P(null), i = A(() => {
      var m;
      return ((m = t.keys) == null ? void 0 : m.children) || "children";
    }), r = A(() => {
      var m;
      return ((m = t.keys) == null ? void 0 : m.label) || "title";
    }), a = A(() => {
      var m;
      return ((m = t.keys) == null ? void 0 : m.value) || "id";
    }), d = A(() => {
      var m;
      return ((m = t.keys) == null ? void 0 : m.icon) || "icon";
    }), c = A(() => ({
      children: i.value,
      title: r.value,
      value: a.value
    })), k = A(() => a.value), v = A(() => ({
      enabled: !1,
      title: "",
      search: !!t.searchable,
      searchPlaceholder: t.searchPlaceholder || "搜索"
    })), w = A(() => ({
      limit: 1,
      checkbox: !1,
      foldIcon: !1,
      ...t.selectOptions || {}
    })), g = A(() => `${t.indent}px`);
    function R(m) {
      o("update:modelValue", m);
    }
    function I(m) {
      var p, T;
      o("change", m);
      const b = (T = (p = s.value) == null ? void 0 : p.getNode) == null ? void 0 : T.call(p, m);
      o("select", { value: m, item: (b == null ? void 0 : b.data) ?? null });
    }
    function j(m) {
      o("event", m);
    }
    function F(m) {
      const b = m == null ? void 0 : m.children;
      return !!(Array.isArray(b) && b.length > 0 || t.load && !(m != null && m.noChildren));
    }
    function u(m) {
      var b;
      return ((b = m == null ? void 0 : m.data) == null ? void 0 : b[r.value]) ?? "";
    }
    function $(m) {
      var p;
      const b = (p = m == null ? void 0 : m.data) == null ? void 0 : p[d.value];
      return typeof b == "string" && b.trim() ? b.trim() : "";
    }
    async function f() {
      !Array.isArray(t.defaultOpeneds) || t.defaultOpeneds.length === 0 || (await ve(), t.defaultOpeneds.forEach((m) => {
        var p, T;
        const b = (T = (p = s.value) == null ? void 0 : p.getNode) == null ? void 0 : T.call(p, m);
        b && (b.expanded = !0);
      }));
    }
    return ke(() => {
      f();
    }), ce(
      () => t.defaultOpeneds,
      () => {
        f();
      },
      { deep: !0 }
    ), ce(
      () => t.data,
      () => {
        f();
      },
      { deep: !0 }
    ), e({
      append: (...m) => {
        var b, p;
        return (p = (b = s.value) == null ? void 0 : b.append) == null ? void 0 : p.call(b, ...m);
      },
      remove: (...m) => {
        var b, p;
        return (p = (b = s.value) == null ? void 0 : b.remove) == null ? void 0 : p.call(b, ...m);
      },
      insert: (...m) => {
        var b, p;
        return (p = (b = s.value) == null ? void 0 : b.insert) == null ? void 0 : p.call(b, ...m);
      },
      getNode: (...m) => {
        var b, p;
        return (p = (b = s.value) == null ? void 0 : b.getNode) == null ? void 0 : p.call(b, ...m);
      },
      getNodeByDom: (...m) => {
        var b, p;
        return (p = (b = s.value) == null ? void 0 : b.getNodeByDom) == null ? void 0 : p.call(b, ...m);
      },
      filter: (...m) => {
        var b, p;
        return (p = (b = s.value) == null ? void 0 : b.filter) == null ? void 0 : p.call(b, ...m);
      }
    }), (m, b) => (h(), _("div", ds, [
      ue(vt, {
        ref_key: "menuTreeRef",
        ref: s,
        "model-value": t.modelValue,
        data: t.data,
        "item-fields": c.value,
        "node-key": k.value,
        load: t.load,
        "select-options": w.value,
        "event-options": t.eventOptions,
        columns: [],
        header: v.value,
        "onUpdate:modelValue": R,
        onChange: I,
        onEvent: j
      }, {
        item: Le(({ item: p }) => [
          ne(m.$slots, "item", { item: p }, () => [
            L("div", ps, [
              L("div", fs, [
                $(p) ? (h(), ye(U(_e), {
                  key: 0,
                  class: "lp-menu__icon",
                  is: $(p)
                }, null, 8, ["is"])) : V("", !0),
                L("span", hs, te(u(p)), 1)
              ]),
              F(p) ? (h(), ye(U(_e), {
                key: 0,
                class: G(["lp-menu__arrow", { open: !!p.expanded }]),
                is: "right"
              }, null, 8, ["class"])) : V("", !0)
            ])
          ])
        ]),
        _: 3
      }, 8, ["model-value", "data", "item-fields", "node-key", "load", "select-options", "event-options", "header"])
    ]));
  }
});
let ms = {
  install: (n) => {
    n.component(Rt.name, Rt);
  }
};
const gs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpMenu: Rt,
  default: ms
}, Symbol.toStringTag, { value: "Module" })), ys = { class: "lp-message" }, _s = {
  name: "lp-message"
}, yn = /* @__PURE__ */ Object.assign(_s, {
  setup(n) {
    return Ce({}), (e, l) => (h(), _("div", ys, te(e.message), 1));
  }
});
let bs = {
  install: (n) => {
    n.component(yn.name, yn);
  }
};
const ws = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bs
}, Symbol.toStringTag, { value: "Module" })), $s = {
  key: 0,
  class: "lp-paginate"
}, Cs = ["disabled"], ks = ["disabled"], Ss = ["onClick"], xs = ["disabled"], Ts = ["disabled"], Es = { class: "page-info" }, Ls = ["max"], Os = {
  key: 1,
  class: "lp-paginate"
}, js = { class: "page-info" }, As = {
  name: "lp-paginate"
}, Ms = /* @__PURE__ */ le({
  ...As,
  props: {
    status: {},
    maxButtons: {},
    showQuickJumper: { type: Boolean, default: !1 }
  },
  emits: ["update:status", "change"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = A(() => l.maxButtons ?? 7), s = A(() => l.status.page), i = A(() => Math.max(1, l.status.limit)), r = A(() => Math.max(0, l.status.total)), a = A(() => Math.max(1, Math.ceil(r.value / i.value))), d = P(s.value);
    ce(s, (v) => {
      d.value = v;
    });
    const c = A(() => {
      const v = o.value, w = Math.floor(v / 2);
      let g = Math.max(1, s.value - w), R = Math.min(a.value, g + v - 1);
      g = Math.max(1, R - v + 1);
      const I = [];
      for (let j = g; j <= R; j++) I.push(j);
      return I;
    });
    function k(v) {
      const w = Math.max(1, Math.min(a.value, Number.isFinite(v) ? v : s.value)), g = {
        page: w,
        limit: i.value,
        total: r.value,
        lastPage: a.value,
        hasMore: w < a.value
      };
      t("update:status", g), t("change", g);
    }
    return (v, w) => a.value > 1 ? (h(), _("div", $s, [
      L("button", {
        class: "page-btn",
        disabled: s.value === 1,
        onClick: w[0] || (w[0] = (g) => k(1))
      }, "«", 8, Cs),
      L("button", {
        class: "page-btn",
        disabled: s.value === 1,
        onClick: w[1] || (w[1] = (g) => k(s.value - 1))
      }, "‹", 8, ks),
      (h(!0), _(he, null, $e(c.value, (g) => (h(), _("button", {
        key: g,
        class: G(["page-btn", { active: g === s.value }]),
        onClick: (R) => k(g)
      }, te(g), 11, Ss))), 128)),
      L("button", {
        class: "page-btn",
        disabled: s.value === a.value,
        onClick: w[2] || (w[2] = (g) => k(s.value + 1))
      }, "›", 8, xs),
      L("button", {
        class: "page-btn",
        disabled: s.value === a.value,
        onClick: w[3] || (w[3] = (g) => k(a.value))
      }, "»", 8, Ts),
      L("span", Es, "第 " + te(s.value) + " / " + te(a.value) + " 页（共 " + te(v.status.total) + " 条）", 1),
      v.showQuickJumper ? (h(), _(he, { key: 0 }, [
        et(L("input", {
          type: "number",
          min: "1",
          max: a.value,
          "onUpdate:modelValue": w[4] || (w[4] = (g) => d.value = g),
          class: "page-input"
        }, null, 8, Ls), [
          [
            Bn,
            d.value,
            void 0,
            { number: !0 }
          ]
        ]),
        L("button", {
          class: "page-btn",
          onClick: w[5] || (w[5] = (g) => k(d.value))
        }, "跳转")
      ], 64)) : V("", !0)
    ])) : (h(), _("div", Os, [
      L("span", js, "共 " + te(v.status.total) + " 条", 1)
    ]));
  }
}), zt = /* @__PURE__ */ Re(Ms, [["__scopeId", "data-v-dea61d9b"]]);
let Ps = {
  install: (n) => {
    n.component(zt.name, zt);
  }
};
const Bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpPaginate: zt,
  default: Ps
}, Symbol.toStringTag, { value: "Module" })), Is = { class: "lp-panel" }, Rs = {
  key: 0,
  class: "lp-panel__header"
}, zs = { class: "title text" }, Ns = { class: "body" }, Fs = {
  name: "lp-panel"
}, Vs = /* @__PURE__ */ le({
  ...Fs,
  props: {
    title: { default: "" }
  },
  emits: ["change"],
  setup(n, { emit: e }) {
    const l = n;
    return (t, o) => (h(), _("div", Is, [
      t.title ? (h(), _("div", Rs, [
        L("div", zs, te(l.title), 1),
        ne(t.$slots, "header", {}, void 0, !0)
      ])) : V("", !0),
      L("div", Ns, [
        ne(t.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), Nt = /* @__PURE__ */ Re(Vs, [["__scopeId", "data-v-5fe6b717"]]);
let Ws = {
  install: (n) => {
    n.component(Nt.name, Nt);
  }
};
const Ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpPanel: Nt,
  default: Ws
}, Symbol.toStringTag, { value: "Module" })), Hs = { class: "lp-progress__inner" }, Us = {
  key: 0,
  class: "lp-progress__text"
}, Gs = {
  key: 0,
  class: "lp-progress__text"
}, Ks = {
  name: "lp-progress"
}, Ft = /* @__PURE__ */ le({
  ...Ks,
  props: {
    percentage: { default: 0 },
    type: { default: "line" },
    strokeWidth: { default: 6 },
    showText: { type: Boolean, default: !0 },
    textInside: { type: Boolean, default: !1 },
    status: { default: "" },
    color: {},
    width: { default: 126 }
  },
  setup(n) {
    const e = n, l = A(() => {
      const t = {};
      if (t.width = e.percentage + "%", e.color)
        if (typeof e.color == "string")
          t.backgroundColor = e.color;
        else if (Array.isArray(e.color)) {
          const o = e.color, s = o.map((i, r) => {
            const a = r / (o.length - 1) * 100;
            return `${i} ${a}%`;
          }).join(", ");
          t.background = `linear-gradient(to right, ${s})`;
        } else typeof e.color == "function" && (t.backgroundColor = e.color(e.percentage));
      return t;
    });
    return A(() => e.status ? e.status : e.percentage >= 100 ? "success" : ""), (t, o) => (h(), _("div", {
      class: G(["lp-progress", [`lp-progress--${t.status}`, { "lp-progress--text-inside": t.textInside }]])
    }, [
      L("div", {
        class: "lp-progress__outer",
        style: fe({ height: t.strokeWidth + "px" })
      }, [
        L("div", Hs, [
          L("div", {
            class: "lp-progress__bar",
            style: fe(l.value)
          }, [
            t.textInside ? (h(), _("div", Us, te(t.percentage) + "% ", 1)) : V("", !0)
          ], 4)
        ])
      ], 4),
      !t.textInside && t.showText ? (h(), _("div", Gs, [
        ne(t.$slots, "default", {}, () => [
          je(te(t.percentage) + "%", 1)
        ])
      ])) : V("", !0)
    ], 2));
  }
}), Ys = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpProgress: Ft
}, Symbol.toStringTag, { value: "Module" })), Xs = { class: "lp-radio" }, qs = ["onClick"], Js = { class: "lp-radio-input" }, Zs = ["value", "checked", "onChange"], Qs = { class: "lp-radio-label" }, ea = {
  name: "LpRadio"
}, ta = /* @__PURE__ */ le({
  ...ea,
  props: {
    modelValue: { type: [String, Number, Boolean, null], default: null },
    options: { default: () => [] },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = (s) => {
      l.disabled || (t("update:modelValue", s), t("change", s));
    };
    return (s, i) => (h(), _("div", Xs, [
      (h(!0), _(he, null, $e(s.options, (r) => (h(), _("div", {
        key: r.value,
        class: "lp-radio-item",
        onClick: (a) => o(r.value)
      }, [
        L("div", Js, [
          L("input", {
            type: "radio",
            value: r.value,
            checked: s.modelValue === r.value,
            onChange: (a) => o(r.value)
          }, null, 40, Zs),
          i[0] || (i[0] = L("span", { class: "lp-radio-mark" }, null, -1))
        ]),
        L("span", Qs, te(r.title), 1)
      ], 8, qs))), 128))
    ]));
  }
}), _n = /* @__PURE__ */ Re(ta, [["__scopeId", "data-v-28a906a6"]]);
let na = {
  install: (n) => {
    n.component(_n.name, _n);
  }
};
const la = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: na
}, Symbol.toStringTag, { value: "Module" })), Kn = Symbol("scrollbarContextKey"), oa = ({
  move: n,
  size: e,
  bar: l
}) => {
  const t = {};
  return (l == null ? void 0 : l.key) === "vertical" ? (t.height = e, t.width = "100%", t.transform = `translateY(${n || 0}px)`) : (t.width = e, t.height = "100%", t.transform = `translateX(${n || 0}px)`), t;
}, sa = {
  name: "Bar"
}, bn = /* @__PURE__ */ le({
  ...sa,
  props: {
    always: { type: Boolean, default: !0 },
    width: {},
    height: {},
    ratioX: {},
    ratioY: {},
    visible: { type: Boolean, default: !1 },
    direction: { default: "vertical" }
  },
  setup(n, { expose: e }) {
    const l = n, t = Oe(Kn);
    t || ho("Bar", "can not inject scrollbar context");
    const o = P(), s = P(), i = P({}), r = P(!1);
    let a = !1, d = !1, c = 0, k = document.onselectstart;
    const v = A(() => b[l.direction || (l.ratioX && l.ratioY ? "vertical" : l.ratioX ? "horizontal" : "vertical")]);
    A(() => ({
      [v.value.size]: l[v.value.size],
      [v.value.axis]: i.value[v.value.axis]
    }));
    const w = A(() => oa({
      size: l[v.value.size],
      move: i.value[v.value.axis],
      bar: v.value
    }));
    A(
      () => o.value[v.value.offset] ** 2 / t.wrapElement[v.value.scrollSize] / l[v.value.ratio]
    );
    const g = (p) => {
      var x;
      if (p.stopPropagation(), p.ctrlKey || [1, 2].includes(p.button)) return;
      (x = window.getSelection()) == null || x.removeAllRanges();
      const T = p.currentTarget;
      if (!T) return;
      const H = T.getBoundingClientRect();
      c = p[v.value.client] - H[v.value.direction], I(p);
    }, R = (p) => {
      if (!s.value || !o.value || !t.wrapElement) return;
      const T = o.value.getBoundingClientRect(), H = p[v.value.client] - T[v.value.direction], x = s.value[v.value.offset] / 2, M = H - x, W = o.value[v.value.offset] - s.value[v.value.offset], X = Math.max(0, Math.min(W, M)), N = W > 0 ? X / W * 100 : 0;
      i.value[v.value.axis] = X;
      const ee = t.wrapElement[v.value.scrollSize] - t.wrapElement[v.value.offset];
      t.wrapElement[v.value.scroll] = N * ee / 100;
    }, I = (p) => {
      p.stopImmediatePropagation(), a = !0, document.addEventListener("mousemove", j), document.addEventListener("mouseup", F), k = document.onselectstart, document.onselectstart = () => !1;
    }, j = (p) => {
      if (!a || !o.value || !s.value || !t.wrapElement) return;
      const T = o.value.getBoundingClientRect(), x = p[v.value.client] - T[v.value.direction] - c, M = o.value[v.value.offset] - s.value[v.value.offset], W = Math.max(0, Math.min(M, x)), X = M > 0 ? W / M * 100 : 0;
      i.value[v.value.axis] = W;
      const N = t.wrapElement[v.value.scrollSize] - t.wrapElement[v.value.offset];
      t.wrapElement[v.value.scroll] = X * N / 100;
    }, F = () => {
      a = !1, c = 0, document.removeEventListener("mousemove", j), document.removeEventListener("mouseup", F), f(), d && (r.value = !1);
    }, u = () => {
      d = !1, r.value = !!l[v.value.size];
    }, $ = () => {
      d = !0, r.value = a;
    }, f = () => {
      document.onselectstart !== k && (document.onselectstart = k);
    }, m = (p) => {
      if (!a && p && o.value && s.value) {
        const T = p[v.value.scroll], H = p[v.value.scrollSize] - p[v.value.offset], x = H > 0 ? T / H * 100 : 0, M = o.value[v.value.offset] - s.value[v.value.offset];
        i.value[v.value.axis] = x * M / 100;
      }
    };
    ke(() => {
      o.value && (o.value.addEventListener("mousemove", u), o.value.addEventListener("mouseleave", $));
    }), Ke(() => {
      f(), document.removeEventListener("mouseup", F), o.value && (o.value.removeEventListener("mousemove", u), o.value.removeEventListener("mouseleave", $));
    });
    const b = {
      vertical: {
        offset: "offsetHeight",
        scroll: "scrollTop",
        scrollSize: "scrollHeight",
        size: "height",
        key: "vertical",
        axis: "Y",
        client: "clientY",
        direction: "top",
        ratio: "ratioY"
      },
      horizontal: {
        offset: "offsetWidth",
        scroll: "scrollLeft",
        scrollSize: "scrollWidth",
        size: "width",
        key: "horizontal",
        axis: "X",
        client: "clientX",
        direction: "left",
        ratio: "ratioX"
      }
    };
    return e({
      handleScroll: m
    }), (p, T) => (h(), ye($t, { name: "lp-scrollbar-fade" }, {
      default: Le(() => [
        et(L("div", {
          ref_key: "instance",
          ref: o,
          class: G(["lp-scrollbar__bar", "is-" + v.value.key, { "is-visible": p.always || r.value || l.visible }]),
          onMousedown: R
        }, [
          L("div", {
            ref_key: "thumb",
            ref: s,
            class: "lp-scrollbar__thumb",
            style: fe(w.value),
            onMousedown: g
          }, null, 36)
        ], 34), [
          [Qt, p.always || r.value || l.visible]
        ])
      ]),
      _: 1
    }));
  }
}), aa = {
  name: "LpScrollbar"
}, mt = /* @__PURE__ */ le({
  ...aa,
  props: {
    height: { default: "" },
    maxHeight: { default: "" },
    native: { type: Boolean, default: !1 },
    wrapStyle: { type: [Boolean, null, String, Object, Array], default: "" },
    wrapClass: { default: "" },
    viewClass: { default: "" },
    viewStyle: { type: [Boolean, null, String, Object, Array], default: "" },
    noresize: { type: Boolean, default: !1 },
    tag: { default: "div" },
    always: { type: Boolean, default: !1 },
    minSize: { default: 20 }
  },
  emits: ["scroll"],
  setup(n, { expose: e, emit: l }) {
    const t = "LpScrollbar", o = n, s = l;
    let i;
    const r = P(), a = P(), d = P(), c = P(), k = P(), v = P("0"), w = P("0");
    Ce({});
    const g = P(1), R = P(1), I = P(!1), j = A(() => {
      const x = {};
      return o.height && (x.height = hn(o.height)), o.maxHeight && (x.maxHeight = hn(o.maxHeight)), [o.wrapStyle, x];
    }), F = A(() => [o.wrapClass, "lp-scrollbar__wrap", { "lp-scrollbar__wrap--hidden-default": !o.native }]), u = A(() => ["lp-scrollbar__view", o.viewClass]), $ = A(() => o.viewStyle), f = () => {
      if (a.value) {
        const x = a.value.scrollTop, M = a.value.scrollLeft;
        c.value && c.value.handleScroll(a.value), k.value && k.value.handleScroll(a.value), s("scroll", {
          scrollTop: x,
          scrollLeft: M
        });
      }
    };
    function m(x, M) {
      vo(x) ? a.value.scrollTo(x) : ut(x) && ut(M) && a.value.scrollTo(x, M);
    }
    const b = (x) => {
      if (!ut(x)) {
        vn(t, "value must be a number");
        return;
      }
      a.value.scrollTop = x;
    }, p = (x) => {
      if (!ut(x)) {
        vn(t, "value must be a number");
        return;
      }
      a.value.scrollLeft = x;
    }, T = () => {
      if (!a.value) return;
      const x = a.value.clientHeight * 100 / a.value.scrollHeight, M = a.value.clientWidth * 100 / a.value.scrollWidth;
      w.value = x < 100 ? `${x}%` : "", v.value = M < 100 ? `${M}%` : "", g.value = a.value.scrollHeight / a.value.clientHeight, R.value = a.value.scrollWidth / a.value.clientWidth, I.value = !!(w.value || v.value);
    };
    ke(() => {
      o.native || ve(() => {
        T();
        const x = new ResizeObserver(() => {
          T();
        });
        a.value && x.observe(a.value);
        const M = new MutationObserver(() => {
          T();
        });
        a.value && M.observe(a.value, {
          childList: !0,
          subtree: !0,
          attributes: !0,
          attributeFilter: ["style", "class"]
        }), i = () => {
          x.disconnect(), M.disconnect();
        };
      }), r.value && (r.value.addEventListener("mouseenter", () => {
        I.value = !!(w.value || v.value);
      }), r.value.addEventListener("mouseleave", () => {
        o.always || (I.value = !1);
      }));
    }), Ke(() => {
      i == null || i();
    });
    const H = Ce({
      scrollbarElement: r,
      wrapElement: a
    });
    return Be(Kn, H), e({
      /** @description scrollbar wrap ref */
      wrapRef: a,
      /** @description update scrollbar state manually */
      update: T,
      /** @description scrolls to a particular set of coordinates */
      scrollTo: m,
      /** @description set distance to scroll top */
      setScrollTop: b,
      /** @description set distance to scroll left */
      setScrollLeft: p,
      /** @description handle scroll event */
      handleScroll: f
    }), (x, M) => (h(), _("div", {
      ref_key: "scrollbarRef",
      ref: r,
      class: G(["lp-scrollbar", { "lp-scrollbar--hidden": !x.always && !I.value }])
    }, [
      L("div", {
        ref_key: "wrapRef",
        ref: a,
        class: G(["lp-scrollbar__wrap", F.value]),
        style: fe(j.value),
        onScroll: f
      }, [
        (h(), ye(Qe(x.tag), {
          ref_key: "resizeRef",
          ref: d,
          class: G(["lp-scrollbar__view", u.value]),
          style: fe($.value)
        }, {
          default: Le(() => [
            ne(x.$slots, "default")
          ]),
          _: 3
        }, 8, ["class", "style"]))
      ], 38),
      x.native ? V("", !0) : (h(), _(he, { key: 0 }, [
        w.value ? (h(), ye(bn, {
          key: 0,
          ref_key: "verticalBarRef",
          ref: c,
          height: w.value,
          width: "",
          always: x.always,
          "ratio-x": 1,
          "ratio-y": g.value,
          visible: I.value,
          direction: "vertical"
        }, null, 8, ["height", "always", "ratio-y", "visible"])) : V("", !0),
        v.value ? (h(), ye(bn, {
          key: 1,
          ref_key: "horizontalBarRef",
          ref: k,
          height: "",
          width: v.value,
          always: x.always,
          "ratio-x": R.value,
          "ratio-y": 1,
          visible: I.value,
          direction: "horizontal"
        }, null, 8, ["width", "always", "ratio-x", "visible"])) : V("", !0)
      ], 64))
    ], 2));
  }
});
let ia = {
  install: (n) => {
    n.component(mt.name, mt);
  }
};
const ra = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpScrollbar: mt,
  default: ia
}, Symbol.toStringTag, { value: "Module" })), ua = { class: "lp-select-items" }, ca = ["onClick"], da = { class: "label" }, pa = {
  key: 0,
  class: "lp-select__selected-icon-box"
}, fa = {
  name: "LpSelectItems"
}, ha = /* @__PURE__ */ le({
  ...fa,
  props: {
    list: { default: () => [] },
    limit: { default: 1 }
  },
  emits: ["select", "close"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = (s) => {
      t("select", s), l.limit == 1 && t("close");
    };
    return Ce({}), ke(() => {
    }), (s, i) => (h(), _("div", ua, [
      (h(!0), _(he, null, $e(ul(l.list) ? l.list.value : l.list, (r) => (h(), _("div", {
        class: G(["lp-select-items__item", { active: r.__selected }]),
        key: r.value,
        onClick: (a) => o(r)
      }, [
        L("div", da, te(r.label), 1),
        r.__selected ? (h(), _("div", pa, [
          ue(U(_e), {
            class: "lp-select__selected-icon",
            is: "selected",
            size: "14"
          })
        ])) : V("", !0)
      ], 10, ca))), 128))
    ]));
  }
}), va = { class: "lp-select__selected" }, ma = {
  key: 0,
  class: "lp-select__placeholder"
}, ga = { class: "lp-select__selected-item input-item" }, ya = /* @__PURE__ */ le({
  __name: "lp-select-selected",
  props: {
    selecteds: {},
    options: {},
    placeholder: {},
    labelField: { default: "label" },
    valueField: { default: "value" },
    limit: { default: 1 },
    itemComponent: {}
  },
  emits: ["removeItem", "search"],
  setup(n, { emit: e }) {
    const l = P(null), t = n;
    Ce({});
    const o = P(""), s = e;
    function i(d) {
      console.log("handleRemoveItem", d), s("removeItem", d);
    }
    function r() {
      t.itemComponent ? l.value = dn(pn(t.itemComponent)) : t.limit === 1 ? l.value = "div" : l.value = dn(pn("LooplanUiNeeds@SelectedTag"));
    }
    function a() {
      s("search", o.value);
    }
    return ke(() => {
      r();
    }), (d, c) => (h(), _("div", va, [
      !d.selecteds.length && !o.value ? (h(), _("div", ma, te(d.placeholder), 1)) : V("", !0),
      d.selecteds.length ? (h(!0), _(he, { key: 1 }, $e(d.selecteds, (k, v) => (h(), _("div", {
        key: v,
        class: "lp-select__selected-item"
      }, [
        (h(), ye(Qe(l.value), {
          value: k,
          labelField: d.labelField,
          valueField: d.valueField,
          onRemoveItem: i
        }, {
          default: Le(() => [
            je(te(k[t.labelField || "label"]), 1)
          ]),
          _: 2
        }, 1064, ["value", "labelField", "valueField"]))
      ]))), 128)) : V("", !0),
      L("div", ga, [
        et(L("input", {
          "onUpdate:modelValue": c[0] || (c[0] = (k) => o.value = k),
          onInput: a,
          class: "lp-select__serch",
          type: "text"
        }, null, 544), [
          [Bn, o.value]
        ])
      ])
    ]));
  }
});
function _a(n, e = {}) {
  const {
    valueField: l = "value",
    labelField: t = "label",
    limit: o = 1,
    valueType: s = nn.AUTO
  } = e, i = new Un({
    limit: o,
    valueType: s,
    valueField: l,
    labelField: t
  }), r = P([]);
  let a = [];
  const d = A(() => i.selecteds.value.length > 0), c = (F) => {
    a = [], r.value = F.map((u) => {
      const $ = {
        label: u[t],
        value: u[l],
        data: u,
        __selected: u[l] === n.value
      };
      return a.push($), $;
    }), g();
  }, k = () => {
    a.forEach((F) => {
      F.__selected = i.isSelected(F);
    }), r.value = [
      ...a
    ];
  }, v = (F) => {
    const u = i.select(F);
    u.success || u.type === "limit" && tn("选择数量已达上限:" + o, {
      duration: 2e3
    }), F.__selected = u.selected, o === 1 && k(), w();
  };
  function w() {
    n.value = i.getModelValueForUseSelect();
  }
  function g() {
    const F = (u) => a.find(($) => $[l] === u);
    i.flush(n.value, F), k();
  }
  ce(() => n.value, () => {
    g();
  });
  function R() {
    i.clear(), w();
  }
  function I(F) {
    v(F);
  }
  function j(F) {
    r.value = a.filter((u) => u.label.indexOf(F) !== -1);
  }
  return {
    selecteds: i.selecteds,
    optionsRender: r,
    clearableVisible: d,
    handleOptions: c,
    onSelect: v,
    onRemoveItem: I,
    onClear: R,
    onSearch: j
  };
}
const ba = { class: "lp-select__main" }, wa = { class: "lp-select__right" }, $a = {
  name: "LpSelect"
}, Vt = /* @__PURE__ */ le({
  ...$a,
  props: /* @__PURE__ */ Ze({
    options: { default: () => [] },
    limit: { default: 1 },
    valueType: { default: nn.AUTO },
    placeholder: { default: "请选择" },
    selectedItemComponent: {}
  }, {
    modelValue: {
      default: ""
    },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = P(), l = n, t = bt(n, "modelValue"), o = Ce({
      isActive: !1
    }), { selecteds: s, optionsRender: i, clearableVisible: r, handleOptions: a, onSelect: d, onRemoveItem: c, onClear: k, onSearch: v } = _a(t, {
      valueField: "value",
      labelField: "title",
      limit: l.limit,
      valueType: l.valueType
    });
    let w = null;
    function g(I) {
      var u;
      o.isActive = !o.isActive, I.target;
      const j = "bottom-center";
      if (!o.isActive) {
        w && w.close();
        return;
      }
      w = Ie.src(ha).props({
        list: i,
        limit: l.limit
      }).follow(e.value, {
        // 跟随位置 [方向]-[对齐位置]，可供选择的四个方向分别是top、left、right、bottom，可供选择的三种对齐方式分别是start、end、center 默认对其方式是center
        position: j,
        // 是否显示箭头
        arrow: !0,
        // 箭头大小
        arrowSize: 10
        // 跟随的fps,用于一些带动画的, 会移动的元素 (可选, 默认不开启)
        // fps: 5
      }).on("close", () => {
        o.isActive = !1;
      }).on("select", ($) => {
        d($);
      }).transition("expand").useBodyScroll(!1);
      const F = ((u = e.value) == null ? void 0 : u.clientWidth) || 0;
      w.show({
        width: F
        // height:300,
      });
    }
    function R() {
      w && w.close && w.close(), k();
    }
    return ce(
      () => l.options,
      (I) => {
        a(I);
      },
      {
        // 立即执行
        immediate: !0,
        // 深度监听
        deep: !0
      }
    ), ke(() => {
    }), wt(() => {
      w && w.close(!0);
    }), (I, j) => (h(), _("div", {
      ref_key: "selectRef",
      ref: e,
      class: "lp-select",
      onClick: j[0] || (j[0] = (F) => g(F))
    }, [
      L("div", ba, [
        ue(ya, {
          selecteds: U(s),
          options: U(i),
          limit: l.limit,
          placeholder: l.placeholder,
          itemComponent: l.selectedItemComponent,
          onRemoveItem: U(c),
          onSearch: U(v)
        }, null, 8, ["selecteds", "options", "limit", "placeholder", "itemComponent", "onRemoveItem", "onSearch"]),
        L("div", wa, [
          U(r) ? V("", !0) : (h(), ye(U(_e), {
            key: 0,
            is: "down",
            size: "14",
            color: "#ccc",
            class: G(["lp-select__icon", { active: o.isActive }])
          }, null, 8, ["class"])),
          U(r) ? (h(), ye(U(_e), {
            key: 1,
            onClick: Ne(R, ["stop"]),
            is: "close",
            size: "14",
            color: "#ccc",
            class: "lp-select__close-icon"
          })) : V("", !0)
        ])
      ])
    ], 512));
  }
}), Ca = { class: "lp-layout" }, ka = {
  __name: "lp-select-selected-one",
  setup(n) {
    return Ce({}), (e, l) => (h(), _("div", Ca, " 单选 "));
  }
}, Sa = { class: "lp-select-selected-tag" }, Yn = /* @__PURE__ */ le({
  __name: "lp-select-selected-tag",
  props: {
    value: {},
    labelField: { default: "label" },
    valueField: { default: "value" }
  },
  emits: ["removeItem"],
  setup(n, { emit: e }) {
    const l = e, t = n;
    Ce({});
    function o() {
      l("removeItem", t.value);
    }
    return (s, i) => (h(), _("div", Sa, [
      ue(U(yt), {
        closable: "",
        onClose: o
      }, {
        default: Le(() => [
          je(te(s.value ? s.value[t.labelField] : ""), 1)
        ]),
        _: 1
      })
    ]));
  }
});
let xa = {
  install: (n) => {
    n.component(Vt.name, Vt);
  }
};
const Ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpSelect: Vt,
  LpSelectSelectedOne: ka,
  LpSelectSelectedTag: Yn,
  default: xa
}, Symbol.toStringTag, { value: "Module" })), Ea = ["checked", "disabled"], La = { class: "lp-switch__core" }, Oa = {
  key: 0,
  class: "lp-switch__loading"
}, ja = {
  key: 1,
  class: "lp-switch__inner"
}, Aa = { key: 0 }, Ma = { key: 1 }, Pa = { class: "lp-switch__action" }, Ba = {
  key: 0,
  class: "lp-switch__label lp-switch__label--left"
}, Ia = {
  key: 1,
  class: "lp-switch__label lp-switch__label--right"
}, Ra = {
  name: "LpSwitch"
}, Wt = /* @__PURE__ */ le({
  ...Ra,
  props: {
    modelValue: { type: [Boolean, String, Number] },
    disabled: { type: Boolean },
    loading: { type: Boolean },
    size: { default: "default" },
    width: {},
    inlinePrompt: { type: Boolean },
    activeIcon: {},
    inactiveIcon: {},
    activeText: {},
    inactiveText: {},
    activeValue: { type: [Boolean, String, Number], default: !0 },
    inactiveValue: { type: [Boolean, String, Number], default: !1 },
    activeColor: {},
    inactiveColor: {},
    borderColor: {},
    name: {},
    validateEvent: { type: Boolean, default: !0 },
    beforeChange: {}
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(n, { expose: e, emit: l }) {
    const t = n, o = l, s = Oe("lpFormItem", null), i = P(), r = P(!1), a = A(() => t.size || (s == null ? void 0 : s.size) || "default"), d = A(() => t.disabled || r.value), c = A(() => t.modelValue === t.activeValue);
    A(() => {
      const j = {};
      return t.width && (j.width = typeof t.width == "number" ? `${t.width}px` : t.width), t.activeColor && c.value ? (j.backgroundColor = t.activeColor, j.borderColor = t.activeColor) : t.inactiveColor && !c.value && (j.backgroundColor = t.inactiveColor, j.borderColor = t.inactiveColor), j;
    });
    const k = () => {
      var j;
      (j = i.value) == null || j.focus();
    }, v = () => {
      var j;
      (j = i.value) == null || j.blur();
    }, w = async () => {
      var F;
      if (d.value) return;
      if (t.beforeChange) {
        r.value = !0;
        try {
          if (!await t.beforeChange()) {
            r.value = !1;
            return;
          }
        } catch {
          r.value = !1;
          return;
        }
        r.value = !1;
      }
      const j = c.value ? t.inactiveValue : t.activeValue;
      o("update:modelValue", j), o("change", j), t.validateEvent && ((F = s == null ? void 0 : s.validate) == null || F.call(s, "change")), ve(() => {
        i.value.checked = c.value;
      });
    }, g = () => {
    }, R = (j) => {
      o("focus", j);
    }, I = (j) => {
      var F;
      o("blur", j), t.validateEvent && ((F = s == null ? void 0 : s.validate) == null || F.call(s, "blur"));
    };
    return e({
      focus: k,
      blur: v,
      checked: c
    }), (j, F) => (h(), _("div", {
      class: G(["lp-switch", {
        "lp-switch--checked": c.value,
        "lp-switch--disabled": d.value,
        "lp-switch--loading": j.loading,
        [`lp-switch--${a.value}`]: a.value
      }]),
      onClick: w
    }, [
      L("input", {
        ref_key: "inputRef",
        ref: i,
        class: "lp-switch__input",
        type: "checkbox",
        checked: c.value,
        disabled: d.value,
        onChange: g,
        onFocus: R,
        onBlur: I
      }, null, 40, Ea),
      L("span", La, [
        j.loading ? (h(), _("div", Oa, F[0] || (F[0] = [
          L("i", { class: "lp-switch__loading-icon" }, null, -1)
        ]))) : V("", !0),
        j.inlinePrompt && (j.activeText || j.inactiveText) ? (h(), _("span", ja, [
          c.value ? (h(), _("span", Aa, te(j.activeText), 1)) : (h(), _("span", Ma, te(j.inactiveText), 1))
        ])) : V("", !0),
        L("div", Pa, [
          j.activeIcon && c.value ? (h(), _("i", {
            key: 0,
            class: G([j.activeIcon, "lp-switch__action-icon"])
          }, null, 2)) : j.inactiveIcon && !c.value ? (h(), _("i", {
            key: 1,
            class: G([j.inactiveIcon, "lp-switch__action-icon"])
          }, null, 2)) : V("", !0)
        ])
      ]),
      !j.inlinePrompt && j.activeText && c.value ? (h(), _("span", Ba, te(j.activeText), 1)) : V("", !0),
      !j.inlinePrompt && j.inactiveText && !c.value ? (h(), _("span", Ia, te(j.inactiveText), 1)) : V("", !0)
    ], 2));
  }
});
let za = {
  install: (n) => {
    n.component(Wt.name, Wt);
  }
};
const Na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpSwitch: Wt,
  default: za
}, Symbol.toStringTag, { value: "Module" })), Fa = {
  name: "lp-transition"
}, gt = /* @__PURE__ */ le({
  ...Fa,
  props: {
    name: { default: "" },
    tag: { default: "" }
  },
  setup(n) {
    const e = n;
    return (l, t) => e.name ? (h(), ye(cl, {
      key: 0,
      name: e.name,
      tag: e.tag
    }, {
      default: Le(() => [
        ne(l.$slots, "default")
      ]),
      _: 3
    }, 8, ["name", "tag"])) : ne(l.$slots, "default", { key: 1 });
  }
}), Va = { class: "lp-table__header-wrapper" }, Wa = { class: "lp-table__thead" }, Da = { class: "lp-table__tr" }, Ha = {
  key: 0,
  class: "lp-table__th lp-table__th--expand"
}, Ua = {
  class: "lp-table__body-wrapper",
  ref: "bodyWrapRef"
}, Ga = { class: "lp-table__tbody" }, Ka = { class: "lp-table__tr" }, Ya = {
  key: 0,
  class: "lp-table__td lp-table__td--expand"
}, Xa = ["onClick"], qa = {
  key: 0,
  class: "lp-table__tr lp-table__expand-row"
}, Ja = ["colspan"], Za = { class: "lp-table__expand-content" }, Qa = {
  name: "lp-table"
}, ei = /* @__PURE__ */ le({
  ...Qa,
  props: {
    columns: { default: () => [] },
    data: { default: () => [] },
    stripe: { type: Boolean, default: !1 },
    border: { type: Boolean, default: !1 },
    rowKey: {},
    defaultExpandAll: { type: Boolean, default: !1 },
    rowTransitionName: { default: "" }
  },
  setup(n) {
    en((b) => ({
      "6d1381e2": r
    }));
    const e = Pn(), l = P(null), t = P(null), o = P(0), s = P([]), i = P([]), r = "52px", a = A(() => !!e.expand), d = A(() => s.value.length + (a.value ? 1 : 0)), c = n;
    function k(b) {
      if (!b) return 0;
      const p = parseFloat(b.replace(/px|%|em|rem/g, ""));
      return Number.isNaN(p) ? 0 : p;
    }
    function v() {
      return a.value ? k(r) : 0;
    }
    function w(b) {
      return Gn(b, {
        stickyLeftOffset: v()
      });
    }
    ce(
      () => [c.columns, a.value],
      () => {
        s.value = w(c.columns);
      },
      { immediate: !0, deep: !0 }
    );
    const g = A(() => {
      if (!s.value || s.value.length === 0)
        return a.value ? r : "auto";
      let b = a.value ? k(r) : 0;
      return s.value.forEach((p) => {
        const T = k(p.computedWidth), H = k(p.computedMinWidth);
        T > 0 ? b += T : H > 0 && (b += H);
      }), b < o.value || b === 0 ? "100%" : `${b}px`;
    }), R = A(() => [c.stripe ? "lp-table--striped" : "", c.border ? "lp-table--bordered" : ""]);
    function I(b, p) {
      return (c.rowKey ? b == null ? void 0 : b[c.rowKey] : void 0) ?? `__index_${p}`;
    }
    function j() {
      if (!a.value) {
        i.value = [];
        return;
      }
      const b = c.data.map((T, H) => I(T, H));
      if (c.defaultExpandAll) {
        i.value = b;
        return;
      }
      const p = new Set(b);
      i.value = i.value.filter((T) => p.has(T));
    }
    function F(b, p) {
      return i.value.includes(I(b, p));
    }
    function u(b, p) {
      const T = I(b, p);
      if (i.value.includes(T)) {
        i.value = i.value.filter((H) => H !== T);
        return;
      }
      i.value = [...i.value, T];
    }
    function $() {
      o.value = l.value ? l.value.clientWidth : 0;
    }
    function f() {
      const b = o.value, p = t.value;
      if (!p || b <= 0) return;
      if (p.scrollWidth > b) {
        const H = s.value.map((x) => {
          if (!x.computedWidth && !x.computedMinWidth) {
            const { computedWidth: C, computedMinWidth: B, computedStickyLeft: J, computedStickyRight: me, ...ge } = x;
            return { ...ge, minWidth: "100px" };
          }
          const { computedWidth: M, computedMinWidth: W, computedStickyLeft: X, computedStickyRight: N, ...ee } = x;
          return ee;
        });
        s.value = w(H);
      }
    }
    let m = null;
    return ce(
      () => [c.data, c.rowKey, c.defaultExpandAll, a.value],
      () => {
        j();
      },
      { immediate: !0, deep: !0 }
    ), ke(() => {
      $(), m = new ResizeObserver(() => {
        $(), f();
      }), l.value && m.observe(l.value), setTimeout(() => {
        $(), f();
      }, 0);
    }), Ke(() => {
      m == null || m.disconnect();
    }), ce(
      () => [c.columns, c.data, a.value],
      () => {
        setTimeout(() => {
          f();
        }, 0);
      },
      { deep: !0 }
    ), (b, p) => (h(), _("div", {
      class: "lp-table-box",
      ref_key: "containerRef",
      ref: l
    }, [
      ue(mt, { class: "lp-table__scrollbar" }, {
        default: Le(() => [
          L("div", Va, [
            L("table", {
              class: G(["lp-table", R.value]),
              style: fe({ width: g.value })
            }, [
              L("colgroup", null, [
                a.value ? (h(), _("col", {
                  key: 0,
                  style: fe({ width: r })
                }, null, 4)) : V("", !0),
                (h(!0), _(he, null, $e(s.value, (T) => (h(), _("col", {
                  key: T.name,
                  style: fe({ width: T.computedWidth || T.computedMinWidth })
                }, null, 4))), 128))
              ]),
              L("thead", Wa, [
                L("tr", Da, [
                  a.value ? (h(), _("th", Ha)) : V("", !0),
                  (h(!0), _(he, null, $e(s.value, (T) => (h(), _("th", {
                    key: T.name,
                    class: G(["lp-table__th", T.align && `lp-table__th--${T.align}`, T.fixed && `fixed-${T.fixed}`]),
                    style: fe({
                      left: T.computedStickyLeft,
                      right: T.computedStickyRight
                    })
                  }, te(T.title), 7))), 128))
                ])
              ])
            ], 6)
          ]),
          L("div", Ua, [
            L("table", {
              class: G(["lp-table", R.value]),
              ref_key: "tableRef",
              ref: t,
              style: fe({ width: g.value })
            }, [
              L("colgroup", null, [
                a.value ? (h(), _("col", {
                  key: 0,
                  style: fe({ width: r })
                }, null, 4)) : V("", !0),
                (h(!0), _(he, null, $e(s.value, (T) => (h(), _("col", {
                  key: T.name,
                  style: fe({ width: T.computedWidth || T.computedMinWidth })
                }, null, 4))), 128))
              ]),
              L("tbody", Ga, [
                ue(gt, {
                  name: c.rowTransitionName
                }, {
                  default: Le(() => [
                    (h(!0), _(he, null, $e(c.data, (T, H) => (h(), _(he, {
                      key: I(T, H)
                    }, [
                      L("tr", Ka, [
                        a.value ? (h(), _("td", Ya, [
                          L("button", {
                            type: "button",
                            class: "lp-table__expand-trigger",
                            onClick: Ne((x) => u(T, H), ["stop"])
                          }, [
                            ue(U(_e), {
                              is: "right",
                              size: "14",
                              color: "#ccc",
                              class: G(["lp-table__expand-icon", { active: F(T, H) }])
                            }, null, 8, ["class"])
                          ], 8, Xa)
                        ])) : V("", !0),
                        (h(!0), _(he, null, $e(s.value, (x) => (h(), _("td", {
                          key: x.name,
                          class: G(["lp-table__td", x.align && `lp-table__td--${x.align}`, x.fixed && `fixed-${x.fixed}`]),
                          style: fe({
                            left: x.computedStickyLeft,
                            right: x.computedStickyRight
                          })
                        }, [
                          U(e)[`column.${x.name}`] ? ne(b.$slots, `column.${x.name}`, {
                            key: 0,
                            item: T,
                            column: x,
                            index: H
                          }, void 0, !0) : U(e)[`field.${x.name}`] ? ne(b.$slots, `field.${x.name}`, {
                            key: 1,
                            item: T,
                            column: x,
                            index: H
                          }, void 0, !0) : (h(), _(he, { key: 2 }, [
                            je(te(T[x.name]), 1)
                          ], 64))
                        ], 6))), 128))
                      ]),
                      a.value && F(T, H) ? (h(), _("tr", qa, [
                        L("td", {
                          colspan: d.value,
                          class: "lp-table__td lp-table__td--expand-content"
                        }, [
                          L("div", Za, [
                            ne(b.$slots, "expand", {
                              item: T,
                              index: H,
                              expanded: !0
                            }, void 0, !0)
                          ])
                        ], 8, Ja)
                      ])) : V("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["name"])
              ])
            ], 6)
          ], 512)
        ]),
        _: 3
      })
    ], 512));
  }
}), Dt = /* @__PURE__ */ Re(ei, [["__scopeId", "data-v-36345f8a"]]), ti = {
  title: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  width: {
    type: String,
    default: ""
  },
  align: {
    type: String,
    default: "left"
  },
  fixed: {
    type: String,
    default: ""
  },
  fixedRight: {
    type: Boolean,
    default: !1
  },
  sortable: {
    type: Boolean,
    default: !1
  }
}, Ht = le({
  name: "LpTableColumn",
  props: ti,
  setup(n) {
  },
  render() {
  }
});
let ni = {
  install: (n) => {
    n.component(Dt.name, Dt), n.component(Ht.name, Ht);
  }
};
const li = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTable: Dt,
  LpTableColumn: Ht,
  default: ni
}, Symbol.toStringTag, { value: "Module" })), oi = ["onClick"], si = { class: "text" }, ai = {
  name: "lp-tabs"
}, Ut = /* @__PURE__ */ le({
  ...ai,
  props: /* @__PURE__ */ Ze({
    data: { default: () => [] },
    keys: { default: () => ({ value: "value", title: "title" }) },
    type: { default: "default" },
    full: { type: Boolean, default: !1 },
    column: { type: Boolean, default: !1 },
    modelType: { default: "field" },
    modelField: { default: void 0 }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ Ze(["change"], ["update:modelValue"]),
  setup(n, { emit: e }) {
    const l = bt(n, "modelValue"), t = e, o = n;
    function s(a, d) {
      return a[o.keys.value] ?? d;
    }
    function i(a, d) {
      return o.modelType === "index" ? l.value === d : o.modelType === "field" && o.modelField ? l.value === a[o.modelField] : l.value === a[o.keys.value];
    }
    function r(a, d) {
      let c;
      o.modelType === "index" ? c = d : o.modelType === "field" && o.modelField ? c = a[o.modelField] : c = a[o.keys.value], l.value = c, t("change", {
        value: c,
        item: a,
        index: d
      });
    }
    return (a, d) => (h(), _("div", {
      class: G(["lp-tabs", [{ column: a.column, full: a.full }, a.type ? `type-${a.type}` : ""]])
    }, [
      (h(!0), _(he, null, $e(a.data, (c, k) => (h(), _("div", {
        class: G(["item", { active: i(c, k) }]),
        key: s(c, k),
        onClick: (v) => r(c, k)
      }, [
        L("span", si, te(c[a.keys.title]), 1)
      ], 10, oi))), 128))
    ], 2));
  }
});
let ii = {
  install: (n) => {
    n.component(Ut.name, Ut);
  }
};
const ri = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTabs: Ut,
  default: ii
}, Symbol.toStringTag, { value: "Module" })), ui = {
  name: "LpTag"
}, ci = /* @__PURE__ */ le({
  ...ui,
  props: {
    type: { default: "" },
    size: { default: "" },
    plain: { type: Boolean, default: !1 },
    round: { type: Boolean, default: !1 },
    closable: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click", "close"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = (i) => {
      l.disabled || t("click", i);
    }, s = (i) => {
      l.disabled || t("close", i);
    };
    return (i, r) => (h(), _("div", {
      class: G(["lp-tag", [
        i.type ? `type-${i.type}` : "",
        i.size ? `size-${i.size}` : "",
        {
          plain: i.plain,
          round: i.round,
          disabled: i.disabled
        }
      ]]),
      onClick: o
    }, [
      ne(i.$slots, "default", {}, void 0, !0),
      i.closable ? (h(), _("div", {
        key: 0,
        class: "close-box",
        onClick: Ne(s, ["stop"])
      }, [
        ue(U(_e), {
          is: "close",
          size: "12"
        })
      ])) : V("", !0)
    ], 2));
  }
}), yt = /* @__PURE__ */ Re(ci, [["__scopeId", "data-v-f94358c1"]]);
let di = {
  install: (n) => {
    n.component(yt.name, yt);
  }
};
const pi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTag: yt,
  default: di
}, Symbol.toStringTag, { value: "Module" }));
let fi = {
  install: (n) => {
    n.component(gt.name, gt);
  }
};
const hi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTransition: gt,
  default: fi
}, Symbol.toStringTag, { value: "Module" }));
let vi = {
  install: (n) => {
    n.component(vt.name, vt);
  }
};
const mi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTree: vt,
  default: vi
}, Symbol.toStringTag, { value: "Module" }));
var lt = /* @__PURE__ */ ((n) => (n.TEXT = "text", n.IMG = "img", n.FILE = "file", n))(lt || {}), Se = /* @__PURE__ */ ((n) => (n.STRING = "string", n.ARRAY = "array", n.OBJECT_ARRAY = "objectArray", n.AUTO = "", n))(Se || {}), we = /* @__PURE__ */ ((n) => (n.PENDING = "pending", n.UPLOADING = "uploading", n.SUCCESS = "success", n.ERROR = "error", n))(we || {});
class ln {
  constructor(e, l, t) {
    se(this, "item");
    se(this, "file");
    se(this, "action");
    se(this, "abortController");
    se(this, "callbacks", {});
    se(this, "frontendOption");
    // 前端直传配置
    /**
     * 上传进度
     */
    se(this, "progress", P({
      loaded: 0,
      total: 0,
      percentage: 0
    }));
    /**
     * 上传状态
     */
    se(this, "progressStatus", "");
    this.item = e, this.file = l, this.action = t;
  }
  static create(e, l, t) {
    return new ln(e, l, t);
  }
  /**
   * 获取前端直传配置
   */
  async getFrontendUploadOption() {
    if (!this.action || this.action.type !== "option")
      return null;
    try {
      const e = await Ct.post(this.action.url, {}, {
        headers: {
          "Content-Type": "application/json",
          ...this.action.headers
        }
      });
      return e.data.data || e.data;
    } catch (e) {
      throw console.error("获取前端直传配置失败:", e), e;
    }
  }
  /**
   * 处理文件名和扩展名
   */
  processFileName(e, l) {
    const t = {};
    if (l.includes("etag") && (t.etag = Date.now().toString() + Math.random().toString(36).substr(2, 9)), l.includes("ext")) {
      const o = e.lastIndexOf(".");
      t.ext = o > -1 ? e.substring(o) : "";
    }
    return t;
  }
  /**
   * 替换字符串中的占位符
   */
  replacePlaceholders(e, l) {
    let t = e;
    return Object.entries(l).forEach(([o, s]) => {
      t = t.replace(new RegExp(`\\$\\(${o}\\)`, "g"), s);
    }), t;
  }
  /**
   * 前端直传上传
   */
  async frontendDirectUpload() {
    var s, i, r, a, d, c;
    if (!this.file || !this.frontendOption)
      throw new Error("文件或前端直传配置不存在");
    const e = new FormData(), l = this.processFileName(this.file.name, this.frontendOption.handles), t = this.replacePlaceholders(
      this.frontendOption.data.key || "",
      l
    );
    Object.entries(this.frontendOption.data).forEach(([k, v]) => {
      typeof v == "string" ? e.append(k, this.replacePlaceholders(v, l)) : e.append(k, String(v));
    });
    const o = this.frontendOption.fieldName || "file";
    e.append(o, this.file), this.abortController = new AbortController();
    try {
      const k = await Ct.post(this.frontendOption.url, e, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        signal: this.abortController.signal,
        onUploadProgress: (w) => {
          var g, R;
          if (w.total) {
            const I = {
              loaded: w.loaded,
              total: w.total,
              percentage: Math.round(w.loaded / w.total * 100)
            };
            (R = (g = this.callbacks).onProgress) == null || R.call(g, I), this.progress.value = I;
          }
        }
      }), v = {
        data: {
          fullUrl: `${this.frontendOption.domain}/${t}`,
          key: t,
          url: `${this.frontendOption.domain}/${t}`
        }
      };
      return (i = (s = this.callbacks).onSuccess) == null || i.call(s, v), v;
    } catch (k) {
      if (k.name === "CanceledError") {
        const w = new Error("上传已取消");
        throw (a = (r = this.callbacks).onError) == null || a.call(r, w), w;
      }
      const v = new Error(`前端直传失败: ${k.message}`);
      throw (c = (d = this.callbacks).onError) == null || c.call(d, v), v;
    }
  }
  /**
   * 设置回调函数
   */
  setCallbacks(e) {
    return this.callbacks = { ...this.callbacks, ...e }, this;
  }
  /**
   * 上传文件
   * @returns Promise<any>
   */
  async upload() {
    if (!this.file || !this.action)
      throw new Error("文件或上传配置不存在");
    if (this.action.type === "option")
      try {
        if (this.frontendOption = await this.getFrontendUploadOption(), console.log("前端直传配置:", this.frontendOption), this.frontendOption)
          return await this.frontendDirectUpload();
      } catch (e) {
        console.error("前端直传配置获取失败，回退到普通上传:", e);
      }
    return this.normalUpload();
  }
  /**
   * 普通上传
   */
  async normalUpload() {
    var l, t, o, s, i, r;
    if (!this.file || !this.action)
      throw new Error("文件或上传地址不存在");
    const e = new FormData();
    e.append("file", this.file), this.abortController = new AbortController();
    try {
      const a = await Ct.post(this.action.url, e, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...this.action.headers
        },
        signal: this.abortController.signal,
        onUploadProgress: (d) => {
          var c, k;
          if (d.total) {
            const v = {
              loaded: d.loaded,
              total: d.total,
              percentage: Math.round(d.loaded / d.total * 100)
            };
            (k = (c = this.callbacks).onProgress) == null || k.call(c, v), this.progress.value = v;
          }
        }
      });
      return (t = (l = this.callbacks).onSuccess) == null || t.call(l, a.data), a.data;
    } catch (a) {
      if (a.name === "CanceledError") {
        const c = new Error("上传已取消");
        throw (s = (o = this.callbacks).onError) == null || s.call(o, c), c;
      }
      const d = new Error(`上传失败: ${a.message}`);
      throw (r = (i = this.callbacks).onError) == null || r.call(i, d), d;
    }
  }
  /**
   * 中断上传
   */
  abort() {
    this.abortController && (this.abortController.abort(), this.abortController = void 0);
  }
  /**
   * 获取上传状态
   */
  getStatus() {
    return this.abortController ? this.abortController.signal.aborted ? "aborted" : this.progress.value.percentage === 100 ? "success" : this.progress.value.percentage > 0 ? "uploading" : "pending" : "pending";
  }
}
function gi(n, e) {
  return e.split(".").reduce((l, t) => l && l[t] !== void 0 ? l[t] : null, n);
}
function St(n) {
  if (!n) return "";
  try {
    const l = n.split("?")[0].split("#")[0].split("/"), t = l[l.length - 1];
    return !t || t.startsWith(".") ? "未知文件" : decodeURIComponent(t);
  } catch (e) {
    return console.warn("提取文件名失败:", e), "未知文件";
  }
}
function yi(n, e) {
  const l = P([]), t = P(/* @__PURE__ */ new Map()), o = /* @__PURE__ */ new Map();
  let s = 0, i = null;
  const r = () => e.type === lt.IMG ? "image/*" : e.type === lt.FILE ? "*" : e.type === lt.TEXT ? "text/*" : "", a = () => {
    i = n.value;
    const u = document.createElement("input");
    u.type = "file", u.accept = e.value.accept || r(), u.multiple = e.value.limit !== 1, u.addEventListener("change", async ($) => {
      const m = $.target.files;
      if (m && m.length > 0) {
        if (e.value.limit === 1 && l.value.length > 0) {
          const b = l.value[0];
          b.uploader, b._id && o.delete(b._id), l.value = [];
        }
        for (let b = 0; b < m.length; b++) {
          const p = m[b], T = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, H = {
            _id: T,
            url: "",
            name: p.name,
            size: p.size,
            type: p.type,
            uploader: null,
            status: we.PENDING
          };
          if (p.type.startsWith("image/")) {
            const x = new FileReader();
            x.readAsDataURL(p), x.onload = () => {
              H.url = x.result;
            };
          }
          l.value.push(H), o.set(T, p), e.value.autoUpload && e.value.action && await d(H, p);
        }
      }
    }), u.click();
  }, d = async (u, $) => {
    if (!e.value.action) {
      console.warn("未配置上传地址");
      return;
    }
    const f = ln.create(u, $, e.value.action);
    u.uploader = f, u.status = we.UPLOADING, f.setCallbacks({
      onProgress: (m) => {
        console.log("上传进度:", m);
      },
      onSuccess: (m) => {
        const b = e.value.responseField || "data.fullUrl", p = gi(m, b);
        p && (u.url = p, u.status = we.SUCCESS, v()), t.value.delete(u), console.log("上传成功:", m);
      },
      onError: (m) => {
        u.status = we.ERROR, t.value.delete(u), console.error("上传失败:", m);
      }
    });
    try {
      await f.upload();
    } catch (m) {
      console.error("上传异常:", m);
    }
  }, c = (u) => {
    if (u.uploader && (u.uploader.abort(), u.uploader = null, t.value.delete(u)), u._id && o.delete(u._id), e.value.limit === 1)
      n.value = i, k(i);
    else {
      const $ = l.value.indexOf(u);
      $ > -1 && (l.value.splice($, 1), v());
    }
  }, k = (u) => {
    o.clear();
    let $ = e.value.valueType;
    if (e.value.valueType == Se.AUTO && (e.value.limit == 1 ? $ = Se.STRING : $ = Se.ARRAY), !u) {
      l.value = [];
      return;
    }
    if ($ === Se.ARRAY)
      l.value = u.map((f) => ({
        _id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        url: f,
        name: St(f),
        uploader: null,
        status: we.SUCCESS
      }));
    else if ($ === Se.STRING) {
      let f = e.value.limit === 1 ? [u] : u.split(",");
      l.value = f.map((m) => ({
        _id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        url: m,
        name: St(m),
        uploader: null,
        status: we.SUCCESS
      }));
    } else $ === Se.OBJECT_ARRAY ? l.value = u.map((f) => ({
      _id: f._id || `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      url: f.url,
      name: f.name || St(f.url),
      size: f.size || 0,
      type: f.type || "",
      uploader: null,
      status: we.SUCCESS
    })) : l.value = [];
  }, v = () => {
    s++;
    let u = e.value.valueType;
    e.value.valueType == Se.AUTO && (e.value.limit == 1 ? u = Se.STRING : u = Se.ARRAY);
    let $;
    const f = l.value.filter(
      (m) => m.url && !m.url.startsWith("data:")
      // 排除base64预览URL
    );
    u === Se.ARRAY ? $ = f.map((m) => m.url) : u === Se.STRING ? e.value.limit === 1 ? $ = f.length > 0 ? f[0].url : "" : $ = f.map((m) => m.url).join(",") : u === Se.OBJECT_ARRAY ? $ = f.map((m) => ({
      url: m.url,
      name: m.name,
      size: m.size,
      type: m.type
    })) : $ = "", n.value = $, s--;
  }, w = () => {
    k(n.value);
  }, g = (u) => {
    const $ = l.value[u];
    $.uploader && c($), o.delete($._id), l.value.splice(u, 1), v();
  };
  return ce(l, (u, $) => {
    s === 0 && (u.some(
      (m) => m.status === we.SUCCESS || m.status === we.ERROR
    ) || u.length < (($ == null ? void 0 : $.length) || 0)) && v();
  }, { deep: !0 }), ce(() => n.value, (u, $) => {
    if (s === 0 && JSON.stringify(u) !== JSON.stringify($)) {
      s++;
      try {
        k(u);
      } finally {
        s--;
      }
    }
  }, { deep: !0 }), {
    // 选择文件
    selectFile: a,
    // 文件列表
    fileList: l,
    // 上传进度
    uploadProgress: t,
    // 刷新文件列表
    flushFileList: k,
    // 更新模型值
    updateModelValue: v,
    // 初始化上传
    initUpload: w,
    // 删除文件
    onDelete: g,
    // 上传文件
    uploadFile: d,
    // 取消上传
    cancelUpload: c,
    // 获取文件列表
    getFileList: () => l.value,
    // 获取文件对象列表
    getFileObjectList: () => (console.log("fileObjectMap:", o), l.value.map((u) => ({
      fileItem: u,
      file: o.get(u._id) || null
    })).filter((u) => u.file !== null)),
    // 上传所有文件
    uploadAllFiles: async () => {
      const u = l.value.filter(
        ($) => $.status === we.PENDING
      );
      if (u.length === 0) {
        console.warn("没有待上传的文件");
        return;
      }
      if (!e.value.action) {
        console.warn("未配置上传地址");
        return;
      }
      for (const $ of u) {
        const f = o.get($._id);
        f ? await d($, f) : (console.warn("找不到对应的File对象:", $.name), console.log("fileObjectMap:", $, o));
      }
    },
    // 清除所有文件
    clearAllFiles: () => {
      l.value = [], t.value.clear(), o.clear(), v();
    }
  };
}
const _i = { class: "lp-upload" }, bi = {
  key: 0,
  class: "lp-upload__file-list"
}, wi = ["onClick"], $i = ["src"], Ci = {
  key: 1,
  class: "lp-upload__placeholder"
}, ki = {
  key: 2,
  class: "lp-upload__progress"
}, Si = { class: "lp-upload__progress-text" }, xi = ["onClick"], Ti = {
  key: 3,
  class: "lp-upload__handle"
}, Ei = {
  key: 1,
  class: "lp-upload__file-mode"
}, Li = { class: "lp-upload__file-info" }, Oi = { class: "lp-upload__file-details" }, ji = { class: "lp-upload__file-name" }, Ai = {
  key: 0,
  class: "lp-upload__file-size"
}, Mi = {
  key: 0,
  class: "lp-upload__file-progress"
}, Pi = { class: "lp-upload__progress-text" }, Bi = { class: "lp-upload__file-status" }, Ii = {
  key: 0,
  class: "lp-upload__status-success"
}, Ri = {
  key: 1,
  class: "lp-upload__status-error"
}, zi = {
  key: 2,
  class: "lp-upload__status-pending"
}, Ni = { class: "lp-upload__file-actions" }, Fi = { class: "lp-upload__control flex" }, Vi = {
  name: "LpUpload"
}, Gt = /* @__PURE__ */ le({
  ...Vi,
  props: /* @__PURE__ */ Ze({
    type: { default: "img" },
    limit: { default: 1 },
    accept: { default: "" },
    array: { type: Boolean },
    action: {},
    valueType: { default: Se.AUTO },
    autoUpload: { type: Boolean, default: !0 },
    responseField: { default: "data.fullUrl" }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n, { expose: e }) {
    const l = n, t = bt(n, "modelValue"), o = Oe("uploadConfig", null), s = A(() => ({
      ...l,
      action: l.action || o
    })), {
      // 选择文件
      selectFile: i,
      // 文件列表
      fileList: r,
      // 初始化上传
      initUpload: a,
      // 删除文件
      onDelete: d,
      // 取消上传
      cancelUpload: c,
      // 获取文件列表
      getFileList: k,
      // 获取文件对象列表
      getFileObjectList: v,
      // 上传所有文件
      uploadAllFiles: w,
      // 清除所有文件
      clearAllFiles: g
    } = yi(t, s);
    Ce({});
    const R = A(() => !s.value.limit || r.value.length < s.value.limit);
    A(() => r.value.some((u) => u.status === we.PENDING));
    const I = (u) => u < 1024 ? u + " B" : u < 1024 * 1024 ? (u / 1024).toFixed(1) + " KB" : u < 1024 * 1024 * 1024 ? (u / (1024 * 1024)).toFixed(1) + " MB" : (u / (1024 * 1024 * 1024)).toFixed(1) + " GB", j = async () => {
      await w();
    };
    function F(u) {
      s.value.limit === 1 && i();
    }
    return e({
      getFileList: k,
      getFileObjectList: v,
      uploadAllFiles: w,
      selectFile: i,
      fileList: r,
      clearAllFiles: g
    }), ke(() => {
      a();
    }), (u, $) => (h(), _("div", _i, [
      s.value.type === "img" ? (h(), _("div", bi, [
        (h(!0), _(he, null, $e(U(r), (f, m) => (h(), _("div", {
          class: "lp-upload__item",
          key: m,
          onClick: (b) => F()
        }, [
          f.url && f.url.startsWith("http") ? (h(), _("img", {
            key: 0,
            class: "img",
            src: f.url,
            alt: ""
          }, null, 8, $i)) : (h(), _("div", Ci, [
            ue(U(_e), {
              is: "upload",
              size: "22",
              color: "#ccc"
            })
          ])),
          f.uploader && f.status === U(we).UPLOADING ? (h(), _("div", ki, [
            ue(U(Ft), {
              percentage: f.uploader.progress.percentage,
              status: f.uploader.progressStatus,
              "show-text": !1
            }, null, 8, ["percentage", "status"]),
            L("div", Si, te(f.uploader.progress.percentage) + "%", 1),
            L("div", {
              class: "lp-upload__cancel",
              onClick: Ne((b) => U(c)(f), ["stop"])
            }, [
              ue(U(_e), {
                is: "close",
                size: "12",
                color: "#fff"
              })
            ], 8, xi)
          ])) : (h(), _("div", Ti, [
            ue(U(_e), {
              is: "delete",
              size: "16",
              color: "#fff",
              onClick: Ne((b) => U(d)(m), ["stop"])
            }, null, 8, ["onClick"])
          ]))
        ], 8, wi))), 128)),
        R.value ? (h(), _("div", {
          key: 0,
          class: "lp-upload__item",
          onClick: $[0] || ($[0] = //@ts-ignore
          (...f) => U(i) && U(i)(...f))
        }, [
          ne(u.$slots, "select", {}, () => [
            ue(U(_e), {
              is: "upload",
              size: "22",
              color: "#ff0000"
            })
          ])
        ])) : V("", !0)
      ])) : (h(), _("div", Ei, [
        (h(!0), _(he, null, $e(U(r), (f, m) => {
          var b, p, T, H;
          return h(), _("div", {
            class: "lp-upload__file-item",
            key: m
          }, [
            L("div", Li, [
              ue(U(_e), {
                is: "teaching",
                size: "20",
                color: "#409eff"
              }),
              L("div", Oi, [
                L("div", ji, te(f.name || "未知文件"), 1),
                f.size ? (h(), _("div", Ai, te(I(f.size)), 1)) : V("", !0)
              ])
            ]),
            f.status === U(we).UPLOADING ? (h(), _("div", Mi, [
              ue(U(Ft), {
                percentage: ((p = (b = f.uploader) == null ? void 0 : b.progress) == null ? void 0 : p.percentage) || 0,
                "show-text": !1,
                size: "small"
              }, null, 8, ["percentage"]),
              L("span", Pi, te(((H = (T = f.uploader) == null ? void 0 : T.progress) == null ? void 0 : H.percentage) || 0) + "%", 1)
            ])) : V("", !0),
            L("div", Bi, [
              f.status === U(we).SUCCESS ? (h(), _("span", Ii, [
                ue(U(_e), {
                  is: "security",
                  size: "16",
                  color: "#67c23a"
                })
              ])) : f.status === U(we).ERROR ? (h(), _("span", Ri, [
                ue(U(_e), {
                  is: "close",
                  size: "16",
                  color: "#f56c6c"
                })
              ])) : f.status === U(we).PENDING ? (h(), _("span", zi, [
                ue(U(_e), {
                  is: "time",
                  size: "16",
                  color: "#e6a23c"
                })
              ])) : V("", !0)
            ]),
            L("div", Ni, [
              ue(U(_e), {
                is: "delete",
                size: "16",
                color: "#f56c6c",
                onClick: (x) => U(d)(m),
                style: { cursor: "pointer" }
              }, null, 8, ["onClick"])
            ])
          ]);
        }), 128)),
        L("div", Fi, [
          L("div", {
            class: "lp-upload__select-btn",
            onClick: $[1] || ($[1] = //@ts-ignore
            (...f) => U(i) && U(i)(...f))
          }, [
            ne(u.$slots, "select", {}, () => [
              $[2] || ($[2] = L("button", { class: "btn btn-primary" }, "选择文件", -1))
            ])
          ]),
          s.value.autoUpload ? V("", !0) : (h(), _("div", {
            key: 0,
            class: "lp-upload__upload-btn",
            onClick: j
          }, [
            ne(u.$slots, "upload", {}, () => [
              $[3] || ($[3] = L("button", { class: "btn btn-success" }, "上传文件", -1))
            ])
          ]))
        ])
      ]))
    ]));
  }
});
let Wi = {
  install: (n) => {
    n.component(Gt.name, Gt);
  }
};
const Di = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpUpload: Gt,
  UploadStatusEnum: we,
  UploadTypeEnum: lt,
  UploadValueTypeEnum: Se,
  default: Wi
}, Symbol.toStringTag, { value: "Module" }));
var Xn = typeof global == "object" && global && global.Object === Object && global, Hi = typeof self == "object" && self && self.Object === Object && self, De = Xn || Hi || Function("return this")(), _t = De.Symbol, qn = Object.prototype, Ui = qn.hasOwnProperty, Gi = qn.toString, nt = _t ? _t.toStringTag : void 0;
function Ki(n) {
  var e = Ui.call(n, nt), l = n[nt];
  try {
    n[nt] = void 0;
    var t = !0;
  } catch {
  }
  var o = Gi.call(n);
  return t && (e ? n[nt] = l : delete n[nt]), o;
}
var Yi = Object.prototype, Xi = Yi.toString;
function qi(n) {
  return Xi.call(n);
}
var Ji = "[object Null]", Zi = "[object Undefined]", wn = _t ? _t.toStringTag : void 0;
function it(n) {
  return n == null ? n === void 0 ? Zi : Ji : wn && wn in Object(n) ? Ki(n) : qi(n);
}
function on(n) {
  return n != null && typeof n == "object";
}
var Qi = Array.isArray;
function Jn(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
var er = "[object AsyncFunction]", tr = "[object Function]", nr = "[object GeneratorFunction]", lr = "[object Proxy]";
function Zn(n) {
  if (!Jn(n))
    return !1;
  var e = it(n);
  return e == tr || e == nr || e == er || e == lr;
}
var xt = De["__core-js_shared__"], $n = function() {
  var n = /[^.]+$/.exec(xt && xt.keys && xt.keys.IE_PROTO || "");
  return n ? "Symbol(src)_1." + n : "";
}();
function or(n) {
  return !!$n && $n in n;
}
var sr = Function.prototype, ar = sr.toString;
function Ye(n) {
  if (n != null) {
    try {
      return ar.call(n);
    } catch {
    }
    try {
      return n + "";
    } catch {
    }
  }
  return "";
}
var ir = /[\\^$.*+?()[\]{}|]/g, rr = /^\[object .+?Constructor\]$/, ur = Function.prototype, cr = Object.prototype, dr = ur.toString, pr = cr.hasOwnProperty, fr = RegExp(
  "^" + dr.call(pr).replace(ir, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function hr(n) {
  if (!Jn(n) || or(n))
    return !1;
  var e = Zn(n) ? fr : rr;
  return e.test(Ye(n));
}
function vr(n, e) {
  return n == null ? void 0 : n[e];
}
function rt(n, e) {
  var l = vr(n, e);
  return hr(l) ? l : void 0;
}
var Kt = rt(De, "WeakMap"), mr = 9007199254740991;
function Qn(n) {
  return typeof n == "number" && n > -1 && n % 1 == 0 && n <= mr;
}
function gr(n) {
  return n != null && Qn(n.length) && !Zn(n);
}
var yr = Object.prototype;
function el(n) {
  var e = n && n.constructor, l = typeof e == "function" && e.prototype || yr;
  return n === l;
}
var _r = "[object Arguments]";
function Cn(n) {
  return on(n) && it(n) == _r;
}
var tl = Object.prototype, br = tl.hasOwnProperty, wr = tl.propertyIsEnumerable, $r = Cn(/* @__PURE__ */ function() {
  return arguments;
}()) ? Cn : function(n) {
  return on(n) && br.call(n, "callee") && !wr.call(n, "callee");
};
function Cr() {
  return !1;
}
var nl = typeof exports == "object" && exports && !exports.nodeType && exports, kn = nl && typeof module == "object" && module && !module.nodeType && module, kr = kn && kn.exports === nl, Sn = kr ? De.Buffer : void 0, Sr = Sn ? Sn.isBuffer : void 0, xr = Sr || Cr, Tr = "[object Arguments]", Er = "[object Array]", Lr = "[object Boolean]", Or = "[object Date]", jr = "[object Error]", Ar = "[object Function]", Mr = "[object Map]", Pr = "[object Number]", Br = "[object Object]", Ir = "[object RegExp]", Rr = "[object Set]", zr = "[object String]", Nr = "[object WeakMap]", Fr = "[object ArrayBuffer]", Vr = "[object DataView]", Wr = "[object Float32Array]", Dr = "[object Float64Array]", Hr = "[object Int8Array]", Ur = "[object Int16Array]", Gr = "[object Int32Array]", Kr = "[object Uint8Array]", Yr = "[object Uint8ClampedArray]", Xr = "[object Uint16Array]", qr = "[object Uint32Array]", pe = {};
pe[Wr] = pe[Dr] = pe[Hr] = pe[Ur] = pe[Gr] = pe[Kr] = pe[Yr] = pe[Xr] = pe[qr] = !0;
pe[Tr] = pe[Er] = pe[Fr] = pe[Lr] = pe[Vr] = pe[Or] = pe[jr] = pe[Ar] = pe[Mr] = pe[Pr] = pe[Br] = pe[Ir] = pe[Rr] = pe[zr] = pe[Nr] = !1;
function Jr(n) {
  return on(n) && Qn(n.length) && !!pe[it(n)];
}
function Zr(n) {
  return function(e) {
    return n(e);
  };
}
var ll = typeof exports == "object" && exports && !exports.nodeType && exports, ot = ll && typeof module == "object" && module && !module.nodeType && module, Qr = ot && ot.exports === ll, Tt = Qr && Xn.process, xn = function() {
  try {
    var n = ot && ot.require && ot.require("util").types;
    return n || Tt && Tt.binding && Tt.binding("util");
  } catch {
  }
}(), Tn = xn && xn.isTypedArray, eu = Tn ? Zr(Tn) : Jr;
function tu(n, e) {
  return function(l) {
    return n(e(l));
  };
}
var nu = tu(Object.keys, Object), lu = Object.prototype, ou = lu.hasOwnProperty;
function su(n) {
  if (!el(n))
    return nu(n);
  var e = [];
  for (var l in Object(n))
    ou.call(n, l) && l != "constructor" && e.push(l);
  return e;
}
var Yt = rt(De, "Map"), Xt = rt(De, "DataView"), qt = rt(De, "Promise"), Jt = rt(De, "Set"), En = "[object Map]", au = "[object Object]", Ln = "[object Promise]", On = "[object Set]", jn = "[object WeakMap]", An = "[object DataView]", iu = Ye(Xt), ru = Ye(Yt), uu = Ye(qt), cu = Ye(Jt), du = Ye(Kt), Ue = it;
(Xt && Ue(new Xt(new ArrayBuffer(1))) != An || Yt && Ue(new Yt()) != En || qt && Ue(qt.resolve()) != Ln || Jt && Ue(new Jt()) != On || Kt && Ue(new Kt()) != jn) && (Ue = function(n) {
  var e = it(n), l = e == au ? n.constructor : void 0, t = l ? Ye(l) : "";
  if (t)
    switch (t) {
      case iu:
        return An;
      case ru:
        return En;
      case uu:
        return Ln;
      case cu:
        return On;
      case du:
        return jn;
    }
  return e;
});
var pu = "[object Map]", fu = "[object Set]", hu = Object.prototype, vu = hu.hasOwnProperty;
function mu(n) {
  if (n == null)
    return !0;
  if (gr(n) && (Qi(n) || typeof n == "string" || typeof n.splice == "function" || xr(n) || eu(n) || $r(n)))
    return !n.length;
  var e = Ue(n);
  if (e == pu || e == fu)
    return !n.size;
  if (el(n))
    return !su(n).length;
  for (var l in n)
    if (vu.call(n, l))
      return !1;
  return !0;
}
function gu(n) {
  const e = /* @__PURE__ */ Object.assign({ "./lp-button/index.ts": $l, "./lp-checkbox/index.ts": jl, "./lp-empty/index.ts": Il, "./lp-fold/index.ts": Hl, "./lp-form/index.ts": Jl, "./lp-input/index.ts": co, "./lp-layer/index.ts": Vo, "./lp-layout/index.ts": Ko, "./lp-list/index.ts": Jo, "./lp-loading/index.ts": Qo, "./lp-menu/index.ts": gs, "./lp-message/index.ts": ws, "./lp-paginate/index.ts": Bs, "./lp-panel/index.ts": Ds, "./lp-progress/index.ts": Ys, "./lp-radio/index.ts": la, "./lp-scrollbar/index.ts": ra, "./lp-select/index.ts": Ta, "./lp-switch/index.ts": Na, "./lp-table/index.ts": li, "./lp-tabs/index.ts": ri, "./lp-tag/index.ts": pi, "./lp-transition/index.ts": hi, "./lp-tree/index.ts": mi, "./lp-upload/index.ts": Di });
  console.debug("%cglobalComponents", "color:green", e), Object.keys(e).forEach((l) => {
    const t = e[l].default;
    mu(t) || n.use(t);
  });
}
const yu = (n, e, l, t) => {
  n.__pressTimer === null && (n.__pressTimer = window.setTimeout(() => {
    n.__longPressed = !0, typeof e.value == "function" && e.value(t);
  }, l));
}, Mn = (n) => {
  n.__pressTimer !== null && (clearTimeout(n.__pressTimer), n.__pressTimer = null);
}, _u = {
  mounted(n, e) {
    const l = Number(e.arg) || 500;
    n.__pressTimer = null, n.__longPressed = !1;
    const t = (i) => {
      typeof e.value == "function" && (i.preventDefault(), i.stopPropagation(), yu(n, e, l, i));
    }, o = (i) => {
      typeof e.value == "function" && (Mn(n), setTimeout(() => {
        n.__longPressed = !1;
      }, 100));
    }, s = (i) => {
      typeof e.value == "function" && n.__longPressed && (console.log("handleClick 阻止默认事件", i), i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault(), n.__longPressed = !1);
    };
    n.__handleStart = t, n.__handleCancel = o, n.__handleClick = s, n.addEventListener("pointerdown", t), n.addEventListener("pointerup", o), n.addEventListener("pointerleave", o), n.addEventListener("pointercancel", o), n.addEventListener("click", s, !0);
  },
  unmounted(n) {
    n.removeEventListener("pointerdown", n.__handleStart), n.removeEventListener("pointerup", n.__handleCancel), n.removeEventListener("pointerleave", n.__handleCancel), n.removeEventListener("pointercancel", n.__handleCancel), n.removeEventListener("click", n.__handleClick, !0), Mn(n);
  }
}, bu = {
  name: "LooplanUiNeeds",
  title: "Looplan Ui Needs组件库",
  type: "local",
  version: "0.0.1",
  components: [
    "SelectedTag"
  ]
}, wu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SelectedTag: Yn,
  packageConfig: bu
}, Symbol.toStringTag, { value: "Module" })), Ou = /* @__PURE__ */ le({
  __name: "drawer",
  props: {
    name: {
      type: String,
      default: "lp-drawer"
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["enter", "leave", "afterEnter", "afterLeave", "leaveCancelled"],
  setup(n, { emit: e }) {
    const l = e, t = (a) => {
      a instanceof HTMLElement && (a.style.overflowY = "hidden", a.style.overflowX = "hidden"), ve(() => {
        const d = a.offsetHeight, c = a.offsetWidth;
        l("enter", a, {
          height: d,
          width: c
        });
      });
    }, o = (a) => {
      a instanceof HTMLElement && (a.style.overflowY = "auto", a.style.overflowX = "hidden");
    }, s = (a) => {
      a instanceof HTMLElement && (a.style.overflowY = "hidden", a.style.overflowX = "hidden");
    }, i = (a) => {
      a instanceof HTMLElement && (a.style.overflowY = "auto", a.style.overflowX = "hidden"), l("afterLeave", a);
    }, r = (a) => {
      l("leaveCancelled", a);
    };
    return (a, d) => (h(), ye($t, {
      name: n.disabled ? "" : n.name,
      onBeforeEnter: t,
      onAfterEnter: o,
      onBeforeLeave: s,
      onAfterLeave: i,
      onLeaveCancelled: r
    }, {
      default: Le(() => [
        ne(a.$slots, "default")
      ]),
      _: 3
    }, 8, ["name"]));
  }
}), $u = { class: "lp-tooltip" }, Cu = {
  name: "LpTooltip"
}, ku = /* @__PURE__ */ le({
  ...Cu,
  props: {
    msg: { default: "" },
    bgColor: { default: "rgba(0, 0, 0, 0.8)" },
    position: {}
  },
  setup(n) {
    return en((e) => ({
      23479595: e.bgColor
    })), Ce({}), (e, l) => (h(), _("div", $u, te(e.msg), 1));
  }
});
function ju(n, e) {
  const l = [];
  let t = null;
  const o = P(!0), s = (c) => {
    c.closeTimer && (clearTimeout(c.closeTimer), c.closeTimer = null), c.layer.close(), c.el.removeEventListener("mouseenter", c.listeners.enter), c.el.removeEventListener("mouseleave", c.listeners.leave);
    const k = l.indexOf(c);
    k > -1 && l.splice(k, 1);
  }, i = (c) => {
    if (!o.value) return;
    const v = document.elementsFromPoint(c.clientX, c.clientY).find((w) => w.hasAttribute("lp-tip"));
    if (v) {
      const w = l.find((g) => g.el === v);
      if (w)
        w.closeTimer && (clearTimeout(w.closeTimer), w.closeTimer = null);
      else {
        for (; l.length >= n.limit; )
          s(l[0]);
        const g = v.getAttribute("lp-tip") || "", R = Su(v, {
          msg: g,
          bgColor: "rgb(0, 0, 0)",
          position: n.position
        }), I = {
          el: v,
          layer: R,
          closeTimer: null,
          listeners: {
            enter: () => {
            },
            leave: () => {
            }
          }
        };
        I.listeners.enter = () => {
          I.closeTimer && (clearTimeout(I.closeTimer), I.closeTimer = null);
        }, I.listeners.leave = () => {
          I.closeTimer || (I.closeTimer = setTimeout(() => {
            s(I);
          }, n.hideDelay));
        }, v.addEventListener("mouseenter", I.listeners.enter), v.addEventListener("mouseleave", I.listeners.leave), l.push(I);
      }
    }
  }, r = (c) => {
    if (o.value) {
      if (t && (clearTimeout(t), t = null), l.length > 0) {
        i(c);
        return;
      }
      t = setTimeout(() => {
        i(c);
      }, n.delay);
    }
  }, a = e || window;
  return a.addEventListener("mousemove", r), {
    tooltipEnable: o,
    removeTooltip: () => {
      a.removeEventListener("mousemove", r), t && clearTimeout(t), [...l].forEach(s);
    }
  };
}
function Su(n, e) {
  const l = Ie.src(ku).props(e).follow(n, {
    position: e.position || "bottom-center",
    // 显示箭头
    arrow: !0,
    // 箭头颜色
    arrowColor: e.bgColor || "#000"
  });
  return l.show({}), l;
}
console.debug("looplan-ui");
const Au = {
  install(n) {
    gu(n), zn.appContext = n._context, pl({
      name: "looplan",
      url: "https://api.looplan.cn/IconGateway.detail"
      // 认证
      // token:''
    }), fl(wu), n.directive("longpress", _u);
  }
};
export {
  ft as Input,
  It as InputNumber,
  po as LpBaseTransition,
  Lt as LpButton,
  Ot as LpButtonGroup,
  at as LpCheckbox,
  pt as LpCheckboxGroup,
  Mt as LpCollapse,
  Ou as LpDrawerTransition,
  jt as LpEmpty,
  At as LpFold,
  Pt as LpForm,
  Bt as LpFormItem,
  Vo as LpLayer,
  st as LpLoading,
  Rt as LpMenu,
  zt as LpPaginate,
  Nt as LpPanel,
  Ft as LpProgress,
  mt as LpScrollbar,
  Vt as LpSelect,
  ka as LpSelectSelectedOne,
  Yn as LpSelectSelectedTag,
  Wt as LpSwitch,
  Dt as LpTable,
  Ht as LpTableColumn,
  yt as LpTag,
  gt as LpTransition,
  vt as LpTree,
  Gt as LpUpload,
  we as UploadStatusEnum,
  lt as UploadTypeEnum,
  Se as UploadValueTypeEnum,
  Au as default,
  gu as registerLooplanUiComponents,
  ju as useTooltip
};
