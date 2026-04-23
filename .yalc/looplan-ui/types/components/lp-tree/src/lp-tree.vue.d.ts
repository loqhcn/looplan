import type { TreeProps } from '../types';
import { type TreeItem } from '../../../lib/select/SelectManager';
declare const _default: import("vue").DefineComponent<TreeProps, {
    append: (parentOrData: any, dataMaybe?: any) => TreeItem;
    remove: (target: any) => boolean;
    insert: (data: any, options?: {
        parent?: any;
        parentKey?: any;
        before?: any;
        beforeKey?: any;
        after?: any;
        afterKey?: any;
    }) => TreeItem;
    getNode: (target: any) => TreeItem | undefined;
    filter: (queryOrFn: string | ((data: any, node: TreeItem) => boolean)) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<TreeProps> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    header: {
        enabled?: boolean;
        title?: string;
        search?: boolean;
        searchPlaceholder?: string;
    };
    itemFields: import("../types").TreeItemFields;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
