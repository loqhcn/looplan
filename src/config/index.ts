interface LooplanConfig {
    mode: 'es' | 'umd'
}

const looplanConfig: LooplanConfig = {
    /**
     * 模块加载模式
     * - 'es'：加载 ES 模块
     * - 'umd'：加载 UMD 模块
     * @default 'es'
     */
    mode: 'umd',
}

// 自动判断是否为 ES 模块环境
const isEsm = (() => {
    try {
        return typeof import.meta !== 'undefined' && !!import.meta.url;
    } catch {
        return false;
    }
})();
if (isEsm) {
    looplanConfig.mode = 'es';
}


export {
    looplanConfig,
    type LooplanConfig,
}
