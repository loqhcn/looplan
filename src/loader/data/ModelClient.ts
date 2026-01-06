import type ModelSpace from "./ModelSpace";
import { LooplanException } from "@/index";
import type {
    FilterOption,
    FilterValue,
    FilterOptionValue,

    ApiError,
    ApiResult,
    IdArr,
    listApiResult,
    RowApiResult,
    PaginateApiResult,
    PaginatePageStatus,
    PaginateXApiResult,
    PaginateXOptions
} from "../../types/model-client";



class ModelClient {
    space: ModelSpace;
    modelName: string;

    constructor(space: ModelSpace, modelName: string) {
        this.space = space;
        this.modelName = modelName;
    }

    handleResult(result: any) {
        if (result.code !== 200) {
            throw new LooplanException(result.msg || '请求失败', result.code, result.data);
        }
    }


    /**
     * 列表数据
     * TODO list
     * @param params 其他参数
     */
    async list(params: Record<string, any> = {}): Promise<listApiResult<any>> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.list`, {
            ...params,
        });
        return {
            error: result.code === 200 ? null : {
                code: result.code,
                msg: result.msg || '请求失败',
            },
            result: result,
            list: result.data.list || [],
        };
    }

    /**
     * 分页列表
     * TODO paginate
     * @param page 页码
     * @param psize 每页数量
     * @param params 其他参数
     */
    async paginate(page: number = 1, psize: number = 10, params: Record<string, any> = {}): Promise<PaginateApiResult<any>> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.paginate`, {
            page,
            psize,
            ...params,
        });

        let pageStatus = result.data.list;
        let list = pageStatus?.data || [];
        delete pageStatus.list;

        return {
            error: result.code === 200 ? null : {
                code: result.code,
                msg: result.msg || '请求失败',
            },
            result: result,
            list: list,
            pageStatus: pageStatus || {},
        };
    }

    /**
     * 大数据分页列表
     * TODO paginateX
     */
    async paginateX(lastIndex: number, options?: PaginateXOptions, params: Record<string, any> = {}): Promise<PaginateXApiResult<any>> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.paginateX`, {
            lastIndex,
            options: options || null,
            ...params,
        });

        let pageStatus = result.data.list;
        let list = pageStatus?.data || [];
        delete pageStatus.list;

        return {
            error: result.code === 200 ? null : {
                code: result.code,
                msg: result.msg || '请求失败',
            },
            result: result,
            list: list,
            pageStatus: pageStatus || {},
        };
    }


    /**
     * 保存
     * TODO save
     * @param data 要保存的数据
     * @param id 要保存的记录ID
     * @param params 其他参数
     */
    async save(data: any, id?: string | number | null, params: Record<string, any> = {}): Promise<ApiResult> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.save`, {
            id,
            data,
            ...params,
        });
        return {
            error: result.code === 200 ? null : {
                code: result.code,
                msg: result.msg || '请求失败',
            },
            result: result,
        };
    }

    /**
     * 添加
     * TODO add
     * @param data 要添加的数据
     * @param params 其他参数
     */
    async add(data: any, params: Record<string, any> = {}): Promise<ApiResult> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.save`, {
            data,
            ...params,
        });
        return {
            error: result.code === 200 ? null : {
                code: result.code,
                msg: result.msg || '请求失败',
            },
            result: result,
        };
    }

    /**
     * 更新
     * TODO update
     * @param data 要更新的数据
     * @param id 要更新的记录ID
     * @param params 其他参数
     */
    async update(data: any, id: string | number, params: Record<string, any> = {}): Promise<ApiResult> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.save`, {
            id,
            data,
            ...params,
        });
        return {
            error: result.code === 200 ? null : {
                code: result.code,
                msg: result.msg || '请求失败',
            },
            result: result,
        };
    }

    /**
     * 删除
     * TODO delete
     * @param id 要删除的记录ID
     * @param params 其他参数
     */
    async delete(id: string | number, params: Record<string, any> = {}): Promise<ApiResult> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.delete`, {
            id,
            ...params,
        });
        return {
            error: result.code === 200 ? null : {
                code: result.code,
                msg: result.msg || '请求失败',
            },
            result: result,
        };
    }

    /**
     * 恢复删除
     * TODO restore
     * @param id 要恢复删除的记录ID
     * @param params 其他参数
     */
    async restore(id: string | number, params: Record<string, any> = {}): Promise<ApiResult> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.restore`, {
            id,
            ...params,
        });
        return {
            error: result.code === 200 ? null : {
                code: result.code,
                msg: result.msg || '请求失败',
            },
            result: result,
        };
    }

    /**
     * 详情
     * TODO row
     */
    async row<T = any>(id: string | number, params: Record<string, any> = {}): Promise<RowApiResult<T>> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.row`, {
            id,
            ...params,
        });
        return {
            error: result.code === 200 ? null : {
                code: result.code,
                msg: result.msg || '请求失败',
            },
            result: result,
            row: result.data?.row || {},
        };
    }


    /**
     * 保存选项
     * TODO saveOptions
     */
    async saveOptions(dataList: any[], belong: Record<string, any> = {}, params: Record<string, any> = {}): Promise<ApiResult> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.saveOptions`, {
            list: dataList,
            belong,
            ...params,
        });
        return {
            error: result.code === 200 ? null : {
                code: result.code,
                msg: result.msg || '请求失败',
            },
            result: result,
        };
    }

    /**
     * 统计数量
     * TODO count
     * @param filterOption 过滤选项
     * @param params 其他参数
     */
    async count(filterOption: FilterOption | FilterOption[] | null = null, params: Record<string, any> = {}): Promise<{
        error: ApiError | null,
        /**
         * 原始数据
         */
        result: any,
        /**
         * 数量
         */
        count: number,
    }> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.count`, {
            filter: filterOption,
            ...params,
        });
        return {
            error: result.code === 200 ? null : {
                code: result.code,
                msg: result.msg || '请求失败',
            },
            result: result,
            count: result.data.count || 0,
        };
    }

    /**
     * 保存字段
     * TODO saveField
     * 
     * @param id 数据ID
     * @param field 字段名
     * @param value 字段值
     * @param params 其他参数
     */
    async saveField(id: string | number, field: string, value: any, params: Record<string, any> = {}): Promise<ApiResult> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.saveField`, {
            id,
            field,
            value,
            ...params,
        });
        return {
            error: result.code === 200 ? null : {
                code: result.code,
                msg: result.msg || '请求失败',
            },
            result: result,
        };
    }

    /**
     * 检查是否存在
     * TODO exists
     */
    async exists(filterOption: FilterOption | FilterOption[] | null = null, params: Record<string, any> = {}): Promise<{
        error: ApiError | null,
        /**
         * 原始数据
         */
        result: any,
        /**
         * 是否存在
         */
        exists: boolean,
    }> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.exists`, {
            filter: filterOption,
            ...params,
        });
        return {
            error: result.code === 200 ? null : {
                code: result.code,
                msg: result.msg || '请求失败',
            },
            result: result,
            exists: result.data?.isExist || false,
        };
    }

    /**
     * 批量保存
     * TODO multiSave
     */
    async multiSave(dataList: any[]): Promise<ApiResult> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.multiSave`, {
            list: dataList
        });
        return {
            error: result.code === 200 ? null : {
                code: result.code,
                msg: result.msg || '请求失败',
            },
            result: result,
        };
    }

    /**
     * 批量删除
     * TODO multiDelete
     */
    async multiDelete(idArr: IdArr, params: Record<string, any> = {}): Promise<ApiResult> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.multiDelete`, {
            ids: idArr,
            ...params,
        });
        return {
            error: result.code === 200 ? null : {
                code: result.code,
                msg: result.msg || '请求失败',
            },
            result: result,
        };
    }
}

export default ModelClient;