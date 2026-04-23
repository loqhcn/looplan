import type { ProgressProps } from '../types';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<ProgressProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ProgressProps> & Readonly<{}>, {
    width: number;
    type: "line" | "circle";
    strokeWidth: number;
    percentage: number;
    status: string;
    showText: boolean;
    textInside: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
