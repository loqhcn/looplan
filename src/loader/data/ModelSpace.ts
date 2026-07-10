import { createApi, type ApiRetryOption } from "@/api";
import ModelClient from "./ModelClient";
import { JsDataType, LooplanException, useModelSpace } from "@/index";

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
        // 重试配置
        let retryOption: ApiRetryOption | undefined = undefined;
        if (this.options.retry === true) {
            retryOption = getDefaultRetryOption();
        } else if (JsDataType.typeof(this.options.retry) === 'object') {
            retryOption = this.options.retry as ApiRetryOption;
        }

        // console.log('重试配置:', retryOption);

        this.instance = createApi({
            baseURL: this.url,
            timeout: 10000,
            headers: {},
            /**
            * 请求拦截器
            * @param config 请求配置
            * @returns 返回配置
            */
            requestInterceptors: async (config: any) => {
                if (!config.headers['Content-Type']) {
                    config.headers['Content-Type'] = 'application/json';
                }
                // token
                if (this.options.provideToken) {
                    const token = await this.options.provideToken?.(Boolean(config.__isRetry)) || ''
                    const tokenField = this.options.tokenField || 'Authorization';
                    token && (config.headers[tokenField] = token);
                }
                // 调用请求拦截器
                this.options.requestInterceptors?.(config);
                return config
            },
            /**
             * 响应拦截器
             * @param response 响应数据
             * @returns 返回数据
             */
            responseInterceptors: async (response: any) => {
                return response.data
            },
            retry: retryOption
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
    useCloudFunction(name: string, funcOptions?: UseCloudFuncOptions) {
        // 返回云函数调用函数
        return ((params?: Record<string, any>) => {
            return this.callCloudFunction(name, params, funcOptions?.config || {});
        });
    }

    /**
     * 调用云函数
     * @param name 云函数名称
     * @param params 调用参数
     */
    async callCloudFunction(name: string, params: any, config: any = {}) {
        try {
            const response = await this.instance.post(`/${name}`, params, config);
            return response;
        } catch (error: any) {
            throw new LooplanException(error.message || '云函数调用失败', error.code || 0, error.data || {});
        }
    }


    /**
     * 导入云对象
     * @param name 云对象名称
     */
    useCloudObject(name: string, objOptions?: UseCloudObjOptions): any {
        objOptions = Object.assign({
            args: false
        }, objOptions || {});

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
                    let params = args.length > 0 ? args[0] : {};
                    if(objOptions.args){
                        params = {
                            $params:args
                        }
                    }
                    return that.callCloudObject(name as string, methodName, params,objOptions.config);
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
    async callCloudObject(objectName: string, methodName: string, params: any,config?:any) {
        const endpoint = `${objectName}.${methodName}`;
        try {
            const response = await this.instance.post(`/${endpoint}`, params,config);
            return response;
        } catch (error: any) {
            throw new LooplanException(error.message || '云对象调用失败', error.code || 0, error.data || {});
        }
    }

}



function getDefaultRetryOption(): ApiRetryOption {
    return {
        // 最大重试次数
        maxRetry: 3,
        // 重试延迟时间(毫秒)
        delay: 200,
        // 检查是否需要重试
        check: (response: any) => {
            if (response.status === 401) {
                return true;
            }
            if (response.data?.code === 401) {
                return true;
            }
            return false;
        },
        // 处理重试
        handle: async (response) => {
            try {
                if (response.data?.code === 401 || response.status === 401) {
                    // 尝试重新获取token
                    const mainSpace = useModelSpace('main');
                    if (!mainSpace) {
                        console.error('无法获取main空间实例');
                        return false;
                    }
                    // 调用main空间的Auth对象获取token
                    const AuthObj = mainSpace.useCloudObject('Auth');
                    const dataTokenRet = await AuthObj.dataToken();
                    // 设置token
                    if (dataTokenRet.code != 200) {
                        console.error('获取dataToken失败:', dataTokenRet);
                        return false;
                    }
                    localStorage.setItem('dataToken', dataTokenRet.data.token);
                    // if (reTryHandleNum < 5) {
                    //     // 给于错误的token, 测试多次失败
                    //     localStorage.setItem('dataToken', localStorage.getItem('dataToken') + 'xx');
                    // }
                    // reTryHandleNum++;
                    return true;
                }
            } catch (error) {
                console.error('处理重试时出错:', error);
            }

            // 解决失败, 无法进行重试
            return false;
        }
    }
}


export {
    ModelSpace,
    getDefaultRetryOption
};

