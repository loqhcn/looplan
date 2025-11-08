import type { UploadFileItem } from '../src/types';
import { UploadStatusEnum } from '../src/types';
import { UploadToServer } from './methods';
declare function useUpload(model: any, options: any): {
    selectFile: () => void;
    fileList: import("vue").Ref<{
        [x: string]: any;
        _id: string;
        url: string;
        name?: string | undefined;
        size?: number | undefined;
        type?: string | undefined;
        uploader?: UploadToServer | null | any;
        status?: UploadStatusEnum | undefined;
    }[], UploadFileItem[] | {
        [x: string]: any;
        _id: string;
        url: string;
        name?: string | undefined;
        size?: number | undefined;
        type?: string | undefined;
        uploader?: UploadToServer | null | any;
        status?: UploadStatusEnum | undefined;
    }[]>;
    uploadProgress: import("vue").Ref<Map<UploadFileItem, number> & Omit<Map<UploadFileItem, number>, keyof Map<any, any>>, Map<UploadFileItem, number> | (Map<UploadFileItem, number> & Omit<Map<UploadFileItem, number>, keyof Map<any, any>>)>;
    flushFileList: (value: any) => void;
    updateModelValue: () => void;
    initUpload: () => void;
    onDelete: (index: number) => void;
    uploadFile: (fileItem: UploadFileItem, file: File) => Promise<void>;
    cancelUpload: (fileItem: UploadFileItem | any) => void;
    getFileList: () => {
        [x: string]: any;
        _id: string;
        url: string;
        name?: string | undefined;
        size?: number | undefined;
        type?: string | undefined;
        uploader?: UploadToServer | null | any;
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
            uploader?: UploadToServer | null | any;
            status?: UploadStatusEnum | undefined;
        };
        file: File | null;
    }[];
    uploadAllFiles: () => Promise<void>;
    clearAllFiles: () => void;
};
export { useUpload };
