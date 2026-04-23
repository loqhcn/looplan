import type { TabsProps, TabItem, TabKeys, TabChangeEvent } from '../types';
declare const _default: import("vue").DefineComponent<TabsProps & {
    modelValue?: any;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (event: TabChangeEvent) => any;
    "update:modelValue": (value: any) => any;
}, string, import("vue").PublicProps, Readonly<TabsProps & {
    modelValue?: any;
}> & Readonly<{
    onChange?: ((event: TabChangeEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}>, {
    type: string;
    keys: TabKeys;
    column: boolean;
    data: TabItem[];
    full: boolean;
    modelType: "field" | "index";
    modelField: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
