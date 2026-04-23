import { looplanConfig, type LooplanConfig } from '../../../config';

/**
 * 远程 JS 加载器
 * 支持：.es.js + .umd.js / .js
 */
class RemoteLoader {
    private static scriptLoadingMap: Record<string, Promise<void> | undefined> = {};
    /**
     * 加载远程模块
     * - 自动识别模块类型，根据后缀名判断是否为 ES 模块或 UMD 模块
     * @param {string} url 模块地址
     * @returns {Promise<any>}
     */
    static async load(url: string) {
        if (looplanConfig.mode === 'es') {
            return await RemoteLoader.loadES(url);
        }
        return await RemoteLoader.loadUMD(url);
    }

    /**
     * 加载 ES 模块
     * @param url 模块URL
     * @returns 模块导出
     */
    static async loadES(url: string) {
        return await import(/* @vite-ignore */ url);
    }

    /**
     * 加载 UMD 模块
     * @param url 模块URL
     * @returns 模块导出
     */
    static async loadUMD(url: string) {
        const loadedScript = document.querySelector(`script[data-looplan-src="${url}"]`);
        if (loadedScript) return;

        const loadingTask = RemoteLoader.scriptLoadingMap[url];
        if (loadingTask) {
            return await loadingTask;
        }

        const newTask = new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.dataset.looplanSrc = url;
            script.onload = () => {
                resolve();
                delete RemoteLoader.scriptLoadingMap[url];
            };
            script.onerror = () => {
                delete RemoteLoader.scriptLoadingMap[url];
                reject(new Error(`加载远程脚本失败: ${url}`));
            };
            document.body.appendChild(script);
        });
        RemoteLoader.scriptLoadingMap[url] = newTask;

        return await newTask;
    }
}

export {
    RemoteLoader,
}
