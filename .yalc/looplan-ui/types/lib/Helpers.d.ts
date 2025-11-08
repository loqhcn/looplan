/**
 * 等待结果
 * @todo 等待结果的函数需要返回一个数据，否则会一直等待
 * @param fn
 * @returns
 */
declare function waitResult(fn: Function): Promise<unknown>;
/**
 * 添加单位
 * @param value
 * @param defaultUnit
 * @returns
 */
declare function addUnit(value?: string | number, defaultUnit?: string): string;
/**
 * 调试警告
 * @param scope
 * @param message
 */
declare function debugWarn(scope: string, message: string): void;
/**
 * 抛出错误
 * @param scope
 * @param message
 */
declare function throwError(scope: string, message: string): never;
/**
 * 判断是否为数字
 * @param val
 * @returns
 */
declare function isNumber(val: any): val is number;
/**
 * 判断是否为对象
 * @param val
 * @returns
 */
declare function isObject(val: any): val is Record<any, any>;
/**
 * 事件监听
 * @param element
 * @param event
 * @param handler
 * @param useCapture
 */
declare function on(element: Element | HTMLElement | Document | Window, event: string, handler: EventListenerOrEventListenerObject, useCapture?: boolean): void;
/**
 * 移除事件监听
 * @param element
 * @param event
 * @param handler
 * @param useCapture
 */
declare function off(element: Element | HTMLElement | Document | Window, event: string, handler: EventListenerOrEventListenerObject, useCapture?: boolean): void;
export { waitResult, addUnit, debugWarn, throwError, isNumber, isObject, on, off };
