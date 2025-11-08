import type { UploadFileItem, UploadActionOption } from '../src/types';
export interface UploadProgress {
    /**
     * 已上传文件大小
     */
    loaded: number;
    /**
     * 上传文件总大小
     */
    total: number;
    /**
     * 上传进度百分比
     */
    percentage: number;
}
export interface UploadCallbacks {
    onProgress?: (progress: UploadProgress) => void;
    onSuccess?: (response: any) => void;
    onError?: (error: Error) => void;
}
declare class UploadToServer {
    item: UploadFileItem;
    file?: File;
    action?: UploadActionOption | null;
    private abortController?;
    private callbacks;
    private frontendOption?;
    /**
     * 上传进度
     */
    progress: import("vue").Ref<{
        loaded: number;
        total: number;
        percentage: number;
    }, UploadProgress | {
        loaded: number;
        total: number;
        percentage: number;
    }>;
    /**
     * 上传状态
     */
    progressStatus: string;
    constructor(item: UploadFileItem, file?: File, action?: UploadActionOption | null);
    static create(item: UploadFileItem, file?: File, action?: UploadActionOption | null): UploadToServer;
    /**
     * 获取前端直传配置
     */
    private getFrontendUploadOption;
    /**
     * 处理文件名和扩展名
     */
    private processFileName;
    /**
     * 替换字符串中的占位符
     */
    private replacePlaceholders;
    /**
     * 前端直传上传
     */
    private frontendDirectUpload;
    /**
     * 设置回调函数
     */
    setCallbacks(callbacks: UploadCallbacks): this;
    /**
     * 上传文件
     * @returns Promise<any>
     */
    upload(): Promise<any>;
    /**
     * 普通上传
     */
    private normalUpload;
    /**
     * 中断上传
     */
    abort(): void;
    /**
     * 获取上传状态
     */
    getStatus(): 'pending' | 'uploading' | 'success' | 'error' | 'aborted';
}
export { UploadToServer };
