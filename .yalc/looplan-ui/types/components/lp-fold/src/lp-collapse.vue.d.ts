import type { LpCollapseProps } from '../types';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<LpCollapseProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: string | string[]) => any;
    "update:modelValue": (value: string | string[]) => any;
}, string, import("vue").PublicProps, Readonly<LpCollapseProps> & Readonly<{
    onChange?: ((value: string | string[]) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | string[]) => any) | undefined;
}>, {
    modelValue: string | string[];
    accordion: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
