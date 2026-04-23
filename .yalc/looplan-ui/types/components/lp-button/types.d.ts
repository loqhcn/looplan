interface ButtonProps {
    /**按钮类型 */
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'link';
    /**按钮文本 */
    text?: string;
    /**按钮大小 */
    size?: 'mini' | 'max' | '' | 'default';
    /**是否显示加载状态 */
    loading?: boolean;
    /**是否为朴素按钮 */
    plain?: boolean;
    /**按钮图标 */
    icon?: string;
    /**图标大小 */
    iconSize?: string | number;
    /**图标颜色 */
    iconColor?: string;
    /**图标位置 */
    iconPosition?: 'left' | 'right';
    /**是否为链接按钮 */
    link?: boolean;
}
export type { ButtonProps };
