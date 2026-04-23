import type { CheckboxProps } from '../types.ts';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<CheckboxProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: string | number | boolean) => any;
    click: (value: string | number | boolean) => any;
    "update:modelValue": (value: string | number | boolean) => any;
}, string, import("vue").PublicProps, Readonly<CheckboxProps> & Readonly<{
    onChange?: ((value: string | number | boolean) => any) | undefined;
    onClick?: ((value: string | number | boolean) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | number | boolean) => any) | undefined;
}>, {
    size: "mini" | "default" | "max";
    value: boolean | string | number;
    modelValue: boolean | string | number;
    midway: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
