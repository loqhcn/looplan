/**
 * 样式管理器
 * 基于ElementManager实现，用于管理组件包和组件的样式
 * 支持按组件包或具体组件进行样式的加载和卸载
 */
export declare class StyleManager {
    private elementManager;
    private loadingPromises;
    /**
     * 解析样式名称，判断是组件包还是具体组件
     * @param name 样式名称，格式：包名 或 包名@组件名
     * @returns 解析结果
     */
    private parseName;
    /**
     * 创建样式链接元素
     * @param href 样式链接地址
     * @returns 样式链接元素创建函数
     */
    private createStyleLink;
    /**
     * 加载样式
     * @param name 样式名称，格式：包名 或 包名@组件名
     * @param styleUrls 样式URL数组
     * @param version 版本号，用于替换__version__占位符
     * @returns Promise
     */
    loadStyle(name: string, styleUrls: string[], version?: string): Promise<void>;
    /**
     * 实际执行样式加载的方法
     * @param group 样式组名
     * @param styleUrls 样式URL数组
     * @param version 版本号
     * @param componentName 组件名（可选）
     * @returns Promise
     */
    private doLoadStyle;
    /**
     * 卸载样式
     * @param name 样式名称，格式：包名 或 包名@组件名
     */
    unloadStyle(name: string): void;
    /**
     * 检查样式是否已加载
     * @param name 样式名称，格式：包名 或 包名@组件名
     * @returns 是否已加载
     */
    isStyleLoaded(name: string): boolean;
    getLoadedStyles(name: string): HTMLLinkElement[];
    /**
     * 获取所有已注册的组名（私有方法，用于内部遍历）
     * @returns 组名数组
     */
    private getAllGroups;
    /**
     * 卸载所有样式
     */
    unloadAllStyles(): void;
}
declare const styleManager: StyleManager;
export default styleManager;
