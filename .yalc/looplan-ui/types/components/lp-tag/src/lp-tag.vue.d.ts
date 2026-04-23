import type { TagProps } from '../types';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<TagProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
    close: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<TagProps> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    disabled: boolean;
    type: string;
    size: string;
    round: boolean;
    plain: boolean;
    closable: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
