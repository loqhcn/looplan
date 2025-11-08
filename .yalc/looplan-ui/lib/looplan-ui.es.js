var So = Object.defineProperty;
var ko = (t, e, l) => e in t ? So(t, e, { enumerable: !0, configurable: !0, writable: !0, value: l }) : t[e] = l;
var D = (t, e, l) => ko(t, typeof e != "symbol" ? e + "" : e, l);
import { defineComponent as q, createElementBlock as _, openBlock as v, normalizeClass as N, renderSlot as H, createTextVNode as be, toDisplayString as G, ref as L, inject as we, computed as z, createElementVNode as T, createCommentVNode as R, toRef as Le, provide as Je, Fragment as ce, renderList as de, createBlock as fe, withCtx as ge, withModifiers as ze, onMounted as he, onUnmounted as ft, watch as xe, normalizeStyle as ae, createVNode as te, Transition as ht, nextTick as Oe, reactive as ne, getCurrentInstance as Eo, onBeforeUnmount as mt, resolveDynamicComponent as vt, unref as B, withDirectives as gt, vShow as oo, render as Ct, isRef as St, vModelText as To, markRaw as kt, mergeModels as Ge, useModel as yt, useSlots as xo, useAttrs as Oo } from "vue";
import { LpIcon as ue, resolveComponent as jo, loadComponent as Et, setIconGateway as Lo, setComponentPackage as Po } from "looplan";
import Ze from "axios";
const Io = {
  name: "LpButton"
}, Tt = /* @__PURE__ */ q({
  ...Io,
  props: {
    type: { default: "primary" },
    text: { default: "按钮" }
  },
  emits: ["click"],
  setup(t, { emit: e }) {
    const l = e, o = (n) => {
      l("click", n);
    };
    return (n, s) => (v(), _("button", {
      class: N(["btn", n.type]),
      onClick: o
    }, [
      H(n.$slots, "default", {}, () => [
        be(G(n.text), 1)
      ])
    ], 2));
  }
}), Mo = { class: "lp-button-group" }, zo = {
  name: "LpButtonGroup"
}, Ao = /* @__PURE__ */ q({
  ...zo,
  setup(t) {
    return (e, l) => (v(), _("div", Mo, [
      H(e.$slots, "default", {}, void 0, !0)
    ]));
  }
}), Be = (t, e) => {
  const l = t.__vccOpts || t;
  for (const [o, n] of e)
    l[o] = n;
  return l;
}, xt = /* @__PURE__ */ Be(Ao, [["__scopeId", "data-v-04957fc5"]]);
let Bo = {
  install: (t) => {
    t.component(Tt.name, Tt), t.component(xt.name, xt);
  }
};
const Ro = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bo
}, Symbol.toStringTag, { value: "Module" })), Vo = { class: "lp-checkbox__input" }, Fo = ["value", "name", "disabled", "checked", "midway"], No = {
  key: 0,
  class: "lp-checkbox__label"
}, Wo = {
  name: "LpCheckbox"
}, Ae = /* @__PURE__ */ q({
  ...Wo,
  props: {
    modelValue: { type: [Boolean, String, Number], default: !1 },
    label: { type: [String, Number, Boolean] },
    trueLabel: {},
    falseLabel: {},
    disabled: { type: Boolean },
    name: {},
    size: { default: "default" },
    midway: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: e }) {
    const l = t, o = e, n = L(), s = L(!1), a = we("checkboxGroup", void 0), d = z({
      get() {
        var f;
        return ((f = a == null ? void 0 : a.modelValue) == null ? void 0 : f.value) ?? l.modelValue;
      },
      set(f) {
        var C;
        a ? (C = a.changeEvent) == null || C.call(a, f) : (o("update:modelValue", f), o("change", f));
      }
    }), r = z(() => {
      var f, C;
      if (a) {
        const O = l.label ?? l.trueLabel;
        return (C = (f = a.modelValue) == null ? void 0 : f.value) == null ? void 0 : C.includes(O);
      }
      return l.trueLabel !== void 0 || l.falseLabel !== void 0 ? d.value === l.trueLabel : !!d.value;
    }), p = z(() => {
      var f;
      return ((f = a == null ? void 0 : a.size) == null ? void 0 : f.value) ?? l.size;
    }), g = z(() => {
      var f;
      return ((f = a == null ? void 0 : a.disabled) == null ? void 0 : f.value) ?? l.disabled;
    }), E = (f) => {
      var A, P;
      const O = f.target.checked;
      if (a) {
        const w = l.label ?? l.trueLabel;
        if (w !== void 0) {
          const y = [...((A = a.modelValue) == null ? void 0 : A.value) || []];
          if (O)
            y.includes(w) || y.push(w);
          else {
            const h = y.indexOf(w);
            h > -1 && y.splice(h, 1);
          }
          (P = a.changeEvent) == null || P.call(a, y);
        }
      } else {
        let w;
        l.trueLabel !== void 0 || l.falseLabel !== void 0 ? w = O ? l.trueLabel : l.falseLabel : w = O, d.value = w;
      }
    };
    return z(() => l.midway), (f, C) => (v(), _("label", {
      class: N(["lp-checkbox", [
        `lp-checkbox--${p.value}`,
        {
          "is-disabled": g.value,
          "is-checked": r.value,
          "is-midway": f.midway
        }
      ]])
    }, [
      T("span", Vo, [
        T("input", {
          ref_key: "inputRef",
          ref: n,
          type: "checkbox",
          class: "lp-checkbox__original",
          value: f.label || f.trueLabel,
          name: f.name,
          disabled: g.value,
          checked: r.value,
          midway: f.midway,
          onChange: E,
          onFocus: C[0] || (C[0] = (O) => s.value = !0),
          onBlur: C[1] || (C[1] = (O) => s.value = !1)
        }, null, 40, Fo),
        C[2] || (C[2] = T("span", { class: "lp-checkbox__inner" }, null, -1))
      ]),
      f.$slots.default || f.label ? (v(), _("span", No, [
        H(f.$slots, "default", {}, () => [
          be(G(f.label), 1)
        ])
      ])) : R("", !0)
    ], 2));
  }
}), Do = ["aria-label"], Uo = {
  name: "LpCheckboxGroup"
}, Ye = /* @__PURE__ */ q({
  ...Uo,
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
  setup(t, { expose: e, emit: l }) {
    const o = t, n = l, s = z(() => o.modelValue || []), a = (g) => {
      g.length < o.min || g.length > o.max || (n("update:modelValue", g), n("change", g));
    }, d = (g) => s.value.includes(g) ? !1 : s.value.length >= o.max, r = z(() => s.value.length <= o.min), p = {
      modelValue: Le(o, "modelValue"),
      disabled: Le(o, "disabled"),
      size: Le(o, "size"),
      min: Le(o, "min"),
      max: Le(o, "max"),
      changeEvent: a
    };
    return Je("checkboxGroup", p), e({
      isMinimumReached: r,
      isLimitExceeded: d
    }), (g, E) => (v(), _("div", {
      class: N(["lp-checkbox-group", [
        `lp-checkbox-group--${g.size}`,
        {
          "is-disabled": g.disabled
        }
      ]]),
      role: "group",
      "aria-label": g.ariaLabel
    }, [
      (v(!0), _(ce, null, de(g.options, (f) => (v(), fe(Ae, {
        key: f.value,
        label: f.value,
        disabled: f.disabled || g.disabled || d(f.value),
        size: g.size
      }, {
        default: ge(() => [
          be(G(f.label), 1)
        ]),
        _: 2
      }, 1032, ["label", "disabled", "size"]))), 128)),
      H(g.$slots, "default")
    ], 10, Do));
  }
}), Ho = (t) => {
  t.component(Ae.name, Ae), t.component(Ye.name, Ye);
}, Go = {
  install: Ho,
  LpCheckbox: Ae,
  LpCheckboxGroup: Ye
}, Yo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpCheckbox: Ae,
  LpCheckboxGroup: Ye,
  default: Go
}, Symbol.toStringTag, { value: "Module" })), Xo = {
  name: "lp-empty"
}, qo = { class: "m-empty" };
function Ko(t, e, l, o, n, s) {
  return v(), _("div", qo, " 数据为空! ");
}
const Ot = /* @__PURE__ */ Be(Xo, [["render", Ko]]);
let Jo = {
  install: (t) => {
    t.component(Ot.name, Ot);
  }
};
const Zo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jo
}, Symbol.toStringTag, { value: "Module" })), Qo = {
  name: "LpForm"
}, ot = /* @__PURE__ */ q({
  ...Qo,
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
  setup(t, { expose: e, emit: l }) {
    const o = t, n = l, s = L([]), a = (C) => {
      s.value.push(C);
    }, d = (C) => {
      const O = s.value.indexOf(C);
      O > -1 && s.value.splice(O, 1);
    }, r = async (C, O) => {
      const A = s.value.find((P) => P.prop === C);
      if (!A)
        return console.warn(`[LpForm] 找不到字段 ${C}`), !1;
      try {
        return await A.validate(), O == null || O(!0, ""), !0;
      } catch (P) {
        const w = P.message || "验证失败";
        return O == null || O(!1, w), !1;
      }
    }, p = async (C) => {
      const O = await Promise.allSettled(
        s.value.map((w) => w.validate())
      ), A = O.every((w) => w.status === "fulfilled"), P = O.filter((w) => w.status === "rejected").map((w) => w.reason.message).join("; ");
      return C == null || C(A, P), A;
    }, g = () => {
      s.value.forEach((C) => {
        C.resetField();
      });
    }, E = (C) => {
      const O = C ? Array.isArray(C) ? C : [C] : [];
      s.value.forEach((A) => {
        (!C || O.includes(A.prop)) && A.clearValidate();
      });
    }, f = async () => {
      await p();
    };
    return z(() => typeof o.labelWidth == "number" ? `${o.labelWidth}px` : o.labelWidth || "auto"), Je("lpForm", {
      props: o,
      addFormItem: a,
      removeFormItem: d,
      validateField: r,
      emit: n
    }), e({
      validate: p,
      validateField: r,
      resetFields: g,
      clearValidate: E
    }), (C, O) => (v(), _("form", {
      class: N(["lp-form", {
        "lp-form--inline": C.inline,
        "lp-form--disabled": C.disabled
      }]),
      onSubmit: ze(f, ["prevent"])
    }, [
      H(C.$slots, "default")
    ], 34));
  }
}), en = ["for"], tn = {
  key: 0,
  class: "lp-form-item__label-suffix"
}, on = { class: "lp-form-item__content" }, nn = {
  name: "LpFormItem"
}, nt = /* @__PURE__ */ q({
  ...nn,
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
  setup(t, { expose: e }) {
    const l = t, o = we("lpForm", null), n = L(""), s = L(""), a = L(!1), d = z(() => {
      var i;
      return ((i = o == null ? void 0 : o.props) == null ? void 0 : i.labelPosition) || "right";
    }), r = z(() => {
      var i;
      return l.size || ((i = o == null ? void 0 : o.props) == null ? void 0 : i.size) || "default";
    }), p = z(() => l.required !== void 0 ? l.required : O().some((u) => u.required)), g = z(() => {
      var i;
      return ((i = o == null ? void 0 : o.props) == null ? void 0 : i.labelSuffix) || "";
    }), E = z(() => {
      var i;
      return n.value === "error" && l.showMessage && (((i = o == null ? void 0 : o.props) == null ? void 0 : i.showMessage) ?? !0);
    }), f = z(() => {
      var b;
      const i = {};
      if (d.value === "top")
        return i;
      const u = l.labelWidth || ((b = o == null ? void 0 : o.props) == null ? void 0 : b.labelWidth);
      return u && (i.width = typeof u == "number" ? `${u}px` : u), i;
    }), C = z(() => l.for || `lp-form-item-${Math.random().toString(36).substr(2, 9)}`), O = () => {
      var S;
      const i = (S = o == null ? void 0 : o.props) == null ? void 0 : S.rules, u = l.rules, b = [];
      if (i && l.prop) {
        const x = i[l.prop];
        x && b.push(...Array.isArray(x) ? x : [x]);
      }
      return u && b.push(...Array.isArray(u) ? u : [u]), b;
    }, A = () => {
      var u;
      const i = (u = o == null ? void 0 : o.props) == null ? void 0 : u.model;
      if (!(!i || !l.prop))
        return i[l.prop];
    }, P = async (i) => {
      if (!l.prop)
        return Promise.resolve();
      const u = O();
      if (!u.length)
        return Promise.resolve();
      const b = i ? u.filter((x) => !x.trigger || x.trigger === i) : u;
      if (!b.length)
        return Promise.resolve();
      n.value = "validating", a.value = !0;
      const S = A();
      return new Promise((x, k) => {
        let m = 0;
        const V = b.length, K = (ee, Q) => {
          var oe, $;
          if (ee)
            m++;
          else {
            n.value = "error", s.value = Q || "验证失败", a.value = !1, (oe = o == null ? void 0 : o.emit) == null || oe.call(o, "validate", l.prop, !1, Q || ""), k(new Error(Q || "验证失败"));
            return;
          }
          m === V && (n.value = "success", s.value = "", a.value = !1, ($ = o == null ? void 0 : o.emit) == null || $.call(o, "validate", l.prop, !0, ""), x());
        };
        b.forEach((ee) => {
          w(ee, S, K);
        });
      });
    }, w = (i, u, b) => {
      if (i.required && (u == null || u === "")) {
        b(!1, i.message || "该字段为必填项");
        return;
      }
      if ((u == null || u === "") && !i.required) {
        b(!0);
        return;
      }
      if (i.min !== void 0 || i.max !== void 0 || i.len !== void 0) {
        const S = String(u).length;
        if (i.len !== void 0 && S !== i.len) {
          b(!1, i.message || `长度必须为 ${i.len} 个字符`);
          return;
        }
        if (i.min !== void 0 && S < i.min) {
          b(!1, i.message || `长度不能少于 ${i.min} 个字符`);
          return;
        }
        if (i.max !== void 0 && S > i.max) {
          b(!1, i.message || `长度不能超过 ${i.max} 个字符`);
          return;
        }
      }
      if (i.pattern && !i.pattern.test(String(u))) {
        b(!1, i.message || "格式不正确");
        return;
      }
      if (i.validator) {
        i.validator(i, u, (S) => {
          b(!S, S == null ? void 0 : S.message);
        });
        return;
      }
      b(!0);
    }, y = () => {
      var u;
      n.value = "", s.value = "", a.value = !1;
      const i = (u = o == null ? void 0 : o.props) == null ? void 0 : u.model;
      i && l.prop && (i[l.prop] = void 0);
    }, h = () => {
      n.value = "", s.value = "", a.value = !1;
    }, c = {
      prop: l.prop || "",
      validate: P,
      resetField: y,
      clearValidate: h
    };
    return he(() => {
      var i;
      l.prop && ((i = o == null ? void 0 : o.addFormItem) == null || i.call(o, c));
    }), ft(() => {
      var i;
      l.prop && ((i = o == null ? void 0 : o.removeFormItem) == null || i.call(o, c));
    }), xe(() => l.error, (i) => {
      i ? (n.value = "error", s.value = i) : (n.value = "", s.value = "");
    }, { immediate: !0 }), e({
      validate: P,
      resetField: y,
      clearValidate: h
    }), (i, u) => (v(), _("div", {
      class: N(["lp-form-item", {
        "lp-form-item--error": n.value === "error",
        "lp-form-item--success": n.value === "success",
        "lp-form-item--validating": n.value === "validating",
        "lp-form-item--required": p.value,
        [`lp-form-item--${d.value}`]: d.value,
        [`lp-form-item--${r.value}`]: r.value
      }])
    }, [
      i.label || i.$slots.label ? (v(), _("label", {
        key: 0,
        class: "lp-form-item__label",
        style: ae(f.value),
        for: C.value
      }, [
        H(i.$slots, "label", {}, () => [
          be(G(i.label), 1)
        ]),
        g.value ? (v(), _("span", tn, G(g.value), 1)) : R("", !0)
      ], 12, en)) : R("", !0),
      T("div", on, [
        H(i.$slots, "default"),
        te(ht, { name: "lp-zoom-in-top" }, {
          default: ge(() => [
            E.value ? (v(), _("div", {
              key: 0,
              class: N(["lp-form-item__error", {
                "lp-form-item__error--inline": i.inlineMessage
              }])
            }, G(s.value), 3)) : R("", !0)
          ]),
          _: 1
        })
      ])
    ], 2));
  }
});
let ln = {
  install: (t) => {
    t.component(ot.name, ot), t.component(nt.name, nt);
  }
};
const sn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpForm: ot,
  LpFormItem: nt,
  default: ln
}, Symbol.toStringTag, { value: "Module" })), an = {
  key: 0,
  class: "lp-input__prepend"
}, rn = { class: "lp-input__wrapper" }, un = {
  key: 0,
  class: "lp-input__prefix"
}, cn = ["type", "value", "placeholder", "disabled", "readonly", "maxlength", "minlength", "autocomplete", "name", "form", "tabindex"], dn = {
  key: 1,
  class: "lp-input__suffix"
}, pn = {
  key: 1,
  class: "lp-input__append"
}, fn = {
  name: "LpInput"
}, jt = /* @__PURE__ */ q({
  ...fn,
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
  setup(t, { expose: e, emit: l }) {
    const o = t, n = l, s = we("lpFormItem", null), a = L(), d = L(!1);
    L(!1);
    const r = L(!1), p = L(!1), g = z(() => o.size || (s == null ? void 0 : s.size) || "default"), E = async () => {
      var m;
      await Oe(), (m = a.value) == null || m.focus();
    }, f = () => {
      var m;
      (m = a.value) == null || m.blur();
    }, C = () => {
      var m;
      (m = a.value) == null || m.select();
    }, O = () => {
      var m;
      n("update:modelValue", ""), n("input", ""), n("change", ""), n("clear"), o.validateEvent && ((m = s == null ? void 0 : s.validate) == null || m.call(s, "change"));
    }, A = (m) => {
      var ee;
      const V = m.target;
      let { value: K } = V;
      r.value || (n("update:modelValue", K), n("input", K), o.validateEvent && ((ee = s == null ? void 0 : s.validate) == null || ee.call(s, "input")));
    }, P = (m) => {
      var ee;
      const V = m.target, { value: K } = V;
      n("change", K), o.validateEvent && ((ee = s == null ? void 0 : s.validate) == null || ee.call(s, "change"));
    }, w = (m) => {
      d.value = !0, n("focus", m);
    }, y = (m) => {
      var V;
      d.value = !1, n("blur", m), o.validateEvent && ((V = s == null ? void 0 : s.validate) == null || V.call(s, "blur"));
    }, h = () => {
      d.value || E();
    }, c = (m) => {
      m.stopPropagation(), O();
    }, i = () => {
      p.value = !p.value, E();
    }, u = (m) => {
      n("keydown", m);
    }, b = (m) => {
      n("keyup", m);
    }, S = () => {
      r.value = !0;
    }, x = () => {
    }, k = (m) => {
      r.value = !1, A(m);
    };
    return e({
      focus: E,
      blur: f,
      select: C,
      clear: O,
      input: a
    }), (m, V) => (v(), _("div", {
      class: N(["lp-input", {
        "lp-input--disabled": m.disabled,
        "lp-input--readonly": m.readonly,
        "lp-input--clearable": m.clearable && !m.disabled && !m.readonly,
        "lp-input--prefix": m.$slots.prefix || m.prefixIcon,
        "lp-input--suffix": m.$slots.suffix || m.suffixIcon || m.clearable || m.showPassword,
        "lp-input--password": m.showPassword,
        [`lp-input--${g.value}`]: g.value
      }]),
      onClick: h
    }, [
      m.$slots.prepend ? (v(), _("div", an, [
        H(m.$slots, "prepend")
      ])) : R("", !0),
      T("div", rn, [
        m.$slots.prefix || m.prefixIcon ? (v(), _("span", un, [
          H(m.$slots, "prefix", {}, () => [
            m.prefixIcon ? (v(), _("i", {
              key: 0,
              class: N(m.prefixIcon)
            }, null, 2)) : R("", !0)
          ])
        ])) : R("", !0),
        T("input", {
          ref_key: "inputRef",
          ref: a,
          class: "lp-input__inner",
          type: p.value ? "text" : m.type,
          value: m.modelValue,
          placeholder: m.placeholder,
          disabled: m.disabled,
          readonly: m.readonly,
          maxlength: m.maxlength,
          minlength: m.minlength,
          autocomplete: m.autocomplete,
          name: m.name,
          form: m.form,
          tabindex: m.tabindex,
          onInput: A,
          onChange: P,
          onFocus: w,
          onBlur: y,
          onKeydown: u,
          onKeyup: b,
          onCompositionstart: S,
          onCompositionupdate: x,
          onCompositionend: k
        }, null, 40, cn),
        m.$slots.suffix || m.suffixIcon || m.clearable || m.showPassword ? (v(), _("span", dn, [
          H(m.$slots, "suffix", {}, () => [
            m.clearable && !m.disabled && !m.readonly && m.modelValue ? (v(), _("i", {
              key: 0,
              class: "lp-input__clear lp-icon-circle-close",
              onClick: c
            })) : R("", !0),
            m.showPassword ? (v(), _("i", {
              key: 1,
              class: N(["lp-input__password", p.value ? "lp-icon-view" : "lp-icon-hide"]),
              onClick: i
            }, null, 2)) : R("", !0),
            m.suffixIcon ? (v(), _("i", {
              key: 2,
              class: N(m.suffixIcon)
            }, null, 2)) : R("", !0)
          ])
        ])) : R("", !0)
      ]),
      m.$slots.append ? (v(), _("div", pn, [
        H(m.$slots, "append")
      ])) : R("", !0)
    ], 2));
  }
}), hn = { class: "lp-input-number__input-box" }, mn = {
  key: 0,
  class: "lp-input-number__prepend"
}, vn = ["value", "placeholder", "disabled", "readonly", "name", "autocomplete"], gn = {
  key: 1,
  class: "lp-input-number__append"
}, yn = {
  key: 2,
  class: "lp-input-number__controls"
}, _n = {
  name: "LpInputNumber"
}, Lt = /* @__PURE__ */ q({
  ..._n,
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
  setup(t, { expose: e, emit: l }) {
    const o = t, n = l, s = we("lpFormItem", null), a = L(), d = L(null), r = L(!1), p = L(null), g = z(() => o.size || (s == null ? void 0 : s.size) || "default"), E = z(() => {
      if (o.precision !== void 0)
        return o.precision;
      const $ = A(o.step), I = A(o.modelValue);
      return Math.max($, I);
    }), f = z(() => d.value !== null ? d.value : o.modelValue === void 0 || o.modelValue === null ? "" : typeof o.modelValue == "number" ? o.modelValue.toFixed(E.value) : String(o.modelValue)), C = z(() => o.disabled || o.max !== void 0 && o.modelValue !== void 0 && o.modelValue >= o.max), O = z(() => o.disabled || o.min !== void 0 && o.modelValue !== void 0 && o.modelValue <= o.min), A = ($) => {
      if ($ === void 0) return 0;
      const I = $.toString(), Z = I.indexOf(".");
      return Z !== -1 ? I.length - Z - 1 : 0;
    }, P = ($, I) => (I === void 0 && (I = E.value), parseFloat(Math.round($ * Math.pow(10, I)) / Math.pow(10, I) + "")), w = ($) => P($, E.value), y = ($) => o.max !== void 0 && $ > o.max ? o.max : o.min !== void 0 && $ < o.min ? o.min : $, h = ($) => o.stepStrictly ? (A(o.step), Math.round($ / o.step) * o.step) : $, c = () => {
      var $;
      ($ = a.value) == null || $.focus();
    }, i = () => {
      var $;
      ($ = a.value) == null || $.blur();
    }, u = () => {
      var $;
      ($ = a.value) == null || $.select();
    }, b = () => {
      if (C.value) return;
      const $ = o.modelValue || 0, I = y(w($ + o.step));
      x(I);
    }, S = () => {
      if (O.value) return;
      const $ = o.modelValue || 0, I = y(w($ - o.step));
      x(I);
    }, x = ($) => {
      var Z;
      const I = o.modelValue;
      $ !== void 0 && ($ = h(w($)), $ = y($)), I !== $ && (d.value = null, n("update:modelValue", $), n("change", $, I), o.validateEvent && ((Z = s == null ? void 0 : s.validate) == null || Z.call(s, "change")));
    }, k = ($) => {
      const Z = $.target.value;
      if (d.value = Z, Z === "") {
        n("update:modelValue", void 0), n("input", void 0);
        return;
      }
      const U = Number(Z);
      isNaN(U) || n("input", U);
    }, m = () => {
      const $ = d.value;
      if ($ === null || $ === "") {
        x(void 0);
        return;
      }
      const I = Number($);
      if (isNaN(I)) {
        d.value = null;
        return;
      }
      x(I);
    }, V = ($) => {
      r.value = !0, n("focus", $);
    }, K = ($) => {
      var I;
      r.value = !1, d.value = null, n("blur", $), o.validateEvent && ((I = s == null ? void 0 : s.validate) == null || I.call(s, "blur"));
    }, ee = ($) => {
      switch ($.key) {
        case "ArrowUp":
          $.preventDefault(), b();
          break;
        case "ArrowDown":
          $.preventDefault(), S();
          break;
      }
    }, Q = ($, I) => {
      if (I.button !== 0) return;
      const Z = $ === "increase" ? b : S;
      Z(), p.value = setTimeout(() => {
        const U = setInterval(Z, 100), Y = () => {
          clearInterval(U), document.removeEventListener("mouseup", Y);
        };
        document.addEventListener("mouseup", Y);
      }, 300);
    }, oe = () => {
      p.value && (clearTimeout(p.value), p.value = null);
    };
    return xe(
      () => o.modelValue,
      ($) => {
        d.value = null;
      },
      { immediate: !0 }
    ), e({
      focus: c,
      blur: i,
      select: u,
      increase: b,
      decrease: S
    }), ($, I) => (v(), _("div", {
      class: N(["lp-input-number", {
        "lp-input-number--disabled": $.disabled,
        "lp-input-number--controls-right": $.controlsPosition === "right",
        [`lp-input-number--${g.value}`]: g.value
      }])
    }, [
      $.controlsPosition !== "right" ? (v(), _("span", {
        key: 0,
        class: N(["lp-input-number__decrease", {
          "lp-input-number__decrease--disabled": O.value
        }]),
        onMousedown: I[0] || (I[0] = (Z) => Q("decrease", Z)),
        onMouseup: oe,
        onMouseleave: oe
      }, I[4] || (I[4] = [
        T("i", { class: "lp-input-number__decrease-icon text" }, "-", -1)
      ]), 34)) : R("", !0),
      T("div", hn, [
        $.$slots.prepend ? (v(), _("div", mn, [
          H($.$slots, "prepend")
        ])) : R("", !0),
        T("input", {
          ref_key: "inputRef",
          ref: a,
          class: N(["lp-input-number__inner", {
            "lp-input-number__inner--with-prepend": $.$slots.prepend,
            "lp-input-number__inner--with-append": $.$slots.append
          }]),
          type: "text",
          value: f.value,
          placeholder: $.placeholder,
          disabled: $.disabled,
          readonly: $.readonly,
          name: $.name,
          autocomplete: $.autocomplete,
          onInput: k,
          onChange: m,
          onFocus: V,
          onBlur: K,
          onKeydown: ee
        }, null, 42, vn),
        $.$slots.append ? (v(), _("div", gn, [
          H($.$slots, "append")
        ])) : R("", !0)
      ]),
      $.controlsPosition !== "right" ? (v(), _("span", {
        key: 1,
        class: N(["lp-input-number__increase", {
          "lp-input-number__increase--disabled": C.value
        }]),
        onMousedown: I[1] || (I[1] = (Z) => Q("increase", Z)),
        onMouseup: oe,
        onMouseleave: oe
      }, I[5] || (I[5] = [
        T("i", { class: "lp-input-number__increase-icon text" }, "+", -1)
      ]), 34)) : R("", !0),
      $.controlsPosition === "right" ? (v(), _("div", yn, [
        T("span", {
          class: N(["lp-input-number__increase", {
            "lp-input-number__increase--disabled": C.value
          }]),
          onMousedown: I[2] || (I[2] = (Z) => Q("increase", Z)),
          onMouseup: oe,
          onMouseleave: oe
        }, I[6] || (I[6] = [
          T("i", { class: "lp-input-number__increase-icon" }, "▲", -1)
        ]), 34),
        T("span", {
          class: N(["lp-input-number__decrease", {
            "lp-input-number__decrease--disabled": O.value
          }]),
          onMousedown: I[3] || (I[3] = (Z) => Q("decrease", Z)),
          onMouseup: oe,
          onMouseleave: oe
        }, I[7] || (I[7] = [
          T("i", { class: "lp-input-number__decrease-icon" }, "▼", -1)
        ]), 34)
      ])) : R("", !0)
    ], 2));
  }
});
let bn = {
  install: (t) => {
    t.component(jt.name, jt), t.component(Lt.name, Lt);
  }
};
const wn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bn
}, Symbol.toStringTag, { value: "Module" })), $n = /* @__PURE__ */ q({
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
  emits: ["enter", "leave", "afterEnter"],
  setup(t, { emit: e }) {
    const l = e, o = (r) => {
      r instanceof HTMLElement && (r.getBoundingClientRect(), Oe(() => {
        const p = r.offsetHeight, g = r.offsetWidth;
        l("enter", r, {
          height: p,
          width: g
        });
      }));
    }, n = (r) => {
      r instanceof HTMLElement && (r.style.overflowY = "", r.style.overflowX = ""), l("afterEnter", r);
    }, s = (r) => {
    }, a = (r) => {
      l("leave", r);
    }, d = (r) => {
      l("leave", r);
    };
    return he(() => {
    }), (r, p) => (v(), fe(ht, {
      name: t.name,
      onBeforeEnter: o,
      onAfterEnter: n,
      onBeforeLeave: s,
      onAfterLeave: a,
      onLeaveCancelled: d
    }, {
      default: ge(() => [
        H(r.$slots, "default")
      ]),
      _: 3
    }, 8, ["name"]));
  }
});
function Cn() {
  const t = L(null), e = L(null), l = L(null), o = L(null), n = L(8), s = ne({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }), a = ne({
    position: "absolute",
    width: "14px",
    height: "14px",
    backgroundColor: "#fff",
    transform: "rotate(45deg)"
  }), d = L(!1);
  function r() {
    var u;
    if (!((u = e.value) != null && u.arrow) || !o.value) return;
    const c = e.value.arrowSize || n.value, [, i = "center"] = (e.value.position || "bottom-center").split("-");
    switch (Object.assign(a, {
      position: "absolute",
      width: `${c}px`,
      height: `${c}px`,
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
        if (a.bottom = `-${c / 2}px`, i === "start") {
          const b = s.width / 2;
          a.left = `${b}px`, a.marginLeft = `-${c / 2}px`;
        } else if (i === "end") {
          const b = s.width / 2;
          a.right = `${b}px`, a.marginRight = `-${c / 2}px`;
        } else
          a.left = "50%", a.marginLeft = `-${c / 2}px`;
        break;
      case "right":
        if (a.left = `-${c / 2}px`, i === "start") {
          const b = s.height / 2;
          a.top = `${b}px`, a.marginTop = `-${c / 2}px`;
        } else if (i === "end") {
          const b = s.height / 2;
          a.bottom = `${b}px`, a.marginBottom = `-${c / 2}px`;
        } else
          a.top = "50%", a.marginTop = `-${c / 2}px`;
        break;
      case "bottom":
        if (a.top = `-${c / 2}px`, i === "start") {
          const b = s.width / 2;
          a.left = `${b}px`, a.marginLeft = `-${c / 2}px`;
        } else if (i === "end") {
          const b = s.width / 2;
          a.right = `${b}px`, a.marginRight = `-${c / 2}px`;
        } else
          a.left = "50%", a.marginLeft = `-${c / 2}px`;
        break;
      case "left":
        if (a.right = `-${c / 2}px`, i === "start") {
          const b = s.height / 2;
          a.top = `${b}px`, a.marginTop = `-${c / 2}px`;
        } else if (i === "end") {
          const b = s.height / 2;
          a.bottom = `${b}px`, a.marginBottom = `-${c / 2}px`;
        } else
          a.top = "50%", a.marginTop = `-${c / 2}px`;
        break;
    }
  }
  function p(c) {
    return c.getBoundingClientRect();
  }
  function g(c, i, u, b) {
    switch (b) {
      case "start":
        return c;
      case "end":
        return c + i - u;
      case "center":
      default:
        return c + (i - u) / 2;
    }
  }
  function E(c, i, u, b) {
    switch (b) {
      case "start":
        return c;
      case "end":
        return c + i - u;
      case "center":
      default:
        return c + (i - u) / 2;
    }
  }
  function f(c, i, u, b, S, x) {
    let k = 0;
    return c < 0 && (k += Math.abs(c)), c + u > S && (k += c + u - S), i < 0 && (k += Math.abs(i)), i + b > x && (k += i + b - x), k;
  }
  function C(c, i, u, b, S) {
    const x = c.map((k) => {
      const m = f(
        k.x,
        k.y,
        i,
        u,
        b,
        S
      );
      return { ...k, overflow: m };
    });
    return x.sort((k, m) => k.overflow - m.overflow), x[0];
  }
  function O(c, i, u, b, S, x, k) {
    if (!S || !e.value) {
      console.error("calculateFollowPosition - missing container or options:", {
        container: !!S,
        options: !!e.value
      });
      return;
    }
    s.x = c + u / 2, s.y = i + b / 2, s.width = u, s.height = b;
    const m = S.getBoundingClientRect(), V = m.width, K = m.height;
    if (V === 0 || K === 0) {
      setTimeout(() => {
        O(c, i, u, b, S, x, k);
      }, 100);
      return;
    }
    const ee = window.innerWidth, Q = window.innerHeight, [oe, $ = "center"] = e.value.position.split("-");
    let I = [];
    const Z = e.value.arrowSize || n.value, U = e.value.arrow ? Z : 0, Y = {
      left: {
        x: c - V - U,
        y: E(i, b, K, $)
      },
      right: {
        x: c + u + U,
        y: E(i, b, K, $)
      },
      top: {
        x: g(c, u, V, $),
        y: i - K - U
      },
      bottom: {
        x: g(c, u, V, $),
        y: i + b + U
      }
    }, Fe = Y[oe];
    Fe && I.push({ direction: oe, ...Fe });
    const Ee = ["top", "right", "bottom", "left"];
    let je = Ee.indexOf(oe);
    if (je !== -1)
      for (let j = 1; j < Ee.length; j++) {
        const X = Ee[(je + j) % Ee.length];
        I.push({
          direction: X,
          ...Y[X]
        });
      }
    const Te = C(I, V, K, ee, Q);
    o.value = Te.direction, r(), x.left = `${Te.x}px`, x.top = `${Te.y}px`, x.transform = "", x.right = "", x.bottom = "", k && k();
  }
  function A(c, i, u, b) {
    if (!e.value) return;
    const { clientX: S, clientY: x } = c;
    O(S, x, 0, 0, i, u, b);
  }
  function P(c, i, u) {
    if (!t.value) {
      console.error("updateFollowPosition - no follow target set");
      return;
    }
    if (typeof t.value != "string") {
      if (!e.value) {
        console.error("updateFollowPosition - missing follow options");
        return;
      }
      try {
        if (!(t.value instanceof HTMLElement)) {
          console.error("updateFollowPosition - target is not an HTMLElement:", t.value);
          return;
        }
        if (!document.body.contains(t.value)) {
          console.error("updateFollowPosition - target not in document");
          return;
        }
        const b = p(t.value), { x: S, y: x, width: k, height: m } = b;
        O(S, x, k, m, c, i, u);
      } catch (b) {
        console.error("updateFollowPosition - error calculating position:", b);
      }
    }
  }
  function w(c, i, u) {
    var m;
    l.value && cancelAnimationFrame(l.value);
    const S = 1e3 / (((m = e.value) == null ? void 0 : m.fps) || 60);
    let x = 0;
    const k = (V) => {
      l.value = requestAnimationFrame(k), !(V - x < S) && (x = V, P(c, i, u));
    };
    l.value = requestAnimationFrame(k);
  }
  function y(c, i, u, b) {
    var S;
    return c ? (t.value = c.target, e.value = c.options, d.value = ((S = e.value) == null ? void 0 : S.arrow) || !1, e.value.arrow && (n.value = e.value.arrowSize || 8, r()), typeof t.value == "string" && t.value === "mouse" ? window.addEventListener(
      "mousemove",
      (x) => A(x, i, u, b)
    ) : (P(i, u, b), e.value && e.value.fps ? w(i, u, b) : (window.addEventListener(
      "resize",
      () => P(i, u, b)
    ), window.addEventListener(
      "scroll",
      () => P(i, u, b),
      !0
    ))), !0) : !1;
  }
  function h() {
    window.removeEventListener("mousemove", A), window.removeEventListener("resize", P), window.removeEventListener("scroll", P, !0), l.value && (cancelAnimationFrame(l.value), l.value = null);
  }
  return {
    followTarget: t,
    followOptions: e,
    followAnimationFrame: l,
    arrowDirection: o,
    arrowSize: n,
    arrowStyle: a,
    targetCenter: s,
    showArrow: d,
    initFollow: y,
    updateFollowPosition: P,
    updateArrowStyle: r,
    cleanup: h
  };
}
function Sn(t) {
  return new Promise((e, l) => {
    let o;
    const n = () => {
      const s = t();
      s !== void 0 ? (cancelAnimationFrame(o), e(s)) : o = requestAnimationFrame(n);
    };
    o = requestAnimationFrame(n);
  });
}
function Pt(t, e = "px") {
  return t ? typeof t == "string" ? t : `${t}${e}` : "";
}
function It(t, e) {
  console.warn(`[${t}] ${e}`);
}
function kn(t, e) {
  throw new Error(`[${t}] ${e}`);
}
function Ue(t) {
  return typeof t == "number";
}
function En(t) {
  return t !== null && typeof t == "object";
}
function no(t, e) {
  let l = Array.isArray(t) ? [...t] : [t], o = !1, n = !1;
  const s = () => {
    const p = [];
    for (const g of l)
      typeof g == "string" ? document.querySelectorAll(g).forEach((E) => p.push(E)) : g instanceof HTMLElement && p.push(g);
    return p;
  }, a = (p) => {
    o = s().some((E) => E.contains(p.target));
  }, d = (p) => {
    if (!n)
      return;
    const E = s().some((f) => f.contains(p.target));
    (!o || !E) && e();
  }, r = () => {
    n && e();
  };
  return document.addEventListener("mousedown", a), document.addEventListener("click", d), window.addEventListener("blur", r), setTimeout(() => {
    n = !0;
  }, 0), {
    unbind: () => {
      document.removeEventListener("mousedown", a), document.removeEventListener("click", d), window.removeEventListener("blur", r);
    },
    appendSelector: (p) => {
      const g = Array.isArray(p) ? p : [p];
      l.push(...g);
    }
  };
}
const Tn = {
  name: "lp-layer"
}, xn = /* @__PURE__ */ q({
  ...Tn,
  props: {
    position: {
      type: Object,
      default: () => ({})
    },
    zIndex: {
      type: Number,
      default: 1e3
    },
    transition: {
      type: String,
      default: "fade"
      // 可选值: fade, zoom, slide-top, slide-bottom, slide-left, slide-right
    },
    /**
     * 层管理对象
     */
    layerObj: {
      type: Object,
      default: () => ({
        getTransitionComponent: () => null
      })
    },
    follow: {
      type: [Object, null],
      default: null
    },
    /**
     * 是否启用resize过渡
     * @todo 当宽高为自动时, 修改大小后,是否需要开启过渡效果
     */
    enableResizeTransition: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["after-leave", "close"],
  setup(t, { expose: e, emit: l }) {
    const o = Eo(), n = t, s = l, a = L(!1), d = L(null), r = L(null), p = L(!1), g = L(!1), { showArrow: E, arrowStyle: f, initFollow: C, updateFollowPosition: O, cleanup: A } = Cn();
    n.follow && n.follow.target && (p.value = !0);
    const P = [], w = L(!1), y = ne({
      zIndex: n.zIndex,
      position: "fixed"
    }), h = ne({});
    n.layerObj.options.useBodyScroll && (h["overflow-x"] = "auto", h["overflow-y"] = "auto");
    let c = null;
    n.layerObj.getTransitionComponent() ? c = n.layerObj.getTransitionComponent() : c = $n;
    const i = L("");
    let u = {
      /**
       * 是否过渡完成
       */
      enter: !1,
      width: 0,
      height: 0
    };
    const b = L(!1);
    function S() {
      i.value = `lp-${n.transition}`;
    }
    S();
    function x(j) {
      u.enter = !0, u.width = j.offsetWidth, u.height = j.offsetHeight;
    }
    function k(j) {
      b.value = !0;
    }
    async function m(j) {
      return j.zIndex = "-100", j.opacity = "0", Object.assign(y, j), await Sn(() => {
        if (u.enter)
          return !0;
      }), u;
    }
    const V = L(!1), K = 1;
    async function ee() {
      var ye;
      const { width: j, height: X, x: W, y: F, reverse: ie } = n.position || {}, M = {
        zIndex: n.zIndex,
        position: "fixed",
        transform: "",
        top: "",
        left: "",
        right: "",
        bottom: "",
        width: "",
        height: ""
      };
      j && (M.width = typeof j == "number" ? `${j}px` : j), X && (M.height = typeof X == "number" ? `${X}px` : X);
      let le = [];
      ie ? (W === "center" || W === void 0 ? (M.left = "50%", le.push("translateX(-50%)")) : W === "right" ? M.right = "0" : typeof W == "number" ? M.right = `${W}px` : W ? M.right = W : M.left = "0", F === "center" || F === void 0 ? (M.top = "50%", le.push("translateY(-50%)")) : F === "top" ? M.top = "50px" : F === "bottom" ? M.bottom = "0" : typeof F == "number" ? M.bottom = `${F}px` : F ? M.bottom = F : M.top = "0") : (W === "center" || W === void 0 ? (M.left = "50%", le.push("translateX(-50%)")) : W === "right" ? M.right = "0" : typeof W == "number" ? M.left = `${W}px` : W ? M.left = W : M.left = "0", F === "center" || F === void 0 ? (M.top = "50%", le.push("translateY(-50%)")) : F === "top" ? M.top = "50px" : F === "bottom" ? M.bottom = "50px" : typeof F == "number" ? M.top = `${F}px` : F ? M.top = F : M.top = "0"), le.length > 0 && (M.transform = le.join(" ")), (ye = n.layerObj.options) != null && ye.group ? (await m(M), Oe(() => {
        var _e;
        (_e = n.layerObj.options) != null && _e.group && n.layerObj.options.group.computePosition(M, n.layerObj);
      })) : (j === "auto" || !j || X == "auto" || !X || W == "center" || !W || F == "center" || !F) && (await m(M), $(M)), M.opacity = "1", M.zIndex = n.zIndex, Object.assign(y, M);
    }
    const Q = L(null);
    async function oe() {
      a.value = !0, y.opacity = "0", n.follow && n.follow.target ? C(n.follow, r.value, y, () => {
        g.value || (g.value = !0, y.opacity = "1", setTimeout(() => {
          p.value = !1;
        }, 50));
      }) : (await ee(), g.value = !0, y.opacity = "1");
    }
    function $(j, X = !1) {
      var Ne, me;
      const W = (Ne = j.transform) == null ? void 0 : Ne.includes("translateX(-50%)"), F = (me = j.transform) == null ? void 0 : me.includes("translateY(-50%)");
      if (!X && !W && !F || !u.width || !u.height) return;
      const ie = u.width, M = u.height, le = window.innerWidth, ye = window.innerHeight;
      let _e = [];
      j.transform && j.transform.split(" ").forEach((We) => {
        We.includes("translate") || _e.push(We);
      }), (W || X) && (Math.abs(ie - le) <= 1 || ie >= le ? j.left = "0" : j.left = `calc(50% - ${Math.floor(ie / 2)}px)`), (F || X) && (Math.abs(M - ye) <= 1 || M >= ye ? j.top = "0" : j.top = `calc(50% - ${Math.floor(M / 2)}px)`), _e.length > 0 ? j.transform = _e.join(" ") : j.transform = "";
    }
    const I = (j = "layer") => {
      a.value = !1, w.value = !0, n.follow && n.follow.target && A(), s("close"), P.forEach(({ event: X, callback: W }) => {
        X === "close" && W && W();
      });
    };
    function Z() {
      w.value = !1, s("after-leave");
    }
    n.layerObj.setLayerInstance(o);
    let U = null, Y = null;
    L(!1);
    function Fe() {
      if (U) return;
      const { width: j, height: X } = n.position || {};
      U = new ResizeObserver(async (W) => {
        if (!V.value)
          for (const F of W) {
            const ie = F.contentRect.width, M = F.contentRect.height, le = u.width, ye = u.height, _e = Math.abs(ie - le), Ne = Math.abs(M - ye);
            if (_e > K || Ne > K) {
              if (u.width = ie, u.height = M, n.follow && n.follow.target)
                O(r.value, y);
              else if (g.value) {
                const me = { ...y }, We = n.enableResizeTransition && le > 0 && ye > 0, { width: zi, height: Ai } = n.position || {};
                We ? (V.value = !0, U && Y && U.unobserve(Y), me.transition = "left 0.3s, top 0.3s, width 0.3s, height 0.3s", Object.assign(y, me), $(me, !0), requestAnimationFrame(() => {
                  Object.assign(y, me);
                }), setTimeout(() => {
                  if (y.transition = "", U && Y) {
                    U.observe(Y);
                    const De = Y.getBoundingClientRect(), $o = Math.abs(De.width - u.width), Co = Math.abs(De.height - u.height);
                    if ($o > K || Co > K) {
                      u.width = De.width, u.height = De.height;
                      const $t = { ...y };
                      $($t, !0), Object.assign(y, $t);
                    }
                  }
                  setTimeout(() => {
                    V.value = !1;
                  }, 50);
                }, 300)) : ($(me, !0), Object.assign(y, me));
              }
            }
          }
      }), Oe(() => {
        const W = r.value;
        U && W && (Y = W, U.observe(W));
      });
    }
    Je("lp-layer:core", {
      on: (j, X) => {
        P.push({
          event: j,
          callback: X
        });
      },
      off: (j, X) => {
        let W = P.findIndex((F) => F.event === j && F.callback === X);
        W !== -1 && P.splice(W, 1);
      }
    });
    function Ee(j) {
      if (V.value) {
        console.log("已在进行resize操作，忽略此次调用");
        return;
      }
      V.value = !0;
      const X = parseInt(y.width) || u.width, W = parseInt(y.height) || u.height;
      U && Y && (console.log("暂停尺寸检测，开始缩放"), U.unobserve(Y));
      const F = { ...y };
      F.transition = "width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease, transform 0.3s ease", console.log("resizeLayer", j);
      let ie, M;
      typeof j == "number" ? (ie = Math.round(X * j), M = Math.round(W * j), F.width = `${ie}px`, F.height = `${M}px`) : (ie = j.width, M = j.height, F.width = `${ie}px`, F.height = `${M}px`), u.width, u.height, u.width = ie, u.height = M, $(F, !0), Object.assign(y, F), setTimeout(() => {
        if (y.transition = "", U && Y) {
          console.log("缩放结束，恢复尺寸检测"), U.observe(Y);
          const le = Y.getBoundingClientRect();
          u.width = le.width, u.height = le.height;
        }
        setTimeout(() => {
          V.value = !1;
        }, 50);
      }, 300);
    }
    function je() {
      if (V.value) {
        console.log("已在进行resize操作，忽略此次全屏调用");
        return;
      }
      V.value = !0, Q.value || (Q.value = {
        width: y.width,
        height: y.height,
        left: y.left,
        top: y.top,
        right: y.right,
        bottom: y.bottom,
        transform: y.transform
      }), U && Y && (console.log("暂停尺寸检测，开始全屏"), U.unobserve(Y));
      const j = { ...y };
      j.transition = "width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease, transform 0.3s ease", Object.assign(j, {
        width: "100vw",
        height: "100vh",
        left: "0",
        top: "0",
        right: "",
        bottom: "",
        transform: ""
      }), u.width, u.height, u.width = window.innerWidth, u.height = window.innerHeight, Object.assign(y, j), setTimeout(() => {
        if (y.transition = "", U && Y) {
          console.log("全屏结束，恢复尺寸检测"), U.observe(Y);
          const X = Y.getBoundingClientRect();
          u.width = X.width, u.height = X.height;
        }
        setTimeout(() => {
          V.value = !1;
        }, 50);
      }, 300);
    }
    function Te() {
      if (!Q.value) return;
      if (V.value) {
        console.log("已在进行resize操作，忽略此次退出全屏调用");
        return;
      }
      V.value = !0, U && Y && (console.log("暂停尺寸检测，退出全屏"), U.unobserve(Y));
      const j = { ...y };
      j.transition = "width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease, transform 0.3s ease";
      const X = parseInt(Q.value.width) || 0, W = parseInt(Q.value.height) || 0;
      u.width = X || 300, u.height = W || 200, Object.assign(j, Q.value), Object.assign(y, j), Q.value = null, setTimeout(() => {
        if (y.transition = "", U && Y) {
          console.log("退出全屏结束，恢复尺寸检测"), U.observe(Y);
          const F = Y.getBoundingClientRect();
          u.width = F.width, u.height = F.height;
        }
        setTimeout(() => {
          V.value = !1;
        }, 50);
      }, 300);
    }
    return e({
      close: I,
      updatePosition: () => {
        n.follow ? O(r.value, y) : ee();
      },
      changeContainerStyle: (j) => {
        Object.assign(y, j);
      },
      getContainerStyle: () => y,
      getInstance: () => o,
      // 全屏切换功能
      toggleFullscreen: () => {
        y.width === "100vw" && y.height === "100vh" ? Te() : je();
      },
      // 进入全屏
      useFullscreen: () => {
        je();
      },
      // 退出全屏
      exitFullscreen: () => {
        Te();
      },
      // 调整大小
      resizeLayer: (j) => {
        Ee(j);
      }
    }), he(() => {
      if (y.zIndex = n.zIndex, oe(), Fe(), n.layerObj.options.useOutsideClose) {
        let j = no(r.value, () => {
          s("close"), j.unbind();
        });
      }
    }), mt(() => {
      n.follow && n.follow.target && A(), U && U.disconnect(), Y = null;
    }), (j, X) => (v(), _("div", {
      class: N(["lp-layer-container", { closeing: w.value }]),
      style: ae(y),
      ref_key: "containerRef",
      ref: r
    }, [
      (v(), fe(vt(B(c)), {
        name: i.value,
        disabled: p.value,
        onEnter: x,
        onAfterEnter: k,
        onLeave: Z
      }, {
        default: ge(() => [
          gt(T("div", {
            class: "lp-layer",
            ref_key: "layerRef",
            ref: d
          }, [
            n.follow && B(E) ? (v(), _("div", {
              key: 0,
              class: "lp-layer-arrow",
              style: ae(B(f))
            }, null, 4)) : R("", !0),
            T("div", {
              class: "lp-layer-body",
              style: ae(h)
            }, [
              H(j.$slots, "default")
            ], 4)
          ], 512), [
            [oo, a.value]
          ])
        ]),
        _: 3
      }, 40, ["name", "disabled"]))
    ], 6));
  }
}), On = { class: "lp-dialog" }, jn = { class: "lp-dialog__header flex align-center justify-between" }, Ln = { class: "lp-dialog__title" }, Pn = { class: "lp-dialog__body" }, In = {
  key: 0,
  class: "lp-dialog__footer"
}, lo = {
  __name: "dialog",
  props: {
    title: {
      type: String,
      default: "title"
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
  setup(t, { emit: e }) {
    const l = e, o = () => {
      l("confirm"), n();
    }, n = () => {
      l("close");
    };
    return (s, a) => (v(), _("div", On, [
      T("div", jn, [
        T("div", Ln, G(t.title), 1),
        t.showClose ? (v(), _("div", {
          key: 0,
          class: "lp-dialog__close",
          onClick: n
        }, [
          te(B(ue), {
            class: "lp-dialog-close_icon",
            is: "close",
            size: "18px"
          })
        ])) : R("", !0)
      ]),
      T("div", Pn, [
        H(s.$slots, "default")
      ]),
      t.showFooter ? (v(), _("div", In, [
        H(s.$slots, "footer", {}, () => [
          T("button", {
            class: "btn btn-info",
            onClick: a[0] || (a[0] = (...d) => s.handleCancel && s.handleCancel(...d))
          }, "取消"),
          T("button", {
            class: "btn btn-primary",
            onClick: o
          }, "确定")
        ])
      ])) : R("", !0)
    ]));
  }
}, Mn = { class: "lp-drawer__header" }, zn = { class: "lp-drawer__title" }, An = { class: "lp-drawer__body" }, Bn = {
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
      validator: (t) => ["right", "left", "top", "bottom"].includes(t)
    }
  },
  emits: ["close"],
  setup(t, { emit: e }) {
    const l = t, o = e, n = z(() => `lp-drawer--${l.direction}`), s = () => {
      o("close");
    };
    return (a, d) => (v(), _("div", {
      class: N(["lp-drawer", [n.value]])
    }, [
      T("div", Mn, [
        T("span", zn, G(t.title), 1),
        t.showClose ? (v(), _("button", {
          key: 0,
          class: "lp-drawer__close",
          onClick: s
        }, "×")) : R("", !0)
      ]),
      T("div", An, [
        H(a.$slots, "default")
      ])
    ], 2));
  }
}, so = {
  appContext: null
}, Rn = /* @__PURE__ */ q({
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
  setup(t, { expose: e, emit: l }) {
    const o = L(!1), n = l, s = we("lp-layer:core");
    function a() {
      o.value = !0;
    }
    s.on("close", a);
    function d(p) {
      n("click", p);
    }
    function r(p) {
      console.log("setEventsNone", p), o.value = p;
    }
    return e({
      setEventsNone: r
    }), ft(() => {
      s.off("close", a);
    }), (p, g) => (v(), _("div", {
      class: N(["lp-mask", { "pointer-events-none": o.value }]),
      style: ae({ zIndex: t.zIndex }),
      onClick: d
    }, null, 6));
  }
});
let Xe = !1, ao = 0, Se = [];
function Vn() {
  if (Xe) return;
  Xe = !0, ao = window.scrollY || document.documentElement.scrollTop;
  const t = Fn();
  document.body.classList.add("lp-layer-lock-scroll"), document.body.style.width = `calc(100vw - ${t}px)`;
}
function Fn() {
  return window.innerWidth - document.documentElement.clientWidth;
}
function Nn() {
  Xe && (Xe = !1, document.body.classList.remove("lp-layer-lock-scroll"), document.body.style.width = "", window.scrollTo(0, ao));
}
function Wn(t) {
  Se.push(t), Se.some((l) => io(l)) && Vn();
}
function Dn(t) {
  let e = Se.indexOf(t);
  e !== -1 && Se.splice(e, 1), !Se.some((n) => io(n)) && Nn();
}
function io(t) {
  return t.options.lockBodyScroll !== null ? !!t.options.lockBodyScroll : !!t.options.useMask;
}
function Un() {
  return Se;
}
function He(t) {
  return Se.filter((e) => e.options.group === t);
}
class Hn {
  constructor(e = "x") {
    /**
     * 管理组模式
     * x: 水平管理组
     * y: 垂直管理组
     * xy: 水平和垂直管理组(排列一行满了，自动换行)
     */
    D(this, "mode", "x");
    /**
     * 管理组内部对齐方式(类似flex布局的justify-content)
     * start: 左对齐
     * center: 居中对齐
     * end: 右对齐
     * null: 不进行对齐
     */
    D(this, "justifyContent", "start");
    /**
     * 管理组内部对齐方式(类似flex布局的align-items)
     * start: 顶部对齐
     * center: 居中对齐
     * end: 底部对齐
     */
    D(this, "alignItems", "start");
    /**
     * 管理组内部边距
     * 控制弹出层在可渲染区域内
     */
    D(this, "paddingSize", 10);
    /**
     * 层与层之间的间距
     * 两个层之间的间距
     */
    D(this, "spaceSize", 16);
    /**
     * 位置过渡动画时长（毫秒）
     */
    D(this, "transitionDuration", 300);
    /**
     * 位置过渡动画函数
     */
    D(this, "transitionTimingFunction", "ease");
    /**
     * xy模式下每行的最大宽度
     */
    D(this, "rowMaxWidth", 0);
    /**
     * xy模式下单个项的标准宽度（0表示自动）
     */
    D(this, "itemWidth", 0);
    /**
     * xy模式下每行最大项数
     */
    D(this, "itemsPerRow", 0);
    D(this, "groupElement", null);
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
   * 计算层的位置
   * @param containerStyle 容器样式
   * @param layer 层对象
   */
  computePosition(e, l) {
    if (l.options.follow && l.options.follow.target)
      return;
    this.renderGroupElement(), this.initGroupContainerStyle(), He(this).filter((a) => a.layerElement && !a.closing);
    let n = l.getLayerInfo(), s = this.getOrCreatePlaceholder(l);
    s.style.width = `${n.width}px`, s.style.height = `${n.height}px`, this.mode === "xy" && this.itemWidth > 0 && (s.style.width = `${this.itemWidth}px`), requestAnimationFrame(() => {
      const a = s.getBoundingClientRect();
      e.transform = `translate(${a.left}px, ${a.top}px)`, e.top = "0", e.left = "0", this.mode !== "x" && (e.width = `${n.width}px`), this.mode !== "y" && (e.height = `${n.height}px`), l.layerElement && Object.entries(e).forEach(([d, r]) => {
        r != null && (l.layerElement.style[d] = r);
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
    let l = `p-${e.id}`, o = document.getElementById(l);
    return o || (o = document.createElement("div"), o.id = l, o.className = "lp-layer-placeholder", o.dataset.layerId = e.id, this.groupElement.appendChild(o)), o;
  }
  /**
   * 更新组内所有层的位置
   * @todo 在有元素被移除后, 需要重新计算位置
   */
  updateLayersPosition() {
    this.renderGroupElement();
    const l = He(this).filter((o) => o.layerElement && !o.closing);
    l.forEach((o) => {
      o.groupResetStatus = 1;
    }), this.cleanupPlaceholders(l), l.forEach((o) => {
      if (o.layerElement) {
        const n = o.getLayerInfo(), s = this.getOrCreatePlaceholder(o);
        s.style.width = `${n.width}px`, s.style.height = `${n.height}px`, this.mode === "xy" && this.itemWidth > 0 && (s.style.width = `${this.itemWidth}px`);
      }
    }), requestAnimationFrame(() => {
      l.forEach((o) => {
        if (o.layerElement) {
          const n = `p-${o.id}`, s = document.getElementById(n);
          if (s) {
            const a = s.getBoundingClientRect(), d = o.layerElement.style;
            let r = Object.assign({}, {
              transform: d.transform,
              transition: d.transition,
              top: d.top,
              left: d.left,
              right: d.right,
              bottom: d.bottom,
              width: d.width,
              height: d.height
            });
            r.transform = `translate(${a.left}px, ${a.top}px)`, r.transition = `transform ${this.transitionDuration}ms ${this.transitionTimingFunction}`, r.top = "0", r.left = "0";
            const p = o.getLayerInstance();
            p && p.exposed && p.exposed.changeContainerStyle(r);
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
    const l = this.groupElement.querySelectorAll(".lp-layer-placeholder"), o = new Set(e.map((n) => n.id));
    l.forEach((n) => {
      const s = n.getAttribute("data-layer-id");
      s && !o.has(s) && n.remove();
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
    return He(this).filter((l) => l.layerElement && !l.closing);
  }
}
let Gn = 1e3;
const Yn = {
  dialog: lo,
  drawer: Bn
  // 可以在这里添加更多容器类型
};
class ve {
  constructor() {
    /**
     * 层id
     */
    D(this, "id", "");
    D(this, "layerInstance", null);
    /**
     * 组重置状态
     * @todo 用于在层关闭时, 组内其它层需要重新计算位置
     */
    D(this, "groupResetStatus", 0);
    D(this, "options");
    D(this, "layerVnode", null);
    D(this, "contentVnode", null);
    D(this, "maskLayer", null);
    D(this, "closing", !1);
    D(this, "layerZIndex", 0);
    D(this, "maskZIndex", 0);
    D(this, "containerEl", null);
    D(this, "layerElement", null);
    D(this, "createTime", 0);
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
      lockBodyScroll: null
    };
  }
  // 为了兼容旧代码，提供vnode属性
  get vnode() {
    return this.layerVnode;
  }
  static src(e) {
    const l = new ve();
    return l.options.component = e, l.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), l.createTime = Date.now(), l;
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
    return typeof e == "string" ? this.options.containerComponent = Yn[e] || null : this.options.containerComponent = e, this.options.containerProps = l, this;
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
  follow(e, l) {
    if (typeof e != "string" && !(e instanceof HTMLElement))
      throw console.error("Layer.follow - invalid target type, must be HTMLElement or string"), new Error("Follow target must be an HTMLElement or string");
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
    return jo(this.options.component);
  }
  /**
   * 显示层
   * @param position 位置
   * @returns 
   */
  show(e = {}) {
    var r;
    this.closing = !1, this.options.follow && this.options.follow.target ? this.options.position = {
      width: e.width || "auto",
      height: e.height || "auto"
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
      onLayerResize: (p) => {
        console.log("缩放", p), this.layerInstance && this.layerInstance.exposed && this.layerInstance.exposed.resizeLayer(p);
      }
    };
    this.layerZIndex = this.options.zIndex || Gn++, this.maskZIndex = this.layerZIndex - 1;
    const o = (p = "layer") => {
      this.closing || (this.hide(p), this.options.events.close && this.options.events.close());
    }, n = this.getContentComponent();
    let s = te(n, {
      modelValue: this.options.model,
      ...this.options.props,
      "onUpdate:modelValue": (p) => {
        this.options.model && (this.options.model = p);
      },
      onClose: () => {
        o("content");
      },
      // 添加弹出层事件监听处理
      ...l,
      // 添加事件监听处理
      ...Object.keys(this.options.events).reduce((p, g) => (g !== "close" && (p[`on${g.charAt(0).toUpperCase() + g.slice(1)}`] = (...E) => {
        this.options.events[g] && this.options.events[g](...E);
      }), p), {})
    }), a = null;
    if (this.options.containerComponent) {
      const p = ((r = this.options.containerComponent) == null ? void 0 : r.default) || this.options.containerComponent, g = {
        ...this.options.containerProps,
        modelValue: this.options.containerModel,
        onClose: () => {
          o("container");
        },
        "onUpdate:modelValue": (E) => {
          this.options.containerModel && (this.options.containerModel = E);
        }
      };
      a = te(p, g, {
        default: () => [s]
      });
    } else
      a = s;
    return this.layerVnode = te(xn, {
      position: this.options.position,
      zIndex: this.layerZIndex,
      transition: this.options.transition,
      onClose: () => {
        o("layer");
      },
      onAfterLeave: () => {
        this.handleAfterLeave();
      },
      layerObj: this,
      follow: this.options.follow || null
    }, {
      default: () => [a]
    }), this.contentVnode = s, this.layerVnode.appContext = so.appContext, this.containerEl = this.getContainer(), this.options.useMask && this.createMask(o), Ct(this.layerVnode, this.containerEl), this.layerElement = this.containerEl.firstElementChild, this.getAppendTo().appendChild(this.layerElement), Wn(this), this.options.group && (this.options.group.renderGroupElement(), setTimeout(() => {
      var p;
      (p = this.options.group) == null || p.updateLayersPosition();
    }, 50)), this;
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
      const l = `placeholder-${this.id}`, o = document.getElementById(l);
      o && o.parentNode && o.parentNode.removeChild(o);
    }
    this.removeElements(), Dn(this);
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
    this.maskLayer = ve.src(Rn).props({
      zIndex: this.maskZIndex,
      visible: !0
    }).on("click", (l) => {
      var o;
      (o = this.options.maskOptions) != null && o.close && e("mask"), this.emit("maskClick", l);
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
      this.containerEl && Ct(null, this.containerEl), this.layerElement && this.layerElement.parentNode && this.layerElement.parentNode.removeChild(this.layerElement), this.layerVnode = null, this.containerEl = null, this.layerElement = null;
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
    return this.layerElement ? {
      width: this.layerElement.offsetWidth,
      height: this.layerElement.offsetHeight,
      x: this.layerElement.offsetLeft,
      y: this.layerElement.offsetTop
    } : { width: 0, height: 0, x: 0, y: 0 };
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
    Un().forEach((o) => {
      e && !e(o) || o.close();
    });
  }
  /**
   * 关闭组内所有层
   * @param group 组
   */
  static closeByGroup(e) {
    He(e).forEach((o) => {
      o.close();
    });
  }
  // !SECTION
}
async function _t(t, e) {
  const l = await import("./toast-CHcysktu.js");
  return ve.src(l.default).props({
    message: t || "",
    duration: (e == null ? void 0 : e.duration) || 2e3
  }).show({
    x: "center",
    y: "15vh",
    width: "auto",
    height: "auto"
  });
}
async function ro(t) {
  const e = typeof t == "string" ? { message: t } : t;
  return new Promise(async (l) => {
    const o = await import("./confirm-BGvYs8XV.js"), n = ne({
      message: e.message || "确认执行此操作？"
    }), s = {
      onConfirm: () => {
        a.hide(), l(!0);
      },
      onCancel: () => {
        a.hide(), l(!1);
      }
    }, a = ve.src(o.default).useMask().container("dialog").containerModel({
      title: e.title || "确认",
      showClose: !0
    }).model(n).props(s).show();
  });
}
async function uo(t) {
  const e = typeof t == "string" ? { message: t } : t;
  return new Promise(async (l) => {
    const o = await import("./alert-CItR2_B_.js"), n = ne({
      message: e.message || ""
    }), s = {
      onClose: () => {
        a.hide(), l();
      }
    }, a = ve.src(o.default).useMask().useBodyScroll(!1).container("dialog").containerModel({
      title: e.title || "提示",
      showClose: !0
    }).model(n).props(s).show();
  });
}
let Xn = {
  install: (t) => {
    t.config.globalProperties.$toast = _t, t.config.globalProperties.$confirm = ro, t.config.globalProperties.$alert = uo, t.config.globalProperties.$layer = ve;
  }
};
const qn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DialogContainer: lo,
  Layer: ve,
  LayerGroup: Hn,
  alert: uo,
  confirm: ro,
  default: Xn,
  toast: _t,
  useOutsideClick: no
}, Symbol.toStringTag, { value: "Module" })), Kn = {
  name: "lp-layout"
}, Jn = /* @__PURE__ */ q({
  ...Kn,
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
  setup(t) {
    const e = t, l = z(() => {
      const n = [];
      return e.template ? n.push("lp-grid-layout", e.template) : e.type === "grid" ? (n.push("lp-grid"), e.cols && (typeof e.cols == "number" ? n.push(`cols-${e.cols}`) : n.push(`cols-${e.cols}`)), e.rows && (typeof e.rows == "number" ? n.push(`rows-${e.rows}`) : typeof e.rows == "string" && n.push(`rows-${e.rows}`)), e.gap !== void 0 && typeof e.gap == "number" && n.push(`gap-${e.gap}`), e.gapX !== void 0 && typeof e.gapX == "number" && n.push(`gap-x-${e.gapX}`), e.gapY !== void 0 && typeof e.gapY == "number" && n.push(`gap-y-${e.gapY}`), e.justifyContent && n.push(`justify-${e.justifyContent}`), e.alignContent && n.push(`align-${e.alignContent}`), e.justifyItems && n.push(`justify-items-${e.justifyItems}`), e.alignItems && n.push(`items-${e.alignItems}`), e.height === "100vh" ? n.push("h-screen") : e.height === "100%" && n.push("h-full"), e.minHeight === "100vh" ? n.push("min-h-screen") : e.minHeight === "100%" && n.push("min-h-full"), e.width === "100%" ? n.push("w-full") : e.width === "100vw" && n.push("w-screen")) : (n.push("lp-layout"), e.direction && n.push(e.direction), e.wrap && n.push("wrap"), e.justifyContent && e.alignItems && n.push(`${e.justifyContent}-${e.alignItems}`)), n;
    }), o = z(() => {
      const n = {};
      return e.gridTemplateColumns && (n.gridTemplateColumns = e.gridTemplateColumns), e.gridTemplateRows && (n.gridTemplateRows = e.gridTemplateRows), e.gridTemplateAreas && (n.gridTemplateAreas = e.gridTemplateAreas), e.gap && typeof e.gap == "string" && (n.gap = e.gap), e.gapX && typeof e.gapX == "string" && (n.columnGap = e.gapX), e.gapY && typeof e.gapY == "string" && (n.rowGap = e.gapY), e.height && typeof e.height == "string" && !["100vh", "100%"].includes(e.height) ? n.height = e.height : typeof e.height == "number" && (n.height = `${e.height}px`), e.width && typeof e.width == "string" && !["100%", "100vw"].includes(e.width) ? n.width = e.width : typeof e.width == "number" && (n.width = `${e.width}px`), e.minHeight && typeof e.minHeight == "string" && !["100vh", "100%"].includes(e.minHeight) ? n.minHeight = e.minHeight : typeof e.minHeight == "number" && (n.minHeight = `${e.minHeight}px`), e.minWidth && typeof e.minWidth == "string" ? n.minWidth = e.minWidth : typeof e.minWidth == "number" && (n.minWidth = `${e.minWidth}px`), n;
    });
    return (n, s) => (v(), _("div", {
      class: N(l.value),
      style: ae(o.value)
    }, [
      H(n.$slots, "default")
    ], 6));
  }
}), Zn = {
  name: "lp-grid-item"
}, Qn = /* @__PURE__ */ q({
  ...Zn,
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
  setup(t) {
    const e = t, l = z(() => {
      const n = ["lp-grid-item"];
      return e.colSpan && (typeof e.colSpan == "number" ? n.push(`col-span-${e.colSpan}`) : n.push(`col-span-${e.colSpan}`)), e.rowSpan && (typeof e.rowSpan == "number" ? n.push(`row-span-${e.rowSpan}`) : n.push(`row-span-${e.rowSpan}`)), e.colStart && n.push(`col-start-${e.colStart}`), e.colEnd && n.push(`col-end-${e.colEnd}`), e.rowStart && n.push(`row-start-${e.rowStart}`), e.rowEnd && n.push(`row-end-${e.rowEnd}`), e.justifySelf && n.push(`justify-self-${e.justifySelf}`), e.alignSelf && n.push(`align-self-${e.alignSelf}`), n;
    }), o = z(() => {
      const n = {};
      return e.area && (n.gridArea = e.area), e.gridColumn && (n.gridColumn = e.gridColumn), e.gridRow && (n.gridRow = e.gridRow), n;
    });
    return (n, s) => (v(), _("div", {
      class: N(l.value),
      style: ae(o.value)
    }, [
      H(n.$slots, "default")
    ], 6));
  }
});
let el = {
  install: (t) => {
  }
};
const tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GridItem: Qn,
  Layout: Jn,
  default: el
}, Symbol.toStringTag, { value: "Module" })), ol = { class: "item" }, nl = {
  name: "lp-list"
}, Mt = /* @__PURE__ */ Object.assign(nl, {
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
  setup(t) {
    return (e, l) => (v(), _("div", {
      class: N(["list", { "list-x": t.listX }])
    }, [
      (v(!0), _(ce, null, de(t.data, (o, n) => (v(), _("div", ol, [
        H(e.$slots, "default", { row: o })
      ]))), 256))
    ], 2));
  }
});
let ll = {
  install: (t) => {
    t.component(Mt.name, Mt);
  }
};
const sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ll
}, Symbol.toStringTag, { value: "Module" })), al = { class: "lp-message" }, il = {
  name: "lp-message"
}, zt = /* @__PURE__ */ Object.assign(il, {
  setup(t) {
    return ne({}), (e, l) => (v(), _("div", al, G(e.message), 1));
  }
});
let rl = {
  install: (t) => {
    t.component(zt.name, zt);
  }
};
const ul = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rl
}, Symbol.toStringTag, { value: "Module" })), cl = { class: "lp-panel" }, dl = {
  key: 0,
  class: "title"
}, pl = { class: "body" }, fl = {
  name: "lp-panel"
}, At = /* @__PURE__ */ Object.assign(fl, {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  emits: ["change"],
  setup(t, { emit: e }) {
    return (l, o) => (v(), _("div", cl, [
      t.title ? (v(), _("div", dl, G(t.title), 1)) : R("", !0),
      T("div", pl, [
        H(l.$slots, "default")
      ])
    ]));
  }
});
let hl = {
  install: (t) => {
    t.component(At.name, At);
  }
};
const ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hl
}, Symbol.toStringTag, { value: "Module" })), vl = { class: "lp-progress__inner" }, gl = {
  key: 0,
  class: "lp-progress__text"
}, yl = {
  key: 0,
  class: "lp-progress__text"
}, _l = {
  name: "lp-progress"
}, lt = /* @__PURE__ */ q({
  ..._l,
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
  setup(t) {
    const e = t, l = z(() => {
      const o = {};
      if (o.width = e.percentage + "%", e.color)
        if (typeof e.color == "string")
          o.backgroundColor = e.color;
        else if (Array.isArray(e.color)) {
          const n = e.color, s = n.map((a, d) => {
            const r = d / (n.length - 1) * 100;
            return `${a} ${r}%`;
          }).join(", ");
          o.background = `linear-gradient(to right, ${s})`;
        } else typeof e.color == "function" && (o.backgroundColor = e.color(e.percentage));
      return o;
    });
    return z(() => e.status ? e.status : e.percentage >= 100 ? "success" : ""), (o, n) => (v(), _("div", {
      class: N(["lp-progress", [`lp-progress--${o.status}`, { "lp-progress--text-inside": o.textInside }]])
    }, [
      T("div", {
        class: "lp-progress__outer",
        style: ae({ height: o.strokeWidth + "px" })
      }, [
        T("div", vl, [
          T("div", {
            class: "lp-progress__bar",
            style: ae(l.value)
          }, [
            o.textInside ? (v(), _("div", gl, G(o.percentage) + "% ", 1)) : R("", !0)
          ], 4)
        ])
      ], 4),
      !o.textInside && o.showText ? (v(), _("div", yl, [
        H(o.$slots, "default", {}, () => [
          be(G(o.percentage) + "%", 1)
        ])
      ])) : R("", !0)
    ], 2));
  }
}), bl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpProgress: lt
}, Symbol.toStringTag, { value: "Module" })), wl = { class: "lp-radio" }, $l = ["onClick"], Cl = { class: "lp-radio-input" }, Sl = ["value", "checked", "onChange"], kl = { class: "lp-radio-label" }, El = {
  name: "LpRadio"
}, Tl = /* @__PURE__ */ q({
  ...El,
  props: {
    modelValue: { type: [String, Number, Boolean, null], default: null },
    options: { default: () => [] },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: e }) {
    const l = t, o = e, n = (s) => {
      l.disabled || (o("update:modelValue", s), o("change", s));
    };
    return (s, a) => (v(), _("div", wl, [
      (v(!0), _(ce, null, de(s.options, (d) => (v(), _("div", {
        key: d.value,
        class: "lp-radio-item",
        onClick: (r) => n(d.value)
      }, [
        T("div", Cl, [
          T("input", {
            type: "radio",
            value: d.value,
            checked: s.modelValue === d.value,
            onChange: (r) => n(d.value)
          }, null, 40, Sl),
          a[0] || (a[0] = T("span", { class: "lp-radio-mark" }, null, -1))
        ]),
        T("span", kl, G(d.title), 1)
      ], 8, $l))), 128))
    ]));
  }
}), Bt = /* @__PURE__ */ Be(Tl, [["__scopeId", "data-v-262ccaab"]]);
let xl = {
  install: (t) => {
    t.component(Bt.name, Bt);
  }
};
const Ol = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xl
}, Symbol.toStringTag, { value: "Module" })), co = Symbol("scrollbarContextKey"), jl = ({
  move: t,
  size: e,
  bar: l
}) => {
  const o = {};
  return (l == null ? void 0 : l.key) === "vertical" ? (o.height = e, o.width = "100%", o.transform = `translateY(${t || 0}px)`) : (o.width = e, o.height = "100%", o.transform = `translateX(${t || 0}px)`), o;
}, Ll = {
  name: "Bar"
}, Rt = /* @__PURE__ */ q({
  ...Ll,
  props: {
    always: { type: Boolean, default: !0 },
    width: {},
    height: {},
    ratioX: {},
    ratioY: {},
    visible: { type: Boolean, default: !1 },
    direction: { default: "vertical" }
  },
  setup(t, { expose: e }) {
    const l = t, o = we(co);
    o || kn("Bar", "can not inject scrollbar context");
    const n = L(), s = L(), a = L({}), d = L(!1);
    let r = !1, p = !1, g = 0, E = document.onselectstart;
    const f = z(() => b[l.direction || (l.ratioX && l.ratioY ? "vertical" : l.ratioX ? "horizontal" : "vertical")]);
    z(() => ({
      [f.value.size]: l[f.value.size],
      [f.value.axis]: a.value[f.value.axis]
    }));
    const C = z(() => jl({
      size: l[f.value.size],
      move: a.value[f.value.axis],
      bar: f.value
    }));
    z(
      () => n.value[f.value.offset] ** 2 / o.wrapElement[f.value.scrollSize] / l[f.value.ratio]
    );
    const O = (S) => {
      var m;
      if (S.stopPropagation(), S.ctrlKey || [1, 2].includes(S.button)) return;
      (m = window.getSelection()) == null || m.removeAllRanges();
      const x = S.currentTarget;
      if (!x) return;
      const k = x.getBoundingClientRect();
      g = S[f.value.client] - k[f.value.direction], P(S);
    }, A = (S) => {
      if (!s.value || !n.value || !o.wrapElement) return;
      const x = n.value.getBoundingClientRect(), k = S[f.value.client] - x[f.value.direction], m = s.value[f.value.offset] / 2, V = k - m, K = n.value[f.value.offset] - s.value[f.value.offset], ee = Math.max(0, Math.min(K, V)), Q = K > 0 ? ee / K * 100 : 0;
      a.value[f.value.axis] = ee;
      const oe = o.wrapElement[f.value.scrollSize] - o.wrapElement[f.value.offset];
      o.wrapElement[f.value.scroll] = Q * oe / 100;
    }, P = (S) => {
      S.stopImmediatePropagation(), r = !0, document.addEventListener("mousemove", w), document.addEventListener("mouseup", y), E = document.onselectstart, document.onselectstart = () => !1;
    }, w = (S) => {
      if (!r || !n.value || !s.value || !o.wrapElement) return;
      const x = n.value.getBoundingClientRect(), m = S[f.value.client] - x[f.value.direction] - g, V = n.value[f.value.offset] - s.value[f.value.offset], K = Math.max(0, Math.min(V, m)), ee = V > 0 ? K / V * 100 : 0;
      a.value[f.value.axis] = K;
      const Q = o.wrapElement[f.value.scrollSize] - o.wrapElement[f.value.offset];
      o.wrapElement[f.value.scroll] = ee * Q / 100;
    }, y = () => {
      r = !1, g = 0, document.removeEventListener("mousemove", w), document.removeEventListener("mouseup", y), i(), p && (d.value = !1);
    }, h = () => {
      p = !1, d.value = !!l[f.value.size];
    }, c = () => {
      p = !0, d.value = r;
    }, i = () => {
      document.onselectstart !== E && (document.onselectstart = E);
    }, u = (S) => {
      if (!r && S && n.value && s.value) {
        const x = S[f.value.scroll], k = S[f.value.scrollSize] - S[f.value.offset], m = k > 0 ? x / k * 100 : 0, V = n.value[f.value.offset] - s.value[f.value.offset];
        a.value[f.value.axis] = m * V / 100;
      }
    };
    he(() => {
      n.value && (n.value.addEventListener("mousemove", h), n.value.addEventListener("mouseleave", c));
    }), mt(() => {
      i(), document.removeEventListener("mouseup", y), n.value && (n.value.removeEventListener("mousemove", h), n.value.removeEventListener("mouseleave", c));
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
      handleScroll: u
    }), (S, x) => (v(), fe(ht, { name: "lp-scrollbar-fade" }, {
      default: ge(() => [
        gt(T("div", {
          ref_key: "instance",
          ref: n,
          class: N(["lp-scrollbar__bar", "is-" + f.value.key, { "is-visible": S.always || d.value || l.visible }]),
          onMousedown: A
        }, [
          T("div", {
            ref_key: "thumb",
            ref: s,
            class: "lp-scrollbar__thumb",
            style: ae(C.value),
            onMousedown: O
          }, null, 36)
        ], 34), [
          [oo, S.always || d.value || l.visible]
        ])
      ]),
      _: 1
    }));
  }
}), Pl = {
  name: "LpScrollbar"
}, st = /* @__PURE__ */ q({
  ...Pl,
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
  setup(t, { expose: e, emit: l }) {
    const o = "LpScrollbar", n = t, s = l;
    let a;
    const d = L(), r = L(), p = L(), g = L(), E = L(), f = L("0"), C = L("0");
    ne({});
    const O = L(1), A = L(1), P = L(!1), w = z(() => {
      const k = {};
      return n.height && (k.height = Pt(n.height)), n.maxHeight && (k.maxHeight = Pt(n.maxHeight)), [n.wrapStyle, k];
    }), y = z(() => [
      n.wrapClass,
      "lp-scrollbar__wrap",
      { "lp-scrollbar__wrap--hidden-default": !n.native }
    ]), h = z(() => ["lp-scrollbar__view", n.viewClass]), c = z(() => n.viewStyle), i = () => {
      if (r.value) {
        const k = r.value.scrollTop, m = r.value.scrollLeft;
        g.value && g.value.handleScroll(r.value), E.value && E.value.handleScroll(r.value), s("scroll", {
          scrollTop: k,
          scrollLeft: m
        });
      }
    };
    function u(k, m) {
      En(k) ? r.value.scrollTo(k) : Ue(k) && Ue(m) && r.value.scrollTo(k, m);
    }
    const b = (k) => {
      if (!Ue(k)) {
        It(o, "value must be a number");
        return;
      }
      r.value.scrollTop = k;
    }, S = (k) => {
      if (!Ue(k)) {
        It(o, "value must be a number");
        return;
      }
      r.value.scrollLeft = k;
    }, x = () => {
      if (!r.value) return;
      const k = r.value.clientHeight * 100 / r.value.scrollHeight, m = r.value.clientWidth * 100 / r.value.scrollWidth;
      C.value = k < 100 ? `${k}%` : "", f.value = m < 100 ? `${m}%` : "", O.value = r.value.scrollHeight / r.value.clientHeight, A.value = r.value.scrollWidth / r.value.clientWidth, P.value = !!(C.value || f.value);
    };
    return he(() => {
      n.native || Oe(() => {
        x();
        const k = new ResizeObserver(() => {
          x();
        });
        r.value && k.observe(r.value);
        const m = new MutationObserver(() => {
          x();
        });
        r.value && m.observe(r.value, {
          childList: !0,
          subtree: !0,
          attributes: !0,
          attributeFilter: ["style", "class"]
        }), a = () => {
          k.disconnect(), m.disconnect();
        };
      }), d.value && (d.value.addEventListener("mouseenter", () => {
        P.value = !!(C.value || f.value);
      }), d.value.addEventListener("mouseleave", () => {
        n.always || (P.value = !1);
      }));
    }), mt(() => {
      a == null || a();
    }), Je(
      co,
      ne({
        scrollbarElement: d,
        wrapElement: r
      })
    ), e({
      /** @description scrollbar wrap ref */
      wrapRef: r,
      /** @description update scrollbar state manually */
      update: x,
      /** @description scrolls to a particular set of coordinates */
      scrollTo: u,
      /** @description set distance to scroll top */
      setScrollTop: b,
      /** @description set distance to scroll left */
      setScrollLeft: S,
      /** @description handle scroll event */
      handleScroll: i
    }), (k, m) => (v(), _("div", {
      ref_key: "scrollbarRef",
      ref: d,
      class: N(["lp-scrollbar", { "lp-scrollbar--hidden": !k.always && !P.value }])
    }, [
      T("div", {
        ref_key: "wrapRef",
        ref: r,
        class: N(["lp-scrollbar__wrap", y.value]),
        style: ae(w.value),
        onScroll: i
      }, [
        (v(), fe(vt(k.tag), {
          ref_key: "resizeRef",
          ref: p,
          class: N(["lp-scrollbar__view", h.value]),
          style: ae(c.value)
        }, {
          default: ge(() => [
            H(k.$slots, "default")
          ]),
          _: 3
        }, 8, ["class", "style"]))
      ], 38),
      k.native ? R("", !0) : (v(), _(ce, { key: 0 }, [
        C.value ? (v(), fe(Rt, {
          key: 0,
          ref_key: "verticalBarRef",
          ref: g,
          height: C.value,
          width: "",
          always: k.always,
          "ratio-x": 1,
          "ratio-y": O.value,
          visible: P.value,
          direction: "vertical"
        }, null, 8, ["height", "always", "ratio-y", "visible"])) : R("", !0),
        f.value ? (v(), fe(Rt, {
          key: 1,
          ref_key: "horizontalBarRef",
          ref: E,
          height: "",
          width: f.value,
          always: k.always,
          "ratio-x": A.value,
          "ratio-y": 1,
          visible: P.value,
          direction: "horizontal"
        }, null, 8, ["width", "always", "ratio-x", "visible"])) : R("", !0)
      ], 64))
    ], 2));
  }
});
let Il = {
  install: (t) => {
    t.component(st.name, st);
  }
};
const Ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Il
}, Symbol.toStringTag, { value: "Module" })), zl = { class: "lp-select-items" }, Al = ["onClick"], Bl = { class: "label" }, Rl = {
  key: 0,
  class: "lp-select__selected-icon-box"
}, Vl = {
  name: "LpSelectItems"
}, Fl = /* @__PURE__ */ q({
  ...Vl,
  props: {
    list: { default: () => [] },
    limit: { default: 1 }
  },
  emits: ["select", "close"],
  setup(t, { emit: e }) {
    const l = t, o = e, n = (s) => {
      o("select", s), l.limit == 1 && o("close");
    };
    return ne({}), he(() => {
      console.log("lp-select-items list", l.list, St(l.list));
    }), (s, a) => (v(), _("div", zl, [
      (v(!0), _(ce, null, de(St(l.list) ? l.list.value : l.list, (d) => (v(), _("div", {
        class: N(["lp-select-items__item", { active: d.__selected }]),
        key: d.value,
        onClick: (r) => n(d)
      }, [
        T("div", Bl, G(d.label), 1),
        d.__selected ? (v(), _("div", Rl, [
          te(B(ue), {
            class: "lp-select__selected-icon",
            is: "selected",
            size: "14"
          })
        ])) : R("", !0)
      ], 10, Al))), 128))
    ]));
  }
}), Nl = { class: "lp-select__selected" }, Wl = {
  key: 0,
  class: "lp-select__placeholder"
}, Dl = { class: "lp-select__selected-item input-item" }, Ul = /* @__PURE__ */ q({
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
  setup(t, { emit: e }) {
    const l = L(null), o = t;
    ne({});
    const n = L(""), s = e;
    function a(p) {
      console.log("handleRemoveItem", p), s("removeItem", p);
    }
    function d() {
      o.itemComponent ? l.value = kt(Et(o.itemComponent)) : o.limit === 1 ? l.value = "div" : l.value = kt(Et("LooplanUiNeeds@SelectedTag"));
    }
    function r() {
      s("search", n.value);
    }
    return he(() => {
      d();
    }), (p, g) => (v(), _("div", Nl, [
      !p.selecteds.length && !n.value ? (v(), _("div", Wl, G(p.placeholder), 1)) : R("", !0),
      p.selecteds.length ? (v(!0), _(ce, { key: 1 }, de(p.selecteds, (E, f) => (v(), _("div", {
        key: f,
        class: "lp-select__selected-item"
      }, [
        (v(), fe(vt(l.value), {
          value: E,
          labelField: p.labelField,
          valueField: p.valueField,
          onRemoveItem: a
        }, {
          default: ge(() => [
            be(G(E[o.labelField || "label"]), 1)
          ]),
          _: 2
        }, 1064, ["value", "labelField", "valueField"]))
      ]))), 128)) : R("", !0),
      T("div", Dl, [
        gt(T("input", {
          "onUpdate:modelValue": g[0] || (g[0] = (E) => n.value = E),
          onInput: r,
          class: "lp-select__serch",
          type: "text"
        }, null, 544), [
          [To, n.value]
        ])
      ])
    ]));
  }
});
var pe = /* @__PURE__ */ ((t) => (t.STRING = "string", t.ARRAY = "array", t.OBJECT = "object", t.AUTO = "auto", t))(pe || {});
function Hl(t, e = {}) {
  const {
    valueField: l = "value",
    labelField: o = "label",
    limit: n = 1,
    valueType: s = pe.AUTO
  } = e, a = L([]), d = L([]);
  let r = [];
  const p = z(() => a.value.length > 0), g = (y) => {
    r = [], d.value = y.map((h) => {
      const c = {
        label: h[o],
        value: h[l],
        data: h,
        __selected: h[l] === t.value
      };
      return r.push(c), c;
    }), O();
  }, E = () => {
    r.forEach((y) => {
      const h = a.value.some((c) => c[l] === y[l]);
      y.__selected = h;
    }), d.value = [
      ...r
    ];
  }, f = (y) => {
    const h = a.value.some((c) => c[l] === y[l]);
    if (console.log("isSelected", h, n), !h && n > 1 && a.value.length >= n) {
      y.__selected = !1, _t("选择数量已达上限:" + n, {
        duration: 2e3
      });
      return;
    }
    if (y.__selected = !h, !h)
      n === 1 ? a.value = [y] : a.value.push(y);
    else {
      let c = a.value.findIndex((i) => i[l] === y[l]);
      c !== -1 && a.value.splice(c, 1);
    }
    n == 1 && E(), C();
  };
  function C() {
    console.log("renderModelValue", s, a), n === 1 ? s === pe.OBJECT ? t.value = a.value.length > 0 ? a.value[0].data : {} : t.value = a.value.length > 0 ? a.value[0].value : "" : s === pe.ARRAY || s === pe.AUTO ? t.value = a.value.map((y) => y.value).join(",") : s === pe.OBJECT ? t.value = a.value.map((y) => y.data) : t.value = a.value.map((y) => y.value);
  }
  function O() {
    a.value = [];
    const y = (h) => r.find((c) => c[l] === h);
    if (n === 1)
      if (s === pe.OBJECT) {
        const h = t.value;
        let c;
        h && typeof h == "object" ? c = h[l] : c = h;
        const i = y(c);
        a.value = i ? [i] : [];
      } else {
        const h = y(t.value);
        a.value = h ? [h] : [];
      }
    else {
      let h = [];
      s === pe.OBJECT ? h = (Array.isArray(t.value) ? t.value : []).map((i) => i && typeof i == "object" ? i[l] : i).filter((i) => i != null) : s === pe.STRING || typeof t.value == "string" ? h = (typeof t.value == "string" ? t.value : "").split(",").map((i) => i.trim()).filter(Boolean) : Array.isArray(t.value) ? h = t.value : typeof t.value == "string" ? h = t.value.split(",").map((c) => c.trim()).filter(Boolean) : h = [], a.value = h.map((c) => y(c)).filter((c) => !!c);
    }
    E();
  }
  xe(() => t.value, () => {
    O();
  });
  function A() {
    a.value = [], C();
  }
  function P(y) {
    f(y);
  }
  function w(y) {
    console.log("onSearch", y), d.value = r.filter((h) => (console.log("onSearch item", h), h.label.indexOf(y) !== -1)), console.log("onSearch nums", d.value.length);
  }
  return {
    selecteds: a,
    optionsRender: d,
    clearableVisible: p,
    handleOptions: g,
    onSelect: f,
    onRemoveItem: P,
    onClear: A,
    onSearch: w
  };
}
const Gl = { class: "lp-select__main" }, Yl = { class: "lp-select__right" }, Xl = {
  name: "LpSelect"
}, Vt = /* @__PURE__ */ q({
  ...Xl,
  props: /* @__PURE__ */ Ge({
    options: { default: () => [] },
    limit: { default: 1 },
    valueType: { default: pe.AUTO },
    placeholder: { default: "请选择" },
    selectedItemComponent: {}
  }, {
    modelValue: {
      default: ""
    },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = L(), l = t, o = yt(t, "modelValue"), n = ne({
      isActive: !1
    }), {
      selecteds: s,
      optionsRender: a,
      clearableVisible: d,
      handleOptions: r,
      onSelect: p,
      onRemoveItem: g,
      onClear: E,
      onSearch: f
    } = Hl(o, {
      valueField: "value",
      labelField: "label",
      limit: l.limit,
      valueType: l.valueType
    });
    let C = null;
    function O(P) {
      console.log("click"), n.isActive = !n.isActive;
      const w = P.target, y = "bottom-center";
      if (console.log("state.isActive", n.isActive), console.log("pickerModal", C), console.log("target", w), !n.isActive) {
        C && C.close();
        return;
      }
      C = ve.src(Fl).props({
        list: a,
        limit: l.limit
      }).follow(e.value, {
        // 跟随位置 [方向]-[对齐位置]，可供选择的四个方向分别是top、left、right、bottom，可供选择的三种对齐方式分别是start、end、center 默认对其方式是center
        position: y,
        // 是否显示箭头
        arrow: !0,
        // 箭头大小
        arrowSize: 10
        // 跟随的fps,用于一些带动画的, 会移动的元素 (可选, 默认不开启)
        // fps: 5
      }).on("close", () => {
        n.isActive = !1;
      }).on("select", (h) => {
        console.log("select", h), p(h);
      }).useOutsideClose().useBodyScroll(!1).show({
        width: "200",
        height: "200"
      });
    }
    function A() {
      C && C.close(), E();
    }
    return xe(
      () => l.options,
      (P) => {
        r(P);
      },
      {
        // 立即执行
        immediate: !0,
        // 深度监听
        deep: !0
      }
    ), he(() => {
      console.log(l.valueType);
    }), ft(() => {
      C && C.close();
    }), (P, w) => (v(), _("div", {
      ref_key: "selectRef",
      ref: e,
      class: "lp-select",
      onClick: w[0] || (w[0] = (y) => O(y))
    }, [
      T("div", null, G(B(s)), 1),
      T("div", Gl, [
        te(Ul, {
          selecteds: B(s),
          options: B(a),
          limit: l.limit,
          placeholder: l.placeholder,
          itemComponent: l.selectedItemComponent,
          onRemoveItem: B(g),
          onSearch: B(f)
        }, null, 8, ["selecteds", "options", "limit", "placeholder", "itemComponent", "onRemoveItem", "onSearch"]),
        T("div", Yl, [
          B(d) ? R("", !0) : (v(), fe(B(ue), {
            key: 0,
            is: "down",
            size: "14",
            color: "#ccc",
            class: N(["lp-select__icon", { active: n.isActive }])
          }, null, 8, ["class"])),
          B(d) ? (v(), fe(B(ue), {
            key: 1,
            onClick: ze(A, ["stop"]),
            is: "close",
            size: "14",
            color: "#ccc",
            class: "lp-select__close-icon"
          })) : R("", !0)
        ])
      ])
    ], 512));
  }
}), ql = { class: "lp-layout" }, Kl = {
  __name: "lp-select-selected-one",
  setup(t) {
    return ne({}), (e, l) => (v(), _("div", ql, " 单选 "));
  }
}, Jl = { class: "lp-select-selected-tag" }, po = /* @__PURE__ */ q({
  __name: "lp-select-selected-tag",
  props: {
    value: {},
    labelField: { default: "label" },
    valueField: { default: "value" }
  },
  emits: ["removeItem"],
  setup(t, { emit: e }) {
    const l = e, o = t;
    ne({});
    function n() {
      l("removeItem", o.value);
    }
    return (s, a) => (v(), _("div", Jl, [
      te(B(qe), {
        closable: "",
        onClose: n
      }, {
        default: ge(() => [
          be(G(s.value ? s.value[o.labelField] : ""), 1)
        ]),
        _: 1
      })
    ]));
  }
});
let Zl = {
  install: (t) => {
    t.component(Vt.name, Vt);
  }
};
const Ql = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SelectSelectedOne: Kl,
  SelectSelectedTag: po,
  default: Zl
}, Symbol.toStringTag, { value: "Module" })), es = ["checked", "disabled"], ts = { class: "lp-switch__core" }, os = {
  key: 0,
  class: "lp-switch__loading"
}, ns = {
  key: 1,
  class: "lp-switch__inner"
}, ls = { key: 0 }, ss = { key: 1 }, as = { class: "lp-switch__action" }, is = {
  key: 0,
  class: "lp-switch__label lp-switch__label--left"
}, rs = {
  key: 1,
  class: "lp-switch__label lp-switch__label--right"
}, us = {
  name: "LpSwitch"
}, Ft = /* @__PURE__ */ q({
  ...us,
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
  setup(t, { expose: e, emit: l }) {
    const o = t, n = l, s = we("lpFormItem", null), a = L(), d = L(!1), r = z(() => o.size || (s == null ? void 0 : s.size) || "default"), p = z(() => o.disabled || d.value), g = z(() => o.modelValue === o.activeValue);
    z(() => {
      const w = {};
      return o.width && (w.width = typeof o.width == "number" ? `${o.width}px` : o.width), o.activeColor && g.value ? (w.backgroundColor = o.activeColor, w.borderColor = o.activeColor) : o.inactiveColor && !g.value && (w.backgroundColor = o.inactiveColor, w.borderColor = o.inactiveColor), w;
    });
    const E = () => {
      var w;
      (w = a.value) == null || w.focus();
    }, f = () => {
      var w;
      (w = a.value) == null || w.blur();
    }, C = async () => {
      var y;
      if (p.value) return;
      if (o.beforeChange) {
        d.value = !0;
        try {
          if (!await o.beforeChange()) {
            d.value = !1;
            return;
          }
        } catch {
          d.value = !1;
          return;
        }
        d.value = !1;
      }
      const w = g.value ? o.inactiveValue : o.activeValue;
      n("update:modelValue", w), n("change", w), o.validateEvent && ((y = s == null ? void 0 : s.validate) == null || y.call(s, "change")), Oe(() => {
        a.value.checked = g.value;
      });
    }, O = () => {
    }, A = (w) => {
      n("focus", w);
    }, P = (w) => {
      var y;
      n("blur", w), o.validateEvent && ((y = s == null ? void 0 : s.validate) == null || y.call(s, "blur"));
    };
    return e({
      focus: E,
      blur: f,
      checked: g
    }), (w, y) => (v(), _("div", {
      class: N(["lp-switch", {
        "lp-switch--checked": g.value,
        "lp-switch--disabled": p.value,
        "lp-switch--loading": w.loading,
        [`lp-switch--${r.value}`]: r.value
      }]),
      onClick: C
    }, [
      T("input", {
        ref_key: "inputRef",
        ref: a,
        class: "lp-switch__input",
        type: "checkbox",
        checked: g.value,
        disabled: p.value,
        onChange: O,
        onFocus: A,
        onBlur: P
      }, null, 40, es),
      T("span", ts, [
        w.loading ? (v(), _("div", os, y[0] || (y[0] = [
          T("i", { class: "lp-switch__loading-icon" }, null, -1)
        ]))) : R("", !0),
        w.inlinePrompt && (w.activeText || w.inactiveText) ? (v(), _("span", ns, [
          g.value ? (v(), _("span", ls, G(w.activeText), 1)) : (v(), _("span", ss, G(w.inactiveText), 1))
        ])) : R("", !0),
        T("div", as, [
          w.activeIcon && g.value ? (v(), _("i", {
            key: 0,
            class: N([w.activeIcon, "lp-switch__action-icon"])
          }, null, 2)) : w.inactiveIcon && !g.value ? (v(), _("i", {
            key: 1,
            class: N([w.inactiveIcon, "lp-switch__action-icon"])
          }, null, 2)) : R("", !0)
        ])
      ]),
      !w.inlinePrompt && w.activeText && g.value ? (v(), _("span", is, G(w.activeText), 1)) : R("", !0),
      !w.inlinePrompt && w.inactiveText && !g.value ? (v(), _("span", rs, G(w.inactiveText), 1)) : R("", !0)
    ], 2));
  }
});
let cs = {
  install: (t) => {
    t.component(Ft.name, Ft);
  }
};
const ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cs
}, Symbol.toStringTag, { value: "Module" })), ps = { class: "lp-table" }, fs = { class: "lp-table__thead" }, hs = { class: "lp-table__tr" }, ms = { class: "lp-table__tbody" }, vs = {
  name: "lp-table"
}, gs = /* @__PURE__ */ q({
  ...vs,
  props: {
    columns: {},
    data: {}
  },
  setup(t) {
    const e = xo(), l = Oo(), o = t, n = z(() => {
      if (!o.columns || o.columns.length === 0) return "auto";
      let s = 0, a = !1;
      return o.columns.forEach((d) => {
        if (d.width) {
          const r = parseInt(d.width.replace(/px|%|em|rem/g, ""));
          s += r;
        } else
          a = !0;
      }), a && (s += 150 * o.columns.filter((d) => !d.width).length), `${s}px`;
    });
    return ne({}), he(() => {
      console.log("slots", e), console.log("attrs", l), console.log("computed table width:", n.value);
    }), (s, a) => (v(), _("div", ps, [
      te(st, { class: "lp-table__scrollbar" }, {
        default: ge(() => [
          T("table", {
            class: "lp-table__table",
            style: ae({ width: n.value })
          }, [
            T("thead", fs, [
              T("tr", hs, [
                (v(!0), _(ce, null, de(o.columns, (d) => (v(), _("th", {
                  key: d.name,
                  class: N(["lp-table__th", d.align && `lp-table__th--${d.align}`, d.fixed && `lp-table__th--fixed-${d.fixed}`]),
                  style: ae({ width: d.width, minWidth: d.width })
                }, G(d.title), 7))), 128))
              ])
            ]),
            T("tbody", ms, [
              (v(!0), _(ce, null, de(o.data, (d, r) => (v(), _("tr", {
                key: r,
                class: "lp-table__tr"
              }, [
                (v(!0), _(ce, null, de(o.columns, (p) => (v(), _("td", {
                  key: p.name,
                  class: N(["lp-table__td", p.align && `lp-table__td--${p.align}`, p.fixed && `lp-table__td--fixed-${p.fixed}`]),
                  style: ae({ width: p.width, minWidth: p.width })
                }, [
                  B(e)[`column.${p.name}`] ? H(s.$slots, `column.${p.name}`, {
                    key: 0,
                    item: d,
                    column: p,
                    index: r
                  }, void 0, !0) : B(e)[`field.${p.name}`] ? H(s.$slots, `field.${p.name}`, {
                    key: 1,
                    item: d,
                    column: p,
                    index: r
                  }, void 0, !0) : (v(), _(ce, { key: 2 }, [
                    be(G(d[p.name]), 1)
                  ], 64))
                ], 6))), 128))
              ]))), 128))
            ])
          ], 4)
        ]),
        _: 3
      })
    ]));
  }
}), at = /* @__PURE__ */ Be(gs, [["__scopeId", "data-v-8783e39f"]]), ys = {
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
}, it = q({
  name: "LpTableColumn",
  props: ys,
  setup(t) {
  },
  render() {
  }
});
let _s = {
  install: (t) => {
    t.component(at.name, at), t.component(it.name, it);
  }
};
const bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTable: at,
  LpTableColumn: it,
  default: _s
}, Symbol.toStringTag, { value: "Module" })), ws = ["onClick"], $s = { class: "text" }, Cs = {
  name: "lp-tabs"
}, Nt = /* @__PURE__ */ q({
  ...Cs,
  props: /* @__PURE__ */ Ge({
    keys: { default: () => ({ value: "value", title: "title" }) },
    type: { default: "default" },
    data: { default: () => [] },
    full: { type: Boolean, default: !1 },
    column: { type: Boolean, default: !1 },
    modelType: { default: "field" },
    modelField: { default: void 0 }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ Ge(["change"], ["update:modelValue"]),
  setup(t, { emit: e }) {
    const l = yt(t, "modelValue"), o = e, n = t;
    function s(r, p) {
      return r[n.keys.value] ?? p;
    }
    function a(r, p) {
      return n.modelType === "index" ? l.value === p : n.modelType === "field" && n.modelField ? l.value === r[n.modelField] : l.value === r[n.keys.value];
    }
    function d(r, p) {
      let g;
      n.modelType === "index" ? g = p : n.modelType === "field" && n.modelField ? g = r[n.modelField] : g = r[n.keys.value], l.value = g, o("change", {
        value: g,
        item: r,
        index: p
      });
    }
    return (r, p) => (v(), _("div", {
      class: N(["lp-tabs", [{ column: r.column, full: r.full }, r.type ? `type-${r.type}` : ""]])
    }, [
      (v(!0), _(ce, null, de(r.data, (g, E) => (v(), _("div", {
        class: N(["item", { active: a(g, E) }]),
        key: s(g, E),
        onClick: (f) => d(g, E)
      }, [
        T("span", $s, G(g[r.keys.title]), 1)
      ], 10, ws))), 128))
    ], 2));
  }
});
let Ss = {
  install: (t) => {
    t.component(Nt.name, Nt);
  }
};
const ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ss
}, Symbol.toStringTag, { value: "Module" })), Es = {
  name: "LpTag"
}, Ts = /* @__PURE__ */ q({
  ...Es,
  props: {
    // 类型：primary / success / warning / danger / info
    type: {
      type: String,
      default: "",
      validator: (t) => ["", "primary", "success", "warning", "danger", "info"].includes(t)
    },
    // 尺寸：large / default / small
    size: {
      type: String,
      default: "",
      validator: (t) => ["", "large", "small"].includes(t)
    },
    // 是否朴素样式
    plain: {
      type: Boolean,
      default: !1
    },
    // 是否圆形
    round: {
      type: Boolean,
      default: !1
    },
    // 是否可关闭
    closable: {
      type: Boolean,
      default: !1
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["click", "close"],
  setup(t, { emit: e }) {
    const l = t, o = e, n = (a) => {
      l.disabled || o("click", a);
    }, s = (a) => {
      l.disabled || o("close", a);
    };
    return (a, d) => (v(), _("div", {
      class: N(["lp-tag", [
        t.type ? `type-${t.type}` : "",
        t.size ? `size-${t.size}` : "",
        {
          plain: t.plain,
          round: t.round,
          disabled: t.disabled
        }
      ]]),
      onClick: n
    }, [
      H(a.$slots, "default", {}, void 0, !0),
      t.closable ? (v(), _("div", {
        key: 0,
        class: "close-box",
        onClick: ze(s, ["stop"])
      }, [
        te(B(ue), {
          is: "close",
          size: "12"
        })
      ])) : R("", !0)
    ], 2));
  }
}), qe = /* @__PURE__ */ Be(Ts, [["__scopeId", "data-v-36e54ad7"]]);
let xs = {
  install: (t) => {
    t.component(qe.name, qe);
  }
};
const Os = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTag: qe,
  default: xs
}, Symbol.toStringTag, { value: "Module" }));
var Ie = /* @__PURE__ */ ((t) => (t.TEXT = "text", t.IMG = "img", t.FILE = "file", t))(Ie || {}), re = /* @__PURE__ */ ((t) => (t.STRING = "string", t.ARRAY = "array", t.OBJECT_ARRAY = "objectArray", t.AUTO = "", t))(re || {}), se = /* @__PURE__ */ ((t) => (t.PENDING = "pending", t.UPLOADING = "uploading", t.SUCCESS = "success", t.ERROR = "error", t))(se || {});
class bt {
  constructor(e, l, o) {
    D(this, "item");
    D(this, "file");
    D(this, "action");
    D(this, "abortController");
    D(this, "callbacks", {});
    D(this, "frontendOption");
    // 前端直传配置
    /**
     * 上传进度
     */
    D(this, "progress", L({
      loaded: 0,
      total: 0,
      percentage: 0
    }));
    /**
     * 上传状态
     */
    D(this, "progressStatus", "");
    this.item = e, this.file = l, this.action = o;
  }
  static create(e, l, o) {
    return new bt(e, l, o);
  }
  /**
   * 获取前端直传配置
   */
  async getFrontendUploadOption() {
    if (!this.action || this.action.type !== "option")
      return null;
    try {
      const e = await Ze.post(this.action.url, {}, {
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
    const o = {};
    if (l.includes("etag") && (o.etag = Date.now().toString() + Math.random().toString(36).substr(2, 9)), l.includes("ext")) {
      const n = e.lastIndexOf(".");
      o.ext = n > -1 ? e.substring(n) : "";
    }
    return o;
  }
  /**
   * 替换字符串中的占位符
   */
  replacePlaceholders(e, l) {
    let o = e;
    return Object.entries(l).forEach(([n, s]) => {
      o = o.replace(new RegExp(`\\$\\(${n}\\)`, "g"), s);
    }), o;
  }
  /**
   * 前端直传上传
   */
  async frontendDirectUpload() {
    var s, a, d, r, p, g;
    if (!this.file || !this.frontendOption)
      throw new Error("文件或前端直传配置不存在");
    const e = new FormData(), l = this.processFileName(this.file.name, this.frontendOption.handles), o = this.replacePlaceholders(
      this.frontendOption.data.key || "",
      l
    );
    Object.entries(this.frontendOption.data).forEach(([E, f]) => {
      typeof f == "string" ? e.append(E, this.replacePlaceholders(f, l)) : e.append(E, String(f));
    });
    const n = this.frontendOption.fieldName || "file";
    e.append(n, this.file), this.abortController = new AbortController();
    try {
      const E = await Ze.post(this.frontendOption.url, e, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        signal: this.abortController.signal,
        onUploadProgress: (C) => {
          var O, A;
          if (C.total) {
            const P = {
              loaded: C.loaded,
              total: C.total,
              percentage: Math.round(C.loaded / C.total * 100)
            };
            (A = (O = this.callbacks).onProgress) == null || A.call(O, P), this.progress.value = P;
          }
        }
      }), f = {
        data: {
          fullUrl: `${this.frontendOption.domain}/${o}`,
          key: o,
          url: `${this.frontendOption.domain}/${o}`
        }
      };
      return (a = (s = this.callbacks).onSuccess) == null || a.call(s, f), f;
    } catch (E) {
      if (E.name === "CanceledError") {
        const C = new Error("上传已取消");
        throw (r = (d = this.callbacks).onError) == null || r.call(d, C), C;
      }
      const f = new Error(`前端直传失败: ${E.message}`);
      throw (g = (p = this.callbacks).onError) == null || g.call(p, f), f;
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
    var l, o, n, s, a, d;
    if (!this.file || !this.action)
      throw new Error("文件或上传地址不存在");
    const e = new FormData();
    e.append("file", this.file), this.abortController = new AbortController();
    try {
      const r = await Ze.post(this.action.url, e, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...this.action.headers
        },
        signal: this.abortController.signal,
        onUploadProgress: (p) => {
          var g, E;
          if (p.total) {
            const f = {
              loaded: p.loaded,
              total: p.total,
              percentage: Math.round(p.loaded / p.total * 100)
            };
            (E = (g = this.callbacks).onProgress) == null || E.call(g, f), this.progress.value = f;
          }
        }
      });
      return (o = (l = this.callbacks).onSuccess) == null || o.call(l, r.data), r.data;
    } catch (r) {
      if (r.name === "CanceledError") {
        const g = new Error("上传已取消");
        throw (s = (n = this.callbacks).onError) == null || s.call(n, g), g;
      }
      const p = new Error(`上传失败: ${r.message}`);
      throw (d = (a = this.callbacks).onError) == null || d.call(a, p), p;
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
function js(t, e) {
  return e.split(".").reduce((l, o) => l && l[o] !== void 0 ? l[o] : null, t);
}
function Qe(t) {
  if (!t) return "";
  try {
    const l = t.split("?")[0].split("#")[0].split("/"), o = l[l.length - 1];
    return !o || o.startsWith(".") ? "未知文件" : decodeURIComponent(o);
  } catch (e) {
    return console.warn("提取文件名失败:", e), "未知文件";
  }
}
function Ls(t, e) {
  const l = L([]), o = L(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Map();
  let s = 0, a = null;
  const d = () => e.type === Ie.IMG ? "image/*" : e.type === Ie.FILE ? "*" : e.type === Ie.TEXT ? "text/*" : "", r = () => {
    a = t.value;
    const h = document.createElement("input");
    h.type = "file", h.accept = e.value.accept || d(), h.multiple = e.value.limit !== 1, h.addEventListener("change", async (c) => {
      const u = c.target.files;
      if (u && u.length > 0) {
        if (e.value.limit === 1 && l.value.length > 0) {
          const b = l.value[0];
          b.uploader, b._id && n.delete(b._id), l.value = [];
        }
        for (let b = 0; b < u.length; b++) {
          const S = u[b], x = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, k = {
            _id: x,
            url: "",
            name: S.name,
            size: S.size,
            type: S.type,
            uploader: null,
            status: se.PENDING
          };
          if (S.type.startsWith("image/")) {
            const m = new FileReader();
            m.readAsDataURL(S), m.onload = () => {
              k.url = m.result;
            };
          }
          l.value.push(k), n.set(x, S), e.value.autoUpload && e.value.action && await p(k, S);
        }
      }
    }), h.click();
  }, p = async (h, c) => {
    if (!e.value.action) {
      console.warn("未配置上传地址");
      return;
    }
    const i = bt.create(h, c, e.value.action);
    h.uploader = i, h.status = se.UPLOADING, i.setCallbacks({
      onProgress: (u) => {
        console.log("上传进度:", u);
      },
      onSuccess: (u) => {
        const b = e.value.responseField || "data.fullUrl", S = js(u, b);
        S && (h.url = S, h.status = se.SUCCESS, f()), o.value.delete(h), console.log("上传成功:", u);
      },
      onError: (u) => {
        h.status = se.ERROR, o.value.delete(h), console.error("上传失败:", u);
      }
    });
    try {
      await i.upload();
    } catch (u) {
      console.error("上传异常:", u);
    }
  }, g = (h) => {
    if (h.uploader && (h.uploader.abort(), h.uploader = null, o.value.delete(h)), h._id && n.delete(h._id), e.value.limit === 1)
      t.value = a, E(a);
    else {
      const c = l.value.indexOf(h);
      c > -1 && (l.value.splice(c, 1), f());
    }
  }, E = (h) => {
    n.clear();
    let c = e.value.valueType;
    if (e.value.valueType == re.AUTO && (e.value.limit == 1 ? c = re.STRING : c = re.ARRAY), console.log("flushModelValue", c, h), !h) {
      l.value = [];
      return;
    }
    if (c === re.ARRAY)
      l.value = h.map((i) => ({
        _id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        url: i,
        name: Qe(i),
        uploader: null,
        status: se.SUCCESS
      }));
    else if (c === re.STRING) {
      let i = e.value.limit === 1 ? [h] : h.split(",");
      l.value = i.map((u) => ({
        _id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        url: u,
        name: Qe(u),
        uploader: null,
        status: se.SUCCESS
      }));
    } else c === re.OBJECT_ARRAY ? l.value = h.map((i) => ({
      _id: i._id || `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      url: i.url,
      name: i.name || Qe(i.url),
      size: i.size || 0,
      type: i.type || "",
      uploader: null,
      status: se.SUCCESS
    })) : l.value = [];
  }, f = () => {
    s++;
    let h = e.value.valueType;
    e.value.valueType == re.AUTO && (e.value.limit == 1 ? h = re.STRING : h = re.ARRAY);
    let c;
    const i = l.value.filter(
      (u) => u.url && !u.url.startsWith("data:")
      // 排除base64预览URL
    );
    h === re.ARRAY ? c = i.map((u) => u.url) : h === re.STRING ? e.value.limit === 1 ? c = i.length > 0 ? i[0].url : "" : c = i.map((u) => u.url).join(",") : h === re.OBJECT_ARRAY ? c = i.map((u) => ({
      url: u.url,
      name: u.name,
      size: u.size,
      type: u.type
    })) : c = "", t.value = c, s--;
  }, C = () => {
    E(t.value);
  }, O = (h) => {
    const c = l.value[h];
    c.uploader && g(c), n.delete(c._id), l.value.splice(h, 1), f();
  };
  return xe(l, () => {
    s === 0 && f();
  }, { deep: !0 }), xe(() => t.value, (h, c) => {
    if (s === 0 && JSON.stringify(h) !== JSON.stringify(c)) {
      s++;
      try {
        E(h);
      } finally {
        s--;
      }
    }
  }, { deep: !0 }), {
    // 选择文件
    selectFile: r,
    // 文件列表
    fileList: l,
    // 上传进度
    uploadProgress: o,
    // 刷新文件列表
    flushFileList: E,
    // 更新模型值
    updateModelValue: f,
    // 初始化上传
    initUpload: C,
    // 删除文件
    onDelete: O,
    // 上传文件
    uploadFile: p,
    // 取消上传
    cancelUpload: g,
    // 获取文件列表
    getFileList: () => l.value,
    // 获取文件对象列表
    getFileObjectList: () => (console.log("fileObjectMap:", n), l.value.map((h) => ({
      fileItem: h,
      file: n.get(h._id) || null
    })).filter((h) => h.file !== null)),
    // 上传所有文件
    uploadAllFiles: async () => {
      const h = l.value.filter(
        (c) => c.status === se.PENDING
      );
      if (h.length === 0) {
        console.warn("没有待上传的文件");
        return;
      }
      if (!e.value.action) {
        console.warn("未配置上传地址");
        return;
      }
      for (const c of h) {
        const i = n.get(c._id);
        i ? await p(c, i) : (console.warn("找不到对应的File对象:", c.name), console.log("fileObjectMap:", c, n));
      }
    },
    // 清除所有文件
    clearAllFiles: () => {
      l.value = [], o.value.clear(), n.clear(), f();
    }
  };
}
const Ps = { class: "lp-upload" }, Is = {
  key: 0,
  class: "lp-upload__file-list"
}, Ms = ["onClick"], zs = ["src"], As = {
  key: 1,
  class: "lp-upload__placeholder"
}, Bs = {
  key: 2,
  class: "lp-upload__progress"
}, Rs = { class: "lp-upload__progress-text" }, Vs = ["onClick"], Fs = {
  key: 3,
  class: "lp-upload__handle"
}, Ns = {
  key: 1,
  class: "lp-upload__file-mode"
}, Ws = { class: "lp-upload__file-info" }, Ds = { class: "lp-upload__file-details" }, Us = { class: "lp-upload__file-name" }, Hs = {
  key: 0,
  class: "lp-upload__file-size"
}, Gs = {
  key: 0,
  class: "lp-upload__file-progress"
}, Ys = { class: "lp-upload__progress-text" }, Xs = { class: "lp-upload__file-status" }, qs = {
  key: 0,
  class: "lp-upload__status-success"
}, Ks = {
  key: 1,
  class: "lp-upload__status-error"
}, Js = {
  key: 2,
  class: "lp-upload__status-pending"
}, Zs = { class: "lp-upload__file-actions" }, Qs = { class: "lp-upload__control flex" }, ea = {
  name: "lp-upload"
}, Wt = /* @__PURE__ */ q({
  ...ea,
  props: /* @__PURE__ */ Ge({
    type: { default: "img" },
    limit: { default: 1 },
    accept: { default: "" },
    array: { type: Boolean },
    action: {},
    valueType: { default: re.AUTO },
    autoUpload: { type: Boolean, default: !0 },
    responseField: { default: "data.fullUrl" }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t, { expose: e }) {
    const l = t, o = yt(t, "modelValue"), n = we("uploadConfig", null), s = z(() => ({
      ...l,
      action: l.action || n
    })), {
      // 选择文件
      selectFile: a,
      // 文件列表
      fileList: d,
      // 初始化上传
      initUpload: r,
      // 删除文件
      onDelete: p,
      // 取消上传
      cancelUpload: g,
      // 获取文件列表
      getFileList: E,
      // 获取文件对象列表
      getFileObjectList: f,
      // 上传所有文件
      uploadAllFiles: C,
      // 清除所有文件
      clearAllFiles: O
    } = Ls(o, s);
    ne({});
    const A = z(() => !s.value.limit || d.value.length < s.value.limit);
    z(() => d.value.some((h) => h.status === se.PENDING));
    const P = (h) => h < 1024 ? h + " B" : h < 1024 * 1024 ? (h / 1024).toFixed(1) + " KB" : h < 1024 * 1024 * 1024 ? (h / (1024 * 1024)).toFixed(1) + " MB" : (h / (1024 * 1024 * 1024)).toFixed(1) + " GB", w = async () => {
      await C();
    };
    function y(h) {
      s.value.limit === 1 && a();
    }
    return e({
      getFileList: E,
      getFileObjectList: f,
      uploadAllFiles: C,
      selectFile: a,
      fileList: d,
      clearAllFiles: O
    }), he(() => {
      r();
    }), (h, c) => (v(), _("div", Ps, [
      s.value.type === "img" ? (v(), _("div", Is, [
        (v(!0), _(ce, null, de(B(d), (i, u) => (v(), _("div", {
          class: "lp-upload__item",
          key: u,
          onClick: (b) => y()
        }, [
          i.url && i.url.startsWith("http") ? (v(), _("img", {
            key: 0,
            class: "img",
            src: i.url,
            alt: ""
          }, null, 8, zs)) : (v(), _("div", As, [
            te(B(ue), {
              is: "upload",
              size: "22",
              color: "#ccc"
            })
          ])),
          i.uploader && i.status === B(se).UPLOADING ? (v(), _("div", Bs, [
            te(B(lt), {
              percentage: i.uploader.progress.percentage,
              status: i.uploader.progressStatus,
              "show-text": !1
            }, null, 8, ["percentage", "status"]),
            T("div", Rs, G(i.uploader.progress.percentage) + "%", 1),
            T("div", {
              class: "lp-upload__cancel",
              onClick: ze((b) => B(g)(i), ["stop"])
            }, [
              te(B(ue), {
                is: "close",
                size: "12",
                color: "#fff"
              })
            ], 8, Vs)
          ])) : (v(), _("div", Fs, [
            te(B(ue), {
              is: "delete",
              size: "16",
              color: "#fff",
              onClick: ze((b) => B(p)(u), ["stop"])
            }, null, 8, ["onClick"])
          ]))
        ], 8, Ms))), 128)),
        A.value ? (v(), _("div", {
          key: 0,
          class: "lp-upload__item",
          onClick: c[0] || (c[0] = //@ts-ignore
          (...i) => B(a) && B(a)(...i))
        }, [
          H(h.$slots, "select", {}, () => [
            te(B(ue), {
              is: "upload",
              size: "22",
              color: "#ff0000"
            })
          ])
        ])) : R("", !0)
      ])) : (v(), _("div", Ns, [
        (v(!0), _(ce, null, de(B(d), (i, u) => {
          var b, S, x, k;
          return v(), _("div", {
            class: "lp-upload__file-item",
            key: u
          }, [
            T("div", Ws, [
              te(B(ue), {
                is: "teaching",
                size: "20",
                color: "#409eff"
              }),
              T("div", Ds, [
                T("div", Us, G(i.name || "未知文件"), 1),
                i.size ? (v(), _("div", Hs, G(P(i.size)), 1)) : R("", !0)
              ])
            ]),
            i.status === B(se).UPLOADING ? (v(), _("div", Gs, [
              te(B(lt), {
                percentage: ((S = (b = i.uploader) == null ? void 0 : b.progress) == null ? void 0 : S.percentage) || 0,
                "show-text": !1,
                size: "small"
              }, null, 8, ["percentage"]),
              T("span", Ys, G(((k = (x = i.uploader) == null ? void 0 : x.progress) == null ? void 0 : k.percentage) || 0) + "%", 1)
            ])) : R("", !0),
            T("div", Xs, [
              i.status === B(se).SUCCESS ? (v(), _("span", qs, [
                te(B(ue), {
                  is: "security",
                  size: "16",
                  color: "#67c23a"
                })
              ])) : i.status === B(se).ERROR ? (v(), _("span", Ks, [
                te(B(ue), {
                  is: "close",
                  size: "16",
                  color: "#f56c6c"
                })
              ])) : i.status === B(se).PENDING ? (v(), _("span", Js, [
                te(B(ue), {
                  is: "time",
                  size: "16",
                  color: "#e6a23c"
                })
              ])) : R("", !0)
            ]),
            T("div", Zs, [
              te(B(ue), {
                is: "delete",
                size: "16",
                color: "#f56c6c",
                onClick: (m) => B(p)(u),
                style: { cursor: "pointer" }
              }, null, 8, ["onClick"])
            ])
          ]);
        }), 128)),
        T("div", Qs, [
          T("div", {
            class: "lp-upload__select-btn",
            onClick: c[1] || (c[1] = //@ts-ignore
            (...i) => B(a) && B(a)(...i))
          }, [
            H(h.$slots, "select", {}, () => [
              c[2] || (c[2] = T("button", { class: "btn btn-primary" }, "选择文件", -1))
            ])
          ]),
          s.value.autoUpload ? R("", !0) : (v(), _("div", {
            key: 0,
            class: "lp-upload__upload-btn",
            onClick: w
          }, [
            H(h.$slots, "upload", {}, () => [
              c[3] || (c[3] = T("button", { class: "btn btn-success" }, "上传文件", -1))
            ])
          ]))
        ])
      ]))
    ]));
  }
});
let ta = {
  install: (t) => {
    t.component(Wt.name, Wt);
  }
};
const oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UploadTypeEnum: Ie,
  default: ta
}, Symbol.toStringTag, { value: "Module" }));
var fo = typeof global == "object" && global && global.Object === Object && global, na = typeof self == "object" && self && self.Object === Object && self, $e = fo || na || Function("return this")(), Ke = $e.Symbol, ho = Object.prototype, la = ho.hasOwnProperty, sa = ho.toString, Pe = Ke ? Ke.toStringTag : void 0;
function aa(t) {
  var e = la.call(t, Pe), l = t[Pe];
  try {
    t[Pe] = void 0;
    var o = !0;
  } catch {
  }
  var n = sa.call(t);
  return o && (e ? t[Pe] = l : delete t[Pe]), n;
}
var ia = Object.prototype, ra = ia.toString;
function ua(t) {
  return ra.call(t);
}
var ca = "[object Null]", da = "[object Undefined]", Dt = Ke ? Ke.toStringTag : void 0;
function Re(t) {
  return t == null ? t === void 0 ? da : ca : Dt && Dt in Object(t) ? aa(t) : ua(t);
}
function wt(t) {
  return t != null && typeof t == "object";
}
var pa = Array.isArray;
function mo(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var fa = "[object AsyncFunction]", ha = "[object Function]", ma = "[object GeneratorFunction]", va = "[object Proxy]";
function vo(t) {
  if (!mo(t))
    return !1;
  var e = Re(t);
  return e == ha || e == ma || e == fa || e == va;
}
var et = $e["__core-js_shared__"], Ut = function() {
  var t = /[^.]+$/.exec(et && et.keys && et.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function ga(t) {
  return !!Ut && Ut in t;
}
var ya = Function.prototype, _a = ya.toString;
function ke(t) {
  if (t != null) {
    try {
      return _a.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var ba = /[\\^$.*+?()[\]{}|]/g, wa = /^\[object .+?Constructor\]$/, $a = Function.prototype, Ca = Object.prototype, Sa = $a.toString, ka = Ca.hasOwnProperty, Ea = RegExp(
  "^" + Sa.call(ka).replace(ba, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ta(t) {
  if (!mo(t) || ga(t))
    return !1;
  var e = vo(t) ? Ea : wa;
  return e.test(ke(t));
}
function xa(t, e) {
  return t == null ? void 0 : t[e];
}
function Ve(t, e) {
  var l = xa(t, e);
  return Ta(l) ? l : void 0;
}
var rt = Ve($e, "WeakMap"), Oa = 9007199254740991;
function go(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Oa;
}
function ja(t) {
  return t != null && go(t.length) && !vo(t);
}
var La = Object.prototype;
function yo(t) {
  var e = t && t.constructor, l = typeof e == "function" && e.prototype || La;
  return t === l;
}
var Pa = "[object Arguments]";
function Ht(t) {
  return wt(t) && Re(t) == Pa;
}
var _o = Object.prototype, Ia = _o.hasOwnProperty, Ma = _o.propertyIsEnumerable, za = Ht(/* @__PURE__ */ function() {
  return arguments;
}()) ? Ht : function(t) {
  return wt(t) && Ia.call(t, "callee") && !Ma.call(t, "callee");
};
function Aa() {
  return !1;
}
var bo = typeof exports == "object" && exports && !exports.nodeType && exports, Gt = bo && typeof module == "object" && module && !module.nodeType && module, Ba = Gt && Gt.exports === bo, Yt = Ba ? $e.Buffer : void 0, Ra = Yt ? Yt.isBuffer : void 0, Va = Ra || Aa, Fa = "[object Arguments]", Na = "[object Array]", Wa = "[object Boolean]", Da = "[object Date]", Ua = "[object Error]", Ha = "[object Function]", Ga = "[object Map]", Ya = "[object Number]", Xa = "[object Object]", qa = "[object RegExp]", Ka = "[object Set]", Ja = "[object String]", Za = "[object WeakMap]", Qa = "[object ArrayBuffer]", ei = "[object DataView]", ti = "[object Float32Array]", oi = "[object Float64Array]", ni = "[object Int8Array]", li = "[object Int16Array]", si = "[object Int32Array]", ai = "[object Uint8Array]", ii = "[object Uint8ClampedArray]", ri = "[object Uint16Array]", ui = "[object Uint32Array]", J = {};
J[ti] = J[oi] = J[ni] = J[li] = J[si] = J[ai] = J[ii] = J[ri] = J[ui] = !0;
J[Fa] = J[Na] = J[Qa] = J[Wa] = J[ei] = J[Da] = J[Ua] = J[Ha] = J[Ga] = J[Ya] = J[Xa] = J[qa] = J[Ka] = J[Ja] = J[Za] = !1;
function ci(t) {
  return wt(t) && go(t.length) && !!J[Re(t)];
}
function di(t) {
  return function(e) {
    return t(e);
  };
}
var wo = typeof exports == "object" && exports && !exports.nodeType && exports, Me = wo && typeof module == "object" && module && !module.nodeType && module, pi = Me && Me.exports === wo, tt = pi && fo.process, Xt = function() {
  try {
    var t = Me && Me.require && Me.require("util").types;
    return t || tt && tt.binding && tt.binding("util");
  } catch {
  }
}(), qt = Xt && Xt.isTypedArray, fi = qt ? di(qt) : ci;
function hi(t, e) {
  return function(l) {
    return t(e(l));
  };
}
var mi = hi(Object.keys, Object), vi = Object.prototype, gi = vi.hasOwnProperty;
function yi(t) {
  if (!yo(t))
    return mi(t);
  var e = [];
  for (var l in Object(t))
    gi.call(t, l) && l != "constructor" && e.push(l);
  return e;
}
var ut = Ve($e, "Map"), ct = Ve($e, "DataView"), dt = Ve($e, "Promise"), pt = Ve($e, "Set"), Kt = "[object Map]", _i = "[object Object]", Jt = "[object Promise]", Zt = "[object Set]", Qt = "[object WeakMap]", eo = "[object DataView]", bi = ke(ct), wi = ke(ut), $i = ke(dt), Ci = ke(pt), Si = ke(rt), Ce = Re;
(ct && Ce(new ct(new ArrayBuffer(1))) != eo || ut && Ce(new ut()) != Kt || dt && Ce(dt.resolve()) != Jt || pt && Ce(new pt()) != Zt || rt && Ce(new rt()) != Qt) && (Ce = function(t) {
  var e = Re(t), l = e == _i ? t.constructor : void 0, o = l ? ke(l) : "";
  if (o)
    switch (o) {
      case bi:
        return eo;
      case wi:
        return Kt;
      case $i:
        return Jt;
      case Ci:
        return Zt;
      case Si:
        return Qt;
    }
  return e;
});
var ki = "[object Map]", Ei = "[object Set]", Ti = Object.prototype, xi = Ti.hasOwnProperty;
function Oi(t) {
  if (t == null)
    return !0;
  if (ja(t) && (pa(t) || typeof t == "string" || typeof t.splice == "function" || Va(t) || fi(t) || za(t)))
    return !t.length;
  var e = Ce(t);
  if (e == ki || e == Ei)
    return !t.size;
  if (yo(t))
    return !yi(t).length;
  for (var l in t)
    if (xi.call(t, l))
      return !1;
  return !0;
}
function ji(t) {
  const e = /* @__PURE__ */ Object.assign({ "./lp-button/index.ts": Ro, "./lp-checkbox/index.ts": Yo, "./lp-empty/index.ts": Zo, "./lp-form/index.ts": sn, "./lp-input/index.ts": wn, "./lp-layer/index.ts": qn, "./lp-layout/index.ts": tl, "./lp-list/index.ts": sl, "./lp-message/index.ts": ul, "./lp-panel/index.ts": ml, "./lp-progress/index.ts": bl, "./lp-radio/index.ts": Ol, "./lp-scrollbar/index.ts": Ml, "./lp-select/index.ts": Ql, "./lp-switch/index.ts": ds, "./lp-table/index.ts": bs, "./lp-tabs/index.ts": ks, "./lp-tag/index.ts": Os, "./lp-upload/index.ts": oa });
  console.debug("%cglobalComponents", "color:green", e), Object.keys(e).forEach((l) => {
    const o = e[l].default;
    Oi(o) || t.use(o);
  });
}
const Li = (t, e, l, o) => {
  t.__pressTimer === null && (t.__pressTimer = window.setTimeout(() => {
    t.__longPressed = !0, typeof e.value == "function" && e.value();
  }, l));
}, to = (t) => {
  t.__pressTimer !== null && (clearTimeout(t.__pressTimer), t.__pressTimer = null);
}, Pi = {
  mounted(t, e) {
    const l = Number(e.arg) || 500;
    t.__pressTimer = null, t.__longPressed = !1;
    const o = (a) => {
      a.preventDefault(), a.stopPropagation(), Li(t, e, l);
    }, n = (a) => {
      to(t), setTimeout(() => {
        t.__longPressed = !1;
      }, 100);
    }, s = (a) => {
      t.__longPressed && (console.log("handleClick 阻止默认事件", a), a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault(), t.__longPressed = !1);
    };
    t.__handleStart = o, t.__handleCancel = n, t.__handleClick = s, t.addEventListener("pointerdown", o), t.addEventListener("pointerup", n), t.addEventListener("pointerleave", n), t.addEventListener("pointercancel", n), t.addEventListener("click", s, !0);
  },
  unmounted(t) {
    t.removeEventListener("pointerdown", t.__handleStart), t.removeEventListener("pointerup", t.__handleCancel), t.removeEventListener("pointerleave", t.__handleCancel), t.removeEventListener("pointercancel", t.__handleCancel), t.removeEventListener("click", t.__handleClick, !0), to(t);
  }
}, Ii = {
  name: "LooplanUiNeeds",
  title: "Looplan Ui Needs组件库",
  type: "local",
  version: "0.0.1",
  components: [
    "SelectedTag"
  ]
}, Mi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SelectedTag: po,
  packageConfig: Ii
}, Symbol.toStringTag, { value: "Module" }));
console.debug("looplan-ui");
const Ni = {
  install(t) {
    ji(t), so.appContext = t._context, Lo({
      name: "looplan",
      url: "http://192.168.31.101:9000/IconGateway.detail"
      // 认证
      // token:''
    }), Po(Mi), t.directive("longpress", Pi);
  }
};
export {
  qn as LpLayer,
  qe as LpTag,
  Ni as default,
  Pi as longpress,
  ji as registerLooplanUiComponents
};
