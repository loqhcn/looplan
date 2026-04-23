import type { RadioOption, RadioProps } from '../types';
declare const _default: import("vue").DefineComponent<RadioProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: string | number | boolean) => any;
    "update:modelValue": (value: string | number | boolean) => any;
}, string, import("vue").PublicProps, Readonly<RadioProps> & Readonly<{
    onChange?: ((value: string | number | boolean) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | number | boolean) => any) | undefined;
}>, {
    disabled: boolean;
    modelValue: string | number | boolean | null;
    options: RadioOption[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
