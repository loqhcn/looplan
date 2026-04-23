import type { FormValidateCallback } from '../types';
import type { FormProps } from '../types';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<FormProps, {
    validate: (callback?: FormValidateCallback) => Promise<boolean>;
    validateField: (prop: string, callback?: FormValidateCallback) => Promise<boolean>;
    resetFields: () => void;
    clearValidate: (props?: string | string[]) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    validate: (prop: string, isValid: boolean, message: string) => any;
}, string, import("vue").PublicProps, Readonly<FormProps> & Readonly<{
    onValidate?: ((prop: string, isValid: boolean, message: string) => any) | undefined;
}>, {
    disabled: boolean;
    size: "large" | "default" | "small";
    inline: boolean;
    labelPosition: "left" | "right" | "top";
    labelSuffix: string;
    hideRequiredAsterisk: boolean;
    showMessage: boolean;
    inlineMessage: boolean;
    statusIcon: boolean;
    validateOnRuleChange: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
