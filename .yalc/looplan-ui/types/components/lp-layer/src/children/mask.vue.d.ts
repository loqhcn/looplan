declare function setEventsNone(isNone: boolean): void;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    setEventsNone: typeof setEventsNone;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
    mounted: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    onMounted?: ((...args: any[]) => any) | undefined;
}>, {
    zIndex: number;
    visible: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
