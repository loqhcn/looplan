import { type Component } from 'vue';
/**
 * 指定渲染组件
 */
interface ComponentConfig {
    /**
     * 渲染组件
     */
    component: Component | string;
}
/**
 * 组件配置选项
 */
type ComponentConfigOption = ComponentConfig | string;
export type { ComponentConfig, ComponentConfigOption };
