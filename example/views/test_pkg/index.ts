const packageConfig = {
    name: 'mm',
    title: 'MuloModel内部组件库',
    type: 'local',
    version: '0.0.1',
    components: [
        'Test1',
        'Test2',
    ],
    // 需要异步加载的组件
    asyncComponents: [
        'Test1',
    ]
}

export default {
    packageConfig: packageConfig,
    Test1: () => import('./test1.vue'),
    Test2: import('./test2.vue'),
}