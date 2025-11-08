import asyncLoading from "./loading/asyncLoading.vue";
import asyncError from "./loading/asyncError.vue";
import type { ComponentPackageConfig, ComponentLoaderOptions, ComponentOption } from "@/types/component";
/**
 * 通过名称判断是否使用异步组件
 * @param {*} name 组件包名称
 */
declare function nameIsUseAsyncComponent(name: string): false | RegExpMatchArray | null;
declare function setComponentPackage(packageData: any): void;
/** 注册组件包信息 */
declare function registerPackage(packageConfig: ComponentPackageConfig): void;
/**
 * 加载样式（支持包级别和组件级别）
 * @param name 样式名称，格式：包名 或 包名@组件名
 * @param styleCdn 样式CDN链接数组（可选，如果不提供则从配置中获取）
 * @param version 版本号（可选）
 */
declare function loadStyle(name: string, styleCdn?: string[], version?: string): Promise<void>;
/**
 * 卸载样式（支持包级别和组件级别）
 * @param name 样式名称，格式：包名 或 包名@组件名
 */
declare function unloadStyle(name: string): void;
/**
 * 检查样式是否已加载
 * @param name 样式名称
 */
declare function isStyleLoaded(name: string): boolean;
/**
 * 获取所有已加载的样式
 */
declare function getLoadedStyles(name: string): HTMLLinkElement[];
/**
 * 卸载所有样式
 */
declare function unloadAllStyles(): void;
declare class ComponentLoader {
    options: ComponentLoaderOptions;
    constructor();
    static src(packageName?: string): ComponentLoader;
    package(packageName: string): this;
    dest(): Promise<this>;
}
/**
 * 定义异步组件订单时间
 * @param delay 等待时间
 * @returns
 */
declare function asyncComponentDelay(delay?: number): {
    default: never;
};
/**
 * 获取组件的配置
 *
 * @param {*} name
 * @returns
 */
declare function getComponentOption(name: string): ComponentOption | undefined;
/**
 * 加载组件
 * @param {string} name - 组件名称
 * @param {Object} [options={}] - 可选配置项
 * @param {Function} [options.errorComponent] - 组件加载失败时显示的组件
 * @param {Object} [options.loadingComponent] - 组件加载时显示的加载组件
 * @returns {Object} - 一个异步组件
 */
declare function loadComponent(name: string, options?: {}): {
    default: never;
};
export { setComponentPackage, registerPackage, ComponentLoader, asyncLoading, asyncError, loadComponent, asyncComponentDelay, nameIsUseAsyncComponent, getComponentOption, loadStyle, unloadStyle, isStyleLoaded, getLoadedStyles, unloadAllStyles, };
