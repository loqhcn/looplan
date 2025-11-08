import { type ExtractPropTypes, type PropType } from 'vue';
declare const propsRule: {
    title: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    align: {
        type: PropType<"left" | "center" | "right">;
        default: string;
    };
    fixed: {
        type: PropType<"left" | "right">;
        default: string;
    };
    fixedRight: {
        type: BooleanConstructor;
        default: boolean;
    };
    sortable: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type LpTableColumnProps = Readonly<ExtractPropTypes<typeof propsRule>>;
declare const LpTableColumn: import("vue").DefineComponent<{
    readonly width: string;
    readonly title: string;
    readonly fixed: "left" | "right";
    readonly align: "center" | "left" | "right";
    readonly name: string;
    readonly fixedRight: boolean;
    readonly sortable: boolean;
}, void, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
    readonly width: string;
    readonly title: string;
    readonly fixed: "left" | "right";
    readonly align: "center" | "left" | "right";
    readonly name: string;
    readonly fixedRight: boolean;
    readonly sortable: boolean;
}> & Readonly<{}>, {
    width: string;
    title: string;
    fixed: "left" | "right";
    align: "center" | "left" | "right";
    name: string;
    fixedRight: boolean;
    sortable: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default LpTableColumn;
