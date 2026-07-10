import { toCamelCase } from '@/lib/string/index'
import type { ComponentOption, ComponentPackageConfig, LoadedModule } from '@/types/component'
import {
    gatewayOptions,
    getComponentPackage
} from './ComponentGateway';
import { waitLoaded } from '@/lib/index';
import styleManager from '@/loader/component/lib/StyleManager';
import { looplanConfig, type LooplanConfig } from '@/config';
import { RemoteLoader } from './RemoteLoader';

declare global {
    // 扩展 Window 接口
    interface Window {
        [key: string]: any;
    }
}


// TODO state

// TODO -- 组件包配置集合
const pkgs: Record<string, ComponentPackageConfig> = {};
// TODO -- 已加载的组件包数据缓存
const pkgsLoaded: Record<string, LoadedModule> = {};

/**
 * TODO 组件管理器
 * 
 */
export class ComponentManager {
    private components: Record<string, any> = {};

    /**
     * TODO -- 组件包网关加载状态
     * 0 -- 未加载
     * 1 -- 加载中
     * -1 -- 加载失败
     * 200 -- 已加载
     */
    public pkgGatewayLoading: Record<string, number> = {};

    /**
     * 规范化组件名称，格式：包名@驼峰组件名
     */
    parseComponentName(raw: string): string {
        const [pkg, comp] = raw.split('@');
        return `${pkg}@${toCamelCase(comp)}`;
    }

    /**
     * 获取或注册组件。
     * TODO -- 获取或注册组件。
     * @param nameRaw 原始名称，如 'MuloLayer@TestComponent'
     * @param component 可选，如果传入则注册该组件
     */
    async component(nameRaw: string, component: any = null): Promise<any> {
        const name = this.parseComponentName(nameRaw);

        // 注册模式
        if (component) {
            this.components[name] = component;
            return;
        }

        console.log('getMember')

        // 获取组件包成员
        const {
            row,
            componentOption,
            pkg,
            name: componentName,
        } = await this.getMember(nameRaw);

        console.log('getMember success')

        // 检查组件选项，如果组件需要在使用时加载样式
        if (componentOption && componentOption.styleImportCase === 'use' && componentOption.styleCdn) {
            // 在使用时加载组件特定样式
            await styleManager.loadStyle(name, componentOption.styleCdn, pkgs[pkg]?.version || '');

            console.log('loadStyle success')
        }

        // 异步组件则执行函数
        if (this.isAsyncComponent(pkg, componentName)) {
            console.debug('加载异步组件', name);
            return row();
        }

        return row;
    }

    /**
     * TODO -- 获取组件
     * @param name 组件名称
     * @returns 组件
     */
    async getMember(nameRaw: string) {
        const name = this.parseComponentName(nameRaw);
        // 获取模式
        // console.debug('component 加载组件', name);
        const [packageName, componentName] = name.split('@');

        // 未配置的包通过网关加载
        if (!pkgs[packageName]) {
            if (gatewayOptions.length) {
                const gatewayStatus = this.pkgGatewayLoading[packageName];
                if (gatewayStatus === 1) {
                    await waitLoaded(() => {
                        const status = this.pkgGatewayLoading[packageName];
                        return !!pkgs[packageName] || status === -1 || status === 200;
                    })
                    if (!pkgs[packageName]) {
                        throw new Error(`从网关加载组件包失败: ${packageName}`);
                    }
                } else {
                    if (gatewayStatus === -1) {
                        this.pkgGatewayLoading[packageName] = 0;
                    }
                    this.pkgGatewayLoading[packageName] = 1;
                    try {
                        const cfg = await getComponentPackage(packageName);
                        if (!cfg) {
                            throw new Error(`从网关加载组件包失败: ${packageName}`);
                        }
                        pkgs[packageName] = cfg;
                        this.pkgGatewayLoading[packageName] = 200;
                    } catch (error) {
                        this.pkgGatewayLoading[packageName] = -1;
                        console.error('从网关加载组件包失败', packageName);
                        throw error;
                    }
                }
            }
        }

        // 如果包未加载，先异步加载
        if (!pkgsLoaded[packageName]) {
            const pkgData = await this.getPackage(packageName);
            // console.log('pkgData', packageName, pkgData, pkgs);
            this.registerComponents(pkgs[packageName], pkgData);
        }

        // 检查组件包样式，如果组件包需要在使用时加载样式
        const pkgConfig = pkgs[packageName];
        if (pkgConfig && pkgConfig.styleCdn && pkgConfig.styleCdn.length > 0 && pkgConfig.styleImportCase === 'use') {
            // 在使用时加载组件包样式
            await styleManager.loadStyle(packageName, pkgConfig.styleCdn, pkgConfig.version || '');
        }

        const componentOption = this.getComponentOption(name);

        let row = this.components[name];
        // 允许直接返回
        if (!row) {
            row = pkgsLoaded[packageName][componentName];
        }
        if (!row) {
            throw new Error(`未找到${name}`);
        }

        return {
            pkgConfig: pkgConfig,
            componentOption: componentOption,
            row,
            pkg: packageName,
            name: componentName,
        };
    }

