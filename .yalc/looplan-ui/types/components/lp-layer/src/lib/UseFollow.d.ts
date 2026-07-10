import { ref } from 'vue';
import type { CSSProperties } from 'vue';
/**
 * 跟随属性类型定义
 */
export interface FollowProps {
    /**
     * 跟随目标元素
     */
    target: string | HTMLElement;
    /**
     * 跟随选项
     */
    options: FollowOptions;
}
/**
 * 跟随选项类型定义
 */
export interface FollowOptions {
    /**
     * 跟随位置 [方向]-[对齐位置]
     * - 方向: top | bottom | left | right
     * - 对齐位置: center | start | end
     */
    position: string;
    /**
     * 跟随的fps，用于一些带动画的元素
     */
    fps?: number;
    /**
     * 是否显示箭头
     */
    arrow?: boolean;
    /**
     * 箭头大小
     */
    arrowSize?: number;
    /**
    * 颜色
    */
    arrowColor?: string;
}
interface UseFollowReturn {
    followTarget: ReturnType<typeof ref<HTMLElement | string | null>>;
    followOptions: ReturnType<typeof ref<FollowOptions | null>>;
    followAnimationFrame: ReturnType<typeof ref<number | null>>;
    followDirection: ReturnType<typeof ref<string | null>>;
    arrowDirection: ReturnType<typeof ref<string | null>>;
    arrowSize: ReturnType<typeof ref<number>>;
    arrowStyle: CSSProperties;
    targetCenter: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    showArrow: ReturnType<typeof ref<Boolean>>;
    initFollow: (containerRef: HTMLElement, containerStyle: CSSProperties, onPositionCalculated?: () => void) => boolean;
    updateFollowPosition: (containerRef: HTMLElement, containerStyle: CSSProperties, onPositionCalculated?: () => void) => void;
    updateArrowStyle: () => void;
    cleanup: () => void;
}
declare function useFollow(followProps?: FollowProps): UseFollowReturn;
export default useFollow;
