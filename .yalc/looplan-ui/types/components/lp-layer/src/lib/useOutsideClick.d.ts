type OutsideSelector = HTMLElement | string;
type OutsideSelectors = OutsideSelector | OutsideSelector[];
interface OutsideClickInstance {
    unbind: () => void;
    appendSelector: (newSelector: OutsideSelectors) => void;
}
/**
 * 点击外部关闭弹窗（行为同 Element Plus 的 el-select）
 * @param selector 目标元素或选择器（支持多个）
 * @param callback 点击外部后触发的回调
 */
export declare function useOutsideClick(selector: OutsideSelectors, callback: () => void): OutsideClickInstance;
export type { OutsideSelectors, OutsideClickInstance, };
