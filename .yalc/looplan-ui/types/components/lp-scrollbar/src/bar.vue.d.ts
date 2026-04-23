export interface BarProps {
    always: boolean;
    width: string;
    height: string;
    ratioX: number;
    ratioY: number;
    visible?: boolean;
    direction?: 'vertical' | 'horizontal';
}
export interface BarInstance {
    handleScroll: (wrap: Element) => void;
}
declare const _default: import("vue").DefineComponent<BarProps, {
    handleScroll: (wrap: Element) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<BarProps> & Readonly<{}>, {
    direction: "vertical" | "horizontal";
    visible: boolean;
    always: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
