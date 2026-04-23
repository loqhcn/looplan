export interface ComponentBaseProps {
}
export interface LpFoldProps extends ComponentBaseProps {
    name?: string;
    title?: string;
    disabled?: boolean;
    showArrow?: boolean;
    active?: boolean;
    expand?: boolean;
}
export interface LpFoldEmits {
    (e: 'change', name: string, active: boolean): void;
}
export interface LpCollapseProps extends ComponentBaseProps {
    modelValue: string | string[];
    accordion?: boolean;
}
export interface LpCollapseEmits {
    (e: 'update:modelValue', value: string | string[]): void;
    (e: 'change', value: string | string[]): void;
}
