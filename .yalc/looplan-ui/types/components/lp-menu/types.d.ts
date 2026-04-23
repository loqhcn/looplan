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
}
export interface MenuSelectEvent {
    value: any;
    item: MenuItem | null;
}
export interface MenuEmits {
    (e: 'update:modelValue', value: any): void;
    (e: 'change', value: any): void;
    (e: 'select', event: MenuSelectEvent): void;
}
