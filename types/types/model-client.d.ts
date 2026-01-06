interface ApiResult<T = any> {
    error: ApiError | null;
    /**
     * 原始数据
     */
    result: T;
}
interface ApiError {
    /**
     * 状态码
     * - 200:成功
     */
    code: number;
    /**
     * 提示信息
     */
    msg: string;
}
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
interface RowApiResult<T = any> {
    /**
     * 错误信息
     */
    error: ApiError | null;
    /**
     * 原始数据
     */
    result: any;
    /**
     * 行数据
     */
    row: T;
}
/**
 * 大数据分页查询结果
 */
interface PaginateXApiResult<T> {
    error: ApiError | null;
    /**
     * 原始数据
     */
    result: any;
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
    error: ApiError | null;
    /**
     * 原始数据
     */
    result: any;
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
    error: ApiError | null;
    /**
     * 数据
     */
    result: any;
    /**
     * 列表数据
     */
    list: T[];
}
type IdArr = number[] | string[];
type FilterOptionValue = [string, any];
/**
 * 过滤选项
 */
type FilterValue = string | number | FilterOptionValue[];
/**
 * 过滤选项
 * @example
 * {
 *     name: '张三',
 *     age: 18,
 *     sex: ['=', '男'],
 *     createTime: ['between', ['2023-01-01', '2023-01-31']],
 *     status: ['in', [1, 2, 3]],
 * }
 */
interface FilterOption {
    [key: string]: FilterValue;
}
export type { IdArr, FilterOption, FilterValue, FilterOptionValue, ApiError, ApiResult, RowApiResult, ListSortType, listApiResult, PaginateApiResult, PaginatePageStatus, PaginateXOptions, PaginateXApiResult, PaginateXPageStatus, };
