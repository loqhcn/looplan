import type { UploadToServer } from '../lib/methods';
declare enum UploadTypeEnum {
    /**
     * 文本列表
     */
    TEXT = "text",
    /**
     * 图片
     */
    IMG = "img",
    /**
     * 文件
     */
    FILE = "file"
}
declare enum UploadValueTypeEnum {
    /**
     * 字符串
     * @todo 多个文件时使用逗号分隔
     */
    STRING = "string",
    /**
     * 字符串数组
     */
    ARRAY = "array",
    /**
     * 对象数组
     */
    OBJECT_ARRAY = "objectArray",
    /**
     * 自动根据文件类型选择
     */
    AUTO = ""
}
/**
 * 上传到服务器的配置
 *
 */
interface UploadActionOption {
    url: string;
    headers?: Object;
    /**
     * 上传类型
     * upload 表示上传文件
     * option 表示上传option获取
     */
    type: 'upload' | 'option';
}
/**
 * 前端上传选项
 */
interface FrontendUploadOption {
    /**
     * 上传类型
     * - alioss 表示阿里云oss
     * - qiniu 表示七牛云
     * - uni-ext 表示uni-app扩展上传
     */
    type: string;
    /**
     * 上传文件的字段名
     * 默认为 'file'
     */
    fieldName?: string;
    /**
     * 上传文件的URL
     */
    url: string;
    /**
     * 上传文件的额外数据
     */
    data: Object;
    /**
     * 上传文件的处理函数
     * @example ['etag', 'ext']
     *
     * - etag 生成文件名
     * - ext 生成文件扩展名
     *
     */
    handles: Array<string>;
    /**
     * 文件访问域名
     */
    domain: string;
}
interface UploadProps {
    /**
     * 上传类型
     */
    type?: string;
    /**
     * 上传文件的数量限制
     * 0 表示不限制
     */
    limit?: number;
    /**
     * 上传文件的类型
     */
    accept?: string;
    /**
     * 是否为数组类型
     */
    array?: boolean;
    /**
     * 上传到服务器的配置
     * 为 null 时表示不上传到服务器
     */
    action?: UploadActionOption | null;
    /**
     * model 值的类型
     */
    valueType?: UploadValueTypeEnum;
    /**
     * 是否自动上传
     */
    autoUpload?: boolean;
    /**
     * 上传成功后从响应中读取的字段路径
     * 默认为 'data.fullUrl'
     * 支持嵌套路径，如 'data.url' 或 'result.fileUrl'
     */
    responseField?: string;
}
declare enum UploadStatusEnum {
    /**
     * 等待上传
     */
    PENDING = "pending",
    /**
     * 上传中
     */
    UPLOADING = "uploading",
    /**
     * 上传成功
     */
    SUCCESS = "success",
    /**
     * 上传失败
     */
    ERROR = "error"
}
interface UploadFileItem {
    /**
     * 文件项的唯一标识符
     */
    _id: string;
    url: string;
    name?: string;
    size?: number;
    type?: string;
    uploader?: UploadToServer | null | any;
    status?: UploadStatusEnum;
    /**
     * 自定义数据
     */
    [key: string]: any;
}
export type { UploadProps, UploadFileItem, UploadActionOption, FrontendUploadOption };
export { UploadTypeEnum, UploadValueTypeEnum, UploadStatusEnum, };
