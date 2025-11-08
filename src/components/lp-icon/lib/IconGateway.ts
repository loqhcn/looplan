import axios from 'axios';
import type { IconGatewayOption, IconPackageConfig } from '../types';

/**
 * 图标网关配置
 */
const iconGatewayOptions: IconGatewayOption[] = [];

/**
 * 设置图标网关
 * @param gatewayOption 图标网关配置
 * @returns 
 */
function setIconGateway(gatewayOption: IconGatewayOption) {
    let isExits = iconGatewayOptions.find((item) => item.name === gatewayOption.name);
    if (isExits) {
        // console.error('网关已存在');
        return;
    }
    iconGatewayOptions.push(gatewayOption);
}


/**
 * 获取图标包
 * @todo 从网关加载图标包
 */
async function getIconPackage(packageName: string): Promise<IconPackageConfig> {
    console.log('## 获取图标包', packageName);
    // 是否有指定网关
    let selectGateway: IconGatewayOption | null = null;
    for (let x in iconGatewayOptions) {
        let item = iconGatewayOptions[x];
        if (item.packages && item.packages?.includes(packageName)) {
            selectGateway = item;
            break;
        }
    }

    let getway = selectGateway || iconGatewayOptions[0];
    // 没有网关
    if (!getway) {
        console.log('没有网关', packageName,iconGatewayOptions);
        throw new Error('没有网关');
    }
    // 从网关加载图标包
    let res = await axios.post(getway.url, {
        name: packageName,
    });
    if (res.data.code !== 200) {
        throw new Error(res.data.msg);
    }
    // 图标包不存在
    if (!res.data.data.row) {
        throw new Error('图标包不存在');
    }
    const pkgOption: IconPackageConfig = res.data.data.row;

    return pkgOption;
}


export {
    iconGatewayOptions,
    setIconGateway,
    getIconPackage,
}