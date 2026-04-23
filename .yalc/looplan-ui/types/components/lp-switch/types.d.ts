export type SwitchValue = boolean | string | number;
export interface SwitchProps {
    modelValue?: SwitchValue;
    disabled?: boolean;
    loading?: boolean;
    size?: 'large' | 'default' | 'small';
    width?: number | string;
    inlinePrompt?: boolean;
    activeIcon?: string;
    inactiveIcon?: string;
    activeText?: string;
    inactiveText?: string;
    /**
     * 选中时的值
     */
    activeValue?: SwitchValue;
    /**
     * 未选中时的值
     */
    inactiveValue?: SwitchValue;
    /**
     * 选中时的颜色
     */
    activeColor?: string;
    /**
     * 未选中时的颜色
     */
    inactiveColor?: string;
    /**
     * 边框颜色
     */
    borderColor?: string;
    name?: string;
    validateEvent?: boolean;
    beforeChange?: () => boolean | Promise<boolean>;
}
