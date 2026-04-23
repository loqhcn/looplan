import type { ScrollbarProps } from '../types';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<ScrollbarProps, {
    /** @description scrollbar wrap ref */
    wrapRef: import("vue").Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
    /** @description update scrollbar state manually */
    update: () => void;
    /** @description scrolls to a particular set of coordinates */
    scrollTo: {
        (xCord: number, yCoord?: number): void;
        (options: ScrollToOptions): void;
    };
    /** @description set distance to scroll top */
    setScrollTop: (value: number) => void;
    /** @description set distance to scroll left */
    setScrollLeft: (value: number) => void;
    /** @description handle scroll event */
    handleScroll: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    scroll: (args: {
        scrollTop: number;
        scrollLeft: number;
    }) => any;
}, string, import("vue").PublicProps, Readonly<ScrollbarProps> & Readonly<{
    onScroll?: ((args: {
        scrollTop: number;
        scrollLeft: number;
    }) => any) | undefined;
}>, {
    height: string | number;
    maxHeight: string | number;
    always: boolean;
    native: boolean;
    wrapStyle: string | false | import("vue").CSSProperties | import("vue").StyleValue[] | null;
    wrapClass: string | string[];
    viewClass: string | string[];
    viewStyle: string | false | import("vue").CSSProperties | import("vue").StyleValue[] | null;
    noresize: boolean;
    tag: string;
    minSize: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
