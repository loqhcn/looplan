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

function sleep(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

class AxiosRetryRunner {
    private readonly maxRetry: number;
    private readonly delay: number;

    constructor(
        private readonly retryOption: ApiRetryOption,
        private readonly createRawClient: () => AxiosInstance
    ) {
        this.maxRetry = retryOption.maxRetry ?? 3;
        this.delay = retryOption.delay ?? 1000;
    }

    /**
     * 根据响应判断是否需要重试
     * @param response 响应数据
     * @returns 是否需要重试
     */
    private async shouldRetryByResponse(response: AxiosResponse): Promise<boolean> {
        if (this.retryOption.check) {
            return await this.retryOption.check(response);
        }
        return response.status >= 500 || response.status === 429 || response.status === 408;
    }

    /**
     * 发送请求并返回响应
     * @param rawClient 原始请求客户端
     * @param config 请求配置
     * @returns 响应数据
     */
    private async requestAsResponse(rawClient: AxiosInstance, config: AxiosRequestConfig): Promise<AxiosResponse> {
        try {
            return await rawClient.request(config);
        } catch (err: any) {
            const response = err?.response as AxiosResponse | undefined;
            if (response) {
                return response;
            }
            throw err;
        }
    }

    /**
     * 执行重试
     * @param config 
     * @param initialResponse 
     * @returns 
     */
    async run(config: AxiosRequestConfig & { __retryCount?: number; __isRetry?: boolean }, initialResponse: AxiosResponse): Promise<AxiosResponse> {
        const rawClient = this.createRawClient();
        let lastResponse = initialResponse;

        while (await this.shouldRetryByResponse(lastResponse)) {
            const currentRetryCount = config.__retryCount ?? 0;
            if (currentRetryCount >= this.maxRetry) {
                return lastResponse;
            }

            if (this.retryOption.handle) {
                const canRetry = await this.retryOption.handle(lastResponse);
                if (!canRetry) {
                    return lastResponse;
                }
            }
            config.__retryCount = currentRetryCount + 1;
            config.__isRetry = true;
            if (this.delay > 0) {
                await sleep(this.delay * config.__retryCount);
            }

            lastResponse = await this.requestAsResponse(rawClient, config);
        }

        return lastResponse;
    }
}

export default AxiosRetryRunner

export type {
    ApiRetryOption
}