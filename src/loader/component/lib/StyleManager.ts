import { ElementManager } from '@/lib/ElementManager';

/**
 * 样式管理器
 * 基于ElementManager实现，用于管理组件包和组件的样式
 * 支持按组件包或具体组件进行样式的加载和卸载
 */
export class StyleManager {
  private elementManager = new ElementManager();
  private loadingPromises = new Map<string, Promise<void>>();

  /**
   * 解析样式名称，判断是组件包还是具体组件
   * @param name 样式名称，格式：包名 或 包名@组件名
   * @returns 解析结果
   */
  private parseName(name: string): { packageName: string; componentName?: string } {
    const parts = name.split('@');
    if (parts.length === 1) {
      return { packageName: parts[0] };
    }
    return { packageName: parts[0], componentName: parts[1] };
  }

  /**
   * 创建样式链接元素
   * @param href 样式链接地址
   * @returns 样式链接元素创建函数
   */
  private createStyleLink(href: string): () => HTMLLinkElement {
    return () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      return link;
    };
  }

  /**
   * 加载样式
   * @param name 样式名称，格式：包名 或 包名@组件名
   * @param styleUrls 样式URL数组
   * @param version 版本号，用于替换__version__占位符
   * @returns Promise
   */
  async loadStyle(name: string, styleUrls: string[], version: string = ''): Promise<void> {
    const { packageName, componentName } = this.parseName(name);
    const group = componentName ? `${packageName}@${componentName}` : packageName;

    // 检查是否已经在加载中，如果是则等待之前的加载完成
    if (this.loadingPromises.has(group)) {
      console.debug(`样式正在加载中，等待完成: %c${group}`, 'color: orange');
      return this.loadingPromises.get(group)!;
    }

    // 检查是否已经加载过
    if (this.isStyleLoaded(name)) {
      console.debug(`样式已加载，跳过: %c${group}`, 'color: blue');
      return;
    }

    console.debug(`加载样式: %c${group}`, 'color: red');

    // 创建加载Promise并缓存
    const loadPromise = this.doLoadStyle(group, styleUrls, version, componentName);
    this.loadingPromises.set(group, loadPromise);

    try {
      await loadPromise;
    } finally {
      // 无论成功还是失败，都要清除缓存的Promise
      this.loadingPromises.delete(group);
    }
  }

  /**
   * 实际执行样式加载的方法
   * @param group 样式组名
   * @param styleUrls 样式URL数组
   * @param version 版本号
   * @param componentName 组件名（可选）
   * @returns Promise
   */
  private async doLoadStyle(group: string, styleUrls: string[], version: string, componentName?: string): Promise<void> {
    // 加载所有样式
    const loadPromises = styleUrls.map((styleUrl, index) => {
      return new Promise<void>((resolve, reject) => {
        const linkUrl = styleUrl.replace('__version__', version);
        const linkElement = this.createStyleLink(linkUrl)();

        linkElement.onload = () => {
          console.debug(`已加载样式: %c${linkUrl}`, 'color: green');
          resolve();
        };

        linkElement.onerror = () => {
          console.error(`加载样式失败: ${linkUrl}`);
          document.head.removeChild(linkElement);

          // 组件包级别的样式加载失败时抛出异常，组件级别的样式加载失败时只记录错误
          if (!componentName) {
            console.error(`组件包样式加载失败: ${linkUrl}`, group);
            reject(new Error(`加载样式失败: ${linkUrl}`));
          } else {
            console.warn(`组件样式加载失败，继续执行: ${linkUrl}`);
            resolve();
          }
        };

        // 注册到ElementManager
        this.elementManager.register(group, `style-${index}`, linkElement);
        document.head.appendChild(linkElement);
      });
    });

    console.log('loadPromises', styleUrls, loadPromises);

    await Promise.all(loadPromises);
  }

  /**
   * 卸载样式
   * @param name 样式名称，格式：包名 或 包名@组件名
   */
  unloadStyle(name: string): void {
    const { packageName, componentName } = this.parseName(name);

    if (componentName) {
      // 卸载具体组件的样式
      const componentGroup = `${packageName}@${componentName}`;
      console.debug(`卸载组件样式: %c${componentGroup}`, 'color: orange');
      this.elementManager.unload(componentGroup);
    } else {
      // 卸载整个组件包的样式（包括包级别和所有组件级别的样式）
      console.debug(`卸载组件包样式: %c${packageName}`, 'color: orange');

      // 卸载包级别样式
      this.elementManager.unload(packageName);

      // 卸载所有与该包相关的组件样式
      // 遍历所有已注册的组，找到以该包名开头的组件样式
      const allGroups = this.getAllGroups();
      allGroups.forEach(group => {
        if (group.startsWith(`${packageName}@`)) {
          this.elementManager.unload(group);
        }
      });
    }
  }

  /**
   * 检查样式是否已加载
   * @param name 样式名称，格式：包名 或 包名@组件名
   * @returns 是否已加载
   */
  isStyleLoaded(name: string): boolean {
    const { packageName, componentName } = this.parseName(name);
    const group = componentName ? `${packageName}@${componentName}` : packageName;

    // 检查该组是否有任何样式元素
    return this.elementManager.list(group).length > 0;
  }


  getLoadedStyles(name: string): HTMLLinkElement[] {
    const { packageName, componentName } = this.parseName(name);
    const group = componentName ? `${packageName}@${componentName}` : packageName;
    return this.elementManager.list(group) as HTMLLinkElement[];
  }

  /**
   * 获取所有已注册的组名（私有方法，用于内部遍历）
   * @returns 组名数组
   */
  private getAllGroups(): string[] {
    // 由于ElementManager没有提供获取所有组名的方法，我们需要通过反射或其他方式获取
    // 这里我们使用一个简单的方法：维护一个内部的组名集合
    // 但为了保持与ElementManager的一致性，我们暂时返回空数组
    // 在实际使用中，可以考虑扩展ElementManager来支持这个功能
    return [];
  }

  /**
   * 卸载所有样式
   */
  unloadAllStyles(): void {
    console.debug('卸载所有样式', 'color: red');
    this.elementManager.unloadAll();
  }
}

// 创建全局样式管理器实例
const styleManager = new StyleManager();

export default styleManager;