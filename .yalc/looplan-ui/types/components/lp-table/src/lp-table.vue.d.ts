import type { TableColumn, TableDataItem, TableProps } from '../types.ts';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<TableProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TableProps> & Readonly<{}>, {
    border: boolean;
    columns: TableColumn[];
    data: TableDataItem[];
    stripe: boolean;
    rowTransitionName: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    [x: `column.${string}`]: ((props: {
        item: TableDataItem;
        column: {
            computedWidth?: string | undefined;
            computedMinWidth?: string | undefined;
            computedStickyLeft?: string | undefined;
            computedStickyRight?: string | undefined;
            title: string;
            name: string;
            width?: string | number | undefined;
            minWidth?: string | number | undefined;
            align?: "left" | "center" | "right" | undefined;
            fixed?: "left" | "right" | undefined;
        };
        index: number;
    }) => any) | undefined;
    [x: `field.${string}`]: ((props: {
        item: TableDataItem;
        column: {
            computedWidth?: string | undefined;
            computedMinWidth?: string | undefined;
            computedStickyLeft?: string | undefined;
            computedStickyRight?: string | undefined;
            title: string;
            name: string;
            width?: string | number | undefined;
            minWidth?: string | number | undefined;
            align?: "left" | "center" | "right" | undefined;
            fixed?: "left" | "right" | undefined;
        };
        index: number;
    }) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
