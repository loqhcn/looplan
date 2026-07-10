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
    mode: 'es',
}

export {
    looplanConfig,
    type LooplanConfig,
}
