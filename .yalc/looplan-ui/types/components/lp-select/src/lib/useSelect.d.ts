import { SelectValueTypeEnum } from '../types';
interface UseSelectOption {
    /**
     * 选项值字段
     */
    valueField?: string;
    /**
     * 选项标签字段
     */
    labelField?: string;
    /**
     * 选择器的选项数量
     * 0 表示多选,不限制数量
     * 1 表示单选,只能选择一个选项
     * 其他值表示多选,只能选择指定数量的选项
     */
    limit?: number;
    /**
     * 选择器的值类型
     * auto 表示自动判断,如果选项是对象,则值类型为对象,否则为字符串
     * string 表示值类型为字符串
     * object 表示值类型为对象
     */
    valueType?: SelectValueTypeEnum;
}
/**
 * 选择器驱动
 * @param model 模型数据
 * @returns
 */
declare function useSelect(model: any, options?: UseSelectOption): {
    selecteds: import("vue").Ref<any[], any[]>;
    optionsRender: import("vue").Ref<any[], any[]>;
    clearableVisible: import("vue").ComputedRef<boolean>;
    handleOptions: (options: any[]) => void;
    onSelect: (item: any) => void;
    onRemoveItem: (item: any) => void;
    onClear: () => void;
    onSearch: (searchValue: string) => void;
};
export { useSelect, };
export type { UseSelectOption, };
