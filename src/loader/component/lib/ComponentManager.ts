import { toCamelCase } from '@/lib/string/index'
import type { ComponentOption, ComponentPackageConfig, LoadedModule } from '@/types/component'

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
function convertStringToComponentOption(componentName: string): ComponentOption {
    return {
        title: componentName,
        name: componentName,
        modelType: 'none'
    };
}

// 组件包配置集合
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

// 已加载的组件包数据缓存
const componentPackagesLoaded: Record<string, LoadedModule> = {};

// 已加载的样式链接，用于管理和卸载
const loadedStyleLinks: Record<string, HTMLLinkElement[]> = {};

export class ComponentManager {
    private components: Record<string, any> = {};

    /**
     * 规范化组件名称，格式：包名@驼峰组件名
     */
    parseComponentName(raw: string): string {
        const [pkg, comp] = raw.split('@');
        return `${pkg}@${toCamelCase(comp)}`;
    }

    /**
     * 获取或注册组件。
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
        console.debug('加载组件', name);
        const [packageName, componentName] = name.split('@');

        // 如果包未加载，先异步加载
        if (!componentPackagesLoaded[packageName]) {
            const pkgData = await this.getPackage(packageName);
            this.registerComponents(componentPackages[packageName], pkgData);
        }

        // 检查组件选项，如果组件需要在使用时加载样式
        const componentOption = this.getComponentOption(name);
        if (componentOption && componentOption.styleImportCase === 'use' && componentOption.styleCdn) {
            // 在使用时加载组件特定样式
            await this.loadComponentStyles(packageName, componentOption);
        }

        // 异步组件则执行函数
        if (this.isAsyncComponent(packageName, componentName)) {
            console.debug('加载异步组件', name);
            return this.components[name]();
        }
        return this.components[name];
    }

    /**
     * 获取组件选项对象
     * @param item 组件选项或组件名称字符串
     * @returns 组件选项对象
     */
    private getComponentOptionObject(item: ComponentOption | string): ComponentOption {
        return typeof item === 'string' ? convertStringToComponentOption(item) : item;
    }

    /**
     * 注册包内所有组件到 this.components
     */
    private registerComponents(pkgConfig: ComponentPackageConfig, pkgData: LoadedModule): void {
        console.log('注册组件包', pkgConfig.name, pkgData);
        pkgConfig.components.forEach(opt => {
            const componentOption = this.getComponentOptionObject(opt);
            const compName = toCamelCase(componentOption.name);
            const key = `${pkgConfig.name}@${compName}`;
            console.log('注册组件', key, pkgData[compName]);
            this.components[key] = pkgData[compName];
        });
    }

    /** 获取组件选项 */
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

    /** 判断是否异步组件 */
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

    /** 异步加载组件包 */
    private async getPackage(packageName: string): Promise<LoadedModule> {
        console.debug('getPackage 加载组件包', packageName);
        const cfg = componentPackages[packageName];
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
                        await this.loadPackageStyles(packageName);
                    }
                    
