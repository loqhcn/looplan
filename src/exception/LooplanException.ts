export class LooplanException extends Error {
    code: number;
    data: any;
    name: string = "LooplanException";

    constructor(message: string, code: number = 0, data: any = {}) {
        super(message);
        this.code = code;
        this.data = data;
        // 确保原型链正确
        Object.setPrototypeOf(this, LooplanException.prototype);
    }

    getData(): any {
        return this.data;
    }

    getCode(): number {
        return this.code;
    }

    getMessage(): string {
        return this.message;
    }
}
