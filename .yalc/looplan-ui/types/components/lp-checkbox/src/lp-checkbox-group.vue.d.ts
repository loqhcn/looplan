import type { CheckboxGroupProps } from '../types.ts';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<CheckboxGroupProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: (string | number)[]) => any;
    "update:modelValue": (value: (string | number)[]) => any;
}, string, import("vue").PublicProps, Readonly<CheckboxGroupProps> & Readonly<{
    onChange?: ((value: (string | number)[]) => any) | undefined;
    "onUpdate:modelValue"?: ((value: (string | number)[]) => any) | undefined;
}>, {
    disabled: boolean;
    size: "mini" | "default" | "max";
    modelValue: (string | number)[];
    max: number;
    min: number;
    options: import("../types.ts").CheckboxOption[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
