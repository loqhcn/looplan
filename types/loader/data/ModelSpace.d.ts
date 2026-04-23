import { type ApiRetryOption } from "@/api";
import ModelClient from "./ModelClient";
interface ModelSpaceOptions {
    url: string;
    tokenField?: string;
    /**
     * 提供token的函数
     */
    provideToken?: (isRetry?: boolean) => string | Promise<string>;
    /**
     * 请求拦截器
     */
    requestInterceptors?: (config: any) => any;
    /**
     * 重试配置
     */
    retry?: ApiRetryOption | Boolean;
}
/**
 * 调用 云函数 选项
 */
interface UseCloudFuncOptions {
    /**
     * 传递配置给axios
     */
    config?: Record<string, any>;
}
/**
 * 调用 云对象 选项
 */
interface UseCloudObjOptions {
    /**
     * 是否传递参数作为云对象的方法参数
     */
    args?: Boolean;
    /**
     * 传递配置给axios
     */
    config?: Record<string, any>;
}
declare class ModelSpace {
    url: string;
    options: ModelSpaceOptions;
    /**
     * 实例化后的API客户端
     */
    instance: any;
    constructor(options: ModelSpaceOptions);
    createApiClient(): void;
    /**
     *
     * @param name 模型名称(space/name)
     * @returns 模型API
     */
    useModel(name: string): ModelClient;
    /**
     * 导入云函数
     * @param name 云函数名称
     */
    useCloudFunction(name: string, funcOptions?: UseCloudFuncOptions): (params?: Record<string, any>) => Promise<any>;
    /**
     * 调用云函数
     * @param name 云函数名称
     * @param params 调用参数
     */
    callCloudFunction(name: string, params: any, config?: any): Promise<any>;
    /**
     * 导入云对象
     * @param name 云对象名称
     */
    useCloudObject(name: string, objOptions?: UseCloudObjOptions): any;
    /**
     * 调用云对象方法
     * @param objectName 云对象名称
     * @param methodName 方法名称
     * @param params 调用参数
     */
    callCloudObject(objectName: string, methodName: string, params: any, config?: any): Promise<any>;
}
declare function getDefaultRetryOption(): ApiRetryOption;
export { ModelSpace, getDefaultRetryOption };
