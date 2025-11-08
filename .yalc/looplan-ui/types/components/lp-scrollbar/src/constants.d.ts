import type { InjectionKey, Ref } from 'vue';
export interface ScrollbarContext {
    scrollbarElement: Ref<HTMLDivElement | undefined>;
    wrapElement: Ref<HTMLDivElement | undefined>;
}
export declare const scrollbarContextKey: InjectionKey<ScrollbarContext>;
