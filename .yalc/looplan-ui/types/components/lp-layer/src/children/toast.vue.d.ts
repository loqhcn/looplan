import { LpIcon } from 'looplan';
export interface ToastProps {
    message?: string;
    duration?: number;
    type?: keyof typeof typeIconMap;
}
declare const typeIconMap: {
    primary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
};
declare const handleMouseEnter: () => void;
declare const handleMouseLeave: () => void;
declare const __VLS_ctx: InstanceType<__VLS_PickNotAny<typeof __VLS_self, new () => {}>>;
declare var __VLS_5: {};
type __VLS_Slots = __VLS_PrettifyGlobal<__VLS_OmitStringIndex<typeof __VLS_ctx.$slots> & {
    default?: (props: typeof __VLS_5) => any;
}>;
declare const __VLS_self: import("vue").DefineComponent<ToastProps, {
    LpIcon: typeof LpIcon;
    typeIconMap: typeof typeIconMap;
    handleMouseEnter: typeof handleMouseEnter;
    handleMouseLeave: typeof handleMouseLeave;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: (...args: any[]) => void;
    shown: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<ToastProps> & Readonly<{
    onClose?: ((...args: any[]) => any) | undefined;
    onShown?: ((...args: any[]) => any) | undefined;
}>, {
    type: keyof typeof typeIconMap;
    duration: number;
    message: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_component: import("vue").DefineComponent<ToastProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: (...args: any[]) => void;
    shown: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<ToastProps> & Readonly<{
    onClose?: ((...args: any[]) => any) | undefined;
    onShown?: ((...args: any[]) => any) | undefined;
}>, {
    type: keyof typeof typeIconMap;
    duration: number;
    message: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
