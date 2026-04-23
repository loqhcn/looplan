import type { RadioValue, RadioGroupProps } from '../types';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<RadioGroupProps, {
    name: string | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: RadioValue) => any;
    "update:modelValue": (value: RadioValue) => any;
}, string, import("vue").PublicProps, Readonly<RadioGroupProps> & Readonly<{
    onChange?: ((value: RadioValue) => any) | undefined;
    "onUpdate:modelValue"?: ((value: RadioValue) => any) | undefined;
}>, {
    size: "large" | "default" | "small";
    validateEvent: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
