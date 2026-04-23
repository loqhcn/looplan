import type { ComponentConfigOption } from '@/types/component';
interface SelectedProps {
    selecteds: any[];
    options: any[];
    placeholder: string;
    labelField?: string;
    valueField?: string;
    limit?: number;
    itemComponent?: ComponentConfigOption;
}
declare const _default: import("vue").DefineComponent<SelectedProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    search: (...args: any[]) => void;
    removeItem: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<SelectedProps> & Readonly<{
    onSearch?: ((...args: any[]) => any) | undefined;
    onRemoveItem?: ((...args: any[]) => any) | undefined;
}>, {
    labelField: string;
    valueField: string;
    limit: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
