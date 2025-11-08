import { registerLooplanUiComponents } from './components';
import type { App } from 'vue';
import longpress from './directives/longpress';
import * as LpLayer from './components/lp-layer/index.ts';
import { LpTag } from './components/lp-tag/index.ts';
export { registerLooplanUiComponents, LpLayer, longpress, LpTag };
declare const _default: {
    install(app: App): void;
};
export default _default;
