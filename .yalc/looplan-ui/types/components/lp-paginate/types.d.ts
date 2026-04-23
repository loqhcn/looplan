export interface PaginateProps {
    status: PaginatePageStatus;
    maxButtons?: number;
    showQuickJumper?: boolean;
}
export interface PaginatePageStatus {
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
