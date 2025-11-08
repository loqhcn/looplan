import axios from 'axios';
import type { GatewayOption, ComponentPackageConfig } from '../../../types/index';

/**
 * 组件网关配置
 */
const gatewayOptions: GatewayOption[] = [];



function setGateway(gatewayOption: GatewayOption) {
    let isExits = gatewayOptions.find((item) => item.name === gatewayOption.name);
    if (isExits) {
        // console.error('网关已存在');
        return;
    }
    gatewayOptions.push(gatewayOption);
}

/**
 * 获取组件包
 * @todo 从网关加载组件包
 */
async function getComponentPackage(packageName: string): Promise<ComponentPackageConfig> {
    // console.log('获取组件包', packageName);
    // 是否有指定网关
    let selectGateway: any = null;
    for (let x in gatewayOptions) {
        let item = gatewayOptions[x];
        if (item.packages && item.packages?.includes(packageName)) {
            selectGateway = item;
            break;
        }
    }

    let getway = selectGateway || gatewayOptions[0];
    // 没有网关
    if (!getway) {
        throw new Error('没有网关');
    }
    // 从网关加载组件包
    let res = await axios.post(getway.url, {
        name: packageName,
    });
    if (res.data.code !== 200) {
        throw new Error(res.data.msg);
    }

    // 组件包不存在
    if (!res.data.data.row) {
        throw new Error('组件包不存在');
    }

    const pkgOption: ComponentPackageConfig = res.data.data.row;
    pkgOption.loadStatus = 0;//未加载

    return pkgOption;
}

export {
    gatewayOptions,
    setGateway,
    getComponentPackage
}