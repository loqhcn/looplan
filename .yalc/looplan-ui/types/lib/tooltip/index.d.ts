import type { TooltipProps } from "./types";
import { Layer } from "../../components/lp-layer";
interface TooltipOptions {
    /**
     * 悬停触发时间 单位ms
     */
    delay: number;
    /**
     * 隐藏延迟时间 单位ms
     */
    hideDelay: number;
    /**
     * 限制tooltip显示的元素数量
     * @todo 达到数量后关闭其它的tooltip
     * @default 1
     */
    limit: number;
}
declare function useTooltip(options: TooltipOptions, rangeEl?: HTMLElement): {
    tooltipEnable: import("vue").Ref<boolean, boolean>;
    removeTooltip: () => void;
};
/**
 * 挂载tooltip
 * @param src 触发元素
 * @param props tooltip属性
 */
declare function mountTooltip(src: HTMLElement, props: TooltipProps): Promise<Layer>;
export { useTooltip, mountTooltip };
export type { TooltipOptions };
