<template>
    <div class="m-layout">
        云组件加载测试


        <div class="m-panel">
            <div class="padding-y">
                <div class="module-title">本地组件</div>
                <lp-component is="MuloLayer@MuloTest"></lp-component>
            </div>

            <div>
                <!-- <component :is="loadComponent('MuloLayer@MuloTest')"></component> -->
            </div>

            <div class="padding-y">
                <div class="module-title">在线组件</div>
                <lp-component is="ElementPlus@ElButton" type="primary">ElementPlus按钮</lp-component>
                <lp-component is="ElementPlus@ElText" type="primary">ElementPlus文本</lp-component>
            </div>


            <!-- 饿了么组件 -->
            <Suspense>
                <div>
                    <!-- 写一个delay做渲染优化 -->
                    <component :is="asyncComponentDelay(1000)"></component>
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





            <!-- <div class="padding-y">
                <div>在线组件</div>
                <lp-component is="mm@Test1" v-model="state.name">
                    123123123123123
                </lp-component>
            </div> -->

            <div class="module-title">使用vue.component</div>
            <div class="padding-y">
                <div>loadComponent</div>
                <lp-component is="mm@Test2"></lp-component>
                <component :is="loadComponent('mm@Test2')"></component>
            </div>

            <!-- 样式管理测试 -->
            <div class="module-title">样式管理测试</div>
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
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { setComponentPackage, registerPackage, loadComponent, asyncComponentDelay, loadPackageStyles, unloadPackageStyles, unloadComponentStyles, getLoadedStyleLinks } from '@/loader/component';
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

// 切换ElementPlus样式
const toggleElementStyles = async () => {
    if (elementStylesLoaded.value) {
        unloadPackageStyles('ElementPlus');
        elementStylesLoaded.value = false;
    } else {
        await loadPackageStyles('ElementPlus');
        elementStylesLoaded.value = true;
    }
    updateStyleLinks();
}

// 切换按钮样式
const toggleButtonStyles = () => {
    if (buttonStylesLoaded.value) {
        unloadComponentStyles('ElementPlus@ElButton');
        buttonStylesLoaded.value = false;
    } else {
        // 注意：这个组件样式是在使用时加载的，需要重新渲染组件来加载样式
        // 这里我们只更新状态，实际场景中可能需要强制重新渲染组件
        buttonStylesLoaded.value = true;
    }
    updateStyleLinks();
}

// 更新样式链接列表
const updateStyleLinks = () => {
    const links = getLoadedStyleLinks();
    styleLinks.value = Object.entries(links).map(([key, linkElements]) => 
        `${key}: ${linkElements.length}个样式文件`
    );
}

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

onMounted(() => {
    setTimeout(() => {
        state.delayShow = true
    }, 1000)
    
    // 初始化样式链接列表
    updateStyleLinks();
})

</script>

<style lang="scss">
.module-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-top: 20px;
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
</style>