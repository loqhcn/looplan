export interface FormProps {
    model?: Record<string, any>;
    rules?: FormRules;
    inline?: boolean;
    labelPosition?: 'left' | 'right' | 'top';
    /**
     * 标签宽度
     */
    labelWidth?: string | number;
    labelSuffix?: string;
    hideRequiredAsterisk?: boolean;
    showMessage?: boolean;
    inlineMessage?: boolean;
    statusIcon?: boolean;
    validateOnRuleChange?: boolean;
    size?: 'large' | 'default' | 'small';
    disabled?: boolean;
}
export interface FormItemProps {
    label?: string;
    labelWidth?: string | number;
    prop?: string;
    required?: boolean;
    rules?: FormRule | FormRule[];
    error?: string;
    showMessage?: boolean;
    inlineMessage?: boolean;
    size?: 'large' | 'default' | 'small';
    for?: string;
}
export interface FormRule {
    required?: boolean;
    message?: string;
    min?: number;
    max?: number;
    len?: number;
    pattern?: RegExp;
    validator?: (rule: FormRule, value: any, callback: (error?: Error) => void) => void;
    trigger?: 'blur' | 'change' | 'submit';
}
export type FormRules = Record<string, FormRule | FormRule[]>;
export type FormValidateCallback = (isValid: boolean, invalidFields?: string) => void;
export interface FormItemContext {
    prop: string;
    validate: () => Promise<void>;
    resetField: () => void;
    clearValidate: () => void;
}
export type FormSize = 'large' | 'default' | 'small';
export type FormLabelPosition = 'left' | 'right' | 'top';
export type FormItemValidateState = '' | 'success' | 'error' | 'validating';
export interface RadioOption {
    value: string | number | boolean;
    title: string;
    disabled?: boolean;
}
