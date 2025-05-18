declare module './src/JsDataType' {
    class JsDataType {
        static typeof(data: any): string;
        static isArray(data: any): boolean;
    }
    export { JsDataType };
}

