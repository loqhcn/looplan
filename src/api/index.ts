import axios from 'axios';
// 使用仅类型导入 AxiosResponse
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AxiosRetryRunner from './AxiosRetryRunner';
import type { ApiRetryOption } from './AxiosRetryRunner'
// 定义 options 的类型
interface CreateApiOptions {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig> | any;
    responseInterceptors?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
    // 是否注入默认拦截器
    baseInterceptors?: boolean;
    /**
     * 重试配置
     */
    retry?: ApiRetryOption;

    /**
     * 重试模式
     */
    __retryMode?:Boolean;
}


/**
 * 创建 API 实例
 * @param options 配置选项
 * @returns Axios 实例
 */
function createApi(options?: CreateApiOptions): AxiosInstance {
    options = options || {};
    const axiosConfig = {
        baseURL: options.baseURL,
        timeout: options.timeout || 10000,
        headers: {
            ...(options.headers || {})
        },
    };
    const instance = axios.create(axiosConfig);

    // 请求拦截器
    instance.interceptors.request.use((config: any) => {
        if (options.requestInterceptors) {
            config = options.requestInterceptors(config);
        }
        // 默认响应拦截器
        else if (options.baseInterceptors) {
            
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // 处理重试
    let handleRetry: null | ((response: AxiosResponse) => Promise<AxiosResponse>) = null;
    if (options.retry) {
        handleRetry = async (response: AxiosResponse) => {
            if (options.retry) {
                const retryOption = options.retry;
                const needRetry = options.retry.check(response);
                // 进行重试
                if (needRetry) {
                    const createRawClient = () =>
                        createApi({
                            baseURL: options.baseURL,
                            timeout: options.timeout,
                            headers: options.headers,
                            requestInterceptors: options.requestInterceptors,
                            baseInterceptors: false,
                            __retryMode: true,
                        });
                    const retryRunner = new AxiosRetryRunner(retryOption, createRawClient);
                    const config = (response?.config || {}) as AxiosRequestConfig & { __retryCount?: number; __isRetry?: boolean };
                    return await retryRunner.run(config, response as AxiosResponse);
                }
            }

            return response;
        }
    }

    // 重试模式使用的实例, 不包含响应拦截器
    if(options.__retryMode){
        return instance;
    }

    // 响应拦截器
    instance.interceptors.response.use(async (response) => {
        if (handleRetry) {
            response = await handleRetry(response);
        }

        // 默认拦截器
        if (options.responseInterceptors) {
            return options.responseInterceptors(response);
        }
        else if (options.baseInterceptors) {
            return response.data;
        }


    }, async (error) => {
        console.log('response err', { err: error });

        if (handleRetry && error && error?.response) {
            let response = error?.response as AxiosResponse;
            response = await handleRetry(response);
            return response;
        }

        return Promise.reject(error);
    });

    return instance;
}

export { createApi };
export default axios;
export type {
    ApiRetryOption
}
