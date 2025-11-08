import type { Ref } from 'vue';
export interface CheckboxOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}
export interface CheckboxGroupContext {
    modelValue?: Ref<(string | number)[]>;
    disabled?: Ref<boolean>;
    size?: Ref<'mini' | 'default' | 'max'>;
    min?: Ref<number>;
    max?: Ref<number>;
    changeEvent?: (value: (string | number)[]) => void;
}
export interface CheckboxGroupProps {
    modelValue?: (string | number)[];
    options?: CheckboxOption[];
    disabled?: boolean;
    size?: 'mini' | 'default' | 'max';
    min?: number;
    max?: number;
    ariaLabel?: string;
}
export interface CheckboxGroupEmits {
    (e: 'update:modelValue', value: (string | number)[]): void;
    (e: 'change', value: (string | number)[]): void;
}
