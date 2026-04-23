interface SelectedTagProps {
    value: any;
    labelField: string;
    valueField: string;
}
declare const _default: import("vue").DefineComponent<SelectedTagProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    removeItem: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<SelectedTagProps> & Readonly<{
    onRemoveItem?: ((...args: any[]) => any) | undefined;
}>, {
    labelField: string;
    valueField: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
