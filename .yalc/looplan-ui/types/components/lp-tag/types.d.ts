export interface TagProps {
    type?: string;
    /**
     * 尺寸
     * - max / default / mini
     */
    size?: string;
    /**
     * 是否朴素样式
     *
     */
    plain?: boolean;
    /**
     * 是否圆形
     *
     */
    round?: boolean;
    /**
     * 是否可关闭
     *
     */
    closable?: boolean;
    /**
     * 是否禁用
     *
     */
    disabled?: boolean;
}