    /**
     * TODO -- 获取组件选项对象
     * @param item 组件选项或组件名称字符串
     * @returns 组件选项对象
     */
    private getComponentOptionObject(item: ComponentOption | string): ComponentOption {
        return typeof item === 'string' ? nameToOption(item) : item;
    }

    /**
     * 注册包内所有组件到 this.components
     * TODO -- 注册
     */
    private registerComponents(pkgConfig: ComponentPackageConfig, pkgData: LoadedModule): void {
        // console.log('注册组件包', pkgConfig.name, pkgData);
        pkgConfig.components.forEach(opt => {
            const componentOption = this.getComponentOptionObject(opt);
            const compName = toCamelCase(componentOption.name);
            const key = `${pkgConfig.name}@${compName}`;
            // console.log('注册组件', key, pkgData[compName]);
            this.components[key] = pkgData[compName];
        });
    }

    /**
     * TODO -- 获取组件选项对象
     * @param raw 组件名称字符串
     * @returns 组件选项对象
     */
    getComponentOption(raw: string): ComponentOption | undefined {
        const name = this.parseComponentName(raw);
        const [pkg, comp] = name.split('@');
        const pkgCfg = pkgs[pkg];
        if (!pkgCfg) return undefined;

        const foundComponent = pkgCfg.components.find(o => {
            const componentOption = this.getComponentOptionObject(o);
            return toCamelCase(componentOption.name) === comp;
        });

        return foundComponent ? this.getComponentOptionObject(foundComponent) : undefined;
    }

    /**
     * TODO -- 判断是否异步组件
     * @param pkg 包名
     * @param comp 组件名
     * @returns 
     */
    isAsyncComponent(pkg: string, comp: string): boolean {
        const cfg = pkgs[pkg];
        if (!cfg) return false;

        if (cfg.asyncComponents) {
            return cfg.asyncComponents.includes(comp);
        }

        const component = cfg.components.find(o => {
            const componentOption = this.getComponentOptionObject(o);
            return toCamelCase(componentOption.name) === comp;
        });

        if (!component) return false;
        return !!this.getComponentOptionObject(component).isAsync;
    }

