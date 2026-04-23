export interface ProgressProps {
    /** 百分比 */
    percentage: number;
    /** 进度条类型 */
    type?: 'line' | 'circle';
    /** 进度条的宽度 */
    strokeWidth?: number;
    /** 是否显示进度文字 */
    showText?: boolean;
    /** 进度文字是否置于进度条内 */
    textInside?: boolean;
    /**
     * 进度条状态
     * - 'success' | 'exception' | 'warning' | ''
     */
    status?: string;
    /** 进度条颜色 */
    color?: string | string[] | ((percentage: number) => string);
    /** 进度条宽度 */
    width?: number;
}
