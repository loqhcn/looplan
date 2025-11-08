type CreateFn = () => HTMLElement;
type ElementLike = HTMLElement | CreateFn;
/**
 * 元素管理器
 * 用于管理不同分组下的元素，支持动态注册、注销、获取等操作。
 * 每个元素都关联一个唯一的分组和可选值，值可以为空。
 * 元素可以是 HTMLElement 实例或创建函数，创建函数在需要时调用。
 */
export declare class ElementManager {
    private store;
    private meta;
    /**
     * 注册或更新元素
     * @param group 分组名称
     * @param value 元素值，可选
     * @param elementOrFn 元素实例或创建函数
     * @returns 注册或更新后的元素实例
     */
    register(group: string, value: string | null, elementOrFn: ElementLike): HTMLElement;
    /**
     * 注销元素
     * @param group 分组名称
     * @param value 元素值，可选
     */
    unload(group: string, value?: string | null): void;
    get(group: string, value: string | null): HTMLElement | null;
    exists(group: string, value: string | null): boolean;
    list(group: string): HTMLElement[];
    unloadAll(): void;
}
export {};
