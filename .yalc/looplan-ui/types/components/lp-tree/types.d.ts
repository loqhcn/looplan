import { SelectValueTypeEnum } from '../../lib/select/SelectManager';
import type { TreeItem } from '../../lib/select/SelectManager';
import type { TableColumn } from '../lp-table/types';
/**
 * 树节点字段
 * 默认值：{ children: 'children', title: 'title', value: 'id' }
 */
export interface TreeItemFields {
    /**
     * 子节点字段
     */
    children: string;
    /**
     * 节点标签字段
     */
    title: string;
    /**
     * 节点值字段
     */
    value: string;
}
export interface TreeSelectOptions {
    /**
     * 选择数量限制
     * - 1：单选
     * - 0 多选(不限制数量)
     * - 其它：多选(限制数量)
     * 默认值：1
     */
    limit?: number;
    /**
     * 选择数量限制为1时,是否取消选中时清空值
     * 默认值：false
     */
    limit1Cancel?: boolean;
    /**
     * 选择器的值类型
     * auto 表示自动判断,如果选项是对象,则值类型为对象,否则为字符串
     * string 表示值类型为字符串
     * object 表示值类型为对象
     */
    valueType?: SelectValueTypeEnum;
    /**
     * 是否显示复选框
     * 默认值：true
     */
    checkbox?: boolean;
    /**
     * 是否显示折叠图标
     * 默认值：true
     */
    foldIcon?: boolean;
    /**
     * 选中时是否选中子节点数据
     * 默认值：true
     */
    includeChild?: boolean;
    /**
     * 父节点是否可选择
     * 0：不可选择(不展示选择框)
     * 1：可选择
     * 2：用于全选/取消全选, 选中的值不包含父节点
     */
    parentSelect?: number;
}
export interface TreeProps {
    /**
     * 绑定值
     */
    modelValue?: any;
    /**
     * 树数据
     */
    data: any[];
    /**
     * 树列配置
     */
    columns?: TableColumn[];
    /**
     * 树节点字段
     * 默认值：{ children: 'children', title: 'title' }
     */
    itemFields?: TreeItemFields;
    nodeKey?: string;
    /**
     * 树节点基础宽度
     * 默认值：160
     */
    nodeBaseWidth?: number;
    load?: (node: any) => Promise<any[]>;
    /**
     * 是否加载第一层
     * 默认值：true
     * 如果设置为false,则不会调用load加载第一层数据
     * 如果设置为true,且数据为空,则会调用load加载第一层数据
     */
    loadFirst?: boolean;
    /**
     * 选择模式
     *
     */
    selectOptions?: TreeSelectOptions;
    header?: {
        /**
         * 是否显示树头
         * 默认值：false
         */
        enabled?: boolean;
        /**
         * 树头标题
         */
        title?: string;
        search?: boolean;
        searchPlaceholder?: string;
    };
    /**
     * 树展开配置
     */
    expand?: {
        /**
         * 是否默认展开所有节点
         * 默认值：false
         */
        defaultExpandAll?: boolean;
        /**
         * 在展开某个深度的节点时, 展开所有子节点
         * 默认值：undefined
         * 例如1, 在打开第1层节点时, 展开它所有子节点
         */
        deepExpandAll?: number;
    };
    /**
     * 节点事件开关配置
     */
    eventOptions?: TreeEventOptions;
}
export interface TreeEventOptions {
    /**
     * 是否开启长按事件
     * 默认值：false
     */
    longpress?: boolean;
    /**
     * 是否开启右键点击事件
     * 默认值：false
     */
    contextmenu?: boolean;
}
export type TreeEventType = 'contextmenu' | 'longpress';
export interface TreeEventPayload {
    type: TreeEventType;
    data: any;
}
export interface TreeNodeQuery {
    level: number;
    item: TreeItem;
    data: any;
    instance: any;
}
