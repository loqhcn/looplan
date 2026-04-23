import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
interface ApiRetryOption {
    /**
     * 最大重试次数
     * @default 3
     */
    maxRetry?: number;
    /**
     * 重试间隔时间（毫秒）
     * @default 1000
     */
    delay?: number;
    /**
     * 是否需要重试
     * @param response 响应数据
     * @returns 是否需要重试
     */
    check: (response: AxiosResponse) => boolean | Promise<boolean>;
    /**
     * 处理重试
     * @param response 响应数据
     * @returns 是否进行重试(如果无法处理就返回无法进行重试)
     */
    handle: (response: AxiosResponse) => boolean | Promise<boolean>;
}
declare class AxiosRetryRunner {
    private readonly retryOption;
    private readonly createRawClient;
    private readonly maxRetry;
    private readonly delay;
    constructor(retryOption: ApiRetryOption, createRawClient: () => AxiosInstance);
    /**
     * 根据响应判断是否需要重试
     * @param response 响应数据
     * @returns 是否需要重试
     */
    private shouldRetryByResponse;
    /**
     * 发送请求并返回响应
     * @param rawClient 原始请求客户端
     * @param config 请求配置
     * @returns 响应数据
     */
    private requestAsResponse;
    /**
     * 执行重试
     * @param config
     * @param initialResponse
     * @returns
     */
    run(config: AxiosRequestConfig & {
        __retryCount?: number;
        __isRetry?: boolean;
    }, initialResponse: AxiosResponse): Promise<AxiosResponse>;
}
export default AxiosRetryRunner;
export type { ApiRetryOption };
