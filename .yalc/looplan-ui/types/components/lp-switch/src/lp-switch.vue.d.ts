import type { SwitchProps, SwitchValue } from '../types.ts';
declare const _default: import("vue").DefineComponent<SwitchProps, {
    focus: () => void;
    blur: () => void;
    checked: import("vue").ComputedRef<boolean>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    blur: (event: FocusEvent) => any;
    change: (value: SwitchValue) => any;
    focus: (event: FocusEvent) => any;
    "update:modelValue": (value: SwitchValue) => any;
}, string, import("vue").PublicProps, Readonly<SwitchProps> & Readonly<{
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: SwitchValue) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: SwitchValue) => any) | undefined;
}>, {
    size: "large" | "default" | "small";
    validateEvent: boolean;
    activeValue: SwitchValue;
    inactiveValue: SwitchValue;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
