import type { ComponentConfigOption } from '@/types/component';
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
interface SelectProps {
    options: any[];
    /**
     * 选择器的选项数量
     * 0 表示多选,不限制数量
     * 1 表示单选,只能选择一个选项
     */
    limit?: number;
    /**
     * 选择器的值类型
     * auto 表示自动判断,如果选项是对象,则值类型为对象,否则为字符串
     * string 表示值类型为字符串
     * object 表示值类型为对象
     */
    valueType?: SelectValueTypeEnum;
    /**
     * 选择器的占位符
     */
    placeholder?: string;
    /**
     * 选择器的选中项组件
     */
    selectedItemComponent?: ComponentConfigOption;
}
export type { SelectProps };
export { SelectValueTypeEnum };
