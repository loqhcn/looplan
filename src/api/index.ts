import axios from 'axios';
// 使用仅类型导入 AxiosResponse
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 定义 options 的类型
interface CreateApiOptions {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig> | any;
    responseInterceptors?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
    // 是否注入默认拦截器
    baseInterceptors?: boolean;
}

/**
 * 创建 API 实例
 * @param options 配置选项
 * @returns Axios 实例
 */
function createApi(options?: CreateApiOptions): AxiosInstance {
    options = options || {};
    const instance = axios.create({
        baseURL: options.baseURL,
        timeout: options.timeout || 10000,
        headers: {
            ...(options.headers || {})
        },
    });
    

    // 访问拦截器
    if (options.requestInterceptors) {
        instance.interceptors.request.use(options.requestInterceptors, (error) => {
            console.log('request', { err: error });
            return Promise.reject(error);
        });
    }

    // 响应拦截器
    if (options.responseInterceptors) {
        instance.interceptors.response.use(options.responseInterceptors, (error) => {
            console.log('response err', { err: error });
            return Promise.reject(error);
        });
    }

    // 注入默认拦截器
    if (options.baseInterceptors && !( options.requestInterceptors || options.responseInterceptors )) {
        instance.interceptors.request.use((config) => {
            console.log('request', { config });
            return config; 
        })
        instance.interceptors.response.use((response) => {
            console.log('response', { response });
            return response.data; 
        })
    }

    return instance;
}

export { createApi };
export default axios;
