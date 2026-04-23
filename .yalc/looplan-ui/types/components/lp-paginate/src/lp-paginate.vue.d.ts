import type { PaginatePageStatus, PaginateProps } from '../types';
declare const _default: import("vue").DefineComponent<PaginateProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (v: PaginatePageStatus) => any;
    "update:status": (v: PaginatePageStatus) => any;
}, string, import("vue").PublicProps, Readonly<PaginateProps> & Readonly<{
    onChange?: ((v: PaginatePageStatus) => any) | undefined;
    "onUpdate:status"?: ((v: PaginatePageStatus) => any) | undefined;
}>, {
    showQuickJumper: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
