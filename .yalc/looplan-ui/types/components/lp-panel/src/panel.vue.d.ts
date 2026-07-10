import type { PanelProps } from '../types';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<PanelProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<PanelProps> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    title: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    header?: ((props: {}) => any) | undefined;
    default?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
