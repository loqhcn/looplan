import { UploadValueTypeEnum, UploadStatusEnum, type UploadProps, type UploadFileItem } from '../types';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<UploadProps & {
    modelValue?: any;
}, {
    getFileList: () => {
        [x: string]: any;
        _id: string;
        url: string;
        name?: string | undefined;
        size?: number | undefined;
        type?: string | undefined;
        uploader?: import("../lib/methods").UploadToServer | null | any;
        status?: UploadStatusEnum | undefined;
    }[];
    getFileObjectList: () => {
        fileItem: {
            [x: string]: any;
            _id: string;
            url: string;
            name?: string | undefined;
            size?: number | undefined;
            type?: string | undefined;
            uploader?: import("../lib/methods").UploadToServer | null | any;
            status?: UploadStatusEnum | undefined;
        };
        file: File | null;
    }[];
    uploadAllFiles: () => Promise<void>;
    selectFile: () => void;
    fileList: import("vue").Ref<{
        [x: string]: any;
        _id: string;
        url: string;
        name?: string | undefined;
        size?: number | undefined;
        type?: string | undefined;
        uploader?: import("../lib/methods").UploadToServer | null | any;
        status?: UploadStatusEnum | undefined;
    }[], UploadFileItem[] | {
        [x: string]: any;
        _id: string;
        url: string;
        name?: string | undefined;
        size?: number | undefined;
        type?: string | undefined;
        uploader?: import("../lib/methods").UploadToServer | null | any;
        status?: UploadStatusEnum | undefined;
    }[]>;
    clearAllFiles: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: any) => any;
}, string, import("vue").PublicProps, Readonly<UploadProps & {
    modelValue?: any;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}>, {
    type: string;
    limit: number;
    valueType: UploadValueTypeEnum;
    accept: string;
    autoUpload: boolean;
    responseField: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    select?: (((props: {}) => any) & ((props: {}) => any)) | undefined;
    upload?: ((props: {}) => any) | undefined;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