    /**
     * TODO -- 异步加载组件包
     * 
     * @todo 加载组件文件到内存
     * @param packageName 组件包名称
     * @returns 组件包数据
     */
    private async getPackage(packageName: string): Promise<LoadedModule> {
        // console.debug('getPackage 加载组件包', packageName);
        let cfg = pkgs[packageName];

        if (!cfg) throw new Error(`组件包不存在: ${packageName}`);

        // 已加载
        if (pkgsLoaded[packageName]) {
            return pkgsLoaded[packageName];
        }

        // CDN 加载流程
        if (cfg.type === 'cdn') {
            if (cfg.loadStatus === -1) cfg.loadStatus = 0;
            if (cfg.loadStatus === 0) {
                cfg.loadStatus = 1;
                try {
                    // 如果配置了样式且是注册时加载，先加载样式
                    if (cfg.styleCdn && cfg.styleCdn.length > 0 && cfg.styleImportCase === 'register') {
                        await styleManager.loadStyle(packageName, cfg.styleCdn, cfg.version || '');
                    }

                    const data = await this.loadOnlineComponentPackage(cfg);
                    pkgsLoaded[packageName] = data;
                    cfg.loadStatus = 200;
                } catch (e) {
                    cfg.loadStatus = -1;
                    throw e;
                }
            }

            // 等待加载完成, 防止重复加载
            if (cfg.loadStatus === 1) {
                await waitLoaded(() => {
                    return !!pkgsLoaded[packageName] || cfg.loadStatus === -1;
                })
                if (!pkgsLoaded[packageName]) {
                    throw new Error(`加载组件包失败: ${packageName}`);
                }
            }
        }

        // 本地组件包样式加载逻辑
        if (cfg.type === 'local') {
            // 如果配置了样式且是注册时加载，先加载样式
            if (cfg.styleCdn && cfg.styleCdn.length > 0 && cfg.styleImportCase === 'register') {
                await styleManager.loadStyle(packageName, cfg.styleCdn, cfg.version || '');
            }
        }

        return pkgsLoaded[packageName];
    }


    /**
     * TODO -- 手动添加本地组件包
     * @param cfg 组件包配置
     * @param data 组件包数据
     */
    addLocalPackage(cfg: ComponentPackageConfig, data: LoadedModule): void {
        pkgs[cfg.name] = cfg;
        pkgsLoaded[cfg.name] = data;
        this.registerComponents(cfg, data);
    }

    /**
     * TODO -- 添加组件包配置
     * @param cfg 组件包配置
     */
    registerPackage(cfg: ComponentPackageConfig): void {
        cfg = Object.assign({
            loadStatus: 0,
            styleImportCase: 'register' // 默认在注册时导入样式
        }, cfg);
        pkgs[cfg.name] = cfg;
    }

    /**
     * TODO -- 通过 CDN 加载全局 UMD 包
     * @todo 添加script
     * @todo 读取已加载数据
     * @param packageInfo 组件包配置
     * @returns 组件包数据
     */
    private loadOnlineComponentPackage(packageInfo: ComponentPackageConfig): Promise<LoadedModule> {
        return new Promise(async (resolve, reject) => {
            try {
                const { title, name, version, cdn, esCdn } = packageInfo;
                const useEs = looplanConfig.mode === 'es';
                const source = useEs ? (esCdn || cdn) : cdn;

                if (!source) {
                    reject(new Error(`组件库 ${name} 未设置 ${useEs ? 'ESM' : 'CDN'} 地址`));
                    return;
                }

                const url = source.replace('__version__', version || '');
                const loaded = await RemoteLoader.load(url);

                if (useEs) {
                    // 兼容 default 导出对象 和 命名导出两种 ESM 结构
                    const moduleObject = (loaded && loaded.default && typeof loaded.default === 'object')
                        ? loaded.default
                        : loaded;
                    resolve(moduleObject as LoadedModule);
                    return;
                }

                if (!window[name]) {
                    reject(new Error(`组件未在全局命名空间中找到: ${name}`));
                    return;
                }
                console.debug(`已加载在线组件库: %c${name}`, 'color: green');
                resolve(window[name]);
                if (!packageInfo.keepOfWindow) {
                    delete window[name];
                }
            } catch (error: any) {
                reject(new Error(`加载 ${packageInfo.title || packageInfo.name} 组件库失败: ${error?.message || error}`));
            }
        });
    }



    // TODO ## 加载

    // TODO ## 装载
}


/**
 * 将字符串组件名转换为组件选项对象
 * @param componentName 组件名称字符串
 * @returns 组件选项对象
 */
function nameToOption(componentName: string): ComponentOption {
    return {
        title: componentName,
        name: componentName,
        modelType: 'none'
    };
}

const componentManager = new ComponentManager();
export default componentManager;
