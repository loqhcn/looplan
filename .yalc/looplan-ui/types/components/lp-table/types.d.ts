export interface TableColumn {
    /**
     * 列标题
     */
    title: string;
    /**
     * 列名
     */
    name: string;
    /**
     * 列宽度
     *
     */
    width?: string | number;
    /**
     * 列最小宽度
     */
    minWidth?: string | number;
    /**
     * 列对齐方式
     */
    align?: 'left' | 'center' | 'right';
    /**
     * 列是否固定在左侧
     */
    fixed?: 'left' | 'right';
}
export interface TableDataItem {
    [key: string]: any;
}
type TableData = TableDataItem[];
export interface TableProps {
    /**
     * 表格列配置
     */
    columns: TableColumn[];
    /**
     * 表格数据
     */
    data: TableData;
    /**
     * 是否显示斑马纹
     */
    stripe?: boolean;
    /**
     * 是否显示边框
     */
    border?: boolean;
    /**
     * 行键名
     */
    rowKey?: string;
    /**
     * 是否默认展开全部
     */
    defaultExpandAll?: boolean;
    /**
      * 行过渡动画名称
      * @todo 用于拖拽排序等
      */
    rowTransitionName?: string;
}
export interface TableColumnProps {
    /**
     * 列标题
     */
    title: string;
    /**
     * 列名
     */
    name: string;
    /**
     * 列宽度
     */
    width?: string | number;
    /**
     * 列对齐方式
     */
    align?: 'left' | 'center' | 'right';
    /**
     * 列是否固定在左侧
     */
    fixed?: 'left' | 'right';
    /**
     * 列是否固定在右侧
     */
    fixedRight?: boolean;
    /**
     * 列是否排序
     */
    sortable?: boolean;
}
export {};
