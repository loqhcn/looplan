declare const handleBeforeEnter: (el: Element) => void;
declare const handleAfterEnter: (el: Element) => void;
declare const handleBeforeLeave: (el: Element) => void;
declare const handleAfterLeave: (el: Element) => void;
declare const onLeaveCancelled: (el: Element) => void;
declare const __VLS_ctx: InstanceType<__VLS_PickNotAny<typeof __VLS_self, new () => {}>>;
declare var __VLS_13: {};
type __VLS_Slots = __VLS_PrettifyGlobal<__VLS_OmitStringIndex<typeof __VLS_ctx.$slots> & {
    default?: (props: typeof __VLS_13) => any;
}>;
declare const __VLS_self: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    handleBeforeEnter: typeof handleBeforeEnter;
    handleAfterEnter: typeof handleAfterEnter;
    handleBeforeLeave: typeof handleBeforeLeave;
    handleAfterLeave: typeof handleAfterLeave;
    onLeaveCancelled: typeof onLeaveCancelled;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    enter: (...args: any[]) => void;
    leave: (...args: any[]) => void;
    afterEnter: (...args: any[]) => void;
    afterLeave: (...args: any[]) => void;
    leaveCancelled: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onEnter?: ((...args: any[]) => any) | undefined;
    onLeave?: ((...args: any[]) => any) | undefined;
    onAfterEnter?: ((...args: any[]) => any) | undefined;
    onAfterLeave?: ((...args: any[]) => any) | undefined;
    onLeaveCancelled?: ((...args: any[]) => any) | undefined;
}>, {
    name: string;
    disabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    enter: (...args: any[]) => void;
    leave: (...args: any[]) => void;
    afterEnter: (...args: any[]) => void;
    afterLeave: (...args: any[]) => void;
    leaveCancelled: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onEnter?: ((...args: any[]) => any) | undefined;
    onLeave?: ((...args: any[]) => any) | undefined;
    onAfterEnter?: ((...args: any[]) => any) | undefined;
    onAfterLeave?: ((...args: any[]) => any) | undefined;
    onLeaveCancelled?: ((...args: any[]) => any) | undefined;
}>, {
    name: string;
    disabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
