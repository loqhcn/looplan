<template>
    <div class="m-layout">
        云组件加载测试

        <lp-panel title="本地组件">
            <lp-component is="test@Test1"></lp-component>
        </lp-panel>


        <lp-panel title="测试错误">
            <lp-component is="test@TestError"></lp-component>

        </lp-panel>

        <lp-panel title="饿了么组件">
            <div class="padding-y">
                <div class="module-title">在线组件</div>
                <lp-component is="ElementPlus@ElButton" type="primary">ElementPlus按钮</lp-component>
                <lp-component is="ElementPlus@ElText" type="primary">ElementPlus文本</lp-component>
            </div>

            <!-- 饿了么组件 -->
            <Suspense>
                <div>
                    <!-- 写一个delay做渲染优化 -->
                    <component :is="asyncComponentDelay(200)"></component>
                    <!-- 渲染内容 -->
                    <div class="padding-y">
                        <lp-component is="ElementPlus@ElButton" type="primary">ElementPlus按钮</lp-component>
                        <lp-component is="ElementPlus@ElButton" type="danger">ElementPlus按钮</lp-component>

                        <lp-component is="ElementPlus@ElTable" :data="tableData" style="width: 100%">
                            <lp-component is="ElementPlus@ElTableColumn" prop="date" label="Date" width="180" />
                            <lp-component is="ElementPlus@ElTableColumn" prop="name" label="Name" width="180" />
                            <lp-component is="ElementPlus@ElTableColumn" prop="address" label="Address" />
                        </lp-component>
                    </div>
                </div>
                <!-- 加载中状态 -->
                <template #fallback>
                    正在加载...
                </template>
            </Suspense>

        </lp-panel>


        <div class="m-panel">
            <div class="module-title">使用vue.component</div>
            <div class="padding-y">
                <div>lp-component</div>
                <lp-component ref="test2Ref" is="test@Test2"></lp-component>
                <div class="handles flex">
                    <lp-button type="primary" @click="handleTest2">调用test2</lp-button>
                </div>
                <div>loadComponent</div>
                <component :is="loadComponent('test@Test2')"></component>
            </div>

            <div class="module-title">Is 切换测试</div>
            <div class="padding-y">
                <div class="toggle-row">
                    <div class="toggle-info">当前组件: {{ toggleIs }}</div>
                    <lp-button type="primary" @click="handleToggleIs">切换 Test1/Test2</lp-button>
                </div>
                <div class="toggle-panels">
                    <div class="panel">
                        <div class="sub-title">lp-component</div>
                        <lp-component :is="toggleIs" ref="toggleRef"></lp-component>
                    </div>
                    <div class="panel">
                        <div class="sub-title">原生 component</div>
                        <component :is="loadComponent(toggleIs)"></component>
                    </div>
                </div>
            </div>

            <div class="module-title">列表渲染测试</div>
            <div class="padding-y">
                <div class="list-panels">
                    <lp-component v-for="item in listItems" is="test@Test2" :key="item.id"></lp-component>
                </div>
            </div>

            <!-- 样式管理测试 -->
            <!-- <div class="module-title">样式管理测试</div>
            <div class="padding-y">
                <el-button type="primary" @click="toggleElementStyles">
                    {{ elementStylesLoaded ? '卸载ElementPlus样式' : '加载ElementPlus样式' }}
                </el-button>
                <el-button type="warning" @click="toggleButtonStyles">
                    {{ buttonStylesLoaded ? '卸载按钮样式' : '加载按钮样式' }}
                </el-button>
                <div class="style-info" v-if="styleLinks.length > 0">
                    <div>当前加载的样式：</div>
                    <ul>
                        <li v-for="(link, index) in styleLinks" :key="index">
                            {{ link }}
                        </li>
                    </ul>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import {
    setComponentPackage,
    loadComponent,
    asyncComponentDelay,
    registerPackage,
    loadStyle,
    unloadStyle,
    isStyleLoaded,
    getLoadedStyles,
    unloadAllStyles
} from '@/loader/component';

import testPkg from './test_pkg/index.ts'

const state = reactive({
    name: '测试',
    age: 18,
    delayShow: false,
})

const tableData = ref([
    { date: '2016-05-02', name: 'John', address: 'No. 189, Grove St, Los Angeles' },
    { date: '2016-05-04', name: 'Jim', address: 'No. 189, Grove St, Los Angeles' },
])

// 样式管理相关状态
const elementStylesLoaded = ref(true); // 默认已加载
const buttonStylesLoaded = ref(true); // 默认已加载
const styleLinks = ref<string[]>([]);

// 设置本地组件库
setComponentPackage(testPkg)
// 注册组件库
registerPackage({
    name: 'ElementPlus',
    title: 'ElementPlus组件库',
    type: 'cdn',
    cdn: 'https://unpkg.com/element-plus@__version__/dist/index.full.js',
    styleCdn: [
        "https://unpkg.com/element-plus@__version__/dist/index.css"
    ],
    styleImportCase: "register", // 样式导入时机 register: 注册时导入, use: 使用时导入
    version: '2.9.8',
    keepOfWindow: true, // 是否在window上保留组件库
    components: [
        // 支持字符串和对象
        "ElText",
        {
            title: '按钮',
            name: 'ElButton',
            modelType: 'none',
            // 配置
            config: {
                myConfigItem: '可以自己添加配置'
            },
            styleCdn: [
                "https://unpkg.com/element-plus@__version__/dist/xxx.css"
            ],
            styleImportCase: "use", // 样式导入时机 register: 注册时导入, use: 使用时导入
        },
        {
            title: '表格',
            name: 'ElTable',
            modelType: 'none',
        },
        {
            title: '表格列',
            name: 'ElTableColumn',
            modelType: 'none',
        }
    ],
})

const test2Ref = ref<any>(null);

function handleTest2() {
    if (test2Ref.value) {
        test2Ref.value.test2();
    }
}

const toggleIs = ref<string>('test@Test1');
const toggleRef = ref<any>(null);
function handleToggleIs() {
    toggleIs.value = toggleIs.value.includes('Test1') ? 'test@Test2' : 'test@Test1';
}

const listItems = ref<Array<{ id: number; is: string }>>([
    { id: 1, is: 'test@Test1' },
    { id: 2, is: 'test@Test2' },
    { id: 3, is: 'test@Test1' },
]);
function toggleItemIs(item: { id: number; is: string }) {
    item.is = item.is.includes('Test1') ? 'test@Test2' : 'test@Test1';
}

onMounted(() => {
    setTimeout(() => {
        state.delayShow = true
    }, 1000)


})

</script>

<style lang="scss">
.module-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-top: 20px;
}

.sub-title {
    font-size: 14px;
    font-weight: 600;
    color: #555;
    margin-bottom: 8px;
}

.style-info {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;

    ul {
        margin: 0;
        padding-left: 20px;

        li {
            margin: 5px 0;
        }
    }
}

.m-panel {
    background: #fff;
    border: 1px solid #ebedf0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.toggle-row {
    display: flex;
    align-items: center;
    gap: 12px;
}

.toggle-info {
    padding: 6px 10px;
    background: #f5f7fa;
    border: 1px solid #eaecef;
    border-radius: 6px;
    font-size: 13px;
    color: #666;
}

.toggle-panels {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 12px;
}

.panel {
    border: 1px dashed #e0e3e7;
    border-radius: 8px;
    padding: 12px;
}

.list-panels {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}
</style>
