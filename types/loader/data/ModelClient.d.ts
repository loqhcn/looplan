import type ModelSpace from "./ModelSpace";
import type { FilterOption, ApiError, ApiResult, IdArr, listApiResult, RowApiResult, PaginateApiResult, PaginateXApiResult, PaginateXOptions } from "../../types/model-client";
declare class ModelClient {
    space: ModelSpace;
    modelName: string;
    constructor(space: ModelSpace, modelName: string);
    handleResult(result: any): void;
    /**
     * 列表数据
     * TODO list
     * @param params 其他参数
     */
    list(params?: Record<string, any>): Promise<listApiResult<any>>;
    /**
     * 分页列表
     * TODO paginate
     * @param page 页码
     * @param psize 每页数量
     * @param params 其他参数
     */
    paginate(page?: number, psize?: number, params?: Record<string, any>): Promise<PaginateApiResult<any>>;
    /**
     * 大数据分页列表
     * TODO paginateX
     */
    paginateX(lastIndex: number, options?: PaginateXOptions, params?: Record<string, any>): Promise<PaginateXApiResult<any>>;
    /**
     * 保存
     * TODO save
     * @param data 要保存的数据
     * @param id 要保存的记录ID
     * @param params 其他参数
     */
    save(data: any, id?: string | number | null, params?: Record<string, any>): Promise<ApiResult>;
    /**
     * 添加
     * TODO add
     * @param data 要添加的数据
     * @param params 其他参数
     */
    add(data: any, params?: Record<string, any>): Promise<ApiResult>;
    /**
     * 更新
     * TODO update
     * @param data 要更新的数据
     * @param id 要更新的记录ID
     * @param params 其他参数
     */
    update(data: any, id: string | number, params?: Record<string, any>): Promise<ApiResult>;
    /**
     * 删除
     * TODO delete
     * @param id 要删除的记录ID
     * @param params 其他参数
     */
    delete(id: string | number, params?: Record<string, any>): Promise<ApiResult>;
    /**
     * 恢复删除
     * TODO restore
     * @param id 要恢复删除的记录ID
     * @param params 其他参数
     */
    restore(id: string | number, params?: Record<string, any>): Promise<ApiResult>;
    /**
     * 详情
     * TODO row
     */
    row<T = any>(id: string | number, params?: Record<string, any>): Promise<RowApiResult<T>>;
    /**
     * 保存选项
     * TODO saveOptions
     */
    saveOptions(dataList: any[], belong?: Record<string, any>, params?: Record<string, any>): Promise<ApiResult>;
    /**
     * 统计数量
     * TODO count
     * @param filterOption 过滤选项
     * @param params 其他参数
     */
    count(filterOption?: FilterOption | FilterOption[] | null, params?: Record<string, any>): Promise<{
        error: ApiError | null;
        /**
         * 原始数据
         */
        result: any;
        /**
         * 数量
         */
        count: number;
    }>;
    /**
     * 保存字段
     * TODO saveField
     *
     * @param id 数据ID
     * @param field 字段名
     * @param value 字段值
     * @param params 其他参数
     */
    saveField(id: string | number, field: string, value: any, params?: Record<string, any>): Promise<ApiResult>;
    /**
     * 检查是否存在
     * TODO exists
     */
    exists(filterOption?: FilterOption | FilterOption[] | null, params?: Record<string, any>): Promise<{
        error: ApiError | null;
        /**
         * 原始数据
         */
        result: any;
        /**
         * 是否存在
         */
        exists: boolean;
    }>;
    /**
     * 批量保存
     * TODO multiSave
     */
    multiSave(dataList: any[]): Promise<ApiResult>;
    /**
     * 批量删除
     * TODO multiDelete
     */
    multiDelete(idArr: IdArr, params?: Record<string, any>): Promise<ApiResult>;
}
export default ModelClient;
