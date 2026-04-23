import type { Ref } from 'vue';
interface CheckboxOption {
    title: string;
    value: string | number;
    disabled?: boolean;
}
interface CheckboxGroupContext {
    modelValue?: Ref<(string | number)[]>;
    disabled?: Ref<boolean>;
    size?: Ref<'mini' | 'default' | 'max'>;
    min?: Ref<number>;
    max?: Ref<number>;
    changeEvent?: (value: (string | number)[]) => void;
}
interface CheckboxGroupProps {
    modelValue?: (string | number)[];
    options?: CheckboxOption[];
    disabled?: boolean;
    size?: 'mini' | 'default' | 'max';
    min?: number;
    max?: number;
    ariaLabel?: string;
}
interface CheckboxGroupEmits {
    (e: 'update:modelValue', value: (string | number)[]): void;
    (e: 'change', value: (string | number)[]): void;
}
interface CheckboxProps {
    modelValue?: boolean | string | number;
    value?: boolean | string | number;
    title?: string | number | boolean;
    trueLabel?: string | number;
    falseLabel?: string | number;
    disabled?: boolean;
    name?: string;
    size?: 'mini' | 'default' | 'max';
    midway?: boolean;
}
export type { CheckboxProps, CheckboxOption, CheckboxGroupProps, CheckboxGroupEmits, CheckboxGroupContext };
