const packageConfig = {
    name: 'test',
    title: 'Test组件库',
    type: 'local',
    version: '0.0.1',
    styleCdn: [
        "/css/test-pkg.css"
    ],
    styleImportCase: "use", // 样式导入时机: register(注册时导入) 或 use(使用时导入)
    components: [
        'Test1',
        'Test2',
        'Button',
        'Img',
        'Panel',
        'Box',
        {
            name: 'TestText',
            title: '测试文本',
            // 组件级别样式配置
            styleImportCase: "use", // 组件级别样式导入时机
            styleCdn: [
                "/css/test-item.css"
            ],
        },
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
    Button: import('./src/button.vue'),
    Img: import('./src/img.vue'),
    Panel: import('./src/panel.vue'),
    Box: import('./src/box.vue'),
    TestText: import('./src/text.vue'),
}