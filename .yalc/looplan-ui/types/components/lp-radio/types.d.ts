/**
 * Radio 组件相关类型
 */
export interface RadioOption {
    value: string | number | boolean;
    title: string;
    disabled?: boolean;
}
/**
 * Radio 组件相关类型
 */
export interface RadioProps {
    modelValue?: string | number | boolean | null;
    options?: RadioOption[];
    disabled?: boolean;
}
export type RadioValue = string | number | boolean;
/**
 * RadioGroup 组件相关类型
 */
export interface RadioGroupProps {
    modelValue?: RadioValue;
    disabled?: boolean;
    size?: 'large' | 'default' | 'small';
    name?: string;
    validateEvent?: boolean;
}
