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
    width?: string;
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
    columns: TableColumn[];
    data: TableData;
}
export {};
