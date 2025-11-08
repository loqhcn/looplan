import ModelClient from "./ModelClient";
interface ModelSpaceOptions {
    url: string;
    tokenField?: string;
    /**
     * 提供token的函数
     */
    provideToken?: () => string;
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
    useCloudFunction(name: string): (params: any) => Promise<any>;
    /**
     * 导入云对象
     * @param name 云对象名称
     */
    useCloudObject(name: string): any;
    /**
     * 调用云对象方法
     * @param objectName 云对象名称
     * @param methodName 方法名称
     * @param params 调用参数
     */
    callCloudObject(objectName: string, methodName: string, params: any): Promise<any>;
    /**
     * 调用云函数
     * @param name 云函数名称
     * @param params 调用参数
     */
    callCloudFunction(name: string, params: any): Promise<any>;
}
export default ModelSpace;
