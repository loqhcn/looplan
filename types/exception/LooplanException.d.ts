export declare class LooplanException extends Error {
    code: number;
    data: any;
    name: string;
    constructor(message: string, code?: number, data?: any);
    getData(): any;
    getCode(): number;
    getMessage(): string;
}
