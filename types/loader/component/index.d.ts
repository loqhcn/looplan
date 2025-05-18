import asyncLoading from "./loading/asyncLoading.vue";
import asyncError from "./loading/asyncError.vue";
import type { ComponentPackageConfig } from "./lib/ComponentManager";
interface ComponentLoaderOptions {
    package: string;
    isCache: boolean;
}
interface ComponentPackageData {
    packageConfig: ComponentPackageConfig;
    [key: string]: any;
}
/**
 * 通过名称判断是否使用异步组件
 * @param {*} name 组件包名称
 */
declare function nameIsUseAsyncComponent(name: string): false | RegExpMatchArray | null;
declare function setComponentPackage(packageData: ComponentPackageData): void;
/** 注册组件包信息 */
declare function registerPackage(packageConfig: ComponentPackageConfig): void;
declare class ComponentLoader {
    options: ComponentLoaderOptions;
    constructor();
    static src(packageName?: string): ComponentLoader;
    package(packageName: string): this;
    dest(): Promise<this>;
}
/**
 * 定义异步组件订单时间
 * @param {*} delay
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
declare function getComponentOption(name: string): import("./lib/ComponentManager").ComponentOption | undefined;
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
export { setComponentPackage, registerPackage, ComponentLoader, asyncLoading, asyncError, loadComponent, asyncComponentDelay, nameIsUseAsyncComponent, getComponentOption, };
