import componentManager from "./lib/ComponentManager";
import { defineAsyncComponent } from "vue";
import asyncLoading from "./loading/asyncLoading.vue";
import asyncError from "./loading/asyncError.vue";
import { JsDataType } from "@/lib/data-type";
import type { ComponentPackageConfig, ComponentLoaderOptions, ComponentOption } from "@/types/component";

/**
 * 通过名称判断是否使用异步组件
 * @param {*} name 组件包名称
 */
function nameIsUseAsyncComponent(name: string) {
    if (typeof name !== 'string') {
        return false;
    }
    return name.match(/^[a-zA-Z0-9-]+@[a-zA-Z0-9-_]+$/);
}

function setComponentPackage(packageData: any) {
    console.log('%c设置组件包', "color:green;", packageData);
    componentManager.addLocalPackage(packageData.packageConfig, packageData);
}

/** 注册组件包信息 */
function registerPackage(packageConfig: ComponentPackageConfig) {
    console.debug('%c注册组件包', "color:green;", packageConfig);
    componentManager.registerPackage(packageConfig);
}

/**
 * 加载包级别样式
 * @param packageName 包名称
 */
async function loadPackageStyles(packageName: string): Promise<void> {
    return componentManager.loadPackageStyles(packageName);
}

/**
 * 卸载包级别样式
 * @param packageName 包名称
 */
function unloadPackageStyles(packageName: string): void {
    componentManager.unloadPackageStyles(packageName);
}

/**
 * 卸载特定组件的样式
 * @param componentName 组件名称，格式：包名@组件名
 */
function unloadComponentStyles(componentName: string): void {
    componentManager.unloadComponentStyles(componentName);
}

/**
 * 获取所有已加载的样式链接
 */
function getLoadedStyleLinks(): Record<string, HTMLLinkElement[]> {
    return componentManager.getLoadedStyleLinks();
}

class ComponentLoader {
    options: ComponentLoaderOptions;

    constructor() {
        this.options = {
            package: '',
            isCache: false, //是否缓存组件
        };
    }

    static src(packageName = '') {
        const obj = new ComponentLoader();
        packageName && obj.package(packageName);
        return obj;
    }

    package(packageName: string) {
        this.options.package = packageName;
        return this;
    }

    async dest() {
        return this;
    }

}

/**
 * 定义异步组件订单时间
 * @param {*} delay 
 * @returns 
 */
function asyncComponentDelay(delay = 500) {
    return defineAsyncComponent({
        loader: () => {
            return new Promise(async (resolve, reject) => {
                try {
                    setTimeout(() => {
                        resolve(function () {
                            return '';
                        } as never);
                    }, delay)
                } catch (e) {
                    reject(e);
                }
            })
        },
    });
}

/**
 * 获取组件的配置
 *
 * @param {*} name 
 * @returns 
 */
function getComponentOption(name: string) {
    return componentManager.getComponentOption(name);
}

/**
 * 加载组件
 * @param {string} name - 组件名称
 * @param {Object} [options={}] - 可选配置项
 * @param {Function} [options.errorComponent] - 组件加载失败时显示的组件
 * @param {Object} [options.loadingComponent] - 组件加载时显示的加载组件
 * @returns {Object} - 一个异步组件
 */
function loadComponent(name:string, options = {}) {
    // 解析组件名称
    name = componentManager.parseComponentName(name);
    // 合并默认配置和用户传入的配置
    const _options = Object.assign({
        // 定义组件加载失败时显示的组件
        errorComponent: function (props:any) {
            return `组件加载失败:${name}`;
        },
        // 定义组件加载时显示的加载组件
        loadingComponent: asyncLoading,
    }, options);
    // 返回一个异步组件
    return defineAsyncComponent({
        // 异步加载组件的函数
        loader: () => {
            return new Promise(async (resolve, reject) => {
                try {
                    // 打印调试信息，显示正在加载的组件名称
                    console.debug('-- 加载组件:', name);
                    // 从组件管理器中获取组件
                    let component = await componentManager.component(name);
                    // 如果组件不存在，拒绝 Promise 并抛出错误
                    if (!component) {
                        reject(new Error('组件不存在:' + name));
                        // reject("new Error('组件不存在:' + name)");

                        return;
                    }
                    // 如果组件存在，解析 Promise 并返回组件
                    resolve(component)
                } catch (e) {
                    // 如果加载过程中出现错误，拒绝 Promise 并抛出错误
                    reject(e);
                }
            })
        },
        // 展开合并后的配置项
        ..._options
    });
}

export {
    setComponentPackage,
    registerPackage,
    ComponentLoader,
    // 组件
    asyncLoading,
    asyncError,
    // 异步组件定义
    loadComponent,
    asyncComponentDelay,
    // 方法
    nameIsUseAsyncComponent,
    getComponentOption,
    // 样式管理
    loadPackageStyles,
    unloadPackageStyles,
    unloadComponentStyles,
    getLoadedStyleLinks,
}