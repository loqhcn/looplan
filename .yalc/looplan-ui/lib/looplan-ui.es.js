var zl = Object.defineProperty;
var Bl = (l, e, n) => e in l ? zl(l, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : l[e] = n;
var K = (l, e, n) => Bl(l, typeof e != "symbol" ? e + "" : e, n);
import { defineComponent as Y, createElementBlock as _, openBlock as f, normalizeClass as D, createBlock as ae, createCommentVNode as N, renderSlot as X, unref as U, createTextVNode as be, toDisplayString as G, ref as z, computed as R, createElementVNode as L, Fragment as oe, renderList as ce, withCtx as we, mergeModels as ze, useModel as lt, inject as Ce, onMounted as ge, nextTick as de, watch as re, onUnmounted as nt, normalizeStyle as se, provide as xe, withModifiers as Ee, createVNode as ee, Transition as At, reactive as pe, getCurrentInstance as dl, onBeforeUnmount as ot, resolveDynamicComponent as Fe, withDirectives as Ue, vShow as Mt, render as Ft, resolveComponent as Nt, useSlots as pl, useCssVars as fl, vModelText as hl, isRef as Wt, markRaw as Ut, TransitionGroup as Rl, useAttrs as Vl } from "vue";
import { LpIcon as ie, resolveComponent as Fl, loadComponent as Dt, setIconGateway as Nl, setComponentPackage as Wl } from "looplan";
import st from "axios";
const Ul = { name: "LpLoading" }, Dl = /* @__PURE__ */ Y({
  ...Ul,
  props: {
    loading: { type: Boolean },
    size: { default: "default" },
    type: { default: "spinner" }
  },
  setup(l) {
    const e = l;
    return (n, t) => (f(), _("span", {
      class: D(["lp-loading", [`lp-loading-${e.type}`, n.size]]),
      "aria-hidden": "true"
    }, null, 2));
  }
}), Le = (l, e) => {
  const n = l.__vccOpts || l;
  for (const [t, o] of e)
    n[t] = o;
  return n;
}, Ne = /* @__PURE__ */ Le(Dl, [["__scopeId", "data-v-5093ff88"]]), Hl = ["disabled"], Gl = {
  name: "LpButton"
}, ut = /* @__PURE__ */ Y({
  ...Gl,
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
  setup(l, { emit: e }) {
    const n = l, t = e, o = (s) => {
      n.loading || t("click", s);
    };
    return (s, a) => (f(), _("button", {
      class: D(["btn", ["btn-" + s.type, s.size, s.loading ? "is-loading" : "", s.plain ? "plain" : "", s.link ? "link" : "", s.icon ? "has-icon" : "", s.iconPosition === "right" ? "icon-right" : ""]]),
      disabled: s.loading,
      onClick: o
    }, [
      s.loading ? (f(), ae(Ne, {
        key: 0,
        size: s.size
      }, null, 8, ["size"])) : s.icon ? (f(), ae(U(ie), {
        key: 1,
        is: s.icon,
        size: s.iconSize,
        color: s.iconColor
      }, null, 8, ["is", "size", "color"])) : N("", !0),
      X(s.$slots, "default", {}, () => [
        be(G(s.text), 1)
      ])
    ], 10, Hl));
  }
}), Kl = { class: "lp-button-group" }, Yl = {
  name: "LpButtonGroup"
}, Xl = /* @__PURE__ */ Y({
  ...Yl,
  setup(l) {
    return (e, n) => (f(), _("div", Kl, [
      X(e.$slots, "default", {}, void 0, !0)
    ]));
  }
}), ct = /* @__PURE__ */ Le(Xl, [["__scopeId", "data-v-04957fc5"]]);
let ql = {
  install: (l) => {
    l.component(ut.name, ut), l.component(ct.name, ct);
  }
};
const Jl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpButton: ut,
  LpButtonGroup: ct,
  default: ql
}, Symbol.toStringTag, { value: "Module" })), Zl = { class: "lp-checkbox__input" }, Ql = ["value", "name", "disabled", "checked", "midway"], en = {
  key: 0,
  class: "lp-checkbox__label"
}, tn = {
  name: "LpCheckbox"
}, We = /* @__PURE__ */ Y({
  ...tn,
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
  setup(l, { emit: e }) {
    const n = l, t = e, o = z(), s = z(!1), a = R(() => n.value !== void 0 ? n.trueLabel !== void 0 || n.falseLabel !== void 0 ? n.value === n.trueLabel : !!n.value : n.trueLabel !== void 0 || n.falseLabel !== void 0 ? n.modelValue === n.trueLabel : !!n.modelValue), i = R(() => n.size), u = R(() => n.disabled), p = (g) => {
      if (n.value !== void 0) {
        t("click", a.value);
        return;
      }
      const m = g.target.checked;
      let c;
      n.trueLabel !== void 0 || n.falseLabel !== void 0 ? c = m ? n.trueLabel : n.falseLabel : c = m, t("update:modelValue", c), t("change", c);
    };
    return (g, k) => (f(), _("label", {
      class: D(["lp-checkbox", [
        `lp-checkbox--${i.value}`,
        {
          "is-disabled": u.value,
          "is-checked": a.value,
          "is-midway": g.midway
        }
      ]])
    }, [
      L("span", Zl, [
        L("input", {
          ref_key: "inputRef",
          ref: o,
          type: "checkbox",
          class: "lp-checkbox__original",
          value: g.title || g.trueLabel,
          name: g.name,
          disabled: u.value,
          checked: a.value,
          midway: g.midway,
          onChange: p,
          onFocus: k[0] || (k[0] = (m) => s.value = !0),
          onBlur: k[1] || (k[1] = (m) => s.value = !1)
        }, null, 40, Ql),
        k[2] || (k[2] = L("span", { class: "lp-checkbox__inner" }, null, -1))
      ]),
      g.$slots.default || g.title ? (f(), _("span", en, [
        X(g.$slots, "default", {}, () => [
          be(G(g.title), 1)
        ])
      ])) : N("", !0)
    ], 2));
  }
}), ln = ["aria-label"], nn = {
  name: "LpCheckboxGroup"
}, Ye = /* @__PURE__ */ Y({
  ...nn,
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
  setup(l, { emit: e }) {
    const n = l, t = e, o = R(() => n.modelValue || []), s = (i, u) => {
      if (n.disabled) return;
      const p = !!u, g = [...o.value], k = g.indexOf(i);
      p ? k === -1 && g.push(i) : k > -1 && g.splice(k, 1), !(g.length < n.min) && (g.length > n.max || (t("update:modelValue", g), t("change", g)));
    }, a = (i) => o.value.includes(i) ? !1 : o.value.length >= n.max;
    return (i, u) => (f(), _("div", {
      class: D(["lp-checkbox-group", [
        `lp-checkbox-group--${i.size}`,
        {
          "is-disabled": i.disabled
        }
      ]]),
      role: "group",
      "aria-label": i.ariaLabel
    }, [
      (f(!0), _(oe, null, ce(i.options, (p) => (f(), ae(We, {
        key: p.value,
        "model-value": o.value.includes(p.value),
        onChange: (g) => s(p.value, g),
        disabled: p.disabled || i.disabled || a(p.value),
        size: i.size
      }, {
        default: we(() => [
          be(G(p.title), 1)
        ]),
        _: 2
      }, 1032, ["model-value", "onChange", "disabled", "size"]))), 128)),
      X(i.$slots, "default")
    ], 10, ln));
  }
}), on = (l) => {
  l.component(We.name, We), l.component(Ye.name, Ye);
}, sn = {
  install: on,
  LpCheckbox: We,
  LpCheckboxGroup: Ye
}, an = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpCheckbox: We,
  LpCheckboxGroup: Ye,
  default: sn
}, Symbol.toStringTag, { value: "Module" })), rn = {
  name: "lp-empty"
}, un = { class: "lp-empty" };
function cn(l, e, n, t, o, s) {
  return f(), _("div", un, " 数据为空! ");
}
const dt = /* @__PURE__ */ Le(rn, [["render", cn]]);
let dn = {
  install: (l) => {
    l.component(dt.name, dt);
  }
};
const pn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpEmpty: dt,
  default: dn
}, Symbol.toStringTag, { value: "Module" })), fn = { class: "lp-fold-header-content" }, hn = {
  name: "LpFold"
}, mn = /* @__PURE__ */ Y({
  ...hn,
  props: /* @__PURE__ */ ze({
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
  emits: /* @__PURE__ */ ze(["change"], ["update:active"]),
  setup(l, { emit: e }) {
    const n = l, t = e, o = lt(l, "active"), s = Ce("lpCollapse", null), a = z(null), i = z("0px"), u = z(!1), p = z(!0), g = () => {
      if (s && s.activeNames && n.name) {
        const v = s.activeNames.value;
        u.value = Array.isArray(v) ? v.includes(n.name) : v === n.name;
      } else
        u.value = o.value || n.expand;
    }, k = () => {
      if (n.disabled) return;
      const v = !u.value;
      s && s.setActiveNames && n.name ? s.setActiveNames(n.name) : o.value = v, u.value = v, t("change", n.name, v), de(() => {
        m();
      });
    }, m = () => {
      a.value && (i.value = u.value ? `${a.value.scrollHeight}px` : "0px");
    }, c = z(null);
    return ge(() => {
      g(), de(() => {
        m(), requestAnimationFrame(() => {
          p.value = !1;
        });
      }), s && s.activeNames && n.name && re(() => s.activeNames.value, () => {
        g(), de(() => {
          m();
        });
      }), (!s || !n.name) && re(o, (v) => {
        u.value = v, de(() => {
          m();
        });
      }), re(u, () => {
        de(() => {
          m();
        });
      }), a.value && (c.value = new MutationObserver(() => {
        m();
      }), c.value.observe(a.value, {
        childList: !0,
        subtree: !0,
        attributes: !0
      }));
    }), nt(() => {
      c.value && c.value.disconnect();
    }), (v, I) => (f(), _("div", {
      class: D(["lp-fold", { "is-disabled": v.disabled }])
    }, [
      L("div", {
        class: D(["lp-fold-header", { "is-active": u.value, "is-disabled": v.disabled }]),
        onClick: k
      }, [
        L("div", fn, [
          X(v.$slots, "title", {}, () => [
            be(G(v.title), 1)
          ], !0)
        ]),
        v.showArrow ? (f(), _("div", {
          key: 0,
          class: D(["lp-fold-arrow", { "is-active": u.value }])
        }, I[0] || (I[0] = [
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
        ]), 2)) : N("", !0)
      ], 2),
      L("div", {
        class: D(["lp-fold-content", { "is-active": u.value, "no-transition": p.value }]),
        style: se({ height: i.value })
      }, [
        L("div", {
          ref_key: "contentRef",
          ref: a,
          class: "lp-fold-content-inner"
        }, [
          X(v.$slots, "default", {}, void 0, !0)
        ], 512)
      ], 6)
    ], 2));
  }
}), pt = /* @__PURE__ */ Le(mn, [["__scopeId", "data-v-fd0ed24b"]]), vn = { class: "lp-collapse" }, gn = {
  name: "LpCollapse"
}, yn = /* @__PURE__ */ Y({
  ...gn,
  props: {
    modelValue: { default: () => [] },
    accordion: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(l, { emit: e }) {
    const n = l, t = e, o = z(n.modelValue), s = (a) => {
      let i = [];
      if (n.accordion)
        i = o.value === a ? "" : a;
      else {
        const u = Array.isArray(o.value) ? [...o.value] : [o.value], p = u.indexOf(a);
        p > -1 ? u.splice(p, 1) : u.push(a), i = u;
      }
      o.value = i, t("update:modelValue", i), t("change", i);
    };
    return re(() => n.modelValue, (a) => {
      o.value = a;
    }), xe("lpCollapse", {
      activeNames: o,
      setActiveNames: s
    }), (a, i) => (f(), _("div", vn, [
      X(a.$slots, "default", {}, void 0, !0)
    ]));
  }
}), ft = /* @__PURE__ */ Le(yn, [["__scopeId", "data-v-8355ddd5"]]);
let _n = {
  install: (l) => {
    l.component(pt.name, pt), l.component(ft.name, ft);
  }
};
const bn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpCollapse: ft,
  LpFold: pt,
  default: _n
}, Symbol.toStringTag, { value: "Module" })), wn = {
  name: "LpForm"
}, ht = /* @__PURE__ */ Y({
  ...wn,
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
  setup(l, { expose: e, emit: n }) {
    const t = l, o = n, s = z([]), a = (c) => {
      s.value.push(c);
    }, i = (c) => {
      const v = s.value.indexOf(c);
      v > -1 && s.value.splice(v, 1);
    }, u = async (c, v) => {
      const I = s.value.find((E) => E.prop === c);
      if (!I)
        return console.warn(`[LpForm] 找不到字段 ${c}`), !1;
      try {
        return await I.validate(), v == null || v(!0, ""), !0;
      } catch (E) {
        const C = E.message || "验证失败";
        return v == null || v(!1, C), !1;
      }
    }, p = async (c) => {
      const v = await Promise.allSettled(
        s.value.map((C) => C.validate())
      ), I = v.every((C) => C.status === "fulfilled"), E = v.filter((C) => C.status === "rejected").map((C) => C.reason.message).join("; ");
      return c == null || c(I, E), I;
    }, g = () => {
      s.value.forEach((c) => {
        c.resetField();
      });
    }, k = (c) => {
      const v = c ? Array.isArray(c) ? c : [c] : [];
      s.value.forEach((I) => {
        (!c || v.includes(I.prop)) && I.clearValidate();
      });
    }, m = async () => {
      await p();
    };
    return R(() => typeof t.labelWidth == "number" ? `${t.labelWidth}px` : t.labelWidth || "auto"), xe("lpForm", {
      props: t,
      addFormItem: a,
      removeFormItem: i,
      validateField: u,
      emit: o
    }), e({
      validate: p,
      validateField: u,
      resetFields: g,
      clearValidate: k
    }), (c, v) => (f(), _("form", {
      class: D(["lp-form", {
        "lp-form--inline": c.inline,
        "lp-form--disabled": c.disabled
      }]),
      onSubmit: Ee(m, ["prevent"])
    }, [
      X(c.$slots, "default")
    ], 34));
  }
}), $n = ["for"], Cn = {
  key: 0,
  class: "lp-form-item__label-suffix"
}, kn = { class: "lp-form-item__content" }, Sn = {
  name: "LpFormItem"
}, mt = /* @__PURE__ */ Y({
  ...Sn,
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
  setup(l, { expose: e }) {
    const n = l, t = Ce("lpForm", null), o = z(""), s = z(""), a = z(!1), i = R(() => {
      var r;
      return ((r = t == null ? void 0 : t.props) == null ? void 0 : r.labelPosition) || "right";
    }), u = R(() => {
      var r;
      return n.size || ((r = t == null ? void 0 : t.props) == null ? void 0 : r.size) || "default";
    }), p = R(() => n.required !== void 0 ? n.required : v().some((b) => b.required)), g = R(() => {
      var r;
      return ((r = t == null ? void 0 : t.props) == null ? void 0 : r.labelSuffix) || "";
    }), k = R(() => {
      var r;
      return o.value === "error" && n.showMessage && (((r = t == null ? void 0 : t.props) == null ? void 0 : r.showMessage) ?? !0);
    }), m = R(() => {
      var y;
      const r = {};
      if (i.value === "top")
        return r;
      const b = n.labelWidth || ((y = t == null ? void 0 : t.props) == null ? void 0 : y.labelWidth);
      return b && (r.width = typeof b == "number" ? `${b}px` : b), r;
    }), c = R(() => n.for || `lp-form-item-${Math.random().toString(36).substr(2, 9)}`), v = () => {
      var w;
      const r = (w = t == null ? void 0 : t.props) == null ? void 0 : w.rules, b = n.rules, y = [];
      if (r && n.prop) {
        const P = r[n.prop];
        P && y.push(...Array.isArray(P) ? P : [P]);
      }
      return b && y.push(...Array.isArray(b) ? b : [b]), y;
    }, I = () => {
      var b;
      const r = (b = t == null ? void 0 : t.props) == null ? void 0 : b.model;
      if (!(!r || !n.prop))
        return r[n.prop];
    }, E = async (r) => {
      if (!n.prop)
        return Promise.resolve();
      const b = v();
      if (!b.length)
        return Promise.resolve();
      const y = r ? b.filter((P) => !P.trigger || P.trigger === r) : b;
      if (!y.length)
        return Promise.resolve();
      o.value = "validating", a.value = !0;
      const w = I();
      return new Promise((P, B) => {
        let h = 0;
        const V = y.length, H = (q, te) => {
          var Z, M;
          if (q)
            h++;
          else {
            o.value = "error", s.value = te || "验证失败", a.value = !1, (Z = t == null ? void 0 : t.emit) == null || Z.call(t, "validate", n.prop, !1, te || ""), B(new Error(te || "验证失败"));
            return;
          }
          h === V && (o.value = "success", s.value = "", a.value = !1, (M = t == null ? void 0 : t.emit) == null || M.call(t, "validate", n.prop, !0, ""), P());
        };
        y.forEach((q) => {
          C(q, w, H);
        });
      });
    }, C = (r, b, y) => {
      if (r.required && (b == null || b === "")) {
        y(!1, r.message || "该字段为必填项");
        return;
      }
      if ((b == null || b === "") && !r.required) {
        y(!0);
        return;
      }
      if (r.min !== void 0 || r.max !== void 0 || r.len !== void 0) {
        const w = String(b).length;
        if (r.len !== void 0 && w !== r.len) {
          y(!1, r.message || `长度必须为 ${r.len} 个字符`);
          return;
        }
        if (r.min !== void 0 && w < r.min) {
          y(!1, r.message || `长度不能少于 ${r.min} 个字符`);
          return;
        }
        if (r.max !== void 0 && w > r.max) {
          y(!1, r.message || `长度不能超过 ${r.max} 个字符`);
          return;
        }
      }
      if (r.pattern && !r.pattern.test(String(b))) {
        y(!1, r.message || "格式不正确");
        return;
      }
      if (r.validator) {
        r.validator(r, b, (w) => {
          y(!w, w == null ? void 0 : w.message);
        });
        return;
      }
      y(!0);
    }, T = () => {
      var b;
      o.value = "", s.value = "", a.value = !1;
      const r = (b = t == null ? void 0 : t.props) == null ? void 0 : b.model;
      r && n.prop && (r[n.prop] = void 0);
    }, $ = () => {
      o.value = "", s.value = "", a.value = !1;
    }, S = {
      prop: n.prop || "",
      validate: E,
      resetField: T,
      clearValidate: $
    };
    return ge(() => {
      var r;
      n.prop && ((r = t == null ? void 0 : t.addFormItem) == null || r.call(t, S));
    }), nt(() => {
      var r;
      n.prop && ((r = t == null ? void 0 : t.removeFormItem) == null || r.call(t, S));
    }), re(() => n.error, (r) => {
      r ? (o.value = "error", s.value = r) : (o.value = "", s.value = "");
    }, { immediate: !0 }), e({
      validate: E,
      resetField: T,
      clearValidate: $
    }), (r, b) => (f(), _("div", {
      class: D(["lp-form-item", {
        "lp-form-item--error": o.value === "error",
        "lp-form-item--success": o.value === "success",
        "lp-form-item--validating": o.value === "validating",
        "lp-form-item--required": p.value,
        [`lp-form-item--${i.value}`]: i.value,
        [`lp-form-item--${u.value}`]: u.value
      }])
    }, [
      r.label || r.$slots.label ? (f(), _("label", {
        key: 0,
        class: "lp-form-item__label",
        style: se(m.value),
        for: c.value
      }, [
        X(r.$slots, "label", {}, () => [
          be(G(r.label), 1)
        ]),
        g.value ? (f(), _("span", Cn, G(g.value), 1)) : N("", !0)
      ], 12, $n)) : N("", !0),
      L("div", kn, [
        X(r.$slots, "default"),
        ee(At, { name: "lp-zoom-in-top" }, {
          default: we(() => [
            k.value ? (f(), _("div", {
              key: 0,
              class: D(["lp-form-item__error", {
                "lp-form-item__error--inline": r.inlineMessage
              }])
            }, G(s.value), 3)) : N("", !0)
          ]),
          _: 1
        })
      ])
    ], 2));
  }
});
let Tn = {
  install: (l) => {
    l.component(ht.name, ht), l.component(mt.name, mt);
  }
};
const xn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpForm: ht,
  LpFormItem: mt,
  default: Tn
}, Symbol.toStringTag, { value: "Module" })), En = {
  key: 0,
  class: "lp-input__prepend"
}, Ln = { class: "lp-input__wrapper" }, On = {
  key: 0,
  class: "lp-input__prefix"
}, jn = ["type", "value", "placeholder", "disabled", "readonly", "maxlength", "minlength", "autocomplete", "name", "form", "tabindex"], An = {
  key: 1,
  class: "lp-input__suffix"
}, Mn = {
  key: 1,
  class: "lp-input__append"
}, Pn = {
  name: "LpInput"
}, Xe = /* @__PURE__ */ Y({
  ...Pn,
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
    size: { default: "default" },
    validateEvent: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "input", "change", "focus", "blur", "clear", "keydown", "keyup"],
  setup(l, { expose: e, emit: n }) {
    const t = l, o = n, s = Ce("lpFormItem", null), a = z(), i = z(!1);
    z(!1);
    const u = z(!1), p = z(!1), g = R(() => t.size || (s == null ? void 0 : s.size) || "default"), k = async () => {
      var h;
      await de(), (h = a.value) == null || h.focus();
    }, m = () => {
      var h;
      (h = a.value) == null || h.blur();
    }, c = () => {
      var h;
      (h = a.value) == null || h.select();
    }, v = () => {
      var h;
      o("update:modelValue", ""), o("input", ""), o("change", ""), o("clear"), t.validateEvent && ((h = s == null ? void 0 : s.validate) == null || h.call(s, "change"));
    }, I = (h) => {
      var q;
      const V = h.target;
      let { value: H } = V;
      u.value || (o("update:modelValue", H), o("input", H), t.validateEvent && ((q = s == null ? void 0 : s.validate) == null || q.call(s, "input")));
    }, E = (h) => {
      var q;
      const V = h.target, { value: H } = V;
      o("change", H), t.validateEvent && ((q = s == null ? void 0 : s.validate) == null || q.call(s, "change"));
    }, C = (h) => {
      i.value = !0, o("focus", h);
    }, T = (h) => {
      var V;
      i.value = !1, o("blur", h), t.validateEvent && ((V = s == null ? void 0 : s.validate) == null || V.call(s, "blur"));
    }, $ = () => {
      i.value || k();
    }, S = (h) => {
      h.stopPropagation(), v();
    }, r = () => {
      p.value = !p.value, k();
    }, b = (h) => {
      o("keydown", h);
    }, y = (h) => {
      o("keyup", h);
    }, w = () => {
      u.value = !0;
    }, P = () => {
    }, B = (h) => {
      u.value = !1, I(h);
    };
    return e({
      focus: k,
      blur: m,
      select: c,
      clear: v,
      input: a
    }), (h, V) => (f(), _("div", {
      class: D(["lp-input", {
        "lp-input--disabled": h.disabled,
        "lp-input--readonly": h.readonly,
        "lp-input--clearable": h.clearable && !h.disabled && !h.readonly,
        "lp-input--prefix": h.$slots.prefix || h.prefixIcon,
        "lp-input--suffix": h.$slots.suffix || h.suffixIcon || h.clearable || h.showPassword,
        "lp-input--password": h.showPassword,
        [`lp-input--${g.value}`]: g.value
      }]),
      onClick: $
    }, [
      h.$slots.prepend ? (f(), _("div", En, [
        X(h.$slots, "prepend")
      ])) : N("", !0),
      L("div", Ln, [
        h.$slots.prefix || h.prefixIcon ? (f(), _("span", On, [
          X(h.$slots, "prefix", {}, () => [
            h.prefixIcon ? (f(), _("i", {
              key: 0,
              class: D(h.prefixIcon)
            }, null, 2)) : N("", !0)
          ])
        ])) : N("", !0),
        L("input", {
          ref_key: "inputRef",
          ref: a,
          class: "lp-input__inner",
          type: p.value ? "text" : h.type,
          value: h.modelValue,
          placeholder: h.placeholder,
          disabled: h.disabled,
          readonly: h.readonly,
          maxlength: h.maxlength,
          minlength: h.minlength,
          autocomplete: h.autocomplete,
          name: h.name,
          form: h.form,
          tabindex: h.tabindex,
          onInput: I,
          onChange: E,
          onFocus: C,
          onBlur: T,
          onKeydown: b,
          onKeyup: y,
          onCompositionstart: w,
          onCompositionupdate: P,
          onCompositionend: B
        }, null, 40, jn),
        h.$slots.suffix || h.suffixIcon || h.clearable || h.showPassword ? (f(), _("span", An, [
          X(h.$slots, "suffix", {}, () => [
            h.clearable && !h.disabled && !h.readonly && h.modelValue ? (f(), _("i", {
              key: 0,
              class: "lp-input__clear lp-icon-circle-close",
              onClick: S
            })) : N("", !0),
            h.showPassword ? (f(), _("i", {
              key: 1,
              class: D(["lp-input__password", p.value ? "lp-icon-view" : "lp-icon-hide"]),
              onClick: r
            }, null, 2)) : N("", !0),
            h.suffixIcon ? (f(), _("i", {
              key: 2,
              class: D(h.suffixIcon)
            }, null, 2)) : N("", !0)
          ])
        ])) : N("", !0)
      ]),
      h.$slots.append ? (f(), _("div", Mn, [
        X(h.$slots, "append")
      ])) : N("", !0)
    ], 2));
  }
}), In = { class: "lp-input-number__input-box" }, zn = {
  key: 0,
  class: "lp-input-number__prepend"
}, Bn = ["value", "placeholder", "disabled", "readonly", "name", "autocomplete"], Rn = {
  key: 1,
  class: "lp-input-number__append"
}, Vn = {
  key: 2,
  class: "lp-input-number__controls"
}, Fn = {
  name: "LpInputNumber"
}, vt = /* @__PURE__ */ Y({
  ...Fn,
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
  setup(l, { expose: e, emit: n }) {
    const t = l, o = n, s = Ce("lpFormItem", null), a = z(), i = z(null), u = z(!1), p = z(null), g = R(() => t.size || (s == null ? void 0 : s.size) || "default"), k = R(() => {
      if (t.precision !== void 0)
        return t.precision;
      const M = I(t.step), W = I(t.modelValue);
      return Math.max(M, W);
    }), m = R(() => i.value !== null ? i.value : t.modelValue === void 0 || t.modelValue === null ? "" : typeof t.modelValue == "number" ? t.modelValue.toFixed(k.value) : String(t.modelValue)), c = R(() => t.disabled || t.max !== void 0 && t.modelValue !== void 0 && t.modelValue >= t.max), v = R(() => t.disabled || t.min !== void 0 && t.modelValue !== void 0 && t.modelValue <= t.min), I = (M) => {
      if (M === void 0) return 0;
      const W = M.toString(), Q = W.indexOf(".");
      return Q !== -1 ? W.length - Q - 1 : 0;
    }, E = (M, W) => (W === void 0 && (W = k.value), parseFloat(Math.round(M * Math.pow(10, W)) / Math.pow(10, W) + "")), C = (M) => E(M, k.value), T = (M) => t.max !== void 0 && M > t.max ? t.max : t.min !== void 0 && M < t.min ? t.min : M, $ = (M) => t.stepStrictly ? (I(t.step), Math.round(M / t.step) * t.step) : M, S = () => {
      var M;
      (M = a.value) == null || M.focus();
    }, r = () => {
      var M;
      (M = a.value) == null || M.blur();
    }, b = () => {
      var M;
      (M = a.value) == null || M.select();
    }, y = () => {
      if (c.value) return;
      const M = t.modelValue || 0, W = T(C(M + t.step));
      P(W);
    }, w = () => {
      if (v.value) return;
      const M = t.modelValue || 0, W = T(C(M - t.step));
      P(W);
    }, P = (M) => {
      var Q;
      const W = t.modelValue;
      M !== void 0 && (M = $(C(M)), M = T(M)), W !== M && (i.value = null, o("update:modelValue", M), o("change", M, W), t.validateEvent && ((Q = s == null ? void 0 : s.validate) == null || Q.call(s, "change")));
    }, B = (M) => {
      const Q = M.target.value;
      if (i.value = Q, Q === "") {
        o("update:modelValue", void 0), o("input", void 0);
        return;
      }
      const me = Number(Q);
      isNaN(me) || o("input", me);
    }, h = () => {
      const M = i.value;
      if (M === null || M === "") {
        P(void 0);
        return;
      }
      const W = Number(M);
      if (isNaN(W)) {
        i.value = null;
        return;
      }
      P(W);
    }, V = (M) => {
      u.value = !0, o("focus", M);
    }, H = (M) => {
      var W;
      u.value = !1, i.value = null, o("blur", M), t.validateEvent && ((W = s == null ? void 0 : s.validate) == null || W.call(s, "blur"));
    }, q = (M) => {
      switch (M.key) {
        case "ArrowUp":
          M.preventDefault(), y();
          break;
        case "ArrowDown":
          M.preventDefault(), w();
          break;
      }
    }, te = (M, W) => {
      if (W.button !== 0) return;
      const Q = M === "increase" ? y : w;
      Q(), p.value = setTimeout(() => {
        const me = setInterval(Q, 100), ye = () => {
          clearInterval(me), document.removeEventListener("mouseup", ye);
        };
        document.addEventListener("mouseup", ye);
      }, 300);
    }, Z = () => {
      p.value && (clearTimeout(p.value), p.value = null);
    };
    return re(
      () => t.modelValue,
      (M) => {
        i.value = null;
      },
      { immediate: !0 }
    ), e({
      focus: S,
      blur: r,
      select: b,
      increase: y,
      decrease: w
    }), (M, W) => (f(), _("div", {
      class: D(["lp-input-number", {
        "lp-input-number--disabled": M.disabled,
        "lp-input-number--controls-right": M.controlsPosition === "right",
        [`lp-input-number--${g.value}`]: g.value
      }])
    }, [
      M.controlsPosition !== "right" ? (f(), _("span", {
        key: 0,
        class: D(["lp-input-number__decrease", {
          "lp-input-number__decrease--disabled": v.value
        }]),
        onMousedown: W[0] || (W[0] = (Q) => te("decrease", Q)),
        onMouseup: Z,
        onMouseleave: Z
      }, W[4] || (W[4] = [
        L("i", { class: "lp-input-number__decrease-icon text" }, "-", -1)
      ]), 34)) : N("", !0),
      L("div", In, [
        M.$slots.prepend ? (f(), _("div", zn, [
          X(M.$slots, "prepend")
        ])) : N("", !0),
        L("input", {
          ref_key: "inputRef",
          ref: a,
          class: D(["lp-input-number__inner", {
            "lp-input-number__inner--with-prepend": M.$slots.prepend,
            "lp-input-number__inner--with-append": M.$slots.append
          }]),
          type: "text",
          value: m.value,
          placeholder: M.placeholder,
          disabled: M.disabled,
          readonly: M.readonly,
          name: M.name,
          autocomplete: M.autocomplete,
          onInput: B,
          onChange: h,
          onFocus: V,
          onBlur: H,
          onKeydown: q
        }, null, 42, Bn),
        M.$slots.append ? (f(), _("div", Rn, [
          X(M.$slots, "append")
        ])) : N("", !0)
      ]),
      M.controlsPosition !== "right" ? (f(), _("span", {
        key: 1,
        class: D(["lp-input-number__increase", {
          "lp-input-number__increase--disabled": c.value
        }]),
        onMousedown: W[1] || (W[1] = (Q) => te("increase", Q)),
        onMouseup: Z,
        onMouseleave: Z
      }, W[5] || (W[5] = [
        L("i", { class: "lp-input-number__increase-icon text" }, "+", -1)
      ]), 34)) : N("", !0),
      M.controlsPosition === "right" ? (f(), _("div", Vn, [
        L("span", {
          class: D(["lp-input-number__increase", {
            "lp-input-number__increase--disabled": c.value
          }]),
          onMousedown: W[2] || (W[2] = (Q) => te("increase", Q)),
          onMouseup: Z,
          onMouseleave: Z
        }, W[6] || (W[6] = [
          L("i", { class: "lp-input-number__increase-icon" }, "▲", -1)
        ]), 34),
        L("span", {
          class: D(["lp-input-number__decrease", {
            "lp-input-number__decrease--disabled": v.value
          }]),
          onMousedown: W[3] || (W[3] = (Q) => te("decrease", Q)),
          onMouseup: Z,
          onMouseleave: Z
        }, W[7] || (W[7] = [
          L("i", { class: "lp-input-number__decrease-icon" }, "▼", -1)
        ]), 34)
      ])) : N("", !0)
    ], 2));
  }
});
let Nn = {
  install: (l) => {
    l.component(Xe.name, Xe), l.component(vt.name, vt);
  }
};
const Wn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Input: Xe,
  InputNumber: vt,
  default: Nn
}, Symbol.toStringTag, { value: "Module" })), Un = /* @__PURE__ */ Y({
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
  setup(l, { emit: e }) {
    const n = e, t = (u) => {
      u instanceof HTMLElement && (u.getBoundingClientRect(), de(() => {
        const p = u.offsetHeight, g = u.offsetWidth;
        n("enter", u, {
          height: p,
          width: g
        });
      }));
    }, o = (u) => {
      u instanceof HTMLElement && (u.style.overflowY = "", u.style.overflowX = ""), n("afterEnter", u);
    }, s = (u) => {
    }, a = (u) => {
      n("afterLeave", u);
    }, i = (u) => {
      n("leaveCancelled", u);
    };
    return ge(() => {
    }), (u, p) => (f(), ae(At, {
      name: l.disabled ? "" : l.name,
      onBeforeEnter: t,
      onAfterEnter: o,
      onBeforeLeave: s,
      onAfterLeave: a,
      onLeaveCancelled: i
    }, {
      default: we(() => [
        X(u.$slots, "default")
      ]),
      _: 3
    }, 8, ["name"]));
  }
});
function Dn(l) {
  var b;
  const e = z(null), n = z(null);
  l && (e.value = l.target, n.value = l.options);
  const t = z(null), o = z(null), s = z(8), a = pe({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }), i = pe({
    position: "absolute",
    width: "14px",
    height: "14px",
    backgroundColor: ((b = n.value) == null ? void 0 : b.arrowColor) || "#fff",
    transform: "rotate(45deg)"
  }), u = z(!1);
  function p() {
    var P;
    if (!((P = n.value) != null && P.arrow) || !o.value) return;
    const y = n.value.arrowSize || s.value, [, w = "center"] = (n.value.position || "bottom-center").split("-");
    switch (Object.assign(i, {
      position: "absolute",
      width: `${y}px`,
      height: `${y}px`,
      transform: "rotate(45deg)",
      top: "",
      left: "",
      right: "",
      bottom: "",
      marginTop: "",
      marginLeft: "",
      marginRight: "",
      marginBottom: ""
    }), o.value) {
      case "top":
        if (i.bottom = `-${y / 2}px`, w === "start") {
          const B = a.width / 2;
          i.left = `${B}px`, i.marginLeft = `-${y / 2}px`;
        } else if (w === "end") {
          const B = a.width / 2;
          i.right = `${B}px`, i.marginRight = `-${y / 2}px`;
        } else
          i.left = "50%", i.marginLeft = `-${y / 2}px`;
        break;
      case "right":
        if (i.left = `-${y / 2}px`, w === "start") {
          const B = a.height / 2;
          i.top = `${B}px`, i.marginTop = `-${y / 2}px`;
        } else if (w === "end") {
          const B = a.height / 2;
          i.bottom = `${B}px`, i.marginBottom = `-${y / 2}px`;
        } else
          i.top = "50%", i.marginTop = `-${y / 2}px`;
        break;
      case "bottom":
        if (i.top = `-${y / 2}px`, w === "start") {
          const B = a.width / 2;
          i.left = `${B}px`, i.marginLeft = `-${y / 2}px`;
        } else if (w === "end") {
          const B = a.width / 2;
          i.right = `${B}px`, i.marginRight = `-${y / 2}px`;
        } else
          i.left = "50%", i.marginLeft = `-${y / 2}px`;
        break;
      case "left":
        if (i.right = `-${y / 2}px`, w === "start") {
          const B = a.height / 2;
          i.top = `${B}px`, i.marginTop = `-${y / 2}px`;
        } else if (w === "end") {
          const B = a.height / 2;
          i.bottom = `${B}px`, i.marginBottom = `-${y / 2}px`;
        } else
          i.top = "50%", i.marginTop = `-${y / 2}px`;
        break;
    }
  }
  function g(y) {
    return y.getBoundingClientRect();
  }
  function k(y, w, P, B) {
    switch (B) {
      case "start":
        return y;
      case "end":
        return y + w - P;
      case "center":
      default:
        return y + (w - P) / 2;
    }
  }
  function m(y, w, P, B) {
    switch (B) {
      case "start":
        return y;
      case "end":
        return y + w - P;
      case "center":
      default:
        return y + (w - P) / 2;
    }
  }
  function c(y, w, P, B, h, V) {
    let H = 0;
    return y < 0 && (H += Math.abs(y)), y + P > h && (H += y + P - h), w < 0 && (H += Math.abs(w)), w + B > V && (H += w + B - V), H;
  }
  function v(y, w, P, B, h) {
    const V = y.map((H) => {
      const q = c(
        H.x,
        H.y,
        w,
        P,
        B,
        h
      );
      return { ...H, overflow: q };
    });
    return V.sort((H, q) => H.overflow - q.overflow), V[0];
  }
  function I(y, w, P, B, h, V, H) {
    if (!h || !n.value) {
      console.error("calculateFollowPosition - missing container or options:", {
        container: !!h,
        options: !!n.value
      });
      return;
    }
    a.x = y + P / 2, a.y = w + B / 2, a.width = P, a.height = B;
    const q = h.getBoundingClientRect(), te = q.width, Z = q.height;
    if (te === 0 || Z === 0) {
      setTimeout(() => {
        I(y, w, P, B, h, V, H);
      }, 100);
      return;
    }
    const M = window.innerWidth, W = window.innerHeight, [Q, me = "center"] = n.value.position.split("-");
    let ye = [];
    const $e = n.value.arrowSize || s.value, ke = n.value.arrow ? $e : 0, je = {
      left: {
        x: y - te - ke,
        y: m(w, B, Z, me)
      },
      right: {
        x: y + P + ke,
        y: m(w, B, Z, me)
      },
      top: {
        x: k(y, P, te, me),
        y: w - Z - ke
      },
      bottom: {
        x: k(y, P, te, me),
        y: w + B + ke
      }
    }, d = je[Q];
    d && ye.push({ direction: Q, ...d });
    const x = ["top", "right", "bottom", "left"];
    let A = x.indexOf(Q);
    if (A !== -1)
      for (let F = 1; F < x.length; F++) {
        const O = x[(A + F) % x.length];
        ye.push({
          direction: O,
          ...je[O]
        });
      }
    const j = v(ye, te, Z, M, W);
    o.value = j.direction, p(), V.left = `${j.x}px`, V.top = `${j.y}px`, V.transform = "", V.right = "", V.bottom = "", H && H();
  }
  function E(y, w, P, B) {
    if (!n.value) return;
    const { clientX: h, clientY: V } = y;
    I(h, V, 0, 0, w, P, B);
  }
  function C(y, w, P) {
    if (!e.value) {
      console.error("updateFollowPosition - no follow target set");
      return;
    }
    if (typeof e.value != "string") {
      if (!n.value) {
        console.error("updateFollowPosition - missing follow options");
        return;
      }
      try {
        if (!(e.value instanceof HTMLElement)) {
          console.error("updateFollowPosition - target is not an HTMLElement:", e.value);
          return;
        }
        if (!document.body.contains(e.value)) {
          console.error("updateFollowPosition - target not in document"), r();
          return;
        }
        const B = g(e.value), { x: h, y: V, width: H, height: q } = B;
        I(h, V, H, q, y, w, P);
      } catch (B) {
        console.error("updateFollowPosition - error calculating position:", B);
      }
    }
  }
  function T(y, w, P) {
    var q;
    t.value && cancelAnimationFrame(t.value);
    const h = 1e3 / (((q = n.value) == null ? void 0 : q.fps) || 60);
    let V = 0;
    const H = (te) => {
      t.value = requestAnimationFrame(H), !(te - V < h) && (V = te, C(y, w, P));
    };
    t.value = requestAnimationFrame(H);
  }
  let $ = null;
  function S(y, w, P) {
    var B, h;
    return l ? (u.value = ((B = n.value) == null ? void 0 : B.arrow) || !1, (h = n.value) != null && h.arrow && (s.value = n.value.arrowSize || 8, p()), typeof e.value == "string" && e.value === "mouse" ? ($ = (V) => E(V, y, w, P), window.addEventListener("mousemove", $)) : (C(y, w, P), n.value && n.value.fps ? T(y, w, P) : (window.addEventListener(
      "resize",
      () => C(y, w, P)
    ), window.addEventListener(
      "scroll",
      () => C(y, w, P),
      !0
    ))), !0) : !1;
  }
  function r() {
    $ && window.removeEventListener("mousemove", $), window.removeEventListener("resize", C), window.removeEventListener("scroll", C, !0), t.value && (cancelAnimationFrame(t.value), t.value = null);
  }
  return {
    followTarget: e,
    followOptions: n,
    followAnimationFrame: t,
    arrowDirection: o,
    arrowSize: s,
    arrowStyle: i,
    targetCenter: a,
    showArrow: u,
    initFollow: S,
    updateFollowPosition: C,
    updateArrowStyle: p,
    cleanup: r
  };
}
function Ht(l) {
  return new Promise((e, n) => {
    let t;
    const o = () => {
      const s = l();
      s !== void 0 ? (cancelAnimationFrame(t), e(s)) : t = requestAnimationFrame(o);
    };
    t = requestAnimationFrame(o);
  });
}
function Gt(l, e = "px") {
  return l ? typeof l == "string" ? l : `${l}${e}` : "";
}
function Kt(l, e) {
  console.warn(`[${l}] ${e}`);
}
function Hn(l, e) {
  throw new Error(`[${l}] ${e}`);
}
function Ge(l) {
  return typeof l == "number";
}
function Gn(l) {
  return l !== null && typeof l == "object";
}
function ml(l, e) {
  let n = Array.isArray(l) ? [...l] : [l], t = !1, o = !1;
  const s = () => {
    const p = [];
    for (const g of n)
      typeof g == "string" ? document.querySelectorAll(g).forEach((k) => p.push(k)) : g instanceof HTMLElement && p.push(g);
    return p;
  }, a = (p) => {
    t = s().some((k) => k.contains(p.target));
  }, i = (p) => {
    if (!o)
      return;
    const k = s().some((m) => m.contains(p.target));
    (!t || !k) && e();
  }, u = () => {
    o && e();
  };
  return document.addEventListener("mousedown", a), document.addEventListener("click", i), window.addEventListener("blur", u), setTimeout(() => {
    o = !0;
  }, 0), {
    unbind: () => {
      document.removeEventListener("mousedown", a), document.removeEventListener("click", i), window.removeEventListener("blur", u);
    },
    appendSelector: (p) => {
      const g = Array.isArray(p) ? p : [p];
      n.push(...g);
    }
  };
}
const Kn = {
  name: "lp-layer"
}, Yn = /* @__PURE__ */ Y({
  ...Kn,
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
  setup(l, { expose: e, emit: n }) {
    const t = n, o = dl(), s = l, a = z(!1), i = z(null), u = z(null), p = z(!1), g = z(""), k = z(!1), m = z(!1);
    let c = !1;
    const v = pe({
      zIndex: s.zIndex,
      position: "fixed"
    }), I = pe({});
    function E() {
      g.value = `lp-${s.transition}`;
    }
    E();
    const { showArrow: C, arrowStyle: T, initFollow: $, updateFollowPosition: S, cleanup: r } = Dn(s.follow), b = [];
    s.layerObj.options.useBodyScroll && (I["overflow-x"] = "auto", I["overflow-y"] = "auto");
    let y = null;
    s.layerObj.getTransitionComponent() ? y = s.layerObj.getTransitionComponent() : y = Un;
    let w = {
      /**
       * 是否过渡完成
       */
      enter: !1,
      width: 0,
      height: 0
    };
    const P = z(!1);
    function B(d) {
      w.enter = !0, w.width = d.offsetWidth, w.height = d.offsetHeight;
    }
    function h(d) {
      P.value = !0;
    }
    async function V(d, x = "size") {
      return d.zIndex = "-100", d.opacity = "0", Object.assign(v, d), a.value = !0, x == "size" ? (await Ht(() => {
        if (w.enter)
          return !0;
      }), w) : (c = !0, p.value = !0, await de(), a.value = !1, await Ht(() => {
        if (!c)
          return !0;
      }), p.value = !1, await de(), console.log("预加载完成", w), w);
    }
    const H = z(!1);
    async function q() {
      var fe, _e;
      const { width: d, height: x, x: A, y: j, reverse: F } = s.position || {}, O = {
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
      d && (O.width = typeof d == "number" ? `${d}px` : d), x && (O.height = typeof x == "number" ? `${x}px` : x);
      const J = te();
      if ((fe = s.layerObj.options) != null && fe.group) {
        await V(O), await de(), (_e = s.layerObj.options) != null && _e.group && await s.layerObj.options.group.computePosition(O, s.layerObj), O.opacity = "1", O.zIndex = s.zIndex, Object.assign(v, O);
        return;
      }
      let ne = [];
      F ? (A === "center" || A === void 0 ? (O.left = "50%", ne.push("translateX(-50%)")) : A === "right" ? O.right = "0" : typeof A == "number" ? O.right = `${A}px` : A ? O.right = A : O.left = "0", j === "center" || j === void 0 ? (O.top = "50%", ne.push("translateY(-50%)")) : j === "top" ? O.top = "50px" : j === "bottom" ? O.bottom = "0" : typeof j == "number" ? O.bottom = `${j}px` : j ? O.bottom = j : O.top = "0") : (A === "center" || A === void 0 ? (O.left = "50%", ne.push("translateX(-50%)")) : A === "right" ? O.right = "0" : typeof A == "number" ? O.left = `${A}px` : A ? O.left = A : O.left = "0", j === "center" || j === void 0 ? (O.top = "50%", ne.push("translateY(-50%)")) : j === "top" ? O.top = "50px" : j === "bottom" ? O.bottom = "50px" : typeof j == "number" ? O.top = `${j}px` : j ? O.top = j : O.top = "0"), ne.length > 0 && (O.transform = ne.join(" ")), J && (await V(O, "load"), W(O)), O.opacity = "1", O.zIndex = s.zIndex, Object.assign(v, O);
    }
    function te() {
      var O;
      if ((O = s.layerObj.options) != null && O.group)
        return !0;
      const { width: d, height: x, x: A, y: j, reverse: F } = s.position || {};
      return d === "auto" || !d || x == "auto" || !x || A == "center" || !A && A !== 0 || j == "center" || !j && j !== 0;
    }
    const Z = z(null);
    async function M() {
      if (s.follow && s.follow.target) {
        $(u.value, v, () => {
          k.value || (k.value = !0, v.opacity = "1", setTimeout(() => {
            p.value = !1;
          }, 50));
        });
        return;
      }
      await q(), k.value = !0;
    }
    function W(d, x = !1) {
      var _e, Te;
      const A = (_e = d.transform) == null ? void 0 : _e.includes("translateX(-50%)"), j = (Te = d.transform) == null ? void 0 : Te.includes("translateY(-50%)");
      if (!x && !A && !j || !w.width || !w.height) return;
      const F = w.width, O = w.height, J = window.innerWidth, ne = window.innerHeight;
      let fe = [];
      d.transform && d.transform.split(" ").forEach((ve) => {
        ve.includes("translate") || fe.push(ve);
      }), (A || x) && (Math.abs(F - J) <= 1 || F >= J ? d.left = "0" : d.left = `calc(50% - ${Math.floor(F / 2)}px)`), (j || x) && (Math.abs(O - ne) <= 1 || O >= ne ? d.top = "0" : d.top = `calc(50% - ${Math.floor(O / 2)}px)`), fe.length > 0 ? d.transform = fe.join(" ") : d.transform = "";
    }
    const Q = (d = "layer") => {
      a.value = !1, m.value = !0, s.follow && s.follow.target && r(), t("close"), b.forEach(({ event: x, callback: A }) => {
        x === "close" && A && A();
      });
    };
    function me() {
      if (c) {
        c = !1;
        return;
      }
      m.value = !1, t("after-leave");
    }
    s.layerObj.setLayerInstance(o), z(!1), xe("lp-layer:core", {
      on: (d, x) => {
        b.push({
          event: d,
          callback: x
        });
      },
      off: (d, x) => {
        let A = b.findIndex((j) => j.event === d && j.callback === x);
        A !== -1 && b.splice(A, 1);
      }
    }), xe("layerInstance", o);
    function ye(d) {
      if (H.value) {
        console.log("已在进行resize操作，忽略此次调用");
        return;
      }
      H.value = !0;
      const x = parseInt(v.width) || w.width, A = parseInt(v.height) || w.height, j = { ...v };
      j.transition = "width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease, transform 0.3s ease", console.log("resizeLayer", d);
      let F, O;
      typeof d == "number" ? (F = Math.round(x * d), O = Math.round(A * d), j.width = `${F}px`, j.height = `${O}px`) : (F = d.width, O = d.height, j.width = `${F}px`, j.height = `${O}px`), w.width, w.height, w.width = F, w.height = O, W(j, !0), Object.assign(v, j), setTimeout(() => {
        v.transition = "", setTimeout(() => {
          H.value = !1;
        }, 50);
      }, 300);
    }
    function $e() {
      if (H.value) {
        console.log("已在进行resize操作，忽略此次全屏调用");
        return;
      }
      H.value = !0, Z.value || (Z.value = {
        width: v.width,
        height: v.height,
        left: v.left,
        top: v.top,
        right: v.right,
        bottom: v.bottom,
        transform: v.transform
      });
      const d = { ...v };
      d.transition = "width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease, transform 0.3s ease", Object.assign(d, {
        width: "100vw",
        height: "100vh",
        left: "0",
        top: "0",
        right: "",
        bottom: "",
        transform: ""
      }), w.width, w.height, w.width = window.innerWidth, w.height = window.innerHeight, Object.assign(v, d), setTimeout(() => {
        v.transition = "", setTimeout(() => {
          H.value = !1;
        }, 50);
      }, 300);
    }
    function ke() {
      if (!Z.value) return;
      if (H.value) {
        console.log("已在进行resize操作，忽略此次退出全屏调用");
        return;
      }
      H.value = !0;
      const d = { ...v };
      d.transition = "width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease, transform 0.3s ease";
      const x = parseInt(Z.value.width) || 0, A = parseInt(Z.value.height) || 0;
      w.width = x || 300, w.height = A || 200, Object.assign(d, Z.value), Object.assign(v, d), Z.value = null, setTimeout(() => {
        v.transition = "", setTimeout(() => {
          H.value = !1;
        }, 50);
      }, 300);
    }
    e({
      close: Q,
      updatePosition: () => {
        s.follow ? S(u.value, v) : q();
      },
      changeContainerStyle: (d) => {
        Object.assign(v, d);
      },
      getContainerStyle: () => v,
      getInstance: () => o,
      // 全屏切换功能
      toggleFullscreen: () => {
        v.width === "100vw" && v.height === "100vh" ? ke() : $e();
      },
      // 进入全屏
      useFullscreen: () => {
        $e();
      },
      // 退出全屏
      exitFullscreen: () => {
        ke();
      },
      // 调整大小
      resizeLayer: (d) => {
        ye(d);
      }
    });
    async function je() {
      await M(), a.value = !0;
    }
    return ge(() => {
      if (je(), s.layerObj.options.useOutsideClose) {
        let d = ml(u.value, () => {
          t("close"), d.unbind();
        });
      }
    }), ot(() => {
      s.follow && s.follow.target && r();
    }), (d, x) => (f(), _("div", {
      class: D(["lp-layer", { closeing: m.value }]),
      style: se(v),
      ref_key: "containerRef",
      ref: u
    }, [
      (f(), ae(Fe(U(y)), {
        name: g.value,
        disabled: p.value,
        onEnter: B,
        onAfterEnter: h,
        onAfterLeave: me
      }, {
        default: we(() => [
          Ue(L("div", {
            class: "lp-layer__box",
            ref_key: "layerRef",
            ref: i
          }, [
            s.follow && U(C) ? (f(), _("div", {
              key: 0,
              class: "lp-layer__arrow",
              style: se(U(T))
            }, null, 4)) : N("", !0),
            L("div", {
              class: "lp-layer__body",
              style: se(I)
            }, [
              X(d.$slots, "default")
            ], 4)
          ], 512), [
            [Mt, a.value]
          ])
        ]),
        _: 3
      }, 40, ["name", "disabled"]))
    ], 6));
  }
}), Xn = { class: "lp-dialog" }, qn = { class: "lp-dialog__header flex align-center justify-between" }, Jn = { class: "lp-dialog__title" }, Zn = { class: "lp-dialog__body" }, Qn = {
  key: 0,
  class: "lp-dialog__footer"
}, vl = {
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
  setup(l, { emit: e }) {
    const n = e, t = dl();
    xe("layerContainerInstance", t);
    const o = () => {
      n("confirm"), s();
    }, s = () => {
      n("close");
    };
    return (a, i) => (f(), _("div", Xn, [
      L("div", qn, [
        L("div", Jn, G(l.title), 1),
        l.showClose ? (f(), _("div", {
          key: 0,
          class: "lp-dialog__close",
          onClick: s
        }, [
          ee(U(ie), {
            class: "lp-dialog-close_icon",
            is: "close",
            size: "18px"
          })
        ])) : N("", !0)
      ]),
      L("div", Zn, [
        X(a.$slots, "default")
      ]),
      l.showFooter ? (f(), _("div", Qn, [
        X(a.$slots, "footer", {}, () => [
          L("button", {
            class: "btn btn-info",
            onClick: i[0] || (i[0] = (...u) => a.handleCancel && a.handleCancel(...u))
          }, "取消"),
          L("button", {
            class: "btn btn-primary",
            onClick: o
          }, "确定")
        ])
      ])) : N("", !0)
    ]));
  }
}, eo = { class: "lp-drawer__header" }, to = { class: "lp-drawer__title" }, lo = { class: "lp-drawer__body" }, no = {
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
      validator: (l) => ["right", "left", "top", "bottom"].includes(l)
    }
  },
  emits: ["close"],
  setup(l, { emit: e }) {
    const n = l, t = e, o = R(() => `lp-drawer--${n.direction}`), s = () => {
      t("close");
    };
    return (a, i) => (f(), _("div", {
      class: D(["lp-drawer", [o.value]])
    }, [
      L("div", eo, [
        L("span", to, G(l.title), 1),
        l.showClose ? (f(), _("button", {
          key: 0,
          class: "lp-drawer__close",
          onClick: s
        }, "×")) : N("", !0)
      ]),
      L("div", lo, [
        X(a.$slots, "default")
      ])
    ], 2));
  }
}, gl = {
  appContext: null
}, oo = /* @__PURE__ */ Y({
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
  setup(l, { expose: e, emit: n }) {
    const t = z(!1), o = n, s = Ce("lp-layer:core");
    function a() {
      t.value = !0;
    }
    s.on("close", a);
    function i(p) {
      o("click", p);
    }
    function u(p) {
      console.log("setEventsNone", p), t.value = p;
    }
    return e({
      setEventsNone: u
    }), nt(() => {
      s.off("close", a);
    }), (p, g) => (f(), _("div", {
      class: D(["lp-mask", { "pointer-events-none": t.value }]),
      style: se({ zIndex: l.zIndex }),
      onClick: i
    }, null, 6));
  }
});
let qe = !1, yl = 0, Pe = [];
function so() {
  if (qe) return;
  qe = !0, yl = window.scrollY || document.documentElement.scrollTop;
  const l = ao();
  document.body.classList.add("lp-layer-lock-scroll"), document.body.style.width = `calc(100vw - ${l}px)`;
}
function ao() {
  return window.innerWidth - document.documentElement.clientWidth;
}
function io() {
  qe && (qe = !1, document.body.classList.remove("lp-layer-lock-scroll"), document.body.style.width = "", window.scrollTo(0, yl));
}
function ro(l) {
  Pe.push(l), Pe.some((n) => _l(n)) && so();
}
function uo(l) {
  let e = Pe.indexOf(l);
  e !== -1 && Pe.splice(e, 1), !Pe.some((o) => _l(o)) && io();
}
function _l(l) {
  return l.options.lockBodyScroll !== null ? !!l.options.lockBodyScroll : !!l.options.useMask;
}
function co() {
  return Pe;
}
function Ke(l) {
  return Pe.filter((e) => e.options.group === l);
}
class bl {
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
    K(this, "mode", "x");
    /**
     * 管理组内部对齐方式(类似flex布局的justify-content)
     * start: 左对齐
     * center: 居中对齐
     * end: 右对齐
     * null: 不进行对齐
     */
    K(this, "justifyContent", "start");
    /**
     * 管理组内部对齐方式(类似flex布局的align-items)
     * start: 顶部对齐
     * center: 居中对齐
     * end: 底部对齐
     */
    K(this, "alignItems", "start");
    /**
     * 管理组内部边距
     * 控制弹出层在可渲染区域内
     */
    K(this, "paddingSize", 10);
    /**
     * 层与层之间的间距
     * 两个层之间的间距
     */
    K(this, "spaceSize", 16);
    /**
     * 位置过渡动画时长（毫秒）
     */
    K(this, "transitionDuration", 300);
    /**
     * 位置过渡动画函数
     */
    K(this, "transitionTimingFunction", "ease");
    /**
     * xy模式下每行的最大宽度
     */
    K(this, "rowMaxWidth", 0);
    /**
     * xy模式下单个项的标准宽度（0表示自动）
     */
    K(this, "itemWidth", 0);
    /**
     * xy模式下每行最大项数
     */
    K(this, "itemsPerRow", 0);
    K(this, "groupElement", null);
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
  transition(e, n = "ease") {
    return this.transitionDuration = e, this.transitionTimingFunction = n, this;
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
  align(e, n) {
    return this.justifyContent = e, this.alignItems = n, this;
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
  computePosition(e, n) {
    return new Promise((t, o) => {
      if (n.options.follow && n.options.follow.target)
        return;
      this.renderGroupElement(), this.initGroupContainerStyle(), Ke(this).filter((u) => u.layerElement && !u.closing);
      let a = n.getLayerInfo(), i = this.getOrCreatePlaceholder(n);
      i.style.width = `${a.width}px`, i.style.height = `${a.height}px`, this.mode === "xy" && this.itemWidth > 0 && (i.style.width = `${this.itemWidth}px`), requestAnimationFrame(() => {
        const u = i.getBoundingClientRect();
        e.top = `${u.top}px`, e.left = `${u.left}px`, this.mode !== "x" && (e.width = `${a.width}px`), this.mode !== "y" && (e.height = `${a.height}px`), n.layerElement && Object.entries(e).forEach(([p, g]) => {
          g != null && (n.layerElement.style[p] = g);
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
    let n = `p-${e.id}`, t = document.getElementById(n);
    return t || (t = document.createElement("div"), t.id = n, t.className = "lp-layer-placeholder", t.dataset.layerId = e.id, this.groupElement.appendChild(t)), t;
  }
  /**
   * 更新组内所有层的位置
   * @todo 在有元素被移除后, 需要重新计算位置
   */
  updateLayersPosition() {
    this.renderGroupElement();
    const n = Ke(this).filter((t) => t.layerElement && !t.closing);
    n.forEach((t) => {
      t.groupResetStatus = 1;
    }), this.cleanupPlaceholders(n), n.forEach((t) => {
      if (t.layerElement) {
        const o = t.getLayerInfo(), s = this.getOrCreatePlaceholder(t);
        s.style.width = `${o.width}px`, s.style.height = `${o.height}px`, this.mode === "xy" && this.itemWidth > 0 && (s.style.width = `${this.itemWidth}px`);
      }
    }), requestAnimationFrame(() => {
      n.forEach((t) => {
        if (t.layerElement) {
          const o = `p-${t.id}`, s = document.getElementById(o);
          if (s) {
            const a = s.getBoundingClientRect(), i = t.layerElement.style;
            let u = Object.assign({}, {
              transform: i.transform,
              transition: i.transition,
              top: i.top,
              left: i.left,
              right: i.right,
              bottom: i.bottom,
              width: i.width,
              height: i.height
            });
            u.transition = `left ${this.transitionDuration}ms ${this.transitionTimingFunction}, top ${this.transitionDuration}ms ${this.transitionTimingFunction}`, u.top = `${a.top}px`, u.left = `${a.left}px`;
            const p = t.getLayerInstance();
            p && p.exposed && p.exposed.changeContainerStyle(u);
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
    const n = this.groupElement.querySelectorAll(".lp-layer-placeholder"), t = new Set(e.map((o) => o.id));
    n.forEach((o) => {
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
    return Ke(this).filter((n) => n.layerElement && !n.closing);
  }
}
let po = 1e3;
const fo = {
  dialog: vl,
  drawer: no
  // 可以在这里添加更多容器类型
};
class Se {
  constructor() {
    /**
     * 层id
     */
    K(this, "id", "");
    K(this, "layerInstance", null);
    /**
     * 组重置状态
     * @todo 用于在层关闭时, 组内其它层需要重新计算位置
     */
    K(this, "groupResetStatus", 0);
    K(this, "options");
    K(this, "layerVnode", null);
    K(this, "contentVnode", null);
    K(this, "maskLayer", null);
    K(this, "closing", !1);
    K(this, "layerZIndex", 0);
    K(this, "maskZIndex", 0);
    K(this, "containerEl", null);
    K(this, "layerElement", null);
    K(this, "createTime", 0);
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
    const n = new Se();
    return n.options.component = e, n.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), n.createTime = Date.now(), n;
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
    const e = this.options.sourceInstance, n = (e == null ? void 0 : e.appContext) || gl.appContext;
    if (!n)
      return;
    if (!e) return n;
    const t = e.provides;
    return {
      ...n,
      provides: t || n.provides
    };
  }
  model(e) {
    return this.options.model = e, this;
  }
  zIndex(e) {
    return this.options.zIndex = e, this;
  }
  on(e, n) {
    return this.options.events[e] = n, this;
  }
  off(e) {
    return delete this.options.events[e], this;
  }
  /**
   * 设置容器
   * @param container 容器组件或容器名称
   * @returns 
   */
  container(e, n = {}) {
    return typeof e == "string" ? this.options.containerComponent = fo[e] || null : this.options.containerComponent = e, this.options.containerProps = n, this;
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
  /**
   * 设置是否开启遮罩层
   * @param use 是否开启(true时开启，false时关闭)
   * @param options 遮罩层配置 
   * - close: 是否点击遮罩层关闭层
   * @returns 
   */
  useMask(e = !0, n = {}) {
    return this.options.useMask = e, this.options.maskOptions = Object.assign({
      close: !0
    }, n), this;
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
   * @example 'fade' | 'zoom' | 'slide-top' | 'slide-bottom' | 'slide-left' | 'slide-right' | 'drawer-right' | 'drawer-left' | 'drawer-top' | 'drawer-bottom'
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
  follow(e, n) {
    if (typeof e != "string" && !(e instanceof HTMLElement))
      throw console.error("Layer.follow - invalid target type, must be HTMLElement or string"), new Error("Follow target must be an HTMLElement or string");
    return this.options.follow = {
      target: e,
      options: n
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
    return Fl(this.options.component);
  }
  /**
   * 打开弹出层
   * @param position 弹出层位置
   * @returns 
   */
  async open(e = {}) {
    var u;
    this.closing = !1, this.options.follow && this.options.follow.target ? this.options.position = {
      width: e.width || "auto",
      height: e.height || "auto"
    } : this.options.position = e;
    let n = {
      onLayerFullscreen: () => {
        console.log("进入或退出全屏"), this.layerInstance && this.layerInstance.exposed && this.layerInstance.exposed.toggleFullscreen();
      },
      onLayerUseFullscreen: () => {
        console.log("进入全屏"), this.layerInstance && this.layerInstance.exposed && this.layerInstance.exposed.useFullscreen();
      },
      onLayerExitFullscreen: () => {
        console.log("退出全屏"), this.layerInstance && this.layerInstance.exposed && this.layerInstance.exposed.exitFullscreen();
      },
      onLayerResize: (p) => {
        console.log("缩放", p), this.layerInstance && this.layerInstance.exposed && this.layerInstance.exposed.resizeLayer(p);
      }
    };
    this.layerZIndex = this.options.zIndex || po++, this.maskZIndex = this.layerZIndex - 1;
    const t = (p = "layer") => {
      this.closing || (this.hide(p), this.options.events.close && this.options.events.close());
    }, o = this.getContentComponent();
    let s = ee(o, {
      modelValue: this.options.model,
      ...this.options.props,
      "onUpdate:modelValue": (p) => {
        this.options.model && (this.options.model = p);
      },
      onClose: () => {
        t("content");
      },
      // 添加弹出层事件监听处理
      ...n,
      // 添加事件监听处理
      ...Object.keys(this.options.events).reduce((p, g) => (g !== "close" && (p[`on${g.charAt(0).toUpperCase() + g.slice(1)}`] = (...k) => {
        this.options.events[g] && this.options.events[g](...k);
      }), p), {})
    }), a = null;
    if (this.options.containerComponent) {
      const p = ((u = this.options.containerComponent) == null ? void 0 : u.default) || this.options.containerComponent, g = {
        ...this.options.containerProps,
        modelValue: this.options.containerModel,
        onClose: () => {
          t("container");
        },
        "onUpdate:modelValue": (k) => {
          this.options.containerModel && (this.options.containerModel = k);
        }
      };
      a = ee(p, g, {
        default: () => [s]
      });
    } else
      a = s;
    return this.layerVnode = ee(Yn, {
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
      default: () => [a]
    }), this.contentVnode = s, this.layerVnode.appContext = this.resolveAppContext(), this.containerEl = this.getContainer(), this.options.useMask && this.createMask(t), await de(), Ft(this.layerVnode, this.containerEl), this.layerElement = this.containerEl.firstElementChild, this.getAppendTo().appendChild(this.layerElement), ro(this), this;
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
      const n = `placeholder-${this.id}`, t = document.getElementById(n);
      t && t.parentNode && t.parentNode.removeChild(t);
    }
    this.removeElements(), uo(this);
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
    this.maskLayer = Se.src(oo).props({
      zIndex: this.maskZIndex,
      visible: !0
    }).on("click", (n) => {
      var t;
      (t = this.options.maskOptions) != null && t.close && e("mask"), this.emit("maskClick", n);
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
        } catch (n) {
          console.error("Error closing layer:", n), this.removeElements();
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
      this.containerEl && Ft(null, this.containerEl), this.layerElement && this.layerElement.parentNode && this.layerElement.parentNode.removeChild(this.layerElement), this.layerVnode = null, this.containerEl = null, this.layerElement = null;
    } catch (e) {
      console.error("Error removing layer elements:", e);
    }
    this.closing = !1;
  }
  // 触发自定义事件
  emit(e, ...n) {
    return this.options.events[e] && this.options.events[e](...n), this;
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
  close() {
    this.hide();
  }
  /**
   * 关闭所有层
   * @param check 过滤方法
   */
  static closeAll(e = null) {
    co().forEach((t) => {
      e && !e(t) || t.close();
    });
  }
  /**
   * 关闭组内所有层
   * @param group 组
   */
  static closeByGroup(e) {
    Ke(e).forEach((t) => {
      t.close();
    });
  }
  // !SECTION
}
const ho = { class: "lp-toast__content" }, mo = {
  key: 0,
  class: "lp-toast__icon"
}, vo = { class: "lp-toast__message" }, go = /* @__PURE__ */ Y({
  __name: "toast",
  props: {
    message: { default: "" },
    duration: { default: 3e3 },
    type: { default: "info" }
  },
  emits: ["close", "shown"],
  setup(l, { emit: e }) {
    const n = l, t = {
      primary: "info-fill",
      success: "success-fill",
      warning: "warning-fill",
      danger: "error-fill",
      info: "info-fill"
    }, o = e;
    let s, a = n.duration, i = 0;
    const u = () => {
      s !== void 0 && (window.clearTimeout(s), s = void 0);
    }, p = (m) => {
      if (u(), m <= 0) {
        o("close");
        return;
      }
      i = Date.now(), s = window.setTimeout(() => {
        o("close");
      }, m);
    }, g = () => {
      if (n.duration <= 0 || s === void 0) return;
      const m = Date.now() - i;
      a = a - m, a < 500 && (a = 500), u();
    }, k = () => {
      n.duration <= 0 || s !== void 0 || p(a);
    };
    return ge(() => {
      o("shown"), n.duration > 0 && p(n.duration);
    }), ot(() => {
      u();
    }), (m, c) => (f(), _("div", {
      class: D(["lp-toast", [`lp-toast-${m.type}`]]),
      onMouseenter: g,
      onMouseleave: k
    }, [
      L("div", ho, [
        t[m.type] ? (f(), _("div", mo, [
          ee(U(ie), {
            is: t[m.type],
            size: "16",
            color: `var(--lp-color-${m.type})`
          }, null, 8, ["is", "color"])
        ])) : N("", !0),
        L("div", vo, [
          X(m.$slots, "default", {}, () => [
            be(G(m.message), 1)
          ])
        ])
      ])
    ], 34));
  }
}), wl = new bl("y");
wl.space(20).padding(20).align("start", "center");
async function Pt(l, e) {
  return e = {
    message: l || "Toast",
    duration: (e == null ? void 0 : e.duration) || 2e3,
    type: (e == null ? void 0 : e.type) || "info"
  }, Se.src(go).group(wl).props({
    message: e == null ? void 0 : e.message,
    duration: e == null ? void 0 : e.duration,
    type: e == null ? void 0 : e.type
  }).transition("slide-top").show({
    width: "auto",
    height: "auto"
  });
}
async function $l(l) {
  const e = typeof l == "string" ? { message: l } : l;
  return new Promise(async (n) => {
    const t = await import("./confirm-BGvYs8XV.js"), o = pe({
      message: e.message || "确认执行此操作？"
    }), s = {
      onConfirm: () => {
        a.hide(), n(!0);
      },
      onCancel: () => {
        a.hide(), n(!1);
      }
    }, a = await Se.src(t.default).useMask().container("dialog").containerModel({
      title: e.title || "确认",
      showClose: !0
    }).model(o).props(s).show();
  });
}
async function Cl(l) {
  const e = typeof l == "string" ? { message: l } : l;
  return new Promise(async (n) => {
    const t = await import("./alert-CItR2_B_.js"), o = pe({
      message: e.message || ""
    }), s = {
      onClose: () => {
        a.hide(), n();
      }
    }, a = await Se.src(t.default).useMask().useBodyScroll(!1).container("dialog").containerModel({
      title: e.title || "提示",
      showClose: !0
    }).model(o).props(s).show();
  });
}
let yo = {
  install: (l) => {
    l.config.globalProperties.$toast = Pt, l.config.globalProperties.$confirm = $l, l.config.globalProperties.$alert = Cl, l.config.globalProperties.$layer = Se;
  }
};
const _o = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DialogContainer: vl,
  Layer: Se,
  LayerGroup: bl,
  alert: Cl,
  confirm: $l,
  default: yo,
  toast: Pt,
  useOutsideClick: ml
}, Symbol.toStringTag, { value: "Module" })), bo = {
  name: "lp-layout"
}, wo = /* @__PURE__ */ Y({
  ...bo,
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
  setup(l) {
    const e = l, n = R(() => {
      const o = [];
      return e.template ? o.push("lp-grid-layout", e.template) : e.type === "grid" ? (o.push("lp-grid"), e.cols && (typeof e.cols == "number" ? o.push(`cols-${e.cols}`) : o.push(`cols-${e.cols}`)), e.rows && (typeof e.rows == "number" ? o.push(`rows-${e.rows}`) : typeof e.rows == "string" && o.push(`rows-${e.rows}`)), e.gap !== void 0 && typeof e.gap == "number" && o.push(`gap-${e.gap}`), e.gapX !== void 0 && typeof e.gapX == "number" && o.push(`gap-x-${e.gapX}`), e.gapY !== void 0 && typeof e.gapY == "number" && o.push(`gap-y-${e.gapY}`), e.justifyContent && o.push(`justify-${e.justifyContent}`), e.alignContent && o.push(`align-${e.alignContent}`), e.justifyItems && o.push(`justify-items-${e.justifyItems}`), e.alignItems && o.push(`items-${e.alignItems}`), e.height === "100vh" ? o.push("h-screen") : e.height === "100%" && o.push("h-full"), e.minHeight === "100vh" ? o.push("min-h-screen") : e.minHeight === "100%" && o.push("min-h-full"), e.width === "100%" ? o.push("w-full") : e.width === "100vw" && o.push("w-screen")) : (o.push("lp-layout"), e.direction && o.push(e.direction), e.wrap && o.push("wrap"), e.justifyContent && e.alignItems && o.push(`${e.justifyContent}-${e.alignItems}`)), o;
    }), t = R(() => {
      const o = {};
      return e.gridTemplateColumns && (o.gridTemplateColumns = e.gridTemplateColumns), e.gridTemplateRows && (o.gridTemplateRows = e.gridTemplateRows), e.gridTemplateAreas && (o.gridTemplateAreas = e.gridTemplateAreas), e.gap && typeof e.gap == "string" && (o.gap = e.gap), e.gapX && typeof e.gapX == "string" && (o.columnGap = e.gapX), e.gapY && typeof e.gapY == "string" && (o.rowGap = e.gapY), e.height && typeof e.height == "string" && !["100vh", "100%"].includes(e.height) ? o.height = e.height : typeof e.height == "number" && (o.height = `${e.height}px`), e.width && typeof e.width == "string" && !["100%", "100vw"].includes(e.width) ? o.width = e.width : typeof e.width == "number" && (o.width = `${e.width}px`), e.minHeight && typeof e.minHeight == "string" && !["100vh", "100%"].includes(e.minHeight) ? o.minHeight = e.minHeight : typeof e.minHeight == "number" && (o.minHeight = `${e.minHeight}px`), e.minWidth && typeof e.minWidth == "string" ? o.minWidth = e.minWidth : typeof e.minWidth == "number" && (o.minWidth = `${e.minWidth}px`), o;
    });
    return (o, s) => (f(), _("div", {
      class: D(n.value),
      style: se(t.value)
    }, [
      X(o.$slots, "default")
    ], 6));
  }
}), $o = {
  name: "lp-grid-item"
}, Co = /* @__PURE__ */ Y({
  ...$o,
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
  setup(l) {
    const e = l, n = R(() => {
      const o = ["lp-grid-item"];
      return e.colSpan && (typeof e.colSpan == "number" ? o.push(`col-span-${e.colSpan}`) : o.push(`col-span-${e.colSpan}`)), e.rowSpan && (typeof e.rowSpan == "number" ? o.push(`row-span-${e.rowSpan}`) : o.push(`row-span-${e.rowSpan}`)), e.colStart && o.push(`col-start-${e.colStart}`), e.colEnd && o.push(`col-end-${e.colEnd}`), e.rowStart && o.push(`row-start-${e.rowStart}`), e.rowEnd && o.push(`row-end-${e.rowEnd}`), e.justifySelf && o.push(`justify-self-${e.justifySelf}`), e.alignSelf && o.push(`align-self-${e.alignSelf}`), o;
    }), t = R(() => {
      const o = {};
      return e.area && (o.gridArea = e.area), e.gridColumn && (o.gridColumn = e.gridColumn), e.gridRow && (o.gridRow = e.gridRow), o;
    });
    return (o, s) => (f(), _("div", {
      class: D(n.value),
      style: se(t.value)
    }, [
      X(o.$slots, "default")
    ], 6));
  }
});
let ko = {
  install: (l) => {
  }
};
const So = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GridItem: Co,
  Layout: wo,
  default: ko
}, Symbol.toStringTag, { value: "Module" })), To = { class: "item" }, xo = {
  name: "lp-list"
}, Yt = /* @__PURE__ */ Object.assign(xo, {
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
  setup(l) {
    return (e, n) => (f(), _("div", {
      class: D(["list", { "list-x": l.listX }])
    }, [
      (f(!0), _(oe, null, ce(l.data, (t, o) => (f(), _("div", To, [
        X(e.$slots, "default", { row: t })
      ]))), 256))
    ], 2));
  }
});
let Eo = {
  install: (l) => {
    l.component(Yt.name, Yt);
  }
};
const Lo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Eo
}, Symbol.toStringTag, { value: "Module" }));
let Oo = {
  install: (l) => {
    l.component(Ne.name, Ne);
  }
};
const jo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpLoading: Ne,
  default: Oo
}, Symbol.toStringTag, { value: "Module" })), Ao = { class: "lp-tree__item" }, Mo = { class: "lp-tree__item-box flex items-center justify-between" }, Po = { class: "lp-tree__item-pre flex items-center" }, Io = { class: "lp-tree__item-cols flex" }, zo = {
  key: 0,
  class: "lp-tree__item-children"
}, Bo = {
  name: "LpTreeItem"
}, Ro = /* @__PURE__ */ Y({
  ...Bo,
  props: {
    item: {},
    itemSlot: {},
    itemFields: {},
    level: { default: 1 }
  },
  setup(l) {
    const e = l, n = Ce("treeColumns", []), t = Ce("treeSlots", {}), o = Ce("treeRoot", {
      onNodeSelect: (c) => {
      },
      selectOptions: {}
    });
    function s(c) {
      return Array.isArray(c.children) && c.children.length > 0;
    }
    function a(c) {
      var v;
      return !!(s(c) || (v = o.hasLoad) != null && v.value && !c.noChildren);
    }
    function i(c) {
      var v;
      return ((v = o.selectOptions) == null ? void 0 : v.foldIcon) === !1 ? !1 : a(c);
    }
    function u(c) {
      var I, E;
      return !(((I = o.selectOptions) == null ? void 0 : I.checkbox) === !1 || (((E = o.selectOptions) == null ? void 0 : E.parentSelect) ?? 1) === 0 && s(c));
    }
    function p(c) {
      if (a(c)) {
        k(c);
        return;
      }
      m(c);
    }
    function g(c) {
      (Array.isArray(c.children) ? c.children : []).forEach((I) => {
        Array.isArray(I.children) && I.children.length > 0 && (I.expanded = !0, g(I));
      });
    }
    async function k(c) {
      var I;
      if (c.loading || (!s(c) && o.loadChildren && !c.loaded && !c.noChildren && await o.loadChildren(c), c.noChildren)) return;
      c.expanded = !c.expanded;
      const v = (I = o.expand) == null ? void 0 : I.deepExpandAll;
      c.expanded && typeof v == "number" && v > 0 && e.level === v && g(c);
    }
    async function m(c) {
      c.disabled || await o.onNodeSelect(c);
    }
    return (c, v) => {
      const I = Nt("lp-checkbox"), E = Nt("lp-tree-item");
      return Ue((f(), _("div", Ao, [
        L("div", Mo, [
          L("div", {
            class: D(["lp-tree__item-content flex align-center", { active: c.item.selected === 1 }]),
            onClick: v[4] || (v[4] = (C) => p(c.item))
          }, [
            L("div", Po, [
              u(c.item) ? (f(), _("div", {
                key: 0,
                class: "lp-tree__item-checkbox",
                onClick: v[1] || (v[1] = Ee(() => {
                }, ["stop"]))
              }, [
                ee(I, {
                  value: !!c.item.selected,
                  disabled: c.item.disabled,
                  midway: c.item.selected === 2,
                  onClick: v[0] || (v[0] = (C) => m(c.item))
                }, null, 8, ["value", "disabled", "midway"])
              ])) : N("", !0),
              c.item.loading ? (f(), _("div", {
                key: 1,
                class: "lp-tree__item-icon",
                onClick: v[2] || (v[2] = Ee(() => {
                }, ["stop"]))
              }, [
                ee(Ne, { size: "mini" })
              ])) : i(c.item) ? (f(), _("div", {
                key: 2,
                class: "lp-tree__item-icon",
                onClick: v[3] || (v[3] = Ee((C) => k(c.item), ["stop"]))
              }, [
                ee(U(ie), {
                  is: "right",
                  class: D(["lp-tree__item-icon-right", { active: c.item.expanded }])
                }, null, 8, ["class"])
              ])) : N("", !0)
            ]),
            c.itemSlot ? (f(), ae(Fe(c.itemSlot), {
              key: 0,
              item: c.item
            }, null, 8, ["item"])) : (f(), _(oe, { key: 1 }, [
              be(G(c.item.data[c.itemFields.title]), 1)
            ], 64))
          ], 2),
          L("div", Io, [
            (f(!0), _(oe, null, ce(U(n), (C) => (f(), _("div", {
              key: C.name,
              class: D(`lp-tree__item-col lp-tree__item-col-${C.name}`),
              style: se({ width: C.width, minWidth: C.width })
            }, [
              U(t)[`column.${C.name}`] ? (f(), ae(Fe(U(t)[`column.${C.name}`]), {
                key: 0,
                item: c.item
              }, null, 8, ["item"])) : (f(), _(oe, { key: 1 }, [
                be(G(c.item.data[C.name]), 1)
              ], 64))
            ], 6))), 128))
          ])
        ]),
        c.item.expanded && c.item.children ? (f(), _("div", zo, [
          (f(!0), _(oe, null, ce(c.item.children, (C) => (f(), ae(E, {
            key: C.data[c.itemFields.value] || C.data.id,
            item: C,
            itemSlot: c.itemSlot,
            itemFields: c.itemFields,
            level: (e.level ?? 1) + 1
          }, null, 8, ["item", "itemSlot", "itemFields", "level"]))), 128))
        ])) : N("", !0)
      ], 512)), [
        [Mt, !c.item.hidden]
      ]);
    };
  }
});
var It = /* @__PURE__ */ ((l) => (l.STRING = "string", l.ARRAY = "array", l.OBJECT = "object", l.AUTO = "auto", l))(It || {});
class kl {
  constructor(e = {}) {
    K(this, "selecteds", z([]));
    K(this, "limit");
    K(this, "valueType");
    K(this, "valueField");
    K(this, "labelField");
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
    return this.selecteds.value.some((n) => n[this.valueField] === e[this.valueField]);
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
  flush(e, n) {
    this.selecteds.value = [];
    const t = n;
    if (this.limit === 1)
      if (this.valueType === "object") {
        const o = e;
        let s;
        o && typeof o == "object" ? s = o[this.valueField] : s = o;
        const a = t(s);
        this.selecteds.value = a ? [a] : [];
      } else {
        const o = t(e);
        this.selecteds.value = o ? [o] : [];
      }
    else {
      let o = [];
      this.valueType === "object" ? o = (Array.isArray(e) ? e : []).map((a) => a && typeof a == "object" ? a[this.valueField] : a).filter((a) => a != null) : this.valueType === "string" || typeof e == "string" ? o = (typeof e == "string" ? e : "").split(",").map((a) => a.trim()).filter(Boolean) : Array.isArray(e) ? o = e : typeof e == "string" ? o = e.split(",").map((s) => s.trim()).filter(Boolean) : o = [], this.selecteds.value = o.map((s) => t(s)).filter((s) => !!s);
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
function Ae(l, e) {
  return l.map((t) => {
    var s;
    let o;
    return (s = t[e.children]) != null && s.length && (o = Ae(t[e.children], e)), {
      data: t,
      expanded: !1,
      draging: !1,
      selected: 0,
      // Default to 0 (unselected)
      disabled: !1,
      children: o
    };
  });
}
const Vo = { class: "lp-tree" }, Fo = {
  key: 0,
  class: "lp-tree__header flex items-center justify-between"
}, No = { class: "lp-tree__header-left flex items-center" }, Wo = {
  key: 0,
  class: "lp-tree__header-title"
}, Uo = { class: "lp-tree__header-cols flex" }, Do = {
  name: "LpTree"
}, Je = /* @__PURE__ */ Y({
  ...Do,
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
    load: {},
    selectOptions: {},
    header: { default: () => ({
      enabled: !1,
      title: "",
      search: !1,
      searchPlaceholder: "搜索"
    }) },
    expand: {}
  },
  emits: ["update:modelValue", "change"],
  setup(l, { expose: e, emit: n }) {
    var ke, je;
    const t = l, o = n, s = pl();
    xe("treeSlots", s);
    const a = z([]), i = R(() => t.itemFields), u = R(() => t.columns ?? []), p = R(() => t.header ?? { enabled: !1, title: "", search: !1, searchPlaceholder: "搜索" }), g = R(() => t.nodeKey), k = R(() => g.value || i.value.value), m = R(() => {
      var d;
      return (((d = t.selectOptions) == null ? void 0 : d.limit) ?? 1) !== 1;
    }), c = R(() => {
      var d;
      return ((d = t.selectOptions) == null ? void 0 : d.includeChild) !== !1;
    }), v = R(() => {
      var d;
      return ((d = t.selectOptions) == null ? void 0 : d.parentSelect) ?? 1;
    }), I = R(() => typeof t.load == "function"), E = R(() => {
      var d;
      return ((d = t.selectOptions) == null ? void 0 : d.limit1Cancel) === !0;
    }), C = z(""), T = new kl({
      limit: (ke = t.selectOptions) == null ? void 0 : ke.limit,
      valueType: (je = t.selectOptions) == null ? void 0 : je.valueType,
      valueField: t.itemFields.value,
      labelField: t.itemFields.title
    }), $ = z(!1), S = z(null);
    function r(d) {
      const x = [d];
      return Array.isArray(d.children) && d.children.forEach((A) => {
        x.push(...r(A));
      }), x;
    }
    function b(d) {
      return I.value && !d.loaded && !d.noChildren ? !1 : (Array.isArray(d.children) ? d.children : []).length === 0;
    }
    function y(d) {
      return b(d) ? [d] : (Array.isArray(d.children) ? d.children : []).flatMap((A) => y(A));
    }
    async function w(d) {
      if (d.disabled) return !1;
      const x = Array.isArray(d.children) && d.children.length > 0;
      if (m.value && v.value === 2) {
        !x && I.value && !d.loaded && !d.noChildren && await Z(d);
        const j = y(d).filter((J) => !J.disabled), F = j.length > 0 && j.every((J) => T.isSelected(J.data));
        let O = !1;
        return F ? j.forEach((J) => {
          T.isSelected(J.data) && T.select(J.data).success && (O = !0);
        }) : j.forEach((J) => {
          T.isSelected(J.data) || T.select(J.data).success && (O = !0);
        }), O;
      }
      if (m.value && c.value && x) {
        const j = r(d).filter((J) => !J.disabled), F = j.length > 0 && j.every((J) => T.isSelected(J.data));
        let O = !1;
        return F ? j.forEach((J) => {
          T.isSelected(J.data) && T.select(J.data).success && (O = !0);
        }) : j.forEach((J) => {
          T.isSelected(J.data) || T.select(J.data).success && (O = !0);
        }), O;
      }
      return !m.value && !E.value && T.isSelected(d.data) ? !1 : T.select(d.data).success;
    }
    function P(d) {
      const x = k.value, A = d && typeof d == "object" && x ? d[x] : d, j = (F, O) => {
        var J, ne, fe, _e;
        for (let Te = 0; Te < F.length; Te += 1) {
          const ve = F[Te];
          if (d && typeof d == "object") {
            if (ve.data === d) return { node: ve, parent: O, index: Te };
            if (x && ((J = ve.data) == null ? void 0 : J[x]) !== void 0 && ((ne = ve.data) == null ? void 0 : ne[x]) === A) return { node: ve, parent: O, index: Te };
          } else if (x && ((fe = ve.data) == null ? void 0 : fe[x]) !== void 0 && ((_e = ve.data) == null ? void 0 : _e[x]) === A) return { node: ve, parent: O, index: Te };
          const Rt = Array.isArray(ve.children) ? ve.children : [];
          if (Rt.length > 0) {
            const Vt = j(Rt, ve);
            if (Vt) return Vt;
          }
        }
        return null;
      };
      return j(a.value, null);
    }
    function B(d) {
      var x;
      return (x = P(d)) == null ? void 0 : x.node;
    }
    function h() {
      const d = S.value, x = (j) => {
        j.forEach((F) => {
          F.hidden = !1, Array.isArray(F.children) && x(F.children);
        });
      };
      if (!d) {
        x(a.value);
        return;
      }
      const A = (j) => {
        const F = !!d(j.data, j), J = (Array.isArray(j.children) ? j.children : []).map((fe) => A(fe)).some(Boolean), ne = F || J;
        return j.hidden = !ne, J && (j.expanded = !0), ne;
      };
      a.value.forEach((j) => A(j));
    }
    function V(d) {
      if (typeof d == "function") {
        S.value = d, h();
        return;
      }
      const x = String(d ?? "").trim();
      if (!x) {
        S.value = null, h();
        return;
      }
      const A = i.value.title, j = x.toLowerCase();
      S.value = (F) => String((F == null ? void 0 : F[A]) ?? "").toLowerCase().includes(j), h();
    }
    function H(d, x) {
      const A = x === void 0 ? d : x, j = x === void 0 ? null : d, F = Ae([A], i.value)[0];
      if (!j)
        return a.value.push(F), h(), F;
      const O = P(j);
      return O ? (Array.isArray(O.node.children) || (O.node.children = []), O.node.children.push(F), O.node.noChildren = !1, O.node.loaded = !0, O.node.expanded = !0, h(), F) : (a.value.push(F), h(), F);
    }
    function q(d, x) {
      const A = Ae([d], i.value)[0], j = x ?? {};
      let F = a.value, O = null;
      (j.parent !== void 0 || j.parentKey !== void 0) && (O = P(j.parent ?? j.parentKey), O && (Array.isArray(O.node.children) || (O.node.children = []), F = O.node.children, O.node.noChildren = !1, O.node.loaded = !0, O.node.expanded = !0));
      const J = j.before ?? j.beforeKey ?? j.after ?? j.afterKey;
      if (J !== void 0) {
        const ne = P(J);
        if (ne) {
          F = ne.parent ? ne.parent.children ?? [] : a.value;
          const fe = F.findIndex((_e) => _e === ne.node);
          if (fe >= 0) {
            const _e = j.before !== void 0 || j.beforeKey !== void 0 ? fe : fe + 1;
            return F.splice(_e, 0, A), h(), A;
          }
        }
      }
      return F.push(A), h(), A;
    }
    function te(d) {
      if (!g.value) return !1;
      const x = P(d);
      if (!x) return !1;
      const A = r(x.node);
      let j = !1;
      if (A.forEach((F) => {
        T.isSelected(F.data) && T.select(F.data).success && (j = !0);
      }), x.parent) {
        const F = x.parent.children ?? [];
        F.splice(x.index, 1), x.parent.children = F, (x.parent.children ?? []).length === 0 && (x.parent.noChildren = !0);
      } else
        a.value.splice(x.index, 1);
      return ye(a.value), h(), j && Q(), !0;
    }
    async function Z(d) {
      var x, A;
      if (I.value && !d.loading && !(d.loaded || d.noChildren)) {
        d.loading = !0;
        try {
          const j = await ((x = t.load) == null ? void 0 : x.call(t, d.data)), F = Ae(Array.isArray(j) ? j : [], t.itemFields);
          d.children = F, d.loaded = !0, d.noChildren = F.length === 0, d.noChildren && (d.expanded = !1), (A = t.expand) != null && A.defaultExpandAll && M(F), T.flush(t.modelValue, (O) => $e(a.value, O)), ye(a.value);
        } finally {
          d.loading = !1;
        }
      }
    }
    function M(d) {
      d.forEach((x) => {
        const A = Array.isArray(x.children) ? x.children : [];
        A.length > 0 && (x.expanded = !0, M(A));
      });
    }
    function W(d) {
      var x;
      (x = t.expand) != null && x.defaultExpandAll && M(d);
    }
    xe("treeRoot", {
      onNodeSelect: async (d) => {
        await w(d) && Q();
      },
      loadChildren: Z,
      hasLoad: I,
      selectOptions: t.selectOptions,
      expand: t.expand
    }), xe("treeColumns", u.value);
    function Q() {
      const d = T.getModelValue();
      o("update:modelValue", d), o("change", d);
    }
    function me(d) {
      const x = T.isSelected(d.data), A = Array.isArray(d.children) ? d.children : [];
      if (A.length === 0 || (A.forEach((O) => me(O)), !m.value))
        return d.selected = x ? 1 : 0, d.selected;
      const j = A.some((O) => (O.selected ?? 0) > 0);
      return A.every((O) => O.selected === 1) ? (d.selected = 1, d.selected) : j ? (d.selected = 2, d.selected) : (d.selected = x ? 1 : 0, d.selected);
    }
    function ye(d) {
      d.forEach((x) => me(x));
    }
    re(T.selecteds, () => {
      ye(a.value);
    }, { deep: !0 });
    function $e(d, x) {
      for (const A of d) {
        if (A.data[t.itemFields.value] === x)
          return A.data;
        if (A.children) {
          const j = $e(A.children, x);
          if (j) return j;
        }
      }
    }
    return re(() => t.modelValue, (d) => {
      a.value.length > 0 && T.flush(d, (x) => $e(a.value, x));
    }, { immediate: !0 }), re(() => t.data, async () => {
      var d;
      if (Array.isArray(t.data) && t.data.length > 0) {
        $.value = !1, a.value = Ae(t.data, t.itemFields), W(a.value), de(() => {
          T.flush(t.modelValue, (x) => $e(a.value, x));
        });
        return;
      }
      if (I.value && !$.value) {
        $.value = !0;
        const x = await ((d = t.load) == null ? void 0 : d.call(t, null));
        a.value = Ae(Array.isArray(x) ? x : [], t.itemFields), W(a.value), de(() => {
          T.flush(t.modelValue, (A) => $e(a.value, A));
        });
        return;
      }
      a.value = Ae(t.data ?? [], t.itemFields), W(a.value), de(() => {
        T.flush(t.modelValue, (x) => $e(a.value, x));
      });
    }, { immediate: !0 }), e({
      append: H,
      remove: te,
      insert: q,
      getNode: B,
      filter: V
    }), re(C, (d) => {
      var x;
      (x = p.value) != null && x.search && V(d);
    }), (d, x) => (f(), _("div", Vo, [
      p.value.enabled ? (f(), _("div", Fo, [
        L("div", No, [
          p.value.title ? (f(), _("div", Wo, G(p.value.title), 1)) : N("", !0),
          p.value.search ? (f(), ae(Xe, {
            key: 1,
            modelValue: C.value,
            "onUpdate:modelValue": x[0] || (x[0] = (A) => C.value = A),
            class: "lp-tree__header-search",
            placeholder: p.value.searchPlaceholder || "搜索",
            clearable: ""
          }, null, 8, ["modelValue", "placeholder"])) : N("", !0)
        ]),
        L("div", Uo, [
          (f(!0), _(oe, null, ce(u.value, (A) => (f(), _("div", {
            key: A.name,
            class: D(`lp-tree__header-col lp-tree__header-col-${A.name}`),
            style: se({ width: A.width, minWidth: A.width })
          }, G(A.title), 7))), 128))
        ])
      ])) : N("", !0),
      (f(!0), _(oe, null, ce(a.value, (A) => (f(), ae(Ro, {
        key: A.data[i.value.value] || A.data.id,
        item: A,
        itemSlot: U(s).item,
        itemFields: i.value,
        level: 1
      }, null, 8, ["item", "itemSlot", "itemFields"]))), 128))
    ]));
  }
}), Ho = { class: "lp-menu" }, Go = { class: "lp-menu__node" }, Ko = { class: "lp-menu__node-left" }, Yo = { class: "lp-menu__label" }, Xo = {
  name: "LpMenu"
}, gt = /* @__PURE__ */ Y({
  ...Xo,
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
    load: {}
  },
  emits: ["update:modelValue", "change", "select"],
  setup(l, { expose: e, emit: n }) {
    fl((r) => ({
      "1fdeef9f": v.value
    }));
    const t = l, o = n, s = z(null), a = R(() => {
      var r;
      return ((r = t.keys) == null ? void 0 : r.children) || "children";
    }), i = R(() => {
      var r;
      return ((r = t.keys) == null ? void 0 : r.label) || "title";
    }), u = R(() => {
      var r;
      return ((r = t.keys) == null ? void 0 : r.value) || "id";
    }), p = R(() => {
      var r;
      return ((r = t.keys) == null ? void 0 : r.icon) || "icon";
    }), g = R(() => ({
      children: a.value,
      title: i.value,
      value: u.value
    })), k = R(() => u.value), m = R(() => ({
      enabled: !1,
      title: "",
      search: !!t.searchable,
      searchPlaceholder: t.searchPlaceholder || "搜索"
    })), c = R(() => ({
      limit: 1,
      checkbox: !1,
      foldIcon: !1
    })), v = R(() => `${t.indent}px`);
    function I(r) {
      o("update:modelValue", r);
    }
    function E(r) {
      var y, w;
      o("change", r);
      const b = (w = (y = s.value) == null ? void 0 : y.getNode) == null ? void 0 : w.call(y, r);
      o("select", { value: r, item: (b == null ? void 0 : b.data) ?? null });
    }
    function C(r) {
      const b = r == null ? void 0 : r.children;
      return !!(Array.isArray(b) && b.length > 0 || t.load && !(r != null && r.noChildren));
    }
    function T(r) {
      var b;
      return ((b = r == null ? void 0 : r.data) == null ? void 0 : b[i.value]) ?? "";
    }
    function $(r) {
      var y;
      const b = (y = r == null ? void 0 : r.data) == null ? void 0 : y[p.value];
      return typeof b == "string" && b.trim() ? b.trim() : "";
    }
    async function S() {
      !Array.isArray(t.defaultOpeneds) || t.defaultOpeneds.length === 0 || (await de(), t.defaultOpeneds.forEach((r) => {
        var y, w;
        const b = (w = (y = s.value) == null ? void 0 : y.getNode) == null ? void 0 : w.call(y, r);
        b && (b.expanded = !0);
      }));
    }
    return ge(() => {
      S();
    }), re(
      () => t.defaultOpeneds,
      () => {
        S();
      },
      { deep: !0 }
    ), re(
      () => t.data,
      () => {
        S();
      },
      { deep: !0 }
    ), e({
      append: (...r) => {
        var b, y;
        return (y = (b = s.value) == null ? void 0 : b.append) == null ? void 0 : y.call(b, ...r);
      },
      remove: (...r) => {
        var b, y;
        return (y = (b = s.value) == null ? void 0 : b.remove) == null ? void 0 : y.call(b, ...r);
      },
      insert: (...r) => {
        var b, y;
        return (y = (b = s.value) == null ? void 0 : b.insert) == null ? void 0 : y.call(b, ...r);
      },
      getNode: (...r) => {
        var b, y;
        return (y = (b = s.value) == null ? void 0 : b.getNode) == null ? void 0 : y.call(b, ...r);
      },
      filter: (...r) => {
        var b, y;
        return (y = (b = s.value) == null ? void 0 : b.filter) == null ? void 0 : y.call(b, ...r);
      }
    }), (r, b) => (f(), _("div", Ho, [
      ee(Je, {
        ref_key: "menuTreeRef",
        ref: s,
        "model-value": t.modelValue,
        data: t.data,
        "item-fields": g.value,
        "node-key": k.value,
        load: t.load,
        "select-options": c.value,
        columns: [],
        header: m.value,
        "onUpdate:modelValue": I,
        onChange: E
      }, {
        item: we(({ item: y }) => [
          X(r.$slots, "item", { item: y }, () => [
            L("div", Go, [
              L("div", Ko, [
                $(y) ? (f(), ae(U(ie), {
                  key: 0,
                  class: "lp-menu__icon",
                  is: $(y)
                }, null, 8, ["is"])) : N("", !0),
                L("span", Yo, G(T(y)), 1)
              ]),
              C(y) ? (f(), ae(U(ie), {
                key: 0,
                class: D(["lp-menu__arrow", { open: !!y.expanded }]),
                is: "right"
              }, null, 8, ["class"])) : N("", !0)
            ])
          ])
        ]),
        _: 3
      }, 8, ["model-value", "data", "item-fields", "node-key", "load", "select-options", "header"])
    ]));
  }
});
let qo = {
  install: (l) => {
    l.component(gt.name, gt);
  }
};
const Jo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpMenu: gt,
  default: qo
}, Symbol.toStringTag, { value: "Module" })), Zo = { class: "lp-message" }, Qo = {
  name: "lp-message"
}, Xt = /* @__PURE__ */ Object.assign(Qo, {
  setup(l) {
    return pe({}), (e, n) => (f(), _("div", Zo, G(e.message), 1));
  }
});
let es = {
  install: (l) => {
    l.component(Xt.name, Xt);
  }
};
const ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: es
}, Symbol.toStringTag, { value: "Module" })), ls = {
  key: 0,
  class: "lp-paginate"
}, ns = ["disabled"], os = ["disabled"], ss = ["onClick"], as = ["disabled"], is = ["disabled"], rs = { class: "page-info" }, us = ["max"], cs = {
  key: 1,
  class: "lp-paginate"
}, ds = { class: "page-info" }, ps = {
  name: "lp-paginate"
}, fs = /* @__PURE__ */ Y({
  ...ps,
  props: {
    status: {},
    maxButtons: {},
    showQuickJumper: { type: Boolean, default: !1 }
  },
  emits: ["update:status", "change"],
  setup(l, { emit: e }) {
    const n = l, t = e, o = R(() => n.maxButtons ?? 7), s = R(() => n.status.page), a = R(() => Math.max(1, n.status.limit)), i = R(() => Math.max(0, n.status.total)), u = R(() => Math.max(1, Math.ceil(i.value / a.value))), p = z(s.value);
    re(s, (m) => {
      p.value = m;
    });
    const g = R(() => {
      const m = o.value, c = Math.floor(m / 2);
      let v = Math.max(1, s.value - c), I = Math.min(u.value, v + m - 1);
      v = Math.max(1, I - m + 1);
      const E = [];
      for (let C = v; C <= I; C++) E.push(C);
      return E;
    });
    function k(m) {
      const c = Math.max(1, Math.min(u.value, Number.isFinite(m) ? m : s.value)), v = {
        page: c,
        limit: a.value,
        total: i.value,
        lastPage: u.value,
        hasMore: c < u.value
      };
      t("update:status", v), t("change", v);
    }
    return (m, c) => u.value > 1 ? (f(), _("div", ls, [
      L("button", {
        class: "page-btn",
        disabled: s.value === 1,
        onClick: c[0] || (c[0] = (v) => k(1))
      }, "«", 8, ns),
      L("button", {
        class: "page-btn",
        disabled: s.value === 1,
        onClick: c[1] || (c[1] = (v) => k(s.value - 1))
      }, "‹", 8, os),
      (f(!0), _(oe, null, ce(g.value, (v) => (f(), _("button", {
        key: v,
        class: D(["page-btn", { active: v === s.value }]),
        onClick: (I) => k(v)
      }, G(v), 11, ss))), 128)),
      L("button", {
        class: "page-btn",
        disabled: s.value === u.value,
        onClick: c[2] || (c[2] = (v) => k(s.value + 1))
      }, "›", 8, as),
      L("button", {
        class: "page-btn",
        disabled: s.value === u.value,
        onClick: c[3] || (c[3] = (v) => k(u.value))
      }, "»", 8, is),
      L("span", rs, "第 " + G(s.value) + " / " + G(u.value) + " 页（共 " + G(m.status.total) + " 条）", 1),
      m.showQuickJumper ? (f(), _(oe, { key: 0 }, [
        Ue(L("input", {
          type: "number",
          min: "1",
          max: u.value,
          "onUpdate:modelValue": c[4] || (c[4] = (v) => p.value = v),
          class: "page-input"
        }, null, 8, us), [
          [
            hl,
            p.value,
            void 0,
            { number: !0 }
          ]
        ]),
        L("button", {
          class: "page-btn",
          onClick: c[5] || (c[5] = (v) => k(p.value))
        }, "跳转")
      ], 64)) : N("", !0)
    ])) : (f(), _("div", cs, [
      L("span", ds, "共 " + G(m.status.total) + " 条", 1)
    ]));
  }
}), yt = /* @__PURE__ */ Le(fs, [["__scopeId", "data-v-dea61d9b"]]);
let hs = {
  install: (l) => {
    l.component(yt.name, yt);
  }
};
const ms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpPaginate: yt,
  default: hs
}, Symbol.toStringTag, { value: "Module" })), vs = { class: "lp-panel" }, gs = {
  key: 0,
  class: "title"
}, ys = { class: "body" }, _s = {
  name: "lp-panel"
}, _t = /* @__PURE__ */ Y({
  ..._s,
  props: {
    title: { default: "" }
  },
  emits: ["change"],
  setup(l, { emit: e }) {
    const n = l;
    return (t, o) => (f(), _("div", vs, [
      t.title ? (f(), _("div", gs, G(n.title), 1)) : N("", !0),
      L("div", ys, [
        X(t.$slots, "default")
      ])
    ]));
  }
});
let bs = {
  install: (l) => {
    l.component(_t.name, _t);
  }
};
const ws = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpPanel: _t,
  default: bs
}, Symbol.toStringTag, { value: "Module" })), $s = { class: "lp-progress__inner" }, Cs = {
  key: 0,
  class: "lp-progress__text"
}, ks = {
  key: 0,
  class: "lp-progress__text"
}, Ss = {
  name: "lp-progress"
}, bt = /* @__PURE__ */ Y({
  ...Ss,
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
  setup(l) {
    const e = l, n = R(() => {
      const t = {};
      if (t.width = e.percentage + "%", e.color)
        if (typeof e.color == "string")
          t.backgroundColor = e.color;
        else if (Array.isArray(e.color)) {
          const o = e.color, s = o.map((a, i) => {
            const u = i / (o.length - 1) * 100;
            return `${a} ${u}%`;
          }).join(", ");
          t.background = `linear-gradient(to right, ${s})`;
        } else typeof e.color == "function" && (t.backgroundColor = e.color(e.percentage));
      return t;
    });
    return R(() => e.status ? e.status : e.percentage >= 100 ? "success" : ""), (t, o) => (f(), _("div", {
      class: D(["lp-progress", [`lp-progress--${t.status}`, { "lp-progress--text-inside": t.textInside }]])
    }, [
      L("div", {
        class: "lp-progress__outer",
        style: se({ height: t.strokeWidth + "px" })
      }, [
        L("div", $s, [
          L("div", {
            class: "lp-progress__bar",
            style: se(n.value)
          }, [
            t.textInside ? (f(), _("div", Cs, G(t.percentage) + "% ", 1)) : N("", !0)
          ], 4)
        ])
      ], 4),
      !t.textInside && t.showText ? (f(), _("div", ks, [
        X(t.$slots, "default", {}, () => [
          be(G(t.percentage) + "%", 1)
        ])
      ])) : N("", !0)
    ], 2));
  }
}), Ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpProgress: bt
}, Symbol.toStringTag, { value: "Module" })), xs = { class: "lp-radio" }, Es = ["onClick"], Ls = { class: "lp-radio-input" }, Os = ["value", "checked", "onChange"], js = { class: "lp-radio-label" }, As = {
  name: "LpRadio"
}, Ms = /* @__PURE__ */ Y({
  ...As,
  props: {
    modelValue: { type: [String, Number, Boolean, null], default: null },
    options: { default: () => [] },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(l, { emit: e }) {
    const n = l, t = e, o = (s) => {
      n.disabled || (t("update:modelValue", s), t("change", s));
    };
    return (s, a) => (f(), _("div", xs, [
      (f(!0), _(oe, null, ce(s.options, (i) => (f(), _("div", {
        key: i.value,
        class: "lp-radio-item",
        onClick: (u) => o(i.value)
      }, [
        L("div", Ls, [
          L("input", {
            type: "radio",
            value: i.value,
            checked: s.modelValue === i.value,
            onChange: (u) => o(i.value)
          }, null, 40, Os),
          a[0] || (a[0] = L("span", { class: "lp-radio-mark" }, null, -1))
        ]),
        L("span", js, G(i.title), 1)
      ], 8, Es))), 128))
    ]));
  }
}), qt = /* @__PURE__ */ Le(Ms, [["__scopeId", "data-v-28a906a6"]]);
let Ps = {
  install: (l) => {
    l.component(qt.name, qt);
  }
};
const Is = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ps
}, Symbol.toStringTag, { value: "Module" })), Sl = Symbol("scrollbarContextKey"), zs = ({
  move: l,
  size: e,
  bar: n
}) => {
  const t = {};
  return (n == null ? void 0 : n.key) === "vertical" ? (t.height = e, t.width = "100%", t.transform = `translateY(${l || 0}px)`) : (t.width = e, t.height = "100%", t.transform = `translateX(${l || 0}px)`), t;
}, Bs = {
  name: "Bar"
}, Jt = /* @__PURE__ */ Y({
  ...Bs,
  props: {
    always: { type: Boolean, default: !0 },
    width: {},
    height: {},
    ratioX: {},
    ratioY: {},
    visible: { type: Boolean, default: !1 },
    direction: { default: "vertical" }
  },
  setup(l, { expose: e }) {
    const n = l, t = Ce(Sl);
    t || Hn("Bar", "can not inject scrollbar context");
    const o = z(), s = z(), a = z({}), i = z(!1);
    let u = !1, p = !1, g = 0, k = document.onselectstart;
    const m = R(() => y[n.direction || (n.ratioX && n.ratioY ? "vertical" : n.ratioX ? "horizontal" : "vertical")]);
    R(() => ({
      [m.value.size]: n[m.value.size],
      [m.value.axis]: a.value[m.value.axis]
    }));
    const c = R(() => zs({
      size: n[m.value.size],
      move: a.value[m.value.axis],
      bar: m.value
    }));
    R(
      () => o.value[m.value.offset] ** 2 / t.wrapElement[m.value.scrollSize] / n[m.value.ratio]
    );
    const v = (w) => {
      var h;
      if (w.stopPropagation(), w.ctrlKey || [1, 2].includes(w.button)) return;
      (h = window.getSelection()) == null || h.removeAllRanges();
      const P = w.currentTarget;
      if (!P) return;
      const B = P.getBoundingClientRect();
      g = w[m.value.client] - B[m.value.direction], E(w);
    }, I = (w) => {
      if (!s.value || !o.value || !t.wrapElement) return;
      const P = o.value.getBoundingClientRect(), B = w[m.value.client] - P[m.value.direction], h = s.value[m.value.offset] / 2, V = B - h, H = o.value[m.value.offset] - s.value[m.value.offset], q = Math.max(0, Math.min(H, V)), te = H > 0 ? q / H * 100 : 0;
      a.value[m.value.axis] = q;
      const Z = t.wrapElement[m.value.scrollSize] - t.wrapElement[m.value.offset];
      t.wrapElement[m.value.scroll] = te * Z / 100;
    }, E = (w) => {
      w.stopImmediatePropagation(), u = !0, document.addEventListener("mousemove", C), document.addEventListener("mouseup", T), k = document.onselectstart, document.onselectstart = () => !1;
    }, C = (w) => {
      if (!u || !o.value || !s.value || !t.wrapElement) return;
      const P = o.value.getBoundingClientRect(), h = w[m.value.client] - P[m.value.direction] - g, V = o.value[m.value.offset] - s.value[m.value.offset], H = Math.max(0, Math.min(V, h)), q = V > 0 ? H / V * 100 : 0;
      a.value[m.value.axis] = H;
      const te = t.wrapElement[m.value.scrollSize] - t.wrapElement[m.value.offset];
      t.wrapElement[m.value.scroll] = q * te / 100;
    }, T = () => {
      u = !1, g = 0, document.removeEventListener("mousemove", C), document.removeEventListener("mouseup", T), r(), p && (i.value = !1);
    }, $ = () => {
      p = !1, i.value = !!n[m.value.size];
    }, S = () => {
      p = !0, i.value = u;
    }, r = () => {
      document.onselectstart !== k && (document.onselectstart = k);
    }, b = (w) => {
      if (!u && w && o.value && s.value) {
        const P = w[m.value.scroll], B = w[m.value.scrollSize] - w[m.value.offset], h = B > 0 ? P / B * 100 : 0, V = o.value[m.value.offset] - s.value[m.value.offset];
        a.value[m.value.axis] = h * V / 100;
      }
    };
    ge(() => {
      o.value && (o.value.addEventListener("mousemove", $), o.value.addEventListener("mouseleave", S));
    }), ot(() => {
      r(), document.removeEventListener("mouseup", T), o.value && (o.value.removeEventListener("mousemove", $), o.value.removeEventListener("mouseleave", S));
    });
    const y = {
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
      handleScroll: b
    }), (w, P) => (f(), ae(At, { name: "lp-scrollbar-fade" }, {
      default: we(() => [
        Ue(L("div", {
          ref_key: "instance",
          ref: o,
          class: D(["lp-scrollbar__bar", "is-" + m.value.key, { "is-visible": w.always || i.value || n.visible }]),
          onMousedown: I
        }, [
          L("div", {
            ref_key: "thumb",
            ref: s,
            class: "lp-scrollbar__thumb",
            style: se(c.value),
            onMousedown: v
          }, null, 36)
        ], 34), [
          [Mt, w.always || i.value || n.visible]
        ])
      ]),
      _: 1
    }));
  }
}), Rs = {
  name: "LpScrollbar"
}, Ze = /* @__PURE__ */ Y({
  ...Rs,
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
  setup(l, { expose: e, emit: n }) {
    const t = "LpScrollbar", o = l, s = n;
    let a;
    const i = z(), u = z(), p = z(), g = z(), k = z(), m = z("0"), c = z("0");
    pe({});
    const v = z(1), I = z(1), E = z(!1), C = R(() => {
      const h = {};
      return o.height && (h.height = Gt(o.height)), o.maxHeight && (h.maxHeight = Gt(o.maxHeight)), [o.wrapStyle, h];
    }), T = R(() => [o.wrapClass, "lp-scrollbar__wrap", { "lp-scrollbar__wrap--hidden-default": !o.native }]), $ = R(() => ["lp-scrollbar__view", o.viewClass]), S = R(() => o.viewStyle), r = () => {
      if (u.value) {
        const h = u.value.scrollTop, V = u.value.scrollLeft;
        g.value && g.value.handleScroll(u.value), k.value && k.value.handleScroll(u.value), s("scroll", {
          scrollTop: h,
          scrollLeft: V
        });
      }
    };
    function b(h, V) {
      Gn(h) ? u.value.scrollTo(h) : Ge(h) && Ge(V) && u.value.scrollTo(h, V);
    }
    const y = (h) => {
      if (!Ge(h)) {
        Kt(t, "value must be a number");
        return;
      }
      u.value.scrollTop = h;
    }, w = (h) => {
      if (!Ge(h)) {
        Kt(t, "value must be a number");
        return;
      }
      u.value.scrollLeft = h;
    }, P = () => {
      if (!u.value) return;
      const h = u.value.clientHeight * 100 / u.value.scrollHeight, V = u.value.clientWidth * 100 / u.value.scrollWidth;
      c.value = h < 100 ? `${h}%` : "", m.value = V < 100 ? `${V}%` : "", v.value = u.value.scrollHeight / u.value.clientHeight, I.value = u.value.scrollWidth / u.value.clientWidth, E.value = !!(c.value || m.value);
    };
    ge(() => {
      o.native || de(() => {
        P();
        const h = new ResizeObserver(() => {
          P();
        });
        u.value && h.observe(u.value);
        const V = new MutationObserver(() => {
          P();
        });
        u.value && V.observe(u.value, {
          childList: !0,
          subtree: !0,
          attributes: !0,
          attributeFilter: ["style", "class"]
        }), a = () => {
          h.disconnect(), V.disconnect();
        };
      }), i.value && (i.value.addEventListener("mouseenter", () => {
        E.value = !!(c.value || m.value);
      }), i.value.addEventListener("mouseleave", () => {
        o.always || (E.value = !1);
      }));
    }), ot(() => {
      a == null || a();
    });
    const B = pe({
      scrollbarElement: i,
      wrapElement: u
    });
    return xe(Sl, B), e({
      /** @description scrollbar wrap ref */
      wrapRef: u,
      /** @description update scrollbar state manually */
      update: P,
      /** @description scrolls to a particular set of coordinates */
      scrollTo: b,
      /** @description set distance to scroll top */
      setScrollTop: y,
      /** @description set distance to scroll left */
      setScrollLeft: w,
      /** @description handle scroll event */
      handleScroll: r
    }), (h, V) => (f(), _("div", {
      ref_key: "scrollbarRef",
      ref: i,
      class: D(["lp-scrollbar", { "lp-scrollbar--hidden": !h.always && !E.value }])
    }, [
      L("div", {
        ref_key: "wrapRef",
        ref: u,
        class: D(["lp-scrollbar__wrap", T.value]),
        style: se(C.value),
        onScroll: r
      }, [
        (f(), ae(Fe(h.tag), {
          ref_key: "resizeRef",
          ref: p,
          class: D(["lp-scrollbar__view", $.value]),
          style: se(S.value)
        }, {
          default: we(() => [
            X(h.$slots, "default")
          ]),
          _: 3
        }, 8, ["class", "style"]))
      ], 38),
      h.native ? N("", !0) : (f(), _(oe, { key: 0 }, [
        c.value ? (f(), ae(Jt, {
          key: 0,
          ref_key: "verticalBarRef",
          ref: g,
          height: c.value,
          width: "",
          always: h.always,
          "ratio-x": 1,
          "ratio-y": v.value,
          visible: E.value,
          direction: "vertical"
        }, null, 8, ["height", "always", "ratio-y", "visible"])) : N("", !0),
        m.value ? (f(), ae(Jt, {
          key: 1,
          ref_key: "horizontalBarRef",
          ref: k,
          height: "",
          width: m.value,
          always: h.always,
          "ratio-x": I.value,
          "ratio-y": 1,
          visible: E.value,
          direction: "horizontal"
        }, null, 8, ["width", "always", "ratio-x", "visible"])) : N("", !0)
      ], 64))
    ], 2));
  }
});
let Vs = {
  install: (l) => {
    l.component(Ze.name, Ze);
  }
};
const Fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpScrollbar: Ze,
  default: Vs
}, Symbol.toStringTag, { value: "Module" })), Ns = { class: "lp-select-items" }, Ws = ["onClick"], Us = { class: "label" }, Ds = {
  key: 0,
  class: "lp-select__selected-icon-box"
}, Hs = {
  name: "LpSelectItems"
}, Gs = /* @__PURE__ */ Y({
  ...Hs,
  props: {
    list: { default: () => [] },
    limit: { default: 1 }
  },
  emits: ["select", "close"],
  setup(l, { emit: e }) {
    const n = l, t = e, o = (s) => {
      t("select", s), n.limit == 1 && t("close");
    };
    return pe({}), ge(() => {
      console.log("lp-select-items list", n.list, Wt(n.list));
    }), (s, a) => (f(), _("div", Ns, [
      (f(!0), _(oe, null, ce(Wt(n.list) ? n.list.value : n.list, (i) => (f(), _("div", {
        class: D(["lp-select-items__item", { active: i.__selected }]),
        key: i.value,
        onClick: (u) => o(i)
      }, [
        L("div", Us, G(i.label), 1),
        i.__selected ? (f(), _("div", Ds, [
          ee(U(ie), {
            class: "lp-select__selected-icon",
            is: "selected",
            size: "14"
          })
        ])) : N("", !0)
      ], 10, Ws))), 128))
    ]));
  }
}), Ks = { class: "lp-select__selected" }, Ys = {
  key: 0,
  class: "lp-select__placeholder"
}, Xs = { class: "lp-select__selected-item input-item" }, qs = /* @__PURE__ */ Y({
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
  setup(l, { emit: e }) {
    const n = z(null), t = l;
    pe({});
    const o = z(""), s = e;
    function a(p) {
      console.log("handleRemoveItem", p), s("removeItem", p);
    }
    function i() {
      t.itemComponent ? n.value = Ut(Dt(t.itemComponent)) : t.limit === 1 ? n.value = "div" : n.value = Ut(Dt("LooplanUiNeeds@SelectedTag"));
    }
    function u() {
      s("search", o.value);
    }
    return ge(() => {
      i();
    }), (p, g) => (f(), _("div", Ks, [
      !p.selecteds.length && !o.value ? (f(), _("div", Ys, G(p.placeholder), 1)) : N("", !0),
      p.selecteds.length ? (f(!0), _(oe, { key: 1 }, ce(p.selecteds, (k, m) => (f(), _("div", {
        key: m,
        class: "lp-select__selected-item"
      }, [
        (f(), ae(Fe(n.value), {
          value: k,
          labelField: p.labelField,
          valueField: p.valueField,
          onRemoveItem: a
        }, {
          default: we(() => [
            be(G(k[t.labelField || "label"]), 1)
          ]),
          _: 2
        }, 1064, ["value", "labelField", "valueField"]))
      ]))), 128)) : N("", !0),
      L("div", Xs, [
        Ue(L("input", {
          "onUpdate:modelValue": g[0] || (g[0] = (k) => o.value = k),
          onInput: u,
          class: "lp-select__serch",
          type: "text"
        }, null, 544), [
          [hl, o.value]
        ])
      ])
    ]));
  }
});
function Js(l, e = {}) {
  const {
    valueField: n = "value",
    labelField: t = "label",
    limit: o = 1,
    valueType: s = It.AUTO
  } = e, a = new kl({
    limit: o,
    valueType: s,
    valueField: n,
    labelField: t
  }), i = z([]);
  let u = [];
  const p = R(() => a.selecteds.value.length > 0), g = (T) => {
    u = [], i.value = T.map(($) => {
      const S = {
        label: $[t],
        value: $[n],
        data: $,
        __selected: $[n] === l.value
      };
      return u.push(S), S;
    }), v();
  }, k = () => {
    u.forEach((T) => {
      T.__selected = a.isSelected(T);
    }), i.value = [
      ...u
    ];
  }, m = (T) => {
    const $ = a.select(T);
    $.success || $.type === "limit" && Pt("选择数量已达上限:" + o, {
      duration: 2e3
    }), T.__selected = $.selected, o === 1 && k(), c();
  };
  function c() {
    l.value = a.getModelValueForUseSelect();
  }
  function v() {
    const T = ($) => u.find((S) => S[n] === $);
    a.flush(l.value, T), k();
  }
  re(() => l.value, () => {
    v();
  });
  function I() {
    a.clear(), c();
  }
  function E(T) {
    m(T);
  }
  function C(T) {
    i.value = u.filter(($) => $.label.indexOf(T) !== -1);
  }
  return {
    selecteds: a.selecteds,
    optionsRender: i,
    clearableVisible: p,
    handleOptions: g,
    onSelect: m,
    onRemoveItem: E,
    onClear: I,
    onSearch: C
  };
}
const Zs = { class: "lp-select__main" }, Qs = { class: "lp-select__right" }, ea = {
  name: "LpSelect"
}, wt = /* @__PURE__ */ Y({
  ...ea,
  props: /* @__PURE__ */ ze({
    options: { default: () => [] },
    limit: { default: 1 },
    valueType: { default: It.AUTO },
    placeholder: { default: "请选择" },
    selectedItemComponent: {}
  }, {
    modelValue: {
      default: ""
    },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(l) {
    const e = z(), n = l, t = lt(l, "modelValue"), o = pe({
      isActive: !1
    }), {
      selecteds: s,
      optionsRender: a,
      clearableVisible: i,
      handleOptions: u,
      onSelect: p,
      onRemoveItem: g,
      onClear: k,
      onSearch: m
    } = Js(t, {
      valueField: "value",
      labelField: "title",
      limit: n.limit,
      valueType: n.valueType
    });
    let c = null;
    function v(E) {
      console.log("click"), o.isActive = !o.isActive;
      const C = E.target, T = "bottom-center";
      if (console.log("state.isActive", o.isActive), console.log("pickerModal", c), console.log("target", C), !o.isActive) {
        c && c.close();
        return;
      }
      c = Se.src(Gs).props({
        list: a,
        limit: n.limit
      }).follow(e.value, {
        // 跟随位置 [方向]-[对齐位置]，可供选择的四个方向分别是top、left、right、bottom，可供选择的三种对齐方式分别是start、end、center 默认对其方式是center
        position: T,
        // 是否显示箭头
        arrow: !0,
        // 箭头大小
        arrowSize: 10
        // 跟随的fps,用于一些带动画的, 会移动的元素 (可选, 默认不开启)
        // fps: 5
      }).on("close", () => {
        o.isActive = !1;
      }).on("select", ($) => {
        console.log("select", $), p($);
      }).useOutsideClose().useBodyScroll(!1).show({
        width: "200",
        height: "200"
      });
    }
    function I() {
      c && c.close(), k();
    }
    return re(
      () => n.options,
      (E) => {
        u(E);
      },
      {
        // 立即执行
        immediate: !0,
        // 深度监听
        deep: !0
      }
    ), ge(() => {
      console.log(n.valueType);
    }), nt(() => {
      c && c.close();
    }), (E, C) => (f(), _("div", {
      ref_key: "selectRef",
      ref: e,
      class: "lp-select",
      onClick: C[0] || (C[0] = (T) => v(T))
    }, [
      L("div", Zs, [
        ee(qs, {
          selecteds: U(s),
          options: U(a),
          limit: n.limit,
          placeholder: n.placeholder,
          itemComponent: n.selectedItemComponent,
          onRemoveItem: U(g),
          onSearch: U(m)
        }, null, 8, ["selecteds", "options", "limit", "placeholder", "itemComponent", "onRemoveItem", "onSearch"]),
        L("div", Qs, [
          U(i) ? N("", !0) : (f(), ae(U(ie), {
            key: 0,
            is: "down",
            size: "14",
            color: "#ccc",
            class: D(["lp-select__icon", { active: o.isActive }])
          }, null, 8, ["class"])),
          U(i) ? (f(), ae(U(ie), {
            key: 1,
            onClick: Ee(I, ["stop"]),
            is: "close",
            size: "14",
            color: "#ccc",
            class: "lp-select__close-icon"
          })) : N("", !0)
        ])
      ])
    ], 512));
  }
}), ta = { class: "lp-layout" }, la = {
  __name: "lp-select-selected-one",
  setup(l) {
    return pe({}), (e, n) => (f(), _("div", ta, " 单选 "));
  }
}, na = { class: "lp-select-selected-tag" }, Tl = /* @__PURE__ */ Y({
  __name: "lp-select-selected-tag",
  props: {
    value: {},
    labelField: { default: "label" },
    valueField: { default: "value" }
  },
  emits: ["removeItem"],
  setup(l, { emit: e }) {
    const n = e, t = l;
    pe({});
    function o() {
      n("removeItem", t.value);
    }
    return (s, a) => (f(), _("div", na, [
      ee(U(et), {
        closable: "",
        onClose: o
      }, {
        default: we(() => [
          be(G(s.value ? s.value[t.labelField] : ""), 1)
        ]),
        _: 1
      })
    ]));
  }
});
let oa = {
  install: (l) => {
    l.component(wt.name, wt);
  }
};
const sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpSelect: wt,
  LpSelectSelectedOne: la,
  LpSelectSelectedTag: Tl,
  default: oa
}, Symbol.toStringTag, { value: "Module" })), aa = ["checked", "disabled"], ia = { class: "lp-switch__core" }, ra = {
  key: 0,
  class: "lp-switch__loading"
}, ua = {
  key: 1,
  class: "lp-switch__inner"
}, ca = { key: 0 }, da = { key: 1 }, pa = { class: "lp-switch__action" }, fa = {
  key: 0,
  class: "lp-switch__label lp-switch__label--left"
}, ha = {
  key: 1,
  class: "lp-switch__label lp-switch__label--right"
}, ma = {
  name: "LpSwitch"
}, $t = /* @__PURE__ */ Y({
  ...ma,
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
  setup(l, { expose: e, emit: n }) {
    const t = l, o = n, s = Ce("lpFormItem", null), a = z(), i = z(!1), u = R(() => t.size || (s == null ? void 0 : s.size) || "default"), p = R(() => t.disabled || i.value), g = R(() => t.modelValue === t.activeValue);
    R(() => {
      const C = {};
      return t.width && (C.width = typeof t.width == "number" ? `${t.width}px` : t.width), t.activeColor && g.value ? (C.backgroundColor = t.activeColor, C.borderColor = t.activeColor) : t.inactiveColor && !g.value && (C.backgroundColor = t.inactiveColor, C.borderColor = t.inactiveColor), C;
    });
    const k = () => {
      var C;
      (C = a.value) == null || C.focus();
    }, m = () => {
      var C;
      (C = a.value) == null || C.blur();
    }, c = async () => {
      var T;
      if (p.value) return;
      if (t.beforeChange) {
        i.value = !0;
        try {
          if (!await t.beforeChange()) {
            i.value = !1;
            return;
          }
        } catch {
          i.value = !1;
          return;
        }
        i.value = !1;
      }
      const C = g.value ? t.inactiveValue : t.activeValue;
      o("update:modelValue", C), o("change", C), t.validateEvent && ((T = s == null ? void 0 : s.validate) == null || T.call(s, "change")), de(() => {
        a.value.checked = g.value;
      });
    }, v = () => {
    }, I = (C) => {
      o("focus", C);
    }, E = (C) => {
      var T;
      o("blur", C), t.validateEvent && ((T = s == null ? void 0 : s.validate) == null || T.call(s, "blur"));
    };
    return e({
      focus: k,
      blur: m,
      checked: g
    }), (C, T) => (f(), _("div", {
      class: D(["lp-switch", {
        "lp-switch--checked": g.value,
        "lp-switch--disabled": p.value,
        "lp-switch--loading": C.loading,
        [`lp-switch--${u.value}`]: u.value
      }]),
      onClick: c
    }, [
      L("input", {
        ref_key: "inputRef",
        ref: a,
        class: "lp-switch__input",
        type: "checkbox",
        checked: g.value,
        disabled: p.value,
        onChange: v,
        onFocus: I,
        onBlur: E
      }, null, 40, aa),
      L("span", ia, [
        C.loading ? (f(), _("div", ra, T[0] || (T[0] = [
          L("i", { class: "lp-switch__loading-icon" }, null, -1)
        ]))) : N("", !0),
        C.inlinePrompt && (C.activeText || C.inactiveText) ? (f(), _("span", ua, [
          g.value ? (f(), _("span", ca, G(C.activeText), 1)) : (f(), _("span", da, G(C.inactiveText), 1))
        ])) : N("", !0),
        L("div", pa, [
          C.activeIcon && g.value ? (f(), _("i", {
            key: 0,
            class: D([C.activeIcon, "lp-switch__action-icon"])
          }, null, 2)) : C.inactiveIcon && !g.value ? (f(), _("i", {
            key: 1,
            class: D([C.inactiveIcon, "lp-switch__action-icon"])
          }, null, 2)) : N("", !0)
        ])
      ]),
      !C.inlinePrompt && C.activeText && g.value ? (f(), _("span", fa, G(C.activeText), 1)) : N("", !0),
      !C.inlinePrompt && C.inactiveText && !g.value ? (f(), _("span", ha, G(C.inactiveText), 1)) : N("", !0)
    ], 2));
  }
});
let va = {
  install: (l) => {
    l.component($t.name, $t);
  }
};
const ga = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpSwitch: $t,
  default: va
}, Symbol.toStringTag, { value: "Module" })), ya = {
  name: "lp-transition"
}, Qe = /* @__PURE__ */ Y({
  ...ya,
  props: {
    name: { default: "" },
    tag: { default: "" }
  },
  setup(l) {
    const e = l;
    return (n, t) => (f(), ae(Rl, {
      name: e.name,
      tag: e.tag
    }, {
      default: we(() => [
        X(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["name", "tag"]));
  }
}), _a = { class: "lp-table__header-wrapper" }, ba = { class: "lp-table__thead" }, wa = { class: "lp-table__tr" }, $a = { class: "lp-table__tbody" }, Ca = {
  name: "lp-table"
}, Ct = /* @__PURE__ */ Y({
  ...Ca,
  props: {
    columns: { default: () => [] },
    data: { default: () => [] },
    stripe: { type: Boolean, default: !1 },
    border: { type: Boolean, default: !1 },
    rowKey: {},
    rowTransitionName: { default: "lp-list-transition" }
  },
  setup(l) {
    const e = pl();
    Vl();
    const n = z(null), t = z(null), o = z(0), s = z(null), a = l, i = z([]);
    function u(E) {
      if (E !== void 0)
        return typeof E == "number" ? `${E}px` : /^\d+$/.test(E) ? `${E}px` : E;
    }
    function p(E) {
      if (!E) return 0;
      const C = parseFloat(E.replace(/px|%|em|rem/g, ""));
      return Number.isNaN(C) ? 0 : C;
    }
    function g(E) {
      return E.map((C) => {
        const T = { ...C };
        return T.computedWidth = u(C.width), T.computedMinWidth = u(C.minWidth), T;
      });
    }
    function k() {
      const E = i.value;
      let C = 0;
      for (let $ = 0; $ < E.length; $++) {
        const S = E[$];
        if (S.fixed === "left") {
          const r = p(S.computedWidth) || p(S.computedMinWidth) || 100;
          S.computedStickyLeft = `${C}px`, C += r;
        } else
          S.computedStickyLeft = void 0;
      }
      let T = 0;
      for (let $ = E.length - 1; $ >= 0; $--) {
        const S = E[$];
        if (S.fixed === "right") {
          const r = p(S.computedWidth) || p(S.computedMinWidth) || 100;
          S.computedStickyRight = `${T}px`, T += r;
        } else
          S.computedStickyRight = void 0;
      }
      i.value = [...E];
    }
    re(
      () => a.columns,
      (E) => {
        i.value = g(E), k();
      },
      { immediate: !0, deep: !0 }
    );
    const m = R(() => {
      if (!i.value || i.value.length === 0) return "auto";
      let E = 0;
      return i.value.forEach((C) => {
        const T = p(C.computedWidth), $ = p(C.computedMinWidth);
        T > 0 ? E += T : $ > 0 && (E += $);
      }), E < o.value || E === 0 ? "100%" : `${E}px`;
    });
    pe({});
    const c = R(() => [a.stripe ? "lp-table--striped" : "", a.border ? "lp-table--bordered" : ""]);
    function v() {
      o.value = n.value ? n.value.clientWidth : 0;
    }
    function I() {
      const E = o.value, C = t.value;
      if (!C || E <= 0) return;
      if (C.scrollWidth > E) {
        const $ = i.value.map((S) => !S.computedWidth && !S.computedMinWidth ? { ...S, computedMinWidth: "100px" } : S);
        i.value = $, k();
      }
    }
    return ge(() => {
      v();
      const E = new ResizeObserver(() => {
        v(), I(), k();
      });
      n.value && E.observe(n.value), setTimeout(() => {
        v(), I(), k();
      }, 0);
    }), re(
      () => [a.columns, a.data],
      () => {
        setTimeout(() => {
          I(), k();
        }, 0);
      },
      { deep: !0 }
    ), (E, C) => (f(), _("div", {
      class: "lp-table-box",
      ref_key: "containerRef",
      ref: n
    }, [
      ee(Ze, { class: "lp-table__scrollbar" }, {
        default: we(() => [
          L("div", _a, [
            L("table", {
              class: D(["lp-table", c.value]),
              style: se({ width: m.value })
            }, [
              L("colgroup", null, [
                (f(!0), _(oe, null, ce(i.value, (T) => (f(), _("col", {
                  key: T.name,
                  style: se({ width: T.computedWidth || T.computedMinWidth })
                }, null, 4))), 128))
              ]),
              L("thead", ba, [
                L("tr", wa, [
                  (f(!0), _(oe, null, ce(i.value, (T) => (f(), _("th", {
                    key: T.name,
                    class: D(["lp-table__th", T.align && `lp-table__th--${T.align}`, T.fixed && `fixed-${T.fixed}`]),
                    style: se({
                      left: T.computedStickyLeft,
                      right: T.computedStickyRight
                    })
                  }, G(T.title), 7))), 128))
                ])
              ])
            ], 6)
          ]),
          L("div", {
            class: "lp-table__body-wrapper",
            ref_key: "bodyWrapRef",
            ref: s
          }, [
            L("table", {
              class: D(["lp-table", c.value]),
              ref_key: "tableRef",
              ref: t,
              style: se({ width: m.value })
            }, [
              L("colgroup", null, [
                (f(!0), _(oe, null, ce(i.value, (T) => (f(), _("col", {
                  key: T.name,
                  style: se({ width: T.computedWidth || T.computedMinWidth })
                }, null, 4))), 128))
              ]),
              L("tbody", $a, [
                ee(Qe, {
                  name: a.rowTransitionName
                }, {
                  default: we(() => [
                    (f(!0), _(oe, null, ce(a.data, (T, $) => (f(), _("tr", {
                      key: a.rowKey ? T[a.rowKey] : $,
                      class: "lp-table__tr"
                    }, [
                      (f(!0), _(oe, null, ce(i.value, (S) => (f(), _("td", {
                        key: S.name,
                        class: D(["lp-table__td", S.align && `lp-table__td--${S.align}`, S.fixed && `fixed-${S.fixed}`]),
                        style: se({
                          left: S.computedStickyLeft,
                          right: S.computedStickyRight
                        })
                      }, [
                        U(e)[`column.${S.name}`] ? X(E.$slots, `column.${S.name}`, {
                          key: 0,
                          item: T,
                          column: S,
                          index: $
                        }) : U(e)[`field.${S.name}`] ? X(E.$slots, `field.${S.name}`, {
                          key: 1,
                          item: T,
                          column: S,
                          index: $
                        }) : (f(), _(oe, { key: 2 }, [
                          be(G(T[S.name]), 1)
                        ], 64))
                      ], 6))), 128))
                    ]))), 128))
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
}), ka = {
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
}, kt = Y({
  name: "LpTableColumn",
  props: ka,
  setup(l) {
  },
  render() {
  }
});
let Sa = {
  install: (l) => {
    l.component(Ct.name, Ct), l.component(kt.name, kt);
  }
};
const Ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTable: Ct,
  LpTableColumn: kt,
  default: Sa
}, Symbol.toStringTag, { value: "Module" })), xa = ["onClick"], Ea = { class: "text" }, La = {
  name: "lp-tabs"
}, St = /* @__PURE__ */ Y({
  ...La,
  props: /* @__PURE__ */ ze({
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
  emits: /* @__PURE__ */ ze(["change"], ["update:modelValue"]),
  setup(l, { emit: e }) {
    const n = lt(l, "modelValue"), t = e, o = l;
    function s(u, p) {
      return u[o.keys.value] ?? p;
    }
    function a(u, p) {
      return o.modelType === "index" ? n.value === p : o.modelType === "field" && o.modelField ? n.value === u[o.modelField] : n.value === u[o.keys.value];
    }
    function i(u, p) {
      let g;
      o.modelType === "index" ? g = p : o.modelType === "field" && o.modelField ? g = u[o.modelField] : g = u[o.keys.value], n.value = g, t("change", {
        value: g,
        item: u,
        index: p
      });
    }
    return (u, p) => (f(), _("div", {
      class: D(["lp-tabs", [{ column: u.column, full: u.full }, u.type ? `type-${u.type}` : ""]])
    }, [
      (f(!0), _(oe, null, ce(u.data, (g, k) => (f(), _("div", {
        class: D(["item", { active: a(g, k) }]),
        key: s(g, k),
        onClick: (m) => i(g, k)
      }, [
        L("span", Ea, G(g[u.keys.title]), 1)
      ], 10, xa))), 128))
    ], 2));
  }
});
let Oa = {
  install: (l) => {
    l.component(St.name, St);
  }
};
const ja = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTabs: St,
  default: Oa
}, Symbol.toStringTag, { value: "Module" })), Aa = {
  name: "LpTag"
}, Ma = /* @__PURE__ */ Y({
  ...Aa,
  props: {
    type: { default: "" },
    size: { default: "" },
    plain: { type: Boolean, default: !1 },
    round: { type: Boolean, default: !1 },
    closable: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click", "close"],
  setup(l, { emit: e }) {
    const n = l, t = e, o = (a) => {
      n.disabled || t("click", a);
    }, s = (a) => {
      n.disabled || t("close", a);
    };
    return (a, i) => (f(), _("div", {
      class: D(["lp-tag", [
        a.type ? `type-${a.type}` : "",
        a.size ? `size-${a.size}` : "",
        {
          plain: a.plain,
          round: a.round,
          disabled: a.disabled
        }
      ]]),
      onClick: o
    }, [
      X(a.$slots, "default", {}, void 0, !0),
      a.closable ? (f(), _("div", {
        key: 0,
        class: "close-box",
        onClick: Ee(s, ["stop"])
      }, [
        ee(U(ie), {
          is: "close",
          size: "12"
        })
      ])) : N("", !0)
    ], 2));
  }
}), et = /* @__PURE__ */ Le(Ma, [["__scopeId", "data-v-f94358c1"]]);
let Pa = {
  install: (l) => {
    l.component(et.name, et);
  }
};
const Ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTag: et,
  default: Pa
}, Symbol.toStringTag, { value: "Module" }));
let za = {
  install: (l) => {
    l.component(Qe.name, Qe);
  }
};
const Ba = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTransition: Qe,
  default: za
}, Symbol.toStringTag, { value: "Module" }));
let Ra = {
  install: (l) => {
    l.component(Je.name, Je);
  }
};
const Va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTree: Je,
  default: Ra
}, Symbol.toStringTag, { value: "Module" }));
var Re = /* @__PURE__ */ ((l) => (l.TEXT = "text", l.IMG = "img", l.FILE = "file", l))(Re || {}), he = /* @__PURE__ */ ((l) => (l.STRING = "string", l.ARRAY = "array", l.OBJECT_ARRAY = "objectArray", l.AUTO = "", l))(he || {}), ue = /* @__PURE__ */ ((l) => (l.PENDING = "pending", l.UPLOADING = "uploading", l.SUCCESS = "success", l.ERROR = "error", l))(ue || {});
class zt {
  constructor(e, n, t) {
    K(this, "item");
    K(this, "file");
    K(this, "action");
    K(this, "abortController");
    K(this, "callbacks", {});
    K(this, "frontendOption");
    // 前端直传配置
    /**
     * 上传进度
     */
    K(this, "progress", z({
      loaded: 0,
      total: 0,
      percentage: 0
    }));
    /**
     * 上传状态
     */
    K(this, "progressStatus", "");
    this.item = e, this.file = n, this.action = t;
  }
  static create(e, n, t) {
    return new zt(e, n, t);
  }
  /**
   * 获取前端直传配置
   */
  async getFrontendUploadOption() {
    if (!this.action || this.action.type !== "option")
      return null;
    try {
      const e = await st.post(this.action.url, {}, {
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
  processFileName(e, n) {
    const t = {};
    if (n.includes("etag") && (t.etag = Date.now().toString() + Math.random().toString(36).substr(2, 9)), n.includes("ext")) {
      const o = e.lastIndexOf(".");
      t.ext = o > -1 ? e.substring(o) : "";
    }
    return t;
  }
  /**
   * 替换字符串中的占位符
   */
  replacePlaceholders(e, n) {
    let t = e;
    return Object.entries(n).forEach(([o, s]) => {
      t = t.replace(new RegExp(`\\$\\(${o}\\)`, "g"), s);
    }), t;
  }
  /**
   * 前端直传上传
   */
  async frontendDirectUpload() {
    var s, a, i, u, p, g;
    if (!this.file || !this.frontendOption)
      throw new Error("文件或前端直传配置不存在");
    const e = new FormData(), n = this.processFileName(this.file.name, this.frontendOption.handles), t = this.replacePlaceholders(
      this.frontendOption.data.key || "",
      n
    );
    Object.entries(this.frontendOption.data).forEach(([k, m]) => {
      typeof m == "string" ? e.append(k, this.replacePlaceholders(m, n)) : e.append(k, String(m));
    });
    const o = this.frontendOption.fieldName || "file";
    e.append(o, this.file), this.abortController = new AbortController();
    try {
      const k = await st.post(this.frontendOption.url, e, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        signal: this.abortController.signal,
        onUploadProgress: (c) => {
          var v, I;
          if (c.total) {
            const E = {
              loaded: c.loaded,
              total: c.total,
              percentage: Math.round(c.loaded / c.total * 100)
            };
            (I = (v = this.callbacks).onProgress) == null || I.call(v, E), this.progress.value = E;
          }
        }
      }), m = {
        data: {
          fullUrl: `${this.frontendOption.domain}/${t}`,
          key: t,
          url: `${this.frontendOption.domain}/${t}`
        }
      };
      return (a = (s = this.callbacks).onSuccess) == null || a.call(s, m), m;
    } catch (k) {
      if (k.name === "CanceledError") {
        const c = new Error("上传已取消");
        throw (u = (i = this.callbacks).onError) == null || u.call(i, c), c;
      }
      const m = new Error(`前端直传失败: ${k.message}`);
      throw (g = (p = this.callbacks).onError) == null || g.call(p, m), m;
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
    var n, t, o, s, a, i;
    if (!this.file || !this.action)
      throw new Error("文件或上传地址不存在");
    const e = new FormData();
    e.append("file", this.file), this.abortController = new AbortController();
    try {
      const u = await st.post(this.action.url, e, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...this.action.headers
        },
        signal: this.abortController.signal,
        onUploadProgress: (p) => {
          var g, k;
          if (p.total) {
            const m = {
              loaded: p.loaded,
              total: p.total,
              percentage: Math.round(p.loaded / p.total * 100)
            };
            (k = (g = this.callbacks).onProgress) == null || k.call(g, m), this.progress.value = m;
          }
        }
      });
      return (t = (n = this.callbacks).onSuccess) == null || t.call(n, u.data), u.data;
    } catch (u) {
      if (u.name === "CanceledError") {
        const g = new Error("上传已取消");
        throw (s = (o = this.callbacks).onError) == null || s.call(o, g), g;
      }
      const p = new Error(`上传失败: ${u.message}`);
      throw (i = (a = this.callbacks).onError) == null || i.call(a, p), p;
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
function Fa(l, e) {
  return e.split(".").reduce((n, t) => n && n[t] !== void 0 ? n[t] : null, l);
}
function at(l) {
  if (!l) return "";
  try {
    const n = l.split("?")[0].split("#")[0].split("/"), t = n[n.length - 1];
    return !t || t.startsWith(".") ? "未知文件" : decodeURIComponent(t);
  } catch (e) {
    return console.warn("提取文件名失败:", e), "未知文件";
  }
}
function Na(l, e) {
  const n = z([]), t = z(/* @__PURE__ */ new Map()), o = /* @__PURE__ */ new Map();
  let s = 0, a = null;
  const i = () => e.type === Re.IMG ? "image/*" : e.type === Re.FILE ? "*" : e.type === Re.TEXT ? "text/*" : "", u = () => {
    a = l.value;
    const $ = document.createElement("input");
    $.type = "file", $.accept = e.value.accept || i(), $.multiple = e.value.limit !== 1, $.addEventListener("change", async (S) => {
      const b = S.target.files;
      if (b && b.length > 0) {
        if (e.value.limit === 1 && n.value.length > 0) {
          const y = n.value[0];
          y.uploader, y._id && o.delete(y._id), n.value = [];
        }
        for (let y = 0; y < b.length; y++) {
          const w = b[y], P = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, B = {
            _id: P,
            url: "",
            name: w.name,
            size: w.size,
            type: w.type,
            uploader: null,
            status: ue.PENDING
          };
          if (w.type.startsWith("image/")) {
            const h = new FileReader();
            h.readAsDataURL(w), h.onload = () => {
              B.url = h.result;
            };
          }
          n.value.push(B), o.set(P, w), e.value.autoUpload && e.value.action && await p(B, w);
        }
      }
    }), $.click();
  }, p = async ($, S) => {
    if (!e.value.action) {
      console.warn("未配置上传地址");
      return;
    }
    const r = zt.create($, S, e.value.action);
    $.uploader = r, $.status = ue.UPLOADING, r.setCallbacks({
      onProgress: (b) => {
        console.log("上传进度:", b);
      },
      onSuccess: (b) => {
        const y = e.value.responseField || "data.fullUrl", w = Fa(b, y);
        w && ($.url = w, $.status = ue.SUCCESS, m()), t.value.delete($), console.log("上传成功:", b);
      },
      onError: (b) => {
        $.status = ue.ERROR, t.value.delete($), console.error("上传失败:", b);
      }
    });
    try {
      await r.upload();
    } catch (b) {
      console.error("上传异常:", b);
    }
  }, g = ($) => {
    if ($.uploader && ($.uploader.abort(), $.uploader = null, t.value.delete($)), $._id && o.delete($._id), e.value.limit === 1)
      l.value = a, k(a);
    else {
      const S = n.value.indexOf($);
      S > -1 && (n.value.splice(S, 1), m());
    }
  }, k = ($) => {
    o.clear();
    let S = e.value.valueType;
    if (e.value.valueType == he.AUTO && (e.value.limit == 1 ? S = he.STRING : S = he.ARRAY), console.log("flushModelValue", S, $), !$) {
      n.value = [];
      return;
    }
    if (S === he.ARRAY)
      n.value = $.map((r) => ({
        _id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        url: r,
        name: at(r),
        uploader: null,
        status: ue.SUCCESS
      }));
    else if (S === he.STRING) {
      let r = e.value.limit === 1 ? [$] : $.split(",");
      n.value = r.map((b) => ({
        _id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        url: b,
        name: at(b),
        uploader: null,
        status: ue.SUCCESS
      }));
    } else S === he.OBJECT_ARRAY ? n.value = $.map((r) => ({
      _id: r._id || `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      url: r.url,
      name: r.name || at(r.url),
      size: r.size || 0,
      type: r.type || "",
      uploader: null,
      status: ue.SUCCESS
    })) : n.value = [];
  }, m = () => {
    s++;
    let $ = e.value.valueType;
    e.value.valueType == he.AUTO && (e.value.limit == 1 ? $ = he.STRING : $ = he.ARRAY);
    let S;
    const r = n.value.filter(
      (b) => b.url && !b.url.startsWith("data:")
      // 排除base64预览URL
    );
    $ === he.ARRAY ? S = r.map((b) => b.url) : $ === he.STRING ? e.value.limit === 1 ? S = r.length > 0 ? r[0].url : "" : S = r.map((b) => b.url).join(",") : $ === he.OBJECT_ARRAY ? S = r.map((b) => ({
      url: b.url,
      name: b.name,
      size: b.size,
      type: b.type
    })) : S = "", l.value = S, s--;
  }, c = () => {
    k(l.value);
  }, v = ($) => {
    const S = n.value[$];
    S.uploader && g(S), o.delete(S._id), n.value.splice($, 1), m();
  };
  return re(n, ($, S) => {
    s === 0 && ($.some(
      (b) => b.status === ue.SUCCESS || b.status === ue.ERROR
    ) || $.length < ((S == null ? void 0 : S.length) || 0)) && m();
  }, { deep: !0 }), re(() => l.value, ($, S) => {
    if (s === 0 && JSON.stringify($) !== JSON.stringify(S)) {
      s++;
      try {
        k($);
      } finally {
        s--;
      }
    }
  }, { deep: !0 }), {
    // 选择文件
    selectFile: u,
    // 文件列表
    fileList: n,
    // 上传进度
    uploadProgress: t,
    // 刷新文件列表
    flushFileList: k,
    // 更新模型值
    updateModelValue: m,
    // 初始化上传
    initUpload: c,
    // 删除文件
    onDelete: v,
    // 上传文件
    uploadFile: p,
    // 取消上传
    cancelUpload: g,
    // 获取文件列表
    getFileList: () => n.value,
    // 获取文件对象列表
    getFileObjectList: () => (console.log("fileObjectMap:", o), n.value.map(($) => ({
      fileItem: $,
      file: o.get($._id) || null
    })).filter(($) => $.file !== null)),
    // 上传所有文件
    uploadAllFiles: async () => {
      const $ = n.value.filter(
        (S) => S.status === ue.PENDING
      );
      if ($.length === 0) {
        console.warn("没有待上传的文件");
        return;
      }
      if (!e.value.action) {
        console.warn("未配置上传地址");
        return;
      }
      for (const S of $) {
        const r = o.get(S._id);
        r ? await p(S, r) : (console.warn("找不到对应的File对象:", S.name), console.log("fileObjectMap:", S, o));
      }
    },
    // 清除所有文件
    clearAllFiles: () => {
      n.value = [], t.value.clear(), o.clear(), m();
    }
  };
}
const Wa = { class: "lp-upload" }, Ua = {
  key: 0,
  class: "lp-upload__file-list"
}, Da = ["onClick"], Ha = ["src"], Ga = {
  key: 1,
  class: "lp-upload__placeholder"
}, Ka = {
  key: 2,
  class: "lp-upload__progress"
}, Ya = { class: "lp-upload__progress-text" }, Xa = ["onClick"], qa = {
  key: 3,
  class: "lp-upload__handle"
}, Ja = {
  key: 1,
  class: "lp-upload__file-mode"
}, Za = { class: "lp-upload__file-info" }, Qa = { class: "lp-upload__file-details" }, ei = { class: "lp-upload__file-name" }, ti = {
  key: 0,
  class: "lp-upload__file-size"
}, li = {
  key: 0,
  class: "lp-upload__file-progress"
}, ni = { class: "lp-upload__progress-text" }, oi = { class: "lp-upload__file-status" }, si = {
  key: 0,
  class: "lp-upload__status-success"
}, ai = {
  key: 1,
  class: "lp-upload__status-error"
}, ii = {
  key: 2,
  class: "lp-upload__status-pending"
}, ri = { class: "lp-upload__file-actions" }, ui = { class: "lp-upload__control flex" }, ci = {
  name: "lp-upload"
}, Tt = /* @__PURE__ */ Y({
  ...ci,
  props: /* @__PURE__ */ ze({
    type: { default: "img" },
    limit: { default: 1 },
    accept: { default: "" },
    array: { type: Boolean },
    action: {},
    valueType: { default: he.AUTO },
    autoUpload: { type: Boolean, default: !0 },
    responseField: { default: "data.fullUrl" }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(l, { expose: e }) {
    const n = l, t = lt(l, "modelValue"), o = Ce("uploadConfig", null), s = R(() => ({
      ...n,
      action: n.action || o
    })), {
      // 选择文件
      selectFile: a,
      // 文件列表
      fileList: i,
      // 初始化上传
      initUpload: u,
      // 删除文件
      onDelete: p,
      // 取消上传
      cancelUpload: g,
      // 获取文件列表
      getFileList: k,
      // 获取文件对象列表
      getFileObjectList: m,
      // 上传所有文件
      uploadAllFiles: c,
      // 清除所有文件
      clearAllFiles: v
    } = Na(t, s);
    pe({});
    const I = R(() => !s.value.limit || i.value.length < s.value.limit);
    R(() => i.value.some(($) => $.status === ue.PENDING));
    const E = ($) => $ < 1024 ? $ + " B" : $ < 1024 * 1024 ? ($ / 1024).toFixed(1) + " KB" : $ < 1024 * 1024 * 1024 ? ($ / (1024 * 1024)).toFixed(1) + " MB" : ($ / (1024 * 1024 * 1024)).toFixed(1) + " GB", C = async () => {
      await c();
    };
    function T($) {
      s.value.limit === 1 && a();
    }
    return e({
      getFileList: k,
      getFileObjectList: m,
      uploadAllFiles: c,
      selectFile: a,
      fileList: i,
      clearAllFiles: v
    }), ge(() => {
      u();
    }), ($, S) => (f(), _("div", Wa, [
      s.value.type === "img" ? (f(), _("div", Ua, [
        (f(!0), _(oe, null, ce(U(i), (r, b) => (f(), _("div", {
          class: "lp-upload__item",
          key: b,
          onClick: (y) => T()
        }, [
          r.url && r.url.startsWith("http") ? (f(), _("img", {
            key: 0,
            class: "img",
            src: r.url,
            alt: ""
          }, null, 8, Ha)) : (f(), _("div", Ga, [
            ee(U(ie), {
              is: "upload",
              size: "22",
              color: "#ccc"
            })
          ])),
          r.uploader && r.status === U(ue).UPLOADING ? (f(), _("div", Ka, [
            ee(U(bt), {
              percentage: r.uploader.progress.percentage,
              status: r.uploader.progressStatus,
              "show-text": !1
            }, null, 8, ["percentage", "status"]),
            L("div", Ya, G(r.uploader.progress.percentage) + "%", 1),
            L("div", {
              class: "lp-upload__cancel",
              onClick: Ee((y) => U(g)(r), ["stop"])
            }, [
              ee(U(ie), {
                is: "close",
                size: "12",
                color: "#fff"
              })
            ], 8, Xa)
          ])) : (f(), _("div", qa, [
            ee(U(ie), {
              is: "delete",
              size: "16",
              color: "#fff",
              onClick: Ee((y) => U(p)(b), ["stop"])
            }, null, 8, ["onClick"])
          ]))
        ], 8, Da))), 128)),
        I.value ? (f(), _("div", {
          key: 0,
          class: "lp-upload__item",
          onClick: S[0] || (S[0] = //@ts-ignore
          (...r) => U(a) && U(a)(...r))
        }, [
          X($.$slots, "select", {}, () => [
            ee(U(ie), {
              is: "upload",
              size: "22",
              color: "#ff0000"
            })
          ])
        ])) : N("", !0)
      ])) : (f(), _("div", Ja, [
        (f(!0), _(oe, null, ce(U(i), (r, b) => {
          var y, w, P, B;
          return f(), _("div", {
            class: "lp-upload__file-item",
            key: b
          }, [
            L("div", Za, [
              ee(U(ie), {
                is: "teaching",
                size: "20",
                color: "#409eff"
              }),
              L("div", Qa, [
                L("div", ei, G(r.name || "未知文件"), 1),
                r.size ? (f(), _("div", ti, G(E(r.size)), 1)) : N("", !0)
              ])
            ]),
            r.status === U(ue).UPLOADING ? (f(), _("div", li, [
              ee(U(bt), {
                percentage: ((w = (y = r.uploader) == null ? void 0 : y.progress) == null ? void 0 : w.percentage) || 0,
                "show-text": !1,
                size: "small"
              }, null, 8, ["percentage"]),
              L("span", ni, G(((B = (P = r.uploader) == null ? void 0 : P.progress) == null ? void 0 : B.percentage) || 0) + "%", 1)
            ])) : N("", !0),
            L("div", oi, [
              r.status === U(ue).SUCCESS ? (f(), _("span", si, [
                ee(U(ie), {
                  is: "security",
                  size: "16",
                  color: "#67c23a"
                })
              ])) : r.status === U(ue).ERROR ? (f(), _("span", ai, [
                ee(U(ie), {
                  is: "close",
                  size: "16",
                  color: "#f56c6c"
                })
              ])) : r.status === U(ue).PENDING ? (f(), _("span", ii, [
                ee(U(ie), {
                  is: "time",
                  size: "16",
                  color: "#e6a23c"
                })
              ])) : N("", !0)
            ]),
            L("div", ri, [
              ee(U(ie), {
                is: "delete",
                size: "16",
                color: "#f56c6c",
                onClick: (h) => U(p)(b),
                style: { cursor: "pointer" }
              }, null, 8, ["onClick"])
            ])
          ]);
        }), 128)),
        L("div", ui, [
          L("div", {
            class: "lp-upload__select-btn",
            onClick: S[1] || (S[1] = //@ts-ignore
            (...r) => U(a) && U(a)(...r))
          }, [
            X($.$slots, "select", {}, () => [
              S[2] || (S[2] = L("button", { class: "btn btn-primary" }, "选择文件", -1))
            ])
          ]),
          s.value.autoUpload ? N("", !0) : (f(), _("div", {
            key: 0,
            class: "lp-upload__upload-btn",
            onClick: C
          }, [
            X($.$slots, "upload", {}, () => [
              S[3] || (S[3] = L("button", { class: "btn btn-success" }, "上传文件", -1))
            ])
          ]))
        ])
      ]))
    ]));
  }
});
let di = {
  install: (l) => {
    l.component(Tt.name, Tt);
  }
};
const pi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpUpload: Tt,
  UploadStatusEnum: ue,
  UploadTypeEnum: Re,
  UploadValueTypeEnum: he,
  default: di
}, Symbol.toStringTag, { value: "Module" }));
var xl = typeof global == "object" && global && global.Object === Object && global, fi = typeof self == "object" && self && self.Object === Object && self, Oe = xl || fi || Function("return this")(), tt = Oe.Symbol, El = Object.prototype, hi = El.hasOwnProperty, mi = El.toString, Be = tt ? tt.toStringTag : void 0;
function vi(l) {
  var e = hi.call(l, Be), n = l[Be];
  try {
    l[Be] = void 0;
    var t = !0;
  } catch {
  }
  var o = mi.call(l);
  return t && (e ? l[Be] = n : delete l[Be]), o;
}
var gi = Object.prototype, yi = gi.toString;
function _i(l) {
  return yi.call(l);
}
var bi = "[object Null]", wi = "[object Undefined]", Zt = tt ? tt.toStringTag : void 0;
function De(l) {
  return l == null ? l === void 0 ? wi : bi : Zt && Zt in Object(l) ? vi(l) : _i(l);
}
function Bt(l) {
  return l != null && typeof l == "object";
}
var $i = Array.isArray;
function Ll(l) {
  var e = typeof l;
  return l != null && (e == "object" || e == "function");
}
var Ci = "[object AsyncFunction]", ki = "[object Function]", Si = "[object GeneratorFunction]", Ti = "[object Proxy]";
function Ol(l) {
  if (!Ll(l))
    return !1;
  var e = De(l);
  return e == ki || e == Si || e == Ci || e == Ti;
}
var it = Oe["__core-js_shared__"], Qt = function() {
  var l = /[^.]+$/.exec(it && it.keys && it.keys.IE_PROTO || "");
  return l ? "Symbol(src)_1." + l : "";
}();
function xi(l) {
  return !!Qt && Qt in l;
}
var Ei = Function.prototype, Li = Ei.toString;
function Ie(l) {
  if (l != null) {
    try {
      return Li.call(l);
    } catch {
    }
    try {
      return l + "";
    } catch {
    }
  }
  return "";
}
var Oi = /[\\^$.*+?()[\]{}|]/g, ji = /^\[object .+?Constructor\]$/, Ai = Function.prototype, Mi = Object.prototype, Pi = Ai.toString, Ii = Mi.hasOwnProperty, zi = RegExp(
  "^" + Pi.call(Ii).replace(Oi, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Bi(l) {
  if (!Ll(l) || xi(l))
    return !1;
  var e = Ol(l) ? zi : ji;
  return e.test(Ie(l));
}
function Ri(l, e) {
  return l == null ? void 0 : l[e];
}
function He(l, e) {
  var n = Ri(l, e);
  return Bi(n) ? n : void 0;
}
var xt = He(Oe, "WeakMap"), Vi = 9007199254740991;
function jl(l) {
  return typeof l == "number" && l > -1 && l % 1 == 0 && l <= Vi;
}
function Fi(l) {
  return l != null && jl(l.length) && !Ol(l);
}
var Ni = Object.prototype;
function Al(l) {
  var e = l && l.constructor, n = typeof e == "function" && e.prototype || Ni;
  return l === n;
}
var Wi = "[object Arguments]";
function el(l) {
  return Bt(l) && De(l) == Wi;
}
var Ml = Object.prototype, Ui = Ml.hasOwnProperty, Di = Ml.propertyIsEnumerable, Hi = el(/* @__PURE__ */ function() {
  return arguments;
}()) ? el : function(l) {
  return Bt(l) && Ui.call(l, "callee") && !Di.call(l, "callee");
};
function Gi() {
  return !1;
}
var Pl = typeof exports == "object" && exports && !exports.nodeType && exports, tl = Pl && typeof module == "object" && module && !module.nodeType && module, Ki = tl && tl.exports === Pl, ll = Ki ? Oe.Buffer : void 0, Yi = ll ? ll.isBuffer : void 0, Xi = Yi || Gi, qi = "[object Arguments]", Ji = "[object Array]", Zi = "[object Boolean]", Qi = "[object Date]", er = "[object Error]", tr = "[object Function]", lr = "[object Map]", nr = "[object Number]", or = "[object Object]", sr = "[object RegExp]", ar = "[object Set]", ir = "[object String]", rr = "[object WeakMap]", ur = "[object ArrayBuffer]", cr = "[object DataView]", dr = "[object Float32Array]", pr = "[object Float64Array]", fr = "[object Int8Array]", hr = "[object Int16Array]", mr = "[object Int32Array]", vr = "[object Uint8Array]", gr = "[object Uint8ClampedArray]", yr = "[object Uint16Array]", _r = "[object Uint32Array]", le = {};
le[dr] = le[pr] = le[fr] = le[hr] = le[mr] = le[vr] = le[gr] = le[yr] = le[_r] = !0;
le[qi] = le[Ji] = le[ur] = le[Zi] = le[cr] = le[Qi] = le[er] = le[tr] = le[lr] = le[nr] = le[or] = le[sr] = le[ar] = le[ir] = le[rr] = !1;
function br(l) {
  return Bt(l) && jl(l.length) && !!le[De(l)];
}
function wr(l) {
  return function(e) {
    return l(e);
  };
}
var Il = typeof exports == "object" && exports && !exports.nodeType && exports, Ve = Il && typeof module == "object" && module && !module.nodeType && module, $r = Ve && Ve.exports === Il, rt = $r && xl.process, nl = function() {
  try {
    var l = Ve && Ve.require && Ve.require("util").types;
    return l || rt && rt.binding && rt.binding("util");
  } catch {
  }
}(), ol = nl && nl.isTypedArray, Cr = ol ? wr(ol) : br;
function kr(l, e) {
  return function(n) {
    return l(e(n));
  };
}
var Sr = kr(Object.keys, Object), Tr = Object.prototype, xr = Tr.hasOwnProperty;
function Er(l) {
  if (!Al(l))
    return Sr(l);
  var e = [];
  for (var n in Object(l))
    xr.call(l, n) && n != "constructor" && e.push(n);
  return e;
}
var Et = He(Oe, "Map"), Lt = He(Oe, "DataView"), Ot = He(Oe, "Promise"), jt = He(Oe, "Set"), sl = "[object Map]", Lr = "[object Object]", al = "[object Promise]", il = "[object Set]", rl = "[object WeakMap]", ul = "[object DataView]", Or = Ie(Lt), jr = Ie(Et), Ar = Ie(Ot), Mr = Ie(jt), Pr = Ie(xt), Me = De;
(Lt && Me(new Lt(new ArrayBuffer(1))) != ul || Et && Me(new Et()) != sl || Ot && Me(Ot.resolve()) != al || jt && Me(new jt()) != il || xt && Me(new xt()) != rl) && (Me = function(l) {
  var e = De(l), n = e == Lr ? l.constructor : void 0, t = n ? Ie(n) : "";
  if (t)
    switch (t) {
      case Or:
        return ul;
      case jr:
        return sl;
      case Ar:
        return al;
      case Mr:
        return il;
      case Pr:
        return rl;
    }
  return e;
});
var Ir = "[object Map]", zr = "[object Set]", Br = Object.prototype, Rr = Br.hasOwnProperty;
function Vr(l) {
  if (l == null)
    return !0;
  if (Fi(l) && ($i(l) || typeof l == "string" || typeof l.splice == "function" || Xi(l) || Cr(l) || Hi(l)))
    return !l.length;
  var e = Me(l);
  if (e == Ir || e == zr)
    return !l.size;
  if (Al(l))
    return !Er(l).length;
  for (var n in l)
    if (Rr.call(l, n))
      return !1;
  return !0;
}
function Fr(l) {
  const e = /* @__PURE__ */ Object.assign({ "./lp-button/index.ts": Jl, "./lp-checkbox/index.ts": an, "./lp-empty/index.ts": pn, "./lp-fold/index.ts": bn, "./lp-form/index.ts": xn, "./lp-input/index.ts": Wn, "./lp-layer/index.ts": _o, "./lp-layout/index.ts": So, "./lp-list/index.ts": Lo, "./lp-loading/index.ts": jo, "./lp-menu/index.ts": Jo, "./lp-message/index.ts": ts, "./lp-paginate/index.ts": ms, "./lp-panel/index.ts": ws, "./lp-progress/index.ts": Ts, "./lp-radio/index.ts": Is, "./lp-scrollbar/index.ts": Fs, "./lp-select/index.ts": sa, "./lp-switch/index.ts": ga, "./lp-table/index.ts": Ta, "./lp-tabs/index.ts": ja, "./lp-tag/index.ts": Ia, "./lp-transition/index.ts": Ba, "./lp-tree/index.ts": Va, "./lp-upload/index.ts": pi });
  console.debug("%cglobalComponents", "color:green", e), Object.keys(e).forEach((n) => {
    const t = e[n].default;
    Vr(t) || l.use(t);
  });
}
const Nr = (l, e, n, t) => {
  l.__pressTimer === null && (l.__pressTimer = window.setTimeout(() => {
    l.__longPressed = !0, typeof e.value == "function" && e.value();
  }, n));
}, cl = (l) => {
  l.__pressTimer !== null && (clearTimeout(l.__pressTimer), l.__pressTimer = null);
}, Wr = {
  mounted(l, e) {
    const n = Number(e.arg) || 500;
    l.__pressTimer = null, l.__longPressed = !1;
    const t = (a) => {
      a.preventDefault(), a.stopPropagation(), Nr(l, e, n);
    }, o = (a) => {
      cl(l), setTimeout(() => {
        l.__longPressed = !1;
      }, 100);
    }, s = (a) => {
      l.__longPressed && (console.log("handleClick 阻止默认事件", a), a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault(), l.__longPressed = !1);
    };
    l.__handleStart = t, l.__handleCancel = o, l.__handleClick = s, l.addEventListener("pointerdown", t), l.addEventListener("pointerup", o), l.addEventListener("pointerleave", o), l.addEventListener("pointercancel", o), l.addEventListener("click", s, !0);
  },
  unmounted(l) {
    l.removeEventListener("pointerdown", l.__handleStart), l.removeEventListener("pointerup", l.__handleCancel), l.removeEventListener("pointerleave", l.__handleCancel), l.removeEventListener("pointercancel", l.__handleCancel), l.removeEventListener("click", l.__handleClick, !0), cl(l);
  }
}, Ur = {
  name: "LooplanUiNeeds",
  title: "Looplan Ui Needs组件库",
  type: "local",
  version: "0.0.1",
  components: [
    "SelectedTag"
  ]
}, Dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SelectedTag: Tl,
  packageConfig: Ur
}, Symbol.toStringTag, { value: "Module" })), Hr = { class: "lp-tooltip" }, Gr = {
  name: "LpTooltip"
}, Kr = /* @__PURE__ */ Y({
  ...Gr,
  props: {
    msg: { default: "" },
    bgColor: { default: "rgba(0, 0, 0, 0.8)" }
  },
  setup(l) {
    return fl((e) => ({
      23479595: e.bgColor
    })), pe({}), (e, n) => (f(), _("div", Hr, G(e.msg), 1));
  }
});
function Qr(l, e) {
  const n = [];
  let t = null;
  const o = z(!0), s = (g) => {
    g.closeTimer && (clearTimeout(g.closeTimer), g.closeTimer = null), g.layer.close(), g.el.removeEventListener("mouseenter", g.listeners.enter), g.el.removeEventListener("mouseleave", g.listeners.leave);
    const k = n.indexOf(g);
    k > -1 && n.splice(k, 1);
  }, a = (g) => {
    if (!o.value) return;
    const m = document.elementsFromPoint(g.clientX, g.clientY).find((c) => c.hasAttribute("lp-tip"));
    if (m) {
      console.log("checkTooltip target", m);
      const c = n.find((v) => v.el === m);
      if (c)
        c.closeTimer && (clearTimeout(c.closeTimer), c.closeTimer = null);
      else {
        for (; n.length >= l.limit; )
          s(n[0]);
        const v = m.getAttribute("lp-tip") || "", I = Yr(m, {
          msg: v,
          bgColor: "rgb(0, 0, 0)"
        }), E = {
          el: m,
          layer: I,
          closeTimer: null,
          listeners: {
            enter: () => {
            },
            leave: () => {
            }
          }
        };
        E.listeners.enter = () => {
          E.closeTimer && (clearTimeout(E.closeTimer), E.closeTimer = null);
        }, E.listeners.leave = () => {
          E.closeTimer || (E.closeTimer = setTimeout(() => {
            s(E);
          }, l.hideDelay));
        }, m.addEventListener("mouseenter", E.listeners.enter), m.addEventListener("mouseleave", E.listeners.leave), n.push(E);
      }
    }
  }, i = (g) => {
    o.value && (t && clearTimeout(t), t = setTimeout(() => {
      a(g);
    }, l.delay));
  }, u = e || window;
  return u.addEventListener("mousemove", i), {
    tooltipEnable: o,
    removeTooltip: () => {
      u.removeEventListener("mousemove", i), t && clearTimeout(t), [...n].forEach(s);
    }
  };
}
function Yr(l, e) {
  return Se.src(Kr).props(e).follow(l, {
    position: "bottom-center",
    // 显示箭头
    arrow: !0,
    // 箭头颜色
    arrowColor: e.bgColor || "#000"
  }).show({});
}
console.debug("looplan-ui");
const eu = {
  install(l) {
    Fr(l), gl.appContext = l._context, Nl({
      name: "looplan",
      url: "http://api.looplan.cn/IconGateway.detail"
      // 认证
      // token:''
    }), Wl(Dr), l.directive("longpress", Wr);
  }
};
export {
  Xe as Input,
  vt as InputNumber,
  ut as LpButton,
  ct as LpButtonGroup,
  We as LpCheckbox,
  Ye as LpCheckboxGroup,
  ft as LpCollapse,
  dt as LpEmpty,
  pt as LpFold,
  ht as LpForm,
  mt as LpFormItem,
  _o as LpLayer,
  Ne as LpLoading,
  gt as LpMenu,
  yt as LpPaginate,
  _t as LpPanel,
  bt as LpProgress,
  Ze as LpScrollbar,
  wt as LpSelect,
  la as LpSelectSelectedOne,
  Tl as LpSelectSelectedTag,
  $t as LpSwitch,
  Ct as LpTable,
  kt as LpTableColumn,
  et as LpTag,
  Qe as LpTransition,
  Je as LpTree,
  Tt as LpUpload,
  ue as UploadStatusEnum,
  Re as UploadTypeEnum,
  he as UploadValueTypeEnum,
  eu as default,
  Fr as registerLooplanUiComponents,
  Qr as useTooltip
};
