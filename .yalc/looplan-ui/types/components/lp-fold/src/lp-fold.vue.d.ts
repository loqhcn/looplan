import type { LpFoldProps } from '../types';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<LpFoldProps & {
    active?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:active": (value: boolean) => any;
} & {
    change: (name: string, active: boolean) => any;
}, string, import("vue").PublicProps, Readonly<LpFoldProps & {
    active?: boolean;
}> & Readonly<{
    onChange?: ((name: string, active: boolean) => any) | undefined;
    "onUpdate:active"?: ((value: boolean) => any) | undefined;
}>, {
    name: string;
    disabled: boolean;
    title: string;
    showArrow: boolean;
    expand: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    title?: ((props: {}) => any) | undefined;
    default?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
