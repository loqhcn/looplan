/**
 * 远程 JS 加载器
 * 支持：.es.js + .umd.js / .js
 */
declare class RemoteLoader {
    private static scriptLoadingMap;
    /**
     * 加载远程模块
     * - 自动识别模块类型，根据后缀名判断是否为 ES 模块或 UMD 模块
     * @param {string} url 模块地址
     * @returns {Promise<any>}
     */
    static load(url: string): Promise<any>;
    /**
     * 加载 ES 模块
     * @param url 模块URL
     * @returns 模块导出
     */
    static loadES(url: string): Promise<any>;
    /**
     * 加载 UMD 模块
     * @param url 模块URL
     * @returns 模块导出
     */
    static loadUMD(url: string): Promise<void>;
}
export { RemoteLoader, };