                    const data = await this.getOnlineComponentPackage(cfg);
                    componentPackagesLoaded[packageName] = data;
                    cfg.loadStatus = 200;
                } catch (e) {
                    cfg.loadStatus = -1;
                    throw e;
                }
            }
            
            if (cfg.loadStatus === 1) {
                await this.waitComputeLoad(packageName);
            }
        }

        return componentPackagesLoaded[packageName];
    }

    /** 等待加载完成 */
    private waitComputeLoad(pkg: string): Promise<void> {
        return new Promise((resolve) => {
            const iv = setInterval(() => {
                if (componentPackagesLoaded[pkg]) {
                    clearInterval(iv);
                    resolve();
                }
            }, 100);
        });
    }

    /** 手动添加本地组件包 */
    addLocalPackage(cfg: ComponentPackageConfig, data: LoadedModule): void {
        componentPackages[cfg.name] = cfg;
        componentPackagesLoaded[cfg.name] = data;
        this.registerComponents(cfg, data);
    }

    /** 添加组件包配置 */
    registerPackage(cfg: ComponentPackageConfig): void {
        cfg = Object.assign({
            loadStatus: 0,
            styleImportCase: 'register' // 默认在注册时导入样式
        }, cfg);
        componentPackages[cfg.name] = cfg;
    }

    /** 通过 CDN 加载全局 UMD 包 */
    private getOnlineComponentPackage(packageInfo: ComponentPackageConfig): Promise<LoadedModule> {
        return new Promise((resolve, reject) => {
            console.debug(`开始加载在线组件库: %c${packageInfo.name}`, 'color: blue');
            // 从组件包信息中解构出需要的属性
            const { title, name, version, cdn } = packageInfo;

            if (!cdn) {
                reject(new Error(`组件库 ${name} 未设置 CDN 地址`));
                return;
            }

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
            document.body.appendChild(script);
        });
    }

    /** 加载组件包的样式 */
    public loadPackageStyles(packageName: string): Promise<void> {
        const packageInfo = componentPackages[packageName];
        if (!packageInfo || !packageInfo.styleCdn || packageInfo.styleCdn.length === 0) {
            return Promise.resolve();
        }

        console.debug(`加载组件包样式: %c${packageName}`, 'color: blue');
        const version = packageInfo.version || '';
        
        // 创建存储链接元素的数组（如果不存在）
        if (!loadedStyleLinks[packageName]) {
            loadedStyleLinks[packageName] = [];
        }

        // 加载所有样式
        const loadPromises = packageInfo.styleCdn.map(styleSrc => {
            return new Promise<HTMLLinkElement>((resolve, reject) => {
                const linkUrl = styleSrc.replace('__version__', version);
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = linkUrl;
                
                link.onload = () => {
                    console.debug(`已加载样式: %c${linkUrl}`, 'color: green');
                    resolve(link);
                };
                
                link.onerror = () => {
                    console.error(`加载包样式失败: ${linkUrl}`);
                    document.head.removeChild(link);
                    // 包级别的样式加载失败时，继续抛出异常
                    reject(new Error(`加载 ${packageInfo.title || packageName} 样式失败: ${linkUrl}`));
                };
                
                document.head.appendChild(link);
                loadedStyleLinks[packageName].push(link);
            });
        });

        return Promise.all(loadPromises).then(() => void 0);
    }

    /** 加载组件特定的样式 */
    private async loadComponentStyles(packageName: string, componentOption: ComponentOption): Promise<void> {
        if (!componentOption.styleCdn || componentOption.styleCdn.length === 0) {
            return;
        }

        console.debug(`加载组件特定样式: %c${packageName}@${componentOption.name}`, 'color: blue');
        const packageInfo = componentPackages[packageName];
        const version = packageInfo?.version || '';
        
        // 创建组件特定的样式链接标识
        const componentStyleKey = `${packageName}@${componentOption.name}`;
        if (!loadedStyleLinks[componentStyleKey]) {
            loadedStyleLinks[componentStyleKey] = [];
        }

        // 加载所有样式
        const loadPromises = componentOption.styleCdn.map(styleSrc => {
            return new Promise<HTMLLinkElement | null>((resolve) => {
                const linkUrl = styleSrc.replace('__version__', version);
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = linkUrl;
                
                link.onload = () => {
                    console.debug(`已加载组件样式: %c${linkUrl}`, 'color: green');
                    resolve(link);
                };
                
                link.onerror = () => {
                    // 只在控制台打印错误信息，不抛出异常
                    console.error(`加载组件样式失败: ${linkUrl}`);
                    document.head.removeChild(link);
                    resolve(null); // 返回null表示加载失败
                };
                
                document.head.appendChild(link);
                loadedStyleLinks[componentStyleKey].push(link);
            });
        });

        // 等待所有样式加载完成
        const results = await Promise.all(loadPromises);
        
        // 过滤掉加载失败的样式链接
        loadedStyleLinks[componentStyleKey] = loadedStyleLinks[componentStyleKey].filter(
            link => results.includes(link)
        );
        
        return;
    }

    /** 卸载组件包的样式 */
    unloadPackageStyles(packageName: string): void {
        // 卸载包级别样式
        if (loadedStyleLinks[packageName]) {
            loadedStyleLinks[packageName].forEach(link => {
                if (document.head.contains(link)) {
                    document.head.removeChild(link);
                }
            });
            delete loadedStyleLinks[packageName];
        }

        // 卸载所有与该包相关的组件样式
        Object.keys(loadedStyleLinks).forEach(key => {
            if (key.startsWith(`${packageName}@`)) {
                loadedStyleLinks[key].forEach(link => {
                    if (document.head.contains(link)) {
                        document.head.removeChild(link);
                    }
                });
                delete loadedStyleLinks[key];
            }
        });
    }

    /** 卸载特定组件的样式 */
    unloadComponentStyles(rawName: string): void {
        const name = this.parseComponentName(rawName);
        if (loadedStyleLinks[name]) {
            loadedStyleLinks[name].forEach(link => {
                if (document.head.contains(link)) {
                    document.head.removeChild(link);
                }
            });
            delete loadedStyleLinks[name];
        }
    }

    /** 获取所有已加载的样式链接 */
    getLoadedStyleLinks(): Record<string, HTMLLinkElement[]> {
        return loadedStyleLinks;
    }
}

const componentManager = new ComponentManager();
export default componentManager;