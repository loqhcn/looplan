import type { ButtonProps } from '../types.ts';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<ButtonProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<ButtonProps> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
}>, {
    type: "primary" | "success" | "warning" | "danger" | "link";
    size: "mini" | "max" | "" | "default";
    text: string;
    icon: string;
    link: boolean;
    plain: boolean;
    loading: boolean;
    iconSize: string | number;
    iconColor: string;
    iconPosition: "left" | "right";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
