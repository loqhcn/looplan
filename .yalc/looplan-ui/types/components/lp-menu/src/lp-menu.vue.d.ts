import type { MenuProps } from '../types';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<MenuProps, {
    append: (...args: any[]) => any;
    remove: (...args: any[]) => any;
    insert: (...args: any[]) => any;
    getNode: (...args: any[]) => any;
    filter: (...args: any[]) => any;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: any) => any;
    select: (event: import("../types").MenuSelectEvent) => any;
    "update:modelValue": (value: any) => any;
}, string, import("vue").PublicProps, Readonly<MenuProps> & Readonly<{
    onChange?: ((value: any) => any) | undefined;
    onSelect?: ((event: import("../types").MenuSelectEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}>, {
    keys: import("../types").MenuKeys;
    mode: import("../types").MenuMode;
    data: import("../types").MenuItem[];
    modelValue: any;
    searchable: boolean;
    searchPlaceholder: string;
    defaultOpeneds: any[];
    indent: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    item?: ((props: {
        item: any;
    }) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
