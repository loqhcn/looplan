import { registerLooplanComponents } from './components';
import UploadComponent from './components/UploadComponent.vue';
import { JsDataType } from './lib/data-type';
import { createApi } from './api';
import type { App } from 'vue';
import {
    setComponentPackage,
    registerPackage,
    loadComponent,
    asyncComponentDelay,
    nameIsUseAsyncComponent,
    getComponentOption
} from '@/loader/component';


//按需引入
export {
    createApi,
    UploadComponent,
    JsDataType,
    registerLooplanComponents,
    setComponentPackage,
    registerPackage,
    loadComponent,
    asyncComponentDelay,
    nameIsUseAsyncComponent,
    getComponentOption
};

// 导入并导出其他需要暴露的类型和模块
export type { ComponentOption, LoadedModule, ComponentPackageConfig } from '@/types/component';

// 安装插件
export default {
    install(app: App) {
        registerLooplanComponents(app); // 注册全局组件
    }
};


