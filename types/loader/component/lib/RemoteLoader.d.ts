import type { ComponentPackageConfig, LoadedModule } from '../../../types/component';
/**
 * 远程 JS 加载器
 * 支持：.es.js + .umd.js / .js
 */
declare class RemoteLoader {
    /**
     * 加载远程模块
     * - 优先按当前运行模式加载，无对应地址时自动回退
     * @param packageInfo 组件包配置
     * @returns {Promise<any>}
     */
    static load(packageInfo: ComponentPackageConfig): Promise<LoadedModule>;
    /**
     * 根据当前模式选择远程地址
     */
    private static resolveTarget;
    /**
     * 加载 ES 模块
     * @param url 模块URL
     * @returns 模块导出
     */
    static loadES(url: string): Promise<LoadedModule>;
    /**
     * 加载 UMD 模块
     * @param url 模块URL
     * @returns 模块导出
     */
    static loadUMD(url: string, packageInfo: ComponentPackageConfig): Promise<LoadedModule>;
}
export { RemoteLoader, };
