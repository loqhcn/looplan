import { type Ref } from 'vue';
export interface ListModelOption<T = any> {
    toNodeInfo: (data: T) => Record<string, any>;
    isPending?: (node: any) => boolean;
    treeOption?: {
        children: string;
        nodeChildren?: string;
        id?: string;
        pid?: string;
    };
}
export declare function useListModel<T extends object = any>(source: Ref<T[]>, options: ListModelOption<T>): {
    list: Ref<any[], any[]>;
    wrap: (item: T) => any;
    unwrap: (node: any) => T;
};
