import type ModelSpace from "./ModelSpace";
import type { PaginateApiResult, PaginateXApiResult, PaginateXOptions } from "@/types/model-client";
declare class ModelClient {
    space: ModelSpace;
    modelName: string;
    constructor(space: ModelSpace, modelName: string);
    handleResult(result: any): void;
    /**
     * 列表
     */
    list(): Promise<{
        code: number;
        msg: string;
        data: any;
        list: any[];
    }>;
    /**
     * 分页列表
     */
    paginate(page?: number, psize?: number, params?: Record<string, any>): Promise<PaginateApiResult<any>>;
    paginateX(lastIndex: number, options?: PaginateXOptions, params?: Record<string, any>): Promise<PaginateXApiResult<any>>;
    /**
     * 保存
     */
    save(data: any, id?: string): Promise<any>;
    /**
     * 添加
     */
    add(data: any): Promise<any>;
    /**
     * 更新
     */
    update(data: any, id: string | number): Promise<any>;
    /**
     * 删除
     */
    delete(id: string): Promise<any>;
    /**
     * 详情
     */
    row(id: string): Promise<any>;
    multiSave(dataList: any[]): Promise<any>;
}
export default ModelClient;
