import type { FormItemProps } from '../types';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<FormItemProps, {
    validate: (trigger?: string) => Promise<void>;
    resetField: () => void;
    clearValidate: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<FormItemProps> & Readonly<{}>, {
    size: "large" | "default" | "small";
    showMessage: boolean;
    inlineMessage: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    label?: ((props: {}) => any) | undefined;
    default?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
