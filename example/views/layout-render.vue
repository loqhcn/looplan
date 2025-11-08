<template>
    <div class="lp-layout">
        <!-- <div>测试布局渲染</div> -->
        <!-- <lp-component is="test@Button">12312</lp-component> -->
        <!-- <lp-component is="test@Panel">
                    <template #title>
                        自定义标题
                    </template>
                       <template #footer>
                        自定义底部内容
                    </template>
自定义内容1212312
</lp-component> -->
        <lp-layout :data="layoutData1">
            <template #panel1.footer>
                <lp-component is="test@Button">12312</lp-component>
            </template>
            <!-- 
            <template #test_slot1>
                <lp-component is="test@Button">123123</lp-component>
            </template> -->
        </lp-layout>

        <div class="handles">
            <button class="btn" @click="addComponent">添加</button>
            <button class="btn" @click="updateLayout">修改</button>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { setComponentPackage } from '@/loader/component';
import testPkg from './test_pkg/index.ts'
// 设置本地组件库
setComponentPackage(testPkg)

const state = reactive({

})

const TestLayout1 = [
    {
        title: '测试div',
        component: 'div',
        children: [
            {
                title: '测试div1',
                component: 'div',
                props: {
                    text: '测试div1'
                }
            },
            "测试div"
        ]
    },
    {
        title: '面板1',
        component: 'test@Panel',
        name: 'panel1',
        props: {
            text: '面板1'
        },
        slots: {
            title: [
                { component: 'div', children: ['自定义标题123123'] }
            ],
            footer: [
                { component: 'div', children: ['底部内容xxxx123123'] }
            ]
        },
        children: [
            {
                title: '面板内按钮',
                component: 'test@Button',
                props: {
                    text: '面板内按钮'
                }
            },
            {
                component: 'div',
                children: [
                    "xxxxxxxxxx"
                ]
            }
        ]
    },
    {
        title: '按钮1',
        component: 'test@Button',
        props: {
            text: '按钮1'
        }
    },
    {
        title: '按钮2',
        component: 'test@Button',
        props: {
            text: '按钮2'
        }
    }
]
const layoutData1 = reactive(TestLayout1);
const addComponent = () => {
    layoutData1.push({
        title: '新组件',
        component: 'test@Button',
        props: {
            text: '新组件'
        }
    })
}

const updateLayout = () => {
    layoutData1[0].children[1] = new Date().toLocaleString()
}

</script>
<script scoped>
export default {
    title: 'LayoutRender'
}
</script>
<style lang="scss"></style>