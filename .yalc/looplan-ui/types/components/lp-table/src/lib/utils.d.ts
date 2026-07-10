import type { TableColumn } from '../../types';
export interface ColumnsRender extends TableColumn {
    computedWidth?: string;
    computedMinWidth?: string;
    computedStickyLeft?: string;
    computedStickyRight?: string;
}
interface UseColumnsRenderOptions {
    stickyLeftOffset?: number;
}
declare function useColumnsRender<T extends TableColumn>(columns: T[], options?: UseColumnsRenderOptions): Array<T & ColumnsRender>;
export { useColumnsRender };
