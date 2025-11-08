interface PaginatePageStatus {
    /**
     * 当前页
     */
    page: number;
    /**
     * 每页数量
     */
    limit: number;
    /**
     * 总数量
     */
    total: number;
    /**
     * 是否还有更多数据
     */
    hasMore: boolean;
    /**
     * 最后一页
     */
    lastPage: number;
}
/**
 * 排序类型
 * ASC 升序
 * DESC 降序
 */
type ListSortType = 'ASC' | 'DESC';
/**
 * 分页查询参数
 */
interface PaginateXOptions {
    orderField: string;
    orderType: 'ASC' | 'DESC';
    limit?: number;
}
/**
 * 大数据分页状态
 */
interface PaginateXPageStatus {
    /**
    * 是否还有更多数据
    */
    hasMore: boolean;
    /**
     * 最后一条数据的索引
     * 用于下一页查询
     */
    lastIndex: number;
}
/**
 * 大数据分页查询结果
 */
interface PaginateXApiResult<T> {
    /**
     * 状态码
     * - 200:成功
     */
    code: number;
    /**
     * 提示信息
     */
    msg: string;
    /**
     * 数据
     */
    data: any;
    /**
     * 列表数据
     */
    list: T[];
    /**
     * 分页信息
     */
    pageStatus: PaginateXPageStatus;
}
/**
 * 分页查询结果
 */
interface PaginateApiResult<T> {
    /**
     * 状态码
     * - 200:成功
     */
    code: number;
    /**
     * 提示信息
     */
    msg: string;
    /**
     * 数据
     */
    data: any;
    /**
     * 列表数据
     */
    list: T[];
    /**
     * 分页信息
     */
    pageStatus: PaginatePageStatus;
}
/**
 * 列表查询结果
 */
interface listApiResult<T> {
    /**
     * 状态码
     * - 200:成功
     */
    code: number;
    /**
     * 提示信息
     */
    msg: string;
    /**
     * 数据
     */
    data: any;
    /**
     * 列表数据
     */
    list: T[];
}
export type { ListSortType, listApiResult, PaginateApiResult, PaginatePageStatus, PaginateXOptions, PaginateXApiResult, PaginateXPageStatus, };
