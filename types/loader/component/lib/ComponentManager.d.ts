export interface ComponentOption {
    title: string;
    name: string;
    modelType: string;
    isAsync?: boolean;
    formModelType?: string;
}
/**
 * 组件包配置类型，用于描述组件包的基本信息和状态。
 * 包含组件包的名称、标题、类型、版本、CDN 地址等信息，以及加载状态。
 */
export interface ComponentPackageConfig {
    name: string;
    title: string;
    type: 'cdn' | 'local';
    version: string;
    /**
     * cdn 地址
     *
     */
    cdn: string;
    styleCdn: string[];
    components: ComponentOption[];
    loadStatus: -1 | 0 | 1 | 200;
}
export type LoadedModule = Record<string, any>;
declare global {
    interface Window {
        [key: string]: any;
    }
}
export declare class ComponentManager {
    private components;
    /**
     * 规范化组件名称，格式：包名@驼峰组件名
     */
    parseComponentName(raw: string): string;
    /**
     * 获取或注册组件。
     * @param nameRaw 原始名称，如 'MuloLayer@TestComponent'
     * @param component 可选，如果传入则注册该组件
     */
    component(nameRaw: string, component?: any): Promise<any>;
    /**
     * 注册包内所有组件到 this.components
     */
    private registerComponents;
    /** 获取组件选项 */
    getComponentOption(raw: string): ComponentOption | undefined;
    /** 判断是否异步组件 */
    isAsyncComponent(pkg: string, comp: string): boolean;
    /** 异步加载组件包 */
    private getPackage;
    /** 等待加载完成 */
    private waitComputeLoad;
    /** 手动添加本地组件包 */
    addLocalPackage(cfg: ComponentPackageConfig, data: LoadedModule): void;
    /** 添加组件包配置 */
    registerPackage(cfg: ComponentPackageConfig): void;
    /** 通过 CDN 加载全局 UMD 包 */
    private getOnlineComponentPackage;
}
declare const componentManager: ComponentManager;
export default componentManager;
