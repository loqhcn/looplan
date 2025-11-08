import { createApi } from "@/api";
import ModelClient from "./ModelClient";
import { LooplanException } from "@/index";

interface ModelSpaceOptions {
    url: string;
    tokenField?: string;
    /**
     * 提供token的函数
     */
    provideToken?: () => string;
}

class ModelSpace {
    url!: string;
    options!: ModelSpaceOptions;
    /**
     * 实例化后的API客户端
     */
    instance: any;

    constructor(options: ModelSpaceOptions) {
        this.url = options.url;
        this.options = options;
        this.createApiClient();
    }

    createApiClient() {
        this.instance = createApi({
            baseURL: this.url,
            timeout: 10000,
            headers: {},
            /**
            * 请求拦截器
            * @param config 请求配置
            * @returns 返回配置
            */
            requestInterceptors: (config: any) => {
                console.log(config)
                if (!config.headers['Content-Type']) {
                    config.headers['Content-Type'] = 'application/json';
                }
                // token
                const token = this.options.provideToken?.() || ''
                const tokenField = this.options.tokenField || 'Authorization';
                token && (config.headers[tokenField] = token);
                return config
            },
            /**
             * 响应拦截器
             * @param response 响应数据
             * @returns 返回数据
             */
            responseInterceptors: (response: any) => {
                console.log(response)
                return response.data
            }
        });
    }

    /**
     * 
     * @param name 模型名称(space/name)
     * @returns 模型API
     */
    useModel(name: string) {
        return new ModelClient(this, name);
    }

    /**
     * 导入云函数
     * @param name 云函数名称
     */
    useCloudFunction(name: string) {
        // 返回云函数调用函数
        return ((params: any) => {
            return this.callCloudFunction(name, params);
        });
    }


    /**
     * 导入云对象
     * @param name 云对象名称
     */
    useCloudObject(name: string): any {
        const that = this;
        // 创建云对象代理，拦截方法调用
        return new Proxy({} as any, {
            get(target, methodName: string) {
                // 特殊处理 then 属性，避免在 async 函数中返回时被误认为是 Promise
                if (methodName === 'then') {
                    return undefined;
                }
                return (...args: any[]) => {
                    // 如果方法有参数，使用第一个参数作为请求体，否则使用空对象
                    const params = args.length > 0 ? args[0] : {};
                    return that.callCloudObject(name as string, methodName, params);
                };
            }
        });
    }


    /**
     * 调用云对象方法
     * @param objectName 云对象名称
     * @param methodName 方法名称
     * @param params 调用参数
     */
    async callCloudObject(objectName: string, methodName: string, params: any) {
        const endpoint = `${objectName}.${methodName}`;
        try {
            console.log(`调用云对象: ${endpoint}`, params);
            const response = await this.instance.post(`/${endpoint}`, params);
            return response;
        } catch (error: any) {
            throw new LooplanException(error.message || '云对象调用失败', error.code || 0, error.data || {});
        }
    }

    /**
     * 调用云函数
     * @param name 云函数名称
     * @param params 调用参数
     */
    async callCloudFunction(name: string, params: any) {
        try {
            console.log(`调用云函数: ${name}`, params);
            const response = await this.instance.post(`/${name}`, params);
            return response;
        } catch (error: any) {
            throw new LooplanException(error.message || '云函数调用失败', error.code || 0, error.data || {});
        }
    }

}

export default ModelSpace;