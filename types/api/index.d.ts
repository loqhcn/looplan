import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiRetryOption } from './AxiosRetryRunner';
interface CreateApiOptions {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig> | any;
    responseInterceptors?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
    baseInterceptors?: boolean;
    /**
     * 重试配置
     */
    retry?: ApiRetryOption;
    /**
     * 重试模式
     */
    __retryMode?: Boolean;
}
/**
 * 创建 API 实例
 * @param options 配置选项
 * @returns Axios 实例
 */
declare function createApi(options?: CreateApiOptions): AxiosInstance;
export { createApi };
export default axios;
export type { ApiRetryOption };
