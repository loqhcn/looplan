import {
    defineAsyncComponent,
    type Component,
    type App
} from "vue";
import { loadComponent } from '@/loader/component';


/**
 * 解析组件，支持直接组件、异步组件、字符串组件名
 * @param comp 组件定义（直接组件、异步组件工厂、组件名字符串）
 * @param app Vue 应用实例（如果是字符串组件名，需要提供应用实例）
 * - 组件内 `const instance = getCurrentInstance()` && `const app = instance.appContext.app`
 * @returns 解析后的组件对象
 */
export function resolveComponent(comp: any, app?: App): Component {
    // 1. null / undefined
    if (!comp) {
        throw new Error("Invalid component: " + comp);
    }

    // 2. 字符串：从全局组件表里取
    if (typeof comp === "string") {
        // 检查是否是 Looplan 组件
        if (isLooplanComponent(comp)) {
            return loadComponent(comp);
        }
        if (!app) {
            throw new Error("获取全局组件失败：未提供 Vue 应用实例");
        }
        const found = app.component(comp);
        if (!found) {
            throw new Error(`Component "${comp}" not found in app registry`);
        }
        return found;
    }

    // 3. 直接是组件对象
    if (typeof comp === "object" && !("then" in comp)) {
        return comp;
    }

    // 4. 是 Promise（import()）
    if (comp instanceof Promise || (typeof comp === "object" && "then" in comp)) {
        return defineAsyncComponent(() => comp.then((m: any) => m.default || m));
    }

    // 5. 是函数：可能是 async import factory
    if (typeof comp === "function") {
        // 判断是否是异步组件工厂
        const r = comp();
        if (r instanceof Promise || (typeof r === "object" && "then" in r)) {
            return defineAsyncComponent(() =>
                r.then((m: any) => m.default || m)
            );
        }
        // 普通函数式组件
        return comp;
    }

    throw new Error("Unknown component type: " + comp);
}

/**
 * 判断组件是否是 Looplan 组件
 * @param comp 组件对象
 * @returns 是否是 Looplan 组件
 */
export function isLooplanComponent(name: string): boolean {
    //xx@xx
    return name.includes('@');
}
