import type ModelSpace from "./ModelSpace";
import { LooplanException } from "@/index";
import type { PaginateApiResult, PaginatePageStatus, PaginateXApiResult, PaginateXOptions } from "@/types/model-client";



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
     * 列表
     */
    async list(): Promise<{
        code: number,
        msg: string,
        data: any,
        list: any[],
    }> {
        const { instance } = this.space;
        let result = await instance.post(`${this.modelName}.list`);
        return {
            code: result.code,
            msg: result.msg || '请求成功',
            data: result.data || {},
            list: result.data.list || [],
        };
    }

    /**
     * 分页列表
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
            code: result.code,
            msg: result.msg || '请求成功',
            data: result.data || {},
            list: list,
            pageStatus: pageStatus || {},
        };
    }

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
            code: result.code,
            msg: result.msg || '请求成功',
            data: result.data || {},
            list: list,
            pageStatus: pageStatus || {},
        };
    }


    /**
     * 保存
     */
    async save(data: any, id?: string) {
        const { instance } = this.space;
        return await instance.post(`${this.modelName}.save`, {
            id,
            data
        });
    }

    /**
     * 添加
     */
    async add(data: any) {
        const { instance } = this.space;
        return await instance.post(`${this.modelName}.save`, {
            data
        });
    }

    /**
     * 更新
     */
    async update(data: any, id: string | number) {
        const { instance } = this.space;
        return await instance.post(`${this.modelName}.save`, {
            id,
            data
        });
    }

    /**
     * 删除
     */
    async delete(id: string) {
        const { instance } = this.space;
        return await instance.post(`${this.modelName}.delete`, {
            id
        });
    }

    /**
     * 详情
     */
    async row(id: string) {
        const { instance } = this.space;
        return await instance.post(`${this.modelName}.row`, {
            id
        });
    }

    // 批量保存
    async multiSave(dataList: any[]) {
        const { instance } = this.space;
        return await instance.post(`${this.modelName}.multiSave`, {
            list: dataList
        });
    }
}

export default ModelClient;