import { iconGatewayOptions, setIconGateway, getIconPackage } from './IconGateway';
import type { IconPackageConfig } from '../types';
import { waitLoaded } from '@/lib';

/**
 * 已加载的图标库
 */
const IconPackages: Record<string, IconPackageConfig> = {};
const packageLoading: Record<string, number> = {};

/**
 * 加载图标
 */
async function loadIcon(iconName: string) {
    let iconInfo = parseIconName(iconName);
    let pkg = IconPackages[iconInfo.package];

    // 避免重复加载
    if (!pkg) {
        if (packageLoading[iconInfo.package]) {
            await waitLoaded(() => {
                return !!IconPackages[iconInfo.package];
            });
        }
        pkg = IconPackages[iconInfo.package];
    }

    // 加载图标库
    if (!pkg) {
        try {

            packageLoading[iconInfo.package] = 1;
            // 加载图标包
            pkg = await getIconPackage(iconInfo.package);
            IconPackages[iconInfo.package] = pkg;
            delete packageLoading[iconInfo.package];
        } catch (error) {
            delete packageLoading[iconInfo.package];
            console.error('加载图标包失败', error);
            throw error;
        }
    }

    // 自动挂载字体
    mountIconfont(pkg);

    if (!pkg.icons[iconInfo.icon]) {
        console.error('图标不存在:', iconInfo);
        throw new Error('图标不存在');
    }

    return pkg.icons[iconInfo.icon];
}

/**
 * 设置图标包
 * @param pkg 图标包配置
 */
function setIconPackage(pkg: IconPackageConfig) {
    IconPackages[pkg.name] = pkg;
}

/**
 * 解析图标名称
 */
function parseIconName(iconName: string): IconInfo {
    if (!iconName.includes('@')) {
        return {
            package: 'default',
            icon: iconName,
        }
    }
    let [pkgName, iconNameInPkg] = iconName.split('@');

    return {
        package: pkgName,
        icon: iconNameInPkg,
    }
}

/**
 * 已加载的字体样式记录
 */
const loadedFonts: Record<string, HTMLStyleElement> = {};

/**
 * 挂载字体样式
 * @param pkg 图标包配置
 */
function mountIconfont(pkg: IconPackageConfig) {
    // 如果已经挂载过，直接返回
    if (loadedFonts[pkg.name]) {
        return;
    }

    const style = document.createElement('style');
    const fontFamily = pkg.name || 'iconfont';

    // 构建字体URL，去掉协议前缀以支持相对协议
    const woff2Url = pkg.data.woff2.startsWith('//') ? pkg.data.woff2 : pkg.data.woff2;
    const woffUrl = pkg.data.woff.startsWith('//') ? pkg.data.woff : pkg.data.woff;
    const ttfUrl = pkg.data.truetype.startsWith('//') ? pkg.data.truetype : pkg.data.truetype;

    style.innerHTML = `
        @font-face {
            font-family: '${fontFamily}';
            src: url('${woff2Url}') format('woff2'),
                 url('${woffUrl}') format('woff'),
                 url('${ttfUrl}') format('truetype');
        }
    `;

    document.head.appendChild(style);
    loadedFonts[pkg.name] = style;

    console.log('已挂载字体:', pkg.name);
}

/**
 * 取消挂载字体样式
 * @param pkg 图标包配置
 */
function unmountIconfont(pkg: IconPackageConfig) {
    const styleElement = loadedFonts[pkg.name];
    if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
        delete loadedFonts[pkg.name];
        console.log('已卸载字体:', pkg.name);
    }
}


interface IconInfo {
    package: string;
    icon: string;
}

export {
    IconPackages,
    loadIcon,
    parseIconName,
    mountIconfont,
    unmountIconfont,
    setIconPackage,
}