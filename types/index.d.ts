import { registerLooplanComponents } from './components';
import UploadComponent from './components/UploadComponent.vue';
import { JsDataType } from './lib/data-type';
import { createApi } from './api';
import type { App } from 'vue';
export { createApi, UploadComponent, JsDataType };
export { registerLooplanComponents };
export type { ComponentOption, ComponentManager, LoadedModule, ComponentPackageConfig } from './loader/component/lib/ComponentManager';
declare const _default: {
    install(app: App): void;
};
export default _default;
