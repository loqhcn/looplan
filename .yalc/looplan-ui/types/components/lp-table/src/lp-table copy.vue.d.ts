import type { TableColumn, TableDataItem, TableProps } from '../types';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<TableProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TableProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    [x: `column.${string}`]: ((props: {
        item: TableDataItem;
        column: TableColumn;
        index: number;
    }) => any) | undefined;
    [x: `field.${string}`]: ((props: {
        item: TableDataItem;
        column: TableColumn;
        index: number;
    }) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
