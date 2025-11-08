import type { ObjectDirective } from 'vue';
interface LongPressElement extends HTMLElement {
    __pressTimer: number | null;
    __longPressed: boolean;
    __handleStart: (event: PointerEvent) => void;
    __handleCancel: (event: PointerEvent) => void;
    __handleClick: (event: MouseEvent) => void;
}
type LongPressCallback = () => void;
/**
 * 长按指令定义
 */
declare const longpress: ObjectDirective<LongPressElement, LongPressCallback>;
export default longpress;
