import { toCamelCase } from '@/lib/string/index'
import type { ComponentOption, ComponentPackageConfig, LoadedModule } from '@/types/component'
import {
    gatewayOptions,
    getComponentPackage
} from './ComponentGateway';
import { waitLoaded } from '@/lib/index';
import styleManager from '@/loader/component/lib/StyleManager';

declare global {
    // 扩展 Window 接口
    interface Window {
        [key: string]: any;
    }
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

// TODO state

// TODO -- 组件包配置集合
const componentPackages: Record<string, ComponentPackageConfig> = {
    MuloLayer: {
        name: 'MuloLayer',
        title: 'MuloLayer',
        type: 'cdn',
        version: 'v1',
        cdn: 'http://component.loqh.cn/mulo-layer/__version__/mulo-layer.umd.js',
        styleCdn: [],
        components: [
            {
                title: '测试组件',
                name: 'MuloTest',
                modelType: 'none',
            }
        ],
        loadStatus: 0,
    }
};

// TODO -- 已加载的组件包数据缓存
const componentPackagesLoaded: Record<string, LoadedModule> = {};

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
        // 获取模式
        console.debug('component 加载组件', name);
        const [packageName, componentName] = name.split('@');

        // 未配置的包通过网关加载
        if (!componentPackages[packageName]) {
            if (gatewayOptions.length) {

                if (this.pkgGatewayLoading[packageName] == 0 || this.pkgGatewayLoading[packageName] == undefined) {
                    this.pkgGatewayLoading[packageName] = 1;
                    try {
                        const cfg = await getComponentPackage(packageName);
                        componentPackages[packageName] = cfg;
                    } catch (error) {
                        console.error('从网关加载组件包失败', packageName, error);
                    }
                } else {
                    // 等待加载完成, 防止重复加载
                    await waitLoaded(() => {
                        return !!componentPackages[packageName];
                    })
                }
            }
        }

        // 如果包未加载，先异步加载
        if (!componentPackagesLoaded[packageName]) {
            const pkgData = await this.getPackage(packageName);
            // console.log('pkgData', packageName, pkgData, componentPackages);
            this.registerComponents(componentPackages[packageName], pkgData);
        }

        // 检查组件包样式，如果组件包需要在使用时加载样式
        const pkgConfig = componentPackages[packageName];
        if (pkgConfig && pkgConfig.styleCdn && pkgConfig.styleCdn.length > 0 && pkgConfig.styleImportCase === 'use') {
            // 在使用时加载组件包样式
            await styleManager.loadStyle(packageName, pkgConfig.styleCdn, pkgConfig.version || '');
        }

        // 检查组件选项，如果组件需要在使用时加载样式
        const componentOption = this.getComponentOption(name);
        if (componentOption && componentOption.styleImportCase === 'use' && componentOption.styleCdn) {
            // 在使用时加载组件特定样式
            await styleManager.loadStyle(name, componentOption.styleCdn, componentPackages[packageName]?.version || '');
        }

        let row = this.components[name];
        // 允许直接返回
        if (!row) {
            row = componentPackagesLoaded[packageName][componentName];
        }
        if (!row) {
            throw new Error(`未找到${name}`);
        }
        // 异步组件则执行函数
        if (this.isAsyncComponent(packageName, componentName)) {
            console.debug('加载异步组件', name);
            return row();
        }

        return row;
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
        const pkgCfg = componentPackages[pkg];
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
        const cfg = componentPackages[pkg];
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
        let cfg = componentPackages[packageName];

        if (!cfg) throw new Error(`组件包不存在: ${packageName}`);

        // 已加载
        if (componentPackagesLoaded[packageName]) {
            return componentPackagesLoaded[packageName];
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
                    componentPackagesLoaded[packageName] = data;
                    cfg.loadStatus = 200;
                } catch (e) {
                    cfg.loadStatus = -1;
                    throw e;
                }
            }

            // 等待加载完成, 防止重复加载
            if (cfg.loadStatus === 1) {
                await waitLoaded(() => {
                    return !!componentPackagesLoaded[packageName];
                })
            }
        }
        
        // 本地组件包样式加载逻辑
        if (cfg.type === 'local') {
            // 如果配置了样式且是注册时加载，先加载样式
            if (cfg.styleCdn && cfg.styleCdn.length > 0 && cfg.styleImportCase === 'register') {
                await styleManager.loadStyle(packageName, cfg.styleCdn, cfg.version || '');
            }
        }

        return componentPackagesLoaded[packageName];
    }


    /**
     * TODO -- 手动添加本地组件包
     * @param cfg 组件包配置
     * @param data 组件包数据
     */
    addLocalPackage(cfg: ComponentPackageConfig, data: LoadedModule): void {
        componentPackages[cfg.name] = cfg;
        componentPackagesLoaded[cfg.name] = data;
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
        componentPackages[cfg.name] = cfg;
    }

    /**
     * TODO -- 通过 CDN 加载全局 UMD 包
     * @todo 添加script
     * @todo 读取已加载数据
     * @param packageInfo 组件包配置
     * @returns 组件包数据
     */
    private loadOnlineComponentPackage(packageInfo: ComponentPackageConfig): Promise<LoadedModule> {
        return new Promise((resolve, reject) => {
            // console.debug(`开始加载在线组件库: %c${packageInfo.name}`, 'color: blue');
            // 从组件包信息中解构出需要的属性
            const { title, name, version, cdn } = packageInfo;

            if (!cdn) {
                reject(new Error(`组件库 ${name} 未设置 CDN 地址`));
                return;
            }

            // 创建加载组件
            const url = cdn.replace('__version__', version || '');
            const script = document.createElement('script');
            script.src = url;
            script.onload = () => {
                if (window[name]) {
                    console.debug(`已加载在线组件库: %c${name}`, 'color: green');
                    resolve(window[name]);

                    // 如果不需要保留在window上，则删除
                    if (!packageInfo.keepOfWindow) {
                        delete window[name];
                    }
                } else {
                    reject(new Error(`组件未在全局命名空间中找到: ${name}`));
                }
                document.body.removeChild(script);
            };
            script.onerror = () => {
                document.body.removeChild(script);
                reject(new Error(`加载 ${title || name} 组件库失败`));
            };
            // 开始加载
            document.body.appendChild(script);
        });
    }



    // TODO ## 加载

    // TODO ## 装载
}

const componentManager = new ComponentManager();
export default componentManager;