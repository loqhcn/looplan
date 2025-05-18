// 类似索引
const typeNamesIndex = {
    "[object Number]": 'number',
    "[object String]": 'string',
    "[object Boolean]": 'bool',
    "[object Array]": 'array',
    "[object Object]": 'object',
    "[object Undefined]": 'undefined',
    "[object Function]": 'function',
    "[object RegExp]": 'regexp',
    "[object Date]": 'date',
    "[object Symbol]": 'symbol',
} as const;

class JsDataType {

    static typeof(data: any) {
        let type: string = Object.prototype.toString.call(data);
        return typeNamesIndex[type as keyof typeof typeNamesIndex] || 'unknow';
    }

    static isArray(data: any) {
        return Object.prototype.toString.call(data) === '[object Array]';
    }


    static isEmpty(value: any) {
        // 判断是否为 null 或 undefined
        if (value === null || value === undefined) {
            return true;
        }

        // 判断是否为字符串
        if (typeof value === 'string') {
            return value.trim() === '';
        }

        // 判断是否为数组
        if (Array.isArray(value)) {
            return value.length === 0;
        }

        // 判断是否为对象
        if (typeof value === 'object') {
            return Object.keys(value).length === 0;
        }

        // 对于其他类型，如数字、布尔值等，返回 false
        return false;
    }

    /**
     * 复制对象|数组
     * @param {Array|Object} obj 
     * @returns {Array|Object} 复制的
     */
    static copyObj(obj: object) {
        return JSON.parse(JSON.stringify(obj));
    }
}

/**
 * 获取数据类型的默认值
 * @param {*} type 
 * @returns 
 */
function typeDefaultValue(type: string) {
    switch (type) {
        case 'number':
            return 0;
        case 'string':
            return '';
        case 'bool':
            return false;
        case 'array':
            return [];
        case 'object':
            return {};
        case 'undefined':
            return undefined;
        case 'function':
            return null;
        case 'regexp':
            return null;
        case 'date':
            return '';
        case 'symbol':
            return null;
        default:
            return null;
    }
}



export {
    JsDataType,
    typeDefaultValue
}