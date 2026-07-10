import { type Ref } from 'vue';
import type { TreeItemFields } from "@/components/lp-tree/types";
declare enum SelectValueTypeEnum {
    /**
     * 字符串
     * @todo 单个时为value,多个时使用逗号分隔
     */
    STRING = "string",
    /**
     * value数组
     * @todo 只支持多个值
     */
    ARRAY = "array",
    /**
     * 对象
     * @todo 单选时为对应的optionItem
     * @todo 多选时为对象数组
     */
    OBJECT = "object",
    /**
     * 自动类型选择
     * 单选默认:STRING
     * 多选默认:ARRAY
     */
    AUTO = "auto"
}
export interface SelectManagerOptions {
    limit?: number;
    valueType?: SelectValueTypeEnum;
    valueField?: string;
    labelField?: string;
}
/**
 * 选择结果
 */
export interface SelectResult {
    /**
     * 操作是否成功
     */
    success: boolean;
    /**
     * 操作类型：add-添加, remove-移除, limit-达到限制
     */
    type: 'add' | 'remove' | 'limit';
    /**
     * 当前是否选中（操作后的状态）
     */
    selected: boolean;
}
/**
 * 选择管理器
 */
declare class SelectManager {
    selecteds: Ref<any[]>;
    limit: number;
    valueType: SelectValueTypeEnum;
    valueField: string;
    labelField: string;
    constructor(options?: SelectManagerOptions);
    /**
     * 设置已选数据
     */
    setSelecteds(items: any[]): void;
    /**
     * 清空已选
     */
    clear(): void;
    /**
     * 判断是否选中
     */
    isSelected(item: any): boolean;
    /**
     * 选择/取消选择
     * @param item 选项对象
     * @returns SelectResult
     */
    select(item: any): SelectResult;
    /**
     * 根据 modelValue 刷新 selecteds
     * @param modelValue v-model 的值
     * @param findOption 根据 value 查找选项对象的方法
     */
    flush(modelValue: any, findOption: (value: any) => any): void;
    /**
     * 获取 modelValue
     */
    getModelValue(): any;
    /**
     * 获取兼容 useSelect 的 modelValue (修正逻辑以匹配原 useSelect)
     * useSelect 中:
     * - AUTO/ARRAY: join(',')
     * - OBJECT: map(i => i.data)
     * - default: map(i => i.value)
     */
    getModelValueForUseSelect(): any;
}
/**
 * 树节点
 */
export interface TreeItem {
    /**
     * 节点是否选中
     * - 0：未选中
     * - 1：选中
     * - 2：半选中
     */
    selected?: number;
    /**
     * 节点是否禁用
     */
    disabled?: boolean;
    /**
     * 节点是否展开
     *
     */
    expanded?: boolean;
    /**
     * 节点是否正在拖动
     */
    draging?: boolean;
    loading?: boolean;
    loaded?: boolean;
    noChildren?: boolean;
    hidden?: boolean;
    /**
     * 节点数据
     */
    data: any;
    children?: TreeItem[];
    pending?: boolean;
}
/**
 * 构建树节点
 * @param data 树数据
 * @returns 树节点数组
 */
declare function buildTreeNodes(data: any[], itemFields: TreeItemFields): TreeItem[];
export { SelectManager, SelectValueTypeEnum, buildTreeNodes, };
