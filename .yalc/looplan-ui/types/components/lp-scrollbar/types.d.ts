import type { StyleValue } from 'vue';
/**
 * 滚动条属性
 */
export interface ScrollbarProps {
    height?: string | number;
    maxHeight?: string | number;
    native?: boolean;
    wrapStyle?: StyleValue;
    wrapClass?: string | string[];
    viewClass?: string | string[];
    viewStyle?: StyleValue;
    noresize?: boolean;
    tag?: string;
    always?: boolean;
    minSize?: number;
}
/**
 * 滚动条事件
 */
export interface ScrollbarEmits {
    scroll: [args: {
        scrollTop: number;
        scrollLeft: number;
    }];
}
/**
 * 滚动条实例
 */
export interface ScrollbarInstance {
    wrapRef: HTMLDivElement;
    update: () => void;
    scrollTo: (options: ScrollToOptions | number, yCoord?: number) => void;
    setScrollTop: (scrollTop: number) => void;
    setScrollLeft: (scrollLeft: number) => void;
    handleScroll: () => void;
}
