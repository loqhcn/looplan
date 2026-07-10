import type { TreeEventOptions, TreeEventPayload, TreeSelectOptions } from '../lp-tree/types';
export interface MenuItem {
    [key: string]: any;
}
export interface MenuKeys {
    children?: string;
    label?: string;
    value?: string;
    icon?: string;
}
export type MenuMode = 'vertical' | 'horizontal';
export interface MenuProps {
    modelValue?: any;
    data: MenuItem[];
    keys?: MenuKeys;
    mode?: MenuMode;
    searchable?: boolean;
    searchPlaceholder?: string;
    defaultOpeneds?: any[];
    indent?: number;
    load?: (node: any) => Promise<MenuItem[]>;
    selectOptions?: Partial<TreeSelectOptions>;
    eventOptions?: TreeEventOptions;
}
export interface MenuSelectEvent {
    value: any;
    item: MenuItem | null;
}
export interface MenuEmits {
    (e: 'update:modelValue', value: any): void;
    (e: 'change', value: any): void;
    (e: 'select', event: MenuSelectEvent): void;
    (e: 'event', event: TreeEventPayload): void;
}
