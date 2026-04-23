import type { SelectProps } from '../types';
import { SelectValueTypeEnum } from '../types';
declare const _default: import("vue").DefineComponent<SelectProps & {
    modelValue?: string;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string) => any;
}, string, import("vue").PublicProps, Readonly<SelectProps & {
    modelValue?: string;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
    placeholder: string;
    options: any[];
    limit: number;
    valueType: SelectValueTypeEnum;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
