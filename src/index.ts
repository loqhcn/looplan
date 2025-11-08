import { registerLooplanComponents } from './components';
import { JsDataType } from './lib/data-type';
import { resolveComponent } from './lib/component';
import { createApi } from './api';
import type { App } from 'vue';
import { gatewayOptions, setGateway, getComponentPackage } from './loader/component/lib/ComponentGateway';
import {
    setComponentPackage,
    registerPackage,
    loadComponent,
    asyncComponentDelay,
    nameIsUseAsyncComponent,
    getComponentOption,
    loadStyle,
    unloadStyle,
    isStyleLoaded,
    getLoadedStyles,
    unloadAllStyles
} from '@/loader/component';

import { iconGatewayOptions, setIconGateway, getIconPackage } from './components/lp-icon/lib/IconGateway';
import { loadIcon, setIconPackage, IconPackages, mountIconfont, unmountIconfont } from './components/lp-icon/lib/index';

import { LpComponent } from './components/lp-component';
import { LpIcon, LpSvg } from './components/lp-icon';
import { LooplanException } from './exception/LooplanException';
import ModelClient from './loader/data/ModelClient';
import ModelSpace from './loader/data/ModelSpace';

function install(app: App) {
    registerLooplanComponents(app);
}


// 导入并导出其他需要暴露的类型和模块
export type { ComponentOption, LoadedModule, ComponentPackageConfig } from '@/types/component';
export type { GatewayOption } from '@/types/index';
export type { IconPackageConfig } from '@/components/lp-icon/types/index';
export type {
    // 列表查询
    ListSortType,
    listApiResult,
    // 分页查询
    PaginateApiResult,
    PaginatePageStatus,
    // 大数据分页
    PaginateXOptions,
    PaginateXApiResult,
    PaginateXPageStatus,
} from '@/types/model-client';

//按需引入
export {
    LooplanException,

    install,
    // 导出组件
    LpComponent,
    LpIcon,
    LpSvg,
    // JS方法
    createApi,
    JsDataType,
    // 云组件方法
    registerLooplanComponents,
    setComponentPackage,
    registerPackage,
    loadComponent,
    asyncComponentDelay,
    nameIsUseAsyncComponent,
    getComponentOption,
    // 样式管理方法
    loadStyle,
    unloadStyle,
    isStyleLoaded,
    getLoadedStyles,
    unloadAllStyles,
    // -- 网关配置
    gatewayOptions,
    setGateway,
    getComponentPackage,
    // 图标
    loadIcon,
    setIconPackage,
    IconPackages,
    mountIconfont,
    unmountIconfont,
    // -- 图标网关
    iconGatewayOptions,
    setIconGateway,
    getIconPackage,
    // 组件工具方法
    resolveComponent,

    // 数据模型
    ModelSpace,
    ModelClient,
};

export default { install };