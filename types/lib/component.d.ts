import { type Component, type App } from "vue";
/**
 * 解析组件，支持直接组件、异步组件、字符串组件名
 * @param comp 组件定义（直接组件、异步组件工厂、组件名字符串）
 * @param app Vue 应用实例（如果是字符串组件名，需要提供应用实例）
 * - 组件内 `const instance = getCurrentInstance()` && `const app = instance.appContext.app`
 * @returns 解析后的组件对象
 */
export declare function resolveComponent(comp: any, app?: App): Component;
/**
 * 判断组件是否是 Looplan 组件
 * @param comp 组件对象
 * @returns 是否是 Looplan 组件
 */
export declare function isLooplanComponent(name: string): boolean;
